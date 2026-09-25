export type CrisisCategory =
  | 'theological_inquiry'
  | 'persecution_siege'
  | 'battlefield_shock'
  | 'social_crisis_slander'
  | 'diplomatic_treaty'
  | 'covenant_completion';

export interface CrisisCategoryDef {
  id: CrisisCategory;
  labelEn: string;
  labelUr: string;
  iconName: string;
  colorClass: string;
  borderClass: string;
  bgLightClass: string;
}

export const CRISIS_CATEGORIES: CrisisCategoryDef[] = [
  {
    id: 'theological_inquiry',
    labelEn: 'Theological Inquiries',
    labelUr: 'مناظرات و علمی سوالات',
    iconName: 'HelpCircle',
    colorClass: 'text-indigo-600 dark:text-indigo-400',
    borderClass: 'border-indigo-500/30',
    bgLightClass: 'bg-indigo-500/10',
  },
  {
    id: 'persecution_siege',
    labelEn: 'Persecution & Sieges',
    labelUr: 'شعبِ ابی طالب و مظالم',
    iconName: 'ShieldAlert',
    colorClass: 'text-amber-600 dark:text-amber-400',
    borderClass: 'border-amber-500/30',
    bgLightClass: 'bg-amber-500/10',
  },
  {
    id: 'battlefield_shock',
    labelEn: 'Battlefield Shocks & Triage',
    labelUr: 'معرکۂ احد، بدر و احزاب',
    iconName: 'Swords',
    colorClass: 'text-rose-600 dark:text-rose-400',
    borderClass: 'border-rose-500/30',
    bgLightClass: 'bg-rose-500/10',
  },
  {
    id: 'social_crisis_slander',
    labelEn: 'Social Crises & Slander',
    labelUr: 'واقعۂ افک و سماجی فتنہ',
    iconName: 'AlertTriangle',
    colorClass: 'text-orange-600 dark:text-orange-400',
    borderClass: 'border-orange-500/30',
    bgLightClass: 'bg-orange-500/10',
  },
  {
    id: 'diplomatic_treaty',
    labelEn: 'Diplomacy & Mubahalah',
    labelUr: 'صلحِ حدیبیہ و مباہلہ',
    iconName: 'Scroll',
    colorClass: 'text-teal-600 dark:text-teal-400',
    borderClass: 'border-teal-500/30',
    bgLightClass: 'bg-teal-500/10',
  },
  {
    id: 'covenant_completion',
    labelEn: 'Covenant & Completion',
    labelUr: 'غدیرِ خم و اکمالِ دین',
    iconName: 'Crown',
    colorClass: 'text-emerald-600 dark:text-emerald-400',
    borderClass: 'border-emerald-500/30',
    bgLightClass: 'bg-emerald-500/10',
  },
];

export interface RevealedScripturePassage {
  surahNumber: number;
  surahNameArabic: string;
  surahNameUrdu: string;
  surahNameEnglish: string;
  ayahNumber: number;
  ayahRangeText: string;
  arabicText: string;
  urduTranslation: string;
  englishTranslation: string;
  audioVerseKey: string; // e.g. "18:83" or "3:139"
}

export interface AsbabCrisisEvent {
  id: string;
  orderNumber: number;
  titleEn: string;
  titleUr: string;
  category: CrisisCategory;
  yearCE: number;
  yearHijriOrNabawi: string;
  periodId: 'early_meccan' | 'mid_meccan' | 'late_meccan' | 'early_medinan' | 'late_medinan';
  locationEn: string;
  locationUr: string;
  keyFiguresEn: string[];
  keyFiguresUr: string[];
  crisisTriggerEn: string;
  crisisTriggerUr: string;
  divineResponseEn: string;
  divineResponseUr: string;
  pedagogicalWisdomEn: string;
  pedagogicalWisdomUr: string;
  scripture: RevealedScripturePassage;
  chronologicalRank: number; // approximate order in 1-114 or passage order
  linkedPassageStepIndex?: number;
}

export const ASBAB_CRISIS_EVENTS: AsbabCrisisEvent[] = [
  {
    id: 'crisis-abu-lahab',
    orderNumber: 1,
    titleEn: 'Mount Safa Proclamation & Public Rejection',
    titleUr: 'کوہِ صفا پر علانیہ دعوت اور ابو لہب کی گستاخی',
    category: 'persecution_siege',
    yearCE: 613,
    yearHijriOrNabawi: '3rd Year of Bi\'thah',
    periodId: 'early_meccan',
    locationEn: 'Mount Safa, Makkah',
    locationUr: 'کوہِ صفا، مکہ مکرمہ',
    keyFiguresEn: ['Prophet Muhammad (ﷺ)', 'Abu Lahab', 'Quraysh Chiefs'],
    keyFiguresUr: ['رسولِ خدا ﷺ', 'ابو لہب', 'اشرافِ قریش'],
    crisisTriggerEn:
      'Upon the divine order to warn his close kin (وانذر عشیرتک الاقربین), the Prophet climbed Mount Safa and proclaimed Tawhid. His uncle Abu Lahab violently disrupted the gathering, cursing: "May you perish! Did you gather us for this?"',
    crisisTriggerUr:
      'جب اللہ نے حکم دیا کہ اپنے قریبی رشتہ داروں کو متنبہ کریں، تو رسول اللہ ﷺ نے کوہِ صفا پر کھڑے ہو کر پکارا۔ جب توحید اور آخرت کی دعوت دی تو چچا ابو لہب نے چیخ کر بددعا دی: "تباً لک، کیا تو نے ہمیں اس لیے جمع کیا تھا؟"',
    divineResponseEn:
      'Surah Al-Masad descended with unyielding divine authority, declaring the eternal doom and bankruptcy of Abu Lahab and his wife, shattering the psychological pride of the tribal elite.',
    divineResponseUr:
      'سورۂ مسد نازل ہوئی جس نے ابو لہب اور اس کی زوجہ کے تکبر کو ہمیشہ کے لیے نیست و نابود کر دیا اور واضح کیا کہ نبوت کے مقابلے میں قرابت داری کوئی ڈھال نہیں ہو سکتی۔',
    pedagogicalWisdomEn:
      'Divine justice is completely blind to tribal nobility or kinship. Blood relation without faith offers zero immunity against spiritual ruin.',
    pedagogicalWisdomUr:
      'حکمتِ نزول یہ ہے کہ قرابت اور نسب ایمان کے بغیر کوئی نجات نہیں بخشتا۔ حق کے خلاف عناد رکھنے والے کا مقدر رسوائی ہے۔',
    scripture: {
      surahNumber: 111,
      surahNameArabic: 'المسد',
      surahNameUrdu: 'المسد',
      surahNameEnglish: 'Al-Masad',
      ayahNumber: 1,
      ayahRangeText: '111:1–3',
      arabicText: 'تَبَّتْ يَدَا أَبِي لَهَبٍ وَتَبَّ ۝ مَا أَغْنَىٰ عَنْهُ مَالُهُ وَمَا كَسَبَ ۝ سَيَصْلَىٰ نَارًا ذَاتَ لَهَبٍ',
      urduTranslation: 'ٹوٹ گئے ابو لہب کے دونوں ہاتھ اور وہ خود برباد ہو گیا۔ نہ اس کا مال اس کے کام آیا اور نہ اس کی کمائی۔ وہ عنقریب شعلہ زن آگ میں داخل ہو گا۔',
      englishTranslation: 'Perish the hands of Abu Lahab, and may he perish! His wealth and gains will not avail him. He will burn in a Flame of blazing fire.',
      audioVerseKey: '111:1',
    },
    chronologicalRank: 6,
    linkedPassageStepIndex: 1,
  },
  {
    id: 'crisis-rabbis-three-questions',
    orderNumber: 2,
    titleEn: 'The 3 Riddles of the Rabbis of Yathrib',
    titleUr: 'علماءِ یہود کے ۳ امتحانی سوالات اور نزولِ کہف و اسراء',
    category: 'theological_inquiry',
    yearCE: 616,
    yearHijriOrNabawi: '6th Year of Bi\'thah',
    periodId: 'mid_meccan',
    locationEn: 'Dar al-Nadwah, Makkah',
    locationUr: 'دار الندوہ، مکہ مکرمہ',
    keyFiguresEn: ['An-Nadr ibn al-Harith', 'Uqbah ibn Abi Mu\'ayt', 'Rabbis of Yathrib', 'Prophet Muhammad (ﷺ)'],
    keyFiguresUr: ['نضر بن حارث', 'عقبہ بن ابی معیط', 'مدینہ کے یہودی احبار', 'رسولِ اکرم ﷺ'],
    crisisTriggerEn:
      'The Quraysh sent delegates to the rabbis of Yathrib seeking conclusive tests to prove or disprove Muhammad\'s prophethood. The rabbis instructed: "Ask him about the youth who disappeared in ancient times, the mighty traveler of east and west, and the true essence of the Soul (Ruh)."',
    crisisTriggerUr:
      'قریش نے نضر بن حارث اور عقبہ کو مدینہ کے یہودی علماء کے پاس بھیجا کہ محمد (ﷺ) کو جانچنے کا طریقہ بتائیں۔ انہوں نے کہا: ان سے ۳ سوال پوچھو: وہ غار والے نوجوان، مشرق و مغرب کا سفر کرنے والا حکمران (ذو القرنین)، اور روح کی حقیقت۔',
    divineResponseEn:
      'Surah Al-Kahf and Surah Al-Isra were revealed in breathtaking detail, answering the mysteries of the Sleepers of the Cave, Dhul-Qarnayn, and explaining that the Ruh is by the decree of Allah, silencing the critics.',
    divineResponseUr:
      'سورۂ کہف اور سورۂ اسراء نازل ہوئیں۔ اصحابِ کہف کا واقعہ، ذوالقرنین کی فتوحات اور روح کی حقیقت کو ایسے مفصل اور حیرت انگیز الٰہی پیرائے میں بیان کیا کہ یہود و قریش دنگ رہ گئے۔',
    pedagogicalWisdomEn:
      'Revelation does not cater to skepticism for entertainment; it turns scholastic riddles into deep moral lessons about divine sovereignty, trial of faith, and humility before ultimate knowledge.',
    pedagogicalWisdomUr:
      'وحی نے ان علمی چیلنجز کو محض تاریخی داستان نہیں بنایا بلکہ ایمان کی آزمائش، مادہ پرستی کی حقیقت اور علمِ الٰہی کی وسعت کا دائمی درس بنا دیا۔',
    scripture: {
      surahNumber: 17,
      surahNameArabic: 'الإسراء',
      surahNameUrdu: 'بنی اسرائیل',
      surahNameEnglish: 'Al-Isra',
      ayahNumber: 85,
      ayahRangeText: '17:85',
      arabicText: 'وَيَسْأَلُونَكَ عَنِ الرُّوحِ ۖ قُلِ الرُّوحُ مِنْ أَمْرِ رَبِّي وَمَا أُوتِيتُم مِّنَ الْعِلْمِ إِلَّا قَلِيلًا',
      urduTranslation: 'اور یہ آپ سے روح کے بارے میں سوال کرتے ہیں، کہہ دیجیے کہ روح میرے پروردگار کے حکم سے ہے اور تمہیں علم میں سے بس تھوڑا ہی دیا گیا ہے۔',
      englishTranslation: 'And they ask you about the Spirit. Say, "The Spirit is by the command of my Lord, and you have not been given of knowledge except a little."',
      audioVerseKey: '17:85',
    },
    chronologicalRank: 50,
  },
  {
    id: 'crisis-shib-abi-talib',
    orderNumber: 3,
    titleEn: 'The 3-Year Siege of Shi\'b Abi Talib',
    titleUr: 'شعبِ ابی طالب کا تین سالہ معاشی و سماجی بائیکاٹ',
    category: 'persecution_siege',
    yearCE: 617,
    yearHijriOrNabawi: '7th–10th Year of Bi\'thah',
    periodId: 'mid_meccan',
    locationEn: 'Valley of Abu Talib, Makkah',
    locationUr: 'شعبِ ابی طالب، مکہ',
    keyFiguresEn: ['Prophet Muhammad (ﷺ)', 'Abu Talib (ع)', 'Lady Khadijah (ع)', 'Imam Ali (ع)', 'Banu Hashim'],
    keyFiguresUr: ['رسول اللہ ﷺ', 'حضرت ابو طالبؑ', 'ام المومنین حضرت خدیجہؑ', 'حضرت علیؑ', 'بنو ہاشم'],
    crisisTriggerEn:
      'Quraysh chiefs drew up a cruel parchment covenant hung inside the Ka\'bah, declaring total boycott: no marriage, trade, or food allowed to Banu Hashim. For 3 agonizing years, children wept of starvation and adults survived on desert tree leaves.',
    crisisTriggerUr:
      'قریش نے کعبہ کے اندر ایک ظالمانہ تحریر لٹکائی جس میں بنو ہاشم کا مکمل سماجی اور معاشی مقاطعہ کیا گیا: نہ کوئی شادی، نہ تجارت، نہ غلہ۔ تین سال تک وادی میں بھوک سے بچوں کی چیخیں گونجتی رہیں اور پتے کھا کر گزارا ہوا۔',
    divineResponseEn:
      'During this brutal crucible, magnificent chapters like Surah Yusuf, Surah Hud, and Surah Ibrahim descended, reassuring the believers through the patience of Prophet Yusuf in the well and Prophet Hud against tyrants.',
    divineResponseUr:
      'اس سخت ترین آزمائش میں سورۂ یوسف اور سورۂ ہود نازل ہوئیں جنہوں نے یہ تسلی دی کہ جس طرح یوسفؑ نے کنویں اور قید خانے کی آزمائش کے بعد اقتدار اور عزت پائی، حق کی فتح حتمی ہے۔',
    pedagogicalWisdomEn:
      'Before historical leadership and sovereignty can be bestowed, the faithful vanguard must be purified through extreme hardship to strip away reliance on anything other than Allah.',
    pedagogicalWisdomUr:
      'عظیم تر الٰہی مقاصد اور امامت کے قیام سے قبل اہل ایمان کو مصائب کی بھٹی سے گزار کر غیر اللہ کے تمام سہاروں سے کاٹ کر خالص توکل پر قائم کیا گیا۔',
    scripture: {
      surahNumber: 11,
      surahNameArabic: 'هود',
      surahNameUrdu: 'ہود',
      surahNameEnglish: 'Hud',
      ayahNumber: 115,
      ayahRangeText: '11:115',
      arabicText: 'وَاصْبِرْ فَإِنَّ اللَّهَ لَا يُضِيعُ أَجْرَ الْمُحْسِنِينَ',
      urduTranslation: 'اور صبر سے کام لیجیے، یقیناً اللہ نیکی کرنے والوں کا اجر کبھی ضائع نہیں کرتا۔',
      englishTranslation: 'And be patient, for indeed Allah does not allow the reward of the doers of good to be lost.',
      audioVerseKey: '11:115',
    },
    chronologicalRank: 52,
    linkedPassageStepIndex: 3,
  },
  {
    id: 'crisis-badr-triage',
    orderNumber: 4,
    titleEn: 'The Day of Criterion: Shock & Spoils at Badr',
    titleUr: 'یومِ فرقان: غزوۂ بدر کی فتح اور مالِ غنیمت کا بحران',
    category: 'battlefield_shock',
    yearCE: 624,
    yearHijriOrNabawi: '17 Ramadan, 2 AH',
    periodId: 'early_medinan',
    locationEn: 'Wells of Badr, Western Arabia',
    locationUr: 'میدانِ بدر، حجاز',
    keyFiguresEn: ['Prophet Muhammad (ﷺ)', 'Imam Ali (ع)', 'Hamza ibn Abd al-Muttalib (ع)', 'Abu Jahl (Slain)'],
    keyFiguresUr: ['رسولِ اکرم ﷺ', 'حضرت علی ابن ابی طالبؑ', 'حضرت حمزہؑ', 'ابو جہل'],
    crisisTriggerEn:
      '313 ill-equipped believers faced 1,000 heavily armored Quraysh warriors. Following the miraculous victory, disputes broke out among the young fighters regarding who had the rightful claim over captured spoils.',
    crisisTriggerUr:
      '۳۱۳ نہتے مسلمانوں نے ۱۰۰۰ کے مسلح لشکر کو شکست فاش دی۔ فتح کے فوراً بعد مالِ غنیمت کی تقسیم پر نوجوان مجاہدین کے مابین اختلاف رائے پیدا ہو گیا کہ کس کا حق زیادہ ہے۔',
    divineResponseEn:
      'Surah Al-Anfal descended immediately, opening with a decisive rebuke: "The spoils belong entirely to Allah and the Messenger!" It reminded them that angels fought by their side and victory was purely divine grace.',
    divineResponseUr:
      'سورۂ انفال نے پہلی ہی آیت میں تمام انسانی دعووں کو ختم کیا: "پوچھتے ہیں انفال کس کی ہے؟ کہہ دو کہ انفال اللہ اور اس کے رسول کی ہے"۔ اور یاد دلایا کہ فتح تلواروں سے نہیں فرشتوں کی نصرت اور توکل سے حاصل ہوئی۔',
    pedagogicalWisdomEn:
      'Material spoils must never taint sacred struggle. The fruits of victory belong to the collective welfare of the community and the divine mission, not individual greed.',
    pedagogicalWisdomUr:
      'جہاد اور قربانی کو مال و دولت کی لالچ سے پاک رکھنا لازمی ہے۔ فتح کی تمام تر غنیمت اجتماعی فلاح اور الٰہی مشن کی امانت ہے۔',
    scripture: {
      surahNumber: 8,
      surahNameArabic: 'الأنفال',
      surahNameUrdu: 'الانفال',
      surahNameEnglish: 'Al-Anfal',
      ayahNumber: 1,
      ayahRangeText: '8:1',
      arabicText: 'يَسْأَلُونَكَ عَنِ الْأَنفَالِ ۖ قُلِ الْأَنفَالُ لِلَّهِ وَالرَّسُولِ ۖ فَاتَّقُوا اللَّهَ وَأَصْلِحُوا ذَاتَ بَيْنِكُمْ ۖ وَأَطِيعُوا اللَّهَ وَرَسُولَهُ إِن كُنتُم مُّؤْمِنِينَ',
      urduTranslation: 'وہ آپ سے غنائم کے بارے میں سوال کرتے ہیں، کہہ دیجیے کہ غنائم اللہ اور رسول کے ہیں، پس اللہ سے ڈرو اور باہمی تعلقات درست رکھو اور اللہ اور اس کے رسول کی اطاعت کرو اگر تم مومن ہو۔',
      englishTranslation: 'They ask you about the bounties. Say, "The bounties belong to Allah and the Messenger. So fear Allah, adjust all matters of difference among you, and obey Allah and His Messenger if you are believers."',
      audioVerseKey: '8:1',
    },
    chronologicalRank: 88,
    linkedPassageStepIndex: 9,
  },
  {
    id: 'crisis-uhud-trauma',
    orderNumber: 5,
    titleEn: 'Uhud Trauma, False Rumor & Spiritual Healing',
    titleUr: 'صدمۂ احد: شکست، شہادتِ حمزہؑ اور افواہِ شہادتِ رسول ﷺ',
    category: 'battlefield_shock',
    yearCE: 625,
    yearHijriOrNabawi: 'Shawwal, 3 AH',
    periodId: 'early_medinan',
    locationEn: 'Mount Uhud, Madinah',
    locationUr: 'جبلِ احد، مدینہ منورہ',
    keyFiguresEn: ['Prophet Muhammad (ﷺ)', 'Imam Ali (ع)', 'Hamza (Master of Martyrs)', 'Mus\'ab ibn Umayr (Martyred)'],
    keyFiguresUr: ['رسول اللہ ﷺ', 'امیر المومنین علیؑ', 'سید الشہداء حضرت حمزہؑ', 'مصعب بن عمیرؑ'],
    crisisTriggerEn:
      'Archer disobedience turned victory into catastrophic ambush. 70 companions were martyred, Hamza\'s body was mutilated, the Prophet was wounded, and a false shout echoed: "Muhammad has been killed!" Many fled in panic.',
    crisisTriggerUr:
      'تیر اندازوں کے مورچہ چھوڑنے سے فتح شکست میں بدل گئی۔ ۷۰ صحابہ شہید ہوئے، حضرت حمزہؑ کا مثلہ کیا گیا، رسول اللہ ﷺ زخمی ہوئے، اور میدان میں ندا گونجی کہ "محمد قتل کر دیے گئے!"۔ لشکر میں بھگدڑ مچ گئی۔',
    divineResponseEn:
      'Surah Ali \'Imran (3:139–175) descended as an intensive 60-verse post-mortem, counseling that Muhammad is only a messenger who may die or be slain, but the faith in the Eternal Lord can never falter.',
    divineResponseUr:
      'سورۂ آلِ عمران کی ساٹھ آیات نے اس نفسیاتی صدمے کا علاج کیا: "اور محمد تو فقط ایک رسول ہیں، ان سے پہلے بھی بہت سے رسول گزر چکے ہیں، تو کیا اگر وہ وفات پا جائیں یا قتل کر دیے جائیں تو تم الٹے پاؤں پھر جاؤ گے؟"',
    pedagogicalWisdomEn:
      'Islam is tethered to the Eternal God, not the physical presence of any personality. Defeat is a mirror for internal purification, exposing undisciplined attachment to worldly gain.',
    pedagogicalWisdomUr:
      'دین کسی شخصیت کی حیات کا محتاج نہیں بلکہ حیّ و لا یموت اللہ کا دین ہے۔ شکست اندرونی اصلاح، کھوٹ کو دور کرنے اور وفاداری کی پرکھ کا ذریعہ ہے۔',
    scripture: {
      surahNumber: 3,
      surahNameArabic: 'آل عمران',
      surahNameUrdu: 'آلِ عمران',
      surahNameEnglish: 'Ali \'Imran',
      ayahNumber: 144,
      ayahRangeText: '3:144',
      arabicText: 'وَمَا مُحَمَّدٌ إِلَّا رَسُولٌ قَدْ خَلَتْ مِن قَبْلِهِ الرُّسُلُ ۚ أَفَإِن مَّاتَ أَوْ قُتِلَ انقَلَبْتُمْ عَلَىٰ أَعْقَابِكُمْ ۚ وَمَن يَنقَلِبْ عَلَىٰ عَقِبَيْهِ فَلَن يَضُرَّ اللَّهَ شَيْئًا ۗ وَسَيَجْزِي اللَّهُ الشَّاكِرِينَ',
      urduTranslation: 'اور محمد تو صرف ایک رسول ہیں، ان سے پہلے بھی بہت سے رسول گزر چکے ہیں، تو کیا اگر ان کا انتقال ہو جائے یا وہ قتل کر دیے جائیں تو تم الٹے پاؤں پھر جاؤ گے؟ اور جو الٹے پاؤں پھرے گا وہ اللہ کا کچھ نہیں بگاڑے گا، اور اللہ شکر گزاروں کو جزا دے گا۔',
      englishTranslation: 'Muhammad is not but a messenger. Messengers have passed away before him. If he was to die or be killed, would you turn back on your heels? And whoever turns back on his heels will never harm Allah at all, and Allah will reward the grateful.',
      audioVerseKey: '3:144',
    },
    chronologicalRank: 89,
    linkedPassageStepIndex: 12,
  },
  {
    id: 'crisis-ifk-slander',
    orderNumber: 6,
    titleEn: 'The Slander Crisis & Constitutional Protection of Dignity',
    titleUr: 'واقعۂ افک اور ناموس و عفت کا آئینی تحفظ',
    category: 'social_crisis_slander',
    yearCE: 627,
    yearHijriOrNabawi: 'Sha\'ban, 5 AH',
    periodId: 'early_medinan',
    locationEn: 'Madinah al-Munawwarah',
    locationUr: 'مدینہ منورہ',
    keyFiguresEn: ['Abdullah ibn Ubayy (Chief Hypocrite)', 'Prophet Muhammad (ﷺ)', 'Believing Women'],
    keyFiguresUr: ['عبد اللہ بن ابی (رئیس المنافقین)', 'رسولِ اکرم ﷺ', 'مسلمان خواتین'],
    crisisTriggerEn:
      'Hypocrites weaponized a manufactured rumor to tear the social fabric of the nascent Medinan state apart by slandering the sanctity of the household. Medinan society was polarized by whispering campaigns.',
    crisisTriggerUr:
      'منافقین نے مدینہ کے معاشرے میں زہر گھولنے کے لیے گھناؤنی افواہیں اڑائیں تاکہ مسلمانوں کے وقار اور گھریلو تقدس پر کاری ضرب لگائیں۔ پورا شہر افواہوں کی لپیٹ میں آ گیا۔',
    divineResponseEn:
      'Surah An-Nur descended like an iron constitutional shield, legislating the severe penalty of 80 lashes for unsubstantiated slander (Qadhf), demanding 4 eyewitnesses, and setting timeless laws of social privacy and verification.',
    divineResponseUr:
      'سورۂ نور نے ناموس پر حملہ کرنے والوں پر بجلی گرائی: جھوٹے الزام تراشوں پر ۸۰ کوڑوں کی حد نافذ کی، چار عینی گواہوں کی سخت ترین شرط رکھی اور بغیر تحقیق بات پھیلانے کو عظیم گناہ قرار دیا۔',
    pedagogicalWisdomEn:
      'Free speech does not permit the assassination of human dignity. A healthy civilization must punish malicious character defamation to preserve community cohesion.',
    pedagogicalWisdomUr:
      'معاشرتی امن کا انحصار ہر فرد کی عزت و ناموس کے تحفظ پر ہے۔ بدگمانی اور جھوٹی افواہوں کو پھیلانا معاشرتی خودکشی کے مترادف ہے۔',
    scripture: {
      surahNumber: 24,
      surahNameArabic: 'النور',
      surahNameUrdu: 'النور',
      surahNameEnglish: 'An-Nur',
      ayahNumber: 15,
      ayahRangeText: '24:15',
      arabicText: 'إِذْ تَلَقَّوْنَهُ بِأَلْسِنَتِكُمْ وَتَقُولُونَ بِأَفْوَاهِكُم مَّا لَيْسَ لَكُم بِهِ عِلْمٌ وَتَحْسَبُونَهُ هَيِّنًا وَهُوَ عِندَ اللَّهِ عَظِيمٌ',
      urduTranslation: 'جب تم اسے اپنی زبانوں سے ایک دوسرے سے لیتے تھے اور اپنے مونہوں سے وہ بات کہتے تھے جس کا تمہیں کوئی علم نہ تھا، اور تم اسے معمولی بات سمجھتے تھے حالانکہ وہ اللہ کے نزدیک بہت بڑی بات تھی۔',
      englishTranslation: 'When you received it with your tongues and said with your mouths that of which you had no knowledge and thought it was a light matter, while it was, in the sight of Allah, terrible.',
      audioVerseKey: '24:15',
    },
    chronologicalRank: 102,
    linkedPassageStepIndex: 19,
  },
  {
    id: 'crisis-hudaybiyyah-treaty',
    orderNumber: 7,
    titleEn: 'Hudaybiyyah Concessions: "Is this a Manifest Victory?"',
    titleUr: 'صلحِ حدیبیہ: ظاہری پسپائی یا فتحِ مبین؟',
    category: 'diplomatic_treaty',
    yearCE: 628,
    yearHijriOrNabawi: 'Dhu al-Qi\'dah, 6 AH',
    periodId: 'late_medinan',
    locationEn: 'Al-Hudaybiyyah, Outskirts of Makkah',
    locationUr: 'حدیبیہ، مکہ کی سرحد',
    keyFiguresEn: ['Prophet Muhammad (ﷺ)', 'Suhayl ibn Amr', 'Imam Ali (Scribe of Treaty)', '1,400 Companions of Ridwan'],
    keyFiguresUr: ['رسول اللہ ﷺ', 'سہیل بن عمرو', 'امیر المومنین علیؑ (کاتبِ صلح)', '۱۴۰۰ بیعتِ رضوان والے'],
    crisisTriggerEn:
      'Quraysh blocked 1,400 pilgrims in Ihram from visiting the Ka\'bah. In the treaty, the Prophet agreed to seemingly one-sided terms (returning Meccan fugitives, erasing "Messenger of Allah" from treaty heading), sparking immense bewilderment among some companions.',
    crisisTriggerUr:
      'قریش نے مکہ کی سرحد پر ۱۴۰۰ احرام پوش مسلمانوں کو روک دیا۔ رسول اللہ ﷺ نے صلح کے لیے سخت اور ظاہری طور پر کڑی شرائط تسلیم کیں اور تحریر سے "رسول اللہ" مٹانے کا حکم دیا۔ بعض صحابہ سخت شک اور اضطراب میں مبتلا ہو گئے۔',
    divineResponseEn:
      'On the return journey, Surah Al-Fath descended in golden reassurance: "Indeed, We have granted you a manifest victory!" It validated divine diplomacy and rewarded the steadfastness under the tree with inner tranquility (Sakinah).',
    divineResponseUr:
      'واپسی کے سفر میں سورۂ فتح نازل ہوئی: "بے شک ہم نے آپ کو کھلم کھلا فتح عطا فرمائی"۔ وحی نے واضح کیا کہ امن کے معاہدے سے دعوت کے دروازے کھلے اور دو سال میں اتنے لوگ مسلمان ہوئے جتنے گزشتہ اٹھارہ سال میں نہیں ہوئے تھے۔',
    pedagogicalWisdomEn:
      'True victory is ideological expansion, peace, and mutual recognition, not merely sword clashes. Prophetic vision looks beyond immediate emotional pride to long-term civilizational triumph.',
    pedagogicalWisdomUr:
      'فتح صرف جنگ اور خونریزی کا نام نہیں، اصل فتح امن اور افکار کی اشاعت ہے۔ وقتی انا پر عقل اور مصالحِ عالیہ کو ترجیح دینا نبوی حکمتِ عملی ہے۔',
    scripture: {
      surahNumber: 48,
      surahNameArabic: 'الفتح',
      surahNameUrdu: 'الفتح',
      surahNameEnglish: 'Al-Fath',
      ayahNumber: 1,
      ayahRangeText: '48:1–3',
      arabicText: 'إِنَّا فَتَحْنَا لَكَ فَتْحًا مُّبِينًا ۝ لِّيَغْفِرَ لَكَ اللَّهُ مَا تَقَدَّمَ مِن ذَنبِكَ وَمَا تَأَخَّرَ وَيُتِمَّ نِعْمَتَهُ عَلَيْكَ وَيَهْدِيَكَ صِرَاطًا مُّسْتَقِيمًا ۝ وَيَنصُرَكَ اللَّهُ نَصْرًا عَزِيزًا',
      urduTranslation: 'بے شک ہم نے آپ کو واضح فتح عطا فرمائی، تاکہ اللہ آپ کے اگلے اور پچھلے گناہ معاف فرما دے اور اپنی نعمت آپ پر تمام کرے اور آپ کو سیدھے راستے پر چلائے، اور اللہ آپ کو زبردست مدد عطا کرے۔',
      englishTranslation: 'Indeed, We have given you a clear conquest, that Allah may forgive for you what preceded of your sin and what will follow and complete His favor upon you and guide you to a straight path and that Allah may aid you with a mighty victory.',
      audioVerseKey: '48:1',
    },
    chronologicalRank: 111,
    linkedPassageStepIndex: 21,
  },
  {
    id: 'crisis-mubahalah-najran',
    orderNumber: 8,
    titleEn: 'The Christian Delegation of Najran & Event of Mubahalah',
    titleUr: 'عیسائیانِ نجران کا علمی مناظرہ اور واقعۂ مباہلہ',
    category: 'diplomatic_treaty',
    yearCE: 631,
    yearHijriOrNabawi: '24 Dhu al-Hijjah, 9 AH',
    periodId: 'late_medinan',
    locationEn: 'Madinah al-Munawwarah',
    locationUr: 'مدینہ منورہ',
    keyFiguresEn: ['Prophet Muhammad (ﷺ)', 'Imam Ali (ع)', 'Lady Fatimah (ع)', 'Imam Hasan (ع)', 'Imam Husayn (ع)', 'Bishop Abu Harithah'],
    keyFiguresUr: ['رسول اللہ ﷺ', 'حضرت علیؑ', 'حضرت فاطمہؑ', 'امام حسنؑ', 'امام حسینؑ', 'اسقف ابو حارثہ نجرانی'],
    crisisTriggerEn:
      'A scholarly delegation of 60 Christian bishops and dignitaries from Najran engaged in intense Christological debate in the Prophet\'s Mosque, insisting on Jesus being the Son of God despite rational proofs of his miraculous creation like Adam.',
    crisisTriggerUr:
      'نجران سے ۶۰ رکنی عیسائی پادریوں اور دانشوروں کا وفد مدینہ آیا اور مسجدِ نبوی میں حضرت عیسیٰؑ کی الوہیت پر طویل بحث کی۔ حضرت عیسیٰ کی پیدائش کو حضرت آدمؑ کی پیدائش کی مانند بتانے کے باوجود وہ ہٹ دھرمی پر قائم رہے۔',
    divineResponseEn:
      'Ayat al-Mubahalah (3:61) descended, instructing the Prophet to issue an ultimatum of mutual invocation of God\'s curse upon the liars, bringing forth his sons (Hasan & Husayn), his women (Fatimah), and his own soul/self (Ali). Seeing these sacred faces, the Christians withdrew and accepted a peace tribute.',
    divineResponseUr:
      'آیتِ مباہلہ نازل ہوئی جس میں جھوٹوں پر لعنت کا چیلنج دیا گیا اور رسول اللہ ﷺ نے اپنے ساتھ امام حسنؑ، امام حسینؑ، سیدہ فاطمہؑ اور اپنے نفس کے طور پر حضرت علیؑ کو پیش کیا۔ ان پاک ہستیوں کے جلال کو دیکھ کر عیسائی مباہلہ سے دستبردار ہو گئے۔',
    pedagogicalWisdomEn:
      'Truth is backed by total readiness for divine accountability. The Ahl al-Bayt were introduced to history as the living criteria of truthfulness, purity, and spiritual sanctity.',
    pedagogicalWisdomUr:
      'حق پر کامل یقین کا مظاہرہ مباہلہ ہے۔ پنجتن پاکؑ کو انسانیت کے سامنے حق اور باطل کے قطعی اور حتمی معیار کے طور پر متعارف کرایا گیا۔',
    scripture: {
      surahNumber: 3,
      surahNameArabic: 'آل عمران',
      surahNameUrdu: 'آلِ عمران',
      surahNameEnglish: 'Ali \'Imran',
      ayahNumber: 61,
      ayahRangeText: '3:61',
      arabicText: 'فَمَنْ حَاجَّكَ فِيهِ مِن بَعْدِ مَا جَاءَكَ مِنَ الْعِلْمِ فَقُلْ تَعَالَوْا نَدْعُ أَبْنَاءَنَا وَأَبْنَاءَكُمْ وَنِسَاءَنَا وَنِسَاءَكُمْ وَأَنفُسَنَا وَأَنفُسَكُمْ ثُمَّ نَبْتَهِلْ فَنَجْعَل لَّعْنَتَ اللَّهِ عَلَى الْكَاذِبِينَ',
      urduTranslation: 'پھر جو کوئی آپ سے اس (علم) کے آ جانے کے بعد عیسیٰ کے بارے میں بحث کرے، تو کہہ دیجیے کہ آؤ ہم اپنے بیٹوں کو اور تمہارے بیٹوں کو، اپنی عورتوں کو اور تمہاری عورتوں کو، اور اپنے نفوس کو اور تمہارے نفوس کو بلائیں، پھر گڑگڑا کر دعا کریں اور جھوٹوں پر اللہ کی لعنت بھیجیں۔',
      englishTranslation: 'Then whoever argues with you about it after the knowledge that has come to you, say, "Come, let us call our sons and your sons, our women and your women, ourselves and yourselves, then pray humbly and invoke the curse of Allah upon the liars."',
      audioVerseKey: '3:61',
    },
    chronologicalRank: 89,
    linkedPassageStepIndex: 30,
  },
  {
    id: 'crisis-ghadir-khumm',
    orderNumber: 9,
    titleEn: 'Ghadir Khumm Ultimatum & The Completion of Religion',
    titleUr: 'غدیرِ خم: حکمِ تبلیغ اور دین کی حتمی تکمیل',
    category: 'covenant_completion',
    yearCE: 632,
    yearHijriOrNabawi: '18 Dhu al-Hijjah, 10 AH',
    periodId: 'late_medinan',
    locationEn: 'Ghadir Khumm, Between Makkah & Madinah',
    locationUr: 'غدیرِ خم، جحفہ کے قریب',
    keyFiguresEn: ['Prophet Muhammad (ﷺ)', 'Imam Ali ibn Abi Talib (ع)', 'Over 100,000 Pilgrims'],
    keyFiguresUr: ['رسولِ خدا ﷺ', 'امیر المومنین علی ابن ابی طالبؑ', 'ایک لاکھ سے زائد حجاج'],
    crisisTriggerEn:
      'Returning from the Farewell Pilgrimage, at the scorching crossroads of Juhfah where pilgrims would disperse, the Prophet was divinely commanded to halt immediately under the severe warning that withholding this declaration equals not delivering the message at all.',
    crisisTriggerUr:
      'حجۃ الوداع سے واپسی پر جحفہ کے تپتے ہوئے صحرا میں، جہاں سے تمام راستے الگ ہوتے تھے، قافلوں کو روکا گیا۔ سخت ترین تنبیہ کے ساتھ حکم آیا کہ اگر یہ بات نہ پہنچائی تو گویا رسالت کا کوئی کام انجام ہی نہیں دیا۔',
    divineResponseEn:
      'Ayat al-Tabligh (5:67) descended commanding the public proclamation of Ali\'s Wilayah. Following the raised hand and proclamation ("Man kuntu mawlahu fa Ali mawlahu"), Ayat al-Ikmal (5:3) descended: "Today I have perfected for you your religion and completed My favor upon you."',
    divineResponseUr:
      'آیتِ تبلیغ (۵:۶۷) نازل ہوئی۔ منبر پر رسول اللہ ﷺ نے حضرت علیؑ کا ہاتھ بلند کر کے اعلان کیا: "جس کا میں مولا ہوں اس کے علی مولا ہیں"۔ اس کے فوراً بعد آیتِ اکمال (۵:۳) نازل ہوئی کہ آج دین مکمل ہوا اور نعمت تمام ہوئی۔',
    pedagogicalWisdomEn:
      'The 23-year prophetic mission does not conclude with an institutional power vacuum. Divine leadership (Imamah) is the essential safeguard that preserves the scripture from sectarian drift.',
    pedagogicalWisdomUr:
      '۲۳ سالہ وحی کا اختتام خلا اور غیر یقینی پر نہیں ہوا۔ دین کی بقا اور قرآن کی تحریف سے حفاظت کے لیے عادلانہ الٰہی امامت کا اعلان ہی اکمالِ دین کی آخری مہر ہے۔',
    scripture: {
      surahNumber: 5,
      surahNameArabic: 'المائدة',
      surahNameUrdu: 'المائدہ',
      surahNameEnglish: 'Al-Ma\'idah',
      ayahNumber: 67,
      ayahRangeText: '5:67',
      arabicText: 'يَا أَيُّهَا الرَّسُولُ بَلِّغْ مَا أُنزِلَ إِلَيْكَ مِن رَّبِّكَ ۖ وَإِن لَّمْ تَفْعَلْ فَمَا بَلَّغْتَ رِسَالَتَهُ ۚ وَاللَّهُ يَعْصِمُكَ مِنَ النَّاسِ ۗ إِنَّ اللَّهَ لَا يَهْدِي الْقَوْمَ الْكَافِرِينَ',
      urduTranslation: 'اے رسول! جو کچھ آپ کے پروردگار کی طرف سے آپ پر نازل کیا گیا ہے اسے پہنچا دیجیے، اور اگر آپ نے ایسا نہ کیا تو آپ نے اس کی رسالت کا کوئی کام انجام نہیں دیا، اور اللہ آپ کو لوگوں کے شر سے بچائے گا۔',
      englishTranslation: 'O Messenger, announce that which has been revealed to you from your Lord, and if you do not, then you have not conveyed His message. And Allah will protect you from the people. Indeed, Allah does not guide the disbelieving people.',
      audioVerseKey: '5:67',
    },
    chronologicalRank: 112,
    linkedPassageStepIndex: 35,
  },
];
