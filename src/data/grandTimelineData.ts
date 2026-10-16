// Universal Islamic & Quranic Chronology Catalog
// Sourced from Shia historical and exegetical authorities:
// Al-Tamhid fi Ulum al-Quran (Ayatollah Hadi Ma'rifat), Tafsir al-Mizan (Allamah Tabataba'i),
// Majma' al-Bayan (Shaykh Tabarsi), Tarikh al-Ya'qubi, Kitab al-Irshad (Shaykh al-Mufid)

import { AHLULBAYT_IMAMAT_NODES } from './ahlulbaytImamsData';
import { FATRAH_SUCCESSOR_NODES } from './divineSuccessorsData';
export { AHLULBAYT_IMAMAT_NODES, FATRAH_SUCCESSOR_NODES };

export type TimelineCategory = 
  | 'prophet' 
  | 'quranic_surah' 
  | 'historical_milestone' 
  | 'infallible_imam';

export type PropheticBranch = 
  | 'direct_adam' 
  | 'shem' 
  | 'ismail' 
  | 'isaac' 
  | 'ahlulbayt' 
  | 'other_prophet';

export interface CalendarDates {
  yearAamAlFeel?: number;          // 1 to 53 Aam al-Feel
  yearBiThat?: number;             // 1 to 13 Bi'that
  yearBeforeHijra?: number;        // e.g. 13 BH
  yearHijri?: number;              // 1 to 1447+ AH
  yearCE: number;                  // Negative for BCE, positive for CE
  isBCE: boolean;
  lunarMonthUrdu?: string;         // رجب، رمضان، ذوالحجہ، etc.
  dayOfMonth?: number;
  approximateYearsAgo: number;     // Dynamically computed relative to current year (2026 CE)
}

export interface QuranicMetadata {
  mushafSurahNumber?: number;
  chronologicalSurahNumber?: number;
  verseRange?: { fromVerse: number; toVerse: number };
  totalVerses?: number;
  revelationPeriod?: 'Early Meccan' | 'Late Meccan' | 'Medinan';
  keyVerses?: {
    arabic: string;
    translationUrdu: string;
    reference: string;
  }[];
}

export interface ImamateMetadata {
  imamNumber?: number;                    // 1 to 12 (0 for Sayyida Fatima)
  titleHonorificUrdu: string;             // مثلاً امیر المؤمنین، المجتبیٰ، سید الشہداء، باقر العلوم
  motherNameUrdu: string;                 // والدہ ماجدہ کا نام و تعارف
  spousesUrdu: string[];                  // ازواجِ مطہرات
  childrenUrdu: {
    sons: string[];
    daughters: string[];
  };
  totalAgeYears: number;                  // کل عمر مبارک
  imamateDurationYears?: number;          // کل مدتِ امامت
  contemporaryRulersUrdu: string[];       // اس دور کے اموی / عباسی سلاطین
  transitionFromPreviousUrdu: string;     // ماقبل امام سے ورثہ و انتقالِ امامت کا تاریخی تسلسل
  transitionToNextUrdu: string;           // اگلے امام کے لیے وصیت، نصوص، اور اگلی تیاری
  sacredWritingsOrLegaciesUrdu: string[]; // اہم صحیفے، دعائیں، خطبات، اور کتب
  shrineLocationUrdu: string;             // مدفن و مزارِ اقدس
}

export interface SuccessorPerson {
  nameUrdu: string;
  titleOrRoleUrdu: string;
  historicalPeriodUrdu?: string;
  notesUrdu: string;
}

export interface FatrahMetadata {
  gapNumber: number;                          // ۱ تا ۵
  periodNameUrdu: string;                     // مثلاً عہدِ ہبۃ اللہ و اوصیاءِ مستورین
  durationYearsUrdu: string;                  // مثلاً تقریباً ۱۰۰۰ تا ۱۵۰۰ سال
  causeOfConcealmentUrdu: string;             // سببِ استتار و تقیہ
  successorsList: SuccessorPerson[];          // نام بہ نام اوصیاء کی مفصل زنجیر
  totalSuccessorsCount: number;               // کل اوصیاء کی تعداد
  awaitedSaviorUrdu: string;                  // بشارتِ نجات دہندہ
  philosophicalWisdomUrdu: string;            // امتحان، تمحیص، اور کائناتی توازن
  contemporaryConnectionToGhaybahUrdu: string;// دورِ حاضر کی غیبتِ کبریٰ سے کلامی مماثلت
  sacredScripturesOrRelicsUrdu: string[];     // مواریث، صحف، تابوت، عصا، وغیرہ
}

export interface GrandTimelineNode {
  id: string;
  stepNumber: number;
  category: TimelineCategory | 'fatrah_period' | 'divine_successor';
  epochTab: 'prophets' | 'prophetic_quran' | 'ahlulbayt' | 'fatrah_successors';
  
  // Titles & Identity
  titleUrdu: string;
  titleArabic: string;
  titleEnglish: string;
  subtitleUrdu?: string;
  
  // Genealogy & Ancestry ("کون کس کی اولاد میں سے ہے")
  fatherNameUrdu?: string;
  paternalLineageUrdu?: string;    // Full ancestry chain (e.g. نوح بن لمک بن متوشلح...)
  lineageHighlightUrdu?: string;   // High-level lineage group (e.g. "شاخِ حضرت اسماعیلؑ (بنو ہاشم)")
  branch?: PropheticBranch;
  parentFigureId?: string;
  
  // Synchronized Calendars
  dates: CalendarDates;
  
  // Quranic Connection
  quranicMetadata?: QuranicMetadata;

  // Imamate & Infallible Lineage Profile (for Tab 3)
  imamateMetadata?: ImamateMetadata;

  // Fatrah Periods & Divine Successors Profile (for Tab 4/5)
  fatrahMetadata?: FatrahMetadata;
  
  // Location & Context
  locationUrdu: string;
  colorCode: string;
  
  // Detailed Historical Narrative
  summaryUrdu: string;
  detailedNarrativeUrdu: string[];
  pedagogicalTakeaways: string[];
  sources: string[];
}

// Current Year Baseline
export const CURRENT_REFERENCE_YEAR_CE = 2026;

// Helper to calculate exact years ago from CE / BCE
export const computeYearsAgo = (yearCE: number, isBCE: boolean): number => {
  if (isBCE) {
    return CURRENT_REFERENCE_YEAR_CE + Math.abs(yearCE);
  }
  return CURRENT_REFERENCE_YEAR_CE - yearCE;
};

// ============================================================================
// TAB 1: سلسلۂ نبوت و شجرۂ طیبہ (Creation / Adam to Holy Prophet)
// ============================================================================
export const PROPHETIC_LINEAGE_NODES: GrandTimelineNode[] = [
  {
    id: 'prophet-adam',
    stepNumber: 1,
    category: 'prophet',
    epochTab: 'prophets',
    titleUrdu: 'حضرت آدم علیہ السلام (ابو البشر و صفی اللہ)',
    titleArabic: 'آدم عليه السلام (صفوة الله)',
    titleEnglish: 'Prophet Adam (Peace Be Upon Him)',
    subtitleUrdu: 'تخلیقِ انسانیت اور زمین پر پہلے خلیفۂ الٰہی',
    paternalLineageUrdu: 'بلا واسطہ دستِ قدرتِ الٰہی سے مٹی سے تخلیق (ابو البشر)',
    lineageHighlightUrdu: 'مبدائے انسانیت و اولین نبی و حجتِ خدا',
    branch: 'direct_adam',
    dates: {
      yearCE: -5800,
      isBCE: true,
      approximateYearsAgo: computeYearsAgo(-5800, true),
      lunarMonthUrdu: 'جمعہ کا مبارک دن',
    },
    locationUrdu: 'جنت تا کوہِ سراندیپ (سری لنکا) و مکۂ مکرمہ',
    colorCode: '#059669',
    summaryUrdu: 'اللہ تعالیٰ نے مٹی سے تخلیق فرما کر اسماء کی تعلیم دی، فرشتوں سے سجدہ کرایا اور زمین پر اپنی پہلی حجت و نبی مقرر فرمایا۔',
    detailedNarrativeUrdu: [
      'قرآن مجید کے مطابق اللہ تعالیٰ نے فرشتوں سے فرمایا: "إِنِّي جَاعِلٌ فِي الْأَرْضِ خَلِيفَةً" (میں زمین میں اپنا خلیفہ بنانے والا ہوں)۔',
      'حضرت آدمؑ کو تمام کائنات کے اسماء اور حقائق کی تعلیم دی گئی جس کے سامنے ملائکہ نے اپنی عاجزی کا اعتراف کیا۔',
      'ابلیس نے تکبر کرتے ہوئے سجدے سے انکار کیا اور بارگاہِ الٰہی سے راندۂ درگاہ ہوا۔',
      'زمین پر ہبوط کے بعد حضرت آدمؑ نے کعبۃ اللہ کی پہلی بنیاد رکھی اور بارگاہِ خداوندی میں توبہ کے کلمات (بواسطۂ انوارِ پنجتن پاکؑ) پیش کیے جو قبول ہوئے۔'
    ],
    pedagogicalTakeaways: [
      'انسانیت کا آغاز جہالت سے نہیں بلکہ علمِ اسماء اور نبوت و ہدایت سے ہوا۔',
      'تکبر و حسد (ابلیس کا عمل) انسان کی ابدی ہلاکت کا سبب بنتا ہے۔',
      'توبہ اور توسلِ الٰہی نجات کا اولین ذریعہ ہیں۔'
    ],
    sources: ['نہج البلاغہ (خطبہ اول)', 'تفسیر المیزان (سورۃ البقرہ: ۳۰-۳۷)', 'تاریخ یعقوبی (جلد اول)'],
  },
  {
    id: 'habil-qabil',
    stepNumber: 2,
    category: 'historical_milestone',
    epochTab: 'prophets',
    titleUrdu: 'ہابیل و قابیل (قربانی اور مظلومیت کی داستان)',
    titleArabic: 'هابيل وقابيل',
    titleEnglish: 'Habil and Qabil (Abel and Cain)',
    subtitleUrdu: 'روئے زمین پر حق و باطل کا پہلا معرکہ اور پہلا قتل',
    fatherNameUrdu: 'حضرت آدم علیہ السلام',
    paternalLineageUrdu: 'فرزندانِ حضرت آدم علیہ السلام و ام البشر حواؑ',
    lineageHighlightUrdu: 'نسلِ آدمؑ کی پہلی اولاد',
    branch: 'direct_adam',
    parentFigureId: 'prophet-adam',
    dates: {
      yearCE: -5600,
      isBCE: true,
      approximateYearsAgo: computeYearsAgo(-5600, true),
    },
    locationUrdu: 'وادیِ مکہ / جبلِ قاسیون (دمشق کے نواح)',
    colorCode: '#DC2626',
    summaryUrdu: 'ہابیل کی تقویٰ پر مبنی قربانی بارگاہِ الٰہی میں قبول ہوئی جبکہ قابیل نے حسد کی آگ میں اندھے ہو کر اپنے بے گناہ بھائی کو قتل کر دیا۔',
    detailedNarrativeUrdu: [
      'قرآن مجید میں ارشاد ہے: "إِنَّمَا يَتَقَبَّلُ اللَّهُ مِنَ الْمُتَّقِينَ" (اللہ صرف پرہیزگاروں کی قربانی قبول فرماتا ہے)۔',
      'ہابیل نے اپنے بھائی سے کہا: "اگر تو مجھے قتل کرنے کے لیے ہاتھ بڑھائے گا تب بھی میں تجھے قتل کرنے کے لیے ہاتھ نہیں اٹھاؤں گا، کیونکہ میں پروردگارِ عالم سے ڈرتا ہوں"۔',
      'قابیل کے نفس نے اس کے لیے بھائی کے قتل کو آسان کر دیا اور روئے زمین پر پہلا خونِ ناحق بہا دیا گیا، پھر ایک کوّے کے ذریعے دفنانے کا طریقہ سکھایا گیا۔'
    ],
    pedagogicalTakeaways: [
      'قبولیتِ عمل کا معیار مال کی کثرت نہیں بلکہ دل کا خلوص و تقویٰ ہے۔',
      'حسد انسان کو اپنے سگے بھائی کے قتل پر آمادہ کر دیتا ہے۔',
      'مظلومیت کے راستے پر قائم رہنا انبیاء اور صالحین کا شیوہ ہے۔'
    ],
    sources: ['قرآن مجید (سورۃ المائدہ: ۲۷-۳۱)', 'تفسیر مجمع البیان', 'علل الشرائع (شیخ صدوق)'],
  },
  {
    id: 'prophet-sheeth',
    stepNumber: 3,
    category: 'prophet',
    epochTab: 'prophets',
    titleUrdu: 'حضرت شیث علیہ السلام (ہبۃ اللہ و وصیِ آدم)',
    titleArabic: 'شيث عليه السلام (هبة الله وصي آدم)',
    titleEnglish: 'Prophet Seth (Peace Be Upon Him)',
    subtitleUrdu: 'ہابیل کے بعد نسلِ انبیاء کے امین اور صحیفوں کے حامل',
    fatherNameUrdu: 'حضرت آدم علیہ السلام',
    paternalLineageUrdu: 'شیث بن آدم علیہ السلام (ہبۃ اللہ)',
    lineageHighlightUrdu: 'سلسلۂ انبیاء اور شجرۂ طیبہ کے اولین والد',
    branch: 'direct_adam',
    parentFigureId: 'prophet-adam',
    dates: {
      yearCE: -5500,
      isBCE: true,
      approximateYearsAgo: computeYearsAgo(-5500, true),
    },
    locationUrdu: 'مکہ مکرمہ و نجف اشرف (وادیِ غری)',
    colorCode: '#0D9488',
    summaryUrdu: 'ہابیل کی شہادت کے بعد اللہ نے حضرت آدمؑ کو شیث عطا فرمائے، جن پر ۵۰ آسمانی صحیفے نازل ہوئے اور وصایت و نبوت کا سلسلہ ان کی نسل سے چلا۔',
    detailedNarrativeUrdu: [
      'روایات کے مطابق حضرت آدمؑ نے بوقتِ رحلت اپنا وصی و جانشین حضرت شیثؑ کو مقرر فرمایا اور اسمِ اعظم اور نورِ نبوت ان کے سپرد کیا۔',
      'ان کی اولاد "بنو شیث" پہاڑوں کے دامن میں پاکیزہ اور موحدانہ زندگی بسر کرتی رہی، جبکہ قابیل کی نسل نیچے وادیوں میں گمراہی میں مبتلا ہوئی۔',
      'تمام آنے والے جلیل القدر انبیاء (نوحؑ، ابراہیمؑ، موسیٰؑ، عیسیٰؑ اور حضرت محمد مصطفیٰؐ) حضرت شیثؑ ہی کی پاک نسل سے ہیں۔'
    ],
    pedagogicalTakeaways: [
      'وصایت و جانشینیِ الٰہی تخلیق کے آغاز سے جاری ایک ناگزیر الٰہی سنت ہے۔',
      'حق کا سلسلہ ظالموں کے ظلم کے باوجود کبھی منقطع نہیں ہوتا۔'
    ],
    sources: ['کمال الدین و تمام النعمۃ (شیخ صدوق)', 'تاریخ طبری', 'بحار الانوار (جلد ۱۱)'],
  },
  {
    id: 'prophet-idris',
    stepNumber: 4,
    category: 'prophet',
    epochTab: 'prophets',
    titleUrdu: 'حضرت ادریس علیہ السلام (اخنوخ — صاحبِ قلم و فلکیات)',
    titleArabic: 'إدريس عليه السلام (أخنوخ)',
    titleEnglish: 'Prophet Idris / Enoch (Peace Be Upon Him)',
    subtitleUrdu: 'پہلے انسان جنہوں نے قلم سے لکھا اور کپڑا سلائی کیا',
    fatherNameUrdu: 'یارد بن مہلائیل',
    paternalLineageUrdu: 'ادریس بن یارد بن مہلائیل بن قینان بن انوش بن شیث بن آدم علیہ السلام',
    lineageHighlightUrdu: 'حضرت شیثؑ کی پانچویں پشت میں جلیل القدر رسول',
    branch: 'direct_adam',
    parentFigureId: 'prophet-sheeth',
    dates: {
      yearCE: -4500,
      isBCE: true,
      approximateYearsAgo: computeYearsAgo(-4500, true),
    },
    locationUrdu: 'بابل (عراق) تا مسجدِ سہلہ (کوفہ)',
    colorCode: '#2563EB',
    summaryUrdu: 'قرآن نے انہیں صدیق اور صابر فرمایا۔ وہ علمِ خطاطی، فلکیات اور سلائی کے موجد تھے، اور اللہ تعالیٰ نے انہیں بلند مقام پر اٹھا لیا۔',
    detailedNarrativeUrdu: [
      'قرآن مجید میں ارشاد ہے: "وَاذْكُرْ فِي الْكِتَابِ إِدْرِيسَ إِنَّهُ كَانَ صِدِّيقًا نَّبِيًّا * وَرَفَعْنَاهُ مَكَانًا عَلِيًّا" (سورۃ مریم: ۵۶-۵۷)۔',
      'حضرت ادریسؑ نے علمِ نجوم، طب، حساب اور شہروں کی تعمیر کی بنیاد رکھی اور توحید کی تعلیم دی۔',
      'مسجدِ سہلہ میں حضرت ادریسؑ کا مقامِ عبادت آج بھی زائرین کے لیے زیارت گاہ ہے۔'
    ],
    pedagogicalTakeaways: [
      'علم، قلم اور ٹیکنالوجی کی بنیاد انبیاء کی الہامی تعلیمات سے شروع ہوئی۔',
      'سچائی اور تقویٰ انسان کو آسمانی بلندیوں پر سرفراز کرتا ہے۔'
    ],
    sources: ['قرآن مجید (سورۃ مریم: ۵۶-۵۷)', 'قصص الانبیاء (راوندی)', 'تفسیر علی بن ابراہیم قمی'],
  },
  {
    id: 'prophet-nooh',
    stepNumber: 5,
    category: 'prophet',
    epochTab: 'prophets',
    titleUrdu: 'حضرت نوح علیہ السلام (شیخ الانبیاء و اولو العزم رسول)',
    titleArabic: 'نوح عليه السلام (شيخ الأنبياء)',
    titleEnglish: 'Prophet Noah (Peace Be Upon Him)',
    subtitleUrdu: '۹۵۰ سالہ مسلسل تبلیغ، سفینۂ نجات اور دوسرا جنمِ انسانیت',
    fatherNameUrdu: 'لمک بن متوشلح',
    paternalLineageUrdu: 'نوح بن لمک بن متوشلح بن ادریس بن یارد بن مہلائیل بن قینان بن انوش بن شیث بن آدم علیہ السلام',
    lineageHighlightUrdu: 'پہلے صاحبِ شریعت اولو العزم رسول — ابو البشرِ ثانی',
    branch: 'shem',
    parentFigureId: 'prophet-idris',
    dates: {
      yearCE: -3500,
      isBCE: true,
      approximateYearsAgo: computeYearsAgo(-3500, true),
    },
    locationUrdu: 'بین النہرین (میسوپوٹیمیا / عراق) تا کوہِ جودی',
    colorCode: '#0284C7',
    summaryUrdu: 'ساڑھے نو سو سال رات دن قوم کو توحید کی دعوت دی، سفینہ تعمیر کیا، طوفان کے بعد تمام روئے زمین کے انسان ان کے تین بیٹوں (سام، حام، یافث) کی نسل سے پھیلے۔',
    detailedNarrativeUrdu: [
      'قرآن مجید نے سورۃ نوح، ہود، اور الاعراف میں ان کی استقامت کو خراجِ تحسین پیش کیا ہے۔',
      'جب قوم کی سرکشی حد سے بڑھ گئی اور انہوں نے بتوں (ود، سواع، یغوث، یعوق اور نسر) کی پرستش نہ چھوڑی تو حکمِ خدا سے کشتی بنائی گئی۔',
      'حضرت نوحؑ کا نافرمان بیٹا کنعان کفر کی وجہ سے غرق ہوا، جس پر اللہ نے فرمایا: "إِنَّهُ لَيْسَ مِنْ أَهْلِكَ إِنَّهُ عَمَلٌ غَيْرُ صَالِحٍ"۔',
      'طوفان کے بعد حضرت نوحؑ کے صاحبزادے حضرت سام بن نوح کے سلسلے سے تمام انبیائے سامی (عرب و عجم) کا ظہور ہوا۔'
    ],
    pedagogicalTakeaways: [
      'نسبی تعلق عقیدے اور عمل کے بغیر نجات کا ضامن نہیں بن سکتا۔',
      'دعوتِ حق میں صدیوں کی صبر آزما استقامت انبیاء کا اسوہ ہے۔',
      'اہل بیتؑ کی محبت و ولایت کو رسول اللہؐ نے "سفینۂ نوح" سے تشبیہ دی۔'
    ],
    sources: ['قرآن مجید (سورۃ ہود، سورۃ نوح)', 'تفسیر المیزان', 'الارشاد (شیخ مفید)'],
  },
  {
    id: 'prophet-hud',
    stepNumber: 6,
    category: 'prophet',
    epochTab: 'prophets',
    titleUrdu: 'حضرت ہود علیہ السلام (پیغمبرِ قومِ عاد)',
    titleArabic: 'هود عليه السلام (نبي عاد)',
    titleEnglish: 'Prophet Hud (Peace Be Upon Him)',
    subtitleUrdu: 'احقاف کے ریگستانوں اور ارم ذات العماد کے سرکشوں کے ناصح',
    fatherNameUrdu: 'شالح / عبد اللہ بن عابر',
    paternalLineageUrdu: 'ہود بن شالح بن ارفخشد بن سام بن نوح علیہ السلام',
    lineageHighlightUrdu: 'سام بن نوح کی نسل کے اولین عرب نبی (انبیاءِ عرب)',
    branch: 'shem',
    parentFigureId: 'prophet-nooh',
    dates: {
      yearCE: -2500,
      isBCE: true,
      approximateYearsAgo: computeYearsAgo(-2500, true),
    },
    locationUrdu: 'احقاف (حضرموت، یمن و عمان کے درمیان) و وادی السلام (نجف)',
    colorCode: '#D97706',
    summaryUrdu: 'قومِ عاد اپنے جسمانی قد و قامت اور بلند محلات پر نازاں تھی۔ حضرت ہودؑ نے توحید کی دعوت دی، انکار پر خوفناک تیز و تند ہوا کے عذاب نے انہیں جڑ سے اکھاڑ دیا۔',
    detailedNarrativeUrdu: [
      'قرآن مجید میں ارشاد ہے: "أَتَبْنُونَ بِكُلِّ رِيعٍ آيَةً تَعْبَثُونَ * وَتَتَّخِذُونَ مَصَانِعَ لَعَلَّكُمْ تَخْلُدُونَ"۔',
      'قومِ عاد نے غرور میں آ کر کہا: "ہم سے زیادہ طاقتور کون ہے؟"',
      'اللہ تعالیٰ نے سات راتیں اور آٹھ دن مسلسل منجمد کر دینے والی آندھی کا عذاب بھیجا جس نے سرکشوں کو کھجور کے کھوکھلے تنوں کی طرح گرا دیا۔',
      'حضرت ہودؑ اور اہل ایمان محفوظ رہے اور ان کا مزارِ اقدس نجف اشرف میں واقع ہے۔'
    ],
    pedagogicalTakeaways: [
      'مادی طاقت اور عسکری غرور اللہ کے قہر کے سامنے ریت کا ڈھیر ہے۔',
      'خدا کی دی ہوئی نعمتوں کو ظلم و جبر کا آلہ کار بنانا ہلاکت کا پیش خیمہ ہے۔'
    ],
    sources: ['قرآن مجید (سورۃ الاعراف، ہود، الشعراء)', 'مروج الذہب (مسعودی)'],
  },
  {
    id: 'prophet-salih',
    stepNumber: 7,
    category: 'prophet',
    epochTab: 'prophets',
    titleUrdu: 'حضرت صالح علیہ السلام (پیغمبرِ قومِ ثمود)',
    titleArabic: 'صالح عليه السلام (نبي ثمود)',
    titleEnglish: 'Prophet Salih (Peace Be Upon Him)',
    subtitleUrdu: 'پہاڑوں کو تراشنے والی قوم اور ناقۃ اللہ (معجزاتی اونٹنی)',
    fatherNameUrdu: 'عبید بن اسف',
    paternalLineageUrdu: 'صالح بن عبید بن اسف بن ماشخ بن عبید بن حاذر بن ثمود بن عاثر بن ارم بن سام بن نوحؑ',
    lineageHighlightUrdu: 'سام بن نوحؑ کی نسل سے قومِ ثمود کے ہادی',
    branch: 'shem',
    parentFigureId: 'prophet-nooh',
    dates: {
      yearCE: -2100,
      isBCE: true,
      approximateYearsAgo: computeYearsAgo(-2100, true),
    },
    locationUrdu: 'مدائن صالح / الحجر (شمالی حجاز و تبوک کا راستہ) و نجف اشرف',
    colorCode: '#B45309',
    summaryUrdu: 'پہاڑوں کو کاٹ کر قلعے بنانے والی قوم نے معجزہ مانگا۔ پہاڑ سے اونٹنی برآمد ہوئی، لیکن بدبخت قدار بن سالف نے اس کی کونچیں کاٹ دیں اور چنگھاڑ کے عذاب سے وہ فنا ہو گئے۔',
    detailedNarrativeUrdu: [
      'قرآن نے فرمایا: "هَٰذِهِ نَاقَةُ اللَّهِ لَكُمْ آيَةً فَذَرُوهَا تَأْكُلْ فِي أَرْضِ اللَّهِ وَلَا تَمَسُّوهَا بِسُوءٍ"۔',
      'قوم کے سب سے بڑے شقی قدار بن سالف نے ناقہ کو قتل کیا۔',
      'امیر المؤمنین حضرت علیؑ نے فرمایا: "ناقۂ صالح کو تو صرف ایک شخص نے مارا تھا لیکن عذاب پوری قوم پر اس لیے آیا کہ وہ سب اس کے عمل پر راضی تھے"۔'
    ],
    pedagogicalTakeaways: [
      'ظالم کے ظلم پر خاموشی اور رضامندی بھی انسان کو اسی جرم کا شریک بنا دیتی ہے۔',
      'شعائرِ الٰہی کی توہین اجتماعی عذاب کو دعوت دیتی ہے۔'
    ],
    sources: ['قرآن مجید (سورۃ الشمس، الاعراف، ہود)', 'نہج البلاغہ (خطبہ ۲۰۱)'],
  },
  {
    id: 'prophet-ibrahim',
    stepNumber: 8,
    category: 'prophet',
    epochTab: 'prophets',
    titleUrdu: 'حضرت ابراہیم علیہ السلام (خلیل اللہ و امامِ انس و جاں)',
    titleArabic: 'إبراهيم عليه السلام (خليل الله وإمام الناس)',
    titleEnglish: 'Prophet Abraham (Peace Be Upon Him)',
    subtitleUrdu: 'بت شکنی، نمرودی آگ کا گلزار بننا، اور امامتِ کائنات',
    fatherNameUrdu: 'تارخ (اور چچا آزر)',
    paternalLineageUrdu: 'ابراہیم بن تارخ بن ناحور بن ساروغ بن ارغو بن فالغ بن عابر بن شالح بن ارفخشد بن سام بن نوحؑ',
    lineageHighlightUrdu: 'تمام ادیانِ توحید کے جدِ امجد — ابو الانبیاء',
    branch: 'direct_adam',
    parentFigureId: 'prophet-nooh',
    dates: {
      yearCE: -1900,
      isBCE: true,
      approximateYearsAgo: computeYearsAgo(-1900, true),
    },
    locationUrdu: 'اور (بابل / عراق) تا حران تا فلسطین تا وادیِ مکہ',
    colorCode: '#EAB308',
    summaryUrdu: 'امتحانات میں کامیابی کے بعد اللہ نے نبوت سے بلند مقام "امامت" عطا فرمایا۔ کعبہ تعمیر کیا، اور ان کی نسل سے دو عظیم شاخیں (اسماعیلؑ اور اسحاقؑ) جاری ہوئیں۔',
    detailedNarrativeUrdu: [
      'قرآن مجید فرماتا ہے: "وَإِذِ ابْتَلَىٰ إِبْرَاهِيمَ رَبُّهُ بِكَلِمَاتٍ فَأَتَمَّهُنَّ قَالَ إِنِّي جَاعِلُكَ لِلنَّاسِ إِمَامًا قَالَ وَمِن ذُرِّيَّتِي قَالَ لَا يَنَالُ عَهْدِي الظَّالِمِينَ" (سورۃ البقرہ: ۱۲۴)۔',
      'حضرت ابراہیمؑ نے نمرود کے بت توڑے، آگ میں ڈالے گئے تو آگ گل و گلزار بن گئی۔',
      'بیٹے اسماعیلؑ اور زوجہ ہاجرہؑ کو بے آب و گیاہ وادیِ مکہ میں بسایا اور کعبہ کی دیواریں بلند کیں۔',
      'ان کی اولاد سے بنی اسرائیل اور بنو ہاشم (سید الانبیاءؐ) پیدا ہوئے۔'
    ],
    pedagogicalTakeaways: [
      'امامت ایک ایسا الٰہی عہد ہے جو کبھی کسی ظالم یا مشرک تک نہیں پہنچ سکتا۔',
      'خلوص اور توکل کی بدولت نمرودی آتش بھی گلزار بن جاتی ہے۔'
    ],
    sources: ['قرآن مجید (سورۃ البقرہ، ابراہیم، الانعام)', 'تفسیر المیزان', 'خصال (شیخ صدوق)'],
  },
  {
    id: 'prophet-ismail',
    stepNumber: 9,
    category: 'prophet',
    epochTab: 'prophets',
    titleUrdu: 'حضرت اسماعیل علیہ السلام (ذبیح اللہ و بانیِ کعبہ)',
    titleArabic: 'إسماعيل عليه السلام (ذبيح الله)',
    titleEnglish: 'Prophet Ishmael (Peace Be Upon Him)',
    subtitleUrdu: 'چشمۂ زمزم، قربانیِ عظیم کا فدیہ، اور جدِ عربِ مستعربہ',
    fatherNameUrdu: 'حضرت ابراہیم علیہ السلام',
    paternalLineageUrdu: 'اسماعیل بن ابراہیم بن تارخ علیہما السلام (والدہ: حضرت ہاجرہؑ)',
    lineageHighlightUrdu: 'شاخِ بنو ہاشم و آلِ محمدؐ کے عظیم مورثِ اعلیٰ',
    branch: 'ismail',
    parentFigureId: 'prophet-ibrahim',
    dates: {
      yearCE: -1850,
      isBCE: true,
      approximateYearsAgo: computeYearsAgo(-1850, true),
    },
    locationUrdu: 'مکہ مکرمہ (حجرِ اسماعیل و کعبۃ اللہ)',
    colorCode: '#10B981',
    summaryUrdu: 'شیرخوارگی میں پیاس سے ایڑیاں رگڑیں تو زمزم پھوٹ پڑا۔ والد کے خواب پر سر تسلیم خم کیا تو ذبحِ عظیم کا فدیہ ملا۔ تعمیرِ کعبہ میں شریک رہے۔',
    detailedNarrativeUrdu: [
      'قرآن کا ارشاد ہے: "قَالَ يَا أَبَتِ افْعَلْ مَا تُؤْمَرُ سَتَجِدُنِي إِن شَاءَ اللَّهُ مِنَ الصَّابِرِينَ"۔',
      'حضرت اسماعیلؑ نے والد کے ہمراہ کعبہ کی بنیادیں اٹھائیں اور دعا مانگی: "رَبَّنَا وَابْعَثْ فِيهِمْ رَسُولًا مِّنْهُمْ" (پروردگارا! ان میں انہی میں سے ایک عظیم رسول بھیج)۔',
      'آپ کے بارہ بیٹے ہوئے جن میں قیدار بن اسماعیل سے قریش اور رسول اللہؐ کا پاک نسب جاری ہوا۔',
      'آپ کا مزارِ اقدس مطاف میں حجرِ اسماعیل (کعبہ کے پہلو) میں واقع ہے۔'
    ],
    pedagogicalTakeaways: [
      'تسلیم و رضا کی معراج یہ ہے کہ انسان راہِ خدا میں اپنی جان پیش کر دے۔',
      'حضرت اسماعیلؑ کی دعاؤں کا ثمرہ بعثتِ محمد مصطفیٰ صلی اللہ علیہ وآلہ وسلم ہے۔'
    ],
    sources: ['قرآن مجید (سورۃ الصافات: ۱۰۲-۱۰۷)', 'عیون اخبار الرضاؑ', 'تاریخ یعقوبی'],
  },
  {
    id: 'prophet-isaac',
    stepNumber: 10,
    category: 'prophet',
    epochTab: 'prophets',
    titleUrdu: 'حضرت اسحاق و حضرت یعقوب علیہما السلام (اسرائیل)',
    titleArabic: 'إسحاق ويعقوب عليهما السلام',
    titleEnglish: 'Prophets Isaac & Jacob / Israel (Peace Be Upon Them)',
    subtitleUrdu: 'شاخِ بنی اسرائیل کے اسباط اور بارہ قبیلوں کی بنیاد',
    fatherNameUrdu: 'حضرت ابراہیم علیہ السلام (حضرت اسحاقؑ کے والد)',
    paternalLineageUrdu: 'یعقوب بن اسحاق بن ابراہیم علیہما السلام (والدہ: حضرت سارہؑ)',
    lineageHighlightUrdu: 'شاخِ بنی اسرائیل کے جملہ انبیاء کے جدِ امجد',
    branch: 'isaac',
    parentFigureId: 'prophet-ibrahim',
    dates: {
      yearCE: -1800,
      isBCE: true,
      approximateYearsAgo: computeYearsAgo(-1800, true),
    },
    locationUrdu: 'کنعان (فلسطین / الخلیل) و شام',
    colorCode: '#8B5CF6',
    summaryUrdu: 'حضرت ابراہیمؑ کی بشارت کے تحت پیدا ہوئے۔ حضرت یعقوبؑ کے بارہ بیٹے اسباط کہلائے جن میں حضرت یوسفؑ اور لاوی (موسیٰؑ کے جد) شامل تھے۔',
    detailedNarrativeUrdu: [
      'قرآن فرماتا ہے: "وَوَهَبْنَا لَهُ إِسْحَاقَ وَيَعْقُوبَ نَافِلَةً وَكُلًّا جَعَلْنَا صَالِحِينَ"۔',
      'حضرت یعقوبؑ کا لقب "اسرائیل" (عبد اللہ) تھا اور ان کی اولاد "بنی اسرائیل" کہلائی۔',
      'فرزند یوسفؑ کی جدائی میں رو رو کر بینائی کھو دی لیکن صبرِ جمیل کا دامن نہ چھوڑا۔'
    ],
    pedagogicalTakeaways: [
      'صبرِ جمیل غم کی شدت میں بھی شکوۂ خدا سے زبان کو محفوظ رکھتا ہے۔'
    ],
    sources: ['قرآن مجید (سورۃ یوسف، الانبیاء)', 'تفسیر قمی'],
  },
  {
    id: 'prophet-yusuf',
    stepNumber: 11,
    category: 'prophet',
    epochTab: 'prophets',
    titleUrdu: 'حضرت یوسف علیہ السلام (صدیق و عزیزِ مصر)',
    titleArabic: 'يوسف عليه السلام (الصديق)',
    titleEnglish: 'Prophet Joseph (Peace Be Upon Him)',
    subtitleUrdu: 'احسن القصص، کنویں سے شاہی ایوان تک پاکدامنی کا سفر',
    fatherNameUrdu: 'حضرت یعقوب علیہ السلام',
    paternalLineageUrdu: 'یوسف بن یعقوب بن اسحاق بن ابراہیم علیہما السلام',
    lineageHighlightUrdu: 'شاخِ اسحاقؑ کے جلیل القدر رسول',
    branch: 'isaac',
    parentFigureId: 'prophet-isaac',
    dates: {
      yearCE: -1700,
      isBCE: true,
      approximateYearsAgo: computeYearsAgo(-1700, true),
    },
    locationUrdu: 'کنعان تا مصر',
    colorCode: '#A855F7',
    summaryUrdu: 'بھائیوں کے حسد سے کنویں میں ڈالے گئے، غلام بنے، قید خانے کی صعوبتیں کاٹیں لیکن عفت و پاکدامنی پر قائم رہے اور بالآخر مصر کے حکمران بنے۔',
    detailedNarrativeUrdu: [
      'قرآن مجید کی پوری سورۃ یوسف کو "احسن القصص" (سب سے خوبصورت داستان) قرار دیا گیا۔',
      'زلیخا کے فتنے کے سامنے فرمایا: "مَعَاذَ اللَّهِ إِنَّهُ رَبِّي أَحْسَنَ مَثْوَايَ"۔',
      'اقتدار پا کر اپنے خطا کار بھائیوں کو معاف کر دیا: "لَا تَثْرِيبَ عَلَيْكُمُ الْيَوْمَ يَغْفِرُ اللَّهُ لَكُمْ"۔'
    ],
    pedagogicalTakeaways: [
      'عفت و عصمت انسان کو قید خانے سے اٹھا کر عزت کے تخت پر بٹھا دیتی ہے۔',
      'انتقام کی طاقت رکھنے کے باوجود معاف کر دینا سیرتِ انبیاء ہے۔'
    ],
    sources: ['قرآن مجید (سورۃ یوسف)', 'تفسیر الصافی (فیض کاشانی)'],
  },
  {
    id: 'prophet-musa-haroon',
    stepNumber: 12,
    category: 'prophet',
    epochTab: 'prophets',
    titleUrdu: 'حضرت موسیٰ و حضرت ہارون علیہما السلام (کلیم اللہ)',
    titleArabic: 'موسى وهارون عليهما السلام (كليم الله)',
    titleEnglish: 'Prophets Moses & Aaron (Peace Be Upon Them)',
    subtitleUrdu: 'فرعون سے ٹکراؤ، دریائے نیل کا شق ہونا، اور کوہِ طور پر الواحِ تورات',
    fatherNameUrdu: 'عمران بن قہات بن لاوی',
    paternalLineageUrdu: 'موسیٰ بن عمران بن قہات بن لاوی بن یعقوب بن اسحاق بن ابراہیمؑ',
    lineageHighlightUrdu: 'بنی اسرائیل کے سب سے بڑے اولو العزم رسول',
    branch: 'isaac',
    parentFigureId: 'prophet-isaac',
    dates: {
      yearCE: -1300,
      isBCE: true,
      approximateYearsAgo: computeYearsAgo(-1300, true),
    },
    locationUrdu: 'مصر، بحرِ قلزم، صحرائے سینا، کوہِ طور',
    colorCode: '#3B82F6',
    summaryUrdu: 'فرعونی استبداد کے خلاف عصا اور یدِ بیضاء کے ساتھ اٹھے۔ دریا چیرا، فرعون غرق ہوا، اور تورات کے ذریعے شریعت عطا ہوئی۔ حضرت ہارونؑ ان کے وزیر و خلیفہ تھے۔',
    detailedNarrativeUrdu: [
      'حضرت موسیٰؑ نے دعا کی: "وَاجْعَل لِّي وَزِيرًا مِّنْ أَهْلِي * هَارُونَ أَخِي * اشْدُدْ بِهِ أَزْرِي"۔',
      'رسول اللہؐ نے حضرت علیؑ سے فرمایا: "أنتَ مِنّي بمَنزِلةِ هارونَ مِن موسى، إلّا أنّه لا نَبيَّ بَعدي" (حدیثِ منزلت)۔',
      'موسیٰؑ کی قوم نے بار بار بے وفائی کی اور بچھڑے کی پرستش میں مبتلا ہوئی۔'
    ],
    pedagogicalTakeaways: [
      'طاغوت کے محل میں رہ کر بھی انسان توحید پر قائم رہ سکتا ہے (آسیہ بنت مزاحمؑ کا اسوہ)۔',
      'جانشینی اور وزارت کا تعلق الٰہی منصب ہے جیسا کہ ہارونؑ موسیٰؑ کے خلیفہ تھے۔'
    ],
    sources: ['قرآن مجید (سورۃ طہ، القصص، الاعراف)', 'صحیح مسلم و بخاری (حدیث منزلت)'],
  },
  {
    id: 'prophet-dawood-sulaiman',
    stepNumber: 13,
    category: 'prophet',
    epochTab: 'prophets',
    titleUrdu: 'حضرت داؤد و حضرت سلیمان علیہما السلام (زبور و الٰہی سلطنت)',
    titleArabic: 'داود وسليمان عليهما السلام',
    titleEnglish: 'Prophets David & Solomon (Peace Be Upon Them)',
    subtitleUrdu: 'جالوت کا خاتمہ، پرندوں و جنات پر تسلط، اور بیت المقدس کی تعمیر',
    fatherNameUrdu: 'ایشا بن عوبید بن بوعز (داؤدؑ کے والد)',
    paternalLineageUrdu: 'سلیمان بن داؤد بن ایشا (یہودا بن یعقوب بن اسحاق بن ابراہیمؑ کی نسل سے)',
    lineageHighlightUrdu: 'بنی اسرائیل کے انبیاء و صاحبِ حکومت اولیاء',
    branch: 'isaac',
    parentFigureId: 'prophet-isaac',
    dates: {
      yearCE: -1000,
      isBCE: true,
      approximateYearsAgo: computeYearsAgo(-1000, true),
    },
    locationUrdu: 'یروشلم (القدس / بیت المقدس، فلسطین)',
    colorCode: '#6366F1',
    summaryUrdu: 'حضرت داؤدؑ کے لیے لوہا نرم ہوا اور زبور نازل ہوئی۔ حضرت سلیمانؑ کو ہواؤں، چرند پرند اور جنات پر فرمانروائی عطا ہوئی، جنہوں نے بیت المقدس تعمیر کرایا۔',
    detailedNarrativeUrdu: [
      'قرآن نے فرمایا: "وَوَرِثَ سُلَيْمَانُ دَاوُودَ وَقَالَ يَا أَيُّهَا النَّاسُ عُلِّمْنَا مَنطِقَ الطَّيْرِ وَأُوتِينَا مِن كُلِّ شَيْءٍ"۔',
      'ملکۂ سبا (بلقیس) نے ان کی توحیدی سلطنت کو دیکھ کر اسلام قبول کیا۔',
      'اہل بیتؑ نے انبیاء کے وراثت چھوڑنے پر اسی آیت سے استدلال فرمایا (خطبۂ فدکیہ حضرت فاطمۃ الزہراءؑ)۔'
    ],
    pedagogicalTakeaways: [
      'اقتدار اور حکومت اگر عدل و توحید کے لیے ہو تو وہ عین عبادت ہے۔',
      'انبیاء علم اور حکمت کے ساتھ ساتھ مال اور وراثت بھی چھوڑتے ہیں۔'
    ],
    sources: ['قرآن مجید (سورۃ النمل، ص، سبا)', 'احتجاج طبرسی (خطبہ فدک)'],
  },
  {
    id: 'prophet-isa',
    stepNumber: 14,
    category: 'prophet',
    epochTab: 'prophets',
    titleUrdu: 'حضرت عیسیٰ علیہ السلام بن مریم (کلمۃ اللہ و روح اللہ)',
    titleArabic: 'عيسى عليه السلام بن مريم (روح الله)',
    titleEnglish: 'Prophet Jesus son of Mary (Peace Be Upon Him)',
    subtitleUrdu: 'بن باپ ولادت، گہوارے میں تکلم، احیائے موتیٰ، اور رفعِ آسمانی',
    fatherNameUrdu: 'بلا باپ (بطنِ سیدہ مریم عذرا بنت عمران سے معجزاتی پیدائش)',
    paternalLineageUrdu: 'عیسیٰ بن مریم بنت عمران (سلسلہ: سلیمان و داؤد بن ایشا تا یہودا بن یعقوبؑ)',
    lineageHighlightUrdu: 'بنی اسرائیل کے آخری اولو العزم رسول اور انجیل کے حامل',
    branch: 'isaac',
    parentFigureId: 'prophet-isaac',
    dates: {
      yearCE: 1,
      isBCE: false,
      approximateYearsAgo: computeYearsAgo(1, false),
    },
    locationUrdu: 'بیت لحم و ناصرہ تا یروشلم (فلسطین)',
    colorCode: '#EC4899',
    summaryUrdu: 'معجزانہ طور پر پیدا ہوئے، مادر زاد اندھوں کو بینا کیا، کوڑھیوں کو شفا دی، مردوں کو زندہ کیا، اور احمدِ مجتبیٰ صلی اللہ علیہ وآلہ وسلم کی آمد کی قطعی بشارت دی۔',
    detailedNarrativeUrdu: [
      'قرآن فرماتا ہے: "وَإِذْ قَالَ عِيسَى ابْنُ مَرْيَمَ يَا بَنِي إِسْرَائِيلَ إِنِّي رَسُولُ اللَّهِ إِلَيْكُم مُّصَدِّقًا لِّمَا بَيْنَ يَدَيَّ مِنَ التَّوْرَاةِ وَمُبَشِّرًا بِرَسُولٍ يَأْتِي مِن بَعْدِي اسْمُهُ أَحْمَدُ" (سورۃ الصف: ۶)۔',
      'یہودیوں نے قتل کی سازش کی لیکن اللہ نے فرمایا: "وَمَا قَتَلُوهُ وَمَا صَلَبُوهُ وَلَٰكِن شُبِّهَ لَهُمْ بَل رَّفَعَهُ اللَّهُ إِلَيْهِ"۔',
      'عہدِ آخر الزماں میں حضرت امام مہدی عجل اللہ فرجہ کے ظہور کے وقت آپ آسمان سے نزول فرمائیں گے اور امامؑ کے پیچھے نماز ادا کریں گے۔'
    ],
    pedagogicalTakeaways: [
      'حضرت عیسیٰؑ کی بشارت نبوتِ محمدیؐ کی تصدیق کی مستند ترین سند ہے۔',
      'امام زمانہ (عج) کی اقتداء میں عیسیٰؑ کا نماز پڑھنا ولایتِ آلِ محمدؑ کی افضلیت کا عظیم مظہر ہے۔'
    ],
    sources: ['قرآن مجید (سورۃ آل عمران، مریم، الصف)', 'کمال الدین (شیخ صدوق)', 'تفسیر المیزان'],
  },
  {
    id: 'ancestor-adnan-hashim',
    stepNumber: 15,
    category: 'historical_milestone',
    epochTab: 'prophets',
    titleUrdu: 'عدنان، قریش، اور ہاشم (سلسلۂ اجدادِ رسولؐ)',
    titleArabic: 'عدنان وقريش وهاشم (آباء النبي الأطهار)',
    titleEnglish: 'Ancestors: Adnan, Quraysh, and Hashim',
    subtitleUrdu: 'شاخِ اسماعیلؑ کے موحد آباء و اجداد اور سردارانِ مکہ',
    fatherNameUrdu: 'سلسلۂ اجداد تا حضرت اسماعیل بن ابراہیمؑ',
    paternalLineageUrdu: 'ہاشم بن عبد مناف بن قصی بن کلاب بن مرہ بن کعب بن لؤی بن غالب بن فہر (قریش) بن مالک بن نضر بن کنانہ بن خزیمہ بن مدرکہ بن الیاس بن مضر بن نزار بن معد بن عدنان بن اد بن همیسع بن قیدار بن اسماعیل بن ابراہیمؑ',
    lineageHighlightUrdu: 'رسول اللہؐ اور ائمہ معصومینؑ کا بلاواسطہ پاکیزہ پدری شجرہ',
    branch: 'ismail',
    parentFigureId: 'prophet-ismail',
    dates: {
      yearCE: 500,
      isBCE: false,
      approximateYearsAgo: computeYearsAgo(500, false),
    },
    locationUrdu: 'مکہ مکرمہ و بطحاء',
    colorCode: '#D97706',
    summaryUrdu: 'رسول اللہؐ کے تمام آباء و اجداد حضرت آدمؑ سے لے کر حضرت عبد اللہ تک سب کے سب موحد اور طاہر و مطہر رہے اور کبھی شرک و کفر سے آلودہ نہیں ہوئے۔',
    detailedNarrativeUrdu: [
      'حدیثِ نبویؐ ہے: "لم يزل ينقلني الله من أصلاب الطاهرين إلى أرحام المطهرات" (اللہ تعالیٰ مجھے ہمیشہ پاک پشتوں سے پاک ارحام میں منتقل فرماتا رہا)۔',
      'قصی بن کلاب نے مکہ کی باقاعدہ حکومت قائم کی اور دار الندوہ کی بنیاد رکھی۔',
      'ہاشم (عمرو العلیٰ) نے مکہ کے بھوکے حاجیوں کو شوربے میں روٹی بھگو کر کھلائی اور قریش کے تجارتی قافلوں کے لیے ایلاف (سرمائی و گرما کی تجارتی راہیں) قائم کیں۔'
    ],
    pedagogicalTakeaways: [
      'آبائے رسول اللہؐ موحد اور دینِ حنیفِ ابراہیمی پر قائم تھے۔',
      'سخاوت اور خدمتِ خلق بنو ہاشم کا طرۂ امتیاز ہے۔'
    ],
    sources: ['تاریخ یعقوبی (جلد ۲)', 'امالی (شیخ طوسی)', 'السیرۃ النبویہ (ابن ہشام)'],
  },
  {
    id: 'ancestor-abdulmuttalib-abutalib',
    stepNumber: 16,
    category: 'historical_milestone',
    epochTab: 'prophets',
    titleUrdu: 'حضرت عبد المطلب و حضرت ابو طالب علیہما السلام',
    titleArabic: 'عبد المطلب وأبو طالب عليهما السلام (حماة الرسالة)',
    titleEnglish: 'Hazrat Abdul Muttalib & Abu Talib (Protectors of the Message)',
    subtitleUrdu: 'زمزم کی دوبارہ کھدائی، ابرہہ کی پسپائی، اور مکی دور میں رسول اللہؐ کی پناہ',
    fatherNameUrdu: 'ہاشم بن عبد مناف (عبد المطلب کے والد) اور عبد المطلب (ابو طالب کے والد)',
    paternalLineageUrdu: 'ابو طالب و عبد اللہ فرزندانِ عبد المطلب (شیبۃ الحمد) بن ہاشم بن عبد مناف',
    lineageHighlightUrdu: 'والدِ رسول اللہؐ (عبد اللہ) اور والدِ امیر المؤمنینؑ (ابو طالب)',
    branch: 'ismail',
    parentFigureId: 'ancestor-adnan-hashim',
    dates: {
      yearAamAlFeel: 1,
      yearCE: 570,
      isBCE: false,
      approximateYearsAgo: computeYearsAgo(570, false),
    },
    locationUrdu: 'مکہ مکرمہ و شعبِ ابی طالب',
    colorCode: '#B45309',
    summaryUrdu: 'حضرت عبد المطلبؑ نے ابرہہ کے ہاتھیوں کے سامنے فرمایا: "میں اونٹوں کا رب ہوں، کعبہ کا ایک رب ہے جو اس کی حفاظت کرے گا"۔ حضرت ابو طالبؑ نے اوائلِ بعثت میں جان و مال سے نبیؐ کا دفاع کیا۔',
    detailedNarrativeUrdu: [
      'حضرت عبد المطلبؑ مستجاب الدعوات تھے، انہی کے خواب سے چاہِ زمزم دوبارہ برآمد ہوا اور انہوں نے اپنے پوتے کا نام "محمد" (صلی اللہ علیہ وآلہ وسلم) رکھا۔',
      'حضرت ابو طالبؑ نے بعثت کے ابتدائی ۱۰ سالوں میں قریش کے تمام حملوں کے آگے ڈھال بن کر نبیؐ کی حفاظت کی اور شعب ابی طالب کے تین سالہ محاصرے کو جھیلا۔',
      'حضرت ابو طالبؑ کا ایمان اور اشعار ("ولقد علمتُ بأنّ دينَ محمّدٍ من خيرِ أديانِ البريّةِ دينا") شیعہ امامیہ کے نزدیک مسلم الثبوت ہیں۔'
    ],
    pedagogicalTakeaways: [
      'ایمانِ ابو طالبؑ اور عبد المطلبؑ پر شیعہ علماء کا اجماع ہے۔',
      'رسالت کی بقا میں ابو طالبؑ کی قربانیوں کا کردار کلیدی ہے۔'
    ],
    sources: ['ایمان ابی طالب (شیخ مفید)', 'تفسیر المیزان', 'اصول الکافی (باب مولد النبیؐ)'],
  },
];

// ============================================================================
// TAB 2: عصرِ نبویؐ و تدریجی نزولِ قرآن (570 CE – 632 CE)
// ============================================================================
export const PROPHETIC_QURAN_NODES: GrandTimelineNode[] = [
  {
    id: 'wiladat-nabi',
    stepNumber: 17,
    category: 'historical_milestone',
    epochTab: 'prophetic_quran',
    titleUrdu: 'ولادتِ باسعادت خاتم الانبیاء حضرت محمد مصطفیٰ صلی اللہ علیہ وآلہ وسلم',
    titleArabic: 'ولادة خاتم الأنبياء محمد صلى الله عليه وآله وسلم',
    titleEnglish: 'Birth of the Holy Prophet Muhammad (PBUH&HP)',
    subtitleUrdu: 'ظہورِ نورِ مجسم اور ایوانِ کسریٰ کا لرز جانا',
    fatherNameUrdu: 'حضرت عبد اللہ بن عبد المطلب',
    paternalLineageUrdu: 'محمد بن عبد اللہ بن عبد المطلب بن ہاشم بن عبد مناف (والدہ: حضرت آمنہ بنت وہبؑ)',
    lineageHighlightUrdu: 'سید الاولین و الآخرین، خاتم النبیین',
    branch: 'ahlulbayt',
    dates: {
      yearAamAlFeel: 1,
      yearCE: 570,
      isBCE: false,
      approximateYearsAgo: computeYearsAgo(570, false),
      lunarMonthUrdu: '۱۷ ربیع الاول (عام الفیل)',
      dayOfMonth: 17,
    },
    locationUrdu: 'مکہ مکرمہ (شعبِ بنی ہاشم)',
    colorCode: '#10B981',
    summaryUrdu: 'ابرہہ کے حملے کے سال ۱۷ ربیع الاول کو کائنات کی عظیم ترین ہستی مکہ میں متولد ہوئی۔ ایوانِ کسریٰ کے چودہ کنگرے گر پڑے اور آتشکدۂ فارس بجھ گیا۔',
    detailedNarrativeUrdu: [
      'پیدائش سے قبل ہی والد ماجد حضرت عبد اللہ کی وفات مدینہ منورہ میں ہو چکی تھی۔',
      'دادا حضرت عبد المطلبؑ نے کعبہ کے صحن میں لے جا کر شکرانہ ادا کیا اور نام "محمد" (ص) تجویز کیا۔',
      'چھٹے سال والدہ ماجدہ حضرت آمنہؑ اور آٹھویں سال دادا حضرت عبد المطلبؑ کی وفات کے بعد چچا حضرت ابو طالبؑ نے اپنی آغوش میں لے لیا۔'
    ],
    pedagogicalTakeaways: [
      'نبیِ رحمتؐ کی ولادت کائنات کی تاریکیوں میں نورِ توحید کا آغاز تھی۔'
    ],
    sources: ['اعلام الوریٰ (طبرسی)', 'اصول الکافی (جلد ۱)', 'تاریخ یعقوبی'],
  },
  {
    id: 'nuzul-step-1-alaq',
    stepNumber: 18,
    category: 'quranic_surah',
    epochTab: 'prophetic_quran',
    titleUrdu: 'مرحلہ ۱: بعثتِ نبویؐ اور آغازِ وحی — سورۃ العلق (آیات ۱ تا ۵)',
    titleArabic: 'سورة العلق (الآيات ١-٥) — المبعث النبوي الشريف',
    titleEnglish: 'Revelation #1: Surah Al-Alaq (Verses 1-5) & Bi\'that',
    subtitleUrdu: 'غارِ حرا کا مطلعِ نور اور "اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ"',
    fatherNameUrdu: 'حضرت عبد اللہ بن عبد المطلب',
    paternalLineageUrdu: 'محمد رسول اللہ صلی اللہ علیہ وآلہ وسلم',
    lineageHighlightUrdu: 'آغازِ نزولِ قرآن مجید',
    branch: 'ahlulbayt',
    dates: {
      yearAamAlFeel: 40,
      yearBiThat: 1,
      yearBeforeHijra: 13,
      yearCE: 610,
      isBCE: false,
      approximateYearsAgo: computeYearsAgo(610, false),
      lunarMonthUrdu: '۲۷ رجب المرجب (سالِ اولِ بعثت)',
      dayOfMonth: 27,
    },
    quranicMetadata: {
      mushafSurahNumber: 96,
      chronologicalSurahNumber: 1,
      verseRange: { fromVerse: 1, toVerse: 5 },
      totalVerses: 5,
      revelationPeriod: 'Early Meccan',
      keyVerses: [
        {
          arabic: 'اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ * خَلَقَ الْإِنسَانَ مِنْ عَلَقٍ',
          translationUrdu: 'پڑھیے اپنے اس پروردگار کے نام کے ساتھ جس نے پیدا کیا! جس نے انسان کو جمے ہوئے خون سے پیدا کیا۔',
          reference: 'العلق: ۱-۲',
        },
      ],
    },
    locationUrdu: 'غارِ حرا، جبل النور، مکہ مکرمہ',
    colorCode: '#D97706',
    summaryUrdu: '۲۷ رجب کو چالیس سال کی عمر میں غارِ حرا میں جبرائیلِ امینؑ پہلی وحی لے کر اترے۔ علم، قلم اور بندگی کے الہامی منشور کا اعلان ہوا۔',
    detailedNarrativeUrdu: [
      'مکتبِ اہل بیتؑ کے مطابق رسول اللہؐ پیدائش ہی سے نبوت اور عصمت کے حامل تھے، ۲۷ رجب کو باقاعدہ اعلانِ رسالت اور ترسیلِ وحی کا آغاز ہوا۔',
      'غارِ حرا سے اتر کر آپ اپنے گھر تشریف لائے اور حضرت خدیجۃ الکبریٰؑ اور دس سالہ علی ابن ابی طالبؑ نے سب سے پہلے تصدیق و بیعت فرمائی۔'
    ],
    pedagogicalTakeaways: [
      'قرآن کے نزول کا پہلا لفظ "اقرأ" (پڑھیے) علم اور شعور کی ترجیح کو ظاہر کرتا ہے۔'
    ],
    sources: ['التمہید فی علوم القرآن (معرفت)', 'تفسیر المیزان', 'امالی صدوق'],
  },
  {
    id: 'nuzul-step-2-qalam',
    stepNumber: 19,
    category: 'quranic_surah',
    epochTab: 'prophetic_quran',
    titleUrdu: 'مرحلہ ۲: بادلوں کی گرج اور اخلاق کا کوہِ وقار — سورۃ القلم (آیات ۱ تا ۱۶)',
    titleArabic: 'سورة القلم (الآيات ١-١٦)',
    titleEnglish: 'Revelation #2: Surah Al-Qalam (Verses 1-16)',
    subtitleUrdu: 'قلم کی قسم اور "وَإِنَّكَ لَعَلَىٰ خُلُقٍ عَظِيمٍ"',
    dates: {
      yearAamAlFeel: 40,
      yearBiThat: 1,
      yearBeforeHijra: 13,
      yearCE: 610,
      isBCE: false,
      approximateYearsAgo: computeYearsAgo(610, false),
      lunarMonthUrdu: 'ذی الحجہ، سالِ اولِ بعثت',
    },
    quranicMetadata: {
      mushafSurahNumber: 68,
      chronologicalSurahNumber: 2,
      verseRange: { fromVerse: 1, toVerse: 16 },
      totalVerses: 16,
      revelationPeriod: 'Early Meccan',
      keyVerses: [
        {
          arabic: 'ن ۚ وَالْقَلَمِ وَمَا يَسْطُرُونَ * مَا أَنتَ بِنِعْمَةِ رَبِّكَ بِمَجْنُونٍ * وَإِنَّكَ لَعَلَىٰ خُلُقٍ عَظِيمٍ',
          translationUrdu: 'ن، قسم ہے قلم کی اور اس کی جو وہ لکھتے ہیں! آپ اپنے رب کے فضل سے ہرگز دیوانے نہیں ہیں؛ اور بے شک آپ اخلاق کے بلند ترین مرتبے پر فائز ہیں۔',
          reference: 'القلم: ۱-۴',
        },
      ],
    },
    locationUrdu: 'مکہ مکرمہ',
    colorCode: '#059669',
    summaryUrdu: 'قریش کے طعنوں کے رد میں نازل ہوئی۔ قلم کی عظمت کی قسم کھائی گئی اور رسول اللہؐ کے اخلاقِ عظیمہ کی خدائی گواہی دی گئی۔',
    detailedNarrativeUrdu: [
      'ولید بن مغیرہ جیسے سرداروں نے جب آپ پر بہتان لگائے تو اللہ تعالیٰ نے قلم کی اور کائنات کے لوح و قلم کی قسم کھا کر نبیؐ کی فکری طہارت کی گواہی دی۔'
    ],
    pedagogicalTakeaways: ['دشمن کی بدکلامی کا جواب اخلاقِ عظیمہ اور علم کی طاقت سے دینا چاہیے۔'],
    sources: ['تفسیر مجمع البیان', 'التمہید فی علوم القرآن'],
  },
  {
    id: 'nuzul-step-3-muzzammil',
    stepNumber: 20,
    category: 'quranic_surah',
    epochTab: 'prophetic_quran',
    titleUrdu: 'مرحلہ ۳: شب کا باطنی قلعہ اور قولِ ثقیل کی تیاری — سورۃ المزمل',
    titleArabic: 'سورة المزمل (الآيات ١-١٩)',
    titleEnglish: 'Revelation #3: Surah Al-Muzzammil (Verses 1-19)',
    subtitleUrdu: 'تہجد، شب بیداری، اور ترتیلِ قرآن کی روحانی تربیت',
    dates: {
      yearAamAlFeel: 41,
      yearBiThat: 2,
      yearBeforeHijra: 12,
      yearCE: 611,
      isBCE: false,
      approximateYearsAgo: computeYearsAgo(611, false),
      lunarMonthUrdu: 'اوائل سالِ دوم بعثت',
    },
    quranicMetadata: {
      mushafSurahNumber: 73,
      chronologicalSurahNumber: 3,
      verseRange: { fromVerse: 1, toVerse: 19 },
      totalVerses: 19,
      revelationPeriod: 'Early Meccan',
      keyVerses: [
        {
          arabic: 'يَا أَيُّهَا الْمُزَّمِّلُ * قُمِ اللَّيْلَ إِلَّا قَلِيلًا * نِّصْفَهُ أَوِ انقُصْ مِنْهُ قَلِيلًا * أَوْ زِدْ عَلَيْهِ وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا',
          translationUrdu: 'اے چادر اوڑھنے والے! رات کو کھڑے ہو جائیے مگر تھوڑا سا، آدھی رات یا اس سے کچھ کم، یا اس پر کچھ زیادہ بڑھائیے اور قرآن کو ٹھہر ٹھہر کر ترتیل سے پڑھیے۔',
          reference: 'المزمل: ۱-۴',
        },
      ],
    },
    locationUrdu: 'مکہ مکرمہ (بیتِ رسالت)',
    colorCode: '#2563EB',
    summaryUrdu: 'آنے والی بھاری ذمہ داری (قولِ ثقیل) کا سامنا کرنے کے لیے راتوں کو عبادت، ترتیلِ قرآن اور ذکرِ خدا کا الٰہی حکم دیا گیا۔',
    detailedNarrativeUrdu: [
      'دن کی جدوجہد میں استقامت پانے کے لیے رات کا قیام اور تہجد کی نماز روح کو فولادی طاقت بخشتی ہے۔'
    ],
    pedagogicalTakeaways: ['بڑے نظریاتی معرکوں کی فتح رات کی تنہائی میں پروردگار کے سامنے جھکنے سے نصیب ہوتی ہے۔'],
    sources: ['تفسیر نور الثقلین', 'تفسیر المیزان'],
  },
  {
    id: 'dawat-zul-asheera',
    stepNumber: 21,
    category: 'historical_milestone',
    epochTab: 'prophetic_quran',
    titleUrdu: 'دعوتِ ذوالعشیرہ اور اعلانِ ولایتِ علیؑ (وانذر عشیرتك الأقربين)',
    titleArabic: 'دعوة ذو العشيرة ويوم الإنذار',
    titleEnglish: 'Dawat Dhul Asheera & The Declaration of Wilayah',
    subtitleUrdu: '"یہ علی میرا بھائی، میرا وصی اور تم میں میرا خلیفہ ہے"',
    dates: {
      yearAamAlFeel: 43,
      yearBiThat: 3,
      yearBeforeHijra: 10,
      yearCE: 613,
      isBCE: false,
      approximateYearsAgo: computeYearsAgo(613, false),
      lunarMonthUrdu: 'ربیع الاول، سالِ سومِ بعثت',
    },
    quranicMetadata: {
      mushafSurahNumber: 26,
      chronologicalSurahNumber: 47,
      verseRange: { fromVerse: 214, toVerse: 216 },
      keyVerses: [
        {
          arabic: 'وَأَنذِرْ عَشِيرَتَكَ الْأَقْرَبِينَ * وَاخْفِضْ جَنَاحَكَ لِمَنِ اتَّبَعَكَ مِنَ الْمُؤْمِنِينَ',
          translationUrdu: 'اور اپنے قریبی رشتہ داروں کو ڈرائیے، اور جو مومنین آپ کی پیروی کریں ان کے لیے شفقت کا بازو جھکائیے۔',
          reference: 'الشعراء: ۲۱۴',
        },
      ],
    },
    locationUrdu: 'مکہ مکرمہ (منزلِ حضرت ابو طالبؑ)',
    colorCode: '#DC2626',
    summaryUrdu: 'تین سالہ خفیہ دعوت کے بعد خاندانِ بنو ہاشم کے ۴۰ بزرگوں کو دعوت دی گئی۔ حضرت علیؑ (عمر ۱۳ سال) نے نصرت کا اعلان کیا تو رسول اللہؐ نے ان کی اخوت، وصایت اور خلافت کا تاریخی اعلان فرمایا۔',
    detailedNarrativeUrdu: [
      'رسول اللہؐ نے تین بار فرمایا: "تم میں سے کون ہے جو اس امر میں میرا وزیر اور مددگار بنے تاکہ وہ میرا بھائی، میرا وصی اور میرا خلیفہ ہو؟"',
      'تینوں بار حضرت علیؑ اٹھے۔ رسول اللہؐ نے ان کے کندھے پر ہاتھ رکھ کر فرمایا: "إنَّ هذا أخي ووصيّي وخليفتي فيكم فاسمعوا له وأطيعوا" (سنو! یہ علی تم میں میرا بھائی، میرا وصی اور میرا خلیفہ ہے، اس کی بات سنو اور اس کی اطاعت کرو)۔'
    ],
    pedagogicalTakeaways: [
      'نبوت اور امامت کا اعلان روزِ اول ہی سے باہم مربوط اور لازم و ملزوم ہے۔',
      'اہل بیتؑ کی نصرت ہی دین کی بنیاد ہے۔'
    ],
    sources: ['تاریخ طبری (جلد ۲)', 'مسند احمد بن حنبل', 'شواہد التنزیل (حاکم حسکانی)'],
  },
  {
    id: 'hijrah-madinah',
    stepNumber: 22,
    category: 'historical_milestone',
    epochTab: 'prophetic_quran',
    titleUrdu: 'ہجرتِ نبویؐ، لیلۃ المبیت اور اختتامِ عام الفیل (سال ۱ ہجری)',
    titleArabic: 'الهجرة النبوية المباركة وليلة المبيت (١ هـ)',
    titleEnglish: 'The Hijrah to Madinah, Laylat al-Mabit & Start of Hijri Era',
    subtitleUrdu: 'بسترِ رسولؐ پر علیؑ کا سونا، عام الفیل کا اختتام اور ہجری کا آغاز',
    dates: {
      yearAamAlFeel: 53,
      yearBiThat: 13,
      yearHijri: 1,
      yearCE: 622,
      isBCE: false,
      approximateYearsAgo: computeYearsAgo(622, false),
      lunarMonthUrdu: 'ربیع الاول، سالِ اولِ ہجری (ستمبر ۶۲۲ء)',
      dayOfMonth: 1,
    },
    quranicMetadata: {
      mushafSurahNumber: 2,
      keyVerses: [
        {
          arabic: 'وَمِنَ النَّاسِ مَن يَشْرِي نَفْسَهُ ابْتِغَاءَ مَرْضَاتِ اللَّهِ ۗ وَاللَّهُ رَءُوفٌ بِالْعِبَادِ',
          translationUrdu: 'اور لوگوں میں وہ بھی ہے جو اللہ کی خوشنودی کی خاطر اپنی جان بیچ ڈالتا ہے، اور اللہ اپنے بندوں پر نہایت مہربان ہے۔',
          reference: 'البقرہ: ۲۰۷',
        },
      ],
    },
    locationUrdu: 'مکہ مکرمہ تا غارِ ثور تا قبا و مدینہ منورہ',
    colorCode: '#10B981',
    summaryUrdu: 'قریش نے قتل کا ارادہ کیا۔ حضرت علیؑ نے بسترِ رسولؐ پر جان کا نذرانہ پیش کیا (لیلۃ المبیت)۔ رسول اللہؐ ہجرت فرما کر مدینہ پہنچے، جس سے تقویمِ عام الفیل ۵۳ سال مکمل کر کے ہجری تقویم میں تبدیل ہو گئی۔',
    detailedNarrativeUrdu: [
      'اللہ تعالیٰ نے فرشتوں (جبرائیلؑ و میکائیلؑ) کے سامنے حضرت علیؑ کے ایثار کی تعریف فرمائی اور سورۃ البقرہ کی آیت ۲۰۷ نازل ہوئی۔',
      'مدینہ منورہ پہنچ کر مسجدِ قبا اور مسجدِ نبوی کی بنیاد رکھی گئی، اور پہلی اسلامی ریاست کا قیام عمل میں آیا۔'
    ],
    pedagogicalTakeaways: [
      'دین کی بقا کے لیے جان کا نذرانہ پیش کرنا علوی صفت ہے۔',
      'ہجرت اسلامی تقویم کا وہ تاریخی سنگِ میل ہے جہاں سے مظلومیت اقتدار اور نفاذِ عدل میں بدلی۔'
    ],
    sources: ['تفسیر مجمع البیان', 'تفسیر نور الثقلین', 'مستدرک الحاکم'],
  },
  {
    id: 'ghadeer-khumm',
    stepNumber: 23,
    category: 'historical_milestone',
    epochTab: 'prophetic_quran',
    titleUrdu: 'واقعۂ غدیرِ خم اور اکمالِ دین — سورۃ المائدہ (آیت ۳ و ۶۷)',
    titleArabic: 'واقعة غدير خم وإكمال الدين (١٠ هـ)',
    titleEnglish: 'Event of Ghadeer Khumm: Declaration of Wilayah (10 AH)',
    subtitleUrdu: '"مَنْ كُنْتُ مَوْلَاهُ فَهَذَا عَلِيٌّ مَوْلَاهُ" — تکمیلِ شریعت و نعمت',
    dates: {
      yearHijri: 10,
      yearCE: 632,
      isBCE: false,
      approximateYearsAgo: computeYearsAgo(632, false),
      lunarMonthUrdu: '۱۸ ذوالحجہ، سالِ دہمِ ہجری',
      dayOfMonth: 18,
    },
    quranicMetadata: {
      mushafSurahNumber: 5,
      chronologicalSurahNumber: 112,
      keyVerses: [
        {
          arabic: 'يَا أَيُّهَا الرَّسُولُ بَلِّغْ مَا أُنزِلَ إِلَيْكَ مِن رَّبِّكَ ۖ وَإِن لَّمْ تَفْعَلْ فَمَا بَلَّغْتَ رِسَالَتَهُ... الْيَوْمَ أَكْمَلْتُ لَكُمْ دِينَكُمْ وَأَتْمَمْتُ عَلَيْكُمْ نِعْمَتِي وَرَضِيتُ لَكُمُ الْإِسْلَامَ دِينًا',
          translationUrdu: 'اے رسول! پہنچا دیجیے وہ جو آپ کے رب کی طرف سے اتارا گیا؛ اگر ایسا نہ کیا تو رسالت کا کوئی کام نہ کیا۔ آج میں نے تمہارے لیے تمہارا دین کامل کر دیا اور تم پر اپنی نعمت تمام کر دی اور اسلام کو تمہارے لیے بطورِ دین پسند فرمایا۔',
          reference: 'المائدہ: ۶۷ و ۳',
        },
      ],
    },
    locationUrdu: 'غدیرِ خم (جحفہ کے قریب، مکہ و مدینہ کے سنگم پر)',
    colorCode: '#EAB308',
    summaryUrdu: 'حجۃ الوداع سے واپسی پر سوا لاکھ حاجیوں کے مجمع میں اونٹوں کے کجاووں کا منبر بنا کر رسول اللہؐ نے حضرت علیؑ کا ہاتھ بلند فرمایا اور ولایت و امامت کا حتمی اعلان کیا۔',
    detailedNarrativeUrdu: [
      'رسول اللہؐ نے خطبہ دیتے ہوئے فرمایا: "ألستُ أولى بكم من أنفسكم؟" سب نے کہا: بلى یا رسول اللہ! پھر فرمایا: "فمن كنتُ مولاه فهذا عليّ مولاه، اللّهمّ والِ من والاه وعادِ من عاداه"۔',
      'اس کے بعد سورۃ المائدہ کی آیتِ اکمالِ دین نازل ہوئی اور تمام صحابہ نے حضرت علیؑ کو مبارکباد پیش کی۔'
    ],
    pedagogicalTakeaways: [
      'ولایت کے بغیر نبوت و رسالت کا کام نامکمل تھا۔',
      'غدیر دین کی تکمیل اور نعمتِ الٰہی کی انتہا ہے۔'
    ],
    sources: ['الغدیر (علامہ امینی)', 'تفسیر المیزان', 'ینابیع المودۃ'],
  },
];

// ============================================================================
// TAB 3: عصرِ امامت و اہل بیت علیہم السلام (11 AH to 329 AH / Present)
// Comprehensive Profiles of the 12 Infallible Imams & Sayyida Fatima al-Zahra (sa)
// (Exported from ./ahlulbaytImamsData)
// ============================================================================


// ============================================================================
// COMBINED CONTINUOUS TIMELINE (TAB 4: پیوستہ گرینڈ ٹائم لائن)
// ============================================================================
export const ALL_GRAND_TIMELINE_NODES: GrandTimelineNode[] = [
  ...PROPHETIC_LINEAGE_NODES,
  ...FATRAH_SUCCESSOR_NODES,
  ...PROPHETIC_QURAN_NODES,
  ...AHLULBAYT_IMAMAT_NODES,
].sort((a, b) => {
  const aVal = a.dates.isBCE ? a.dates.yearCE : a.dates.yearCE;
  const bVal = b.dates.isBCE ? b.dates.yearCE : b.dates.yearCE;
  return aVal - bVal;
});
