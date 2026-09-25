import React, { useState } from 'react';
import { SURAHS_DATA } from '@/data/surahs';
import { useQuran } from '@/context/QuranContext';
import { Compass, BookOpen, ArrowRight } from 'lucide-react';

export const MushafView: React.FC = () => {
  const { searchQuery, events, setActiveEventOrder, setPerspectiveMode } = useQuran();
  const [filterType, setFilterType] = useState<'all' | 'meccan' | 'medinan'>('all');

  const filteredSurahs = SURAHS_DATA.filter((s) => {
    const matchesFilter = filterType === 'all' || s.type === filterType;
    if (!matchesFilter) return false;
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      s.en.toLowerCase().includes(q) ||
      s.ar.includes(q) ||
      s.ur.includes(q) ||
      String(s.n).includes(q) ||
      String(s.nuzul).includes(q)
    );
  });

  const handleSelectSurah = (surahNumber: number) => {
    // Find if we have a revelation event for this Surah
    const matchedEvent = events.find((e) => e.surahNumber === surahNumber);
    if (matchedEvent) {
      setActiveEventOrder(matchedEvent.chronologicalOrder);
      setPerspectiveMode('nuzul');
    }
  };

  return (
    <div className="w-full max-w-[1780px] mx-auto py-6 sm:py-8 px-4 animate-fade-in">
      
      {/* Header Banner */}
      <div className="mb-6 p-6 rounded-3xl sacred-glass sacred-border sacred-shadow flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1">
            <BookOpen className="w-4 h-4" />
            <span>Dual Perspective Mode (ترتیبِ تلاوت و مصحف)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[var(--text-primary)]">
            Tarteeb-e-Mushaf Catalog (114 Surahs)
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
            Browse standard canonical Quran order, cross-referenced with exact <strong>Nuzuli (Chronological) revelation rank</strong>.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1.5 bg-[var(--bg-surface)] p-1.5 rounded-2xl border border-[var(--border-subtle)]">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              filterType === 'all'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            All (114)
          </button>
          <button
            onClick={() => setFilterType('meccan')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              filterType === 'meccan'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            Meccan (مکی)
          </button>
          <button
            onClick={() => setFilterType('medinan')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              filterType === 'medinan'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            Medinan (مدنی)
          </button>
        </div>
      </div>

      {/* Surahs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSurahs.map((s) => {
          const hasEvent = events.some((e) => e.surahNumber === s.n);

          return (
            <div
              key={s.n}
              onClick={() => handleSelectSurah(s.n)}
              className={`p-5 rounded-3xl sacred-border sacred-shadow transition-all relative overflow-hidden group cursor-pointer ${
                hasEvent
                  ? 'bg-[var(--bg-surface-card)] hover:border-emerald-600 hover:ring-2 hover:ring-emerald-500/20'
                  : 'bg-[var(--bg-surface)] opacity-85 hover:opacity-100 hover:border-emerald-500/40'
              }`}
            >
              {/* Top Row: Mushaf Number & Nuzul Rank Badge */}
              <div className="flex items-center justify-between mb-3">
                <span className="w-8 h-8 rounded-xl bg-emerald-600/10 border border-emerald-600/20 text-emerald-800 dark:text-emerald-300 font-bold text-xs flex items-center justify-center">
                  #{s.n}
                </span>

                <div className="flex items-center gap-1.5">
                  <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-700/15 text-emerald-800 dark:text-emerald-200 border border-emerald-600/30 flex items-center gap-1">
                    <Compass className="w-3 h-3 text-amber-500" />
                    <span>نزول #{s.nuzul}</span>
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-md text-[10px] font-semibold ${
                      s.type === 'meccan'
                        ? 'bg-amber-500/10 text-amber-700 dark:text-amber-400'
                        : 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'
                    }`}
                  >
                    {s.type === 'meccan' ? 'مکی' : 'مدنی'}
                  </span>
                </div>
              </div>

              {/* Middle: Surah Names */}
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="font-bold text-base text-[var(--text-primary)] font-serif group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                    {s.en}
                  </h3>
                  <p className="text-xs text-[var(--text-muted)]">{s.verses} Ayahs</p>
                </div>
                <div className="text-right">
                  <span className="text-xl font-bold font-arabic text-emerald-800 dark:text-emerald-300">
                    {s.ar}
                  </span>
                  <p className="text-xs text-[var(--text-secondary)] font-urdu">
                    {s.ur}
                  </p>
                </div>
              </div>

              {/* Footer action */}
              <div className="pt-2 mt-2 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs text-[var(--text-muted)]">
                <span>
                  {hasEvent ? (
                    <span className="text-emerald-600 font-semibold flex items-center gap-1">
                      ● Active Study Passage Available
                    </span>
                  ) : (
                    <span>Chronological Rank: #{s.nuzul}</span>
                  )}
                </span>
                <span className="text-emerald-700 dark:text-emerald-400 font-medium group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                  View <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
