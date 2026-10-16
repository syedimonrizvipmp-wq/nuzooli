export type RevelationPeriod =
  | 'Early Meccan'
  | 'Mid Meccan'
  | 'Late Meccan'
  | 'Early Medinan'
  | 'Late Medinan';

export type RevelationNature = 'complete_surah' | 'segmented_passage';

export interface Verse {
  surahNumber: number;
  ayahNumber: number;
  textArabic: string;
  translationUrdu: string;
  translationUrduNajafi?: string;
  translationUrduJalandhry?: string;
  translationEnglish: string;
  translationEnglishQarai?: string;
  translationEnglishKhattab?: string;
  audioAyahUrl?: string;
}

export interface ScholarlyNote {
  topic: string;
  shiaView: string;
  comparativeNote?: string;
  sources: string[];
}

export interface RevelationEvent {
  chronologicalOrder: number; // 1, 2, 3...
  surahNumber: number;        // e.g. 96
  surahNameArabic: string;    // "العلق"
  surahNameUrdu: string;      // "سورۃ العلق"
  surahNameEnglish: string;   // "Al-Alaq"
  totalVersesInSurah: number;
  mushafOrder: number;
  verseRange: {
    fromVerse: number;
    toVerse: number;
  };
  isWholeSurah: boolean;
  revelationNature: RevelationNature;
  totalSegmentsForSurah?: number;
  currentSegmentIndex?: number;
  revelationPeriod: RevelationPeriod;
  approximateYearCE: number;
  approximateYearNabawi: number; // e.g. 1st Year of Prophethood / 13 BH
  hijriYear?: number;
  location: string;
  historicalMilestoneId?: string;
  asbabUnNuzul: {
    titleUrdu: string;
    titleEnglish: string;
    summaryUrdu: string;
    summaryEnglish: string;
    detailedContextUrdu: string;
    detailedContextEnglish: string;
    sources: string[];
    scholarlyNotes?: ScholarlyNote[];
  };
  verses: Verse[];
}

export interface HistoricalMilestone {
  id: string;
  yearCE: number;
  yearNabawiOrHijri: string;
  period: 'Meccan' | 'Medinan';
  titleUrdu: string;
  titleEnglish: string;
  descriptionUrdu: string;
  descriptionEnglish: string;
  location: string;
  keyEvents: string[];
  relatedEventOrders: number[];
}

export interface SurahSummary {
  n: number;
  en: string;
  ar: string;
  ur: string;
  verses: number;
  type: 'meccan' | 'medinan';
  nuzul: number;
  revelationPeriod: RevelationPeriod;
}

export type ReadingLayout = 'split' | 'arabic-only' | 'translation-only' | 'side-by-side';

export type PerspectiveMode = 'nuzul' | 'passage_nuzul' | 'timeline_stream' | 'mushaf' | 'perspectives';

export interface ChronologicalPassageStep {
  stepNumber: number;
  id: string;
  surahNumber: number;
  surahNameEnglish: string;
  surahNameArabic: string;
  surahNameUrdu: string;
  segmentIndex: number;
  totalSegments: number;
  isSegmented: boolean;
  verseRange: { fromVerse: number; toVerse: number };
  totalVersesInSurah: number;
  yearCE: number;
  yearNabawiOrHijri: string;
  location: string;
  period: RevelationPeriod;
  contextUrdu: string;
  contextEnglish: string;
  colorCode?: string;
  sisterPassageIds?: string[];
  timeGapNote?: string;
}

export type ThemeId =
  | 'emerald-gold'
  | 'emerald-dark'
  | 'mushaf-classic'
  | 'night-paper'
  | 'oled-midnight'
  | 'sage-olive';

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  nameUrdu: string;
  description: string;
  bgClass: string;
  cardClass: string;
  textClass: string;
  accentClass: string;
  previewColor: string;
}

export interface TypographySettings {
  arabicFont: string;
  urduFont: string;
  englishFont: string;
  arabicFontSize: number;      // 20 to 50
  translationFontSize: number; // 14 to 30
  tafsirFontSize: number;      // 14 to 32
  lineHeight: number;           // 1.5 to 3.0
  showUrdu: boolean;
  showEnglish: boolean;
  urduTranslator: 'jawadi' | 'najafi' | 'jalandhry';
  englishTranslator: 'qarai' | 'khattab' | 'sahih';
}

export interface BookmarkItem {
  id: string;
  eventOrder: number;
  surahNumber: number;
  surahName: string;
  ayahNumber: number;
  ayahRangeText: string;
  timestamp: number;
  note?: string;
}

export type PassageStreamMode = 'curated_milestones' | 'all_quran';

export interface ActiveAudioState {
  isPlaying: boolean;
  surahNumber: number;
  ayahNumber: number;
  eventOrder: number;
  reciterId: string;
}

import { Language, TranslationDictionary } from './i18n';

export interface QuranContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationDictionary;
  events: RevelationEvent[];
  activeEvent: RevelationEvent;
  activeEventOrder: number;
  setActiveEventOrder: (order: number) => void;
  perspectiveMode: PerspectiveMode;
  setPerspectiveMode: (mode: PerspectiveMode) => void;
  readingLayout: ReadingLayout;
  setReadingLayout: (layout: ReadingLayout) => void;
  theme: ThemeId;
  setTheme: (theme: ThemeId) => void;
  typography: TypographySettings;
  updateTypography: (updates: Partial<TypographySettings>) => void;
  bookmarks: BookmarkItem[];
  toggleBookmark: (item: Omit<BookmarkItem, 'id' | 'timestamp'>) => void;
  isBookmarked: (surah: number, ayah: number) => boolean;
  activeAudio: ActiveAudioState;
  playAyah: (surahNumber: number, ayahNumber: number, eventOrder: number) => void;
  pauseAudio: () => void;
  resumeAudio: () => void;
  stopAudio: () => void;
  playNextAyah: () => void;
  playPrevAyah: () => void;
  isContinuousPlay: boolean;
  toggleContinuousPlay: () => void;
  selectedReciterId: string;
  setSelectedReciterId: (id: string) => void;
  periodFilter: RevelationPeriod | 'All';
  setPeriodFilter: (period: RevelationPeriod | 'All') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeMilestoneId: string | null;
  setActiveMilestoneId: (id: string | null) => void;
  activePassageStep: number;
  setActivePassageStep: (step: number) => void;
  passageStreamMode: PassageStreamMode;
  setPassageStreamMode: (mode: PassageStreamMode) => void;
  isLoadingVerses: boolean;
  showFullSurahForPassages: boolean;
  setShowFullSurahForPassages: (show: boolean) => void;
  importCustomEvents: (newEvents: RevelationEvent[]) => void;
  resetToDefaultSeed: () => void;
}

