import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import {
  RevelationEvent,
  ReadingLayout,
  PerspectiveMode,
  ThemeId,
  TypographySettings,
  BookmarkItem,
  ActiveAudioState,
  RevelationPeriod,
  PassageStreamMode,
  QuranContextType,
} from '@/types/quran';
import { ALL_114_CHRONOLOGICAL_EVENTS } from '@/data/allChronologicalEvents';
import { INITIAL_REVELATION_EVENTS } from '@/data/initialSeedEvents';
import { getAyahAudioUrl, DEFAULT_RECITER_ID } from '@/data/reciters';
import { loadSurahVerses } from '@/utils/quranVerseLoader';
import {
  CURATED_HISTORICAL_PASSAGES,
  ALL_114_CHRONOLOGICAL_PASSAGES,
} from '@/data/completePassageChronology';

const DEFAULT_TYPOGRAPHY: TypographySettings = {
  arabicFont: 'Amiri Quran',
  urduFont: 'Noto Nastaliq Urdu',
  englishFont: 'Plus Jakarta Sans',
  arabicFontSize: 32,
  translationFontSize: 20,
  lineHeight: 2.3,
  showUrdu: true,
  showEnglish: true,
  urduTranslator: 'jawadi',
  englishTranslator: 'qarai',
};

// Map initial 114 events skeleton
const BASE_114_EVENTS: RevelationEvent[] = ALL_114_CHRONOLOGICAL_EVENTS.map((m) => {
  const seed = INITIAL_REVELATION_EVENTS.find((s) => s.chronologicalOrder === m.chronologicalOrder);
  if (seed) return seed;

  return {
    chronologicalOrder: m.chronologicalOrder,
    surahNumber: m.surahNumber,
    surahNameArabic: m.surahNameArabic,
    surahNameUrdu: m.surahNameUrdu,
    surahNameEnglish: m.surahNameEnglish,
    totalVersesInSurah: m.totalVersesInSurah,
    mushafOrder: m.mushafOrder,
    verseRange: m.verseRange,
    isWholeSurah: m.isWholeSurah,
    revelationNature: m.revelationNature,
    totalSegmentsForSurah: m.totalSegmentsForSurah,
    currentSegmentIndex: m.currentSegmentIndex,
    revelationPeriod: m.revelationPeriod,
    approximateYearCE: m.approximateYearCE,
    approximateYearNabawi: m.approximateYearNabawi,
    hijriYear: m.hijriYear,
    location: m.location,
    asbabUnNuzul: m.asbabUnNuzul,
    verses: [], // Hydrated dynamically
  };
});

const QuranContext = createContext<QuranContextType | undefined>(undefined);

export const QuranProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Events State (all 114 events)
  const [events, setEvents] = useState<RevelationEvent[]>(() => {
    try {
      const saved = localStorage.getItem('tarteeb_custom_events');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback
    }
    return BASE_114_EVENTS;
  });

  // 2. Active Event Order
  const [activeEventOrder, setActiveEventOrderState] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('tarteeb_active_event');
      return saved ? parseInt(saved, 10) : 1;
    } catch {
      return 1;
    }
  });

  const setActiveEventOrder = useCallback((order: number) => {
    setActiveEventOrderState(order);
    localStorage.setItem('tarteeb_active_event', String(order));
  }, []);

  // 2b. Active Passage Step (for Chronological Passage Reader)
  const [activePassageStep, setActivePassageStepState] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('tarteeb_active_passage_step');
      return saved ? parseInt(saved, 10) : 1;
    } catch {
      return 1;
    }
  });

  const setActivePassageStep = useCallback((step: number) => {
    setActivePassageStepState(step);
    localStorage.setItem('tarteeb_active_passage_step', String(step));
  }, []);

  // 2c. Passage Stream Mode ('curated_milestones' vs 'all_quran')
  const [passageStreamMode, setPassageStreamModeState] = useState<PassageStreamMode>(() => {
    try {
      const saved = localStorage.getItem('tarteeb_passage_stream_mode');
      return (saved as PassageStreamMode) || 'curated_milestones';
    } catch {
      return 'curated_milestones';
    }
  });

  const setPassageStreamMode = useCallback((mode: PassageStreamMode) => {
    setPassageStreamModeState(mode);
    localStorage.setItem('tarteeb_passage_stream_mode', mode);
    setActivePassageStepState(1);
    localStorage.setItem('tarteeb_active_passage_step', '1');
  }, []);

  // 3. Dynamic Verse Hydration State
  const [isLoadingVerses, setIsLoadingVerses] = useState<boolean>(false);
  const [showFullSurahForPassages, setShowFullSurahForPassages] = useState<boolean>(false);

  // Active event resolution
  const activeEvent =
    events.find((e) => e.chronologicalOrder === activeEventOrder) || events[0] || BASE_114_EVENTS[0];

  // Hydrate verses whenever activeEvent changes if not already hydrated
  useEffect(() => {
    if (!activeEvent) return;

    // If event already has verses loaded (and if whole surah is requested, verify count)
    const needsHydration =
      activeEvent.verses.length === 0 ||
      (showFullSurahForPassages && activeEvent.verses.length < activeEvent.totalVersesInSurah);

    if (needsHydration) {
      setIsLoadingVerses(true);
      loadSurahVerses(activeEvent.surahNumber)
        .then((loadedVerses) => {
          setEvents((prev) =>
            prev.map((evt) => {
              if (evt.chronologicalOrder === activeEvent.chronologicalOrder) {
                // If this is a passage (like Al-Alaq 96:1-5) and user hasn't requested full surah
                let displayVerses = loadedVerses;
                if (!showFullSurahForPassages && !evt.isWholeSurah && evt.verseRange) {
                  displayVerses = loadedVerses.slice(
                    evt.verseRange.fromVerse - 1,
                    evt.verseRange.toVerse
                  );
                }
                return { ...evt, verses: displayVerses };
              }
              return evt;
            })
          );
        })
        .finally(() => {
          setIsLoadingVerses(false);
        });
    }
  }, [activeEvent.chronologicalOrder, activeEvent.surahNumber, showFullSurahForPassages]);

  // 4. Perspective & Layout
  const [perspectiveMode, setPerspectiveModeState] = useState<PerspectiveMode>(() => {
    return (localStorage.getItem('tarteeb_perspective') as PerspectiveMode) || 'passage_nuzul';
  });

  const setPerspectiveMode = useCallback((mode: PerspectiveMode) => {
    setPerspectiveModeState(mode);
    localStorage.setItem('tarteeb_perspective', mode);
  }, []);

  const [readingLayout, setReadingLayoutState] = useState<ReadingLayout>(() => {
    return (localStorage.getItem('tarteeb_layout') as ReadingLayout) || 'split';
  });

  const setReadingLayout = useCallback((layout: ReadingLayout) => {
    setReadingLayoutState(layout);
    localStorage.setItem('tarteeb_layout', layout);
  }, []);

  // 5. Theme
  const [theme, setThemeState] = useState<ThemeId>(() => {
    return (localStorage.getItem('tarteeb_theme') as ThemeId) || 'emerald-gold';
  });

  const setTheme = useCallback((newTheme: ThemeId) => {
    setThemeState(newTheme);
    localStorage.setItem('tarteeb_theme', newTheme);
    document.body.className = `theme-${newTheme}`;
  }, []);

  useEffect(() => {
    document.body.className = `theme-${theme}`;
  }, [theme]);

  // 6. Typography
  const [typography, setTypographyState] = useState<TypographySettings>(() => {
    try {
      const saved = localStorage.getItem('tarteeb_typography');
      if (saved) return { ...DEFAULT_TYPOGRAPHY, ...JSON.parse(saved) };
    } catch {
      // fallback
    }
    return DEFAULT_TYPOGRAPHY;
  });

  const updateTypography = useCallback((settings: Partial<TypographySettings>) => {
    setTypographyState((prev) => {
      const updated = { ...prev, ...settings };
      localStorage.setItem('tarteeb_typography', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // 7. Bookmarks
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>(() => {
    try {
      const saved = localStorage.getItem('tarteeb_bookmarks');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [];
  });

  const toggleBookmark = useCallback((item: Omit<BookmarkItem, 'id' | 'timestamp'>) => {
    setBookmarks((prev) => {
      const exists = prev.some((b) => b.surahNumber === item.surahNumber && b.ayahNumber === item.ayahNumber);
      let next: BookmarkItem[];
      if (exists) {
        next = prev.filter((b) => !(b.surahNumber === item.surahNumber && b.ayahNumber === item.ayahNumber));
      } else {
        const newBm: BookmarkItem = {
          ...item,
          id: `${item.surahNumber}-${item.ayahNumber}-${Date.now()}`,
          timestamp: Date.now(),
        };
        next = [newBm, ...prev];
      }
      localStorage.setItem('tarteeb_bookmarks', JSON.stringify(next));
      return next;
    });
  }, []);

  const isBookmarked = useCallback(
    (surah: number, ayah: number) => {
      return bookmarks.some((b) => b.surahNumber === surah && b.ayahNumber === ayah);
    },
    [bookmarks]
  );

  // 8. Audio Playback
  const [selectedReciterId, setSelectedReciterId] = useState<string>(() => {
    return localStorage.getItem('tarteeb_reciter') || DEFAULT_RECITER_ID;
  });

  const [activeAudio, setActiveAudio] = useState<ActiveAudioState>({
    isPlaying: false,
    surahNumber: 0,
    ayahNumber: 0,
    eventOrder: 0,
    reciterId: selectedReciterId,
  });

  // Continuous playback preference (defaults to true)
  const [isContinuousPlay, setIsContinuousPlay] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('tarteeb_continuous_play');
      return saved !== null ? saved === 'true' : true;
    } catch {
      return true;
    }
  });

  const toggleContinuousPlay = useCallback(() => {
    setIsContinuousPlay((prev) => {
      const next = !prev;
      localStorage.setItem('tarteeb_continuous_play', String(next));
      return next;
    });
  }, []);

  const audioElementRef = useRef<HTMLAudioElement | null>(null);

  // Sync state in refs to prevent stale closures inside audio events
  const isContinuousPlayRef = useRef(isContinuousPlay);
  isContinuousPlayRef.current = isContinuousPlay;

  const activeAudioRef = useRef(activeAudio);
  activeAudioRef.current = activeAudio;

  const perspectiveModeRef = useRef(perspectiveMode);
  perspectiveModeRef.current = perspectiveMode;

  const activePassageStepRef = useRef(activePassageStep);
  activePassageStepRef.current = activePassageStep;

  const passageStreamModeRef = useRef(passageStreamMode);
  passageStreamModeRef.current = passageStreamMode;

  const activeEventOrderRef = useRef(activeEventOrder);
  activeEventOrderRef.current = activeEventOrder;

  const eventsRef = useRef(events);
  eventsRef.current = events;

  const playAyah = useCallback(
    (surahNumber: number, ayahNumber: number, eventOrder: number) => {
      if (!audioElementRef.current) return;
      const url = getAyahAudioUrl(surahNumber, ayahNumber, selectedReciterId);
      audioElementRef.current.src = url;
      audioElementRef.current
        .play()
        .then(() => {
          setActiveAudio({
            isPlaying: true,
            surahNumber,
            ayahNumber,
            eventOrder,
            reciterId: selectedReciterId,
          });
        })
        .catch(() => {
          setActiveAudio((prev) => ({ ...prev, isPlaying: false }));
        });
    },
    [selectedReciterId]
  );

  const pauseAudio = useCallback(() => {
    if (audioElementRef.current) {
      audioElementRef.current.pause();
    }
    setActiveAudio((prev) => ({ ...prev, isPlaying: false }));
  }, []);

  const resumeAudio = useCallback(() => {
    if (audioElementRef.current && audioElementRef.current.src) {
      audioElementRef.current.play().then(() => {
        setActiveAudio((prev) => ({ ...prev, isPlaying: true }));
      });
    }
  }, []);

  const stopAudio = useCallback(() => {
    if (audioElementRef.current) {
      audioElementRef.current.pause();
      audioElementRef.current.currentTime = 0;
    }
    setActiveAudio({
      isPlaying: false,
      surahNumber: 0,
      ayahNumber: 0,
      eventOrder: 0,
      reciterId: selectedReciterId,
    });
  }, [selectedReciterId]);

  // Navigate to Next Ayah (with auto-advancing across passages and surahs)
  const playNextAyah = useCallback(() => {
    const audio = activeAudioRef.current;
    if (audio.surahNumber === 0) return;

    if (perspectiveModeRef.current === 'passage_nuzul') {
      const stream =
        passageStreamModeRef.current === 'all_quran'
          ? ALL_114_CHRONOLOGICAL_PASSAGES
          : CURATED_HISTORICAL_PASSAGES;
      const currentPassage =
        stream.find((p) => p.stepNumber === activePassageStepRef.current) || stream[0];

      // If playing ayah is before the end of this passage
      if (
        audio.surahNumber === currentPassage.surahNumber &&
        audio.ayahNumber < currentPassage.verseRange.toVerse
      ) {
        playAyah(audio.surahNumber, audio.ayahNumber + 1, currentPassage.stepNumber);
      } else {
        // Advance to next passage step
        if (activePassageStepRef.current < stream.length) {
          const nextStep = activePassageStepRef.current + 1;
          setActivePassageStepState(nextStep);
          localStorage.setItem('tarteeb_active_passage_step', String(nextStep));
          const nextPassage = stream.find((p) => p.stepNumber === nextStep);
          if (nextPassage) {
            playAyah(
              nextPassage.surahNumber,
              nextPassage.verseRange.fromVerse,
              nextPassage.stepNumber
            );
          }
        } else {
          pauseAudio();
        }
      }
    } else {
      // Perspective mode 'nuzul' or other views
      const currentEvt =
        eventsRef.current.find((e) => e.chronologicalOrder === activeEventOrderRef.current) ||
        eventsRef.current[0];

      if (audio.ayahNumber < currentEvt.totalVersesInSurah) {
        playAyah(currentEvt.mushafOrder, audio.ayahNumber + 1, currentEvt.chronologicalOrder);
      } else {
        // End of Surah, advance to next chronological event
        if (activeEventOrderRef.current < 114) {
          const nextOrder = activeEventOrderRef.current + 1;
          setActiveEventOrder(nextOrder);
          const nextEvt = eventsRef.current.find((e) => e.chronologicalOrder === nextOrder);
          if (nextEvt) {
            playAyah(nextEvt.mushafOrder, 1, nextEvt.chronologicalOrder);
          }
        } else {
          pauseAudio();
        }
      }
    }
  }, [playAyah, pauseAudio, setActiveEventOrder]);

  // Navigate to Previous Ayah
  const playPrevAyah = useCallback(() => {
    const audio = activeAudioRef.current;
    if (audio.surahNumber === 0) return;

    if (perspectiveModeRef.current === 'passage_nuzul') {
      const stream =
        passageStreamModeRef.current === 'all_quran'
          ? ALL_114_CHRONOLOGICAL_PASSAGES
          : CURATED_HISTORICAL_PASSAGES;
      const currentPassage =
        stream.find((p) => p.stepNumber === activePassageStepRef.current) || stream[0];

      if (
        audio.surahNumber === currentPassage.surahNumber &&
        audio.ayahNumber > currentPassage.verseRange.fromVerse
      ) {
        playAyah(audio.surahNumber, audio.ayahNumber - 1, currentPassage.stepNumber);
      } else {
        // Step back to previous passage
        if (activePassageStepRef.current > 1) {
          const prevStep = activePassageStepRef.current - 1;
          setActivePassageStepState(prevStep);
          localStorage.setItem('tarteeb_active_passage_step', String(prevStep));
          const prevPassage = stream.find((p) => p.stepNumber === prevStep);
          if (prevPassage) {
            playAyah(
              prevPassage.surahNumber,
              prevPassage.verseRange.toVerse,
              prevPassage.stepNumber
            );
          }
        }
      }
    } else {
      const currentEvt =
        eventsRef.current.find((e) => e.chronologicalOrder === activeEventOrderRef.current) ||
        eventsRef.current[0];

      if (audio.ayahNumber > 1) {
        playAyah(currentEvt.mushafOrder, audio.ayahNumber - 1, currentEvt.chronologicalOrder);
      } else {
        if (activeEventOrderRef.current > 1) {
          const prevOrder = activeEventOrderRef.current - 1;
          setActiveEventOrder(prevOrder);
          const prevEvt = eventsRef.current.find((e) => e.chronologicalOrder === prevOrder);
          if (prevEvt) {
            playAyah(prevEvt.mushafOrder, prevEvt.totalVersesInSurah, prevEvt.chronologicalOrder);
          }
        }
      }
    }
  }, [playAyah, setActiveEventOrder]);

  const playNextAyahRef = useRef<() => void>(() => {});
  playNextAyahRef.current = playNextAyah;

  useEffect(() => {
    audioElementRef.current = new Audio();
    const el = audioElementRef.current;

    const handleEnded = () => {
      if (isContinuousPlayRef.current) {
        playNextAyahRef.current();
      } else {
        setActiveAudio((prev) => ({ ...prev, isPlaying: false }));
      }
    };

    const handleError = () => {
      setActiveAudio((prev) => ({ ...prev, isPlaying: false }));
    };

    el.addEventListener('ended', handleEnded);
    el.addEventListener('error', handleError);

    return () => {
      el.pause();
      el.removeEventListener('ended', handleEnded);
      el.removeEventListener('error', handleError);
    };
  }, []);

  // 9. Filters & Search
  const [periodFilter, setPeriodFilter] = useState<RevelationPeriod | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeMilestoneId, setActiveMilestoneId] = useState<string | null>(null);

  // 10. Custom Data Ingestion & Reset
  const importCustomEvents = useCallback((newEvents: RevelationEvent[]) => {
    setEvents(newEvents);
    localStorage.setItem('tarteeb_custom_events', JSON.stringify(newEvents));
    if (newEvents.length > 0) {
      setActiveEventOrder(newEvents[0].chronologicalOrder);
    }
  }, [setActiveEventOrder]);

  const resetToDefaultSeed = useCallback(() => {
    setEvents(BASE_114_EVENTS);
    localStorage.removeItem('tarteeb_custom_events');
    setActiveEventOrder(1);
  }, [setActiveEventOrder]);

  return (
    <QuranContext.Provider
      value={{
        events,
        activeEvent,
        activeEventOrder,
        setActiveEventOrder,
        perspectiveMode,
        setPerspectiveMode,
        readingLayout,
        setReadingLayout,
        theme,
        setTheme,
        typography,
        updateTypography,
        bookmarks,
        toggleBookmark,
        isBookmarked,
        activeAudio,
        playAyah,
        pauseAudio,
        resumeAudio,
        stopAudio,
        playNextAyah,
        playPrevAyah,
        isContinuousPlay,
        toggleContinuousPlay,
        selectedReciterId,
        setSelectedReciterId,
        periodFilter,
        setPeriodFilter,
        searchQuery,
        setSearchQuery,
        activeMilestoneId,
        setActiveMilestoneId,
        activePassageStep,
        setActivePassageStep,
        passageStreamMode,
        setPassageStreamMode,
        isLoadingVerses,
        showFullSurahForPassages,
        setShowFullSurahForPassages,
        importCustomEvents,
        resetToDefaultSeed,
      }}
    >
      {children}
    </QuranContext.Provider>
  );
};

export const useQuran = (): QuranContextType => {
  const context = useContext(QuranContext);
  if (!context) {
    throw new Error('useQuran must be used within a QuranProvider');
  }
  return context;
};
