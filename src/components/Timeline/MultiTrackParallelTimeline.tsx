import React, { useState, useRef } from 'react';
import {
  MULTI_TRACK_EPOCH_POINTS,
  MultiTrackEpochPoint,
} from '../../data/multiTrackTimelineData';
import {
  Calendar,
  Clock,
  Compass,
  Layers,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Info,
  X,
  BookOpen,
} from 'lucide-react';

interface Props {
  onOpenGuide?: () => void;
}

export const MultiTrackParallelTimeline: React.FC<Props> = ({ onOpenGuide }) => {
  const [selectedPoint, setSelectedPoint] = useState<MultiTrackEpochPoint>(
    MULTI_TRACK_EPOCH_POINTS[5] // Default to 1 Aam al-Feel / 570 CE
  );
  const [modalPoint, setModalPoint] = useState<MultiTrackEpochPoint | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Drag-to-scroll state
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!trackRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - trackRef.current.offsetLeft);
    setScrollLeftState(trackRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !trackRef.current) return;
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    trackRef.current.scrollLeft = scrollLeftState - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const scrollLeftStep = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: -380, behavior: 'smooth' });
    }
  };

  const scrollRightStep = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: 380, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full flex flex-col font-sans select-none" dir="rtl">
      {/* ── TOP CONTROLS & HUD SUMMARY ── */}
      <div className="w-full px-4 sm:px-6 py-4 bg-[var(--bg-surface)] border-b border-[var(--border-subtle)] shrink-0 space-y-4">
        {/* Banner with Active Milestone HUD */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
              <h2 className="text-base sm:text-lg font-bold font-urdu text-[var(--text-primary)]">
                متوازی تقابلی تقویمی دھارے (Synchronized Multi-Track Parallel View)
              </h2>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30 font-urdu font-bold">
                ہم آہنگ پیمانے
              </span>
            </div>
            <p className="text-xs text-[var(--text-muted)] font-urdu">
              ہر تاریخی مرحلے پر کلک یا ہوور کر کے دیکھیں کہ اسی لمحے عیسوی، عام الفیل، بعثت اور ہجری تقاویم میں کیا سال تھا!
            </p>
          </div>

          {/* Navigation & Guide buttons */}
          <div className="flex items-center gap-2">
            {onOpenGuide && (
              <button
                onClick={onOpenGuide}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-900 dark:text-amber-200 text-xs font-bold font-urdu transition-all active:scale-95 cursor-pointer shadow-xs"
              >
                <BookOpen className="w-3.5 h-3.5 text-amber-500" />
                <span>تقویمی گائیڈ بک مطالعہ کریں</span>
              </button>
            )}

            <div className="flex items-center gap-1 bg-[var(--bg-surface-elevated)] p-1 rounded-xl border border-[var(--border-subtle)]">
              <button
                onClick={scrollRightStep}
                title="دائیں سرکائیں"
                className="p-1.5 rounded-lg hover:bg-[var(--bg-surface)] text-[var(--text-primary)] cursor-pointer transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={scrollLeftStep}
                title="بائیں سرکائیں"
                className="p-1.5 rounded-lg hover:bg-[var(--bg-surface)] text-[var(--text-primary)] cursor-pointer transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* ── REALTIME SYNCHRONIZED HUD STRIP ── */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/20 via-amber-950/20 to-indigo-950/20 border border-amber-500/30 flex flex-wrap items-center justify-between gap-3 shadow-md">
          {/* Active Title */}
          <div className="flex items-center gap-3">
            <span
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-md"
              style={{ backgroundColor: selectedPoint.colorCode }}
            >
              #{selectedPoint.stepNumber}
            </span>
            <div>
              <div className="text-xs text-[var(--text-muted)] font-urdu">
                منتخب مرحلہ:
              </div>
              <div className="font-bold text-sm sm:text-base font-urdu text-[var(--text-primary)]">
                {selectedPoint.titleUrdu}
              </div>
            </div>
          </div>

          {/* Synchronized Metrics Pillars */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-urdu">
            {/* 1. Gregorian */}
            <div className="px-3 py-1.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-xs">
              <span className="text-[var(--text-muted)]">عیسوی: </span>
              <span className="font-bold text-indigo-700 dark:text-indigo-300">
                {Math.abs(selectedPoint.gregorianYear)} {selectedPoint.isBCE ? 'قبل مسیح (BCE)' : 'عیسوی (CE)'}
              </span>
            </div>

            {/* 2. Aam al-Feel */}
            <div className={`px-3 py-1.5 rounded-xl border shadow-xs ${
              selectedPoint.aamAlFeelYear
                ? 'bg-amber-500/15 border-amber-500/40 text-amber-900 dark:text-amber-200 font-bold'
                : 'bg-[var(--bg-surface)]/50 border-dashed border-[var(--border-subtle)] text-[var(--text-muted)] opacity-60'
            }`}>
              <span>عام الفیل: </span>
              <span>{selectedPoint.aamAlFeelYear ? `سال ${selectedPoint.aamAlFeelYear} AF` : 'غیر فعال'}</span>
            </div>

            {/* 3. Bi'that */}
            <div className={`px-3 py-1.5 rounded-xl border shadow-xs ${
              selectedPoint.biThatYear
                ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-900 dark:text-emerald-200 font-bold'
                : 'bg-[var(--bg-surface)]/50 border-dashed border-[var(--border-subtle)] text-[var(--text-muted)] opacity-60'
            }`}>
              <span>سالِ بعثت: </span>
              <span>{selectedPoint.biThatYear ? `سال ${selectedPoint.biThatYear} بعثت` : 'غیر فعال'}</span>
            </div>

            {/* 4. Hijri */}
            <div className={`px-3 py-1.5 rounded-xl border shadow-xs ${
              selectedPoint.hijriYear
                ? 'bg-teal-500/15 border-teal-500/40 text-teal-900 dark:text-teal-200 font-bold'
                : 'bg-[var(--bg-surface)]/50 border-dashed border-[var(--border-subtle)] text-[var(--text-muted)] opacity-60'
            }`}>
              <span>ہجری تقویم: </span>
              <span>{selectedPoint.hijriYear ? `${selectedPoint.hijriYear}ھ` : 'قبل از ہجرت'}</span>
            </div>

            {/* 5. Time Distance */}
            <div className="px-3 py-1.5 rounded-xl bg-amber-500/20 border border-amber-500/50 text-amber-900 dark:text-amber-200 font-bold shadow-xs">
              <Clock className="w-3.5 h-3.5 inline mr-1 text-amber-500" />
              <span>آج سے فاصلہ: {selectedPoint.yearsAgoFrom2026.toLocaleString()} سال قبل</span>
            </div>
          </div>

          <button
            onClick={() => setModalPoint(selectedPoint)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold font-urdu transition-all shadow-md cursor-pointer shrink-0"
          >
            <Info className="w-3.5 h-3.5" />
            <span>مکمل تاریخی تفصیلات</span>
          </button>
        </div>
      </div>

      {/* ── PARALLEL MULTI-TRACK CANVAS CONTAINER ── */}
      <div
        ref={trackRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className={`relative w-full overflow-x-auto py-8 px-6 sm:px-12 no-scrollbar select-none ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        style={{ minHeight: '620px' }}
      >
        <div
          className="relative flex flex-col gap-6 shrink-0 pb-10"
          style={{
            minWidth: `${MULTI_TRACK_EPOCH_POINTS.length * 320 + 400}px`,
          }}
        >
          {/* ══════════════════════════════════════════════════════════════ */}
          {/* TRACK 1: GREGORIAN SOLAR SCALE (BCE TO CE) */}
          {/* ══════════════════════════════════════════════════════════════ */}
          <div className="relative rounded-2xl p-4 bg-[var(--bg-surface)] border border-indigo-500/30 shadow-md">
            <div className="flex items-center justify-between mb-3 border-b border-[var(--border-subtle)] pb-2">
              <div className="flex items-center gap-2 font-urdu font-bold text-xs text-indigo-700 dark:text-indigo-300">
                <Calendar className="w-4 h-4 text-indigo-500" />
                <span>ٹریک ۱: عیسوی پیمانہ (BCE / CE Solar Scale)</span>
              </div>
              <span className="text-[10px] text-[var(--text-muted)] font-urdu">
                ۴۰۰۴ قبلِ مسیح تا ۲۰۲۶ عیسوی
              </span>
            </div>

            <div className="relative flex items-center justify-between gap-6 py-2">
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1.5 rounded-full bg-indigo-500/30 z-0" />
              {MULTI_TRACK_EPOCH_POINTS.map((pt) => {
                const isSelected = selectedPoint.id === pt.id;
                return (
                  <button
                    key={`tr1-${pt.id}`}
                    onClick={() => setSelectedPoint(pt)}
                    className={`relative z-10 shrink-0 w-64 p-3 rounded-xl border text-right transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-600 text-white shadow-lg ring-2 ring-indigo-400 scale-105'
                        : 'bg-[var(--bg-surface-elevated)] border-[var(--border-subtle)] hover:border-indigo-400 text-[var(--text-primary)]'
                    }`}
                  >
                    <div className="text-[10px] font-mono font-bold opacity-80" dir="ltr">
                      {Math.abs(pt.gregorianYear)} {pt.isBCE ? 'BCE (ق۔م)' : 'CE (ء)'}
                    </div>
                    <div className="text-xs font-bold font-urdu truncate mt-0.5">
                      {pt.titleUrdu}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════════════ */}
          {/* TRACK 2: PROPHETIC & LINEAGE CARAVAN */}
          {/* ══════════════════════════════════════════════════════════════ */}
          <div className="relative rounded-2xl p-4 bg-[var(--bg-surface)] border border-emerald-500/30 shadow-md">
            <div className="flex items-center justify-between mb-3 border-b border-[var(--border-subtle)] pb-2">
              <div className="flex items-center gap-2 font-urdu font-bold text-xs text-emerald-800 dark:text-emerald-300">
                <Sparkles className="w-4 h-4 text-emerald-500" />
                <span>ٹریک ۲: کاروانِ نبوت و شجرۂ انساب (Prophetic Lineage Track)</span>
              </div>
              <span className="text-[10px] text-[var(--text-muted)] font-urdu">
                آدمؑ، نوحؑ، ابراہیمؑ، موسیٰؑ، عیسیٰؑ اور خاتم الانبیاء محمد مصطفیٰؐ
              </span>
            </div>

            <div className="relative flex items-center justify-between gap-6 py-2">
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1.5 rounded-full bg-emerald-500/30 z-0" />
              {MULTI_TRACK_EPOCH_POINTS.map((pt) => {
                const isSelected = selectedPoint.id === pt.id;
                return (
                  <button
                    key={`tr2-${pt.id}`}
                    onClick={() => setSelectedPoint(pt)}
                    className={`relative z-10 shrink-0 w-64 p-3 rounded-xl border text-right transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-700 text-white shadow-lg ring-2 ring-emerald-400 scale-105'
                        : 'bg-[var(--bg-surface-elevated)] border-[var(--border-subtle)] hover:border-emerald-400 text-[var(--text-primary)]'
                    }`}
                  >
                    <div className="text-[10px] font-bold text-amber-700 dark:text-amber-300 font-urdu">
                      {pt.propheticFigureUrdu || 'عہدِ نبوت و اسلام'}
                    </div>
                    <div className="text-xs font-bold font-urdu truncate mt-0.5">
                      {pt.paternalLineageUrdu || pt.synopsisUrdu}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════════════ */}
          {/* TRACK 3: AAM AL-FEEL (1 TO 53 AF) */}
          {/* ══════════════════════════════════════════════════════════════ */}
          <div className="relative rounded-2xl p-4 bg-[var(--bg-surface)] border border-amber-500/30 shadow-md">
            <div className="flex items-center justify-between mb-3 border-b border-[var(--border-subtle)] pb-2">
              <div className="flex items-center gap-2 font-urdu font-bold text-xs text-amber-800 dark:text-amber-300">
                <Compass className="w-4 h-4 text-amber-500" />
                <span>ٹریک ۳: تقویمِ عام الفیل (The 53 Years of Aam al-Feel: 1 to 53 AF)</span>
              </div>
              <span className="text-[10px] text-amber-600 dark:text-amber-400 font-urdu font-bold">
                حملۂ ابرہہ و ولادتِ رسولؐ (۵۷۰ء) تا ہجرتِ مدینہ (۶۲۲ء)
              </span>
            </div>

            <div className="relative flex items-center justify-between gap-6 py-2">
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1.5 rounded-full bg-amber-500/30 z-0" />
              {MULTI_TRACK_EPOCH_POINTS.map((pt) => {
                const isSelected = selectedPoint.id === pt.id;
                const hasAamFeel = typeof pt.aamAlFeelYear === 'number';

                return (
                  <button
                    key={`tr3-${pt.id}`}
                    onClick={() => setSelectedPoint(pt)}
                    className={`relative z-10 shrink-0 w-64 p-3 rounded-xl border text-right transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-600 text-white shadow-lg ring-2 ring-amber-400 scale-105'
                        : hasAamFeel
                        ? 'bg-amber-500/10 border-amber-500/40 text-[var(--text-primary)] hover:border-amber-500'
                        : 'bg-[var(--bg-surface-elevated)]/40 border-dashed border-[var(--border-subtle)] text-[var(--text-muted)] opacity-60'
                    }`}
                  >
                    <div className="text-[10px] font-bold font-urdu">
                      {hasAamFeel ? `سال ${pt.aamAlFeelYear} عام الفیل` : 'قبل از / بعد از عام الفیل'}
                    </div>
                    <div className="text-xs font-bold font-urdu truncate mt-0.5">
                      {hasAamFeel ? pt.titleUrdu : '— تقویم غیر فعال —'}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════════════ */}
          {/* TRACK 4: BI'THAT ERA (1 TO 13 BI'THAT) */}
          {/* ══════════════════════════════════════════════════════════════ */}
          <div className="relative rounded-2xl p-4 bg-[var(--bg-surface)] border border-teal-500/30 shadow-md">
            <div className="flex items-center justify-between mb-3 border-b border-[var(--border-subtle)] pb-2">
              <div className="flex items-center gap-2 font-urdu font-bold text-xs text-teal-800 dark:text-teal-300">
                <Layers className="w-4 h-4 text-teal-500" />
                <span>ٹریک ۴: سالِ بعثت و دورِ نزولِ مکہ (Bi'that Era: 1 to 13 Bi'that)</span>
              </div>
              <span className="text-[10px] text-teal-600 dark:text-teal-400 font-urdu font-bold">
                غارِ حرا (۶۱۰ء) تا ہجرتِ مدینہ (۶۲۲ء)
              </span>
            </div>

            <div className="relative flex items-center justify-between gap-6 py-2">
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1.5 rounded-full bg-teal-500/30 z-0" />
              {MULTI_TRACK_EPOCH_POINTS.map((pt) => {
                const isSelected = selectedPoint.id === pt.id;
                const hasBiThat = typeof pt.biThatYear === 'number';

                return (
                  <button
                    key={`tr4-${pt.id}`}
                    onClick={() => setSelectedPoint(pt)}
                    className={`relative z-10 shrink-0 w-64 p-3 rounded-xl border text-right transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-teal-700 text-white shadow-lg ring-2 ring-teal-400 scale-105'
                        : hasBiThat
                        ? 'bg-teal-500/10 border-teal-500/40 text-[var(--text-primary)] hover:border-teal-500'
                        : 'bg-[var(--bg-surface-elevated)]/40 border-dashed border-[var(--border-subtle)] text-[var(--text-muted)] opacity-60'
                    }`}
                  >
                    <div className="text-[10px] font-bold font-urdu">
                      {hasBiThat ? `سال ${pt.biThatYear} بعثتِ نبویؐ` : 'قبل از / بعد از بعثت'}
                    </div>
                    <div className="text-xs font-bold font-urdu truncate mt-0.5">
                      {hasBiThat ? pt.titleUrdu : '— تقویم غیر فعال —'}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════════════ */}
          {/* TRACK 5: ISLAMIC HIJRI LUNAR CALENDAR (1 AH TO 1447+ AH) */}
          {/* ══════════════════════════════════════════════════════════════ */}
          <div className="relative rounded-2xl p-4 bg-[var(--bg-surface)] border border-emerald-600/30 shadow-md">
            <div className="flex items-center justify-between mb-3 border-b border-[var(--border-subtle)] pb-2">
              <div className="flex items-center gap-2 font-urdu font-bold text-xs text-emerald-800 dark:text-emerald-300">
                <Calendar className="w-4 h-4 text-emerald-600" />
                <span>ٹریک ۵: اسلامی ہجری قمری تقویم (Hijri Lunar Track: 1 AH to 1447+ AH)</span>
              </div>
              <span className="text-[10px] text-emerald-700 dark:text-emerald-300 font-urdu font-bold">
                ہجرتِ مدینہ (۶۲۲ء) سے دورِ حاضر تک
              </span>
            </div>

            <div className="relative flex items-center justify-between gap-6 py-2">
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1.5 rounded-full bg-emerald-600/30 z-0" />
              {MULTI_TRACK_EPOCH_POINTS.map((pt) => {
                const isSelected = selectedPoint.id === pt.id;
                const hasHijri = typeof pt.hijriYear === 'number';

                return (
                  <button
                    key={`tr5-${pt.id}`}
                    onClick={() => setSelectedPoint(pt)}
                    className={`relative z-10 shrink-0 w-64 p-3 rounded-xl border text-right transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-800 text-white shadow-lg ring-2 ring-emerald-500 scale-105'
                        : hasHijri
                        ? 'bg-emerald-500/10 border-emerald-500/40 text-[var(--text-primary)] hover:border-emerald-600'
                        : 'bg-[var(--bg-surface-elevated)]/40 border-dashed border-[var(--border-subtle)] text-[var(--text-muted)] opacity-60'
                    }`}
                  >
                    <div className="text-[10px] font-bold font-urdu">
                      {hasHijri ? `${pt.hijriYear} ہجری قمری` : 'قبل از ہجرت'}
                    </div>
                    <div className="text-xs font-bold font-urdu truncate mt-0.5">
                      {hasHijri ? pt.titleUrdu : '— تقویم غیر فعال —'}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════════════ */}
          {/* TRACK 6: TIME DISTANCE FROM TODAY (2026 CE) */}
          {/* ══════════════════════════════════════════════════════════════ */}
          <div className="relative rounded-2xl p-4 bg-gradient-to-r from-amber-500/10 via-[var(--bg-surface)] to-amber-500/10 border border-amber-500/40 shadow-md">
            <div className="flex items-center justify-between mb-3 border-b border-[var(--border-subtle)] pb-2">
              <div className="flex items-center gap-2 font-urdu font-bold text-xs text-amber-800 dark:text-amber-300">
                <Clock className="w-4 h-4 text-amber-500" />
                <span>ٹریک ۶: آج (۲۰۲۶ء) سے فاصلۂ زمانی (Time Distance Meter)</span>
              </div>
              <span className="text-[10px] text-amber-700 dark:text-amber-300 font-urdu font-bold">
                ماضی سے حال تک کا حقیقی فاصلہ
              </span>
            </div>

            <div className="relative flex items-center justify-between gap-6 py-2">
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1.5 rounded-full bg-amber-500/40 z-0" />
              {MULTI_TRACK_EPOCH_POINTS.map((pt) => {
                const isSelected = selectedPoint.id === pt.id;

                return (
                  <button
                    key={`tr6-${pt.id}`}
                    onClick={() => setSelectedPoint(pt)}
                    className={`relative z-10 shrink-0 w-64 p-3 rounded-xl border text-right transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-600 text-white shadow-lg ring-2 ring-amber-400 scale-105'
                        : 'bg-[var(--bg-surface-elevated)] border-amber-500/30 hover:border-amber-500 text-[var(--text-primary)]'
                    }`}
                  >
                    <div className="text-[10px] font-bold font-urdu text-amber-700 dark:text-amber-300">
                      فاصلہ:
                    </div>
                    <div className="text-xs font-black font-urdu truncate mt-0.5">
                      {pt.yearsAgoFrom2026 === 0 ? 'دورِ حاضر (۰ سال)' : `${pt.yearsAgoFrom2026.toLocaleString()} سال قبل`}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ── DETAIL MODAL FOR SELECTED EPOCH POINT ── */}
      {modalPoint && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md animate-fade-in"
          onClick={() => setModalPoint(null)}
          dir="rtl"
        >
          <div
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl bg-[var(--bg-surface)] border border-amber-500/40 shadow-2xl p-6 sm:p-8 space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
              <div className="flex items-center gap-3">
                <span
                  className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-bold text-base shadow-md"
                  style={{ backgroundColor: modalPoint.colorCode }}
                >
                  #{modalPoint.stepNumber}
                </span>
                <div>
                  <h3 className="text-xl font-bold font-urdu text-[var(--text-primary)]">
                    {modalPoint.titleUrdu}
                  </h3>
                  <div className="text-xs text-[var(--text-muted)] font-urdu">
                    عیسوی: {Math.abs(modalPoint.gregorianYear)} {modalPoint.isBCE ? 'قبل مسیح' : 'عیسوی'} | آج سے {modalPoint.yearsAgoFrom2026.toLocaleString()} سال قبل
                  </div>
                </div>
              </div>

              <button
                onClick={() => setModalPoint(null)}
                className="w-9 h-9 rounded-xl bg-[var(--bg-surface-elevated)] hover:bg-rose-500/20 text-[var(--text-primary)] hover:text-rose-500 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Synchronized Coordinates Summary */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 bg-[var(--bg-surface-elevated)] p-4 rounded-2xl border border-[var(--border-subtle)] text-xs font-urdu">
              <div>
                <span className="text-[var(--text-muted)] block text-[10px]">عیسوی سال:</span>
                <span className="font-bold text-indigo-700 dark:text-indigo-300">
                  {Math.abs(modalPoint.gregorianYear)} {modalPoint.isBCE ? 'BCE' : 'CE'}
                </span>
              </div>
              <div>
                <span className="text-[var(--text-muted)] block text-[10px]">عام الفیل:</span>
                <span className="font-bold text-amber-700 dark:text-amber-300">
                  {modalPoint.aamAlFeelYear ? `سال ${modalPoint.aamAlFeelYear}` : '—'}
                </span>
              </div>
              <div>
                <span className="text-[var(--text-muted)] block text-[10px]">سالِ بعثت:</span>
                <span className="font-bold text-emerald-800 dark:text-emerald-300">
                  {modalPoint.biThatYear ? `سال ${modalPoint.biThatYear}` : '—'}
                </span>
              </div>
              <div>
                <span className="text-[var(--text-muted)] block text-[10px]">ہجری سال:</span>
                <span className="font-bold text-teal-800 dark:text-teal-300">
                  {modalPoint.hijriYear ? `${modalPoint.hijriYear}ھ` : '—'}
                </span>
              </div>
            </div>

            {/* Paternal Lineage & Quranic Reference if applicable */}
            {modalPoint.paternalLineageUrdu && (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-urdu space-y-1">
                <span className="font-bold text-emerald-800 dark:text-emerald-300">شجرۂ نسب و پدری لڑی:</span>
                <p className="text-[var(--text-primary)] leading-relaxed">
                  {modalPoint.paternalLineageUrdu}
                </p>
              </div>
            )}

            {modalPoint.quranicSurahReference && (
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs font-urdu">
                <span className="font-bold text-amber-800 dark:text-amber-300">قرآنی نزولی و مصحفی حوالہ: </span>
                <span className="text-[var(--text-primary)] font-bold">{modalPoint.quranicSurahReference}</span>
              </div>
            )}

            {/* Historical context */}
            <div className="space-y-2 text-xs sm:text-sm font-urdu leading-relaxed text-[var(--text-secondary)]">
              <h4 className="font-bold text-[var(--text-primary)]">تفصیلی تاریخی پس منظر:</h4>
              <p className="text-justify">{modalPoint.historicalContextUrdu}</p>
              <p className="text-justify">{modalPoint.synopsisUrdu}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
