/**
 * asmaUlHusnaData.ts
 * ============================================================================
 * Scholarly Dataset for the Divine Names (Asma-ul-Husna) Chronological Emergence
 * (اسمائے حسنیٰ کا نزولی سفر — The Chronological Emergence of the 99 Divine Names)
 *
 * Grounded in:
 * - Al-Tamhid fi Ulum al-Qur'an by Ayatollah Muhammad Hadi Ma'rifat
 * - Tafsir al-Mizan by Allamah Sayyid Muhammad Husayn Tabataba'i
 * - Majma' al-Bayan by Shaykh Tabarsi
 * ============================================================================
 */

export interface DivineNameItem {
  id: string;
  nameArabic: string;
  meaningUrdu: string;
  meaningEnglish: string;
  firstNuzulSurah: string;
  firstNuzulRank: number;
  firstMushafOrder: number;
  firstAyah: number;
  yearCE: number;
  yearLabel: string;
  epoch: 'Early Meccan' | 'Mid Meccan' | 'Late Meccan' | 'Early Medinan' | 'Late Medinan';
  epochUrdu: string;
  category: 'rububiyyah' | 'dhat' | 'rahmah' | 'hikmah_izzah' | 'mulk_adl' | 'wilayah_nasr';
  categoryUrdu: string;
  categoryColor: string;
  verseArabic: string;
  verseTranslationUrdu: string;
  verseTranslationEnglish: string;
  scholarlyTheologicalInsightUrdu: string;
  scholarlyTheologicalInsightEnglish: string;
  totalQuranicMentions: number;
}

export interface AsmaEpochGroup {
  id: string;
  titleUrdu: string;
  titleEnglish: string;
  yearsLabel: string;
  thematicFocusUrdu: string;
  thematicFocusEnglish: string;
  namesCount: number;
  color: string;
}

export const ASMA_EPOCHS: AsmaEpochGroup[] = [
  {
    id: 'early_mecca',
    titleUrdu: 'اوائلِ مکہ: ربوبیت اور ہستی کا شعور',
    titleEnglish: 'Early Mecca: Rububiyyah & Ontological Awakening',
    yearsLabel: '۶۱۰–۶۱۵ء (۱ تا ۵ بعثت)',
    thematicFocusUrdu: 'خالق، پروردگار، عطا، اور یکتائی کا ابتدائی الٰہی تعارف',
    thematicFocusEnglish: 'Initial divine unveiling: Creator, Sustainer, Munificence, and Absolute Oneness',
    namesCount: 22,
    color: '#10B981', // Emerald
  },
  {
    id: 'mid_mecca',
    titleUrdu: 'وسطِ مکہ: معرکۂ رحمن اور صفاتِ جمال',
    titleEnglish: 'Mid Mecca: The Rahman Controversy & Divine Beauty',
    yearsLabel: '۶۱۶–۶۱۹ء (۶ تا ۹ بعثت)',
    thematicFocusUrdu: 'مشرکین کی مخالفت پر رحمانیت کا زوردار دفاع اور انبیاء کے واقعات',
    thematicFocusEnglish: 'Defending the Name Ar-Rahman against polytheist rejection & prophetic consolations',
    namesCount: 18,
    color: '#F59E0B', // Amber
  },
  {
    id: 'late_mecca',
    titleUrdu: 'اواخرِ مکہ: علو، استقامت اور ہجرت کی تیاری',
    titleEnglish: 'Late Mecca: Transcendence & Preparation for Exodus',
    yearsLabel: '۶۲۰–۶۲۲ء (۱۰ تا ۱۳ بعثت)',
    thematicFocusUrdu: 'محاصرۂ شعبِ ابی طالب اور طائف کے بعد قدرت، علو اور صلح و تسلی',
    thematicFocusEnglish: 'Divine power, transcendence, and solace following the boycott and Ta\'if trials',
    namesCount: 15,
    color: '#8B5CF6', // Purple
  },
  {
    id: 'early_medina',
    titleUrdu: 'اوائلِ مدینہ: حاکمیت، عزت، اور حکمتِ شریعت',
    titleEnglish: 'Early Medina: Sovereignty, Might & Legislative Wisdom',
    yearsLabel: '۶۲۲–۶۲۸ء (۱ تا ۶ ہجری)',
    thematicFocusUrdu: 'مدنی ریاست، غزوات (بدر و احد) اور احکام کے خاتمے پر العزیز الحکیم کا ظہور',
    thematicFocusEnglish: 'Might coupled with Wisdom at the culmination of civic laws and battlefields (Badr, Uhud)',
    namesCount: 26,
    color: '#0284C7', // Sky Blue
  },
  {
    id: 'late_medina',
    titleUrdu: 'اواخرِ مدینہ: ولایت، فتح اور اکمالِ دین',
    titleEnglish: 'Late Medina: Guardianship, Triumph & Completion of Covenant',
    yearsLabel: '۶۲۹–۶۳۲ء (۷ تا ۱۰ ہجری)',
    thematicFocusUrdu: 'فتحِ مکہ، حدیبیہ، مباہلہ اور غدیرِ خم پر الولایۃ، المولیٰ، اور التواب کا نزول',
    thematicFocusEnglish: 'Crown of divine friendship, guardianship (Al-Wali, Al-Mawla), and ultimate repentance (At-Tawwab)',
    namesCount: 18,
    color: '#EC4899', // Pink
  },
];

export const ASMA_UL_HUSNA_CHRONOLOGY: DivineNameItem[] = [
  {
    id: 'ar-rabb',
    nameArabic: 'الرَّبّ',
    meaningUrdu: 'پروردگار، پالنے والا، تدریجی کمال تک پہنچانے والا',
    meaningEnglish: 'The Lord, Sustainer, and Cherisher of Creation',
    firstNuzulSurah: 'العلق',
    firstNuzulRank: 1,
    firstMushafOrder: 96,
    firstAyah: 1,
    yearCE: 610,
    yearLabel: '13 BH / 610 CE (غارِ حرا)',
    epoch: 'Early Meccan',
    epochUrdu: 'اوائلِ مکہ',
    category: 'rububiyyah',
    categoryUrdu: 'ربوبیت و تربیت',
    categoryColor: '#10B981',
    verseArabic: 'اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ',
    verseTranslationUrdu: 'پڑھیے اپنے اس پروردگار کے نام سے جس نے پیدا کیا ہے۔',
    verseTranslationEnglish: 'Read in the name of your Lord who created.',
    scholarlyTheologicalInsightUrdu:
      'غارِ حرا کی سب سے پہلی وحی میں اللہ تعالیٰ نے اپنا تعارف «الرَّبّ» سے کرایا۔ ربوبیت کا مطلب عدم سے وجود میں لانا اور پھر مربی بن کر مرحلہ وار کمال تک پہنچانا ہے۔',
    scholarlyTheologicalInsightEnglish:
      'In the very first revelation at Cave Hira, the Divine revealed Himself through the functional name Ar-Rabb (The Nurturing Sustainer), emphasizing pedagogical elevation.',
    totalQuranicMentions: 975,
  },
  {
    id: 'al-akram',
    nameArabic: 'الْأَكْرَم',
    meaningUrdu: 'سب سے زیادہ کریم و بخشنے والا، بے پایاں عطا فرمانے والا',
    meaningEnglish: 'The Most Bounteous, The Supreme in Generosity',
    firstNuzulSurah: 'العلق',
    firstNuzulRank: 1,
    firstMushafOrder: 96,
    firstAyah: 3,
    yearCE: 610,
    yearLabel: '13 BH / 610 CE',
    epoch: 'Early Meccan',
    epochUrdu: 'اوائلِ مکہ',
    category: 'rahmah',
    categoryUrdu: 'رحمت و جود',
    categoryColor: '#F59E0B',
    verseArabic: 'اقْرَأْ وَرَبُّكَ الْأَكْرَمُ ۝ الَّذِي عَلَّمَ بِالْقَلَمِ',
    verseTranslationUrdu: 'پڑھیے اور آپ کا پروردگار بڑا ہی کریم ہے جس نے قلم کے ذریعے علم سکھایا۔',
    verseTranslationEnglish: 'Read, and your Lord is the Most Generous, who taught by the pen.',
    scholarlyTheologicalInsightUrdu:
      'وحی کے پہلے ہی لمحے قلم، علم اور عقل کے اعزاز کو صفتِ «کرم» سے جوڑا گیا تاکہ انسان اپنی جہالت سے نکل کر معرفت کے آسمان پر پرواز کرے۔',
    scholarlyTheologicalInsightEnglish:
      'Directly paired with the pen and human intellect in the first revelation, framing education and divine knowledge as the supreme manifestation of generosity.',
    totalQuranicMentions: 1,
  },
  {
    id: 'allah',
    nameArabic: 'اللَّه',
    meaningUrdu: 'اسمِ ذاتِ اعظم، تمام صفاتِ کمالیہ کا جامع نام',
    meaningEnglish: 'The Supreme Divinity, The Sole Self-Subsisting Essence',
    firstNuzulSurah: 'الفاتحة',
    firstNuzulRank: 5,
    firstMushafOrder: 1,
    firstAyah: 1,
    yearCE: 611,
    yearLabel: '12 BH / 611 CE',
    epoch: 'Early Meccan',
    epochUrdu: 'اوائلِ مکہ',
    category: 'dhat',
    categoryUrdu: 'اسمِ ذاتِ اعظم',
    categoryColor: '#059669',
    verseArabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ۝ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
    verseTranslationUrdu: 'اللہ کے نام سے جو بڑا مہربان نہایت رحم والا ہے؛ تمام تعریفیں اللہ کے لیے ہیں جو تمام جہانوں کا پالنے والا ہے۔',
    verseTranslationEnglish: 'In the name of Allah, the Entirely Merciful, the Especially Merciful. All praise is due to Allah, Lord of the worlds.',
    scholarlyTheologicalInsightUrdu:
      '«اللَّه» اسمِ جلالت ہے جو تمام کمالات کا احاطہ کرتا ہے۔ نزولی ترتیب میں سورۃ الفاتحہ کے ساتھ نماز پنجگانہ کا جزو بن کر ہر مسلمان کے روزمرہ ذکر کا محور بنا۔',
    scholarlyTheologicalInsightEnglish:
      'The comprehensive proper name denoting the Divine Essence possessing all perfections, integrated chronologically with the revelation of Surah Al-Fatihah.',
    totalQuranicMentions: 2699,
  },
  {
    id: 'al-ahad',
    nameArabic: 'الْأَحَد',
    meaningUrdu: 'یکتا، جس کی کوئی نظیر یا مثل نہ ہو، ناقابلِ تقسیم',
    meaningEnglish: 'The Unique, The Indivisible One',
    firstNuzulSurah: 'الإخلاص',
    firstNuzulRank: 22,
    firstMushafOrder: 112,
    firstAyah: 1,
    yearCE: 614,
    yearLabel: '9 BH / 614 CE (توحیدِ خالص)',
    epoch: 'Early Meccan',
    epochUrdu: 'اوائلِ مکہ',
    category: 'dhat',
    categoryUrdu: 'توحید و یکتائی',
    categoryColor: '#8B5CF6',
    verseArabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ',
    verseTranslationUrdu: 'کہہ دیجیے کہ وہ اللہ یکتا اور ایک ہے۔',
    verseTranslationEnglish: 'Say: "He is Allah, the Unique One."',
    scholarlyTheologicalInsightUrdu:
      'جب مشرکین نے پوچھا کہ اپنے رب کا نسب بیان کرو، تو سورۃ الاخلاص نازل ہوئی۔ «الاحد» وہ واحد ہے جس کی نہ ذات میں کوئی ترکیب ہے اور نہ اس کا کوئی ثانی ہو سکتا ہے۔',
    scholarlyTheologicalInsightEnglish:
      'Revealed in response to pagan demands for the divine genealogy, defining God as absolutely indivisible without components, partners, or equals.',
    totalQuranicMentions: 1,
  },
  {
    id: 'as-samad',
    nameArabic: 'الصَّمَد',
    meaningUrdu: 'بے نیاز، جس کے سب محتاج ہوں اور وہ کسی کا محتاج نہ ہو',
    meaningEnglish: 'The Eternal Refuge, The Absolute Sanctuary',
    firstNuzulSurah: 'الإخلاص',
    firstNuzulRank: 22,
    firstMushafOrder: 112,
    firstAyah: 2,
    yearCE: 614,
    yearLabel: '9 BH / 614 CE',
    epoch: 'Early Meccan',
    epochUrdu: 'اوائلِ مکہ',
    category: 'dhat',
    categoryUrdu: 'بے نیازیِ مطلق',
    categoryColor: '#8B5CF6',
    verseArabic: 'اللَّهُ الصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ',
    verseTranslationUrdu: 'اللہ سب سے بے نیاز ہے؛ نہ اس نے کسی کو جنا ہے اور نہ وہ کسی سے جنا گیا ہے۔',
    verseTranslationEnglish: 'Allah, the Eternal Refuge. He neither begets nor is born.',
    scholarlyTheologicalInsightUrdu:
      'امام حسینؑ کا فرمان: «الصمد وہ ذات ہے جس کی طرف تمام کائنات اپنی تمام تر ضروریات اور حاجات لے کر رجوع کرتی ہے۔»',
    scholarlyTheologicalInsightEnglish:
      'Imam Hussain (as) defined As-Samad as the ultimate ontological sanctuary to whom all created existents perpetually direct their absolute need.',
    totalQuranicMentions: 1,
  },
  {
    id: 'ar-rahman',
    nameArabic: 'الرَّحْمَٰن',
    meaningUrdu: 'نہایت مہربان، تمام کائنات پر وسیع رحمت فرمانے والا',
    meaningEnglish: 'The All-Compassionate, Universally Merciful',
    firstNuzulSurah: 'مريم / الفرقان',
    firstNuzulRank: 44,
    firstMushafOrder: 19,
    firstAyah: 1,
    yearCE: 616,
    yearLabel: '7 BH / 616 CE (معرکۂ رحمن)',
    epoch: 'Mid Meccan',
    epochUrdu: 'وسطِ مکہ',
    category: 'rahmah',
    categoryUrdu: 'رحمتِ واسعہ',
    categoryColor: '#F59E0B',
    verseArabic: 'وَإِذَا قِيلَ لَهُمُ اسْجُدُوا لِلرَّحْمَٰنِ قَالُوا وَمَا الرَّحْمَٰنُ أَنَسْجُدُ لِمَا تَأْمُرُنَا',
    verseTranslationUrdu: 'اور جب ان سے کہا جاتا ہے کہ رحمن کو سجدہ کرو تو کہتے ہیں کہ رحمن کیا ہے؟ کیا ہم اس چیز کو سجدہ کریں جس کا تم ہمیں حکم دیتے ہو؟',
    verseTranslationEnglish: 'And when it is said to them, "Prostrate to the All-Compassionate," they say, "And what is Ar-Rahman? Shall we prostrate to whatever you command us?"',
    scholarlyTheologicalInsightUrdu:
      'مکہ کے درمیانی دور میں مشرکین نے «الرحمن» نام کے خلاف بغاوت کر دی۔ قرآن نے سورۃ مریم میں ۱۶ مرتبہ اور سورۃ الفرقان میں اس نام کو ان کے بتوں کے مقابلے میں رحمٰنیت کے نظام کے طور پر پیش کیا۔',
    scholarlyTheologicalInsightEnglish:
      'Polytheists vehemently resisted the name Ar-Rahman. The revelation responded with intense polemical emphasis, invoking the Name 16 times in Surah Maryam to dismantle pagan hostility.',
    totalQuranicMentions: 57,
  },
  {
    id: 'al-alim',
    nameArabic: 'الْعَلِيم',
    meaningUrdu: 'سب کچھ جاننے والا، باطن و ظاہر کا مکمل علم رکھنے والا',
    meaningEnglish: 'The All-Knowing, Omniscient of Unseen & Seen',
    firstNuzulSurah: 'القلم / الحجر',
    firstNuzulRank: 2,
    firstMushafOrder: 68,
    firstAyah: 7,
    yearCE: 610,
    yearLabel: '13 BH / 610 CE',
    epoch: 'Early Meccan',
    epochUrdu: 'اوائلِ مکہ',
    category: 'hikmah_izzah',
    categoryUrdu: 'علم و دانائی',
    categoryColor: '#0284C7',
    verseArabic: 'إِنَّ رَبَّكَ هُوَ أَعْلَمُ بِمَن ضَلَّ عَن سَبِيلِهِ وَهُوَ أَعْلَمُ بِالْمُهْتَدِينَ',
    verseTranslationUrdu: 'بیشک آپ کا رب خوب جانتا ہے کہ کون اس کی راہ سے بھٹک گیا اور وہ ہدایت پانے والوں کو بھی خوب جاننے والا ہے۔',
    verseTranslationEnglish: 'Indeed, your Lord is most knowing of who has strayed from His way, and He is most knowing of the guided.',
    scholarlyTheologicalInsightUrdu:
      'جب مکہ میں رسولِ خدا ﷺ پر پاگل پن اور جادو کے الزامات لگائے گئے، تو «الْعَلِيم» کی صفت نے اعلان کیا کہ نیتوں اور باطن کا اصل جاننے والا صرف اللہ ہے۔',
    scholarlyTheologicalInsightEnglish:
      'Consoling the Prophet amidst slanders of madness, divine omniscience affirmed that hidden spiritual alignments are known exclusively to the Creator.',
    totalQuranicMentions: 157,
  },
  {
    id: 'al-aziz',
    nameArabic: 'الْعَزِيز',
    meaningUrdu: 'غالب، زبردست، جس پر کوئی غلبہ نہ پا سکے',
    meaningEnglish: 'The Almighty, The Invulnerable in Power',
    firstNuzulSurah: 'الشعراء',
    firstNuzulRank: 47,
    firstMushafOrder: 26,
    firstAyah: 9,
    yearCE: 618,
    yearLabel: '5 BH / 618 CE',
    epoch: 'Mid Meccan',
    epochUrdu: 'وسطِ مکہ',
    category: 'hikmah_izzah',
    categoryUrdu: 'عزت و غلبہ',
    categoryColor: '#0284C7',
    verseArabic: 'وَإِنَّ رَبَّكَ لَهُوَ الْعَزِيزُ الرَّحِيمُ',
    verseTranslationUrdu: 'اور بیشک آپ کا پروردگار یقیناً بڑا غالب اور نہایت رحم والا ہے۔',
    verseTranslationEnglish: 'And indeed, your Lord—He is the Almighty, the Entirely Merciful.',
    scholarlyTheologicalInsightUrdu:
      'سورۃ الشعراء میں ہر نبی کی داستان کے بعد یہ ترجیع دہرائی گئی: «الْعَزِيزُ الرَّحِيمُ» — تاکہ ظالموں کو معلوم ہو کہ اللہ ظالموں کو سزا دینے پر قادر ہے اور مؤمنوں پر مہربان۔',
    scholarlyTheologicalInsightEnglish:
      'Repeated like a solemn refrain after every prophet\'s account in Surah Ash-Shu\'ara, balancing devastating divine might against tender mercy toward the oppressed.',
    totalQuranicMentions: 92,
  },
  {
    id: 'al-hakim',
    nameArabic: 'الْحَكِيم',
    meaningUrdu: 'کامل حکمت والا، ہر کام کو مناسب وقت اور عدل سے کرنے والا',
    meaningEnglish: 'The All-Wise, Perfect in Judgment & Governance',
    firstNuzulSurah: 'الزخرف / الجاثية',
    firstNuzulRank: 63,
    firstMushafOrder: 43,
    firstAyah: 84,
    yearCE: 620,
    yearLabel: '3 BH / 620 CE',
    epoch: 'Late Meccan',
    epochUrdu: 'اواخرِ مکہ',
    category: 'hikmah_izzah',
    categoryUrdu: 'حکمت و دانائی',
    categoryColor: '#0284C7',
    verseArabic: 'وَهُوَ الَّذِي فِي السَّمَاءِ إِلَٰهٌ وَفِي الْأَرْضِ إِلَٰهٌ ۚ وَهُوَ الْحَكِيمُ الْعَلِيمُ',
    verseTranslationUrdu: 'اور وہی ہے جو آسمانوں میں بھی خدا ہے اور زمین میں بھی خدا ہے؛ اور وہی کمال حکمت والا اور ہر چیز کا جاننے والا ہے۔',
    verseTranslationEnglish: 'And it is He who is God in heaven and God on earth; and He is the All-Wise, the All-Knowing.',
    scholarlyTheologicalInsightUrdu:
      'مدینہ کے قوانین، شادی، طلاق، وراثت، اور حدود کے احکام ہمیشہ «الْعَزِيزِ الْحَكِيمِ» پر ختم ہوتے ہیں، تاکہ واضح ہو کہ الٰہی قوانین میں ظلم کا شائبہ نہیں بلکہ عمیق حکمت ہے۔',
    scholarlyTheologicalInsightEnglish:
      'In Medinan jurisprudence, divine legislation uniformly concludes with Al-Hakim, demonstrating that statutory mandates are anchored in consummate wisdom rather than arbitrariness.',
    totalQuranicMentions: 97,
  },
  {
    id: 'al-malik',
    nameArabic: 'الْمَلِك',
    meaningUrdu: 'بادشاہِ حقیقی، کائنات کا خود مختار اور مطلق فرمانروا',
    meaningEnglish: 'The Absolute Sovereign, The Supreme King',
    firstNuzulSurah: 'طه / الحشر',
    firstNuzulRank: 45,
    firstMushafOrder: 20,
    firstAyah: 114,
    yearCE: 617,
    yearLabel: '6 BH / 617 CE',
    epoch: 'Mid Meccan',
    epochUrdu: 'وسطِ مکہ',
    category: 'mulk_adl',
    categoryUrdu: 'حاکمیت و فرمانروائی',
    categoryColor: '#8B5CF6',
    verseArabic: 'فَتَعَالَى اللَّهُ الْمَلِكُ الْحَقُّ ۗ وَلَا تَعْجَلْ بِالْقُرْآنِ مِن قَبْلِ أَن يُقْضَىٰ إِلَيْكَ وَحْيُهُ',
    verseTranslationUrdu: 'پس بہت بلند و برتر ہے اللہ جو حقیقی بادشاہ ہے؛ اور قرآن کے پڑھنے میں جلدی نہ کیجیے قبل اس کے کہ اس کی وحی مکمل کی جائے۔',
    verseTranslationEnglish: 'So high above all is Allah, the True Sovereign. And do not hasten with the Quran before its revelation is completed to you.',
    scholarlyTheologicalInsightUrdu:
      'انسانی بادشاہتیں زوال پذیر ہیں، لیکن اللہ «الملک الحق» ہے جس کی حاکمیت تکوینی بھی ہے اور تشریعی بھی۔',
    scholarlyTheologicalInsightEnglish:
      'Contrasting fragile earthly monarchies against the eternal, intrinsic sovereignty of the Divine over physical cosmos and moral order alike.',
    totalQuranicMentions: 5,
  },
  {
    id: 'al-quddus',
    nameArabic: 'الْقُدُّوس',
    meaningUrdu: 'نہایت پاک، ہر عیب، نقص اور شرک کی آمیزش سے منزہ',
    meaningEnglish: 'The Most Holy, Free from Any Imperfection',
    firstNuzulSurah: 'الحشر',
    firstNuzulRank: 101,
    firstMushafOrder: 59,
    firstAyah: 23,
    yearCE: 626,
    yearLabel: '4 AH / 626 CE',
    epoch: 'Early Medinan',
    epochUrdu: 'اوائلِ مدینہ',
    category: 'dhat',
    categoryUrdu: 'تقدیس و تنزیہ',
    categoryColor: '#059669',
    verseArabic: 'هُوَ اللَّهُ الَّذِي لَا إِلَٰهَ إِلَّا هُوَ الْمَلِكُ الْقُدُّوسُ السَّلَامُ الْمُؤْمِنُ الْمُهَيْمِنُ الْعَزِيزُ الْجَبَّارُ الْمُتَكَبِّرُ',
    verseTranslationUrdu: 'وہی اللہ ہے جس کے سوا کوئی معبود نہیں، حقیقی بادشاہ، نہایت پاک، سلامتی دینے والا، امن بخشنے والا، نگہبان، سب پر غالب، زبردست، اور کبریائی کا مالک۔',
    verseTranslationEnglish: 'He is Allah, other than whom there is no deity, the Sovereign, the Pure, the Source of Peace, the Bestower of Faith, the Overseer, the Exalted in Might, the Compeller, the Superior.',
    scholarlyTheologicalInsightUrdu:
      'سورۃ الحشر کے اختتام پر ۱۶ اسمائے حسنیٰ کا شاندار جھرمٹ نازل ہوا جس کو مفسرین نے قرآن کا سب سے بڑا توحیدی گلدستہ قرار دیا ہے۔',
    scholarlyTheologicalInsightEnglish:
      'The breathtaking crescendo of 16 divine attributes at the conclusion of Surah Al-Hashr, hailed in exegesis as the grandest monotheistic tapestry in the Quran.',
    totalQuranicMentions: 2,
  },
  {
    id: 'as-salam',
    nameArabic: 'السَّلَام',
    meaningUrdu: 'سلامتی کا سرچشمہ، آفات سے محفوظ رکھنے والا اور امن بخشنے والا',
    meaningEnglish: 'The Source of Peace, The Granter of Security',
    firstNuzulSurah: 'الحشر',
    firstNuzulRank: 101,
    firstMushafOrder: 59,
    firstAyah: 23,
    yearCE: 626,
    yearLabel: '4 AH / 626 CE',
    epoch: 'Early Medinan',
    epochUrdu: 'اوائلِ مدینہ',
    category: 'rahmah',
    categoryUrdu: 'امن و سلامتی',
    categoryColor: '#10B981',
    verseArabic: 'الْمَلِكُ الْقُدُّوسُ السَّلَامُ الْمُؤْمِنُ',
    verseTranslationUrdu: 'حقیقی بادشاہ، پاک ذات، سراپا سلامتی، اور امن دینے والا۔',
    verseTranslationEnglish: 'The Sovereign, the Pure, the Source of Peace, the Bestower of Security.',
    scholarlyTheologicalInsightUrdu:
      'اسلام کا نام، جنت کا تحفہ اور اللہ کی ذات سب «سلام» پر مبنی ہیں۔ جنگی بحرانوں کے بیچ یہ نام نازل ہو کر امن کو الٰہی نصب العین بناتا ہے۔',
    scholarlyTheologicalInsightEnglish:
      'Anchoring human greeting, the abode of paradise, and the Divine Nature in transcendent peace amidst the temporal storms of military defense.',
    totalQuranicMentions: 1,
  },
  {
    id: 'al-wali',
    nameArabic: 'الْوَلِيّ',
    meaningUrdu: 'سرپرست، دوست، حامی و مددگار، متولیِ امور',
    meaningEnglish: 'The Guardian, The Protecting Ally, The Loving Patron',
    firstNuzulSurah: 'الشورى / المائدة',
    firstNuzulRank: 62,
    firstMushafOrder: 42,
    firstAyah: 9,
    yearCE: 620,
    yearLabel: '3 BH / 620 CE (ولایتِ الٰہی)',
    epoch: 'Late Meccan',
    epochUrdu: 'اواخرِ مکہ',
    category: 'wilayah_nasr',
    categoryUrdu: 'ولایت و نصرت',
    categoryColor: '#EC4899',
    verseArabic: 'أَمِ اتَّخَذُوا مِن دُونِهِ أَوْلِيَاءَ ۖ فَاللَّهُ هُوَ الْوَلِيُّ وَهُوَ يُحْيِي الْمَوْتَىٰ',
    verseTranslationUrdu: 'کیا انہوں نے اللہ کو چھوڑ کر دوسرے سرپرست بنا لیے ہیں؟ پس حقیقی سرپرست اور ولی صرف اللہ ہی ہے اور وہی مردوں کو زندہ کرے گا۔',
    verseTranslationEnglish: 'Or have they taken protectors besides Him? But Allah—He is the Protector, and He gives life to the dead.',
    scholarlyTheologicalInsightUrdu:
      '«الولی» کی صفت رسول اور ائمۂ اہل بیتؑ کی ولایت کا سرچشمہ بنتی ہے: «إِنَّمَا وَلِيُّكُمُ اللَّهُ وَرَسُولُهُ وَالَّذِينَ آمَنُوا الَّذِينَ يُقِيمُونَ الصَّلَاةَ وَيُؤْتُونَ الزَّكَاةَ وَهُمْ رَاكِعُونَ» (المائدۃ ۵۵)۔',
    scholarlyTheologicalInsightEnglish:
      'The foundational source of sacred leadership (Wilayah), extending through the Prophet to the righteous leadership of Imam Ali (as) as codified in 5:55.',
    totalQuranicMentions: 15,
  },
  {
    id: 'al-mawla',
    nameArabic: 'الْمَوْلَىٰ',
    meaningUrdu: 'آقا و مولیٰ، دستگیر، پشت پناہ، کامل ناصر',
    meaningEnglish: 'The Master, The Supreme Sovereign Ally',
    firstNuzulSurah: 'الحج / الأنفال',
    firstNuzulRank: 103,
    firstMushafOrder: 22,
    firstAyah: 78,
    yearCE: 627,
    yearLabel: '6 AH / 627 CE',
    epoch: 'Early Medinan',
    epochUrdu: 'اوائلِ مدینہ',
    category: 'wilayah_nasr',
    categoryUrdu: 'ولایت و مولویت',
    categoryColor: '#EC4899',
    verseArabic: 'وَاعْتَصِمُوا بِاللَّهِ هُوَ مَوْلَاكُمْ ۖ فَنِعْمَ الْمَوْلَىٰ وَنِعْمَ النَّصِيرُ',
    verseTranslationUrdu: 'اور اللہ کے دامن کو مضبوطی سے تھام لو، وہی تمہارا مولیٰ ہے؛ پس وہ کیا ہی بہترین مولیٰ ہے اور کیا ہی بہترین مددگار ہے!',
    verseTranslationEnglish: 'And hold fast to Allah. He is your Master; an excellent protector and an excellent helper!',
    scholarlyTheologicalInsightUrdu:
      'حدیثِ غدیر کا مفہوم: «من كنت مولاه فهذا علي مولاه» — اللہ تعالیٰ کی مولویت کے سائے میں امت کی مستقل دستگیری اور سرپرستی کا منشور۔',
    scholarlyTheologicalInsightEnglish:
      'Directly illuminating the famous declaration of Ghadir Khumm ("Whoever I am his Mawla, Ali is his Mawla"), framing leadership as continuous divine shelter.',
    totalQuranicMentions: 12,
  },
  {
    id: 'at-tawwab',
    nameArabic: 'التَّوَّاب',
    meaningUrdu: 'بار بار توبہ قبول فرمانے والا، بندوں کی طرف پلٹ کر رحمت کرنے والا',
    meaningEnglish: 'The Ever-Pardoning, The Relenting in Forgiveness',
    firstNuzulSurah: 'النصر',
    firstNuzulRank: 114,
    firstMushafOrder: 110,
    firstAyah: 3,
    yearCE: 632,
    yearLabel: '10 AH / 632 CE (آخری نزول)',
    epoch: 'Late Medinan',
    epochUrdu: 'اواخرِ مدینہ',
    category: 'rahmah',
    categoryUrdu: 'توبہ و مغفرت',
    categoryColor: '#10B981',
    verseArabic: 'فَسَبِّحْ بِحَمْدِ رَبِّكَ وَاسْتَغْفِرْهُ ۚ إِنَّهُ كَانَ تَوَّابًا',
    verseTranslationUrdu: 'پس اپنے پروردگار کی حمد کے ساتھ تسبیح کیجیے اور اس سے مغفرت طلب کیجیے، بیشک وہ بڑا ہی توبہ قبول کرنے والا ہے۔',
    verseTranslationEnglish: 'Then exalt with praise of your Lord and ask forgiveness of Him. Indeed, He is ever-accepting of repentance.',
    scholarlyTheologicalInsightUrdu:
      'نزولِ قرآن کی سب سے آخری مکمل سورۃ (النصر) کا اختتام «التَّوَّاب» پر ہوا! یہ کتنا شاندار درس ہے کہ ۲۳ سالہ عظیم ترین نبوی فتح اور انقلاب کے بعد بھی انسان کو رب کی تسبیح اور استغفار کا حکم دیا گیا۔',
    scholarlyTheologicalInsightEnglish:
      'The chronological finale of divine revelation (Surah An-Nasr) concludes on At-Tawwab—a sublime spiritual reminder that even in historic victory, humble contrition remains supreme.',
    totalQuranicMentions: 11,
  },
];
