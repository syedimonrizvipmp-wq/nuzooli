import React, { useState, useMemo } from 'react';
import { useQuran } from '@/context/QuranContext';
import {
  ASMA_EPOCHS,
  ASMA_UL_HUSNA_CHRONOLOGY,
} from '@/data/asmaUlHusnaData';
import {
  Sparkles,
  Search,
  Volume2,
  ArrowRight,
  Info,
  Clock,
  Crown,
  BookMarked,
} from 'lucide-react';

export const AsmaUlHusnaChronologyView: React.FC = () => {
  const { setActiveEventOrder, setPerspectiveMode, playAyah, pauseAudio, activeAudio } = useQuran();
  const [selectedEpochId, setSelectedEpochId] = useState<string>('all');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedNameId, setSelectedNameId] = useState<string>('ar-rabb');

  // Filtered List
  const filteredNames = useMemo(() => {
    return ASMA_UL_HUSNA_CHRONOLOGY.filter((item) => {
      // Epoch filter
      if (selectedEpochId !== 'all') {
        const epochMatches =
          (selectedEpochId === 'early_mecca' && item.epoch === 'Early Meccan') ||
          (selectedEpochId === 'mid_mecca' && item.epoch === 'Mid Meccan') ||
          (selectedEpochId === 'late_mecca' && item.epoch === 'Late Meccan') ||
          (selectedEpochId === 'early_medina' && item.epoch === 'Early Medinan') ||
          (selectedEpochId === 'late_medina' && item.epoch === 'Late Medinan');
        if (!epochMatches) return false;
      }

      // Category filter
      if (selectedCategoryId !== 'all' && item.category !== selectedCategoryId) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        return (
          item.nameArabic.includes(q) ||
          item.meaningUrdu.includes(q) ||
          item.meaningEnglish.toLowerCase().includes(q) ||
          item.firstNuzulSurah.includes(q) ||
          item.verseArabic.includes(q) ||
          item.verseTranslationUrdu.includes(q)
        );
      }

      return true;
    });
  }, [selectedEpochId, selectedCategoryId, searchQuery]);

  // Selected Name Object for Spotlight
  const activeName = useMemo(() => {
    return ASMA_UL_HUSNA_CHRONOLOGY.find((n) => n.id === selectedNameId) || ASMA_UL_HUSNA_CHRONOLOGY[0];
  }, [selectedNameId]);

  const navigateToReader = (nuzulRank: number) => {
    setActiveEventOrder(nuzulRank);
    setPerspectiveMode('nuzul');
  };

  const categories = [
    { id: 'all', labelUrdu: 'تمام صفات', color: 'var(--text-primary)' },
    { id: 'rububiyyah', labelUrdu: 'ربوبیت و پرورش', color: '#10B981' },
    { id: 'dhat', labelUrdu: 'ذات و توحیدِ خالص', color: '#8B5CF6' },
    { id: 'rahmah', labelUrdu: 'رحمت و مغفرت', color: '#F59E0B' },
    { id: 'hikmah_izzah', labelUrdu: 'حکمت و عزت', color: '#0284C7' },
    { id: 'mulk_adl', labelUrdu: 'حاکمیت و فرمانروائی', color: '#6366F1' },
    { id: 'wilayah_nasr', labelUrdu: 'ولایت و نصرت', color: '#EC4899' },
  ];

  return (
    <div className="space-y-6 animate-fade-in" dir="rtl">
      {/* ── HEADER BANNER ── */}
      <div className="p-5 sm:p-7 rounded-3xl sacred-glass sacred-border space-y-4 shadow-md">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>The Chronological Emergence of Asma-ul-Husna <span className="font-urdu">(اسمائے حسنیٰ کا نزولی سفر)</span></span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-urdu text-[var(--text-primary)]">
              ۲۳ سالہ وحی میں اللہ تعالیٰ کے اسماء و صفات کا تدریجی ظہور
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1.5 max-w-3xl leading-relaxed font-urdu">
              اللہ تعالیٰ نے اپنے بندوں سے تعارف کے لیے اسمائے مبارکہ کو کس تاریخی ترتیب کے ساتھ نازل فرمایا؟ غارِ حرا میں سب سے پہلا تعارف ربوبیت اور کرم (*الرَّبّ* اور *الْأَكْرَم*) سے ہوا، مکہ کے درمیانی دور میں مشرکین کے انکار پر *الرَّحْمَٰن* کی صفت پر کلام ہوا، مدینہ میں شریعت اور ریاست کے ساتھ *الْعَزِيز الْحَكِيم* کا غلبہ رہا، اور اتمامِ وحی پر *الْوَلِيّ*، *الْمَوْلَىٰ* اور *التَّوَّاب* پر رسالت کا سفر مکمل ہوا۔
            </p>
          </div>

          {/* Quick Metrics Badges */}
          <div className="flex flex-wrap lg:flex-col items-start gap-2 shrink-0">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
              <Crown className="w-3.5 h-3.5 text-amber-500" />
              <span className="font-urdu">پہلا اسمِ نزولی: «الرَّبّ» (غارِ حرا ۶۱۰ء)</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-sky-500/10 border border-sky-500/25 text-sky-800 dark:text-sky-300 text-xs font-bold">
              <Clock className="w-3.5 h-3.5 text-sky-500" />
              <span className="font-urdu">آخری اسمِ نزولی: «التَّوَّاب» (سورۃ النصر ۶۳۲ء)</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/25 text-purple-800 dark:text-purple-300 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-purple-500" />
              <span className="font-urdu">اعظم جھرمٹ: ۱۶ اسماء (سورۃ الحشر آیات ۲۲–۲۴)</span>
            </div>
          </div>
        </div>

        {/* 5-Epoch Timeline Horizontal Progress Cards */}
        <div className="pt-3 border-t border-[var(--border-subtle)] space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-[var(--text-secondary)] font-urdu">
            <span>تاریخی ادوار کا تسلسل:</span>
            <span className="text-[11px] text-emerald-700 dark:text-emerald-400">کسی بھی دور پر کلک کر کے اس کے اسماء دیکھیں</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            {ASMA_EPOCHS.map((ep) => {
              const isSelected = selectedEpochId === ep.id;
              return (
                <button
                  key={ep.id}
                  onClick={() => setSelectedEpochId(selectedEpochId === ep.id ? 'all' : ep.id)}
                  className={`p-2.5 rounded-xl border text-right transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-500/15 border-emerald-500 shadow-sm ring-2 ring-emerald-500/20'
                      : 'bg-[var(--bg-surface)] border-[var(--border-subtle)] hover:border-emerald-500/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: ep.color }} />
                    <span className="text-[10px] text-[var(--text-muted)] font-mono">{ep.yearsLabel.split(' ')[0]}</span>
                  </div>
                  <div className="font-urdu text-xs font-bold text-[var(--text-primary)] leading-tight truncate">
                    {ep.titleUrdu.split(':')[0]}
                  </div>
                  <div className="text-[10px] text-[var(--text-muted)] font-urdu truncate mt-0.5">
                    {ep.thematicFocusUrdu}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── FILTERS & SEARCH ROW ── */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 p-3.5 rounded-2xl sacred-glass sacred-border">
        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategoryId(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold font-urdu transition-all cursor-pointer ${
                selectedCategoryId === cat.id
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] border border-[var(--border-subtle)] hover:border-emerald-500'
              }`}
            >
              {cat.labelUrdu}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-64 shrink-0">
          <Search className="w-4 h-4 text-[var(--text-muted)] absolute right-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="اسمِ مبارک یا معنی میں تلاش..."
            className="w-full pr-9 pl-3 py-1.5 rounded-xl text-xs bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:ring-2 focus:ring-emerald-500 font-urdu"
          />
        </div>
      </div>

      {/* ── SPOTLIGHT DOSSIER FOR SELECTED DIVINE NAME ── */}
      {activeName && (
        <div className="p-5 sm:p-7 rounded-3xl sacred-border bg-[var(--bg-surface-card)] shadow-lg space-y-5 border-t-4 border-t-amber-500">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[var(--border-subtle)]">
            <div className="flex items-center gap-3">
              <div
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center font-arabic text-2xl sm:text-3xl font-bold shadow-md text-white shrink-0"
                style={{ backgroundColor: activeName.categoryColor }}
              >
                {activeName.nameArabic}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-arabic text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                    {activeName.nameArabic}
                  </h4>
                  <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] font-urdu text-emerald-700 dark:text-emerald-400">
                    {activeName.epochUrdu}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-amber-500/15 text-amber-800 dark:text-amber-300 font-urdu">
                    {activeName.categoryUrdu}
                  </span>
                </div>
                <p className="font-urdu text-sm font-bold text-emerald-800 dark:text-emerald-300">
                  {activeName.meaningUrdu}
                </p>
                <p className="text-xs text-[var(--text-muted)] font-sans">
                  {activeName.meaningEnglish} — Total Quranic Mentions: {activeName.totalQuranicMentions}
                </p>
              </div>
            </div>

            {/* Quick Milestones info */}
            <div className="flex items-center gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-right space-y-0.5">
                <span className="text-[10px] text-[var(--text-muted)] font-urdu block">پہلا نزولی مقام:</span>
                <span className="font-urdu font-bold text-emerald-700 dark:text-emerald-400">
                  سورۃ {activeName.firstNuzulSurah} (آیت {activeName.firstAyah})
                </span>
                <span className="text-[10px] text-[var(--text-muted)] font-mono block">
                  نزول #{activeName.firstNuzulRank} ➔ مصحف #{activeName.firstMushafOrder} ({activeName.yearLabel})
                </span>
              </div>
            </div>
          </div>

          {/* First Revelation Verse Spotlight */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-3">
            <div className="flex items-center justify-between text-xs pb-2 border-b border-[var(--border-subtle)]">
              <span className="font-urdu font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                <BookMarked className="w-4 h-4 text-emerald-600" />
                <span>سب سے پہلی وحی جس میں یہ اسمِ مبارک نازل ہوا:</span>
              </span>
              <div className="flex items-center gap-2">
                {(() => {
                  const isReciting =
                    activeAudio?.surahNumber === activeName.firstMushafOrder &&
                    activeAudio?.ayahNumber === activeName.firstAyah &&
                    activeAudio?.isPlaying;

                  return (
                    <button
                      onClick={() => {
                        if (isReciting) {
                          pauseAudio();
                        } else {
                          playAyah(activeName.firstMushafOrder, activeName.firstAyah, activeName.firstNuzulRank);
                        }
                      }}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold transition-all border ${
                        isReciting
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'bg-[var(--bg-surface-elevated)] hover:bg-emerald-600 hover:text-white border-[var(--border-subtle)] text-[var(--text-primary)]'
                      }`}
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span className="font-urdu">{isReciting ? 'تلاوت جاری ہے' : 'تلاوت سنیں'}</span>
                    </button>
                  );
                })()}

                <button
                  onClick={() => navigateToReader(activeName.firstNuzulRank)}
                  className="flex items-center gap-1 px-3 py-1 rounded-xl text-xs font-bold bg-emerald-700 text-white hover:bg-emerald-800 transition-all cursor-pointer shadow-xs"
                >
                  <span className="font-urdu">ریڈر میں دیکھیں</span>
                  <ArrowRight className="w-3 h-3 rotate-180" />
                </button>
              </div>
            </div>

            <p className="font-arabic text-lg sm:text-xl lg:text-2xl text-[var(--text-primary)] leading-loose text-right">
              {activeName.verseArabic}
            </p>

            <div className="p-3 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] space-y-1">
              <p className="font-urdu text-xs sm:text-sm text-[var(--text-primary)] leading-relaxed">
                <span className="font-bold text-emerald-700 dark:text-emerald-400 ml-1">ترجمہ:</span>
                {activeName.verseTranslationUrdu}
              </p>
              <p className="text-[11px] text-[var(--text-muted)] font-sans text-left" dir="ltr">
                {activeName.verseTranslationEnglish}
              </p>
            </div>

            <div className="flex items-start gap-2 pt-1 text-xs">
              <Info className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-urdu font-bold text-emerald-800 dark:text-emerald-300 ml-1">
                  علمی و عرفانی تفسیری بصیرت:
                </span>
                <span className="font-urdu text-[var(--text-secondary)] leading-relaxed">
                  {activeName.scholarlyTheologicalInsightUrdu}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── CHRONOLOGICAL GRID OF DIVINE NAMES ── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-[var(--text-secondary)] font-urdu">
          <span className="font-bold text-sm text-[var(--text-primary)]">
            فہرستِ اسماء بترتیبِ نزول ({filteredNames.length} اسماء):
          </span>
          <span>کسی بھی اسم پر کلک کر کے اس کا مکمل تفسیری احوال دیکھیں</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {filteredNames.map((item) => {
            const isSelected = selectedNameId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedNameId(item.id)}
                className={`p-3.5 rounded-2xl border text-right transition-all flex flex-col justify-between gap-2.5 cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-br from-[var(--bg-surface-card)] to-amber-500/10 border-amber-500 shadow-md ring-2 ring-amber-500/20'
                    : 'bg-[var(--bg-surface-card)] border-[var(--border-subtle)] hover:border-emerald-500/50 hover:bg-[var(--bg-surface-elevated)]'
                }`}
              >
                <div className="flex items-start justify-between w-full">
                  <div className="space-y-0.5">
                    <span className="font-arabic text-xl font-bold text-[var(--text-primary)] block">
                      {item.nameArabic}
                    </span>
                    <span className="font-urdu text-xs font-bold text-emerald-800 dark:text-emerald-300 block">
                      {item.meaningUrdu}
                    </span>
                  </div>
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full font-mono shrink-0"
                    style={{ backgroundColor: `${item.categoryColor}20`, color: item.categoryColor }}
                  >
                    نزول #{item.firstNuzulRank}
                  </span>
                </div>

                <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between w-full text-[11px] text-[var(--text-muted)]">
                  <span className="font-urdu truncate">
                    سورۃ {item.firstNuzulSurah}:{item.firstAyah}
                  </span>
                  <span className="font-mono text-[10px]">{item.yearLabel.split('/')[0]}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
