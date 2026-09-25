import React, { useState, useEffect, useMemo } from 'react';
import { SURAHS_DATA } from '@/data/surahs';
import { useQuran } from '@/context/QuranContext';
import { loadSurahVerses } from '@/utils/quranVerseLoader';
import { Verse } from '@/types/quran';
import { URDU_TRANSLATORS, ENGLISH_TRANSLATORS } from '@/data/translations';
import {
  Compass,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  Play,
  Pause,
  Copy,
  Check,
  Bookmark,
  LayoutGrid,
  Columns,
  Languages,
} from 'lucide-react';

export const MushafView: React.FC = () => {
  const {
    searchQuery,
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

  const [filterType, setFilterType] = useState<'all' | 'meccan' | 'medinan'>('all');
  const [selectedSurahNumber, setSelectedSurahNumber] = useState<number | null>(null);
  const [surahVerses, setSurahVerses] = useState<Verse[]>([]);
  const [isLoadingSurah, setIsLoadingSurah] = useState<boolean>(false);
  const [copiedAyah, setCopiedAyah] = useState<number | null>(null);

  // Active Surah metadata lookup
  const activeSurahMeta = useMemo(() => {
    if (!selectedSurahNumber) return null;
    return SURAHS_DATA.find((s) => s.n === selectedSurahNumber) || null;
  }, [selectedSurahNumber]);

  // Load complete Surah verses when a Surah is selected
  useEffect(() => {
    if (!selectedSurahNumber) return;

    let isCancelled = false;
    setIsLoadingSurah(true);

    loadSurahVerses(selectedSurahNumber)
      .then((loaded) => {
        if (!isCancelled) {
          setSurahVerses(loaded);
        }
      })
      .catch((err) => {
        console.error(`Error loading surah ${selectedSurahNumber}:`, err);
      })
      .finally(() => {
        if (!isCancelled) setIsLoadingSurah(false);
      });

    return () => {
      isCancelled = true;
    };
  }, [selectedSurahNumber]);

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
    setSelectedSurahNumber(surahNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setSelectedSurahNumber(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToNextSurah = () => {
    if (selectedSurahNumber && selectedSurahNumber < 114) {
      setSelectedSurahNumber(selectedSurahNumber + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToPrevSurah = () => {
    if (selectedSurahNumber && selectedSurahNumber > 1) {
      setSelectedSurahNumber(selectedSurahNumber - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCopy = (v: Verse, surahNameEnglish: string, nuzulRank: number) => {
    const citation = `[${surahNameEnglish} ${v.surahNumber}:${v.ayahNumber} | Mushaf #${v.surahNumber}, Nuzul #${nuzulRank}]\n${v.textArabic}\n${getUrduText(v)}\n${getEnglishText(v)}`;
    navigator.clipboard.writeText(citation).then(() => {
      setCopiedAyah(v.ayahNumber);
      setTimeout(() => setCopiedAyah(null), 2000);
    });
  };

  const getUrduText = (v: Verse) => {
    if (typography.urduTranslator === 'najafi' && v.translationUrduNajafi) {
      return v.translationUrduNajafi;
    }
    if (typography.urduTranslator === 'jalandhry' && v.translationUrduJalandhry) {
      return v.translationUrduJalandhry;
    }
    return v.translationUrdu;
  };

  const getEnglishText = (v: Verse) => {
    if (typography.englishTranslator === 'khattab' && v.translationEnglishKhattab) {
      return v.translationEnglishKhattab;
    }
    if (typography.englishTranslator === 'qarai' && v.translationEnglishQarai) {
      return v.translationEnglishQarai;
    }
    return v.translationEnglish;
  };

  // Render Bismillah Calligraphic Header
  const renderBismillah = (surahNumber: number) => {
    if (surahNumber === 9) {
      return (
        <div className="py-3 px-4 mb-6 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-center text-xs text-amber-800 dark:text-amber-200 font-urdu shadow-2xs">
          <span>مستند روایات و تفاسیر کے مطابق، سورۃ التوبہ (برائت) کے آغاز میں بسم اللہ نازل نہیں ہوئی کیونکہ یہ غضبِ الٰہی اور عہد شکن مشرکین سے برائت کا اعلان ہے۔</span>
        </div>
      );
    }

    if (surahNumber === 1) {
      return null;
    }

    return (
      <div className="py-6 mb-6 text-center animate-fade-in">
        <div className="inline-block px-8 py-3.5 rounded-3xl bg-[var(--bg-surface-elevated)] border border-emerald-500/25 shadow-xs">
          <div
            className="font-arabic font-bold text-2xl sm:text-3xl lg:text-4xl text-emerald-900 dark:text-emerald-200 tracking-wider select-none"
            style={{ fontFamily: typography.arabicFont }}
          >
            بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
          </div>
          <div className="text-[11px] font-urdu text-[var(--text-muted)] mt-1.5">
            شروع اللہ کے نام سے جو بڑا مہربان نہایت رحم والا ہے
          </div>
        </div>
      </div>
    );
  };

  // ─────────────────────────────────────────────────────────────
  // VIEW B: SINGLE SURAH FULL CANONICAL READER (STAYS IN MUSHAF VIEW)
  // ─────────────────────────────────────────────────────────────
  if (selectedSurahNumber && activeSurahMeta) {
    return (
      <div className="w-full max-w-[1780px] mx-auto py-4 sm:py-6 animate-fade-in space-y-5">
        
        {/* Top Navigation & Surah Switcher Bar */}
        <div className="p-4 sm:p-6 rounded-3xl sacred-glass sacred-border shadow-md space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[var(--border-subtle)]">
            <button
              onClick={handleBackToList}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[var(--bg-surface-elevated)] hover:bg-emerald-700 hover:text-white text-xs font-bold border border-[var(--border-subtle)] transition-all cursor-pointer shadow-xs self-start"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>فہرستِ ۱۱۴ سورتیں (Back to Mushaf Grid)</span>
            </button>

            {/* Stepper for 114 Canonical Surahs */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                onClick={goToPrevSurah}
                disabled={selectedSurahNumber <= 1}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                  selectedSurahNumber <= 1
                    ? 'opacity-40 cursor-not-allowed bg-[var(--bg-surface)] text-[var(--text-muted)] border-[var(--border-subtle)]'
                    : 'bg-[var(--bg-surface-elevated)] hover:bg-emerald-700 hover:text-white text-[var(--text-primary)] border-[var(--border-subtle)] shadow-xs cursor-pointer'
                }`}
              >
                <ChevronRight className="w-4 h-4" />
                <span>پچھلی سورت</span>
              </button>

              <select
                value={selectedSurahNumber}
                onChange={(e) => handleSelectSurah(Number(e.target.value))}
                className="px-3 py-1.5 rounded-xl text-xs bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] font-semibold focus:ring-2 focus:ring-emerald-500 cursor-pointer max-w-[200px] sm:max-w-[280px] truncate"
              >
                {SURAHS_DATA.map((s) => (
                  <option key={`mushaf-opt-${s.n}`} value={s.n}>
                    #{s.n}. {s.en} ({s.ar}) — نزول #{s.nuzul} • {s.verses} آیات
                  </option>
                ))}
              </select>

              <button
                onClick={goToNextSurah}
                disabled={selectedSurahNumber >= 114}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                  selectedSurahNumber >= 114
                    ? 'opacity-40 cursor-not-allowed bg-[var(--bg-surface)] text-[var(--text-muted)] border-[var(--border-subtle)]'
                    : 'bg-emerald-700 hover:bg-emerald-800 text-white border-emerald-700 shadow-xs cursor-pointer'
                }`}
              >
                <span>اگلی سورت</span>
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Surah Header Display */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2 text-xs">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-600/15 text-emerald-800 dark:text-emerald-300 border border-emerald-500/25 font-bold font-sans">
                  مصحف ترتیب #{activeSurahMeta.n}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-800 dark:text-amber-200 border border-amber-500/25 font-bold flex items-center gap-1">
                  <Compass className="w-3.5 h-3.5 text-amber-600" />
                  <span>نزولِ زمانی ترتیب #{activeSurahMeta.nuzul}</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-sky-500/10 text-sky-800 dark:text-sky-200 border border-sky-500/25 font-semibold">
                  {activeSurahMeta.type === 'meccan' ? 'مکی (Meccan)' : 'مدنی (Medinan)'}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-800 dark:text-purple-200 border border-purple-500/25 font-semibold">
                  {activeSurahMeta.verses} آیات (Verses)
                </span>
              </div>

              <div className="flex flex-wrap items-baseline gap-3">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-[var(--text-primary)]">
                  {activeSurahMeta.en}
                </h2>
                <span className="font-arabic text-2xl sm:text-3xl lg:text-4xl font-bold text-emerald-800 dark:text-emerald-300">
                  سورة {activeSurahMeta.ar}
                </span>
                <span className="text-base sm:text-lg font-normal text-[var(--text-muted)] font-urdu">
                  ({activeSurahMeta.ur})
                </span>
              </div>
            </div>

            <span className="text-xs text-[var(--text-muted)] font-medium">
              ترتیبِ مصحف: سورت {selectedSurahNumber} از ۱۱۴
            </span>
          </div>
        </div>

        {/* Reading Layout & Translator Controls */}
        <div className="p-3 sm:p-3.5 rounded-2xl sacred-glass sacred-border flex flex-wrap items-center justify-between gap-2.5 text-xs shadow-xs">
          <div className="flex items-center gap-1 bg-[var(--bg-surface)] p-1 rounded-xl border border-[var(--border-subtle)]">
            <button
              onClick={() => setReadingLayout('split')}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                readingLayout === 'split'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">آیت و ترجمہ</span>
            </button>
            <button
              onClick={() => setReadingLayout('arabic-only')}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                readingLayout === 'arabic-only'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">صرف عربی</span>
            </button>
            <button
              onClick={() => setReadingLayout('translation-only')}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                readingLayout === 'translation-only'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <Languages className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">صرف ترجمہ</span>
            </button>
            <button
              onClick={() => setReadingLayout('side-by-side')}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                readingLayout === 'side-by-side'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <Columns className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">دو کالم</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
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
          </div>
        </div>

        {/* Verses Container */}
        {isLoadingSurah ? (
          <div className="p-12 text-center sacred-glass rounded-3xl sacred-border space-y-3">
            <div className="w-8 h-8 mx-auto border-3 border-emerald-700 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm font-urdu text-[var(--text-muted)]">آیاتِ مبارکہ لوڈ کی جا رہی ہیں...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {renderBismillah(selectedSurahNumber)}

            {/* Arabic-only Layout */}
            {readingLayout === 'arabic-only' && (
              <div className="w-full p-4 sm:p-8 lg:p-10 rounded-3xl sacred-border sacred-shadow bg-[var(--bg-surface-card)]">
                <div
                  className="font-arabic leading-[2.6] text-right"
                  style={{
                    fontFamily: typography.arabicFont,
                    fontSize: `${typography.arabicFontSize}px`,
                    lineHeight: typography.lineHeight,
                  }}
                >
                  {surahVerses.map((v) => {
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
                            else playAyah(v.surahNumber, v.ayahNumber, activeSurahMeta.nuzul);
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

            {/* Translation-only Layout */}
            {readingLayout === 'translation-only' && (
              <div className="space-y-4">
                {surahVerses.map((v) => {
                  const isPlaying =
                    activeAudio.isPlaying &&
                    activeAudio.surahNumber === v.surahNumber &&
                    activeAudio.ayahNumber === v.ayahNumber;
                  const bookmarked = isBookmarked(v.surahNumber, v.ayahNumber);

                  return (
                    <div
                      key={v.ayahNumber}
                      className={`p-4 sm:p-6 rounded-3xl sacred-border sacred-shadow bg-[var(--bg-surface-card)] transition-all ${
                        isPlaying ? 'ring-2 ring-emerald-500/40 bg-emerald-500/5' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3 border-b border-[var(--border-subtle)] pb-2 text-xs text-[var(--text-muted)]">
                        <span className="font-bold text-emerald-700 dark:text-emerald-300">
                          آیت {v.ayahNumber} ({activeSurahMeta.en})
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleCopy(v, activeSurahMeta.en, activeSurahMeta.nuzul)}
                            className="p-1.5 rounded-lg hover:bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-emerald-700 cursor-pointer"
                            title="Copy Verse Citation"
                          >
                            {copiedAyah === v.ayahNumber ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                          <button
                            onClick={() =>
                              toggleBookmark({
                                eventOrder: activeSurahMeta.nuzul,
                                surahNumber: v.surahNumber,
                                surahName: activeSurahMeta.en,
                                ayahNumber: v.ayahNumber,
                                ayahRangeText: `${v.surahNumber}:${v.ayahNumber}`,
                              })
                            }
                            className={`p-1.5 rounded-lg hover:bg-[var(--bg-surface)] cursor-pointer ${
                              bookmarked ? 'text-amber-600' : 'text-[var(--text-secondary)]'
                            }`}
                            title="Bookmark"
                          >
                            <Bookmark className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {typography.showUrdu && (
                        <p
                          className="font-urdu text-[var(--text-primary)] mb-2"
                          style={{
                            fontFamily: typography.urduFont,
                            fontSize: `${typography.translationFontSize}px`,
                            lineHeight: typography.lineHeight,
                          }}
                        >
                          {getUrduText(v)}
                        </p>
                      )}

                      {typography.showEnglish && (
                        <p
                          className="font-sans text-[var(--text-secondary)] mt-1 text-sm leading-relaxed"
                          style={{ fontFamily: typography.englishFont }}
                        >
                          {getEnglishText(v)}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Side-by-side or Split Layout */}
            {(readingLayout === 'split' || readingLayout === 'side-by-side') && (
              <div
                className={`grid gap-4 ${
                  readingLayout === 'side-by-side' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'
                }`}
              >
                {surahVerses.map((v) => {
                  const isPlaying =
                    activeAudio.isPlaying &&
                    activeAudio.surahNumber === v.surahNumber &&
                    activeAudio.ayahNumber === v.ayahNumber;
                  const bookmarked = isBookmarked(v.surahNumber, v.ayahNumber);

                  return (
                    <div
                      key={v.ayahNumber}
                      className={`p-4 sm:p-7 rounded-3xl sacred-border sacred-shadow transition-all ${
                        isPlaying
                          ? 'ring-2 ring-emerald-500/40 bg-emerald-500/10'
                          : 'bg-[var(--bg-surface-card)]'
                      }`}
                    >
                      <div className="flex items-center justify-between pb-3 mb-4 border-b border-[var(--border-subtle)] text-xs text-[var(--text-muted)]">
                        <div className="flex items-center gap-2">
                          <span className="w-7 h-7 rounded-xl bg-emerald-600/15 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 font-bold flex items-center justify-center font-sans">
                            {v.ayahNumber}
                          </span>
                          <span className="font-semibold text-[var(--text-primary)]">
                            {activeSurahMeta.en} {v.surahNumber}:{v.ayahNumber}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => {
                              if (isPlaying) pauseAudio();
                              else playAyah(v.surahNumber, v.ayahNumber, activeSurahMeta.nuzul);
                            }}
                            className={`p-1.5 rounded-xl transition-all cursor-pointer ${
                              isPlaying
                                ? 'bg-emerald-700 text-white shadow-xs'
                                : 'bg-[var(--bg-surface)] hover:bg-emerald-500/20 text-[var(--text-secondary)] hover:text-emerald-700'
                            }`}
                            title={isPlaying ? 'Pause Recitation' : 'Play Ayah Audio'}
                          >
                            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                          </button>

                          <button
                            onClick={() => handleCopy(v, activeSurahMeta.en, activeSurahMeta.nuzul)}
                            className="p-1.5 rounded-xl bg-[var(--bg-surface)] hover:bg-emerald-500/20 text-[var(--text-secondary)] hover:text-emerald-700 transition-all cursor-pointer"
                            title="Copy Ayah with Citation"
                          >
                            {copiedAyah === v.ayahNumber ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>

                          <button
                            onClick={() =>
                              toggleBookmark({
                                eventOrder: activeSurahMeta.nuzul,
                                surahNumber: v.surahNumber,
                                surahName: activeSurahMeta.en,
                                ayahNumber: v.ayahNumber,
                                ayahRangeText: `${activeSurahMeta.en} ${v.surahNumber}:${v.ayahNumber}`,
                              })
                            }
                            className={`p-1.5 rounded-xl transition-all cursor-pointer ${
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

            {/* Bottom Nav */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[var(--border-subtle)] pt-6">
              <button
                onClick={handleBackToList}
                className="w-full sm:w-auto px-6 py-2.5 rounded-2xl bg-[var(--bg-surface-elevated)] hover:bg-emerald-700 hover:text-white text-xs font-bold border border-[var(--border-subtle)] transition-all cursor-pointer"
              >
                ← واپس فہرستِ مصحف (Back to Catalog)
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={goToPrevSurah}
                  disabled={selectedSurahNumber <= 1}
                  className="px-4 py-2 rounded-xl text-xs font-bold border bg-[var(--bg-surface)] hover:bg-emerald-700 hover:text-white disabled:opacity-40 cursor-pointer"
                >
                  پچھلی سورت (#{selectedSurahNumber - 1})
                </button>
                <button
                  onClick={goToNextSurah}
                  disabled={selectedSurahNumber >= 114}
                  className="px-4 py-2 rounded-xl text-xs font-bold border bg-emerald-700 hover:bg-emerald-800 text-white disabled:opacity-40 cursor-pointer"
                >
                  اگلی سورت (#{selectedSurahNumber + 1})
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // VIEW A: 114 SURAHS MUSHAF CATALOG GRID
  // ─────────────────────────────────────────────────────────────
  return (
    <div className="w-full max-w-[1780px] mx-auto py-6 sm:py-8 px-4 animate-fade-in">
      
      {/* Header Banner */}
      <div className="mb-6 p-6 rounded-3xl sacred-glass sacred-border sacred-shadow flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1">
            <BookOpen className="w-4 h-4" />
            <span>Dual Perspective Mode (ترتیبِ مصحف بر مروجہ قرآن)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[var(--text-primary)]">
            Tarteeb-e-Mushaf Catalog (114 Surahs)
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
            Browse standard canonical Quran order (1 to 114), cross-referenced with exact <strong>Nuzuli (Chronological) revelation rank</strong>.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1.5 bg-[var(--bg-surface)] p-1.5 rounded-2xl border border-[var(--border-subtle)]">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
              filterType === 'all'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            All (114)
          </button>
          <button
            onClick={() => setFilterType('meccan')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
              filterType === 'meccan'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            Meccan (مکی)
          </button>
          <button
            onClick={() => setFilterType('medinan')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
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
          return (
            <div
              key={s.n}
              onClick={() => handleSelectSurah(s.n)}
              className="p-5 rounded-3xl sacred-border sacred-shadow transition-all relative overflow-hidden group cursor-pointer bg-[var(--bg-surface-card)] hover:border-emerald-600 hover:ring-2 hover:ring-emerald-500/20 shadow-xs"
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
                  <span className="text-emerald-600 font-semibold flex items-center gap-1">
                    ● کلک کر کے مکمل سورت پڑھیں
                  </span>
                </span>
                <span className="text-emerald-700 dark:text-emerald-400 font-medium group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                  Read Surah <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
