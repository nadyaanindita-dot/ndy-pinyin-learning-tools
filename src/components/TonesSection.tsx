import React, { useState } from 'react';
import { Volume2, Play, Activity } from 'lucide-react';
import { TONES_LIST } from '../data/toneData';
import { ToneItem } from '../types/pinyin';
import { playChineseSpeech, playTonePitch } from '../utils/audio';

export const TonesSection: React.FC = () => {
  const [activeTone, setActiveTone] = useState<ToneItem>(TONES_LIST[0]);
  const [isPlayingSynth, setIsPlayingSynth] = useState(false);

  const sampleSyllables = [
    { base: 'ma', t1: 'mā (Ibu)', t2: 'má (Rami)', t3: 'mǎ (Kuda)', t4: 'mà (Memarahi)', t5: 'ma (Partikel tanya)' },
    { base: 'ba', t1: 'bā (Delapan)', t2: 'bá (Mencabut)', t3: 'bǎ (Gagang)', t4: 'bà (Ayah)', t5: 'ba (Partikel anjuran)' },
    { base: 'shu', t1: 'shū (Buku)', t2: 'shú (Matang)', t3: 'shǔ (Menghitung)', t4: 'shù (Pohon)', t5: 'shu (Ringan)' },
  ];

  const handlePlayTone = async (tone: ToneItem) => {
    setActiveTone(tone);
    setIsPlayingSynth(true);
    // Play pitch glide
    playTonePitch(tone.toneNumber);
    // Then play sample speech
    const sampleText = tone.toneNumber === 1 ? '妈' : tone.toneNumber === 2 ? '麻' : tone.toneNumber === 3 ? '马' : tone.toneNumber === 4 ? '骂' : '吗';
    await playChineseSpeech(sampleText);
    setTimeout(() => setIsPlayingSynth(false), 500);
  };

  return (
    <section id="shengdiao" className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header and Context */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
          <span>Bagian 03</span>
          <span aria-hidden="true">·</span>
          <span>Shengdiao (声调) - 4 Nada Utama & Nada Netral</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
          Sistem Nada Bahasa Mandarin: Satu Suku Kata Beragam Makna
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-3xl">
          Bahasa Mandarin adalah <em>tonal language</em>. Perubahan tinggi-rendahnya intonasi nada (pitch)
          secara langsung membedakan arti kata secara fundamental. Terdapat 4 nada bernomor (1, 2, 3, 4)
          dan 1 nada ringan tanpa diakritik (nada netral / qīngshēng).
        </p>
      </div>

      {/* Interactive 5-Level Pitch Grid & Tone Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: 4 Tones + Neutral selector */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Pilih Nada untuk Melihat & Mendengarkan Kontur:
          </div>
          {TONES_LIST.map((tone) => {
            const isSelected = activeTone.toneNumber === tone.toneNumber;
            return (
              <div
                key={tone.toneNumber}
                onClick={() => handlePlayTone(tone)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-500 shadow-sm'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${
                        isSelected
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {tone.toneNumber === 5 ? '·' : tone.toneNumber}
                    </span>
                    <div>
                      <div className="font-semibold text-sm text-slate-900 dark:text-slate-100">
                        {tone.chineseName}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {tone.pinyinName} · Kontur {tone.pitchContour}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-mono text-base font-bold text-emerald-600 dark:text-emerald-400">
                      {tone.symbol}
                    </span>
                    <button
                      className="p-1.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300"
                      title="Dengar nada"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="mt-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {tone.descriptionId}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Visual Pitch Contour Visualizer Canvas */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">
                Diagram Kontur Nada 5 Tingkat (Five-Scale Pitch Diagram)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Skala nada standar Chao Yuen Ren (Tingkat 1 terendah s/d Tingkat 5 tertinggi)
              </p>
            </div>
            <button
              onClick={() => handlePlayTone(activeTone)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-transform active:scale-95 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Putar Nada Terpilih</span>
            </button>
          </div>

          {/* SVG Pitch Canvas */}
          <div className="relative w-full h-64 bg-slate-50 dark:bg-slate-950 rounded-xl p-4 border border-slate-100 dark:border-slate-800 flex items-center justify-center">
            {/* 5-Level Reference Lines */}
            <div className="absolute inset-x-8 inset-y-6 flex flex-col justify-between pointer-events-none">
              {[5, 4, 3, 2, 1].map((level) => (
                <div key={level} className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-slate-400 w-4 text-right">
                    {level}
                  </span>
                  <div className="flex-1 border-b border-dashed border-slate-200 dark:border-slate-800" />
                  <span className="text-[10px] text-slate-400 font-mono">
                    {level === 5 ? 'Tinggi' : level === 3 ? 'Sedang' : level === 1 ? 'Rendah' : ''}
                  </span>
                </div>
              ))}
            </div>

            {/* Curves for all tones overlaid with active one highlighted */}
            <svg
              className="absolute inset-x-12 inset-y-6 w-[calc(100%-6rem)] h-[calc(100%-3rem)] overflow-visible"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {/* Tone 1: 5-5 (y = 5% from top) */}
              <line
                x1="5"
                y1="8"
                x2="95"
                y2="8"
                stroke={activeTone.toneNumber === 1 ? '#059669' : '#cbd5e1'}
                strokeWidth={activeTone.toneNumber === 1 ? '4' : '2'}
                strokeDasharray={activeTone.toneNumber === 1 ? 'none' : '3 3'}
                className="transition-all"
              />
              {/* Tone 2: 3-5 (y = 50% to y = 8%) */}
              <line
                x1="5"
                y1="50"
                x2="95"
                y2="8"
                stroke={activeTone.toneNumber === 2 ? '#059669' : '#cbd5e1'}
                strokeWidth={activeTone.toneNumber === 2 ? '4' : '2'}
                strokeDasharray={activeTone.toneNumber === 2 ? 'none' : '3 3'}
                className="transition-all"
              />
              {/* Tone 3: 2-1-4 (y = 72% -> 92% -> 28%) */}
              <path
                d="M 5,68 Q 45,95 95,30"
                fill="none"
                stroke={activeTone.toneNumber === 3 ? '#059669' : '#cbd5e1'}
                strokeWidth={activeTone.toneNumber === 3 ? '4' : '2'}
                strokeDasharray={activeTone.toneNumber === 3 ? 'none' : '3 3'}
                className="transition-all"
              />
              {/* Tone 4: 5-1 (y = 8% to y = 92%) */}
              <line
                x1="5"
                y1="8"
                x2="95"
                y2="92"
                stroke={activeTone.toneNumber === 4 ? '#059669' : '#cbd5e1'}
                strokeWidth={activeTone.toneNumber === 4 ? '4' : '2'}
                strokeDasharray={activeTone.toneNumber === 4 ? 'none' : '3 3'}
                className="transition-all"
              />
              {/* Tone 5: Neutral dot / short fall */}
              <circle
                cx="50"
                cy="60"
                r={activeTone.toneNumber === 5 ? '6' : '3'}
                fill={activeTone.toneNumber === 5 ? '#059669' : '#cbd5e1'}
                className="transition-all"
              />
            </svg>
          </div>

          {/* Active Tone Detailed Card */}
          <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200/80 dark:border-slate-800 space-y-2 text-xs">
            <div className="flex items-center justify-between font-semibold text-slate-800 dark:text-slate-200">
              <span className="flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-emerald-500" />
                <span>Analisis Nada Terpilih: {activeTone.chineseName}</span>
              </span>
              <span className="font-mono text-emerald-600 dark:text-emerald-400">
                Nilai Pitch: {activeTone.pitchContour}
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {activeTone.descriptionId}
            </p>
            <div className="text-[11px] text-slate-400 dark:text-slate-500 italic">
              EN: {activeTone.descriptionEn}
            </div>
          </div>

          {/* Comparison Matrix with Base Syllables */}
          <div className="space-y-2">
            <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Tabel Komparasi 4 Nada Dasar:
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
                <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold">
                  <tr>
                    <th className="p-2.5">Suku Kata</th>
                    <th className="p-2.5">Nada 1 (ˉ)</th>
                    <th className="p-2.5">Nada 2 (ˊ)</th>
                    <th className="p-2.5">Nada 3 (ˇ)</th>
                    <th className="p-2.5">Nada 4 (ˋ)</th>
                    <th className="p-2.5">Nada Netral (·)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {sampleSyllables.map((s, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-850">
                      <td className="p-2.5 font-bold font-mono text-slate-900 dark:text-slate-100">{s.base}</td>
                      <td className="p-2.5 text-slate-600 dark:text-slate-300">{s.t1}</td>
                      <td className="p-2.5 text-slate-600 dark:text-slate-300">{s.t2}</td>
                      <td className="p-2.5 text-slate-600 dark:text-slate-300">{s.t3}</td>
                      <td className="p-2.5 text-slate-600 dark:text-slate-300">{s.t4}</td>
                      <td className="p-2.5 text-slate-600 dark:text-slate-300">{s.t5}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
