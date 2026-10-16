import React, { useState, useMemo } from 'react';
import {
  MemorizationSurah,
  MEMORIZATION_SURAHS,
  SURAHS_BY_MUSHAF,
} from '../../data/surahMemorizationData';
import {
  RotateCw,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  HelpCircle,
  Trophy,
  Award,
} from 'lucide-react';

interface Props {
  onSelectSurah?: (surah: MemorizationSurah) => void;
}

export const SurahFlashcardStudio: React.FC<Props> = () => {
  // Practice decade (1 to 12)
  const [selectedDecade, setSelectedDecade] = useState<number>(1);
  const [cardIndex, setCardIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [studioTab, setStudioTab] = useState<'flashcards' | 'quiz'>('flashcards');

  // Memorized IDs set in local state
  const [memorizedSurahIds, setMemorizedSurahIds] = useState<Set<number>>(new Set());

  // Decade surahs
  const decadeSurahs = useMemo(() => {
    return SURAHS_BY_MUSHAF.filter((s) => s.mushafDecadeGroup === selectedDecade);
  }, [selectedDecade]);

  const currentSurah = decadeSurahs[cardIndex] || decadeSurahs[0] || SURAHS_BY_MUSHAF[0];

  const handleNextCard = () => {
    setIsFlipped(false);
    if (cardIndex < decadeSurahs.length - 1) {
      setCardIndex((i) => i + 1);
    } else {
      setCardIndex(0);
    }
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    if (cardIndex > 0) {
      setCardIndex((i) => i - 1);
    } else {
      setCardIndex(decadeSurahs.length - 1);
    }
  };

  const toggleMemorized = (id: number) => {
    setMemorizedSurahIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // ── QUIZ STATE ──
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizAttempts, setQuizAttempts] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState<boolean>(false);

  // Generate a multiple choice question based on the current decade
  const currentQuizSurah = decadeSurahs[cardIndex] || decadeSurahs[0];
  const quizOptions = useMemo(() => {
    const correct = currentQuizSurah.nuzoolOrder;
    // pick 3 wrong answers from other surahs
    const others = MEMORIZATION_SURAHS.filter((s) => s.mushafOrder !== currentQuizSurah.mushafOrder)
      .map((s) => s.nuzoolOrder)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    return [correct, ...others].sort(() => 0.5 - Math.random());
  }, [currentQuizSurah]);

  const handleAnswerClick = (option: number) => {
    if (isAnswerChecked) return;
    setSelectedAnswer(option);
    setIsAnswerChecked(true);
    setQuizAttempts((a) => a + 1);
    if (option === currentQuizSurah.nuzoolOrder) {
      setQuizScore((s) => s + 1);
    }
  };

  const nextQuizQuestion = () => {
    setIsAnswerChecked(false);
    setSelectedAnswer(null);
    handleNextCard();
  };

  // Progress percentage
  const totalMemorized = memorizedSurahIds.size;
  const progressPercent = Math.round((totalMemorized / 114) * 100);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 font-sans select-none" dir="rtl">
      {/* ── TOP STATS & PROGRESS BAR ── */}
      <div className="rounded-3xl p-6 bg-[var(--bg-surface)] border border-amber-500/30 shadow-xl mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-500" />
              <h2 className="text-lg sm:text-xl font-bold font-urdu text-[var(--text-primary)]">
                اسمارٹ حفظ اسٹوڈیو (Active Memorization & Spaced Retrieval)
              </h2>
            </div>
            <p className="text-xs text-[var(--text-muted)] font-urdu mt-0.5">
              علمِ نفسیات کے مطابق "فعال بازیابی (Active Recall)" سے سورتوں کے نام اور ترتیب دائمی طور پر یاد ہو جاتے ہیں۔
            </p>
          </div>

          {/* Progress Badge */}
          <div className="flex items-center gap-3 bg-[var(--bg-surface-elevated)] px-4 py-2 rounded-2xl border border-[var(--border-subtle)] shrink-0">
            <Award className="w-5 h-5 text-emerald-500" />
            <div className="text-xs font-urdu">
              <span className="text-[var(--text-muted)]">حفظ کی پیشرفت: </span>
              <span className="font-bold text-emerald-800 dark:text-emerald-300">
                {totalMemorized} / ۱۱۴ ({progressPercent}%)
              </span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2.5 rounded-full bg-[var(--bg-surface-elevated)] overflow-hidden border border-[var(--border-subtle)]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-amber-500 to-emerald-500 transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Switch Studio Tabs: Flashcards vs Quiz */}
        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={() => setStudioTab('flashcards')}
            className={`px-4 py-2 rounded-xl text-xs font-urdu font-bold transition-all cursor-pointer ${
              studioTab === 'flashcards'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-[var(--bg-surface-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)]'
            }`}
          >
            بطاقاتِ تذکر (Flashcards Mode)
          </button>
          <button
            onClick={() => setStudioTab('quiz')}
            className={`px-4 py-2 rounded-xl text-xs font-urdu font-bold transition-all cursor-pointer ${
              studioTab === 'quiz'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-[var(--bg-surface-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)]'
            }`}
          >
            امتحانِ بازیابی (Active Quiz Mode)
          </button>
        </div>
      </div>

      {/* ── DECADE SELECTOR PILLS (عشرے ۱ تا ۱۲) ── */}
      <div className="mb-6 flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
        <span className="text-xs font-bold text-[var(--text-muted)] font-urdu shrink-0 ps-1">
          عشرہ منتخب کریں:
        </span>
        {Array.from({ length: 12 }, (_, i) => i + 1).map((dec) => {
          const isSelected = selectedDecade === dec;
          const startNum = (dec - 1) * 10 + 1;
          const endNum = Math.min(dec * 10, 114);

          return (
            <button
              key={dec}
              onClick={() => {
                setSelectedDecade(dec);
                setCardIndex(0);
                setIsFlipped(false);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-urdu font-bold shrink-0 transition-all cursor-pointer ${
                isSelected
                  ? 'bg-emerald-700 text-white shadow-md ring-2 ring-emerald-500/30'
                  : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)]'
              }`}
            >
              عشرہ {dec} ({startNum}–{endNum})
            </button>
          );
        })}
      </div>

      {/* ── MODE 1: DIGITAL FLIP FLASHCARD ── */}
      {studioTab === 'flashcards' && currentSurah && (
        <div className="space-y-6">
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-full min-h-[340px] rounded-3xl p-8 sm:p-12 bg-gradient-to-b from-[var(--bg-surface)] to-[var(--bg-surface-elevated)] border-2 border-amber-500/40 shadow-2xl hover:border-amber-400 transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden group select-none"
          >
            {/* Top Indicator */}
            <div className="flex items-center justify-between text-xs font-urdu text-[var(--text-muted)]">
              <span className="flex items-center gap-1.5 text-amber-700 dark:text-amber-400 font-bold">
                <RotateCw className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-500" />
                <span>کارڈ پلٹنے کے لیے کلک کریں (Click to Flip)</span>
              </span>
              <span className="font-bold">
                کارڈ {cardIndex + 1} از {decadeSurahs.length}
              </span>
            </div>

            {/* FRONT SIDE */}
            {!isFlipped ? (
              <div className="text-center my-6 space-y-3">
                <div className="text-4xl sm:text-6xl font-bold font-arabic text-[var(--text-primary)]">
                  {currentSurah.nameArabic}
                </div>
                <div className="text-2xl sm:text-3xl font-bold font-urdu text-amber-700 dark:text-amber-400">
                  {currentSurah.nameUrdu}
                </div>
                <p className="text-sm sm:text-base text-[var(--text-muted)] font-urdu max-w-md mx-auto">
                  معنی: {currentSurah.meaningUrdu}
                </p>
                <div className="text-xs text-[var(--text-muted)] font-urdu pt-2">
                  (پلٹ کر مصحفی و نزولی نمبر اور یاد دہانی کا کلیہ دیکھیے)
                </div>
              </div>
            ) : (
              /* BACK SIDE */
              <div className="text-center my-4 space-y-4 animate-fade-in">
                <div className="flex items-center justify-center gap-6 text-sm sm:text-base font-urdu">
                  <div className="p-3.5 rounded-2xl bg-amber-500/15 border border-amber-500/40">
                    <span className="text-[11px] text-[var(--text-muted)] block">مصحفی نمبر:</span>
                    <span className="text-xl font-black text-amber-800 dark:text-amber-300">
                      #{currentSurah.mushafOrder}
                    </span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/40">
                    <span className="text-[11px] text-[var(--text-muted)] block">نزولی نمبر:</span>
                    <span className="text-xl font-black text-emerald-800 dark:text-emerald-300">
                      #{currentSurah.nuzoolOrder}
                    </span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-indigo-500/15 border border-indigo-500/40">
                    <span className="text-[11px] text-[var(--text-muted)] block">آیات کی تعداد:</span>
                    <span className="text-xl font-black text-indigo-700 dark:text-indigo-300">
                      {currentSurah.versesCount}
                    </span>
                  </div>
                </div>

                {/* Mnemonic Hook */}
                <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-amber-500/30 text-xs sm:text-sm font-urdu text-[var(--text-primary)] leading-relaxed max-w-xl mx-auto">
                  <span className="font-bold text-emerald-800 dark:text-emerald-300 block mb-1">
                    یاد دہانی کا الٰہی تلازم (Mnemonic Key):
                  </span>
                  {currentSurah.mnemonicKeyUrdu}
                </div>

                <div className="text-xs text-[var(--text-muted)] font-urdu">
                  مرکزی پیغام: {currentSurah.keyThemeUrdu}
                </div>
              </div>
            )}

            {/* Bottom Actions Row */}
            <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMemorized(currentSurah.mushafOrder);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-urdu font-bold transition-all cursor-pointer ${
                  memorizedSurahIds.has(currentSurah.mushafOrder)
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-emerald-600 border border-[var(--border-subtle)]'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  {memorizedSurahIds.has(currentSurah.mushafOrder)
                    ? 'ازبر ہو گئی (Memorized)'
                    : 'ازبر نشان زد کریں'}
                </span>
              </button>

              <div className="text-xs text-[var(--text-muted)] font-urdu">
                {currentSurah.revelationPlace === 'meccan' ? 'مکی سورت' : 'مدنی سورت'}
              </div>
            </div>
          </div>

          {/* Stepper Controls */}
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={handlePrevCard}
              className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[var(--bg-surface)] hover:bg-emerald-700 hover:text-white border border-[var(--border-subtle)] text-xs font-bold font-urdu transition-all cursor-pointer shadow-xs"
            >
              <ChevronRight className="w-4 h-4" />
              <span>پچھلا کارڈ</span>
            </button>

            <span className="text-xs font-bold font-urdu text-[var(--text-muted)]">
              {cardIndex + 1} از {decadeSurahs.length}
            </span>

            <button
              onClick={handleNextCard}
              className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[var(--bg-surface)] hover:bg-emerald-700 hover:text-white border border-[var(--border-subtle)] text-xs font-bold font-urdu transition-all cursor-pointer shadow-xs"
            >
              <span>اگلا کارڈ</span>
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ── MODE 2: ACTIVE RETRIEVAL QUIZ ── */}
      {studioTab === 'quiz' && currentQuizSurah && (
        <div className="rounded-3xl p-8 bg-[var(--bg-surface)] border border-emerald-500/30 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-emerald-500" />
              <h3 className="font-bold text-base font-urdu text-[var(--text-primary)]">
                سوالِ بازیابی: نزولی نمبر پہچانیے
              </h3>
            </div>
            <div className="text-xs font-urdu font-bold text-emerald-800 dark:text-emerald-300">
              صحیح جوابات: {quizScore} از {quizAttempts}
            </div>
          </div>

          {/* Question Card */}
          <div className="text-center py-4 space-y-2">
            <div className="text-3xl font-bold font-arabic text-[var(--text-primary)]">
              {currentQuizSurah.nameArabic}
            </div>
            <div className="text-xl font-bold font-urdu text-amber-700 dark:text-amber-400">
              {currentQuizSurah.nameUrdu} (مصحف نمبر #{currentQuizSurah.mushafOrder})
            </div>
            <p className="text-sm font-urdu text-[var(--text-muted)]">
              اس سورت کا تاریخی **نزولی نمبر (Revelation Order)** کیا ہے؟
            </p>
          </div>

          {/* 4 Multiple Choice Options */}
          <div className="grid grid-cols-2 gap-3 max-w-lg mx-auto">
            {quizOptions.map((opt) => {
              const isSelected = selectedAnswer === opt;
              const isCorrect = opt === currentQuizSurah.nuzoolOrder;

              let btnStyle = 'bg-[var(--bg-surface-elevated)] border-[var(--border-subtle)] text-[var(--text-primary)] hover:border-emerald-500';

              if (isAnswerChecked) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-600 text-white font-black shadow-lg';
                } else if (isSelected && !isCorrect) {
                  btnStyle = 'bg-rose-600 text-white font-black shadow-lg';
                } else {
                  btnStyle = 'opacity-40 bg-[var(--bg-surface-elevated)] text-[var(--text-muted)]';
                }
              }

              return (
                <button
                  key={opt}
                  onClick={() => handleAnswerClick(opt)}
                  disabled={isAnswerChecked}
                  className={`p-4 rounded-2xl border text-center font-urdu font-black text-lg transition-all cursor-pointer ${btnStyle}`}
                >
                  نمبر #{opt}
                </button>
              );
            })}
          </div>

          {/* Feedback & Next Button */}
          {isAnswerChecked && (
            <div className="text-center pt-2 space-y-3 animate-fade-in">
              <div className="text-sm font-urdu font-bold">
                {selectedAnswer === currentQuizSurah.nuzoolOrder ? (
                  <span className="text-emerald-800 dark:text-emerald-300">
                    ماشاءاللہ! بالکل درست جواب۔
                  </span>
                ) : (
                  <span className="text-rose-500">
                    افسوس! درست جواب نمبر #{currentQuizSurah.nuzoolOrder} تھا۔
                  </span>
                )}
              </div>
              <button
                onClick={nextQuizQuestion}
                className="px-6 py-2.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-urdu font-bold text-xs transition-all shadow-md cursor-pointer inline-flex items-center gap-2"
              >
                <span>اگلا سوال</span>
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
