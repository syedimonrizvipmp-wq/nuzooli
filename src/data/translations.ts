export interface TranslationOption {
  id: string;
  name: string;
  nameUrdu: string;
  translator: string;
  lang: 'ur' | 'en';
  tradition: 'shia' | 'general' | 'sunni';
}

export const URDU_TRANSLATORS: TranslationOption[] = [
  {
    id: 'jawadi',
    name: 'Allamah Jawadi',
    nameUrdu: 'علامہ ذیشان حیدر جوادی',
    translator: 'Allamah Zeeshan Haider Jawadi',
    lang: 'ur',
    tradition: 'shia',
  },
  {
    id: 'najafi',
    name: 'Ayatollah Najafi',
    nameUrdu: 'آیت اللہ سید صفدر حسین نجفی',
    translator: 'Ayatollah Syed Safdar Hussain Najafi',
    lang: 'ur',
    tradition: 'shia',
  },
  {
    id: 'jalandhry',
    name: 'Jalandhry',
    nameUrdu: 'مولانا فتح محمد جالندھری',
    translator: 'Maulana Fateh Muhammad Jalandhary',
    lang: 'ur',
    tradition: 'general',
  },
];

export const ENGLISH_TRANSLATORS: TranslationOption[] = [
  {
    id: 'qarai',
    name: 'Ali Quli Qara\'i',
    nameUrdu: 'علی قلی قرائی',
    translator: 'Ali Quli Qara\'i (Renowned Shia Exegesis)',
    lang: 'en',
    tradition: 'shia',
  },
  {
    id: 'khattab',
    name: 'The Clear Quran',
    nameUrdu: 'دی کلیئر قرآن (ڈاکٹر خطاب)',
    translator: 'Dr. Mustafa Khattab',
    lang: 'en',
    tradition: 'general',
  },
  {
    id: 'sahih',
    name: 'Sahih International',
    nameUrdu: 'صحیح انٹرنیشنل',
    translator: 'Sahih International',
    lang: 'en',
    tradition: 'sunni',
  },
];
