import React, { useState, useEffect, useRef } from 'react';
import { QuranWordData } from '@/data/quranVocabularyData';
import { X, Sparkles, BookOpen, Layers, GraduationCap, GripHorizontal, Move, RotateCcw } from 'lucide-react';

interface WordInspectorPopoverProps {
  word: QuranWordData | null;
  surahNumber: number;
  ayahNumber: number;
  surahNameUrdu?: string;
  onClose: () => void;
  triggerMode: 'click' | 'hover';
  rect?: DOMRect | null;
}

export const WordInspectorPopover: React.FC<WordInspectorPopoverProps> = ({
  word,
  surahNumber,
  ayahNumber,
  surahNameUrdu,
  onClose,
  triggerMode,
  rect,
}) => {
  if (!word) return null;

  // Custom user-dragged position (x, y in viewport)
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [hasUserMoved, setHasUserMoved] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartRef = useRef<{ startX: number; startY: number; posX: number; posY: number }>({
    startX: 0,
    startY: 0,
    posX: 0,
    posY: 0,
  });
  const cardRef = useRef<HTMLDivElement>(null);

  // Badge styling according to grammatical type
  const typeBadge = (() => {
    switch (word.type) {
      case 'verb':
        return {
          label: 'فعل (Verb)',
          classes: 'bg-emerald-600/15 text-emerald-800 dark:text-emerald-300 border-emerald-500/30',
        };
      case 'noun':
        return {
          label: 'اسم (Noun)',
          classes: 'bg-sky-600/15 text-sky-850 dark:text-sky-300 border-sky-500/30',
        };
      case 'particle':
        return {
          label: 'حرف (Particle)',
          classes: 'bg-purple-600/15 text-purple-850 dark:text-purple-300 border-purple-500/30',
        };
      default:
        return {
          label: 'کلمہ',
          classes: 'bg-amber-600/15 text-amber-850 dark:text-amber-300 border-amber-500/30',
        };
    }
  })();

  // Compute smart initial placement if user hasn't moved the window
  useEffect(() => {
    if (!hasUserMoved && rect && typeof window !== 'undefined') {
      const cardWidth = Math.min(420, window.innerWidth - 32);
      const isNearTop = rect.top < 260;
      const initialY = isNearTop
        ? Math.min(window.innerHeight - 320, rect.bottom + 36)
        : Math.max(20, rect.top - 260);
      const initialX = Math.min(
        Math.max(16, rect.left + rect.width / 2 - cardWidth / 2),
        window.innerWidth - cardWidth - 16
      );
      setPosition({ x: initialX, y: initialY });
    }
  }, [rect, hasUserMoved]);

  // Safe fallback coordinates if rect not yet available
  const activePosition = position || {
    x: typeof window !== 'undefined' ? Math.max(16, window.innerWidth / 2 - 210) : 100,
    y: typeof window !== 'undefined' ? Math.max(24, window.innerHeight / 2 - 160) : 100,
  };

  // Start dragging handler (mouse & touch)
  const startDrag = (clientX: number, clientY: number) => {
    setIsDragging(true);
    dragStartRef.current = {
      startX: clientX,
      startY: clientY,
      posX: activePosition.x,
      posY: activePosition.y,
    };
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;
    e.preventDefault();
    startDrag(e.clientX, e.clientY);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;
    const touch = e.touches[0];
    if (touch) {
      startDrag(touch.clientX, touch.clientY);
    }
  };

  // Global mouse & touch move listeners
  useEffect(() => {
    if (!isDragging) return;

    const onMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - dragStartRef.current.startX;
      const deltaY = e.clientY - dragStartRef.current.startY;
      const cardWidth = cardRef.current?.offsetWidth || 380;
      const cardHeight = cardRef.current?.offsetHeight || 260;

      const newX = Math.min(
        Math.max(8, dragStartRef.current.posX + deltaX),
        window.innerWidth - cardWidth - 8
      );
      const newY = Math.min(
        Math.max(8, dragStartRef.current.posY + deltaY),
        window.innerHeight - cardHeight - 8
      );

      setPosition({ x: newX, y: newY });
      setHasUserMoved(true);
    };

    const onTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;
      const deltaX = touch.clientX - dragStartRef.current.startX;
      const deltaY = touch.clientY - dragStartRef.current.startY;
      const cardWidth = cardRef.current?.offsetWidth || 380;
      const cardHeight = cardRef.current?.offsetHeight || 260;

      const newX = Math.min(
        Math.max(8, dragStartRef.current.posX + deltaX),
        window.innerWidth - cardWidth - 8
      );
      const newY = Math.min(
        Math.max(8, dragStartRef.current.posY + deltaY),
        window.innerHeight - cardHeight - 8
      );

      setPosition({ x: newX, y: newY });
      setHasUserMoved(true);
    };

    const onDragEnd = () => {
      setIsDragging(false);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onDragEnd);
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onDragEnd);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onDragEnd);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onDragEnd);
    };
  }, [isDragging]);

  const resetToAutoPosition = () => {
    setHasUserMoved(false);
    if (rect && typeof window !== 'undefined') {
      const cardWidth = Math.min(420, window.innerWidth - 32);
      const isNearTop = rect.top < 260;
      const initialY = isNearTop
        ? Math.min(window.innerHeight - 320, rect.bottom + 36)
        : Math.max(20, rect.top - 260);
      const initialX = Math.min(
        Math.max(16, rect.left + rect.width / 2 - cardWidth / 2),
        window.innerWidth - cardWidth - 16
      );
      setPosition({ x: initialX, y: initialY });
    }
  };

  return (
    <div
      ref={cardRef}
      className={`fixed z-50 pointer-events-auto select-none transition-shadow duration-200 ${
        isDragging ? 'shadow-[0_35px_80px_rgba(0,0,0,0.65)] scale-[1.01]' : ''
      }`}
      style={{
        top: `${activePosition.y}px`,
        left: `${activePosition.x}px`,
        width: 'min(420px, calc(100vw - 24px))',
      }}
      dir="rtl"
    >
      <div className="rounded-3xl sacred-glass sacred-border shadow-[0_25px_60px_rgba(0,0,0,0.45)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.85)] border-2 border-emerald-600/60 dark:border-emerald-500/60 backdrop-blur-2xl bg-[var(--bg-surface-elevated)] overflow-hidden relative">
        
        {/* ── 1. DRAG HANDLE & TOP BAR ── */}
        <div
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          className="px-4 py-2.5 bg-gradient-to-r from-emerald-600/20 via-amber-500/15 to-emerald-600/20 border-b border-emerald-500/30 flex items-center justify-between gap-2 cursor-grab active:cursor-grabbing select-none"
          title="پکڑ کر اسکرین پر کہیں بھی لے جائیں (Click & drag anywhere on screen)"
        >
          <div className="flex items-center gap-1.5 text-xs font-urdu font-bold text-emerald-900 dark:text-emerald-200">
            <GripHorizontal className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span className="hidden sm:inline">حرکت پذیر فرہنگ</span>
            <span className="text-[10px] opacity-75 font-sans">({triggerMode === 'hover' ? 'Hover' : 'Click'} Mode)</span>
          </div>

          <div className="flex items-center gap-1.5">
            {hasUserMoved && (
              <button
                onClick={resetToAutoPosition}
                className="px-2 py-0.5 rounded-lg text-[10px] font-urdu bg-[var(--bg-surface)] hover:bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-500/30 transition-all cursor-pointer flex items-center gap-1"
                title="لفظ کے پاس اصل پوزیشن پر لائیں"
              >
                <RotateCcw className="w-3 h-3" />
                <span className="hidden xs:inline">ری سیٹ</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-1 rounded-xl hover:bg-rose-500/20 text-[var(--text-muted)] hover:text-rose-600 dark:hover:text-rose-400 transition-all cursor-pointer border border-[var(--border-subtle)]"
              title="بند کریں (Close)"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* ── 2. CARD CONTENT (LARGE TEXT & MORPHOLOGY) ── */}
        <div className="p-4 sm:p-5 space-y-3.5 relative overflow-hidden">
          {/* Subtle spiritual radiant glow */}
          <div className="absolute top-0 right-0 w-36 h-36 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none" />

          {/* Word, Badges and Location */}
          <div className="flex items-center justify-between gap-3 border-b border-[var(--border-subtle)] pb-2.5 relative z-10">
            <span className="font-arabic font-bold text-3xl sm:text-4xl text-emerald-800 dark:text-emerald-300 leading-tight">
              {word.wordArabic}
            </span>
            <div className="flex flex-col items-end gap-1">
              <span className={`text-xs sm:text-sm px-3.5 py-1 rounded-full font-urdu font-bold border shadow-xs ${typeBadge.classes}`}>
                {word.partOfSpeechUrdu || typeBadge.label}
              </span>
              <span className="text-[11px] text-[var(--text-muted)] font-urdu font-semibold">
                {surahNameUrdu || `سورۃ #${surahNumber}`} ({ayahNumber})
              </span>
            </div>
          </div>

          {/* Large, Clear Urdu Meaning */}
          <div className="space-y-1 relative z-10 p-3 rounded-2xl bg-emerald-500/10 dark:bg-emerald-950/30 border border-emerald-500/30">
            <div className="text-xs font-bold font-urdu text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
              <span>معنی و مفہوم (Urdu Meaning):</span>
            </div>
            <p className="font-urdu text-2xl sm:text-3xl font-extrabold text-emerald-950 dark:text-emerald-100 leading-relaxed tracking-wide">
              {word.meaningUrdu}
            </p>
            {word.meaningEnglish && (
              <p className="text-xs text-[var(--text-muted)] font-sans text-left pt-0.5" dir="ltr">
                EN: {word.meaningEnglish}
              </p>
            )}
          </div>

          {/* Root Word & Grammar Tag */}
          <div className="grid grid-cols-2 gap-2 relative z-10 text-xs font-urdu">
            {/* Root */}
            <div className="p-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-1">
              <span className="text-[11px] text-[var(--text-muted)] font-semibold flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-amber-600" />
                مادہ (Root):
              </span>
              <span className="font-bold text-base sm:text-lg text-amber-850 dark:text-amber-300 block font-arabic text-center">
                {word.root || 'غیر مشتق'}
              </span>
            </div>

            {/* Type */}
            <div className="p-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-1">
              <span className="text-[11px] text-[var(--text-muted)] font-semibold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                کلمہ کی نوعیت:
              </span>
              <span className="font-bold text-xs text-[var(--text-primary)] block text-center">
                {typeBadge.label}
              </span>
            </div>
          </div>

          {/* Grammatical Role Note if available */}
          {word.grammarNoteUrdu && (
            <div className="p-3 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-1 relative z-10 text-xs">
              <div className="flex items-center gap-1.5 font-bold font-urdu text-[var(--text-secondary)]">
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
                <span>صرفی و نحوی اعراب:</span>
              </div>
              <p className="font-urdu text-xs sm:text-sm text-[var(--text-primary)] leading-relaxed">
                {word.grammarNoteUrdu}
              </p>
            </div>
          )}

          {/* Pedagogical Teaching Note if available */}
          {word.teachingNoteUrdu && (
            <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/25 space-y-1 relative z-10 text-xs">
              <div className="flex items-center gap-1.5 font-bold font-urdu text-amber-900 dark:text-amber-200">
                <GraduationCap className="w-4 h-4 text-amber-600 shrink-0" />
                <span>تدریسی نکتہ و فہمِ بلاغت:</span>
              </div>
              <p className="font-urdu text-xs sm:text-sm text-[var(--text-primary)] leading-relaxed">
                {word.teachingNoteUrdu}
              </p>
            </div>
          )}

          {/* Persistent Scrolling Guidance */}
          <div className="text-[10px] text-[var(--text-muted)] font-urdu text-center pt-1 border-t border-[var(--border-subtle)] flex items-center justify-between gap-1">
            <span>کسی بھی لفظ پر ماؤس لائیں، معنی فوراً اپڈیٹ ہوں گے۔</span>
            <span className="text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-0.5">
              <Move className="w-3 h-3" />
              ڈریگ کریں
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};
