import React, { useState, useEffect } from 'react';
import { useQuran } from '@/context/QuranContext';
import { ThemeId, ReadingLayout } from '@/types/quran';
import {
  BookOpen,
  Sliders,
  Bookmark,
  Database,
  Moon,
  Sun,
  LayoutGrid,
  Columns,
  Search,
  Check,
  Compass,
  Maximize2,
  Minimize2,
  Sparkles,
  Menu,
  X,
  Layers,
  ShieldAlert,
} from 'lucide-react';

interface NavbarProps {
  onOpenTypography: () => void;
  onOpenBookmarks: () => void;
  onOpenDataModal: () => void;
  onOpenDisclaimer: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenTypography,
  onOpenBookmarks,
  onOpenDataModal,
  onOpenDisclaimer,
}) => {
  const {
    perspectiveMode,
    setPerspectiveMode,
    readingLayout,
    setReadingLayout,
    theme,
    setTheme,
    bookmarks,
    searchQuery,
    setSearchQuery,
  } = useQuran();

  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [isLayoutOpen, setIsLayoutOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  };

  const themes: { id: ThemeId; name: string; icon: string; preview: string }[] = [
    { id: 'emerald-gold', name: 'Emerald & Gold (زمرد و زر — الہامی)', icon: '✨', preview: '#F8FAF8' },
    { id: 'emerald-dark', name: 'Midnight Emerald (شبِ قدر — سبز و زر)', icon: '🌙', preview: '#0B1713' },
    { id: 'mushaf-classic', name: 'Mushaf Classic (مصحف کلاسیک — عنبری)', icon: '📜', preview: '#FBF8EE' },
    { id: 'night-paper', name: 'Night Paper (رات کا کاغذ)', icon: '🕯️', preview: '#191614' },
    { id: 'oled-midnight', name: 'OLED Midnight (سیاہ)', icon: '⚫', preview: '#000000' },
    { id: 'sage-olive', name: 'Sage & Olive (سبزہ و زیتون)', icon: '🍃', preview: '#F3F5F0' },
  ];

  const layouts: { id: ReadingLayout; label: string; icon: React.ReactNode }[] = [
    { id: 'split', label: 'Split (آیت و ترجمہ)', icon: <LayoutGrid className="w-4 h-4" /> },
    { id: 'arabic-only', label: 'Arabic Only (صرف عربی)', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'translation-only', label: 'Translation (صرف ترجمہ)', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'side-by-side', label: 'Side-by-Side (دو کالم)', icon: <Columns className="w-4 h-4" /> },
  ];

  const isDarkTheme =
    theme === 'emerald-dark' || theme === 'night-paper' || theme === 'oled-midnight';

  const toggleDarkLight = () => {
    if (theme === 'emerald-gold') setTheme('emerald-dark');
    else if (theme === 'emerald-dark') setTheme('emerald-gold');
    else if (theme === 'mushaf-classic') setTheme('night-paper');
    else if (theme === 'night-paper') setTheme('mushaf-classic');
    else if (theme === 'oled-midnight') setTheme('emerald-gold');
    else if (theme === 'sage-olive') setTheme('emerald-dark');
    else setTheme(isDarkTheme ? 'emerald-gold' : 'emerald-dark');
  };

  return (
    <header className="sticky top-0 z-40 w-full sacred-glass border-b transition-colors shadow-sm">
      
      {/* ── ROW 1: TOP DEDICATED ATTRIBUTION, BISMILLAH & FULLSCREEN BAR ── */}
      <div className="w-full border-b border-[var(--border-subtle)] bg-[var(--bg-surface)]/90 backdrop-blur-md py-1.5 px-3 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-[1780px] mx-auto">
          
          {/* Mobile Layout (< md) */}
          <div className="md:hidden flex flex-col items-center justify-center text-center py-1 gap-1">
            <span className="font-arabic text-base sm:text-lg font-bold text-[var(--text-primary)] tracking-wide leading-tight select-none">
              بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
            </span>
            <div className="flex flex-wrap items-center justify-center gap-1.5 text-[11px] font-bold text-emerald-800 dark:text-emerald-300 font-urdu leading-tight">
              <Sparkles className="w-3 h-3 text-amber-500 shrink-0" />
              <span>ایک علمی و قرآنی تحقیقی خدمت — مولانا سید آئمن رضوی</span>
            </div>
            <div className="flex items-center justify-between w-full pt-0.5 px-1">
              <span className="text-[10px] text-[var(--text-secondary)] font-medium text-left truncate" dir="ltr">
                A Quranic Research & Educational Initiative by Maulana Syed Imon Rizvi
              </span>
              <button
                onClick={toggleFullscreen}
                title={isFullscreen ? 'Exit Full Screen' : 'Full Screen'}
                className="p-1 rounded-lg bg-emerald-600/10 text-emerald-700 dark:text-emerald-300 text-[10px] shrink-0"
              >
                {isFullscreen ? <Minimize2 className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
              </button>
            </div>
          </div>

          {/* Desktop & Tablet Majestic 3-Zone Layout (>= md) */}
          <div className="hidden md:grid md:grid-cols-3 items-center gap-3 text-xs w-full">
            
            {/* Zone 1: TOP RIGHT in RTL -> Urdu Initiative Attribution */}
            <div className="flex items-center gap-2 justify-self-start text-right">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span className="font-urdu text-xs lg:text-[13px] font-bold text-emerald-800 dark:text-emerald-300 leading-tight">
                ایک علمی و قرآنی تحقیقی خدمت — مولانا سید آئمن رضوی
              </span>
            </div>

            {/* Zone 2: EXACT CENTER -> Grand Bismillah in Classical Quranic Calligraphy */}
            <div className="justify-self-center text-center">
              <span className="font-arabic text-lg lg:text-xl xl:text-2xl font-bold text-[var(--text-primary)] tracking-widest leading-none select-none drop-shadow-2xs">
                بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
              </span>
            </div>

            {/* Zone 3: TOP LEFT in RTL -> English Initiative Attribution & Corner Fullscreen Button */}
            <div className="flex items-center gap-2.5 justify-self-end text-left" dir="ltr">
              <button
                onClick={toggleFullscreen}
                title={isFullscreen ? 'Exit Full Screen Mode' : 'Toggle Full Screen Experience'}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-600/10 hover:bg-emerald-700 text-emerald-700 dark:text-emerald-300 hover:text-white text-[11px] font-bold transition-all border border-emerald-500/30 shadow-2xs cursor-pointer select-none shrink-0"
              >
                {isFullscreen ? (
                  <>
                    <Minimize2 className="w-3.5 h-3.5" />
                    <span className="font-urdu">عام اسکرین</span>
                  </>
                ) : (
                  <>
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span className="font-urdu">مکمل اسکرین</span>
                  </>
                )}
              </button>
              <span className="text-[11px] lg:text-[12px] font-semibold text-[var(--text-secondary)] tracking-tight truncate max-w-[280px] lg:max-w-[340px] xl:max-w-none">
                A Quranic Research & Educational Initiative by Maulana Syed Imon Rizvi
              </span>
            </div>

          </div>

        </div>
      </div>

      {/* ── ROW 2: MAIN BRANDING, SEARCH & CONTROLS ── */}
      <div className="max-w-[1780px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-12 py-2 sm:py-3.5">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Sacred Logo & Branding */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl overflow-hidden p-0.5 border border-emerald-500/40 shadow-sm bg-gradient-to-br from-emerald-950/20 via-amber-500/15 to-emerald-600/20 flex items-center justify-center group shrink-0">
              <img
                src="/logo.jpeg"
                alt="Tarteeb-e-Nuzul (ترتیبِ نزولی) Logo"
                className="w-full h-full object-cover rounded-[10px] sm:rounded-[14px] group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 rounded-xl sm:rounded-2xl ring-1 ring-inset ring-amber-400/30 pointer-events-none" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--text-primary)] font-urdu">
                  ترتیبِ نزولی
                </h1>
                <span className="hidden sm:inline-block px-2 py-0.5 text-xs font-semibold rounded-md bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-500/25">
                  Tarteeb-e-Nuzul
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-[var(--text-muted)] font-medium font-urdu">
                قرآن مجید کی ۲۳ سالہ زمانی و تدریجی تفہیم
              </p>
            </div>
          </div>

          {/* Center: Search Bar with generous breathing space (Desktop) */}
          <div className="hidden lg:flex items-center flex-1 max-w-sm xl:max-w-md mx-2">
            <div className="relative w-full">
              <Search className="absolute start-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="قرآن مجید میں تلاش کریں (سورت، آیت، مفہوم)..."
                className="w-full ps-10 pe-9 py-2 text-xs rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-emerald-500/40 transition-all shadow-2xs font-urdu"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute end-3.5 top-1/2 -translate-y-1/2 text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Perspectives & Reading Utility Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            
            {/* Desktop & Tablet Perspective Switcher (Hidden on Mobile < sm) */}
            <div className="hidden sm:flex items-center bg-[var(--bg-surface)] p-1 rounded-2xl border border-[var(--border-subtle)] shadow-2xs">
              <button
                onClick={() => setPerspectiveMode('passage_nuzul')}
                title="نزولِ تدریجی: آیات کا مرحلہ وار تاریخی نزول — سورتوں کے تاریخی مقطوعات (Chronological Passage Flow)"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  perspectiveMode === 'passage_nuzul'
                    ? 'bg-emerald-700 text-white font-bold shadow-xs'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-urdu font-bold">نزولِ تدریجی (مقطوعات)</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-amber-500/20 text-amber-300 font-urdu hidden md:inline font-bold">مرکزی</span>
              </button>
              <button
                onClick={() => setPerspectiveMode('nuzul')}
                title="ترتیبِ نزول: تمام ۱۱۴ سورتیں مکمل صورت میں آغازِ نزول کی ترتیب پر (All 114 Complete Surahs in Chronological Order)"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  perspectiveMode === 'nuzul'
                    ? 'bg-emerald-700 text-white font-bold shadow-xs'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span className="font-urdu">ترتیبِ نزول (مکمل سورتیں)</span>
              </button>
              <button
                onClick={() => setPerspectiveMode('mushaf')}
                title="ترتیبِ مصحف (مصحفِ عثمانی کی روایتی ۱ تا ۱۱۴ سورتیں — Canonical Mushaf Order 1–114)"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  perspectiveMode === 'mushaf'
                    ? 'bg-emerald-700 text-white font-bold shadow-xs'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span className="font-urdu">ترتیبِ مصحف</span>
              </button>
              <button
                onClick={() => setPerspectiveMode('perspectives')}
                title="مختلف مناظر و تجزیات — Multi-View Analytics & Historical Slices"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  perspectiveMode === 'perspectives'
                    ? 'bg-emerald-700 text-white shadow-xs font-bold'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-urdu">مناظر و تجزیات</span>
              </button>
            </div>

            {/* Desktop Perspectives & Reading Utility Controls */}
            <div className="hidden lg:flex items-center gap-2">
              
              {/* Reading Layout Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsLayoutOpen(!isLayoutOpen)}
                  title="Reading Layout View"
                  className="p-2.5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-amber-500/40 transition-all flex items-center gap-1 shadow-2xs cursor-pointer"
                >
                  <Columns className="w-4 h-4" />
                </button>
                {isLayoutOpen && (
                  <div
                    className="absolute end-0 mt-2 w-48 rounded-2xl shadow-2xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] p-1.5 z-50 animate-fade-in"
                    onMouseLeave={() => setIsLayoutOpen(false)}
                  >
                    <div className="px-2 py-1 text-xs font-semibold text-[var(--text-muted)] border-b border-[var(--border-subtle)] mb-1">
                      Reading Layout
                    </div>
                    {layouts.map((l) => (
                      <button
                        key={l.id}
                        onClick={() => {
                          setReadingLayout(l.id);
                          setIsLayoutOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-2.5 py-2 text-xs rounded-xl transition-colors cursor-pointer ${
                          readingLayout === l.id
                            ? 'bg-amber-500/15 text-amber-700 dark:text-amber-300 font-semibold'
                            : 'text-[var(--text-primary)] hover:bg-[var(--bg-surface)]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {l.icon}
                          <span>{l.label}</span>
                        </div>
                        {readingLayout === l.id && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Theme Selector Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsThemeOpen(!isThemeOpen)}
                  title="Ocular-Safe Color Theme"
                  className="p-2.5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-emerald-500/40 transition-all shadow-2xs cursor-pointer"
                >
                  {isDarkTheme ? (
                    <Sun className="w-4 h-4 text-amber-400" />
                  ) : (
                    <Moon className="w-4 h-4 text-emerald-700" />
                  )}
                </button>
                {isThemeOpen && (
                  <div
                    className="absolute end-0 mt-2 w-60 rounded-2xl shadow-2xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] p-1.5 z-50 animate-fade-in"
                    onMouseLeave={() => setIsThemeOpen(false)}
                  >
                    <div className="px-2 py-1 text-xs font-semibold text-[var(--text-muted)] border-b border-[var(--border-subtle)] mb-1">
                      Ocular-Safe Themes
                    </div>
                    {themes.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => {
                          setTheme(t.id);
                          setIsThemeOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-2.5 py-2 text-xs rounded-xl transition-colors cursor-pointer ${
                          theme === t.id
                            ? 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 font-semibold'
                            : 'text-[var(--text-primary)] hover:bg-[var(--bg-surface)]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-gray-400/40"
                            style={{ backgroundColor: t.preview }}
                          />
                          <span>{t.name}</span>
                        </div>
                        {theme === t.id && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Typography Settings Modal Trigger */}
              <button
                onClick={onOpenTypography}
                title="Sacred Typography & Script Controls"
                className="p-2.5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-emerald-500/40 transition-all shadow-2xs cursor-pointer"
              >
                <Sliders className="w-4 h-4" />
              </button>

              {/* Bookmarks Drawer Trigger */}
              <button
                onClick={onOpenBookmarks}
                title="Bookmarks & Saved Verses"
                className="relative p-2.5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-emerald-500/40 transition-all shadow-2xs cursor-pointer"
              >
                <Bookmark className="w-4 h-4" />
                {bookmarks.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-700 text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                    {bookmarks.length}
                  </span>
                )}
              </button>

              {/* Data Ingestion / Export Trigger */}
              <button
                onClick={onOpenDataModal}
                title="Custom Dataset Ingestion (JSON/CSV) & Backup"
                className="p-2.5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-emerald-500/40 transition-all shadow-2xs cursor-pointer"
              >
                <Database className="w-4 h-4" />
              </button>

              {/* Academic & AI Disclaimer Modal Trigger */}
              <button
                onClick={onOpenDisclaimer}
                title="Academic & AI Research Notice / علمی و تحقیقی وضاحت"
                className="p-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 hover:bg-amber-500/20 hover:text-amber-800 dark:hover:text-amber-300 transition-all shadow-2xs cursor-pointer flex items-center gap-1.5"
              >
                <ShieldAlert className="w-4 h-4" />
                <span className="hidden xl:inline text-xs font-semibold">وضاحت</span>
              </button>

            </div>

            {/* Mobile / Tablet Quick Action Bar (< lg) */}
            <div className="flex lg:hidden items-center gap-1 sm:gap-1.5 ml-auto">
              {/* Mobile Search Toggle */}
              <button
                onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
                className={`p-2 rounded-xl border transition-all cursor-pointer ${
                  isMobileSearchOpen
                    ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                    : 'bg-[var(--bg-surface)] border-[var(--border-subtle)] text-[var(--text-secondary)]'
                }`}
                title="Search Quran"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Mobile Theme Toggle */}
              <button
                onClick={toggleDarkLight}
                className="p-2 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-secondary)] cursor-pointer"
                title="Toggle Dark / Light Theme"
              >
                {isDarkTheme ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-emerald-700" />}
              </button>

              {/* Mobile Bookmarks */}
              <button
                onClick={onOpenBookmarks}
                className="relative p-2 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-secondary)] cursor-pointer"
                title="Bookmarks"
              >
                <Bookmark className="w-4 h-4" />
                {bookmarks.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-700 text-white text-[9px] font-bold flex items-center justify-center shadow-xs">
                    {bookmarks.length}
                  </span>
                )}
              </button>

              {/* Mobile Menu / Settings Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-2 rounded-xl border transition-all cursor-pointer ${
                  isMobileMenuOpen
                    ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                    : 'bg-[var(--bg-surface)] border-[var(--border-subtle)] text-[var(--text-secondary)]'
                }`}
                title="More Options"
              >
                {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile Search Bar Drawer */}
      {isMobileSearchOpen && (
        <div className="lg:hidden px-4 py-2.5 border-t border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] animate-fade-in shadow-inner">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-700 dark:text-emerald-400" />
            <input
              type="text"
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Surah, Ayah or Keyword (قرآنی آیات و سورتیں تلاش کریں)..."
              className="w-full pl-10 pr-8 py-2 text-xs rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-emerald-500/40 shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      )}

      {/* Mobile Menu / Settings Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden px-4 py-3 border-t border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] animate-fade-in space-y-3 shadow-md">
          <div className="grid grid-cols-2 gap-2 text-xs">
            {/* Typography */}
            <button
              onClick={() => {
                onOpenTypography();
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-primary)] font-medium text-left cursor-pointer"
            >
              <Sliders className="w-4 h-4 text-emerald-700 dark:text-emerald-400 flex-shrink-0" />
              <span>فونٹس و متن (Typography)</span>
            </button>

            {/* Data Ingestion */}
            <button
              onClick={() => {
                onOpenDataModal();
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-primary)] font-medium text-left cursor-pointer"
            >
              <Database className="w-4 h-4 text-emerald-700 dark:text-emerald-400 flex-shrink-0" />
              <span>ڈیٹا و بیک اپ (Data)</span>
            </button>

            {/* Disclaimer & AI Notice */}
            <button
              onClick={() => {
                onOpenDisclaimer();
                setIsMobileMenuOpen(false);
              }}
              className="col-span-2 flex items-center justify-between p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-300 font-medium text-left cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                <span>علمی و تحقیقی وضاحت (AI Disclaimer)</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-500/20 uppercase">
                Experimental
              </span>
            </button>
          </div>

          {/* Reading Layout Selector */}
          <div className="pt-2 border-t border-[var(--border-subtle)]">
            <span className="text-[11px] font-bold text-[var(--text-muted)] block mb-1.5 uppercase">
              Reading Layout (اندازِ تلاوت):
            </span>
            <div className="grid grid-cols-2 gap-1.5 text-xs">
              {layouts.map((l) => (
                <button
                  key={l.id}
                  onClick={() => {
                    setReadingLayout(l.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-1.5 p-2 rounded-xl border text-[11px] font-medium transition-all cursor-pointer ${
                    readingLayout === l.id
                      ? 'bg-emerald-700 text-white border-emerald-700 font-bold shadow-xs'
                      : 'bg-[var(--bg-surface)] border-[var(--border-subtle)] text-[var(--text-secondary)]'
                  }`}
                >
                  {l.icon}
                  <span className="truncate">{l.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── MOBILE EXCLUSIVE: DEDICATED FULL-WIDTH PERSPECTIVE CONTROL ── */}
      <div className="sm:hidden px-2 py-1.5 border-t border-[var(--border-subtle)] bg-[var(--bg-surface)]">
        <div className="grid grid-cols-4 p-1 rounded-2xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] shadow-inner text-[11px]">
          <button
            onClick={() => setPerspectiveMode('passage_nuzul')}
            className={`flex flex-col items-center justify-center gap-0.5 py-1.5 px-0.5 rounded-xl font-bold transition-all cursor-pointer ${
              perspectiveMode === 'passage_nuzul'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-urdu truncate font-bold">تدریجی</span>
          </button>
          <button
            onClick={() => setPerspectiveMode('nuzul')}
            className={`flex flex-col items-center justify-center gap-0.5 py-1.5 px-0.5 rounded-xl font-bold transition-all cursor-pointer ${
              perspectiveMode === 'nuzul'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span className="font-urdu truncate">سورتیں</span>
          </button>
          <button
            onClick={() => setPerspectiveMode('mushaf')}
            className={`flex flex-col items-center justify-center gap-0.5 py-1.5 px-0.5 rounded-xl font-bold transition-all cursor-pointer ${
              perspectiveMode === 'mushaf'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="font-urdu truncate">مصحف</span>
          </button>
          <button
            onClick={() => setPerspectiveMode('perspectives')}
            className={`flex flex-col items-center justify-center gap-0.5 py-1.5 px-0.5 rounded-xl font-bold transition-all cursor-pointer ${
              perspectiveMode === 'perspectives'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span className="font-urdu truncate">مناظر</span>
          </button>
        </div>
      </div>
    </header>
  );
};
