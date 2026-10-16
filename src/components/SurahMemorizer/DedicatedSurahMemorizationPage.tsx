import React, { useState, useEffect } from 'react';
import {
  MemorizationSurah,
  MEMORIZATION_SURAHS,
} from '../../data/surahMemorizationData';
import {
  ArrowRight,
  Maximize2,
  Minimize2,
  Compass,
  Layers,
  Sparkles,
  BookOpen,
  Trophy,
  ArrowLeftRight,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { SurahDualTrackHelix } from './SurahDualTrackHelix';
import { SurahPeriodicTable } from './SurahPeriodicTable';
import { SurahRevelationJourney } from './SurahRevelationJourney';
import { SurahFlashcardStudio } from './SurahFlashcardStudio';
import { SurahVisualStoryArcade } from './SurahVisualStoryArcade';
import { SurahVisualBadge } from './SurahVisualBadge';
import { SURAH_114_VISUAL_CATALOG } from '../../data/surahVisualCatalog114';

interface Props {
  onBackToMain: () => void;
  onNavigateToTimeline?: () => void;
}

type MemorizationVisualMode = 'helix' | 'periodic' | 'journey' | 'studio' | 'arcade';

export const DedicatedSurahMemorizationPage: React.FC<Props> = ({
  onBackToMain,
  onNavigateToTimeline,
}) => {
  const [activeVisualMode, setActiveVisualMode] = useState<MemorizationVisualMode>('helix');
  const [selectedSurahModal, setSelectedSurahModal] = useState<MemorizationSurah | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Fullscreen listener
  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  const toggleBrowserFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen?.();
      } else {
        await document.exitFullscreen?.();
      }
    } catch {}
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedSurahModal) {
          setSelectedSurahModal(null);
        } else {
          onBackToMain();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedSurahModal, onBackToMain]);

  return (
    <div
      className="min-h-screen w-screen bg-[var(--bg-primary)] text-[var(--text-primary)] flex flex-col justify-between overflow-x-hidden select-none transition-colors duration-300 font-sans"
      dir="rtl"
    >
      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* ── TOP APPLICATION BAR (Distraction-Free & Elegant) ── */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <header className="w-full px-4 sm:px-6 py-2.5 border-b border-[var(--border-subtle)] bg-[var(--bg-surface)]/95 backdrop-blur-md flex flex-wrap items-center justify-between gap-3 shrink-0 shadow-xs z-30">
        
        {/* Left side: Back to portal + Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToMain}
            title="مرکزی قرآنی پورٹل پر واپس جائیں (یا کی بورڈ سے Esc دبائیں)"
            className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold font-urdu shadow-md cursor-pointer transition-all active:scale-95 group ring-2 ring-emerald-500/30 shrink-0"
          >
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            <span>واپس مرکزی پورٹل (Back)</span>
          </button>

          <div className="hidden sm:block h-6 w-px bg-[var(--border-subtle)]" />

          {/* Title Branding */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-500 shadow-xs shrink-0">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-urdu font-bold text-sm sm:text-base text-[var(--text-primary)] leading-tight">
                  قرآنی سورتوں کا انسائیکلوپیڈیا و حفظ پورٹل
                </h1>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30 font-urdu hidden md:inline">
                  مصحفی و نزولی تقابل
                </span>
              </div>
              <p className="text-[10px] text-[var(--text-muted)] font-urdu hidden lg:block">
                تمام ۱۱۴ سورتوں کے اسماء، معانی، اور دوہری ترتیب کے آسان فہم حفظ کا جدید تعلیمی مرکز
              </p>
            </div>
          </div>
        </div>

        {/* Center: The 4 Pedagogical Visual Mode Buttons */}
        <div className="flex items-center gap-1.5 bg-[var(--bg-surface-elevated)] p-1 rounded-2xl border border-[var(--border-subtle)] shadow-xs overflow-x-auto no-scrollbar">
          {/* Mode 1: Dual Helix */}
          <button
            onClick={() => setActiveVisualMode('helix')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-urdu font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeVisualMode === 'helix'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <ArrowLeftRight className="w-3.5 h-3.5" />
            <span>دوہری پٹری</span>
          </button>

          {/* Mode 2: Periodic Table */}
          <button
            onClick={() => setActiveVisualMode('periodic')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-urdu font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeVisualMode === 'periodic'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>جدولِ سُوَر (پیریڈک ٹیبل)</span>
          </button>

          {/* Mode 3: Revelation Journey */}
          <button
            onClick={() => setActiveVisualMode('journey')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-urdu font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeVisualMode === 'journey'
                ? 'bg-teal-700 text-white shadow-xs'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>شاہراہِ نزول</span>
          </button>

          {/* Mode 4: Flashcard Studio */}
          <button
            onClick={() => setActiveVisualMode('studio')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-urdu font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeVisualMode === 'studio'
                ? 'bg-indigo-700 text-white shadow-xs'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>حفظ اسٹوڈیو</span>
          </button>

          {/* Mode 5: Visual Story Arcade & Riddles */}
          <button
            onClick={() => setActiveVisualMode('arcade')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-urdu font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeVisualMode === 'arcade'
                ? 'bg-rose-700 text-white shadow-xs'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>کہانیاں و پہیلیاں</span>
          </button>
        </div>

        {/* Right side: Link to Grand Timeline + Fullscreen */}
        <div className="flex items-center gap-2">
          {onNavigateToTimeline && (
            <button
              onClick={onNavigateToTimeline}
              title="عالمی تقویمی ٹائم لائن پورٹل پر جائیں"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--bg-surface-elevated)] hover:bg-amber-500/15 border border-[var(--border-subtle)] text-xs text-[var(--text-primary)] font-urdu font-bold cursor-pointer transition-all active:scale-95"
            >
              <Compass className="w-3.5 h-3.5 text-amber-500" />
              <span>تقویمی ٹائم لائن</span>
            </button>
          )}

          <button
            onClick={toggleBrowserFullscreen}
            title={isFullscreen ? 'عام اسکرین' : 'فل اسکرین (F11)'}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--bg-surface-elevated)] hover:bg-emerald-600/15 border border-[var(--border-subtle)] text-xs text-[var(--text-primary)] font-urdu font-bold cursor-pointer transition-all active:scale-95"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5 text-amber-500" />}
            <span className="hidden sm:inline">{isFullscreen ? 'عام اسکرین' : 'فل اسکرین'}</span>
          </button>
        </div>
      </header>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* ── MAIN CONTENT AREA BASED ON ACTIVE VISUAL MODE ── */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <main className="flex-1 w-full overflow-y-auto">
        {activeVisualMode === 'helix' && (
          <SurahDualTrackHelix onSelectSurah={(s) => setSelectedSurahModal(s)} />
        )}
        {activeVisualMode === 'periodic' && (
          <SurahPeriodicTable onSelectSurah={(s) => setSelectedSurahModal(s)} />
        )}
        {activeVisualMode === 'journey' && (
          <SurahRevelationJourney onSelectSurah={(s) => setSelectedSurahModal(s)} />
        )}
        {activeVisualMode === 'studio' && (
          <SurahFlashcardStudio onSelectSurah={(s) => setSelectedSurahModal(s)} />
        )}
        {activeVisualMode === 'arcade' && (
          <SurahVisualStoryArcade
            onSelectSurahNum={(num) => {
              const s = MEMORIZATION_SURAHS.find((item) => item.mushafOrder === num);
              if (s) setSelectedSurahModal(s);
            }}
          />
        )}
      </main>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* ── SURAH DEEP-DIVE PEDAGOGICAL MODAL DIALOG ── */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      {selectedSurahModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedSurahModal(null)}
          dir="rtl"
        >
          <div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[var(--bg-surface)] border border-amber-500/40 shadow-2xl p-6 sm:p-8 space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
              <div className="flex items-center gap-3.5">
                <SurahVisualBadge
                  mushafOrder={selectedSurahModal.mushafOrder}
                  fallbackEmoji={SURAH_114_VISUAL_CATALOG[selectedSurahModal.mushafOrder]?.emoji || '📖'}
                  size="md"
                  altText={selectedSurahModal.nameUrdu}
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-800 dark:text-amber-300 flex items-center justify-center font-bold text-sm">
                      #{selectedSurahModal.mushafOrder}
                    </span>
                    <div className="text-2xl sm:text-3xl font-bold font-arabic text-[var(--text-primary)]">
                      {selectedSurahModal.nameArabic}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold font-urdu text-[var(--text-primary)]">
                    {selectedSurahModal.nameUrdu} — {selectedSurahModal.meaningUrdu}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setSelectedSurahModal(null)}
                className="w-10 h-10 rounded-2xl bg-[var(--bg-surface-elevated)] hover:bg-rose-500/20 hover:text-rose-500 flex items-center justify-center transition-colors cursor-pointer text-[var(--text-primary)]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Coordinates Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[var(--bg-surface-elevated)] p-4 rounded-2xl border border-[var(--border-subtle)] text-xs font-urdu text-center">
              <div>
                <span className="text-[var(--text-muted)] block text-[10px]">مصحفی نمبر:</span>
                <span className="text-base font-bold text-amber-800 dark:text-amber-300">
                  #{selectedSurahModal.mushafOrder}
                </span>
              </div>
              <div>
                <span className="text-[var(--text-muted)] block text-[10px]">نزولی نمبر:</span>
                <span className="text-base font-bold text-emerald-800 dark:text-emerald-300">
                  #{selectedSurahModal.nuzoolOrder}
                </span>
              </div>
              <div>
                <span className="text-[var(--text-muted)] block text-[10px]">آیات کی تعداد:</span>
                <span className="text-base font-bold text-indigo-700 dark:text-indigo-300">
                  {selectedSurahModal.versesCount}
                </span>
              </div>
              <div>
                <span className="text-[var(--text-muted)] block text-[10px]">مقامِ نزول:</span>
                <span className="text-base font-bold text-teal-800 dark:text-teal-300">
                  {selectedSurahModal.revelationPlace === 'meccan' ? 'مکی' : 'مدنی'}
                </span>
              </div>
            </div>

            {/* Mnemonic Associative Key Banner */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-amber-500/5 to-transparent border border-amber-500/30 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-700 dark:text-amber-300 font-urdu">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>یاد دہانی کا الٰہی تلازم (Mnemonic Key for Memorization):</span>
              </div>
              <p className="text-xs sm:text-sm font-urdu text-[var(--text-primary)] leading-relaxed font-semibold">
                {selectedSurahModal.mnemonicKeyUrdu}
              </p>
            </div>

            {/* Central Theme */}
            <div className="p-4 rounded-2xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] space-y-1.5 text-xs font-urdu">
              <span className="font-bold text-emerald-800 dark:text-emerald-300">مرکزی الٰہی پیغام و موضوع:</span>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                {selectedSurahModal.keyThemeUrdu}
              </p>
            </div>

            {/* Stepper between Surahs */}
            <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between">
              <button
                onClick={() => {
                  const idx = MEMORIZATION_SURAHS.findIndex(
                    (s) => s.mushafOrder === selectedSurahModal.mushafOrder
                  );
                  if (idx > 0) {
                    setSelectedSurahModal(MEMORIZATION_SURAHS[idx - 1]);
                  }
                }}
                disabled={selectedSurahModal.mushafOrder <= 1}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--bg-surface-elevated)] hover:bg-emerald-700 hover:text-white disabled:opacity-30 disabled:pointer-events-none text-xs font-bold font-urdu transition-all cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
                <span>پچھلی سورت</span>
              </button>

              <span className="text-xs font-bold text-[var(--text-muted)] font-urdu">
                سورت {selectedSurahModal.mushafOrder} از ۱۱۴
              </span>

              <button
                onClick={() => {
                  const idx = MEMORIZATION_SURAHS.findIndex(
                    (s) => s.mushafOrder === selectedSurahModal.mushafOrder
                  );
                  if (idx < MEMORIZATION_SURAHS.length - 1) {
                    setSelectedSurahModal(MEMORIZATION_SURAHS[idx + 1]);
                  }
                }}
                disabled={selectedSurahModal.mushafOrder >= 114}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--bg-surface-elevated)] hover:bg-emerald-700 hover:text-white disabled:opacity-30 disabled:pointer-events-none text-xs font-bold font-urdu transition-all cursor-pointer"
              >
                <span>اگلی سورت</span>
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
