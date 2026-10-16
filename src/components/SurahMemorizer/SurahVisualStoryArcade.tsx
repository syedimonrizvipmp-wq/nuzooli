import React, { useState } from 'react';
import {
  SURAH_VISUAL_STORY_BEATS,
  VISUAL_RIDDLES_COLLECTION,
  SurahVisualStoryBeat,
} from '../../data/surahVisualStoryData';
import { SurahVisualBadge } from './SurahVisualBadge';
import {
  Sparkles,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Trophy,
  HelpCircle,
  Film,
  Compass,
} from 'lucide-react';

interface Props {
  onSelectSurahNum?: (mushafNum: number) => void;
}

export const SurahVisualStoryArcade: React.FC<Props> = () => {
  const [activeTab, setActiveTab] = useState<'story' | 'riddles'>('story');
  const [storyOrderType, setStoryOrderType] = useState<'mushaf' | 'nuzool'>('mushaf');
  const [storyIndex, setStoryIndex] = useState<number>(0);

  // Sorted beats
  const beatsList = React.useMemo(() => {
    return [...SURAH_VISUAL_STORY_BEATS].sort((a, b) =>
      storyOrderType === 'mushaf'
        ? a.mushafOrder - b.mushafOrder
        : a.nuzoolOrder - b.nuzoolOrder
    );
  }, [storyOrderType]);

  const currentBeat: SurahVisualStoryBeat = beatsList[storyIndex] || beatsList[0];

  // ── RIDDLES STATE ──
  const [riddleIndex, setRiddleIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState<boolean>(false);
  const [riddleScore, setRiddleScore] = useState<number>(0);

  const currentRiddle = VISUAL_RIDDLES_COLLECTION[riddleIndex];

  const handleOptionClick = (idx: number) => {
    if (isAnswerRevealed) return;
    setSelectedOption(idx);
    setIsAnswerRevealed(true);
    if (currentRiddle.options[idx].isCorrect) {
      setRiddleScore((s) => s + 1);
    }
  };

  const handleNextRiddle = () => {
    setIsAnswerRevealed(false);
    setSelectedOption(null);
    if (riddleIndex < VISUAL_RIDDLES_COLLECTION.length - 1) {
      setRiddleIndex((i) => i + 1);
    } else {
      setRiddleIndex(0);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 font-sans select-none" dir="rtl">
      {/* ── HEADER BANNER ── */}
      <div className="rounded-3xl p-6 sm:p-8 bg-[var(--bg-surface)] border border-amber-500/30 shadow-xl mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Film className="w-5 h-5 text-amber-500" />
              <h2 className="text-lg sm:text-2xl font-bold font-urdu text-[var(--text-primary)]">
                بصری داستانیں اور تصویری پہیلیاں (Visual Story & Riddle Arcade)
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] font-urdu mt-1 max-w-2xl leading-relaxed">
              سورتوں کے ناموں کو ایک مسلسل تصویری کہانی کی طرح یاد کیجیے، اور تصویری پہیلیوں کے ذریعے بچوں کے ساتھ ایک پرلطف تعلیمی کھیل کھیلیے!
            </p>
          </div>

          {/* Switch Arcade Tabs */}
          <div className="flex items-center gap-1.5 bg-[var(--bg-surface-elevated)] p-1 rounded-2xl border border-[var(--border-subtle)] shrink-0">
            <button
              onClick={() => setActiveTab('story')}
              className={`px-3.5 py-2 rounded-xl text-xs font-urdu font-bold transition-all cursor-pointer ${
                activeTab === 'story'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              تصویری کہانی (Visual Story)
            </button>
            <button
              onClick={() => setActiveTab('riddles')}
              className={`px-3.5 py-2 rounded-xl text-xs font-urdu font-bold transition-all cursor-pointer ${
                activeTab === 'riddles'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              تصویری پہیلیاں (Picture Riddles)
            </button>
          </div>
        </div>
      </div>

      {/* ── SUB-MODE 1: VISUAL STORY WALK ── */}
      {activeTab === 'story' && currentBeat && (
        <div className="space-y-6">
          {/* Order Selector: Mushaf vs Nuzool Story */}
          <div className="flex items-center justify-between gap-3 bg-[var(--bg-surface)] p-3 rounded-2xl border border-[var(--border-subtle)]">
            <div className="flex items-center gap-2 text-xs font-urdu font-bold text-[var(--text-muted)]">
              <Compass className="w-4 h-4 text-emerald-500" />
              <span>کہانی کا راستہ منتخب کیجیے:</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setStoryOrderType('mushaf');
                  setStoryIndex(0);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-urdu font-bold transition-all cursor-pointer ${
                  storyOrderType === 'mushaf'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-[var(--bg-surface-elevated)] text-[var(--text-secondary)]'
                }`}
              >
                مصحفی داستانی ربط (دروازہ ⟵ گائے ⟵ خاندان...)
              </button>
              <button
                onClick={() => {
                  setStoryOrderType('nuzool');
                  setStoryIndex(0);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-urdu font-bold transition-all cursor-pointer ${
                  storyOrderType === 'nuzool'
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-[var(--bg-surface-elevated)] text-[var(--text-secondary)]'
                }`}
              >
                نزولی تاریخی ربط (غارِ حرا ⟵ قلم ⟵ چادر...)
              </button>
            </div>
          </div>

          {/* MAIN ILLUSTRATED STORY STAGE CARD */}
          <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-b from-[var(--bg-surface)] to-[var(--bg-surface-elevated)] border-2 border-amber-500/40 shadow-2xl relative overflow-hidden text-center space-y-6">
            <div className="flex items-center justify-between text-xs font-urdu text-[var(--text-muted)]">
              <span className="font-bold">
                {storyOrderType === 'mushaf' ? 'مصحفی منزل' : 'نزولی منزل'}: #{storyIndex + 1} از {beatsList.length}
              </span>
              <span className="px-3 py-1 rounded-full bg-amber-500/15 text-amber-800 dark:text-amber-300 font-bold">
                {currentBeat.visualSymbolTitle}
              </span>
            </div>

            {/* Huge Illustrated Visual Symbol */}
            <div className="my-4 flex flex-col items-center justify-center">
              <SurahVisualBadge
                mushafOrder={currentBeat.mushafOrder}
                fallbackEmoji={currentBeat.visualEmoji}
                size="xl"
                altText={currentBeat.nameUrdu}
              />
            </div>

            {/* Surah Titles */}
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-bold font-arabic text-[var(--text-primary)]">
                {currentBeat.nameArabic}
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-urdu text-amber-700 dark:text-amber-400">
                {currentBeat.nameUrdu}
              </h3>
              <div className="flex items-center justify-center gap-3 text-xs font-urdu text-[var(--text-muted)] pt-1">
                <span>مصحف: #{currentBeat.mushafOrder}</span>
                <span>•</span>
                <span>نزول: #{currentBeat.nuzoolOrder}</span>
              </div>
            </div>

            {/* THE MEMORIZATION STORY SENTENCE */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[var(--bg-surface)] border border-amber-500/30 max-w-2xl mx-auto shadow-md">
              <div className="flex items-center justify-center gap-2 text-xs font-bold text-emerald-800 dark:text-emerald-300 font-urdu mb-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>داستانی تلازم (Story Link):</span>
              </div>
              <p className="text-sm sm:text-base font-urdu font-bold text-[var(--text-primary)] leading-relaxed">
                {storyOrderType === 'mushaf'
                  ? currentBeat.mushafStorySentence
                  : currentBeat.nuzoolStorySentence}
              </p>
            </div>

            {/* Stepper Controls */}
            <div className="pt-4 flex items-center justify-between gap-4 max-w-lg mx-auto">
              <button
                onClick={() => setStoryIndex((i) => Math.max(0, i - 1))}
                disabled={storyIndex === 0}
                className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[var(--bg-surface)] hover:bg-emerald-700 hover:text-white disabled:opacity-30 disabled:pointer-events-none border border-[var(--border-subtle)] text-xs font-bold font-urdu transition-all cursor-pointer shadow-xs"
              >
                <ChevronRight className="w-4 h-4" />
                <span>پچھلی سورت</span>
              </button>

              <span className="text-xs font-bold text-[var(--text-muted)] font-urdu">
                {storyIndex + 1} / {beatsList.length}
              </span>

              <button
                onClick={() => setStoryIndex((i) => Math.min(beatsList.length - 1, i + 1))}
                disabled={storyIndex === beatsList.length - 1}
                className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[var(--bg-surface)] hover:bg-emerald-700 hover:text-white disabled:opacity-30 disabled:pointer-events-none border border-[var(--border-subtle)] text-xs font-bold font-urdu transition-all cursor-pointer shadow-xs"
              >
                <span>اگلی سورت</span>
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── SUB-MODE 2: VISUAL PICTURE RIDDLES ── */}
      {activeTab === 'riddles' && currentRiddle && (
        <div className="rounded-3xl p-6 sm:p-10 bg-[var(--bg-surface)] border border-emerald-500/30 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-emerald-500" />
              <h3 className="font-bold text-base sm:text-lg font-urdu text-[var(--text-primary)]">
                {currentRiddle.titleUrdu}
              </h3>
            </div>
            <div className="flex items-center gap-3 text-xs font-urdu font-bold text-emerald-800 dark:text-emerald-300">
              <Trophy className="w-4 h-4 text-amber-500" />
              <span>پوائنٹس: {riddleScore}</span>
            </div>
          </div>

          {/* Clue Prompt with Big Emojis */}
          <div className="text-center py-4 space-y-4">
            <div className="text-xs font-bold text-[var(--text-muted)] font-urdu">
              تصویروں کی لڑی دیکھ کر سورتوں کے ناموں کی درست ترتیب پہچانیے:
            </div>

            {/* Sequence of visual emojis */}
            <div className="flex items-center justify-center gap-3 sm:gap-6 py-2 overflow-x-auto no-scrollbar">
              {currentRiddle.emojis.map((em, eIdx) => (
                <div
                  key={eIdx}
                  className="w-14 h-14 sm:w-18 sm:h-18 rounded-2xl bg-[var(--bg-surface-elevated)] border-2 border-emerald-500/30 shadow-md flex items-center justify-center text-3xl sm:text-4xl shrink-0"
                >
                  {em}
                </div>
              ))}
            </div>

            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/25 max-w-xl mx-auto text-xs sm:text-sm font-urdu font-bold text-[var(--text-primary)]">
              اشارہ: {currentRiddle.clueUrdu}
            </div>
          </div>

          {/* Multiple Choice Options */}
          <div className="space-y-3 max-w-2xl mx-auto">
            {currentRiddle.options.map((opt, oIdx) => {
              const isSelected = selectedOption === oIdx;

              let btnStyle =
                'bg-[var(--bg-surface-elevated)] border-[var(--border-subtle)] text-[var(--text-primary)] hover:border-emerald-500';

              if (isAnswerRevealed) {
                if (opt.isCorrect) {
                  btnStyle = 'bg-emerald-600 text-white font-bold shadow-lg ring-2 ring-emerald-400';
                } else if (isSelected && !opt.isCorrect) {
                  btnStyle = 'bg-rose-600 text-white font-bold shadow-lg';
                } else {
                  btnStyle = 'opacity-40 bg-[var(--bg-surface-elevated)] text-[var(--text-muted)]';
                }
              }

              return (
                <button
                  key={oIdx}
                  onClick={() => handleOptionClick(oIdx)}
                  disabled={isAnswerRevealed}
                  className={`w-full p-4 rounded-2xl border text-right font-urdu text-sm transition-all cursor-pointer flex items-center justify-between gap-3 ${btnStyle}`}
                >
                  <span>{opt.labelUrdu}</span>
                  {isAnswerRevealed && opt.isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-white shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback & Next Button */}
          {isAnswerRevealed && (
            <div className="text-center pt-2 space-y-3 animate-fade-in">
              <div className="text-sm font-urdu font-bold">
                {selectedOption !== null && currentRiddle.options[selectedOption].isCorrect ? (
                  <span className="text-emerald-800 dark:text-emerald-300">
                    ماشاءاللہ! بہت شاندار، بالکل درست ترتیب پہچانی! 🎉
                  </span>
                ) : (
                  <span className="text-rose-500">
                    افسوس! درست ترتیب سبز رنگ میں نمایاں ہے۔
                  </span>
                )}
              </div>
              <button
                onClick={handleNextRiddle}
                className="px-6 py-2.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-urdu font-bold text-xs transition-all shadow-md cursor-pointer inline-flex items-center gap-2"
              >
                <span>اگلی پہیلی</span>
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
