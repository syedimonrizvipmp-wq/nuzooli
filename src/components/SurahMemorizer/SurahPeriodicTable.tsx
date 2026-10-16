import React, { useState } from 'react';
import {
  MemorizationSurah,
  MEMORIZATION_SURAHS,
  THEMATIC_FAMILIES_INFO,
} from '../../data/surahMemorizationData';
import { SURAH_114_VISUAL_CATALOG } from '../../data/surahVisualCatalog114';
import { SurahVisualBadge } from './SurahVisualBadge';
import {
  Layers,
  Search,
} from 'lucide-react';

interface Props {
  onSelectSurah: (surah: MemorizationSurah) => void;
}

export const SurahPeriodicTable: React.FC<Props> = ({ onSelectSurah }) => {
  const [selectedFamily, setSelectedFamily] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [orderSort, setOrderSort] = useState<'mushaf' | 'nuzool'>('mushaf');

  // Filtered surahs
  const filteredSurahs = MEMORIZATION_SURAHS.filter((surah) => {
    const matchesFamily =
      selectedFamily === 'all' || surah.thematicFamily === selectedFamily;
    const matchesSearch =
      searchQuery.trim() === '' ||
      surah.nameUrdu.includes(searchQuery.trim()) ||
      surah.nameArabic.includes(searchQuery.trim()) ||
      surah.nameEnglish.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      surah.meaningUrdu.includes(searchQuery.trim()) ||
      surah.mushafOrder.toString() === searchQuery.trim() ||
      surah.nuzoolOrder.toString() === searchQuery.trim();

    return matchesFamily && matchesSearch;
  }).sort((a, b) =>
    orderSort === 'mushaf'
      ? a.mushafOrder - b.mushafOrder
      : a.nuzoolOrder - b.nuzoolOrder
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 font-sans select-none" dir="rtl">
      {/* ── CONTROLS & THEMATIC FAMILIES FILTER BAR ── */}
      <div className="rounded-3xl p-6 bg-[var(--bg-surface)] border border-amber-500/30 shadow-xl mb-8 space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-amber-500" />
              <h2 className="text-lg sm:text-xl font-bold font-urdu text-[var(--text-primary)]">
                جدولِ سُوَر — ۱۱۴ سورتوں کا پیریڈک ٹیبل (Periodic Table of the Quran)
              </h2>
            </div>
            <p className="text-xs text-[var(--text-muted)] font-urdu mt-1">
              کیمسٹری کے پیریڈک ٹیبل کی طرح ہر سورت ایک مقدس عنصر (Sacred Element) ہے جس کے اندر مصحفی و نزولی نمبر اور مفہوم سمویا ہوا ہے۔
            </p>
          </div>

          {/* Sort Switcher: Mushaf vs Nuzool */}
          <div className="flex items-center gap-2 bg-[var(--bg-surface-elevated)] p-1 rounded-2xl border border-[var(--border-subtle)] shrink-0">
            <button
              onClick={() => setOrderSort('mushaf')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-urdu font-bold transition-all cursor-pointer ${
                orderSort === 'mushaf'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              مصحفی ترتیب سے
            </button>
            <button
              onClick={() => setOrderSort('nuzool')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-urdu font-bold transition-all cursor-pointer ${
                orderSort === 'nuzool'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              نزولی ترتیب سے
            </button>
          </div>
        </div>

        {/* Search Input & Thematic Filter Pills */}
        <div className="flex flex-col lg:flex-row items-center gap-3">
          {/* Search Box */}
          <div className="relative w-full lg:w-72 shrink-0">
            <Search className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="سورت کا نام یا نمبر تلاش کریں..."
              className="w-full pr-10 pl-4 py-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] text-xs font-urdu focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Family Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full pb-1">
            {THEMATIC_FAMILIES_INFO.map((f) => {
              const isSelected = selectedFamily === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setSelectedFamily(f.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-urdu font-bold shrink-0 transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-emerald-700 text-white shadow-md ring-2 ring-emerald-500/40'
                      : 'bg-[var(--bg-surface-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)]'
                  }`}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: f.color }}
                  />
                  <span>{f.titleUrdu}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── THE PERIODIC GRID OF 114 SURAHS ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
        {filteredSurahs.map((surah) => {
          const isMeccan = surah.revelationPlace === 'meccan';

          return (
            <div
              key={surah.mushafOrder}
              onClick={() => onSelectSurah(surah)}
              className="group relative rounded-2xl p-3 bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-amber-400/80 shadow-md hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden"
            >
              {/* Top Bar: Mushaf & Nuzool Numbers */}
              <div className="flex items-center justify-between text-[10px] font-bold font-urdu mb-2">
                <span className="w-6 h-6 rounded-lg bg-amber-500/15 text-amber-800 dark:text-amber-300 flex items-center justify-center font-bold">
                  #{surah.mushafOrder}
                </span>
                <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 font-bold">
                  نزول #{surah.nuzoolOrder}
                </span>
              </div>

              {/* Center: Visual Badge & Arabic Calligraphy & Urdu Name */}
              <div className="text-center my-1.5 space-y-1 flex flex-col items-center">
                <SurahVisualBadge
                  mushafOrder={surah.mushafOrder}
                  fallbackEmoji={SURAH_114_VISUAL_CATALOG[surah.mushafOrder]?.emoji || '📖'}
                  size="sm"
                  altText={surah.nameUrdu}
                  className="mb-1"
                />
                <div className="text-lg sm:text-xl font-bold font-arabic text-[var(--text-primary)] group-hover:text-amber-600 transition-colors">
                  {surah.nameArabic}
                </div>
                <div className="text-xs font-bold font-urdu text-[var(--text-primary)]">
                  {surah.nameUrdu}
                </div>
                <div className="text-[10px] text-[var(--text-muted)] font-urdu line-clamp-1">
                  {surah.meaningUrdu}
                </div>
              </div>

              {/* Bottom: Verses & Meccan/Medinan Badge */}
              <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between text-[9px] font-urdu">
                <span className="text-[var(--text-muted)]">
                  {surah.versesCount} آیات
                </span>
                <span
                  className={`px-1.5 py-0.5 rounded-md font-bold ${
                    isMeccan
                      ? 'bg-amber-500/15 text-amber-800 dark:text-amber-300'
                      : 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-300'
                  }`}
                >
                  {isMeccan ? 'مکی' : 'مدنی'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {filteredSurahs.length === 0 && (
        <div className="text-center py-16 bg-[var(--bg-surface)] rounded-3xl border border-[var(--border-subtle)]">
          <p className="text-sm font-bold text-[var(--text-muted)] font-urdu">
            کوئی سورت تلاش کے معیار پر پوری نہیں اتری۔ براہِ کرم فلٹر یا تلاش کا لفظ تبدیل کریں۔
          </p>
        </div>
      )}
    </div>
  );
};
