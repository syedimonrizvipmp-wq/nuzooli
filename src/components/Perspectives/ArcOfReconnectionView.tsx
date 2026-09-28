import React, { useState, useMemo, useEffect } from 'react';
import { useQuran } from '@/context/QuranContext';
import { ALL_114_CHRONOLOGICAL_EVENTS } from '@/data/allChronologicalEvents';
import { CHRONOLOGICAL_PASSAGE_FLOW } from '@/data/passageFlowData';
import {
  Sparkles,
  ArrowRight,
  Split,
  Layers,
  CheckCircle2,
  Info,
  Clock,
  GitCompare,
  TrendingUp,
  Anchor,
  Compass,
  LayoutGrid,
  Sliders,
  Eye,
  Palette,
  Hash,
  Smartphone,
  Maximize2,
  Minimize2,
  Lock,
  Unlock,
  Link2,
} from 'lucide-react';

interface ArcConnection {
  id: string;
  surahNumber: number;
  nuzulRank: number;
  mushafOrder: number;
  surahNameEnglish: string;
  surahNameArabic: string;
  surahNameUrdu: string;
  yearCE: number;
  yearLabel: string;
  location: string;
  period: string;
  isSegmented: boolean;
  segmentIndex?: number;
  totalSegments?: number;
  verseRange?: string;
  color: string;
  delta: number;
}

type ChartViewMode = 'timeline' | 'order_comparison' | 'delta_spectrum' | 'all';

export const ArcOfReconnectionView: React.FC = () => {
  const { setActiveEventOrder, setPerspectiveMode } = useQuran();

  const [chartViewMode, setChartViewMode] = useState<ChartViewMode>('order_comparison');
  const [activeFilter, setActiveFilter] = useState<'all' | 'segmented' | 'high_delta' | 'meccan' | 'medinan'>('all');
  const [hoveredSurahNum, setHoveredSurahNum] = useState<number | null>(null);
  const [selectedSurahNum, setSelectedSurahNum] = useState<number | null>(3); // Default to Aal-e-Imran to demonstrate fix
  const [deltaSearchQuery, setDeltaSearchQuery] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  };

  // Readability & Display Options (Checkboxes & Toggles)
  type BeadSize = 'regular' | 'large' | 'jumbo';
  const [beadSize, setBeadSize] = useState<BeadSize>(() => {
    const saved = localStorage.getItem('tarteeb_arc_bead_size') as BeadSize | null;
    if (saved === 'regular' || saved === 'large' || saved === 'jumbo') return saved;
    const oldLarge = localStorage.getItem('tarteeb_arc_large_beads');
    return oldLarge === 'false' ? 'regular' : 'large';
  });

  const cycleBeadSize = () => {
    setBeadSize((prev) => {
      const next: BeadSize = prev === 'regular' ? 'large' : prev === 'large' ? 'jumbo' : 'regular';
      localStorage.setItem('tarteeb_arc_bead_size', next);
      localStorage.setItem('tarteeb_arc_large_beads', String(next !== 'regular'));
      return next;
    });
  };

  const isLargeBeads = beadSize !== 'regular';

  // Chapter Lock State: When enabled, mouse hover will not change the active Surah
  const [isLockedChapter, setIsLockedChapter] = useState<boolean>(() => {
    const saved = localStorage.getItem('tarteeb_arc_locked_chapter');
    return saved === 'true';
  });

  const toggleLockChapter = () => {
    setIsLockedChapter((prev) => {
      const next = !prev;
      localStorage.setItem('tarteeb_arc_locked_chapter', String(next));
      return next;
    });
  };

  // Synchronize Selection across all charts & views
  const [isSyncAllCharts, setIsSyncAllCharts] = useState<boolean>(() => {
    const saved = localStorage.getItem('tarteeb_arc_sync_all');
    return saved !== null ? saved === 'true' : true;
  });

  const toggleSyncAllCharts = () => {
    setIsSyncAllCharts((prev) => {
      const next = !prev;
      localStorage.setItem('tarteeb_arc_sync_all', String(next));
      return next;
    });
  };

  const [isColorCoded, setIsColorCoded] = useState<boolean>(() => {
    const saved = localStorage.getItem('tarteeb_arc_color_coded');
    return saved !== null ? saved === 'true' : true;
  });
  const [isShowNumbers, setIsShowNumbers] = useState<boolean>(() => {
    const saved = localStorage.getItem('tarteeb_arc_show_numbers');
    return saved === 'true';
  });
  const [isMobileHdScroll, setIsMobileHdScroll] = useState<boolean>(() => {
    const saved = localStorage.getItem('tarteeb_arc_mobile_scroll');
    return saved !== null ? saved === 'true' : true;
  });

  const toggleColorCoded = () => {
    setIsColorCoded((prev) => {
      const next = !prev;
      localStorage.setItem('tarteeb_arc_color_coded', String(next));
      return next;
    });
  };

  const toggleShowNumbers = () => {
    setIsShowNumbers((prev) => {
      const next = !prev;
      localStorage.setItem('tarteeb_arc_show_numbers', String(next));
      return next;
    });
  };

  const toggleMobileHdScroll = () => {
    setIsMobileHdScroll((prev) => {
      const next = !prev;
      localStorage.setItem('tarteeb_arc_mobile_scroll', String(next));
      return next;
    });
  };

  // Helper to format Hijri & CE year labels
  const formatYear = (ce: number, hijri?: number, nabawi?: number): string => {
    if (hijri) {
      return `${hijri} AH (${ce} CE)`;
    }
    if (nabawi) {
      const bh = 14 - nabawi;
      return bh > 0 ? `${ce} CE (${bh} BH)` : `${ce} CE (1 AH)`;
    }
    return `${ce} CE`;
  };

  // Period color mapping
  const getPeriodColor = (period: string): string => {
    switch (period) {
      case 'Early Meccan':
        return '#D97706'; // Amber-gold
      case 'Mid Meccan':
        return '#B45309'; // Dark Amber
      case 'Late Meccan':
        return '#EA580C'; // Orange
      case 'Early Medinan':
        return '#059669'; // Emerald
      case 'Late Medinan':
        return '#0284C7'; // Sky Blue
      default:
        return '#D97706';
    }
  };

  // Build 23-Year Historical Timeline Arc connections (with multi-part converging arcs)
  const timelineArcs: ArcConnection[] = useMemo(() => {
    const list: ArcConnection[] = [];

    ALL_114_CHRONOLOGICAL_EVENTS.forEach((evt) => {
      const isSegmented = evt.revelationNature === 'segmented_passage';
      const flowParts = CHRONOLOGICAL_PASSAGE_FLOW.filter((p) => p.surahNumber === evt.mushafOrder);

      if (flowParts.length > 1) {
        // Multi-part converging arcs
        flowParts.forEach((part) => {
          const yearStr = part.yearNabawiOrHijri 
            ? (part.yearNabawiOrHijri.includes(String(part.yearCE)) 
                ? part.yearNabawiOrHijri 
                : `${part.yearNabawiOrHijri} (${part.yearCE} CE)`)
            : `${part.yearCE} CE`;

          const nuzulRank = part.chronologicalRank114 || evt.chronologicalOrder;
          const partDelta = Math.abs(nuzulRank - evt.mushafOrder);

          let partPeriod = evt.revelationPeriod;
          if (part.yearCE >= 622) {
            partPeriod = part.yearCE >= 628 ? 'Late Medinan' : 'Early Medinan';
          } else if (part.yearCE >= 619) {
            partPeriod = 'Late Meccan';
          } else if (part.yearCE >= 615) {
            partPeriod = 'Mid Meccan';
          } else {
            partPeriod = 'Early Meccan';
          }

          list.push({
            id: `timeline-arc-${evt.mushafOrder}-p${part.segmentIndex}`,
            surahNumber: evt.mushafOrder,
            nuzulRank,
            mushafOrder: evt.mushafOrder,
            surahNameEnglish: evt.surahNameEnglish,
            surahNameArabic: evt.surahNameArabic,
            surahNameUrdu: evt.surahNameUrdu,
            yearCE: part.yearCE,
            yearLabel: yearStr,
            location: part.location,
            period: partPeriod,
            isSegmented: true,
            segmentIndex: part.segmentIndex,
            totalSegments: part.totalSegments,
            verseRange: `Ayahs ${part.verseRange.fromVerse}–${part.verseRange.toVerse}`,
            color: part.colorCode || getPeriodColor(partPeriod),
            delta: partDelta,
          });
        });
      } else {
        // Single descent arc
        const yearStr = formatYear(evt.approximateYearCE, evt.hijriYear, evt.approximateYearNabawi);
        const delta = Math.abs(evt.chronologicalOrder - evt.mushafOrder);

        list.push({
          id: `timeline-arc-${evt.mushafOrder}`,
          surahNumber: evt.mushafOrder,
          nuzulRank: evt.chronologicalOrder,
          mushafOrder: evt.mushafOrder,
          surahNameEnglish: evt.surahNameEnglish,
          surahNameArabic: evt.surahNameArabic,
          surahNameUrdu: evt.surahNameUrdu,
          yearCE: evt.approximateYearCE,
          yearLabel: yearStr,
          location: evt.location,
          period: evt.revelationPeriod,
          isSegmented,
          color: getPeriodColor(evt.revelationPeriod),
          delta,
        });
      }
    });

    return list;
  }, []);

  // Build Pure 1-to-1 Order Comparison Arcs (Strict 114 Nuzul dots to 114 Mushaf dots)
  const pureOrderArcs: ArcConnection[] = useMemo(() => {
    return ALL_114_CHRONOLOGICAL_EVENTS.map((evt) => {
      const delta = Math.abs(evt.chronologicalOrder - evt.mushafOrder);
      const yearStr = formatYear(evt.approximateYearCE, evt.hijriYear, evt.approximateYearNabawi);

      return {
        id: `pure-order-${evt.mushafOrder}`,
        surahNumber: evt.mushafOrder,
        nuzulRank: evt.chronologicalOrder, // 1 to 114
        mushafOrder: evt.mushafOrder,       // 1 to 114
        surahNameEnglish: evt.surahNameEnglish,
        surahNameArabic: evt.surahNameArabic,
        surahNameUrdu: evt.surahNameUrdu,
        yearCE: evt.approximateYearCE,
        yearLabel: yearStr,
        location: evt.location,
        period: evt.revelationPeriod,
        isSegmented: evt.revelationNature === 'segmented_passage',
        color: getPeriodColor(evt.revelationPeriod),
        delta,
      };
    });
  }, []);

  // Filtered arcs for timeline
  const filteredTimelineArcs = useMemo(() => {
    return timelineArcs.filter((arc) => {
      if (activeFilter === 'segmented') return arc.isSegmented;
      if (activeFilter === 'high_delta') return arc.delta >= 40;
      if (activeFilter === 'meccan') return arc.period.includes('Meccan');
      if (activeFilter === 'medinan') return arc.period.includes('Medinan');
      return true;
    });
  }, [timelineArcs, activeFilter]);

  // Filtered arcs for pure order
  const filteredPureArcs = useMemo(() => {
    return pureOrderArcs.filter((arc) => {
      if (activeFilter === 'segmented') return arc.isSegmented;
      if (activeFilter === 'high_delta') return arc.delta >= 40;
      if (activeFilter === 'meccan') return arc.period.includes('Meccan');
      if (activeFilter === 'medinan') return arc.period.includes('Medinan');
      return true;
    });
  }, [pureOrderArcs, activeFilter]);

  const [hoveredRail, setHoveredRail] = useState<'top' | 'bottom' | null>(null);

  // Active surah state: When locked, mouse hover is ignored for the permanent selection,
  // but hoveredSurahNum can still drive the live inspection HUD so the user gets instant feedback
  const activeSurahNumber = isLockedChapter
    ? (selectedSurahNum ?? 3)
    : (hoveredSurahNum ?? selectedSurahNum ?? 3);

  // Inspected Surah for the Live Inspection HUD (tracks hover if active, else falls back to selected)
  const inspectedSurahNumber = hoveredSurahNum ?? activeSurahNumber ?? selectedSurahNum ?? 3;

  const handleSurahHover = (mushafOrder: number | null, rail: 'top' | 'bottom' | null = null) => {
    setHoveredSurahNum(mushafOrder);
    setHoveredRail(rail);
  };

  const handleSurahSelect = (mushafOrder: number) => {
    setSelectedSurahNum(mushafOrder);
    setHoveredSurahNum(null);
    setHoveredRail(null);
  };

  const activeSurahDetails = useMemo(() => {
    if (!activeSurahNumber) return null;
    return ALL_114_CHRONOLOGICAL_EVENTS.find((e) => e.mushafOrder === activeSurahNumber) || null;
  }, [activeSurahNumber]);

  const inspectedSurahDetails = useMemo(() => {
    return ALL_114_CHRONOLOGICAL_EVENTS.find((e) => e.mushafOrder === inspectedSurahNumber) || ALL_114_CHRONOLOGICAL_EVENTS[2];
  }, [inspectedSurahNumber]);

  const inspectedDelta = useMemo(() => {
    return Math.abs(inspectedSurahDetails.chronologicalOrder - inspectedSurahDetails.mushafOrder);
  }, [inspectedSurahDetails]);

  const activeTimelineArcs = useMemo(() => {
    if (!activeSurahNumber) return [];
    return timelineArcs.filter((a) => a.surahNumber === activeSurahNumber);
  }, [activeSurahNumber, timelineArcs]);

  const activePureArc = useMemo(() => {
    if (!activeSurahNumber) return null;
    return pureOrderArcs.find((a) => a.surahNumber === activeSurahNumber) || null;
  }, [activeSurahNumber, pureOrderArcs]);

  const inspectedPureArc = useMemo(() => {
    return pureOrderArcs.find((a) => a.surahNumber === inspectedSurahNumber) || pureOrderArcs[2];
  }, [inspectedSurahNumber, pureOrderArcs]);

  const navigateToReader = (order: number) => {
    setActiveEventOrder(order);
    setPerspectiveMode('nuzul');
  };

  // Dynamic Live Hover & Inspection HUD with massive typography on both displays
  const renderLiveInspectionHUD = (chartTitle: string) => {
    return (
      <div className="relative rounded-3xl bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-sky-500/10 border-2 border-emerald-500/35 p-3.5 sm:p-5 shadow-lg transition-all duration-300 backdrop-blur-xs select-none">
        <div className="flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-4">
          
          {/* Left/Center Column: Massive Surah Name & Identity */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5 min-w-0">
            {/* Arabic Calligraphy (Massive & High Contrast) */}
            <div className="shrink-0">
              <span className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-arabic text-emerald-800 dark:text-emerald-300 block drop-shadow-sm leading-none">
                {inspectedSurahDetails.surahNameArabic}
              </span>
            </div>

            {/* English & Urdu Titles */}
            <div className="min-w-0 flex flex-col justify-center">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="text-2xl sm:text-3xl lg:text-4xl font-black font-serif text-[var(--text-primary)] tracking-tight">
                  {inspectedSurahDetails.surahNameEnglish}
                </span>
                <span className="text-xs sm:text-sm font-semibold text-[var(--text-muted)] bg-[var(--bg-surface)] px-2 py-0.5 rounded-lg border border-[var(--border-subtle)]">
                  {inspectedSurahDetails.totalVersesInSurah} آیات (Ayahs)
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2 mt-1 sm:mt-1.5 text-xs sm:text-sm">
                <span className="font-urdu font-bold text-base sm:text-lg text-[var(--text-secondary)]">
                  {inspectedSurahDetails.surahNameUrdu}
                </span>
                <span className="text-[var(--text-muted)] font-bold">•</span>
                <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                  {inspectedSurahDetails.revelationPeriod}
                </span>
                <span className="text-[var(--text-muted)] font-bold">•</span>
                <span className="font-bold text-amber-700 dark:text-amber-400">
                  📅 {activeTimelineArcs[0]?.yearLabel || `${inspectedSurahDetails.approximateYearCE} CE`}
                </span>
                <span className="text-[var(--text-muted)] font-bold">•</span>
                <span className="font-extrabold text-purple-700 dark:text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded-md border border-purple-500/30">
                  فاصلاتی تغیر: Δ {inspectedDelta}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Both Displays Prominent Highlight Cards */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 sm:gap-3.5 shrink-0 justify-between sm:justify-end">
            
            {/* Display 1: Top Rail (ترتیبِ نزول) */}
            <div className={`flex-1 sm:flex-initial min-w-[130px] flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl border transition-all ${
              hoveredRail === 'top'
                ? 'bg-amber-500/25 border-amber-500 shadow-md ring-2 ring-amber-400/80 scale-105'
                : 'bg-amber-500/10 border-amber-500/35 hover:border-amber-500'
            }`}>
              <div className="w-3.5 h-3.5 rounded-full bg-amber-500 shrink-0 shadow-xs animate-pulse"></div>
              <div className="flex flex-col">
                <span className="text-[10px] sm:text-[11px] font-urdu font-extrabold text-amber-900 dark:text-amber-200 uppercase leading-none">
                  ڈسپلے ۱: ترتیبِ نزول
                </span>
                <span className="text-xl sm:text-2xl lg:text-3xl font-black font-sans text-amber-800 dark:text-amber-300 leading-tight">
                  #{inspectedSurahDetails.chronologicalOrder}
                </span>
              </div>
            </div>

            {/* Bidirectional Connector Icon */}
            <div className="hidden sm:flex text-gray-400 dark:text-gray-500 font-extrabold text-lg sm:text-xl shrink-0 px-1">
              ⇄
            </div>

            {/* Display 2: Bottom Rail (ترتیبِ مصحف) */}
            <div className={`flex-1 sm:flex-initial min-w-[130px] flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl border transition-all ${
              hoveredRail === 'bottom'
                ? 'bg-sky-500/25 border-sky-500 shadow-md ring-2 ring-sky-400/80 scale-105'
                : 'bg-sky-500/10 border-sky-500/35 hover:border-sky-500'
            }`}>
              <div className="w-3.5 h-3.5 rounded-full bg-sky-500 shrink-0 shadow-xs animate-pulse"></div>
              <div className="flex flex-col">
                <span className="text-[10px] sm:text-[11px] font-urdu font-extrabold text-sky-900 dark:text-sky-200 uppercase leading-none">
                  ڈسپلے ۲: ترتیبِ مصحف
                </span>
                <span className="text-xl sm:text-2xl lg:text-3xl font-black font-sans text-sky-800 dark:text-sky-300 leading-tight">
                  #{inspectedSurahDetails.mushafOrder}
                </span>
              </div>
            </div>

            {/* Quick Actions (Lock / Unlock & Read) */}
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => {
                  setSelectedSurahNum(inspectedSurahDetails.mushafOrder);
                  toggleLockChapter();
                }}
                className={`min-h-[44px] px-3.5 py-2 rounded-xl border text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 shadow-xs ${
                  isLockedChapter && selectedSurahNum === inspectedSurahDetails.mushafOrder
                    ? 'bg-amber-500 text-black border-amber-600 font-extrabold'
                    : 'bg-[var(--bg-surface-elevated)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-amber-500'
                }`}
                title={isLockedChapter ? 'سورت مقفل ہے (کلک کر کے ان لاک کریں)' : 'اس سورت کو مقفل کریں'}
              >
                {isLockedChapter && selectedSurahNum === inspectedSurahDetails.mushafOrder ? (
                  <Lock className="w-4 h-4 text-black shrink-0" />
                ) : (
                  <Unlock className="w-4 h-4 text-gray-400 shrink-0" />
                )}
                <span className="font-urdu">
                  {isLockedChapter && selectedSurahNum === inspectedSurahDetails.mushafOrder ? 'مقفل' : 'لاک'}
                </span>
              </button>

              <button
                onClick={() => navigateToReader(inspectedSurahDetails.chronologicalOrder)}
                className="min-h-[44px] px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-700 to-teal-700 hover:from-emerald-800 hover:to-teal-800 text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 shadow-md shrink-0"
                title="اس سورت کی تلاوت کریں (Read Surah)"
              >
                <span className="font-urdu">تلاوت</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

        {/* Live Active Hover Status Strip */}
        <div className="mt-2.5 pt-2 border-t border-[var(--border-subtle)]/70 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px] sm:text-xs text-[var(--text-muted)] font-urdu">
          <div className="flex items-center gap-2">
            {hoveredSurahNum ? (
              <span className="text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1.5 animate-pulse">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
                <span>
                  {hoveredRail === 'top'
                    ? `ماؤس بالائی ڈسپلے (نزولی پٹری) پر سورۃ #${inspectedSurahDetails.chronologicalOrder} (${inspectedSurahDetails.surahNameEnglish}) پر ہے`
                    : `ماؤس زیریں ڈسپلے (مصحفی پٹری) پر سورۃ #${inspectedSurahDetails.mushafOrder} (${inspectedSurahDetails.surahNameEnglish}) پر ہے`}
                </span>
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>ماؤس کو کسی بھی نقطے (Dot) پر لے جائیں یا موبائل پر ٹیپ کریں — فوری معائنہ حاضر ہے</span>
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 text-[10px] sm:text-[11px]">
            <span className="text-[var(--text-muted)] font-sans">{chartTitle}</span>
            {isLockedChapter && (
              <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-900 dark:text-amber-200 font-bold border border-amber-500/30">
                🔒 چیپٹر لاک فعال
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Dual-rail coordinates with expansive breathing space between beads
  const svgWidth = 2260; // 41% wider than before! 17.7px horizontal breathing space per dot
  const svgHeight = 660; // Ample height for grand callouts and graceful arc curves
  const topY = 200; // Positioned with generous clearance for top callout badge & staggered numbers
  const bottomY = 560; // 360px separation between top & bottom rails
  const padding = 130;

  const getTopX = (rank: number) => {
    return padding + ((rank - 1) / 113) * (svgWidth - 2 * padding);
  };

  const getBottomX = (mushaf: number) => {
    return padding + ((mushaf - 1) / 113) * (svgWidth - 2 * padding);
  };

  // Timeline Year Badges Positioning
  const positionedTimelineBadges = useMemo(() => {
    if (!activeTimelineArcs.length) return [];

    const sorted = [...activeTimelineArcs].sort((a, b) => getTopX(a.nuzulRank) - getTopX(b.nuzulRank));

    interface PositionedBadge {
      arc: ArcConnection;
      dotX: number;
      badgeX: number;
      badgeY: number;
      tier: number;
      pillWidth: number;
      textContent: string;
    }

    const placed: PositionedBadge[] = [];

    sorted.forEach((arc) => {
      const dotX = getTopX(arc.nuzulRank);
      const textContent = arc.isSegmented && arc.segmentIndex
        ? `Part ${arc.segmentIndex}: ${arc.yearLabel}`
        : `${arc.yearLabel}`;
      
      const pillWidth = Math.max(textContent.length * 7.2 + 24, 116);

      let tier = 0;
      while (true) {
        const hasOverlap = placed.some((p) => {
          if (p.tier !== tier) return false;
          const requiredDist = (pillWidth + p.pillWidth) / 2 + 16;
          return Math.abs(dotX - p.badgeX) < requiredDist;
        });

        if (!hasOverlap) break;
        tier++;
      }

      const badgeX = Math.max(pillWidth / 2 + 14, Math.min(svgWidth - pillWidth / 2 - 14, dotX));
      const badgeY = topY - 38 - (tier * 28);

      placed.push({
        arc,
        dotX,
        badgeX,
        badgeY,
        tier,
        pillWidth,
        textContent,
      });
    });

    return placed;
  }, [activeTimelineArcs, topY, svgWidth]);

  // Pure 1-to-1 Order Milestones with generous spacing and tiered offsets to prevent ANY text overlap
  const topNuzulMilestones = [
    { rank: 1, name: 'العلق #1 (آغازِ وحی)', anchor: 'middle' as const, dy: -20, dx: +52, isUpper: false },
    { rank: 25, name: 'القدر #25', anchor: 'middle' as const, dy: -20, dx: 0, isUpper: false },
    { rank: 50, name: 'الإسراء #50', anchor: 'middle' as const, dy: -20, dx: 0, isUpper: false },
    { rank: 75, name: 'السجدۃ #75', anchor: 'middle' as const, dy: -20, dx: -24, isUpper: false },
    { rank: 86, name: 'المطففین #86 (آخری مکی)', anchor: 'middle' as const, dy: -48, dx: -44, isUpper: true },
    { rank: 87, name: 'البقرۃ #87 (پہلی مدنی)', anchor: 'middle' as const, dy: -20, dx: +46, isUpper: false },
    { rank: 100, name: 'البینۃ #100', anchor: 'middle' as const, dy: -20, dx: 0, isUpper: false },
    { rank: 114, name: 'النصر #114 (اتمامِ وحی)', anchor: 'middle' as const, dy: -20, dx: -52, isUpper: false },
  ];

  // Timeline Milestones
  const propheticMilestones = [
    { rank: 1, year: '610 CE (13 BH)', label: 'آغازِ وحی / بعثت', anchor: 'middle' as const, dx: +48 },
    { rank: 28, year: '615 CE (8 BH)', label: 'ہجرتِ حبشہ', anchor: 'middle' as const, dx: 0 },
    { rank: 58, year: '620 CE (3 BH)', label: 'معراج و مکہ', anchor: 'middle' as const, dx: 0 },
    { rank: 86, year: '622 CE (1 AH)', label: 'ہجرتِ مدینہ', anchor: 'middle' as const, dx: -24 },
    { rank: 102, year: '628 CE (6 AH)', label: 'صلحِ حدیبیہ', anchor: 'middle' as const, dx: 0 },
    { rank: 114, year: '632 CE (10 AH)', label: 'اتمامِ وحی و غدیر', anchor: 'middle' as const, dx: -48 },
  ];

  // Bottom Mushaf Milestones
  const bottomMilestones = [1, 20, 40, 60, 80, 100, 114];

  // SVG Click Handler for Timeline
  const handleTimelineSvgClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * svgWidth;
    const clickY = ((e.clientY - rect.top) / rect.height) * svgHeight;

    const isTopRail = Math.abs(clickY - topY) <= Math.abs(clickY - bottomY);

    let closestSurah = 1;
    let minDistance = Infinity;

    if (isTopRail) {
      timelineArcs.forEach((arc) => {
        const targetX = getTopX(arc.nuzulRank);
        const dist = Math.abs(clickX - targetX);
        if (dist < minDistance) {
          minDistance = dist;
          closestSurah = arc.surahNumber;
        }
      });
    } else {
      ALL_114_CHRONOLOGICAL_EVENTS.forEach((evt) => {
        const targetX = getBottomX(evt.mushafOrder);
        const dist = Math.abs(clickX - targetX);
        if (dist < minDistance) {
          minDistance = dist;
          closestSurah = evt.mushafOrder;
        }
      });
    }

    setSelectedSurahNum(closestSurah);
  };

  // SVG Click Handler for Pure Order
  const handlePureOrderSvgClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * svgWidth;
    const clickY = ((e.clientY - rect.top) / rect.height) * svgHeight;

    const isTopRail = Math.abs(clickY - topY) <= Math.abs(clickY - bottomY);

    let closestSurah = 1;
    let minDistance = Infinity;

    ALL_114_CHRONOLOGICAL_EVENTS.forEach((evt) => {
      const targetX = isTopRail ? getTopX(evt.chronologicalOrder) : getBottomX(evt.mushafOrder);
      const dist = Math.abs(clickX - targetX);
      if (dist < minDistance) {
        minDistance = dist;
        closestSurah = evt.mushafOrder;
      }
    });

    setSelectedSurahNum(closestSurah);
  };

  const goToAdjacentSurah = (direction: 'prev' | 'next') => {
    const current = selectedSurahNum || 1;
    const currentIndex = ALL_114_CHRONOLOGICAL_EVENTS.findIndex((e) => e.mushafOrder === current);
    if (currentIndex === -1) return;

    if (direction === 'prev' && currentIndex > 0) {
      setSelectedSurahNum(ALL_114_CHRONOLOGICAL_EVENTS[currentIndex - 1].mushafOrder);
    } else if (direction === 'next' && currentIndex < ALL_114_CHRONOLOGICAL_EVENTS.length - 1) {
      setSelectedSurahNum(ALL_114_CHRONOLOGICAL_EVENTS[currentIndex + 1].mushafOrder);
    }
  };

  // Delta Spectrum Data
  const deltaSpectrumData = useMemo(() => {
    const list = ALL_114_CHRONOLOGICAL_EVENTS.map((evt) => {
      const delta = Math.abs(evt.chronologicalOrder - evt.mushafOrder);
      const direction = evt.chronologicalOrder > evt.mushafOrder ? 'moved_up' : evt.chronologicalOrder < evt.mushafOrder ? 'moved_down' : 'unchanged';
      return {
        ...evt,
        delta,
        direction,
      };
    });

    return list;
  }, []);

  const topLeapers = useMemo(() => {
    return [...deltaSpectrumData].sort((a, b) => b.delta - a.delta).slice(0, 10);
  }, [deltaSpectrumData]);

  const topAnchors = useMemo(() => {
    return [...deltaSpectrumData].sort((a, b) => a.delta - b.delta).slice(0, 10);
  }, [deltaSpectrumData]);

  const filteredDeltaList = useMemo(() => {
    if (!deltaSearchQuery.trim()) return deltaSpectrumData;
    const q = deltaSearchQuery.toLowerCase().trim();
    return deltaSpectrumData.filter(
      (s) =>
        s.surahNameEnglish.toLowerCase().includes(q) ||
        s.surahNameArabic.includes(q) ||
        s.surahNameUrdu.includes(q) ||
        String(s.mushafOrder).includes(q) ||
        String(s.chronologicalOrder).includes(q)
    );
  }, [deltaSpectrumData, deltaSearchQuery]);

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header Banner & Suite Mode Switcher */}
      <div className="p-5 sm:p-6 rounded-3xl sacred-glass sacred-border space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>The "Arc of Reconnection" Suite <span className="font-urdu">(محرابِ ربطِ مصحف — تقابلی نظام)</span></span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-urdu text-[var(--text-primary)]">
              ۲۳ سالہ بکھرے نزول کا حتمی مصحف میں یکجا ہونا
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1 max-w-2xl leading-relaxed font-urdu">
              نزولِ قرآن کے ۲۳ سالہ تدریجی اور تاریخی سفر اور حتمی مصحف کے مابین تعلق کو تین مختلف زاویوں (زمانی، تقابلی، اور فاصلاتی) سے دریافت کریں۔
            </p>
          </div>

          {/* Filter Presets (Applies to Chords) */}
          <div className="flex flex-wrap items-center gap-1.5 bg-[var(--bg-surface)] p-1.5 rounded-2xl border border-[var(--border-subtle)] shrink-0">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeFilter === 'all'
                  ? 'bg-emerald-700 text-white shadow-md'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              All 114
            </button>
            <button
              onClick={() => setActiveFilter('segmented')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeFilter === 'segmented'
                  ? 'bg-emerald-700 text-white shadow-md'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Multi-Part</span>
            </button>
            <button
              onClick={() => setActiveFilter('high_delta')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeFilter === 'high_delta'
                  ? 'bg-emerald-700 text-white shadow-md'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <Split className="w-3.5 h-3.5" />
              <span>Leap Δ ≥ 40</span>
            </button>
            <button
              onClick={() => setActiveFilter('meccan')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeFilter === 'meccan'
                  ? 'bg-emerald-700 text-white shadow-md'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              Makki
            </button>
            <button
              onClick={() => setActiveFilter('medinan')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeFilter === 'medinan'
                  ? 'bg-emerald-700 text-white shadow-md'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              Madani
            </button>
          </div>
        </div>

        {/* 4-Way Mode Selector with enlarged touch targets */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-2 border-t border-[var(--border-subtle)]">
          <button
            onClick={() => setChartViewMode('order_comparison')}
            className={`min-h-[58px] sm:min-h-[64px] p-3.5 rounded-2xl border text-start transition-all flex items-center gap-3 cursor-pointer ${
              chartViewMode === 'order_comparison'
                ? 'bg-emerald-800 text-white border-emerald-800 shadow-md ring-2 ring-emerald-500/40'
                : 'bg-[var(--bg-surface)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-emerald-500'
            }`}
          >
            <div className={`p-2.5 rounded-xl shrink-0 ${chartViewMode === 'order_comparison' ? 'bg-white/20 text-white' : 'bg-emerald-500/10 text-emerald-600'}`}>
              <GitCompare className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold font-urdu">۱۱۴ سورتوں کا خالص تقابلی ربط</div>
              <div className="text-[11px] opacity-80 font-sans">Pure 1-to-1: Nuzul ⇄ Mushaf Dots</div>
            </div>
          </button>

          <button
            onClick={() => setChartViewMode('timeline')}
            className={`min-h-[58px] sm:min-h-[64px] p-3.5 rounded-2xl border text-start transition-all flex items-center gap-3 cursor-pointer ${
              chartViewMode === 'timeline'
                ? 'bg-emerald-800 text-white border-emerald-800 shadow-md ring-2 ring-emerald-500/40'
                : 'bg-[var(--bg-surface)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-emerald-500'
            }`}
          >
            <div className={`p-2.5 rounded-xl shrink-0 ${chartViewMode === 'timeline' ? 'bg-white/20 text-white' : 'bg-amber-500/10 text-amber-600'}`}>
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold font-urdu">۲۳ سالہ زمانی و مقطوعات ٹائم لائن</div>
              <div className="text-[11px] opacity-80 font-sans">Historical Years & Multi-Part Arcs</div>
            </div>
          </button>

          <button
            onClick={() => setChartViewMode('delta_spectrum')}
            className={`min-h-[58px] sm:min-h-[64px] p-3.5 rounded-2xl border text-start transition-all flex items-center gap-3 cursor-pointer ${
              chartViewMode === 'delta_spectrum'
                ? 'bg-emerald-800 text-white border-emerald-800 shadow-md ring-2 ring-emerald-500/40'
                : 'bg-[var(--bg-surface)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-emerald-500'
            }`}
          >
            <div className={`p-2.5 rounded-xl shrink-0 ${chartViewMode === 'delta_spectrum' ? 'bg-white/20 text-white' : 'bg-purple-500/10 text-purple-600'}`}>
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold font-urdu">فاصلاتی تغیّر کا طیف (Delta Spectrum)</div>
              <div className="text-[11px] opacity-80 font-sans">Leap Analysis & Permanent Anchors</div>
            </div>
          </button>

          <button
            onClick={() => setChartViewMode('all')}
            className={`min-h-[58px] sm:min-h-[64px] p-3.5 rounded-2xl border text-start transition-all flex items-center gap-3 cursor-pointer ${
              chartViewMode === 'all'
                ? 'bg-emerald-800 text-white border-emerald-800 shadow-md ring-2 ring-emerald-500/40'
                : 'bg-[var(--bg-surface)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-emerald-500'
            }`}
          >
            <div className={`p-2.5 rounded-xl shrink-0 ${chartViewMode === 'all' ? 'bg-white/20 text-white' : 'bg-sky-500/10 text-sky-600'}`}>
              <LayoutGrid className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold font-urdu">تمام تقابلی چارٹس اکٹھے</div>
              <div className="text-[11px] opacity-80 font-sans">Stacked Comprehensive View</div>
            </div>
          </button>
        </div>
      </div>

      {/* Global Quick Selector Bar with Large Touch Targets */}
      <div className="p-3 sm:p-4 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-3 shadow-sm">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full sm:w-auto">
          <span className="text-xs sm:text-sm font-bold text-[var(--text-primary)] shrink-0 flex items-center gap-1.5 font-urdu">
            <Compass className="w-4 h-4 text-emerald-600" />
            <span>سورت منتخب کریں (Select Surah):</span>
          </span>
          <select
            value={selectedSurahNum || 1}
            onChange={(e) => setSelectedSurahNum(Number(e.target.value))}
            className="w-full sm:w-80 min-h-[46px] px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] font-medium focus:ring-2 focus:ring-emerald-500 shadow-sm cursor-pointer"
          >
            {ALL_114_CHRONOLOGICAL_EVENTS.map((evt) => (
              <option key={`opt-${evt.mushafOrder}`} value={evt.mushafOrder}>
                نزول #{evt.chronologicalOrder} ➔ مصحف #{evt.mushafOrder}. {evt.surahNameEnglish} ({evt.surahNameArabic}) — Δ {Math.abs(evt.chronologicalOrder - evt.mushafOrder)}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
          <button
            onClick={() => goToAdjacentSurah('prev')}
            className="min-h-[46px] flex-1 sm:flex-none px-5 py-2.5 rounded-2xl bg-[var(--bg-surface-elevated)] hover:bg-emerald-700 hover:text-white border border-[var(--border-subtle)] text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer flex items-center justify-center gap-1 active:scale-95"
            title="Previous Surah"
          >
            <span>◀ پچھلی سورت</span>
          </button>
          <button
            onClick={() => goToAdjacentSurah('next')}
            className="min-h-[46px] flex-1 sm:flex-none px-5 py-2.5 rounded-2xl bg-[var(--bg-surface-elevated)] hover:bg-emerald-700 hover:text-white border border-[var(--border-subtle)] text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer flex items-center justify-center gap-1 active:scale-95"
            title="Next Surah"
          >
            <span>اگلی سورت ▶</span>
          </button>
        </div>

        {/* Key landmark quick chips: Visible and horizontally scrollable on mobile */}
        <div className="w-full flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 border-t border-[var(--border-subtle)] custom-scrollbar-thin">
          <span className="text-[11px] font-bold text-[var(--text-muted)] font-urdu shrink-0 ml-1">
            فوری انتخاب:
          </span>
          {[
            { name: 'العلق (1)', mushaf: 96 },
            { name: 'البقرۃ (87)', mushaf: 2 },
            { name: 'آلِ عمران (89)', mushaf: 3 },
            { name: 'الفاتحہ (5)', mushaf: 1 },
            { name: 'یٰس (41)', mushaf: 36 },
            { name: 'الرحمن (97)', mushaf: 55 },
            { name: 'ص (38, Δ=0)', mushaf: 38 },
            { name: 'النصر (114)', mushaf: 110 },
          ].map((chip) => (
            <button
              key={chip.mushaf}
              onClick={() => setSelectedSurahNum(chip.mushaf)}
              className={`min-h-[38px] px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all shrink-0 cursor-pointer ${
                activeSurahNumber === chip.mushaf
                  ? 'bg-emerald-700 text-white border-emerald-700 shadow-sm'
                  : 'bg-[var(--bg-surface-elevated)] text-[var(--text-secondary)] border-[var(--border-subtle)] hover:border-emerald-500'
              }`}
            >
              {chip.name}
            </button>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* DISPLAY & READABILITY CONTROL PANEL (بصری ترتیبات و پڑھنے کے اختیارات)    */}
      {/* ========================================================================= */}
      <div className="p-3 sm:p-4 rounded-3xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] shadow-xs space-y-2.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--border-subtle)] pb-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 flex items-center justify-center">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs sm:text-sm font-bold text-[var(--text-primary)] font-serif block">
                بصری ترتیبات و پڑھنے کے اختیارات (Display & Readability Options)
              </span>
              <span className="text-[10px] text-[var(--text-muted)] font-urdu">
                ابواب اور نقطوں کو اپنی سہولت و سائز کے مطابق ترتیب دیں
              </span>
            </div>
          </div>
          <span className="text-[11px] text-[var(--text-muted)] hidden sm:inline">
            Interactive Bead & Touch Enhancements
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-xs">
          
          {/* Option 1: Bead Scale / Size Cycler (Regular -> Large -> Jumbo) */}
          <button
            onClick={cycleBeadSize}
            className={`min-h-[52px] p-2.5 rounded-2xl border text-start transition-all cursor-pointer select-none flex items-center gap-2.5 active:scale-95 ${
              beadSize === 'jumbo'
                ? 'bg-emerald-600/20 border-emerald-500 text-emerald-950 dark:text-emerald-100 font-bold shadow-sm ring-2 ring-emerald-500/40'
                : beadSize === 'large'
                ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-900 dark:text-emerald-200 font-semibold shadow-xs'
                : 'bg-[var(--bg-surface)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-emerald-500/40'
            }`}
            title="نقطوں کا سائز تبدیل کریں: معمول ➔ بڑا ➔ جُمبو"
          >
            <Eye className="w-4 h-4 text-emerald-600 shrink-0" />
            <div className="flex flex-col min-w-0">
              <span className="font-urdu leading-tight text-[12px] font-bold truncate">
                موتی: {beadSize === 'jumbo' ? 'جُمبو (Jumbo)' : beadSize === 'large' ? 'بڑا (Large)' : 'معمول (Std)'}
              </span>
              <span className="text-[10px] opacity-75 font-sans">Click to Scale Beads</span>
            </div>
          </button>

          {/* Option 2: Lock Chapter Selection */}
          <button
            onClick={toggleLockChapter}
            className={`min-h-[52px] p-2.5 rounded-2xl border text-start transition-all cursor-pointer select-none flex items-center gap-2.5 active:scale-95 ${
              isLockedChapter
                ? 'bg-amber-500/20 border-amber-500 text-amber-950 dark:text-amber-100 font-bold shadow-sm ring-2 ring-amber-500/50'
                : 'bg-[var(--bg-surface)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-amber-500/40'
            }`}
            title={isLockedChapter ? 'سورت مقفل ہے (Hover Disabled). کلک کریں تاکہ ماؤس موو پر تبدیل ہو سکے' : 'سورت مقفل کریں تاکہ ماؤس گھمانے سے تبدیل نہ ہو'}
          >
            {isLockedChapter ? <Lock className="w-4 h-4 text-amber-600 shrink-0" /> : <Unlock className="w-4 h-4 text-gray-400 shrink-0" />}
            <div className="flex flex-col min-w-0">
              <span className="font-urdu leading-tight text-[12px] font-bold truncate">
                {isLockedChapter ? 'سورت مقفل ہے' : 'سورت لاک کریں'}
              </span>
              <span className="text-[10px] opacity-75 font-sans">
                {isLockedChapter ? '🔒 Frozen on Selection' : 'Freeze Selection'}
              </span>
            </div>
          </button>

          {/* Option 3: Sync All Charts */}
          <label className={`min-h-[52px] flex items-center gap-2.5 p-2.5 rounded-2xl border transition-all cursor-pointer select-none ${
            isSyncAllCharts
              ? 'bg-teal-500/10 border-teal-500/40 text-teal-900 dark:text-teal-200 font-semibold shadow-xs'
              : 'bg-[var(--bg-surface)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-teal-500/40'
          }`}>
            <input
              type="checkbox"
              checked={isSyncAllCharts}
              onChange={toggleSyncAllCharts}
              className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500 rounded border-gray-300 cursor-pointer"
            />
            <Link2 className="w-4 h-4 text-teal-600 shrink-0" />
            <div className="flex flex-col min-w-0">
              <span className="font-urdu leading-tight text-[12px] font-bold truncate">ہم آہنگ چارٹس</span>
              <span className="text-[10px] opacity-75 font-sans">Sync Across All Charts</span>
            </div>
          </label>

          {/* Option 4: Period Colors */}
          <label className={`min-h-[52px] flex items-center gap-2.5 p-2.5 rounded-2xl border transition-all cursor-pointer select-none ${
            isColorCoded 
              ? 'bg-amber-500/10 border-amber-500/40 text-amber-900 dark:text-amber-200 font-semibold shadow-xs' 
              : 'bg-[var(--bg-surface)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-amber-500/40'
          }`}>
            <input
              type="checkbox"
              checked={isColorCoded}
              onChange={toggleColorCoded}
              className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 rounded border-gray-300 cursor-pointer"
            />
            <Palette className="w-4 h-4 text-amber-600 shrink-0" />
            <div className="flex flex-col min-w-0">
              <span className="font-urdu leading-tight text-[12px] font-bold truncate">مکی و مدنی رنگ</span>
              <span className="text-[10px] opacity-75 font-sans">Period Jewel Colors</span>
            </div>
          </label>

          {/* Option 5: Show Chapter Numbers */}
          <label className={`min-h-[52px] flex items-center gap-2.5 p-2.5 rounded-2xl border transition-all cursor-pointer select-none ${
            isShowNumbers 
              ? 'bg-sky-500/10 border-sky-500/40 text-sky-900 dark:text-sky-200 font-semibold shadow-xs' 
              : 'bg-[var(--bg-surface)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-sky-500/40'
          }`}>
            <input
              type="checkbox"
              checked={isShowNumbers}
              onChange={toggleShowNumbers}
              className="w-4 h-4 rounded text-sky-600 focus:ring-sky-500 rounded border-gray-300 cursor-pointer"
            />
            <Hash className="w-4 h-4 text-sky-600 shrink-0" />
            <div className="flex flex-col min-w-0">
              <span className="font-urdu leading-tight text-[12px] font-bold truncate">سورتوں کے نمبر</span>
              <span className="text-[10px] opacity-75 font-sans">Two-Tier Staggered</span>
            </div>
          </label>

          {/* Option 6: Mobile HD Scroll */}
          <label className={`min-h-[52px] flex items-center gap-2.5 p-2.5 rounded-2xl border transition-all cursor-pointer select-none ${
            isMobileHdScroll 
              ? 'bg-purple-500/10 border-purple-500/40 text-purple-900 dark:text-purple-200 font-semibold shadow-xs' 
              : 'bg-[var(--bg-surface)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-purple-500/40'
          }`}>
            <input
              type="checkbox"
              checked={isMobileHdScroll}
              onChange={toggleMobileHdScroll}
              className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500 rounded border-gray-300 cursor-pointer"
            />
            <Smartphone className="w-4 h-4 text-purple-600 shrink-0" />
            <div className="flex flex-col min-w-0">
              <span className="font-urdu leading-tight text-[12px] font-bold truncate">موبائل ایچ ڈی</span>
              <span className="text-[10px] opacity-75 font-sans">Swipe / Fit View</span>
            </div>
          </label>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* CHART 2: PURE 1-TO-1 ORDER COMPARISON ARC (114 NUZUL DOTS ⇄ 114 MUSHAF DOTS) */}
      {/* ========================================================================= */}
      {(chartViewMode === 'order_comparison' || chartViewMode === 'all') && (
        <div className="p-4 sm:p-6 rounded-3xl sacred-border bg-[var(--bg-surface-card)] shadow-lg space-y-3 relative overflow-hidden">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[var(--border-subtle)]">
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50"></span>
              <span className="text-[var(--text-primary)] font-bold text-sm sm:text-base font-serif">
                چارٹ: ۱۱۴ سورتوں کا خالص تقابلی ربط (Pure 1-to-1 Order Mapping Arc)
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-xs text-[var(--text-muted)] font-medium hidden sm:inline">
                اوپر ۱۱۴ نزولی سورتیں ⇄ نیچے ۱۱۴ مصحف سورتیں (۱ تا ۱۱۴ بالمقابل ۱ تا ۱۱۴)
              </div>
              <button
                onClick={toggleFullscreen}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-800 dark:text-emerald-300 text-xs font-bold transition-all border border-emerald-500/30 cursor-pointer"
                title={isFullscreen ? 'Exit Full Screen' : 'Full Screen View (Landscape Optimized)'}
              >
                {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                <span className="text-[11px] font-urdu">{isFullscreen ? 'عام اسکرین' : 'فل اسکرین (Full HD)'}</span>
              </button>
            </div>
          </div>

          {/* Live Dual-Display Hover & Inspection HUD */}
          {renderLiveInspectionHUD('چارٹ: ۱۱۴ سورتوں کا خالص تقابلی ربط (Pure 1-to-1 Mapping Arc)')}

          {/* Top Rail Legend Label */}
          <div className="flex items-center justify-between text-xs font-bold text-[var(--text-muted)] pt-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <span className="text-[var(--text-primary)] uppercase tracking-wider font-sans font-bold text-[11px] sm:text-xs">
                Top Rail: Strict Chronological Revelation Order (ترتیبِ نزولی: سورۃ ۱ العلق تا ۱۱۴ النصر)
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-4 text-[11px] font-normal text-[var(--text-muted)]">
              <span>#1 Al-Alaq ────────────────────────────────────────► #114 An-Nasr</span>
            </div>
          </div>

          {/* SVG Canvas for Pure 1-to-1 Order */}
          <div className={`w-full relative py-2 ${isMobileHdScroll ? 'overflow-x-auto custom-scrollbar-thin' : ''}`} dir="ltr">
            {isMobileHdScroll && (
              <div className="sm:hidden flex items-center justify-end gap-1 text-[10px] text-emerald-700 dark:text-emerald-400 font-urdu mb-1 px-1">
                <span>👈 ۱۱۴ سورتوں کو دیکھنے کے لیے افقی اسکرول کریں (Swipe to explore)</span>
              </div>
            )}
            <div className={isMobileHdScroll ? 'min-w-[1250px] sm:min-w-full' : 'w-full'}>
              <svg
                viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                className="w-full h-auto select-none block overflow-visible cursor-pointer touch-manipulation"
                preserveAspectRatio="xMidYMid meet"
                style={{ direction: 'ltr' }}
                onClick={handlePureOrderSvgClick}
                onMouseLeave={() => handleSurahHover(null)}
              >
              <defs>
                <filter id="glowPure" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3.5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Rails background lines */}
              <line
                x1={padding}
                y1={topY}
                x2={svgWidth - padding}
                y2={topY}
                stroke="var(--border-subtle)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <line
                x1={padding}
                y1={bottomY}
                x2={svgWidth - padding}
                y2={bottomY}
                stroke="var(--border-subtle)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* Top Rail Milestones with staggered tiered coordinates and crisp high contrast */}
              {topNuzulMilestones.map((m) => {
                const mx = getTopX(m.rank) + m.dx;
                const tx = getTopX(m.rank);

                return (
                  <g key={`top-nuzul-m-${m.rank}`} className="select-none">
                    <line
                      x1={tx}
                      y1={m.isUpper ? topY - 34 : topY - 10}
                      x2={tx}
                      y2={topY + 6}
                      stroke="var(--text-muted)"
                      strokeWidth="1.5"
                      opacity="0.55"
                    />
                    <text
                      x={mx}
                      y={topY + m.dy}
                      textAnchor={m.anchor}
                      fontSize="11.5"
                      fontWeight="700"
                      fill="var(--text-primary)"
                      className="font-urdu select-none"
                    >
                      {m.name}
                    </text>
                  </g>
                );
              })}

              {/* Dividing Marker between Meccan (1-86) and Medinan (87-114) — Hijrah Boundary Pillar */}
              {(() => {
                const midX = (getTopX(86) + getTopX(87)) / 2;

                return (
                  <g key="pure-hijrah-boundary" className="select-none">
                    {/* Vertical Dividing Dashed Line */}
                    <line
                      x1={midX}
                      y1={topY - 60}
                      x2={midX}
                      y2={topY + 24}
                      stroke="#059669"
                      strokeWidth="2"
                      strokeDasharray="3 3"
                      opacity="0.85"
                    />
                    {/* Boundary pill positioned with generous breathing space between active badge (tier 1) and labels (tier 3/4) */}
                    <rect
                      x={midX - 52}
                      y={topY - 84}
                      width="104"
                      height="24"
                      rx="12"
                      fill="#047857"
                      stroke="#065F46"
                      strokeWidth="1.5"
                      className="shadow-sm"
                    />
                    <text
                      x={midX}
                      y={topY - 68}
                      textAnchor="middle"
                      fontSize="10.5"
                      fontWeight="bold"
                      fill="#FFFFFF"
                      className="font-urdu select-none"
                    >
                      ہجرتِ مدینہ (622ء)
                    </text>
                  </g>
                );
              })()}

              {/* Bottom Rail Milestones with near-active dimming */}
              {bottomMilestones.map((m) => {
                const bx = getBottomX(m);
                const isNearActive = activePureArc && Math.abs(bx - getBottomX(activePureArc.mushafOrder)) < 85;

                return (
                  <text
                    key={`bot-pure-m-${m}`}
                    x={bx}
                    y={bottomY + 18}
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight="600"
                    fill="var(--text-muted)"
                    opacity={isNearActive ? 0.12 : 0.6}
                    className="transition-opacity duration-200 select-none"
                  >
                    #{m}
                  </text>
                );
              })}

              {/* Background Ambient Arcs */}
              {filteredPureArcs.map((arc) => {
                const x1 = getTopX(arc.nuzulRank);
                const x2 = getBottomX(arc.mushafOrder);
                const isCurrent = activeSurahNumber === arc.surahNumber;

                if (isCurrent) return null;

                const cy1 = topY + 135;
                const cy2 = bottomY - 135;
                const d = `M ${x1} ${topY} C ${x1} ${cy1}, ${x2} ${cy2}, ${x2} ${bottomY}`;

                return (
                  <path
                    key={`bg-pure-${arc.id}`}
                    d={d}
                    fill="none"
                    stroke={arc.color}
                    strokeWidth={activeSurahNumber ? '0.7' : '1.3'}
                    strokeOpacity={activeSurahNumber ? '0.07' : '0.22'}
                    className="cursor-pointer transition-opacity duration-200"
                    onMouseEnter={() => setHoveredSurahNum(arc.surahNumber)}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedSurahNum(arc.surahNumber);
                    }}
                  />
                );
              })}

              {/* Active Highlighted Pure Arc with Floating Callout Badges */}
              {inspectedPureArc && (() => {
                const x1 = getTopX(inspectedPureArc.nuzulRank);
                const x2 = getBottomX(inspectedPureArc.mushafOrder);
                const cy1 = topY + 135;
                const cy2 = bottomY - 135;
                const d = `M ${x1} ${topY} C ${x1} ${cy1}, ${x2} ${cy2}, ${x2} ${bottomY}`;

                return (
                  <g key={`active-pure-${inspectedPureArc.id}`}>
                    <path
                      d={d}
                      fill="none"
                      stroke={inspectedPureArc.color}
                      strokeWidth="11"
                      strokeOpacity="0.28"
                      filter="url(#glowPure)"
                    />
                    <path
                      d={d}
                      fill="none"
                      stroke={inspectedPureArc.color}
                      strokeWidth="4.2"
                      strokeOpacity="0.95"
                    />

                    {/* Top Origin Halo & Dot */}
                    <circle cx={x1} cy={topY} r="14" fill={inspectedPureArc.color} opacity="0.22" />
                    <circle cx={x1} cy={topY} r="7.5" fill={inspectedPureArc.color} stroke="#FFFFFF" strokeWidth="2" />

                    {/* Bottom Destination Halo & Dot */}
                    <circle cx={x2} cy={bottomY} r="14" fill={inspectedPureArc.color} opacity="0.22" />
                    <circle cx={x2} cy={bottomY} r="7.5" fill={inspectedPureArc.color} stroke="#FFFFFF" strokeWidth="2" />

                    {/* Top Origin Callout Badge with elevated leader line floating cleanly above Hijrah boundary */}
                    <line
                      x1={x1}
                      y1={topY - 14}
                      x2={x1}
                      y2={90}
                      stroke={inspectedPureArc.color}
                      strokeWidth="3"
                      strokeDasharray="3 3"
                      opacity="0.95"
                    />
                    <circle cx={x1} cy={topY - 14} r="5" fill={inspectedPureArc.color} />
                    <rect
                      x={Math.max(20, Math.min(svgWidth - 500, x1 - 250))}
                      y={36}
                      width="500"
                      height="54"
                      rx="27"
                      fill="var(--bg-surface-elevated)"
                      stroke={inspectedPureArc.color}
                      strokeWidth="3.5"
                      className="shadow-2xl"
                    />
                    <text
                      x={Math.max(20, Math.min(svgWidth - 500, x1 - 250)) + 250}
                      y={70}
                      textAnchor="middle"
                      fontSize="20"
                      fontWeight="900"
                      fill="var(--text-primary)"
                      className="font-sans select-none"
                    >
                      نزول #{inspectedPureArc.nuzulRank}: {inspectedPureArc.surahNameEnglish} ({inspectedPureArc.surahNameArabic})
                    </text>

                    {/* Bottom Destination Callout Badge with lower leader line */}
                    <line
                      x1={x2}
                      y1={bottomY + 14}
                      x2={x2}
                      y2={bottomY + 44}
                      stroke="#0284C7"
                      strokeWidth="3"
                      strokeDasharray="3 3"
                      opacity="0.95"
                    />
                    <circle cx={x2} cy={bottomY + 14} r="5" fill="#0284C7" />
                    <rect
                      x={Math.max(20, Math.min(svgWidth - 520, x2 - 260))}
                      y={bottomY + 44}
                      width="520"
                      height="54"
                      rx="27"
                      fill="var(--bg-surface-elevated)"
                      stroke="#0284C7"
                      strokeWidth="3.5"
                      className="shadow-2xl"
                    />
                    <text
                      x={Math.max(20, Math.min(svgWidth - 520, x2 - 260)) + 260}
                      y={78}
                      textAnchor="middle"
                      fontSize="20"
                      fontWeight="900"
                      fill="var(--text-primary)"
                      className="font-sans select-none"
                    >
                      مصحف #{inspectedPureArc.mushafOrder}: {inspectedPureArc.surahNameEnglish} ({inspectedPureArc.surahNameArabic}) (Δ {inspectedPureArc.delta})
                    </text>
                  </g>
                );
              })()}

              {/* Top Rail Tick Nodes (1 to 114) */}
              {ALL_114_CHRONOLOGICAL_EVENTS.map((evt) => {
                const cx = getTopX(evt.chronologicalOrder);
                const isSelected = activeSurahNumber === evt.mushafOrder;
                const isHovered = hoveredSurahNum === evt.mushafOrder;
                const isHighlighted = isSelected || isHovered;
                const dotColor = isColorCoded
                  ? getPeriodColor(evt.revelationPeriod)
                  : (isHighlighted ? '#F59E0B' : 'var(--text-muted)');
                const radius = isHovered
                  ? (beadSize === 'jumbo' ? 16 : beadSize === 'large' ? 13 : 9.5)
                  : (isSelected
                      ? (beadSize === 'jumbo' ? 14 : beadSize === 'large' ? 11 : 8)
                      : (beadSize === 'jumbo' ? 8.5 : beadSize === 'large' ? 6.5 : 4.5));
                const auraRadius = isHovered
                  ? (beadSize === 'jumbo' ? 26 : beadSize === 'large' ? 21 : 16)
                  : (beadSize === 'jumbo' ? 22 : beadSize === 'large' ? 17 : 13);
                const opacity = isHighlighted ? 1 : (isColorCoded ? 0.95 : (isLargeBeads ? 0.85 : 0.5));

                return (
                  <g key={`top-pure-dot-${evt.chronologicalOrder}`} className="group select-none">
                    {/* Glowing Aura Ring for selected or large hover */}
                    {isHighlighted && (
                      <circle
                        cx={cx}
                        cy={topY}
                        r={auraRadius}
                        fill={dotColor}
                        opacity={isHovered ? 0.38 : 0.25}
                      />
                    )}

                    {/* Visible Chapter Bead */}
                    <circle
                      cx={cx}
                      cy={topY}
                      r={radius}
                      fill={dotColor}
                      opacity={opacity}
                      stroke={isHighlighted ? '#FFFFFF' : (isLargeBeads ? '#FFFFFF' : 'transparent')}
                      strokeWidth={isHovered ? '3.5' : (isSelected ? '2.5' : (isLargeBeads ? '1.2' : '0'))}
                      className="cursor-pointer transition-all duration-200"
                    />

                    {/* Chapter Number Badge (if isShowNumbers or on selected/hovered) - Zero-Collision Dual-Tier Staggered System */}
                    {(isShowNumbers || isHighlighted) && (() => {
                      const isOdd = evt.chronologicalOrder % 2 !== 0;
                      const badgeY = isHighlighted
                        ? topY - (beadSize === 'jumbo' ? 44 : beadSize === 'large' ? 38 : 32)
                        : (isOdd 
                            ? topY - (beadSize === 'jumbo' ? 34 : beadSize === 'large' ? 28 : 22) 
                            : topY - (beadSize === 'jumbo' ? 56 : beadSize === 'large' ? 48 : 42));
                      const badgeH = isHighlighted ? 20 : 15;
                      const badgeW = isHighlighted ? (evt.chronologicalOrder > 99 ? 34 : 28) : (evt.chronologicalOrder > 99 ? 24 : 19);
                      const badgeR = isHighlighted ? 10 : 4;
                      const textY = badgeY + (isHighlighted ? 14.5 : 11);

                      return (
                        <g className="pointer-events-none select-none">
                          <rect
                            x={cx - badgeW / 2}
                            y={badgeY}
                            width={badgeW}
                            height={badgeH}
                            rx={badgeR}
                            fill={isHighlighted ? '#F59E0B' : (isOdd ? 'var(--bg-surface-elevated)' : 'var(--bg-surface)')}
                            stroke={isHighlighted ? '#FFFFFF' : dotColor}
                            strokeWidth={isHighlighted ? '2' : '1'}
                            className="shadow-sm"
                          />
                          <text
                            x={cx}
                            y={textY}
                            textAnchor="middle"
                            fontSize={isHighlighted ? '11' : '9'}
                            fontWeight={isHighlighted ? '900' : '700'}
                            fill={isHighlighted ? '#000000' : 'var(--text-primary)'}
                            className="font-sans"
                          >
                            {evt.chronologicalOrder}
                          </text>
                        </g>
                      );
                    })()}

                    {/* Invisible Touch Magnet Target (44px Diameter Hitbox) */}
                    <circle
                      cx={cx}
                      cy={topY}
                      r="22"
                      fill="transparent"
                      className="cursor-pointer touch-manipulation"
                      onMouseEnter={() => handleSurahHover(evt.mushafOrder, 'top')}
                      onTouchStart={() => handleSurahHover(evt.mushafOrder, 'top')}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSurahSelect(evt.mushafOrder);
                      }}
                    />
                  </g>
                );
              })}

              {/* Bottom Rail Tick Nodes (1 to 114) */}
              {ALL_114_CHRONOLOGICAL_EVENTS.map((evt) => {
                const cx = getBottomX(evt.mushafOrder);
                const isSelected = activeSurahNumber === evt.mushafOrder;
                const isHovered = hoveredSurahNum === evt.mushafOrder;
                const isHighlighted = isSelected || isHovered;
                const dotColor = isColorCoded
                  ? getPeriodColor(evt.revelationPeriod)
                  : (isHighlighted ? '#0284C7' : 'var(--text-muted)');
                const radius = isHovered
                  ? (beadSize === 'jumbo' ? 16 : beadSize === 'large' ? 13 : 9.5)
                  : (isSelected
                      ? (beadSize === 'jumbo' ? 14 : beadSize === 'large' ? 11 : 8)
                      : (beadSize === 'jumbo' ? 8.5 : beadSize === 'large' ? 6.5 : 4.5));
                const auraRadius = isHovered
                  ? (beadSize === 'jumbo' ? 26 : beadSize === 'large' ? 21 : 16)
                  : (beadSize === 'jumbo' ? 22 : beadSize === 'large' ? 17 : 13);
                const opacity = isHighlighted ? 1 : (isColorCoded ? 0.95 : (isLargeBeads ? 0.85 : 0.5));

                return (
                  <g key={`bot-pure-dot-${evt.mushafOrder}`} className="group select-none">
                    {/* Glowing Aura Ring for selected or large hover */}
                    {isHighlighted && (
                      <circle
                        cx={cx}
                        cy={bottomY}
                        r={auraRadius}
                        fill={dotColor}
                        opacity={isHovered ? 0.38 : 0.25}
                      />
                    )}

                    {/* Visible Chapter Bead */}
                    <circle
                      cx={cx}
                      cy={bottomY}
                      r={radius}
                      fill={dotColor}
                      opacity={opacity}
                      stroke={isHighlighted ? '#FFFFFF' : (isLargeBeads ? '#FFFFFF' : 'transparent')}
                      strokeWidth={isHovered ? '3.5' : (isSelected ? '2.5' : (isLargeBeads ? '1.2' : '0'))}
                      className="cursor-pointer transition-all duration-200"
                    />

                    {/* Chapter Number Badge (if isShowNumbers or on selected/hovered) - Zero-Collision Dual-Tier Staggered System */}
                    {(isShowNumbers || isHighlighted) && (() => {
                      const isOdd = evt.mushafOrder % 2 !== 0;
                      const badgeY = isHighlighted
                        ? bottomY + (beadSize === 'jumbo' ? 32 : beadSize === 'large' ? 26 : 22)
                        : (isOdd 
                            ? bottomY + (beadSize === 'jumbo' ? 20 : beadSize === 'large' ? 16 : 13) 
                            : bottomY + (beadSize === 'jumbo' ? 42 : beadSize === 'large' ? 36 : 30));
                      const badgeH = isHighlighted ? 20 : 15;
                      const badgeW = isHighlighted ? (evt.mushafOrder > 99 ? 34 : 28) : (evt.mushafOrder > 99 ? 24 : 19);
                      const badgeR = isHighlighted ? 10 : 4;
                      const textY = badgeY + (isHighlighted ? 14.5 : 11);

                      return (
                        <g className="pointer-events-none select-none">
                          <rect
                            x={cx - badgeW / 2}
                            y={badgeY}
                            width={badgeW}
                            height={badgeH}
                            rx={badgeR}
                            fill={isHighlighted ? '#0284C7' : (isOdd ? 'var(--bg-surface-elevated)' : 'var(--bg-surface)')}
                            stroke={isHighlighted ? '#FFFFFF' : dotColor}
                            strokeWidth={isHighlighted ? '2' : '1'}
                            className="shadow-sm"
                          />
                          <text
                            x={cx}
                            y={textY}
                            textAnchor="middle"
                            fontSize={isHighlighted ? '11' : '9'}
                            fontWeight={isHighlighted ? '900' : '700'}
                            fill={isSelected ? '#FFFFFF' : 'var(--text-primary)'}
                            className="font-sans"
                          >
                            {evt.mushafOrder}
                          </text>
                        </g>
                      );
                    })()}

                    {/* Invisible Touch Magnet Target (44px Diameter Hitbox) */}
                    <circle
                      cx={cx}
                      cy={bottomY}
                      r="22"
                      fill="transparent"
                      className="cursor-pointer touch-manipulation"
                      onMouseEnter={() => handleSurahHover(evt.mushafOrder, 'bottom')}
                      onTouchStart={() => handleSurahHover(evt.mushafOrder, 'bottom')}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSurahSelect(evt.mushafOrder);
                      }}
                    />
                  </g>
                );
              })}
            </svg>
            </div>
          </div>

          {/* Bottom Rail Legend Label */}
          <div className="flex items-center justify-between text-xs font-bold text-[var(--text-muted)] pt-1 border-t border-[var(--border-subtle)]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span>
              <span className="text-[var(--text-primary)] uppercase tracking-wider font-sans font-bold text-[11px] sm:text-xs">
                Bottom Rail: Canonical Mushaf Order (ترتیبِ مصحف: سورۃ ۱ الفاتحہ تا ۱۱۴ الناس)
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-4 text-[11px] font-normal text-[var(--text-muted)]">
              <span>#1 Al-Fatihah ────────────────────────────────────────► #114 An-Nas</span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* CHART 1: 23-YEAR HISTORICAL TIMELINE ARC (WITH CONVERGING MULTI-PART ARCS) */}
      {/* ========================================================================= */}
      {(chartViewMode === 'timeline' || chartViewMode === 'all') && (
        <div className="p-4 sm:p-6 rounded-3xl sacred-border bg-[var(--bg-surface-card)] shadow-lg space-y-3 relative overflow-hidden">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[var(--border-subtle)]">
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full bg-amber-500 shadow-sm shadow-amber-500/50"></span>
              <span className="text-[var(--text-primary)] font-bold text-sm sm:text-base font-serif">
                چارٹ: ۲۳ سالہ زمانی و مقطوعات ٹائم لائن (23-Year Historical Timeline Arc)
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-[var(--text-muted)] font-medium hidden sm:inline">
                اوپر ۲۳ سالہ تاریخ (۶۱۰ تا ۶۳۲ عیسوی) اور کثیر حصوں والی سورتوں کے جداگانہ نزولی مقامات
              </span>
              <button
                onClick={toggleFullscreen}
                className="px-2.5 py-1.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] hover:border-amber-500 transition-all flex items-center gap-1.5 shadow-xs cursor-pointer active:scale-95"
                title={isFullscreen ? 'Exit Full Screen' : 'Full Screen View (Landscape Optimized)'}
              >
                {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                <span className="text-[11px] font-urdu">{isFullscreen ? 'عام اسکرین' : 'فل اسکرین (Full HD)'}</span>
              </button>
            </div>
          </div>

          {/* Live Dual-Display Hover & Inspection HUD */}
          {renderLiveInspectionHUD('چارٹ: ۲۳ سالہ زمانی و مقطوعات ٹائم لائن (Historical Timeline Arc)')}

          {/* Top Rail Legend Label */}
          <div className="flex items-center justify-between text-xs font-bold text-[var(--text-muted)] pt-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <span className="text-[var(--text-primary)] uppercase tracking-wider font-sans font-bold text-[11px] sm:text-xs">
                Top Rail: Chronological Revelation Timeline & Years (ترتیبِ نزول و سنینِ بعثت تا ہجرت)
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-4 text-[11px] font-normal text-[var(--text-muted)]">
              <span>610 CE (غارِ حرا) ────────────────────────► 632 CE (غدیر خم و اتمامِ وحی)</span>
            </div>
          </div>

          {/* SVG Canvas for Timeline */}
          <div className={`w-full relative py-2 ${isMobileHdScroll ? 'overflow-x-auto custom-scrollbar-thin' : ''}`} dir="ltr">
            {isMobileHdScroll && (
              <div className="sm:hidden flex items-center justify-end gap-1 text-[10px] text-amber-700 dark:text-amber-400 font-urdu mb-1 px-1">
                <span>👈 ۲۳ سالہ زمانی و مقطوعات ٹریک کو دیکھنے کے لیے افقی اسکرول کریں</span>
              </div>
            )}
            <div className={isMobileHdScroll ? 'min-w-[1250px] sm:min-w-full' : 'w-full'}>
              <svg
                viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                className="w-full h-auto select-none block overflow-visible cursor-pointer touch-manipulation"
                preserveAspectRatio="xMidYMid meet"
                style={{ direction: 'ltr' }}
                onClick={handleTimelineSvgClick}
                onMouseLeave={() => handleSurahHover(null, null)}
              >
              <defs>
                <filter id="glowTimeline" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Rails background lines */}
              <line
                x1={padding}
                y1={topY}
                x2={svgWidth - padding}
                y2={topY}
                stroke="var(--border-subtle)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <line
                x1={padding}
                y1={bottomY}
                x2={svgWidth - padding}
                y2={bottomY}
                stroke="var(--border-subtle)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* Historical Milestone Markers on Top Rail */}
              {propheticMilestones.map((pm) => (
                <g key={`pm-${pm.rank}`}>
                  <line
                    x1={getTopX(pm.rank)}
                    y1={topY - 12}
                    x2={getTopX(pm.rank)}
                    y2={topY + 8}
                    stroke="var(--text-muted)"
                    strokeWidth="1.5"
                    opacity="0.5"
                  />
                  <text
                    x={getTopX(pm.rank) + pm.dx}
                    y={topY - 18}
                    textAnchor={pm.anchor}
                    fontSize="11.5"
                    fontWeight="700"
                    fill="var(--text-primary)"
                    className="font-urdu"
                  >
                    {pm.label}
                  </text>
                  <text
                    x={getTopX(pm.rank) + pm.dx}
                    y={topY - 34}
                    textAnchor={pm.anchor}
                    fontSize="10"
                    fontWeight="600"
                    fill="var(--text-muted)"
                    className="font-sans"
                  >
                    {pm.year}
                  </text>
                </g>
              ))}

              {/* Bottom Milestone Numbers */}
              {bottomMilestones.map((m) => (
                <text
                  key={`bot-m-${m}`}
                  x={getBottomX(m)}
                  y={bottomY + 22}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="600"
                  fill="var(--text-muted)"
                  opacity="0.6"
                >
                  #{m}
                </text>
              ))}

              {/* Ambient Arcs */}
              {filteredTimelineArcs.map((arc) => {
                const x1 = getTopX(arc.nuzulRank);
                const x2 = getBottomX(arc.mushafOrder);
                const isCurrent = activeSurahNumber === arc.surahNumber;

                if (isCurrent) return null;

                const cy1 = topY + 135;
                const cy2 = bottomY - 135;
                const d = `M ${x1} ${topY} C ${x1} ${cy1}, ${x2} ${cy2}, ${x2} ${bottomY}`;

                return (
                  <path
                    key={`bg-timeline-${arc.id}`}
                    d={d}
                    fill="none"
                    stroke={arc.color}
                    strokeWidth={activeSurahNumber ? '0.7' : '1.2'}
                    strokeOpacity={activeSurahNumber ? '0.08' : '0.2'}
                    className="cursor-pointer transition-opacity duration-200"
                    onMouseEnter={() => handleSurahHover(arc.surahNumber)}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSurahSelect(arc.surahNumber);
                    }}
                  />
                );
              })}

              {/* Active Arcs (with converging branches for multi-part surahs) */}
              {activeTimelineArcs.map((arc) => {
                const x1 = getTopX(arc.nuzulRank);
                const x2 = getBottomX(arc.mushafOrder);

                const cy1 = topY + 135;
                const cy2 = bottomY - 135;
                const d = `M ${x1} ${topY} C ${x1} ${cy1}, ${x2} ${cy2}, ${x2} ${bottomY}`;

                return (
                  <g key={`active-timeline-${arc.id}`}>
                    <path
                      d={d}
                      fill="none"
                      stroke={arc.color}
                      strokeWidth="10"
                      strokeOpacity="0.25"
                      filter="url(#glowTimeline)"
                    />
                    <path
                      d={d}
                      fill="none"
                      stroke={arc.color}
                      strokeWidth="3.8"
                      strokeOpacity="0.95"
                    />
                    <circle cx={x1} cy={topY} r="13" fill={arc.color} opacity="0.2" />
                    <circle cx={x1} cy={topY} r="7.5" fill={arc.color} stroke="#FFFFFF" strokeWidth="2" />
                    <circle cx={x2} cy={bottomY} r="13" fill={arc.color} opacity="0.2" />
                    <circle cx={x2} cy={bottomY} r="7.5" fill={arc.color} stroke="#FFFFFF" strokeWidth="2" />
                  </g>
                );
              })}

              {/* Top Rail Tick Nodes */}
              {ALL_114_CHRONOLOGICAL_EVENTS.map((evt) => {
                const cx = getTopX(evt.chronologicalOrder);
                const isSelected = activeTimelineArcs.some((a) => a.nuzulRank === evt.chronologicalOrder) || activeSurahNumber === evt.mushafOrder;
                const isHovered = hoveredSurahNum === evt.mushafOrder;
                const isHighlighted = isSelected || isHovered;
                const dotColor = isColorCoded 
                  ? getPeriodColor(evt.revelationPeriod) 
                  : (isHighlighted ? '#F59E0B' : 'var(--text-muted)');
                const radius = isHovered
                  ? (beadSize === 'jumbo' ? 16 : beadSize === 'large' ? 13 : 9.5)
                  : (isSelected 
                      ? (beadSize === 'jumbo' ? 14 : beadSize === 'large' ? 11 : 8)
                      : (beadSize === 'jumbo' ? 8.5 : beadSize === 'large' ? 6.5 : 4.5));
                const auraRadius = isHovered
                  ? (beadSize === 'jumbo' ? 26 : beadSize === 'large' ? 21 : 16)
                  : (beadSize === 'jumbo' ? 22 : beadSize === 'large' ? 17 : 13);
                const opacity = isHighlighted ? 1 : (isColorCoded ? 0.95 : (isLargeBeads ? 0.85 : 0.5));

                return (
                  <g key={`top-timeline-tick-${evt.chronologicalOrder}`} className="group select-none">
                    {/* Glowing Aura Ring */}
                    {isHighlighted && (
                      <circle cx={cx} cy={topY} r={auraRadius} fill={dotColor} opacity={isHovered ? 0.38 : 0.25} />
                    )}

                    {/* Visible Chapter Bead */}
                    <circle
                      cx={cx}
                      cy={topY}
                      r={radius}
                      fill={dotColor}
                      opacity={opacity}
                      stroke={isHighlighted ? '#FFFFFF' : (isLargeBeads ? '#FFFFFF' : 'transparent')}
                      strokeWidth={isHovered ? '3.5' : (isSelected ? '2.5' : (isLargeBeads ? '1.2' : '0'))}
                      className="cursor-pointer transition-all duration-200"
                    />

                    {/* Chapter Number Badge (if isShowNumbers or on selected/hovered) - Zero-Collision Dual-Tier Staggered System */}
                    {(isShowNumbers || isHighlighted) && (() => {
                      const isOdd = evt.chronologicalOrder % 2 !== 0;
                      const badgeY = isHighlighted
                        ? topY - (beadSize === 'jumbo' ? 44 : beadSize === 'large' ? 38 : 32)
                        : (isOdd 
                            ? topY - (beadSize === 'jumbo' ? 34 : beadSize === 'large' ? 28 : 22) 
                            : topY - (beadSize === 'jumbo' ? 56 : beadSize === 'large' ? 48 : 42));
                      const badgeH = isHighlighted ? 20 : 15;
                      const badgeW = isHighlighted ? (evt.chronologicalOrder > 99 ? 34 : 28) : (evt.chronologicalOrder > 99 ? 24 : 19);
                      const badgeR = isHighlighted ? 10 : 4;
                      const textY = badgeY + (isHighlighted ? 14.5 : 11);

                      return (
                        <g className="pointer-events-none select-none">
                          <rect
                            x={cx - badgeW / 2}
                            y={badgeY}
                            width={badgeW}
                            height={badgeH}
                            rx={badgeR}
                            fill={isHighlighted ? '#F59E0B' : (isOdd ? 'var(--bg-surface-elevated)' : 'var(--bg-surface)')}
                            stroke={isHighlighted ? '#FFFFFF' : dotColor}
                            strokeWidth={isHighlighted ? '2' : '1'}
                            className="shadow-sm"
                          />
                          <text
                            x={cx}
                            y={textY}
                            textAnchor="middle"
                            fontSize={isHighlighted ? '11' : '9'}
                            fontWeight={isHighlighted ? '900' : '700'}
                            fill={isHighlighted ? '#000000' : 'var(--text-primary)'}
                            className="font-sans"
                          >
                            {evt.chronologicalOrder}
                          </text>
                        </g>
                      );
                    })()}

                    {/* Invisible Touch Magnet Target (44px Diameter Hitbox) */}
                    <circle
                      cx={cx}
                      cy={topY}
                      r="22"
                      fill="transparent"
                      className="cursor-pointer touch-manipulation"
                      onMouseEnter={() => handleSurahHover(evt.mushafOrder, 'top')}
                      onTouchStart={() => handleSurahHover(evt.mushafOrder, 'top')}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSurahSelect(evt.mushafOrder);
                      }}
                    />
                  </g>
                );
              })}

              {/* Floating Tiered Year Badges with Connecting Leader Lines */}
              {positionedTimelineBadges.map((badge) => (
                <g key={`year-badge-${badge.arc.id}`} className="transition-all duration-300">
                  <line
                    x1={badge.dotX}
                    y1={badge.badgeY + 10}
                    x2={badge.dotX}
                    y2={topY - 8}
                    stroke={badge.arc.color}
                    strokeWidth="1.8"
                    strokeDasharray="2.5 2.5"
                    opacity="0.85"
                  />
                  <circle cx={badge.dotX} cy={topY - 8} r="2.5" fill={badge.arc.color} />
                  <rect
                    x={badge.badgeX - badge.pillWidth / 2}
                    y={badge.badgeY - 10}
                    width={badge.pillWidth}
                    height="21"
                    rx="10.5"
                    fill="#FFFFFF"
                    stroke="#0F172A"
                    strokeWidth="1.7"
                  />
                  <text
                    x={badge.badgeX}
                    y={badge.badgeY + 4}
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight="800"
                    fill="#000000"
                    className="font-sans select-none"
                  >
                    {badge.textContent}
                  </text>
                </g>
              ))}

              {/* Top Source Pill for Inspected Surah */}
              {inspectedSurahDetails && (
                <g key={`top-timeline-source-${inspectedSurahDetails.mushafOrder}`}>
                  <line
                    x1={getTopX(inspectedSurahDetails.chronologicalOrder)}
                    y1={topY - 14}
                    x2={getTopX(inspectedSurahDetails.chronologicalOrder)}
                    y2={90}
                    stroke="#F59E0B"
                    strokeWidth="3"
                    strokeDasharray="3 3"
                    opacity="0.95"
                  />
                  <circle cx={getTopX(inspectedSurahDetails.chronologicalOrder)} cy={topY - 14} r="5" fill="#F59E0B" />
                  <rect
                    x={Math.max(20, Math.min(svgWidth - 500, getTopX(inspectedSurahDetails.chronologicalOrder) - 250))}
                    y={36}
                    width="500"
                    height="54"
                    rx="27"
                    fill="var(--bg-surface-elevated)"
                    stroke="#F59E0B"
                    strokeWidth="3.5"
                    className="shadow-2xl"
                  />
                  <text
                    x={Math.max(20, Math.min(svgWidth - 500, getTopX(inspectedSurahDetails.chronologicalOrder) - 250)) + 250}
                    y={70}
                    textAnchor="middle"
                    fontSize="20"
                    fontWeight="900"
                    fill="var(--text-primary)"
                    className="font-sans select-none"
                  >
                    نزول #{inspectedSurahDetails.chronologicalOrder}: {inspectedSurahDetails.surahNameEnglish} ({inspectedSurahDetails.surahNameArabic})
                  </text>
                </g>
              )}

              {/* Bottom Destination Pill */}
              {inspectedSurahDetails && (
                <g key={`bot-dest-${inspectedSurahDetails.mushafOrder}`}>
                  <line
                    x1={getBottomX(inspectedSurahDetails.mushafOrder)}
                    y1={bottomY + 14}
                    x2={getBottomX(inspectedSurahDetails.mushafOrder)}
                    y2={bottomY + 44}
                    stroke="#0284C7"
                    strokeWidth="3"
                    strokeDasharray="3 3"
                    opacity="0.95"
                  />
                  <circle cx={getBottomX(inspectedSurahDetails.mushafOrder)} cy={bottomY + 14} r="5" fill="#0284C7" />
                  <rect
                    x={Math.max(20, Math.min(svgWidth - 520, getBottomX(inspectedSurahDetails.mushafOrder) - 260))}
                    y={bottomY + 44}
                    width="520"
                    height="54"
                    rx="27"
                    fill="var(--bg-surface-elevated)"
                    stroke="#0284C7"
                    strokeWidth="3.5"
                    className="shadow-2xl"
                  />
                  <text
                    x={Math.max(20, Math.min(svgWidth - 520, getBottomX(inspectedSurahDetails.mushafOrder) - 260)) + 260}
                    y={78}
                    textAnchor="middle"
                    fontSize="20"
                    fontWeight="900"
                    fill="var(--text-primary)"
                    className="font-sans select-none"
                  >
                    مصحف #{inspectedSurahDetails.mushafOrder}: {inspectedSurahDetails.surahNameEnglish} ({inspectedSurahDetails.surahNameArabic}) (Δ {inspectedDelta})
                  </text>
                </g>
              )}

              {/* Bottom Rail Tick Nodes */}
              {ALL_114_CHRONOLOGICAL_EVENTS.map((evt) => {
                const cx = getBottomX(evt.mushafOrder);
                const isSelected = activeSurahNumber === evt.mushafOrder;
                const isHovered = hoveredSurahNum === evt.mushafOrder;
                const isHighlighted = isSelected || isHovered;
                const dotColor = isColorCoded 
                  ? getPeriodColor(evt.revelationPeriod) 
                  : (isHighlighted ? '#0284C7' : 'var(--text-muted)');
                const radius = isHovered
                  ? (beadSize === 'jumbo' ? 16 : beadSize === 'large' ? 13 : 9.5)
                  : (isSelected 
                      ? (beadSize === 'jumbo' ? 14 : beadSize === 'large' ? 11 : 8)
                      : (beadSize === 'jumbo' ? 8.5 : beadSize === 'large' ? 6.5 : 4.5));
                const auraRadius = isHovered
                  ? (beadSize === 'jumbo' ? 26 : beadSize === 'large' ? 21 : 16)
                  : (beadSize === 'jumbo' ? 22 : beadSize === 'large' ? 17 : 13);
                const opacity = isHighlighted ? 1 : (isColorCoded ? 0.95 : (isLargeBeads ? 0.85 : 0.5));

                return (
                  <g key={`bot-tick-${evt.mushafOrder}`} className="group select-none">
                    {/* Glowing Aura Ring */}
                    {isHighlighted && (
                      <circle cx={cx} cy={bottomY} r={auraRadius} fill={dotColor} opacity={isHovered ? 0.38 : 0.25} />
                    )}

                    {/* Visible Chapter Bead */}
                    <circle
                      cx={cx}
                      cy={bottomY}
                      r={radius}
                      fill={dotColor}
                      opacity={opacity}
                      stroke={isHighlighted ? '#FFFFFF' : (isLargeBeads ? '#FFFFFF' : 'transparent')}
                      strokeWidth={isHovered ? '3.5' : (isSelected ? '2.5' : (isLargeBeads ? '1.2' : '0'))}
                      className="cursor-pointer transition-all duration-200"
                    />

                    {/* Chapter Number Badge (if isShowNumbers or on selected/hovered) - Zero-Collision Dual-Tier Staggered System */}
                    {(isShowNumbers || isHighlighted) && (() => {
                      const isOdd = evt.mushafOrder % 2 !== 0;
                      const badgeY = isHighlighted
                        ? bottomY + (beadSize === 'jumbo' ? 32 : beadSize === 'large' ? 26 : 22)
                        : (isOdd 
                            ? bottomY + (beadSize === 'jumbo' ? 20 : beadSize === 'large' ? 16 : 13) 
                            : bottomY + (beadSize === 'jumbo' ? 42 : beadSize === 'large' ? 36 : 30));
                      const badgeH = isHighlighted ? 20 : 15;
                      const badgeW = isHighlighted ? (evt.mushafOrder > 99 ? 34 : 28) : (evt.mushafOrder > 99 ? 24 : 19);
                      const badgeR = isHighlighted ? 10 : 4;
                      const textY = badgeY + (isHighlighted ? 14.5 : 11);

                      return (
                        <g className="pointer-events-none select-none">
                          <rect
                            x={cx - badgeW / 2}
                            y={badgeY}
                            width={badgeW}
                            height={badgeH}
                            rx={badgeR}
                            fill={isHighlighted ? '#0284C7' : (isOdd ? 'var(--bg-surface-elevated)' : 'var(--bg-surface)')}
                            stroke={isHighlighted ? '#FFFFFF' : dotColor}
                            strokeWidth={isHighlighted ? '2' : '1'}
                            className="shadow-sm"
                          />
                          <text
                            x={cx}
                            y={textY}
                            textAnchor="middle"
                            fontSize={isHighlighted ? '11' : '9'}
                            fontWeight={isHighlighted ? '900' : '700'}
                            fill={isSelected ? '#FFFFFF' : 'var(--text-primary)'}
                            className="font-sans"
                          >
                            {evt.mushafOrder}
                          </text>
                        </g>
                      );
                    })()}

                    {/* Invisible Touch Magnet Target (44px Diameter Hitbox) */}
                    <circle
                      cx={cx}
                      cy={bottomY}
                      r="22"
                      fill="transparent"
                      className="cursor-pointer touch-manipulation"
                      onMouseEnter={() => handleSurahHover(evt.mushafOrder, 'bottom')}
                      onTouchStart={() => handleSurahHover(evt.mushafOrder, 'bottom')}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSurahSelect(evt.mushafOrder);
                      }}
                    />
                  </g>
                );
              })}
            </svg>
            </div>
          </div>

          {/* Bottom Rail Legend Label */}
          <div className="flex items-center justify-between text-xs font-bold text-[var(--text-muted)] pt-1 border-t border-[var(--border-subtle)]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span>
              <span className="text-[var(--text-primary)] uppercase tracking-wider font-sans font-bold text-[11px] sm:text-xs">
                Bottom Rail: Canonical Mushaf Order (ترتیبِ مصحف: سورۃ ۱ الفاتحہ تا ۱۱۴ الناس)
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-4 text-[11px] font-normal text-[var(--text-muted)]">
              <span>Surah #1 (Al-Fatihah) ────────────────────────► Surah #114 (An-Nas)</span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* CHART 3: THE DELTA DISPLACEMENT & LEAP SPECTRUM (فاصلاتی تغیّر کا طیف) */}
      {/* ========================================================================= */}
      {(chartViewMode === 'delta_spectrum' || chartViewMode === 'all') && (
        <div className="p-5 sm:p-6 rounded-3xl sacred-border bg-[var(--bg-surface-card)] shadow-lg space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[var(--border-subtle)]">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 mb-1">
                <TrendingUp className="w-4 h-4" />
                <span>The Revelation Displacement Spectrum (فاصلاتی تغیّر — Δ Analysis)</span>
              </div>
              <h4 className="text-lg sm:text-xl font-bold font-serif text-[var(--text-primary)]">
                نزولی ترتیب سے مصحفی ترتیب تک کا فاصلہ اور تاریخی چھلانگیں
              </h4>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                ہر سورت نے اپنی نزولی تاریخ سے موجودہ مصحف تک کتنا فاصلہ طے کیا؟ (Δ = |نزولی درجہ - مصحفی درجہ|)
              </p>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="سورت تلاش کریں..."
                value={deltaSearchQuery}
                onChange={(e) => setDeltaSearchQuery(e.target.value)}
                className="px-3 py-1.5 rounded-xl text-xs bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-primary)] font-medium focus:ring-2 focus:ring-purple-500 w-48 shadow-sm"
              />
            </div>
          </div>

          {/* Highlights Row: 3 Zero-Delta Anchors + Top Leapers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* The 3 Identical Position Surahs (Δ = 0) */}
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Anchor className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
                    مستقل لنگر سورتیں: جن کا نزولی اور مصحفی نمبر بالکل ایک ہی ہے (Δ = 0)
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-700 text-white">
                  3 Surahs
                </span>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {topAnchors.slice(0, 6).map((s) => (
                  <button
                    key={`anchor-${s.mushafOrder}`}
                    onClick={() => setSelectedSurahNum(s.mushafOrder)}
                    className="p-2 rounded-xl bg-[var(--bg-surface-elevated)] border border-emerald-500/40 text-left hover:bg-emerald-600 hover:text-white transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold font-arabic truncate group-hover:text-white">{s.surahNameArabic}</span>
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-emerald-600 text-white">
                        Δ {s.delta}
                      </span>
                    </div>
                    <div className="text-[10px] text-[var(--text-muted)] group-hover:text-white/80 mt-0.5">
                      #{s.mushafOrder} {s.surahNameEnglish} (ن#{s.chronologicalOrder})
                    </div>
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed font-urdu">
                یہ وہ سورتیں ہیں جو قرآنی تاریخ میں جہاں نازل ہوئیں، حتمی مصحف میں بھی ٹھیک اسی مقام پر یا اس کے بے حد قریب رکھی گئیں (جیسے ص، نوح، انفطار، انشقاق، فاتحہ اور نصر)!
              </p>
            </div>

            {/* Top 5 Extreme Leapers */}
            <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Split className="w-4 h-4 text-purple-600" />
                  <span className="text-xs font-bold text-purple-900 dark:text-purple-300">
                    طویل ترین تاریخی چھلانگیں (Top Leapers in Revelation History)
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-700 text-white">
                  Max Leaps
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {topLeapers.slice(0, 6).map((s) => (
                  <button
                    key={s.mushafOrder}
                    onClick={() => setSelectedSurahNum(s.mushafOrder)}
                    className="p-2 rounded-xl bg-[var(--bg-surface-elevated)] border border-purple-500/30 text-left hover:border-purple-600 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold font-serif">{s.surahNameEnglish}</span>
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-purple-600 text-white">
                        Δ {s.delta}
                      </span>
                    </div>
                    <div className="text-[10px] text-[var(--text-muted)] mt-0.5">
                      نزول #{s.chronologicalOrder} ➔ مصحف #{s.mushafOrder}
                    </div>
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed font-urdu">
                مثلاً سورۃ المائدہ (#112) نزول میں سب سے آخری ادوار میں آئی لیکن مصحف میں آغاز کے پانچویں نمبر پر یکجا ہوئی (۱۰۷ درجے کا فاصلہ)۔
              </p>
            </div>

          </div>

          {/* Interactive Spectrum Grid */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-[var(--text-primary)]">
              <span>تمام ۱۱۴ سورتوں کا فاصلاتی گراف (Click any Surah to inspect):</span>
              <span className="text-[11px] text-[var(--text-muted)]">نتائج: {filteredDeltaList.length} سورتیں</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 max-h-72 overflow-y-auto pr-1">
              {filteredDeltaList.map((s) => {
                const isSelected = activeSurahNumber === s.mushafOrder;
                return (
                  <button
                    key={`delta-cell-${s.mushafOrder}`}
                    onClick={() => setSelectedSurahNum(s.mushafOrder)}
                    className={`p-2 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'bg-purple-800 text-white border-purple-800 shadow-md ring-2 ring-purple-400'
                        : 'bg-[var(--bg-surface)] border-[var(--border-subtle)] hover:border-purple-500'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold truncate">{s.surahNameEnglish}</span>
                      <span className={`text-[10px] font-extrabold px-1 rounded ${
                        s.delta === 0 ? 'bg-emerald-500 text-white' : s.delta >= 60 ? 'bg-purple-500/20 text-purple-700 dark:text-purple-300' : 'bg-amber-500/20 text-amber-700 dark:text-amber-300'
                      }`}>
                        Δ{s.delta}
                      </span>
                    </div>
                    <div className="text-[9px] opacity-75 mt-0.5 font-urdu">
                      نزول #{s.chronologicalOrder} ➔ مصحف #{s.mushafOrder}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ACTIVE SURAH INSPECTION CALLOUT BOX (UNIFIED ACROSS ALL MODES) */}
      {/* ========================================================================= */}
      {activeSurahDetails ? (
        <div
          className="p-6 rounded-3xl sacred-border bg-[var(--bg-surface-elevated)] shadow-xl animate-fade-in space-y-4 border-2"
          style={{
            borderColor: activeTimelineArcs[0]?.color || '#059669',
          }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-lg text-xs sm:text-sm font-bold bg-amber-600 text-white shadow-xs">
                  ترتیبِ نزول #{activeSurahDetails.chronologicalOrder}
                </span>
                <span className="text-amber-500 font-bold text-base">⇄</span>
                <span className="px-3 py-1 rounded-lg text-xs sm:text-sm font-bold bg-sky-600 text-white shadow-xs">
                  ترتیبِ مصحف #{activeSurahDetails.mushafOrder}
                </span>
                <span className="px-3 py-1 rounded-lg text-xs sm:text-sm font-bold bg-purple-500/10 text-purple-800 dark:text-purple-200 border border-purple-500/30">
                  فاصلاتی چھلانگ: Δ {Math.abs(activeSurahDetails.chronologicalOrder - activeSurahDetails.mushafOrder)} مقامات
                </span>
                <span className="px-3 py-1 rounded-lg text-xs sm:text-sm font-bold bg-emerald-500/10 text-emerald-950 dark:text-emerald-100 border border-emerald-500/30 flex items-center gap-1 shadow-sm">
                  <span>📅 سالِ نزول:</span>
                  <span>{activeTimelineArcs[0]?.yearLabel || `${activeSurahDetails.approximateYearCE} CE`}</span>
                </span>
              </div>

              <div className="flex items-center gap-3">
                <h4 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif text-[var(--text-primary)] tracking-tight">
                  {activeSurahDetails.surahNameEnglish}
                </h4>
                <span className="text-base sm:text-lg font-medium text-[var(--text-muted)]">
                  ({activeSurahDetails.totalVersesInSurah} Ayahs)
                </span>
              </div>
            </div>

            <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3">
              <div className="text-left sm:text-right">
                <span className="text-5xl sm:text-6xl font-extrabold font-arabic text-emerald-800 dark:text-emerald-300 block drop-shadow-xs">
                  {activeSurahDetails.surahNameArabic}
                </span>
                <p className="text-lg sm:text-xl text-[var(--text-secondary)] font-urdu font-bold mt-1">
                  {activeSurahDetails.surahNameUrdu}
                </p>
              </div>

              {/* Chapter Lock/Unlock Toggle in Card Header */}
              <button
                onClick={toggleLockChapter}
                className={`min-h-[46px] px-4 py-2 rounded-2xl border text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer shadow-sm active:scale-95 ${
                  isLockedChapter
                    ? 'bg-amber-500/20 border-amber-500 text-amber-950 dark:text-amber-100 ring-2 ring-amber-400/50'
                    : 'bg-[var(--bg-surface)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-amber-500'
                }`}
                title={isLockedChapter ? 'سورت مقفل ہے (Chapter Locked). کلک کر کے ان لاک کریں' : 'سورت مقفل کریں (Lock Chapter)'}
              >
                {isLockedChapter ? <Lock className="w-4 h-4 text-amber-600 shrink-0" /> : <Unlock className="w-4 h-4 text-gray-400 shrink-0" />}
                <span>{isLockedChapter ? '🔒 سورت مقفل ہے (Locked)' : '🔓 سورت لاک کریں (Lock)'}</span>
              </button>
            </div>
          </div>

          {/* If Multi-Part Converging Arcs */}
          {activeTimelineArcs.length > 1 ? (
            <div className="p-3.5 sm:p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-2.5">
              <div className="text-xs sm:text-sm font-bold text-[var(--text-primary)] flex items-center gap-1.5 font-urdu">
                <Layers className="w-4 h-4 text-amber-500" />
                <span>
                  کثیر حصوں والی تدریجی سورت (Multi-Part Convergence): {activeTimelineArcs.length} مختلف ادوار کی لکیریں سورۃ #{activeSurahDetails.mushafOrder} میں یکجا ہوتی ہیں:
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 pt-1">
                {activeTimelineArcs.map((arc) => (
                  <div
                    key={arc.id}
                    className="p-3 rounded-xl border text-xs space-y-1.5"
                    style={{
                      borderColor: `${arc.color}40`,
                      backgroundColor: `${arc.color}10`,
                    }}
                  >
                    <div className="font-bold text-[var(--text-primary)] text-sm">
                      Part {arc.segmentIndex} ({arc.verseRange})
                    </div>
                    <div className="text-xs text-[var(--text-primary)] font-bold">
                      📅 {arc.yearLabel}
                    </div>
                    <div className="text-[11px] text-[var(--text-muted)] flex items-center justify-between">
                      <span>ترتیبِ نزول: #{arc.nuzulRank}</span>
                      <span className="font-bold text-emerald-700 dark:text-emerald-400">({arc.period})</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-3.5 sm:p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs sm:text-sm text-[var(--text-secondary)]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-bold text-[var(--text-primary)]">
                  نزولِ کلی (Complete Surah):
                </span>
                <span>
                  یہ سورت یکبارگی اپنے تمام تر مضامین کے ساتھ {activeSurahDetails.revelationPeriod} دور ({activeTimelineArcs[0]?.yearLabel || `${activeSurahDetails.approximateYearCE} CE`}) میں نازل ہوئی۔
                </span>
              </div>
            </div>
          )}

          {/* Context & Navigation Button */}
          <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs sm:text-sm">
            <p className="font-urdu text-[var(--text-secondary)] text-right leading-loose max-w-2xl text-xs sm:text-sm">
              {activeSurahDetails.asbabUnNuzul.summaryUrdu}
            </p>

            <button
              onClick={() => navigateToReader(activeSurahDetails.chronologicalOrder)}
              className="min-h-[50px] px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-700 to-teal-700 hover:from-emerald-800 hover:to-teal-800 text-white font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2 shrink-0 self-stretch sm:self-auto shadow-lg hover:scale-[1.02] active:scale-95 cursor-pointer"
            >
              <span>سورت کا مطالعہ کریں (Read Full Surah)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="p-5 rounded-2xl bg-[var(--bg-surface-card)] border border-dashed border-[var(--border-subtle)] text-center text-xs text-[var(--text-muted)]">
          <Info className="w-4 h-4 mx-auto text-emerald-700 dark:text-emerald-400 mb-1" />
          <span>ماؤس کو کسی بھی سورت یا نقطے پر لے جائیں تاکہ ۲۳ سالہ ربط کی محراب روشن ہو سکے۔</span>
        </div>
      )}

    </div>
  );
};
