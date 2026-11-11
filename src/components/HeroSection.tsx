import React, { useState } from 'react';
import { Volume2, BookOpen, Sparkles, ArrowRight } from 'lucide-react';
import { playChineseSpeech, playTonePitch } from '../utils/audio';

interface HeroSectionProps {
  onExplore: (tab: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExplore }) => {
  const [demoInit, setDemoInit] = useState('sh');
  const [demoFinal, setDemoFinal] = useState('ū');
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayFormula = async () => {
    setIsPlaying(true);
    playTonePitch(1);
    await playChineseSpeech('书');
    setTimeout(() => setIsPlaying(false), 400);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-red-50/60 via-white to-slate-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-950 border-b border-slate-200 dark:border-slate-800 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Heading and Context */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-red-700 dark:text-red-400">
              <span className="uppercase tracking-wider">Modul Fonetik Bahasa Mandarin</span>
              <span aria-hidden="true">·</span>
              <span>Standar Hanyu Pinyin (汉语拼音)</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight leading-tight text-balance">
              Fondasi Terstruktur Belajar{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-amber-600 dark:from-red-400 dark:to-amber-400">
                Pinyin Mandarin
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
              Panduan interaktif lengkap mencakup <strong>23 Shengmu</strong> (konsonan awal),{' '}
              <strong>Yunmu</strong> (vokal & diftong), <strong>Shengdiao</strong> (kontur 4 nada + netral),{' '}
              aturan sandhi 3+3, serta 138 contoh kosakata 1 dan 2 silabel yang dirancang siap pakai untuk materi
              berhitung dan warna.
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg">
                <div className="text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-slate-100">
                  21+2
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Shengmu Inisial</div>
              </div>
              <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg">
                <div className="text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-slate-100">
                  36
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Yunmu Vokal</div>
              </div>
              <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg">
                <div className="text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-slate-100">
                  4+1
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Shengdiao Nada</div>
              </div>
              <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg">
                <div className="text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-slate-100">
                  138
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Kosakata Contoh</div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onExplore('shengmu')}
                className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium text-sm rounded-lg transition-colors flex items-center gap-2 shadow-sm cursor-pointer"
              >
                <span>Pelajari Shengmu</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onExplore('latihan')}
                className="px-5 py-2.5 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium text-sm rounded-lg border border-slate-300 dark:border-slate-700 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-red-600 dark:text-red-400" />
                <span>Mulai Latihan Membaca</span>
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Syllable Anatomy Sandbox */}
          <div className="lg:col-span-5">
            <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Struktur Anatomi Silabel Mandarin</span>
                </div>
                <span className="text-xs font-mono text-slate-400">Syllable Formula</span>
              </div>

              {/* Anatomy Diagram */}
              <div className="bg-slate-50 dark:bg-slate-950 p-6 rounded-lg text-center border border-slate-100 dark:border-slate-800/80">
                <div className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                  Kombinasi Suku Kata Mandarin:
                </div>
                <div className="flex items-center justify-center gap-2 sm:gap-3 text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
                  <span className="p-2 sm:px-3 bg-red-100/70 dark:bg-red-950/60 text-red-600 dark:text-red-400 rounded-md font-mono">
                    {demoInit}
                  </span>
                  <span className="text-slate-400 text-lg">+</span>
                  <span className="p-2 sm:px-3 bg-amber-100/70 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 rounded-md font-mono">
                    {demoFinal}
                  </span>
                  <span className="text-slate-400 text-lg">=</span>
                  <span className="p-2 sm:px-4 bg-emerald-100/70 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 rounded-md font-mono">
                    {demoInit + demoFinal}
                  </span>
                </div>

                {/* Sub-label indicators */}
                <div className="flex justify-center gap-6 mt-3 text-[11px] text-slate-500 dark:text-slate-400">
                  <span className="text-red-600 dark:text-red-400 font-medium">Shengmu (Inisial)</span>
                  <span className="text-amber-600 dark:text-amber-400 font-medium">Yunmu + Nada 1</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium">Kata: 书 (Buku)</span>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-center gap-4">
                  <button
                    onClick={handlePlayFormula}
                    disabled={isPlaying}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-transform active:scale-95 cursor-pointer disabled:opacity-60"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Dengarkan Bunyi Suku Kata</span>
                  </button>
                </div>
              </div>

              {/* Interactive Formula Switcher */}
              <div className="space-y-2">
                <div className="text-xs font-medium text-slate-600 dark:text-slate-300">
                  Coba Ganti Konsonan & Vokal Contoh:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { init: 'sh', fin: 'ū', word: '书 (Buku / Book)', speech: '书' },
                    { init: 'b', fin: 'ēi', word: '杯 (Cangkir / Cup)', speech: '杯' },
                    { init: 'm', fin: 'āo', word: '猫 (Kucing / Cat)', speech: '猫' },
                    { init: 'ch', fin: 'ē', word: '车 (Mobil / Car)', speech: '车' },
                    { init: 'd', fin: 'ēng', word: '灯 (Lampu / Lamp)', speech: '灯' },
                  ].map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setDemoInit(item.init);
                        setDemoFinal(item.fin);
                        playChineseSpeech(item.speech);
                      }}
                      className={`px-2.5 py-1 text-xs rounded-md border transition-all cursor-pointer ${
                        demoInit === item.init && demoFinal === item.fin
                          ? 'bg-red-600 text-white border-red-600 font-semibold'
                          : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                      }`}
                    >
                      {item.init} + {item.fin} ➔ {item.word}
                    </button>
                  ))}
                </div>
              </div>

              <div className="text-xs text-slate-500 dark:text-slate-400 bg-amber-50 dark:bg-amber-950/30 p-3 rounded-lg border border-amber-200 dark:border-amber-900/50">
                <strong className="text-amber-800 dark:text-amber-300">Tips Pembelajar:</strong> Kosakata contoh yang digunakan sengaja dipilih dari benda sehari-hari (buku, tas, mobil, cangkir, kucing) agar langsung dapat dipasangkan saat Anda mempelajari angka dan warna nanti!
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
