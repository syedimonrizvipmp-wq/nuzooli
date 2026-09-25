export interface LegislationStage {
  stageNumber: number;
  yearCE: number;
  yearNabawiOrHijri: string;
  era: 'Meccan' | 'Medinan';
  surahNumber: number;
  surahNameEnglish: string;
  surahNameArabic: string;
  surahNameUrdu: string;
  ayahNumber: number;
  timeGapFromPrevious?: string;
  stageTitleUrdu: string;
  stageTitleEnglish: string;
  pedagogicalRationaleUrdu: string;
  pedagogicalRationaleEnglish: string;
  verseArabic: string;
  verseUrdu: string;
  verseEnglish: string;
  passageStepNumber: number;
  eventOrder: number;
}

export interface LegislationPathway {
  id: string;
  titleUrdu: string;
  titleEnglish: string;
  subtitleUrdu: string;
  subtitleEnglish: string;
  totalStages: number;
  totalYearsSpan: string;
  coreWisdomUrdu: string;
  coreWisdomEnglish: string;
  stages: LegislationStage[];
}

export const GRADUAL_LEGISLATION_PATHWAYS: LegislationPathway[] = [
  {
    id: 'intoxicants',
    titleUrdu: 'تحریمِ شراب کے ۴ تدریجی مراحل',
    titleEnglish: 'The 4 Stages of Alcohol Prohibition',
    subtitleUrdu: 'معاشرتی نفسیات اور انسانی ارادے کی بتدریج تطہیر کا الٰہی معجزہ',
    subtitleEnglish: 'A divine masterclass in psychological pedagogy and spiritual transformation over 15 years.',
    totalStages: 4,
    totalYearsSpan: '۱۵ سال کا بتدریج سفر (615 CE تا 628 CE)',
    coreWisdomUrdu:
      'زمانہ جاہلیت میں شراب عرب معاشرے کی رگ و پے میں بسی ہوئی تھی۔ اگر قرآن پہلے ہی دن اسے یک لخت حرام کر دیتا تو کوئی قبول نہ کرتا۔ چنانچہ اللہ تعالیٰ نے پہلے شعور بیدار کیا، پھر نفع و نقصان کا موازنہ کرایا، پھر اوقاتِ نماز میں روکا، اور آخر میں مکمل طور پر حرام فرما دیا۔',
    coreWisdomEnglish:
      'Alcohol was deeply woven into the pre-Islamic Arabian psyche. Had it been banned overnight, society would have rejected it. Divine wisdom first awakened conscience, weighed harm versus gain, restricted it around prayers, and finally instituted total prohibition.',
    stages: [
      {
        stageNumber: 1,
        yearCE: 615,
        yearNabawiOrHijri: '۵ نبوی (مکہ مکرمہ)',
        era: 'Meccan',
        surahNumber: 16,
        surahNameArabic: 'النحل',
        surahNameEnglish: 'An-Nahl',
        surahNameUrdu: 'النحل',
        ayahNumber: 67,
        stageTitleUrdu: 'مرحلہ ۱: نشے اور پاک رزق کے درمیان لطیف فرق',
        stageTitleEnglish: 'Stage 1: Subtle Distinction Between Intoxication and Wholesome Sustenance',
        pedagogicalRationaleUrdu:
          'قرآن نے کھجور اور انگور کی پیداوار کا ذکر کرتے ہوئے "نشہ" اور "پاکیزہ رزق" کو دو الگ چیزیں قرار دیا، جس سے اہلِ دانش کے دلوں میں پہلا سوال پیدا ہوا کہ نشہ پاک رزق کا حصہ نہیں۔',
        pedagogicalRationaleEnglish:
          'The verse subtly contrasted "intoxicant" with "good wholesome provision," implanting the first seed of discernment that intoxication is not pure sustenance.',
        verseArabic: 'وَمِن ثَمَرَاتِ النَّخِيلِ وَالْأَعْنَابِ تَتَّخِذُونَ مِنْهُ سَكَرًا وَرِزْقًا حَسَنًا ۗ إِنَّ فِي ذَٰلِكَ لَآيَةً لِّقَوْمٍ يَعْقِلُونَ',
        verseUrdu: 'اور کھجور اور انگور کے پھلوں سے تم نشہ آور چیز بھی بنا لیتے ہو اور پاکیزہ رزق بھی۔ بے شک اس میں عقل رکھنے والوں کے لیے بڑی نشانی ہے۔',
        verseEnglish: 'And from the fruits of the palm trees and grapevines you take intoxicant and good provision. Indeed in that is a sign for a people who reason.',
        passageStepNumber: 15,
        eventOrder: 70,
      },
      {
        stageNumber: 2,
        yearCE: 624,
        yearNabawiOrHijri: '۲ ہجری (مدینہ منورہ)',
        era: 'Medinan',
        surahNumber: 2,
        surahNameArabic: 'البقرة',
        surahNameEnglish: 'Al-Baqarah',
        surahNameUrdu: 'البقرہ',
        ayahNumber: 219,
        timeGapFromPrevious: '۹ سال بعد',
        stageTitleUrdu: 'مرحلہ ۲: گناہ اور فائدے کا علمی موازنہ',
        stageTitleEnglish: 'Stage 2: Weighing Spiritual Harm vs Material Profit',
        pedagogicalRationaleUrdu:
          'صحابہ نے رسول اللہ ﷺ سے شراب اور جوئے کے بارے میں پوچھا۔ قرآن نے تجارتی فائدے کا انکار نہیں کیا مگر اعلان کیا کہ اس کا گناہ اور اخلاقی بربادی اس کے نفع سے کہیں زیادہ ہے۔',
        pedagogicalRationaleEnglish:
          'In response to companion inquiries, the Quran acknowledged commercial profit but declared that its spiritual sin and societal harm far outweighed any benefit.',
        verseArabic: 'يَسْأَلُونَكَ عَنِ الْخَمْرِ وَالْمَيْسِرِ ۖ قُلْ فِيهِمَا إِثْمٌ كَبِيرٌ وَمَنَافِعُ لِلنَّاسِ وَإِثْمُهُمَا أَكْبَرُ مِن نَّفْعِهِمَا',
        verseUrdu: 'لوگ آپ سے شراب اور جوئے کے بارے میں دریافت کرتے ہیں؛ کہہ دیجیے کہ ان دونوں میں بڑا گناہ ہے اور لوگوں کے لیے کچھ فائدے بھی ہیں، مگر ان کا گناہ ان کے فائدے سے کہیں بڑا ہے۔',
        verseEnglish: 'They ask you about wine and gambling. Say: "In them is great sin and yet some benefit for people, but their sin is greater than their benefit."',
        passageStepNumber: 28,
        eventOrder: 87,
      },
      {
        stageNumber: 3,
        yearCE: 625,
        yearNabawiOrHijri: '۴ ہجری (مدینہ منورہ)',
        era: 'Medinan',
        surahNumber: 4,
        surahNameArabic: 'النساء',
        surahNameEnglish: 'An-Nisa',
        surahNameUrdu: 'النساء',
        ayahNumber: 43,
        timeGapFromPrevious: '۲ سال بعد',
        stageTitleUrdu: 'مرحلہ ۳: اوقاتِ نماز میں نشے کی حالت پر پابندی',
        stageTitleEnglish: 'Stage 3: Prohibition of Approaching Prayer While Intoxicated',
        pedagogicalRationaleUrdu:
          'ایک صحابی نے نشے کی حالت میں نماز میں قرأت غلط کر دی، جس پر حکم آیا کہ نشے کی حالت میں نماز کے قریب نہ جاؤ تاکہ تمہیں معلوم ہو کہ تم کیا کہہ رہے ہو۔ چونکہ پانچ وقت نماز فرض تھی، اس لیے دن بھر پینا عملی طور پر ناممکن ہو گیا۔',
        pedagogicalRationaleEnglish:
          'When an intoxicated person erred in prayer recitation, approaching prayer intoxicated was banned. Because prayers occurred five times throughout the day, daytime drinking became practically impossible.',
        verseArabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا لَا تَقْرَبُوا الصَّلَاةَ وَأَنتُمْ سُكَارَىٰ حَتَّىٰ تَعْلَمُوا مَا تَقُولُونَ',
        verseUrdu: 'اے ایمان والو! نشے کی حالت میں نماز کے قریب نہ جاؤ یہاں تک کہ تم سمجھنے لگو کہ تم کیا کہہ رہے ہو۔',
        verseEnglish: 'O you who have believed, do not approach prayer while you are intoxicated until you know what you are saying.',
        passageStepNumber: 30,
        eventOrder: 92,
      },
      {
        stageNumber: 4,
        yearCE: 628,
        yearNabawiOrHijri: '۶ ہجری (صلح حدیبیہ کے بعد)',
        era: 'Medinan',
        surahNumber: 5,
        surahNameArabic: 'المائدة',
        surahNameEnglish: "Al-Ma'idah",
        surahNameUrdu: 'المائدہ',
        ayahNumber: 90,
        timeGapFromPrevious: '۲ سال بعد (حتمی مرحلہ)',
        stageTitleUrdu: 'مرحلہ ۴: قطعی، دائمی اور غیر مشروط حرمت',
        stageTitleEnglish: 'Stage 4: Absolute, Categorical, and Permanent Prohibition',
        pedagogicalRationaleUrdu:
          'جب قلوب پوری طرح تیار ہو گئے تو اللہ نے اسے "رجس" (پلید) اور شیطانی عمل قرار دے کر قطعی ممانعت فرمائی۔ صحابہ نے یہ سنتے ہی مدینہ کی گلیوں میں شراب کے تمام مٹکے توڑ کر بہا دیے۔',
        pedagogicalRationaleEnglish:
          'With societal readiness fully primed, Allah declared wine "an abomination of Satan’s handiwork" and demanded: "Will you not then desist?" Companions shattered all barrels into the streets of Madinah.',
        verseArabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا إِنَّمَا الْخَمْرُ وَالْمَيْسِرُ وَالْأَنصَابُ وَالْأَزْلَامُ رِجْسٌ مِّنْ عَمَلِ الشَّيْطَانِ فَاجْتَنِبُوهُ لَعَلَّكُمْ تُفْلِحُونَ',
        verseUrdu: 'اے ایمان والو! شراب، جوا، بت اور پانسے سب ناپاک شیطانی کام ہیں، لہٰذا ان سے مکمل پرہیز کرو تاکہ تم فلاح پا جاؤ۔',
        verseEnglish: 'O you who have believed, indeed, intoxicants, gambling, stone altars, and divining arrows are but defilement from the work of Satan, so avoid it that you may be successful.',
        passageStepNumber: 36,
        eventOrder: 112,
      },
    ],
  },
  {
    id: 'qiblah',
    titleUrdu: 'تحویلِ قبلہ: بیت المقدس تا کعبہ معظمہ',
    titleEnglish: 'The Shift of the Qiblah (Jerusalem to Makkah)',
    subtitleUrdu: 'توحیدِ ابراہیمی کا احیاء اور امتِ مسلمہ کی خود مختار شناخت',
    subtitleEnglish: 'Reviving the Abrahamic Sanctuary and crystallizing the independent identity of the Ummah.',
    totalStages: 2,
    totalYearsSpan: '۱۴ سال بیت المقدس ──▶ رجب ۲ ہجری کعبہ شریف',
    coreWisdomUrdu:
      'رسول اللہ ﷺ نے مکہ میں ۱۳ سال اور مدینہ میں ۱۶ ماہ بیت المقدس کی طرف رخ کر کے نماز پڑھی۔ یہ مکہ کے مشرکین کی بت پرستی سے بے زاری اور سابقہ انبیاء کی روایت سے وابستگی کا مظہر تھا۔ جب مدینہ میں یہودی علماء نے طعنہ زنی شروع کی تو اللہ نے قبلہ کعبہ کی طرف موڑنے کا تاریخی حکم صادر فرمایا۔',
    coreWisdomEnglish:
      'For 13 years in Mecca and 16 months in Medina, the believers faced Bayt al-Maqdis (Jerusalem). When the Jewish tribes challenged the nascent Muslim identity, Allah turned the direction toward the eternal Ka’bah built by Abraham.',
    stages: [
      {
        stageNumber: 1,
        yearCE: 610,
        yearNabawiOrHijri: '۱۳ ق ھ تا ۲ ہجری (۱۴ سال)',
        era: 'Meccan',
        surahNumber: 2,
        surahNameArabic: 'البقرة',
        surahNameEnglish: 'Al-Baqarah',
        surahNameUrdu: 'البقرہ',
        ayahNumber: 143,
        stageTitleUrdu: 'مرحلہ ۱: بیت المقدس کی طرف رخ اور تسلیم و رضا کا امتحان',
        stageTitleEnglish: 'Stage 1: Facing Bayt al-Maqdis as a Spiritual Test',
        pedagogicalRationaleUrdu:
          'پہلا قبلہ مقرر کرنا اہل عرب کی قبائلی عصبیت کا امتحان تھا تاکہ وہ کعبہ کے بتوں کی محبت سے نکل کر اللہ کے خالص حکم کے تابع ہو جائیں۔',
        pedagogicalRationaleEnglish:
          'Adopting Jerusalem tested the pride of the Arabs, demanding they detach from ancestral tribal pride and submit solely to divine command.',
        verseArabic: 'وَمَا جَعَلْنَا الْقِبْلَةَ الَّتِي كُنتَ عَلَيْهَا إِلَّا لِنَعْلَمَ مَن يَتَّبِعُ الرَّسُولَ مِمَّن يَنقَلِبُ عَلَىٰ عَقِبَيْهِ',
        verseUrdu: 'اور ہم نے وہ قبلہ جس پر آپ پہلے تھے صرف اس لیے مقرر کیا تھا تاکہ ہم جان لیں کہ کون رسول کی پیروی کرتا ہے اور کون الٹے پاؤں پھر جاتا ہے۔',
        verseEnglish: 'And We did not make the qiblah which you used to face except that We might make evident who would follow the Messenger from who would turn back on his heels.',
        passageStepNumber: 28,
        eventOrder: 87,
      },
      {
        stageNumber: 2,
        yearCE: 624,
        yearNabawiOrHijri: '۲ ہجری / رجب و شعبان (مسجدِ قبلتین)',
        era: 'Medinan',
        surahNumber: 2,
        surahNameArabic: 'البقرة',
        surahNameEnglish: 'Al-Baqarah',
        surahNameUrdu: 'البقرہ',
        ayahNumber: 144,
        timeGapFromPrevious: '۱۶ ماہ بعد از ہجرت',
        stageTitleUrdu: 'مرحلہ ۲: کعبہ کی طرف مستقل تحویل کا الٰہی فرمان',
        stageTitleEnglish: 'Stage 2: Permanent Divine Orientation Toward the Ka’bah',
        pedagogicalRationaleUrdu:
          'نمازِ ظہر کے دوران نبی کریم ﷺ نے آسمان کی طرف نگاہ اٹھائی تو وحی اتری: "ہم آپ کے چہرے کا بار بار آسمان کی طرف اٹھنا دیکھ رہے ہیں، پس ہم آپ کو اس قبلہ کی طرف پھیر دیں گے جس سے آپ خوش ہو جائیں۔" آپ ﷺ نے نماز ہی کی حالت میں ۱۸۰ درجے کعبہ کی طرف رخ پھیر لیا۔',
        pedagogicalRationaleEnglish:
          'During the Zuhr prayer in the Mosque of the Two Qiblahs, revelation descended: "Turn your face toward the Sacred Mosque." The Prophet ﷺ turned 180 degrees mid-prayer.',
        verseArabic: 'قَدْ نَرَىٰ تَقَلُّبَ وَجْهِكَ فِي السَّمَاءِ ۖ فَلَنُوَلِّيَنَّكَ قِبْلَةً تَرْضَاهَا ۚ فَوَلِّ وَجْهَكَ شَطْرَ الْمَسْجِدِ الْحَرَامِ',
        verseUrdu: 'ہم آسمان کی طرف آپ کے چہرے کا بار بار پھرنا دیکھ رہے ہیں، سو ہم آپ کو ضرور اس قبلے کی طرف پھیر دیں گے جسے آپ پسند کرتے ہیں؛ پس اپنا رخ مسجدِ حرام کی طرف پھیر لیجیے۔',
        verseEnglish: 'We have certainly seen the turning of your face toward the heaven, and We will surely turn you to a qiblah with which you will be pleased. So turn your face toward al-Masjid al-Haram.',
        passageStepNumber: 28,
        eventOrder: 87,
      },
    ],
  },
  {
    id: 'fasting',
    titleUrdu: 'فرضیتِ روزہ (صوم) کے تدریجی مراحل',
    titleEnglish: 'The Evolutionary Stages of Fasting (Sawm)',
    subtitleUrdu: 'روحانی ضبطِ نفس سے لے کر ماہِ رمضان کی عالمگیر فرضیت تک',
    subtitleEnglish: 'From voluntary spiritual discipline to the universal obligation of the Month of Ramadhan.',
    totalStages: 3,
    totalYearsSpan: 'مکی دور ──▶ ۲ ہجری شعبان',
    coreWisdomUrdu:
      'روزہ جسمانی خواہشات پر روحانی قابو پانے کی سب سے کٹھن عبادت ہے۔ قرآن نے اسے بیک وقت سب پر لازم کرنے کے بجائے پہلے سابقہ امتوں کی سنت کے طور پر متعارف کرایا، پھر فدیہ کا اختیار دیا، اور آخر میں جب استطاعت پیدا ہو گئی تو رمضان کا پورا مہینہ فرض فرما دیا۔',
    coreWisdomEnglish:
      'Fasting is the most rigorous spiritual discipline. Rather than imposing it rigidly from day one, divine pedagogy first framed it as a shared Abrahamic heritage, offered an optional redemption (fidyah), and finally consecrated the entire Month of Ramadan.',
    stages: [
      {
        stageNumber: 1,
        yearCE: 615,
        yearNabawiOrHijri: 'مکی دور',
        era: 'Meccan',
        surahNumber: 2,
        surahNameArabic: 'البقرة',
        surahNameEnglish: 'Al-Baqarah',
        surahNameUrdu: 'البقرہ',
        ayahNumber: 183,
        stageTitleUrdu: 'مرحلہ ۱: سابقہ امتوں کے تسلسل میں تقویٰ کی بنیاد',
        stageTitleEnglish: 'Stage 1: Universal Abrahamic Heritage for God-Consciousness',
        pedagogicalRationaleUrdu:
          'قرآن نے مسلمانوں کے دلوں کو یہ کہہ کر تسلی دی کہ یہ کوئی نیا بوجھ نہیں بلکہ تم سے پہلے تمام انبیاء اور امتوں پر بھی تقویٰ حاصل کرنے کے لیے فرض کیا گیا تھا۔',
        pedagogicalRationaleEnglish:
          'The Quran comforted the community by establishing that fasting was not an unprecedented burden, but the timeless path of all previous prophetic communities.',
        verseArabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا كُتِبَ عَلَيْكُمُ الصِّيَامُ كَمَا كُتِبَ عَلَى الَّذِينَ مِن قَبْلِكُمْ لَعَلَّكُمْ تَتَّقُونَ',
        verseUrdu: 'اے ایمان والو! تم پر روزے فرض کیے گئے ہیں جس طرح تم سے پہلے والوں پر فرض کیے گئے تھے تاکہ تم پرہیزگار بن جاؤ۔',
        verseEnglish: 'O you who have believed, decreed upon you is fasting as it was decreed upon those before you that you may become righteous.',
        passageStepNumber: 28,
        eventOrder: 87,
      },
      {
        stageNumber: 2,
        yearCE: 624,
        yearNabawiOrHijri: '۲ ہجری / شعبان',
        era: 'Medinan',
        surahNumber: 2,
        surahNameArabic: 'البقرة',
        surahNameEnglish: 'Al-Baqarah',
        surahNameUrdu: 'البقرہ',
        ayahNumber: 184,
        stageTitleUrdu: 'مرحلہ ۲: گنتی کے چند دن اور فدیہ کا تدریجی اختیار',
        stageTitleEnglish: 'Stage 2: Numbered Days and the Pedagogical Choice of Fidyah',
        pedagogicalRationaleUrdu:
          'ابتدائی مرحلے میں جو لوگ شدید مشقت محسوس کرتے تھے انہیں روزہ چھوڑ کر ایک مسکین کو کھانا کھلانے (فدیہ) کی اجازت دی گئی تاکہ لوگ عادت ڈال سکیں۔',
        pedagogicalRationaleEnglish:
          'In the transitional phase, those who found fasting unbearable were permitted to feed a needy person as compensation (fidyah) to ease the transition.',
        verseArabic: 'أَيَّامًا مَّعْدُودَاتٍ ۚ فَمَن كَانَ مِنكُم مَّرِيضًا أَوْ عَلَىٰ سَفَرٍ فَعِدَّةٌ مِّنْ أَيَّامٍ أُخَرَ ۚ وَعَلَى الَّذِينَ يُطِيقُونَهُ فِدْيَةٌ طَعَامُ مِسْكِينٍ',
        verseUrdu: 'گنتی کے چند دن؛ پس جو تم میں سے بیمار ہو یا سفر پر ہو تو دوسرے دنوں میں گنتی پوری کرے، اور جو لوگ اس کی طاقت رکھتے ہوں وہ فدیہ دیں جو ایک مسکین کا کھانا ہے۔',
        verseEnglish: 'Fasting is for a limited number of days. So whoever among you is ill or on a journey, then an equal number of other days. And upon those who are able with difficulty, a ransom of feeding a poor person.',
        passageStepNumber: 28,
        eventOrder: 87,
      },
      {
        stageNumber: 3,
        yearCE: 624,
        yearNabawiOrHijri: '۲ ہجری (غزوہ بدر سے قبل)',
        era: 'Medinan',
        surahNumber: 2,
        surahNameArabic: 'البقرة',
        surahNameEnglish: 'Al-Baqarah',
        surahNameUrdu: 'البقرہ',
        ayahNumber: 185,
        stageTitleUrdu: 'مرحلہ ۳: نزولِ قرآن کے اعزاز میں رمضان کی قطعی فرضیت',
        stageTitleEnglish: 'Stage 3: Categorical Obligation of the Whole Month of Ramadan',
        pedagogicalRationaleUrdu:
          'تیسرے مرحلے میں فدیہ کا عام اختیار منسوخ کر کے تمام تندرست افراد پر پورے ماہِ رمضان کا روزہ واجب قرار دیا گیا کیونکہ اسی مہینے میں قرآن کا نزول ہوا تھا۔',
        pedagogicalRationaleEnglish:
          'The optional fidyah was replaced with a universal commandment for all healthy individuals to fast the full Month of Ramadan in celebration of the revelation of the Quran.',
        verseArabic: 'شَهْرُ رَمَضَانَ الَّذِي أُنزِلَ فِيهِ الْقُرْآنُ هُدًى لِّلنَّاسِ وَبَيِّنَاتٍ مِّنَ الْهُدَىٰ وَالْفُرْقَانِ ۚ فَمَن شَهِدَ مِنكُمُ الشَّهْرَ فَلْيَصُمْهُ',
        verseUrdu: 'ماہِ رمضان وہ ہے جس میں قرآن نازل کیا گیا جو لوگوں کے لیے ہدایت ہے اور کھلی نشانیاں ہیں ہدایت اور فرقان کی؛ پس جو شخص اس مہینے کو پائے وہ ضرور اس کے روزے رکھے۔',
        verseEnglish: 'The month of Ramadan in which was revealed the Quran, a guidance for the people and clear proofs of guidance and criterion. So whoever sights the month, let him fast it.',
        passageStepNumber: 28,
        eventOrder: 87,
      },
    ],
  },
  {
    id: 'defense-jihad',
    titleUrdu: 'دفاع، جہاد اور قیامِ امن کا ارتقائی قانون',
    titleEnglish: 'The Evolution of Defense, Just Warfare, and Peace',
    subtitleUrdu: 'مکہ کے ۱۳ سالہ صبرِ مطلق سے لے کر مظلوموں کے دفاعِ مسلح تک',
    subtitleEnglish: 'From 13 years of absolute non-violent perseverance in Mecca to sanctioned self-defense in Medina.',
    totalStages: 3,
    totalYearsSpan: '۱۳ سال صبرِ محض (مکہ) ──▶ ۱ تا ۸ ہجری (مدینہ)',
    coreWisdomUrdu:
      'مکہ میں مسلمانوں پر بدترین مظالم ڈھائے گئے مگر تلوار اٹھانے کی سختی سے ممانعت تھی۔ ہجرت کے بعد جب قریش نے مدینہ پر بھی لشکر کشی کی اور معصوموں کو گھروں سے نکالا، تب اللہ تعالیٰ نے مظلوموں کو اپنے دفاع کی اجازت دی، جس کی بنیادی غرض مساجد، صوامع اور عبادت گاہوں کا تحفظ اور ظلم کا خاتمہ تھا۔',
    coreWisdomEnglish:
      'In Mecca, believers endured torture without retaliation. Only after being violently expelled from their homes and pursued to Medina was armed resistance permitted—specifically to defend religious liberty and protect all houses of worship.',
    stages: [
      {
        stageNumber: 1,
        yearCE: 615,
        yearNabawiOrHijri: 'مکہ مکرمہ (۱۳ سال)',
        era: 'Meccan',
        surahNumber: 16,
        surahNameArabic: 'النحل',
        surahNameEnglish: 'An-Nahl',
        surahNameUrdu: 'النحل',
        ayahNumber: 125,
        stageTitleUrdu: 'مرحلہ ۱: حکمت، موعظۂ حسنہ اور صبرِ جمیل کی دعوت',
        stageTitleEnglish: 'Stage 1: Intellectual Wisdom, Beautiful Counsel, and Absolute Patience',
        pedagogicalRationaleUrdu:
          'مکی دور میں حضور اکرم ﷺ کو حکم تھا کہ حق کی دعوت حکمت اور عمدہ نصیحت سے دیں اور ظلم پر صبر کریں۔ کسی بھی قسم کے مسلح اقدام کی سخت ممانعت تھی۔',
        pedagogicalRationaleEnglish:
          'Throughout the 13 Meccan years, armed resistance was forbidden. The divine instruction was strictly intellectual engagement, exemplary moral conduct, and supreme patience under persecution.',
        verseArabic: 'ادْعُ إِلَىٰ سَبِيلِ رَبِّكَ بِالْحِكْمَةِ وَالْمَوْعِظَةِ الْحَسَنَةِ ۖ وَجَادِلْهُم بِالَّتِي هِيَ أَحْسَنُ',
        verseUrdu: 'اپنے پروردگار کے راستے کی طرف حکمت اور اچھی نصیحت کے ساتھ بلائیے، اور ان کے ساتھ بہترین طریقے سے بحث کیجیے۔',
        verseEnglish: 'Invite to the way of your Lord with wisdom and good instruction, and argue with them in a way that is best.',
        passageStepNumber: 15,
        eventOrder: 70,
      },
      {
        stageNumber: 2,
        yearCE: 623,
        yearNabawiOrHijri: '۱ ہجری (مدینہ منورہ)',
        era: 'Medinan',
        surahNumber: 22,
        surahNameArabic: 'الحج',
        surahNameEnglish: 'Al-Hajj',
        surahNameUrdu: 'الحج',
        ayahNumber: 39,
        timeGapFromPrevious: 'ہجرت کے بعد پہلا حکم',
        stageTitleUrdu: 'مرحلہ ۲: مظلوموں کو دفاعِ خود اختیاری کی پہلی الٰہی اجازت',
        stageTitleEnglish: 'Stage 2: The First Sanction for Self-Defense of the Oppressed',
        pedagogicalRationaleUrdu:
          'قرآن کی تاریخ میں قتال کی پہلی اجازت سورۃ الحج میں نازل ہوئی، جس میں واضح شرط رکھی گئی کہ یہ اجازت صرف ان مظلوموں کے لیے ہے جن پر ظلم کیا گیا اور جنہیں ناحق اپنے گھروں سے نکالا گیا۔',
        pedagogicalRationaleEnglish:
          'The very first permission to take up arms was granted in Surah Al-Hajj, strictly conditioned on self-defense for those who were unjustly evicted from their homes merely for believing in God.',
        verseArabic: 'أُذِنَ لِلَّذِينَ يُقَاتَلُونَ بِأَنَّهُمْ ظُلِمُوا ۚ وَإِنَّ اللَّهَ عَلَىٰ نَصْرِهِمْ لَقَدِيرٌ',
        verseUrdu: 'جن لوگوں پر جنگ مسلط کی گئی ہے انہیں لڑنے کی اجازت دی گئی ہے کیونکہ ان پر ظلم کیا گیا ہے، اور بے شک اللہ ان کی مدد پر پوری طرح قادر ہے۔',
        verseEnglish: 'Permission to fight has been given to those who are being fought, because they were wronged. And indeed, Allah is competent to give them victory.',
        passageStepNumber: 27,
        eventOrder: 103,
      },
      {
        stageNumber: 3,
        yearCE: 624,
        yearNabawiOrHijri: '۲ ہجری (مدینہ منورہ)',
        era: 'Medinan',
        surahNumber: 2,
        surahNameArabic: 'البقرة',
        surahNameEnglish: 'Al-Baqarah',
        surahNameUrdu: 'البقرہ',
        ayahNumber: 190,
        timeGapFromPrevious: 'غزوہ بدر کے بعد',
        stageTitleUrdu: 'مرحلہ ۳: اخلاقی ضوابط اور زیادتی و ظلم سے سخت ممانعت',
        stageTitleEnglish: 'Stage 3: Ethical Boundaries and Prohibition of Aggression',
        pedagogicalRationaleUrdu:
          'قرآن نے جنگ کے سخت ترین اخلاقی حدود مقرر فرمائے: صرف ان سے لڑو جو تم سے لڑتے ہیں، غیر جانبداروں، بچوں، عورتوں اور درختوں کو نقصان نہ پہنچاؤ، اور حد سے نہ بڑھو کیونکہ اللہ زیادتی کرنے والوں کو پسند نہیں کرتا۔',
        pedagogicalRationaleEnglish:
          'Islam instituted ethical warfare laws: fight only those who attack you, do not transgress, spare non-combatants, and immediately accept peace if the enemy inclines to it.',
        verseArabic: 'وَقَاتِلُوا فِي سَبِيلِ اللَّهِ الَّذِينَ يُقَاتِلُونَكُمْ وَلَا تَعْتَدُوا ۚ إِنَّ اللَّهَ لَا يُحِبُّ الْمُعْتَدِينَ',
        verseUrdu: 'اور اللہ کی راہ میں ان لوگوں سے لڑو جو تم سے لڑتے ہیں اور زیادتی نہ کرو، بے شک اللہ زیادتی کرنے والوں کو پسند نہیں کرتا۔',
        verseEnglish: 'Fight in the way of Allah those who fight you but do not transgress. Indeed. Allah does not like transgressors.',
        passageStepNumber: 28,
        eventOrder: 87,
      },
    ],
  },
  {
    id: 'zakat-infaq',
    titleUrdu: 'انفاق، خیرات اور زکوٰۃ کا تدریجی ارتقاء',
    titleEnglish: 'The Evolution of Charity, Infaq, and Institutional Zakat',
    subtitleUrdu: 'اخلاقی ہمدردی کے جذبے سے لے کر ریاستی فلاحی معیشت کے قیام تک',
    subtitleEnglish: 'From voluntary moral empathy to an institutionalized social safety net and economic justice.',
    totalStages: 3,
    totalYearsSpan: 'مکی دور ──▶ ۹ ہجری (مدینہ)',
    coreWisdomUrdu:
      'مکہ میں جب مسلمان شدید غربت اور بائیکاٹ کا شکار تھے، قرآن نے مال کی محبت کے بت کو توڑنے کے لیے یتیموں اور مسکینوں کو کھانا کھلانے کو ایمان کی شرط قرار دیا۔ مدینہ میں جب ریاست بنی تو اسے باقاعدہ فلاحی نظام بنا کر ۸ مستحقین کے لیے زکوٰۃ کا نظام نافذ فرمایا۔',
    coreWisdomEnglish:
      'In Mecca, the Quran dismantled capitalist greed by making empathy for the destitute a core test of faith. In Medina, this moral sentiment was forged into an institutional social welfare system with eight legally designated beneficiary categories.',
    stages: [
      {
        stageNumber: 1,
        yearCE: 613,
        yearNabawiOrHijri: 'مکی دور (ابتدائی نبوی)',
        era: 'Meccan',
        surahNumber: 107,
        surahNameArabic: 'الماعون',
        surahNameEnglish: 'Al-Ma’un',
        surahNameUrdu: 'الماعون',
        ayahNumber: 1,
        stageTitleUrdu: 'مرحلہ ۱: یتیم و مسکین کی مدد کو دین کی پہچان قرار دینا',
        stageTitleEnglish: 'Stage 1: Social Compassion as the Defining Criterion of Faith',
        pedagogicalRationaleUrdu:
          'قرآن نے اعلان کیا کہ جو شخص یتیم کو دھکے دیتا ہے اور مسکین کو کھانا کھلانے کی ترغیب نہیں دیتا، وہ درحقیقت دین کو جھٹلاتا ہے۔ خیرات کو فرضیت سے پہلے بنیادی انسانی اخلاق بنایا گیا۔',
        pedagogicalRationaleEnglish:
          'Before formal taxation, the Quran defined faith itself by social compassion, warning that ignoring orphans and withholding basic neighborly assistance amounts to denying religion.',
        verseArabic: 'أَرَأَيْتَ الَّذِي يُكَذِّبُ بِالدِّينِ ۝ فَذَٰلِكَ الَّذِي يَدُعُّ الْيَتِيمَ ۝ وَلَا يَحُضُّ عَلَىٰ طَعَامِ الْمِسْكِينِ',
        verseUrdu: 'کیا آپ نے اس شخص کو دیکھا جو دین کو جھٹلاتا ہے؟ یہی وہ ہے جو یتیم کو دھکے دیتا ہے، اور مسکین کو کھانا کھلانے کی ترغیب نہیں دیتا۔',
        verseEnglish: 'Have you seen the one who denies the Recompense? That is the one who repulses the orphan and does not encourage the feeding of the poor.',
        passageStepNumber: 4,
        eventOrder: 17,
      },
      {
        stageNumber: 2,
        yearCE: 624,
        yearNabawiOrHijri: '۲ ہجری (مدینہ منورہ)',
        era: 'Medinan',
        surahNumber: 2,
        surahNameArabic: 'البقرة',
        surahNameEnglish: 'Al-Baqarah',
        surahNameUrdu: 'البقرہ',
        ayahNumber: 267,
        timeGapFromPrevious: 'ہجرت کے بعد معاشی تشکیل',
        stageTitleUrdu: 'مرحلہ ۲: اپنی پسندیدہ اور پاکیزہ کمائی سے خرچ کرنے کی ترغیب',
        stageTitleEnglish: 'Stage 2: Spending from Pure, Wholesome Wealth You Cherish',
        pedagogicalRationaleUrdu:
          'مدینہ میں مسلمانوں نے معاشی طور پر مستحکم ہونا شروع کیا تو حکم ہوا کہ اپنی پاکیزہ کمائی اور زمین کی پیداوار میں سے بہترین حصہ راہِ خدا میں خرچ کرو، بیکار چیزیں نہیں۔',
        pedagogicalRationaleEnglish:
          'As the Medinan community flourished economically, believers were commanded to give from the purest fruits of their labor rather than discarding substandard belongings.',
        verseArabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا أَنفِقُوا مِن طَيِّبَاتِ مَا كَسَبْتُمْ وَمِمَّا أَخْرَجْنَا لَكُم مِّنَ الْأَرْضِ',
        verseUrdu: 'اے ایمان والو! اپنی پاکیزہ کمائی میں سے اور اس میں سے جو ہم نے تمہارے لیے زمین سے نکالا ہے خرچ کرو۔',
        verseEnglish: 'O you who have believed, spend from the good things which you have earned and from that which We have produced for you from the earth.',
        passageStepNumber: 28,
        eventOrder: 87,
      },
      {
        stageNumber: 3,
        yearCE: 630,
        yearNabawiOrHijri: '۹ ہجری (مدینہ منورہ)',
        era: 'Medinan',
        surahNumber: 9,
        surahNameArabic: 'التوبة',
        surahNameEnglish: 'At-Tawbah',
        surahNameUrdu: 'التوبہ',
        ayahNumber: 60,
        stageTitleUrdu: 'مرحلہ ۳: زکوٰۃ کے ۸ قانونی مصارف اور ریاست کا فلاحی نظام',
        stageTitleEnglish: 'Stage 3: The 8 Institutional Beneficiaries of State Zakat',
        pedagogicalRationaleUrdu:
          'نبی کریم ﷺ کے وصال سے قبل سورۃ التوبہ میں زکوٰۃ کے ۸ مستقل مصارف مقرر کیے گئے تاکہ ریاست کی دولت کبھی بھی چند امیروں کے ہاتھ میں گردش نہ کرے بلکہ کمزوروں اور مقروضوں تک پہنچے۔',
        pedagogicalRationaleEnglish:
          'In Surah At-Tawbah, Allah codified the 8 precise categories of Zakat recipients (the impoverished, debt-burdened, wayfarers, etc.), institutionalizing a permanent wealth redistribution system.',
        verseArabic: 'إِنَّمَا الصَّدَقَاتُ لِلْفُقَرَاءِ وَالْمَسَاكِينِ وَالْعَامِلِينَ عَلَيْهَا وَالْمُؤَلَّفَةِ قُلُوبُهُمْ وَفِي الرِّقَابِ وَالْغَارِمِينَ وَفِي سَبِيلِ اللَّهِ وَابْنِ السَّبِيلِ ۖ فَرِيضَةً مِّنَ اللَّهِ',
        verseUrdu: 'صدقات تو درحقیقت فقراء، مساکین، زکوٰۃ کے کارکنوں، تالیفِ قلب کے لیے، گردنیں چھڑانے میں، مقروضوں کے لیے، اللہ کی راہ میں اور مسافروں کے لیے ہیں؛ یہ اللہ کا فریضہ ہے۔',
        verseEnglish: 'Zakah expenditures are only for the poor and for the needy and for those employed to collect them and for bringing hearts together and for freeing captives and for those in debt and for the cause of Allah and for the wayfarer—an obligation imposed by Allah.',
        passageStepNumber: 35,
        eventOrder: 113,
      },
    ],
  },
];
