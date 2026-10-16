export type Language = 'en' | 'ur';

export interface TranslationDictionary {
  app: {
    title: string;
    subTitle: string;
    bismillah: string;
    researchAttribution: string;
    searchPlaceholder: string;
    fullscreen: string;
    exitFullscreen: string;
    noticeBadge: string;
    disclaimerBtn: string;
  };
  navigation: {
    passageNuzul: string;
    passageNuzulSub: string;
    timelineStream: string;
    timelineStreamSub: string;
    calendarTimeline: string;
    calendarTimelineSub: string;
    surahMemorizer: string;
    surahMemorizerSub: string;
    nuzulComplete: string;
    mushafOrder: string;
    perspectives: string;
    layout: string;
    theme: string;
    typography: string;
    bookmarks: string;
    dataModal: string;
    citeResearch: string;
    disclaimer: string;
  };
  epochs: {
    all: string;
    earlyMeccan: string;
    midMeccan: string;
    shibBoycott: string;
    lateMeccan: string;
    earlyMedinan: string;
    lateMedinan: string;
  };
  legislationTracks: {
    headerTitle: string;
    headerSub: string;
    tracksCount: string;
    intoxicants: string;
    intoxicantsDesc: string;
    defense: string;
    defenseDesc: string;
    qiblah: string;
    qiblahDesc: string;
    fasting: string;
    fastingDesc: string;
    zakat: string;
    zakatDesc: string;
    stageLabel: string;
    stageOf: string;
    pedagogyRationale: string;
    deltaMetric: string;
    jumpToPassage: string;
    listenVerse: string;
  };
  crisisNavigator: {
    headerTitle: string;
    headerSub: string;
    allCrises: string;
    searchCrisis: string;
    theologicalInquiry: string;
    persecutionSiege: string;
    battlefieldShock: string;
    socialCrisisSlander: string;
    diplomaticTreaty: string;
    covenantCompletion: string;
    historicalContext: string;
    scripturalResolution: string;
    shiaExegesis: string;
    keyFigures: string;
    locationLabel: string;
    dateLabel: string;
  };
  common: {
    readMore: string;
    close: string;
    back: string;
    clear: string;
    ayah: string;
    surah: string;
    chronologicalOrder: string;
    mushafOrder: string;
    year: string;
    verses: string;
    scholarlyNote: string;
  };
}
