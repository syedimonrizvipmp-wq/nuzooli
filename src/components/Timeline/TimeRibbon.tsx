import React, { useRef } from 'react';
import { useQuran } from '@/context/QuranContext';
import { HISTORICAL_MILESTONES } from '@/data/milestones';
import { RevelationPeriod } from '@/types/quran';
import { RevelationNatureBadge } from '@/components/Reader/RevelationNatureBadge';
import { ChevronLeft, ChevronRight, MapPin, Calendar, Clock, ListFilter } from 'lucide-react';

export const TimeRibbon: React.FC = () => {
  const {
    events,
    activeEventOrder,
    setActiveEventOrder,
    periodFilter,
    setPeriodFilter,
    activeMilestoneId,
    setActiveMilestoneId,
  } = useQuran();

  const ribbonRef = useRef<HTMLDivElement>(null);

  const periods: (RevelationPeriod | 'All')[] = [
    'All',
    'Early Meccan',
    'Mid Meccan',
    'Late Meccan',
    'Early Medinan',
    'Late Medinan',
  ];

  const filteredEvents = events.filter((e) => {
    if (periodFilter === 'All') return true;
    return e.revelationPeriod === periodFilter;
  });

  const scrollRibbon = (direction: 'left' | 'right') => {
    if (ribbonRef.current) {
      const scrollAmount = direction === 'left' ? -360 : 360;
      ribbonRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full bg-[var(--bg-surface)] border-b border-[var(--border-subtle)] transition-colors py-3 sm:py-4">
      <div className="max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        
        {/* Top Header: Timeline Stats & Direct Chronological Jump Selector */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              <Clock className="w-4 h-4" />
              <span>The 23-Year Prophetic Timeline — All 114 Surahs (6,236 Verses)</span>
            </div>
          </div>

          {/* Quick Jump Dropdown for all 114 Events */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="flex items-center gap-1.5 bg-[var(--bg-surface-elevated)] px-3 py-1.5 rounded-xl border border-[var(--border-subtle)] text-xs text-[var(--text-secondary)] w-full md:w-auto">
              <ListFilter className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              <span className="font-semibold whitespace-nowrap font-urdu">وحی پر جائیں:</span>
              <select
                value={activeEventOrder}
                onChange={(e) => setActiveEventOrder(parseInt(e.target.value, 10))}
                className="bg-transparent text-[var(--text-primary)] font-bold focus:outline-none cursor-pointer text-xs w-full md:w-64 font-urdu"
              >
                {events.map((evt) => (
                  <option
                    key={evt.chronologicalOrder}
                    value={evt.chronologicalOrder}
                    className="bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] font-urdu"
                  >
                    #{evt.chronologicalOrder} — {evt.surahNameArabic} ({evt.surahNameUrdu}) • {evt.revelationPeriod}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Phase Filter Chips */}
        <div className="flex items-center justify-between gap-2 mb-3 overflow-x-auto pb-1 no-scrollbar">
          <div className="flex items-center gap-1.5 min-w-max">
            {periods.map((p) => {
              const count = p === 'All' ? events.length : events.filter(e => e.revelationPeriod === p).length;
              return (
                <button
                  key={p}
                  onClick={() => setPeriodFilter(p)}
                  className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    periodFilter === p
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-emerald-500/40'
                  }`}
                >
                  <span className={p === 'All' ? 'font-urdu font-bold' : ''}>
                    {p === 'All' ? 'تمام ادوار (All Phases)' : p}
                  </span>
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                    periodFilter === p ? 'bg-emerald-800 text-white' : 'bg-[var(--bg-surface)] text-[var(--text-muted)]'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Historical Milestones Bar */}
        <div className="mb-3 overflow-x-auto pb-2 no-scrollbar">
          <div className="flex items-center gap-2 min-w-max">
            {HISTORICAL_MILESTONES.map((m) => {
              const isSelected = activeMilestoneId === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => {
                    if (isSelected) {
                      setActiveMilestoneId(null);
                    } else {
                      setActiveMilestoneId(m.id);
                      if (m.relatedEventOrders.length > 0) {
                        setActiveEventOrder(m.relatedEventOrders[0]);
                      }
                    }
                  }}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                    isSelected
                      ? 'bg-emerald-500/15 border-emerald-600 text-emerald-800 dark:text-emerald-200 shadow-xs'
                      : 'bg-[var(--bg-surface-elevated)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-emerald-500/40'
                  }`}
                >
                  <span className="font-bold text-emerald-700 dark:text-emerald-300">{m.yearCE} CE</span>
                  <span className="w-1 h-1 rounded-full bg-[var(--text-muted)]" />
                  <span className="font-urdu">{m.titleUrdu}</span>
                  {m.relatedEventOrders.length > 0 && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 font-semibold">
                      Event #{m.relatedEventOrders[0]}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Chronological Scroller (The Time-Ribbon) */}
        <div className="relative group">
          
          {/* Scroll Left Button */}
          <button
            onClick={() => scrollRibbon('left')}
            className="hidden sm:flex absolute -left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] shadow-md items-center justify-center text-[var(--text-primary)] hover:scale-110 transition-all opacity-0 group-hover:opacity-100"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Cards Track */}
          <div
            ref={ribbonRef}
            className="flex items-center gap-2.5 sm:gap-3 overflow-x-auto py-2 px-1 no-scrollbar scroll-smooth snap-x snap-mandatory"
          >
            {filteredEvents.map((evt) => {
              const isActive = evt.chronologicalOrder === activeEventOrder;
              return (
                <button
                  key={evt.chronologicalOrder}
                  onClick={() => setActiveEventOrder(evt.chronologicalOrder)}
                  className={`flex-shrink-0 text-start w-52 sm:w-64 p-3 rounded-2xl border transition-all relative overflow-hidden snap-start cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-br from-emerald-500/15 via-[var(--bg-surface-elevated)] to-[var(--bg-surface)] border-emerald-600 ring-2 ring-emerald-500/30 shadow-md scale-[1.02]'
                      : 'bg-[var(--bg-surface-elevated)] border-[var(--border-subtle)] hover:border-emerald-500/40 hover:scale-[1.01]'
                  }`}
                >
                  {/* Top Meta: Event # and Period */}
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-emerald-700 text-white shadow-xs">
                      نزول #{evt.chronologicalOrder}
                    </span>
                    <span className="text-[10px] font-medium text-[var(--text-muted)] flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-emerald-600" />
                      {evt.approximateYearCE} CE
                    </span>
                  </div>

                  {/* Middle: Surah Name & Range */}
                  <div className="flex items-center justify-between mb-1">
                    <div>
                      <h4 className="font-bold text-sm text-[var(--text-primary)] font-serif truncate max-w-[130px]">
                        {evt.surahNameEnglish}
                      </h4>
                      <p className="text-xs text-[var(--text-muted)]">
                        {evt.totalVersesInSurah} Ayahs
                        {!evt.isWholeSurah && ` (Chunk: ${evt.verseRange.fromVerse}–${evt.verseRange.toVerse})`}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold text-emerald-800 dark:text-emerald-300 font-arabic">
                        {evt.surahNameArabic}
                      </span>
                      <p className="text-[11px] text-[var(--text-secondary)] font-urdu">
                        {evt.surahNameUrdu}
                      </p>
                    </div>
                  </div>

                  {/* Revelation Nature Badge (Complete vs Segmented) */}
                  <div className="mt-1.5 mb-1">
                    <RevelationNatureBadge
                      nature={evt.revelationNature}
                      totalSegments={evt.totalSegmentsForSurah}
                      currentSegmentIndex={evt.currentSegmentIndex}
                      compact={true}
                    />
                  </div>

                  {/* Location badge */}
                  <div className="mt-2 pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between text-[10px] text-[var(--text-muted)]">
                    <span className="flex items-center gap-1 truncate max-w-[140px]">
                      <MapPin className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                      <span className="truncate">{evt.location}</span>
                    </span>
                    <span className="font-semibold text-emerald-700 dark:text-emerald-300">
                      Mushaf #{evt.mushafOrder}
                    </span>
                  </div>

                  {/* Active Indicator Accent Line */}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-600" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Scroll Right Button */}
          <button
            onClick={() => scrollRibbon('right')}
            className="hidden sm:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] shadow-md items-center justify-center text-[var(--text-primary)] hover:scale-110 transition-all opacity-0 group-hover:opacity-100"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
