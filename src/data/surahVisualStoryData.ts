/**
 * Visual Storytelling, Narrative Coherence, and Visual Riddles Data
 * سورتوں کے اسماء، باہمی ربط، اور تصویری پہیلیوں کا جامع تدریسی ڈیٹا
 */

export interface SurahVisualStoryBeat {
  mushafOrder: number;
  nuzoolOrder: number;
  nameUrdu: string;
  nameArabic: string;
  visualEmoji: string;
  visualSymbolTitle: string;
  mushafStorySentence: string;   // مصحفی کہانی کا جملہ جو اگلی سورت سے جوڑتا ہے
  nuzoolStorySentence: string;   // نزولی کہانی کا تاریخی تسلسل
}

export interface VisualRiddleChallenge {
  id: string;
  titleUrdu: string;
  difficulty: 'easy' | 'medium' | 'master';
  orderType: 'mushaf' | 'nuzool';
  emojis: string[];
  clueUrdu: string;
  correctSurahOrders: number[];
  options: {
    labelUrdu: string;
    isCorrect: boolean;
  }[];
}

// Curated 114 Surahs Visual Glyphs & Story Chains
export const SURAH_VISUAL_STORY_BEATS: SurahVisualStoryBeat[] = [
  {
    mushafOrder: 1,
    nuzoolOrder: 5,
    nameUrdu: 'سورۃ الفاتحہ',
    nameArabic: 'الفاتحة',
    visualEmoji: '🚪',
    visualSymbolTitle: 'کھلنے والا عظیم دروازہ (The Grand Gateway)',
    mushafStorySentence: 'سب سے پہلے اللہ کی حمد کے ساتھ نور کا ایک عظیم الشان دروازہ کھلا۔',
    nuzoolStorySentence: 'ابتدائی انذار کے بعد اسلام کا پہلا باضابطہ مکمل منشور اور دعا نازل ہوئی۔'
  },
  {
    mushafOrder: 2,
    nuzoolOrder: 87,
    nameUrdu: 'سورۃ البقرہ',
    nameArabic: 'البقرة',
    visualEmoji: '🐄',
    visualSymbolTitle: 'سرسبز چراگاہ اور سنہری گائے (The Fertile Pasture & Cow)',
    mushafStorySentence: 'دروازے کے پار ایک وسیع سرسبز میدان تھا جس میں بنی اسرائیل کی سنہری گائے کا واقعہ پیش آیا۔',
    nuzoolStorySentence: 'ہجرتِ مدینہ کے بعد اسلامی ریاست کا پہلا اور طویل ترین دستوری و فقہی ضابطہ تشکیل پایا۔'
  },
  {
    mushafOrder: 3,
    nuzoolOrder: 89,
    nameUrdu: 'سورۃ آلِ عمران',
    nameArabic: 'آل عمران',
    visualEmoji: '🏡',
    visualSymbolTitle: 'برگزیدہ خاندان کا پاک گھر (The Sacred Family Home)',
    mushafStorySentence: 'اس چراگاہ کے پاس حضرت مریمؑ و عیسیٰؑ کے متقی خاندان (آلِ عمران) کا مقدس گھر تھا۔',
    nuzoolStorySentence: 'غزوۂ بدر کی فتح کے بعد غزوۂ احد کی آزمائش اور نجران کے عیسائیوں کے ساتھ مباہلہ کا مرحلہ آیا۔'
  },
  {
    mushafOrder: 4,
    nuzoolOrder: 92,
    nameUrdu: 'سورۃ النساء',
    nameArabic: 'النساء',
    visualEmoji: '🛡️',
    visualSymbolTitle: 'خواتین اور یتیموں کی حفاظت کی ڈھال (The Shield of Family Justice)',
    mushafStorySentence: 'اس پاکیزہ گھرانے میں مائیں اور بہنیں خاندانی عدل، وراثت اور یتیموں کے حقوق کی حفاظت کر رہی تھیں۔',
    nuzoolStorySentence: 'احد کے شہداء کے بعد یتیموں اور بیواؤں کی کفالت اور معاشرتی حقوق کا الٰہی قانون نافذ ہوا۔'
  },
  {
    mushafOrder: 5,
    nuzoolOrder: 112,
    nameUrdu: 'سورۃ المائدہ',
    nameArabic: 'المائدة',
    visualEmoji: '🍲',
    visualSymbolTitle: 'آسمانی خوانِ نعمت و اکمالِ دین (The Celestial Feast Table)',
    mushafStorySentence: 'پھر ان پاک نفوس کے لیے آسمان سے خوشبو دار نعمتوں سے سجا الٰہی دسترخوان اترا۔',
    nuzoolStorySentence: 'حجۃ الوداع اور غدیرِ خم کے میدان میں دین کی آخری تکمیل اور ولایتِ علیؑ کا اعلان ہوا۔'
  },
  {
    mushafOrder: 6,
    nuzoolOrder: 55,
    nameUrdu: 'سورۃ الانعام',
    nameArabic: 'الأنعام',
    visualEmoji: '🐑',
    visualSymbolTitle: 'چوپائے اور خالص توحید کے شواہد (The Grazing Cattle & Pure Monotheism)',
    mushafStorySentence: 'دسترخوان کے گرد مفید چوپائے چر رہے تھے جن میں حضرت ابراہیمؑ نے توحید کے روشن دلائل تلاش کیے۔',
    nuzoolStorySentence: 'مکہ کے سخت دور میں ایک ہی رات میں ستر ہزار فرشتوں کے جلو میں خالص توحید کا اعلان ہوا۔'
  },
  {
    mushafOrder: 7,
    nuzoolOrder: 39,
    nameUrdu: 'سورۃ الاعراف',
    nameArabic: 'الأعراف',
    visualEmoji: '⛰️',
    visualSymbolTitle: 'جنت و جہنم کے درمیان بلند فصیلیں (The Towering Battlements)',
    mushafStorySentence: 'میدان سے آگے نگاہ اٹھی تو دور افق پر جنت و دوزخ کے درمیان اعراف کی بلند فصیلیں نظر آئیں۔',
    nuzoolStorySentence: 'مشرکین کے ظلم کے مقابلے میں قومِ نوح، ہود، صالح، لوط اور شعیب کی ہلاکت کی عبرتیں سامنے آئیں۔'
  },
  {
    mushafOrder: 8,
    nuzoolOrder: 88,
    nameUrdu: 'سورۃ الانفال',
    nameArabic: 'الأنفال',
    visualEmoji: '⚔️',
    visualSymbolTitle: 'یوم الفرقان اور بدر کی فتح (The Swords of Badr & Divine Help)',
    mushafStorySentence: 'فصیلوں سے نیچے بدر کی وادی تھی جہاں ۳۱۳ مجاہدین نے باطل کے لشکر کو شکست دے کر غنائم حاصل کیے۔',
    nuzoolStorySentence: 'ہجرت کے دوسرے سال بدر کے معرکے میں اللہ نے ملائکہ کے ذریعے مسلمانوں کو پہلی عظیم فتح بخشی۔'
  },
  {
    mushafOrder: 9,
    nuzoolOrder: 113,
    nameUrdu: 'سورۃ التوبہ',
    nameArabic: 'التوبة',
    visualEmoji: '🔥',
    visualSymbolTitle: 'اعلانِ براءت اور توبہ کی آگ (The Proclamation of Immunity)',
    mushafStorySentence: 'بدر کی فتح کے بعد باطل سے مکمل بے دخلی کا اعلان ہوا اور توبہ کا سچا راستہ دکھایا گیا۔',
    nuzoolStorySentence: 'فتحِ مکہ کے بعد غزوۂ تبوک اور مشرکین سے مکمل براءت کا الٰہی منشور حضرت علیؑ کے ذریعے پڑھا گیا۔'
  },
  {
    mushafOrder: 10,
    nuzoolOrder: 51,
    nameUrdu: 'سورۃ یونس',
    nameArabic: 'يونس',
    visualEmoji: '🐋',
    visualSymbolTitle: 'سمندر کی مچھلی اور توبۂ یونسؑ (The Whale of the Deep Sea)',
    mushafStorySentence: 'پھر سمندر کی لہروں میں حضرت یونسؑ مچھلی کے پیٹ سے توبہ کر کے اپنی قوم کی طرف لوٹے۔',
    nuzoolStorySentence: 'مکہ کی گھٹن میں یونسؑ کی دعا یاد دلائی گئی کہ کس طرح عذاب کے آثار دیکھ کر قوم نے توبہ کی اور بچ گئی۔'
  },
  {
    mushafOrder: 11,
    nuzoolOrder: 52,
    nameUrdu: 'سورۃ ہود',
    nameArabic: 'هود',
    visualEmoji: '🌪️',
    visualSymbolTitle: 'طوفانی آندھی اور کوہِ جودی (The Raging Tempest & Ark)',
    mushafStorySentence: 'ساحل پر حضرت ہودؑ کی قوم پر آندھی کا عذاب آیا اور حضرت نوحؑ کی کشتی کوہِ جودی پر لنگر انداز ہوئی۔',
    nuzoolStorySentence: '"فاستقم کما امرت" کے سخت حکم نے رسول اللہؐ کو وقت سے پہلے بوڑھا کر دیا تاکہ حق پر ڈٹ جائیں۔'
  },
  {
    mushafOrder: 12,
    nuzoolOrder: 53,
    nameUrdu: 'سورۃ یوسف',
    nameArabic: 'يوسف',
    visualEmoji: '👑',
    visualSymbolTitle: 'عفت کا تاج اور خوابوں کی تعبیر (The Crown of Beauty & Patience)',
    mushafStorySentence: 'طوفان کے بعد کنویں کے اندھیرے سے نکل کر حضرت یوسفؑ کے ماتھے پر مصر کی حکومت کا تاج سجا۔',
    nuzoolStorySentence: 'عام الحزن کے شدید غم میں احسن القصص اتری تاکہ نبیؐ کو معلوم ہو کہ بھائیوں کے ظلم کے بعد فتح یقینی ہے۔'
  },
  {
    mushafOrder: 13,
    nuzoolOrder: 96,
    nameUrdu: 'سورۃ الرعد',
    nameArabic: 'الرعد',
    visualEmoji: '⚡',
    visualSymbolTitle: 'بادلوں کی گرج اور دلوں کا سکون (The Rumbles of Thunder & Serenity)',
    mushafStorySentence: 'تختِ مصر کے اوپر آسمان پر بادلوں کی گرج نے پکارا: "أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ"۔',
    nuzoolStorySentence: 'کائنات کی فلکیاتی گردش اور معجزات کے جھٹکے نے عقلوں کو بیدار کیا۔'
  },
  {
    mushafOrder: 14,
    nuzoolOrder: 72,
    nameUrdu: 'سورۃ ابراہیم',
    nameArabic: 'إبراهيم',
    visualEmoji: '🕋',
    visualSymbolTitle: 'کعبہ کا صحن اور کلمۂ طیبہ (The Sanctuary of Abraham)',
    mushafStorySentence: 'گرج کے بعد بادل حضرت ابراہیمؑ کی مکہ میں تعمیر کردہ کعبہ کی مقدس وادی پر برسے۔',
    nuzoolStorySentence: 'شعبِ ابی طالب کے محاصرے کے دنوں میں ابراہیمؑ کی مکہ کے امن کی دعائیں دہرائی گئیں۔'
  },
  {
    mushafOrder: 15,
    nuzoolOrder: 54,
    nameUrdu: 'سورۃ الحجر',
    nameArabic: 'الحجر',
    visualEmoji: '🛡️',
    visualSymbolTitle: 'پہاڑوں کے تراشے مکانات اور حفاظتِ قرآن (The Carved Rocks of Hijr)',
    mushafStorySentence: 'کعبہ کے راستے میں وادیِ حجر کے تراشے ہوئے پہاڑ آئے اور اعلان ہوا: "ہم ہی اس قرآن کے محافظ ہیں"۔',
    nuzoolStorySentence: 'قریش کے تضحیک آمیز طعنوں پر تسلی دی گئی کہ استہزاء کرنے والوں کے خلاف اللہ کافی ہے۔'
  },
  {
    mushafOrder: 16,
    nuzoolOrder: 70,
    nameUrdu: 'سورۃ النحل',
    nameArabic: 'النحل',
    visualEmoji: '🐝',
    visualSymbolTitle: 'شہد کی مکھی کا شفا بخش چھتا (The Honeycomb of Healing)',
    mushafStorySentence: 'پہاڑوں کی دراڑوں میں شہد کی مکھی نے اپنا چھتا بنایا جس کے رس میں انسانوں کے لیے شفا تھی۔',
    nuzoolStorySentence: 'کائنات کی ان گنت نعمتوں کا ذکر تاکہ مشرکین اپنے جھوٹے معبودوں کو چھوڑ کر رب کا شکر ادا کریں۔'
  },
  {
    mushafOrder: 17,
    nuzoolOrder: 50,
    nameUrdu: 'سورۃ الاسراء',
    nameArabic: 'الإسراء',
    visualEmoji: '🌙',
    visualSymbolTitle: 'رات کا سفرِ معراج اور براق (The Night Journey of Ascension)',
    mushafStorySentence: 'پھر رات کے اندھیرے میں رسول اللہؐ مسجدِ حرام سے مسجدِ اقصی اور آسمانوں کی معراج پر تشریف لے گئے۔',
    nuzoolStorySentence: 'مکہ کی شدید مخالفت کے عروج پر عرشِ الٰہی پر استقبال کر کے رسالت کا پرچم بلند کیا گیا۔'
  },
  {
    mushafOrder: 18,
    nuzoolOrder: 69,
    nameUrdu: 'سورۃ الکہف',
    nameArabic: 'الكهف',
    visualEmoji: '🗝️',
    visualSymbolTitle: 'اصحابِ کہف کا محفوظ غار اور خضرؑ کا علم (The Cave of Refuge & Khidr)',
    mushafStorySentence: 'معراج سے لوٹ کر وہ نوجوان غار میں پناہ گزین ہوئے اور موسیٰؑ نے خضرؑ کے غیبی علم کا مشاہدہ کیا۔',
    nuzoolStorySentence: 'قریش کے تین پیچیدہ سوالات (اصحابِ کہف، روح، ذو القرنین) کے دندان شکن جوابات دیے گئے۔'
  },
  {
    mushafOrder: 19,
    nuzoolOrder: 44,
    nameUrdu: 'سورۃ مریم',
    nameArabic: 'مريم',
    visualEmoji: '✨',
    visualSymbolTitle: 'کنواری مریمؑ اور گہوارے میں کلام (The Blessed Virgin Mary)',
    mushafStorySentence: 'غار کے قریب حضرت مریمؑ نے خلوت اختیار کی اور گہوارے میں حضرت عیسیٰؑ نے کلام فرمایا۔',
    nuzoolStorySentence: 'حبشہ ہجرت کرنے والے جعفرِ طیارؑ نے نجاشی کے دربار میں یہی سورت تلاوت کر کے رلا دیا تھا۔'
  },
  {
    mushafOrder: 20,
    nuzoolOrder: 45,
    nameUrdu: 'سورۃ طٰہٰ',
    nameArabic: 'طه',
    visualEmoji: '🤝',
    visualSymbolTitle: 'کوہِ طور کی روشن آگ اور موسیٰؑ کا عصا (The Sacred Fire of Sinai)',
    mushafStorySentence: 'پھر کوہِ طور سے پکار آئی: "طٰہٰ! ہم نے یہ قرآن آپ پر مشقت میں ڈالنے کے لیے نہیں اتارا"۔',
    nuzoolStorySentence: 'حضرت عمر بن خطاب نے اپنی بہن کے گھر اسی سورت کی تلاوت سن کر اسلام قبول کیا۔'
  }
];

// Curated Visual Riddles for Kids & Students
export const VISUAL_RIDDLES_COLLECTION: VisualRiddleChallenge[] = [
  {
    id: 'riddle-1',
    titleUrdu: 'پہیلی ۱: چراگاہ سے آسمانی دسترخوان تک (سورت ۱ تا ۵)',
    difficulty: 'easy',
    orderType: 'mushaf',
    emojis: ['🚪', '🐄', '🏡', '🛡️', '🍲'],
    clueUrdu: 'پہلے دروازہ کھلا، پھر گائے چری، پھر عمران کا گھر آیا، پھر خواتین کی ڈھال، اور آخر میں دسترخوان اترا۔',
    correctSurahOrders: [1, 2, 3, 4, 5],
    options: [
      { labelUrdu: 'الفاتحہ ⟵ البقرہ ⟵ آلِ عمران ⟵ النساء ⟵ المائدہ', isCorrect: true },
      { labelUrdu: 'الفاتحہ ⟵ الانعام ⟵ الاعراف ⟵ الانفال ⟵ التوبہ', isCorrect: false },
      { labelUrdu: 'العلق ⟵ القلم ⟵ المزمل ⟵ المدثر ⟵ الفاتحہ', isCorrect: false },
      { labelUrdu: 'یونس ⟵ ہود ⟵ یوسف ⟵ الرعد ⟵ ابراہیم', isCorrect: false },
    ]
  },
  {
    id: 'riddle-2',
    titleUrdu: 'پہیلی ۲: غارِ حرا سے بیداریِ عالم تک (نزولی ۱ تا ۵)',
    difficulty: 'easy',
    orderType: 'nuzool',
    emojis: ['🩸', '✒️', '🛏️', '📢', '🚪'],
    clueUrdu: 'خون کا لوتھڑا ⟵ قلم کی قسم ⟵ چادر اوڑھنے والے ⟵ کملی ہٹا کر پکارنے والے ⟵ کتاب کا افتتاح۔',
    correctSurahOrders: [96, 68, 73, 74, 1],
    options: [
      { labelUrdu: 'العلق ⟵ القلم ⟵ المزمل ⟵ المدثر ⟵ الفاتحہ', isCorrect: true },
      { labelUrdu: 'الفاتحہ ⟵ البقرہ ⟵ آلِ عمران ⟵ النساء ⟵ المائدہ', isCorrect: false },
      { labelUrdu: 'القدر ⟵ الفجر ⟵ الضحیٰ ⟵ الانشراح ⟵ التین', isCorrect: false },
      { labelUrdu: 'الفیل ⟵ قریش ⟵ الماعون ⟵ الکوثر ⟵ الکافرون', isCorrect: false },
    ]
  },
  {
    id: 'riddle-3',
    titleUrdu: 'پہیلی ۳: حشرات و جانوروں کا قرآنی قافلہ',
    difficulty: 'medium',
    orderType: 'mushaf',
    emojis: ['🐄', '🐝', '🐜', '🕸️', '🐘'],
    clueUrdu: 'گائے (#۲) ⟵ شہد کی مکھی (#۱۶) ⟵ چیونٹی (#۲۷) ⟵ مکڑی (#۲۹) ⟵ ہاتھی (#۱۰۵)۔',
    correctSurahOrders: [2, 16, 27, 29, 105],
    options: [
      { labelUrdu: 'البقرہ ⟵ النحل ⟵ النمل ⟵ العنکبوت ⟵ الفیل', isCorrect: true },
      { labelUrdu: 'الانعام ⟵ الخیل ⟵ الحمام ⟵ الاسد ⟵ الذئب', isCorrect: false },
      { labelUrdu: 'النحل ⟵ النمل ⟵ البقرہ ⟵ الفیل ⟵ العنکبوت', isCorrect: false },
      { labelUrdu: 'العادیات ⟵ الفیل ⟵ القارعہ ⟵ التکاثر ⟵ العصر', isCorrect: false },
    ]
  },
  {
    id: 'riddle-4',
    titleUrdu: 'پہیلی ۴: کائناتی روشنیوں اور اوقات کا سلسلہ',
    difficulty: 'medium',
    orderType: 'mushaf',
    emojis: ['🌅', '☀️', '🌙', '🌄', '⭐'],
    clueUrdu: 'فجر (#۸۹) ⟵ سورج (#۹۱) ⟵ رات (#۹۲) ⟵ چاشت (#۹۳) ⟵ تارہ (#۵۳)۔',
    correctSurahOrders: [89, 91, 92, 93, 53],
    options: [
      { labelUrdu: 'الفجر ⟵ الشمس ⟵ اللیل ⟵ الضحیٰ ⟵ النجم', isCorrect: true },
      { labelUrdu: 'الطارق ⟵ البروج ⟵ الانفطار ⟵ الانشقاق ⟵ التکویر', isCorrect: false },
      { labelUrdu: 'القمر ⟵ الشمس ⟵ النجم ⟵ الفجر ⟵ اللیل', isCorrect: false },
      { labelUrdu: 'القدر ⟵ العصر ⟵ الفلق ⟵ الناس ⟵ الاخلاص', isCorrect: false },
    ]
  },
  {
    id: 'riddle-5',
    titleUrdu: 'پہیلی ۵: مکہ کے ۳ آخری پڑاؤ (عام الفیل تا خیرِ کثیر)',
    difficulty: 'easy',
    orderType: 'mushaf',
    emojis: ['🐘', '🐪', '🥣', '💎', '🛡️'],
    clueUrdu: 'ہاتھی کے لشکر پر کنکر ⟵ قریش کے قافلے ⟵ چھوٹی موٹی برتنے کی چیزیں ⟵ خیرِ کثیر (کوثر) ⟵ کافروں سے براءت۔',
    correctSurahOrders: [105, 106, 107, 108, 109],
    options: [
      { labelUrdu: 'الفیل ⟵ قریش ⟵ الماعون ⟵ الکوثر ⟵ الکافرون', isCorrect: true },
      { labelUrdu: 'الہمزہ ⟵ الفیل ⟵ قریش ⟵ الماعون ⟵ النصر', isCorrect: false },
      { labelUrdu: 'الکوثر ⟵ الکافرون ⟵ النصر ⟵ المسد ⟵ الاخلاص', isCorrect: false },
      { labelUrdu: 'العصر ⟵ الہمزہ ⟵ الفیل ⟵ قریش ⟵ التکاثر', isCorrect: false },
    ]
  }
];
