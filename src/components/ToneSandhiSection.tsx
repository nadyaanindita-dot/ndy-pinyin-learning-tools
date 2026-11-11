import React, { useState } from 'react';
import { Volume2, ArrowRight, Music, AlertCircle, Info } from 'lucide-react';
import { NEUTRAL_TONE_EXAMPLES, TONE_3_3_SANDHI_EXAMPLES } from '../data/toneData';
import { SpecialToneExample } from '../types/pinyin';
import { playChineseSpeech } from '../utils/audio';

export const ToneSandhiSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'sandhi_3_3' | 'neutral_tone'>('sandhi_3_3');
  const [playingId, setPlayingId] = useState<string | null>(null);

  const handlePlayWord = async (item: SpecialToneExample) => {
    setPlayingId(item.id);
    await playChineseSpeech(item.hanzi);
    setTimeout(() => setPlayingId(null), 500);
  };

  return (
    <section id="sandhi-netral" className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header and Context */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-purple-600 dark:text-purple-400">
          <span>Bagian 04</span>
          <span aria-hidden="true">·</span>
          <span>Perubahan Nada Khusus (Sandhi 3+3 & Nada Netral)</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
          Sandhi Nada 3+3 & Pola Ketinggian Nada Netral
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-3xl">
          Dalam percakapan nyata, nada tidak berdiri sendiri secara kaku melainkan mengalami perubahan
          (<em>Tone Sandhi</em>). Di bawah ini dipaparkan <strong>5 contoh kosakata nada 3+3</strong> dan{' '}
          <strong>5 contoh kosakata nada netral</strong> beserta pola perubahan nada pada masing-masing kombinasi.
        </p>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        <button
          onClick={() => setActiveCategory('sandhi_3_3')}
          className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-2 ${
            activeCategory === 'sandhi_3_3'
              ? 'bg-purple-600 text-white shadow-sm'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
          }`}
        >
          <Music className="w-4 h-4" />
          <span>Sandhi Nada 3 + 3 ➔ 2 + 3 (5 Contoh)</span>
        </button>

        <button
          onClick={() => setActiveCategory('neutral_tone')}
          className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-2 ${
            activeCategory === 'neutral_tone'
              ? 'bg-purple-600 text-white shadow-sm'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
          }`}
        >
          <Info className="w-4 h-4" />
          <span>Pola Nada Netral / 轻声 (5 Contoh)</span>
        </button>
      </div>

      {/* SUB-SECTION 1: Sandhi Nada 3+3 */}
      {activeCategory === 'sandhi_3_3' && (
        <div className="space-y-6">
          {/* Theory Banner */}
          <div className="bg-purple-50/80 dark:bg-purple-950/30 p-5 rounded-xl border border-purple-200 dark:border-purple-900/50 space-y-3">
            <div className="flex items-center gap-2 font-bold text-purple-950 dark:text-purple-200 text-base">
              <AlertCircle className="w-5 h-5 text-purple-600" />
              <span>Prinsip Perubahan Sandhi 3 + 3 ➔ 2 + 3</span>
            </div>
            <p className="text-xs sm:text-sm text-purple-900 dark:text-purple-300 leading-relaxed">
              Ketika dua karakter bernada ke-3 (214) berurutan dalam satu frasa, karakter pertama{' '}
              <strong>wajib diucapkan menjadi nada ke-2 (35, nada naik)</strong>. Karakter kedua tetap dilafalkan
              sebagai nada ke-3 (214). Tujuannya agar pita suara tidak lelah meliuk rendah dua kali berturut-turut.
            </p>
            <div className="flex items-center gap-2 font-mono text-xs text-purple-800 dark:text-purple-300 bg-white/70 dark:bg-slate-900/70 p-2.5 rounded-lg border border-purple-200/60 dark:border-purple-800/60">
              <span className="font-bold">PENTING:</span> Dalam penulisan ejaan Pinyin buku teks/kamus tetap tertulis
              tanda nada 3 (nǐ hǎo), namun saat diucapkan berubah menjadi (ní hǎo)!
            </div>
          </div>

          {/* 5 Examples of 3+3 Sandhi */}
          <div className="space-y-4">
            {TONE_3_3_SANDHI_EXAMPLES.map((item, idx) => (
              <div
                key={item.id}
                className={`p-5 rounded-xl border transition-all ${
                  playingId === item.id
                    ? 'bg-purple-50/70 dark:bg-purple-950/40 border-purple-400 ring-1 ring-purple-400'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xs hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Left: Hanzi & Pinyin Shift */}
                  <div className="flex items-center gap-4">
                    <span className="w-7 h-7 rounded-full bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300 font-bold text-xs flex items-center justify-center shrink-0">
                      0{idx + 1}
                    </span>
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="text-3xl font-chinese font-bold text-slate-900 dark:text-slate-100">
                          {item.hanzi}
                        </span>
                        <div className="flex items-center gap-2 text-sm sm:text-base">
                          <span className="line-through text-slate-400 font-mono">
                            {item.originalPinyin}
                          </span>
                          <ArrowRight className="w-4 h-4 text-purple-600" />
                          <span className="font-bold text-purple-600 dark:text-purple-400 font-mono">
                            {item.spokenPinyin}
                          </span>
                        </div>
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-2">
                        <span className="font-mono text-slate-700 dark:text-slate-300 font-medium">
                          Konversi: {item.numberedPinyin}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>Bunyi ID: {item.phoneticId}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Audio Playback Button & Translations */}
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right text-xs">
                      <div className="font-medium text-slate-800 dark:text-slate-200">
                        {item.indonesian}
                      </div>
                      <div className="text-slate-500 dark:text-slate-400">{item.english}</div>
                    </div>
                    <button
                      onClick={() => handlePlayWord(item)}
                      className="p-2.5 bg-purple-50 dark:bg-purple-950/60 hover:bg-purple-100 dark:hover:bg-purple-900 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 rounded-lg transition-colors cursor-pointer"
                      title="Dengarkan pelafalan sandhi nada 3+3"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Explanation Block */}
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-1.5 text-xs">
                  <div className="font-semibold text-purple-800 dark:text-purple-300">
                    {item.combinationRule}
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.pitchExplanation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-SECTION 2: Nada Netral / Qīngshēng */}
      {activeCategory === 'neutral_tone' && (
        <div className="space-y-6">
          {/* Theory Banner */}
          <div className="bg-purple-50/80 dark:bg-purple-950/30 p-5 rounded-xl border border-purple-200 dark:border-purple-900/50 space-y-3">
            <div className="flex items-center gap-2 font-bold text-purple-950 dark:text-purple-200 text-base">
              <Info className="w-5 h-5 text-purple-600" />
              <span>Prinsip Ketinggian Nada Netral (轻声 Qīngshēng)</span>
            </div>
            <p className="text-xs sm:text-sm text-purple-900 dark:text-purple-300 leading-relaxed">
              Nada netral tidak memiliki ketinggian pitch tetap yang berdiri sendiri. Nada ini{' '}
              <strong>selalu bergantung pada nada suku kata yang mendahuluinya</strong>:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-xs">
              <div className="bg-white/80 dark:bg-slate-900/80 p-2.5 rounded-lg border border-purple-200/60 dark:border-purple-800/60">
                <div className="font-bold text-purple-900 dark:text-purple-300">Setelah Nada 1 (55):</div>
                <div className="text-slate-600 dark:text-slate-400 mt-1">
                  Nada netral jatuh rendah ke level <strong>2</strong> (55 ➔ 2).
                </div>
              </div>
              <div className="bg-white/80 dark:bg-slate-900/80 p-2.5 rounded-lg border border-purple-200/60 dark:border-purple-800/60">
                <div className="font-bold text-purple-900 dark:text-purple-300">Setelah Nada 2 (35):</div>
                <div className="text-slate-600 dark:text-slate-400 mt-1">
                  Nada netral mendarat di tengah level <strong>3</strong> (35 ➔ 3).
                </div>
              </div>
              <div className="bg-white/80 dark:bg-slate-900/80 p-2.5 rounded-lg border border-purple-200/60 dark:border-purple-800/60">
                <div className="font-bold text-purple-900 dark:text-purple-300">Setelah Nada 3 (21):</div>
                <div className="text-slate-600 dark:text-slate-400 mt-1">
                  Nada netral memantul TINGGI ke level <strong>4</strong> (21 ➔ 4).
                </div>
              </div>
              <div className="bg-white/80 dark:bg-slate-900/80 p-2.5 rounded-lg border border-purple-200/60 dark:border-purple-800/60">
                <div className="font-bold text-purple-900 dark:text-purple-300">Setelah Nada 4 (51):</div>
                <div className="text-slate-600 dark:text-slate-400 mt-1">
                  Nada netral jatuh ke dasar level <strong>1</strong> (51 ➔ 1).
                </div>
              </div>
            </div>
          </div>

          {/* 5 Examples of Neutral Tone */}
          <div className="space-y-4">
            {NEUTRAL_TONE_EXAMPLES.map((item, idx) => (
              <div
                key={item.id}
                className={`p-5 rounded-xl border transition-all ${
                  playingId === item.id
                    ? 'bg-purple-50/70 dark:bg-purple-950/40 border-purple-400 ring-1 ring-purple-400'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xs hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Left: Hanzi & Pinyin */}
                  <div className="flex items-center gap-4">
                    <span className="w-7 h-7 rounded-full bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300 font-bold text-xs flex items-center justify-center shrink-0">
                      0{idx + 1}
                    </span>
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="text-3xl font-chinese font-bold text-slate-900 dark:text-slate-100">
                          {item.hanzi}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-purple-600 dark:text-purple-400 font-mono text-lg">
                            {item.spokenPinyin}
                          </span>
                          <span className="text-xs text-slate-400 font-mono">
                            (asal: {item.originalPinyin})
                          </span>
                        </div>
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-2">
                        <span className="font-mono text-slate-700 dark:text-slate-300 font-medium">
                          Konversi: {item.numberedPinyin}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>Pelafalan: {item.phoneticId}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Audio Playback Button & Translations */}
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right text-xs">
                      <div className="font-medium text-slate-800 dark:text-slate-200">
                        {item.indonesian}
                      </div>
                      <div className="text-slate-500 dark:text-slate-400">{item.english}</div>
                    </div>
                    <button
                      onClick={() => handlePlayWord(item)}
                      className="p-2.5 bg-purple-50 dark:bg-purple-950/60 hover:bg-purple-100 dark:hover:bg-purple-900 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 rounded-lg transition-colors cursor-pointer"
                      title="Dengarkan pelafalan nada netral"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Explanation Block */}
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-1.5 text-xs">
                  <div className="font-semibold text-purple-800 dark:text-purple-300">
                    {item.combinationRule}
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.pitchExplanation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
