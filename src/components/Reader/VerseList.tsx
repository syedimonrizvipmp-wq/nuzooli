import React, { useState } from 'react';
import { Verse, RevelationEvent } from '@/types/quran';
import { useQuran } from '@/context/QuranContext';
import { Play, Pause, Bookmark, Check, Copy } from 'lucide-react';

interface VerseListProps {
  event: RevelationEvent;
}

export const VerseList: React.FC<VerseListProps> = ({ event }) => {
  const {
    readingLayout,
    typography,
    activeAudio,
    playAyah,
    pauseAudio,
    toggleBookmark,
    isBookmarked,
  } = useQuran();

  const [copiedAyah, setCopiedAyah] = useState<number | null>(null);

  // Quick Copy with authentic citation formatting
  const handleCopy = (v: Verse) => {
    const citation = `[${event.surahNameEnglish} ${v.surahNumber}:${v.ayahNumber} | Revelation Order #${event.chronologicalOrder}]\n${v.textArabic}\n${v.translationUrdu}\n${v.translationEnglish}`;
    navigator.clipboard.writeText(citation).then(() => {
      setCopiedAyah(v.ayahNumber);
      setTimeout(() => setCopiedAyah(null), 2000);
    });
  };

  // Helper to pick selected Urdu translation
  const getUrduText = (v: Verse) => {
    if (typography.urduTranslator === 'najafi' && v.translationUrduNajafi) {
      return v.translationUrduNajafi;
    }
    if (typography.urduTranslator === 'jalandhry' && v.translationUrduJalandhry) {
      return v.translationUrduJalandhry;
    }
    return v.translationUrdu;
  };

  // Helper to pick selected English translation
  const getEnglishText = (v: Verse) => {
    if (typography.englishTranslator === 'khattab' && v.translationEnglishKhattab) {
      return v.translationEnglishKhattab;
    }
    if (typography.englishTranslator === 'qarai' && v.translationEnglishQarai) {
      return v.translationEnglishQarai;
    }
    return v.translationEnglish;
  };

  // Luminous Bismillah Header (Surah 1 has Bismillah as Ayah 1; Surah 9 has no Bismillah)
  const renderBismillah = () => {
    if (event.surahNumber === 9) {
      return (
        <div className="py-3 px-4 mb-6 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-center text-xs text-amber-800 dark:text-amber-200 font-urdu shadow-2xs">
          <span>مستند روایات و تفاسیر کے مطابق، سورۃ التوبہ (برائت) کے آغاز میں بسم اللہ نازل نہیں ہوئی کیونکہ یہ غضبِ الٰہی اور عہد شکن مشرکین سے برائت کا اعلان ہے۔</span>
        </div>
      );
    }

    if (event.surahNumber === 1) {
      // In Surah Al-Fatiha, Ayah 1 is itself Bismillahir Rahmanir Raheem
      return null;
    }

    return (
      <div className="py-6 mb-6 text-center animate-fade-in">
        <div className="inline-block px-8 py-3.5 rounded-3xl bg-[var(--bg-surface-elevated)] border border-emerald-500/25 shadow-xs">
          <div
            className="font-arabic font-bold text-2xl sm:text-3xl lg:text-4xl text-emerald-900 dark:text-emerald-200 tracking-wider select-none"
            style={{ fontFamily: typography.arabicFont }}
          >
            بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
          </div>
          <div className="text-[11px] font-urdu text-[var(--text-muted)] mt-1.5">
            شروع اللہ کے نام سے جو بڑا مہربان نہایت رحم والا ہے
          </div>
        </div>
      </div>
    );
  };

  // 1. ARABIC-ONLY MODE (Pure Uthmani flow with ornate Ayah glyphs)
  if (readingLayout === 'arabic-only') {
    return (
      <div className="space-y-4">
        {renderBismillah()}
        <div className="w-full p-4 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl sacred-border sacred-shadow bg-[var(--bg-surface-card)]">
        <div
          className="font-arabic leading-[2.6] text-right"
          style={{
            fontFamily: typography.arabicFont,
            fontSize: `${typography.arabicFontSize}px`,
            lineHeight: typography.lineHeight,
          }}
        >
          {event.verses.map((v) => {
            const isPlaying =
              activeAudio.isPlaying &&
              activeAudio.surahNumber === v.surahNumber &&
              activeAudio.ayahNumber === v.ayahNumber;

            return (
              <span
                key={v.ayahNumber}
                className={`inline transition-colors rounded-lg px-1.5 py-0.5 ${
                  isPlaying ? 'bg-emerald-500/20 text-emerald-950 dark:text-emerald-100 ring-1 ring-emerald-500/30' : ''
                }`}
              >
                {v.textArabic}
                <span
                  onClick={() => {
                    if (isPlaying) pauseAudio();
                    else playAyah(v.surahNumber, v.ayahNumber, event.chronologicalOrder);
                  }}
                  title={`Ayah ${v.ayahNumber} - Click to listen`}
                  className="inline-flex items-center justify-center cursor-pointer mx-1.5 px-2 py-0.5 rounded-full text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 select-none align-middle"
                >
                  <span className="font-serif">۝</span>
                  <span className="mx-0.5">{v.ayahNumber}</span>
                </span>
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

  // 2. TRANSLATION-ONLY MODE (Urdu flow with optional English)
  if (readingLayout === 'translation-only') {
    return (
      <div className="space-y-4">
        {renderBismillah()}
        {event.verses.map((v) => {
          const isPlaying =
            activeAudio.isPlaying &&
            activeAudio.surahNumber === v.surahNumber &&
            activeAudio.ayahNumber === v.ayahNumber;
          const bookmarked = isBookmarked(v.surahNumber, v.ayahNumber);

          return (
            <div
              key={v.ayahNumber}
              className={`p-4 sm:p-6 rounded-2xl sm:rounded-3xl sacred-border sacred-shadow bg-[var(--bg-surface-card)] transition-all ${
                isPlaying ? 'ring-2 ring-emerald-500/40 bg-emerald-500/5' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-3 border-b border-[var(--border-subtle)] pb-2 text-xs text-[var(--text-muted)]">
                <span className="font-bold text-emerald-700 dark:text-emerald-300">
                  آیت {v.ayahNumber} ({event.surahNameEnglish})
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopy(v)}
                    className="p-1.5 rounded-lg hover:bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-emerald-700"
                    title="Copy Verse Citation"
                  >
                    {copiedAyah === v.ayahNumber ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={() =>
                      toggleBookmark({
                        eventOrder: event.chronologicalOrder,
                        surahNumber: v.surahNumber,
                        surahName: event.surahNameEnglish,
                        ayahNumber: v.ayahNumber,
                        ayahRangeText: `${v.surahNumber}:${v.ayahNumber}`,
                      })
                    }
                    className={`p-1.5 rounded-lg hover:bg-[var(--bg-surface)] ${
                      bookmarked ? 'text-amber-600' : 'text-[var(--text-secondary)]'
                    }`}
                    title="Bookmark"
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Urdu Translation */}
              {typography.showUrdu && (
                <p
                  className="font-urdu text-[var(--text-primary)] mb-2"
                  style={{
                    fontFamily: typography.urduFont,
                    fontSize: `${typography.translationFontSize}px`,
                    lineHeight: typography.lineHeight,
                  }}
                >
                  {getUrduText(v)}
                </p>
              )}

              {/* English Translation */}
              {typography.showEnglish && (
                <p
                  className="font-english text-[var(--text-secondary)] mt-1"
                  style={{
                    fontSize: `${Math.max(14, typography.translationFontSize - 2)}px`,
                  }}
                >
                  {getEnglishText(v)}
                </p>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  // 3. SIDE-BY-SIDE MODE (Arabic right column, Translations left column)
  if (readingLayout === 'side-by-side') {
    return (
      <div className="space-y-4">
        {renderBismillah()}
        {event.verses.map((v) => {
          const isPlaying =
            activeAudio.isPlaying &&
            activeAudio.surahNumber === v.surahNumber &&
            activeAudio.ayahNumber === v.ayahNumber;
          const bookmarked = isBookmarked(v.surahNumber, v.ayahNumber);

          return (
            <div
              key={v.ayahNumber}
              className={`grid grid-cols-1 md:grid-cols-12 gap-4 p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl sacred-border sacred-shadow bg-[var(--bg-surface-card)] transition-all ${
                isPlaying ? 'ring-2 ring-emerald-500/40 bg-emerald-500/5' : ''
              }`}
            >
              {/* Left Column: Translations (Urdu + English) */}
              <div className="md:col-span-6 flex flex-col justify-between order-2 md:order-1 border-t md:border-t-0 md:border-r border-[var(--border-subtle)] pt-4 md:pt-0 md:pr-4">
                <div className="space-y-3">
                  {typography.showUrdu && (
                    <p
                      className="font-urdu text-[var(--text-primary)]"
                      style={{
                        fontFamily: typography.urduFont,
                        fontSize: `${typography.translationFontSize}px`,
                        lineHeight: typography.lineHeight,
                      }}
                    >
                      {getUrduText(v)}
                    </p>
                  )}
                  {typography.showEnglish && (
                    <p
                      className="font-english text-[var(--text-secondary)] text-sm leading-relaxed"
                      style={{
                        fontSize: `${Math.max(14, typography.translationFontSize - 3)}px`,
                      }}
                    >
                      {getEnglishText(v)}
                    </p>
                  )}
                </div>

                {/* Actions Footer */}
                <div className="flex items-center gap-2 mt-4 pt-2 border-t border-[var(--border-subtle)] text-xs text-[var(--text-muted)]">
                  <span className="font-semibold text-emerald-700 dark:text-emerald-300">Ayah {v.ayahNumber}</span>
                  <div className="flex items-center gap-1 ml-auto">
                    <button
                      onClick={() => {
                        if (isPlaying) pauseAudio();
                        else playAyah(v.surahNumber, v.ayahNumber, event.chronologicalOrder);
                      }}
                      className="p-1.5 rounded-lg hover:bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-emerald-700 cursor-pointer"
                      title={isPlaying ? 'Pause' : 'Play Audio'}
                    >
                      {isPlaying ? <Pause className="w-4 h-4 text-emerald-600" /> : <Play className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => handleCopy(v)}
                      className="p-1.5 rounded-lg hover:bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-emerald-700 cursor-pointer"
                      title="Copy Citation"
                    >
                      {copiedAyah === v.ayahNumber ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() =>
                        toggleBookmark({
                          eventOrder: event.chronologicalOrder,
                          surahNumber: v.surahNumber,
                          surahName: event.surahNameEnglish,
                          ayahNumber: v.ayahNumber,
                          ayahRangeText: `${v.surahNumber}:${v.ayahNumber}`,
                        })
                      }
                      className={`p-1.5 rounded-lg hover:bg-[var(--bg-surface)] cursor-pointer ${
                        bookmarked ? 'text-emerald-600' : 'text-[var(--text-secondary)] hover:text-emerald-600'
                      }`}
                      title="Bookmark"
                    >
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Arabic Text */}
              <div className="md:col-span-6 flex flex-col justify-center order-1 md:order-2">
                <p
                  className="font-arabic text-[var(--text-primary)]"
                  style={{
                    fontFamily: typography.arabicFont,
                    fontSize: `${typography.arabicFontSize}px`,
                    lineHeight: typography.lineHeight,
                  }}
                >
                  {v.textArabic}
                  <span className="ayah-end-glyph">
                    <span>۝</span>
                    <span className="text-xs">{v.ayahNumber}</span>
                  </span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // 4. SPLIT MODE (DEFAULT: Arabic verse on top, translations below)
  return (
    <div className="space-y-4">
      {renderBismillah()}
      {event.verses.map((v) => {
        const isPlaying =
          activeAudio.isPlaying &&
          activeAudio.surahNumber === v.surahNumber &&
          activeAudio.ayahNumber === v.ayahNumber;
        const bookmarked = isBookmarked(v.surahNumber, v.ayahNumber);

        return (
          <div
            key={v.ayahNumber}
            className={`p-4 sm:p-7 lg:p-10 rounded-2xl sm:rounded-3xl sacred-border sacred-shadow bg-[var(--bg-surface-card)] transition-all ${
              isPlaying ? 'ring-2 ring-emerald-500/40 bg-emerald-500/5' : ''
            }`}
          >
            {/* Header: Ayah Meta & Actions */}
            <div className="flex items-center justify-between pb-3.5 mb-5 border-b border-[var(--border-subtle)] text-xs sm:text-sm text-[var(--text-muted)]">
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-800 dark:text-emerald-200 font-bold">
                  {event.surahNameEnglish} — {v.surahNumber}:{v.ayahNumber}
                </span>
                <span className="hidden sm:inline-block font-medium">
                  (ترتیبِ نزول #{event.chronologicalOrder})
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => {
                    if (isPlaying) pauseAudio();
                    else playAyah(v.surahNumber, v.ayahNumber, event.chronologicalOrder);
                  }}
                  className="p-2 rounded-xl hover:bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-emerald-700 transition-colors cursor-pointer"
                  title={isPlaying ? 'Pause Audio' : 'Play Ayah Audio'}
                >
                  {isPlaying ? <Pause className="w-4 h-4 text-emerald-600" /> : <Play className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => handleCopy(v)}
                  className="p-2 rounded-xl hover:bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-emerald-700 transition-colors cursor-pointer"
                  title="Copy Citation"
                >
                  {copiedAyah === v.ayahNumber ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
                <button
                  onClick={() =>
                    toggleBookmark({
                      eventOrder: event.chronologicalOrder,
                      surahNumber: v.surahNumber,
                      surahName: event.surahNameEnglish,
                      ayahNumber: v.ayahNumber,
                      ayahRangeText: `${v.surahNumber}:${v.ayahNumber}`,
                    })
                  }
                  className={`p-2 rounded-xl hover:bg-[var(--bg-surface)] transition-colors cursor-pointer ${
                    bookmarked ? 'text-emerald-600' : 'text-[var(--text-secondary)] hover:text-emerald-600'
                  }`}
                  title="Bookmark Ayah"
                >
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Arabic Text with Tashkeel */}
            <div className="mb-5">
              <p
                className="font-arabic text-[var(--text-primary)]"
                style={{
                  fontFamily: typography.arabicFont,
                  fontSize: `${typography.arabicFontSize}px`,
                  lineHeight: typography.lineHeight,
                }}
              >
                {v.textArabic}
                <span className="ayah-end-glyph">
                  <span>۝</span>
                  <span className="text-xs font-sans">{v.ayahNumber}</span>
                </span>
              </p>
            </div>

            {/* Urdu Translation */}
            {typography.showUrdu && (
              <div className="pt-3 border-t border-[var(--border-subtle)]">
                <p
                  className="font-urdu text-[var(--text-primary)]"
                  style={{
                    fontFamily: typography.urduFont,
                    fontSize: `${typography.translationFontSize}px`,
                    lineHeight: typography.lineHeight,
                  }}
                >
                  {getUrduText(v)}
                </p>
              </div>
            )}

            {/* English Translation */}
            {typography.showEnglish && (
              <div className="pt-3">
                <p
                  className="font-english text-[var(--text-secondary)] leading-relaxed"
                  style={{
                    fontSize: `${Math.max(16, typography.translationFontSize - 2)}px`,
                  }}
                >
                  {getEnglishText(v)}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
