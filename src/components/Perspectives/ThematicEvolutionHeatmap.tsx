import React, { useState, useMemo } from 'react';
import { useQuran } from '@/context/QuranContext';
import {
  THEMATIC_EVOLUTION_DATA,
  QuranThemeDefinition,
  ThematicPeriodCell,
  ThemeCategory,
} from '@/data/thematicEvolutionData';
import {
  Flame,
  Sparkles,
  Play,
  Pause,
  ArrowRight,
  TrendingUp,
  HelpCircle,
  BarChart3,
  Compass,
  Info,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
  ArrowLeftRight,
  Clock,
  Layers,
} from 'lucide-react';

export const ThematicEvolutionHeatmap: React.FC = () => {
  const {
    typography,
    activeAudio,
    playAyah,
    pauseAudio,
    setActivePassageStep,
    setPerspectiveMode,
    language,
  } = useQuran();

  const [selectedThemeId, setSelectedThemeId] = useState<ThemeCategory>('tawhid');
  const [selectedPeriodIndex, setSelectedPeriodIndex] = useState<number>(0);
  const [showMethodologyGuide, setShowMethodologyGuide] = useState<boolean>(false);

  // Active theme resolution
  const activeTheme: QuranThemeDefinition = useMemo(() => {
    return (
      THEMATIC_EVOLUTION_DATA.find((t) => t.id === selectedThemeId) ||
      THEMATIC_EVOLUTION_DATA[0]
    );
  }, [selectedThemeId]);

  // Active period cell resolution
  const activeCell: ThematicPeriodCell = useMemo(() => {
    return activeTheme.periods[selectedPeriodIndex] || activeTheme.periods[0];
  }, [activeTheme, selectedPeriodIndex]);

  // Period columns definition
  const periodsHeader = useMemo(() => {
    return activeTheme.periods.map((p) => ({
      id: p.periodId,
      nameUrdu: p.periodNameUrdu,
      nameEnglish: p.periodNameEnglish,
      yearsCE: p.yearsCE,
      yearsNabawiOrHijri: p.yearsNabawiOrHijri,
    }));
  }, [activeTheme]);

  // Audio playing check for active cell verse
  const isPlayingActiveVerse =
    activeAudio.isPlaying &&
    activeAudio.surahNumber === activeCell.representativeVerse.surahNumber &&
    activeAudio.ayahNumber === activeCell.representativeVerse.ayahNumber;

  // Jump to Chronological Passage Reader
  const handleJumpToReader = () => {
    setActivePassageStep(activeCell.representativeVerse.passageStepNumber);
    setPerspectiveMode('passage_nuzul');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Comparative ranking of all 8 themes within the currently selected period
  const eraRanking = useMemo(() => {
    const list = THEMATIC_EVOLUTION_DATA.map((theme) => {
      const cell = theme.periods[selectedPeriodIndex];
      return {
        themeId: theme.id,
        titleUrdu: theme.titleUrdu,
        titleEnglish: theme.titleEnglish,
        badgeColor: theme.badgeColor,
        percentageScore: cell.percentageScore,
        density: cell.density,
      };
    });
    // Sort descending by percentageScore
    list.sort((a, b) => b.percentageScore - a.percentageScore);
    const currentRankIndex = list.findIndex((item) => item.themeId === selectedThemeId);
    return {
      sortedThemes: list,
      currentRank: currentRankIndex + 1,
      totalThemes: list.length,
    };
  }, [selectedPeriodIndex, selectedThemeId]);

  // Helper to get cell background class based on density
  const getCellBgClass = (density: number, isSelected: boolean) => {
    if (isSelected) {
      return 'bg-amber-500 text-emerald-950 ring-2 ring-amber-400 font-bold shadow-md';
    }
    switch (density) {
      case 4:
        return 'bg-emerald-600 text-white hover:bg-emerald-500';
      case 3:
        return 'bg-emerald-700/80 text-emerald-100 hover:bg-emerald-600';
      case 2:
        return 'bg-emerald-800/50 text-emerald-200 hover:bg-emerald-700/70';
      case 1:
      default:
        return 'bg-emerald-950/40 text-emerald-400/80 hover:bg-emerald-900/60';
    }
  };

  // Helper for density label in Urdu & English
  const getDensityDescriptor = (density: number) => {
    switch (density) {
      case 4:
        return { urdu: 'اوجِ کمال (بنیادی ترین محور)', english: 'Dominant Peak Focus' };
      case 3:
        return { urdu: 'نمایاں غلبہ و تکرار', english: 'High Recurrence' };
      case 2:
        return { urdu: 'متوسط و مسلسل', english: 'Moderate Continuity' };
      case 1:
      default:
        return { urdu: 'ابتدائی و تمہیدی', english: 'Foundational / Subtle' };
    }
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-[1780px] mx-auto pb-12">
      
      {/* ── 1. HEADER & THEMATIC INSIGHT BANNER ── */}
      <div className="p-4 sm:p-6 rounded-3xl sacred-glass sacred-border shadow-md space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1">
              <Flame className="w-4 h-4 text-amber-500" />
              <span>تطوّرِ مضامین و موضوعات (Thematic Evolution Heatmap)</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-800 dark:text-emerald-200 border border-emerald-500/30 text-[11px] font-sans">
                ۲۳ سالہ موضوعاتی سفر
              </span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[var(--text-primary)]">
              قرآنِ مجید کے مضامین کا تاریخی ارتقاء
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] font-urdu mt-0.5">
              مکہ میں عقیدہ، توحید اور آخرت کی تعمیر سے لے کر مدینہ میں عدل، شریعت اور ولایت کے نفاذ تک کا تقابلی نقشہ
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowMethodologyGuide(!showMethodologyGuide)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-xs font-bold text-amber-900 dark:text-amber-200 transition-all cursor-pointer shadow-xs"
              title="فیصد (%) اور تقابل کا مفہوم جانیں"
            >
              <HelpCircle className="w-4 h-4 text-amber-500 shrink-0" />
              <span className="font-urdu">فیصد کا مفہوم و موازنہ کیسے سمجھیں؟</span>
              {showMethodologyGuide ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </button>

            <div className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-semibold text-emerald-800 dark:text-emerald-300">
              <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
              <span className="font-urdu">«كِتَابٌ أُحْكِمَتْ آيَاتُهُ ثُمَّ فُصِّلَتْ»</span>
            </div>
          </div>
        </div>

        {/* Thematic Insight Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-[var(--border-subtle)] text-xs">
          <div className="p-3 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-600 flex items-center justify-center shrink-0">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-[var(--text-primary)] font-urdu">مکی دور (Mecca):</div>
              <div className="text-[var(--text-muted)] text-[11px] font-urdu">توحید، معاد اور قصصِ انبیاء کا غلبہ (۸۰٪ تا ۹۵٪)</div>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-sky-500/15 text-sky-600 flex items-center justify-center shrink-0">
              <BarChart3 className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-[var(--text-primary)] font-urdu">مدنی دور (Medina):</div>
              <div className="text-[var(--text-muted)] text-[11px] font-urdu">شریعت، سماجی انصاف اور ولایت کا نفاذ (۷۵٪ تا ۹۵٪)</div>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-600 flex items-center justify-center shrink-0">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-[var(--text-primary)] font-urdu">تعاملی ہیٹ میپ:</div>
              <div className="text-[var(--text-muted)] text-[11px] font-urdu">کسی بھی خانے پر کلک کر کے تقابل اور آیات دیکھیں</div>
            </div>
          </div>
        </div>

        {/* ── EXPANDABLE METHODOLOGY & PERCENTAGE GUIDE ── */}
        {showMethodologyGuide && (
          <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-[var(--text-primary)] space-y-4 animate-fade-in">
            <div className="flex items-center gap-2 text-sm font-bold text-amber-900 dark:text-amber-200 font-urdu">
              <Info className="w-4 h-4 text-amber-500 shrink-0" />
              <span>رہنمائے پیمانہ: ہیٹ میپ کے فیصد (%) اور تقابلی طریقہ کار کا تفصیلی فہم</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-right">
              {/* Card 1: What the % measures */}
              <div className="p-3.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-1.5">
                <div className="font-bold text-emerald-700 dark:text-emerald-400 font-urdu flex items-center justify-end gap-1.5">
                  <span>۱. فیصد کس چیز کی پیمائش کرتا ہے؟</span>
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                </div>
                <p className="font-urdu leading-relaxed text-[11px] text-[var(--text-muted)]">
                  یہ فیصد (0% تا 100%) <strong className="text-[var(--text-primary)]">«موضوعاتی ارتکاز و شدت (Thematic Prominence Index)»</strong> ہے۔ یہ بتاتا ہے کہ کسی مخصوص دور کے نازل شدہ سورتوں میں یہ موضوع کس قدر گہرائی، غلبے اور کثرت کے ساتھ مرکزی محور بن کر ابھرا۔
                </p>
              </div>

              {/* Card 2: Why columns don't sum to 100% */}
              <div className="p-3.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-1.5">
                <div className="font-bold text-sky-700 dark:text-sky-400 font-urdu flex items-center justify-end gap-1.5">
                  <span>۲. یہ کُل ۱۰۰٪ پر تقسیم کیوں نہیں ہوتا؟</span>
                  <Layers className="w-3.5 h-3.5" />
                </div>
                <p className="font-urdu leading-relaxed text-[11px] text-[var(--text-muted)]">
                  قرآنی آیات <strong className="text-[var(--text-primary)]">کثیر الجہتی (Multi-thematic)</strong> ہیں۔ ایک ہی آیت یا سورۃ میں بیک وقت توحید، اخلاق اور آخرت کا ذکر ہوتا ہے۔ لہٰذا ہر موضوع کا فیصد آزادانہ ہے، یہ کوئی باہمی اخراجی (mutually exclusive) کیک کا ٹکڑا نہیں ہے۔
                </p>
              </div>

              {/* Card 3: Two Dimensions of Comparison */}
              <div className="p-3.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-1.5">
                <div className="font-bold text-amber-700 dark:text-amber-400 font-urdu flex items-center justify-end gap-1.5">
                  <span>۳. موازنہ کس طرح کیا گیا ہے؟</span>
                  <ArrowLeftRight className="w-3.5 h-3.5" />
                </div>
                <p className="font-urdu leading-relaxed text-[11px] text-[var(--text-muted)]">
                  <strong className="text-[var(--text-primary)]">افقی (Horizontal):</strong> اسی ایک موضوع کا وقت کے ساتھ تدریجی ارتقاء (مثلاً: ابتدائی مکہ میں توحید ۹۲٪ تا آخری مدینہ ۴۰٪)۔<br />
                  <strong className="text-[var(--text-primary)]">عمودی (Vertical):</strong> کسی ایک دور میں تمام ۸ موضوعات کا باہمی غلبہ (نیچے کارڈ میں اس کی درجہ بندی دیکھیں)۔
                </p>
              </div>
            </div>

            {/* Density Scale Legend Breakdown */}
            <div className="pt-2 border-t border-amber-500/20 flex flex-wrap items-center justify-between gap-2 text-[11px] font-urdu">
              <span className="font-bold text-amber-800 dark:text-amber-300">درجات کا معیار (Scale Brackets):</span>
              <div className="flex flex-wrap items-center gap-3">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                  <span><strong>80% - 100%:</strong> اوجِ کمال (اس دور کا بنیادی ترین محور)</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-700" />
                  <span><strong>60% - 79%:</strong> نمایاں غلبہ و بار بار تکرار</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-800" />
                  <span><strong>35% - 59%:</strong> متوسط و مسلسل تسلسل</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-950" />
                  <span><strong>0% - 34%:</strong> تمہیدی اشارات و ابتدائی بنیاد</span>
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── 2. THE 2D HEATMAP GRID ── */}
      <div className="p-4 sm:p-6 rounded-3xl sacred-glass sacred-border shadow-xl space-y-4 overflow-x-auto">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs text-[var(--text-muted)] font-urdu">
            نقشہ میں ہر خانہ اس دور میں اس موضوع کے <strong className="text-[var(--text-primary)]">ارتکاز (Prominence %)</strong> کو ظاہر کرتا ہے۔
          </div>
          <button
            onClick={() => setShowMethodologyGuide(!showMethodologyGuide)}
            className="text-[11px] text-emerald-700 dark:text-emerald-400 hover:underline font-urdu cursor-pointer flex items-center gap-1"
          >
            <Info className="w-3.5 h-3.5" />
            <span>فیصد کا حسابی معیار</span>
          </button>
        </div>

        <div className="min-w-[750px]">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-[var(--border-subtle)] text-xs text-[var(--text-muted)]">
                <th className="py-3 px-4 text-right font-bold w-1/4 font-urdu">
                  موضوع / محور (Theme Track)
                </th>
                {periodsHeader.map((p, pIndex) => (
                  <th
                    key={p.id}
                    className={`py-3 px-3 text-center font-semibold w-[15%] transition-colors rounded-t-xl ${
                      selectedPeriodIndex === pIndex ? 'bg-emerald-500/10' : ''
                    }`}
                  >
                    <div className="font-urdu text-xs font-bold text-[var(--text-primary)]">
                      {p.nameUrdu}
                    </div>
                    <div className="text-[10px] font-sans text-emerald-700 dark:text-emerald-400">
                      {p.yearsCE}
                    </div>
                    <div className="text-[9px] text-[var(--text-muted)] font-urdu">
                      ({p.yearsNabawiOrHijri})
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-[var(--border-subtle)]">
              {THEMATIC_EVOLUTION_DATA.map((theme) => {
                const isThemeActive = theme.id === selectedThemeId;

                return (
                  <tr
                    key={theme.id}
                    className={`transition-colors hover:bg-emerald-500/5 ${
                      isThemeActive ? 'bg-emerald-500/5' : ''
                    }`}
                  >
                    
                    {/* Theme Label Column */}
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setSelectedThemeId(theme.id)}
                        className={`text-right w-full cursor-pointer transition-colors ${
                          isThemeActive
                            ? 'font-bold text-emerald-800 dark:text-emerald-300'
                            : 'text-[var(--text-primary)] hover:text-emerald-700'
                        }`}
                      >
                        <div className="font-urdu text-sm font-semibold flex items-center justify-end gap-2">
                          <span>{theme.titleUrdu}</span>
                          <span
                            className="w-2.5 h-2.5 rounded-full shrink-0"
                            style={{ backgroundColor: theme.badgeColor }}
                          />
                        </div>
                        <div className="text-[10px] text-[var(--text-muted)] font-sans">
                          {theme.titleEnglish}
                        </div>
                      </button>
                    </td>

                    {/* 5 Period Density Cells */}
                    {theme.periods.map((cell, pIdx) => {
                      const isCellSelected = isThemeActive && selectedPeriodIndex === pIdx;
                      const descriptor = getDensityDescriptor(cell.density);

                      return (
                        <td key={`${theme.id}-${cell.periodId}`} className="p-1.5 text-center">
                          <button
                            onClick={() => {
                              setSelectedThemeId(theme.id);
                              setSelectedPeriodIndex(pIdx);
                            }}
                            className={`w-full py-3 px-2 rounded-2xl transition-all duration-200 cursor-pointer flex flex-col items-center justify-center gap-1 ${getCellBgClass(
                              cell.density,
                              isCellSelected
                            )}`}
                            title={`${theme.titleUrdu} — ${cell.periodNameUrdu}\nموضوعاتی ارتکاز: ${cell.percentageScore}%\nحیثیت: ${descriptor.urdu}`}
                          >
                            <span className="font-sans text-xs font-bold">
                              {cell.percentageScore}%
                            </span>
                            
                            {/* Density Dot Indicator */}
                            <div className="flex items-center gap-0.5">
                              {Array.from({ length: 4 }).map((_, dIdx) => (
                                <span
                                  key={`dot-${dIdx}`}
                                  className={`w-1 h-1 rounded-full ${
                                    dIdx < cell.density ? 'bg-current opacity-90' : 'bg-current opacity-25'
                                  }`}
                                />
                              ))}
                            </div>
                          </button>
                        </td>
                      );
                    })}

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Heatmap Scale Legend */}
        <div className="pt-3 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-3 text-xs text-[var(--text-muted)]">
          <div className="flex items-center gap-2">
            <span className="font-urdu">کثافت و شدتِ ارتکاز (Density Scale):</span>
            <div className="flex items-center gap-1 font-sans text-[10px]">
              <span className="px-2 py-0.5 rounded bg-emerald-950/40 text-emerald-400 border border-emerald-900">
                سطحی (1)
              </span>
              <span>→</span>
              <span className="px-2 py-0.5 rounded bg-emerald-800/50 text-emerald-200">
                متوسط (2)
              </span>
              <span>→</span>
              <span className="px-2 py-0.5 rounded bg-emerald-700/80 text-emerald-100">
                زیادہ (3)
              </span>
              <span>→</span>
              <span className="px-2 py-0.5 rounded bg-emerald-600 text-white font-bold">
                اوجِ کمال (4)
              </span>
            </div>
          </div>

          <div className="text-[11px] font-urdu">
            کسی بھی خانے پر کلک کر کے اس کا تقابلی گراف، تاریخی حکمت اور نمائندہ آیات ملاحظہ فرمائیں
          </div>
        </div>
      </div>

      {/* ── 3. SELECTED CELL SPOTLIGHT & COMPARATIVE CONTEXT CARD ── */}
      <div className="p-6 sm:p-7 rounded-3xl sacred-glass sacred-border shadow-xl space-y-6 border-emerald-600/30">
        
        {/* Card Header: Theme & Period */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--border-subtle)] pb-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30 text-[11px] font-sans">
                {activeCell.periodNameEnglish} ({activeCell.yearsCE})
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30 text-[11px]">
                {activeCell.yearsNabawiOrHijri}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-700 text-white text-[10px] font-sans font-bold">
                موضوعاتی ارتکاز: {activeCell.percentageScore}%
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-sky-500/15 text-sky-800 dark:text-sky-300 border border-sky-500/30 text-[11px] font-urdu">
                درجہ: #{eraRanking.currentRank} از {eraRanking.totalThemes} موضوعات
              </span>
            </div>

            <h3 className="text-2xl font-bold font-serif text-[var(--text-primary)]">
              {activeTheme.titleUrdu} — {activeCell.periodNameUrdu}
            </h3>
            <p className="text-xs text-[var(--text-muted)] font-sans">
              {activeTheme.titleEnglish} in the {activeCell.periodNameEnglish} Era
            </p>
          </div>

          {/* Key Surahs Pill List */}
          <div className="flex flex-wrap items-center gap-1.5 self-start sm:self-auto">
            <span className="text-xs text-[var(--text-muted)] font-urdu ml-1">نمایاں سورتیں:</span>
            {activeCell.keySurahs.map((ks) => (
              <span
                key={ks.surahNumber}
                className="px-2.5 py-1 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs font-semibold text-[var(--text-primary)]"
              >
                {ks.nameUrdu} ({ks.surahNumber})
              </span>
            ))}
          </div>
        </div>

        {/* ── DUAL COMPARATIVE ANALYTICS (EXPLAINING WHAT IT'S COMPARED WITH) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          
          {/* Dimension A: 23-Year Trajectory of THIS Theme across all 5 Eras */}
          <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[var(--text-primary)] font-urdu flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                <span>۱. تاریخی سفر (اس موضوع کا ۵ ادوار میں ارتقاء):</span>
              </span>
              <span className="text-[10px] text-[var(--text-muted)] font-sans">
                Timeline Comparison
              </span>
            </div>

            <div className="space-y-2 pt-1">
              {activeTheme.periods.map((p, idx) => {
                const isCurrent = idx === selectedPeriodIndex;
                return (
                  <div
                    key={p.periodId}
                    onClick={() => setSelectedPeriodIndex(idx)}
                    className={`p-2 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isCurrent
                        ? 'bg-amber-500/10 border-amber-500/40 shadow-xs'
                        : 'bg-[var(--bg-surface-elevated)] border-transparent hover:border-[var(--border-subtle)]'
                    }`}
                  >
                    <div className="w-1/3 text-right">
                      <div className={`text-xs font-urdu ${isCurrent ? 'font-bold text-amber-900 dark:text-amber-200' : 'text-[var(--text-primary)]'}`}>
                        {p.periodNameUrdu}
                      </div>
                      <div className="text-[10px] text-[var(--text-muted)] font-sans">
                        {p.yearsCE}
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-1/2 flex items-center gap-2">
                      <div className="w-full h-2 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${
                            isCurrent ? 'bg-amber-500' : 'bg-emerald-600'
                          }`}
                          style={{ width: `${p.percentageScore}%` }}
                        />
                      </div>
                      <span className="font-sans text-xs font-bold w-10 text-right">
                        {p.percentageScore}%
                      </span>
                    </div>

                    <div className="w-16 text-left text-[10px] font-sans">
                      {isCurrent ? (
                        <span className="px-1.5 py-0.5 rounded bg-amber-500 text-emerald-950 font-bold">
                          منتخب
                        </span>
                      ) : (
                        <span className="text-[var(--text-muted)]">کلک کریں</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="text-[11px] text-[var(--text-muted)] font-urdu text-right pt-1 border-t border-[var(--border-subtle)]">
              یہ موازنہ ظاہر کرتا ہے کہ ۲۳ سالہ وحی میں یہ موضوع کب عروج پر تھا اور کب دوسرے اہم موضوعات کو ترجیح ملی۔
            </p>
          </div>

          {/* Dimension B: Era Cross-Section Ranking of ALL 8 Themes in THIS Era */}
          <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[var(--text-primary)] font-urdu flex items-center gap-1.5">
                <BarChart3 className="w-3.5 h-3.5 text-sky-500" />
                <span>۲. دور کا موازنہ ({activeCell.periodNameUrdu} میں تمام موضوعات کی درجہ بندی):</span>
              </span>
              <span className="text-[10px] text-[var(--text-muted)] font-sans">
                Era Cross-Section
              </span>
            </div>

            <div className="space-y-1.5 pt-1 max-h-[260px] overflow-y-auto pr-1">
              {eraRanking.sortedThemes.map((item, rankIdx) => {
                const isCurrentTheme = item.themeId === selectedThemeId;
                return (
                  <div
                    key={item.themeId}
                    onClick={() => setSelectedThemeId(item.themeId)}
                    className={`p-1.5 px-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-2 ${
                      isCurrentTheme
                        ? 'bg-emerald-500/15 border-emerald-500/50 shadow-xs'
                        : 'bg-[var(--bg-surface-elevated)] border-transparent hover:border-[var(--border-subtle)]'
                    }`}
                  >
                    <div className="flex items-center gap-2 w-2/5">
                      <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold font-sans bg-[var(--bg-surface)] text-[var(--text-muted)] border border-[var(--border-subtle)]">
                        {rankIdx + 1}
                      </span>
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: item.badgeColor }}
                      />
                      <span className={`text-xs truncate font-urdu ${isCurrentTheme ? 'font-bold text-emerald-800 dark:text-emerald-300' : 'text-[var(--text-primary)]'}`}>
                        {item.titleUrdu}
                      </span>
                    </div>

                    {/* Score Bar */}
                    <div className="w-2/5 flex items-center gap-2">
                      <div className="w-full h-1.5 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${
                            isCurrentTheme ? 'bg-amber-500' : 'bg-emerald-700'
                          }`}
                          style={{ width: `${item.percentageScore}%` }}
                        />
                      </div>
                      <span className="font-sans text-[11px] font-bold w-8 text-right">
                        {item.percentageScore}%
                      </span>
                    </div>

                    <div className="w-16 text-left text-[10px]">
                      {isCurrentTheme ? (
                        <span className="px-1.5 py-0.5 rounded bg-emerald-700 text-white font-bold">
                          فعال
                        </span>
                      ) : (
                        <span className="text-[var(--text-muted)] text-[10px]">منتخب کریں</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="text-[11px] text-[var(--text-muted)] font-urdu text-right pt-1 border-t border-[var(--border-subtle)]">
              یہ موازنہ بتاتا ہے کہ <strong className="text-[var(--text-primary)]">{activeCell.periodNameUrdu}</strong> میں کون سے موضوعات سرِفہرست رہے اور کون سے ضمنی۔
            </p>
          </div>

        </div>

        {/* Thematic Rationale & Historical Context */}
        <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-2">
          <div className="text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5 font-urdu text-sm">
            <HelpCircle className="w-4 h-4 text-amber-500" />
            <span>اس دور میں اس موضوع کے غلبے کی تاریخی و اصلاحی حکمت ({activeCell.percentageScore}% ارتکاز کا سبب):</span>
          </div>
          <p className="font-urdu text-sm leading-relaxed text-[var(--text-primary)] text-right">
            {activeCell.thematicSummaryUrdu}
          </p>
          <p className="font-sans text-xs text-[var(--text-muted)] leading-relaxed pt-1 border-t border-[var(--border-subtle)]">
            {activeCell.thematicSummaryEnglish}
          </p>
        </div>

        {/* Representative Scripture Card */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/25 via-[var(--bg-surface)] to-[var(--bg-surface)] border border-emerald-600/30 space-y-3">
          <div className="flex items-center justify-between text-xs text-emerald-700 dark:text-emerald-400 font-bold">
            <span>
              {language === 'en'
                ? `Representative Verse: Surah ${activeCell.representativeVerse.surahNameEnglish} (${activeCell.representativeVerse.surahNameUrdu}) — Ayah #${activeCell.representativeVerse.ayahNumber}`
                : `نمائندہ آیتِ مبارکہ: ${activeCell.representativeVerse.surahNameUrdu} (${activeCell.representativeVerse.surahNameEnglish}) — آیت #${activeCell.representativeVerse.ayahNumber}`}
            </span>
            <span className="font-sans text-[11px] text-[var(--text-muted)]">
              نزولِ تدریجی مرحلہ #{activeCell.representativeVerse.passageStepNumber}
            </span>
          </div>

          {/* Arabic Scripture */}
          <div
            className="font-arabic text-right leading-[2.5] text-lg sm:text-2xl text-[var(--text-primary)]"
            style={{ fontFamily: typography.arabicFont }}
          >
            {activeCell.representativeVerse.textArabic}
          </div>

          {/* Urdu Translation */}
          <div className="font-urdu text-right text-xs sm:text-sm text-[var(--text-primary)] leading-relaxed pt-2 border-t border-[var(--border-subtle)]">
            {activeCell.representativeVerse.textUrdu}
          </div>

          {/* English Translation */}
          <div className="font-sans text-left text-xs text-[var(--text-muted)] leading-relaxed">
            {activeCell.representativeVerse.textEnglish}
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-[var(--border-subtle)]">
            <button
              onClick={() => {
                if (isPlayingActiveVerse) {
                  pauseAudio();
                } else {
                  playAyah(
                    activeCell.representativeVerse.surahNumber,
                    activeCell.representativeVerse.ayahNumber,
                    activeCell.representativeVerse.eventOrder
                  );
                }
              }}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isPlayingActiveVerse
                  ? 'bg-amber-600 text-white shadow-xs animate-pulse'
                  : 'bg-emerald-700 text-white hover:bg-emerald-800 shadow-xs'
              }`}
              title="اس نمائندہ آیت کی تلاوت سنیں"
            >
              {isPlayingActiveVerse ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlayingActiveVerse ? 'وقفہ' : 'تلاوت سنیں'}</span>
            </button>

            <button
              onClick={handleJumpToReader}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-[var(--bg-surface-elevated)] hover:bg-emerald-700 hover:text-white border border-[var(--border-subtle)] text-[var(--text-primary)] transition-all cursor-pointer shadow-xs"
              title="تدریجی قراءت میں اس سورت اور مقام کا مطالعہ کریں"
            >
              <span>سیاق و سباق میں پڑھیں</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};

