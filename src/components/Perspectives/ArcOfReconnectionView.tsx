import React, { useState, useMemo } from 'react';
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

  // Active surah state
  const activeSurahNumber = hoveredSurahNum || selectedSurahNum;

  const activeSurahDetails = useMemo(() => {
    if (!activeSurahNumber) return null;
    return ALL_114_CHRONOLOGICAL_EVENTS.find((e) => e.mushafOrder === activeSurahNumber) || null;
  }, [activeSurahNumber]);

  const activeTimelineArcs = useMemo(() => {
    if (!activeSurahNumber) return [];
    return timelineArcs.filter((a) => a.surahNumber === activeSurahNumber);
  }, [activeSurahNumber, timelineArcs]);

  const activePureArc = useMemo(() => {
    if (!activeSurahNumber) return null;
    return pureOrderArcs.find((a) => a.surahNumber === activeSurahNumber) || null;
  }, [activeSurahNumber, pureOrderArcs]);

  const navigateToReader = (order: number) => {
    setActiveEventOrder(order);
    setPerspectiveMode('nuzul');
  };

  // Dual-rail coordinates
  const svgWidth = 1600;
  const svgHeight = 470;
  const topY = 124;
  const bottomY = svgHeight - 54;
  const padding = 48;

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
      const badgeY = topY - 24 - (tier * 26);

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
    { rank: 1, name: 'العلق #1 (آغازِ وحی)', anchor: 'start' as const, dy: -14, dx: 0, isUpper: false },
    { rank: 25, name: 'القدر #25', anchor: 'middle' as const, dy: -14, dx: 0, isUpper: false },
    { rank: 50, name: 'الإسراء #50', anchor: 'middle' as const, dy: -14, dx: 0, isUpper: false },
    { rank: 75, name: 'السجدۃ #75', anchor: 'middle' as const, dy: -14, dx: -22, isUpper: false },
    { rank: 86, name: 'المطففین #86 (آخری مکی)', anchor: 'end' as const, dy: -38, dx: -18, isUpper: true },
    { rank: 87, name: 'البقرۃ #87 (پہلی مدنی)', anchor: 'start' as const, dy: -14, dx: +22, isUpper: false },
    { rank: 100, name: 'البینۃ #100', anchor: 'middle' as const, dy: -14, dx: 0, isUpper: false },
    { rank: 114, name: 'النصر #114 (اتمامِ وحی)', anchor: 'end' as const, dy: -14, dx: 0, isUpper: false },
  ];

  // Timeline Milestones
  const propheticMilestones = [
    { rank: 1, year: '610 CE (13 BH)', label: 'آغازِ وحی / بعثت', anchor: 'start' as const },
    { rank: 28, year: '615 CE (8 BH)', label: 'ہجرتِ حبشہ', anchor: 'middle' as const },
    { rank: 58, year: '620 CE (3 BH)', label: 'معراج و مکہ', anchor: 'middle' as const },
    { rank: 86, year: '622 CE (1 AH)', label: 'ہجرتِ مدینہ', anchor: 'middle' as const },
    { rank: 102, year: '628 CE (6 AH)', label: 'صلحِ حدیبیہ', anchor: 'middle' as const },
    { rank: 114, year: '632 CE (10 AH)', label: 'اتمامِ وحی و غدیر', anchor: 'end' as const },
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

        {/* 4-Way Mode Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 pt-2 border-t border-[var(--border-subtle)]">
          <button
            onClick={() => setChartViewMode('order_comparison')}
            className={`p-3 rounded-2xl border text-start transition-all flex items-center gap-3 ${
              chartViewMode === 'order_comparison'
                ? 'bg-emerald-800 text-white border-emerald-800 shadow-md ring-2 ring-emerald-500/40'
                : 'bg-[var(--bg-surface)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-emerald-500'
            }`}
          >
            <div className={`p-2 rounded-xl shrink-0 ${chartViewMode === 'order_comparison' ? 'bg-white/20 text-white' : 'bg-emerald-500/10 text-emerald-600'}`}>
              <GitCompare className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold font-urdu">۱۱۴ سورتوں کا خالص تقابلی ربط</div>
              <div className="text-[10px] opacity-80 font-sans">Pure 1-to-1: Nuzul ⇄ Mushaf Dots</div>
            </div>
          </button>

          <button
            onClick={() => setChartViewMode('timeline')}
            className={`p-3 rounded-2xl border text-start transition-all flex items-center gap-3 ${
              chartViewMode === 'timeline'
                ? 'bg-emerald-800 text-white border-emerald-800 shadow-md ring-2 ring-emerald-500/40'
                : 'bg-[var(--bg-surface)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-emerald-500'
            }`}
          >
            <div className={`p-2 rounded-xl shrink-0 ${chartViewMode === 'timeline' ? 'bg-white/20 text-white' : 'bg-amber-500/10 text-amber-600'}`}>
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold font-urdu">۲۳ سالہ زمانی و مقطوعات ٹائم لائن</div>
              <div className="text-[10px] opacity-80 font-sans">Historical Years & Multi-Part Arcs</div>
            </div>
          </button>

          <button
            onClick={() => setChartViewMode('delta_spectrum')}
            className={`p-3 rounded-2xl border text-start transition-all flex items-center gap-3 ${
              chartViewMode === 'delta_spectrum'
                ? 'bg-emerald-800 text-white border-emerald-800 shadow-md ring-2 ring-emerald-500/40'
                : 'bg-[var(--bg-surface)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-emerald-500'
            }`}
          >
            <div className={`p-2 rounded-xl shrink-0 ${chartViewMode === 'delta_spectrum' ? 'bg-white/20 text-white' : 'bg-purple-500/10 text-purple-600'}`}>
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold font-urdu">فاصلاتی تغیّر کا طیف (Delta Spectrum)</div>
              <div className="text-[10px] opacity-80 font-sans">Leap Analysis & Permanent Anchors</div>
            </div>
          </button>

          <button
            onClick={() => setChartViewMode('all')}
            className={`p-3 rounded-2xl border text-start transition-all flex items-center gap-3 ${
              chartViewMode === 'all'
                ? 'bg-emerald-800 text-white border-emerald-800 shadow-md ring-2 ring-emerald-500/40'
                : 'bg-[var(--bg-surface)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-emerald-500'
            }`}
          >
            <div className={`p-2 rounded-xl shrink-0 ${chartViewMode === 'all' ? 'bg-white/20 text-white' : 'bg-sky-500/10 text-sky-600'}`}>
              <LayoutGrid className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold font-urdu">تمام تقابلی چارٹس اکٹھے</div>
              <div className="text-[10px] opacity-80 font-sans">Stacked Comprehensive View</div>
            </div>
          </button>
        </div>
      </div>

      {/* Global Quick Selector Bar */}
      <div className="p-3 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs font-bold text-[var(--text-primary)] shrink-0 flex items-center gap-1.5 font-urdu">
            <Compass className="w-4 h-4 text-emerald-600" />
            <span>سورت منتخب کریں:</span>
          </span>
          <select
            value={selectedSurahNum || 1}
            onChange={(e) => setSelectedSurahNum(Number(e.target.value))}
            className="w-full sm:w-72 px-3 py-1.5 rounded-xl text-xs bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] font-medium focus:ring-2 focus:ring-emerald-500 shadow-sm"
          >
            {ALL_114_CHRONOLOGICAL_EVENTS.map((evt) => (
              <option key={`opt-${evt.mushafOrder}`} value={evt.mushafOrder}>
                نزول #{evt.chronologicalOrder} ➔ مصحف #{evt.mushafOrder}. {evt.surahNameEnglish} ({evt.surahNameArabic}) — Δ {Math.abs(evt.chronologicalOrder - evt.mushafOrder)}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto justify-between sm:justify-end">
          <button
            onClick={() => goToAdjacentSurah('prev')}
            className="px-3 py-1.5 rounded-xl bg-[var(--bg-surface-elevated)] hover:bg-emerald-700 hover:text-white border border-[var(--border-subtle)] text-xs font-medium transition-all"
            title="Previous Surah"
          >
            ◀ پچھلی سورت
          </button>
          <button
            onClick={() => goToAdjacentSurah('next')}
            className="px-3 py-1.5 rounded-xl bg-[var(--bg-surface-elevated)] hover:bg-emerald-700 hover:text-white border border-[var(--border-subtle)] text-xs font-medium transition-all"
            title="Next Surah"
          >
            اگلی سورت ▶
          </button>

          {/* Key landmark quick chips */}
          <div className="hidden lg:flex items-center gap-1 pl-2">
            {[
              { name: 'العلق (1)', mushaf: 96 },
              { name: 'البقرۃ (87)', mushaf: 2 },
              { name: 'آلِ عمران (89)', mushaf: 3 },
              { name: 'الفاتحہ (5)', mushaf: 1 },
              { name: 'ص (38, Δ=0)', mushaf: 38 },
              { name: 'النصر (114)', mushaf: 110 },
            ].map((chip) => (
              <button
                key={chip.mushaf}
                onClick={() => setSelectedSurahNum(chip.mushaf)}
                className={`px-2 py-1 rounded-lg text-[11px] font-semibold border transition-all ${
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
            <div className="text-xs text-[var(--text-muted)] font-medium">
              اوپر ۱۱۴ نزولی سورتیں ⇄ نیچے ۱۱۴ مصحف سورتیں (۱ تا ۱۱۴ بالمقابل ۱ تا ۱۱۴)
            </div>
          </div>

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
          <div className="w-full relative py-2">
            <svg
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              className="w-full h-auto select-none block overflow-visible cursor-pointer touch-manipulation"
              preserveAspectRatio="xMidYMid meet"
              onClick={handlePureOrderSvgClick}
              onMouseLeave={() => setHoveredSurahNum(null)}
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
                      y1={m.isUpper ? topY - 30 : topY - 8}
                      x2={tx}
                      y2={topY + 6}
                      stroke="var(--text-muted)"
                      strokeWidth="1.5"
                      opacity="0.5"
                    />
                    <text
                      x={mx}
                      y={topY + m.dy}
                      textAnchor={m.anchor}
                      fontSize="11"
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
                      y1={topY - 58}
                      x2={midX}
                      y2={topY + 20}
                      stroke="#059669"
                      strokeWidth="2"
                      strokeDasharray="3 3"
                      opacity="0.85"
                    />
                    {/* Compact boundary pill positioned between active badge (tier 1) and labels (tier 2) */}
                    <rect
                      x={midX - 48}
                      y={topY - 74}
                      width="96"
                      height="20"
                      rx="10"
                      fill="#047857"
                      stroke="#065F46"
                      strokeWidth="1.5"
                      className="shadow-sm"
                    />
                    <text
                      x={midX}
                      y={topY - 60}
                      textAnchor="middle"
                      fontSize="10"
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

                const cy1 = topY + 115;
                const cy2 = bottomY - 115;
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

              {/* Active Highlighted Pure Arc */}
              {activePureArc && (() => {
                const x1 = getTopX(activePureArc.nuzulRank);
                const x2 = getBottomX(activePureArc.mushafOrder);
                const cy1 = topY + 115;
                const cy2 = bottomY - 115;
                const d = `M ${x1} ${topY} C ${x1} ${cy1}, ${x2} ${cy2}, ${x2} ${bottomY}`;

                return (
                  <g key={`active-pure-${activePureArc.id}`}>
                    <path
                      d={d}
                      fill="none"
                      stroke={activePureArc.color}
                      strokeWidth="11"
                      strokeOpacity="0.28"
                      filter="url(#glowPure)"
                    />
                    <path
                      d={d}
                      fill="none"
                      stroke={activePureArc.color}
                      strokeWidth="4.2"
                      strokeOpacity="0.95"
                    />

                    {/* Top Origin Halo & Dot */}
                    <circle cx={x1} cy={topY} r="14" fill={activePureArc.color} opacity="0.22" />
                    <circle cx={x1} cy={topY} r="7.5" fill={activePureArc.color} stroke="#FFFFFF" strokeWidth="2" />

                    {/* Bottom Destination Halo & Dot */}
                    <circle cx={x2} cy={bottomY} r="14" fill={activePureArc.color} opacity="0.22" />
                    <circle cx={x2} cy={bottomY} r="7.5" fill={activePureArc.color} stroke="#FFFFFF" strokeWidth="2" />

                    {/* Top Origin Callout Badge with elevated leader line floating above Hijrah boundary */}
                    <line
                      x1={x1}
                      y1={topY - 10}
                      x2={x1}
                      y2={topY - 84}
                      stroke={activePureArc.color}
                      strokeWidth="1.8"
                      strokeDasharray="2.5 2.5"
                    />
                    <circle cx={x1} cy={topY - 10} r="2.5" fill={activePureArc.color} />
                    <rect
                      x={Math.max(12, Math.min(svgWidth - 232, x1 - 110))}
                      y={topY - 108}
                      width="220"
                      height="24"
                      rx="12"
                      fill="#FFFFFF"
                      stroke="#0F172A"
                      strokeWidth="1.8"
                      className="shadow-md"
                    />
                    <text
                      x={Math.max(12, Math.min(svgWidth - 232, x1 - 110)) + 110}
                      y={topY - 92}
                      textAnchor="middle"
                      fontSize="10.5"
                      fontWeight="800"
                      fill="#000000"
                      className="font-sans select-none"
                    >
                      نزول #{activePureArc.nuzulRank}: {activePureArc.surahNameEnglish} ({activePureArc.surahNameArabic})
                    </text>

                    {/* Bottom Destination Callout Badge with lower leader line */}
                    <line
                      x1={x2}
                      y1={bottomY + 8}
                      x2={x2}
                      y2={bottomY + 24}
                      stroke="#0284C7"
                      strokeWidth="1.8"
                      strokeDasharray="2.5 2.5"
                    />
                    <circle cx={x2} cy={bottomY + 8} r="2.5" fill="#0284C7" />
                    <rect
                      x={Math.max(12, Math.min(svgWidth - 232, x2 - 110))}
                      y={bottomY + 24}
                      width="220"
                      height="24"
                      rx="12"
                      fill="#FFFFFF"
                      stroke="#0284C7"
                      strokeWidth="1.8"
                    />
                    <text
                      x={Math.max(12, Math.min(svgWidth - 232, x2 - 110)) + 110}
                      y={bottomY + 40}
                      textAnchor="middle"
                      fontSize="10.5"
                      fontWeight="800"
                      fill="#000000"
                      className="font-sans select-none"
                    >
                      مصحف #{activePureArc.mushafOrder}: {activePureArc.surahNameEnglish} (Δ {activePureArc.delta})
                    </text>
                  </g>
                );
              })()}

              {/* Top Rail Tick Nodes (1 to 114) */}
              {ALL_114_CHRONOLOGICAL_EVENTS.map((evt) => {
                const cx = getTopX(evt.chronologicalOrder);
                const isSelected = activeSurahNumber === evt.mushafOrder;

                return (
                  <circle
                    key={`top-pure-dot-${evt.chronologicalOrder}`}
                    cx={cx}
                    cy={topY}
                    r={isSelected ? '7' : '3.8'}
                    fill={isSelected ? '#F59E0B' : 'var(--text-muted)'}
                    opacity={isSelected ? '1' : '0.4'}
                    stroke={isSelected ? '#FFFFFF' : 'transparent'}
                    strokeWidth={isSelected ? '1.5' : '0'}
                    className="cursor-pointer transition-colors duration-150"
                    onMouseEnter={() => setHoveredSurahNum(evt.mushafOrder)}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedSurahNum(evt.mushafOrder);
                    }}
                  />
                );
              })}

              {/* Bottom Rail Tick Nodes (1 to 114) */}
              {ALL_114_CHRONOLOGICAL_EVENTS.map((evt) => {
                const cx = getBottomX(evt.mushafOrder);
                const isSelected = activeSurahNumber === evt.mushafOrder;

                return (
                  <circle
                    key={`bot-pure-dot-${evt.mushafOrder}`}
                    cx={cx}
                    cy={bottomY}
                    r={isSelected ? '7' : '3.8'}
                    fill={isSelected ? '#0284C7' : 'var(--text-muted)'}
                    opacity={isSelected ? '1' : '0.4'}
                    stroke={isSelected ? '#FFFFFF' : 'transparent'}
                    strokeWidth={isSelected ? '1.5' : '0'}
                    className="cursor-pointer transition-colors duration-150"
                    onMouseEnter={() => setHoveredSurahNum(evt.mushafOrder)}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedSurahNum(evt.mushafOrder);
                    }}
                  />
                );
              })}
            </svg>
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
            <div className="text-xs text-[var(--text-muted)] font-medium">
              اوپر ۲۳ سالہ تاریخ (۶۱۰ تا ۶۳۲ عیسوی) اور کثیر حصوں والی سورتوں کے جداگانہ نزولی مقامات
            </div>
          </div>

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
          <div className="w-full relative py-2">
            <svg
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              className="w-full h-auto select-none block overflow-visible cursor-pointer touch-manipulation"
              preserveAspectRatio="xMidYMid meet"
              onClick={handleTimelineSvgClick}
              onMouseLeave={() => setHoveredSurahNum(null)}
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
                    y1={topY - 8}
                    x2={getTopX(pm.rank)}
                    y2={topY + 8}
                    stroke="var(--text-muted)"
                    strokeWidth="1.5"
                    opacity="0.5"
                  />
                  <text
                    x={getTopX(pm.rank)}
                    y={topY - 14}
                    textAnchor={pm.anchor}
                    fontSize="11"
                    fontWeight="700"
                    fill="var(--text-primary)"
                    className="font-urdu"
                  >
                    {pm.label}
                  </text>
                  <text
                    x={getTopX(pm.rank)}
                    y={topY - 28}
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

                const cy1 = topY + 115;
                const cy2 = bottomY - 115;
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
                    onMouseEnter={() => setHoveredSurahNum(arc.surahNumber)}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedSurahNum(arc.surahNumber);
                    }}
                  />
                );
              })}

              {/* Active Arcs (with converging branches for multi-part surahs) */}
              {activeTimelineArcs.map((arc) => {
                const x1 = getTopX(arc.nuzulRank);
                const x2 = getBottomX(arc.mushafOrder);

                const cy1 = topY + 115;
                const cy2 = bottomY - 115;
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

                return (
                  <g key={`top-timeline-tick-${evt.chronologicalOrder}`}>
                    {isSelected && (
                      <circle cx={cx} cy={topY} r="12" fill="#F59E0B" opacity="0.22" />
                    )}
                    <circle
                      cx={cx}
                      cy={topY}
                      r={isSelected ? '7' : '4'}
                      fill={isSelected ? '#F59E0B' : 'var(--text-muted)'}
                      opacity={isSelected ? '1' : '0.45'}
                      stroke={isSelected ? '#FFFFFF' : 'transparent'}
                      strokeWidth={isSelected ? '1.5' : '0'}
                      className="cursor-pointer transition-colors duration-150"
                      onMouseEnter={() => setHoveredSurahNum(evt.mushafOrder)}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedSurahNum(evt.mushafOrder);
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

              {/* Bottom Destination Pill */}
              {activeSurahDetails && (
                <g key={`bot-dest-${activeSurahDetails.mushafOrder}`}>
                  <line
                    x1={getBottomX(activeSurahDetails.mushafOrder)}
                    y1={bottomY + 8}
                    x2={getBottomX(activeSurahDetails.mushafOrder)}
                    y2={bottomY + 16}
                    stroke="#0284C7"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                  />
                  <rect
                    x={getBottomX(activeSurahDetails.mushafOrder) - 75}
                    y={bottomY + 16}
                    width="150"
                    height="20"
                    rx="10"
                    fill="#FFFFFF"
                    stroke="#0284C7"
                    strokeWidth="1.6"
                  />
                  <text
                    x={getBottomX(activeSurahDetails.mushafOrder)}
                    y={bottomY + 30}
                    textAnchor="middle"
                    fontSize="10.5"
                    fontWeight="800"
                    fill="#000000"
                    className="font-sans select-none"
                  >
                    #{activeSurahDetails.mushafOrder} {activeSurahDetails.surahNameEnglish} ({activeSurahDetails.surahNameArabic})
                  </text>
                </g>
              )}

              {/* Bottom Rail Tick Nodes */}
              {ALL_114_CHRONOLOGICAL_EVENTS.map((evt) => {
                const cx = getBottomX(evt.mushafOrder);
                const isSelected = activeSurahNumber === evt.mushafOrder;

                return (
                  <g key={`bot-tick-${evt.mushafOrder}`}>
                    {isSelected && (
                      <circle cx={cx} cy={bottomY} r="12" fill="#0284C7" opacity="0.22" />
                    )}
                    <circle
                      cx={cx}
                      cy={bottomY}
                      r={isSelected ? '7' : '4'}
                      fill={isSelected ? '#0284C7' : 'var(--text-muted)'}
                      opacity={isSelected ? '1' : '0.45'}
                      stroke={isSelected ? '#FFFFFF' : 'transparent'}
                      strokeWidth={isSelected ? '1.5' : '0'}
                      className="cursor-pointer transition-colors duration-150"
                      onMouseEnter={() => setHoveredSurahNum(evt.mushafOrder)}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedSurahNum(evt.mushafOrder);
                      }}
                    />
                  </g>
                );
              })}
            </svg>
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
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-amber-600 text-white">
                  ترتیبِ نزول #{activeSurahDetails.chronologicalOrder}
                </span>
                <span className="text-amber-500 font-bold">⇄</span>
                <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-sky-600 text-white">
                  ترتیبِ مصحف #{activeSurahDetails.mushafOrder}
                </span>
                <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-purple-500/10 text-purple-800 dark:text-purple-200 border border-purple-500/30">
                  فاصلاتی چھلانگ: Δ {Math.abs(activeSurahDetails.chronologicalOrder - activeSurahDetails.mushafOrder)} مقامات
                </span>
                <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-emerald-500/10 text-emerald-950 dark:text-emerald-100 border border-emerald-500/30 flex items-center gap-1 shadow-sm">
                  <span>📅 سالِ نزول:</span>
                  <span>{activeTimelineArcs[0]?.yearLabel || `${activeSurahDetails.approximateYearCE} CE`}</span>
                </span>
              </div>

              <h4 className="text-xl sm:text-2xl font-bold font-serif text-[var(--text-primary)] flex items-center gap-2">
                <span>{activeSurahDetails.surahNameEnglish}</span>
                <span className="text-sm font-normal text-[var(--text-muted)]">
                  ({activeSurahDetails.totalVersesInSurah} Ayahs)
                </span>
              </h4>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-3xl font-bold font-arabic text-emerald-800 dark:text-emerald-300">
                {activeSurahDetails.surahNameArabic}
              </span>
              <p className="text-xs text-[var(--text-secondary)] font-urdu font-medium">
                {activeSurahDetails.surahNameUrdu}
              </p>
            </div>
          </div>

          {/* If Multi-Part Converging Arcs */}
          {activeTimelineArcs.length > 1 ? (
            <div className="p-3.5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-2">
              <div className="text-xs font-bold text-[var(--text-primary)] flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-amber-500" />
                <span>
                  کثیر حصوں والی تدریجی سورت (Multi-Part Convergence): {activeTimelineArcs.length} مختلف ادوار کی لکیریں سورۃ #{activeSurahDetails.mushafOrder} میں یکجا ہوتی ہیں:
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 pt-1">
                {activeTimelineArcs.map((arc) => (
                  <div
                    key={arc.id}
                    className="p-2.5 rounded-xl border text-xs space-y-1"
                    style={{
                      borderColor: `${arc.color}40`,
                      backgroundColor: `${arc.color}10`,
                    }}
                  >
                    <div className="font-bold text-[var(--text-primary)]">
                      Part {arc.segmentIndex} ({arc.verseRange})
                    </div>
                    <div className="text-[11px] text-[var(--text-primary)] font-semibold">
                      📅 {arc.yearLabel}
                    </div>
                    <div className="text-[10px] text-[var(--text-muted)] flex items-center justify-between">
                      <span>ترتیبِ نزول: #{arc.nuzulRank}</span>
                      <span className="font-semibold text-emerald-700 dark:text-emerald-400">({arc.period})</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-3.5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs text-[var(--text-secondary)]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span className="font-semibold text-[var(--text-primary)]">
                  نزولِ کلی (Complete Surah):
                </span>
                <span>
                  یہ سورت یکبارگی اپنے تمام تر مضامین کے ساتھ {activeSurahDetails.revelationPeriod} دور ({activeTimelineArcs[0]?.yearLabel || `${activeSurahDetails.approximateYearCE} CE`}) میں نازل ہوئی۔
                </span>
              </div>
            </div>
          )}

          {/* Context & Navigation Button */}
          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <p className="font-urdu text-[var(--text-secondary)] text-right leading-relaxed max-w-2xl">
              {activeSurahDetails.asbabUnNuzul.summaryUrdu}
            </p>

            <button
              onClick={() => navigateToReader(activeSurahDetails.chronologicalOrder)}
              className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold transition-all flex items-center gap-1.5 shrink-0 self-start sm:self-auto shadow-md"
            >
              <span>سورت کا مطالعہ کریں (Read Surah)</span>
              <ArrowRight className="w-3.5 h-3.5" />
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
