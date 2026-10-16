import React, { useState } from 'react';
import {
  MemorizationSurah,
  SURAHS_BY_MUSHAF,
  SURAHS_BY_NUZOOL,
} from '../../data/surahMemorizationData';
import { SURAH_114_VISUAL_CATALOG } from '../../data/surahVisualCatalog114';
import { SurahVisualBadge } from './SurahVisualBadge';
import {
  ArrowLeftRight,
  Sparkles,
  Info,
  Eye,
  EyeOff,
  Image as ImageIcon,
} from 'lucide-react';

interface Props {
  onSelectSurah: (surah: MemorizationSurah) => void;
}

export const SurahDualTrackHelix: React.FC<Props> = ({ onSelectSurah }) => {
  const [highlightedMushafId, setHighlightedMushafId] = useState<number>(1);
  const [activeFilterPhase, setActiveFilterPhase] = useState<string>('all');

  // Pedagogical Visual Checkboxes / Visibility Toggles
  const [showVisualIcons, setShowVisualIcons] = useState<boolean>(true);
  const [showSurahNames, setShowSurahNames] = useState<boolean>(true);
  const [showMeanings, setShowMeanings] = useState<boolean>(true);
  const [showNuzoolOrder, setShowNuzoolOrder] = useState<boolean>(true);
  const [revealedIds, setRevealedIds] = useState<Set<number>>(new Set());

  const selectedSurah =
    SURAHS_BY_MUSHAF.find((s) => s.mushafOrder === highlightedMushafId) ||
    SURAHS_BY_MUSHAF[0];

  const getEmoji = (mushafNum: number) =>
    SURAH_114_VISUAL_CATALOG[mushafNum]?.emoji || '📖';

  const toggleRevealSurah = (mushafNum: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setRevealedIds((prev) => {
      const next = new Set(prev);
      if (next.has(mushafNum)) {
        next.delete(mushafNum);
      } else {
        next.add(mushafNum);
      }
      return next;
    });
  };

  // Leaping distance calculation
  const leapDistance = Math.abs(selectedSurah.mushafOrder - selectedSurah.nuzoolOrder);

  return (
    <div className="w-full flex flex-col font-sans select-none" dir="rtl">
      {/* ── TOP HUD BANNER & VISIBILITY CONTROLS ── */}
      <div className="w-full px-4 sm:px-6 py-4 bg-[var(--bg-surface)] border-b border-[var(--border-subtle)] shrink-0 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h2 className="text-base sm:text-lg font-bold font-urdu text-[var(--text-primary)]">
                دوہری متصل پٹری (Dual-Track Helix & Visual Leap Connections)
              </h2>
            </div>
            <p className="text-xs text-[var(--text-muted)] font-urdu">
              تصویروں اور علامتوں کے ذریعے سورتوں کو پہچانیے؛ نام چھپا کر بچوں کی بصری یادداشت کی جانچ کیجیے!
            </p>
          </div>

          {/* Quick Filter by Era */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {[
              { id: 'all', label: 'تمام (۱۱۴)' },
              { id: 'early_makki', label: 'اوائلِ مکہ' },
              { id: 'mid_makki', label: 'اواسطِ مکہ' },
              { id: 'late_makki', label: 'اواخرِ مکہ' },
              { id: 'madani', label: 'مدینہ منورہ' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilterPhase(f.id)}
                className={`px-3 py-1 rounded-xl text-xs font-urdu font-bold transition-all cursor-pointer ${
                  activeFilterPhase === f.id
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-[var(--bg-surface-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── PEDAGOGICAL VISUAL CHECKBOXES TOOLBAR ── */}
        <div className="p-3 rounded-2xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-3 text-xs font-urdu">
          <div className="flex items-center gap-2 font-bold text-[var(--text-muted)]">
            <ImageIcon className="w-4 h-4 text-amber-500" />
            <span>بصری و تدریسی فلٹرز (Visual Toggles):</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            {/* 1. Show Icons */}
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={showVisualIcons}
                onChange={(e) => setShowVisualIcons(e.target.checked)}
                className="accent-amber-600 rounded"
              />
              <span className="font-semibold text-[var(--text-primary)]">تصویر / علامت دکھائیں</span>
            </label>

            {/* 2. Show Surah Name (Guessing Mode) */}
            <label className="flex items-center gap-1.5 cursor-pointer bg-amber-500/10 px-2.5 py-1 rounded-xl border border-amber-500/30">
              <input
                type="checkbox"
                checked={showSurahNames}
                onChange={(e) => setShowSurahNames(e.target.checked)}
                className="accent-amber-600 rounded"
              />
              {showSurahNames ? (
                <Eye className="w-3.5 h-3.5 text-amber-500" />
              ) : (
                <EyeOff className="w-3.5 h-3.5 text-rose-500" />
              )}
              <span className="font-bold text-amber-900 dark:text-amber-200">
                {showSurahNames ? 'سورت کا نام ظاہر ہے' : 'نام مخفی (بصری پہیلی موڈ)'}
              </span>
            </label>

            {/* 3. Show Meaning */}
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={showMeanings}
                onChange={(e) => setShowMeanings(e.target.checked)}
                className="accent-emerald-600 rounded"
              />
              <span className="font-semibold text-[var(--text-primary)]">معنی و مفہوم</span>
            </label>

            {/* 4. Show Nuzool Order */}
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={showNuzoolOrder}
                onChange={(e) => setShowNuzoolOrder(e.target.checked)}
                className="accent-emerald-600 rounded"
              />
              <span className="font-semibold text-[var(--text-primary)]">نزولی نمبر</span>
            </label>
          </div>
        </div>

        {/* ── ACTIVE SURAH DUAL LEAP HUD ── */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-950/30 via-amber-950/20 to-indigo-950/30 border border-emerald-500/30 flex flex-wrap items-center justify-between gap-4 shadow-lg">
          {/* Active Surah Titles & Visual Icon */}
          <div className="flex items-center gap-3">
            <SurahVisualBadge
              mushafOrder={selectedSurah.mushafOrder}
              fallbackEmoji={getEmoji(selectedSurah.mushafOrder)}
              size="md"
              altText={selectedSurah.nameUrdu}
            />
            <div>
              <div className="text-xs text-[var(--text-muted)] font-urdu">
                منتخب سورت:
              </div>
              <div className="text-lg sm:text-xl font-bold font-urdu text-[var(--text-primary)] flex items-center gap-2">
                <span>{selectedSurah.nameUrdu}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-black/20 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30 font-urdu">
                  {selectedSurah.meaningUrdu}
                </span>
              </div>
            </div>
          </div>

          {/* Dual Coordinates with Leap Arrow */}
          <div className="flex items-center gap-3 sm:gap-6 text-xs sm:text-sm font-urdu">
            {/* Mushaf Pill */}
            <div className="px-4 py-2 rounded-xl bg-[var(--bg-surface)] border border-amber-500/40 text-center shadow-xs">
              <span className="text-[10px] text-[var(--text-muted)] block">مصحفی نمبر:</span>
              <span className="text-base sm:text-lg font-black text-amber-700 dark:text-amber-400">
                #{selectedSurah.mushafOrder}
              </span>
            </div>

            {/* Leap Thread Indicator */}
            <div className="flex flex-col items-center">
              <ArrowLeftRight className="w-5 h-5 text-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 mt-0.5 whitespace-nowrap">
                {leapDistance === 0 ? 'کوئی فاصلہ نہیں' : `${leapDistance} درجات کا فرق`}
              </span>
            </div>

            {/* Nuzool Pill */}
            <div className="px-4 py-2 rounded-xl bg-[var(--bg-surface)] border border-emerald-500/40 text-center shadow-xs">
              <span className="text-[10px] text-[var(--text-muted)] block">نزولی نمبر:</span>
              <span className="text-base sm:text-lg font-black text-emerald-700 dark:text-emerald-400">
                #{selectedSurah.nuzoolOrder}
              </span>
            </div>
          </div>

          {/* Mnemonic Hook */}
          <div className="hidden xl:flex items-center gap-2 max-w-sm p-2.5 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-xs font-urdu text-[var(--text-secondary)]">
            <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
            <span className="line-clamp-2">{selectedSurah.mnemonicKeyUrdu}</span>
          </div>

          <button
            onClick={() => onSelectSurah(selectedSurah)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold font-urdu transition-all shadow-md cursor-pointer shrink-0"
          >
            <Info className="w-4 h-4" />
            <span>مکمل تفصیلات و تلازمات</span>
          </button>
        </div>
      </div>

      {/* ── PARALLEL TRACKS DUAL COLUMNS ── */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 p-4 sm:p-6 max-w-7xl mx-auto">
        {/* ══════════════════════════════════════════════════════════ */}
        {/* COLUMN 1: MUSHAF ORDER (۱ تا ۱۱۴) */}
        {/* ══════════════════════════════════════════════════════════ */}
        <div className="rounded-3xl p-4 sm:p-5 bg-[var(--bg-surface)] border border-amber-500/30 shadow-xl space-y-3">
          <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-500" />
              <h3 className="font-bold text-sm sm:text-base font-urdu text-[var(--text-primary)]">
                پٹری الف: مصحفی ترتیب (Mushaf Order: 1 to 114)
              </h3>
            </div>
            <span className="text-xs text-[var(--text-muted)] font-urdu">
              الفاتحہ (#۱) تا الناس (#۱۱۴)
            </span>
          </div>

          <div className="space-y-2 max-h-[70vh] overflow-y-auto no-scrollbar pr-1">
            {SURAHS_BY_MUSHAF.filter(
              (s) => activeFilterPhase === 'all' || s.chronologicalPhase === activeFilterPhase
            ).map((surah) => {
              const isSelected = surah.mushafOrder === highlightedMushafId;
              const isRevealed = showSurahNames || revealedIds.has(surah.mushafOrder);

              return (
                <div
                  key={`mushaf-${surah.mushafOrder}`}
                  onClick={() => setHighlightedMushafId(surah.mushafOrder)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-amber-500/20 border-amber-500 ring-2 ring-amber-400 shadow-md scale-[1.01]'
                      : 'bg-[var(--bg-surface-elevated)] border-[var(--border-subtle)] hover:border-amber-400/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Visual Icon Badge */}
                    {showVisualIcons && (
                      <SurahVisualBadge
                        mushafOrder={surah.mushafOrder}
                        fallbackEmoji={getEmoji(surah.mushafOrder)}
                        size="sm"
                        altText={surah.nameUrdu}
                      />
                    )}

                    <span className="w-7 h-7 rounded-lg bg-[var(--bg-surface)] text-amber-800 dark:text-amber-300 flex items-center justify-center font-bold text-xs font-urdu shrink-0 border border-[var(--border-subtle)]">
                      #{surah.mushafOrder}
                    </span>

                    <div>
                      {isRevealed ? (
                        <>
                          <div className="font-bold text-sm font-urdu text-[var(--text-primary)]">
                            {surah.nameUrdu}
                          </div>
                          {showMeanings && (
                            <div className="text-[11px] text-[var(--text-muted)] font-urdu truncate max-w-[160px]">
                              {surah.meaningUrdu}
                            </div>
                          )}
                        </>
                      ) : (
                        <button
                          onClick={(e) => toggleRevealSurah(surah.mushafOrder, e)}
                          className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-900 dark:text-amber-200 text-xs font-urdu font-bold transition-colors cursor-pointer"
                        >
                          [ ؟ کلک کر کے نام بوجھیں ]
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-urdu shrink-0">
                    {showNuzoolOrder && (
                      <span className="px-2 py-0.5 rounded-lg bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 font-bold">
                        نزول: #{surah.nuzoolOrder}
                      </span>
                    )}
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${
                      surah.revelationPlace === 'meccan'
                        ? 'bg-amber-500/10 text-amber-800 dark:text-amber-300'
                        : 'bg-emerald-500/10 text-emerald-800 dark:text-emerald-300'
                    }`}>
                      {surah.revelationPlace === 'meccan' ? 'مکی' : 'مدنی'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════ */}
        {/* COLUMN 2: NUZOOL ORDER (۱ تا ۱۱۴) */}
        {/* ══════════════════════════════════════════════════════════ */}
        <div className="rounded-3xl p-4 sm:p-5 bg-[var(--bg-surface)] border border-emerald-500/30 shadow-xl space-y-3">
          <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500" />
              <h3 className="font-bold text-sm sm:text-base font-urdu text-[var(--text-primary)]">
                پٹری ب: نزولی تاریخی ترتیب (Nuzool Order: 1 to 114)
              </h3>
            </div>
            <span className="text-xs text-[var(--text-muted)] font-urdu">
              العلق (#۱) تا النصر (#۱۱۴)
            </span>
          </div>

          <div className="space-y-2 max-h-[70vh] overflow-y-auto no-scrollbar pr-1">
            {SURAHS_BY_NUZOOL.filter(
              (s) => activeFilterPhase === 'all' || s.chronologicalPhase === activeFilterPhase
            ).map((surah) => {
              const isSelected = surah.mushafOrder === highlightedMushafId;
              const isRevealed = showSurahNames || revealedIds.has(surah.mushafOrder);

              return (
                <div
                  key={`nuzool-${surah.nuzoolOrder}`}
                  onClick={() => setHighlightedMushafId(surah.mushafOrder)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-emerald-500/20 border-emerald-500 ring-2 ring-emerald-400 shadow-md scale-[1.01]'
                      : 'bg-[var(--bg-surface-elevated)] border-[var(--border-subtle)] hover:border-emerald-400/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Visual Icon Badge */}
                    {showVisualIcons && (
                      <SurahVisualBadge
                        mushafOrder={surah.mushafOrder}
                        fallbackEmoji={getEmoji(surah.mushafOrder)}
                        size="sm"
                        altText={surah.nameUrdu}
                      />
                    )}

                    <span className="w-7 h-7 rounded-lg bg-[var(--bg-surface)] text-emerald-800 dark:text-emerald-300 flex items-center justify-center font-bold text-xs font-urdu shrink-0 border border-[var(--border-subtle)]">
                      #{surah.nuzoolOrder}
                    </span>

                    <div>
                      {isRevealed ? (
                        <>
                          <div className="font-bold text-sm font-urdu text-[var(--text-primary)]">
                            {surah.nameUrdu}
                          </div>
                          {showMeanings && (
                            <div className="text-[11px] text-[var(--text-muted)] font-urdu truncate max-w-[160px]">
                              {surah.meaningUrdu}
                            </div>
                          )}
                        </>
                      ) : (
                        <button
                          onClick={(e) => toggleRevealSurah(surah.mushafOrder, e)}
                          className="px-2.5 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-900 dark:text-emerald-200 text-xs font-urdu font-bold transition-colors cursor-pointer"
                        >
                          [ ؟ کلک کر کے نام بوجھیں ]
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-urdu shrink-0">
                    <span className="px-2 py-0.5 rounded-lg bg-amber-500/15 text-amber-800 dark:text-amber-300 font-bold">
                      مصحف: #{surah.mushafOrder}
                    </span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${
                      surah.revelationPlace === 'meccan'
                        ? 'bg-amber-500/10 text-amber-800 dark:text-amber-300'
                        : 'bg-emerald-500/10 text-emerald-800 dark:text-emerald-300'
                    }`}>
                      {surah.revelationPlace === 'meccan' ? 'مکی' : 'مدنی'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
