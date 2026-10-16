import React, { useState } from 'react';
import {
  MemorizationSurah,
  SURAHS_BY_NUZOOL,
  REVELATION_PHASES_INFO,
  ChronologicalPhase,
} from '../../data/surahMemorizationData';
import {
  Compass,
  Sparkles,
  ChevronRight,
} from 'lucide-react';

interface Props {
  onSelectSurah: (surah: MemorizationSurah) => void;
}

export const SurahRevelationJourney: React.FC<Props> = ({ onSelectSurah }) => {
  const [selectedPhase, setSelectedPhase] = useState<ChronologicalPhase>('early_makki');

  const activePhaseInfo =
    REVELATION_PHASES_INFO.find((p) => p.id === selectedPhase) ||
    REVELATION_PHASES_INFO[0];

  const phaseSurahs = SURAHS_BY_NUZOOL.filter(
    (s) => s.chronologicalPhase === selectedPhase
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 font-sans select-none" dir="rtl">
      {/* ── HEADER BANNER ── */}
      <div className="rounded-3xl p-6 sm:p-8 bg-[var(--bg-surface)] border border-emerald-500/30 shadow-xl mb-8 space-y-4">
        <div className="flex items-center gap-2">
          <Compass className="w-5 h-5 text-emerald-500" />
          <h2 className="text-lg sm:text-2xl font-bold font-urdu text-[var(--text-primary)]">
            شاہراہِ نزول — ۴ تاریخی ادوار کا تاریخی و جغرافیائی سفر
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[var(--text-muted)] font-urdu max-w-3xl leading-relaxed">
          قرآنِ کریم کا نزول ۲۳ سال کے دوران تاریخی مراحل میں ہوا۔ جب طالب علم ہر سورت کو اس کے اصل تاریخی موڑ کے ساتھ یاد کرتا ہے تو قرآن کی ہر آیت زندہ تصویر بن جاتی ہے!
        </p>

        {/* 4 Phases Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          {REVELATION_PHASES_INFO.map((phase) => {
            const isSelected = selectedPhase === phase.id;

            return (
              <button
                key={phase.id}
                onClick={() => setSelectedPhase(phase.id as ChronologicalPhase)}
                className={`p-4 rounded-2xl border text-right transition-all cursor-pointer space-y-1.5 ${
                  isSelected
                    ? 'bg-emerald-700 text-white shadow-xl ring-2 ring-emerald-400 scale-[1.02]'
                    : 'bg-[var(--bg-surface-elevated)] border-[var(--border-subtle)] hover:border-emerald-500/40 text-[var(--text-primary)]'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-urdu">
                  <span className="font-bold">{phase.subtitleUrdu}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-black/20 font-bold">
                    {phase.count} سورتیں
                  </span>
                </div>
                <div className="font-extrabold text-sm font-urdu leading-snug">
                  {phase.titleUrdu}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── ACTIVE PHASE SUMMARY CARD ── */}
      <div className="rounded-3xl p-6 bg-gradient-to-r from-emerald-950/20 via-amber-950/15 to-indigo-950/20 border border-emerald-500/30 mb-8 space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <h3 className="font-bold text-base sm:text-lg font-urdu text-[var(--text-primary)]">
            {activePhaseInfo.titleUrdu} — {activePhaseInfo.subtitleUrdu}
          </h3>
        </div>
        <p className="text-xs sm:text-sm font-urdu text-[var(--text-secondary)] leading-relaxed">
          {activePhaseInfo.summaryUrdu}
        </p>
      </div>

      {/* ── PHASE SURAHS CHRONOLOGICAL TIMELINE STREAM ── */}
      <div className="space-y-3">
        <h4 className="font-bold text-sm font-urdu text-[var(--text-muted)] flex items-center gap-2">
          <span>اس دور کی نازل ہونے والی تمام سورتیں (نزولی ترتیب کے ساتھ):</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 font-bold">
            {phaseSurahs.length}
          </span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {phaseSurahs.map((surah) => (
            <div
              key={surah.nuzoolOrder}
              onClick={() => onSelectSurah(surah)}
              className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-emerald-500/70 shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between gap-3 group"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-xl bg-emerald-600/20 text-emerald-800 dark:text-emerald-300 flex items-center justify-center font-bold text-xs font-urdu shrink-0">
                    #{surah.nuzoolOrder}
                  </span>
                  <div>
                    <div className="font-bold text-sm sm:text-base font-urdu text-[var(--text-primary)] group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                      {surah.nameUrdu}
                    </div>
                    <div className="text-[11px] text-[var(--text-muted)] font-urdu">
                      {surah.meaningUrdu}
                    </div>
                  </div>
                </div>

                <div className="text-left shrink-0 text-xs font-urdu">
                  <span className="px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-800 dark:text-amber-300 font-bold block">
                    مصحف: #{surah.mushafOrder}
                  </span>
                </div>
              </div>

              {/* Mnemonic Hook Snippet */}
              <div className="p-2.5 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-[11px] font-urdu text-[var(--text-secondary)] line-clamp-2">
                <span className="font-bold text-emerald-800 dark:text-emerald-300">یاد دہانی: </span>
                {surah.mnemonicKeyUrdu}
              </div>

              {/* Verses count */}
              <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between text-[10px] font-urdu text-[var(--text-muted)]">
                <span>{surah.versesCount} آیات</span>
                <span className="text-emerald-700 dark:text-emerald-300 font-bold group-hover:translate-x-[-2px] transition-transform flex items-center gap-1">
                  <span>تفصیل دیکھیں</span>
                  <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
