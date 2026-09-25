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
} from 'lucide-react';

export const GradualLegislationView: React.FC = () => {
  const {
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
              <span>تدریجِ احکام و تربیتِ الٰہی (The Pedagogy of Divine Law)</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-800 dark:text-emerald-200 border border-emerald-500/30 text-[11px] font-sans">
                ۵ بنیادی شرعی موضوعات
              </span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[var(--text-primary)]">
              نزولِ قرآن کی تدریجی حکمت اور احکام کا مرحلہ وار نفاذ
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] font-urdu mt-0.5">
              قرآن یک لخت نازل نہیں ہوا، بلکہ ۲۳ سالوں میں انسانی ارادے اور معاشرتی فہم کو مرحلہ وار تیار کر کے احکام نافذ کیے گئے۔
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto px-3.5 py-2 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-semibold text-emerald-800 dark:text-emerald-300">
            <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
            <span className="font-urdu">«وَرَتَّلْنَاهُ تَرْتِيلًا» — تدریجی نزول کا معجزہ</span>
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
                <span className="font-urdu">{path.titleUrdu}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-emerald-900/50 text-emerald-100' : 'bg-emerald-500/15 text-emerald-700'}`}>
                  {path.totalStages} مراحل
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
              <span>{activePathway.totalYearsSpan}</span>
            </div>
            <h3 className="text-2xl font-bold font-serif text-[var(--text-primary)]">
              {activePathway.titleUrdu}
            </h3>
            <p className="text-xs text-[var(--text-muted)] font-sans">
              {activePathway.titleEnglish} — {activePathway.subtitleEnglish}
            </p>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs text-[var(--text-secondary)]">
            <Layers className="w-3.5 h-3.5 text-emerald-600" />
            <span>مجموعی مراحل: {activePathway.totalStages}</span>
          </div>
        </div>

        {/* Pedagogical Core Wisdom */}
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 space-y-2">
          <div className="text-xs font-bold text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-amber-500" />
            <span className="font-urdu">الٰہی تدریج کی بنیادی حکمت (Divine Pedagogy):</span>
          </div>
          <p className="font-urdu text-sm leading-relaxed text-[var(--text-primary)] text-right">
            {activePathway.coreWisdomUrdu}
          </p>
          <p className="text-xs font-sans text-[var(--text-muted)] leading-relaxed pt-1 border-t border-emerald-500/20">
            {activePathway.coreWisdomEnglish}
          </p>
        </div>
      </div>

      {/* ── 3. THE PROGRESSION LADDER / STAGES ── */}
      <div className="space-y-6 relative">
        
        {/* Connecting Vertical Track for Desktop */}
        <div className="hidden lg:block absolute right-[27px] top-6 bottom-6 w-1 bg-gradient-to-b from-emerald-500 via-teal-500 to-amber-500 rounded-full opacity-30 z-0" />

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
                        {stage.era === 'Meccan' ? 'مکی دور' : 'مدنی دور'}
                      </span>

                      <span className="text-[var(--text-muted)] font-urdu">
                        {stage.yearNabawiOrHijri}
                      </span>

                      {stage.timeGapFromPrevious && (
                        <span className="px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30 text-[10px] font-urdu">
                          {stage.timeGapFromPrevious}
                        </span>
                      )}
                    </div>

                    <h4 className="text-lg sm:text-xl font-bold font-serif text-[var(--text-primary)] mt-1">
                      {stage.stageTitleUrdu}
                    </h4>
                  </div>
                </div>

                {/* Surah & Ayah Badge */}
                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <span className="px-3 py-1.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs font-serif text-[var(--text-primary)] font-bold">
                    {stage.surahNameEnglish} {stage.surahNumber}:{stage.ayahNumber}
                  </span>
                </div>
              </div>

              {/* Pedagogical Rationale (حکمتِ نزول) */}
              <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-1.5">
                <div className="text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5 font-urdu">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>اس مرحلے کی اصلاحی و نفسیاتی حکمت:</span>
                </div>
                <p className="font-urdu text-sm leading-relaxed text-[var(--text-primary)] text-right">
                  {stage.pedagogicalRationaleUrdu}
                </p>
                <p className="font-sans text-xs text-[var(--text-muted)] leading-relaxed pt-1 border-t border-[var(--border-subtle)]">
                  {stage.pedagogicalRationaleEnglish}
                </p>
              </div>

              {/* The Revealed Verse */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/20 via-[var(--bg-surface)] to-[var(--bg-surface)] border border-emerald-600/30 space-y-3">
                <div className="flex items-center justify-between text-xs text-emerald-700 dark:text-emerald-400 font-bold">
                  <span>آیتِ مبارکہ: {stage.surahNameArabic} — آیت #{stage.ayahNumber}</span>
                  <span className="font-sans text-[11px] text-[var(--text-muted)]">
                    تدریجی مرحلہ #{stage.passageStepNumber}
                  </span>
                </div>

                {/* Arabic Text */}
                <div
                  className="font-arabic text-right leading-[2.5] text-lg sm:text-2xl text-[var(--text-primary)]"
                  style={{ fontFamily: typography.arabicFont }}
                >
                  {stage.verseArabic}
                </div>

                {/* Urdu Translation */}
                <div className="font-urdu text-right text-xs sm:text-sm text-[var(--text-primary)] leading-relaxed pt-2 border-t border-[var(--border-subtle)]">
                  {stage.verseUrdu}
                </div>

                {/* English Translation */}
                <div className="font-sans text-left text-xs text-[var(--text-muted)] leading-relaxed">
                  {stage.verseEnglish}
                </div>

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
                    title="اس آیت کی تلاوت سنیں"
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    <span>{isPlaying ? 'تلاوت جاری ہے (وقفہ)' : 'آیت سنیں'}</span>
                  </button>

                  <button
                    onClick={() => handleJumpToReader(stage)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-[var(--bg-surface-elevated)] hover:bg-emerald-700 hover:text-white border border-[var(--border-subtle)] text-[var(--text-primary)] transition-all cursor-pointer shadow-xs"
                    title="تدریجی قراءت میں اس آیت کا سیاق و سباق پڑھیں"
                  >
                    <span>سیاق و سباق میں پڑھیں</span>
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
