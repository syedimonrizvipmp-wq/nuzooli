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
  GitBranch,
  GraduationCap,
} from 'lucide-react';
import { LanguageToggle } from './LanguageToggle';

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
    language,
    t,
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
    if (perspectiveMode === 'timeline_stream') {
      window.dispatchEvent(new CustomEvent('toggle-timeline-zen'));
      return;
    }
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
      <div className="w-full border-b border-[var(--border-subtle)] bg-[var(--bg-surface)]/90 backdrop-blur-md px-3 sm:px-6 lg:px-8 xl:px-12 min-h-[44px] sm:h-12 flex items-center" dir="ltr">
        <div className="max-w-[1780px] mx-auto w-full">
          
          {/* Mobile Layout (< md) */}
          <div className="md:hidden flex flex-col items-center justify-center text-center py-1.5 gap-1.5" dir="ltr">
            <div className="flex items-center justify-center h-7 px-3 rounded-full bg-[var(--bg-card)]/60 border border-[var(--border-subtle)]/50 shadow-2xs">
              <span className="font-arabic text-sm sm:text-base font-bold text-[var(--text-primary)] tracking-wider leading-none select-none">
                بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
              </span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-gradient-to-r from-emerald-600/15 via-amber-500/15 to-emerald-600/15 border border-emerald-500/35 text-emerald-900 dark:text-emerald-200">
              <GraduationCap className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span className={`text-xs font-extrabold text-emerald-950 dark:text-emerald-100 ${language === 'en' ? 'font-sans' : 'font-urdu'}`}>
                {language === 'en' ? 'Maulana Syed Imon Rizvi' : 'مولانا سید آئمن رضوی'}
              </span>
            </div>
            <div className="flex items-center justify-between w-full pt-1 px-1 gap-2" dir="ltr">
              <button
                onClick={toggleFullscreen}
                title={isFullscreen ? t.app.exitFullscreen : t.app.fullscreen}
                className="p-1.5 min-w-[34px] min-h-[34px] flex items-center justify-center rounded-xl bg-emerald-600/10 text-emerald-700 dark:text-emerald-300 text-xs shrink-0 cursor-pointer active:scale-95 transition-all"
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <LanguageToggle compact />
            </div>
          </div>

          {/* Desktop & Tablet Majestic 3-Zone Layout (>= md) */}
          <div className="hidden md:grid md:grid-cols-3 items-center gap-3 text-xs w-full h-full" dir="ltr">
            
            {/* Zone 1: Academic Research Authorship Presentation */}
            <div className="flex items-center gap-2 justify-self-start text-left leading-none h-full">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600/15 via-amber-500/15 to-emerald-600/15 border border-emerald-500/35 text-emerald-900 dark:text-emerald-200 shadow-2xs">
                <GraduationCap className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800 dark:text-amber-300 hidden xl:inline">
                  {language === 'en' ? 'Research Initiative' : 'علمی و قرآنی خدمت'}
                </span>
                <span className="text-amber-500/40 hidden xl:inline">•</span>
                <span className={`text-xs sm:text-sm font-extrabold tracking-tight text-emerald-950 dark:text-emerald-100 ${language === 'en' ? 'font-sans' : 'font-urdu'}`}>
                  {language === 'en' ? 'Maulana Syed Imon Rizvi' : 'مولانا سید آئمن رضوی'}
                </span>
              </div>
            </div>

            {/* Zone 2: EXACT CENTER -> Grand Bismillah in Classical Calligraphy Capsule */}
            <div className="justify-self-center text-center flex items-center justify-center h-8 px-4 py-0.5 rounded-full bg-gradient-to-r from-transparent via-[var(--bg-card)]/40 to-transparent border border-[var(--border-subtle)]/40 shadow-2xs">
              <span className="font-arabic text-base sm:text-lg md:text-xl font-bold text-[var(--text-primary)] tracking-widest leading-none select-none drop-shadow-2xs">
                بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
              </span>
            </div>

            {/* Zone 3: Language Toggle & Corner Fullscreen Button - ANCHORED TO RIGHT */}
            <div className="flex items-center gap-2.5 justify-self-end" dir="ltr">
              <button
                onClick={toggleFullscreen}
                title={isFullscreen ? t.app.exitFullscreen : t.app.fullscreen}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-600/10 hover:bg-emerald-700 text-emerald-700 dark:text-emerald-300 hover:text-white text-[11px] font-bold transition-all border border-emerald-500/30 shadow-2xs cursor-pointer select-none shrink-0 h-7"
              >
                {isFullscreen ? (
                  <>
                    <Minimize2 className="w-3.5 h-3.5" />
                    <span className={language === 'en' ? 'font-sans' : 'font-urdu'}>{t.app.exitFullscreen}</span>
                  </>
                ) : (
                  <>
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span className={language === 'en' ? 'font-sans' : 'font-urdu'}>{t.app.fullscreen}</span>
                  </>
                )}
              </button>
              <LanguageToggle />
            </div>

          </div>

        </div>
      </div>

      {/* ── ROW 2: MAIN BRANDING, SEARCH & CONTROLS ── */}
      <div className="w-full border-b border-[var(--border-subtle)]/60 bg-[var(--bg-surface)]/95">
        <div className="max-w-[1780px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-12 h-18 sm:h-20 flex items-center justify-between gap-3 sm:gap-6">
          
          {/* Sacred Logo & Branding */}
            <div className="flex items-center gap-2.5 sm:gap-3 shrink-0 h-full">
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl overflow-hidden p-0.5 border border-emerald-500/40 shadow-sm bg-gradient-to-br from-emerald-950/20 via-amber-500/15 to-emerald-600/20 flex items-center justify-center group shrink-0">
                <img
                  src="/logo.jpeg"
                  alt="Tarteeb-e-Nuzul Logo"
                  className="w-full h-full object-cover rounded-[10px] sm:rounded-[14px] group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 rounded-xl sm:rounded-2xl ring-1 ring-inset ring-amber-400/30 pointer-events-none" />
              </div>
              <div className="flex flex-col justify-center h-full max-h-[56px] overflow-hidden">
                <div className="flex items-center gap-1.5 sm:gap-2 leading-none">
                  <h1 className={`text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-[var(--text-primary)] leading-tight flex items-center ${language === 'en' ? 'font-sans font-extrabold' : 'font-urdu'}`}>
                    {t.app.title}
                  </h1>
                  <span className="hidden sm:inline-flex items-center px-2 py-0.5 text-xs font-semibold rounded-md bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-500/25 leading-none">
                    {language === 'en' ? 'ترتیبِ نزولی' : 'Tarteeb-e-Nuzul'}
                  </span>
                </div>
                <p className={`text-[10px] sm:text-[11px] text-[var(--text-muted)] font-medium leading-normal mt-0.5 truncate max-w-[220px] sm:max-w-xs md:max-w-sm xl:max-w-md ${language === 'en' ? 'font-sans' : 'font-urdu'}`}>
                  {t.app.subTitle} • <strong className="text-emerald-800 dark:text-emerald-300 font-extrabold">{language === 'en' ? 'Maulana Syed Imon Rizvi' : 'مولانا سید آئمن رضوی'}</strong>
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
                  placeholder={t.app.searchPlaceholder}
                  className={`w-full ps-10 pe-9 py-2 text-xs rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-emerald-500/40 transition-all shadow-2xs h-9 ${language === 'en' ? 'font-sans' : 'font-urdu'}`}
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

          {/* Right: Reading Utility Controls & Settings */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            
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
                title={t.navigation.typography}
                className="p-2.5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-emerald-500/40 transition-all shadow-2xs cursor-pointer"
              >
                <Sliders className="w-4 h-4" />
              </button>

              {/* Bookmarks Drawer Trigger */}
              <button
                onClick={onOpenBookmarks}
                title={t.navigation.bookmarks}
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
                title={t.navigation.dataModal}
                className="p-2.5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-emerald-500/40 transition-all shadow-2xs cursor-pointer"
              >
                <Database className="w-4 h-4" />
              </button>

              {/* Academic & AI Disclaimer Modal Trigger */}
              <button
                onClick={onOpenDisclaimer}
                title={t.navigation.disclaimer}
                className="p-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 hover:bg-amber-500/20 hover:text-amber-800 dark:hover:text-amber-300 transition-all shadow-2xs cursor-pointer flex items-center gap-1.5"
              >
                <ShieldAlert className="w-4 h-4" />
                <span className={`hidden xl:inline text-xs font-semibold ${language === 'en' ? 'font-sans' : 'font-urdu'}`}>
                  {language === 'en' ? 'Notice' : 'وضاحت'}
                </span>
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
                title={t.app.searchPlaceholder}
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Mobile Theme Toggle */}
              <button
                onClick={toggleDarkLight}
                className="p-2 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-secondary)] cursor-pointer"
                title={t.navigation.theme}
              >
                {isDarkTheme ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-emerald-700" />}
              </button>

              {/* Mobile Bookmarks */}
              <button
                onClick={onOpenBookmarks}
                className="relative p-2 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-secondary)] cursor-pointer"
                title={t.navigation.bookmarks}
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
                title="Menu"
              >
                {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* ── ROW 3: DEDICATED PERSPECTIVE & CHRONOLOGY NAVIGATION RIBBON ── */}
      <div className="w-full border-t border-[var(--border-subtle)] bg-[var(--bg-surface)]/80 backdrop-blur-md h-11 sm:h-12 px-3 sm:px-6 lg:px-8 xl:px-12 shadow-2xs flex items-center">
        <div className="max-w-[1780px] mx-auto w-full flex items-center justify-between gap-3 overflow-x-auto no-scrollbar h-full">
          
          {/* Group 1: Revelation Chronology Track (نزولی ترتیب) */}
          <div className="flex items-center gap-1 p-0.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-2xs shrink-0 h-8.5">
            {/* 1. Passage Chronology */}
            <button
              onClick={() => setPerspectiveMode('passage_nuzul')}
              title={t.navigation.passageNuzul}
              className={`flex items-center gap-1.5 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer h-7.5 leading-none ${
                perspectiveMode === 'passage_nuzul'
                  ? 'bg-emerald-700 text-white shadow-xs font-bold'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)]'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className={`leading-none flex items-center ${language === 'en' ? 'font-sans font-bold' : 'font-urdu font-bold'}`}>
                {t.navigation.passageNuzul}
              </span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-amber-500/20 text-amber-300 font-bold hidden md:inline leading-none">
                {t.navigation.passageNuzulSub}
              </span>
            </button>

            {/* 2. Chronological Stream */}
            <button
              onClick={() => setPerspectiveMode('timeline_stream')}
              title={t.navigation.timelineStream}
              className={`flex items-center gap-1.5 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer h-7.5 leading-none ${
                perspectiveMode === 'timeline_stream'
                  ? 'bg-emerald-700 text-white shadow-xs font-bold ring-1 ring-amber-400/40'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className={`leading-none flex items-center ${language === 'en' ? 'font-sans font-bold' : 'font-urdu font-bold'}`}>
                {t.navigation.timelineStream}
              </span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-amber-500/25 text-amber-300 font-bold hidden md:inline leading-none">
                {t.navigation.timelineStreamSub}
              </span>
            </button>

            {/* 3. Surah Order (Complete) */}
            <button
              onClick={() => setPerspectiveMode('nuzul')}
              title={t.navigation.nuzulComplete}
              className={`flex items-center gap-1.5 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer h-7.5 leading-none ${
                perspectiveMode === 'nuzul'
                  ? 'bg-emerald-700 text-white shadow-xs font-bold'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)]'
              }`}
            >
              <Compass className="w-3.5 h-3.5 shrink-0" />
              <span className={`leading-none flex items-center ${language === 'en' ? 'font-sans' : 'font-urdu'}`}>
                {t.navigation.nuzulComplete}
              </span>
            </button>
          </div>

          {/* Group 2: Traditional Mushaf (ترتیبِ مصحف) */}
          <div className="flex items-center p-0.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-2xs shrink-0 h-8.5">
            <button
              onClick={() => setPerspectiveMode('mushaf')}
              title={t.navigation.mushafOrder}
              className={`flex items-center gap-1.5 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer h-7.5 leading-none ${
                perspectiveMode === 'mushaf'
                  ? 'bg-emerald-700 text-white shadow-xs font-bold'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span className={`leading-none flex items-center ${language === 'en' ? 'font-sans' : 'font-urdu'}`}>
                {t.navigation.mushafOrder}
              </span>
            </button>
          </div>

          {/* Group 3: Academic Hubs & Analytics (تحقیقی جہات و خطوط) */}
          <div className="flex items-center gap-1.5 shrink-0 h-8.5">
            {/* Multi-Perspective Analytics */}
            <button
              onClick={() => setPerspectiveMode('perspectives')}
              title={t.navigation.perspectives}
              className={`flex items-center gap-1.5 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer border h-7.5 leading-none ${
                perspectiveMode === 'perspectives'
                  ? 'bg-emerald-700 text-white border-emerald-600 shadow-xs font-bold'
                  : 'bg-[var(--bg-card)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)]'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className={`leading-none flex items-center ${language === 'en' ? 'font-sans' : 'font-urdu'}`}>
                {t.navigation.perspectives}
              </span>
            </button>

            {/* Standalone Hub 1: Grand Timeline */}
            <button
              onClick={() => {
                window.location.hash = '#timeline';
              }}
              title={t.navigation.calendarTimeline}
              className="flex items-center gap-1.5 px-3 rounded-lg bg-gradient-to-r from-amber-600 via-amber-500 to-emerald-600 hover:from-amber-500 hover:to-emerald-500 text-white font-bold text-xs shadow-xs cursor-pointer transition-all active:scale-95 ring-1 ring-amber-400/50 h-7.5 leading-none"
            >
              <GitBranch className="w-3.5 h-3.5 text-amber-200 shrink-0" />
              <span className={`leading-none flex items-center ${language === 'en' ? 'font-sans' : 'font-urdu'}`}>
                {t.navigation.calendarTimeline}
              </span>
            </button>

            {/* Standalone Hub 2: Surah Memorization Hub */}
            <button
              onClick={() => {
                window.location.hash = '#surahs';
              }}
              title={t.navigation.surahMemorizer}
              className="flex items-center gap-1.5 px-3 rounded-lg bg-gradient-to-r from-teal-700 via-emerald-600 to-indigo-700 hover:from-teal-600 hover:to-indigo-600 text-white font-bold text-xs shadow-xs cursor-pointer transition-all active:scale-95 ring-1 ring-emerald-400/50 h-7.5 leading-none"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-200 shrink-0" />
              <span className={`leading-none flex items-center ${language === 'en' ? 'font-sans' : 'font-urdu'}`}>
                {t.navigation.surahMemorizer}
              </span>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Search Bar Drawer */}
      {isMobileSearchOpen && (
        <div className="lg:hidden px-4 py-2.5 border-t border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] animate-fade-in shadow-inner">
          <div className="relative w-full">
            <Search className="absolute start-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-700 dark:text-emerald-400" />
            <input
              type="text"
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.app.searchPlaceholder}
              className={`w-full ps-10 pe-8 py-2 text-xs rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-emerald-500/40 shadow-2xs ${language === 'en' ? 'font-sans' : 'font-urdu'}`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute end-3 top-1/2 -translate-y-1/2 text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)]"
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
          <div className="flex items-center justify-between pb-2 border-b border-[var(--border-subtle)]">
            <span className="text-xs font-bold text-[var(--text-muted)]">Language / زبان:</span>
            <LanguageToggle />
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm">
            {/* Typography */}
            <button
              onClick={() => {
                onOpenTypography();
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center gap-2.5 p-3 min-h-[48px] rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-primary)] font-medium text-left cursor-pointer active:scale-95 transition-all shadow-xs"
            >
              <Sliders className="w-4 h-4 text-emerald-700 dark:text-emerald-400 flex-shrink-0" />
              <span className={language === 'en' ? 'font-sans' : 'font-urdu'}>{t.navigation.typography}</span>
            </button>

            {/* Data Ingestion */}
            <button
              onClick={() => {
                onOpenDataModal();
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center gap-2.5 p-3 min-h-[48px] rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-primary)] font-medium text-left cursor-pointer active:scale-95 transition-all shadow-xs"
            >
              <Database className="w-4 h-4 text-emerald-700 dark:text-emerald-400 flex-shrink-0" />
              <span className={language === 'en' ? 'font-sans' : 'font-urdu'}>{t.navigation.dataModal}</span>
            </button>

            {/* Disclaimer & AI Notice */}
            <button
              onClick={() => {
                onOpenDisclaimer();
                setIsMobileMenuOpen(false);
              }}
              className="col-span-2 flex items-center justify-between p-3.5 min-h-[50px] rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-300 font-medium text-left cursor-pointer active:scale-95 transition-all shadow-xs"
            >
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
                <span className={`text-xs sm:text-sm font-bold ${language === 'en' ? 'font-sans' : 'font-urdu'}`}>
                  {t.navigation.disclaimer}
                </span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-500/20 uppercase tracking-wide">
                Notice
              </span>
            </button>
          </div>

          {/* Reading Layout Selector */}
          <div className="pt-2 border-t border-[var(--border-subtle)]">
            <span className="text-xs font-bold text-[var(--text-muted)] block mb-2 uppercase">
              {t.navigation.layout}:
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {layouts.map((l) => (
                <button
                  key={l.id}
                  onClick={() => {
                    setReadingLayout(l.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 p-2.5 min-h-[44px] rounded-xl border text-xs font-medium transition-all cursor-pointer active:scale-95 ${
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
    </header>
  );
};
