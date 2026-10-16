import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  PROPHETIC_LINEAGE_NODES,
  PROPHETIC_QURAN_NODES,
  AHLULBAYT_IMAMAT_NODES,
  FATRAH_SUCCESSOR_NODES,
  ALL_GRAND_TIMELINE_NODES,
  GrandTimelineNode,
  CURRENT_REFERENCE_YEAR_CE,
} from '@/data/grandTimelineData';
import {
  ArrowRight,
  Sparkles,
  Maximize2,
  Minimize2,
  Calendar,
  Clock,
  GitBranch,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  MoveHorizontal,
  X,
  ZoomIn,
  ZoomOut,
  MapPin,
  CheckCircle2,
  GraduationCap,
  ExternalLink,
  Layers,
  Compass,
  BarChart3,
  Shield,
  Users,
  Scroll,
  Crown,
  ArrowLeftRight,
  Key,
  Lock,
} from 'lucide-react';
import { MultiTrackParallelTimeline } from './MultiTrackParallelTimeline';
import { CalendarEducationalGuide } from './CalendarEducationalGuide';

interface DedicatedTimelinePageProps {
  onBackToMain: () => void;
}

type TimelinePortalMode = 'spine' | 'multitrack' | 'guide';
type EpochTabType = 'prophets' | 'prophetic_quran' | 'ahlulbayt' | 'fatrah_successors' | 'continuous';

interface ActiveCalendarFilters {
  showAamAlFeel: boolean;
  showBiThat: boolean;
  showHijri: boolean;
  showGregorian: boolean;
  showTimeFromToday: boolean;
  showPaternalLineage: boolean;
  showSurahNumbers: boolean;
  showLunarMonth: boolean;
}

export const DedicatedTimelinePage: React.FC<DedicatedTimelinePageProps> = ({
  onBackToMain,
}) => {
  // Top Portal Mode: Alternating Spine | Multi-Track Parallel | Educational Guide
  const [portalMode, setPortalMode] = useState<TimelinePortalMode>('spine');

  // Active Epoch Tab (for Spine View)
  const [activeTab, setActiveTab] = useState<EpochTabType>('prophets');

  // Multi-Calendar & Dimension Checkboxes
  const [filters, setFilters] = useState<ActiveCalendarFilters>({
    showAamAlFeel: true,
    showBiThat: true,
    showHijri: true,
    showGregorian: true,
    showTimeFromToday: true,
    showPaternalLineage: true,
    showSurahNumbers: true,
    showLunarMonth: true,
  });

  // Modal dialog for detailed deep-dive reading
  const [modalNode, setModalNode] = useState<GrandTimelineNode | null>(null);
  const [modalFontDelta, setModalFontDelta] = useState<number>(0);

  // Fullscreen toggle state
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Canvas horizontal drag-to-scroll state
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [scrollLeftState, setScrollLeftState] = useState<number>(0);
  const [hasMovedDrag, setHasMovedDrag] = useState<boolean>(false);

  // Synchronize fullscreen state
  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  const toggleBrowserFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen?.();
      } else {
        await document.exitFullscreen?.();
      }
    } catch {}
  };

  // Keyboard navigation & Esc key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (modalNode) {
          setModalNode(null);
        } else {
          onBackToMain();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalNode, onBackToMain]);

  // Selected Nodes depending on active tab
  const displayedNodes = useMemo(() => {
    switch (activeTab) {
      case 'prophets':
        return PROPHETIC_LINEAGE_NODES;
      case 'prophetic_quran':
        return PROPHETIC_QURAN_NODES;
      case 'ahlulbayt':
        return AHLULBAYT_IMAMAT_NODES;
      case 'fatrah_successors':
        return FATRAH_SUCCESSOR_NODES;
      case 'continuous':
        return ALL_GRAND_TIMELINE_NODES;
      default:
        return PROPHETIC_LINEAGE_NODES;
    }
  }, [activeTab]);

  // Track scroll helpers
  const scrollTrack = (direction: 'left' | 'right') => {
    const el = trackRef.current;
    if (!el) return;
    const amount = 500;
    // In RTL, left is negative
    el.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!trackRef.current) return;
    const el = trackRef.current;
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

  const handleCardClick = (node: GrandTimelineNode) => {
    if (!hasMovedDrag) {
      setModalNode(node);
    }
  };

  // Modal Next/Prev Stepper
  const currentModalIndex = modalNode
    ? displayedNodes.findIndex((n) => n.id === modalNode.id)
    : -1;

  const handleModalPrev = () => {
    if (currentModalIndex > 0) {
      setModalNode(displayedNodes[currentModalIndex - 1]);
    }
  };

  const handleModalNext = () => {
    if (currentModalIndex < displayedNodes.length - 1) {
      setModalNode(displayedNodes[currentModalIndex + 1]);
    }
  };

  return (
    <div
      className="min-h-screen w-screen bg-[var(--bg-primary)] text-[var(--text-primary)] flex flex-col justify-between overflow-x-hidden select-none transition-colors duration-300 font-sans"
      dir="rtl"
    >
      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* ── TOP APPLICATION BAR (Clean, Dedicated & Distraction-Free) ── */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <header className="w-full px-4 sm:px-6 py-2.5 border-b border-[var(--border-subtle)] bg-[var(--bg-surface)]/95 backdrop-blur-md flex flex-wrap items-center justify-between gap-3 shrink-0 shadow-xs z-30">
        
        {/* Left/Start side: Sleek Return Arrow + Title */}
        <div className="flex items-center gap-3">
          {/* THE PROMINENT BACK BUTTON TO MAIN PORTAL */}
          <button
            onClick={onBackToMain}
            title="مرکزی قرآنی پورٹل پر واپس جائیں (یا کی بورڈ سے Esc دبائیں)"
            className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold font-urdu shadow-md cursor-pointer transition-all active:scale-95 group ring-2 ring-emerald-500/30 shrink-0"
          >
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            <span>واپس مرکزی پورٹل (Back)</span>
          </button>

          <div className="hidden sm:block h-6 w-px bg-[var(--border-subtle)]" />

          {/* Branding Title */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-500 shadow-xs shrink-0">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-urdu font-bold text-sm sm:text-base text-[var(--text-primary)] leading-tight">
                  عالمی اسلامی، نبویؐ و قرآنی تقویمی ٹائم لائن پورٹل
                </h1>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30 font-urdu hidden md:inline">
                  مستقل صفحہ
                </span>
              </div>
              <p className="text-[10px] text-[var(--text-muted)] font-urdu hidden lg:block">
                حضرت آدمؑ کے شجرۂ نسب سے مبعث، ہجرت، اکمالِ دین اور غیبتِ کبریٰ تک کا ہم آہنگ تقویمی مطالعہ
              </p>
            </div>
          </div>
        </div>

        {/* View Mode Switcher: Spine vs Multi-Track vs Guide */}
        <div className="flex items-center gap-1.5 bg-[var(--bg-surface-elevated)] p-1 rounded-2xl border border-[var(--border-subtle)] shadow-xs">
          <button
            onClick={() => setPortalMode('spine')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-urdu font-bold transition-all cursor-pointer ${
              portalMode === 'spine'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>متبادل ٹائم لائن</span>
          </button>

          <button
            onClick={() => setPortalMode('multitrack')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-urdu font-bold transition-all cursor-pointer ${
              portalMode === 'multitrack'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>متوازی دھارے (Multi-Track)</span>
          </button>

          <button
            onClick={() => setPortalMode('guide')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-urdu font-bold transition-all cursor-pointer ${
              portalMode === 'guide'
                ? 'bg-indigo-700 text-white shadow-xs'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>تقویمی ہدایت نامہ</span>
          </button>
        </div>

        {/* Right side: Browser Fullscreen, Drag hint */}
        <div className="flex items-center gap-2">
          {/* Drag Hint (only in timeline modes) */}
          {portalMode !== 'guide' && (
            <div className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-[11px] text-[var(--text-muted)] font-urdu">
              <MoveHorizontal className="w-3.5 h-3.5 text-amber-500" />
              <span>ماؤس دبا کر سرکائیں (Drag)</span>
            </div>
          )}

          {/* Link to Surah Memorizer */}
          <button
            onClick={() => {
              window.location.hash = '#surahs';
            }}
            title="قرآنی سورتوں کے اسماء و حفظ پورٹل پر جائیں"
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--bg-surface-elevated)] hover:bg-emerald-600/15 border border-[var(--border-subtle)] text-xs text-[var(--text-primary)] font-urdu font-bold cursor-pointer transition-all active:scale-95"
          >
            <BookOpen className="w-3.5 h-3.5 text-emerald-500" />
            <span>حفظِ سُوَر پورٹل</span>
          </button>

          {/* Browser Native Fullscreen Button */}
          <button
            onClick={toggleBrowserFullscreen}
            title={isFullscreen ? 'عام اسکرین' : 'فل اسکرین (F11)'}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--bg-surface-elevated)] hover:bg-emerald-600/15 border border-[var(--border-subtle)] text-xs text-[var(--text-primary)] font-urdu font-bold cursor-pointer transition-all active:scale-95"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5 text-amber-500" />}
            <span className="hidden sm:inline">{isFullscreen ? 'عام اسکرین' : 'فل اسکرین'}</span>
          </button>
        </div>
      </header>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* ── CONDITIONAL BODY BASED ON ACTIVE PORTAL MODE ── */}
      {/* ══════════════════════════════════════════════════════════════════ */}

      {/* MODE 1: EDUCATIONAL GUIDEBOOK */}
      {portalMode === 'guide' && (
        <div className="flex-1 w-full overflow-y-auto py-4">
          <CalendarEducationalGuide onBackToTimeline={() => setPortalMode('spine')} />
        </div>
      )}

      {/* MODE 2: MULTI-TRACK PARALLEL TIMELINE */}
      {portalMode === 'multitrack' && (
        <div className="flex-1 w-full overflow-y-auto">
          <MultiTrackParallelTimeline onOpenGuide={() => setPortalMode('guide')} />
        </div>
      )}

      {/* MODE 3: ALTERNATING SPINE TIMELINE */}
      {portalMode === 'spine' && (
        <>
          {/* ── ROW 2: EPOCH SECTION TABS ── */}
          <div className="w-full px-4 sm:px-6 py-2 bg-[var(--bg-surface-card)]/80 backdrop-blur-md border-b border-[var(--border-subtle)] flex items-center justify-between gap-3 overflow-x-auto no-scrollbar shrink-0">
            <div className="flex items-center gap-1.5 min-w-max">
              <span className="text-xs font-bold text-[var(--text-muted)] font-urdu ps-1">
                تاریخی ادوار:
              </span>

              {/* Tab 1: Prophets */}
              <button
                onClick={() => setActiveTab('prophets')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-urdu font-bold transition-all cursor-pointer ${
                  activeTab === 'prophets'
                    ? 'bg-amber-600 text-white shadow-xs ring-1 ring-amber-400/50'
                    : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)]'
                }`}
              >
                <GitBranch className="w-3.5 h-3.5" />
                <span>۱. شجرۂ انبیاءؑ و انساب (آدمؑ تا خاتمؐ)</span>
                <span className="text-[10px] px-1.5 rounded-full bg-black/20 text-white">
                  {PROPHETIC_LINEAGE_NODES.length}
                </span>
              </button>

              {/* Tab 2: Prophetic Mission & Quran */}
              <button
                onClick={() => setActiveTab('prophetic_quran')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-urdu font-bold transition-all cursor-pointer ${
                  activeTab === 'prophetic_quran'
                    ? 'bg-emerald-700 text-white shadow-xs ring-1 ring-emerald-400/50'
                    : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)]'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 text-amber-300" />
                <span>۲. عصرِ نبویؐ و تدریجی نزولِ قرآن (مکی و مدنی)</span>
                <span className="text-[10px] px-1.5 rounded-full bg-black/20 text-white">
                  {PROPHETIC_QURAN_NODES.length}
                </span>
              </button>

              {/* Tab 3: Imamat & Ahlulbayt */}
              <button
                onClick={() => setActiveTab('ahlulbayt')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-urdu font-bold transition-all cursor-pointer ${
                  activeTab === 'ahlulbayt'
                    ? 'bg-teal-700 text-white shadow-xs ring-1 ring-teal-400/50'
                    : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>۳. عصرِ امامت و اہل بیت علیہم السلام (۱۱ھ تا غیبت)</span>
                <span className="text-[10px] px-1.5 rounded-full bg-black/20 text-white">
                  {AHLULBAYT_IMAMAT_NODES.length}
                </span>
              </button>

              {/* Tab 4: Chain of Successors & Fatrah Periods */}
              <button
                onClick={() => setActiveTab('fatrah_successors')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-urdu font-bold transition-all cursor-pointer ${
                  activeTab === 'fatrah_successors'
                    ? 'bg-amber-600 text-white shadow-xs ring-1 ring-amber-400/50'
                    : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)]'
                }`}
              >
                <Shield className="w-3.5 h-3.5 text-amber-300" />
                <span>۴. سلسلۂ اوصیاء و ادوارِ فترت (حجتِ خدا کا تسلسل)</span>
                <span className="text-[10px] px-1.5 rounded-full bg-black/20 text-white">
                  {FATRAH_SUCCESSOR_NODES.length}
                </span>
              </button>

              {/* Tab 5: Continuous Grand Lineage */}
              <button
                onClick={() => setActiveTab('continuous')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-urdu font-bold transition-all cursor-pointer ${
                  activeTab === 'continuous'
                    ? 'bg-gradient-to-r from-indigo-700 to-emerald-700 text-white shadow-md ring-2 ring-amber-400/60'
                    : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)]'
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                <span>۵. پیوستہ گرینڈ ٹائم لائن (Continuous Master Stream)</span>
                <span className="text-[10px] px-1.5 rounded-full bg-white/20 text-white">
                  {ALL_GRAND_TIMELINE_NODES.length}
                </span>
              </button>
            </div>

            {/* Counter of visible milestones */}
            <div className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300 font-urdu shrink-0 hidden md:block">
              مجموعی مراحل: {displayedNodes.length}
            </div>
          </div>

          {/* ── ROW 3: INTERACTIVE CALENDAR FILTER CHECKBOXES ── */}
          <div className="w-full px-4 sm:px-6 py-2 bg-[var(--bg-surface)]/90 border-b border-[var(--border-subtle)] overflow-x-auto no-scrollbar shrink-0">
            <div className="flex items-center flex-wrap gap-2 sm:gap-3 text-xs font-urdu">
              <span className="font-bold text-[var(--text-muted)] flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-amber-500" />
                <span>تقاویم کے فلٹرز:</span>
              </span>

              {/* 1. Aam al-Feel */}
              <label className="flex items-center gap-1.5 cursor-pointer bg-[var(--bg-surface-elevated)] px-2.5 py-1 rounded-xl border border-[var(--border-subtle)] hover:border-amber-400 transition-colors">
                <input
                  type="checkbox"
                  checked={filters.showAamAlFeel}
                  onChange={(e) => setFilters({ ...filters, showAamAlFeel: e.target.checked })}
                  className="accent-amber-600 rounded"
                />
                <span className="font-semibold text-[var(--text-primary)]">عام الفیل (1–53 AF)</span>
              </label>

              {/* 2. Bi'that Era */}
              <label className="flex items-center gap-1.5 cursor-pointer bg-[var(--bg-surface-elevated)] px-2.5 py-1 rounded-xl border border-[var(--border-subtle)] hover:border-amber-400 transition-colors">
                <input
                  type="checkbox"
                  checked={filters.showBiThat}
                  onChange={(e) => setFilters({ ...filters, showBiThat: e.target.checked })}
                  className="accent-emerald-600 rounded"
                />
                <span className="font-semibold text-[var(--text-primary)]">سالِ بعثت (1–13 Bi'that)</span>
              </label>

              {/* 3. Hijri AH */}
              <label className="flex items-center gap-1.5 cursor-pointer bg-[var(--bg-surface-elevated)] px-2.5 py-1 rounded-xl border border-[var(--border-subtle)] hover:border-amber-400 transition-colors">
                <input
                  type="checkbox"
                  checked={filters.showHijri}
                  onChange={(e) => setFilters({ ...filters, showHijri: e.target.checked })}
                  className="accent-emerald-600 rounded"
                />
                <span className="font-semibold text-[var(--text-primary)]">ہجری تقویم (Hijri AH)</span>
              </label>

              {/* 4. Gregorian CE / BCE */}
              <label className="flex items-center gap-1.5 cursor-pointer bg-[var(--bg-surface-elevated)] px-2.5 py-1 rounded-xl border border-[var(--border-subtle)] hover:border-amber-400 transition-colors">
                <input
                  type="checkbox"
                  checked={filters.showGregorian}
                  onChange={(e) => setFilters({ ...filters, showGregorian: e.target.checked })}
                  className="accent-indigo-600 rounded"
                />
                <span className="font-semibold text-[var(--text-primary)]">عیسوی سال (CE / BCE)</span>
              </label>

              {/* 5. Time Distance from Today */}
              <label className="flex items-center gap-1.5 cursor-pointer bg-amber-500/10 px-3 py-1 rounded-xl border border-amber-500/30 hover:bg-amber-500/20 transition-colors ring-1 ring-amber-400/40">
                <input
                  type="checkbox"
                  checked={filters.showTimeFromToday}
                  onChange={(e) => setFilters({ ...filters, showTimeFromToday: e.target.checked })}
                  className="accent-amber-600 rounded"
                />
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                <span className="font-bold text-amber-900 dark:text-amber-200">
                  آج سے فاصلہ ({CURRENT_REFERENCE_YEAR_CE}ء)
                </span>
              </label>

              {/* 6. Paternal Lineage */}
              <label className="flex items-center gap-1.5 cursor-pointer bg-[var(--bg-surface-elevated)] px-2.5 py-1 rounded-xl border border-[var(--border-subtle)] hover:border-amber-400 transition-colors">
                <input
                  type="checkbox"
                  checked={filters.showPaternalLineage}
                  onChange={(e) => setFilters({ ...filters, showPaternalLineage: e.target.checked })}
                  className="accent-emerald-600 rounded"
                />
                <span className="font-semibold text-[var(--text-primary)]">پدری نسب (Lineage)</span>
              </label>

              {/* 7. Surah Numbers */}
              <label className="flex items-center gap-1.5 cursor-pointer bg-[var(--bg-surface-elevated)] px-2.5 py-1 rounded-xl border border-[var(--border-subtle)] hover:border-amber-400 transition-colors">
                <input
                  type="checkbox"
                  checked={filters.showSurahNumbers}
                  onChange={(e) => setFilters({ ...filters, showSurahNumbers: e.target.checked })}
                  className="accent-amber-600 rounded"
                />
                <span className="font-semibold text-[var(--text-primary)]">سورت نمبر (مصحف و نزولی)</span>
              </label>

              {/* 8. Lunar Month */}
              <label className="flex items-center gap-1.5 cursor-pointer bg-[var(--bg-surface-elevated)] px-2.5 py-1 rounded-xl border border-[var(--border-subtle)] hover:border-amber-400 transition-colors">
                <input
                  type="checkbox"
                  checked={filters.showLunarMonth}
                  onChange={(e) => setFilters({ ...filters, showLunarMonth: e.target.checked })}
                  className="accent-emerald-600 rounded"
                />
                <span className="font-semibold text-[var(--text-primary)]">قمری مہینہ</span>
              </label>
            </div>
          </div>

          {/* ── CENTRAL TIMELINE TRACK CANVAS (GENEROUS 820px HEIGHT WITH ZERO CLIPPING) ── */}
          <div
            ref={trackRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className={`relative w-full flex-1 overflow-x-auto py-10 px-8 sm:px-14 scroll-smooth no-scrollbar select-none flex items-center ${
              isDragging ? 'cursor-grabbing' : 'cursor-grab'
            }`}
            style={{
              minHeight: '820px',
            }}
          >
            <div
              className="relative flex items-center shrink-0 my-auto"
              style={{
                minWidth: `${Math.max(displayedNodes.length * 440 + 700, 2800)}px`,
                height: '780px',
              }}
            >
              {/* Central Glowing Golden Spine */}
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-2.5 rounded-full bg-gradient-to-r from-amber-600 via-emerald-600 to-indigo-600 shadow-md z-10">
                <div className="absolute inset-0 rounded-full bg-amber-400/40 blur-xs" />
              </div>

              {/* Start marker on right (RTL start) */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-amber-500 border-4 border-[var(--bg-surface)] text-white shadow-xl flex items-center justify-center font-bold text-xs font-urdu ring-4 ring-amber-400/40">
                  مبدا
                </div>
                <span className="mt-2 text-[11px] font-bold text-amber-800 dark:text-amber-300 font-urdu whitespace-nowrap bg-[var(--bg-surface)] px-2.5 py-0.5 rounded-md border border-amber-500/30 shadow-xs">
                  آغازِ سفر
                </span>
              </div>

              {/* End marker on left (RTL end) */}
              <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-emerald-700 border-4 border-[var(--bg-surface)] text-white shadow-xl flex items-center justify-center font-bold text-xs font-urdu ring-4 ring-emerald-500/40">
                  تکمیل
                </div>
                <span className="mt-2 text-[11px] font-bold text-emerald-800 dark:text-emerald-300 font-urdu whitespace-nowrap bg-[var(--bg-surface)] px-2.5 py-0.5 rounded-md border border-emerald-500/30 shadow-xs">
                  دورِ حاضر
                </span>
              </div>

              {/* Alternating Nodes and Connecting Stems */}
              <div className="flex items-center justify-around w-full px-28 z-20">
                {displayedNodes.map((node, idx) => {
                  const isTop = idx % 2 === 0;

                  return (
                    <div
                      key={node.id}
                      className="relative flex flex-col items-center shrink-0"
                      style={{ width: '400px', margin: '0 20px' }}
                    >
                      {/* ── TOP PLACED CARD (When isTop === true) ── */}
                      {isTop && (
                        <div
                          className="absolute bottom-1/2 mb-6 w-[380px] group transition-all duration-300 hover:scale-102 hover:z-30 cursor-pointer"
                          onClick={() => handleCardClick(node)}
                        >
                          {/* Milestone Card */}
                          <div className="p-4 sm:p-4.5 rounded-3xl sacred-glass border border-[var(--border-subtle)] hover:border-amber-500/70 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col gap-2 bg-gradient-to-b from-[var(--bg-surface-elevated)] to-[var(--bg-surface)]/95">
                            
                            {/* Header Badges Row */}
                            <div className="flex items-center justify-between gap-1.5 flex-wrap">
                              <span
                                className="px-2.5 py-0.5 rounded-xl text-[11px] font-bold text-white shadow-xs font-urdu"
                                style={{ backgroundColor: node.colorCode }}
                              >
                                مرحلہ {node.stepNumber}
                              </span>

                              {/* Time distance from today pill */}
                              {filters.showTimeFromToday && (
                                <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-lg bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/25 font-urdu">
                                  <Clock className="w-3 h-3 text-amber-500" />
                                  <span>آج سے تقریباً {node.dates.approximateYearsAgo.toLocaleString()} سال قبل</span>
                                </span>
                              )}
                            </div>

                            {/* Title */}
                            <h3 className="font-bold text-sm sm:text-base text-[var(--text-primary)] font-urdu leading-snug">
                              {node.titleUrdu}
                            </h3>

                            {/* Infallible Imamate Quick Badges */}
                            {node.imamateMetadata && (
                              <div className="flex flex-wrap items-center gap-1 text-[10px] font-urdu">
                                {node.imamateMetadata.imamNumber !== undefined && (
                                  <span className="px-2 py-0.5 rounded-md bg-emerald-700 text-white font-bold shadow-xs">
                                    {node.imamateMetadata.imamNumber === 0 ? 'سیدہ طاہرہؑ' : `امامِ معصوم #${node.imamateMetadata.imamNumber}`}
                                  </span>
                                )}
                                {node.imamateMetadata.imamateDurationYears !== undefined && (
                                  <span className="px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30 font-bold">
                                    مدتِ امامت: {node.imamateMetadata.imamateDurationYears} سال
                                  </span>
                                )}
                                {node.imamateMetadata.totalAgeYears && (
                                  <span className="px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-800 dark:text-blue-300 border border-blue-500/20 font-bold">
                                    عمر: {node.imamateMetadata.totalAgeYears} سال
                                  </span>
                                )}
                              </div>
                            )}

                            {/* Fatrah & Divine Successors Quick Badges */}
                            {node.fatrahMetadata && (
                              <div className="flex flex-wrap items-center gap-1 text-[10px] font-urdu">
                                <span className="px-2 py-0.5 rounded-md bg-amber-600 text-white font-bold shadow-xs">
                                  دورِ فترت #{node.fatrahMetadata.gapNumber} ({node.fatrahMetadata.totalSuccessorsCount} اوصیاء)
                                </span>
                                <span className="px-2 py-0.5 rounded-md bg-purple-500/15 text-purple-800 dark:text-purple-300 border border-purple-500/30 font-bold">
                                  وقفہ: {node.fatrahMetadata.durationYearsUrdu}
                                </span>
                                <span className="px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30 font-bold">
                                  منجی: {node.fatrahMetadata.awaitedSaviorUrdu.split('(')[0]}
                                </span>
                              </div>
                            )}

                            {/* Paternal Lineage Chain Badge */}
                            {filters.showPaternalLineage && node.paternalLineageUrdu && (
                              <div className="p-2 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[11px] font-urdu leading-relaxed">
                                <span className="font-bold text-emerald-800 dark:text-emerald-300">پدری نسب: </span>
                                <span className="text-[var(--text-secondary)] line-clamp-1">{node.paternalLineageUrdu}</span>
                              </div>
                            )}

                            {/* Synchronized Calendar Pills */}
                            <div className="flex flex-wrap items-center gap-1 text-[10px] font-urdu">
                              {filters.showAamAlFeel && node.dates.yearAamAlFeel && (
                                <span className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/20 font-bold">
                                  سال {node.dates.yearAamAlFeel} عام الفیل
                                </span>
                              )}
                              {filters.showBiThat && node.dates.yearBiThat && (
                                <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20 font-bold">
                                  سال {node.dates.yearBiThat} بعثت
                                </span>
                              )}
                              {filters.showHijri && node.dates.yearHijri && (
                                <span className="px-2 py-0.5 rounded-md bg-teal-500/10 text-teal-800 dark:text-teal-300 border border-teal-500/20 font-bold">
                                  {node.dates.yearHijri} ہجری
                                </span>
                              )}
                              {filters.showGregorian && (
                                <span className="px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-800 dark:text-indigo-300 border border-indigo-500/20 font-bold">
                                  {Math.abs(node.dates.yearCE)} {node.dates.isBCE ? 'قبل مسیح (BCE)' : 'عیسوی (CE)'}
                                </span>
                              )}
                              {filters.showLunarMonth && node.dates.lunarMonthUrdu && (
                                <span className="px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-800 dark:text-purple-300 border border-purple-500/20">
                                  {node.dates.lunarMonthUrdu}
                                </span>
                              )}
                              {filters.showSurahNumbers && node.quranicMetadata && (
                                <span className="px-2 py-0.5 rounded-md bg-rose-500/10 text-rose-800 dark:text-rose-300 border border-rose-500/20 font-bold">
                                  نزولی #{node.quranicMetadata.chronologicalSurahNumber} | مصحف #{node.quranicMetadata.mushafSurahNumber}
                                </span>
                              )}
                            </div>

                            {/* Teaser Summary */}
                            <p className="font-urdu text-[11px] text-[var(--text-muted)] line-clamp-2 leading-relaxed text-justify">
                              {node.summaryUrdu}
                            </p>

                            {/* Footer Location & Read More */}
                            <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] font-urdu">
                              <span className="flex items-center gap-1 text-[var(--text-muted)] truncate max-w-[170px]">
                                <MapPin className="w-3 h-3 text-rose-500 shrink-0" />
                                <span className="truncate">{node.locationUrdu}</span>
                              </span>
                              <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-300 font-bold group-hover:text-amber-600 transition-colors">
                                <span>تفصیلات و حقائق</span>
                                <ExternalLink className="w-3 h-3" />
                              </span>
                            </div>
                          </div>

                          {/* Vertical Stem Line downward to axis (h-6) */}
                          <div className="absolute left-1/2 -translate-x-1/2 top-full h-6 w-1 bg-gradient-to-b from-amber-500 to-amber-600 shadow-xs">
                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-amber-500" />
                          </div>
                        </div>
                      )}

                      {/* Central Axis Node Button */}
                      <button
                        onClick={() => handleCardClick(node)}
                        title={`مرحلہ ${node.stepNumber}: ${node.titleUrdu}`}
                        className="relative z-30 w-12 h-12 rounded-full bg-[var(--bg-surface)] border-4 border-amber-500 hover:border-emerald-500 text-[var(--text-primary)] shadow-xl flex items-center justify-center font-bold text-xs font-urdu transition-all duration-300 hover:scale-125 cursor-pointer group"
                        style={{
                          boxShadow: `0 0 16px ${node.colorCode}55`,
                        }}
                      >
                        <span
                          className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs font-urdu shadow-xs group-hover:rotate-12 transition-transform"
                          style={{ backgroundColor: node.colorCode }}
                        >
                          {node.stepNumber}
                        </span>
                      </button>

                      {/* ── BOTTOM PLACED CARD (When isTop === false) ── */}
                      {!isTop && (
                        <div
                          className="absolute top-1/2 mt-6 w-[380px] group transition-all duration-300 hover:scale-102 hover:z-30 cursor-pointer"
                          onClick={() => handleCardClick(node)}
                        >
                          {/* Vertical Stem Line upward to axis (h-6) */}
                          <div className="absolute left-1/2 -translate-x-1/2 bottom-full h-6 w-1 bg-gradient-to-t from-emerald-600 to-amber-500 shadow-xs">
                            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-emerald-600" />
                          </div>

                          {/* Milestone Card */}
                          <div className="p-4 sm:p-4.5 rounded-3xl sacred-glass border border-[var(--border-subtle)] hover:border-emerald-500/70 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col gap-2 bg-gradient-to-b from-[var(--bg-surface-elevated)] to-[var(--bg-surface)]/95">
                            
                            {/* Header Badges Row */}
                            <div className="flex items-center justify-between gap-1.5 flex-wrap">
                              <span
                                className="px-2.5 py-0.5 rounded-xl text-[11px] font-bold text-white shadow-xs font-urdu"
                                style={{ backgroundColor: node.colorCode }}
                              >
                                مرحلہ {node.stepNumber}
                              </span>

                              {/* Time distance from today pill */}
                              {filters.showTimeFromToday && (
                                <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-lg bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/25 font-urdu">
                                  <Clock className="w-3 h-3 text-amber-500" />
                                  <span>آج سے تقریباً {node.dates.approximateYearsAgo.toLocaleString()} سال قبل</span>
                                </span>
                              )}
                            </div>

                            {/* Title */}
                            <h3 className="font-bold text-sm sm:text-base text-[var(--text-primary)] font-urdu leading-snug">
                              {node.titleUrdu}
                            </h3>

                            {/* Infallible Imamate Quick Badges */}
                            {node.imamateMetadata && (
                              <div className="flex flex-wrap items-center gap-1 text-[10px] font-urdu">
                                {node.imamateMetadata.imamNumber !== undefined && (
                                  <span className="px-2 py-0.5 rounded-md bg-emerald-700 text-white font-bold shadow-xs">
                                    {node.imamateMetadata.imamNumber === 0 ? 'سیدہ طاہرہؑ' : `امامِ معصوم #${node.imamateMetadata.imamNumber}`}
                                  </span>
                                )}
                                {node.imamateMetadata.imamateDurationYears !== undefined && (
                                  <span className="px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30 font-bold">
                                    مدتِ امامت: {node.imamateMetadata.imamateDurationYears} سال
                                  </span>
                                )}
                                {node.imamateMetadata.totalAgeYears && (
                                  <span className="px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-800 dark:text-blue-300 border border-blue-500/20 font-bold">
                                    عمر: {node.imamateMetadata.totalAgeYears} سال
                                  </span>
                                )}
                              </div>
                            )}

                            {/* Fatrah & Divine Successors Quick Badges */}
                            {node.fatrahMetadata && (
                              <div className="flex flex-wrap items-center gap-1 text-[10px] font-urdu">
                                <span className="px-2 py-0.5 rounded-md bg-amber-600 text-white font-bold shadow-xs">
                                  دورِ فترت #{node.fatrahMetadata.gapNumber} ({node.fatrahMetadata.totalSuccessorsCount} اوصیاء)
                                </span>
                                <span className="px-2 py-0.5 rounded-md bg-purple-500/15 text-purple-800 dark:text-purple-300 border border-purple-500/30 font-bold">
                                  وقفہ: {node.fatrahMetadata.durationYearsUrdu}
                                </span>
                                <span className="px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30 font-bold">
                                  منجی: {node.fatrahMetadata.awaitedSaviorUrdu.split('(')[0]}
                                </span>
                              </div>
                            )}

                            {/* Paternal Lineage Chain Badge */}
                            {filters.showPaternalLineage && node.paternalLineageUrdu && (
                              <div className="p-2 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[11px] font-urdu leading-relaxed">
                                <span className="font-bold text-emerald-800 dark:text-emerald-300">پدری نسب: </span>
                                <span className="text-[var(--text-secondary)] line-clamp-1">{node.paternalLineageUrdu}</span>
                              </div>
                            )}

                            {/* Synchronized Calendar Pills */}
                            <div className="flex flex-wrap items-center gap-1 text-[10px] font-urdu">
                              {filters.showAamAlFeel && node.dates.yearAamAlFeel && (
                                <span className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/20 font-bold">
                                  سال {node.dates.yearAamAlFeel} عام الفیل
                                </span>
                              )}
                              {filters.showBiThat && node.dates.yearBiThat && (
                                <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20 font-bold">
                                  سال {node.dates.yearBiThat} بعثت
                                </span>
                              )}
                              {filters.showHijri && node.dates.yearHijri && (
                                <span className="px-2 py-0.5 rounded-md bg-teal-500/10 text-teal-800 dark:text-teal-300 border border-teal-500/20 font-bold">
                                  {node.dates.yearHijri} ہجری
                                </span>
                              )}
                              {filters.showGregorian && (
                                <span className="px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-800 dark:text-indigo-300 border border-indigo-500/20 font-bold">
                                  {Math.abs(node.dates.yearCE)} {node.dates.isBCE ? 'قبل مسیح (BCE)' : 'عیسوی (CE)'}
                                </span>
                              )}
                              {filters.showLunarMonth && node.dates.lunarMonthUrdu && (
                                <span className="px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-800 dark:text-purple-300 border border-purple-500/20">
                                  {node.dates.lunarMonthUrdu}
                                </span>
                              )}
                              {filters.showSurahNumbers && node.quranicMetadata && (
                                <span className="px-2 py-0.5 rounded-md bg-rose-500/10 text-rose-800 dark:text-rose-300 border border-rose-500/20 font-bold">
                                  نزولی #{node.quranicMetadata.chronologicalSurahNumber} | مصحف #{node.quranicMetadata.mushafSurahNumber}
                                </span>
                              )}
                            </div>

                            {/* Teaser Summary */}
                            <p className="font-urdu text-[11px] text-[var(--text-muted)] line-clamp-2 leading-relaxed text-justify">
                              {node.summaryUrdu}
                            </p>

                            {/* Footer Location & Read More */}
                            <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] font-urdu">
                              <span className="flex items-center gap-1 text-[var(--text-muted)] truncate max-w-[170px]">
                                <MapPin className="w-3 h-3 text-rose-500 shrink-0" />
                                <span className="truncate">{node.locationUrdu}</span>
                              </span>
                              <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-300 font-bold group-hover:text-amber-600 transition-colors">
                                <span>تفصیلات و حقائق</span>
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

          {/* ── FLOATING NEXT/PREV CONTROLS ── */}
          <button
            onClick={() => scrollTrack('left')}
            title="اگلا مرحلہ دیکھیں (Scroll Left)"
            className="fixed left-3 sm:left-6 top-1/2 -translate-y-1/2 z-40 p-3 sm:p-4 rounded-2xl sacred-glass border-2 border-emerald-500/40 hover:border-amber-400 bg-[var(--bg-surface-elevated)]/90 text-emerald-800 dark:text-emerald-300 hover:text-white hover:bg-emerald-700 shadow-2xl transition-all duration-300 cursor-pointer active:scale-90 flex items-center gap-2 group"
          >
            <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
            <span className="font-urdu text-xs font-bold hidden sm:inline">اگلا مرحلہ</span>
          </button>

          <button
            onClick={() => scrollTrack('right')}
            title="پچھلا مرحلہ دیکھیں (Scroll Right)"
            className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-40 p-3 sm:p-4 rounded-2xl sacred-glass border-2 border-emerald-500/40 hover:border-amber-400 bg-[var(--bg-surface-elevated)]/90 text-emerald-800 dark:text-emerald-300 hover:text-white hover:bg-emerald-700 shadow-2xl transition-all duration-300 cursor-pointer active:scale-90 flex items-center gap-2 group"
          >
            <span className="font-urdu text-xs font-bold hidden sm:inline">پچھلا مرحلہ</span>
            <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* ── BOTTOM SCRUBBER RIBBON ── */}
          <footer className="w-full py-2.5 px-4 bg-[var(--bg-surface)]/95 backdrop-blur-md border-t border-[var(--border-subtle)] flex items-center justify-center shrink-0 z-30">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar max-w-full px-2 py-1">
              {displayedNodes.map((node, idx) => (
                <button
                  key={node.id}
                  onClick={() => {
                    const el = trackRef.current;
                    if (el) {
                      const targetScroll = idx * 440;
                      el.scrollTo({ left: targetScroll, behavior: 'smooth' });
                    }
                  }}
                  title={`مرحلہ ${node.stepNumber}: ${node.titleUrdu}`}
                  className="px-2.5 py-1 rounded-lg text-[10px] font-bold font-urdu bg-[var(--bg-surface-elevated)] hover:bg-emerald-700 hover:text-white text-[var(--text-secondary)] border border-[var(--border-subtle)] transition-all cursor-pointer whitespace-nowrap shrink-0"
                >
                  {node.stepNumber}. {node.titleUrdu.split('—')[0]}
                </button>
              ))}
            </div>
          </footer>
        </>
      )}

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* ── DEEP STUDY DETAIL MODAL DIALOG (WITH A- / A+ CONTROLS) ── */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      {modalNode && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in"
          onClick={() => setModalNode(null)}
          dir="rtl"
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[var(--bg-surface)] border border-amber-500/40 shadow-2xl p-6 sm:p-10 space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-[var(--border-subtle)] pb-5">
              <div className="space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className="px-3 py-1 rounded-xl text-xs font-bold text-white shadow-xs font-urdu"
                    style={{ backgroundColor: modalNode.colorCode }}
                  >
                    مرحلہ {modalNode.stepNumber}
                  </span>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-xl bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30 font-urdu">
                    {modalNode.dates.approximateYearsAgo.toLocaleString()} سال قبل
                  </span>
                  {modalNode.dates.yearAamAlFeel && (
                    <span className="text-xs font-bold px-2.5 py-1 rounded-xl bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/20 font-urdu">
                      سال {modalNode.dates.yearAamAlFeel} عام الفیل
                    </span>
                  )}
                  {modalNode.dates.yearBiThat && (
                    <span className="text-xs font-bold px-2.5 py-1 rounded-xl bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20 font-urdu">
                      سال {modalNode.dates.yearBiThat} بعثت
                    </span>
                  )}
                  {modalNode.dates.yearHijri && (
                    <span className="text-xs font-bold px-2.5 py-1 rounded-xl bg-teal-500/10 text-teal-800 dark:text-teal-300 border border-teal-500/20 font-urdu">
                      {modalNode.dates.yearHijri} ہجری
                    </span>
                  )}
                </div>

                <h2 className="text-xl sm:text-3xl font-extrabold text-[var(--text-primary)] font-urdu leading-snug">
                  {modalNode.titleUrdu}
                </h2>
              </div>

              {/* Action buttons (Font resize + Close) */}
              <div className="flex items-center gap-2 shrink-0">
                <div className="flex items-center bg-[var(--bg-surface-elevated)] rounded-xl border border-[var(--border-subtle)] p-1">
                  <button
                    onClick={() => setModalFontDelta((d) => Math.max(-2, d - 1))}
                    title="فونٹ چھوٹا کریں"
                    className="p-1.5 hover:bg-[var(--bg-surface)] rounded-lg text-xs font-bold cursor-pointer"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setModalFontDelta((d) => Math.min(6, d + 1))}
                    title="فونٹ بڑا کریں"
                    className="p-1.5 hover:bg-[var(--bg-surface)] rounded-lg text-xs font-bold cursor-pointer"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={() => setModalNode(null)}
                  className="w-10 h-10 rounded-2xl bg-[var(--bg-surface-elevated)] hover:bg-rose-500/20 hover:text-rose-500 flex items-center justify-center transition-colors cursor-pointer text-[var(--text-primary)]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Paternal Lineage Banner */}
            {modalNode.paternalLineageUrdu && (
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/15 via-emerald-500/5 to-transparent border border-emerald-500/30 flex items-start gap-3">
                <GitBranch className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-xs sm:text-sm text-emerald-800 dark:text-emerald-300 font-urdu block">
                    پدری شجرۂ نسب و الٰہی تسلسل:
                  </span>
                  <p className="font-urdu text-xs sm:text-sm text-[var(--text-primary)] mt-1 font-semibold leading-relaxed">
                    {modalNode.paternalLineageUrdu}
                  </p>
                </div>
              </div>
            )}

            {/* ── IMAMATE ACADEMIC & BIOGRAPHICAL DOSSIER ── */}
            {modalNode.imamateMetadata && (
              <div className="rounded-3xl border border-amber-500/30 bg-gradient-to-b from-amber-500/10 via-[var(--bg-surface-elevated)] to-[var(--bg-surface)] p-5 sm:p-6 space-y-5 shadow-lg">
                {/* Header Banner */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-amber-500/20 pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-2xl bg-amber-500/20 text-amber-500 flex items-center justify-center shrink-0">
                      <Shield className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold font-urdu text-amber-800 dark:text-amber-300 block">
                        {modalNode.imamateMetadata.imamNumber === 0
                          ? 'سیدۃ النساء و ام الائمہ طاہرین سلام اللہ علیہا'
                          : `امامِ معصوم سلسلہ #${modalNode.imamateMetadata.imamNumber} — مفصل اکیڈمک خاکہ`}
                      </span>
                      <h4 className="text-sm sm:text-base font-extrabold text-[var(--text-primary)] font-urdu">
                        {modalNode.imamateMetadata.titleHonorificUrdu}
                      </h4>
                    </div>
                  </div>

                  {/* Lifespan & Imamate Duration Badges */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-3 py-1 rounded-xl bg-blue-500/15 text-blue-800 dark:text-blue-300 border border-blue-500/30 text-xs font-bold font-urdu">
                      کل عمرِ مبارک: {modalNode.imamateMetadata.totalAgeYears} سال
                    </span>
                    {modalNode.imamateMetadata.imamateDurationYears !== undefined && (
                      <span className="px-3 py-1 rounded-xl bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30 text-xs font-bold font-urdu">
                        مدتِ امامت: {modalNode.imamateMetadata.imamateDurationYears} سال
                      </span>
                    )}
                  </div>
                </div>

                {/* Key Biographical Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-urdu">
                  {/* Mother Name */}
                  <div className="p-3.5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-1">
                    <span className="text-emerald-700 dark:text-emerald-300 font-bold block">
                      والدہ ماجدہ کا اسمِ گرامی و تعارف:
                    </span>
                    <p className="text-[var(--text-secondary)] leading-relaxed">
                      {modalNode.imamateMetadata.motherNameUrdu}
                    </p>
                  </div>

                  {/* Shrine / Final Rest */}
                  <div className="p-3.5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-1">
                    <span className="text-rose-700 dark:text-rose-300 font-bold flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>مزارِ اقدس و مدفنِ مطہر:</span>
                    </span>
                    <p className="text-[var(--text-secondary)] leading-relaxed">
                      {modalNode.imamateMetadata.shrineLocationUrdu}
                    </p>
                  </div>

                  {/* Spouses */}
                  {modalNode.imamateMetadata.spousesUrdu.length > 0 && (
                    <div className="p-3.5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-1.5">
                      <span className="text-purple-700 dark:text-purple-300 font-bold flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5" />
                        <span>ازواجِ مطہرات:</span>
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {modalNode.imamateMetadata.spousesUrdu.map((spouse, sIdx) => (
                          <span
                            key={sIdx}
                            className="px-2 py-0.5 rounded-lg bg-purple-500/10 text-purple-900 dark:text-purple-200 border border-purple-500/20 text-[11px]"
                          >
                            {spouse}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Children */}
                  {(modalNode.imamateMetadata.childrenUrdu.sons.length > 0 ||
                    modalNode.imamateMetadata.childrenUrdu.daughters.length > 0) && (
                    <div className="p-3.5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-2">
                      <span className="text-amber-700 dark:text-amber-300 font-bold flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5" />
                        <span>اولادِ امجاد (فرزندان و دختران):</span>
                      </span>
                      {modalNode.imamateMetadata.childrenUrdu.sons.length > 0 && (
                        <div>
                          <span className="text-[11px] font-bold text-[var(--text-muted)] block mb-1">فرزندان:</span>
                          <div className="flex flex-wrap gap-1">
                            {modalNode.imamateMetadata.childrenUrdu.sons.map((son, snIdx) => (
                              <span
                                key={snIdx}
                                className="px-2 py-0.5 rounded-md bg-[var(--bg-surface-elevated)] text-[var(--text-secondary)] border border-[var(--border-subtle)] text-[10px]"
                              >
                                {son}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {modalNode.imamateMetadata.childrenUrdu.daughters.length > 0 && (
                        <div>
                          <span className="text-[11px] font-bold text-[var(--text-muted)] block mb-1">دخترانِ مکرمہ:</span>
                          <div className="flex flex-wrap gap-1">
                            {modalNode.imamateMetadata.childrenUrdu.daughters.map((daughter, dIdx) => (
                              <span
                                key={dIdx}
                                className="px-2 py-0.5 rounded-md bg-[var(--bg-surface-elevated)] text-[var(--text-secondary)] border border-[var(--border-subtle)] text-[10px]"
                              >
                                {daughter}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Contemporary Rulers */}
                {modalNode.imamateMetadata.contemporaryRulersUrdu.length > 0 && (
                  <div className="p-3.5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-1.5 text-xs font-urdu">
                    <span className="text-red-700 dark:text-red-400 font-bold flex items-center gap-1.5">
                      <Crown className="w-3.5 h-3.5" />
                      <span>دور کے معاصر سلاطین و حکمران (بنو امیہ / بنو عباس):</span>
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {modalNode.imamateMetadata.contemporaryRulersUrdu.map((ruler, rIdx) => (
                        <span
                          key={rIdx}
                          className="px-2.5 py-1 rounded-lg bg-red-500/10 text-red-800 dark:text-red-300 border border-red-500/20 text-[11px]"
                        >
                          {ruler}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Sacred Transition Chain: Previous -> Next */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-urdu">
                  <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25 space-y-1.5">
                    <span className="text-amber-800 dark:text-amber-300 font-bold flex items-center gap-1.5">
                      <ArrowLeftRight className="w-4 h-4 text-amber-500 shrink-0" />
                      <span>ماقبل امام سے ورثہ و منتقلیِ امامت:</span>
                    </span>
                    <p className="text-[var(--text-secondary)] leading-relaxed">
                      {modalNode.imamateMetadata.transitionFromPreviousUrdu}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 space-y-1.5">
                    <span className="text-emerald-800 dark:text-emerald-300 font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>اگلے امام کے لیے نصوص، وصیت و پیشین گوئی:</span>
                    </span>
                    <p className="text-[var(--text-secondary)] leading-relaxed">
                      {modalNode.imamateMetadata.transitionToNextUrdu}
                    </p>
                  </div>
                </div>

                {/* Sacred Writings & Legacies */}
                {modalNode.imamateMetadata.sacredWritingsOrLegaciesUrdu.length > 0 && (
                  <div className="p-4 rounded-2xl bg-teal-500/10 border border-teal-500/25 space-y-2 text-xs font-urdu">
                    <span className="text-teal-800 dark:text-teal-300 font-bold flex items-center gap-1.5">
                      <Scroll className="w-4 h-4 text-teal-600 shrink-0" />
                      <span>علمی و دعائیہ شاہکار، صحیفے اور باقیاتِ صالحہ:</span>
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {modalNode.imamateMetadata.sacredWritingsOrLegaciesUrdu.map((legacy, lIdx) => (
                        <div
                          key={lIdx}
                          className="p-2.5 rounded-xl bg-[var(--bg-surface)] border border-teal-500/20 text-[var(--text-primary)] flex items-start gap-2"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0" />
                          <span className="leading-relaxed">{legacy}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ── FATRAH & DIVINE SUCCESSORS ACADEMIC DOSSIER ── */}
            {modalNode.fatrahMetadata && (
              <div className="rounded-3xl border border-amber-500/40 bg-gradient-to-b from-amber-500/15 via-[var(--bg-surface-elevated)] to-[var(--bg-surface)] p-5 sm:p-7 space-y-6 shadow-xl">
                {/* Header Banner */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-amber-500/25 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-amber-600/20 text-amber-500 flex items-center justify-center shrink-0 ring-1 ring-amber-500/30">
                      <Shield className="w-5 h-5 text-amber-400" />
                    </div>
                    <div>
                      <span className="text-xs font-bold font-urdu text-amber-800 dark:text-amber-300 block">
                        دورِ فترت #{modalNode.fatrahMetadata.gapNumber} — "زمینِ خدا کبھی بھی حجت سے خالی نہیں رہتی"
                      </span>
                      <h4 className="text-base sm:text-lg font-extrabold text-[var(--text-primary)] font-urdu">
                        {modalNode.fatrahMetadata.periodNameUrdu}
                      </h4>
                    </div>
                  </div>

                  {/* Duration and Successor Count Badges */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-3 py-1 rounded-xl bg-purple-500/15 text-purple-800 dark:text-purple-300 border border-purple-500/30 text-xs font-bold font-urdu">
                      دورانیہ: {modalNode.fatrahMetadata.durationYearsUrdu}
                    </span>
                    <span className="px-3 py-1 rounded-xl bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30 text-xs font-bold font-urdu">
                      {modalNode.fatrahMetadata.totalSuccessorsCount} اوصیاءِ الٰہی کی زنجیر
                    </span>
                  </div>
                </div>

                {/* Grid: Cause of Concealment & Awaited Savior */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-urdu">
                  {/* Cause of Concealment */}
                  <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/25 space-y-1.5">
                    <span className="text-rose-700 dark:text-rose-300 font-bold flex items-center gap-1.5">
                      <Lock className="w-4 h-4 text-rose-500 shrink-0" />
                      <span>اسبابِ تقیہ، کتمان و استتار:</span>
                    </span>
                    <p className="text-[var(--text-secondary)] leading-relaxed">
                      {modalNode.fatrahMetadata.causeOfConcealmentUrdu}
                    </p>
                  </div>

                  {/* Awaited Savior */}
                  <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 space-y-1.5">
                    <span className="text-emerald-700 dark:text-emerald-300 font-bold flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>بشارتِ منجی و نجات دہندہ:</span>
                    </span>
                    <p className="text-[var(--text-secondary)] leading-relaxed font-semibold">
                      {modalNode.fatrahMetadata.awaitedSaviorUrdu}
                    </p>
                  </div>
                </div>

                {/* Chain of Named Successors (اوصیاءِ الٰہی کی مفصل زنجیر) */}
                <div className="p-4 sm:p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-3 text-xs font-urdu">
                  <div className="flex items-center justify-between gap-2 border-b border-[var(--border-subtle)] pb-2.5">
                    <span className="text-amber-700 dark:text-amber-300 font-bold flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-amber-500" />
                      <span>نام بہ نام اوصیاءِ الٰہی و حاملینِ امانت کی مفصل زنجیر:</span>
                    </span>
                    <span className="text-[11px] text-[var(--text-muted)] font-bold">
                      مستند از «کمال الدین» و «إثبات الوصیۃ»
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {modalNode.fatrahMetadata.successorsList.map((successor, scIdx) => (
                      <div
                        key={scIdx}
                        className="p-3.5 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] space-y-1 hover:border-amber-500/50 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 text-[10px] font-bold flex items-center justify-center shrink-0">
                            {scIdx + 1}
                          </span>
                          <h5 className="font-bold text-xs sm:text-sm text-[var(--text-primary)]">
                            {successor.nameUrdu}
                          </h5>
                        </div>
                        <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 block pr-7">
                          {successor.titleOrRoleUrdu}
                        </span>
                        <p className="text-[11px] text-[var(--text-muted)] leading-relaxed pr-7">
                          {successor.notesUrdu}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Philosophical Wisdom & Contemporary Link to Imam Mahdi (ajfs) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-urdu">
                  {/* Divine Philosophy / Filtration */}
                  <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/25 space-y-1.5">
                    <span className="text-indigo-800 dark:text-indigo-300 font-bold flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-indigo-500 shrink-0" />
                      <span>حکمتِ فترت و غربالگری (امتحان و تمحیص):</span>
                    </span>
                    <p className="text-[var(--text-secondary)] leading-relaxed">
                      {modalNode.fatrahMetadata.philosophicalWisdomUrdu}
                    </p>
                  </div>

                  {/* Contemporary Link to Ghaybah */}
                  <div className="p-4 rounded-2xl bg-teal-500/10 border border-teal-500/25 space-y-1.5">
                    <span className="text-teal-800 dark:text-teal-300 font-bold flex items-center gap-1.5">
                      <Shield className="w-4 h-4 text-teal-500 shrink-0" />
                      <span>کلامی مماثلت: غیبتِ امام مہدی (عج) سے ربط:</span>
                    </span>
                    <p className="text-[var(--text-secondary)] leading-relaxed">
                      {modalNode.fatrahMetadata.contemporaryConnectionToGhaybahUrdu}
                    </p>
                  </div>
                </div>

                {/* Sacred Scriptures & Relics (صحف و تبرکاتِ انبیاء) */}
                {modalNode.fatrahMetadata.sacredScripturesOrRelicsUrdu.length > 0 && (
                  <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25 space-y-2 text-xs font-urdu">
                    <span className="text-amber-800 dark:text-amber-300 font-bold flex items-center gap-1.5">
                      <Key className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>مواریثِ انبیاء، صحفِ مقدسہ اور تبرکات:</span>
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {modalNode.fatrahMetadata.sacredScripturesOrRelicsUrdu.map((relic, rIdx) => (
                        <span
                          key={rIdx}
                          className="px-3 py-1.5 rounded-xl bg-[var(--bg-surface)] text-[var(--text-primary)] border border-amber-500/30 text-xs shadow-xs"
                        >
                          ✦ {relic}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}


            {/* Detailed Historical Narrative */}
            <div
              className="space-y-4 text-[var(--text-secondary)] font-urdu leading-relaxed"
              style={{ fontSize: `${14 + modalFontDelta}px` }}
            >
              <h3 className="font-bold text-base text-[var(--text-primary)] flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-500" />
                <span>تفصیلی تاریخی و الہامی پس منظر:</span>
              </h3>
              <div className="space-y-3 text-justify leading-loose whitespace-pre-line">
                {modalNode.detailedNarrativeUrdu.map((paragraph, pIdx) => (
                  <p key={pIdx}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Educational Classroom Questions / Study Points */}
            {modalNode.pedagogicalTakeaways && modalNode.pedagogicalTakeaways.length > 0 && (
              <div className="p-5 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 space-y-3">
                <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-300 font-bold font-urdu text-sm">
                  <GraduationCap className="w-5 h-5 text-indigo-500" />
                  <span>کلاس روم تدریسی و فکری نکات (طلباء اور اساتذہ کے لیے رہنما سوالات):</span>
                </div>
                <ul className="space-y-2 font-urdu text-xs sm:text-sm text-[var(--text-primary)]">
                  {modalNode.pedagogicalTakeaways.map((point: string, pIdx: number) => (
                    <li key={pIdx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Sources & Citations */}
            <div className="p-4 rounded-2xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-3 text-xs font-urdu text-[var(--text-muted)]">
              <div className="flex items-center gap-2">
                <span className="font-bold text-[var(--text-secondary)]">مستند شیعی و تاریخی مراجع:</span>
                <span>{modalNode.sources.join(' • ')}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-rose-500" />
                <span>مقام: {modalNode.locationUrdu}</span>
              </div>
            </div>

            {/* Modal Footer Stepper */}
            <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between gap-3">
              <button
                onClick={handleModalPrev}
                disabled={currentModalIndex <= 0}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--bg-surface-elevated)] hover:bg-emerald-700 hover:text-white disabled:opacity-30 disabled:pointer-events-none text-xs font-bold font-urdu transition-all cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
                <span>پچھلا مرحلہ</span>
              </button>

              <span className="text-xs font-bold text-[var(--text-muted)] font-urdu">
                {currentModalIndex + 1} از {displayedNodes.length}
              </span>

              <button
                onClick={handleModalNext}
                disabled={currentModalIndex >= displayedNodes.length - 1}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--bg-surface-elevated)] hover:bg-emerald-700 hover:text-white disabled:opacity-30 disabled:pointer-events-none text-xs font-bold font-urdu transition-all cursor-pointer"
              >
                <span>اگلا مرحلہ</span>
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
