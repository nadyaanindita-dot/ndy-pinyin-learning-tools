import React from 'react';
import { BookOpen, Sparkles } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 dark:text-slate-100 text-lg">
                PinyinMaster
              </span>
              <span className="font-chinese text-sm font-semibold text-red-600 dark:text-red-400">
                拼音学堂
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md">
              Media pembelajaran fonetik bahasa Mandarin interaktif: Inisial (Shengmu), Vokal (Yunmu),
              Nada (Shengdiao), aturan perubahan nada, serta latihan membaca dasar.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 text-xs font-medium text-slate-600 dark:text-slate-400">
            <button
              onClick={() => onSelectTab('shengmu')}
              className="hover:text-red-600 dark:hover:text-red-400 transition-colors cursor-pointer"
            >
              Shengmu (23 Inisial)
            </button>
            <button
              onClick={() => onSelectTab('yunmu')}
              className="hover:text-red-600 dark:hover:text-red-400 transition-colors cursor-pointer"
            >
              Yunmu (36 Vokal)
            </button>
            <button
              onClick={() => onSelectTab('shengdiao')}
              className="hover:text-red-600 dark:hover:text-red-400 transition-colors cursor-pointer"
            >
              Shengdiao (Nada)
            </button>
            <button
              onClick={() => onSelectTab('sandhi-netral')}
              className="hover:text-red-600 dark:hover:text-red-400 transition-colors cursor-pointer"
            >
              Sandhi 3+3 & Netral
            </button>
            <button
              onClick={() => onSelectTab('aturan')}
              className="hover:text-red-600 dark:hover:text-red-400 transition-colors cursor-pointer"
            >
              Aturan Fonetik
            </button>
            <button
              onClick={() => onSelectTab('latihan')}
              className="hover:text-red-600 dark:hover:text-red-400 transition-colors cursor-pointer"
            >
              Latihan Membaca
            </button>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>
              Seluruh contoh kosakata (138 kata) bebas kata angka & warna, siap dipakai kembali saat mempelajari angka & warna.
            </span>
          </div>
          <div>© {new Date().getFullYear()} PinyinMaster. Sistem Fonetik Hanyu Pinyin Standar.</div>
        </div>
      </div>
    </footer>
  );
};
