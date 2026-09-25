export interface Reciter {
  id: string;
  folder: string;
  nameEn: string;
  nameUr: string;
  nameAr: string;
}

export const RECITERS: Reciter[] = [
  {
    id: 'alafasy',
    folder: 'Alafasy_128kbps',
    nameEn: 'Mishari Rashid Alafasy',
    nameUr: 'مشاری راشد العفاسی',
    nameAr: 'مشاري بن راشد العفاسي',
  },
  {
    id: 'abdulbasit',
    folder: 'Abdul_Basit_Murattal_192kbps',
    nameEn: 'Abdul Basit Murattal',
    nameUr: 'عبدالباسط عبدالصمد',
    nameAr: 'عبد الباسط عبد الصمد',
  },
  {
    id: 'sudais',
    folder: 'Saood_ash-Shuraym_128kbps',
    nameEn: 'Saud Ash-Shuraym',
    nameUr: 'سعود الشریم',
    nameAr: 'سعود الشريم',
  },
  {
    id: 'husary',
    folder: 'Husary_128kbps',
    nameEn: 'Mahmoud Khalil Al-Husary',
    nameUr: 'محمود خلیل الحصری',
    nameAr: 'محمود خليل الحصري',
  },
  {
    id: 'ayyoub',
    folder: 'Muhammad_Ayyoub_128kbps',
    nameEn: 'Muhammad Ayyoub',
    nameUr: 'محمد ایوب',
    nameAr: 'محمد أيوب',
  },
];

export const DEFAULT_RECITER_ID = 'alafasy';

export function getAyahAudioUrl(surah: number, ayah: number, reciterId: string = DEFAULT_RECITER_ID): string {
  const reciter = RECITERS.find((r) => r.id === reciterId) || RECITERS[0];
  const s = String(surah).padStart(3, '0');
  const a = String(ayah).padStart(3, '0');
  return `https://everyayah.com/data/${reciter.folder}/${s}${a}.mp3`;
}
