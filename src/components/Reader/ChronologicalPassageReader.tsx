import React, { useState, useEffect, useMemo } from 'react';
import { useQuran } from '@/context/QuranContext';
import {
  CURATED_HISTORICAL_PASSAGES,
  ALL_114_CHRONOLOGICAL_PASSAGES,
} from '@/data/completePassageChronology';
import { loadSurahVerses } from '@/utils/quranVerseLoader';
import { Verse } from '@/types/quran';
import { URDU_TRANSLATORS, ENGLISH_TRANSLATORS } from '@/data/translations';
import {
  Sparkles,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  BookOpen,
  LayoutGrid,
  Columns,
  Play,
  Pause,
  Copy,
  Check,
  Bookmark,
  Layers,
  MapPin,
  Calendar,
  Clock,
  ArrowRight,
  Languages,
  Repeat,
  Eye,
  EyeOff,
  BookMarked,
} from 'lucide-react';

export const ChronologicalPassageReader: React.FC = () => {
  const {
    activePassageStep,
    setActivePassageStep,
    passageStreamMode,
    setPassageStreamMode,
    isContinuousPlay,
    toggleContinuousPlay,
    readingLayout,
    setReadingLayout,
    typography,
    updateTypography,
    activeAudio,
    playAyah,
    pauseAudio,
    toggleBookmark,
    isBookmarked,
  } = useQuran();

  const [copiedAyah, setCopiedAyah] = useState<number | null>(null);
  const [verses, setVerses] = useState<Verse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isContextExpanded, setIsContextExpanded] = useState<boolean>(true);
  const [isFocusMode, setIsFocusMode] = useState<boolean>(false);

  // Active stream determination: 36 Milestones or Full 114 Surahs (6,236 Ayahs)
  const currentStream = useMemo(() => {
    return passageStreamMode === 'all_quran'
      ? ALL_114_CHRONOLOGICAL_PASSAGES
      : CURATED_HISTORICAL_PASSAGES;
  }, [passageStreamMode]);

  // Total passages count for active stream
  const totalPassages = currentStream.length;

  // Active passage resolution
  const activePassage = useMemo(() => {
    return (
      currentStream.find((p) => p.stepNumber === activePassageStep) ||
      currentStream[0]
    );
  }, [currentStream, activePassageStep]);

  // Load and slice verses for active passage
  useEffect(() => {
    let isCancelled = false;
    setIsLoading(true);

    loadSurahVerses(activePassage.surahNumber)
      .then((fullSurah) => {
        if (!isCancelled) {
          const from = Math.max(1, activePassage.verseRange.fromVerse);
          const to = Math.min(fullSurah.length, activePassage.verseRange.toVerse);
          setVerses(fullSurah.slice(from - 1, to));
        }
      })
      .catch((err) => {
        console.error('Error loading passage verses:', err);
      })
      .finally(() => {
        if (!isCancelled) setIsLoading(false);
      });

    return () => {
      isCancelled = true;
    };
  }, [activePassage.surahNumber, activePassage.verseRange.fromVerse, activePassage.verseRange.toVerse]);

  // Navigation handlers
  const goToNext = () => {
    if (activePassageStep < totalPassages) {
      setActivePassageStep(activePassageStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToPrev = () => {
    if (activePassageStep > 1) {
      setActivePassageStep(activePassageStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Keyboard navigation (Arrow keys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'ArrowRight') goToPrev();
      if (e.key === 'ArrowLeft') goToNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePassageStep, totalPassages]);

  // Quick Copy with authentic citation formatting
  const handleCopy = (v: Verse) => {
    const citation = `[${activePassage.surahNameEnglish} ${v.surahNumber}:${v.ayahNumber} | Chronological Passage #${activePassage.stepNumber}]\n${v.textArabic}\n${getUrduText(v)}\n${getEnglishText(v)}`;
    navigator.clipboard.writeText(citation).then(() => {
      setCopiedAyah(v.ayahNumber);
      setTimeout(() => setCopiedAyah(null), 2000);
    });
  };

  // Helper to pick selected Urdu translation
  const getUrduText = (v: Verse) => {
    if (typography.urduTranslator === 'najafi' && v.translationUrduNajafi) {
      return v.translationUrduNajafi;
    }
    if (typography.urduTranslator === 'jalandhry' && v.translationUrduJalandhry) {
      return v.translationUrduJalandhry;
    }
    return v.translationUrdu;
  };

  // Helper to pick selected English translation
  const getEnglishText = (v: Verse) => {
    if (typography.englishTranslator === 'khattab' && v.translationEnglishKhattab) {
      return v.translationEnglishKhattab;
    }
    if (typography.englishTranslator === 'qarai' && v.translationEnglishQarai) {
      return v.translationEnglishQarai;
    }
    return v.translationEnglish;
  };

  // Sister passages lookup
  const sisterPassages = useMemo(() => {
    if (!activePassage.sisterPassageIds || activePassage.sisterPassageIds.length === 0) return [];
    return currentStream.filter((p) =>
      activePassage.sisterPassageIds?.includes(p.id)
    );
  }, [activePassage, currentStream]);

  return (
    <div className="space-y-4 sm:space-y-5 animate-fade-in max-w-[1780px] mx-auto pb-12">
      
      {/* ── 1. UNIFIED SANCTUARY PASSAGE HERO & TIMELINE ── */}
      {!isFocusMode && (
        <div className="p-4 sm:p-7 rounded-3xl sacred-glass sacred-border shadow-md space-y-4 relative overflow-hidden">
          {/* Subtle golden spiritual glow accent */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 dark:bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

          {/* Top Control Bar: Mode Toggle + Quick Stepper */}
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3.5 border-b border-[var(--border-subtle)]">
            
            {/* Left: Stream Mode Toggle & Continuous Recitation */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1 p-1 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-xs">
                <button
                  onClick={() => setPassageStreamMode('curated_milestones')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    passageStreamMode === 'curated_milestones'
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)]'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>۳۶ کلیدی مقطوعات (Milestones)</span>
                </button>

                <button
                  onClick={() => setPassageStreamMode('all_quran')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    passageStreamMode === 'all_quran'
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)]'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>تمام ۱۱۴ سورتیں تدریجی</span>
                </button>
              </div>

              {/* Continuous Recitation Button */}
              <button
                onClick={toggleContinuousPlay}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  isContinuousPlay
                    ? 'bg-emerald-700/15 border-emerald-500 text-emerald-800 dark:text-emerald-300 shadow-xs'
                    : 'bg-[var(--bg-surface)] border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
                title="مسلسل خودکار تلاوت: آن ہونے پر ایک آیت کے بعد اگلی خود چلے گی"
              >
                <Repeat className={`w-3.5 h-3.5 ${isContinuousPlay ? 'text-emerald-600 dark:text-emerald-400' : ''}`} />
                <span className="font-urdu">مسلسل تلاوت: {isContinuousPlay ? 'آن' : 'آف'}</span>
              </button>
            </div>

            {/* Right: Quick Stepper & Step Selector */}
            <div className="flex items-center gap-2 self-start md:self-auto">
              <button
                onClick={goToPrev}
                disabled={activePassageStep <= 1}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                  activePassageStep <= 1
                    ? 'opacity-40 cursor-not-allowed bg-[var(--bg-surface)] text-[var(--text-muted)] border-[var(--border-subtle)]'
                    : 'bg-[var(--bg-surface-elevated)] hover:bg-emerald-700 hover:text-white text-[var(--text-primary)] border-[var(--border-subtle)] shadow-xs cursor-pointer'
                }`}
              >
                <ChevronRight className="w-4 h-4" />
                <span>پچھلا</span>
              </button>

              <select
                value={activePassageStep}
                onChange={(e) => {
                  setActivePassageStep(Number(e.target.value));
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-3 py-1.5 rounded-xl text-xs bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] font-semibold focus:ring-2 focus:ring-emerald-500 cursor-pointer max-w-[200px] sm:max-w-[280px] truncate"
              >
                {currentStream.map((p) => (
                  <option key={`p-opt-${p.stepNumber}`} value={p.stepNumber}>
                    #{p.stepNumber}. {p.surahNameEnglish} ({p.yearNabawiOrHijri}) — آیات {p.verseRange.fromVerse}–{p.verseRange.toVerse}
                  </option>
                ))}
              </select>

              <button
                onClick={goToNext}
                disabled={activePassageStep >= totalPassages}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                  activePassageStep >= totalPassages
                    ? 'opacity-40 cursor-not-allowed bg-[var(--bg-surface)] text-[var(--text-muted)] border-[var(--border-subtle)]'
                    : 'bg-emerald-700 hover:bg-emerald-800 text-white border-emerald-700 shadow-xs cursor-pointer'
                }`}
              >
                <span>اگلا</span>
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Centerpiece: The Divine Revelation Display */}
          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-4 pt-1">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2 text-xs">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-600/15 text-emerald-800 dark:text-emerald-300 border border-emerald-500/25 font-bold font-sans">
                  مرحلہ {activePassageStep} از {totalPassages}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-800 dark:text-amber-200 border border-amber-500/25 font-semibold flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-600" />
                  <span>سنِ نزول: {activePassage.yearNabawiOrHijri}</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-sky-500/10 text-sky-800 dark:text-sky-200 border border-sky-500/25 font-semibold flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-sky-600" />
                  <span>{activePassage.location}</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-800 dark:text-purple-200 border border-purple-500/25 font-semibold flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-purple-600" />
                  <span>مصحف سورۃ #{activePassage.surahNumber}</span>
                </span>
              </div>

              <div className="flex flex-wrap items-baseline gap-3">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-[var(--text-primary)]">
                  {activePassage.surahNameEnglish}
                </h2>
                <span className="font-arabic text-2xl sm:text-3xl lg:text-4xl font-bold text-emerald-800 dark:text-emerald-300">
                  {activePassage.surahNameArabic}
                </span>
                <span className="text-base sm:text-lg font-normal text-[var(--text-muted)] font-urdu">
                  ({activePassage.surahNameUrdu})
                </span>
                <span className="text-xs sm:text-sm font-semibold text-emerald-700 dark:text-emerald-400 font-sans px-2.5 py-1 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
                  آیات {activePassage.verseRange.fromVerse} تا {activePassage.verseRange.toVerse}
                </span>
              </div>
            </div>

            {/* Direct Context Toggle in Header */}
            <button
              onClick={() => setIsContextExpanded(!isContextExpanded)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--bg-surface-elevated)] hover:bg-emerald-700 hover:text-white border border-[var(--border-subtle)] text-xs font-semibold text-[var(--text-secondary)] transition-all cursor-pointer shrink-0 shadow-xs self-start md:self-auto"
              title="شانِ نزول و تفسیری پس منظر دکھائیں یا چھپائیں"
            >
              <BookMarked className="w-3.5 h-3.5 text-amber-500" />
              <span>شانِ نزول</span>
              {isContextExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Integrated 23-Year Luminous Timeline Bar */}
          <div className="space-y-1.5 pt-2 border-t border-[var(--border-subtle)]">
            <div className="w-full bg-[var(--bg-surface)] h-2 rounded-full overflow-hidden border border-[var(--border-subtle)]">
              <div
                className="bg-gradient-to-r from-emerald-700 via-teal-500 to-amber-500 h-full transition-all duration-500 rounded-full"
                style={{ width: `${(activePassageStep / totalPassages) * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-[var(--text-muted)] font-medium">
              <span>آغازِ وحی (610 CE / 13 BH — غارِ حرا)</span>
              <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                ۲۳ سالہ سفرِ نزول: مرحلہ {activePassageStep} / {totalPassages}
              </span>
              <span>اتمامِ وحی (632 CE / 10 AH — غدیرِ خم)</span>
            </div>
          </div>
        </div>
      )}

      {/* ── 2. COLLAPSIBLE HISTORICAL CONTEXT & SHAN-E-NUZOOL ── */}
      {!isFocusMode && isContextExpanded && (
        <div className="p-4 sm:p-5 rounded-2xl sacred-border bg-[var(--bg-surface-card)] shadow-xs space-y-2.5 animate-fade-in border-l-4 border-l-emerald-600">
          <div className="flex items-center justify-between text-xs font-bold text-emerald-800 dark:text-emerald-300">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>شانِ نزول و تفسیری پس منظر (مستند تفاسیر: المیزان، مجمع البیان، التمہید)</span>
            </div>
            <span className="text-[11px] font-normal text-[var(--text-muted)] font-sans hidden sm:inline">
              {activePassage.location} • {activePassage.yearNabawiOrHijri}
            </span>
          </div>

          <p className="font-urdu text-sm sm:text-base leading-relaxed text-[var(--text-primary)] text-right">
            {activePassage.contextUrdu}
          </p>

          {activePassage.contextEnglish && (
            <p className="text-xs text-[var(--text-muted)] leading-relaxed pt-1.5 border-t border-[var(--border-subtle)] font-sans">
              {activePassage.contextEnglish}
            </p>
          )}

          {/* Sister passages link */}
          {sisterPassages.length > 0 && (
            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs border-t border-[var(--border-subtle)]">
              <span className="text-[var(--text-muted)] font-semibold flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-emerald-600" />
                <span>اس سورت کے دیگر تاریخی مراحل:</span>
              </span>
              {sisterPassages.map((sis) => (
                <button
                  key={sis.id}
                  onClick={() => {
                    setActivePassageStep(sis.stepNumber);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-[var(--bg-surface)] hover:bg-emerald-700 hover:text-white border border-[var(--border-subtle)] transition-all flex items-center gap-1 cursor-pointer shadow-2xs"
                >
                  <span>مرحلہ #{sis.stepNumber}</span>
                  <span className="opacity-75">({sis.yearNabawiOrHijri})</span>
                  <span>[آیات {sis.verseRange.fromVerse}–{sis.verseRange.toVerse}]</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── 3. SERENE READING CONTROLS & TRANSLATION BAR ── */}
      <div className="p-3 sm:p-3.5 rounded-2xl sacred-glass sacred-border flex flex-wrap items-center justify-between gap-2.5 text-xs shadow-xs">
        
        {/* Layout Mode Switcher */}
        <div className="flex items-center gap-1 bg-[var(--bg-surface)] p-1 rounded-xl border border-[var(--border-subtle)]">
          <button
            onClick={() => setReadingLayout('split')}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg font-semibold transition-all ${
              readingLayout === 'split'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
            title="Split Mode (آیت و ترجمہ)"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">آیت و ترجمہ</span>
          </button>
          <button
            onClick={() => setReadingLayout('arabic-only')}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg font-semibold transition-all ${
              readingLayout === 'arabic-only'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
            title="Arabic Only (صرف عربی)"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">صرف عربی</span>
          </button>
          <button
            onClick={() => setReadingLayout('translation-only')}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg font-semibold transition-all ${
              readingLayout === 'translation-only'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
            title="Translation Only (صرف ترجمہ)"
          >
            <Languages className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">صرف ترجمہ</span>
          </button>
          <button
            onClick={() => setReadingLayout('side-by-side')}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg font-semibold transition-all ${
              readingLayout === 'side-by-side'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
            title="Side by Side (دو کالم)"
          >
            <Columns className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">دو کالم</span>
          </button>
        </div>

        {/* Translation Switchers & Focus Mode */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Urdu Translator */}
          <div className="flex items-center gap-1">
            <span className="text-[var(--text-muted)] font-urdu text-[11px]">ترجمہ:</span>
            <select
              value={typography.urduTranslator}
              onChange={(e) =>
                updateTypography({
                  urduTranslator: e.target.value as 'jawadi' | 'najafi' | 'jalandhry',
                })
              }
              className="px-2 py-1 rounded-lg text-xs bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-primary)] font-medium font-urdu focus:ring-1 focus:ring-emerald-500 cursor-pointer"
            >
              {URDU_TRANSLATORS.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.nameUrdu}
                </option>
              ))}
            </select>
          </div>

          {/* English Translator */}
          <div className="flex items-center gap-1">
            <span className="text-[var(--text-muted)] font-sans text-[11px]">EN:</span>
            <select
              value={typography.englishTranslator}
              onChange={(e) =>
                updateTypography({
                  englishTranslator: e.target.value as 'qarai' | 'khattab' | 'sahih',
                })
              }
              className="px-2 py-1 rounded-lg text-xs bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-primary)] font-medium focus:ring-1 focus:ring-emerald-500 cursor-pointer"
            >
              {ENGLISH_TRANSLATORS.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          {/* Focus / Zen Mode Toggle */}
          <button
            onClick={() => setIsFocusMode(!isFocusMode)}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
              isFocusMode
                ? 'bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/40 shadow-xs'
                : 'bg-[var(--bg-surface)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
            title="Focus Mode (حالتِ یکسوئی — صرف آیات کی تلاوت)"
          >
            {isFocusMode ? <Eye className="w-3.5 h-3.5 text-amber-500" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span className="font-urdu">{isFocusMode ? 'عام منظر' : 'یکسوئی'}</span>
          </button>
        </div>
      </div>

      {/* ── 4. VERSES STREAM ── */}
      {isLoading ? (
        <div className="p-12 text-center sacred-glass rounded-3xl sacred-border space-y-3">
          <div className="w-8 h-8 mx-auto border-3 border-emerald-700 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-urdu text-[var(--text-muted)]">آیاتِ مبارکہ لوڈ کی جا رہی ہیں...</p>
        </div>
      ) : (
        <div className="space-y-4">
          
          {/* Bismillah Header (except for Surah At-Tawbah 9, or if part > 1) */}
          {activePassage.surahNumber !== 9 && activePassage.verseRange.fromVerse === 1 && (
            <div className="py-6 text-center">
              <div
                className="font-arabic font-bold text-2xl sm:text-3xl lg:text-4xl text-[var(--text-primary)] tracking-wide"
                style={{ fontFamily: typography.arabicFont }}
              >
                بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
              </div>
            </div>
          )}

          {/* 4A. ARABIC-ONLY MODE */}
          {readingLayout === 'arabic-only' && (
            <div className="w-full p-6 sm:p-10 rounded-3xl sacred-border sacred-shadow bg-[var(--bg-surface-card)]">
              <div
                className="font-arabic leading-[2.6] text-right"
                style={{
                  fontFamily: typography.arabicFont,
                  fontSize: `${typography.arabicFontSize}px`,
                  lineHeight: typography.lineHeight,
                }}
              >
                {verses.map((v) => {
                  const isPlaying =
                    activeAudio.isPlaying &&
                    activeAudio.surahNumber === v.surahNumber &&
                    activeAudio.ayahNumber === v.ayahNumber;

                  return (
                    <span
                      key={v.ayahNumber}
                      className={`inline transition-colors rounded-lg px-1.5 py-0.5 ${
                        isPlaying ? 'bg-emerald-500/20 text-emerald-950 dark:text-emerald-100 ring-1 ring-emerald-500/30' : ''
                      }`}
                    >
                      {v.textArabic}
                      <span
                        onClick={() => {
                          if (isPlaying) pauseAudio();
                          else playAyah(v.surahNumber, v.ayahNumber, activePassage.stepNumber);
                        }}
                        title={`Ayah ${v.ayahNumber} - Click to listen`}
                        className="inline-flex items-center justify-center cursor-pointer mx-1.5 px-2 py-0.5 rounded-full text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 select-none align-middle"
                      >
                        <span className="font-serif">۝</span>
                        <span className="mx-0.5">{v.ayahNumber}</span>
                      </span>
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          {/* 4B. TRANSLATION-ONLY MODE */}
          {readingLayout === 'translation-only' && (
            <div className="w-full p-6 sm:p-10 rounded-3xl sacred-border sacred-shadow bg-[var(--bg-surface-card)] space-y-6">
              {verses.map((v) => (
                <div
                  key={v.ayahNumber}
                  className="pb-4 border-b border-[var(--border-subtle)] last:border-none space-y-2"
                >
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-300">
                    <span className="w-6 h-6 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                      {v.ayahNumber}
                    </span>
                    <span>آیت نمبر {v.ayahNumber}</span>
                  </div>

                  {typography.showUrdu && (
                    <p
                      className="font-urdu text-right leading-relaxed text-[var(--text-primary)]"
                      style={{
                        fontFamily: typography.urduFont,
                        fontSize: `${typography.translationFontSize}px`,
                      }}
                    >
                      {getUrduText(v)}
                    </p>
                  )}

                  {typography.showEnglish && (
                    <p
                      className="font-sans text-left leading-relaxed text-[var(--text-muted)] text-sm"
                      style={{ fontFamily: typography.englishFont }}
                    >
                      {getEnglishText(v)}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* 4C. SPLIT / SIDE-BY-SIDE / DEFAULT CARD STREAM */}
          {(readingLayout === 'split' || readingLayout === 'side-by-side') && (
            <div
              className={`grid gap-4 ${
                readingLayout === 'side-by-side' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'
              }`}
            >
              {verses.map((v) => {
                const isPlaying =
                  activeAudio.isPlaying &&
                  activeAudio.surahNumber === v.surahNumber &&
                  activeAudio.ayahNumber === v.ayahNumber;
                const bookmarked = isBookmarked(v.surahNumber, v.ayahNumber);

                return (
                  <div
                    key={v.ayahNumber}
                    className={`p-5 sm:p-7 rounded-3xl sacred-border transition-all duration-300 ${
                      isPlaying
                        ? 'bg-emerald-500/10 border-emerald-500/40 shadow-lg ring-1 ring-emerald-500/30'
                        : 'bg-[var(--bg-surface-card)] hover:border-emerald-500/30 shadow-xs'
                    }`}
                  >
                    {/* Ayah Header Bar */}
                    <div className="flex items-center justify-between gap-2 pb-3 mb-4 border-b border-[var(--border-subtle)] text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-xl bg-emerald-600/15 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 font-bold flex items-center justify-center font-sans">
                          {v.ayahNumber}
                        </span>
                        <span className="text-[var(--text-muted)] font-medium">
                          {activePassage.surahNameEnglish} {v.surahNumber}:{v.ayahNumber}
                        </span>
                      </div>

                      {/* Ayah Action Icons */}
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            if (isPlaying) pauseAudio();
                            else playAyah(v.surahNumber, v.ayahNumber, activePassage.stepNumber);
                          }}
                          className={`p-2 rounded-xl transition-all cursor-pointer ${
                            isPlaying
                              ? 'bg-emerald-700 text-white shadow-xs'
                              : 'bg-[var(--bg-surface)] hover:bg-emerald-500/20 text-[var(--text-secondary)] hover:text-emerald-700'
                          }`}
                          title={isPlaying ? 'Pause Recitation' : 'Play Ayah Audio'}
                        >
                          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                        </button>

                        <button
                          onClick={() => handleCopy(v)}
                          className="p-2 rounded-xl bg-[var(--bg-surface)] hover:bg-emerald-500/20 text-[var(--text-secondary)] hover:text-emerald-700 transition-all cursor-pointer"
                          title="Copy Ayah with Citation"
                        >
                          {copiedAyah === v.ayahNumber ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>

                        <button
                          onClick={() =>
                            toggleBookmark({
                              eventOrder: activePassage.stepNumber,
                              surahNumber: v.surahNumber,
                              surahName: activePassage.surahNameEnglish,
                              ayahNumber: v.ayahNumber,
                              ayahRangeText: `${activePassage.surahNameEnglish} ${v.surahNumber}:${v.ayahNumber}`,
                            })
                          }
                          className={`p-2 rounded-xl transition-all cursor-pointer ${
                            bookmarked
                              ? 'bg-emerald-700 text-white shadow-xs'
                              : 'bg-[var(--bg-surface)] hover:bg-emerald-500/20 text-[var(--text-secondary)] hover:text-emerald-700'
                          }`}
                          title={bookmarked ? 'Remove Bookmark' : 'Bookmark Ayah'}
                        >
                          <Bookmark className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Arabic Verse Text */}
                    <div
                      className="font-arabic text-right leading-[2.4] text-[var(--text-primary)] mb-4"
                      style={{
                        fontFamily: typography.arabicFont,
                        fontSize: `${typography.arabicFontSize}px`,
                      }}
                    >
                      {v.textArabic}
                    </div>

                    {/* Urdu Translation */}
                    {typography.showUrdu && (
                      <div className="pt-2 border-t border-[var(--border-subtle)] text-right">
                        <p
                          className="font-urdu leading-relaxed text-[var(--text-primary)]"
                          style={{
                            fontFamily: typography.urduFont,
                            fontSize: `${typography.translationFontSize}px`,
                          }}
                        >
                          {getUrduText(v)}
                        </p>
                      </div>
                    )}

                    {/* English Translation */}
                    {typography.showEnglish && (
                      <div className="pt-2 text-left">
                        <p
                          className="font-sans leading-relaxed text-[var(--text-muted)] text-sm"
                          style={{ fontFamily: typography.englishFont }}
                        >
                          {getEnglishText(v)}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Bottom Navigation Buttons */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[var(--border-subtle)]">
            <button
              onClick={goToPrev}
              disabled={activePassageStep <= 1}
              className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-2xl text-xs font-bold border transition-all ${
                activePassageStep <= 1
                  ? 'opacity-40 cursor-not-allowed bg-[var(--bg-surface)] text-[var(--text-muted)] border-[var(--border-subtle)]'
                  : 'bg-[var(--bg-surface-elevated)] hover:bg-emerald-700 hover:text-white text-[var(--text-primary)] border-[var(--border-subtle)] shadow-xs cursor-pointer'
              }`}
            >
              <ChevronRight className="w-4 h-4" />
              <span>پچھلا مرحلہ (#{activePassageStep - 1})</span>
            </button>

            <span className="text-xs text-[var(--text-muted)] font-medium">
              مرحلہ {activePassageStep} از {totalPassages}
            </span>

            <button
              onClick={goToNext}
              disabled={activePassageStep >= totalPassages}
              className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-2xl text-xs font-bold border transition-all ${
                activePassageStep >= totalPassages
                  ? 'opacity-40 cursor-not-allowed bg-[var(--bg-surface)] text-[var(--text-muted)] border-[var(--border-subtle)]'
                  : 'bg-emerald-700 hover:bg-emerald-800 text-white border-emerald-700 shadow-xs cursor-pointer'
              }`}
            >
              <span>اگلا مرحلہ (#{activePassageStep + 1})</span>
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
