import React, { useState, useMemo } from 'react';
import { Volume2, Search, Table, Grid, LayoutGrid, CheckCircle2 } from 'lucide-react';
import { SHENGMU_LIST } from '../data/shengmuData';
import { ShengmuItem, VocabularyItem } from '../types/pinyin';
import { playChineseSpeech } from '../utils/audio';

export const ShengmuSection: React.FC = () => {
  const [selectedGroup, setSelectedGroup] = useState<string>('all');
  const [syllableFilter, setSyllableFilter] = useState<'all' | '1' | '2'>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [viewMode, setViewMode] = useState<'cards' | 'table' | 'soundboard'>('cards');
  const [activePlayingId, setActivePlayingId] = useState<string | null>(null);

  const articulationGroups = [
    { id: 'all', label: 'Semua (23)' },
    { id: 'Bibir', label: 'Bibir (b, p, m, f)' },
    { id: 'Ujung Lidah', label: 'Ujung Lidah (d, t, n, l)' },
    { id: 'Pangkal Lidah', label: 'Pangkal Lidah (g, k, h)' },
    { id: 'Permukaan Lidah', label: 'Palatal (j, q, x)' },
    { id: 'Lidah Ditekuk', label: 'Retrofleks (zh, ch, sh, r)' },
    { id: 'Gigi Seri', label: 'Dental (z, c, s)' },
    { id: 'Semi-vokal', label: 'Semi-vokal (y, w)' },
  ];

  const filteredShengmu = useMemo(() => {
    return SHENGMU_LIST.filter((item) => {
      const matchesGroup =
        selectedGroup === 'all' || item.articulationGroup.includes(selectedGroup);

      const matchesSearch =
        searchTerm === '' ||
        item.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.idGuide.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.sampleWords1Syllable.some(
          (w) =>
            w.hanzi.includes(searchTerm) ||
            w.pinyin.toLowerCase().includes(searchTerm.toLowerCase()) ||
            w.indonesian.toLowerCase().includes(searchTerm.toLowerCase()) ||
            w.english.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        item.sampleWords2Syllable.some(
          (w) =>
            w.hanzi.includes(searchTerm) ||
            w.pinyin.toLowerCase().includes(searchTerm.toLowerCase()) ||
            w.indonesian.toLowerCase().includes(searchTerm.toLowerCase()) ||
            w.english.toLowerCase().includes(searchTerm.toLowerCase())
        );

      return matchesGroup && matchesSearch;
    });
  }, [selectedGroup, searchTerm]);

  const handlePlayWord = async (word: VocabularyItem) => {
    setActivePlayingId(word.id);
    await playChineseSpeech(word.hanzi);
    setTimeout(() => setActivePlayingId(null), 500);
  };

  const handlePlayShengmu = async (item: ShengmuItem) => {
    setActivePlayingId(item.symbol);
    // Standard pinyin sound approximation
    // Shengmu is usually read with a helper vowel (b->bo, p->po, m->mo, f->fo, d->de, etc.)
    const helperMap: Record<string, string> = {
      b: '波',
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
    };
    const speechText = helperMap[item.symbol] || item.symbol;
    await playChineseSpeech(speechText);
    setTimeout(() => setActivePlayingId(null), 500);
  };

  return (
    <section id="shengmu" className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header and Context */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-red-600 dark:text-red-400">
          <span>Bagian 01</span>
          <span aria-hidden="true">·</span>
          <span>Shengmu (声母) - Inisial / Konsonan Awal</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
          21 Konsonan Awal Standar + 2 Inisial Khusus (y, w)
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-3xl">
          Dalam sistem fonetik Pinyin, hampir setiap suku kata diawali oleh <strong>Shengmu</strong>.
          Di bawah ini tersedia tabel panduan artikulasi pelafalan lengkap, diikuti 3 contoh kosakata 1 silabel dan
          3 contoh kosakata 2 silabel untuk <strong>seluruh Shengmu</strong> (total 138 kosakata).
        </p>
      </div>

      {/* Control Bar: Filter, Search, View Mode */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        {/* Top line: Search and View Mode */}
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari shengmu (misal: zh, b), kata, pinyin, atau arti..."
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-slate-900 dark:text-slate-100 placeholder-slate-400"
            />
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
              <button
                onClick={() => setViewMode('cards')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${
                  viewMode === 'cards'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                <Grid className="w-3.5 h-3.5" />
                <span>Kartu Kosakata</span>
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${
                  viewMode === 'table'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                <Table className="w-3.5 h-3.5" />
                <span>Tabel Artikulasi</span>
              </button>
              <button
                onClick={() => setViewMode('soundboard')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${
                  viewMode === 'soundboard'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Soundboard Cepat</span>
              </button>
            </div>
          </div>
        </div>

        {/* Articulation Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs text-slate-400 dark:text-slate-500 whitespace-nowrap shrink-0 mr-1">
            Grup Titik Artikulasi:
          </span>
          {articulationGroups.map((grp) => (
            <button
              key={grp.id}
              onClick={() => setSelectedGroup(grp.id)}
              className={`px-2.5 py-1 text-xs rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                selectedGroup === grp.id
                  ? 'bg-red-600 text-white font-medium shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {grp.label}
            </button>
          ))}
        </div>

        {/* Syllable Filter when in card mode */}
        {viewMode === 'cards' && (
          <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
            <span>Filter Contoh Kosakata:</span>
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-0.5 rounded-md">
              <button
                onClick={() => setSyllableFilter('all')}
                className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                  syllableFilter === 'all'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-medium shadow-xs'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Semua (3 1-Silabel + 3 2-Silabel)
              </button>
              <button
                onClick={() => setSyllableFilter('1')}
                className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                  syllableFilter === '1'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-medium shadow-xs'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                1 Silabel Saja (3 Contoh)
              </button>
              <button
                onClick={() => setSyllableFilter('2')}
                className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                  syllableFilter === '2'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-medium shadow-xs'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                2 Silabel Saja (3 Contoh)
              </button>
            </div>
          </div>
        )}
      </div>

      {/* VIEW 1: Soundboard Cepat (Grid) */}
      {viewMode === 'soundboard' && (
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
          {filteredShengmu.map((item) => (
            <button
              key={item.symbol}
              onClick={() => handlePlayShengmu(item)}
              className={`p-4 rounded-xl border text-center transition-all group hover:border-red-500 hover:shadow-md cursor-pointer ${
                activePlayingId === item.symbol
                  ? 'bg-red-50 dark:bg-red-950/40 border-red-500 ring-2 ring-red-500'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
              }`}
            >
              <div className="text-3xl font-extrabold font-mono text-red-600 dark:text-red-400 group-hover:scale-110 transition-transform">
                {item.symbol}
              </div>
              <div className="text-xs font-mono text-slate-400 dark:text-slate-500 mt-1">
                {item.ipa}
              </div>
              <div className="mt-2 flex items-center justify-center gap-1 text-[11px] text-slate-500 dark:text-slate-400">
                <Volume2 className="w-3 h-3 text-red-500" />
                <span>Dengar</span>
              </div>
              <div className="text-[10px] text-slate-400 dark:text-slate-500 truncate mt-1">
                {item.aspiration}
              </div>
            </button>
          ))}
        </div>
      )}

      {/* VIEW 2: Tabel Panduan Pelafalan Lengkap */}
      {viewMode === 'table' && (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              Tabel Panduan Artikulasi & Pelafalan Shengmu
            </h3>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              Total {filteredShengmu.length} Shengmu
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="px-4 py-3">Shengmu</th>
                  <th className="px-3 py-3">IPA</th>
                  <th className="px-4 py-3">Grup Titik Artikulasi</th>
                  <th className="px-4 py-3">Hembusan / Pita Suara</th>
                  <th className="px-4 py-3 min-w-[280px]">Panduan Analogi Bunyi Bahasa Indonesia</th>
                  <th className="px-4 py-3 text-center">Audio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {filteredShengmu.map((item) => (
                  <tr
                    key={item.symbol}
                    className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="px-4 py-3 font-mono font-bold text-base text-red-600 dark:text-red-400">
                      {item.symbol}
                    </td>
                    <td className="px-3 py-3 font-mono text-slate-500 dark:text-slate-400">
                      {item.ipa}
                    </td>
                    <td className="px-4 py-3 text-slate-800 dark:text-slate-200">
                      <div className="font-medium">{item.articulationGroup}</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
                        {item.articulationId}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-0.5 text-xs">
                        <span
                          className={`font-medium ${
                            item.aspiration === 'Aspirasi'
                              ? 'text-amber-600 dark:text-amber-400'
                              : item.aspiration === 'Non-Aspirasi'
                              ? 'text-blue-600 dark:text-blue-400'
                              : 'text-purple-600 dark:text-purple-400'
                          }`}
                        >
                          {item.aspiration}
                        </span>
                        <span className="text-[11px] text-slate-400 dark:text-slate-500">
                          {item.voicing}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-700 dark:text-slate-300">
                      {item.idGuide}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => handlePlayShengmu(item)}
                        className="p-2 text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                        title={`Dengarkan pelafalan ${item.symbol}`}
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VIEW 3: Kartu Kosakata per Shengmu (3 1-Silabel & 3 2-Silabel Lengkap) */}
      {viewMode === 'cards' && (
        <div className="space-y-8">
          {filteredShengmu.map((shengmu) => {
            const show1Syllable = syllableFilter === 'all' || syllableFilter === '1';
            const show2Syllable = syllableFilter === 'all' || syllableFilter === '2';

            return (
              <div
                key={shengmu.symbol}
                className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden"
              >
                {/* Shengmu Header Bar */}
                <div className="px-6 py-4 bg-slate-50/80 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 flex items-center justify-center bg-red-600 text-white rounded-lg font-mono font-bold text-2xl shadow-xs">
                      {shengmu.symbol}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-900 dark:text-slate-100">
                          {shengmu.articulationGroup}
                        </span>
                        <span className="text-xs font-mono text-slate-400">{shengmu.ipa}</span>
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {shengmu.idGuide}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                      {shengmu.aspiration} · {shengmu.voicing}
                    </span>
                    <button
                      onClick={() => handlePlayShengmu(shengmu)}
                      className="px-3 py-1.5 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-red-600" />
                      <span>Pelafalan Inisial</span>
                    </button>
                  </div>
                </div>

                {/* Vocabulary Showcase */}
                <div className="p-6 space-y-6">
                  {/* 1-Syllable Words (3 Contoh) */}
                  {show1Syllable && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                          <span>3 Contoh Kosakata 1 Silabel:</span>
                        </div>
                        <span className="text-slate-400">1 Suku Kata Dasar</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {shengmu.sampleWords1Syllable.map((word) => (
                          <div
                            key={word.id}
                            className={`p-4 rounded-lg border transition-all ${
                              activePlayingId === word.id
                                ? 'bg-red-50/70 dark:bg-red-950/40 border-red-400 ring-1 ring-red-400'
                                : 'bg-slate-50/50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700'
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <div>
                                <div className="text-3xl font-chinese font-bold text-slate-900 dark:text-slate-100">
                                  {word.hanzi}
                                </div>
                                <div className="text-lg font-bold text-red-600 dark:text-red-400 mt-0.5">
                                  {word.pinyin}
                                </div>
                              </div>
                              <button
                                onClick={() => handlePlayWord(word)}
                                className="p-2 text-slate-500 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400 hover:bg-white dark:hover:bg-slate-800 rounded-full transition-colors cursor-pointer"
                                title="Putar audio pengucapan"
                              >
                                <Volume2 className="w-4 h-4" />
                              </button>
                            </div>

                            {/* Pinyin Konversi & Panduan Fonetik */}
                            <div className="mt-2 text-xs space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="text-slate-400 dark:text-slate-500">Konversi:</span>
                                <span className="font-mono font-medium text-slate-700 dark:text-slate-300">
                                  {word.pinyinNumbered}
                                </span>
                              </div>
                              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                                Bunyi: {word.pinyinPhoneticId}
                              </div>
                            </div>

                            {/* Translations */}
                            <div className="mt-3 pt-3 border-t border-slate-200/80 dark:border-slate-800 text-xs space-y-1">
                              <div>
                                <span className="text-slate-400 dark:text-slate-500">ID: </span>
                                <span className="font-medium text-slate-800 dark:text-slate-200">
                                  {word.indonesian}
                                </span>
                              </div>
                              <div>
                                <span className="text-slate-400 dark:text-slate-500">EN: </span>
                                <span className="text-slate-600 dark:text-slate-400">
                                  {word.english}
                                </span>
                              </div>
                            </div>

                            {/* Reusable Pairing Note */}
                            {word.notes && (
                              <div className="mt-2.5 text-[11px] text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/30 p-1.5 rounded border border-amber-200/60 dark:border-amber-900/40">
                                💡 {word.notes}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 2-Syllable Words (3 Contoh) */}
                  {show2Syllable && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
                          <span>3 Contoh Kosakata 2 Silabel:</span>
                        </div>
                        <span className="text-slate-400">2 Suku Kata Gabungan</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {shengmu.sampleWords2Syllable.map((word) => (
                          <div
                            key={word.id}
                            className={`p-4 rounded-lg border transition-all ${
                              activePlayingId === word.id
                                ? 'bg-red-50/70 dark:bg-red-950/40 border-red-400 ring-1 ring-red-400'
                                : 'bg-slate-50/50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700'
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <div>
                                <div className="text-2xl font-chinese font-bold text-slate-900 dark:text-slate-100">
                                  {word.hanzi}
                                </div>
                                <div className="text-base font-bold text-red-600 dark:text-red-400 mt-0.5">
                                  {word.pinyin}
                                </div>
                              </div>
                              <button
                                onClick={() => handlePlayWord(word)}
                                className="p-2 text-slate-500 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400 hover:bg-white dark:hover:bg-slate-800 rounded-full transition-colors cursor-pointer"
                                title="Putar audio pengucapan"
                              >
                                <Volume2 className="w-4 h-4" />
                              </button>
                            </div>

                            {/* Pinyin Konversi & Panduan Fonetik */}
                            <div className="mt-2 text-xs space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="text-slate-400 dark:text-slate-500">Konversi:</span>
                                <span className="font-mono font-medium text-slate-700 dark:text-slate-300">
                                  {word.pinyinNumbered}
                                </span>
                              </div>
                              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                                Bunyi: {word.pinyinPhoneticId}
                              </div>
                            </div>

                            {/* Translations */}
                            <div className="mt-3 pt-3 border-t border-slate-200/80 dark:border-slate-800 text-xs space-y-1">
                              <div>
                                <span className="text-slate-400 dark:text-slate-500">ID: </span>
                                <span className="font-medium text-slate-800 dark:text-slate-200">
                                  {word.indonesian}
                                </span>
                              </div>
                              <div>
                                <span className="text-slate-400 dark:text-slate-500">EN: </span>
                                <span className="text-slate-600 dark:text-slate-400">
                                  {word.english}
                                </span>
                              </div>
                            </div>

                            {/* Reusable Pairing Note */}
                            {word.notes && (
                              <div className="mt-2.5 text-[11px] text-blue-800 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/30 p-1.5 rounded border border-blue-200/60 dark:border-blue-900/40">
                                💡 {word.notes}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
