import React, { useState, useMemo } from 'react';
import { useQuran } from '@/context/QuranContext';
import {
  ASBAB_CRISIS_EVENTS,
  CRISIS_CATEGORIES,
  AsbabCrisisEvent,
  CrisisCategory,
} from '@/data/asbabCrisisData';
import {
  HelpCircle,
  ShieldAlert,
  Swords,
  AlertTriangle,
  Scroll,
  Crown,
  Search,
  Play,
  Pause,
  ArrowRight,
  Compass,
  Calendar,
  MapPin,
  Users,
  Sparkles,
  BookOpen,
} from 'lucide-react';

export const AsbabCrisisNavigator: React.FC = () => {
  const {
    typography,
    activeAudio,
    playAyah,
    pauseAudio,
    setActivePassageStep,
    setPerspectiveMode,
  } = useQuran();

  const [selectedCategoryId, setSelectedCategoryId] = useState<CrisisCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEventId, setSelectedEventId] = useState<string>(ASBAB_CRISIS_EVENTS[0].id);

  // Filtered crises
  const filteredEvents = useMemo(() => {
    return ASBAB_CRISIS_EVENTS.filter((evt) => {
      const matchesCategory =
        selectedCategoryId === 'all' || evt.category === selectedCategoryId;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        evt.titleEn.toLowerCase().includes(q) ||
        evt.titleUr.includes(q) ||
        evt.locationEn.toLowerCase().includes(q) ||
        evt.locationUr.includes(q) ||
        evt.keyFiguresEn.some((f) => f.toLowerCase().includes(q)) ||
        evt.keyFiguresUr.some((f) => f.includes(q)) ||
        evt.scripture.surahNameEnglish.toLowerCase().includes(q) ||
        evt.scripture.surahNameArabic.includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategoryId, searchQuery]);

  // Selected event resolution
  const activeEvent: AsbabCrisisEvent = useMemo(() => {
    return (
      filteredEvents.find((e) => e.id === selectedEventId) ||
      filteredEvents[0] ||
      ASBAB_CRISIS_EVENTS[0]
    );
  }, [filteredEvents, selectedEventId]);

  // Audio helper
  const isPlayingActive =
    activeAudio.isPlaying &&
    activeAudio.surahNumber === activeEvent.scripture.surahNumber &&
    activeAudio.ayahNumber === activeEvent.scripture.ayahNumber;

  const handleAudioToggle = () => {
    if (isPlayingActive) {
      pauseAudio();
    } else {
      playAyah(
        activeEvent.scripture.surahNumber,
        activeEvent.scripture.ayahNumber,
        activeEvent.chronologicalRank
      );
    }
  };

  const handleJumpToReader = (stepIndex?: number) => {
    if (stepIndex !== undefined) {
      setActivePassageStep(stepIndex);
      setPerspectiveMode('passage_nuzul');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const getCategoryIcon = (cat: CrisisCategory) => {
    switch (cat) {
      case 'theological_inquiry':
        return <HelpCircle className="w-4 h-4 text-indigo-500" />;
      case 'persecution_siege':
        return <ShieldAlert className="w-4 h-4 text-amber-500" />;
      case 'battlefield_shock':
        return <Swords className="w-4 h-4 text-rose-500" />;
      case 'social_crisis_slander':
        return <AlertTriangle className="w-4 h-4 text-orange-500" />;
      case 'diplomatic_treaty':
        return <Scroll className="w-4 h-4 text-teal-500" />;
      case 'covenant_completion':
        return <Crown className="w-4 h-4 text-emerald-500" />;
      default:
        return <Sparkles className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* ── Top Hero Banner ── */}
      <div className="p-6 sm:p-8 rounded-3xl sacred-glass sacred-border sacred-shadow relative overflow-hidden bg-gradient-to-br from-indigo-950/20 via-transparent to-emerald-950/20">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-500/20 mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>Situational Intelligence of Revelation (اسبابِ نزول کا بحرانی نقشہ)</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-[var(--text-primary)]">
            اسبابِ نزول و تاریخی بحران
            <span className="block text-lg sm:text-xl font-sans font-normal text-[var(--text-secondary)] mt-1">
              Asbab-un-Nuzul & The Crisis Response Timeline (610–632 CE)
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-3 leading-relaxed">
            The Quran did not descend as an abstract theoretical doctrine. It actively intervened in real-time history—responding directly to scholastic inquiries, easing agonizing sieges, reforming traumatic battlefield shocks, shielding civil dignity from malicious slander, and culminating in the eternal covenant of Wilayah.
          </p>
        </div>

        {/* Quick Stats Pill Row */}
        <div className="flex flex-wrap items-center gap-3 mt-5 pt-4 border-t border-[var(--border-subtle)] text-xs text-[var(--text-muted)]">
          <span className="font-urdu">
            مجموعی بحرانی واقعات: <strong className="text-[var(--text-primary)] font-sans">{ASBAB_CRISIS_EVENTS.length}</strong>
          </span>
          <span>•</span>
          <span className="font-urdu">
            علمی مناظرات: <strong className="text-indigo-600 dark:text-indigo-400 font-sans">2</strong>
          </span>
          <span>•</span>
          <span className="font-urdu">
            معرکے و صدمات: <strong className="text-rose-600 dark:text-rose-400 font-sans">2</strong>
          </span>
          <span>•</span>
          <span className="font-urdu">
            معاہدات و اکمال: <strong className="text-emerald-600 dark:text-emerald-400 font-sans">3</strong>
          </span>
        </div>
      </div>

      {/* ── Filters & Search Bar ── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 rounded-2xl sacred-glass sacred-border">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 lg:pb-0">
          <button
            onClick={() => setSelectedCategoryId('all')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategoryId === 'all'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)]'
            }`}
          >
            All Crises ({ASBAB_CRISIS_EVENTS.length})
          </button>

          {CRISIS_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategoryId(cat.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategoryId === cat.id
                  ? 'bg-emerald-700 text-white shadow-sm font-bold'
                  : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)]'
              }`}
            >
              {getCategoryIcon(cat.id)}
              <span className="font-urdu">{cat.labelUr}</span>
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search crisis, figure, or surah..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-[var(--bg-surface)] text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] border border-[var(--border-subtle)] focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* ── Main Layout: Master Timeline (Left) & Detailed Dossier (Right) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Timeline List (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider font-urdu">
              تاریخی بحرانی مراحل ({filteredEvents.length})
            </span>
            <span className="text-[11px] text-[var(--text-muted)]">
              Chronological Sequence (1 to {ASBAB_CRISIS_EVENTS.length})
            </span>
          </div>

          <div className="space-y-2.5 max-h-[720px] overflow-y-auto pr-1 no-scrollbar">
            {filteredEvents.map((evt) => {
              const isSelected = evt.id === activeEvent.id;
              return (
                <div
                  key={evt.id}
                  onClick={() => setSelectedEventId(evt.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer text-left relative ${
                    isSelected
                      ? 'bg-[var(--bg-surface-elevated)] border-emerald-500/60 shadow-lg ring-1 ring-emerald-500/20'
                      : 'bg-[var(--bg-surface-card)] border-[var(--border-subtle)] hover:border-emerald-500/30 hover:bg-[var(--bg-surface)]'
                  }`}
                >
                  {/* Top Bar: Order & Year */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          isSelected
                            ? 'bg-emerald-700 text-white'
                            : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] border border-[var(--border-subtle)]'
                        }`}
                      >
                        {evt.orderNumber}
                      </span>
                      <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                        {evt.yearCE} CE
                      </span>
                      <span className="text-[11px] text-[var(--text-muted)] font-urdu">
                        ({evt.yearHijriOrNabawi})
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {getCategoryIcon(evt.category)}
                    </div>
                  </div>

                  {/* Title in Urdu & English */}
                  <div className="text-right mb-1">
                    <h4 className="font-bold text-sm text-[var(--text-primary)] font-urdu leading-snug">
                      {evt.titleUr}
                    </h4>
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-[var(--text-secondary)] font-medium line-clamp-1">
                      {evt.titleEn}
                    </p>
                  </div>

                  {/* Location & Surah Pill */}
                  <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-[var(--border-subtle)] text-[11px] text-[var(--text-muted)]">
                    <span className="flex items-center gap-1 font-urdu">
                      <MapPin className="w-3 h-3 text-emerald-600" />
                      {evt.locationUr}
                    </span>
                    <span className="px-2 py-0.5 rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-serif font-bold">
                      {evt.scripture.surahNameArabic} ({evt.scripture.ayahRangeText})
                    </span>
                  </div>
                </div>
              );
            })}

            {filteredEvents.length === 0 && (
              <div className="p-8 text-center rounded-2xl sacred-border text-[var(--text-muted)] text-xs">
                No crisis events match your search query.
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Active Dossier & Scripture Showcase (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          <div className="p-6 sm:p-7 rounded-3xl sacred-glass sacred-border sacred-shadow relative">
            {/* Header: Crisis Title & Meta */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-xl text-xs font-bold bg-emerald-700 text-white shadow-sm">
                  بحران #{activeEvent.orderNumber}
                </span>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-secondary)] flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                  {activeEvent.yearCE} CE • {activeEvent.yearHijriOrNabawi}
                </span>
              </div>

              <div className="flex items-center gap-1.5 font-urdu text-xs text-[var(--text-secondary)]">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                <span>{activeEvent.locationUr}</span>
                <span className="font-sans text-[11px] text-[var(--text-muted)]">({activeEvent.locationEn})</span>
              </div>
            </div>

            {/* Urdu Title & English Title */}
            <div className="text-right mb-2">
              <h3 className="text-xl sm:text-2xl font-bold font-urdu text-[var(--text-primary)] leading-relaxed">
                {activeEvent.titleUr}
              </h3>
            </div>
            <p className="text-xs sm:text-sm font-medium text-[var(--text-muted)] mb-5">
              {activeEvent.titleEn}
            </p>

            {/* Key Historical Figures */}
            <div className="p-3.5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] mb-5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2">
                <Users className="w-3.5 h-3.5 text-emerald-600" />
                <span>کلیدی تاریخی شخصیات (Key Protagonists):</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {activeEvent.keyFiguresUr.map((fig, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg text-xs font-medium bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] font-urdu"
                  >
                    {fig}
                  </span>
                ))}
              </div>
            </div>

            {/* 3-Step Situational Anatomy */}
            <div className="space-y-4">
              {/* 1. Crisis Trigger */}
              <div className="p-4 rounded-2xl border border-rose-500/20 bg-rose-500/5">
                <div className="flex items-center gap-2 text-xs font-bold text-rose-600 dark:text-rose-400 mb-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span className="font-urdu text-sm">۱. بحرانی سبب / پس منظر (The Crisis Trigger)</span>
                </div>
                <p className="text-xs sm:text-sm font-urdu text-[var(--text-primary)] leading-relaxed text-right">
                  {activeEvent.crisisTriggerUr}
                </p>
                <p className="text-xs text-[var(--text-secondary)] mt-2 leading-relaxed">
                  {activeEvent.crisisTriggerEn}
                </p>
              </div>

              {/* 2. Divine Response */}
              <div className="p-4 rounded-2xl border border-indigo-500/20 bg-indigo-500/5">
                <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 mb-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span className="font-urdu text-sm">۲. الٰہی ردعمل و نزولِ وحی (The Divine Intervention)</span>
                </div>
                <p className="text-xs sm:text-sm font-urdu text-[var(--text-primary)] leading-relaxed text-right">
                  {activeEvent.divineResponseUr}
                </p>
                <p className="text-xs text-[var(--text-secondary)] mt-2 leading-relaxed">
                  {activeEvent.divineResponseEn}
                </p>
              </div>

              {/* 3. Pedagogical Wisdom */}
              <div className="p-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/5">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-1.5">
                  <Crown className="w-3.5 h-3.5" />
                  <span className="font-urdu text-sm">۳. حکمتِ نزول و دائمی درس (Timeless Wisdom)</span>
                </div>
                <p className="text-xs sm:text-sm font-urdu text-[var(--text-primary)] leading-relaxed text-right">
                  {activeEvent.pedagogicalWisdomUr}
                </p>
                <p className="text-xs text-[var(--text-secondary)] mt-2 leading-relaxed">
                  {activeEvent.pedagogicalWisdomEn}
                </p>
              </div>
            </div>

            {/* ── Scripture Spotlight Card ── */}
            <div className="mt-6 p-5 sm:p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] relative overflow-hidden">
              {/* Surah Header & Audio Toggle */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-[var(--border-subtle)]">
                <div>
                  <h4 className="font-bold text-base font-serif text-[var(--text-primary)]">
                    {activeEvent.scripture.surahNameEnglish}{' '}
                    <span className="text-xs text-[var(--text-muted)] font-sans">
                      ({activeEvent.scripture.ayahRangeText})
                    </span>
                  </h4>
                  <p className="text-xs text-[var(--text-muted)] font-urdu">
                    سورۃ {activeEvent.scripture.surahNameUrdu} • نزولی درجہ #{activeEvent.chronologicalRank}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleAudioToggle}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      isPlayingActive
                        ? 'bg-amber-600 text-white shadow-md animate-pulse'
                        : 'bg-emerald-700 text-white hover:bg-emerald-800 shadow-sm'
                    }`}
                  >
                    {isPlayingActive ? (
                      <>
                        <Pause className="w-3.5 h-3.5" />
                        <span>Pause</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5" />
                        <span>Listen Qari</span>
                      </>
                    )}
                  </button>

                  {activeEvent.linkedPassageStepIndex !== undefined && (
                    <button
                      onClick={() => handleJumpToReader(activeEvent.linkedPassageStepIndex)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-emerald-700 dark:text-emerald-400 hover:border-emerald-500/50"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Open in Reader</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>

              {/* Arabic Scripture */}
              <div
                className="text-right text-[var(--text-primary)] font-arabic leading-loose mb-4 p-4 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)]"
                style={{
                  fontSize: `${typography.arabicFontSize}px`,
                  fontFamily: typography.arabicFont,
                }}
                dir="rtl"
              >
                {activeEvent.scripture.arabicText}
              </div>

              {/* Urdu Translation */}
              <div className="text-right mb-3" dir="rtl">
                <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block mb-1">
                  اردو ترجمہ (علامہ ذیشان حیدر جوادی):
                </span>
                <p className="text-xs sm:text-sm font-urdu text-[var(--text-primary)] leading-relaxed">
                  {activeEvent.scripture.urduTranslation}
                </p>
              </div>

              {/* English Translation */}
              <div className="text-left pt-3 border-t border-[var(--border-subtle)]">
                <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block mb-1">
                  English (Ali Quli Qara\'i / Clear Quran):
                </span>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {activeEvent.scripture.englishTranslation}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
