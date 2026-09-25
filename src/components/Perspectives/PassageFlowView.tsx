import React, { useState } from 'react';
import { useQuran } from '@/context/QuranContext';
import { CHRONOLOGICAL_PASSAGE_FLOW, PassageUnit } from '@/data/passageFlowData';
import { ALL_114_CHRONOLOGICAL_EVENTS } from '@/data/allChronologicalEvents';
import {
  GitBranch,
  Layers,
  ArrowRight,
  MapPin,
  CheckCircle2,
  Calendar,
  Share2,
  Eye,
  X,
  Sparkles,
  Hourglass,
  Clock,
} from 'lucide-react';

export const PassageFlowView: React.FC = () => {
  const { setActiveEventOrder, setPerspectiveMode } = useQuran();
  const [filterMode, setFilterMode] = useState<'all' | 'segmented_only'>('all');
  const [highlightedId, setHighlightedId] = useState<string | null>(null);

  // Checkbox option requested by user: Dim unrelated surahs when a sister part is clicked
  const [dimOthersOnSelect, setDimOthersOnSelect] = useState<boolean>(true);
  const [focusedSurahNumber, setFocusedSurahNumber] = useState<number | null>(null);

  const navigateToEvent = (surahNumber: number) => {
    const match = ALL_114_CHRONOLOGICAL_EVENTS.find((e) => e.mushafOrder === surahNumber);
    if (match) {
      setActiveEventOrder(match.chronologicalOrder);
    } else {
      setActiveEventOrder(1);
    }
    setPerspectiveMode('nuzul');
  };

  const scrollToPassage = (targetId: string, surahNum?: number) => {
    if (surahNum && dimOthersOnSelect) {
      setFocusedSurahNumber(surahNum);
    }
    setHighlightedId(targetId);
    const element = document.getElementById(`passage-node-${targetId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => {
        setHighlightedId(null);
      }, 3500);
    }
  };

  const toggleSurahFocus = (surahNumber: number, firstPassageId?: string) => {
    if (focusedSurahNumber === surahNumber) {
      setFocusedSurahNumber(null);
    } else {
      setFocusedSurahNumber(surahNumber);
      if (firstPassageId) {
        scrollToPassage(firstPassageId);
      }
    }
  };

  const displayedPassages = CHRONOLOGICAL_PASSAGE_FLOW.filter((p) => {
    if (filterMode === 'segmented_only') return p.isSegmented;
    return true;
  });

  // Extract distinct multi-part surahs for quick-focus palette
  const distinctMultiPartSurahs = Array.from(
    new Map(
      CHRONOLOGICAL_PASSAGE_FLOW.filter((p) => p.isSegmented).map((p) => [
        p.surahNumber,
        {
          surahNumber: p.surahNumber,
          surahNameEnglish: p.surahNameEnglish.split('(')[0].trim(),
          colorCode: p.colorCode,
          totalSegments: p.totalSegments,
          totalSurahSpan: p.totalSurahSpan,
          firstId: p.id,
        },
      ])
    ).values()
  );

  const focusedSurahInfo = focusedSurahNumber
    ? CHRONOLOGICAL_PASSAGE_FLOW.find((p) => p.surahNumber === focusedSurahNumber)
    : null;

  const focusedSurahParts = focusedSurahNumber
    ? CHRONOLOGICAL_PASSAGE_FLOW.filter((p) => p.surahNumber === focusedSurahNumber)
    : [];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Informational Header & Controls */}
      <div className="p-6 rounded-3xl sacred-glass sacred-border flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1">
            <GitBranch className="w-4 h-4 text-emerald-600" />
            <span>Chronological Passage-Link Matrix (نزولی تسلسل و ربطِ مقطوعات)</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-serif text-[var(--text-primary)]">
            زمانی تسلسل میں سورتوں کے تدریجی اجزاء کا ربط و وقفۂ نزول
          </h3>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1 max-w-2xl leading-relaxed">
            A pure top-to-bottom chronological stream of revealed passages across the 23-year prophetic timeline. All multi-part revelations (Al-Alaq, Al-Baqarah, Al-Ma'idah, Aal-e-Imran, At-Tawbah, Al-Ahzab, etc.) appear with exact <strong>time differences between sister parts</strong> and <strong>total revelation spans</strong>.
          </p>
        </div>

        {/* Checkbox and Filter Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
          
          {/* Requested Checkbox: Dim unrelated surahs */}
          <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer select-none bg-[var(--bg-surface)] px-3.5 py-2 rounded-2xl border border-[var(--border-subtle)] hover:border-emerald-500/40 transition-all shadow-sm">
            <input
              type="checkbox"
              checked={dimOthersOnSelect}
              onChange={(e) => {
                setDimOthersOnSelect(e.target.checked);
                if (!e.target.checked) setFocusedSurahNumber(null);
              }}
              className="w-4 h-4 rounded text-emerald-700 focus:ring-emerald-500/40 border-gray-400 cursor-pointer"
            />
            <Eye className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
            <span className="text-[var(--text-primary)]">
              Dim Unrelated Chapters (غیر متعلقہ سورتیں مدہم کریں)
            </span>
          </label>

          {/* Filter Toggle */}
          <div className="flex items-center gap-1.5 bg-[var(--bg-surface)] p-1 rounded-2xl border border-[var(--border-subtle)]">
            <button
              onClick={() => setFilterMode('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                filterMode === 'all'
                  ? 'bg-emerald-700 text-white shadow-md'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              All ({CHRONOLOGICAL_PASSAGE_FLOW.length})
            </button>
            <button
              onClick={() => setFilterMode('segmented_only')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                filterMode === 'segmented_only'
                  ? 'bg-emerald-700 text-white shadow-md'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Multi-Part Only ({CHRONOLOGICAL_PASSAGE_FLOW.filter((p) => p.isSegmented).length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Multi-Part Surah Linkage Palette (Clickable Quick-Focus Pills) */}
      <div className="p-4 rounded-2xl bg-[var(--bg-surface-card)] border border-[var(--border-subtle)] space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-bold text-xs text-[var(--text-secondary)] flex items-center gap-1.5">
            <Share2 className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
            <span>Click any multi-part Surah below to isolate its sister parts and view time intervals across the timeline:</span>
          </span>
          {focusedSurahNumber !== null && (
            <button
              onClick={() => setFocusedSurahNumber(null)}
              className="text-xs text-emerald-700 dark:text-emerald-400 font-bold hover:underline flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" />
              <span>Clear Focus (تمام دکھائیں)</span>
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-1">
          {distinctMultiPartSurahs.map((surah) => {
            const isSelected = focusedSurahNumber === surah.surahNumber;
            return (
              <button
                key={surah.surahNumber}
                onClick={() => toggleSurahFocus(surah.surahNumber, surah.firstId)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-medium border transition-all ${
                  isSelected
                    ? 'ring-2 ring-offset-1 ring-emerald-600 shadow-md font-bold'
                    : 'hover:border-emerald-500/50 hover:bg-[var(--bg-surface)]'
                }`}
                style={{
                  borderColor: isSelected ? surah.colorCode : `${surah.colorCode}40`,
                  backgroundColor: isSelected ? `${surah.colorCode}25` : `${surah.colorCode}0D`,
                  color: isSelected ? 'var(--text-primary)' : undefined,
                }}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: surah.colorCode }}
                ></span>
                <span>
                  {surah.surahNameEnglish} ({surah.surahNumber}) • {surah.totalSegments} Parts
                </span>
                {surah.totalSurahSpan && (
                  <span className="text-[10px] opacity-75 font-mono">
                    [{surah.totalSurahSpan.split('(')[0].trim()}]
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Focus Alert Banner with Time Span & Mini Progression Strip */}
      {focusedSurahNumber !== null && focusedSurahInfo && (
        <div
          className="p-5 rounded-3xl border-2 flex flex-col gap-4 animate-fade-in shadow-lg"
          style={{
            borderColor: focusedSurahInfo.colorCode,
            backgroundColor: `${focusedSurahInfo.colorCode}15`,
          }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span
                className="w-3.5 h-3.5 rounded-full animate-ping shrink-0"
                style={{ backgroundColor: focusedSurahInfo.colorCode }}
              ></span>
              <div>
                <h4 className="text-base sm:text-lg font-bold font-serif text-[var(--text-primary)] flex flex-wrap items-center gap-2">
                  <span>In Contrast Focus:</span>
                  <span style={{ color: focusedSurahInfo.colorCode }}>
                    {focusedSurahInfo.surahNameEnglish} ({focusedSurahInfo.surahNameArabic})
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded-md bg-[var(--bg-surface)] border border-[var(--border-subtle)] font-sans font-semibold">
                    All {focusedSurahInfo.totalSegments} Parts Visible in High Contrast
                  </span>
                </h4>
                <div className="flex flex-wrap items-center gap-2 mt-1 text-xs">
                  <span className="font-bold text-[var(--text-primary)] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                    <span>Total Revelation Span (مجموعی مدّتِ نزول):</span>
                  </span>
                  <span
                    className="font-bold px-2 py-0.5 rounded-md"
                    style={{ backgroundColor: `${focusedSurahInfo.colorCode}25`, color: focusedSurahInfo.colorCode }}
                  >
                    {focusedSurahInfo.totalSurahSpan}
                  </span>
                  <span className="text-[var(--text-secondary)] font-urdu">
                    ({focusedSurahInfo.totalSurahSpanUrdu})
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setFocusedSurahNumber(null)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-xs font-bold text-[var(--text-primary)] transition-all shadow-sm shrink-0 self-start sm:self-auto"
            >
              <X className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
              <span>Reset Focus (تمام سورتیں بحال کریں)</span>
            </button>
          </div>

          {/* Progression Strip with Time Intervals between Sister Parts */}
          <div className="pt-3 border-t border-[var(--border-subtle)]">
            <div className="text-xs font-bold text-[var(--text-secondary)] mb-2 flex items-center gap-1.5">
              <Hourglass className="w-3.5 h-3.5 text-emerald-600" />
              <span>Chronological Progression & Intervals between Parts (تدریجی تسلسل و وقفۂ نزول):</span>
            </div>

            <div className="overflow-x-auto no-scrollbar flex items-center gap-2 pb-1">
              {focusedSurahParts.map((part, pIdx) => (
                <React.Fragment key={part.id}>
                  {pIdx > 0 && (
                    <div className="flex flex-col items-center shrink-0 px-1.5">
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded-full border whitespace-nowrap shadow-2xs"
                        style={{
                          backgroundColor: `${part.colorCode}20`,
                          borderColor: `${part.colorCode}40`,
                          color: part.colorCode,
                        }}
                      >
                        {part.timeDeltaFromPrevious}
                      </span>
                      <span className="text-xs font-bold text-emerald-600">─────►</span>
                    </div>
                  )}

                  <button
                    onClick={() => scrollToPassage(part.id)}
                    className="p-2.5 rounded-2xl bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-xs font-medium text-left shrink-0 transition-all hover:scale-105 shadow-xs"
                    style={{ borderLeft: `4px solid ${part.colorCode}` }}
                    title={`Click to scroll to Part ${part.segmentIndex}`}
                  >
                    <div className="font-bold text-[var(--text-primary)] flex items-center gap-1">
                      <span>Part {part.segmentIndex}</span>
                      <span className="opacity-60 text-[11px]">(Ayahs {part.verseRange.fromVerse}–{part.verseRange.toVerse})</span>
                    </div>
                    <div className="text-[10px] text-[var(--text-muted)] mt-0.5">
                      {part.yearCE} CE • {part.yearNabawiOrHijri.split('(')[0].trim()}
                    </div>
                  </button>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Top-to-Bottom Flow Stream */}
      <div className="relative border-l-2 md:border-l-4 border-emerald-500/25 ml-4 md:ml-8 pl-4 md:pl-8 space-y-6">
        {displayedPassages.map((passage: PassageUnit) => {
          const isHighlighted = highlightedId === passage.id;
          const isSisterHighlighted =
            highlightedId && passage.sisterPassageIds.includes(highlightedId);

          const isSurahFocused =
            focusedSurahNumber !== null && passage.surahNumber === focusedSurahNumber;
          const isDimmed =
            dimOthersOnSelect && focusedSurahNumber !== null && !isSurahFocused;

          return (
            <div
              key={passage.id}
              id={`passage-node-${passage.id}`}
              className={`relative p-5 sm:p-6 rounded-3xl sacred-border transition-all duration-300 ${
                isSurahFocused
                  ? 'ring-4 ring-offset-2 ring-emerald-500/70 scale-[1.015] bg-[var(--bg-surface-elevated)] shadow-2xl opacity-100 z-10'
                  : isDimmed
                  ? 'opacity-25 grayscale-[70%] blur-[0.2px] scale-[0.99] hover:opacity-75 transition-opacity'
                  : isHighlighted || isSisterHighlighted
                  ? 'ring-4 ring-emerald-500/50 scale-[1.01] bg-[var(--bg-surface-elevated)] shadow-xl'
                  : 'bg-[var(--bg-surface-card)] hover:border-emerald-500/40 shadow-sm'
              }`}
              style={{
                borderLeft: passage.isSegmented
                  ? `6px solid ${passage.colorCode}`
                  : undefined,
              }}
            >
              {/* Timeline Node Marker on the vertical line */}
              <div
                className="absolute -left-[25px] md:-left-[43px] top-6 w-5 h-5 md:w-6 md:h-6 rounded-full border-2 md:border-4 border-[var(--bg-main)] flex items-center justify-center text-[10px] font-bold text-white shadow-md transition-transform"
                style={{
                  backgroundColor: passage.colorCode,
                  transform: isSurahFocused ? 'scale(1.25)' : undefined,
                }}
              >
                {passage.stepNumber}
              </div>

              {/* Focused Part Badge when in focus contrast mode */}
              {isSurahFocused && (
                <div
                  className="mb-3 px-3.5 py-1.5 rounded-xl text-xs font-bold text-white flex items-center justify-between shadow-sm animate-fade-in"
                  style={{ backgroundColor: passage.colorCode }}
                >
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>
                      Surah {passage.surahNameEnglish} — Part {passage.segmentIndex} of {passage.totalSegments} [IN HIGH CONTRAST FOCUS]
                    </span>
                  </span>
                  <span className="font-urdu text-[11px]">
                    حصہ {passage.segmentIndex} از {passage.totalSegments} (نمایاں)
                  </span>
                </div>
              )}

              {/* Header: Step Number, Time, and Nature Badge */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <span
                    className="px-2.5 py-1 rounded-xl text-xs font-bold text-white shadow-sm"
                    style={{ backgroundColor: passage.colorCode }}
                  >
                    ترتیبِ نزول: مرحلہ #{passage.stepNumber}
                  </span>

                  <span className="flex items-center gap-1 text-xs text-[var(--text-muted)] font-medium px-2 py-0.5 rounded-lg bg-[var(--bg-surface)]">
                    <Calendar className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                    <span>{passage.yearCE} CE</span>
                    <span className="opacity-60">({passage.yearNabawiOrHijri})</span>
                  </span>
                </div>

                {/* Segment Tag */}
                {passage.isSegmented ? (
                  <button
                    onClick={() => toggleSurahFocus(passage.surahNumber)}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold border transition-all hover:scale-105"
                    style={{
                      color: passage.colorCode,
                      backgroundColor: `${passage.colorCode}15`,
                      borderColor: `${passage.colorCode}40`,
                    }}
                    title="Click to isolate and contrast all parts of this Surah"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>
                      حصہ {passage.segmentIndex} از {passage.totalSegments} (Part {passage.segmentIndex} of {passage.totalSegments})
                    </span>
                  </button>
                ) : (
                  <span className="flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>نزولِ کلی (Complete Surah)</span>
                  </span>
                )}
              </div>

              {/* Main Surah Details */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div>
                  <h4 className="text-lg sm:text-xl font-bold font-serif text-[var(--text-primary)] flex items-center gap-2">
                    <span>{passage.surahNameEnglish}</span>
                    <span className="text-xs px-2 py-0.5 rounded-md bg-[var(--bg-surface)] text-[var(--text-muted)] font-mono font-normal">
                      Ayahs {passage.verseRange.fromVerse}–{passage.verseRange.toVerse}
                    </span>
                  </h4>
                  <p className="text-xs text-[var(--text-muted)] flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                    <span>{passage.location}</span>
                    <span>•</span>
                    <span>Surah #{passage.surahNumber} in Mushaf</span>
                  </p>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-2xl font-bold font-arabic text-emerald-800 dark:text-emerald-300">
                    {passage.surahNameArabic}
                  </span>
                  <p className="text-xs text-[var(--text-secondary)] font-urdu font-medium">
                    {passage.surahNameUrdu}
                  </p>
                </div>
              </div>

              {/* Context / Asbab summary */}
              <div className="p-3.5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-1.5">
                <p className="text-xs sm:text-sm font-urdu text-[var(--text-primary)] leading-relaxed text-right">
                  {passage.contextUrdu}
                </p>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  {passage.contextEnglish}
                </p>
              </div>

              {/* Dedicated Time Difference & Total Span Box (Requested Feature) */}
              {passage.isSegmented && (
                <div
                  className="mt-3 p-3.5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-xs"
                  style={{
                    backgroundColor: `${passage.colorCode}0D`,
                    borderColor: `${passage.colorCode}35`,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-2xs"
                      style={{ backgroundColor: `${passage.colorCode}25`, color: passage.colorCode }}
                    >
                      <Hourglass className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-[var(--text-primary)] flex flex-wrap items-center gap-1.5">
                        <span>Time Interval:</span>
                        <span
                          className="px-2 py-0.5 rounded-md font-bold text-xs"
                          style={{ backgroundColor: `${passage.colorCode}25`, color: passage.colorCode }}
                        >
                          {passage.timeDeltaFromPrevious}
                        </span>
                        <span className="font-urdu text-[11px] text-[var(--text-secondary)]">
                          ({passage.timeDeltaUrdu})
                        </span>
                      </div>
                      <p className="text-[11px] text-[var(--text-muted)] font-urdu mt-0.5">
                        {passage.timeGapNote}
                      </p>
                    </div>
                  </div>

                  {passage.totalSurahSpan && (
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs font-semibold text-[var(--text-secondary)] shrink-0 self-start sm:self-auto shadow-xs">
                      <Clock className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                      <span>Total Chapter Span:</span>
                      <span className="font-bold text-[var(--text-primary)]">{passage.totalSurahSpan}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Sister Passage Linkage Banner & Jump Buttons */}
              {passage.isSegmented && (
                <div className="mt-3 flex flex-wrap items-center justify-between gap-2.5 pt-2 border-t border-[var(--border-subtle)]">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: passage.colorCode }}
                    ></span>
                    <span className="text-xs text-[var(--text-muted)] font-mono">
                      Passage {passage.segmentIndex} of {passage.totalSegments} • Surah {passage.surahNameEnglish.split('(')[0].trim()}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
                    {/* Toggle Focus Button */}
                    <button
                      onClick={() => toggleSurahFocus(passage.surahNumber)}
                      className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold border transition-all"
                      style={{
                        borderColor: `${passage.colorCode}50`,
                        color: passage.colorCode,
                        backgroundColor: isSurahFocused ? `${passage.colorCode}25` : 'transparent',
                      }}
                      title="Isolate all parts of this chapter and dim the others"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>
                        {isSurahFocused ? 'Remove Contrast (فوکس ختم)' : 'Focus All Parts (حصے نمایاں کریں)'}
                      </span>
                    </button>

                    {/* Jump buttons to sister passages */}
                    {passage.sisterPassageIds.map((sisterId) => (
                      <button
                        key={sisterId}
                        onClick={() => scrollToPassage(sisterId, passage.surahNumber)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-xl font-bold transition-all shadow-sm shrink-0"
                        style={{
                          backgroundColor: passage.colorCode,
                          color: '#FFFFFF',
                        }}
                        title="Jump to sister passage with smooth scroll and contrast focus"
                      >
                        <GitBranch className="w-3.5 h-3.5" />
                        <span>دوسرے حصے پر جائیں (Jump Part)</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions Footer */}
              <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs">
                <span className="text-[11px] text-[var(--text-muted)] font-mono">
                  {passage.totalVersesInSurah} verses total in Surah {passage.surahNameEnglish.split('(')[0].trim()}
                </span>

                <button
                  onClick={() => navigateToEvent(passage.surahNumber)}
                  className="px-3 py-1.5 rounded-xl bg-emerald-700/10 hover:bg-emerald-700 text-emerald-700 dark:text-emerald-300 hover:text-white font-semibold transition-all flex items-center gap-1.5"
                >
                  <span>سورت کا مطالعہ کریں (Read in Reader)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
