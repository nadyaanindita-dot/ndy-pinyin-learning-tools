/**
 * Dual-tier Audio System for Mandarin Chinese Pinyin Learning
 * Tier 1: Pristine Native Chinese MP3 audio from backend /api/tts proxy (Google Cloud TTS engine)
 * Tier 2: Browser Web Speech API fallback with Chinese voice selection
 * Tier 3: Pure pitch contour frequency glide synthesizer (Web Audio API)
 */

// Memory cache for audio elements so repeated clicks play instantly without re-fetching
const audioCache = new Map<string, HTMLAudioElement>();
let currentPlayingAudio: HTMLAudioElement | null = null;
let speechVoice: SpeechSynthesisVoice | null = null;
let voicesLoaded = false;
let globalPlaybackSpeed = 1.0; // 1.0 = normal, 0.75 = slow for beginners

export function setPlaybackSpeed(speed: number) {
  globalPlaybackSpeed = speed;
  if (currentPlayingAudio) {
    currentPlayingAudio.playbackRate = speed;
  }
}

export function getPlaybackSpeed(): number {
  return globalPlaybackSpeed;
}

// Map Shengmu and Yunmu symbols to standard Chinese helper characters for authentic pronunciation
const PHONETIC_MAPPING: Record<string, string> = {
  // Shengmu initials
  b: '玻',
  p: '坡',
  m: '摸',
  f: '佛',
  d: '得',
  t: '特',
  n: '讷',
  l: '勒',
  g: '哥',
  k: '科',
  h: '喝',
  j: '基',
  q: '欺',
  x: '希',
  zh: '知',
  ch: '吃',
  sh: '诗',
  r: '日',
  z: '资',
  c: '疵',
  s: '思',
  y: '衣',
  w: '乌',
  // Yunmu vowels
  a: '啊',
  o: '喔',
  e: '鹅',
  i: '衣',
  u: '乌',
  ü: '迂',
  ai: '哀',
  ei: '诶',
  ao: '熬',
  ou: '欧',
  ia: '鸭',
  ie: '耶',
  iao: '腰',
  iu: '优',
  'iu (iou)': '优',
  ua: '蛙',
  uo: '窝',
  uai: '歪',
  ui: '微',
  'ui (uei)': '微',
  üe: '约',
  an: '安',
  en: '恩',
  in: '音',
  un: '温',
  'un (uen)': '温',
  ün: '晕',
  ian: '烟',
  uan: '弯',
  üan: '冤',
  ang: '昂',
  eng: '亨',
  ing: '英',
  ong: '轰',
  iang: '央',
  iong: '拥',
  uang: '汪',
  er: '二',
};

// Initialize SpeechSynthesis voices
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  const findZhVoice = () => {
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      speechVoice =
        voices.find((v) => v.lang === 'zh-CN') ||
        voices.find((v) => v.lang.startsWith('zh')) ||
        null;
      voicesLoaded = true;
    }
  };

  findZhVoice();
  window.speechSynthesis.onvoiceschanged = findZhVoice;
}

/**
 * Play standard Chinese pronunciation for a given Hanzi or phonetic term
 */
export async function playChineseSpeech(input: string, customRate?: number): Promise<boolean> {
  if (typeof window === 'undefined') return false;

  const targetText = PHONETIC_MAPPING[input.trim()] || input.trim();
  const rate = customRate || globalPlaybackSpeed;

  // Stop any currently playing audio
  if (currentPlayingAudio) {
    try {
      currentPlayingAudio.pause();
      currentPlayingAudio.currentTime = 0;
    } catch {
      // Ignore abort errors
    }
    currentPlayingAudio = null;
  }

  // --- TIER 1: Native Audio from Server Endpoint /api/tts ---
  try {
    const audioUrl = `/api/tts?text=${encodeURIComponent(targetText)}`;
    let audio = audioCache.get(audioUrl);

    if (!audio) {
      audio = new Audio(audioUrl);
      audio.preload = 'auto';
      audioCache.set(audioUrl, audio);
    }

    audio.playbackRate = rate;
    currentPlayingAudio = audio;

    await audio.play();
    return true;
  } catch (err) {
    console.warn('Backend TTS playback failed, attempting direct online fallback...', err);
  }

  // --- TIER 1.5: Direct Online Google TTS (leveraging no-referrer meta policy) ---
  try {
    const directUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=zh-CN&client=tw-ob&q=${encodeURIComponent(targetText)}`;
    let directAudio = audioCache.get(directUrl);
    if (!directAudio) {
      directAudio = new Audio(directUrl);
      audioCache.set(directUrl, directAudio);
    }
    directAudio.playbackRate = rate;
    currentPlayingAudio = directAudio;
    await directAudio.play();
    return true;
  } catch (directErr) {
    console.warn('Direct online TTS failed, attempting Web Speech API fallback...', directErr);
  }

  // --- TIER 2: Browser Web Speech API Fallback ---
  if ('speechSynthesis' in window) {
    try {
      // Ensure synthesizer is not in a stuck paused state
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }

      const utterance = new SpeechSynthesisUtterance(targetText);
      utterance.lang = 'zh-CN';
      utterance.rate = rate * 0.9;
      utterance.pitch = 1.0;

      if (speechVoice) {
        utterance.voice = speechVoice;
      }

      window.speechSynthesis.speak(utterance);
      return true;
    } catch (speechErr) {
      console.warn('SpeechSynthesis fallback also failed', speechErr);
    }
  }

  return false;
}

/**
 * Play a simulated tone pitch contour using Web Audio API
 */
export function playTonePitch(toneNumber: 1 | 2 | 3 | 4 | 5): void {
  if (typeof window === 'undefined') return;

  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;

    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.25, now + 0.04);

    if (toneNumber === 1) {
      // 55: High flat ~350Hz
      const duration = 0.6;
      osc.frequency.setValueAtTime(360, now);
      osc.frequency.setValueAtTime(360, now + duration);
      gain.gain.setValueAtTime(0.25, now + duration - 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
      osc.start(now);
      osc.stop(now + duration);
    } else if (toneNumber === 2) {
      // 35: Rising ~250Hz -> ~370Hz
      const duration = 0.55;
      osc.frequency.setValueAtTime(250, now);
      osc.frequency.exponentialRampToValueAtTime(370, now + duration);
      gain.gain.setValueAtTime(0.25, now + duration - 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
      osc.start(now);
      osc.stop(now + duration);
    } else if (toneNumber === 3) {
      // 214: Dipping 220Hz -> 170Hz -> 320Hz
      const duration = 0.7;
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(170, now + duration * 0.45);
      osc.frequency.exponentialRampToValueAtTime(320, now + duration);
      gain.gain.setValueAtTime(0.25, now + duration - 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
      osc.start(now);
      osc.stop(now + duration);
    } else if (toneNumber === 4) {
      // 51: Falling 390Hz -> 160Hz
      const duration = 0.45;
      osc.frequency.setValueAtTime(390, now);
      osc.frequency.exponentialRampToValueAtTime(160, now + duration);
      gain.gain.setValueAtTime(0.25, now + duration - 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
      osc.start(now);
      osc.stop(now + duration);
    } else {
      // 5 / Neutral: Short soft drop ~260Hz -> ~200Hz
      const duration = 0.25;
      osc.frequency.setValueAtTime(260, now);
      osc.frequency.exponentialRampToValueAtTime(200, now + duration);
      gain.gain.setValueAtTime(0.15, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
      osc.start(now);
      osc.stop(now + duration);
    }
  } catch (e) {
    console.warn('Audio pitch preview failed', e);
  }
}
