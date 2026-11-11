import React, { useState } from 'react';
import { BookOpen, Check, AlertTriangle, Lightbulb, ChevronDown, ChevronUp } from 'lucide-react';
import { PHONETIC_RULES } from '../data/rulesData';

export const RulesSection: React.FC = () => {
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [expandedRule, setExpandedRule] = useState<string | null>(PHONETIC_RULES[0].id);

  const categories = [
    { id: 'all', label: 'Semua Aturan (7 Aturan Pokok)' },
    { id: 'shengmu', label: 'Aturan Shengmu' },
    { id: 'yunmu', label: 'Aturan Yunmu' },
    { id: 'shengdiao', label: 'Aturan Shengdiao' },
    { id: 'spelling', label: 'Aturan Ejaan & Tanda Baca' },
  ];

  const filteredRules =
    filterCategory === 'all'
      ? PHONETIC_RULES
      : PHONETIC_RULES.filter((r) => r.category === filterCategory);

  const toggleExpand = (id: string) => {
    setExpandedRule(expandedRule === id ? null : id);
  };

  return (
    <section id="aturan" className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header and Context */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400">
          <span>Bagian 05</span>
          <span aria-hidden="true">·</span>
          <span>Pedoman Ejaan & Fonetik Sistematis</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
          Aturan Fonetik Lengkap Shengmu, Yunmu & Shengdiao
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-3xl">
          Sistem Hanyu Pinyin memiliki aturan ejaan khusus yang terstandardisasi secara internasional.
          Memahami aturan-aturan ini mencegah kesalahan fatal dalam membaca, melafalkan, dan mengetik karakter Mandarin.
        </p>
      </div>

      {/* Category Filter */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-wrap items-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setFilterCategory(cat.id)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              filterCategory === cat.id
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Rules Accordion List */}
      <div className="space-y-4">
        {filteredRules.map((rule) => {
          const isExpanded = expandedRule === rule.id;
          return (
            <div
              key={rule.id}
              className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden transition-all"
            >
              {/* Header / Clickable summary */}
              <button
                onClick={() => toggleExpand(rule.id)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors cursor-pointer"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 uppercase tracking-wide">
                      {rule.category}
                    </span>
                    <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">
                      {rule.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                    {rule.summary}
                  </p>
                </div>
                <div className="ml-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg">
                  {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </button>

              {/* Collapsible Content */}
              {isExpanded && (
                <div className="px-6 pb-6 pt-2 border-t border-slate-100 dark:border-slate-800 space-y-5 text-xs sm:text-sm">
                  {/* Detailed Explanation */}
                  <div className="space-y-2 text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50/50 dark:bg-slate-950/50 p-4 rounded-lg">
                    {rule.explanation.map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>

                  {/* Examples Table */}
                  <div className="space-y-2">
                    <div className="font-semibold text-slate-800 dark:text-slate-200 text-xs">
                      Contoh Penerapan Aturan:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                      {rule.examples.map((ex, exIdx) => (
                        <div
                          key={exIdx}
                          className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1"
                        >
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-400">{ex.before}</span>
                            <span className="font-bold text-blue-600 dark:text-blue-400 font-mono">
                              ➔ {ex.after}
                            </span>
                          </div>
                          {ex.hanzi && (
                            <div className="font-chinese font-bold text-slate-900 dark:text-slate-100 text-base">
                              {ex.hanzi}
                            </div>
                          )}
                          <div className="text-[11px] text-slate-500 dark:text-slate-400 italic">
                            {ex.note}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Warning / Memory Tip */}
                  {rule.warningTip && (
                    <div className="p-3 bg-amber-50 dark:bg-amber-950/30 rounded-lg border border-amber-200 dark:border-amber-900/40 text-amber-900 dark:text-amber-300 text-xs flex items-center gap-2">
                      <Lightbulb className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>{rule.warningTip}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
