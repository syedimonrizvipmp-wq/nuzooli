import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useQuran } from '@/context/QuranContext';
import {
  SAHIFA_SAHAR_EPISODES,
  SahifaSaharEpisode,
} from '@/data/sahifaSaharChronologyData';
import { loadSurahVerses } from '@/utils/quranVerseLoader';
import { Verse } from '@/types/quran';
import {
  Sparkles,
  Calendar,
  MapPin,
  BookOpen,
  Play,
  Pause,
  X,
  ZoomIn,
  ZoomOut,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  GraduationCap,
  ExternalLink,
  Maximize2,
  MoveHorizontal,
} from 'lucide-react';

interface AlternatingSpineTimelineProps {
  selectedModuleId: 'all' | 1 | 2;
  fontScaleDelta: number;
  initialZenMode?: boolean;
}

export const AlternatingSpineTimeline: React.FC<AlternatingSpineTimelineProps> = ({
  selectedModuleId,
  fontScaleDelta,
  initialZenMode = false,
}) => {
  const { playAyah, pauseAudio, activeAudio } = useQuran();

  // True Immersive Zen Presentation Mode (only timeline & boxes on screen, no menu/banners)
  const [isZenMode, setIsZenMode] = useState<boolean>(initialZenMode);
  const wasBrowserFsRef = useRef<boolean>(false);

  // Active episode selected for the deep-dive reading modal
  const [modalEpisode, setModalEpisode] = useState<SahifaSaharEpisode | null>(null);
  const [modalFontDelta, setModalFontDelta] = useState<number>(fontScaleDelta);

  // Cached verses per episode
  const [episodeVersesMap, setEpisodeVersesMap] = useState<Record<string, Verse[]>>({});
  const [loadingVerses, setLoadingVerses] = useState<Record<string, boolean>>({});

  const trackRef = useRef<HTMLDivElement>(null);

  // Drag-to-scroll state
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [scrollLeftState, setScrollLeftState] = useState<number>(0);
  const [hasMovedDrag, setHasMovedDrag] = useState<boolean>(false);

  // Filter episodes
  const displayedEpisodes = selectedModuleId === 'all'
    ? SAHIFA_SAHAR_EPISODES
    : SAHIFA_SAHAR_EPISODES.filter((ep) => ep.moduleId === selectedModuleId);

  // Sync modal font delta with prop
  useEffect(() => {
    setModalFontDelta(fontScaleDelta);
  }, [fontScaleDelta]);

  // Enter True Immersive Zen Presentation Mode (both React portal overlay & native browser fullscreen)
  const enterZenMode = async () => {
    setIsZenMode(true);
    try {
      if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
        wasBrowserFsRef.current = true;
      }
    } catch {
      // If browser security blocks requestFullscreen, the React portal overlay
      // still occupies 100% of the screen seamlessly!
    }
  };

  // Exit Zen Presentation Mode
  const exitZenMode = async () => {
    setIsZenMode(false);
    try {
      if (document.fullscreenElement && document.exitFullscreen) {
        await document.exitFullscreen();
        wasBrowserFsRef.current = false;
      }
    } catch {}
  };

  // Handle body scroll locking when Zen mode is active
  useEffect(() => {
    if (isZenMode) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isZenMode]);

  // Sync with browser native fullscreen changes (e.g. user pressed Esc in browser)
  useEffect(() => {
    const handleFsChange = () => {
      if (!document.fullscreenElement && wasBrowserFsRef.current) {
        wasBrowserFsRef.current = false;
        setIsZenMode(false);
      }
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  // Listen to global toggle event (dispatched from top navbar)
  useEffect(() => {
    const handleToggle = () => {
      if (isZenMode) {
        exitZenMode();
      } else {
        enterZenMode();
      }
    };
    window.addEventListener('toggle-timeline-zen', handleToggle);
    return () => window.removeEventListener('toggle-timeline-zen', handleToggle);
  }, [isZenMode]);

  // Handle Escape key to close modal or exit Zen mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (modalEpisode) {
          setModalEpisode(null);
        } else if (isZenMode) {
          exitZenMode();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalEpisode, isZenMode]);

  // Load verses for active modal episode or all on demand
  useEffect(() => {
    if (!modalEpisode) return;
    const ep = modalEpisode;
    if (episodeVersesMap[ep.id]) return;

    (async () => {
      try {
        setLoadingVerses((prev) => ({ ...prev, [ep.id]: true }));
        const allVerses = await loadSurahVerses(ep.surahNumber);
        const filtered = allVerses.filter(
          (v) => v.ayahNumber >= ep.verseRange.fromVerse && v.ayahNumber <= ep.verseRange.toVerse
        );
        setEpisodeVersesMap((prev) => ({ ...prev, [ep.id]: filtered }));
      } catch (err) {
        console.error('Failed to load verses for modal episode:', ep.id, err);
      } finally {
        setLoadingVerses((prev) => ({ ...prev, [ep.id]: false }));
      }
    })();
  }, [modalEpisode, episodeVersesMap]);

  // Smooth Horizontal Scrolling Buttons (◀ Forward / Left in RTL, ▶ Backward / Right in RTL)
  const scrollTrack = useCallback((direction: 'left' | 'right') => {
    const el = trackRef.current;
    if (!el) return;
    const scrollAmount = 450;
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  }, []);

  // Mouse wheel handler:
  // In Zen mode (where full height is timeline), mouse wheel scrolls horizontally smoothly.
  // In normal mode, only scroll horizontally if shiftKey is pressed, or if deltaX is dominant.
  // This completely fixes vertical page scroll on the right-hand side so users don't get trapped!
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      if (isZenMode) {
        e.preventDefault();
        el.scrollLeft -= (e.deltaY || e.deltaX) * 1.2;
      } else if (e.shiftKey || Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        // Horizontal intent: smoothly scroll track
        el.scrollLeft -= (e.deltaX || e.deltaY) * 1.2;
      }
      // Otherwise, let the normal page scroll vertically without interference!
    };

    el.addEventListener('wheel', handleWheel, { passive: !isZenMode });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [isZenMode]);

  // Mouse Drag-to-Scroll handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    const el = trackRef.current;
    if (!el) return;
    setIsDragging(true);
    setHasMovedDrag(false);
    setStartX(e.pageX - el.offsetLeft);
    setScrollLeftState(el.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !trackRef.current) return;
    const el = trackRef.current;
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX) * 1.5;
    if (Math.abs(walk) > 5) {
      setHasMovedDrag(true);
    }
    el.scrollLeft = scrollLeftState - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleCardClick = (episode: SahifaSaharEpisode) => {
    // If the user was dragging the track, don't trigger card modal accidentally
    if (!hasMovedDrag) {
      setModalEpisode(episode);
    }
  };

  // Modal navigation (next/prev episode)
  const currentModalIndex = modalEpisode
    ? displayedEpisodes.findIndex((e) => e.id === modalEpisode.id)
    : -1;

  const handleModalPrev = () => {
    if (currentModalIndex > 0) {
      setModalEpisode(displayedEpisodes[currentModalIndex - 1]);
    }
  };

  const handleModalNext = () => {
    if (currentModalIndex < displayedEpisodes.length - 1) {
      setModalEpisode(displayedEpisodes[currentModalIndex + 1]);
    }
  };

  const timelineContent = (
    <div
      className={
        isZenMode
          ? 'fixed inset-0 w-screen h-screen z-[999999] bg-[var(--bg-primary)] flex flex-col justify-between overflow-hidden m-0 p-0 shadow-2xl select-none'
          : 'relative w-full rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]/50 transition-all duration-300 select-none'
      }
      style={
        isZenMode
          ? {
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: '100vw',
              height: '100vh',
              zIndex: 999999,
              margin: 0,
              padding: 0,
            }
          : undefined
      }
      dir="rtl"
    >
      {/* ── TOP ZEN HEADER / CONTROLS (Only visible or prominent in Zen Mode) ── */}
      {isZenMode ? (
        <div className="w-full px-4 sm:px-6 py-3 border-b border-[var(--border-subtle)] bg-[var(--bg-surface)]/95 backdrop-blur-md flex items-center justify-between z-30 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-500 shadow-xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-urdu font-bold text-base text-[var(--text-primary)]">
                  صرف ٹائم لائن موڈ (مکمل اسکرین تفہیمی منظر)
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-700 text-white font-urdu">
                  {displayedEpisodes.length} مراحل
                </span>
              </div>
              <p className="text-[11px] text-[var(--text-muted)] font-urdu hidden sm:block">
                مرکزی افقی لکیر اور اوپر نیچے شاخ نما کارڈز — ماؤس ڈریگ یا بٹنز سے رواں اسکرول کریں
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Drag hint */}
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-[11px] text-[var(--text-muted)] font-urdu">
              <MoveHorizontal className="w-3.5 h-3.5 text-amber-500" />
              <span>ماؤس دبا کر دائیں بائیں سرکائیں (Drag to Scroll)</span>
            </div>

            {/* Native browser fullscreen toggle button */}
            <button
              onClick={async () => {
                if (!document.fullscreenElement) {
                  try {
                    await document.documentElement.requestFullscreen?.();
                    wasBrowserFsRef.current = true;
                  } catch {}
                } else {
                  try {
                    await document.exitFullscreen?.();
                    wasBrowserFsRef.current = false;
                  } catch {}
                }
              }}
              title="براؤزر فل اسکرین فعال / غیر فعال کریں"
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[var(--bg-surface-elevated)] hover:bg-emerald-600/15 border border-[var(--border-subtle)] text-xs text-[var(--text-primary)] font-urdu font-bold cursor-pointer transition-all active:scale-95"
            >
              <Maximize2 className="w-3.5 h-3.5 text-amber-500" />
              <span>براؤزر فل اسکرین</span>
            </button>

            {/* Exit Zen Mode Button */}
            <button
              onClick={exitZenMode}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold font-urdu shadow-md cursor-pointer transition-all active:scale-95"
            >
              <X className="w-4 h-4" />
              <span>عام اسکرین پر واپس جائیں (Exit Full HD / Esc)</span>
            </button>
          </div>
        </div>
      ) : (
        /* Normal Mode Top Helper Bar */
        <div className="px-5 py-3 border-b border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-3 bg-[var(--bg-surface)]/80 rounded-t-3xl">
          <div className="flex items-center gap-2 text-xs font-urdu font-bold text-[var(--text-secondary)]">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>محوری ٹائم لائن: مرکزی افقی لکیر اور اوپر نیچے متبادل شاخیں (۱ تا ۱۲ مراحل)</span>
          </div>

          {/* Trigger Fullscreen Zen Mode Button */}
          <button
            onClick={enterZenMode}
            title="پورے مانیٹر پر بغیر کسی مینیو یا ہیڈر کے صرف ٹائم لائن دکھائیں"
            className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-amber-600 via-amber-500 to-emerald-600 hover:from-amber-500 hover:to-emerald-500 text-white text-xs font-urdu font-bold shadow-md ring-2 ring-amber-400/50 transition-all cursor-pointer active:scale-95 hover:scale-102"
          >
            <Maximize2 className="w-4 h-4 animate-pulse" />
            <span>🖥️ فل ایچ ڈی پوری اسکرین پر دیکھیں (مینو چھپائیں)</span>
          </button>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* ── TIMELINE TRACK CANVAS (SCROLLABLE RIGHT-TO-LEFT) ── */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <div
        ref={trackRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className={`relative w-full overflow-x-auto overflow-y-hidden py-4 px-8 sm:px-14 scroll-smooth no-scrollbar select-none ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        } ${isZenMode ? 'flex-1 flex items-center' : ''}`}
        style={{
          minHeight: isZenMode ? 'auto' : '720px',
          height: isZenMode ? 'calc(100vh - 120px)' : '720px',
        }}
      >
        <div
          className="relative flex items-center shrink-0 my-auto"
          style={{
            minWidth: `${Math.max(displayedEpisodes.length * 440 + 600, 2600)}px`,
            height: isZenMode ? '90%' : '660px',
          }}
        >
          {/* ── THE CENTRAL HORIZONTAL GLOWING SPINE ── */}
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-2.5 rounded-full bg-gradient-to-r from-amber-600 via-emerald-600 to-amber-500 shadow-md z-10">
            <div className="absolute inset-0 rounded-full bg-amber-400/40 blur-xs" />
          </div>

          {/* Start marker on right (RTL start) */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
            <div className="w-11 h-11 rounded-full bg-amber-500 border-4 border-[var(--bg-surface)] text-white shadow-xl flex items-center justify-center font-bold text-xs font-urdu ring-4 ring-amber-400/40">
              آغاز
            </div>
            <span className="mt-2 text-[11px] font-bold text-amber-700 dark:text-amber-300 font-urdu whitespace-nowrap bg-[var(--bg-surface)] px-2.5 py-0.5 rounded-md border border-amber-500/30 shadow-xs">
              سال ۱ بعثت (۶۱۰ء)
            </span>
          </div>

          {/* End marker on left (RTL end) */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
            <div className="w-11 h-11 rounded-full bg-emerald-700 border-4 border-[var(--bg-surface)] text-white shadow-xl flex items-center justify-center font-bold text-xs font-urdu ring-4 ring-emerald-500/40">
              تکمیل
            </div>
            <span className="mt-2 text-[11px] font-bold text-emerald-800 dark:text-emerald-300 font-urdu whitespace-nowrap bg-[var(--bg-surface)] px-2.5 py-0.5 rounded-md border border-emerald-500/30 shadow-xs">
              سال ۵ بعثت (۶۱۵ء)
            </span>
          </div>

          {/* ── ALTERNATING MILESTONE NODES AND CONNECTING STEMS ── */}
          <div className="flex items-center justify-around w-full px-28 z-20">
            {displayedEpisodes.map((episode, idx) => {
              const isTop = idx % 2 === 0;

              return (
                <div
                  key={episode.id}
                  className="relative flex flex-col items-center shrink-0"
                  style={{ width: '400px', margin: '0 24px' }}
                >
                  {/* ── TOP PLACED CARD (When isTop === true) ── */}
                  {isTop && (
                    <div
                      className="absolute bottom-1/2 mb-9 w-[380px] group transition-all duration-300 hover:scale-102 hover:z-30 cursor-pointer"
                      onClick={() => handleCardClick(episode)}
                    >
                      {/* Milestone Card */}
                      <div className="p-4 sm:p-5 rounded-3xl sacred-glass border border-[var(--border-subtle)] hover:border-amber-500/70 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col gap-2 bg-gradient-to-b from-[var(--bg-surface-elevated)] to-[var(--bg-surface)]/95">
                        {/* Header Badge */}
                        <div className="flex items-center justify-between gap-2">
                          <span
                            className="px-2.5 py-0.5 rounded-xl text-[11px] font-bold text-white shadow-xs font-urdu"
                            style={{ backgroundColor: episode.colorCode }}
                          >
                            مرحلہ {episode.stepNumber}: {episode.surahNameUrdu}
                          </span>
                          <span className="text-[10px] font-bold text-amber-800 dark:text-amber-300 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-lg font-urdu truncate max-w-[170px]">
                            {episode.dateUrdu.split('(')[0]}
                          </span>
                        </div>

                        {/* Title */}
                        <h4 className="font-bold text-sm sm:text-base text-[var(--text-primary)] font-urdu leading-snug line-clamp-2">
                          {episode.titleUrdu}
                        </h4>

                        {/* Ayah Snippet Callout */}
                        {episode.keyQuranicQuotes.length > 0 && (
                          <div className="p-2.5 rounded-xl bg-emerald-500/5 dark:bg-emerald-950/20 border border-emerald-500/20 space-y-1">
                            <p className="font-arabic font-bold text-xs text-emerald-800 dark:text-emerald-300 truncate text-right">
                              {episode.keyQuranicQuotes[0].arabic}
                            </p>
                            <p className="font-urdu text-[11px] text-[var(--text-secondary)] line-clamp-2 leading-relaxed text-right">
                              {episode.keyQuranicQuotes[0].translationUrdu}
                            </p>
                          </div>
                        )}

                        {/* Teaser Narrative */}
                        <p className="font-urdu text-[12px] text-[var(--text-muted)] line-clamp-2 leading-relaxed text-justify">
                          {episode.detailedNarrativeUrdu[0]}
                        </p>

                        {/* Location & Read More Button */}
                        <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] font-urdu">
                          <span className="flex items-center gap-1 text-[var(--text-muted)] truncate max-w-[170px]">
                            <MapPin className="w-3 h-3 text-rose-500 shrink-0" />
                            <span className="truncate">{episode.locationUrdu}</span>
                          </span>
                          <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-300 font-bold group-hover:text-amber-600 transition-colors">
                            <span>تفصیلات و آیات</span>
                            <ExternalLink className="w-3 h-3" />
                          </span>
                        </div>
                      </div>

                      {/* ── VERTICAL STEM LINE (Downward to axis node) ── */}
                      <div className="absolute left-1/2 -translate-x-1/2 top-full h-9 w-1 bg-gradient-to-b from-amber-500 to-amber-600 shadow-xs">
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-amber-500" />
                      </div>
                    </div>
                  )}

                  {/* ── CENTRAL AXIS NODE BUTTON ── */}
                  <button
                    onClick={() => handleCardClick(episode)}
                    title={`مرحلہ ${episode.stepNumber}: ${episode.titleUrdu} — مکمل تفصیلات کھولیں`}
                    className="relative z-30 w-12 h-12 rounded-full bg-[var(--bg-surface)] border-4 border-amber-500 hover:border-emerald-500 text-[var(--text-primary)] shadow-xl flex items-center justify-center font-bold text-xs font-urdu transition-all duration-300 hover:scale-125 cursor-pointer group"
                    style={{
                      boxShadow: `0 0 16px ${episode.colorCode}55`,
                    }}
                  >
                    <span
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs font-urdu shadow-xs group-hover:rotate-12 transition-transform"
                      style={{ backgroundColor: episode.colorCode }}
                    >
                      {episode.stepNumber}
                    </span>
                    <div
                      className="absolute inset-0 rounded-full animate-ping opacity-25 pointer-events-none"
                      style={{ backgroundColor: episode.colorCode }}
                    />
                  </button>

                  {/* Year & Surah Label on the Axis */}
                  <div className="absolute top-1/2 translate-y-7 z-20 flex flex-col items-center pointer-events-none">
                    <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 font-urdu whitespace-nowrap bg-[var(--bg-surface)] px-2.5 py-0.5 rounded-full border border-[var(--border-subtle)] shadow-2xs">
                      {episode.surahNameArabic}
                    </span>
                  </div>

                  {/* ── BOTTOM PLACED CARD (When isTop === false) ── */}
                  {!isTop && (
                    <div
                      className="absolute top-1/2 mt-9 w-[380px] group transition-all duration-300 hover:scale-102 hover:z-30 cursor-pointer"
                      onClick={() => handleCardClick(episode)}
                    >
                      {/* ── VERTICAL STEM LINE (Upward to axis node) ── */}
                      <div className="absolute left-1/2 -translate-x-1/2 bottom-full h-9 w-1 bg-gradient-to-t from-emerald-600 to-amber-500 shadow-xs">
                        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-emerald-600" />
                      </div>

                      {/* Milestone Card */}
                      <div className="p-4 sm:p-5 rounded-3xl sacred-glass border border-[var(--border-subtle)] hover:border-emerald-500/70 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col gap-2 bg-gradient-to-b from-[var(--bg-surface-elevated)] to-[var(--bg-surface)]/95">
                        {/* Header Badge */}
                        <div className="flex items-center justify-between gap-2">
                          <span
                            className="px-2.5 py-0.5 rounded-xl text-[11px] font-bold text-white shadow-xs font-urdu"
                            style={{ backgroundColor: episode.colorCode }}
                          >
                            مرحلہ {episode.stepNumber}: {episode.surahNameUrdu}
                          </span>
                          <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-lg font-urdu truncate max-w-[170px]">
                            {episode.dateUrdu.split('(')[0]}
                          </span>
                        </div>

                        {/* Title */}
                        <h4 className="font-bold text-sm sm:text-base text-[var(--text-primary)] font-urdu leading-snug line-clamp-2">
                          {episode.titleUrdu}
                        </h4>

                        {/* Ayah Snippet Callout */}
                        {episode.keyQuranicQuotes.length > 0 && (
                          <div className="p-2.5 rounded-xl bg-emerald-500/5 dark:bg-emerald-950/20 border border-emerald-500/20 space-y-1">
                            <p className="font-arabic font-bold text-xs text-emerald-800 dark:text-emerald-300 truncate text-right">
                              {episode.keyQuranicQuotes[0].arabic}
                            </p>
                            <p className="font-urdu text-[11px] text-[var(--text-secondary)] line-clamp-2 leading-relaxed text-right">
                              {episode.keyQuranicQuotes[0].translationUrdu}
                            </p>
                          </div>
                        )}

                        {/* Teaser Narrative */}
                        <p className="font-urdu text-[12px] text-[var(--text-muted)] line-clamp-2 leading-relaxed text-justify">
                          {episode.detailedNarrativeUrdu[0]}
                        </p>

                        {/* Location & Read More Button */}
                        <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] font-urdu">
                          <span className="flex items-center gap-1 text-[var(--text-muted)] truncate max-w-[170px]">
                            <MapPin className="w-3 h-3 text-rose-500 shrink-0" />
                            <span className="truncate">{episode.locationUrdu}</span>
                          </span>
                          <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-300 font-bold group-hover:text-amber-600 transition-colors">
                            <span>تفصیلات و آیات</span>
                            <ExternalLink className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* ── FLOATING HIGH-VISIBILITY SCROLLING CONTROLS (EASY NAVIGATION) ── */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* Left side floating button: ◀ Scroll Forward (Next in RTL) */}
      <button
        onClick={() => scrollTrack('left')}
        title="اگلا مرحلہ دیکھیں (Scroll Left)"
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-40 p-3 sm:p-4 rounded-2xl sacred-glass border-2 border-emerald-500/40 hover:border-amber-400 bg-[var(--bg-surface-elevated)]/90 text-emerald-800 dark:text-emerald-300 hover:text-white hover:bg-emerald-700 shadow-2xl transition-all duration-300 cursor-pointer active:scale-90 flex items-center gap-2 group"
      >
        <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
        <span className="font-urdu text-xs font-bold hidden sm:inline">اگلا مرحلہ</span>
      </button>

      {/* Right side floating button: ▶ Scroll Backward (Previous in RTL) */}
      <button
        onClick={() => scrollTrack('right')}
        title="پچھلا مرحلہ دیکھیں (Scroll Right)"
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-40 p-3 sm:p-4 rounded-2xl sacred-glass border-2 border-emerald-500/40 hover:border-amber-400 bg-[var(--bg-surface-elevated)]/90 text-emerald-800 dark:text-emerald-300 hover:text-white hover:bg-emerald-700 shadow-2xl transition-all duration-300 cursor-pointer active:scale-90 flex items-center gap-2 group"
      >
        <span className="font-urdu text-xs font-bold hidden sm:inline">پچھلا مرحلہ</span>
        <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
      </button>

      {/* Bottom Floating Scrubber Pill for Quick Milestone Jumps */}
      <div className="w-full py-2.5 px-4 bg-[var(--bg-surface)]/80 backdrop-blur-md border-t border-[var(--border-subtle)] flex items-center justify-center shrink-0">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar max-w-full px-2 py-1">
          {displayedEpisodes.map((ep, idx) => (
            <button
              key={ep.id}
              onClick={() => {
                const el = trackRef.current;
                if (el) {
                  // Center this card in track
                  const stepWidth = 440;
                  // In RTL, scrollLeft is 0 on far right and negative leftward
                  el.scrollTo({
                    left: -idx * stepWidth + 200,
                    behavior: 'smooth',
                  });
                }
              }}
              title={`مرحلہ ${ep.stepNumber}: ${ep.titleUrdu}`}
              className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-[var(--bg-surface-elevated)] hover:bg-emerald-600/20 border border-[var(--border-subtle)] hover:border-amber-500/50 text-[11px] font-urdu font-semibold transition-all cursor-pointer whitespace-nowrap active:scale-95"
            >
              <span
                className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold text-white shadow-2xs"
                style={{ backgroundColor: ep.colorCode }}
              >
                {ep.stepNumber}
              </span>
              <span>{ep.surahNameUrdu}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* ── HIGH-DEFINITION CLASSROOM PRESENTATION MODAL ── */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      {modalEpisode && (
        <div
          className="fixed inset-0 z-[1000000] flex items-center justify-center p-3 sm:p-6 lg:p-8 bg-black/80 backdrop-blur-md animate-fade-in"
          dir="rtl"
        >
          <div className="relative w-full max-w-5xl max-h-[92vh] flex flex-col rounded-3xl sacred-glass border border-amber-500/40 shadow-2xl bg-[var(--bg-surface)] overflow-hidden">
            
            {/* Modal Header */}
            <div className="p-4 sm:p-6 border-b border-[var(--border-subtle)] bg-gradient-to-r from-amber-500/10 via-emerald-600/10 to-transparent flex items-center justify-between gap-3 shrink-0">
              
              {/* Title & Badges */}
              <div className="flex items-center gap-3">
                <span
                  className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-bold text-sm font-urdu shadow-md shrink-0"
                  style={{ backgroundColor: modalEpisode.colorCode }}
                >
                  {modalEpisode.stepNumber}
                </span>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-lg bg-emerald-600/15 text-emerald-800 dark:text-emerald-300 font-urdu">
                      {modalEpisode.surahNameUrdu} ({modalEpisode.surahNameArabic}) — آیات {modalEpisode.verseRange.fromVerse} تا {modalEpisode.verseRange.toVerse}
                    </span>
                    <span className="text-[11px] font-bold text-amber-800 dark:text-amber-300 bg-amber-500/15 px-2 py-0.5 rounded-lg font-urdu">
                      {modalEpisode.dateUrdu}
                    </span>
                  </div>
                  <h3 className="font-bold text-base sm:text-lg lg:text-xl text-[var(--text-primary)] font-urdu leading-snug pt-1">
                    {modalEpisode.titleUrdu}
                  </h3>
                </div>
              </div>

              {/* Toolbar: Font Zoom, Prev/Next, Close */}
              <div className="flex items-center gap-1.5 shrink-0">
                {/* Font Scaling */}
                <div className="flex items-center bg-[var(--bg-surface-elevated)] px-1.5 py-1 rounded-xl border border-[var(--border-subtle)] shadow-2xs">
                  <button
                    onClick={() => setModalFontDelta((prev) => Math.max(prev - 1, -2))}
                    title="فونٹ چھوٹا کریں"
                    className="p-1 rounded-md text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[11px] font-bold px-1.5 text-[var(--text-primary)] font-urdu select-none">
                    A {modalFontDelta > 0 ? `+${modalFontDelta}` : modalFontDelta}
                  </span>
                  <button
                    onClick={() => setModalFontDelta((prev) => Math.min(prev + 1, 8))}
                    title="فونٹ بڑا کریں (پروجیکٹر)"
                    className="p-1 rounded-md text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Stepper */}
                <div className="flex items-center gap-0.5 bg-[var(--bg-surface-elevated)] p-1 rounded-xl border border-[var(--border-subtle)]">
                  <button
                    onClick={handleModalPrev}
                    disabled={currentModalIndex <= 0}
                    title="پچھلا مرحلہ"
                    className="p-1.5 rounded-lg hover:bg-emerald-600/15 disabled:opacity-30 cursor-pointer text-[var(--text-primary)]"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleModalNext}
                    disabled={currentModalIndex >= displayedEpisodes.length - 1}
                    title="اگلا مرحلہ"
                    className="p-1.5 rounded-lg hover:bg-emerald-600/15 disabled:opacity-30 cursor-pointer text-[var(--text-primary)]"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                </div>

                {/* Close */}
                <button
                  onClick={() => setModalEpisode(null)}
                  title="بند کریں (Esc)"
                  className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/20 cursor-pointer transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

            </div>

            {/* Modal Scrollable Body */}
            <div className="p-5 sm:p-7 overflow-y-auto space-y-6 flex-1">
              
              {/* Location & Personas */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-urdu">
                <span className="flex items-center gap-1 px-3 py-1 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] font-medium text-[var(--text-secondary)]">
                  <MapPin className="w-3.5 h-3.5 text-rose-500" />
                  <span>{modalEpisode.locationUrdu}</span>
                </span>
                <span className="flex items-center gap-1 px-3 py-1 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] font-medium text-[var(--text-secondary)]">
                  <Calendar className="w-3.5 h-3.5 text-amber-500" />
                  <span>سال {modalEpisode.yearNabawi} بعثت ({modalEpisode.yearsBeforeHijra} قبلِ ہجرت / {modalEpisode.yearCE}ء)</span>
                </span>
                {modalEpisode.historicalFigures.map((person, pIdx) => (
                  <span
                    key={pIdx}
                    className="px-2.5 py-0.5 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-[11px] font-medium text-[var(--text-secondary)]"
                  >
                    {person}
                  </span>
                ))}
              </div>

              {/* Quranic Quote Highlight Box */}
              {modalEpisode.keyQuranicQuotes.length > 0 && (
                <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-amber-500/10 border border-emerald-500/30 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-emerald-800 dark:text-emerald-300 font-urdu">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      <span>قرآنی منشورِ نور</span>
                    </span>
                    <span>{modalEpisode.keyQuranicQuotes[0].reference}</span>
                  </div>
                  <p
                    className="font-arabic font-bold text-[var(--text-primary)] text-center leading-loose pt-1"
                    style={{ fontSize: `${24 + modalFontDelta}px` }}
                  >
                    {modalEpisode.keyQuranicQuotes[0].arabic}
                  </p>
                  <p
                    className="font-urdu text-[var(--text-secondary)] text-center leading-relaxed font-medium"
                    style={{ fontSize: `${16 + modalFontDelta * 0.7}px` }}
                  >
                    {modalEpisode.keyQuranicQuotes[0].translationUrdu}
                  </p>
                </div>
              )}

              {/* Detailed Urdu Exegesis Narrative */}
              <div className="space-y-4 font-urdu text-[var(--text-primary)]">
                <h4 className="text-sm font-bold text-amber-800 dark:text-amber-300 border-b border-[var(--border-subtle)] pb-1">
                  تفسیری و تاریخی پس منظر (Exegesis Narrative)
                </h4>
                {modalEpisode.detailedNarrativeUrdu.map((para, pIdx) => (
                  <p
                    key={pIdx}
                    className="leading-loose text-justify font-medium"
                    style={{ fontSize: `${17 + modalFontDelta}px` }}
                  >
                    {para}
                  </p>
                ))}
              </div>

              {/* Associated Quranic Verses with Audio Playback */}
              <div className="space-y-3 pt-4 border-t border-[var(--border-subtle)]">
                <h4 className="text-sm font-bold font-urdu text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4" />
                  <span>آیاتِ مبارکہ، اردو ترجمہ و تلاوت</span>
                </h4>

                {loadingVerses[modalEpisode.id] ? (
                  <div className="py-6 text-center text-xs font-urdu text-[var(--text-muted)] animate-pulse">
                    آیات لوڈ ہو رہی ہیں...
                  </div>
                ) : (episodeVersesMap[modalEpisode.id] || []).length > 0 ? (
                  <div className="space-y-3">
                    {(episodeVersesMap[modalEpisode.id] || []).map((verse) => {
                      const isPlayingThis =
                        activeAudio?.surahNumber === verse.surahNumber &&
                        activeAudio?.ayahNumber === verse.ayahNumber &&
                        activeAudio?.isPlaying;

                      return (
                        <div
                          key={`${verse.surahNumber}-${verse.ayahNumber}`}
                          className="p-4 rounded-2xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] hover:border-amber-500/30 transition-all flex flex-col gap-2"
                        >
                          <div className="flex items-center justify-between">
                            <span className="w-6 h-6 rounded-full bg-emerald-600/15 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center justify-center font-arabic">
                              {verse.ayahNumber}
                            </span>
                            <button
                              onClick={() => {
                                if (isPlayingThis) {
                                  pauseAudio();
                                } else {
                                  playAyah(verse.surahNumber, verse.ayahNumber, modalEpisode.stepNumber);
                                }
                              }}
                              className={`p-1.5 rounded-xl transition-all cursor-pointer ${
                                isPlayingThis
                                  ? 'bg-amber-600 text-white shadow-xs'
                                  : 'bg-emerald-600/10 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-600/20'
                              }`}
                            >
                              {isPlayingThis ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                            </button>
                          </div>

                          <p
                            className="font-arabic font-bold text-[var(--text-primary)] text-right leading-loose pt-1"
                            style={{ fontSize: `${21 + modalFontDelta}px` }}
                          >
                            {verse.textArabic}
                          </p>

                          <p
                            className="font-urdu text-[var(--text-secondary)] text-right leading-relaxed font-medium"
                            style={{ fontSize: `${15 + modalFontDelta * 0.7}px` }}
                          >
                            {verse.translationUrdu}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                ) : null}
              </div>

              {/* Pedagogical Takeaways */}
              <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20">
                <div className="flex items-center gap-1.5 text-xs font-bold font-urdu text-amber-800 dark:text-amber-300 mb-2">
                  <GraduationCap className="w-4 h-4" />
                  <span>کلاس روم تدریسی و تربیتی نکات</span>
                </div>
                <ul className="space-y-1.5 font-urdu text-xs sm:text-sm text-[var(--text-secondary)]">
                  {modalEpisode.pedagogicalTakeaways.map((point, ptIdx) => (
                    <li key={ptIdx} className="flex items-start gap-2 leading-relaxed">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-1" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-3 sm:p-4 px-6 border-t border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] flex items-center justify-between text-xs font-urdu text-[var(--text-muted)]">
              <span>مرحلہ {modalEpisode.stepNumber} از {displayedEpisodes.length}</span>
              <button
                onClick={() => setModalEpisode(null)}
                className="px-4 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold transition-colors cursor-pointer"
              >
                واپس ٹائم لائن پر جائیں
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );

  if (isZenMode && typeof document !== 'undefined') {
    return (
      <>
        {/* Placeholder in regular document flow to preserve layout */}
        <div className="rounded-3xl border border-dashed border-amber-500/40 p-8 text-center bg-amber-500/5 my-4 font-urdu text-sm text-[var(--text-muted)] flex flex-wrap items-center justify-center gap-3">
          <Sparkles className="w-5 h-5 text-amber-500 animate-spin" />
          <span>مکمل اسکرین تفہیمی منظر (Zen Presentation Mode) فعال ہے۔ مانیٹر کی پوری اسکرین پر ٹائم لائن جاری ہے۔</span>
          <button
            onClick={exitZenMode}
            className="px-3.5 py-1.5 rounded-xl bg-rose-600 text-white text-xs font-bold font-urdu cursor-pointer hover:bg-rose-700 shadow-xs"
          >
            بند کریں (Exit)
          </button>
        </div>
        {createPortal(timelineContent, document.body)}
      </>
    );
  }

  return timelineContent;
};
