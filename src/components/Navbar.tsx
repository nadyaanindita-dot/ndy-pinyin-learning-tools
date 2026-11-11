import React, { useState } from 'react';
import { Volume2, Moon, Sun } from 'lucide-react';
import { playChineseSpeech, setPlaybackSpeed } from '../utils/audio';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isDark: boolean;
  setIsDark: (dark: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  isDark,
  setIsDark,
}) => {
  const [speed, setSpeed] = useState(1.0);
  const navItems = [
    { id: 'shengmu', label: 'Shengmu (Inisial)' },
    { id: 'yunmu', label: 'Yunmu (Final)' },
    { id: 'shengdiao', label: 'Shengdiao (Nada)' },
    { id: 'sandhi-netral', label: 'Sandhi 3+3 & Netral' },
    { id: 'aturan', label: 'Aturan Fonetik' },
    { id: 'latihan', label: 'Latihan Membaca' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text wordmark */}
        <button
          onClick={() => setActiveTab('shengmu')}
          className="text-left group cursor-pointer focus:outline-none"
        >
          <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 whitespace-nowrap shrink-0 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
            PinyinMaster
          </span>
          <span className="ml-2 font-chinese text-sm font-semibold text-red-600 dark:text-red-400">
            拼音学堂
          </span>
        </button>

        {/* Zone 2: Clean single-line nav links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer border-b-2 text-sm ${
                activeTab === item.id
                  ? 'border-red-600 text-red-600 dark:text-red-400 dark:border-red-400 font-semibold'
                  : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: 1 Primary Action + Quick Controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Audio Speed Toggle (1x vs 0.75x) */}
          <button
            onClick={() => {
              const nextSpeed = speed === 1.0 ? 0.75 : 1.0;
              setSpeed(nextSpeed);
              setPlaybackSpeed(nextSpeed);
            }}
            title="Kecepatan pelafalan audio"
            className="px-2.5 py-1 text-xs font-mono font-semibold rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer"
          >
            {speed === 1.0 ? '1.0x' : '0.75x Pelan'}
          </button>

          <button
            onClick={() => playChineseSpeech('你好！欢迎学习拼音。')}
            title="Uji coba suara standar Mandarin"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors cursor-pointer shadow-xs"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Uji Audio</span>
          </button>

          <button
            onClick={() => setIsDark(!isDark)}
            aria-label="Toggle dark mode"
            className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Subnavigation Row */}
      <div className="lg:hidden flex items-center gap-2 overflow-x-auto px-4 py-2 border-t border-slate-100 dark:border-slate-800/80 scrollbar-none text-xs">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`whitespace-nowrap px-3 py-1.5 rounded-full transition-colors font-medium shrink-0 ${
              activeTab === item.id
                ? 'bg-red-600 text-white dark:bg-red-600'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
};
