import React from 'react';
import { RevelationNature } from '@/types/quran';
import { Layers, CheckCircle2 } from 'lucide-react';

interface RevelationNatureBadgeProps {
  nature?: RevelationNature;
  totalSegments?: number;
  currentSegmentIndex?: number;
  compact?: boolean;
  className?: string;
}

export const RevelationNatureBadge: React.FC<RevelationNatureBadgeProps> = ({
  nature = 'complete_surah',
  totalSegments,
  currentSegmentIndex,
  compact = false,
  className = '',
}) => {
  if (nature === 'complete_surah') {
    return (
      <span
        title="نزولِ کلی (جملة واحدة) — Revealed in full as a complete unified Surah"
        className={`inline-flex items-center gap-1.5 rounded-full font-semibold border transition-all ${
          compact
            ? 'px-2 py-0.5 text-[10px] bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20'
            : 'px-2.5 py-1 text-xs bg-emerald-500/15 text-emerald-800 dark:text-emerald-200 border-emerald-500/30 shadow-sm'
        } ${className}`}
      >
        <CheckCircle2 className={`${compact ? 'w-3 h-3' : 'w-3.5 h-3.5'} text-emerald-600 dark:text-emerald-400 flex-shrink-0`} />
        <span>نزولِ کلی (مکمل سورت)</span>
        {!compact && <span className="opacity-70 font-sans hidden sm:inline">• Complete Surah</span>}
      </span>
    );
  }

  // Segmented Passage
  return (
    <span
      title="نزولِ تدریجی (مقطوع) — Revealed in segments across different prophetic timeline events"
      className={`inline-flex items-center gap-1.5 rounded-full font-semibold border transition-all ${
        compact
          ? 'px-2 py-0.5 text-[10px] bg-emerald-500/10 text-emerald-900 dark:text-emerald-100 border-emerald-500/25'
          : 'px-2.5 py-1 text-xs bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-amber-500/15 text-emerald-950 dark:text-emerald-100 border-emerald-500/35 shadow-xs'
      } ${className}`}
    >
      <Layers className={`${compact ? 'w-3 h-3' : 'w-3.5 h-3.5'} text-amber-500 dark:text-amber-400 flex-shrink-0`} />
      <span>
        نزولِ تدریجی
        {totalSegments && currentSegmentIndex ? ` (حصہ ${currentSegmentIndex} از ${totalSegments})` : ' (مقطوع)'}
      </span>
      {!compact && (
        <span className="opacity-75 font-sans hidden sm:inline text-xs">
          • Segmented {totalSegments ? `(${currentSegmentIndex}/${totalSegments})` : ''}
        </span>
      )}
    </span>
  );
};
