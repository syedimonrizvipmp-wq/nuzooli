import React, { useState, useMemo } from 'react';
import { useQuran } from '@/context/QuranContext';
import { ALL_114_CHRONOLOGICAL_EVENTS } from '@/data/allChronologicalEvents';
import { CHRONOLOGICAL_PASSAGE_FLOW, PassageUnit } from '@/data/passageFlowData';
import {
  Layers,
  CheckCircle2,
  Hourglass,
  ArrowRight,
  Search,
  Sparkles,
  MapPin,
  Calendar,
  Eye,
} from 'lucide-react';

export const SurahXRayMatrixView: React.FC = () => {
  const { setActiveEventOrder, setPerspectiveMode } = useQuran();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterType, setFilterType] = useState<'all' | 'segmented' | 'complete'>('all');
  const [selectedSurahNumber, setSelectedSurahNumber] = useState<number | null>(2); // Default to Al-Baqarah for immediate wow factor

  const navigateToReader = (chronologicalOrder: number) => {
    setActiveEventOrder(chronologicalOrder);
    setPerspectiveMode('nuzul');
  };

  // Group passage flow by surah number
  const passagesBySurah = useMemo(() => {
    const map = new Map<number, PassageUnit[]>();
    CHRONOLOGICAL_PASSAGE_FLOW.forEach((passage) => {
      const existing = map.get(passage.surahNumber) || [];
      existing.push(passage);
      map.set(passage.surahNumber, existing);
    });
    return map;
  }, []);

  // Compute counts
  const totalSurahs = ALL_114_CHRONOLOGICAL_EVENTS.length;
  const segmentedSurahsList = ALL_114_CHRONOLOGICAL_EVENTS.filter(
    (e) => e.revelationNature === 'segmented_passage' || (passagesBySurah.get(e.mushafOrder)?.length || 0) > 1
  );
  const completeSurahsList = ALL_114_CHRONOLOGICAL_EVENTS.filter(
    (e) => !segmentedSurahsList.some((s) => s.mushafOrder === e.mushafOrder)
  );

  // Filtered Surahs
  const filteredSurahs = useMemo(() => {
    return ALL_114_CHRONOLOGICAL_EVENTS.filter((evt) => {
      const parts = passagesBySurah.get(evt.mushafOrder) || [];
      const isSegmented = evt.revelationNature === 'segmented_passage' || parts.length > 1;

      if (filterType === 'segmented' && !isSegmented) return false;
      if (filterType === 'complete' && isSegmented) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          evt.surahNameEnglish.toLowerCase().includes(q) ||
          evt.surahNameArabic.includes(q) ||
          evt.surahNameUrdu.includes(q) ||
          String(evt.mushafOrder).includes(q) ||
          String(evt.chronologicalOrder).includes(q)
        );
      }

      return true;
    });
  }, [filterType, searchQuery, passagesBySurah]);

  const selectedSurahEvent = useMemo(() => {
    if (!selectedSurahNumber) return null;
    return ALL_114_CHRONOLOGICAL_EVENTS.find((e) => e.mushafOrder === selectedSurahNumber) || null;
  }, [selectedSurahNumber]);

  const selectedSurahParts = useMemo(() => {
    if (!selectedSurahNumber) return [];
    return passagesBySurah.get(selectedSurahNumber) || [];
  }, [selectedSurahNumber, passagesBySurah]);

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Top Header Banner */}
      <div className="p-6 rounded-3xl sacred-glass sacred-border flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>The "Surah X-Ray / Segmentation Matrix" (سورتوں کا ایکس رے ڈیش بورڈ)</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-serif text-[var(--text-primary)]">
            یکبارگی نزول بمقابلہ تدریجی اقساط کا تقابلی تجزیہ
          </h3>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1 max-w-2xl leading-relaxed">
            Most readers assume chapters were revealed all at once. This X-Ray view reveals how God paced divine guidance: Solid green bars represent chapters revealed in a single descent (نزولِ کلی), while segmented bars reveal chapters given across years and events.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Surah or #..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
          />
        </div>
      </div>

      {/* Summary Metrics & Filter Pills Bar */}
      <div className="p-4 rounded-2xl sacred-glass sacred-border flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              filterType === 'all'
                ? 'bg-emerald-700 text-white shadow-md'
                : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            All Surahs ({totalSurahs})
          </button>
          <button
            onClick={() => setFilterType('segmented')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition-all ${
              filterType === 'segmented'
                ? 'bg-emerald-700 text-white shadow-md'
                : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Multi-Part Segmented ({segmentedSurahsList.length})</span>
          </button>
          <button
            onClick={() => setFilterType('complete')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition-all ${
              filterType === 'complete'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Complete Descent ({completeSurahsList.length})</span>
          </button>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-[11px] text-[var(--text-muted)] font-medium">
          <span className="flex items-center gap-1">
            <span className="w-3 h-2 rounded-sm bg-emerald-500"></span>
            <span>Solid Bar = نزولِ کلی</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-2 rounded-sm bg-amber-500"></span>
            <span>Segmented Bar = نزولِ تدریجی</span>
          </span>
        </div>
      </div>

      {/* Selected Surah X-Ray Inspection Panel */}
      {selectedSurahEvent && (
        <div
          className="p-6 rounded-3xl sacred-border bg-[var(--bg-surface-elevated)] shadow-2xl space-y-4 border-2 animate-fade-in relative"
          style={{
            borderColor: selectedSurahParts[0]?.colorCode || '#10B981',
          }}
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-sky-600 text-white">
                  Surah #{selectedSurahEvent.mushafOrder} in Mushaf
                </span>
                <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-emerald-700 text-white">
                  Nuzul Rank #{selectedSurahEvent.chronologicalOrder}
                </span>
                <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                  {selectedSurahEvent.totalVersesInSurah} Ayahs Total
                </span>
              </div>

              <h4 className="text-2xl font-bold font-serif text-[var(--text-primary)] flex items-center gap-2">
                <span>{selectedSurahEvent.surahNameEnglish}</span>
                <span className="text-xs px-2.5 py-0.5 rounded-md bg-[var(--bg-surface)] border border-[var(--border-subtle)] font-sans font-semibold text-amber-500">
                  X-RAY INSPECTION ACTIVE
                </span>
              </h4>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-3xl font-bold font-arabic text-emerald-800 dark:text-emerald-300">
                {selectedSurahEvent.surahNameArabic}
              </span>
              <p className="text-xs text-[var(--text-secondary)] font-urdu font-medium">
                {selectedSurahEvent.surahNameUrdu}
              </p>
            </div>
          </div>

          {/* Visual Proportional Bar of this selected Surah */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between text-xs text-[var(--text-muted)] font-semibold">
              <span>Proportional Passage Breakdown:</span>
              <span>
                {selectedSurahParts.length > 1
                  ? `${selectedSurahParts.length} Distinct Revelation Chunks`
                  : 'Single Unified Revelation'}
              </span>
            </div>

            <div className="w-full h-5 rounded-xl overflow-hidden flex bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-inner">
              {selectedSurahParts.length > 1 ? (
                selectedSurahParts.map((part) => {
                  const verseSpan = part.verseRange.toVerse - part.verseRange.fromVerse + 1;
                  const pct = Math.max(8, Math.round((verseSpan / selectedSurahEvent.totalVersesInSurah) * 100));

                  return (
                    <div
                      key={part.id}
                      className="h-full flex items-center justify-center text-[10px] font-bold text-white transition-all hover:brightness-110 relative group"
                      style={{
                        width: `${pct}%`,
                        backgroundColor: part.colorCode,
                      }}
                      title={`Part ${part.segmentIndex}: Ayahs ${part.verseRange.fromVerse}–${part.verseRange.toVerse}`}
                    >
                      <span>P{part.segmentIndex}</span>
                    </div>
                  );
                })
              ) : (
                <div
                  className="w-full h-full bg-emerald-500 flex items-center justify-center text-xs font-bold text-white"
                >
                  <span>100% Complete Descent (جملة واحدة)</span>
                </div>
              )}
            </div>
          </div>

          {/* If Multi-Part, render detailed X-Ray parts breakdown */}
          {selectedSurahParts.length > 1 ? (
            <div className="space-y-3 pt-2">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="font-bold text-[var(--text-primary)] flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                  <span>Detailed Segment Breakdown ({selectedSurahParts[0]?.totalSurahSpan}):</span>
                </span>
                <span className="text-[var(--text-secondary)] font-urdu">
                  {selectedSurahParts[0]?.totalSurahSpanUrdu}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {selectedSurahParts.map((part) => (
                  <div
                    key={part.id}
                    className="p-4 rounded-2xl border bg-[var(--bg-surface)] text-xs space-y-2 relative overflow-hidden shadow-xs"
                    style={{ borderLeft: `5px solid ${part.colorCode}` }}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className="px-2.5 py-0.5 rounded-md font-bold text-white text-[11px]"
                        style={{ backgroundColor: part.colorCode }}
                      >
                        Part {part.segmentIndex} of {part.totalSegments}
                      </span>
                      <span className="text-[10px] text-[var(--text-muted)] font-mono">
                        Ayahs {part.verseRange.fromVerse}–{part.verseRange.toVerse}
                      </span>
                    </div>

                    <div className="text-[11px] text-[var(--text-secondary)] font-medium flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                      <span>{part.yearCE} CE</span>
                      <span>•</span>
                      <span>{part.yearNabawiOrHijri}</span>
                    </div>

                    <div className="text-[11px] text-[var(--text-muted)] flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                      <span className="truncate">{part.location}</span>
                    </div>

                    {/* Time interval pill */}
                    <div
                      className="p-2 rounded-xl border text-[11px] space-y-0.5"
                      style={{
                        backgroundColor: `${part.colorCode}10`,
                        borderColor: `${part.colorCode}30`,
                      }}
                    >
                      <div className="font-bold flex items-center gap-1" style={{ color: part.colorCode }}>
                        <Hourglass className="w-3 h-3" />
                        <span>Interval: {part.timeDeltaFromPrevious}</span>
                      </div>
                      <p className="text-[10px] text-[var(--text-muted)] font-urdu">
                        {part.timeDeltaUrdu}
                      </p>
                    </div>

                    <p className="text-[11px] text-[var(--text-primary)] font-urdu leading-relaxed line-clamp-2">
                      {part.contextUrdu}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs text-[var(--text-secondary)] space-y-1">
              <div className="font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>نزولِ کلی (Single Descent):</span>
              </div>
              <p className="leading-relaxed">
                This Surah was revealed as a complete chapter at once in {selectedSurahEvent.location} during the {selectedSurahEvent.revelationPeriod} era ({selectedSurahEvent.approximateYearCE} CE).
              </p>
              <p className="font-urdu text-[var(--text-secondary)] leading-relaxed pt-1">
                {selectedSurahEvent.asbabUnNuzul.summaryUrdu}
              </p>
            </div>
          )}

          {/* Action Footer */}
          <div className="pt-2 flex items-center justify-between">
            <button
              onClick={() => setSelectedSurahNumber(null)}
              className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            >
              Close X-Ray Panel
            </button>

            <button
              onClick={() => navigateToReader(selectedSurahEvent.chronologicalOrder)}
              className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold transition-all text-xs flex items-center gap-1.5 shadow-md"
            >
              <span>سورت کا مطالعہ کریں (Read in Reader)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* 114 Surahs Bar Matrix Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {filteredSurahs.map((surah) => {
          const parts = passagesBySurah.get(surah.mushafOrder) || [];
          const isSegmented = surah.revelationNature === 'segmented_passage' || parts.length > 1;
          const isSelected = selectedSurahNumber === surah.mushafOrder;

          return (
            <div
              key={surah.mushafOrder}
              onClick={() => setSelectedSurahNumber(isSelected ? null : surah.mushafOrder)}
              className={`p-3.5 rounded-2xl sacred-border cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                isSelected
                  ? 'ring-3 ring-emerald-500 bg-[var(--bg-surface-elevated)] shadow-lg scale-[1.02]'
                  : 'bg-[var(--bg-surface-card)] hover:border-emerald-500/50 hover:shadow-md'
              }`}
            >
              <div>
                {/* Header: Mushaf # and Arabic name */}
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-sky-500/10 text-sky-700 dark:text-sky-300 font-mono">
                      #{surah.mushafOrder}
                    </span>
                    <span className="text-xs font-bold font-serif text-[var(--text-primary)]">
                      {surah.surahNameEnglish}
                    </span>
                  </div>

                  <span className="text-sm font-bold font-arabic text-emerald-800 dark:text-emerald-300">
                    {surah.surahNameArabic}
                  </span>
                </div>

                {/* Subtitle info */}
                <div className="text-[10px] text-[var(--text-muted)] flex items-center justify-between mb-2">
                  <span>Nuzul #{surah.chronologicalOrder} • {surah.totalVersesInSurah} Ayahs</span>
                  <span className="font-urdu">{surah.surahNameUrdu}</span>
                </div>

                {/* X-Ray Visual Bar */}
                <div className="w-full h-3 rounded-md overflow-hidden flex bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
                  {isSegmented && parts.length > 1 ? (
                    parts.map((p) => {
                      const verseSpan = p.verseRange.toVerse - p.verseRange.fromVerse + 1;
                      const pct = Math.max(12, Math.round((verseSpan / surah.totalVersesInSurah) * 100));

                      return (
                        <div
                          key={p.id}
                          style={{
                            width: `${pct}%`,
                            backgroundColor: p.colorCode,
                          }}
                          className="h-full border-r border-black/10"
                        />
                      );
                    })
                  ) : (
                    <div className="w-full h-full bg-emerald-500" />
                  )}
                </div>
              </div>

              {/* Status pill & Action */}
              <div className="mt-2.5 pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between text-[10px]">
                {isSegmented && parts.length > 1 ? (
                  <span
                    className="font-bold flex items-center gap-1"
                    style={{ color: parts[0]?.colorCode || '#059669' }}
                  >
                    <Layers className="w-3 h-3" />
                    <span>{parts.length} Parts ({parts[0]?.totalSurahSpan?.split('(')[0].trim() || 'Multi-year'})</span>
                  </span>
                ) : (
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Complete</span>
                  </span>
                )}

                <span className="text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-0.5 font-bold">
                  <span>Inspect</span>
                  <Eye className="w-3 h-3" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
