export type ToneNumber = 1 | 2 | 3 | 4 | 5; // 5 = neutral tone

export interface VocabularyItem {
  id: string;
  hanzi: string;
  pinyin: string; // with diacritics e.g. bēi
  pinyinNumbered: string; // e.g. bei1
  pinyinPhoneticId: string; // Indonesian phonetic guide e.g. [pei]
  english: string;
  indonesian: string;
  syllables: 1 | 2;
  shengmu: string; // e.g. "b"
  tonePattern?: string; // e.g. "1", "3+3->2+3", "1+5"
  notes?: string; // Reusable notes for count/color pairing
}

export interface ShengmuItem {
  symbol: string;
  ipa: string;
  articulationGroup: string; // e.g. "Bibir (Labial / 双唇音)"
  articulationId: string; // Indonesian explanation
  aspiration: 'Aspirasi' | 'Non-Aspirasi' | 'Frikatif/Sengau';
  voicing: 'Tak Bersuara (Voiceless)' | 'Bersuara (Voiced)';
  idGuide: string; // Analogi pengucapan bahasa Indonesia
  sampleWords1Syllable: VocabularyItem[];
  sampleWords2Syllable: VocabularyItem[];
}

export interface YunmuItem {
  symbol: string;
  ipa: string;
  category: 'Tunggal (Monoftong)' | 'Campuran (Diftong/Triftong)' | 'Sengau Depan (-n)' | 'Sengau Belakang (-ng)';
  mouthShape: string;
  idGuide: string;
  exampleWord: {
    hanzi: string;
    pinyin: string;
    indonesian: string;
    english: string;
  };
}

export interface ToneItem {
  toneNumber: ToneNumber;
  chineseName: string;
  pinyinName: string;
  pitchContour: string; // e.g. "55"
  symbol: string;
  descriptionId: string;
  descriptionEn: string;
  pitchCurve: number[]; // points for SVG path
}

export interface SpecialToneExample {
  id: string;
  hanzi: string;
  originalPinyin: string;
  spokenPinyin: string;
  numberedPinyin: string;
  phoneticId: string;
  english: string;
  indonesian: string;
  combinationRule: string;
  pitchExplanation: string;
  category: 'sandhi_3_3' | 'neutral_tone';
}

export interface PhoneticRule {
  id: string;
  category: 'shengmu' | 'yunmu' | 'shengdiao' | 'spelling';
  title: string;
  summary: string;
  explanation: string[];
  examples: {
    before: string;
    after: string;
    hanzi?: string;
    note: string;
  }[];
  warningTip?: string;
}
