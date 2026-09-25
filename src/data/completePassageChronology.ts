import { ChronologicalPassageStep } from '@/types/quran';
import { CHRONOLOGICAL_PASSAGE_FLOW } from './passageFlowData';
import { ALL_114_CHRONOLOGICAL_EVENTS } from './allChronologicalEvents';

// 1. Curated Historical Passage Flow (The primary 36-step segmented historical stream)
export const CURATED_HISTORICAL_PASSAGES: ChronologicalPassageStep[] = CHRONOLOGICAL_PASSAGE_FLOW.map((p) => {
  const meta = ALL_114_CHRONOLOGICAL_EVENTS.find((e) => e.mushafOrder === p.surahNumber);
  return {
    stepNumber: p.stepNumber,
    id: p.id,
    surahNumber: p.surahNumber,
    surahNameEnglish: p.surahNameEnglish,
    surahNameArabic: p.surahNameArabic,
    surahNameUrdu: p.surahNameUrdu,
    segmentIndex: p.segmentIndex,
    totalSegments: p.totalSegments,
    isSegmented: p.isSegmented,
    verseRange: p.verseRange,
    totalVersesInSurah: p.totalVersesInSurah,
    yearCE: p.yearCE,
    yearNabawiOrHijri: p.yearNabawiOrHijri,
    location: p.location,
    period: meta?.revelationPeriod || 'Early Meccan',
    contextUrdu: p.contextUrdu,
    contextEnglish: p.contextEnglish,
    colorCode: p.colorCode,
    sisterPassageIds: p.sisterPassageIds,
    timeGapNote: p.timeGapNote,
  };
});

// 2. Build Unified All-Quran Chronological Stream
// Merges all 114 Surahs: multi-part surahs are expanded into their historical segments,
// and single-descent surahs take their authentic chronological position.
export const UNIFIED_CHRONOLOGICAL_PASSAGES: ChronologicalPassageStep[] = (() => {
  const list: ChronologicalPassageStep[] = [];
  let currentStep = 1;

  // Track surahs already represented in CHRONOLOGICAL_PASSAGE_FLOW
  const flowSurahs = new Set(CHRONOLOGICAL_PASSAGE_FLOW.map((p) => p.surahNumber));

  // First 26 steps of CHRONOLOGICAL_PASSAGE_FLOW (Early Meccan to Late Meccan milestones)
  const earlyFlow = CHRONOLOGICAL_PASSAGE_FLOW.filter((p) => p.stepNumber <= 26);
  earlyFlow.forEach((p) => {
    const meta = ALL_114_CHRONOLOGICAL_EVENTS.find((e) => e.mushafOrder === p.surahNumber);
    list.push({
      stepNumber: currentStep++,
      id: p.id,
      surahNumber: p.surahNumber,
      surahNameEnglish: p.surahNameEnglish,
      surahNameArabic: p.surahNameArabic,
      surahNameUrdu: p.surahNameUrdu,
      segmentIndex: p.segmentIndex,
      totalSegments: p.totalSegments,
      isSegmented: p.isSegmented,
      verseRange: p.verseRange,
      totalVersesInSurah: p.totalVersesInSurah,
      yearCE: p.yearCE,
      yearNabawiOrHijri: p.yearNabawiOrHijri,
      location: p.location,
      period: meta?.revelationPeriod || 'Early Meccan',
      contextUrdu: p.contextUrdu,
      contextEnglish: p.contextEnglish,
      colorCode: p.colorCode,
      sisterPassageIds: p.sisterPassageIds,
      timeGapNote: p.timeGapNote,
    });
  });

  // Middle Meccan & other Surahs from ALL_114_CHRONOLOGICAL_EVENTS not covered in early flow
  ALL_114_CHRONOLOGICAL_EVENTS.forEach((evt) => {
    // If not already in earlyFlow and not a multi-part Medinan surah (Al-Baqarah, Al-Ma'idah)
    if (!flowSurahs.has(evt.mushafOrder)) {
      list.push({
        stepNumber: currentStep++,
        id: `unified-evt-${evt.chronologicalOrder}`,
        surahNumber: evt.mushafOrder,
        surahNameEnglish: evt.surahNameEnglish,
        surahNameArabic: evt.surahNameArabic,
        surahNameUrdu: evt.surahNameUrdu,
        segmentIndex: 1,
        totalSegments: 1,
        isSegmented: false,
        verseRange: { fromVerse: 1, toVerse: evt.totalVersesInSurah },
        totalVersesInSurah: evt.totalVersesInSurah,
        yearCE: evt.approximateYearCE,
        yearNabawiOrHijri: evt.hijriYear
          ? `${evt.hijriYear} AH (${evt.approximateYearCE} CE)`
          : `${evt.approximateYearCE} CE (${14 - evt.approximateYearNabawi} BH)`,
        location: evt.location,
        period: evt.revelationPeriod,
        contextUrdu: evt.asbabUnNuzul.summaryUrdu,
        contextEnglish: evt.asbabUnNuzul.summaryEnglish,
      });
    }
  });

  // Medinan multi-part flow steps (Al-Ma'idah, Al-Baqarah segments, Ghadeer Khumm, etc.)
  const medinanFlow = CHRONOLOGICAL_PASSAGE_FLOW.filter((p) => p.stepNumber >= 27);
  medinanFlow.forEach((p) => {
    const meta = ALL_114_CHRONOLOGICAL_EVENTS.find((e) => e.mushafOrder === p.surahNumber);
    list.push({
      stepNumber: currentStep++,
      id: p.id,
      surahNumber: p.surahNumber,
      surahNameEnglish: p.surahNameEnglish,
      surahNameArabic: p.surahNameArabic,
      surahNameUrdu: p.surahNameUrdu,
      segmentIndex: p.segmentIndex,
      totalSegments: p.totalSegments,
      isSegmented: p.isSegmented,
      verseRange: p.verseRange,
      totalVersesInSurah: p.totalVersesInSurah,
      yearCE: p.yearCE,
      yearNabawiOrHijri: p.yearNabawiOrHijri,
      location: p.location,
      period: meta?.revelationPeriod || 'Early Medinan',
      contextUrdu: p.contextUrdu,
      contextEnglish: p.contextEnglish,
      colorCode: p.colorCode,
      sisterPassageIds: p.sisterPassageIds,
      timeGapNote: p.timeGapNote,
    });
  });

  return list;
})();

// 3. Complete 114 Surahs Chronological Passage Sequence (Full Quran: 114 Surahs / 6,236 Ayahs)
export const ALL_114_CHRONOLOGICAL_PASSAGES: ChronologicalPassageStep[] = ALL_114_CHRONOLOGICAL_EVENTS
  .slice()
  .sort((a, b) => a.chronologicalOrder - b.chronologicalOrder)
  .map((evt, idx) => ({
    stepNumber: idx + 1,
    id: `all-114-quran-${evt.chronologicalOrder}`,
    surahNumber: evt.mushafOrder,
    surahNameEnglish: evt.surahNameEnglish,
    surahNameArabic: evt.surahNameArabic,
    surahNameUrdu: evt.surahNameUrdu,
    segmentIndex: 1,
    totalSegments: 1,
    isSegmented: false,
    verseRange: { fromVerse: 1, toVerse: evt.totalVersesInSurah },
    totalVersesInSurah: evt.totalVersesInSurah,
    yearCE: evt.approximateYearCE,
    yearNabawiOrHijri: evt.hijriYear
      ? `${evt.hijriYear} AH (${evt.approximateYearCE} CE)`
      : `${evt.approximateYearCE} CE (${14 - evt.approximateYearNabawi} BH)`,
    location: evt.location,
    period: evt.revelationPeriod,
    contextUrdu: evt.asbabUnNuzul?.summaryUrdu || 'زمانہ نزول و تاریخی پس منظر',
    contextEnglish: evt.asbabUnNuzul?.summaryEnglish || 'Historical Context of Revelation',
    sisterPassageIds: [],
  }));
