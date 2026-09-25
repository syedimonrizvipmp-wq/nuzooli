import React from 'react';
import { useQuran } from '@/context/QuranContext';
import { RECITERS } from '@/data/reciters';
import { Play, Pause, Square, Volume2, User, SkipBack, SkipForward, Repeat } from 'lucide-react';

export const AudioPlayerBar: React.FC = () => {
  const {
    activeAudio,
    pauseAudio,
    resumeAudio,
    stopAudio,
    playNextAyah,
    playPrevAyah,
    isContinuousPlay,
    toggleContinuousPlay,
    selectedReciterId,
    setSelectedReciterId,
    activeEvent,
  } = useQuran();

  // If no audio has been triggered yet, do not render
  if (activeAudio.surahNumber === 0) return null;

  const currentReciter = RECITERS.find((r) => r.id === selectedReciterId) || RECITERS[0];

  return (
    <div className="fixed bottom-3 left-2 right-2 sm:bottom-4 sm:left-4 sm:right-4 max-w-4xl mx-auto z-40 animate-fade-in">
      <div className="p-3 sm:p-4 rounded-2xl sm:rounded-3xl sacred-glass sacred-border sacred-shadow bg-[var(--bg-surface-elevated)] border-emerald-600/40 shadow-2xl flex flex-wrap sm:flex-nowrap items-center justify-between gap-2.5">
        
        {/* Left: Now Playing Status */}
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0 transition-all ${
            activeAudio.isPlaying ? 'bg-emerald-700 text-white animate-pulse' : 'bg-[var(--bg-surface)] text-emerald-700 border border-[var(--border-subtle)]'
          }`}>
            <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                {activeAudio.isPlaying ? 'Now Reciting' : 'Paused'}
              </span>
              <span className="text-[10px] text-[var(--text-muted)] font-urdu hidden xs:inline">
                • {currentReciter.nameUr}
              </span>
            </div>
            <div className="text-xs sm:text-sm font-bold text-[var(--text-primary)] font-serif truncate max-w-[170px] xs:max-w-[220px] sm:max-w-none">
              Surah {activeEvent.surahNameEnglish} — {activeAudio.surahNumber}:{activeAudio.ayahNumber} (نزول #{activeAudio.eventOrder})
            </div>
          </div>
        </div>

        {/* Center/Right: Playback Controls, Continuous Toggle & Reciter Selector */}
        <div className="flex items-center gap-2 sm:gap-2.5 ml-auto">
          
          {/* Continuous Playback Toggle */}
          <button
            onClick={toggleContinuousPlay}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
              isContinuousPlay
                ? 'bg-emerald-700/15 border-emerald-500 text-emerald-800 dark:text-emerald-300 shadow-xs'
                : 'bg-[var(--bg-surface)] border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-primary)]'
            }`}
            title={
              isContinuousPlay
                ? 'مسلسل خودکار تلاوت فعال ہے (اگلی آیت خود چلے گی)'
                : 'صرف موجودہ آیت پلے ہوگی (مسلسل تلاوت آف)'
            }
          >
            <Repeat className={`w-3.5 h-3.5 ${isContinuousPlay ? 'text-emerald-600 dark:text-emerald-400' : ''}`} />
            <span className="hidden md:inline font-urdu text-[11px]">
              {isContinuousPlay ? 'مسلسل تلاوت' : 'صرف ایک آیت'}
            </span>
            <span className={`w-2 h-2 rounded-full ${isContinuousPlay ? 'bg-emerald-500 animate-pulse' : 'bg-gray-400'}`} />
          </button>

          {/* Reciter Selector */}
          <div className="hidden lg:flex items-center gap-1.5 bg-[var(--bg-surface)] px-2.5 py-1.5 rounded-xl border border-[var(--border-subtle)] text-xs text-[var(--text-secondary)]">
            <User className="w-3.5 h-3.5 text-emerald-600" />
            <select
              value={selectedReciterId}
              onChange={(e) => setSelectedReciterId(e.target.value)}
              className="bg-transparent text-[var(--text-primary)] font-medium focus:outline-none cursor-pointer text-xs"
            >
              {RECITERS.map((r) => (
                <option key={r.id} value={r.id} className="bg-[var(--bg-surface-elevated)] text-[var(--text-primary)]">
                  {r.nameEn}
                </option>
              ))}
            </select>
          </div>

          {/* Previous Ayah Button */}
          <button
            onClick={playPrevAyah}
            className="p-2 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-emerald-700 hover:border-emerald-600/40 transition-colors cursor-pointer"
            title="پچھلی آیت (Previous Ayah)"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          {/* Play/Pause Button */}
          <button
            onClick={() => {
              if (activeAudio.isPlaying) pauseAudio();
              else resumeAudio();
            }}
            className="w-10 h-10 rounded-2xl bg-emerald-700 text-white flex items-center justify-center hover:bg-emerald-800 shadow-md transition-all hover:scale-105 cursor-pointer"
            title={activeAudio.isPlaying ? 'Pause' : 'Resume'}
          >
            {activeAudio.isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
          </button>

          {/* Next Ayah Button */}
          <button
            onClick={playNextAyah}
            className="p-2 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-emerald-700 hover:border-emerald-600/40 transition-colors cursor-pointer"
            title="اگلی آیت (Next Ayah)"
          >
            <SkipForward className="w-4 h-4" />
          </button>

          {/* Stop Button */}
          <button
            onClick={stopAudio}
            className="p-2 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-red-600 hover:border-red-500/40 transition-colors cursor-pointer"
            title="Stop Audio"
          >
            <Square className="w-4 h-4" />
          </button>

        </div>

      </div>
    </div>
  );
};
