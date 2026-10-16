import React, { useState, useMemo } from 'react';
import { useQuran } from '@/context/QuranContext';
import {
  GRADUAL_LEGISLATION_PATHWAYS,
  LegislationPathway,
  LegislationStage,
} from '@/data/gradualLegislationData';
import {
  Scale,
  Sparkles,
  Play,
  Pause,
  ArrowRight,
  Layers,
  HelpCircle,
  TrendingUp,
  BookOpen,
} from 'lucide-react';

export const GradualLegislationView: React.FC = () => {
  const {
    language,
    t,
    typography,
    activeAudio,
    playAyah,
    pauseAudio,
    setActivePassageStep,
    setPerspectiveMode,
  } = useQuran();

  const [selectedPathwayId, setSelectedPathwayId] = useState<string>('intoxicants');

  // Active pathway resolution
  const activePathway: LegislationPathway = useMemo(() => {
    return (
      GRADUAL_LEGISLATION_PATHWAYS.find((p) => p.id === selectedPathwayId) ||
      GRADUAL_LEGISLATION_PATHWAYS[0]
    );
  }, [selectedPathwayId]);

  // Jump to Chronological Passage Reader
  const handleJumpToReader = (stage: LegislationStage) => {
    setActivePassageStep(stage.passageStepNumber);
    setPerspectiveMode('passage_nuzul');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-[1780px] mx-auto pb-12">
      
      {/* ── 1. HEADER & WISDOM BANNER ── */}
      <div className="p-4 sm:p-6 rounded-3xl sacred-glass sacred-border shadow-md space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1">
              <Scale className="w-4 h-4 text-amber-500" />
              <span>{t.legislationTracks.headerTitle}</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-800 dark:text-emerald-200 border border-emerald-500/30 text-[11px] font-sans">
                {t.legislationTracks.tracksCount}
              </span>
            </div>
            
            <h2 className={`text-2xl sm:text-3xl font-bold text-[var(--text-primary)] ${language === 'en' ? 'font-sans tracking-tight' : 'font-serif'}`}>
              {language === 'en'
                ? 'The Pedagogy of Divine Law: Chronological Legal Evolution'
                : 'نزولِ قرآن کی تدریجی حکمت اور احکام کا مرحلہ وار نفاذ'}
            </h2>
            <p className={`text-xs sm:text-sm text-[var(--text-muted)] mt-1 ${language === 'en' ? 'font-sans' : 'font-urdu'}`}>
              {t.legislationTracks.headerSub}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto px-3.5 py-2 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-semibold text-emerald-800 dark:text-emerald-300">
            <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
            <span className="font-arabic text-sm">«وَرَتَّلْنَاهُ تَرْتِيلًا»</span>
            <span className="font-sans text-[11px]">
              {language === 'en' ? '— Divine Gradualism' : '— تدریجی نزول کا اعجاز'}
            </span>
          </div>
        </div>

        {/* Pathway Tabs */}
        <div className="flex flex-wrap gap-2 pt-3 border-t border-[var(--border-subtle)]">
          {GRADUAL_LEGISLATION_PATHWAYS.map((path) => {
            const isSelected = path.id === selectedPathwayId;
            return (
              <button
                key={path.id}
                onClick={() => setSelectedPathwayId(path.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-700 text-white shadow-md'
                    : 'bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)]'
                }`}
              >
                <Scale className={`w-3.5 h-3.5 ${isSelected ? 'text-amber-300' : 'text-emerald-600'}`} />
                <span className={language === 'en' ? 'font-sans' : 'font-urdu'}>
                  {language === 'en' ? path.titleEnglish : path.titleUrdu}
                </span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-emerald-900/50 text-emerald-100' : 'bg-emerald-500/15 text-emerald-700'}`}>
                  {language === 'en' ? `${path.totalStages} Stages` : `${path.totalStages} مراحل`}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── 2. ACTIVE PATHWAY HERO CARD ── */}
      <div className="p-6 rounded-3xl sacred-glass sacred-border shadow-lg space-y-4 border-emerald-600/30 bg-gradient-to-r from-[var(--bg-surface-elevated)] to-[var(--bg-surface)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--border-subtle)] pb-3">
          <div>
            <div className="flex items-center gap-2 text-xs text-amber-600 dark:text-amber-400 font-bold mb-1">
              <TrendingUp className="w-4 h-4" />
              <span className="font-sans">{activePathway.totalYearsSpan}</span>
            </div>
            <h3 className={`text-2xl font-bold text-[var(--text-primary)] ${language === 'en' ? 'font-sans tracking-tight' : 'font-serif'}`}>
              {language === 'en' ? activePathway.titleEnglish : activePathway.titleUrdu}
            </h3>
            <p className={`text-xs text-[var(--text-muted)] mt-0.5 ${language === 'en' ? 'font-sans' : 'font-urdu'}`}>
              {language === 'en' ? activePathway.subtitleEnglish : activePathway.subtitleUrdu}
            </p>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs text-[var(--text-secondary)]">
            <Layers className="w-3.5 h-3.5 text-emerald-600" />
            <span className="font-sans font-medium">
              {language === 'en' ? `Total Stages: ${activePathway.totalStages}` : `مجموعی مراحل: ${activePathway.totalStages}`}
            </span>
          </div>
        </div>

        {/* Pedagogical Core Wisdom */}
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 space-y-2">
          <div className="text-xs font-bold text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-amber-500" />
            <span className={language === 'en' ? 'font-sans uppercase tracking-wider' : 'font-urdu'}>
              {language === 'en' ? 'Foundational Pedagogical Wisdom (Divine Pedagogy):' : 'الٰہی تدریج کی بنیادی حکمت:'}
            </span>
          </div>
          {language === 'en' ? (
            <>
              <p className="font-sans text-sm leading-relaxed text-[var(--text-primary)]">
                {activePathway.coreWisdomEnglish}
              </p>
              <p className="font-urdu text-xs text-[var(--text-muted)] leading-relaxed pt-2 border-t border-emerald-500/20 text-right">
                {activePathway.coreWisdomUrdu}
              </p>
            </>
          ) : (
            <>
              <p className="font-urdu text-sm leading-relaxed text-[var(--text-primary)] text-right">
                {activePathway.coreWisdomUrdu}
              </p>
              <p className="font-sans text-xs text-[var(--text-muted)] leading-relaxed pt-1 border-t border-emerald-500/20">
                {activePathway.coreWisdomEnglish}
              </p>
            </>
          )}
        </div>
      </div>

      {/* ── 3. THE PROGRESSION LADDER / STAGES ── */}
      <div className="space-y-6 relative">
        
        {/* Connecting Vertical Track */}
        <div className="hidden lg:block absolute start-[27px] top-6 bottom-6 w-1 bg-gradient-to-b from-emerald-500 via-teal-500 to-amber-500 rounded-full opacity-30 z-0" />

        {activePathway.stages.map((stage) => {
          const isPlaying =
            activeAudio.isPlaying &&
            activeAudio.surahNumber === stage.surahNumber &&
            activeAudio.ayahNumber === stage.ayahNumber;

          return (
            <div
              key={`stage-${stage.stageNumber}`}
              className="relative z-10 p-5 sm:p-7 rounded-3xl sacred-border sacred-shadow bg-[var(--bg-surface-card)] transition-all duration-300 hover:border-emerald-500/40 space-y-4"
            >
              {/* Header Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--border-subtle)] pb-4">
                <div className="flex items-center gap-3">
                  {/* Stage Number Orb */}
                  <div className="w-11 h-11 rounded-2xl bg-emerald-700 text-white font-bold flex items-center justify-center font-sans text-base shadow-md shrink-0">
                    #{stage.stageNumber}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-xs font-semibold">
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-sans border ${
                        stage.era === 'Meccan'
                          ? 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border-emerald-500/30'
                          : 'bg-sky-500/15 text-sky-800 dark:text-sky-300 border-sky-500/30'
                      }`}>
                        {stage.era === 'Meccan'
                          ? (language === 'en' ? 'Meccan Era' : 'مکی دور')
                          : (language === 'en' ? 'Medinan Era' : 'مدنی دور')}
                      </span>

                      <span className={`text-[var(--text-muted)] ${language === 'en' ? 'font-sans' : 'font-urdu'}`}>
                        {stage.yearCE} CE ({stage.yearNabawiOrHijri})
                      </span>

                      {stage.timeGapFromPrevious && (
                        <span className="px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30 text-[10px] font-sans">
                          {stage.timeGapFromPrevious}
                        </span>
                      )}
                    </div>

                    <h4 className={`text-lg sm:text-xl font-bold text-[var(--text-primary)] mt-1 ${language === 'en' ? 'font-sans' : 'font-serif'}`}>
                      {language === 'en' ? stage.stageTitleEnglish : stage.stageTitleUrdu}
                    </h4>
                  </div>
                </div>

                {/* Surah & Ayah Badge + Scholarly Provenance Badge */}
                <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
                  {stage.scholarlyProvenance && (
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-[11px] text-amber-800 dark:text-amber-300 font-serif shadow-2xs">
                      <BookOpen className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span className="font-semibold">
                        {language === 'en' ? 'Source:' : 'ماخذ:'}{' '}
                        <span className="italic">{stage.scholarlyProvenance.primarySource}</span>
                      </span>
                    </div>
                  )}

                  <span className="px-3 py-1.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs font-serif text-[var(--text-primary)] font-bold">
                    {stage.surahNameEnglish} {stage.surahNumber}:{stage.ayahNumber}
                  </span>
                </div>
              </div>

              {/* Pedagogical Rationale (حکمتِ نزول) */}
              <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-1.5">
                <div className="text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5 font-sans">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>
                    {language === 'en'
                      ? 'Legislative & Pedagogical Rationale:'
                      : 'اس مرحلے کی اصلاحی و نفسیاتی حکمت:'}
                  </span>
                </div>
                {language === 'en' ? (
                  <>
                    <p className="font-sans text-sm leading-relaxed text-[var(--text-primary)]">
                      {stage.pedagogicalRationaleEnglish}
                    </p>
                    <p className="font-urdu text-xs text-[var(--text-muted)] leading-relaxed pt-1.5 border-t border-[var(--border-subtle)] text-right">
                      {stage.pedagogicalRationaleUrdu}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="font-urdu text-sm leading-relaxed text-[var(--text-primary)] text-right">
                      {stage.pedagogicalRationaleUrdu}
                    </p>
                    <p className="font-sans text-xs text-[var(--text-muted)] leading-relaxed pt-1 border-t border-[var(--border-subtle)]">
                      {stage.pedagogicalRationaleEnglish}
                    </p>
                  </>
                )}
              </div>

              {/* Academic Scholarly Provenance Spotlight */}
              {stage.scholarlyProvenance && (
                <div className="px-4 py-2.5 rounded-2xl bg-amber-500/5 border border-amber-500/20 text-xs flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-amber-900 dark:text-amber-200">
                    <span className="font-bold text-[11px] uppercase tracking-wider text-amber-700 dark:text-amber-400 font-sans">
                      {language === 'en' ? '🎓 Classical Authority:' : '🎓 مستند تفسیری مرجع:'}
                    </span>
                    <span className="font-serif font-semibold">{stage.scholarlyProvenance.classicalAuthority}</span>
                    {stage.scholarlyProvenance.volumeAndPage && (
                      <span className="hidden sm:inline text-[11px] text-[var(--text-muted)] font-mono">
                        ({stage.scholarlyProvenance.volumeAndPage})
                      </span>
                    )}
                  </div>
                  <span className={`text-[11px] text-[var(--text-muted)] ${language === 'en' ? 'font-sans' : 'font-urdu'}`}>
                    {language === 'en'
                      ? stage.scholarlyProvenance.exegeticalNoteEnglish || stage.scholarlyProvenance.editionInfo
                      : stage.scholarlyProvenance.exegeticalNoteUrdu || stage.scholarlyProvenance.editionInfo}
                  </span>
                </div>
              )}

              {/* The Revealed Verse */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/20 via-[var(--bg-surface)] to-[var(--bg-surface)] border border-emerald-600/30 space-y-3">
                <div className="flex items-center justify-between text-xs text-emerald-700 dark:text-emerald-400 font-bold">
                  <span>
                    {language === 'en'
                      ? `Revealed Passage: ${stage.surahNameEnglish} (${stage.surahNameArabic}) — Verse ${stage.ayahNumber}`
                      : `آیتِ مبارکہ: ${stage.surahNameArabic} — آیت #${stage.ayahNumber}`}
                  </span>
                  <span className="font-sans text-[11px] text-[var(--text-muted)]">
                    {language === 'en' ? `Passage Step #${stage.passageStepNumber}` : `تدریجی مرحلہ #${stage.passageStepNumber}`}
                  </span>
                </div>

                {/* Arabic Text */}
                <div
                  className="font-arabic text-right leading-[2.5] text-lg sm:text-2xl text-[var(--text-primary)]"
                  style={{ fontFamily: typography.arabicFont }}
                >
                  {stage.verseArabic}
                </div>

                {/* Primary & Secondary Translations based on Language Mode */}
                {language === 'en' ? (
                  <div className="space-y-2 pt-2 border-t border-[var(--border-subtle)]">
                    <div className="font-sans text-left text-sm text-[var(--text-primary)] font-medium leading-relaxed">
                      <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 block mb-0.5">
                        Ali Quli Qara'i Translation:
                      </span>
                      {stage.verseEnglish}
                    </div>
                    <div className="font-urdu text-right text-xs text-[var(--text-muted)] leading-relaxed pt-1.5 border-t border-[var(--border-subtle)]/50">
                      {stage.verseUrdu}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 pt-2 border-t border-[var(--border-subtle)]">
                    <div className="font-urdu text-right text-xs sm:text-sm text-[var(--text-primary)] leading-relaxed">
                      {stage.verseUrdu}
                    </div>
                    <div className="font-sans text-left text-xs text-[var(--text-muted)] leading-relaxed pt-1.5 border-t border-[var(--border-subtle)]/50">
                      {stage.verseEnglish}
                    </div>
                  </div>
                )}

                {/* Actions: Audio Play & Passage Jump */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-[var(--border-subtle)]">
                  <button
                    onClick={() => {
                      if (isPlaying) {
                        pauseAudio();
                      } else {
                        playAyah(stage.surahNumber, stage.ayahNumber, stage.eventOrder);
                      }
                    }}
                    className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isPlaying
                        ? 'bg-amber-600 text-white shadow-xs animate-pulse'
                        : 'bg-emerald-700 text-white hover:bg-emerald-800 shadow-xs'
                    }`}
                    title={language === 'en' ? 'Listen to recitation' : 'اس آیت کی تلاوت سنیں'}
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    <span className={language === 'en' ? 'font-sans' : 'font-urdu'}>
                      {isPlaying
                        ? (language === 'en' ? 'Playing Audio (Pause)' : 'تلاوت جاری ہے (وقفہ)')
                        : (language === 'en' ? 'Listen to Recitation' : 'آیت سنیں')}
                    </span>
                  </button>

                  <button
                    onClick={() => handleJumpToReader(stage)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-[var(--bg-surface-elevated)] hover:bg-emerald-700 hover:text-white border border-[var(--border-subtle)] text-[var(--text-primary)] transition-all cursor-pointer shadow-xs"
                    title={language === 'en' ? 'Read full contextual passage' : 'تدریجی قراءت میں اس آیت کا سیاق و سباق پڑھیں'}
                  >
                    <span className={language === 'en' ? 'font-sans' : 'font-urdu'}>
                      {language === 'en' ? 'Examine Passage Context' : 'سیاق و سباق میں پڑھیں'}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
};
