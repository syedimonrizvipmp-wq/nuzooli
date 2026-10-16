import React, { useState, useMemo, useEffect } from 'react';
import { useQuran } from '@/context/QuranContext';
import { GEOGRAPHIC_REVELATION_SITES } from '@/data/geographicRevelationData';
import {
  MapPin,
  Compass,
  Play,
  Pause,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  RotateCcw,
} from 'lucide-react';

// Dedicated, non-overlapping label callout positions (Canvas: 850x680)
const SITE_BADGE_POSITIONS: Record<string, { x: number; y: number }> = {
  tabuk: { x: 290, y: 36 },
  khaybar: { x: 445, y: 155 },
  uhud: { x: 265, y: 220 },
  khandaq: { x: 235, y: 265 },
  mubahalah: { x: 510, y: 245 },
  'al-madinah': { x: 490, y: 285 },
  quba: { x: 475, y: 325 },
  badr: { x: 205, y: 365 },
  'ghadir-khumm': { x: 505, y: 440 },
  hudaybiyyah: { x: 320, y: 505 },
  'ghar-hira': { x: 615, y: 480 },
  'makkah-fath': { x: 385, y: 535 },
  'shib-abi-talib': { x: 625, y: 520 },
  'dar-al-arqam': { x: 350, y: 570 },
  arafat: { x: 645, y: 560 },
  'ghar-thawr': { x: 470, y: 640 },
};

export const GeographicRevelationMap: React.FC = () => {
  const {
    typography,
    activeAudio,
    playAyah,
    pauseAudio,
    setActivePassageStep,
    setPerspectiveMode,
    language,
  } = useQuran();

  const [selectedSiteId, setSelectedSiteId] = useState<string>('ghar-hira');
  const [hoveredSiteId, setHoveredSiteId] = useState<string | null>(null);
  const [filterRegion, setFilterRegion] = useState<'All' | 'Makkah' | 'Madinah' | 'Expeditions'>('All');
  const [isAutoTouring, setIsAutoTouring] = useState<boolean>(false);

  // Active site resolution
  const activeSite = useMemo(() => {
    return (
      GEOGRAPHIC_REVELATION_SITES.find((s) => s.id === selectedSiteId) ||
      GEOGRAPHIC_REVELATION_SITES[0]
    );
  }, [selectedSiteId]);

  // Current index in timeline
  const activeIndex = useMemo(() => {
    return GEOGRAPHIC_REVELATION_SITES.findIndex((s) => s.id === activeSite.id);
  }, [activeSite.id]);

  // Filtered sites for list / chips
  const filteredSites = useMemo(() => {
    if (filterRegion === 'Makkah') {
      return GEOGRAPHIC_REVELATION_SITES.filter((s) => s.region === 'Makkah Region');
    }
    if (filterRegion === 'Madinah') {
      return GEOGRAPHIC_REVELATION_SITES.filter((s) => s.region === 'Madinah Region');
    }
    if (filterRegion === 'Expeditions') {
      return GEOGRAPHIC_REVELATION_SITES.filter((s) => s.region === 'Desert Caravan & Expedition Sites');
    }
    return GEOGRAPHIC_REVELATION_SITES;
  }, [filterRegion]);

  // Navigation handlers
  const goToNextSite = () => {
    const nextIdx = (activeIndex + 1) % GEOGRAPHIC_REVELATION_SITES.length;
    setSelectedSiteId(GEOGRAPHIC_REVELATION_SITES[nextIdx].id);
  };

  const goToPrevSite = () => {
    const prevIdx =
      (activeIndex - 1 + GEOGRAPHIC_REVELATION_SITES.length) % GEOGRAPHIC_REVELATION_SITES.length;
    setSelectedSiteId(GEOGRAPHIC_REVELATION_SITES[prevIdx].id);
  };

  // Auto Tour Timer
  useEffect(() => {
    if (!isAutoTouring) return;
    const interval = setInterval(() => {
      setSelectedSiteId((prev) => {
        const currIdx = GEOGRAPHIC_REVELATION_SITES.findIndex((s) => s.id === prev);
        const nextIdx = (currIdx + 1) % GEOGRAPHIC_REVELATION_SITES.length;
        return GEOGRAPHIC_REVELATION_SITES[nextIdx].id;
      });
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoTouring]);

  // Audio playing check for active site's featured verse
  const isPlayingActiveVerse =
    activeAudio.isPlaying &&
    activeAudio.surahNumber === activeSite.surahNumber &&
    activeAudio.ayahNumber === activeSite.featuredAyahNumber;

  // Jump directly to Chronological Passage Reader
  const handleJumpToReader = () => {
    setActivePassageStep(activeSite.passageStepNumber);
    setPerspectiveMode('passage_nuzul');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-[1780px] mx-auto pb-12">
      
      {/* ── 1. HEADER & CONTROLS ── */}
      <div className="p-4 sm:p-6 rounded-3xl sacred-glass sacred-border shadow-md space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1">
              <Compass className="w-4 h-4 text-amber-500 animate-spin-slow" />
              <span>سفرنامۂ وحی — جغرافیائی نقشہ (The Geographic Revelation Map)</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-800 dark:text-emerald-200 border border-emerald-500/30 text-[11px] font-sans">
                ۱۶ مقدس تاریخی مقامات
              </span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[var(--text-primary)]">
              ۲۳ سالہ وحی کی مقدس سرزمین اور تاریخی مقامات
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] font-urdu mt-0.5">
              غارِ حرا کی پہلی وحی سے لے کر غدیرِ خم کے اتمامِ دین تک، قرآن کے نزول کی سرزمین کی تفصیلی تفسیری دریافت
            </p>
          </div>

          {/* Tour & Navigation Bar */}
          <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
            <button
              onClick={() => setIsAutoTouring(!isAutoTouring)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                isAutoTouring
                  ? 'bg-amber-600 text-white border-amber-600 shadow-md animate-pulse'
                  : 'bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] border-[var(--border-subtle)] hover:bg-emerald-700 hover:text-white'
              }`}
              title="خودکار سفر شروع کریں"
            >
              <RotateCcw className={`w-3.5 h-3.5 ${isAutoTouring ? 'animate-spin' : ''}`} />
              <span className="font-urdu">{isAutoTouring ? 'سفر جاری ہے...' : 'خودکار سفر (Auto Tour)'}</span>
            </button>

            <button
              onClick={goToPrevSite}
              className="p-2 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-emerald-700 hover:border-emerald-600/40 transition-colors cursor-pointer"
              title="پچھلا مقام"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <span className="text-xs font-bold px-2 py-1 bg-[var(--bg-surface)] rounded-lg border border-[var(--border-subtle)] text-[var(--text-primary)] font-sans">
              {activeIndex + 1} / {GEOGRAPHIC_REVELATION_SITES.length}
            </span>

            <button
              onClick={goToNextSite}
              className="p-2 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-emerald-700 hover:border-emerald-600/40 transition-colors cursor-pointer"
              title="اگلا مقام"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Region Filter Chips */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-[var(--border-subtle)]">
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-[var(--text-muted)] font-urdu ml-1">علاقہ منتخب کریں:</span>
            {[
              { id: 'All', labelUr: 'تمام ۱۶ مقامات', labelEn: 'All Sites' },
              { id: 'Makkah', labelUr: 'علاقہ مکہ مکرمہ', labelEn: 'Makkah' },
              { id: 'Madinah', labelUr: 'علاقہ مدینہ منورہ', labelEn: 'Madinah' },
              { id: 'Expeditions', labelUr: 'غزوات و کاروانی راستے', labelEn: 'Expeditions' },
            ].map((r) => (
              <button
                key={r.id}
                onClick={() => setFilterRegion(r.id as any)}
                className={`px-3 py-1 rounded-xl font-medium transition-all cursor-pointer ${
                  filterRegion === r.id
                    ? 'bg-emerald-700 text-white shadow-xs font-bold'
                    : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)]'
                }`}
              >
                <span>{r.labelUr}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-[11px] text-[var(--text-muted)] font-medium">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] font-urdu text-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-emerald-500 via-rose-500 to-amber-500 shadow-xs" />
              <span>۱۶ رنگین منفرد نشانات (16 Distinct Signature Colors)</span>
            </span>
          </div>
        </div>
      </div>

      {/* ── 2. MAIN INTERACTIVE MAP & DETAILS GRID ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left 7 Cols: The Sacred Cartographic SVG Map */}
        <div className="lg:col-span-7 rounded-3xl sacred-glass sacred-border shadow-xl p-4 sm:p-6 relative overflow-hidden bg-gradient-to-b from-[#061e16] via-[#092b21] to-[#041610] text-emerald-100">
          
          {/* Map Compass Rose Watermark */}
          <div className="absolute top-4 right-4 pointer-events-none opacity-20 flex flex-col items-center">
            <Compass className="w-16 h-16 text-amber-300" />
            <span className="text-[10px] font-serif tracking-widest text-amber-200">شِمَال (N)</span>
          </div>

          {/* Map Title Legend */}
          <div className="absolute top-4 left-4 z-10 bg-emerald-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-emerald-600/30 text-xs">
            <div className="text-[10px] font-bold text-amber-400 uppercase tracking-widest font-sans">
              Sacred Hijaz Cartography
            </div>
            <div className="font-urdu text-emerald-200 text-xs font-semibold">
              ارضِ حجاز — مکہ، مدینہ و منازلِ وحی
            </div>
          </div>

          {/* SVG Map Canvas */}
          <div className="w-full aspect-[850/680] relative">
            <svg
              viewBox="0 0 850 680"
              className="w-full h-full select-none"
              style={{ filter: 'drop-shadow(0px 8px 16px rgba(0,0,0,0.5))' }}
            >
              <defs>
                {/* Gold Glow filter for selected pin */}
                <filter id="beaconGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>

                {/* Linear gradient for Red Sea */}
                <linearGradient id="redSeaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#032018" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#063226" stopOpacity="0.7" />
                </linearGradient>

                {/* Trail Dash Animation */}
                <linearGradient id="hijrahTrailGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="50%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#38bdf8" />
                </linearGradient>
              </defs>

              {/* Red Sea Coastline Area (West) */}
              <path
                d="M 0,0 L 220,0 Q 230,120 200,240 T 260,420 Q 270,520 230,680 L 0,680 Z"
                fill="url(#redSeaGrad)"
                stroke="#0f4c3a"
                strokeWidth="1.5"
                opacity="0.85"
              />
              
              {/* Sea Ripple Texture Lines */}
              <path d="M 40,80 Q 90,90 140,80" stroke="#134e3f" strokeWidth="1" fill="none" opacity="0.4" />
              <path d="M 60,220 Q 120,230 170,215" stroke="#134e3f" strokeWidth="1" fill="none" opacity="0.4" />
              <path d="M 50,380 Q 110,390 160,375" stroke="#134e3f" strokeWidth="1" fill="none" opacity="0.4" />
              <path d="M 70,540 Q 130,550 180,535" stroke="#134e3f" strokeWidth="1" fill="none" opacity="0.4" />
              <text x="80" y="320" fill="#2d6a4f" fontSize="13" fontFamily="serif" letterSpacing="4" opacity="0.6" transform="rotate(-75 80 320)">
                بَحْرُ الْقُلْزُم (RED SEA)
              </text>

              {/* Desert Mountain Relief Stylings */}
              {/* Jabal al-Nur / Mount Nur */}
              <polygon points="505,500 495,485 515,500" fill="#1b4d3e" stroke="#2d6a4f" strokeWidth="1" opacity="0.6" />
              <polygon points="495,508 485,492 505,508" fill="#143d31" stroke="#2d6a4f" strokeWidth="1" opacity="0.6" />

              {/* Jabal Uhud North of Madinah */}
              <polygon points="375,235 365,215 390,235" fill="#1b4d3e" stroke="#2d6a4f" strokeWidth="1" opacity="0.6" />
              <polygon points="390,238 380,220 405,238" fill="#143d31" stroke="#2d6a4f" strokeWidth="1" opacity="0.6" />
              <polygon points="360,240 350,225 372,240" fill="#143d31" stroke="#2d6a4f" strokeWidth="1" opacity="0.6" />

              {/* Southern Mountains of Makkah */}
              <polygon points="472,558 460,540 482,558" fill="#1b4d3e" stroke="#2d6a4f" strokeWidth="1" opacity="0.6" />

              {/* ── Sacred Hijrah Migration Trail (Dotted Animated Gold Curve) ── */}
              <path
                d="M 470,580 Q 330,490 305,360 T 370,310 L 380,270"
                fill="none"
                stroke="url(#hijrahTrailGrad)"
                strokeWidth="2.5"
                strokeDasharray="6,6"
                className="animate-pulse"
                opacity="0.75"
              />

              {/* Route Label */}
              <text x="325" y="475" fill="#f59e0b" fontSize="10" fontFamily="sans-serif" fontWeight="bold" opacity="0.8" transform="rotate(-35 325 475)">
                طریق الھجرۃ النبویۃ (Sacred Hijrah Route) ➔
              </text>

              {/* ── Route from Madinah to Khaybar & Tabuk (North) ── */}
              <path
                d="M 380,270 L 350,155 L 290,75"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="1.5"
                strokeDasharray="4,4"
                opacity="0.4"
              />

              {/* ── Route from Madinah to Ghadir Khumm & Makkah ── */}
              <path
                d="M 380,270 Q 395,360 405,440 Q 440,490 485,525"
                fill="none"
                stroke="#10b981"
                strokeWidth="1.5"
                strokeDasharray="5,5"
                opacity="0.5"
              />

              {/* ── Leader Lines Connecting Each Pin to its Callout Badge ── */}
              {GEOGRAPHIC_REVELATION_SITES.map((site) => {
                const badge = SITE_BADGE_POSITIONS[site.id] || site.coordinates;
                const isSelected = site.id === selectedSiteId;
                const isHovered = site.id === hoveredSiteId;
                const { x, y } = site.coordinates;

                return (
                  <line
                    key={`line-${site.id}`}
                    x1={x}
                    y1={y}
                    x2={badge.x}
                    y2={badge.y}
                    stroke={site.color}
                    strokeWidth={isSelected ? 2 : isHovered ? 1.5 : 1}
                    strokeDasharray={isSelected ? 'none' : '3,3'}
                    opacity={isSelected ? 0.95 : isHovered ? 0.85 : 0.45}
                    className="transition-all duration-300"
                  />
                );
              })}

              {/* ── Interactive Hotspot Pins with 16 Unique Colors & Sequence Numbers ── */}
              {GEOGRAPHIC_REVELATION_SITES.map((site, index) => {
                const isSelected = site.id === selectedSiteId;
                const isHovered = site.id === hoveredSiteId;
                const { x, y } = site.coordinates;
                const pinColor = site.color;

                return (
                  <g
                    key={site.id}
                    className="cursor-pointer transition-all duration-300"
                    onClick={() => setSelectedSiteId(site.id)}
                    onMouseEnter={() => setHoveredSiteId(site.id)}
                    onMouseLeave={() => setHoveredSiteId(null)}
                  >
                    {/* Animated Pulsing Ring when selected */}
                    {isSelected && (
                      <>
                        <circle
                          cx={x}
                          cy={y}
                          r="26"
                          fill="none"
                          stroke={pinColor}
                          strokeWidth="2.5"
                          opacity="0.4"
                          className="animate-ping"
                        />
                        <circle
                          cx={x}
                          cy={y}
                          r="18"
                          fill={pinColor}
                          fillOpacity="0.3"
                          stroke={pinColor}
                          strokeWidth="2"
                          filter="url(#beaconGlow)"
                        />
                      </>
                    )}

                    {/* Outer Circle with White Border */}
                    <circle
                      cx={x}
                      cy={y}
                      r={isSelected ? 13 : isHovered ? 11.5 : 10}
                      fill={pinColor}
                      stroke="#ffffff"
                      strokeWidth={isSelected ? 2.5 : 1.8}
                      className="transition-all duration-200"
                      style={{
                        filter: 'drop-shadow(0px 2px 5px rgba(0,0,0,0.8))',
                      }}
                    />

                    {/* Sequence Number (#1 to #16) inside the pin */}
                    <text
                      x={x}
                      y={y + 3.5}
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize={isSelected ? '10' : '8.5'}
                      fontWeight="900"
                      fontFamily="sans-serif"
                      className="select-none pointer-events-none"
                    >
                      {index + 1}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* ── HTML Overlay: Perfectly Aligned, Non-Overlapping Callout Badges ── */}
            <div className="absolute inset-0 pointer-events-none">
              {GEOGRAPHIC_REVELATION_SITES.map((site) => {
                const badge = SITE_BADGE_POSITIONS[site.id] || site.coordinates;
                const isSelected = site.id === selectedSiteId;
                const isHovered = site.id === hoveredSiteId;
                const leftPercent = (badge.x / 850) * 100;
                const topPercent = (badge.y / 680) * 100;

                return (
                  <button
                    key={`badge-${site.id}`}
                    onClick={() => setSelectedSiteId(site.id)}
                    onMouseEnter={() => setHoveredSiteId(site.id)}
                    onMouseLeave={() => setHoveredSiteId(null)}
                    className={`absolute pointer-events-auto -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-urdu font-bold transition-all cursor-pointer whitespace-nowrap select-none ${
                      isSelected
                        ? 'scale-110 z-30 shadow-2xl ring-2 ring-white'
                        : isHovered
                        ? 'scale-105 z-20 shadow-lg'
                        : 'z-10 shadow-md opacity-95 hover:opacity-100'
                    }`}
                    style={{
                      left: `${leftPercent}%`,
                      top: `${topPercent}%`,
                      backgroundColor: isSelected ? site.color : 'rgba(4, 29, 20, 0.94)',
                      borderColor: site.color,
                      borderWidth: isSelected ? '2px' : '1.5px',
                      color: '#ffffff',
                      boxShadow: isSelected
                        ? `0 0 16px ${site.color}90, 0 4px 12px rgba(0,0,0,0.8)`
                        : `0 2px 6px rgba(0,0,0,0.7)`,
                    }}
                    title={`${site.nameUrdu} (${site.nameEnglish})`}
                  >
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: isSelected ? '#ffffff' : site.color }}
                    />
                    <span className="leading-none pt-0.5">{site.shortNameUrdu}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Legend Footer inside map */}
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[11px] text-emerald-200/80 pt-2 border-t border-emerald-800/40">
            <span>نقشے پر کسی بھی مقام پر کلک کریں تاکہ اس کے تفصیلی کوائف اور آیات کھل سکیں</span>
            <span className="font-sans text-[10px] text-amber-400">Scale: ~1:1,000,000 Sacred Hijaz Area</span>
          </div>
        </div>

        {/* Right 5 Cols: The Location Chronicle & Verses Panel */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Main Chronicle Card */}
          <div className="p-6 rounded-3xl sacred-border sacred-shadow bg-[var(--bg-surface-card)] space-y-5 animate-fade-in border-emerald-600/30">
            
            {/* Header: Name, Period & Year */}
            <div className="flex items-start justify-between gap-3 border-b border-[var(--border-subtle)] pb-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold mb-1">
                  <span
                    className="px-2.5 py-0.5 rounded-full border text-[11px] font-sans font-bold shadow-xs"
                    style={{
                      backgroundColor: `${activeSite.color}20`,
                      borderColor: `${activeSite.color}60`,
                      color: activeSite.color,
                    }}
                  >
                    #{activeIndex + 1} از ۱۶ مقامات
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30 text-[11px]">
                    {activeSite.yearNabawiOrHijri}
                  </span>
                </div>

                <h3 className="text-2xl font-bold font-serif text-[var(--text-primary)]">
                  {activeSite.nameUrdu}
                </h3>
                <div className="font-arabic text-emerald-800 dark:text-emerald-300 text-lg">
                  {activeSite.nameArabic}
                </div>
                <div className="text-xs text-[var(--text-muted)] font-sans">
                  {activeSite.nameEnglish} • {activeSite.approxDistanceKmFromMakkah === 0 ? 'مکہ مکرمہ کا قلب' : `فاصلہ تا مکہ: ~${activeSite.approxDistanceKmFromMakkah} کلومیٹر`}
                </div>
              </div>

              <div
                className="w-12 h-12 rounded-2xl border flex items-center justify-center shrink-0 transition-colors shadow-sm"
                style={{
                  backgroundColor: `${activeSite.color}18`,
                  borderColor: `${activeSite.color}50`,
                  color: activeSite.color,
                }}
              >
                <MapPin className="w-6 h-6" />
              </div>
            </div>

            {/* Significance & Context */}
            <div className="space-y-2 text-xs">
              <div className="font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1.5 font-urdu text-sm">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>تاریخی و تفسیری پس منظر (شانِ نزول):</span>
              </div>
              <p className="font-urdu text-sm leading-relaxed text-[var(--text-primary)] text-right">
                {activeSite.contextUrdu}
              </p>
              {activeSite.contextEnglish && (
                <p className="font-sans text-xs text-[var(--text-muted)] leading-relaxed pt-1 border-t border-[var(--border-subtle)]">
                  {activeSite.contextEnglish}
                </p>
              )}
            </div>

            {/* Featured Revealed Verse Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[var(--bg-surface)] border border-emerald-600/25 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-emerald-800 dark:text-emerald-300">
                <span>
                  {language === 'en'
                    ? `Surah ${activeSite.surahNameEnglish} (${activeSite.surahNameUrdu.startsWith('سورۃ') ? activeSite.surahNameUrdu : `سورۃ ${activeSite.surahNameUrdu}`}) — ${activeSite.surahNumber}:${activeSite.featuredAyahNumber}`
                    : `${activeSite.surahNameUrdu.startsWith('سورۃ') ? activeSite.surahNameUrdu : `سورۃ ${activeSite.surahNameUrdu}`} (${activeSite.surahNameEnglish}) — ${activeSite.surahNumber}:${activeSite.featuredAyahNumber}`}
                </span>
                <span className="text-[10px] text-[var(--text-muted)] font-sans">
                  نزولِ تدریجی مرحلہ #{activeSite.passageStepNumber}
                </span>
              </div>

              {/* Arabic Verse */}
              <div
                className="font-arabic text-right leading-[2.4] text-lg sm:text-xl text-[var(--text-primary)]"
                style={{ fontFamily: typography.arabicFont }}
              >
                {activeSite.featuredVerseArabic}
              </div>

              {/* Urdu Translation */}
              <div className="font-urdu text-right text-xs sm:text-sm text-[var(--text-primary)] leading-relaxed pt-2 border-t border-[var(--border-subtle)]">
                {activeSite.featuredVerseUrdu}
              </div>

              {/* English Translation */}
              <div className="font-sans text-left text-xs text-[var(--text-muted)] leading-relaxed">
                {activeSite.featuredVerseEnglish}
              </div>

              {/* Audio & Reader Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-2">
                <button
                  onClick={() => {
                    if (isPlayingActiveVerse) {
                      pauseAudio();
                    } else {
                      playAyah(activeSite.surahNumber, activeSite.featuredAyahNumber, activeSite.eventOrder);
                    }
                  }}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isPlayingActiveVerse
                      ? 'bg-amber-600 text-white shadow-xs animate-pulse'
                      : 'bg-emerald-700 text-white hover:bg-emerald-800 shadow-xs'
                  }`}
                  title="اس آیت کی تلاوت سنیں"
                >
                  {isPlayingActiveVerse ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{isPlayingActiveVerse ? 'وقفہ' : 'تلاوت سنیں'}</span>
                </button>

                <button
                  onClick={handleJumpToReader}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-[var(--bg-surface-elevated)] hover:bg-emerald-700 hover:text-white border border-[var(--border-subtle)] text-[var(--text-primary)] transition-all cursor-pointer shadow-xs"
                  title="تدریجی قراءت میں اس مقام کا پورا مقطع پڑھیں"
                >
                  <span>مکمل مقطع پڑھیں</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

          {/* 16 Sacred Sites Detailed Cards Grid */}
          <div className="p-5 rounded-3xl sacred-glass sacred-border space-y-3">
            <div className="text-xs font-bold text-[var(--text-muted)] flex items-center justify-between">
              <span className="font-urdu text-sm text-[var(--text-primary)]">
                ۱۶ مقدس مقامات کا تفصیلی انتخاب (All 16 Sacred Sites):
              </span>
              <span className="font-sans text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 font-bold">
                {filteredSites.length} مقامات
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[360px] overflow-y-auto pr-1 no-scrollbar">
              {filteredSites.map((s) => {
                const isCurrent = s.id === selectedSiteId;
                const siteIdx = GEOGRAPHIC_REVELATION_SITES.findIndex((x) => x.id === s.id);
                return (
                  <button
                    key={s.id}
                    onClick={() => setSelectedSiteId(s.id)}
                    className={`p-3.5 rounded-2xl text-right transition-all flex flex-col justify-between gap-2 cursor-pointer border ${
                      isCurrent
                        ? 'bg-[var(--bg-surface-elevated)] shadow-md'
                        : 'bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-elevated)] text-[var(--text-secondary)] border-[var(--border-subtle)]'
                    }`}
                    style={{
                      borderColor: isCurrent ? s.color : undefined,
                      boxShadow: isCurrent ? `0 0 0 1.5px ${s.color}, 0 4px 12px rgba(0,0,0,0.2)` : undefined,
                    }}
                  >
                    {/* Top row: Order badge with colored indicator and year */}
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-1.5">
                        <span
                          className="w-3.5 h-3.5 rounded-full shrink-0 shadow-xs"
                          style={{ backgroundColor: s.color }}
                        />
                        <span className="font-sans text-xs font-bold text-[var(--text-muted)]">
                          #{siteIdx + 1}
                        </span>
                      </div>
                      <span
                        className="font-sans text-[11px] font-bold px-2 py-0.5 rounded-md"
                        style={{
                          backgroundColor: `${s.color}18`,
                          color: s.color,
                        }}
                      >
                        {s.yearCE} CE
                      </span>
                    </div>

                    {/* Middle: Full, Un-truncated Urdu Name */}
                    <div className="w-full text-right mt-1">
                      <span className="font-urdu text-base font-bold text-[var(--text-primary)] block leading-snug">
                        {s.shortNameUrdu}
                      </span>
                      <span className="text-[11px] text-[var(--text-muted)] font-sans block truncate text-left mt-0.5" dir="ltr">
                        {s.shortNameEnglish}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
