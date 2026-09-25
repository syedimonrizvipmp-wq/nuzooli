import React, { useState, useMemo } from 'react';
import { useQuran } from '@/context/QuranContext';
import { AUDIENCE_GROUPS } from '@/data/audienceMatrixData';
import { ALL_AUDIENCE_VERSES_CATALOG } from '@/data/audienceVersesCatalog';
import {
  Users,
  Globe,
  ShieldCheck,
  BookOpen,
  AlertTriangle,
  Sparkles,
  Search,
  BookMarked,
  Volume2,
  Info,
  Clock,
  CheckCircle2,
  ArrowRight,
  Flame,
  Layers,
  ArrowUpDown,
  Filter,
} from 'lucide-react';

export const AudienceMatrixView: React.FC = () => {
  const { setActiveEventOrder, setPerspectiveMode, playAyah, pauseAudio, activeAudio } = useQuran();
  const [selectedGroupId, setSelectedGroupId] = useState<string>('believers');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'highlights' | 'all_catalog'>('all_catalog');
  const [activeSubFilter, setActiveSubFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'nuzul' | 'mushaf'>('nuzul');

  // Selected Group Object
  const currentGroup = useMemo(() => {
    return AUDIENCE_GROUPS.find((g) => g.id === selectedGroupId) || AUDIENCE_GROUPS[0];
  }, [selectedGroupId]);

  // Full Catalog for this group
  const rawCatalogVerses = useMemo(() => {
    return ALL_AUDIENCE_VERSES_CATALOG[selectedGroupId] || [];
  }, [selectedGroupId]);

  // Dynamic Subcategory Filters for this group
  const subFilterOptions = useMemo(() => {
    const map = new Map<string, { key: string; labelUrdu: string; count: number }>();
    for (const v of rawCatalogVerses) {
      if (!map.has(v.subCategoryKey)) {
        map.set(v.subCategoryKey, {
          key: v.subCategoryKey,
          labelUrdu: v.subCategoryTitleUrdu,
          count: 0,
        });
      }
      map.get(v.subCategoryKey)!.count++;
    }
    return Array.from(map.values());
  }, [rawCatalogVerses]);

  // Filtered & Sorted Catalog Verses
  const filteredCatalogVerses = useMemo(() => {
    let list = rawCatalogVerses;
    if (activeSubFilter !== 'all') {
      list = list.filter((v) => v.subCategoryKey === activeSubFilter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (v) =>
          v.surahNameEnglish.toLowerCase().includes(q) ||
          v.surahNameArabic.includes(q) ||
          v.surahNameUrdu.includes(q) ||
          v.arabicText.includes(q) ||
          v.translationUrdu.includes(q) ||
          v.translationEnglish.toLowerCase().includes(q) ||
          `${v.surahNumber}:${v.ayahNumber}`.includes(q)
      );
    }
    return [...list].sort((a, b) => {
      if (sortBy === 'nuzul') {
        if (a.nuzulRank !== b.nuzulRank) return a.nuzulRank - b.nuzulRank;
        return a.ayahNumber - b.ayahNumber;
      } else {
        if (a.mushafOrder !== b.mushafOrder) return a.mushafOrder - b.mushafOrder;
        return a.ayahNumber - b.ayahNumber;
      }
    });
  }, [rawCatalogVerses, activeSubFilter, searchQuery, sortBy]);

  // Filtered Highlights/Examples
  const filteredExamples = useMemo(() => {
    if (!searchQuery.trim()) return currentGroup.examples;
    const q = searchQuery.toLowerCase().trim();
    return currentGroup.examples.filter(
      (ex) =>
        ex.surahNameEnglish.toLowerCase().includes(q) ||
        ex.surahNameArabic.includes(q) ||
        ex.surahNameUrdu.includes(q) ||
        ex.arabicText.includes(q) ||
        ex.translationUrdu.includes(q) ||
        ex.translationEnglish.toLowerCase().includes(q) ||
        `${ex.surahNumber}:${ex.ayahNumber}`.includes(q)
    );
  }, [currentGroup, searchQuery]);

  const handleGroupChange = (groupId: string) => {
    setSelectedGroupId(groupId);
    setActiveSubFilter('all');
  };

  const navigateToReader = (nuzulRank: number) => {
    setActiveEventOrder(nuzulRank);
    setPerspectiveMode('nuzul');
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe':
        return <Globe className="w-5 h-5 text-emerald-500" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-sky-500" />;
      case 'BookOpen':
        return <BookOpen className="w-5 h-5 text-purple-500" />;
      case 'AlertTriangle':
        return <AlertTriangle className="w-5 h-5 text-rose-500" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-amber-500" />;
      default:
        return <Users className="w-5 h-5 text-emerald-500" />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in" dir="rtl">
      {/* ── HEADER BANNER ── */}
      <div className="p-5 sm:p-7 rounded-3xl sacred-glass sacred-border space-y-4 shadow-md">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1">
              <Users className="w-4 h-4 text-emerald-500" />
              <span>The Divine Discourse & Audience Matrix <span className="font-urdu">(مخاطبینِ قرآن و اسالیبِ خطاب)</span></span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-urdu text-[var(--text-primary)]">
              ۲۳ سالہ وحی میں الٰہی خطاب اور اسالیب کا تدریجی ارتقاء
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1.5 max-w-3xl leading-relaxed font-urdu">
              قرآن مجید نے کس مرحلے پر کس کو پکارا؟ مکہ میں عام انسانیت اور ضمیر کی بیداری (*یا أیها الناس*)، مدینہ میں ایمانی برادری اور قانون سازی (*یا أیها الذین آمنوا*)، اہل کتاب سے علمی مکالمہ (*یا أهل الکتاب*)، منافقین کا نفسیاتی کٹھگھرا، اور رسولِ اکرم ﷺ سے تسکین و قیادت کا مکالمہ۔
            </p>
          </div>

          {/* Quick Metrics Badges */}
          <div className="flex flex-wrap lg:flex-col items-start gap-2 shrink-0">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span className="font-urdu">پنجگانہ الٰہی مخاطبین (5 Core Audiences)</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-sky-500/10 border border-sky-500/25 text-sky-800 dark:text-sky-300 text-xs font-bold">
              <CheckCircle2 className="w-3.5 h-3.5 text-sky-500" />
              <span className="font-urdu">۸۹ مدنی آیات: «یا ایہا الذین آمنوا» (100% مدنی)</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/25 text-purple-800 dark:text-purple-300 text-xs font-bold">
              <BookMarked className="w-3.5 h-3.5 text-purple-500" />
              <span className="font-urdu">التمہید (آیت اللہ معرفت) و المیزان (علامہ طباطبائی)</span>
            </div>
          </div>
        </div>

        {/* Macro Meccan vs Medinan Distribution Bar */}
        <div className="pt-3 border-t border-[var(--border-subtle)] space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-[var(--text-secondary)] font-urdu">
            <span>مکی دور (۶۱۰–۶۲۲ء): وجدان، توحید، اور ضمیرِ انسانی</span>
            <span>مدنی دور (۶۲۲–۶۳۲ء): شریعت، مدنی معاشرہ، اور ریاستی معاہدات</span>
          </div>
          <div className="w-full h-3 rounded-full bg-[var(--bg-surface-elevated)] overflow-hidden flex shadow-inner">
            <div
              style={{ width: `${currentGroup.meccanRatio}%`, backgroundColor: '#F59E0B' }}
              className="h-full transition-all duration-500"
              title={`مکی تناسب: ${currentGroup.meccanRatio}%`}
            />
            <div
              style={{ width: `${currentGroup.medinanRatio}%`, backgroundColor: '#0284C7' }}
              className="h-full transition-all duration-500"
              title={`مدنی تناسب: ${currentGroup.medinanRatio}%`}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] font-semibold text-[var(--text-muted)]">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <span>مکی تناسب: {currentGroup.meccanRatio}%</span>
            </span>
            <span className="font-urdu text-xs font-bold text-emerald-700 dark:text-emerald-400">
              «{currentGroup.titleArabic}» — کُل تکرار: {currentGroup.totalOccurrences}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span>
              <span>مدنی تناسب: {currentGroup.medinanRatio}%</span>
            </span>
          </div>
        </div>
      </div>

      {/* ── 5 AUDIENCE GROUPS SELECTOR CARDS ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {AUDIENCE_GROUPS.map((group) => {
          const isSelected = group.id === selectedGroupId;
          const catalogCount = ALL_AUDIENCE_VERSES_CATALOG[group.id]?.length || 0;
          return (
            <button
              key={group.id}
              onClick={() => handleGroupChange(group.id)}
              className={`p-3.5 rounded-2xl border text-right transition-all flex flex-col justify-between gap-3 cursor-pointer ${
                isSelected
                  ? 'bg-gradient-to-br from-[var(--bg-surface-card)] to-emerald-500/10 border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
                  : 'bg-[var(--bg-surface-card)] border-[var(--border-subtle)] hover:border-emerald-500/50 hover:bg-[var(--bg-surface-elevated)]'
              }`}
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
                    {getIcon(group.iconName)}
                  </div>
                  <div className="flex items-center gap-1">
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded-full font-sans"
                      style={{ backgroundColor: `${group.badgeColor}20`, color: group.badgeColor }}
                    >
                      {catalogCount} آیات
                    </span>
                  </div>
                </div>
                <h4 className="font-arabic text-sm sm:text-base font-bold text-[var(--text-primary)] leading-tight pt-1">
                  {group.titleArabic}
                </h4>
                <p className="font-urdu text-xs font-bold text-emerald-800 dark:text-emerald-300 leading-snug">
                  {group.titleUrdu.split('(')[0]}
                </p>
                <p className="text-[11px] text-[var(--text-muted)] font-urdu leading-tight">
                  {group.subtitleUrdu}
                </p>
              </div>

              {/* Progress mini indicator */}
              <div className="w-full space-y-1 pt-2 border-t border-[var(--border-subtle)]">
                <div className="flex items-center justify-between text-[10px] text-[var(--text-muted)] font-mono">
                  <span>مکی {group.meccanRatio}%</span>
                  <span>مدنی {group.medinanRatio}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[var(--bg-surface)] overflow-hidden flex">
                  <div style={{ width: `${group.meccanRatio}%`, backgroundColor: '#F59E0B' }} />
                  <div style={{ width: `${group.medinanRatio}%`, backgroundColor: '#0284C7' }} />
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* ── SELECTED AUDIENCE DEEP DIVE DOSSIER ── */}
      <div className="p-5 sm:p-7 rounded-3xl sacred-border bg-[var(--bg-surface-card)] shadow-lg space-y-6">
        
        {/* Dossier Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-[var(--border-subtle)]">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span
                className="w-3.5 h-3.5 rounded-full"
                style={{ backgroundColor: currentGroup.badgeColor }}
              />
              <span className="font-arabic text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                {currentGroup.titleArabic}
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] font-urdu text-emerald-700 dark:text-emerald-400">
                {currentGroup.primaryPeriodUrdu}
              </span>
            </div>
            <h4 className="font-urdu text-base sm:text-lg font-bold text-emerald-800 dark:text-emerald-300">
              {currentGroup.titleUrdu}
            </h4>
            <p className="text-xs text-[var(--text-secondary)] font-sans">
              {currentGroup.titleEnglish} — {currentGroup.subtitleEnglish}
            </p>
          </div>

          {/* Search within this group */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-[var(--text-muted)] absolute right-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="آیت، سورت یا ترجمہ میں تلاش..."
              className="w-full pr-9 pl-3 py-2 rounded-xl text-xs bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:ring-2 focus:ring-emerald-500 font-urdu"
            />
          </div>
        </div>

        {/* 3 Scholarly Pillars (Theology, Pedagogy, Classical Rule) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 font-urdu">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>الٰہی مقصد و کلامی حیثیت</span>
            </div>
            <p className="text-xs text-[var(--text-secondary)] font-urdu leading-relaxed">
              {currentGroup.theologicalRoleUrdu}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-sky-700 dark:text-sky-400 font-urdu">
              <Clock className="w-4 h-4 text-sky-500" />
              <span>۲۳ سالہ تدریجی ارتقاء (Pedagogical Shift)</span>
            </div>
            <p className="text-xs text-[var(--text-secondary)] font-urdu leading-relaxed">
              {currentGroup.pedagogicalShiftUrdu}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-purple-700 dark:text-purple-400 font-urdu">
              <BookMarked className="w-4 h-4 text-purple-500" />
              <span>قاعدہ و بصیرت (التمہید و المیزان)</span>
            </div>
            <p className="text-xs text-[var(--text-secondary)] font-urdu leading-relaxed">
              {currentGroup.classicalRuleUrdu}
            </p>
          </div>
        </div>

        {/* ── VIEW MODE TOGGLE BUTTONS (Full Catalog vs Curated Highlights) ── */}
        <div className="pt-2">
          <div className="flex flex-wrap items-center justify-between gap-3 p-2 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setViewMode('all_catalog')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'all_catalog'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)]'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span className="font-urdu">تمام آیات کی مکمل جامع فہرست ({rawCatalogVerses.length} آیات)</span>
              </button>

              <button
                onClick={() => setViewMode('highlights')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'highlights'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)]'
                }`}
              >
                <Flame className="w-3.5 h-3.5" />
                <span className="font-urdu">کلیدی تاریخی شواہد و بصیرت ({currentGroup.examples.length} آیات)</span>
              </button>
            </div>

            {/* Sorting control (Active in full catalog mode) */}
            {viewMode === 'all_catalog' && (
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-[var(--text-muted)] font-urdu flex items-center gap-1">
                  <ArrowUpDown className="w-3 h-3" />
                  <span>ترتیب:</span>
                </span>
                <button
                  onClick={() => setSortBy('nuzul')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    sortBy === 'nuzul'
                      ? 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <span className="font-urdu">ترتیبِ نزول</span>
                </button>
                <button
                  onClick={() => setSortBy('mushaf')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    sortBy === 'mushaf'
                      ? 'bg-sky-500/15 text-sky-800 dark:text-sky-300 border border-sky-500/30'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <span className="font-urdu">ترتیبِ مصحف</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ── SUBCATEGORY FILTER CHIPS (Full Catalog Mode) ── */}
        {viewMode === 'all_catalog' && subFilterOptions.length > 1 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] font-urdu">
              <Filter className="w-3.5 h-3.5 text-emerald-500" />
              <span>ذیلی اسالیب و سورتوں کے فلٹرز:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveSubFilter('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                  activeSubFilter === 'all'
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                    : 'bg-[var(--bg-surface)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-emerald-500/50'
                }`}
              >
                <span className="font-urdu">تمام آیات ({rawCatalogVerses.length})</span>
              </button>
              {subFilterOptions.map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => setActiveSubFilter(opt.key)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                    activeSubFilter === opt.key
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                      : 'bg-[var(--bg-surface)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-emerald-500/50'
                  }`}
                >
                  <span className="font-urdu">
                    {opt.labelUrdu} ({opt.count})
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── MODE 1: EXHAUSTIVE CATALOG OF ALL VERSES ── */}
        {viewMode === 'all_catalog' && (
          <div className="space-y-4 pt-1">
            <div className="flex items-center justify-between text-xs text-[var(--text-secondary)] font-urdu pb-1 border-b border-[var(--border-subtle)]">
              <span className="font-bold text-emerald-800 dark:text-emerald-300">
                مستند قرآنی آیات کا ذخیرہ: {filteredCatalogVerses.length} آیات دکھائی جا رہی ہیں
              </span>
              <span className="text-[var(--text-muted)]">
                متن: رسم الخط عثمانی • اردو ترجمہ: علامہ ذیشان حیدر جوادیؒ
              </span>
            </div>

            {filteredCatalogVerses.length === 0 ? (
              <div className="p-8 text-center rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-2">
                <Search className="w-8 h-8 text-[var(--text-muted)] mx-auto opacity-50" />
                <p className="text-sm font-urdu text-[var(--text-secondary)]">
                  تلاش کے مطابق کوئی آیت نہیں ملی۔
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredCatalogVerses.map((item, idx) => {
                  const isReciting =
                    activeAudio?.surahNumber === item.surahNumber &&
                    activeAudio?.ayahNumber === item.ayahNumber &&
                    activeAudio?.isPlaying;

                  return (
                    <div
                      key={`cat-${item.surahNumber}-${item.ayahNumber}-${idx}`}
                      className={`p-4 sm:p-5 rounded-2xl border transition-all space-y-3 ${
                        isReciting
                          ? 'bg-emerald-500/10 border-emerald-500 ring-2 ring-emerald-500/20'
                          : 'bg-[var(--bg-surface)] border-[var(--border-subtle)] hover:border-emerald-500/40'
                      }`}
                    >
                      {/* Top Bar of Verse Card */}
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs pb-2 border-b border-[var(--border-subtle)]">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-lg bg-emerald-600/10 text-emerald-800 dark:text-emerald-300 font-bold font-urdu">
                            {item.surahNameUrdu} ({item.surahNumber}:{item.ayahNumber})
                          </span>
                          <span className="text-[11px] text-[var(--text-muted)] font-sans">
                            {item.surahNameEnglish} — Nuzul #{item.nuzulRank} ➔ Mushaf #{item.mushafOrder}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                              item.revelationType === 'medinan'
                                ? 'bg-sky-500/10 border-sky-500/25 text-sky-800 dark:text-sky-300'
                                : 'bg-amber-500/10 border-amber-500/25 text-amber-800 dark:text-amber-300'
                            }`}
                          >
                            {item.revelationType === 'medinan' ? 'مدنی دور' : 'مکی دور'}
                          </span>
                          <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-[var(--text-secondary)] font-urdu">
                            {item.subCategoryTitleUrdu}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          {/* Audio Recitation Button */}
                          <button
                            onClick={() => {
                              if (isReciting) {
                                pauseAudio();
                              } else {
                                playAyah(item.surahNumber, item.ayahNumber, item.nuzulRank);
                              }
                            }}
                            className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                              isReciting
                                ? 'bg-emerald-600 text-white border-emerald-600'
                                : 'bg-[var(--bg-surface-elevated)] hover:bg-emerald-600 hover:text-white border-[var(--border-subtle)] text-[var(--text-primary)]'
                            }`}
                            title="Listen to recitation"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                            <span className="font-urdu">{isReciting ? 'تلاوت جاری ہے' : 'تلاوت سنیں'}</span>
                          </button>

                          {/* View in Reader Jump */}
                          <button
                            onClick={() => navigateToReader(item.nuzulRank)}
                            className="flex items-center gap-1 px-3 py-1 rounded-xl text-xs font-bold bg-emerald-700 text-white hover:bg-emerald-800 transition-all cursor-pointer shadow-xs"
                            title="Open in Chronological Passage Reader"
                          >
                            <span className="font-urdu">ریڈر میں دیکھیں</span>
                            <ArrowRight className="w-3 h-3 rotate-180" />
                          </button>
                        </div>
                      </div>

                      {/* Quranic Arabic Ayah Text */}
                      <div className="py-1">
                        <p className="font-arabic text-lg sm:text-xl lg:text-2xl text-[var(--text-primary)] leading-loose text-right">
                          {item.arabicText}
                        </p>
                      </div>

                      {/* Urdu Translation */}
                      <div className="p-3 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)]">
                        <p className="font-urdu text-xs sm:text-sm text-[var(--text-primary)] leading-relaxed">
                          <span className="font-bold text-emerald-700 dark:text-emerald-400 ml-1">ترجمہ:</span>
                          {item.translationUrdu}
                        </p>
                        <p className="text-[11px] text-[var(--text-muted)] font-sans mt-1.5 text-left" dir="ltr">
                          {item.translationEnglish}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ── MODE 2: CURATED SCRIPTURAL HIGHLIGHTS ── */}
        {viewMode === 'highlights' && (
          <div className="space-y-4 pt-1">
            <div className="flex items-center justify-between">
              <h4 className="font-urdu text-sm sm:text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
                <Flame className="w-4 h-4 text-amber-500" />
                <span>کلیدی قرآنی شواہد و تفسیری بصیرت ({filteredExamples.length} آیات)</span>
              </h4>
              <span className="text-xs text-[var(--text-muted)] font-urdu">
                مستند ترجمہ: علامہ ذیشان حیدر جوادیؒ
              </span>
            </div>

            <div className="space-y-4">
              {filteredExamples.map((ex) => {
                const isReciting =
                  activeAudio?.surahNumber === ex.surahNumber &&
                  activeAudio?.ayahNumber === ex.ayahNumber &&
                  activeAudio?.isPlaying;

                return (
                  <div
                    key={`ex-${ex.surahNumber}-${ex.ayahNumber}`}
                    className={`p-4 sm:p-5 rounded-2xl border transition-all space-y-3 ${
                      isReciting
                        ? 'bg-emerald-500/10 border-emerald-500 ring-2 ring-emerald-500/20'
                        : 'bg-[var(--bg-surface)] border-[var(--border-subtle)] hover:border-emerald-500/40'
                    }`}
                  >
                    {/* Top Bar of Card */}
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs pb-2 border-b border-[var(--border-subtle)]">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-lg bg-emerald-600/10 text-emerald-800 dark:text-emerald-300 font-bold font-urdu">
                          {ex.surahNameUrdu} ({ex.surahNumber}:{ex.ayahNumber})
                        </span>
                        <span className="text-[11px] text-[var(--text-muted)] font-sans">
                          {ex.surahNameEnglish} — Nuzul #{ex.nuzulRank} ➔ Mushaf #{ex.mushafOrder}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-[var(--text-secondary)]">
                          {ex.yearLabel}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Audio Button */}
                        <button
                          onClick={() => {
                            if (isReciting) {
                              pauseAudio();
                            } else {
                              playAyah(ex.surahNumber, ex.ayahNumber, ex.nuzulRank);
                            }
                          }}
                          className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                            isReciting
                              ? 'bg-emerald-600 text-white border-emerald-600'
                              : 'bg-[var(--bg-surface-elevated)] hover:bg-emerald-600 hover:text-white border-[var(--border-subtle)] text-[var(--text-primary)]'
                          }`}
                          title="Listen to recitation"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          <span className="font-urdu">{isReciting ? 'تلاوت جاری ہے' : 'تلاوت سنیں'}</span>
                        </button>

                        {/* View in Reader Jump */}
                        <button
                          onClick={() => navigateToReader(ex.nuzulRank)}
                          className="flex items-center gap-1 px-3 py-1 rounded-xl text-xs font-bold bg-emerald-700 text-white hover:bg-emerald-800 transition-all cursor-pointer shadow-xs"
                          title="Open in Chronological Passage Reader"
                        >
                          <span className="font-urdu">ریڈر میں دیکھیں</span>
                          <ArrowRight className="w-3 h-3 rotate-180" />
                        </button>
                      </div>
                    </div>

                    {/* Quranic Arabic Ayah Text */}
                    <div className="py-1">
                      <p className="font-arabic text-lg sm:text-xl lg:text-2xl text-[var(--text-primary)] leading-loose text-right">
                        {ex.arabicText}
                      </p>
                    </div>

                    {/* Urdu Translation */}
                    <div className="p-3 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)]">
                      <p className="font-urdu text-xs sm:text-sm text-[var(--text-primary)] leading-relaxed">
                        <span className="font-bold text-emerald-700 dark:text-emerald-400 ml-1">ترجمہ:</span>
                        {ex.translationUrdu}
                      </p>
                      <p className="text-[11px] text-[var(--text-muted)] font-sans mt-1.5 text-left" dir="ltr">
                        {ex.translationEnglish}
                      </p>
                    </div>

                    {/* Scholarly Insight */}
                    <div className="flex items-start gap-2 pt-1 text-xs">
                      <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-urdu font-bold text-emerald-800 dark:text-emerald-300 ml-1">
                          تفسیری و تاریخی بصیرت:
                        </span>
                        <span className="font-urdu text-[var(--text-secondary)] leading-relaxed">
                          {ex.scholarlyInsightUrdu}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
