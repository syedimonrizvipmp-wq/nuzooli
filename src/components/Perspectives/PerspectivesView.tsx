import React, { useState } from 'react';
import { useQuran } from '@/context/QuranContext';
import { ALL_114_CHRONOLOGICAL_EVENTS } from '@/data/allChronologicalEvents';
import { RevelationNatureBadge } from '@/components/Reader/RevelationNatureBadge';
import { RevelationPeriod } from '@/types/quran';
import { PassageFlowView } from './PassageFlowView';
import { ArcOfReconnectionView } from './ArcOfReconnectionView';
import { SurahXRayMatrixView } from './SurahXRayMatrixView';
import { GeographicRevelationMap } from './GeographicRevelationMap';
import { GradualLegislationView } from './GradualLegislationView';
import { ThematicEvolutionHeatmap } from './ThematicEvolutionHeatmap';
import { AsbabCrisisNavigator } from './AsbabCrisisNavigator';
import { AudienceMatrixView } from './AudienceMatrixView';
import { AsmaUlHusnaChronologyView } from './AsmaUlHusnaChronologyView';
import {
  GitBranch,
  Layers,
  ArrowRight,
  Sparkles,
  Search,
  CheckCircle2,
  Clock,
  Compass,
  Split,
  ChevronDown,
  ChevronUp,
  MapPin,
  SlidersHorizontal,
  Eye,
  Scale,
  Flame,
  ShieldAlert,
  Users,
  Crown,
} from 'lucide-react';

export type PerspectiveTabId = 'arc' | 'interlocutors' | 'asma' | 'crisis' | 'thematic' | 'map' | 'legislation' | 'xray' | 'flow' | 'nature' | 'periods' | 'comparison' | 'future';

export interface PerspectiveTabDef {
  id: PerspectiveTabId;
  labelEn: string;
  labelUr: string;
  icon: React.ReactNode;
  description: string;
  descriptionUr: string;
}

export const PERSPECTIVE_TABS: PerspectiveTabDef[] = [
  {
    id: 'arc',
    labelEn: 'Arc of Reconnection',
    labelUr: 'محرابِ ربطِ مصحف',
    icon: <Sparkles className="w-4 h-4 text-amber-500" />,
    description: 'Dual-rail chord diagram showing 23-year revelations assembling into the canonical Mushaf',
    descriptionUr: '۲۳ سالہ بکھرے نزول کا حتمی مصحف میں یکجا ہونا اور تقابلی ربط',
  },
  {
    id: 'interlocutors',
    labelEn: 'Divine Interlocutors & Audience',
    labelUr: 'مخاطبینِ قرآن و اسالیبِ خطاب',
    icon: <Users className="w-4 h-4 text-sky-500" />,
    description: 'Analysis of who the Quran addressed: O Humanity, O Believers, People of the Book, Hypocrites, and the Prophet',
    descriptionUr: '۲۳ سالہ وحی میں الٰہی خطاب اور لہجے کی تدریج: انسانیت، اہلِ ایمان، اہلِ کتاب، منافقین اور رسولِ اکرمؐ',
  },
  {
    id: 'asma',
    labelEn: 'Asma-ul-Husna Chronology',
    labelUr: 'اسمائے حسنیٰ کا نزولی سفر',
    icon: <Crown className="w-4 h-4 text-amber-500" />,
    description: 'Chronological revelation timeline of the Names of Allah from Cave Hira to Ghadir Khumm',
    descriptionUr: 'غارِ حرا (الرَّبّ) سے غدیرِ خم اور سورۃ النصر (التَّوَّاب) تک اسمائے الٰہیہ کا ظہور',
  },
  {
    id: 'crisis',
    labelEn: 'Crisis Navigator',
    labelUr: 'اسبابِ نزول و بحران',
    icon: <ShieldAlert className="w-4 h-4 text-indigo-500" />,
    description: 'Situational intelligence timeline of inquiries, sieges, battlefields, and Ghadir Khumm',
    descriptionUr: 'غزوات، محاصروں اور تاریخی واقعات کے پس منظر میں نازل شدہ آیات',
  },
  {
    id: 'thematic',
    labelEn: 'Thematic Evolution',
    labelUr: 'تطوّرِ مضامین',
    icon: <Flame className="w-4 h-4 text-rose-500" />,
    description: '23-Year Heatmap tracing the shift from Tawhid and Akhirah to Law, Governance, and Wilayah',
    descriptionUr: 'توحید و معاد سے قانون و ولایت تک قرآنی مضامین کا ارتقائی ہیٹ میپ',
  },
  {
    id: 'map',
    labelEn: 'Geographic Map',
    labelUr: 'سفرنامۂ وحی (نقشہ)',
    icon: <MapPin className="w-4 h-4 text-emerald-600" />,
    description: 'Sacred cartographic terrain of Makkah, Madinah, Badr, Uhud, Hudaybiyyah, and Ghadir Khumm',
    descriptionUr: 'مکہ، مدینہ، بدر، احد، حدیبیہ اور غدیرِ خم کا جغرافیائی نقشہ',
  },
  {
    id: 'legislation',
    labelEn: 'Gradual Legislation',
    labelUr: 'تدریجِ احکام',
    icon: <Scale className="w-4 h-4 text-amber-500" />,
    description: 'The 4 stages of alcohol prohibition, qiblah shift, fasting, and gradual divine laws',
    descriptionUr: 'تحریمِ شراب، تغییرِ قبلہ اور روزے وغیرہ کے بتدریج ۴ مراحل',
  },
  {
    id: 'xray',
    labelEn: 'Surah X-Ray Matrix',
    labelUr: 'ایکس رے ڈیش بورڈ',
    icon: <Eye className="w-4 h-4 text-teal-500" />,
    description: '114-Surah bar matrix showing single descent vs segmented multi-part revelations',
    descriptionUr: 'تمام ۱۱۴ سورتوں کے یکبارگی یا ٹکڑوں میں نزول کا تفصیلی میٹرکس',
  },
  {
    id: 'flow',
    labelEn: 'Passage Flow & Linkage',
    labelUr: 'نزولی تسلسل و مقطوعات',
    icon: <GitBranch className="w-4 h-4 text-blue-500" />,
    description: 'Chronological timeline flow linking multi-part revelations across years (e.g. Al-Alaq Part 1 & 2)',
    descriptionUr: 'مختلف سالوں میں نازل شدہ حصوں کے باہمی تاریخی و نزولی رابطے',
  },
  {
    id: 'nature',
    labelEn: 'By Revelation Nature',
    labelUr: 'نزول کی نوعیت',
    icon: <Layers className="w-4 h-4 text-emerald-600" />,
    description: 'Explore Complete Surahs (نزولِ کلی) vs Segmented Chunks (نزولِ تدریجی)',
    descriptionUr: 'مکمل سورتیں (نزولِ کلی) بمقابلہ مرحلہ وار آیات (نزولِ تدریجی)',
  },
  {
    id: 'periods',
    labelEn: 'Makki vs Madani Periods',
    labelUr: 'مکی و مدنی ادوار',
    icon: <Clock className="w-4 h-4 text-amber-600" />,
    description: '5 Prophetic Eras from Cave Hira to Ghadeer Khumm & Farewell',
    descriptionUr: 'غارِ حرا سے غدیرِ خم تک رسالتِ مآبؐ کے ۵ سنہری تاریخی ادوار',
  },
  {
    id: 'comparison',
    labelEn: 'Nuzul vs Mushaf Mapping',
    labelUr: 'ترتیب کا تقابل',
    icon: <Split className="w-4 h-4 text-purple-600" />,
    description: 'Matrix comparison with historical revelation distance (Δ Gap)',
    descriptionUr: 'نزولی ترتیب اور مصحف کے درمیانی فاصلے (Δ Gap) کا مکمل موازنہ',
  },
  {
    id: 'future',
    labelEn: 'Future Perspectives',
    labelUr: 'توسیع پذیر مناظر',
    icon: <Sparkles className="w-4 h-4 text-cyan-500" />,
    description: 'Extensible registry for Comparative Sunnah/Shia & Thematic timelines',
    descriptionUr: 'مکاتبِ فکر کی تقابلی تواریخ اور کلامی مباحث کے نئے تحقیقی زاویے',
  },
];

export const PerspectivesView: React.FC = () => {
  const { setActiveEventOrder, setPerspectiveMode, language } = useQuran();
  const [activeTab, setActiveTab] = useState<PerspectiveTabId>('arc');

  // Sub-filter for Tab 1 (Nature)
  const [natureFilter, setNatureFilter] = useState<'all' | 'segmented' | 'complete'>('all');
  const [expandedSurah, setExpandedSurah] = useState<number | null>(null);

  // Sub-filter for Tab 2 (Periods)
  const [selectedPeriod, setSelectedPeriod] = useState<RevelationPeriod | 'All'>('All');

  // Search filter for Tab 3 (Comparison Matrix)
  const [matrixSearch, setMatrixSearch] = useState<string>('');

  const navigateToEvent = (order: number) => {
    setActiveEventOrder(order);
    setPerspectiveMode('nuzul');
  };

  return (
    <div className="w-full max-w-[1780px] mx-auto py-6 sm:py-8 px-2 sm:px-4 animate-fade-in">
      
      {/* Top Header Banner & Multi-Perspective Grid Suite */}
      <div className="mb-8 p-5 sm:p-7 lg:p-8 rounded-3xl sacred-glass sacred-border sacred-shadow">
        
        {/* Banner Top Info Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-[var(--border-subtle)]">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1.5">
              <Compass className="w-4 h-4 text-emerald-600" />
              <span>Multi-View Analytics & Historical Slices</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] flex flex-wrap items-baseline gap-2.5">
              <span className={language === 'en' ? 'font-sans' : 'font-urdu'}>
                {language === 'en' ? 'Multi-Perspective Analytical Suite' : 'مختلف مناظر و تجزیات'}
              </span>
              <span className="text-base sm:text-lg font-sans font-normal text-[var(--text-muted)]">
                {language === 'en' ? '(11 Dedicated Scholarly Perspectives)' : '(Research & Analytics Suite)'}
              </span>
            </h2>
            <p className={`text-xs sm:text-sm text-[var(--text-secondary)] mt-1.5 max-w-3xl leading-relaxed ${language === 'en' ? 'font-sans' : 'font-urdu'}`}>
              {language === 'en'
                ? 'Explore the 23-year prophetic revelation timeline through 11 multi-dimensional analytical perspectives: from divine interlocutors and situational crises to thematic heatmaps and gradual legislation.'
                : 'قرآن مجید کے ۲۳ سالہ زمانی و تاریخی نزول، اسبابِ نزول، جغرافیہ، اور ربطِ مصحف کے تمام ۱۱ تحقیقی مناظر میں سے مطلوبہ زاویہ منتخب فرمائیں:'}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
            <span className="px-3.5 py-1.5 rounded-xl bg-emerald-600/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/25 text-xs font-bold flex items-center gap-1.5 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span className={language === 'en' ? 'font-sans' : 'font-urdu'}>
                {language === 'en' ? '11 Research Perspectives' : 'کل ۱۱ تحقیقی مناظر (11 Views)'}
              </span>
            </span>
          </div>
        </div>

        {/* 11 Interactive Perspective Cards (Organized Multi-Column & Multi-Row Grid) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 pt-5">
          {PERSPECTIVE_TABS.map((tab, idx) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`p-3.5 sm:p-4 rounded-2xl border text-start transition-all cursor-pointer relative group flex flex-col justify-between ${
                  isActive
                    ? 'bg-gradient-to-br from-emerald-800 to-emerald-950 text-white border-emerald-700 shadow-md ring-2 ring-emerald-500/40 scale-[1.01]'
                    : 'bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-elevated)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-emerald-500/40 hover:shadow-xs hover:scale-[1.005]'
                }`}
              >
                {/* Card Top: Icon & Indicator */}
                <div className="flex items-center justify-between w-full mb-2.5">
                  <div className={`p-2 rounded-xl shrink-0 transition-colors ${
                    isActive ? 'bg-white/15 text-white' : 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 group-hover:bg-emerald-500/20'
                  }`}>
                    {tab.icon}
                  </div>
                  
                  <div className="flex items-center gap-1.5">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md font-sans ${
                      isActive ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-[var(--bg-surface-elevated)] text-[var(--text-muted)] border border-[var(--border-subtle)]'
                    }`}>
                      #{idx + 1}
                    </span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-amber-400 ring-4 ring-amber-400/25 animate-pulse" />
                    )}
                  </div>
                </div>

                {/* Card Middle: Titles */}
                <div>
                  <div className={`text-base font-bold leading-snug ${
                    language === 'en' ? 'font-sans' : 'font-urdu'
                  } ${
                    isActive ? 'text-white' : 'text-[var(--text-primary)] group-hover:text-emerald-700 dark:group-hover:text-emerald-300'
                  }`}>
                    {language === 'en' ? tab.labelEn : tab.labelUr}
                  </div>
                  <div className={`text-[11px] font-medium truncate mt-0.5 ${
                    language === 'en' ? 'font-urdu text-right' : 'font-sans'
                  } ${
                    isActive ? 'text-emerald-200' : 'text-[var(--text-muted)]'
                  }`}>
                    {language === 'en' ? tab.labelUr : tab.labelEn}
                  </div>
                </div>

                {/* Card Bottom: Concise 1-line Exegesis Description */}
                <div className={`text-[11px] line-clamp-2 leading-relaxed mt-2.5 pt-2 border-t ${
                  language === 'en' ? 'font-sans' : 'font-urdu'
                } ${
                  isActive ? 'text-emerald-100/90 border-white/15' : 'text-[var(--text-secondary)] border-[var(--border-subtle)]'
                }`}>
                  {language === 'en' ? tab.description : tab.descriptionUr}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── TAB: THE ARC OF RECONNECTION (محرابِ ربطِ مصحف) ── */}
      {activeTab === 'arc' && <ArcOfReconnectionView />}

      {/* ── TAB: THE DIVINE INTERLOCUTORS & AUDIENCE MATRIX (مخاطبینِ قرآن و اسالیبِ خطاب) ── */}
      {activeTab === 'interlocutors' && <AudienceMatrixView />}

      {/* ── TAB: ASMA-UL-HUSNA CHRONOLOGY (اسمائے حسنیٰ کا نزولی سفر) ── */}
      {activeTab === 'asma' && <AsmaUlHusnaChronologyView />}

      {/* ── TAB: ASBAB-UN-NUZUL & CRISIS NAVIGATOR (اسبابِ نزول و تاریخی بحران) ── */}
      {activeTab === 'crisis' && <AsbabCrisisNavigator />}

      {/* ── TAB: THEMATIC EVOLUTION HEATMAP (تطوّرِ مضامین) ── */}
      {activeTab === 'thematic' && <ThematicEvolutionHeatmap />}

      {/* ── TAB: GEOGRAPHIC REVELATION MAP (سفرنامۂ وحی — نقشہ) ── */}
      {activeTab === 'map' && <GeographicRevelationMap />}

      {/* ── TAB: GRADUAL LEGISLATION (تدریجِ احکام) ── */}
      {activeTab === 'legislation' && <GradualLegislationView />}

      {/* ── TAB: SURAH X-RAY / SEGMENTATION MATRIX (ایکس رے ڈیش بورڈ) ── */}
      {activeTab === 'xray' && <SurahXRayMatrixView />}

      {/* ── TAB: PASSAGE FLOW & SISTER LINKAGE (نزولی تسلسل و مقطوعات) ── */}
      {activeTab === 'flow' && <PassageFlowView />}

      {/* ── TAB 1: REVELATION NATURE (نزول کی نوعیت) ── */}
      {activeTab === 'nature' && (
        <div className="space-y-6 animate-fade-in">
          
          {/* Sub-Filters Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl sacred-glass sacred-border">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider flex items-center gap-1">
                <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                فلٹر برائے نزول (Filter by Nature):
              </span>
            </div>

            <div className="flex items-center gap-2 bg-[var(--bg-surface)] p-1 rounded-xl border border-[var(--border-subtle)]">
              <button
                onClick={() => setNatureFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  natureFilter === 'all'
                    ? 'bg-emerald-700 text-white shadow-sm'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                All (114 Surahs)
              </button>
              <button
                onClick={() => setNatureFilter('segmented')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  natureFilter === 'segmented'
                    ? 'bg-emerald-700 text-white shadow-sm font-bold'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Only Segmented (جزوی نزول)</span>
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-amber-500/20 text-amber-800 dark:text-amber-200 border border-amber-500/30">
                  {ALL_114_CHRONOLOGICAL_EVENTS.filter((e) => e.revelationNature === 'segmented_passage').length}
                </span>
              </button>
              <button
                onClick={() => setNatureFilter('complete')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  natureFilter === 'complete'
                    ? 'bg-emerald-700 text-white shadow-sm font-bold'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Only Complete (نزولِ کلی)</span>
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-700/40 text-emerald-100">
                  {ALL_114_CHRONOLOGICAL_EVENTS.filter((e) => e.revelationNature === 'complete_surah').length}
                </span>
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ALL_114_CHRONOLOGICAL_EVENTS.filter((evt) => {
              if (natureFilter === 'segmented') return evt.revelationNature === 'segmented_passage';
              if (natureFilter === 'complete') return evt.revelationNature === 'complete_surah';
              return true;
            }).map((evt) => {
              const isSegmented = evt.revelationNature === 'segmented_passage';
              const isExpanded = expandedSurah === evt.chronologicalOrder;

              return (
                <div
                  key={evt.chronologicalOrder}
                  className={`p-5 rounded-3xl sacred-border sacred-shadow transition-all relative overflow-hidden flex flex-col justify-between ${
                    isSegmented
                      ? 'bg-[var(--bg-surface-card)] hover:border-emerald-500/50 ring-1 ring-emerald-500/10'
                      : 'bg-[var(--bg-surface-card)] hover:border-emerald-500/50'
                  }`}
                >
                  <div>
                    {/* Header: Nuzul Rank & Badge */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2.5 py-1 rounded-xl text-xs font-bold bg-emerald-700 text-white">
                        نزول #{evt.chronologicalOrder}
                      </span>
                      <RevelationNatureBadge
                        nature={evt.revelationNature}
                        totalSegments={evt.totalSegmentsForSurah}
                        currentSegmentIndex={evt.currentSegmentIndex}
                        compact={true}
                      />
                    </div>

                    {/* Surah Name */}
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-base text-[var(--text-primary)] font-serif">
                          {evt.surahNameEnglish}
                        </h3>
                        <p className="text-xs text-[var(--text-muted)]">
                          Mushaf #{evt.mushafOrder} • {evt.totalVersesInSurah} Ayahs
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-xl font-bold font-arabic text-emerald-800 dark:text-emerald-300">
                          {evt.surahNameArabic}
                        </span>
                        <p className="text-xs text-[var(--text-secondary)] font-urdu">
                          {evt.surahNameUrdu}
                        </p>
                      </div>
                    </div>

                    {/* Context Summary */}
                    <p className="text-xs text-[var(--text-secondary)] font-urdu line-clamp-2 mt-2 leading-relaxed">
                      {evt.asbabUnNuzul.summaryUrdu}
                    </p>

                    {/* If Segmented, Show Historical Scattered Details Toggle */}
                    {isSegmented && (
                      <div className="mt-3 pt-3 border-t border-[var(--border-subtle)]">
                        <button
                          onClick={() => setExpandedSurah(isExpanded ? null : evt.chronologicalOrder)}
                          className="w-full text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 flex items-center justify-between hover:underline"
                        >
                          <span>Scattered Timeline Details (مختلف ادوار کے ٹکڑے)</span>
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>

                        {isExpanded && (
                          <div className="mt-2 p-3 rounded-2xl bg-emerald-950/5 dark:bg-emerald-950/30 border border-emerald-500/20 text-xs space-y-1.5 animate-fade-in">
                            <div className="text-[11px] font-bold text-emerald-900 dark:text-emerald-200 flex items-center gap-1">
                              <Layers className="w-3 h-3 text-amber-500" />
                              <span>23-Year Scattered Revelation Points:</span>
                            </div>
                            <div className="text-[11px] text-[var(--text-secondary)]">
                              • <strong>Initial Passage:</strong> Verses {evt.verseRange.fromVerse}–{evt.isWholeSurah ? evt.totalVersesInSurah : evt.verseRange.toVerse} ({evt.location})
                            </div>
                            <div className="text-[11px] text-[var(--text-secondary)]">
                              • <strong>Historical Era:</strong> {evt.revelationPeriod} ({evt.approximateYearCE} CE)
                            </div>
                            <div className="text-[10px] text-[var(--text-muted)] italic font-urdu mt-1">
                              مفسرین و محدثین کے مطابق اس سورت کے بقیہ اجزاء بعد کے مراحل میں معین مواقع پر نازل ہوئے۔
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Read Now CTA */}
                  <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between">
                    <span className="text-[11px] text-[var(--text-muted)] flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-emerald-700 dark:text-emerald-400" />
                      <span className="truncate max-w-[140px]">{evt.location}</span>
                    </span>
                    <button
                      onClick={() => navigateToEvent(evt.chronologicalOrder)}
                      className="px-3 py-1 rounded-xl bg-emerald-700/10 hover:bg-emerald-700 text-emerald-700 dark:text-emerald-300 hover:text-white text-xs font-semibold transition-all flex items-center gap-1"
                    >
                      <span>مطالعہ کریں</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* ── TAB 2: MAKKI VS MADANI PERIODS (مکی و مدنی ادوار) ── */}
      {activeTab === 'periods' && (
        <div className="space-y-6 animate-fade-in">
          
          {/* 5 Epochs Navigation Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {[
              {
                period: 'Early Meccan',
                labelUr: 'ابتداءِ بعثت (مکی اول)',
                timeCE: '610–615 CE',
                timeNabawi: '1st–5th Year Nabawi',
                desc: 'غارِ حرا، پہلی وحی، اور خفیہ دعوت سے علانیہ انذار تک',
                count: ALL_114_CHRONOLOGICAL_EVENTS.filter(e => e.revelationPeriod === 'Early Meccan').length,
              },
              {
                period: 'Mid Meccan',
                labelUr: 'شعب ابی طالب و معراج',
                timeCE: '615–619 CE',
                timeNabawi: '6th–10th Year Nabawi',
                desc: 'قریش کا معاشی محاصرہ، عام الحزن اور آسمانی معراج',
                count: ALL_114_CHRONOLOGICAL_EVENTS.filter(e => e.revelationPeriod === 'Mid Meccan').length,
              },
              {
                period: 'Late Meccan',
                labelUr: 'ہجرت سے قبل (مکی اواخر)',
                timeCE: '620–622 CE',
                timeNabawi: '11th–13th Year Nabawi',
                desc: 'بیعتِ عقبہ، لیلۃ المبیت اور ہجرتِ یثرب کی تیاریاں',
                count: ALL_114_CHRONOLOGICAL_EVENTS.filter(e => e.revelationPeriod === 'Late Meccan').length,
              },
              {
                period: 'Early Medinan',
                labelUr: 'بنیادِ ریاست و غزوات',
                timeCE: '622–627 CE',
                timeNabawi: '1–5 Hijri',
                desc: 'مسجدِ نبوی، مواخات، بدر، احد اور غزوہ احزاب کے احکام',
                count: ALL_114_CHRONOLOGICAL_EVENTS.filter(e => e.revelationPeriod === 'Early Medinan').length,
              },
              {
                period: 'Late Medinan',
                labelUr: 'تکمیلِ دین و غدیر خم',
                timeCE: '628–632 CE',
                timeNabawi: '6–11 Hijri',
                desc: 'صلح حدیبیہ، فتح مکہ، مباہلہ، حجۃ الوداع اور واقعہ غدیر خم',
                count: ALL_114_CHRONOLOGICAL_EVENTS.filter(e => e.revelationPeriod === 'Late Medinan').length,
              },
            ].map((epoch) => {
              const isSelected = selectedPeriod === epoch.period;
              return (
                <button
                  key={epoch.period}
                  onClick={() => setSelectedPeriod(isSelected ? 'All' : epoch.period as any)}
                  className={`p-4 rounded-3xl border text-left transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-emerald-700 text-white border-emerald-700 shadow-lg scale-[1.02]'
                      : 'bg-[var(--bg-surface-card)] border-[var(--border-subtle)] hover:border-emerald-500/40 text-[var(--text-primary)]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                        isSelected ? 'bg-emerald-900 text-emerald-100' : 'bg-emerald-500/10 text-emerald-800 dark:text-emerald-300'
                      }`}>
                        {epoch.timeCE}
                      </span>
                      <span className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-emerald-700 dark:text-emerald-400'}`}>
                        {epoch.count} سورتیں
                      </span>
                    </div>

                    <h4 className="font-bold text-sm font-urdu mb-1">
                      {epoch.labelUr}
                    </h4>
                    <p className={`text-[11px] leading-relaxed line-clamp-2 ${
                      isSelected ? 'text-emerald-100' : 'text-[var(--text-muted)]'
                    }`}>
                      {epoch.desc}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-white/20 text-[10px] font-medium opacity-80">
                    {epoch.timeNabawi}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Surahs matching selected period */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-[var(--text-muted)] font-semibold">
              <span>
                Showing {selectedPeriod === 'All' ? 'All 114 Surahs' : `${selectedPeriod} Revelations`}
              </span>
              {selectedPeriod !== 'All' && (
                <button
                  onClick={() => setSelectedPeriod('All')}
                  className="text-emerald-700 dark:text-emerald-400 hover:underline"
                >
                  Reset to All Periods
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {ALL_114_CHRONOLOGICAL_EVENTS.filter((e) => {
                if (selectedPeriod === 'All') return true;
                return e.revelationPeriod === selectedPeriod;
              }).map((evt) => (
                <div
                  key={evt.chronologicalOrder}
                  onClick={() => navigateToEvent(evt.chronologicalOrder)}
                  className="p-4 rounded-2xl sacred-border bg-[var(--bg-surface-card)] hover:border-emerald-600 hover:ring-2 hover:ring-emerald-500/20 cursor-pointer transition-all flex items-center justify-between group"
                >
                  <div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="px-2 py-0.2 rounded text-[10px] font-bold bg-emerald-700 text-white">
                        #{evt.chronologicalOrder}
                      </span>
                      <span className="text-[11px] font-serif font-bold text-[var(--text-primary)]">
                        {evt.surahNameEnglish}
                      </span>
                    </div>
                    <div className="text-[10px] text-[var(--text-muted)]">
                      Mushaf #{evt.mushafOrder} • {evt.approximateYearCE} CE
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-bold font-arabic text-emerald-800 dark:text-emerald-300">
                      {evt.surahNameArabic}
                    </span>
                    <p className="text-[10px] text-[var(--text-secondary)] font-urdu">
                      {evt.surahNameUrdu}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ── TAB 3: CHRONOLOGICAL VS MUSHAF MAPPING (ترتیب کا تقابل) ── */}
      {activeTab === 'comparison' && (
        <div className="space-y-4 animate-fade-in">
          
          {/* Explanatory Banner & Search */}
          <div className="p-5 rounded-3xl sacred-glass sacred-border flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-lg font-serif text-[var(--text-primary)]">
                Matrix Mapping: Tarteeb-e-Nuzuli vs. Tarteeb-e-Mushaf
              </h3>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                Observe the <strong>Historical Distance (Δ Delta)</strong> between where each Surah appears in the canonical Mushaf compared to when it was actually revealed.
              </p>
            </div>

            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
              <input
                type="text"
                value={matrixSearch}
                onChange={(e) => setMatrixSearch(e.target.value)}
                placeholder="Filter by Surah name or #..."
                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
              />
            </div>
          </div>

          {/* Matrix Table */}
          <div className="overflow-x-auto rounded-3xl sacred-border bg-[var(--bg-surface-card)]">
            <table className="w-full text-left text-xs">
              <thead className="bg-[var(--bg-surface)] border-b border-[var(--border-subtle)] text-[var(--text-muted)] uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3.5 px-4 font-bold">Nuzul Rank (ترتیبِ نزول)</th>
                  <th className="py-3.5 px-4 font-bold">Surah Name (سورت)</th>
                  <th className="py-3.5 px-4 font-bold">Standard Mushaf #</th>
                  <th className="py-3.5 px-4 font-bold">Historical Delta (Δ Gap)</th>
                  <th className="py-3.5 px-4 font-bold">Revelation Epoch</th>
                  <th className="py-3.5 px-4 font-bold">Nature</th>
                  <th className="py-3.5 px-4 text-right font-bold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                {ALL_114_CHRONOLOGICAL_EVENTS.filter((evt) => {
                  if (!matrixSearch) return true;
                  const q = matrixSearch.toLowerCase();
                  return (
                    evt.surahNameEnglish.toLowerCase().includes(q) ||
                    evt.surahNameArabic.includes(q) ||
                    evt.surahNameUrdu.includes(q) ||
                    String(evt.chronologicalOrder).includes(q) ||
                    String(evt.mushafOrder).includes(q)
                  );
                }).map((evt) => {
                  const delta = Math.abs(evt.chronologicalOrder - evt.mushafOrder);
                  const isHighDelta = delta >= 50;

                  return (
                    <tr
                      key={evt.chronologicalOrder}
                      className="hover:bg-[var(--bg-surface)] transition-colors"
                    >
                      <td className="py-3 px-4 font-bold text-emerald-700 dark:text-emerald-400">
                        #{evt.chronologicalOrder}
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-bold text-[var(--text-primary)] font-serif">
                          {evt.surahNameEnglish}
                        </div>
                        <div className="text-[11px] text-[var(--text-muted)] font-arabic">
                          {evt.surahNameArabic} • {evt.surahNameUrdu}
                        </div>
                      </td>
                      <td className="py-3 px-4 font-semibold text-[var(--text-primary)]">
                        Mushaf #{evt.mushafOrder} ({evt.totalVersesInSurah} Ayahs)
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                            isHighDelta
                              ? 'bg-red-500/10 text-red-700 dark:text-red-300 border border-red-500/20'
                              : 'bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20'
                          }`}
                        >
                          Δ {delta} positions
                        </span>
                      </td>
                      <td className="py-3 px-4 text-[var(--text-secondary)]">
                        {evt.revelationPeriod} ({evt.approximateYearCE} CE)
                      </td>
                      <td className="py-3 px-4">
                        <RevelationNatureBadge
                          nature={evt.revelationNature}
                          totalSegments={evt.totalSegmentsForSurah}
                          currentSegmentIndex={evt.currentSegmentIndex}
                          compact={true}
                        />
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => navigateToEvent(evt.chronologicalOrder)}
                          className="px-2.5 py-1 rounded-lg bg-emerald-700/10 hover:bg-emerald-700 text-emerald-700 dark:text-emerald-300 hover:text-white font-semibold transition-all"
                        >
                          Read
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

        </div>
      )}

      {/* ── TAB 4: FUTURE PERSPECTIVES (توسیع پذیر مناظر) ── */}
      {activeTab === 'future' && (
        <div className="space-y-6 animate-fade-in">
          
          <div className="p-6 rounded-3xl sacred-glass sacred-border">
            <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Extensible Modular Perspectives Architecture</span>
            </div>
            <h3 className="font-bold text-xl font-serif text-[var(--text-primary)] mb-2">
              توسیع پذیر مناظر (Modular Registry & Roadmap)
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed max-w-3xl">
              This analytics container is architected via a modular registry pattern (<code className="font-mono text-emerald-700 dark:text-emerald-400">PERSPECTIVE_TABS</code>), allowing effortless plug-and-play addition of future historical dimensions and scholarly viewpoints.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Future Perspective 1: Sunni vs Shia Chronology Comparative View */}
            <div className="p-6 rounded-3xl sacred-border bg-[var(--bg-surface-card)] border-dashed border-2 border-[var(--border-subtle)] space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/15 text-amber-700 dark:text-amber-300 flex items-center justify-center font-bold">
                ۱
              </div>
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-600/15 text-emerald-800 dark:text-emerald-300">
                  Ready for Activation
                </span>
                <h4 className="font-bold text-base text-[var(--text-primary)] mt-2 font-serif">
                  Ahl-as-Sunnah vs. Shia Chronology Comparative View
                </h4>
                <p className="text-xs text-[var(--text-secondary)] font-urdu mt-1 leading-relaxed">
                  موازنہ روایاتِ شیعہ (التمہید فی علوم القرآن و مصحفِ امیر المؤمنینؑ) و روایاتِ اہلِ سنت (الاتقان فی علوم القرآن للسیوطی و اسباب النزول للواحدی)۔
                </p>
                <p className="text-xs text-[var(--text-muted)] mt-2 leading-relaxed">
                  Compare scholarly variations in chronological sequence between traditional Shia chains and classical Sunni chronological traditions side by side with footnote citations.
                </p>
              </div>
              <div className="pt-2 text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold">
                ● Data model already equipped with <code className="font-mono">scholarlyNotes</code> & <code className="font-mono">comparativeNote</code> hooks.
              </div>
            </div>

            {/* Future Perspective 2: Subject / Thematic Chronology */}
            <div className="p-6 rounded-3xl sacred-border bg-[var(--bg-surface-card)] border-dashed border-2 border-[var(--border-subtle)] space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
                ۲
              </div>
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-700 dark:text-emerald-300">
                  Thematic Pipeline
                </span>
                <h4 className="font-bold text-base text-[var(--text-primary)] mt-2 font-serif">
                  Thematic Chronology & Legislative Evolution (تاریخی موضوعات)
                </h4>
                <p className="text-xs text-[var(--text-secondary)] font-urdu mt-1 leading-relaxed">
                  موضوعاتی مطالعہ: تدریجی احکام و تشریع (نماز، روزہ، زکوٰۃ، خمس، جہاد، حج)، اخلاقیات و عقائد کا ارتقاء۔
                </p>
                <p className="text-xs text-[var(--text-muted)] mt-2 leading-relaxed">
                  Analyze the chronological emergence of specific Islamic subjects over time: How Islamic legislation unfolded progressively in response to real-world community milestones.
                </p>
              </div>
              <div className="pt-2 text-[11px] text-emerald-600 font-semibold">
                ● Ready for thematic playlist tags & categorization.
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
