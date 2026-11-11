import React, { useState } from 'react';
import { Volume2, Sparkles, Filter } from 'lucide-react';
import { YUNMU_LIST } from '../data/yunmuData';
import { YunmuItem } from '../types/pinyin';
import { playChineseSpeech } from '../utils/audio';

export const YunmuSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activePlaying, setActivePlaying] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'Semua (36 Vokal)' },
    { id: 'Tunggal (Monoftong)', label: '6 Vokal Tunggal (a, o, e, i, u, ü)' },
    { id: 'Campuran (Diftong/Triftong)', label: 'Vokal Campuran (Diftong/Triftong)' },
    { id: 'Sengau Depan (-n)', label: 'Sengau Depan (-n)' },
    { id: 'Sengau Belakang (-ng)', label: 'Sengau Belakang (-ng)' },
  ];

  const filteredYunmu =
    activeCategory === 'all'
      ? YUNMU_LIST
      : YUNMU_LIST.filter((y) => y.category === activeCategory);

  const handlePlayYunmu = async (item: YunmuItem) => {
    setActivePlaying(item.symbol);
    // Play example word
    await playChineseSpeech(item.exampleWord.hanzi);
    setTimeout(() => setActivePlaying(null), 500);
  };

  return (
    <section id="yunmu" className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header and Context */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-600 dark:text-amber-400">
          <span>Bagian 02</span>
          <span aria-hidden="true">·</span>
          <span>Yunmu (韵母) - Final / Vokal & Diftong</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
          Sistem Vokal Bahasa Mandarin (36 Yunmu)
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-3xl">
          <strong>Yunmu</strong> adalah bagian inti atau penutup dari sebuah suku kata. Terdiri dari 6 vokal tunggal
          dasar (a, o, e, i, u, ü), vokal majemuk (diftong & triftong), serta vokal berakhiran sengau depan (-n)
          dan belakang (-ng).
        </p>
      </div>

      {/* Category Filter */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-1.5 text-xs text-slate-400 mr-2">
          <Filter className="w-3.5 h-3.5" />
          <span>Kategori:</span>
        </div>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              activeCategory === cat.id
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Yunmu Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredYunmu.map((item) => (
          <div
            key={item.symbol}
            className={`p-5 rounded-xl border transition-all ${
              activePlaying === item.symbol
                ? 'bg-amber-50/70 dark:bg-amber-950/40 border-amber-400 ring-1 ring-amber-400'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="text-2xl font-mono font-bold text-amber-600 dark:text-amber-400">
                  {item.symbol}
                </div>
                <div className="text-xs font-mono text-slate-400 dark:text-slate-500">
                  IPA: {item.ipa}
                </div>
              </div>
              <button
                onClick={() => handlePlayYunmu(item)}
                className="p-2 text-slate-500 hover:text-amber-600 dark:text-slate-400 dark:hover:text-amber-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                title={`Dengarkan contoh kata ${item.exampleWord.hanzi}`}
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            {/* Shape and Guide */}
            <div className="mt-3 space-y-2 text-xs">
              <div className="text-slate-600 dark:text-slate-300">
                <span className="font-semibold text-slate-700 dark:text-slate-200">Bentuk Mulut: </span>
                {item.mouthShape}
              </div>
              <div className="text-slate-500 dark:text-slate-400">
                <span className="font-semibold text-slate-600 dark:text-slate-300">Analogi ID: </span>
                {item.idGuide}
              </div>
            </div>

            {/* Example Word */}
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="text-lg font-chinese font-bold text-slate-900 dark:text-slate-100">
                  {item.exampleWord.hanzi}
                </span>
                <span className="font-semibold text-red-600 dark:text-red-400 font-mono">
                  {item.exampleWord.pinyin}
                </span>
              </div>
              <div className="text-right text-[11px] text-slate-500 dark:text-slate-400">
                <div>{item.exampleWord.indonesian}</div>
                <div className="text-[10px] text-slate-400 dark:text-slate-500">{item.exampleWord.english}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Special Notice for Beginners */}
      <div className="p-4 bg-amber-50/80 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-900/40 text-xs sm:text-sm text-amber-900 dark:text-amber-200 flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="font-semibold">Perhatian Khusus Huruf "ü" (Umlaut):</div>
          <p className="text-amber-800 dark:text-amber-300 leading-relaxed">
            Huruf "ü" adalah vokal depan bundar khas Mandarin. Bentuk bibir bulat seperti hendak bersiul mengucap "u",
            namun lidah di dalam mulut diposisikan mengucap "i". Ingat: ketika bersanding dengan <strong>j, q, x, y</strong>,
            kedua titik di atas ü wajib dilepas (ju, qu, xu, yu)!
          </p>
        </div>
      </div>
    </section>
  );
};
