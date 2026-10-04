import React, { useState, useEffect, useMemo } from 'react';
import { useQuran } from '@/context/QuranContext';
import {
  CURATED_HISTORICAL_PASSAGES,
  ALL_114_CHRONOLOGICAL_PASSAGES,
} from '@/data/completePassageChronology';
import {
  SURAH_HISTORICAL_BREAKDOWNS,
  SurahHistoricalBlock,
} from '@/data/surahHistoricalBlocksData';
import { loadSurahVerses } from '@/utils/quranVerseLoader';
import { Verse } from '@/types/quran';
import { URDU_TRANSLATORS, ENGLISH_TRANSLATORS } from '@/data/translations';
import { getAyahTafsir, hasAyahTafsir } from '@/data/ayahTafsirData';
import { getAyahWords, hasCuratedAyahVocabulary, QuranWordData } from '@/data/quranVocabularyData';
import { WordInspectorPopover } from '@/components/Reader/WordInspectorPopover';
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
  Languages,
  Repeat,
  Eye,
  EyeOff,
  BookMarked,
  GraduationCap,
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
  const [showTafsir, setShowTafsir] = useState<boolean>(true);
  const [expandedTafsirAyahs, setExpandedTafsirAyahs] = useState<Record<number, boolean>>({});

  // Word-by-word Vocabulary & Farhang state
  const [showVocabulary, setShowVocabulary] = useState<boolean>(true);
  const [vocabularyTrigger, setVocabularyTrigger] = useState<'click' | 'hover'>('click');
  const [selectedWord, setSelectedWord] = useState<{
    word: QuranWordData;
    ayahNumber: number;
    surahNumber: number;
  } | null>(null);
  const [showAyahFarhangTable, setShowAyahFarhangTable] = useState<Record<number, boolean>>({});

  // Historical breakdown state for multi-stage Surahs (like An-Nisa, Al-Baqarah, etc.)
  const [selectedCustomBlock, setSelectedCustomBlock] = useState<SurahHistoricalBlock | null>(null);
  const [showAllSurahBlocks, setShowAllSurahBlocks] = useState<boolean>(false);

  // Available verses with exegesis count in active passage
  const passageTafsirCount = useMemo(() => {
    return verses.filter((v) => hasAyahTafsir(v.surahNumber, v.ayahNumber)).length;
  }, [verses]);

  // Active stream determination: 36 Milestones or Full 114 Surahs (6,236 Ayahs)
  const currentStream = useMemo(() => {
    return passageStreamMode === 'all_quran'
      ? ALL_114_CHRONOLOGICAL_PASSAGES
      : CURATED_HISTORICAL_PASSAGES;
  }, [passageStreamMode]);

  // Total passages count for active stream
  const totalPassages = currentStream.length;

  // Defensive clamping of active passage step
  useEffect(() => {
    if (activePassageStep > totalPassages) {
      setActivePassageStep(1);
    }
  }, [activePassageStep, totalPassages, setActivePassageStep]);

  // Active passage resolution
  const activePassage = useMemo(() => {
    return (
      currentStream.find((p) => p.stepNumber === activePassageStep) ||
      currentStream[0]
    );
  }, [currentStream, activePassageStep]);

  // Available breakdown blocks for current Surah
  const surahBreakdownBlocks = useMemo(() => {
    return SURAH_HISTORICAL_BREAKDOWNS[activePassage.surahNumber] || [];
  }, [activePassage.surahNumber]);

  // Reset custom block selection when switching passage steps or stream mode
  useEffect(() => {
    setSelectedCustomBlock(null);
    setShowAllSurahBlocks(false);
  }, [activePassageStep, passageStreamMode]);

  // Active verse range calculation (custom block if selected, otherwise milestone verseRange)
  const currentVerseRange = useMemo(() => {
    return selectedCustomBlock ? selectedCustomBlock.verseRange : activePassage.verseRange;
  }, [selectedCustomBlock, activePassage.verseRange]);

  // Load and slice verses for active passage or selected custom block
  useEffect(() => {
    let isCancelled = false;
    setIsLoading(true);

    loadSurahVerses(activePassage.surahNumber)
      .then((fullSurah) => {
        if (!isCancelled) {
          const from = Math.max(1, currentVerseRange.fromVerse);
          const to = Math.min(fullSurah.length, currentVerseRange.toVerse);
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
  }, [activePassage.surahNumber, currentVerseRange.fromVerse, currentVerseRange.toVerse]);

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
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <div className="flex items-center gap-1 p-1 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-xs">
                <button
                  onClick={() => setPassageStreamMode('curated_milestones')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    passageStreamMode === 'curated_milestones'
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)]'
                  }`}
                  title="۳۶ کلیدی مقطوعات: مستند شاہراہ (التمہید و المیزان)"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span className="font-urdu">۳۶ کلیدی تاریخی مراحل</span>
                </button>

                <button
                  onClick={() => setPassageStreamMode('all_quran')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    passageStreamMode === 'all_quran'
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)]'
                  }`}
                  title="جامع تدریجی نزول: تمام سورتوں کے تاریخی مقطوعات"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span className="font-urdu">جامع تدریجی بہاؤ</span>
                </button>
              </div>

              {/* Continuous Recitation Button */}
              <button
                onClick={toggleContinuousPlay}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl text-xs font-bold border transition-all cursor-pointer ${
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
            <div className="w-full md:w-auto flex items-center justify-center gap-2">
              <button
                onClick={goToPrev}
                disabled={activePassageStep <= 1}
                className={`flex items-center justify-center gap-1 min-h-[44px] px-3.5 sm:px-4 rounded-2xl text-xs font-bold border transition-all shrink-0 ${
                  activePassageStep <= 1
                    ? 'opacity-40 cursor-not-allowed bg-[var(--bg-surface)] text-[var(--text-muted)] border-[var(--border-subtle)]'
                    : 'bg-[var(--bg-surface-elevated)] hover:bg-emerald-700 hover:text-white text-[var(--text-primary)] border-[var(--border-subtle)] shadow-xs cursor-pointer active:scale-95'
                }`}
              >
                <ChevronRight className="w-4 h-4" />
                <span className="font-urdu">پچھلا</span>
              </button>

              <select
                value={activePassageStep}
                onChange={(e) => {
                  setActivePassageStep(Number(e.target.value));
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex-1 md:flex-initial min-h-[44px] min-w-0 sm:min-w-[280px] max-w-full md:max-w-[340px] px-3 py-2 rounded-2xl text-xs sm:text-sm bg-[var(--bg-surface-elevated)] border-2 border-[var(--border-subtle)] text-[var(--text-primary)] font-bold focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500 cursor-pointer truncate font-urdu text-center shadow-xs"
              >
                {currentStream.map((p) => (
                  <option key={`p-opt-${p.stepNumber}`} value={p.stepNumber}>
                    #{p.stepNumber}. {p.surahNameUrdu} ({p.surahNameEnglish}) — آیات {p.verseRange.fromVerse} تا {p.verseRange.toVerse}{p.isSegmented ? ` [حصہ ${p.segmentIndex}/${p.totalSegments}]` : ''}
                  </option>
                ))}
              </select>

              <button
                onClick={goToNext}
                disabled={activePassageStep >= totalPassages}
                className={`flex items-center justify-center gap-1 min-h-[44px] px-3.5 sm:px-4 rounded-2xl text-xs font-bold border transition-all shrink-0 ${
                  activePassageStep >= totalPassages
                    ? 'opacity-40 cursor-not-allowed bg-[var(--bg-surface)] text-[var(--text-muted)] border-[var(--border-subtle)]'
                    : 'bg-emerald-700 hover:bg-emerald-800 text-white border-emerald-700 shadow-xs cursor-pointer active:scale-95'
                }`}
              >
                <span className="font-urdu">اگلا</span>
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Centerpiece: The Divine Revelation Display */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center pt-3 pb-1 w-full max-w-4xl mx-auto">
            {/* 1. Harmonious Metadata Pill Ribbon - Centered & Symmetrical */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-3.5 text-xs w-full">
              <span className="px-3 py-1 sm:py-1.5 rounded-full bg-emerald-600/15 text-emerald-800 dark:text-emerald-300 border border-emerald-500/25 font-bold font-sans shadow-2xs inline-flex items-center gap-1.5">
                مرحلہ {activePassageStep} از {totalPassages}
              </span>
              <span className="px-3 py-1 sm:py-1.5 rounded-full bg-amber-500/10 text-amber-800 dark:text-amber-200 border border-amber-500/25 font-semibold inline-flex items-center gap-1.5 font-urdu shadow-2xs">
                <Calendar className="w-3.5 h-3.5 text-amber-600" />
                <span>سنِ نزول: {activePassage.yearNabawiOrHijri}</span>
              </span>
              <span className="px-3 py-1 sm:py-1.5 rounded-full bg-sky-500/10 text-sky-800 dark:text-sky-200 border border-sky-500/25 font-semibold inline-flex items-center gap-1.5 font-urdu shadow-2xs">
                <MapPin className="w-3.5 h-3.5 text-sky-600" />
                <span>{activePassage.location}</span>
              </span>
              <span className="px-3 py-1 sm:py-1.5 rounded-full bg-purple-500/10 text-purple-800 dark:text-purple-200 border border-purple-500/25 font-semibold inline-flex items-center gap-1.5 font-urdu shadow-2xs">
                <Clock className="w-3.5 h-3.5 text-purple-600" />
                <span>مصحف سورۃ #{activePassage.surahNumber}</span>
              </span>
              {activePassage.isSegmented && (
                <span className="px-3 py-1 sm:py-1.5 rounded-full bg-rose-500/10 text-rose-800 dark:text-rose-200 border border-rose-500/25 font-bold font-urdu shadow-2xs inline-flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-rose-600" />
                  <span>تدریجی حصہ: {activePassage.segmentIndex} از {activePassage.totalSegments}</span>
                </span>
              )}
            </div>

            {/* 2. Grand Revelation Centerpiece */}
            <div className="space-y-2 w-full my-1">
              {/* Grand Arabic Calligraphic Title */}
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-arabic text-emerald-800 dark:text-emerald-300 tracking-wide drop-shadow-xs leading-tight">
                {activePassage.surahNameArabic}
              </h2>

              {/* Sub-titles: English & Urdu */}
              <div className="flex items-center justify-center flex-wrap gap-2 text-base sm:text-xl font-medium text-[var(--text-secondary)]">
                <span className="font-serif font-bold text-[var(--text-primary)]">
                  {activePassage.surahNameEnglish}
                </span>
                <span className="text-[var(--text-muted)]">•</span>
                <span className="font-urdu font-semibold">
                  (سورۃ {activePassage.surahNameUrdu})
                </span>
              </div>

              {/* Badges & Actions Row (Verse Range + Active Block + Shan-e-Nuzul Toggle) */}
              <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                <span className="text-xs sm:text-sm font-bold text-emerald-800 dark:text-emerald-300 font-urdu px-3.5 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 shadow-2xs">
                  آیات {currentVerseRange.fromVerse} تا {currentVerseRange.toVerse}
                </span>

                {selectedCustomBlock && (
                  <span className="text-xs sm:text-sm font-bold text-amber-800 dark:text-amber-300 font-urdu px-3 py-1.5 rounded-xl bg-amber-500/20 border border-amber-500/30 shadow-2xs">
                    فعال بلاک: {selectedCustomBlock.blockIndex} از {selectedCustomBlock.totalBlocks}
                  </span>
                )}

                {/* Direct Context Toggle in Header */}
                <button
                  onClick={() => setIsContextExpanded(!isContextExpanded)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--bg-surface-elevated)] hover:bg-emerald-700 hover:text-white border border-[var(--border-subtle)] text-xs font-bold text-[var(--text-secondary)] transition-all cursor-pointer shadow-xs"
                  title="شانِ نزول و تفسیری پس منظر دکھائیں یا چھپائیں"
                >
                  <BookMarked className="w-3.5 h-3.5 text-amber-500" />
                  <span className="font-urdu">شانِ نزول</span>
                  {isContextExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>

                {/* Direct Tafsir Toggle in Header */}
                <button
                  onClick={() => setShowTafsir(!showTafsir)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer shadow-xs ${
                    showTafsir
                      ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                      : 'bg-[var(--bg-surface-elevated)] hover:bg-amber-600 hover:text-white border-[var(--border-subtle)] text-[var(--text-secondary)]'
                  }`}
                  title="آیت بہ آیت شرح و تفسیر دکھائیں یا چھپائیں"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span className="font-urdu">آیت بہ آیت تفسیر</span>
                  {passageTafsirCount > 0 && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-sans font-bold ${
                      showTafsir ? 'bg-amber-800 text-amber-100' : 'bg-amber-500/20 text-amber-800 dark:text-amber-300'
                    }`}>
                      {passageTafsirCount}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* 3. Segmented Passage Notice & Direct Sister Jump */}
            {activePassage.isSegmented && (
              <div className="w-full mt-3.5 p-3 sm:p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-center sm:text-start">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                  <span className="font-urdu text-amber-950 dark:text-amber-200 leading-relaxed">
                    <strong>تدریجی نزول:</strong> اس تاریخی واقعے میں صرف <strong>آیات {activePassage.verseRange.fromVerse} تا {activePassage.verseRange.toVerse}</strong> نازل ہوئیں۔
                    {activePassage.timeGapNote && (
                      <span className="ms-1.5 font-bold text-amber-800 dark:text-amber-300">
                        ({activePassage.timeGapNote})
                      </span>
                    )}
                  </span>
                </div>

                {sisterPassages.length > 0 && (
                  <div className="flex items-center justify-center gap-1.5 shrink-0">
                    {sisterPassages.map((sis) => (
                      <button
                        key={sis.id}
                        onClick={() => {
                          setActivePassageStep(sis.stepNumber);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="px-3 py-1.5 rounded-xl bg-amber-600/20 hover:bg-amber-600 hover:text-white border border-amber-500/30 text-amber-900 dark:text-amber-100 font-urdu font-bold transition-all cursor-pointer flex items-center gap-1 text-[11px] shadow-2xs"
                      >
                        <span>
                          {sis.segmentIndex > activePassage.segmentIndex ? 'اگلا حصہ' : 'پچھلا حصہ'} (مرحلہ #{sis.stepNumber} — آیات {sis.verseRange.fromVerse} تا {sis.verseRange.toVerse})
                        </span>
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
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
        <div className="p-4 sm:p-5 rounded-2xl sacred-border bg-[var(--bg-surface-card)] shadow-xs space-y-2.5 animate-fade-in border-s-4 border-s-emerald-600">
          <div className="flex items-center justify-between text-xs font-bold text-emerald-800 dark:text-emerald-300">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>
                {selectedCustomBlock
                  ? `شانِ نزول و تفسیری پس منظر: ${selectedCustomBlock.titleUrdu}`
                  : 'شانِ نزول و تفسیری پس منظر (مستند تفاسیر: المیزان، مجمع البیان، التمہید)'}
              </span>
            </div>
            <span className="text-[11px] font-normal text-[var(--text-muted)] font-sans hidden sm:inline">
              {selectedCustomBlock
                ? `${selectedCustomBlock.location} • ${selectedCustomBlock.approximateYearHijriOrNabawi}`
                : `${activePassage.location} • ${activePassage.yearNabawiOrHijri}`}
            </span>
          </div>

          <p className="font-urdu text-sm sm:text-base leading-relaxed text-[var(--text-primary)] text-right">
            {selectedCustomBlock
              ? selectedCustomBlock.historicalContextUrdu
              : activePassage.contextUrdu}
          </p>

          {(selectedCustomBlock?.historicalContextEnglish || activePassage.contextEnglish) && (
            <p className="text-xs text-[var(--text-muted)] leading-relaxed pt-1.5 border-t border-[var(--border-subtle)] font-sans">
              {selectedCustomBlock
                ? selectedCustomBlock.historicalContextEnglish
                : activePassage.contextEnglish}
            </p>
          )}

          {/* Sister passages link */}
          {!selectedCustomBlock && sisterPassages.length > 0 && (
            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs border-t border-[var(--border-subtle)]">
              <span className="text-[var(--text-muted)] font-semibold flex items-center gap-1 font-urdu">
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
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-[var(--bg-surface)] hover:bg-emerald-700 hover:text-white border border-[var(--border-subtle)] transition-all flex items-center gap-1 cursor-pointer shadow-2xs font-urdu"
                >
                  <span>مرحلہ #{sis.stepNumber}</span>
                  <span className="opacity-75">({sis.yearNabawiOrHijri})</span>
                  <span>[آیات {sis.verseRange.fromVerse}–{sis.verseRange.toVerse}]</span>
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── 2b. COMPREHENSIVE HISTORICAL BREAKDOWN & CHECKBOX (FOR MULTI-STAGE SURAHS) ── */}
      {!isFocusMode && surahBreakdownBlocks.length > 0 && (
        <div className="p-4 sm:p-5 rounded-3xl sacred-glass sacred-border shadow-xs space-y-3.5 border-s-4 border-s-amber-500 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2.5 border-b border-[var(--border-subtle)]">
            <label className="flex items-start sm:items-center gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={showAllSurahBlocks}
                onChange={(e) => {
                  setShowAllSurahBlocks(e.target.checked);
                  if (!e.target.checked) setSelectedCustomBlock(null);
                }}
                className="mt-1 sm:mt-0 w-5 h-5 rounded-md border-2 border-emerald-600 text-emerald-600 focus:ring-emerald-500 cursor-pointer accent-emerald-600 transition-all"
              />
              <div>
                <span className="font-urdu font-bold text-sm sm:text-base text-[var(--text-primary)] block">
                  اس سورت کے تمام تاریخی ادوار و بقیہ آیات دیکھیں ({activePassage.surahNameUrdu} کی تمام {activePassage.totalVersesInSurah} آیات)
                </span>
                <span className="text-[11px] text-[var(--text-muted)] font-urdu block">
                  ۳۶ کلیدی مقطوعات کے علاوہ بقیہ تمام آیات کو مستند تاریخی ادوار میں تقسیم کر کے مطالعہ فرمائیں
                </span>
              </div>
            </label>

            <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
              <span className="px-3 py-1 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-900 dark:text-amber-200 text-xs font-bold font-urdu">
                کل {surahBreakdownBlocks.length} تاریخی ادوار
              </span>
              {selectedCustomBlock && (
                <button
                  onClick={() => setSelectedCustomBlock(null)}
                  className="px-2.5 py-1 rounded-xl bg-rose-500/15 hover:bg-rose-500 hover:text-white border border-rose-500/25 text-rose-800 dark:text-rose-200 text-xs font-bold font-urdu cursor-pointer transition-all"
                >
                  اصل سنگِ میل پر واپس جائیں
                </button>
              )}
            </div>
          </div>

          {/* Interactive Breakdown Matrix */}
          {showAllSurahBlocks && (
            <div className="space-y-3 animate-fade-in pt-1">
              <div className="text-xs text-[var(--text-secondary)] font-urdu bg-[var(--bg-surface)] p-2.5 rounded-xl border border-[var(--border-subtle)] flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>
                    نیچے دیے گئے کسی بھی بلاک پر کلک کریں تاکہ وہ آیات اور ان کا تفسیری سیاق فوراً نیچے لوڈ ہو جائے۔
                  </span>
                </div>
                {selectedCustomBlock && (
                  <span className="font-bold text-emerald-700 dark:text-emerald-300">
                    فعال بلاک: #{selectedCustomBlock.blockIndex} (آیات {selectedCustomBlock.verseRange.fromVerse}–{selectedCustomBlock.verseRange.toVerse})
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {surahBreakdownBlocks.map((block) => {
                  const isCurrentlyActive = selectedCustomBlock
                    ? selectedCustomBlock.blockId === block.blockId
                    : activePassage.verseRange.fromVerse === block.verseRange.fromVerse &&
                      activePassage.verseRange.toVerse === block.verseRange.toVerse;

                  return (
                    <div
                      key={block.blockId}
                      onClick={() => setSelectedCustomBlock(block)}
                      className={`p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                        isCurrentlyActive
                          ? 'bg-emerald-600/15 border-emerald-500 shadow-sm ring-2 ring-emerald-500/30'
                          : 'bg-[var(--bg-surface-elevated)] hover:bg-[var(--bg-surface)] border-[var(--border-subtle)] hover:border-emerald-500/40'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-700 text-white font-sans">
                            آیات {block.verseRange.fromVerse}–{block.verseRange.toVerse} ({block.totalVersesInBlock} آیات)
                          </span>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-800 dark:text-amber-200 border border-amber-500/25 font-urdu">
                            {block.approximateYearHijriOrNabawi}
                          </span>
                        </div>

                        <h4 className="font-urdu font-bold text-xs sm:text-sm text-[var(--text-primary)] leading-snug">
                          {block.titleUrdu}
                        </h4>

                        <p className="text-[11px] text-[var(--text-muted)] font-urdu line-clamp-3 mt-1.5 leading-relaxed">
                          {block.historicalContextUrdu}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-[var(--border-subtle)] text-[11px]">
                        <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-urdu font-medium">
                          {block.thematicCategory}
                        </span>
                        <span
                          className={`font-urdu font-bold flex items-center gap-1 ${
                            isCurrentlyActive
                              ? 'text-emerald-700 dark:text-emerald-300'
                              : 'text-[var(--text-muted)] hover:text-emerald-700'
                          }`}
                        >
                          {isCurrentlyActive ? 'موجودہ فعال بلاک ✓' : 'یہ آیات پڑھیں ←'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
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

          {/* Verse-by-verse Tafsir Toggle Checkbox */}
          <label
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer select-none ${
              showTafsir
                ? 'bg-amber-500/15 text-amber-900 dark:text-amber-200 border-amber-500/40 shadow-xs ring-1 ring-amber-500/20'
                : 'bg-[var(--bg-surface)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-amber-500/30'
            }`}
            title="آیت بہ آیت مستند تفاسیر (المیزان، مجمع البیان، نمونہ، انوار القرآن) کا مطالعہ فرمائیں"
          >
            <input
              type="checkbox"
              checked={showTafsir}
              onChange={(e) => setShowTafsir(e.target.checked)}
              className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 accent-amber-600 cursor-pointer"
            />
            <BookOpen className={`w-3.5 h-3.5 ${showTafsir ? 'text-amber-600 dark:text-amber-400' : 'text-[var(--text-muted)]'}`} />
            <span className="font-urdu">شرح و تفسیر</span>
          </label>

          {/* Word-by-word Farhang & Vocabulary Checkbox */}
          <label
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer select-none ${
              showVocabulary
                ? 'bg-sky-500/15 text-sky-900 dark:text-sky-200 border-sky-500/40 shadow-xs ring-1 ring-sky-500/20'
                : 'bg-[var(--bg-surface)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-sky-500/30'
            }`}
            title="لفظ بہ لفظ مفردات، لغت، مادہ (Root) اور اعراب و قواعد دیکھیں"
          >
            <input
              type="checkbox"
              checked={showVocabulary}
              onChange={(e) => setShowVocabulary(e.target.checked)}
              className="w-4 h-4 rounded text-sky-600 focus:ring-sky-500 accent-sky-600 cursor-pointer"
            />
            <GraduationCap className={`w-3.5 h-3.5 ${showVocabulary ? 'text-sky-600 dark:text-sky-400' : 'text-[var(--text-muted)]'}`} />
            <span className="font-urdu">مفردات و لغت</span>
          </label>

          {/* Trigger Mode Selector (Click vs Hover) */}
          {showVocabulary && (
            <div className="flex items-center gap-1 bg-[var(--bg-surface)] p-1 rounded-xl border border-[var(--border-subtle)] text-[11px] font-urdu shadow-2xs">
              <span className="text-[var(--text-muted)] ps-1 font-semibold">طریقہ:</span>
              <button
                onClick={() => setVocabularyTrigger('click')}
                className={`px-2 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  vocabularyTrigger === 'click'
                    ? 'bg-sky-700 text-white shadow-xs'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)]'
                }`}
                title="کلک موڈ: جب آپ کسی لفظ پر کلک کریں گے صرف تب معنی ظاہر ہوں گے (پر سکون، بغیر کسی انتشار کے)"
              >
                صرف کلک (Click)
              </button>
              <button
                onClick={() => setVocabularyTrigger('hover')}
                className={`px-2 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  vocabularyTrigger === 'hover'
                    ? 'bg-sky-700 text-white shadow-xs'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)]'
                }`}
                title="ہاور موڈ: ماؤس لفظ پر لے جانے سے فوری معنی ظاہر ہوں گے"
              >
                ماؤس ہاور (Hover)
              </button>
            </div>
          )}

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
                      {showVocabulary ? (
                        getAyahWords(v.surahNumber, v.ayahNumber, v.textArabic).map((w, wIdx) => {
                          const isSelected = selectedWord?.word.id === w.id;
                          return (
                            <span
                              key={w.id || `ar-only-${wIdx}`}
                              onClick={() => setSelectedWord({ word: w, ayahNumber: v.ayahNumber, surahNumber: v.surahNumber })}
                              onMouseEnter={() => {
                                if (vocabularyTrigger === 'hover') {
                                  setSelectedWord({ word: w, ayahNumber: v.ayahNumber, surahNumber: v.surahNumber });
                                }
                              }}
                              className={`inline-block mx-0.5 px-1 py-0.5 rounded-lg cursor-pointer transition-all ${
                                isSelected
                                  ? 'bg-sky-500/25 text-sky-950 dark:text-sky-100 ring-2 ring-sky-500'
                                  : 'hover:bg-sky-500/15'
                              }`}
                              title={`${w.meaningUrdu} (${w.partOfSpeechUrdu})`}
                            >
                              {w.wordArabic}
                            </span>
                          );
                        })
                      ) : (
                        v.textArabic
                      )}
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
                      dir="ltr"
                      className="font-sans text-left leading-relaxed text-[var(--text-muted)] text-sm"
                      style={{ fontFamily: typography.englishFont }}
                    >
                      {getEnglishText(v)}
                    </p>
                  )}

                  {/* Verse Exegesis in Translation-only mode */}
                  {((showTafsir && expandedTafsirAyahs[v.ayahNumber] !== false) ||
                    (!showTafsir && expandedTafsirAyahs[v.ayahNumber])) &&
                    getAyahTafsir(v.surahNumber, v.ayahNumber) && (
                      <div className="mt-3 p-3.5 sm:p-4 rounded-2xl bg-amber-500/5 dark:bg-amber-950/20 border border-amber-500/30 border-s-4 border-s-amber-600 space-y-2 text-right">
                        <div className="flex items-center justify-between text-xs font-urdu font-bold text-amber-900 dark:text-amber-300 pb-1.5 border-b border-amber-500/20">
                          <span className="flex items-center gap-1">
                            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                            شرح و تفسیرِ آیت ({v.surahNumber}:{v.ayahNumber})
                          </span>
                          <span className="text-[11px] font-normal opacity-85">
                            {getAyahTafsir(v.surahNumber, v.ayahNumber)?.scholarlySources}
                          </span>
                        </div>
                        <p className="font-urdu text-sm sm:text-base leading-relaxed text-[var(--text-primary)]">
                          {getAyahTafsir(v.surahNumber, v.ayahNumber)?.tafsirUrdu}
                        </p>
                      </div>
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

                        {/* Ayah-level Tafsir button */}
                        {hasAyahTafsir(v.surahNumber, v.ayahNumber) && (
                          <button
                            onClick={() =>
                              setExpandedTafsirAyahs((prev) => ({
                                ...prev,
                                [v.ayahNumber]: !(showTafsir ? prev[v.ayahNumber] !== false : prev[v.ayahNumber]),
                              }))
                            }
                            className={`px-2.5 py-1.5 rounded-xl text-xs font-urdu font-bold transition-all cursor-pointer flex items-center gap-1 ${
                              (showTafsir && expandedTafsirAyahs[v.ayahNumber] !== false) ||
                              (!showTafsir && expandedTafsirAyahs[v.ayahNumber])
                                ? 'bg-amber-600 text-white shadow-xs'
                                : 'bg-[var(--bg-surface)] hover:bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-[var(--border-subtle)]'
                            }`}
                            title="اس آیت کی مفصل تفسیر و شرح"
                          >
                            <BookOpen className="w-3.5 h-3.5" />
                            <span>تفسیر</span>
                          </button>
                        )}

                        {/* Ayah Farhang Table Button */}
                        <button
                          onClick={() =>
                            setShowAyahFarhangTable((prev) => ({
                              ...prev,
                              [v.ayahNumber]: !prev[v.ayahNumber],
                            }))
                          }
                          className={`px-2.5 py-1.5 rounded-xl text-xs font-urdu font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                            showAyahFarhangTable[v.ayahNumber]
                              ? 'bg-sky-700 text-white shadow-xs'
                              : 'bg-[var(--bg-surface)] hover:bg-sky-500/20 text-sky-850 dark:text-sky-300 border border-[var(--border-subtle)]'
                          }`}
                          title="اس آیت کے تمام الفاظ کی لغت، مادہ اور اعراب کا جدول دیکھیں"
                        >
                          <GraduationCap className="w-3.5 h-3.5" />
                          <span>فرہنگ</span>
                          {hasCuratedAyahVocabulary(v.surahNumber, v.ayahNumber) && (
                            <span className="w-1.5 h-1.5 rounded-full bg-sky-400" title="مفصل لغت و اعراب دستیاب ہے" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Arabic Verse Text with Interactive Word Tokens */}
                    <div
                      className="font-arabic text-right leading-[2.6] text-[var(--text-primary)] mb-4 select-text"
                      style={{
                        fontFamily: typography.arabicFont,
                        fontSize: `${typography.arabicFontSize}px`,
                      }}
                    >
                      {showVocabulary ? (
                        getAyahWords(v.surahNumber, v.ayahNumber, v.textArabic).map((w, wIdx) => {
                          const isSelected = selectedWord?.word.id === w.id;
                          return (
                            <span
                              key={w.id || `word-${wIdx}`}
                              onClick={() => setSelectedWord({ word: w, ayahNumber: v.ayahNumber, surahNumber: v.surahNumber })}
                              onMouseEnter={() => {
                                if (vocabularyTrigger === 'hover') {
                                  setSelectedWord({ word: w, ayahNumber: v.ayahNumber, surahNumber: v.surahNumber });
                                }
                              }}
                              className={`inline-block mx-0.5 sm:mx-1 px-1.5 py-0.5 rounded-xl cursor-pointer transition-all duration-200 ${
                                isSelected
                                  ? 'bg-sky-500/25 text-sky-950 dark:text-sky-100 ring-2 ring-sky-500 shadow-xs scale-105'
                                  : 'hover:bg-sky-500/15 hover:text-sky-850 dark:hover:text-sky-200'
                              }`}
                              title={`${w.meaningUrdu} (${w.partOfSpeechUrdu})`}
                            >
                              {w.wordArabic}
                            </span>
                          );
                        })
                      ) : (
                        v.textArabic
                      )}
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
                      <div className="pt-2 text-left" dir="ltr">
                        <p
                          className="font-sans leading-relaxed text-[var(--text-muted)] text-sm"
                          style={{ fontFamily: typography.englishFont }}
                        >
                          {getEnglishText(v)}
                        </p>
                      </div>
                    )}

                    {/* Verse Exegesis Panel (آیت بہ آیت مستند شیعہ تفاسیر) */}
                    {((showTafsir && expandedTafsirAyahs[v.ayahNumber] !== false) ||
                      (!showTafsir && expandedTafsirAyahs[v.ayahNumber])) &&
                      getAyahTafsir(v.surahNumber, v.ayahNumber) && (() => {
                        const tafsir = getAyahTafsir(v.surahNumber, v.ayahNumber)!;
                        return (
                          <div className="mt-4 p-4 sm:p-5 rounded-2xl bg-amber-500/5 dark:bg-amber-950/20 border border-amber-500/30 border-s-4 border-s-amber-600 space-y-2.5 text-right animate-fade-in shadow-xs">
                            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-amber-500/20 text-xs">
                              <div className="flex items-center gap-1.5 font-urdu font-bold text-amber-900 dark:text-amber-200">
                                <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                                <span>شرح و تفسیرِ آیت</span>
                                <span className="text-[10px] font-sans font-normal opacity-75">
                                  ({v.surahNumber}:{v.ayahNumber})
                                </span>
                              </div>
                              <div className="flex items-center gap-1.5 text-[11px] font-urdu">
                                <span className="px-2.5 py-0.5 rounded-lg bg-amber-500/20 text-amber-900 dark:text-amber-100 border border-amber-500/30 font-semibold">
                                  {tafsir.scholarlySources}
                                </span>
                              </div>
                            </div>

                            <p className="font-urdu text-sm sm:text-base leading-relaxed text-[var(--text-primary)]">
                              {tafsir.tafsirUrdu}
                            </p>

                            {tafsir.periodAndLocationUrdu && (
                              <div className="pt-2 border-t border-amber-500/15 text-[11px] text-[var(--text-muted)] font-urdu flex items-center justify-end gap-1.5">
                                <span>{tafsir.periodAndLocationUrdu}</span>
                                <MapPin className="w-3 h-3 text-amber-600 shrink-0" />
                              </div>
                            )}
                          </div>
                        );
                      })()}

                    {/* Ayah Farhang Table (مفردات و اعراب کا منظم جدول) */}
                    {showAyahFarhangTable[v.ayahNumber] && (
                      <div className="mt-4 p-4 rounded-2xl bg-sky-500/5 dark:bg-sky-950/20 border border-sky-500/30 border-s-4 border-s-sky-600 space-y-3 animate-fade-in shadow-xs text-right">
                        <div className="flex items-center justify-between gap-2 pb-2 border-b border-sky-500/20 text-xs">
                          <div className="flex items-center gap-1.5 font-urdu font-bold text-sky-900 dark:text-sky-200">
                            <GraduationCap className="w-4 h-4 text-sky-600" />
                            <span>فرہنگِ الفاظ و لغوی اعراب — آیت {v.surahNumber}:{v.ayahNumber}</span>
                          </div>
                          <span className="text-[11px] text-[var(--text-muted)] font-urdu">
                            کل {getAyahWords(v.surahNumber, v.ayahNumber, v.textArabic).length} کلمات
                          </span>
                        </div>

                        {/* Responsive Word Matrix Table */}
                        <div className="overflow-x-auto">
                          <table className="w-full text-right text-xs font-urdu">
                            <thead>
                              <tr className="border-b border-sky-500/20 text-[var(--text-muted)] font-bold">
                                <th className="py-2 px-2.5">کلمہ</th>
                                <th className="py-2 px-2.5">اردو معنی</th>
                                <th className="py-2 px-2.5">مادہ (Root)</th>
                                <th className="py-2 px-2.5">نوعیت (صرف)</th>
                                <th className="py-2 px-2.5">نحوی اعراب و تدریسی نکتہ</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-sky-500/10">
                              {getAyahWords(v.surahNumber, v.ayahNumber, v.textArabic).map((w) => (
                                <tr
                                  key={w.id}
                                  onClick={() => setSelectedWord({ word: w, ayahNumber: v.ayahNumber, surahNumber: v.surahNumber })}
                                  className="hover:bg-sky-500/10 cursor-pointer transition-colors"
                                >
                                  <td className="py-2 px-2.5 font-arabic font-bold text-base text-emerald-800 dark:text-emerald-300">
                                    {w.wordArabic}
                                  </td>
                                  <td className="py-2 px-2.5 font-bold text-[var(--text-primary)]">
                                    {w.meaningUrdu}
                                  </td>
                                  <td className="py-2 px-2.5 font-arabic text-amber-700 dark:text-amber-300 font-semibold">
                                    {w.root || '—'}
                                  </td>
                                  <td className="py-2 px-2.5">
                                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                                      w.type === 'verb'
                                        ? 'bg-emerald-500/20 text-emerald-800 dark:text-emerald-300'
                                        : w.type === 'noun'
                                        ? 'bg-sky-500/20 text-sky-800 dark:text-sky-300'
                                        : 'bg-purple-500/20 text-purple-800 dark:text-purple-300'
                                    }`}>
                                      {w.partOfSpeechUrdu}
                                    </span>
                                  </td>
                                  <td className="py-2 px-2.5 text-[11px] text-[var(--text-secondary)] leading-relaxed max-w-xs">
                                    {w.grammarNoteUrdu || w.teachingNoteUrdu || '—'}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
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

      {/* ── 5. FLOATING WORD INSPECTOR (POPOVER) ── */}
      <WordInspectorPopover
        word={selectedWord?.word || null}
        surahNumber={selectedWord?.surahNumber || activePassage.surahNumber}
        ayahNumber={selectedWord?.ayahNumber || 1}
        surahNameUrdu={activePassage.surahNameUrdu}
        onClose={() => setSelectedWord(null)}
        triggerMode={vocabularyTrigger}
      />

    </div>
  );
};
