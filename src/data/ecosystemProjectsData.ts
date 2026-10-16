/**
 * Digital Islamicate Research Ecosystem Data Layer
 * Principal Investigator: Maulana Syed Imon Rizvi
 * Digital Quranic Hermeneutics Laboratory
 */

export interface EcosystemProject {
  id: string;
  titleEnglish: string;
  titleUrdu: string;
  subtitleEnglish: string;
  subtitleUrdu: string;
  category: 'textual' | 'temporal' | 'phonetics' | 'ethics';
  categoryLabelEnglish: string;
  categoryLabelUrdu: string;
  descriptionEnglish: string;
  descriptionUrdu: string;
  url: string;
  statusTag: string;
  isExternal: boolean;
  isCurrent?: boolean;
  accentColor: string;
  metrics?: string;
}

export interface EcosystemCategory {
  id: 'textual' | 'temporal' | 'phonetics' | 'ethics';
  titleEnglish: string;
  titleUrdu: string;
  subtitleEnglish: string;
  subtitleUrdu: string;
  iconName: string;
}

export const ECOSYSTEM_CATEGORIES: EcosystemCategory[] = [
  {
    id: 'textual',
    titleEnglish: 'Textual & Diachronic Engines',
    titleUrdu: 'متنی، زمانی و تفسیری انجن',
    subtitleEnglish: 'Chronological progression, verse stratification, and cross-translation analytics',
    subtitleUrdu: 'زمانی نزول، تدریجِ احکام اور کثیر التراجم تقابلی مطالعہ',
    iconName: 'BookOpen'
  },
  {
    id: 'temporal',
    titleEnglish: 'Temporal & Prosopographical Cartography',
    titleUrdu: 'تاریخی تقویم و شخصیات کا نقشہ',
    subtitleEnglish: 'Millennial Islamic historical timelines and civilizational genealogy',
    subtitleUrdu: '۵،۹۴۶ سالہ اسلامی و الہامی تاریخ کا جامع ڈیجیٹل نقشہ',
    iconName: 'Clock'
  },
  {
    id: 'phonetics',
    titleEnglish: 'Computational Phonetics & Pedagogy',
    titleUrdu: 'صوتیات، مخارج و تجوید کا حسابی ماڈل',
    subtitleEnglish: 'Biomechanical articulation, phonological precision, and sacred acoustics',
    subtitleUrdu: 'علم الصوتیات اور بایومکینیکل مخارج الحروف کا بصری ماڈل',
    iconName: 'Volume2'
  },
  {
    id: 'ethics',
    titleEnglish: 'Applied Ethics & Institutional Philosophy',
    titleUrdu: 'اخلاقیاتِ نہج البلاغہ و تنظیمی فلسفہ',
    subtitleEnglish: 'Virtue ethics, governance principles, and thematic monographs',
    subtitleUrdu: 'نہج البلاغہ کی تنظیمی حکمتِ عملی اور ۴۰ سے زائد علمی مقالات',
    iconName: 'Compass'
  }
];

export const ECOSYSTEM_PROJECTS: EcosystemProject[] = [
  {
    id: 'nuzooli',
    titleEnglish: 'Project Nuzooli (ترتیبِ نزولی)',
    titleUrdu: 'منظومہ ترتیبِ نزولی',
    subtitleEnglish: 'Diachronic Revelation Platform',
    subtitleUrdu: 'قرآنی نزول کا ۲۳ سالہ زمانی پلیٹ فارم',
    category: 'textual',
    categoryLabelEnglish: 'Textual & Diachronic',
    categoryLabelUrdu: 'متنی و زمانی',
    descriptionEnglish: 'A computational Digital Humanities framework modeling the 23-year prophetic revelation continuum, mathematical Delta displacement, and stratified legal pedagogy (Tadrij al-Ahkam).',
    descriptionUrdu: '۲۳ سالہ وحیِ الٰہی کا حسابی ماڈل جس میں ریاضیاتی ڈیلٹا ڈسپلیسمنٹ اور تدریجِ احکام کی تاریخی پرتوں کو کلاسیکی اسناد کے ساتھ پیش کیا گیا ہے۔',
    url: 'https://nuzooli.vercel.app',
    statusTag: 'Current Platform (زیرِ مطالعہ)',
    isExternal: false,
    isCurrent: true,
    accentColor: '#059669',
    metrics: '114 Surahs • 15 Legal Stages'
  },
  {
    id: 'quran-samjho',
    titleEnglish: 'Quran-Samjho (قرآن سمجھو)',
    titleUrdu: 'قرآن فہمی تقابلی پلیٹ فارم',
    subtitleEnglish: '40+ Translation Comparative Hermeneutics',
    subtitleUrdu: '۴۰ سے زائد تراجم و تفاسیر کا تقابلی ماڈل',
    category: 'textual',
    categoryLabelEnglish: 'Textual & Diachronic',
    categoryLabelUrdu: 'متنی و زمانی',
    descriptionEnglish: 'An advanced multi-translation analytical engine cross-referencing classical and contemporary authorities including Ali Quli Qarai, Allamah Zeeshan Haider Jawadi, and Ayatollah Najafi.',
    descriptionUrdu: 'ایک کثیر التراجم علمی انجن جو علی قلی قرائی، علامہ ذیشان حیدر جوادیؒ اور علامہ محمد حسین نجفیؒ کے مایہ ناز تراجم کا لفظ بہ لفظ موازنہ فراہم کرتا ہے۔',
    url: 'https://getmorefromlife.github.io/quran-samjho/',
    statusTag: 'Live Web Platform',
    isExternal: true,
    accentColor: '#0284c7',
    metrics: '40+ Exegetical Streams'
  },
  {
    id: 'quran-parho',
    titleEnglish: 'Quran-Parho (قرآن پڑھو)',
    titleUrdu: 'قرآن پڑھو (آف لائن ڈیٹا بیس)',
    subtitleEnglish: 'Native Android Kotlin Offline Platform',
    subtitleUrdu: 'اینڈرائیڈ کوٹلن نیٹو آف لائن پلیٹ فارم',
    category: 'textual',
    categoryLabelEnglish: 'Textual & Diachronic',
    categoryLabelUrdu: 'متنی و زمانی',
    descriptionEnglish: 'A high-performance offline mobile reading and memorization engine built natively in Android/Kotlin with synchronized word-by-word morphological roots and semantic audio.',
    descriptionUrdu: 'اینڈرائیڈ اور کوٹلن پر استوار ایک تیز رفتار آف لائن موبائل ایپلی کیشن جو لفظ بہ لفظ صرفی و نحوی جڑوں اور تلاوتِ صوتی کے ساتھ منسلک ہے۔',
    url: 'https://github.com/syedimonrizvipmp-wq/nuzooli/releases',
    statusTag: 'Native Android App',
    isExternal: true,
    accentColor: '#10b981',
    metrics: 'Offline Kotlin Engine'
  },
  {
    id: 'ayyam-allah',
    titleEnglish: 'Ayyām Allāh Timeline (ایام اللہ)',
    titleUrdu: 'ایام اللہ تقویمی ٹائم لائن',
    subtitleEnglish: '5,946-Year Islamicate & Near Eastern Historical Engine',
    subtitleUrdu: '۵،۹۴۶ سالہ اسلامی و انبیاء کی تاریخی تقویم',
    category: 'temporal',
    categoryLabelEnglish: 'Temporal Cartography',
    categoryLabelUrdu: 'تاریخی تقویم',
    descriptionEnglish: 'A monumental diachronic temporal engine mapping nearly six millennia of prophetic dispensations, Islamicate dynasties, theological schisms, and geo-political paradigms.',
    descriptionUrdu: 'حضرتِ آدمؑ سے عصرِ حاضر تک تقریباً چھ ہزار سالہ انبیاء کی بعثت، ائمۂ اہل بیتؑ کی حیات اور اسلامی تمدن کا وسیع ترین ڈیجیٹل تقویمی انجن۔',
    url: 'https://ayyam-allah-timeline.vercel.app/',
    statusTag: 'Monumental Timeline',
    isExternal: true,
    accentColor: '#d97706',
    metrics: '5,946-Year Historical Span'
  },
  {
    id: 'radiant-academy',
    titleEnglish: 'Radiant Quranic Academy (رسم الخط و تجوید)',
    titleUrdu: 'ریڈینٹ قرآونک اکیڈمی',
    subtitleEnglish: 'Biomechanical Makharij & Articulatory Tajweed',
    subtitleUrdu: 'صوتیاتی تجوید و بایومکینیکل مخارج',
    category: 'phonetics',
    categoryLabelEnglish: 'Computational Phonetics',
    categoryLabelUrdu: 'صوتیات و تجوید',
    descriptionEnglish: 'An innovative pedagogical suite utilizing biomechanical articulatory diagrams, phonological wave acoustics, and interactive drill engines for Quranic orthoepy (Tajwīd).',
    descriptionUrdu: 'حروفِ مقطعات اور مخارج الحروف کی درست ادائیگی کے لیے صوتیاتی فریکوئنسی اور ایناٹومیکل بصری خاکوں پر مبنی جدید تجویدی لیبارٹری۔',
    url: 'https://radiant-quranic-academy.vercel.app/',
    statusTag: 'Acoustic Suite',
    isExternal: true,
    accentColor: '#8b5cf6',
    metrics: 'Biomechanical Diagrams'
  },
  {
    id: 'aligile',
    titleEnglish: 'Aligile (علوی اخلاقیات و فرائض)',
    titleUrdu: 'علی جائل (Aligile)',
    subtitleEnglish: 'Nahj al-Balagha Virtue Ethics for Socio-Technical Systems',
    subtitleUrdu: 'نہج البلاغہ کے انتظامی و تنظیمی اصول',
    category: 'ethics',
    categoryLabelEnglish: 'Applied Ethics',
    categoryLabelUrdu: 'اخلاقیات و حکمت',
    descriptionEnglish: 'A groundbreaking synthesis bridging Imam Ali’s (a.s.) institutional governance in Nahj al-Balagha with contemporary Agile leadership, psychological safety, and organizational cybernetics.',
    descriptionUrdu: 'امیر المومنین حضرت علی ابن ابی طالبؑ کے عہد نامۂ مالک اشتر اور خطباتِ نہج البلاغہ کی روشنی میں جدید کارپوریٹ و تنظیمی قیادت (Agile Leadership) کا اخلاقی ماڈل۔',
    url: 'https://getmorefromlife.github.io/aligile/',
    statusTag: 'Virtue Ethics Engine',
    isExternal: true,
    accentColor: '#ec4899',
    metrics: 'Nahj al-Balagha Matrix'
  },
  {
    id: 'sacred-pages',
    titleEnglish: 'Sacred Pages Archive (اوراقِ مقدسہ)',
    titleUrdu: 'اوراقِ مقدسہ آرکائیو',
    subtitleEnglish: '40+ Peer-Level Thematic Monographs',
    subtitleUrdu: '۴۰ سے زائد تحقیقی و علمی مقالات',
    category: 'ethics',
    categoryLabelEnglish: 'Applied Ethics',
    categoryLabelUrdu: 'علمی مقالات',
    descriptionEnglish: 'A curated scholarly repository hosting over forty peer-level thematic monographs on Quranic hermeneutics, Shi’i theological discourses, Hadith epistemology, and spiritual ethics.',
    descriptionUrdu: 'قرآنی علوم، کلامی و فقہی ابحاث، اصولِ حدیث اور اخلاقیات پر مولانا سید آئمن رضوی کے ۴۰ سے زائد تحقیقی و فکری رسائل کا ڈیجیٹل ذخیرہ۔',
    url: 'https://sacred-pages-booklets.pages.dev/',
    statusTag: 'Monograph Library',
    isExternal: true,
    accentColor: '#f59e0b',
    metrics: '40+ Thematic Treatises'
  }
];
