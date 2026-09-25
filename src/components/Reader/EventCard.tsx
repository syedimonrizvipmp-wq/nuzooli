import React from 'react';
import { RevelationEvent } from '@/types/quran';
import { useQuran } from '@/context/QuranContext';
import { AsbabCard } from './AsbabCard';
import { VerseList } from './VerseList';
import { RevelationNatureBadge } from './RevelationNatureBadge';
import {
  MapPin,
  Calendar,
  Layers,
  ArrowRight,
  ArrowLeft,
  Loader2,
  BookOpen,
} from 'lucide-react';

interface EventCardProps {
  event: RevelationEvent;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const {
    events,
    setActiveEventOrder,
    isLoadingVerses,
    showFullSurahForPassages,
    setShowFullSurahForPassages,
  } = useQuran();

  const currentIndex = events.findIndex(
    (e) => e.chronologicalOrder === event.chronologicalOrder
  );
  const prevEvent = currentIndex > 0 ? events[currentIndex - 1] : null;
  const nextEvent = currentIndex < events.length - 1 ? events[currentIndex + 1] : null;

  return (
    <article className="w-full max-w-[1550px] mx-auto py-4 sm:py-6 animate-fade-in">
      
      {/* Passage Top Header Banner */}
      <div className="mb-6 p-6 sm:p-10 rounded-3xl sacred-glass sacred-border sacred-shadow relative overflow-hidden">
        
        {/* Background Decorative Accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          
          {/* Tag Badges */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 mb-5">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold bg-emerald-700 text-white shadow-xs">
                ترتیبِ نزول #{event.chronologicalOrder}
              </span>
              <span className="px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-secondary)]">
                مصحف نمبر #{event.mushafOrder}
              </span>
              <span className="px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold bg-emerald-600/10 text-emerald-700 dark:text-emerald-300 border border-emerald-600/20">
                {event.revelationPeriod}
              </span>
              <RevelationNatureBadge
                nature={event.revelationNature}
                totalSegments={event.totalSegmentsForSurah}
                currentSegmentIndex={event.currentSegmentIndex}
              />
            </div>

            {/* Year & Timeline */}
            <div className="flex items-center gap-2 text-xs sm:text-sm text-[var(--text-muted)] font-medium">
              <Calendar className="w-4 h-4 text-emerald-600" />
              <span>{event.approximateYearCE} CE</span>
              <span>•</span>
              <span>
                {event.hijriYear ? `${event.hijriYear} AH` : `${event.approximateYearNabawi}st Year Nabawi`}
              </span>
            </div>
          </div>

          {/* Surah Titles Presentation */}
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 border-b border-[var(--border-subtle)] pb-5 mb-5">
            <div>
              <div className="flex items-baseline gap-3">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-[var(--text-primary)]">
                  {event.surahNameEnglish}
                </h2>
                <span className="text-sm sm:text-base font-medium text-[var(--text-muted)]">
                  ({event.totalVersesInSurah} Ayahs)
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1.5 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span>{event.location}</span>
                {event.isWholeSurah ? (
                  <span className="ml-2 font-semibold text-emerald-700 dark:text-emerald-300">
                    • Complete Surah Revealed
                  </span>
                ) : (
                  <span className="ml-2 font-semibold text-amber-500">
                    • Segmented Passage Revelation
                  </span>
                )}
              </p>
            </div>

            {/* Arabic & Urdu Titles */}
            <div className="text-right sm:text-right">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-emerald-800 dark:text-emerald-300 font-arabic">
                سورة {event.surahNameArabic}
              </div>
              <div className="text-base sm:text-lg text-[var(--text-secondary)] font-urdu mt-1">
                {event.surahNameUrdu}
              </div>
            </div>
          </div>

          {/* Passage vs Whole Surah Toggle (if this Surah was revealed in chunks) */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm text-[var(--text-secondary)]">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>
                {event.isWholeSurah || showFullSurahForPassages
                  ? `Reading Complete Surah: All ${event.totalVersesInSurah} Ayahs (پوری سورت کی تلاوت)`
                  : `Chronological Chunk: Verses ${event.verseRange.fromVerse}–${event.verseRange.toVerse} of ${event.totalVersesInSurah} total verses`}
              </span>
            </div>

            {/* Chunk Toggle */}
            {!event.isWholeSurah && (
              <button
                onClick={() => setShowFullSurahForPassages(!showFullSurahForPassages)}
                className="px-3 py-1 rounded-xl text-xs font-bold bg-emerald-500/15 text-emerald-800 dark:text-emerald-200 border border-emerald-500/30 hover:bg-emerald-500/25 transition-all flex items-center gap-1 cursor-pointer shadow-2xs"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>
                  {showFullSurahForPassages
                    ? 'Show Only This Historical Chunk'
                    : 'Read Entire Surah Instead'}
                </span>
              </button>
            )}
          </div>

        </div>
      </div>

      {/* Main Reading Area: Asbab un Nuzul & Verses */}
      <div className="space-y-6">
        <AsbabCard event={event} />

        {isLoadingVerses ? (
          <div className="p-12 text-center sacred-glass rounded-3xl sacred-border flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
            <span className="text-sm font-urdu text-[var(--text-muted)]">آیاتِ مبارکہ لوڈ کی جا رہی ہیں...</span>
          </div>
        ) : (
          <VerseList event={event} />
        )}
      </div>

      {/* Bottom Chronological Step Pagination */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[var(--border-subtle)] pt-6">
        {prevEvent ? (
          <button
            onClick={() => setActiveEventOrder(prevEvent.chronologicalOrder)}
            className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-emerald-500/40 text-left transition-all cursor-pointer shadow-2xs"
          >
            <ArrowLeft className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <div>
              <div className="text-[11px] text-[var(--text-muted)]">پچھلی وحی • Previous Event</div>
              <div className="text-sm font-bold text-[var(--text-primary)]">
                #{prevEvent.chronologicalOrder} {prevEvent.surahNameEnglish} ({prevEvent.approximateYearCE} CE)
              </div>
            </div>
          </button>
        ) : (
          <div />
        )}

        {nextEvent ? (
          <button
            onClick={() => setActiveEventOrder(nextEvent.chronologicalOrder)}
            className="flex items-center justify-end gap-2.5 px-4 py-3 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-emerald-500/40 text-right sm:ml-auto transition-all cursor-pointer shadow-2xs"
          >
            <div>
              <div className="text-[11px] text-[var(--text-muted)]">اگلی وحی • Next Event</div>
              <div className="text-sm font-bold text-[var(--text-primary)]">
                #{nextEvent.chronologicalOrder} {nextEvent.surahNameEnglish} ({nextEvent.approximateYearCE} CE)
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          </button>
        ) : (
          <div />
        )}
      </div>

    </article>
  );
};
