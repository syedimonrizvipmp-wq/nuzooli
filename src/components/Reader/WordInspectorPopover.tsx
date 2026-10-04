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
}

export const WordInspectorPopover: React.FC<WordInspectorPopoverProps> = ({
  word,
  surahNumber,
  ayahNumber,
  surahNameUrdu,
  onClose,
  triggerMode,
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

  return (
    <div
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 animate-scale-up"
      dir="rtl"
    >
      <div className="p-4 sm:p-5 rounded-3xl sacred-glass sacred-border shadow-2xl border-2 border-emerald-600/30 dark:border-emerald-500/30 backdrop-blur-xl bg-[var(--bg-surface-elevated)] space-y-3.5 relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Top Bar: Word, Badges, and Close */}
        <div className="flex items-start justify-between gap-3 relative z-10">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-arabic font-bold text-2xl sm:text-3xl text-emerald-800 dark:text-emerald-300 leading-tight">
                {word.wordArabic}
              </span>
              <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-urdu font-bold border ${typeBadge.classes}`}>
                {word.partOfSpeechUrdu || typeBadge.label}
              </span>
            </div>
            <div className="text-xs text-[var(--text-muted)] font-urdu flex items-center gap-1.5">
              <span>{surahNameUrdu || `سورۃ #${surahNumber}`}</span>
              <span>•</span>
              <span>آیت نمبر {ayahNumber}</span>
              {triggerMode === 'hover' && (
                <span className="text-[10px] text-amber-700 dark:text-amber-300 bg-amber-500/10 px-1.5 py-0.2 rounded-md">
                  ہاور ویو
                </span>
              )}
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

        {/* Meaning Section */}
        <div className="p-3 rounded-2xl bg-emerald-500/5 dark:bg-emerald-950/20 border border-emerald-500/20 space-y-1 relative z-10">
          <div className="flex items-center gap-1.5 text-xs font-bold font-urdu text-emerald-800 dark:text-emerald-300">
            <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
            <span>اردو ترجمہ و معنی:</span>
          </div>
          <p className="font-urdu text-base sm:text-lg font-bold text-[var(--text-primary)] leading-relaxed">
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
              <Layers className="w-3 h-3 text-amber-600" />
              مادہ / جذر (Root):
            </span>
            <span className="font-bold text-sm text-amber-850 dark:text-amber-300 block font-arabic text-center">
              {word.root || 'غیر مشتق'}
            </span>
          </div>

          {/* Part of speech category */}
          <div className="p-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-1">
            <span className="text-[11px] text-[var(--text-muted)] font-semibold flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-sky-600" />
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
          کسی بھی دوسرے لفظ پر کلک کرنے سے اس کے مفردات فوراً تبدیل ہو جائیں گے۔
        </div>
      </div>
    </div>
  );
};
