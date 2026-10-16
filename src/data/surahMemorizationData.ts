/**
 * Comprehensive Pedagogical Dataset for 114 Quranic Surahs
 * مصحفی و نزولی ترتیب اور حفظِ اسماء کے لیے ۱۱۴ سورتوں کا جامع تدریسی ڈیٹا
 */

import { SURAHS_DATA } from './surahs';

export type RevelationPlace = 'meccan' | 'medinan';

export type ChronologicalPhase = 
  | 'early_makki'   // اوائلِ مکہ (نزولی ۱ تا ۲۵) - سحرِ بعثت و فکری جھٹکے
  | 'mid_makki'     // اواسطِ مکہ (نزولی ۲۶ تا ۶۰) - انبیائی داستانیں و استقامت
  | 'late_makki'    // اواخرِ مکہ (نزولی ۶۱ تا ۸۶) - محاصرہ، معراج و الوداعِ مکہ
  | 'madani';       // مدنی دور (نزولی ۸۷ تا ۱۱۴) - تشریع، اخوت، جہاد و ریاست

export type ThematicFamily = 
  | 'sab_tiwal'     // سبع طوال (۷ لمبی سورتیں: بقرہ، آل عمران، نساء، مائدہ، انعام، اعراف، توبہ)
  | 'hawameem'      // حوامیم (۷ سورتیں جو حم سے شروع ہوتی ہیں: ۴۰ تا ۴۶)
  | 'musabbihat'    // مسبحات (تسبیح والی سورتیں: اسراء، حدید، حشر، صف، جمعہ، تغابن، اعلیٰ)
  | 'tawaseen'      // طواسین (شعراء، نمل، قصص)
  | 'azaaim'        // عزائم (۴ سجدۂ واجبہ: سجدہ، فصلت، نجم، علق)
  | 'qul'           // سُوَرِ قُل (جن، کافرون، اخلاص، فلق، ناس)
  | 'mufassal'      // مفصلات (چھوٹی سورتیں: قٓ تا ناس)
  | 'general';      // عام سورتیں

export interface MemorizationSurah {
  mushafOrder: number;            // ۱ تا ۱۱۴ مصحفی
  nuzoolOrder: number;            // ۱ تا ۱۱۴ نزولی
  nameArabic: string;             // مثلاً الفاتحة
  nameUrdu: string;               // مثلاً الفاتحہ
  nameEnglish: string;            // Al-Fatihah
  meaningUrdu: string;            // کتاب کا افتتاح / آغاز
  meaningEnglish: string;         // The Opening
  versesCount: number;            // آیات کی تعداد
  revelationPlace: RevelationPlace; // مکی یا مدنی
  juzNumber: number;              // پارہ نمبر (۱ تا ۳۰)
  chronologicalPhase: ChronologicalPhase;
  thematicFamily: ThematicFamily;
  mushafDecadeGroup: number;      // ۱ تا ۱۲ (۱۰، ۱۰ سورتوں کے عشرے)
  nuzoolDecadeGroup: number;      // ۱ تا ۱۲
  mnemonicKeyUrdu: string;        // یاد دہانی کا فکری جملہ / تلازم
  symbolGlyph: string;            // بصری علامتی اشارہ
  keyThemeUrdu: string;           // مرکزی الٰہی پیغام
}

// Mnemonic keys and meanings catalogue for all 114 Surahs
const SURAH_METADATA_EXTENDED: Record<number, {
  meaningUrdu: string;
  meaningEnglish: string;
  juzNumber: number;
  thematicFamily: ThematicFamily;
  mnemonicKeyUrdu: string;
  symbolGlyph: string;
  keyThemeUrdu: string;
}> = {
  1: {
    meaningUrdu: 'کتاب کا افتتاح / آغاز',
    meaningEnglish: 'The Opening',
    juzNumber: 1,
    thematicFamily: 'general',
    mnemonicKeyUrdu: 'قرآن کا پہلا دروازہ اور ہر نماز کی کنجی (ام الکتاب)۔',
    symbolGlyph: 'DoorOpen',
    keyThemeUrdu: 'حمدِ الٰہی، توحید، صراطِ مستقیم اور ہدایت کی دعا۔'
  },
  2: {
    meaningUrdu: 'گائے کا واقعہ',
    meaningEnglish: 'The Cow',
    juzNumber: 1,
    thematicFamily: 'sab_tiwal',
    mnemonicKeyUrdu: 'قرآن کی طویل ترین سورت جس میں شریعت، احکام اور بنی اسرائیل کی گائے کا قصہ ہے۔',
    symbolGlyph: 'Scroll',
    keyThemeUrdu: 'ایمان بالشیب، خلافتِ آدمؑ، فقہی احکام، اور آیت الکرسی۔'
  },
  3: {
    meaningUrdu: 'حضرت عمران کا پاک خاندان',
    meaningEnglish: 'Family of Imran',
    juzNumber: 3,
    thematicFamily: 'sab_tiwal',
    mnemonicKeyUrdu: 'بقرہ کے بعد حضرت مریمؑ و عیسیٰؑ کے متقی خاندان کی پاکیزگی اور غزوۂ احد کا بیان۔',
    symbolGlyph: 'Users',
    keyThemeUrdu: 'مباہلہ، استقامتِ احد، اور حضرت مریمؑ و عیسیٰؑ کی ولادت۔'
  },
  4: {
    meaningUrdu: 'عورتیں اور خاندانی حقوق',
    meaningEnglish: 'The Women',
    juzNumber: 4,
    thematicFamily: 'sab_tiwal',
    mnemonicKeyUrdu: 'خواتین، یتیموں، وراثت اور خاندانی عدل کا الٰہی چارٹر۔',
    symbolGlyph: 'Shield',
    keyThemeUrdu: 'معاشرتی عدل، حقوقِ نسواں، وراثت، اور اطاعتِ اولی الامر۔'
  },
  5: {
    meaningUrdu: 'آسمانی دسترخوان و اکمالِ دین',
    meaningEnglish: 'The Table Spread',
    juzNumber: 6,
    thematicFamily: 'sab_tiwal',
    mnemonicKeyUrdu: 'حواریوں کا آسمانی خوان اور غدیرِ خم پر دین کی تکمیل (آیتِ اکمال و تبلیغ)۔',
    symbolGlyph: 'Utensils',
    keyThemeUrdu: 'عہد و پیمان، ولایت و اکمالِ دین، اور حلال و حرام کے قطعی حدود۔'
  },
  6: {
    meaningUrdu: 'چوپائے (مویشی)',
    meaningEnglish: 'The Cattle',
    juzNumber: 7,
    thematicFamily: 'sab_tiwal',
    mnemonicKeyUrdu: 'ایک ہی رات میں ستر ہزار فرشتوں کے ساتھ نازل ہونے والی توحید کی عظیم سورت۔',
    symbolGlyph: 'Sun',
    keyThemeUrdu: 'خالص توحید، مناظرۂ ابراہیمؑ، اور شرک کے اوہام کا رد۔'
  },
  7: {
    meaningUrdu: 'بلند فصیلیں (جنت و جہنم کے درمیان)',
    meaningEnglish: 'The Heights',
    juzNumber: 8,
    thematicFamily: 'sab_tiwal',
    mnemonicKeyUrdu: 'اصحابِ اعراف کی بلند چوٹیاں اور سرکش قوموں (قومِ نوح، ہود، صالح، لوط، شعیب) کا انجام۔',
    symbolGlyph: 'Mountain',
    keyThemeUrdu: 'عہدِ الست، انبیائی سرگزشت، اور اصحابِ اعراف کا مقام۔'
  },
  8: {
    meaningUrdu: 'جنگی غنائم و عطیات',
    meaningEnglish: 'The Spoils of War',
    juzNumber: 9,
    thematicFamily: 'general',
    mnemonicKeyUrdu: 'غزوۂ بدر کا یوم الفرقان، ملائکہ کی نصرت اور خمس کا قانون۔',
    symbolGlyph: 'Swords',
    keyThemeUrdu: 'نصرتِ بدر، ایمان و توکل، اور خمس کے مالیاتی اصول۔'
  },
  9: {
    meaningUrdu: 'توبہ اور اعلانِ برات',
    meaningEnglish: 'The Repentance',
    juzNumber: 10,
    thematicFamily: 'sab_tiwal',
    mnemonicKeyUrdu: 'بغیر بسم اللہ کے نازل ہونے والی سورت، مشرکین سے مکمل براءت اور غزوۂ تبوک۔',
    symbolGlyph: 'Flame',
    keyThemeUrdu: 'اعلانِ براءت بذریعہ علیؑ، نفاق کی علامات، اور زکوٰۃ کے مصارف۔'
  },
  10: {
    meaningUrdu: 'حضرت یونسؑ',
    meaningEnglish: 'Jonah',
    juzNumber: 11,
    thematicFamily: 'general',
    mnemonicKeyUrdu: 'مچھلی کے پیٹ سے توبہ کرنے والے پیغمبر جن کی پوری قوم نے عذاب دیکھ کر ایمان قبول کیا۔',
    symbolGlyph: 'Fish',
    keyThemeUrdu: 'رحمتِ الٰہی، توبۂ یونسؑ، اور وحی کا حق ہونا۔'
  },
  11: {
    meaningUrdu: 'حضرت ہودؑ',
    meaningEnglish: 'Hud',
    juzNumber: 11,
    thematicFamily: 'general',
    mnemonicKeyUrdu: 'رسول اللہؐ نے فرمایا: "سورت ہود نے مجھے بوڑھا کر دیا" (استقامت کا الٰہی حکم)۔',
    symbolGlyph: 'Wind',
    keyThemeUrdu: 'فاستقم کما امرت، قومِ عاد کی ہلاکت، اور کشتیِ نوح کا جودی پر ٹھہرنا۔'
  },
  12: {
    meaningUrdu: 'حضرت یوسفؑ',
    meaningEnglish: 'Joseph',
    juzNumber: 12,
    thematicFamily: 'general',
    mnemonicKeyUrdu: 'احسن القصص: کنویں سے مصر کے تخت تک، عفت، صبر اور خوابوں کی سچی تعبیر۔',
    symbolGlyph: 'Crown',
    keyThemeUrdu: 'صبرِ جمیل، عصمت و حیا، اور تقدیرِ الٰہی کا حسین نظام۔'
  },
  13: {
    meaningUrdu: 'بجلی کی گرج',
    meaningEnglish: 'The Thunder',
    juzNumber: 13,
    thematicFamily: 'general',
    mnemonicKeyUrdu: 'بادلوں کی گرج اور فرشتوں کی تسبیح: "أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ"۔',
    symbolGlyph: 'Zap',
    keyThemeUrdu: 'دلوں کا سکون، عالمِ وجود کا نظام، اور علم الکتاب والے کی گواہی۔'
  },
  14: {
    meaningUrdu: 'حضرت ابراہیمؑ',
    meaningEnglish: 'Abraham',
    juzNumber: 13,
    thematicFamily: 'general',
    mnemonicKeyUrdu: 'تعمیرِ کعبہ کے بعد امن، رزق اور اولادِ صالح کی تاریخی ابراہیمی دعائیں: "رَبِّ اجْعَلْ هَٰذَا الْبَلَدَ آمِنًا"۔',
    symbolGlyph: 'Compass',
    keyThemeUrdu: 'کلمۂ طیبہ کی مثال، دعائے ابراہیمؑ، اور شکر گزاری کی فضیلت۔'
  },
  15: {
    meaningUrdu: 'پتھریلی وادی (قومِ ثمود کا علاقہ)',
    meaningEnglish: 'The Rocky Tract',
    juzNumber: 14,
    thematicFamily: 'general',
    mnemonicKeyUrdu: 'قرآن کی حفاظت کا ابدی الٰہی وعدہ: "إِنَّا نَحْنُ نَزَّلْنَا الذِّكْرَ وَإِنَّا لَهُ لَحَافِظُونَ"۔',
    symbolGlyph: 'ShieldAlert',
    keyThemeUrdu: 'حفاظتِ قرآن، ابلیس کا انکار، اور حجر کے پہاڑوں کے تراشے ہوئے مکانات۔'
  },
  16: {
    meaningUrdu: 'شہد کی مکھی',
    meaningEnglish: 'The Bee',
    juzNumber: 14,
    thematicFamily: 'general',
    mnemonicKeyUrdu: 'نعمتوں کی سورت؛ شہد کی مکھی کو وحی اور اس کے رس میں شفا۔',
    symbolGlyph: 'Flower2',
    keyThemeUrdu: 'آفاقی نعمتیں، عدل و احسان، اور شہد کے شفا بخش راز۔'
  },
  17: {
    meaningUrdu: 'شبینہ سفر (معراج) / بنی اسرائیل',
    meaningEnglish: 'The Night Journey',
    juzNumber: 15,
    thematicFamily: 'musabbihat',
    mnemonicKeyUrdu: 'مسجدِ حرام سے مسجدِ اقصی تک رات کا سفرِ معراج اور والدین کے احترام کا الٰہی فرمان۔',
    symbolGlyph: 'Moon',
    keyThemeUrdu: 'معراجِ نبویؐ، حقوقِ والدین، اور بنی اسرائیل کے دو فساد۔'
  },
  18: {
    meaningUrdu: 'غار والے (اصحابِ کہف)',
    meaningEnglish: 'The Cave',
    juzNumber: 15,
    thematicFamily: 'general',
    mnemonicKeyUrdu: 'غار کے نوجوان، موسیٰؑ و خضرؑ کا علم، اور ذو القرنین کی دیوار۔',
    symbolGlyph: 'Key',
    keyThemeUrdu: 'فتنوں سے حفاظت، غیبی حکمتیں، اور حیات بعد الموت۔'
  },
  19: {
    meaningUrdu: 'حضرت مریمؑ',
    meaningEnglish: 'Mary',
    juzNumber: 16,
    thematicFamily: 'general',
    mnemonicKeyUrdu: 'حضرت زکریاؑ کی دعا، یحییٰؑ کی بشارت، اور کنواری مریمؑ کے گود میں عیسیٰؑ کا کلام۔',
    symbolGlyph: 'Sparkles',
    keyThemeUrdu: 'رحمتِ خداوندی، عفتِ مریمؑ، اور اعجازِ ولادتِ عیسیٰؑ۔'
  },
  20: {
    meaningUrdu: 'طٰہٰ (حروفِ مقطعات / نامِ رسولؐ)',
    meaningEnglish: 'Ta-Ha',
    juzNumber: 16,
    thematicFamily: 'general',
    mnemonicKeyUrdu: '"ہم نے آپ پر قرآن اس لیے نہیں اتارا کہ آپ مشقت میں پڑیں" — موسیٰؑ کا کوہِ طور پر آگ دیکھنا۔',
    symbolGlyph: 'HeartHandshake',
    keyThemeUrdu: 'تسکینِ قلبِ نبویؐ، سرگزشتِ موسیٰؑ و فرعون، اور سامری کا بچھڑا۔'
  },
  21: {
    meaningUrdu: 'انبیاء علیہم السلام',
    meaningEnglish: 'The Prophets',
    juzNumber: 17,
    thematicFamily: 'general',
    mnemonicKeyUrdu: '۱۶ انبیائے کرام کے مصائب اور نجات: "وَمَا أَرْسَلْنَاكَ إِلَّا رَحْمَةً لِّلْعَالَمِينَ"۔',
    symbolGlyph: 'Globe',
    keyThemeUrdu: 'رحمۃ للعالمین، انبیائی مناجاتیں، اور قیامت کا قریب آنا۔'
  },
  22: {
    meaningUrdu: 'حج اور بیت اللہ کی زیارت',
    meaningEnglish: 'The Pilgrimage',
    juzNumber: 17,
    thematicFamily: 'general',
    mnemonicKeyUrdu: 'قربانی کے شعائر، کعبہ کا طواف اور دفاعِ حق کے لیے پہلی بار جہاد کی اجازت۔',
    symbolGlyph: 'Footprints',
    keyThemeUrdu: 'مناسکِ حج، شعائر اللہ کی تعظیم، اور مظلوموں کو اذنِ جہاد۔'
  },
  23: {
    meaningUrdu: 'اہلِ ایمان (مؤمنین)',
    meaningEnglish: 'The Believers',
    juzNumber: 18,
    thematicFamily: 'general',
    mnemonicKeyUrdu: 'کامیاب مؤمنین کے اوصاف: نماز میں خشوع، لغو سے پرہیز، اور امانتوں کی پاسداری۔',
    symbolGlyph: 'Award',
    keyThemeUrdu: 'قد افلح المؤمنون، مراحلِ خلقتِ انسان، اور حیاتِ برزخ۔'
  },
  24: {
    meaningUrdu: 'نورِ الٰہی اور پاکیزگی',
    meaningEnglish: 'The Light',
    juzNumber: 18,
    thematicFamily: 'general',
    mnemonicKeyUrdu: 'آیتِ نور: "اللَّهُ نُورُ السَّمَاوَاتِ وَالْأَرْضِ" اور حجاب و حیا کے احکام۔',
    symbolGlyph: 'Lightbulb',
    keyThemeUrdu: 'تمثیلِ نورِ الٰہی، احکامِ حیا و عفت، اور بیوتِ اذن اللہ۔'
  },
  25: {
    meaningUrdu: 'حق و باطل میں فرق کرنے والی کتاب',
    meaningEnglish: 'The Criterion',
    juzNumber: 18,
    thematicFamily: 'general',
    mnemonicKeyUrdu: 'عباد الرحمن کے ۱۲ سنہری اوصاف: جو زمین پر عاجزی سے چلتے ہیں اور راتیں سجدے میں گزارتے ہیں۔',
    symbolGlyph: 'Scale',
    keyThemeUrdu: 'شانِ قرآن، رسولؐ کی کفار سے شکایت، اور صفاتِ عباد الرحمن۔'
  },
  26: {
    meaningUrdu: 'شعراء (شاعر)',
    meaningEnglish: 'The Poets',
    juzNumber: 19,
    thematicFamily: 'tawaseen',
    mnemonicKeyUrdu: 'دعوتِ ذو العشیرہ کی سورت: "وَأَنذِرْ عَشِيرَتَكَ الْأَقْرَبِينَ"۔',
    symbolGlyph: 'PenTool',
    keyThemeUrdu: 'انذارِ عشیرہ، رسالت کے خلاف بے بنیاد الزامات، اور حق گو شعراء۔'
  },
  27: {
    meaningUrdu: 'چیونٹی',
    meaningEnglish: 'The Ant',
    juzNumber: 19,
    thematicFamily: 'tawaseen',
    mnemonicKeyUrdu: 'چیونٹی کی بولی سننے والے حضرت سلیمانؑ اور ملکہ سبا کا خط: "إِنَّهُ مِن سُلَيْمَانَ وَإِنَّهُ بِسْمِ اللَّهِ..."۔',
    symbolGlyph: 'Bug',
    keyThemeUrdu: 'حکومتِ سلیمانؑ، منطق الطیر، اور ہدہد کا واقعہ۔'
  },
  28: {
    meaningUrdu: 'تاریخی واقعات و سرگزشت',
    meaningEnglish: 'The Stories',
    juzNumber: 20,
    thematicFamily: 'tawaseen',
    mnemonicKeyUrdu: 'موسیٰؑ کی ولادت، صندوق کا نیل میں بہنا، مدین کا سفر اور قارون کے خزانوں کا زمین میں دھنسنا۔',
    symbolGlyph: 'BookOpen',
    keyThemeUrdu: 'ارادۂ الٰہی برائے مستضعفین، تکبرِ قارون، اور وعدۂ فتح۔'
  },
  29: {
    meaningUrdu: 'مکڑی اور اس کا کمزور جالا',
    meaningEnglish: 'The Spider',
    juzNumber: 20,
    thematicFamily: 'general',
    mnemonicKeyUrdu: 'باطل کے سہاروں کی مثال مکڑی کے بودے جالے جیسی ہے: "وَإِنَّ أَوْهَنَ الْبُيُوتِ لَبَيْتُ الْعَنكَبُوتِ"۔',
    symbolGlyph: 'Network',
    keyThemeUrdu: 'آزمائشِ ایمان، شرک کی کمزوری، اور نماز کا فحشاء سے روکنا۔'
  },
  30: {
    meaningUrdu: 'رومی سلطنت',
    meaningEnglish: 'The Romans',
    juzNumber: 21,
    thematicFamily: 'general',
    mnemonicKeyUrdu: 'قرآن کی تاریخی پیشگوئی: مغلوب رومی چند سالوں میں اہل فارس پر غالب آ جائیں گے۔',
    symbolGlyph: 'Flag',
    keyThemeUrdu: 'اعجازِ پیشگوئی، آیاتِ تکوینی، اور زوجین میں مودت و رحمت۔'
  },
  31: {
    meaningUrdu: 'حکیم لقمان',
    meaningEnglish: 'Luqman',
    juzNumber: 21,
    thematicFamily: 'general',
    mnemonicKeyUrdu: 'باپ کی بیٹے کو دائمی نصیحتیں: شرک نہ کرنا، تکبر سے نہ چلنا، نماز قائم کرنا۔',
    symbolGlyph: 'UserCheck',
    keyThemeUrdu: 'حکمتِ لقمان، والدین کا حق، اور غیب کے پانچ خزانے۔'
  },
  32: {
    meaningUrdu: 'سجدۂ بندگی',
    meaningEnglish: 'The Prostration',
    juzNumber: 21,
    thematicFamily: 'azaaim',
    mnemonicKeyUrdu: 'عزائم کی سورت جس کی آیتِ سجدہ پر سجدۂ واجب ہے؛ راتوں کو بستروں سے الگ رہنے والے متقین۔',
    symbolGlyph: 'Sparkle',
    keyThemeUrdu: 'خلقتِ کائنات، سجدۂ معرفت، اور آخرت کا یقین۔'
  },
  33: {
    meaningUrdu: 'متحارب لشکر (غزوۂ خندق)',
    meaningEnglish: 'The Combined Forces',
    juzNumber: 21,
    thematicFamily: 'general',
    mnemonicKeyUrdu: 'آیتِ تطہیر ("إِنَّمَا يُرِيدُ اللَّهُ...") اور خاتم النبیین کا لقب۔',
    symbolGlyph: 'ShieldCheck',
    keyThemeUrdu: 'عصمتِ پنجتن پاکؑ، خاتمیتِ نبوتؐ، اور خندق میں علیؑ کی تاریخی ضربت۔'
  },
  34: {
    meaningUrdu: 'اہلِ سبا (یمن کی قوم)',
    meaningEnglish: 'Sheba',
    juzNumber: 22,
    thematicFamily: 'general',
    mnemonicKeyUrdu: 'داؤدؑ کے لیے لوہے کا نرم ہونا، سلیمانؑ کی جنات پر حکومت، اور سیلِ عرم کی تباہی۔',
    symbolGlyph: 'Anchor',
    keyThemeUrdu: 'شکر کے تقاضے، ناشکری کا عذاب، اور عالمِ غیب کی حاکمیت۔'
  },
  35: {
    meaningUrdu: 'کائنات کو عدم سے پیدا فرمانے والا',
    meaningEnglish: 'The Originator',
    juzNumber: 22,
    thematicFamily: 'general',
    mnemonicKeyUrdu: 'فرشتوں کے دو دو، تین تین پروں کا خالق؛ تمام انسان اللہ کے محتاج ہیں۔',
    symbolGlyph: 'Feather',
    keyThemeUrdu: 'خالقیتِ خدا، انسان کا فقرِ ذاتی، اور وارثانِ کتاب۔'
  },
  36: {
    meaningUrdu: 'یٰسٓ (قلبِ قرآن)',
    meaningEnglish: 'Ya-Sin',
    juzNumber: 22,
    thematicFamily: 'general',
    mnemonicKeyUrdu: 'قرآن کا دل؛ حبیبِ نجار کی گواہی اور قیامت کے دن اعضاء کی گفتگو۔',
    symbolGlyph: 'Heart',
    keyThemeUrdu: 'اثباتِ رسالت، موت کے بعد کی زندگی، اور "کن فیکون" کی قدرت۔'
  },
  37: {
    meaningUrdu: 'صف باندھنے والے فرشتے',
    meaningEnglish: 'Those Ranks',
    juzNumber: 23,
    thematicFamily: 'general',
    mnemonicKeyUrdu: 'حضرت اسماعیلؑ کی قربانی کا الٰہی خواب اور ذبحِ عظیم کا فدیہ۔',
    symbolGlyph: 'Layers',
    keyThemeUrdu: 'وفاداریِ ابراہیمؑ، فدیناہ بذبح عظیم، اور سرکش جنات پر شہابِ ثاقب۔'
  },
  38: {
    meaningUrdu: 'صٓ (حرفِ مقطع)',
    meaningEnglish: 'Sad',
    juzNumber: 23,
    thematicFamily: 'general',
    mnemonicKeyUrdu: 'حضرت داؤدؑ کی عدالت، سلیمانؑ کا گھوڑوں کی محبت پر امتحان، اور ایوبؑ کا صبر۔',
    symbolGlyph: 'FileText',
    keyThemeUrdu: 'صبرِ ایوبؑ، شفا کا چشمہ، اور ابلیس کی تکبر بھری سرکشی۔'
  },
  39: {
    meaningUrdu: 'گروہ در گروہ',
    meaningEnglish: 'The Troops',
    juzNumber: 23,
    thematicFamily: 'general',
    mnemonicKeyUrdu: '"قُلْ يَا عِبَادِيَ الَّذِينَ أَسْرَفُوا عَلَىٰ أَنفُسِهِمْ لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ" (رحمت کی امید)۔',
    symbolGlyph: 'UsersCheck',
    keyThemeUrdu: 'امیدِ مغفرت، قیامت پر گروہوں کی آمد، اور خالص بندگی۔'
  },
  40: {
    meaningUrdu: 'بخشنے والا (حوامیم کی پہلی سورت)',
    meaningEnglish: 'The Forgiver',
    juzNumber: 24,
    thematicFamily: 'hawameem',
    mnemonicKeyUrdu: 'آلِ فرعون کا مومن جو اپنے ایمان کو چھپاتا تھا اور حق کی نصرت کرتا تھا۔',
    symbolGlyph: 'ShieldAlert',
    keyThemeUrdu: 'مومنِ آلِ فرعون کا مناظرہ، عرش کے اٹھانے والے فرشتوں کی دعا، اور استغفار۔'
  },
  41: {
    meaningUrdu: 'کھول کر بیان کی گئی (حوامیم ۲)',
    meaningEnglish: 'Explained in Detail',
    juzNumber: 24,
    thematicFamily: 'hawameem',
    mnemonicKeyUrdu: 'عزائم کی سورت؛ انسان کی جلد اور کانوں کی قیامت میں گواہی۔',
    symbolGlyph: 'Eye',
    keyThemeUrdu: 'اعجازِ قرآن، گواہیِ اعضاء، اور سجدۂ تلاوت۔'
  },
  42: {
    meaningUrdu: 'باہمی مشاورت (حوامیم ۳)',
    meaningEnglish: 'The Consultation',
    juzNumber: 25,
    thematicFamily: 'hawameem',
    mnemonicKeyUrdu: 'آیتِ مودت کی سورت: "قُل لَّا أَسْأَلُكُمْ عَلَيْهِ أَجْرًا إِلَّا الْمَوَدَّةَ فِي الْقُرْبَىٰ"۔',
    symbolGlyph: 'MessageSquare',
    keyThemeUrdu: 'مودتِ قربٰیؑ (اہلِ بیتؑ)، امرہم شوریٰ بینہم، اور نزولِ وحی کے طریقے'
  },
  43: {
    meaningUrdu: 'سونے کی زینت و زیورات (حوامیم ۴)',
    meaningEnglish: 'The Ornaments of Gold',
    juzNumber: 25,
    thematicFamily: 'hawameem',
    mnemonicKeyUrdu: 'ام الکتاب میں محفوظ قرآنی حکمت، اور دنیاوی زیورات کی بے ثباتی۔',
    symbolGlyph: 'Sparkles',
    keyThemeUrdu: 'لوحِ محفوظ، زہدِ حقیقی، اور عیسیٰؑ کی آمد کے علامات۔'
  },
  44: {
    meaningUrdu: 'دھواں (حوامیم ۵)',
    meaningEnglish: 'The Smoke',
    juzNumber: 25,
    thematicFamily: 'hawameem',
    mnemonicKeyUrdu: 'شبِ قدر (لیلۃ مبارکہ) میں قرآن کا نزول اور آسمان پر چھا جانے والا عذاب کا دھواں۔',
    symbolGlyph: 'CloudRain',
    keyThemeUrdu: 'لیلۃ مبارکہ، تقدیر کے فیصلے، اور فرعون کا غرقاب ہونا۔'
  },
  45: {
    meaningUrdu: 'گھٹنوں کے بل گری ہوئی (حوامیم ۶)',
    meaningEnglish: 'The Kneeling',
    juzNumber: 25,
    thematicFamily: 'hawameem',
    mnemonicKeyUrdu: 'قیامت کے دن ہر قوم دہشت سے گھٹنوں کے بل گری ہوگی اور کتابِ اعمال کھولی جائے گی۔',
    symbolGlyph: 'Activity',
    keyThemeUrdu: 'حساب و کتاب کا خوف، نامۂ اعمال، اور کائنات کے تکوینی شواہد۔'
  },
  46: {
    meaningUrdu: 'ریت کے ٹیلے (حوامیم کی آخری سورت)',
    meaningEnglish: 'The Sand Dunes',
    juzNumber: 26,
    thematicFamily: 'hawameem',
    mnemonicKeyUrdu: 'قومِ عاد کے ریتیلے ٹیلے اور والدین کے ساتھ حسنِ سلوک کی وصیت۔',
    symbolGlyph: 'Compass',
    keyThemeUrdu: 'انجامِ قومِ عاد، والدین کا حق، اور جنات کا تلاوتِ قرآن سننا۔'
  },
  47: {
    meaningUrdu: 'حضرت محمد مصطفیٰ صلی اللہ علیہ و آلہ و سلم',
    meaningEnglish: 'Muhammad',
    juzNumber: 26,
    thematicFamily: 'general',
    mnemonicKeyUrdu: 'نامِ نامیِ رسولِ اعظمؐ؛ جن کے لائے ہوئے دین پر ایمان لانے سے تمام برائیاں مٹ جاتی ہیں۔',
    symbolGlyph: 'Award',
    keyThemeUrdu: 'اطاعتِ رسولؐ، جنگی قیدیوں کے احکام، اور منافقین کا فتنہ۔'
  },
  48: {
    meaningUrdu: 'کھلی فتح (صلحِ حدیبیہ)',
    meaningEnglish: 'The Victory',
    juzNumber: 26,
    thematicFamily: 'general',
    mnemonicKeyUrdu: '"إِنَّا فَتَحْنَا لَكَ فَتْحًا مُّبِينًا" اور بیعتِ رضوان کا پروقار منظر۔',
    symbolGlyph: 'Flag',
    keyThemeUrdu: 'فتحِ مبین، سکینتِ الٰہی، اور رسول اللہؐ کے صحابہ کی نشانیاں۔'
  },
  49: {
    meaningUrdu: 'حجرے (گھر کے کمرے)',
    meaningEnglish: 'The Rooms',
    juzNumber: 26,
    thematicFamily: 'general',
    mnemonicKeyUrdu: 'اسلامی اخلاقیات کا دستور: غیبت، تجسس، برے القاب کی ممانعت اور تقویٰ کی فضیلت۔',
    symbolGlyph: 'Home',
    keyThemeUrdu: 'ادبِ رسولؐ، اخوتِ اسلامی، اور ان اکرمکم عند اللہ اتقاکم۔'
  },
  50: {
    meaningUrdu: 'قٓ (مفصلات کا آغاز)',
    meaningEnglish: 'Qaf',
    juzNumber: 26,
    thematicFamily: 'mufassal',
    mnemonicKeyUrdu: 'اللہ انسان کی رگِ جاں سے بھی زیادہ قریب ہے: "وَنَحْنُ أَقْرَبُ إِلَيْهِ مِنْ حَبْلِ الْوَرِيدِ"۔',
    symbolGlyph: 'Activity',
    keyThemeUrdu: 'قربِ الٰہی، فرشتوں کا نامۂ اعمال لکھنا، اور قیامت کا صور۔'
  },
  51: {
    meaningUrdu: 'بکھیرنے والی ہوائیں',
    meaningEnglish: 'The Winnowing Winds',
    juzNumber: 26,
    thematicFamily: 'mufassal',
    mnemonicKeyUrdu: '"وَمَا خَلَقْتُ الْجِنَّ وَالْإِنسَ إِلَّا لِيَعْبُدُونِ" (تخلیق کا مقصد عبادت ہے)۔',
    symbolGlyph: 'Wind',
    keyThemeUrdu: 'مقصدِ تخلیق، ضیافتِ ابراہیمؑ، اور قومِ لوط پر پتھروں کی بارش۔'
  },
  52: {
    meaningUrdu: 'کوہِ طور',
    meaningEnglish: 'The Mount',
    juzNumber: 27,
    thematicFamily: 'mufassal',
    mnemonicKeyUrdu: 'طور، بیتِ معمور اور سمندروں کی قسم؛ جنتیوں کے باغات اور اولاد کی جنت میں ہم نشینی۔',
    symbolGlyph: 'Mountain',
    keyThemeUrdu: 'حتمی عذاب کی قسمیں، انعاماتِ متقین، اور منکرین کا عجز۔'
  },
  53: {
    meaningUrdu: 'چمکتا ستارہ (عزائم)',
    meaningEnglish: 'The Star',
    juzNumber: 27,
    thematicFamily: 'azaaim',
    mnemonicKeyUrdu: '"مَا يَنطِقُ عَنِ الْهَوَىٰ" — معراج میں سدرۃ المنتہیٰ کا مشاہدہ اور سجدۂ واجب۔',
    symbolGlyph: 'Sparkles',
    keyThemeUrdu: 'عصمتِ کلامِ نبویؐ، معراج کی رفعت، اور سجدۂ شکر۔'
  },
  54: {
    meaningUrdu: 'چاند (شق القمر کا معجزہ)',
    meaningEnglish: 'The Moon',
    juzNumber: 27,
    thematicFamily: 'mufassal',
    mnemonicKeyUrdu: 'انگلی کے اشارے سے چاند کے دو ٹکڑے ہونا: "اقْتَرَبَتِ السَّاعَةُ وَانشَقَّ الْقَمَرُ"۔',
    symbolGlyph: 'Moon',
    keyThemeUrdu: 'معجزۂ شق القمر، قرآن کا آسان فہم ہونا، اور قومِ نوح و ثمود کا سبق۔'
  },
  55: {
    meaningUrdu: 'بے پایاں رحمت والا پروردگار',
    meaningEnglish: 'The Beneficent',
    juzNumber: 27,
    thematicFamily: 'mufassal',
    mnemonicKeyUrdu: '۳۱ بار دہرایا جانے والا نغمہ: "فَبِأَيِّ آلَاءِ رَبِّكُمَا تُكَذِّبَانِ" (عروس القرآن)۔',
    symbolGlyph: 'HeartHandshake',
    keyThemeUrdu: 'تعلیمِ قرآن، بحرین کا ملنا (علیؑ و فاطمہؑ کی تمثیل)، اور جنت کے باغات۔'
  },
  56: {
    meaningUrdu: 'قیامت کا یقینی واقعہ',
    meaningEnglish: 'The Inevitable',
    juzNumber: 27,
    thematicFamily: 'mufassal',
    mnemonicKeyUrdu: 'تین گروہ: سابقون مقربون، اصحاب الیمین (دائیں ہاتھ والے)، اور اصحاب الشمال (بائیں والے)۔',
    symbolGlyph: 'Zap',
    keyThemeUrdu: 'تقسیمِ خلائق، رزق کی برکت، اور موت کی نزع۔'
  },
  57: {
    meaningUrdu: 'لوہا (مسبحات)',
    meaningEnglish: 'The Iron',
    juzNumber: 27,
    thematicFamily: 'musabbihat',
    mnemonicKeyUrdu: 'لوہے کا آسمان سے اتارا جانا جس میں جنگی قوت اور انسانی نفع ہے؛ صدقہ اور انفاق۔',
    symbolGlyph: 'Shield',
    keyThemeUrdu: 'تسبیحِ کائنات، انفاق فی سبیل اللہ، اور میزان و شمشیر کا فلسفہ۔'
  },
  58: {
    meaningUrdu: 'مقدمہ پیش کرنے والی خاتون',
    meaningEnglish: 'The Pleading Woman',
    juzNumber: 28,
    thematicFamily: 'general',
    mnemonicKeyUrdu: 'ہر آیت میں لفظِ "اللہ" کا آنا، ظہار کے پرانے ظالمانہ قانون کا خاتمہ، اور سرگوشیوں کے آداب۔',
    symbolGlyph: 'MessageCircle',
    keyThemeUrdu: 'سماعتِ دعا، نجی سرگوشیوں پر پابندی، اور حزب اللہ کا غلبہ۔'
  },
  59: {
    meaningUrdu: 'جلا وطنی و حشر (مسبحات)',
    meaningEnglish: 'The Exile',
    juzNumber: 28,
    thematicFamily: 'musabbihat',
    mnemonicKeyUrdu: '"اگر ہم یہ قرآن کسی پہاڑ پر اتارتے تو وہ خوفِ خدا سے پھٹ جاتا" — اسماء الحسنیٰ کا خوبصورت مجموعہ۔',
    symbolGlyph: 'MountainSnow',
    keyThemeUrdu: 'بنو نضیر کی جلا وطنی، مالِ فئے کے احکام، اور اسماء الحسنیٰ۔'
  },
  60: {
    meaningUrdu: 'امتحان لی جانے والی خاتون',
    meaningEnglish: 'The Examined One',
    juzNumber: 28,
    thematicFamily: 'general',
    mnemonicKeyUrdu: 'ہجرت کر کے آنے والی خواتین کا امتحان اور دشمنانِ دین سے خفیہ دوستی کی ممانعت۔',
    symbolGlyph: 'CheckCheck',
    keyThemeUrdu: 'ولاء و براء، اسوۂ ابراہیمؑ، اور بیعتِ نسواں۔'
  },
  61: {
    meaningUrdu: 'صف بندی (مسبحات)',
    meaningEnglish: 'The Ranks',
    juzNumber: 28,
    thematicFamily: 'musabbihat',
    mnemonicKeyUrdu: 'عیسیٰؑ کی بشارت: "میرے بعد ایک رسول آئیں گے جن کا نام احمدؐ ہوگا"۔',
    symbolGlyph: 'Users',
    keyThemeUrdu: 'بشارتِ احمدؐ، شیشہ پلائی ہوئی دیوار، اور تجارتِ نجات۔'
  },
  62: {
    meaningUrdu: 'جمعۃ المبارک (مسبحات)',
    meaningEnglish: 'Friday',
    juzNumber: 28,
    thematicFamily: 'musabbihat',
    mnemonicKeyUrdu: 'نمازِ جمعہ کی اذان پر کاروبار چھوڑ کر مسجد آنا، اور کتاب اٹھائے گدھے کی تمثیل۔',
    symbolGlyph: 'Clock',
    keyThemeUrdu: 'بعثت کے ۳ مقاصد (تلاوت، تزکیہ، تعلیم)، نمازِ جمعہ، اور دنیا پرستی کی مذمت۔'
  },
  63: {
    meaningUrdu: 'منافقین',
    meaningEnglish: 'The Hypocrites',
    juzNumber: 28,
    thematicFamily: 'general',
    mnemonicKeyUrdu: 'منافقین کے سردار عبد اللہ بن ابی کی سازشوں کا پردہ چاک اور موت سے قبل صدقہ دینے کی حسرت۔',
    symbolGlyph: 'EyeOff',
    keyThemeUrdu: 'جھوٹی قسمیں، تکبرِ منافقین، اور مال و اولاد کے فتنوں سے بچاؤ۔'
  },
  64: {
    meaningUrdu: 'ہار جیت کا دن (مسبحات)',
    meaningEnglish: 'Mutual Loss and Gain',
    juzNumber: 28,
    thematicFamily: 'musabbihat',
    mnemonicKeyUrdu: 'قیامت کا دن جہاں نقصان اور نفع کا اصل حساب کھلے گا؛ مال اور اولاد تمہارے لیے آزمائش ہیں۔',
    symbolGlyph: 'TrendingUp',
    keyThemeUrdu: 'روزِ تغابن، توکل علی اللہ، اور قرضِ حسنہ کی فضیلت۔'
  },
  65: {
    meaningUrdu: 'طلاق کے شرعی احکام',
    meaningEnglish: 'The Divorce',
    juzNumber: 28,
    thematicFamily: 'general',
    mnemonicKeyUrdu: '"وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا وَيَرْزُقْهُ مِنْ حَيْثُ لَا يَحْتَسِبُ" (تقویٰ کا راستہ)۔',
    symbolGlyph: 'FileCheck',
    keyThemeUrdu: 'احکامِ طلاق و عدت، نان و نفقہ، اور رزق کی فراوانی کا قرآنی نسخہ۔'
  },
  66: {
    meaningUrdu: 'حلال کو حرام ٹھہرانا',
    meaningEnglish: 'The Prohibition',
    juzNumber: 28,
    thematicFamily: 'general',
    mnemonicKeyUrdu: 'فرعون کی مومنہ زوجہ آسیہؑ اور مریمؑ کی عظمت بمقابلہ نوحؑ و لوطؑ کی بے وفا بیویاں۔',
    symbolGlyph: 'UserX',
    keyThemeUrdu: 'خاندانی راز، توبۂ نصوح، اور حق و باطل کی خواتین کا تقابل۔'
  },
  67: {
    meaningUrdu: 'سلطنت و بادشاہی (تبارک)',
    meaningEnglish: 'The Sovereignty',
    juzNumber: 29,
    thematicFamily: 'mufassal',
    mnemonicKeyUrdu: 'عذابِ قبر سے حفاظت کی سورت؛ زندگی اور موت کی تخلیق تاکہ تمہارے عمل کو پرکھا جائے۔',
    symbolGlyph: 'Crown',
    keyThemeUrdu: 'آزمائشِ حیات، آسمانوں کے طبقات، اور پرندوں کی پرواز۔'
  },
  68: {
    meaningUrdu: 'قلم (نزولی نمبر ۲)',
    meaningEnglish: 'The Pen',
    juzNumber: 29,
    thematicFamily: 'mufassal',
    mnemonicKeyUrdu: 'قلم کی قسم اور رسول اللہؐ کے اخلاقِ عظیم کی الٰہی سند: "وَإِنَّكَ لَعَلَىٰ خُلُقٍ عَظِيمٍ"۔',
    symbolGlyph: 'PenTool',
    keyThemeUrdu: 'قسمتِ قلم، خلقِ عظیم، اور باغ والوں کی آزمائش۔'
  },
  69: {
    meaningUrdu: 'برحق ہونے والی قیامت',
    meaningEnglish: 'The Inevitable Truth',
    juzNumber: 29,
    thematicFamily: 'mufassal',
    mnemonicKeyUrdu: 'قومِ ثمود و عاد کا عبرتناک خاتمہ اور دائیں ہاتھ میں نامۂ اعمال ملنے والے کی خوشی: "هَاؤُمُ اقْرَءُوا كِتَابِيَهْ"۔',
    symbolGlyph: 'BookOpenCheck',
    keyThemeUrdu: 'حتمیتِ قیامت، نامۂ اعمال، اور باطل پرندوں کا زوال۔'
  },
  70: {
    meaningUrdu: 'بلندی کی سیڑھیاں',
    meaningEnglish: 'The Ascending Steps',
    juzNumber: 29,
    thematicFamily: 'mufassal',
    mnemonicKeyUrdu: 'حارث بن نعمان فہری پر غدیر کے انکار پر آسمانی عذاب کا گرنا اور صبرِ جمیل کا حکم۔',
    symbolGlyph: 'TrendingUp',
    keyThemeUrdu: 'واقعۂ غدیر کا انکار، معارجِ ملائکہ، اور انسان کی حریص فطرت۔'
  },
  71: {
    meaningUrdu: 'حضرت نوحؑ',
    meaningEnglish: 'Noah',
    juzNumber: 29,
    thematicFamily: 'mufassal',
    mnemonicKeyUrdu: 'نوحؑ کی شب و روز کی تبلیغ، استغفار سے بارشوں اور مال کی کشادگی کا راز، اور بت پرستی کا رد۔',
    symbolGlyph: 'CloudDrizzle',
    keyThemeUrdu: 'صبرِ تبلیغ، فضیلتِ استغفار، اور بت پرستی کا تاریخی خاتمہ۔'
  },
  72: {
    meaningUrdu: 'جنات',
    meaningEnglish: 'The Jinn',
    juzNumber: 29,
    thematicFamily: 'qul',
    mnemonicKeyUrdu: 'جنات کے گروہ کا تلاوتِ قرآن سن کر مؤمن ہو جانا: "إِنَّا سَمِعْنَا قُرْآنًا عَجَبًا"۔',
    symbolGlyph: 'Flame',
    keyThemeUrdu: 'ایمانِ جنات، توحیدِ مطلق، اور مساجد صرف اللہ کے لیے۔'
  },
  73: {
    meaningUrdu: 'چادر میں لپٹنے والے (نزولی ۳)',
    meaningEnglish: 'The Enshrouded One',
    juzNumber: 29,
    thematicFamily: 'mufassal',
    mnemonicKeyUrdu: 'شب بیداری کا حکم: "قُمِ اللَّيْلَ إِلَّا قَلِيلًا" اور ترتیل کے ساتھ قرآن پڑھنے کی تاکید۔',
    symbolGlyph: 'MoonStar',
    keyThemeUrdu: 'تہجد کی تربیت، ترتیلِ قرآن، اور قولِ ثقیل کا بوجھ۔'
  },
  74: {
    meaningUrdu: 'کملی اوڑھنے والے (نزولی ۴)',
    meaningEnglish: 'The Cloaked One',
    juzNumber: 29,
    thematicFamily: 'mufassal',
    mnemonicKeyUrdu: 'کھڑے ہو جائیں اور بیدار کریں: "قُمْ فَأَنذِرْ وَرَبَّكَ فَكَبِّرْ" — انذارِ عام کا پہلا نقارہ۔',
    symbolGlyph: 'Volume2',
    keyThemeUrdu: 'دعوت کا اعلان، پاکیزگیِ لباس، اور سقر کی ۱۹ آگ۔'
  },
  75: {
    meaningUrdu: 'قیامت اور نفسِ لوامہ',
    meaningEnglish: 'The Resurrection',
    juzNumber: 29,
    thematicFamily: 'mufassal',
    mnemonicKeyUrdu: 'انسان کی انگلیوں کے پوروں (فنگر پرنٹس) کو دوبارہ بنانے کی الٰہی قدرت: "بَلَىٰ قَادِرِينَ عَلَىٰ أَن نُّسَوِّيَ بَنَانَهُ"۔',
    symbolGlyph: 'Fingerprint',
    keyThemeUrdu: 'اعجازِ انگلیوں کے پور، نفسِ ملامت گر، اور نزع کا وقت۔'
  },
  76: {
    meaningUrdu: 'انسان / سورۃ الدہر (ہل اتیٰ)',
    meaningEnglish: 'Man / Time',
    juzNumber: 29,
    thematicFamily: 'general',
    mnemonicKeyUrdu: 'اہلِ بیتؑ کی تین دن کی افطار کی تاریخی قربانی: "وَيُطْعِمُونَ الطَّعَامَ عَلَىٰ حُبِّهِ مِسْكِينًا وَيَتِيمًا وَأَسِيرًا"۔',
    symbolGlyph: 'Heart',
    keyThemeUrdu: 'شانِ پنجتن پاکؑ، نذرِ شفا، اور نعمت ہائے بہشت۔'
  },
  77: {
    meaningUrdu: 'بھیجی جانے والی ہوائیں',
    meaningEnglish: 'The Emissaries',
    juzNumber: 29,
    thematicFamily: 'mufassal',
    mnemonicKeyUrdu: '۱۰ مرتبہ تکرار: "وَيْلٌ يَوْمَئِذٍ لِّلْمُكَذِّبِينَ" (جھٹلانے والوں کے لیے ہلاکت)۔',
    symbolGlyph: 'Wind',
    keyThemeUrdu: 'ہواؤں کی قسمیں، قیامت کی آمد، اور جھٹلانے والوں کی رسوائی۔'
  },
  78: {
    meaningUrdu: 'عظیم خبر (عم یتساءلون)',
    meaningEnglish: 'The Great News',
    juzNumber: 30,
    thematicFamily: 'mufassal',
    mnemonicKeyUrdu: 'پارہ ۳۰ کا آغاز؛ النبأ العظیم سے مراد حضرت علیؑ کی ولایت ہے؛ قیامت کے دن پہاڑوں کا اڑنا۔',
    symbolGlyph: 'Compass',
    keyThemeUrdu: 'نبأ عظیم (ولایت و قیامت)، پہاڑوں کی میخیں، اور یوم الفصل۔'
  },
  79: {
    meaningUrdu: 'سختی سے روح کھینچنے والے فرشتے',
    meaningEnglish: 'Those Who Drag Forth',
    juzNumber: 30,
    thematicFamily: 'mufassal',
    mnemonicKeyUrdu: 'موسیٰؑ کا وادیِ مقدس طویٰ میں جانا اور فرعون کے تکبر کا انجام۔',
    symbolGlyph: 'Sparkles',
    keyThemeUrdu: 'جان کنی کے فرشتے، وادیِ طویٰ، اور قیامت کی دہل۔'
  },
  80: {
    meaningUrdu: 'پیشانی پر شکن ڈالنا',
    meaningEnglish: 'He Frowned',
    juzNumber: 30,
    thematicFamily: 'mufassal',
    mnemonicKeyUrdu: 'نابینا صحابی کے آنے پر ایک اموی سردار کی ناگواری اور قرآنی ملامت۔',
    symbolGlyph: 'EyeOff',
    keyThemeUrdu: 'معاشرتی طبقاتیت کا رد، لوحِ مکرم، اور قیامت کی افراتفری۔'
  },
  81: {
    meaningUrdu: 'سورج کا لپیٹا جانا (نزولی ۷)',
    meaningEnglish: 'The Overthrowing',
    juzNumber: 30,
    thematicFamily: 'mufassal',
    mnemonicKeyUrdu: 'زندہ درگور کی جانے والی معصوم بچی کا مقدمہ: "وَإِذَا الْمَوْءُودَةُ سُئِلَتْ بِأَيِّ ذَنبٍ قُتِلَتْ"۔',
    symbolGlyph: 'Sun',
    keyThemeUrdu: 'معصوم بچیوں کا مقدمہ، چمکتے ستاروں کی گردش، اور امانتِ جبرائیلؑ۔'
  },
  82: {
    meaningUrdu: 'آسمان کا پھٹنا',
    meaningEnglish: 'The Cleaving',
    juzNumber: 30,
    thematicFamily: 'mufassal',
    mnemonicKeyUrdu: '"يَا أَيُّهَا الْإِنسَانُ مَا غَرَّكَ بِرَبِّكَ الْكَرِيمِ" (تجھے کس چیز نے اپنے رب سے دھوکے میں رکھا؟)۔',
    symbolGlyph: 'Activity',
    keyThemeUrdu: 'کراماً کاتبین کی نگرانی، روزِ جزا کا فیصلہ، اور آسمان کا پھٹنا۔'
  },
  83: {
    meaningUrdu: 'ناپ تول میں کمی کرنے والے',
    meaningEnglish: 'The Defrauders',
    juzNumber: 30,
    thematicFamily: 'mufassal',
    mnemonicKeyUrdu: 'تول میں ڈنڈی مارنے والوں کے لیے ہلاکت؛ سجین اور علیین کا ریکارڈ۔',
    symbolGlyph: 'Scale',
    keyThemeUrdu: 'معاشی دیانت، کتابِ علیین و سجین، اور تسنیم کی شراب۔'
  },
  84: {
    meaningUrdu: 'آسمان کا شق ہونا',
    meaningEnglish: 'The Splitting Asunder',
    juzNumber: 30,
    thematicFamily: 'mufassal',
    mnemonicKeyUrdu: 'انسان کا اپنے رب کی طرف مشقت بھرا سفر: "يَا أَيُّهَا الْإِنسَانُ إِنَّكَ كَادِحٌ إِلَىٰ رَبِّكَ كَدْحًا"۔',
    symbolGlyph: 'Layers',
    keyThemeUrdu: 'کوشش و کدح، آسان حساب، اور سجدۂ تلاوت۔'
  },
  85: {
    meaningUrdu: 'آسمانی قلعے / برج',
    meaningEnglish: 'The Mansions of the Stars',
    juzNumber: 30,
    thematicFamily: 'mufassal',
    mnemonicKeyUrdu: 'اصحابِ اخدود کی آگ کی خندقیں اور مظلوم مؤمنین کی حق پر استقامت۔',
    symbolGlyph: 'Flame',
    keyThemeUrdu: 'شہادتِ اصحابِ اخدود، لوحِ محفوظ، اور بطشِ شدیدِ الٰہی۔'
  },
  86: {
    meaningUrdu: 'رات کو نمودار ہونے والا تارہ',
    meaningEnglish: 'The Nightcomer',
    juzNumber: 30,
    thematicFamily: 'mufassal',
    mnemonicKeyUrdu: 'انسان اچھلتے پانی سے بنا ہے؛ قیامت میں دلوں کے تمام راز کھل جائیں گے۔',
    symbolGlyph: 'Star',
    keyThemeUrdu: 'تارۂ ثاقب، یوم تبلی السرائر، اور انسان کی حفاظت کا فرشتہ۔'
  },
  87: {
    meaningUrdu: 'سب سے بلند و برتر ذات (مسبحات)',
    meaningEnglish: 'The Most High',
    juzNumber: 30,
    thematicFamily: 'musabbihat',
    mnemonicKeyUrdu: 'رسول اللہؐ کو یادداشت کا ابدی وعدہ: "سَنُقْرِئُكَ فَلَا تَنسَىٰ" (ہم آپ کو پڑھائیں گے پس آپ نہ بھولیں گے)۔',
    symbolGlyph: 'Sparkles',
    keyThemeUrdu: 'تسبیحِ ربِ اعلیٰ، حفظِ قرآن کی ضمانت، اور صحفِ ابراہیمؑ و موسیٰؑ۔'
  },
  88: {
    meaningUrdu: 'چھانے والی قیامت',
    meaningEnglish: 'The Overwhelming',
    juzNumber: 30,
    thematicFamily: 'mufassal',
    mnemonicKeyUrdu: 'اونٹ کی بناوٹ، آسمان کی بلندی اور پہاڑوں کی مضبوطی میں غور و فکر کی دعوت۔',
    symbolGlyph: 'Eye',
    keyThemeUrdu: 'خوفزدہ چہرے بمقابلہ شاداب چہرے، نشانیاںِ قدرت، اور انما انت مذکر۔'
  },
  89: {
    meaningUrdu: 'فجر اور دس راتیں',
    meaningEnglish: 'The Daybreak',
    juzNumber: 30,
    thematicFamily: 'mufassal',
    mnemonicKeyUrdu: 'سورۃ الحسینؑ: "يَا أَيَّتُهَا النَّفْسُ الْمُطْمَئِنَّةُ ارْجِعِي إِلَىٰ رَبِّكِ رَاضِيَةً مَّرْضِيَّةً"۔',
    symbolGlyph: 'SunMedium',
    keyThemeUrdu: 'نفسِ مطمئنہ، ارم ذات العماد، اور شہادتِ سید الشہداءؑ کا روحانی تعلق۔'
  },
  90: {
    meaningUrdu: 'شہرِ مکہ مکرمہ',
    meaningEnglish: 'The City',
    juzNumber: 30,
    thematicFamily: 'mufassal',
    mnemonicKeyUrdu: 'اس مقدس شہر کی قسم جس میں رسول اللہؐ تشریف فرما ہیں: "لَا أُقْسِمُ بِهَٰذَا الْبَلَدِ وَأَنتَ حِلٌّ بِهَٰذَا الْبَلَدِ"۔',
    symbolGlyph: 'Building2',
    keyThemeUrdu: 'حرمتِ رسولؐ، گھاٹی کا پار کرنا (بھوکوں کو کھانا کھلانا)، اور اصحاب المیمنہ۔'
  },
  91: {
    meaningUrdu: 'سورج اور اس کی چمک',
    meaningEnglish: 'The Sun',
    juzNumber: 30,
    thematicFamily: 'mufassal',
    mnemonicKeyUrdu: '۱۱ مسلسل قسمیں: "قَدْ أَفْلَحَ مَن زَكَّاهَا وَقَدْ خَابَ مَن دَسَّاهَا" اور ناقۂ ثمود کو قتل کرنے والا بدبخت۔',
    symbolGlyph: 'Sun',
    keyThemeUrdu: 'تزکیۂ نفس، قسم ہائے کائنات، اور اشقی الاولین و الآخرین۔'
  },
  92: {
    meaningUrdu: 'رات جب چھا جائے',
    meaningEnglish: 'The Night',
    juzNumber: 30,
    thematicFamily: 'mufassal',
    mnemonicKeyUrdu: 'انسانوں کی راہیں مختلف ہیں؛ جس نے راہِ خدا میں دیا اس کے لیے آسانی، جس نے بخل کیا اس کے لیے تنگی۔',
    symbolGlyph: 'Moon',
    keyThemeUrdu: 'سخاوت بمقابلہ بخل، آسان راہ، اور آتشِ تلظی۔'
  },
  93: {
    meaningUrdu: 'چاشت کا وقت (نزولی ۱۱)',
    meaningEnglish: 'The Morning Brightness',
    juzNumber: 30,
    thematicFamily: 'mufassal',
    mnemonicKeyUrdu: 'تسکینِ قلبِ رسولؐ: "مَا وَدَّعَكَ رَبُّكَ وَمَا قَلَىٰ" (آپ کے رب نے آپ کو نہ چھوڑا نہ ناراض ہوا)۔',
    symbolGlyph: 'Sunrise',
    keyThemeUrdu: 'عطا کا وعدہ (ولسوف یعطیک ربک فترضی)، یتیم کی پناہ، اور شکرِ نعمت۔'
  },
  94: {
    meaningUrdu: 'سینے کا کھلنا (نزولی ۱۲)',
    meaningEnglish: 'The Expansion',
    juzNumber: 30,
    thematicFamily: 'mufassal',
    mnemonicKeyUrdu: '"أَلَمْ نَشْرَحْ لَكَ صَدْرَكَ" اور "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا" (ہر تنگی کے بعد آسانی ہے)۔',
    symbolGlyph: 'Heart',
    keyThemeUrdu: 'شرحِ صدر، بلندیِ ذکرِ رسولؐ، اور آسانی کا قرآنی قانون۔'
  },
  95: {
    meaningUrdu: 'انجیر اور زیتون',
    meaningEnglish: 'The Fig',
    juzNumber: 30,
    thematicFamily: 'mufassal',
    mnemonicKeyUrdu: 'انسان بہترین سانچے میں پیدا ہوا: "لَقَدْ خَلَقْنَا الْإِنسَانَ فِي أَحْسَنِ تَقْوِيمٍ"۔',
    symbolGlyph: 'Apple',
    keyThemeUrdu: 'احسنِ تقویم، اسفل سافلین، اور احکم الحاکمین۔'
  },
  96: {
    meaningUrdu: 'خون کا لوتھڑا (نزولی نمبر ۱)',
    meaningEnglish: 'The Clot',
    juzNumber: 30,
    thematicFamily: 'azaaim',
    mnemonicKeyUrdu: 'غارِ حرا کی پہلی وحی: "اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ" — مصحف میں ۹۶ مگر نزول میں اول۔',
    symbolGlyph: 'BookOpen',
    keyThemeUrdu: 'پہلی وحی، علم بذریعہ قلم، اور تکبرِ ابو جہل کا رد۔'
  },
  97: {
    meaningUrdu: 'شبِ قدر کی عظمت',
    meaningEnglish: 'The Power',
    juzNumber: 30,
    thematicFamily: 'mufassal',
    mnemonicKeyUrdu: 'ہزار مہینوں سے افضل رات جس میں فرشتے اور روح امامِ زمانہؑ پر تقدیریں لے کر اترتے ہیں۔',
    symbolGlyph: 'Sparkles',
    keyThemeUrdu: 'نزولِ قرآن، خیر من الف شہر، اور سلامتی کی رات۔'
  },
  98: {
    meaningUrdu: 'واضح روشن دلیل',
    meaningEnglish: 'The Clear Proof',
    juzNumber: 30,
    thematicFamily: 'general',
    mnemonicKeyUrdu: 'خیر البریہ کی سورت: "أُولَٰئِكَ هُمْ خَيْرُ الْبَرِيَّةِ" (رسولؐ نے فرمایا: علیؑ اور ان کے پیروکار)۔',
    symbolGlyph: 'Award',
    keyThemeUrdu: 'بَیّنہ، اخلاصِ عبادت، اور خیر البریہ بمقابلہ شر البریہ۔'
  },
  99: {
    meaningUrdu: 'زلزلے سے زمین کا ہلنا',
    meaningEnglish: 'The Earthquake',
    juzNumber: 30,
    thematicFamily: 'mufassal',
    mnemonicKeyUrdu: 'ذرہ برابر نیکی اور ذرہ برابر برائی کا سامنے آ جانا: "فَمَن يَعْمَلْ مِثْقَالَ ذَرَّةٍ خَيْرًا يَرَهُ"۔',
    symbolGlyph: 'Activity',
    keyThemeUrdu: 'زلزلۂ ارض، زمین کی گواہی، اور ذرہ ذرہ کا حساب۔'
  },
  100: {
    meaningUrdu: 'ہانپتے ہوئے دوڑنے والے گھوڑے',
    meaningEnglish: 'The Courser',
    juzNumber: 30,
    thematicFamily: 'mufassal',
    mnemonicKeyUrdu: 'غزوۂ ذات السلاسل میں حضرت علیؑ کی شجاعت پر نازل ہونے والی صبح کے حملے کی قسمیں۔',
    symbolGlyph: 'Swords',
    keyThemeUrdu: 'مجاہدین کے گھوڑوں کی قسمیں، شجاعتِ حیدرؑ، اور ناشکری کا بطلان۔'
  },
  101: {
    meaningUrdu: 'کھٹکھٹانے والی قیامت',
    meaningEnglish: 'The Calamity',
    juzNumber: 30,
    thematicFamily: 'mufassal',
    mnemonicKeyUrdu: 'لوگوں کا بکھرے پروانوں کی طرح اور پہاڑوں کا دھنکی اون کی طرح ہونا۔',
    symbolGlyph: 'Flame',
    keyThemeUrdu: 'ہولناکیِ قیامت، میزان کے پلڑے، اور ہاویہ کی دہکتی آگ۔'
  },
  102: {
    meaningUrdu: 'مال و دولت کی کثرت کا مقابلہ',
    meaningEnglish: 'The Rivalry in World Increase',
    juzNumber: 30,
    thematicFamily: 'mufassal',
    mnemonicKeyUrdu: '"أَلْهَاكُمُ التَّكَاثُرُ حَتَّىٰ زُرْتُمُ الْمَقَابِرَ" (کثرت کی ہوس نے تمہیں قبروں تک غافل رکھا)۔',
    symbolGlyph: 'TrendingUp',
    keyThemeUrdu: 'تکاثر کی مذمت، عین الیقین، اور نعمتوں پر بازپرس۔'
  },
  103: {
    meaningUrdu: 'زمانے کی قسم (عصر)',
    meaningEnglish: 'The Declining Day',
    juzNumber: 30,
    thematicFamily: 'mufassal',
    mnemonicKeyUrdu: 'قرآن کا نچوڑ: تمام انسان خسارے میں ہیں سوائے ایمان، عملِ صالح، تواصی بالحق اور صبر کرنے والوں کے۔',
    symbolGlyph: 'Clock',
    keyThemeUrdu: 'قسمتِ زمانہ، نجات کے ۴ ارکان (ایمان، عمل، حق، صبر)۔'
  },
  104: {
    meaningUrdu: 'طعنہ زنی اور عیب جوئی کرنے والے',
    meaningEnglish: 'The Traducer',
    juzNumber: 30,
    thematicFamily: 'mufassal',
    mnemonicKeyUrdu: 'مال جوڑنے اور عیب ٹٹولنے والے حطمہ کی بند آگ میں جلائے جائیں گے۔',
    symbolGlyph: 'ShieldAlert',
    keyThemeUrdu: 'بدگوئی و غیبت کی ممانعت، اور حطمہ کی آگ۔'
  },
  105: {
    meaningUrdu: 'ہاتھی والے (عام الفیل)',
    meaningEnglish: 'The Elephant',
    juzNumber: 30,
    thematicFamily: 'mufassal',
    mnemonicKeyUrdu: 'ابرہہ کے ہاتھیوں پر ابابیلوں کا کنکر پھینکنا اور کھائے ہوئے بھوسے کی طرح بنا دینا۔',
    symbolGlyph: 'Compass',
    keyThemeUrdu: 'حفاظتِ کعبہ، معجزۂ ابابیل، اور اصحابِ فیل کی ہلاکت۔'
  },
  106: {
    meaningUrdu: 'قبیلہ قریش',
    meaningEnglish: 'Quraysh',
    juzNumber: 30,
    thematicFamily: 'mufassal',
    mnemonicKeyUrdu: 'سردی اور گرمی کے تجارتی قافلے اور ربِ کعبہ کی عبادت جس نے بھوک میں کھلایا اور خوف سے بچایا۔',
    symbolGlyph: 'Compass',
    keyThemeUrdu: 'الفتِ قریش، امنِ مکہ، اور ربِ کعبہ کا شکر۔'
  },
  107: {
    meaningUrdu: 'روزمرہ کی برتنے والی اشیاء',
    meaningEnglish: 'The Small Kindness',
    juzNumber: 30,
    thematicFamily: 'mufassal',
    mnemonicKeyUrdu: 'نماز سے غفلت اور پڑوسی کو چھوٹی موٹی برتنے کی چیز دینے سے روکنے والے کی مذمت۔',
    symbolGlyph: 'HelpingHand',
    keyThemeUrdu: 'حقوق العباد، یتیم کو دھکے دینے کی مذمت، اور ریاکاری کا عیب۔'
  },
  108: {
    meaningUrdu: 'خیرِ کثیر (حضرت فاطمۃ الزہراءؑ)',
    meaningEnglish: 'The Abundance',
    juzNumber: 30,
    thematicFamily: 'mufassal',
    mnemonicKeyUrdu: '"إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ" — ابتر کا طعنہ دینے والے کا مقطوع النسل ہونا اور نسلِ نبویؐ کا ابدی بقا۔',
    symbolGlyph: 'Sparkles',
    keyThemeUrdu: 'عطائے زہراءؑ (خیرِ کثیر)، نماز و نحر، اور دشمن کی بے نام و نشانی۔'
  },
  109: {
    meaningUrdu: 'کافر لوگ',
    meaningEnglish: 'The Disbelievers',
    juzNumber: 30,
    thematicFamily: 'qul',
    mnemonicKeyUrdu: 'عقائد پر غیر مشروط استقامت: "لَكُمْ دِينُكُمْ وَلِيَ دِينِ" (تمہارے لیے تمہارا دین، میرے لیے میرا دین)۔',
    symbolGlyph: 'Shield',
    keyThemeUrdu: 'براءت از شرک، عقیدے کی آزادی، اور عدمِ سمجھوتہ۔'
  },
  110: {
    meaningUrdu: 'نصرتِ خداوندی (نزولی نمبر ۱۱۴)',
    meaningEnglish: 'The Divine Support',
    juzNumber: 30,
    thematicFamily: 'mufassal',
    mnemonicKeyUrdu: 'نزول کی آخری مکمل سورت؛ فوج در فوج دین میں داخل ہونا اور تسبیح و استغفار کا حکم۔',
    symbolGlyph: 'Flag',
    keyThemeUrdu: 'فتحِ مکہ کی تکمیل، استغفار، اور رحلتِ نبویؐ کا اشارہ۔'
  },
  111: {
    meaningUrdu: 'کھجور کی رسی / ابو لہب',
    meaningEnglish: 'The Palm Fibre',
    juzNumber: 30,
    thematicFamily: 'mufassal',
    mnemonicKeyUrdu: 'ابو لہب کے دونوں ہاتھ ٹوٹ گئے اور اس کی ایندھن اٹھانے والی بیوی کی گردن میں مونج کی رسی۔',
    symbolGlyph: 'Flame',
    keyThemeUrdu: 'عداوتِ حق کا انجام، ہلاکتِ ابو لہب، اور مال کی بے سودگی۔'
  },
  112: {
    meaningUrdu: 'خالص توحید (ثلث القرآن)',
    meaningEnglish: 'The Sincerity',
    juzNumber: 30,
    thematicFamily: 'qul',
    mnemonicKeyUrdu: '"قُلْ هُوَ اللَّهُ أَحَدٌ اللَّهُ الصَّمَدُ" — قرآن کے ایک تہائی کے برابر خالص توحید کا منشور۔',
    symbolGlyph: 'Sun',
    keyThemeUrdu: 'احدیت، صمدیت، اور لم یلد ولم یولد کی یکتائی۔'
  },
  113: {
    meaningUrdu: 'صبح کا پھوٹنا (معوذتین ۱)',
    meaningEnglish: 'The Daybreak',
    juzNumber: 30,
    thematicFamily: 'qul',
    mnemonicKeyUrdu: 'صبح کے رب کی پناہ: اندھیری رات، گرہوں میں پھونکنے والیوں، اور حاسد کے حسد کے شر سے۔',
    symbolGlyph: 'Sunrise',
    keyThemeUrdu: 'پناہِ الٰہی، شرورِ کائنات، اور حسد کے زہر سے حفاظت۔'
  },
  114: {
    meaningUrdu: 'انسان (معوذتین ۲ - اختتامِ مصحف)',
    meaningEnglish: 'Mankind',
    juzNumber: 30,
    thematicFamily: 'qul',
    mnemonicKeyUrdu: 'مصحف کی آخری سورت؛ وسوسہ ڈالنے والے خناس کے شر سے انسانوں کے بادشاہ اور معبود کی پناہ۔',
    symbolGlyph: 'Users',
    keyThemeUrdu: 'قل اعوذ برب الناس، وسوسۂ خناس سے امان، اور تکمیلِ مصحف۔'
  }
};

// Map each surah in SURAHS_DATA into the complete pedagogical model
export const MEMORIZATION_SURAHS: MemorizationSurah[] = SURAHS_DATA.map((s) => {
  const ext = SURAH_METADATA_EXTENDED[s.n] || {
    meaningUrdu: 'سورتِ مبارکہ',
    meaningEnglish: s.en,
    juzNumber: 1,
    thematicFamily: 'general' as ThematicFamily,
    mnemonicKeyUrdu: `${s.ur}: مصحفی نمبر ${s.n}، نزولی نمبر ${s.nuzul}۔`,
    symbolGlyph: 'BookOpen',
    keyThemeUrdu: 'قرآنی ہدایت اور الٰہی احکام۔'
  };

  // Determine chronological phase by nuzool number
  let phase: ChronologicalPhase = 'madani';
  if (s.nuzul <= 25) {
    phase = 'early_makki';
  } else if (s.nuzul <= 60) {
    phase = 'mid_makki';
  } else if (s.nuzul <= 86) {
    phase = 'late_makki';
  } else {
    phase = 'madani';
  }

  return {
    mushafOrder: s.n,
    nuzoolOrder: s.nuzul,
    nameArabic: s.ar,
    nameUrdu: s.ur,
    nameEnglish: s.en,
    meaningUrdu: ext.meaningUrdu,
    meaningEnglish: ext.meaningEnglish,
    versesCount: s.verses,
    revelationPlace: s.type as RevelationPlace,
    juzNumber: ext.juzNumber,
    chronologicalPhase: phase,
    thematicFamily: ext.thematicFamily,
    mushafDecadeGroup: Math.ceil(s.n / 10),
    nuzoolDecadeGroup: Math.ceil(s.nuzul / 10),
    mnemonicKeyUrdu: ext.mnemonicKeyUrdu,
    symbolGlyph: ext.symbolGlyph,
    keyThemeUrdu: ext.keyThemeUrdu,
  };
});

// Quick access lookups
export const SURAHS_BY_MUSHAF = [...MEMORIZATION_SURAHS].sort((a, b) => a.mushafOrder - b.mushafOrder);
export const SURAHS_BY_NUZOOL = [...MEMORIZATION_SURAHS].sort((a, b) => a.nuzoolOrder - b.nuzoolOrder);

// Thematic Families Metadata
export const THEMATIC_FAMILIES_INFO = [
  { id: 'all', titleUrdu: 'تمام سورتیں (۱۱۴)', count: 114, color: '#059669' },
  { id: 'sab_tiwal', titleUrdu: 'سبع طوال (۷ لمبی سورتیں)', count: 7, color: '#2563eb' },
  { id: 'hawameem', titleUrdu: 'حوامیم (۷ سُوَرِ حم)', count: 7, color: '#d97706' },
  { id: 'musabbihat', titleUrdu: 'مسبحات (۷ تسبیح والی سورتیں)', count: 7, color: '#7c3aed' },
  { id: 'tawaseen', titleUrdu: 'طواسین (۳ سُوَرِ طس)', count: 3, color: '#0d9488' },
  { id: 'azaaim', titleUrdu: 'عزائم (۴ سجدۂ واجبہ)', count: 4, color: '#dc2626' },
  { id: 'qul', titleUrdu: 'سُوَرِ قُل (۵ سورتیں)', count: 5, color: '#16a34a' },
  { id: 'mufassal', titleUrdu: 'مفصلات (قٓ تا ناس)', count: 65, color: '#ea580c' },
];

// Revelation Phases Metadata
export const REVELATION_PHASES_INFO = [
  {
    id: 'early_makki',
    titleUrdu: '۱. سحرِ بعثت و فکری جھٹکے',
    subtitleUrdu: 'اوائلِ مکہ (نزولی ۱ تا ۲۵)',
    summaryUrdu: 'غارِ حرا سے علانیہ دعوت تک؛ توحید، قیامت کی ہولناکی اور اخلاق کی بنیاد۔',
    color: '#d97706',
    count: 25,
  },
  {
    id: 'mid_makki',
    titleUrdu: '۲. انبیائی داستانیں و استقامت',
    subtitleUrdu: 'اواسطِ مکہ (نزولی ۲۶ تا ۶۰)',
    summaryUrdu: 'ظلم و ستم کے دور میں انبیائے کرام کے صبر کی داستانیں اور قلبِ نبویؐ کی تسکین۔',
    color: '#0284c7',
    count: 35,
  },
  {
    id: 'late_makki',
    titleUrdu: '۳. محاصرہ، معراج و الوداعِ مکہ',
    subtitleUrdu: 'اواخرِ مکہ (نزولی ۶۱ تا ۸۶)',
    summaryUrdu: 'شعبِ ابی طالب کا محاصرہ، عام الحزن، معراجِ مصطفیٰؐ اور ہجرت کی تیاری۔',
    color: '#7c3aed',
    count: 26,
  },
  {
    id: 'madani',
    titleUrdu: '۴. تشریع، اخوت و ریاستِ الٰہیہ',
    subtitleUrdu: 'مدینہ منورہ (نزولی ۸۷ تا ۱۱۴)',
    summaryUrdu: 'اسلامی ریاست کا قیام، قوانین، جہاد، منافقین اور دین کی آخری تکمیل (غدیر)۔',
    color: '#059669',
    count: 28,
  },
];
