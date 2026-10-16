/**
 * Multi-Track Parallel Chronology Data
 * متوازی تقابلی تقویمی دھاروں کا مستند ڈیٹا
 */

export interface MultiTrackEpochPoint {
  id: string;
  stepNumber: number;
  titleUrdu: string;
  category: 'prophetic' | 'makki' | 'madani' | 'ahlulbayt' | 'contemporary';
  gregorianYear: number; // Negative for BCE, positive for CE
  isBCE: boolean;
  yearsAgoFrom2026: number;
  aamAlFeelYear?: number;
  biThatYear?: number;
  hijriYear?: number;
  propheticFigureUrdu?: string;
  paternalLineageUrdu?: string;
  quranicSurahReference?: string;
  synopsisUrdu: string;
  historicalContextUrdu: string;
  colorCode: string;
}

export const MULTI_TRACK_EPOCH_POINTS: MultiTrackEpochPoint[] = [
  {
    id: 'mt-adam',
    stepNumber: 1,
    titleUrdu: 'تخلیقِ آدمؑ و ہبوطِ ارض',
    category: 'prophetic',
    gregorianYear: -4004,
    isBCE: true,
    yearsAgoFrom2026: 6030,
    propheticFigureUrdu: 'حضرت آدمؑ (ابو البشر)',
    paternalLineageUrdu: 'تخلیقِ بلا واسطہ از خاک و نفخۂ روح',
    synopsisUrdu: 'آغازِ حیاتِ انسانی اور زمین پر خلافتِ الٰہیہ کا قیام۔',
    historicalContextUrdu: 'اللہ تعالیٰ نے آدمؑ کو اپنی قدرت سے پیدا فرمایا اور فرشتوں کو سجدے کا حکم دیا؛ پھر توبہ کی قبولیت کے بعد ارض پر نبوت کا پہلا چراغ روشن ہوا۔',
    colorCode: '#059669'
  },
  {
    id: 'mt-nuh',
    stepNumber: 2,
    titleUrdu: 'طوفانِ نوحؑ و تجدیدِ انسانیت',
    category: 'prophetic',
    gregorianYear: -2348,
    isBCE: true,
    yearsAgoFrom2026: 4374,
    propheticFigureUrdu: 'حضرت نوحؑ (شیخ الانبیاء)',
    paternalLineageUrdu: 'نوح بن لمک بن متوشلح بن ادریسؑ بن یارد بن مہلائیل بن قینان بن انوش بن شیثؑ بن آدمؑ',
    synopsisUrdu: 'طوفانِ عظیم اور کشتیِ نوح کے ذریعے حق کا غلبہ اور باطل کی غرقابی۔',
    historicalContextUrdu: '۹۵۰ سال کی صبر آزما دعوت کے بعد کفر کے طوفان کو پانی کے طوفان سے ختم کیا گیا اور سفینۂ نجات پر سوار مومنین سے زمین دوبارہ آباد ہوئی۔',
    colorCode: '#0284c7'
  },
  {
    id: 'mt-ibrahim',
    stepNumber: 3,
    titleUrdu: 'تعمیرِ کعبہ و ہجرتِ ابراہیمؑ',
    category: 'prophetic',
    gregorianYear: -1900,
    isBCE: true,
    yearsAgoFrom2026: 3926,
    propheticFigureUrdu: 'حضرت ابراہیمؑ (خلیل اللہ)',
    paternalLineageUrdu: 'ابراہیم بن تارخ بن ناحور بن ساروغ بن رعو بن فالغ بن عابر (ہودؑ) بن شالخ بن ارفکشد بن سام بن نوحؑ',
    synopsisUrdu: 'بت شکنی، آگ کا گلزار بننا، اسماعیلؑ کی قربانی اور مکہ میں کعبہ کی تعمیر۔',
    historicalContextUrdu: 'حضرت ابراہیمؑ اور اسماعیلؑ نے مل کر بیت اللہ کی بنیادیں اٹھائیں اور دعا مانگی: "رَبَّنَا وَابْعَثْ فِيهِمْ رَسُولًا مِّنْهُمْ" جو بعثتِ محمدیؐ کی صورت میں قبول ہوئی۔',
    colorCode: '#d97706'
  },
  {
    id: 'mt-musa',
    stepNumber: 4,
    titleUrdu: 'خروجِ مصر و نزولِ تورات علیٰ موسیٰؑ',
    category: 'prophetic',
    gregorianYear: -1250,
    isBCE: true,
    yearsAgoFrom2026: 3276,
    propheticFigureUrdu: 'حضرت موسیٰ کلیم اللہؑ',
    paternalLineageUrdu: 'موسیٰ بن عمران بن قاہث بن لاوی بن یعقوب (اسرائیل) بن اسحاق بن ابراہیمؑ',
    synopsisUrdu: 'فرعون کی ہلاکت، بحرِ احمر کا پھٹنا اور کوہِ طور پر تورات کی تختیاں۔',
    historicalContextUrdu: 'بنی اسرائیل کی فرعونی غلامی سے نجات اور کوہِ طور پر میقاتِ الٰہی اور معجزاتِ عصا و یدِ بیضا۔',
    colorCode: '#4f46e5'
  },
  {
    id: 'mt-isa',
    stepNumber: 5,
    titleUrdu: 'ولادتِ عیسیٰؑ و آغازِ تقویمِ عیسوی (مبدا عیسوی)',
    category: 'prophetic',
    gregorianYear: 1,
    isBCE: false,
    yearsAgoFrom2026: 2025,
    propheticFigureUrdu: 'حضرت عیسیٰ روح اللہؑ',
    paternalLineageUrdu: 'عیسیٰ بن مریم العذراء بنت عمرانؑ (از نسلِ سلیمان و داؤدؑ بن یشی بن یہودا بن یعقوبؑ)',
    synopsisUrdu: 'بن باپ ولادت، گہوارے میں کلام، انجیل کا نزول اور قبلِ مسیح کا اختتام۔',
    historicalContextUrdu: 'یہیں پر تقویم کے پیمانے نے رخ بدلا اور قبلِ مسیح (BC) ختم ہو کر بعدِ مسیح (AD / CE) کی گنتی شروع ہوئی۔',
    colorCode: '#7c3aed'
  },
  {
    id: 'mt-aam-feel',
    stepNumber: 6,
    titleUrdu: 'حملۂ ابرہہ و ولادتِ خاتم النبیینؐ (۱ عام الفیل)',
    category: 'makki',
    gregorianYear: 570,
    isBCE: false,
    yearsAgoFrom2026: 1456,
    aamAlFeelYear: 1,
    propheticFigureUrdu: 'حضرت محمد مصطفیٰؐ',
    paternalLineageUrdu: 'محمد بن عبد اللہ بن عبد المطلب بن ہاشم بن عبد مناف بن قصی بن کلاب (شجرۂ عدنانی)',
    quranicSurahReference: 'سورۃ الفیل (۱۰۵)',
    synopsisUrdu: 'ابابیلوں کا لشکر، اصحابِ فیل کی تباہی اور ۱۷ ربیع الاول کو نورِ محمدیؐ کا ظہور۔',
    historicalContextUrdu: 'عربوں کی نئی سرکاری تقویم "عام الفیل" کا پہلا سال، جس سے پوری وادیِ عرب نے تاریخیں گننا شروع کیں۔',
    colorCode: '#059669'
  },
  {
    id: 'mt-hilf',
    stepNumber: 7,
    titleUrdu: 'حلف الفضول (۲۰ عام الفیل)',
    category: 'makki',
    gregorianYear: 590,
    isBCE: false,
    yearsAgoFrom2026: 1436,
    aamAlFeelYear: 20,
    synopsisUrdu: 'مظلوموں کے حقوق اور عدل کے قیام کا تاریخی مکی معاہدہ۔',
    historicalContextUrdu: 'رسول اللہؐ نے بیس برس کی عمر میں اس معاہدے میں شرکت فرمائی اور بعدِ اسلام بھی اس کی توثیق فرمائی۔',
    colorCode: '#0d9488'
  },
  {
    id: 'mt-bithat',
    stepNumber: 8,
    titleUrdu: 'مبعثِ نبویؐ و غارِ حرا (۴۰ عام الفیل / ۱ بعثت)',
    category: 'makki',
    gregorianYear: 610,
    isBCE: false,
    yearsAgoFrom2026: 1416,
    aamAlFeelYear: 40,
    biThatYear: 1,
    quranicSurahReference: 'سورۃ العلق (۹۶: ۱-۵)',
    synopsisUrdu: '۲۷ رجب: غارِ حرا میں پہلی وحی "اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ" اور کاروانِ اسلام کا طلوع۔',
    historicalContextUrdu: 'چالیس سال عام الفیل مکمل ہونے پر خاتم الانبیاءؐ کی بعثت ہوئی؛ یہاں سے "سالِ بعثت" کی ۱۳ سالہ مکی تقویم کا آغاز ہوا۔',
    colorCode: '#d97706'
  },
  {
    id: 'mt-dawat-ashira',
    stepNumber: 9,
    titleUrdu: 'دعوتِ ذو العشیرہ و اعلانِ ولایت (۳ بعثت)',
    category: 'makki',
    gregorianYear: 613,
    isBCE: false,
    yearsAgoFrom2026: 1413,
    aamAlFeelYear: 43,
    biThatYear: 3,
    quranicSurahReference: 'سورۃ الشعراء (۲۱۴) "وَأَنذِرْ عَشِيرَتَكَ الْأَقْرَبِينَ"',
    synopsisUrdu: 'قریش کے اکابرین کے سامنے دین کی علانیہ دعوت اور علی بن ابی طالبؑ کی وزارت و خلافت کا اعلان۔',
    historicalContextUrdu: 'رسول اللہؐ کا فرمان: "أَنْتَ أَخِي وَوَصِيِّي وَخَلِيفَتِي فِيكُمْ"۔',
    colorCode: '#b45309'
  },
  {
    id: 'mt-shib-abu-talib',
    stepNumber: 10,
    titleUrdu: 'محاصرۂ شعبِ ابی طالبؑ (۷ تا ۱۰ بعثت)',
    category: 'makki',
    gregorianYear: 616,
    isBCE: false,
    yearsAgoFrom2026: 1410,
    aamAlFeelYear: 47,
    biThatYear: 7,
    synopsisUrdu: 'بنو ہاشم کا تین سالہ سخت ترین معاشی و سماجی بائیکاٹ اور دیمک کا عہد نامہ کھانا۔',
    historicalContextUrdu: 'حضرت ابو طالبؑ اور حضرت خدیجہؑ کی بے مثال قربانیاں اور استقامت۔',
    colorCode: '#ea580c'
  },
  {
    id: 'mt-aam-ul-huzn',
    stepNumber: 11,
    titleUrdu: 'عام الحزن و معراجِ مصطفیٰؐ (۱۰ بعثت)',
    category: 'makki',
    gregorianYear: 619,
    isBCE: false,
    yearsAgoFrom2026: 1407,
    aamAlFeelYear: 50,
    biThatYear: 10,
    quranicSurahReference: 'سورۃ الاسراء (۱۷: ۱)',
    synopsisUrdu: 'حضرت ابو طالبؑ اور حضرت خدیجہؑ کی رحلت؛ پھر سفرِ معراج اور سدرۃ المنتہیٰ کی سیر۔',
    historicalContextUrdu: 'غم کے سال کے بعد عرشِ الٰہی پر سرورِ کونینؐ کا استقبال اور نمازوں کا تحفہ۔',
    colorCode: '#dc2626'
  },
  {
    id: 'mt-hijrah',
    stepNumber: 12,
    titleUrdu: 'ہجرتِ نبویؐ و آغازِ تقویمِ ہجری (۵۳ عام الفیل = ۱ھ)',
    category: 'madani',
    gregorianYear: 622,
    isBCE: false,
    yearsAgoFrom2026: 1404,
    aamAlFeelYear: 53,
    biThatYear: 13,
    hijriYear: 1,
    synopsisUrdu: 'شبِ مبيت پر علیؑ کا بسترِ رسولؐ پر سونا، مکہ سے ہجرت، اور اسلامی ہجری تقویم کا سنگِ بنیاد۔',
    historicalContextUrdu: 'یہاں پر عام الفیل کے ۵۳ سال مکمل ہوئے اور اسلامی ہجری تقویم (1 AH) کا باضابطہ آغاز ہوا۔',
    colorCode: '#16a34a'
  },
  {
    id: 'mt-badr',
    stepNumber: 13,
    titleUrdu: 'غزوۂ بدرِ کبریٰ و یوم الفرقان (۲ھ)',
    category: 'madani',
    gregorianYear: 624,
    isBCE: false,
    yearsAgoFrom2026: 1402,
    hijriYear: 2,
    quranicSurahReference: 'سورۃ الانفال (۸: ۴۱)',
    synopsisUrdu: '۱۷ رمضان: ۳۱۳ کا لشکر، قریش کے ۷۰ سرکشوں کی ہلاکت اور اسلام کا پہلا فیصلہ کن عسکری غلبہ۔',
    historicalContextUrdu: 'حضرت علی علیہ السلام کے ہاتھوں ابو جہل و عتبہ و شیبہ کے تکبر کا خاتمہ۔',
    colorCode: '#059669'
  },
  {
    id: 'mt-ghadir',
    stepNumber: 14,
    titleUrdu: 'حجۃ الوداع و غدیرِ خم — اکمالِ دین (۱۰ھ)',
    category: 'madani',
    gregorianYear: 632,
    isBCE: false,
    yearsAgoFrom2026: 1394,
    hijriYear: 10,
    quranicSurahReference: 'سورۃ المائدہ (۳ و ۶۷) "الْيَوْمَ أَكْمَلْتُ لَكُمْ دِينَكُمْ"',
    synopsisUrdu: '۱۸ ذوالحجہ: ایک لاکھ چوبیس ہزار کے مجمع میں اعلان: "مَنْ كُنْتُ مَوْلَاهُ فَهَذَا عَلِيٌّ مَوْلَاهُ"۔',
    historicalContextUrdu: 'رسالت کا آخری اور سب سے بڑا پیغام جس پر نعمتِ الٰہی مکمل ہوئی۔',
    colorCode: '#d97706'
  },
  {
    id: 'mt-imam-ali',
    stepNumber: 15,
    titleUrdu: 'شہادتِ امیر المؤمنینؑ و مصحفِ نوزولی (۴۰ھ)',
    category: 'ahlulbayt',
    gregorianYear: 661,
    isBCE: false,
    yearsAgoFrom2026: 1365,
    hijriYear: 40,
    synopsisUrdu: '۲۱ رمضان: محرابِ کوفہ میں ضربت و شہادت۔ تدوینِ مصحفِ نوزولی اور نہج البلاغہ کا ابدی کلام۔',
    historicalContextUrdu: 'عدالتِ علوی کا نمونہ اور رسول اللہؐ کے بعد قرآن کے سب سے بڑے مفسر کی شہادت۔',
    colorCode: '#059669'
  },
  {
    id: 'mt-imam-hasan',
    stepNumber: 16,
    titleUrdu: 'صلحِ امام حسن مجتبیٰؑ و شہادت (۵۰ھ)',
    category: 'ahlulbayt',
    gregorianYear: 670,
    isBCE: false,
    yearsAgoFrom2026: 1356,
    hijriYear: 50,
    synopsisUrdu: 'معاہدۂ صلح کے ذریعے شیعیانِ علیؑ کے وجود کی حفاظت، اسلام کا تحفظ اور ۲۸ صفر کو زہر سے شہادت۔',
    historicalContextUrdu: 'سبطِ اکبر کا دانشمندانہ تاریخی اقدام جس نے بنو امیہ کے نفاق کے پردے کو چاک کیا۔',
    colorCode: '#10b981'
  },
  {
    id: 'mt-karbala',
    stepNumber: 17,
    titleUrdu: 'واقعۂ کربلا و شہادتِ امام حسینؑ (۶۱ھ)',
    category: 'ahlulbayt',
    gregorianYear: 680,
    isBCE: false,
    yearsAgoFrom2026: 1346,
    hijriYear: 61,
    synopsisUrdu: '۱۰ محرم الحرام: ریگزارِ کربلا پر اسلام کی بقا کے لیے سید الشہداءؑ اور انصار کی تاریخی قربانی۔',
    historicalContextUrdu: 'یزیدی ظلم و تحریف کے مقابلے میں دینِ محمدیؐ کو تا ابد زندہ رکھنے والی شہادت۔',
    colorCode: '#b91c1c'
  },
  {
    id: 'mt-imam-sajjad',
    stepNumber: 18,
    titleUrdu: 'صحیفۂ سجادیہ و رسالۃ الحقوق — امام سجادؑ (۹۵ھ)',
    category: 'ahlulbayt',
    gregorianYear: 713,
    isBCE: false,
    yearsAgoFrom2026: 1313,
    hijriYear: 95,
    synopsisUrdu: 'شام و کوفہ میں خطبات، دعا اور مناجات کے پیرائے میں اسلامی فکر کی تجدید اور رسالۃ الحقوق کی تدوین۔',
    historicalContextUrdu: 'زبورِ آلِ محمدؑ کے ذریعے اموی استبداد کے تاریک دور میں الٰہی اقدار کا احیاء۔',
    colorCode: '#6366f1'
  },
  {
    id: 'mt-imam-baqir',
    stepNumber: 19,
    titleUrdu: 'شگافتنِ علوم و جامعۂ باقریہ — امام باقرؑ (۱۱۴ھ)',
    category: 'ahlulbayt',
    gregorianYear: 733,
    isBCE: false,
    yearsAgoFrom2026: 1293,
    hijriYear: 114,
    synopsisUrdu: 'باقر العلوم نے اموی زوال کے دور میں شیعی علمی و تفسیری دانشگاہ کی بنیاد رکھی۔',
    historicalContextUrdu: 'قرآنی معارف اور احکام کو احادیثِ نبویؐ کے صحیح و معصوم سلسلے کے ساتھ آشکار کیا۔',
    colorCode: '#8b5cf6'
  },
  {
    id: 'mt-imam-sadiq',
    stepNumber: 20,
    titleUrdu: 'نہضتِ علمیۂ جعفریہ و مدرسۂ مدینہ — امام صادقؑ (۱۴۸ھ)',
    category: 'ahlulbayt',
    gregorianYear: 765,
    isBCE: false,
    yearsAgoFrom2026: 1261,
    hijriYear: 148,
    synopsisUrdu: '۴۰۰۰ سے زائد شاگردوں کی تربیت، فقہِ جعفری کی تکمیل، اور کلامی و سائنسی علوم کی ترویج۔',
    historicalContextUrdu: 'اموی و عباسی منتقلی کے تاریخی دور میں مکتبِ تشیع کا سنہری علمی انقلاب۔',
    colorCode: '#06b6d4'
  },
  {
    id: 'mt-imam-kazim',
    stepNumber: 21,
    titleUrdu: 'قعرِ زندان میں الٰہی صبر — امام موسیٰ کاظمؑ (۱۸۳ھ)',
    category: 'ahlulbayt',
    gregorianYear: 799,
    isBCE: false,
    yearsAgoFrom2026: 1227,
    hijriYear: 183,
    synopsisUrdu: 'ہارون عباسی کے تاریک قید خانوں میں مسلسل بندگی، اور ۲۵ رجب کو بغداد کے پل پر شہادت۔',
    historicalContextUrdu: 'کظمِ غیظ اور عباسی استبداد کے سامنے استقامتِ امامت کی لازوال علامت۔',
    colorCode: '#0ea5e9'
  },
  {
    id: 'mt-imam-reza',
    stepNumber: 22,
    titleUrdu: 'سلسلۃ الذہب و مناظراتِ ادیان — امام علی رضاؑ (۲۰۳ھ)',
    category: 'ahlulbayt',
    gregorianYear: 818,
    isBCE: false,
    yearsAgoFrom2026: 1208,
    hijriYear: 203,
    synopsisUrdu: 'نیشابور میں حدیثِ سلسلۃ الذہب اور مامون کے دربار میں تمام ادیان و مذاہب کے اکابر کو لاجواب کیا۔',
    historicalContextUrdu: 'خراسان (مشہد مقدس) میں ولایتِ توحید کا پرچم اور عالمِ آلِ محمدؑ کا علمی تفوق۔',
    colorCode: '#d97706'
  },
  {
    id: 'mt-imam-jawad',
    stepNumber: 23,
    titleUrdu: 'اعجازِ علم در سنِ خوردسالی — امام محمد تقی جوادؑ (۲۲۰ھ)',
    category: 'ahlulbayt',
    gregorianYear: 835,
    isBCE: false,
    yearsAgoFrom2026: 1191,
    hijriYear: 220,
    synopsisUrdu: '۸ سال کی عمر میں مسندِ امامت اور قاضی القضاۃ یحییٰ بن اکثم کے پیچیدہ سوالات کے محیر العقول جوابات۔',
    historicalContextUrdu: 'امامت کے من جانب اللہ اور علمِ لدنی ہونے کا روشن ترین تاریخی ثبوت۔',
    colorCode: '#e11d48'
  },
  {
    id: 'mt-imam-hadi',
    stepNumber: 24,
    titleUrdu: 'شبکۂ وکالت و زیارتِ جامعۂ کبیرہ — امام علی نقی ہادیؑ (۲۵۴ھ)',
    category: 'ahlulbayt',
    gregorianYear: 868,
    isBCE: false,
    yearsAgoFrom2026: 1158,
    hijriYear: 254,
    synopsisUrdu: 'سامراء کی فوجی چھاؤنی میں نظر بندی کے باوجود شبکۂ وکالت کے ذریعے جہانِ تشیع کی قیادت۔',
    historicalContextUrdu: 'امام شناسی کا منشورِ اعظم "زیارتِ جامعۂ کبیرہ" اور غیبت کی منظم تدریجی تیاری۔',
    colorCode: '#7c3aed'
  },
  {
    id: 'mt-imam-askari',
    stepNumber: 25,
    titleUrdu: 'تمہیدِ غیبت و ولادتِ منجیِ عالم — امام حسن عسکریؑ (۲۶۰ھ)',
    category: 'ahlulbayt',
    gregorianYear: 874,
    isBCE: false,
    yearsAgoFrom2026: 1152,
    hijriYear: 260,
    synopsisUrdu: 'سامراء میں شدید نگرانی میں ولادتِ مہدیؑ کو مخفی رکھنا اور شیعیانِ خاص کو امامِ وقت کا دیدار کرانا۔',
    historicalContextUrdu: 'غیبتِ صغریٰ کی آمد پر نائبین کے ذریعے امت کو غیبت کے دور کے لیے تیار کیا۔',
    colorCode: '#2563eb'
  },
  {
    id: 'mt-ghaybah-sughra',
    stepNumber: 26,
    titleUrdu: 'آغازِ غیبتِ صغریٰ حضرت بقیۃ اللہؑ (۲۶۰ھ)',
    category: 'ahlulbayt',
    gregorianYear: 874,
    isBCE: false,
    yearsAgoFrom2026: 1152,
    hijriYear: 260,
    synopsisUrdu: 'شہادتِ امام حسن عسکریؑ اور نوابِ اربعہ کے ذریعے امامِ زمانہ عجل اللہ فرجہ کا رابطہ۔',
    historicalContextUrdu: 'شیعہ امامت کے ظاہری دور سے نیابتِ خاصہ کی طرف منتقلی جو ۷۰ سال تک جاری رہی۔',
    colorCode: '#0284c7'
  },
  {
    id: 'mt-ghaybah-kubra',
    stepNumber: 27,
    titleUrdu: 'آغازِ غیبتِ کبریٰ و دورِ فقہاء (۳۲۹ھ)',
    category: 'ahlulbayt',
    gregorianYear: 941,
    isBCE: false,
    yearsAgoFrom2026: 1085,
    hijriYear: 329,
    synopsisUrdu: 'آخری نائب علی بن محمد سمریؒ کی وفات اور نیابتِ عامہ (علماء و فقہاء) کا دور۔',
    historicalContextUrdu: 'آج تک جاری رہنے والا انتظار کا مقدس دور جس میں امت کی ہدایت کا بار مراجعِ کرام کے کندھوں پر ہے۔',
    colorCode: '#6366f1'
  },
  {
    id: 'mt-contemporary',
    stepNumber: 28,
    titleUrdu: 'عصرِ حاضر — سال ۲۰۲۶ء / ۱۴۴۷ھ',
    category: 'contemporary',
    gregorianYear: 2026,
    isBCE: false,
    yearsAgoFrom2026: 0,
    hijriYear: 1447,
    synopsisUrdu: 'دورِ حاضر، اکیسویں صدی، اور عالمگیر اسلامی و قرآنی بیداری۔',
    historicalContextUrdu: 'حضرت آدمؑ سے شروع ہونے والے اس سفر کا موجودہ مقام جہاں ہم آج اس پورٹل پر کھڑے تاریخ کا مطالعہ کر رہے ہیں۔',
    colorCode: '#10b981'
  }
];
