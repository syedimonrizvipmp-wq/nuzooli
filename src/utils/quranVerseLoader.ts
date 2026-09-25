import { Verse } from '@/types/quran';
import { getAyahAudioUrl } from '@/data/reciters';

// In-memory cache for loaded Surah verses to make navigation instant
const surahCache = new Map<number, Verse[]>();

export async function loadSurahVerses(surahNumber: number): Promise<Verse[]> {
  // 1. Check cache first (only return if non-empty)
  if (surahCache.has(surahNumber)) {
    const cached = surahCache.get(surahNumber)!;
    if (cached && cached.length > 0) {
      return cached;
    }
  }

  try {
    const response = await fetch(`/quran/surah-${surahNumber}.json`);
    if (!response.ok) {
      throw new Error(`Failed to load surah-${surahNumber}.json`);
    }

    const rawData = await response.json();
    if (!Array.isArray(rawData)) {
      throw new Error(`Invalid data format for surah-${surahNumber}`);
    }

    const verses: Verse[] = rawData.map((item: any) => ({
      surahNumber: item.surah,
      ayahNumber: item.ayah,
      textArabic: item.arabic || '',
      translationUrdu: item.urdu_jawadi || item.ur_jalandhry || '',
      translationUrduNajafi: item.ur_najafi,
      translationUrduJalandhry: item.ur_jalandhry,
      translationEnglish: item.english_qarai || item.en_khattab || item.en_sahih || '',
      translationEnglishQarai: item.english_qarai,
      translationEnglishKhattab: item.en_khattab,
      audioAyahUrl: getAyahAudioUrl(item.surah, item.ayah),
    }));

    surahCache.set(surahNumber, verses);
    return verses;
  } catch (error) {
    console.error(`Error loading verses for surah ${surahNumber}:`, error);
    // Return empty array or cached partial
    return surahCache.get(surahNumber) || [];
  }
}
