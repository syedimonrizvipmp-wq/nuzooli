import React from 'react';
import { QuranWordData } from '@/data/quranVocabularyData';
import { X, Sparkles, BookOpen, Layers, GraduationCap } from 'lucide-react';

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

  // ── 1. ELEVATED HOVER CARD (NON-OVERLAPPING & ENLARGED TEXT) ──
  // Positioned strictly above (or below if at the very top) with a 30px clearance gap so it NEVER touches or covers the verse!
  if (triggerMode === 'hover' && rect) {
    const clearance = 30; // 30px gap to ensure absolute non-touching clearance
    const isNearTop = rect.top < 230;

    // Use bottom positioning when above so card height automatically flows upwards without touching the word
    const positionStyle: React.CSSProperties = isNearTop
      ? {
          top: `${rect.bottom + clearance}px`,
          left: `${Math.min(
            Math.max(16, rect.left + rect.width / 2 - 180),
            typeof window !== 'undefined' ? window.innerWidth - 380 : 200
          )}px`,
          width: '360px',
        }
      : {
          bottom: `${typeof window !== 'undefined' ? window.innerHeight - rect.top + clearance : 320}px`,
          left: `${Math.min(
            Math.max(16, rect.left + rect.width / 2 - 180),
            typeof window !== 'undefined' ? window.innerWidth - 380 : 200
          )}px`,
          width: '360px',
        };

    return (
      <div
        className="fixed z-50 pointer-events-none animate-fade-in transition-all duration-150 select-none"
        style={positionStyle}
        dir="rtl"
      >
        <div className="p-4 sm:p-5 rounded-3xl sacred-glass sacred-border shadow-[0_20px_50px_rgba(0,0,0,0.35)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.7)] border-2 border-emerald-600/50 dark:border-emerald-500/50 backdrop-blur-2xl bg-[var(--bg-surface-elevated)] space-y-3 relative overflow-hidden">
          {/* Subtle spiritual radiant glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/15 rounded-full blur-2xl pointer-events-none" />

          {/* Word & Part of Speech Badge */}
          <div className="flex items-center justify-between gap-3 border-b border-[var(--border-subtle)] pb-2.5 relative z-10">
            <span className="font-arabic font-bold text-3xl sm:text-4xl text-emerald-800 dark:text-emerald-300 leading-tight">
              {word.wordArabic}
            </span>
            <span className={`text-xs sm:text-sm px-3 py-1 rounded-full font-urdu font-bold border shadow-sm ${typeBadge.classes}`}>
              {word.partOfSpeechUrdu || typeBadge.label}
            </span>
          </div>

          {/* Large, Clear Urdu Meaning */}
          <div className="space-y-1 relative z-10">
            <div className="text-xs font-bold font-urdu text-[var(--text-muted)] flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
              <span>معنی و مفہوم:</span>
            </div>
            <p className="font-urdu text-xl sm:text-2xl font-extrabold text-[var(--text-primary)] leading-relaxed">
              {word.meaningUrdu}
            </p>
          </div>

          {/* Root Word & Grammar Tag */}
          <div className="flex items-center justify-between gap-2 pt-2 border-t border-[var(--border-subtle)] relative z-10 font-urdu">
            <div className="flex items-center gap-1.5 text-amber-850 dark:text-amber-300 font-bold text-sm">
              <Layers className="w-4 h-4 text-amber-600" />
              <span>مادہ (Root):</span>
              <span className="font-arabic font-extrabold text-base sm:text-lg">{word.root || '—'}</span>
            </div>
            <span className="text-xs text-[var(--text-muted)] font-urdu font-semibold">
              {surahNameUrdu || `سورۃ #${surahNumber}`} ({ayahNumber})
            </span>
          </div>
        </div>

        {/* Directional pointer with comfortable distance */}
        <div
          className={`w-0 h-0 border-x-8 border-x-transparent mx-auto ${
            isNearTop
              ? '-mt-[3px] border-b-8 border-b-emerald-600/50'
              : 'mt-1 border-t-8 border-t-emerald-600/50'
          }`}
        />
      </div>
    );
  }

  // ── 2. COMPREHENSIVE DOCKED INSPECTOR (CLICK MODE) ──
  return (
    <div
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 animate-scale-up"
      dir="rtl"
    >
      <div className="p-4 sm:p-5 rounded-3xl sacred-glass sacred-border shadow-2xl border-2 border-emerald-600/35 dark:border-emerald-500/35 backdrop-blur-2xl bg-[var(--bg-surface-elevated)] space-y-3.5 relative overflow-hidden">
        {/* Decorative glow */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Top Bar: Word, Badges, and Close */}
        <div className="flex items-start justify-between gap-3 relative z-10">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-arabic font-bold text-3xl sm:text-4xl text-emerald-800 dark:text-emerald-300 leading-tight">
                {word.wordArabic}
              </span>
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-urdu font-bold border ${typeBadge.classes}`}>
                {word.partOfSpeechUrdu || typeBadge.label}
              </span>
            </div>
            <div className="text-xs text-[var(--text-muted)] font-urdu flex items-center gap-1.5">
              <span>{surahNameUrdu || `سورۃ #${surahNumber}`}</span>
              <span>•</span>
              <span>آیت نمبر {ayahNumber}</span>
              <span className="text-[10px] text-sky-750 dark:text-sky-300 bg-sky-500/10 px-1.5 py-0.2 rounded-md font-semibold">
                کلک تفصیلی ویو
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-[var(--bg-surface)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all cursor-pointer border border-[var(--border-subtle)]"
            title="بند کریں"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Meaning Section with Enlarged Font */}
        <div className="p-3.5 rounded-2xl bg-emerald-500/5 dark:bg-emerald-950/20 border border-emerald-500/25 space-y-1 relative z-10">
          <div className="flex items-center gap-1.5 text-xs font-bold font-urdu text-emerald-800 dark:text-emerald-300">
            <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
            <span>اردو ترجمہ و مفہوم:</span>
          </div>
          <p className="font-urdu text-lg sm:text-xl font-bold text-[var(--text-primary)] leading-relaxed">
            {word.meaningUrdu}
          </p>
          {word.meaningEnglish && (
            <p className="text-xs text-[var(--text-muted)] font-sans text-left" dir="ltr">
              EN: {word.meaningEnglish}
            </p>
          )}
        </div>

        {/* Root and Morphology Grid */}
        <div className="grid grid-cols-2 gap-2 relative z-10 text-xs font-urdu">
          {/* Root */}
          <div className="p-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-1">
            <span className="text-[11px] text-[var(--text-muted)] font-semibold flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-amber-600" />
              مادہ / جذر (Root):
            </span>
            <span className="font-bold text-base text-amber-850 dark:text-amber-300 block font-arabic text-center">
              {word.root || 'غیر مشتق'}
            </span>
          </div>

          {/* Part of speech category */}
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

        {/* Grammatical Role Note */}
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

        {/* Pedagogical Teaching Note */}
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

        {/* Footer Guidance */}
        <div className="text-[10px] text-[var(--text-muted)] font-urdu text-center pt-1 border-t border-[var(--border-subtle)]">
          کسی بھی دوسرے کلمے پر کلک کر کے اس کی مکمل تفصیلات دیکھ سکتے ہیں۔
        </div>
      </div>
    </div>
  );
};
