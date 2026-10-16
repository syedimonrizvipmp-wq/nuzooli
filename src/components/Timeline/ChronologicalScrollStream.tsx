import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useQuran } from '@/context/QuranContext';
import {
  SAHIFA_SAHAR_EPISODES,
  SAHIFA_SAHAR_EPILOGUE,
  SAHIFA_NOOR_EPILOGUE,
} from '@/data/sahifaSaharChronologyData';
import { loadSurahVerses } from '@/utils/quranVerseLoader';
import { Verse } from '@/types/quran';
import { AlternatingSpineTimeline } from '@/components/Timeline/AlternatingSpineTimeline';
import {
  Sparkles,
  Calendar,
  MapPin,
  Users,
  BookOpen,
  Play,
  Pause,
  Maximize2,
  ZoomIn,
  ZoomOut,
  AlignRight,
  ArrowDownUp,
  GraduationCap,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  GitBranch,
  Layers,
} from 'lucide-react';

export const ChronologicalScrollStream: React.FC = () => {
  const { playAyah, pauseAudio, activeAudio } = useQuran();

  // Timeline Visual Style: 'spine' (Alternating axis with top/bottom stems - requested) | 'stream' (Continuous cards)
  const [timelineStyle, setTimelineStyle] = useState<'spine' | 'stream'>('spine');

  // Module filter: 'all' | 1 | 2
  const [selectedModuleId, setSelectedModuleId] = useState<'all' | 1 | 2>('all');

  // Scroll Orientation for stream mode: 'horizontal-rtl' (default) or 'vertical'
  const [scrollOrientation, setScrollOrientation] = useState<'horizontal-rtl' | 'vertical'>('horizontal-rtl');
  const [activeEpisodeIndex, setActiveEpisodeIndex] = useState<number>(0);
  const [fontScaleDelta, setFontScaleDelta] = useState<number>(0); // -2 to +6 for classroom projection
  const [showAyatInCards, setShowAyatInCards] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Filter episodes according to active module
  const displayedEpisodes = useMemo(() => {
    if (selectedModuleId === 'all') return SAHIFA_SAHAR_EPISODES;
    return SAHIFA_SAHAR_EPISODES.filter((ep) => ep.moduleId === selectedModuleId);
  }, [selectedModuleId]);

  // Cached verses per episode
  const [episodeVersesMap, setEpisodeVersesMap] = useState<Record<string, Verse[]>>({});
  const [loadingVerses, setLoadingVerses] = useState<Record<string, boolean>>({});

  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Record<string, HTMLElement | null>>({});

  // Reset active index when module changes
  useEffect(() => {
    setActiveEpisodeIndex(0);
  }, [selectedModuleId]);

  // Load verses for all episodes on mount
  useEffect(() => {
    SAHIFA_SAHAR_EPISODES.forEach(async (ep) => {
      try {
        setLoadingVerses((prev) => ({ ...prev, [ep.id]: true }));
        const allVerses = await loadSurahVerses(ep.surahNumber);
        const filtered = allVerses.filter(
          (v) => v.ayahNumber >= ep.verseRange.fromVerse && v.ayahNumber <= ep.verseRange.toVerse
        );
        setEpisodeVersesMap((prev) => ({ ...prev, [ep.id]: filtered }));
      } catch (err) {
        console.error('Failed to load verses for episode:', ep.id, err);
      } finally {
        setLoadingVerses((prev) => ({ ...prev, [ep.id]: false }));
      }
    });
  }, []);

  // Map mouse-wheel vertical scroll to horizontal scroll when in horizontal-rtl mode
  useEffect(() => {
    const el = containerRef.current;
    if (!el || scrollOrientation !== 'horizontal-rtl') return;

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        el.scrollLeft -= e.deltaY * 1.2;
      }
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [scrollOrientation]);

  // Track fullscreen state
  useEffect(() => {
    const handleFsChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  };

  const scrollToEpisode = (index: number) => {
    setActiveEpisodeIndex(index);
    const targetEpisode = displayedEpisodes[index];
    if (!targetEpisode) return;
    const targetElement = cardRefs.current[targetEpisode.id];
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'start',
      });
    }
  };

  const handleNext = () => {
    if (activeEpisodeIndex < displayedEpisodes.length - 1) {
      scrollToEpisode(activeEpisodeIndex + 1);
    }
  };

  const handlePrev = () => {
    if (activeEpisodeIndex > 0) {
      scrollToEpisode(activeEpisodeIndex - 1);
    }
  };

  return (
    <div
      className={`relative w-full flex flex-col transition-all duration-300 ${
        isFullscreen ? 'p-2 sm:p-4 bg-[var(--bg-primary)]' : ''
      }`}
      dir="rtl"
    >
      {/* ── TOP CONTROL & PRESENTATION TOOLBAR ── */}
      <div className="sticky top-0 z-30 mb-4 p-3 sm:p-4 rounded-3xl sacred-glass border border-[var(--border-subtle)] shadow-md flex flex-col gap-3">
        
        {/* ROW 1: Branding Title & Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          
          {/* Left/Start side: Title & Current Ep Indicator */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500/20 via-emerald-600/30 to-amber-600/20 flex items-center justify-center border border-amber-500/30 shadow-xs shrink-0">
              <Sparkles className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold font-urdu text-[var(--text-primary)]">
                  {selectedModuleId === 1
                    ? 'ماڈیول ۱: صحیفۂ سحر (سال ۱ تا ۴ بعثت)'
                    : selectedModuleId === 2
                    ? 'ماڈیول ۲: صحیفۂ نور و استقامت (سال ۴ تا ۵ بعثت — تمام ۸۸ آیات)'
                    : 'سلسلۂ نزولِ تدریجی: غارِ حرا سے شرحِ صدر تک (سال ۱ تا ۵ بعثت)'}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-500/30 font-urdu">
                  {displayedEpisodes.length} تفسیری مراحل
                </span>
              </div>
              <p className="text-[11px] text-[var(--text-muted)] font-urdu hidden sm:block">
                غارِ حرا کی تنہائی (اقْرَأْ) سے کعبہ کے سجدۂ فتح اور سورۃ الشرح کی عالمگیر تسلی (فَإِنَّ مَعَ الْعُسْرِ يُسْرًا) تک
              </p>
            </div>
          </div>

          {/* Right side: Timeline style, Direction toggle, Font scaler, Fullscreen */}
          <div className="flex items-center flex-wrap gap-2">
            
            {/* Timeline Visual Style Switcher: Spine Axis vs Stream Cards */}
            <div className="flex items-center bg-[var(--bg-surface)] p-1 rounded-2xl border border-amber-500/30 shadow-xs">
              <button
                onClick={() => setTimelineStyle('spine')}
                title="مرکزی لائن اور اوپر نیچے شاخ دار ٹائم لائن (Alternating Spine Timeline)"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-urdu font-bold transition-all cursor-pointer ${
                  timelineStyle === 'spine'
                    ? 'bg-amber-600 text-white shadow-xs ring-1 ring-amber-400/40'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                <GitBranch className="w-3.5 h-3.5 text-amber-300" />
                <span>محوری ٹائم لائن (مرکزی لائن و شاخیں)</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-white/20 text-white font-urdu">مطلوبہ</span>
              </button>
              <button
                onClick={() => setTimelineStyle('stream')}
                title="تفصیلی اسٹریم کارڈز ویو (Continuous Stream Cards)"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-urdu font-bold transition-all cursor-pointer ${
                  timelineStyle === 'stream'
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>اسٹریم کارڈز</span>
              </button>
            </div>

            {/* Scroll Direction Toggle (visible only in stream mode) */}
            {timelineStyle === 'stream' && (
              <div className="flex items-center bg-[var(--bg-surface)] p-1 rounded-2xl border border-[var(--border-subtle)] shadow-2xs">
                <button
                  onClick={() => setScrollOrientation('horizontal-rtl')}
                  title="دائیں سے بائیں افقی اسکرولنگ (Horizontal RTL Flow)"
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-urdu font-semibold transition-all cursor-pointer ${
                    scrollOrientation === 'horizontal-rtl'
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <AlignRight className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">افقی</span>
                </button>
                <button
                  onClick={() => setScrollOrientation('vertical')}
                  title="اوپر سے نیچے عمودی اسکرولنگ (Vertical Feed)"
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-urdu font-semibold transition-all cursor-pointer ${
                    scrollOrientation === 'vertical'
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <ArrowDownUp className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">عمودی</span>
                </button>
              </div>
            )}

            {/* Toggle Ayahs in Cards (only in stream mode) */}
            {timelineStyle === 'stream' && (
              <button
                onClick={() => setShowAyatInCards(!showAyatInCards)}
                title="قرآنی آیات و ترجمہ دکھائیں / چھپائیں"
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-2xl border text-xs font-urdu font-semibold transition-all cursor-pointer ${
                  showAyatInCards
                    ? 'bg-amber-500/15 border-amber-500/30 text-amber-800 dark:text-amber-300'
                    : 'bg-[var(--bg-surface)] border-[var(--border-subtle)] text-[var(--text-muted)]'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span className="hidden md:inline">آیات و ترجمہ</span>
              </button>
            )}

            {/* Classroom Font Size Zoom Controls */}
            <div className="flex items-center bg-[var(--bg-surface)] px-1.5 py-1 rounded-2xl border border-[var(--border-subtle)] shadow-2xs">
              <button
                onClick={() => setFontScaleDelta((prev) => Math.max(prev - 1, -2))}
                title="کلاس روم فونٹ چھوٹا کریں (Zoom Out)"
                disabled={fontScaleDelta <= -2}
                className="p-1 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] disabled:opacity-40 cursor-pointer"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="text-[11px] font-bold px-1.5 text-[var(--text-primary)] font-urdu select-none">
                فونٹ {fontScaleDelta > 0 ? `+${fontScaleDelta}` : fontScaleDelta}
              </span>
              <button
                onClick={() => setFontScaleDelta((prev) => Math.min(prev + 1, 6))}
                title="کلاس روم پروجیکٹر فونٹ بڑا کریں (Zoom In)"
                disabled={fontScaleDelta >= 6}
                className="p-1 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] disabled:opacity-40 cursor-pointer"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Previous / Next Stepper buttons for teacher (stream mode) */}
            {timelineStyle === 'stream' && (
              <div className="flex items-center gap-1 bg-[var(--bg-surface)] p-1 rounded-2xl border border-[var(--border-subtle)] shadow-2xs">
                <button
                  onClick={handlePrev}
                  disabled={activeEpisodeIndex === 0}
                  title="پچھلا مرحلہ"
                  className="p-1.5 rounded-xl hover:bg-emerald-600/15 text-[var(--text-primary)] disabled:opacity-30 cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <span className="text-xs font-bold px-2 text-emerald-800 dark:text-emerald-300 font-urdu">
                  {activeEpisodeIndex + 1} / {displayedEpisodes.length}
                </span>
                <button
                  onClick={handleNext}
                  disabled={activeEpisodeIndex === displayedEpisodes.length - 1}
                  title="اگلا مرحلہ"
                  className="p-1.5 rounded-xl hover:bg-emerald-600/15 text-[var(--text-primary)] disabled:opacity-30 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Fullscreen Button */}
            <button
              onClick={() => {
                if (timelineStyle === 'spine') {
                  window.dispatchEvent(new CustomEvent('toggle-timeline-zen'));
                } else {
                  toggleFullscreen();
                }
              }}
              title="پوری اسکرین پر بغیر کسی مینیو کے صرف ٹائم لائن دیکھیں"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-urdu font-bold text-xs shadow-sm cursor-pointer transition-all hover:scale-102 active:scale-95"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>مکمل اسکرین (Full HD)</span>
            </button>
          </div>
        </div>

        {/* ROW 2: MODULE FILTER TABS */}
        <div className="flex items-center gap-2 pt-1 border-t border-[var(--border-subtle)] overflow-x-auto no-scrollbar">
          <span className="text-xs font-bold text-[var(--text-muted)] font-urdu shrink-0">
            ماڈیول کا انتخاب:
          </span>
          <button
            onClick={() => setSelectedModuleId('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-urdu font-semibold transition-all cursor-pointer shrink-0 ${
              selectedModuleId === 'all'
                ? 'bg-amber-600 text-white font-bold shadow-xs'
                : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)]'
            }`}
          >
            تمام ماڈیولز (مکمل سلسلۂ نزول — سال ۱ تا ۵ بعثت / ۱۲ مراحل)
          </button>
          <button
            onClick={() => setSelectedModuleId(1)}
            className={`px-3 py-1.5 rounded-xl text-xs font-urdu font-semibold transition-all cursor-pointer shrink-0 ${
              selectedModuleId === 1
                ? 'bg-emerald-700 text-white font-bold shadow-xs ring-1 ring-amber-400/40'
                : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)]'
            }`}
          >
            ماڈیول ۱: صحیفۂ سحر (غارِ حرا سے سجدۂ فتح تک — سال ۱ تا ۴ بعثت)
          </button>
          <button
            onClick={() => setSelectedModuleId(2)}
            className={`px-3 py-1.5 rounded-xl text-xs font-urdu font-semibold transition-all cursor-pointer shrink-0 flex items-center gap-1.5 ${
              selectedModuleId === 2
                ? 'bg-emerald-700 text-white font-bold shadow-xs ring-1 ring-amber-400/40'
                : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)]'
            }`}
          >
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>ماڈیول ۲: صحیفۂ نور و استقامت (آسمان کا شق ہونا سے شرحِ صدر تک — ۸۸ آیات)</span>
          </button>
        </div>
      </div>

      {/* ── CONDITIONAL RENDER: SPINE TIMELINE VS STREAM CARDS ── */}
      {timelineStyle === 'spine' ? (
        <AlternatingSpineTimeline
          selectedModuleId={selectedModuleId}
          fontScaleDelta={fontScaleDelta}
        />
      ) : (
        <>
          {/* ── QUICK STEP SCRUBBER MINI-RIBBON (Stream Mode) ── */}
          <div className="w-full mb-4 px-1 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-2 min-w-max p-1 bg-[var(--bg-surface)]/70 backdrop-blur-md rounded-2xl border border-[var(--border-subtle)]">
              {displayedEpisodes.map((ep, idx) => {
                const isActive = activeEpisodeIndex === idx;
                return (
                  <button
                    key={ep.id}
                    onClick={() => scrollToEpisode(idx)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-urdu transition-all cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-emerald-800 to-emerald-700 text-white font-bold shadow-xs scale-102 ring-1 ring-amber-400/50'
                        : 'bg-transparent text-[var(--text-secondary)] hover:bg-[var(--bg-surface-elevated)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-2xs"
                      style={{ backgroundColor: ep.colorCode }}
                    >
                      {ep.stepNumber}
                    </span>
                    <span className="truncate max-w-[150px] font-semibold">{ep.surahNameUrdu}</span>
                    <span className="text-[10px] opacity-75 hidden lg:inline">{ep.dateUrdu.split('(')[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>

      {/* ── MAIN CONTINUOUS SCROLLING CONTAINER ── */}
      <div
        ref={containerRef}
        className={`w-full transition-all duration-300 ${
          scrollOrientation === 'horizontal-rtl'
            ? 'flex flex-row overflow-x-auto gap-6 sm:gap-8 pb-8 pt-2 scroll-smooth items-stretch'
            : 'flex flex-col gap-8 pb-12 pt-2'
        }`}
        style={{
          scrollSnapType: scrollOrientation === 'horizontal-rtl' ? 'x mandatory' : 'none',
        }}
      >
        {displayedEpisodes.map((episode, idx) => {
          const verses = episodeVersesMap[episode.id] || [];
          const isLoading = loadingVerses[episode.id];
          const isActive = activeEpisodeIndex === idx;

          return (
            <article
              key={episode.id}
              ref={(el) => {
                cardRefs.current[episode.id] = el;
              }}
              style={{
                scrollSnapAlign: scrollOrientation === 'horizontal-rtl' ? 'center' : 'none',
              }}
              className={`relative rounded-3xl sacred-glass border transition-all duration-300 flex flex-col justify-between shadow-lg ${
                isActive
                  ? 'border-amber-500/60 ring-2 ring-amber-400/30 shadow-2xl'
                  : 'border-[var(--border-subtle)] hover:border-emerald-500/40'
              } ${
                scrollOrientation === 'horizontal-rtl'
                  ? 'w-[90vw] sm:w-[680px] lg:w-[820px] xl:w-[900px] shrink-0'
                  : 'w-full'
              }`}
            >
              {/* Card Header & Milestone Badges */}
              <div className="p-5 sm:p-7 border-b border-[var(--border-subtle)] bg-gradient-to-b from-amber-500/5 via-transparent to-transparent rounded-t-3xl">
                
                {/* Row 1: Step Number, Module Badge, Surah Badge, Date & Location */}
                <div className="flex flex-wrap items-center justify-between gap-2.5 mb-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className="px-3 py-1 rounded-xl text-xs font-bold text-white shadow-xs font-urdu"
                      style={{ backgroundColor: episode.colorCode }}
                    >
                      مرحلہ {episode.stepNumber}: {episode.surahNameUrdu}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-secondary)] font-urdu">
                      {episode.moduleTitleUrdu}
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-800 dark:text-emerald-300 px-2.5 py-0.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 font-urdu">
                      {episode.surahNameArabic} (آیات {episode.verseRange.fromVerse} تا {episode.verseRange.toVerse})
                    </span>
                  </div>

                  {/* Exact Historical Date Badge */}
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-800 dark:text-amber-300 text-xs font-urdu font-bold">
                    <Calendar className="w-3.5 h-3.5 shrink-0" />
                    <span>{episode.dateUrdu}</span>
                  </div>
                </div>

                {/* Row 2: Headline Title */}
                <h3
                  className="font-bold text-[var(--text-primary)] font-urdu leading-snug mb-2"
                  style={{ fontSize: `${22 + fontScaleDelta}px` }}
                >
                  {episode.titleUrdu}
                </h3>

                {/* Row 3: Location and Historical Persona Chips */}
                <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--text-secondary)] font-urdu pt-1">
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
                    <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                    <span className="font-medium">{episode.locationUrdu}</span>
                  </div>

                  <div className="flex items-center gap-1.5 flex-wrap">
                    <Users className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                    {episode.historicalFigures.map((person, pIdx) => (
                      <span
                        key={pIdx}
                        className="px-2 py-0.5 rounded-md bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[11px] font-medium"
                      >
                        {person}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Card Body: Detailed Urdu Narrative */}
              <div className="p-5 sm:p-7 space-y-4 flex-1">
                
                {/* Quranic Quote Highlight Box */}
                {episode.keyQuranicQuotes.length > 0 && (
                  <div className="p-4 sm:p-5 rounded-2xl bg-emerald-500/5 dark:bg-emerald-950/20 border border-emerald-500/25 space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-emerald-800 dark:text-emerald-300 font-urdu">
                      <div className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        <span>قرآنی اعلانِ نور</span>
                      </div>
                      <span className="text-[11px] opacity-80">{episode.keyQuranicQuotes[0].reference}</span>
                    </div>

                    <p
                      className="font-arabic font-bold text-[var(--text-primary)] text-center leading-loose tracking-wide pt-1"
                      style={{ fontSize: `${22 + fontScaleDelta}px` }}
                    >
                      {episode.keyQuranicQuotes[0].arabic}
                    </p>

                    <p
                      className="font-urdu text-[var(--text-secondary)] text-center leading-relaxed font-medium"
                      style={{ fontSize: `${15 + fontScaleDelta * 0.7}px` }}
                    >
                      {episode.keyQuranicQuotes[0].translationUrdu}
                    </p>
                  </div>
                )}

                {/* Exegesis Narrative Paragraphs */}
                <div className="space-y-3 font-urdu text-[var(--text-primary)]">
                  {episode.detailedNarrativeUrdu.map((para, paraIdx) => (
                    <p
                      key={paraIdx}
                      className="leading-loose text-justify font-medium"
                      style={{ fontSize: `${16 + fontScaleDelta}px` }}
                    >
                      {para}
                    </p>
                  ))}
                </div>

                {/* Embedded Quranic Verses (if toggled on) */}
                {showAyatInCards && (
                  <div className="mt-5 pt-5 border-t border-[var(--border-subtle)] space-y-3">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs sm:text-sm font-bold font-urdu text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                        <BookOpen className="w-4 h-4 text-emerald-600" />
                        <span>متعلقہ قرآنی آیات (آیت بہ آیت تلاوت و تفہیم)</span>
                      </h4>
                      <span className="text-[11px] font-bold text-[var(--text-muted)] font-urdu">
                        {verses.length} آیاتِ مبارکہ
                      </span>
                    </div>

                    {isLoading ? (
                      <div className="py-6 text-center text-xs font-urdu text-[var(--text-muted)] animate-pulse">
                        آیات لوڈ ہو رہی ہیں...
                      </div>
                    ) : verses.length > 0 ? (
                      <div className="space-y-3 max-h-[440px] overflow-y-auto pr-1">
                        {verses.map((verse) => {
                          const isPlayingThis =
                            activeAudio?.surahNumber === verse.surahNumber &&
                            activeAudio?.ayahNumber === verse.ayahNumber &&
                            activeAudio?.isPlaying;

                          return (
                            <div
                              key={`${verse.surahNumber}-${verse.ayahNumber}`}
                              className="p-3.5 rounded-2xl bg-[var(--bg-surface)]/80 border border-[var(--border-subtle)] hover:border-amber-500/30 transition-all flex flex-col gap-2"
                            >
                              <div className="flex items-center justify-between">
                                <span className="w-6 h-6 rounded-full bg-emerald-600/15 text-emerald-800 dark:text-emerald-300 text-[11px] font-bold flex items-center justify-center font-arabic">
                                  {verse.ayahNumber}
                                </span>
                                <button
                                  onClick={() => {
                                    if (isPlayingThis) {
                                      pauseAudio();
                                    } else {
                                      playAyah(verse.surahNumber, verse.ayahNumber, episode.stepNumber);
                                    }
                                  }}
                                  title={isPlayingThis ? 'تلاوت روکیں' : 'آیت کی تلاوت سنیں'}
                                  className={`p-1.5 rounded-xl transition-all cursor-pointer ${
                                    isPlayingThis
                                      ? 'bg-amber-600 text-white shadow-xs'
                                      : 'bg-emerald-600/10 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-600/20'
                                  }`}
                                >
                                  {isPlayingThis ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                                </button>
                              </div>

                              {/* Arabic Text */}
                              <p
                                className="font-arabic font-bold text-[var(--text-primary)] text-right leading-loose pt-0.5"
                                style={{ fontSize: `${20 + fontScaleDelta}px` }}
                              >
                                {verse.textArabic}
                              </p>

                              {/* Urdu Translation */}
                              <p
                                className="font-urdu text-[var(--text-secondary)] text-right leading-relaxed font-medium"
                                style={{ fontSize: `${14 + fontScaleDelta * 0.7}px` }}
                              >
                                {verse.translationUrdu}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    ) : null}
                  </div>
                )}

                {/* Pedagogical Takeaways (تدریسی نکات) */}
                <div className="mt-5 p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20">
                  <div className="flex items-center gap-1.5 text-xs font-bold font-urdu text-amber-800 dark:text-amber-300 mb-2">
                    <GraduationCap className="w-4 h-4" />
                    <span>کلاس روم تدریسی نکات (Pedagogical Takeaways)</span>
                  </div>
                  <ul className="space-y-1.5 font-urdu text-xs sm:text-sm text-[var(--text-secondary)]">
                    {episode.pedagogicalTakeaways.map((point, ptIdx) => (
                      <li key={ptIdx} className="flex items-start gap-2 leading-relaxed">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-1" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Card Footer: Timeline Jump & Marker */}
              <div className="p-4 px-5 sm:px-7 border-t border-[var(--border-subtle)] bg-[var(--bg-surface)]/60 rounded-b-3xl flex items-center justify-between text-xs font-urdu text-[var(--text-muted)]">
                <span className="font-semibold text-emerald-800 dark:text-emerald-300">
                  سال {episode.yearNabawi} بعثت ({episode.yearsBeforeHijra} قبلِ ہجرت / {episode.yearCE}ء)
                </span>
                <span className="font-medium">
                  مرحلہ {episode.stepNumber} از {displayedEpisodes.length}
                </span>
              </div>
            </article>
          );
        })}

        {/* ── EPILOGUE FINALE CARD ── */}
        <article
          className={`rounded-3xl sacred-glass border-2 border-amber-500/50 p-6 sm:p-8 flex flex-col justify-between shadow-2xl bg-gradient-to-br from-amber-500/10 via-[var(--bg-surface)] to-emerald-900/15 ${
            scrollOrientation === 'horizontal-rtl'
              ? 'w-[90vw] sm:w-[600px] lg:w-[720px] shrink-0'
              : 'w-full'
          }`}
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-white font-urdu">
                {selectedModuleId === 2 ? 'خلاصۂ ماڈیول ۲' : 'خلاصۂ سفر'}
              </span>
              <h3
                className="font-bold text-[var(--text-primary)] font-urdu"
                style={{ fontSize: `${22 + fontScaleDelta}px` }}
              >
                {selectedModuleId === 2
                  ? SAHIFA_NOOR_EPILOGUE.titleUrdu
                  : SAHIFA_SAHAR_EPILOGUE.titleUrdu}
              </h3>
            </div>

            <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-amber-500/30 my-4 space-y-3 font-urdu">
              <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-xs sm:text-sm">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>
                  {selectedModuleId === 2
                    ? SAHIFA_NOOR_EPILOGUE.startMarkUrdu
                    : SAHIFA_SAHAR_EPILOGUE.startMarkUrdu}
                </span>
              </div>
              <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-bold text-xs sm:text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>
                  {selectedModuleId === 2
                    ? SAHIFA_NOOR_EPILOGUE.endMarkUrdu
                    : SAHIFA_SAHAR_EPILOGUE.endMarkUrdu}
                </span>
              </div>
            </div>

            <p
              className="font-urdu text-[var(--text-primary)] leading-loose text-justify font-medium pt-2"
              style={{ fontSize: `${16 + fontScaleDelta}px` }}
            >
              {selectedModuleId === 2
                ? SAHIFA_NOOR_EPILOGUE.summaryTextUrdu
                : SAHIFA_SAHAR_EPILOGUE.summaryTextUrdu}
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-[var(--border-subtle)] text-center text-xs font-urdu font-bold text-emerald-800 dark:text-emerald-300">
            {selectedModuleId === 2
              ? 'صحیفۂ نور و استقامت — ماڈیول ۲ کی تمام ۸۸ آیات مکمل'
              : 'صحیفۂ سحر و نور — مکمل قرآنی زمانی سفر (سال ۱ تا ۵ بعثت)'}
          </div>
        </article>
      </div>
    </>
  )}
</div>
  );
};
