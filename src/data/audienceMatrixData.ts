/**
 * audienceMatrixData.ts
 * ============================================================================
 * Scholarly Dataset for the Divine Interlocutors & Audience Matrix
 * (مخاطبینِ قرآن و اسالیبِ خطاب — The Divine Discourse Matrix)
 *
 * Grounded in:
 * - Al-Tamhid fi Ulum al-Qur'an (التمهيد في علوم القرآن) by Ayatollah Muhammad Hadi Ma'rifat
 * - Tafsir al-Mizan (تفسير الميزان) by Allamah Sayyid Muhammad Husayn Tabataba'i
 * - Majma' al-Bayan (مجمع البيان) by Shaykh Tabarsi
 * ============================================================================
 */

export interface AudienceAyahExample {
  surahNumber: number;
  ayahNumber: number;
  surahNameArabic: string;
  surahNameUrdu: string;
  surahNameEnglish: string;
  nuzulRank: number;
  mushafOrder: number;
  period: 'Early Meccan' | 'Mid Meccan' | 'Late Meccan' | 'Early Medinan' | 'Late Medinan';
  approximateYearCE: number;
  yearLabel: string;
  arabicText: string;
  translationUrdu: string;
  translationEnglish: string;
  scholarlyInsightUrdu: string;
  scholarlyInsightEnglish: string;
}

export interface AudienceGroup {
  id: string;
  titleArabic: string;
  titleUrdu: string;
  titleEnglish: string;
  subtitleUrdu: string;
  subtitleEnglish: string;
  totalOccurrences: string;
  meccanRatio: number; // percentage (0 - 100)
  medinanRatio: number; // percentage (0 - 100)
  primaryPeriodUrdu: string;
  primaryPeriodEnglish: string;
  badgeColor: string;
  iconName: string;
  theologicalRoleUrdu: string;
  theologicalRoleEnglish: string;
  pedagogicalShiftUrdu: string;
  pedagogicalShiftEnglish: string;
  classicalRuleUrdu: string;
  classicalRuleEnglish: string;
  sources: string[];
  examples: AudienceAyahExample[];
}

export const AUDIENCE_GROUPS: AudienceGroup[] = [
  {
    id: 'humanity',
    titleArabic: 'يَا أَيُّهَا النَّاسُ / بَنِي آدَمَ',
    titleUrdu: 'یا ایہا الناس / بنی آدم (عام انسانیت کا خطاب)',
    titleEnglish: 'O Humankind / Children of Adam (Universal Conscience)',
    subtitleUrdu: 'فطرتِ انسانی اور بنیادی اخلاقی شعور کی بیداری',
    subtitleEnglish: 'Awakening Primordial Fitrah, Common Origin & Existential Responsibility',
    totalOccurrences: '۲۰+ مرتبہ (بشمول ۷ مرتبہ بنی آدم)',
    meccanRatio: 85,
    medinanRatio: 15,
    primaryPeriodUrdu: 'مکی دور (۶۱۰ تا ۶۲۲ء) مع مدنی آفاقی احکام',
    primaryPeriodEnglish: 'Primarily Meccan (610–622 CE) with universal Medinan charters',
    badgeColor: '#10B981', // Emerald
    iconName: 'Globe',
    theologicalRoleUrdu:
      'کسی بھی مخصوص شرعی قانون کے نفاذ سے پہلے، قرآن نے پوری انسانیت کو اس کے اصل وجود، خالقِ حقیقی اور باہمی مساوات کا احساس دلایا۔ یہ خطاب ہر انسان کے ضمیر کو بیدار کرتا ہے۔',
    theologicalRoleEnglish:
      'Before instituting specific canonical laws, the divine discourse addressed human beings universally—appealing to innate reason, ontological dependency on the Creator, and moral accountability.',
    pedagogicalShiftUrdu:
      'مکہ میں یہ خطاب توحید اور قیامت کے وجدان کے لیے تھا، جبکہ مدینہ میں (جیسے سورۃ الحجرات) یہ نسل پرستی اور قبائلی تفاخر کو مٹا کر عالمی تقویٰ کا منشور بنا۔',
    pedagogicalShiftEnglish:
      'In Mecca, this address cultivated existential monotheism; in Medina (e.g., Al-Hujurat 49:13), it became a global charter eradicating racism, tribal supremacy, and class vanity.',
    classicalRuleUrdu:
      'علامہ معرفت (التمہید): «جہاں بھی "یا ایہا الناس" کا خطاب ہے وہ عمومی اور فطری امور پر مبنی ہے جو تمام بنی نوع انسان کے فہم اور مشترکہ ضمیر پر محیط ہے۔»',
    classicalRuleEnglish:
      'Ayatollah Ma\'rifat (Al-Tamhid): "Whenever \'O Humankind\' is invoked, it centers on universal, primordial truths accessible to the common moral conscience of every human being."',
    sources: ['التمهيد في علوم القرآن، ج ۱', 'تفسير الميزان، ج ۱ ص ۶۴', 'مجمع البيان، ج ۱'],
    examples: [
      {
        surahNumber: 2,
        ayahNumber: 21,
        surahNameArabic: 'البقرة',
        surahNameUrdu: 'سورۃ البقرۃ',
        surahNameEnglish: 'Al-Baqarah',
        nuzulRank: 87,
        mushafOrder: 2,
        period: 'Early Medinan',
        approximateYearCE: 623,
        yearLabel: '2 AH / 623 CE',
        arabicText: 'يَا أَيُّهَا النَّاسُ اعْبُدُوا رَبَّكُمُ الَّذِي خَلَقَكُمْ وَالَّذِينَ مِن قَبْلِكُمْ لَعَلَّكُمْ تَتَّقُونَ',
        translationUrdu: 'اے لوگو! اپنے اس پروردگار کی بندگی کرو جس نے تمہیں اور تم سے پہلے والوں کو پیدا کیا ہے تاکہ تم پرہیزگار بن جاؤ۔',
        translationEnglish: 'O mankind! Worship your Lord, who created you and those who came before you, that you may attain God-consciousness.',
        scholarlyInsightUrdu:
          'مصحفِ شریف میں پوری انسانیت کو بندگی کی یہ پہلی باضابطہ الٰہی دعوت ہے۔ عبادت کا حق دار وہی ہے جو ذاتِ خالق ہے۔',
        scholarlyInsightEnglish:
          'This is the very first divine invocation to mankind in the canonical Mushaf order, rooting the obligation of worship in the act of universal creation.',
      },
      {
        surahNumber: 4,
        ayahNumber: 1,
        surahNameArabic: 'النساء',
        surahNameUrdu: 'سورۃ النساء',
        surahNameEnglish: 'An-Nisa',
        nuzulRank: 92,
        mushafOrder: 4,
        period: 'Early Medinan',
        approximateYearCE: 626,
        yearLabel: '4 AH / 626 CE',
        arabicText: 'يَا أَيُّهَا النَّاسُ اتَّقُوا رَبَّكُمُ الَّذِي خَلَقَكُم مِّن نَّفْسٍ وَاحِدَةٍ وَخَلَقَ مِنْهَا زَوْجَهَا وَبَثَّ مِنْهُمَا رِجَالًا كَثِيرًا وَنِسَاءً',
        translationUrdu: 'اے لوگو! اپنے پروردگار سے ڈرو جس نے تم سب کو ایک جان سے پیدا کیا اور اسی سے اس کا جوڑا بنایا اور پھر ان دونوں سے کثیر مرد اور عورتیں پھیلا دیں۔',
        translationEnglish: 'O humankind! Be mindful of your Lord, who created you from a single soul, and from it created its mate, and through them dispersed countless men and women.',
        scholarlyInsightUrdu:
          'سورۃ النساء کے آغاز میں انسانیت کی وحدت اور عورت و مرد کے مشترکہ اصل و شرف کا الٰہی اعلان جو صنفی استحصال کی جڑ کاٹتا ہے۔',
        scholarlyInsightEnglish:
          'The opening declaration of Surah An-Nisa establishes the ontological equality of all human beings, affirming that men and women share an identical spiritual origin.',
      },
      {
        surahNumber: 49,
        ayahNumber: 13,
        surahNameArabic: 'الحجرات',
        surahNameUrdu: 'سورۃ الحجرات',
        surahNameEnglish: 'Al-Hujurat',
        nuzulRank: 106,
        mushafOrder: 49,
        period: 'Late Medinan',
        approximateYearCE: 630,
        yearLabel: '9 AH / 630 CE',
        arabicText: 'يَا أَيُّهَا النَّاسُ إِنَّا خَلَقْنَاكُم مِّن ذَكَرٍ وَأُنثَىٰ وَجَعَلْنَاكُمْ شُعُوبًا وَقَبَائِلَ لِتَعَارَفُوا ۚ إِنَّ أَكْرَمَكُمْ عِندَ اللَّهِ أَتْقَاكُمْ',
        translationUrdu: 'اے لوگو! ہم نے تم کو ایک مرد اور ایک عورت سے پیدا کیا اور تمہاری قومیں اور قبیلے بنائے تاکہ تم ایک دوسرے کو پہچانو، بیشک اللہ کے نزدیک تم میں سب سے معزز وہ ہے جو سب سے زیادہ پرہیزگار ہے۔',
        translationEnglish: 'O mankind! Indeed, We created you from a male and a female, and made you into nations and tribes that you may recognize one another. Indeed, the most noble of you in the sight of Allah is the most God-conscious.',
        scholarlyInsightUrdu:
          'عرب و عجم، گورے اور کالے کی تفریق کو یک قلم مسترد کر کے صرف اور صرف تقویٰ کو فضیلت کا معیار قرار دیا گیا۔',
        scholarlyInsightEnglish:
          'The definitive universal manifesto eradicating racism and ethnic superiority, establishing moral excellence (Taqwa) as the sole standard of dignity.',
      },
      {
        surahNumber: 35,
        ayahNumber: 15,
        surahNameArabic: 'فاطر',
        surahNameUrdu: 'سورۃ فاطر',
        surahNameEnglish: 'Fatir',
        nuzulRank: 43,
        mushafOrder: 35,
        period: 'Mid Meccan',
        approximateYearCE: 618,
        yearLabel: '5 BH / 618 CE',
        arabicText: 'يَا أَيُّهَا النَّاسُ أَنتُمُ الْفُقَرَاءُ إِلَى اللَّهِ ۖ وَاللَّهُ هُوَ الْغَنِيُّ الْحَمِيدُ',
        translationUrdu: 'اے انسانو! تم سب کے سب اللہ کے محتاج ہو اور اللہ ہی بے نیاز اور لائقِ حمد و ستائش ہے۔',
        translationEnglish: 'O mankind! You are the ones in absolute need of Allah, while Allah is the Self-Sufficient, the Praiseworthy.',
        scholarlyInsightUrdu:
          'فلسفۂ وجود کا عظیم مکی بیان: کائنات کی ہر مخلوق وجودی طور پر محتاج ہے، جبکہ خود کفیل صرف ذاتِ باری تعالیٰ ہے۔',
        scholarlyInsightEnglish:
          'A foundational ontological verse in Mid-Mecca, depicting the absolute dependency of all created beings against the absolute self-sufficiency of the Divine.',
      },
    ],
  },
  {
    id: 'believers',
    titleArabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا',
    titleUrdu: 'یا ایہا الذین آمنوا (ایمانی برادری و مدنی شریعت)',
    titleEnglish: 'O You Who Believe (Civic Fraternity & Sacred Law)',
    subtitleUrdu: 'عہدِ ایمانی، ریاستی نظام اور اخلاقی و سماجی احکام کی تشکیل',
    subtitleEnglish: 'Covenant of Faith, Social Contracts & Institutional Legislation',
    totalOccurrences: '۸۹ مرتبہ (خالصتاً مدینہ منورہ)',
    meccanRatio: 0,
    medinanRatio: 100,
    primaryPeriodUrdu: 'خالصتاً مدنی دور (۶۲۲ تا ۶۳۲ء)',
    primaryPeriodEnglish: 'Strictly Post-Hijrah Medinan (622–632 CE)',
    badgeColor: '#0284C7', // Sky Blue
    iconName: 'ShieldCheck',
    theologicalRoleUrdu:
      'جب مکہ کی ۱۳ سالہ تربیت میں ایمان دلوں میں راسخ ہو گیا اور ہجرت کے بعد مدینہ میں اسلامی معاشرہ وجود میں آیا، تب اللہ تعالیٰ نے مؤمنین کو پیار اور عزت کے ساتھ ان کے عہد سے پکار کر احکام نافذ کیے۔',
    theologicalRoleEnglish:
      'Once faith was internalized through 13 years of Meccan endurance, the divine discourse summoned the community by their covenant of love and belief to construct a holy society.',
    pedagogicalShiftUrdu:
      'مکہ میں ایک بھی "یا ایہا الذین آمنوا" نہیں اتری۔ تمام ۸۹ آیات ہجرتِ مدینہ کے بعد نازل ہوئیں، جن میں روزہ، جہاد، زکوٰۃ، عدالتی معاہدے اور حقوقِ عامہ وضع ہوئے۔',
    pedagogicalShiftEnglish:
      'There is not a single "O you who believe" in Mecca. All 89 occurrences emerged in Medina, governing fasting, defense, international covenants, economic justice, and social ethics.',
    classicalRuleUrdu:
      'ابن عباس اور مفسرینِ کرام: «مَا كَانَ فِيهِ (يَا أَيُّهَا الَّذِينَ آمَنُوا) فَهُوَ مَدَنِيٌّ» — یعنی یہ اصطلاح مدنی آیات کی قطعی ترین پہچان ہے۔',
    classicalRuleEnglish:
      'Ibn Abbas & Classical Scholars: "Whatever contains \'O you who believe\' is unequivocally Medinan," serving as a definitive scholarly diagnostic for revelatory epoch.',
    sources: ['الإتقان في علوم القرآن للسیوطی، نوع ۱', 'التمهيد فی علوم القرآن، ج ۱', 'تفسير الميزان'],
    examples: [
      {
        surahNumber: 2,
        ayahNumber: 183,
        surahNameArabic: 'البقرة',
        surahNameUrdu: 'سورۃ البقرۃ',
        surahNameEnglish: 'Al-Baqarah',
        nuzulRank: 87,
        mushafOrder: 2,
        period: 'Early Medinan',
        approximateYearCE: 624,
        yearLabel: '2 AH / 624 CE',
        arabicText: 'يَا أَيُّهَا الَّذِينَ آمَنُوا كُتِبَ عَلَيْكُمُ الصِّيَامُ كَمَا كُتِبَ عَلَى الَّذِينَ مِن قَبْلِكُمْ لَعَلَّكُمْ تَتَّقُونَ',
        translationUrdu: 'اے ایمان والو! تمہارے اوپر روزے فرض کیے گئے ہیں جس طرح تم سے پہلے والوں پر فرض کیے گئے تھے تاکہ تم پرہیزگار بن جاؤ۔',
        translationEnglish: 'O you who believe! Fasting is prescribed for you as it was prescribed for those before you, that you may attain Taqwa.',
        scholarlyInsightUrdu:
          'ہجرت کے دوسرے سال روزے کا حکم محبت بھرے ایمانی خطاب کے ساتھ دیا گیا، تاکہ عبادت بوجھ نہ بنے بلکہ روحانی ارتقاء کا ذریعہ ہو۔',
        scholarlyInsightEnglish:
          'Enacted in 2 AH, fasting is framed not as an arbitrary penalty but as a sacred continuum of Abrahamic devotion cultivating spiritual mastery.',
      },
      {
        surahNumber: 4,
        ayahNumber: 59,
        surahNameArabic: 'النساء',
        surahNameUrdu: 'سورۃ النساء',
        surahNameEnglish: 'An-Nisa',
        nuzulRank: 92,
        mushafOrder: 4,
        period: 'Early Medinan',
        approximateYearCE: 626,
        yearLabel: '4 AH / 626 CE',
        arabicText: 'يَا أَيُّهَا الَّذِينَ آمَنُوا أَطِيعُوا اللَّهَ وَأَطِيعُوا الرَّسُولَ وَأُولِي الْأَمْرِ مِنكُمْ',
        translationUrdu: 'اے ایمان والو! اللہ کی اطاعت کرو اور رسول کی اطاعت کرو اور ان لوگوں کی جو تم میں سے صاحبانِ امر (اولی الامر) ہیں۔',
        translationEnglish: 'O you who believe! Obey Allah, and obey the Messenger, and those vested with divine authority among you.',
        scholarlyInsightUrdu:
          'آیتِ اولی الامر: اسلامی نظامِ قیادت اور معصوم پیشوائی کا قرآنی سنگِ بنیاد۔ علامہ طباطبائی اور شیخ طبرسی کے مطابق اولی الامر کی غیر مشروط اطاعت ان کی عصمت کی صریح دلیل ہے۔',
        scholarlyInsightEnglish:
          'The foundational verse on political and spiritual authority. Exegesis demonstrates that unconditional obedience to Ulil Amr alongside the Messenger establishes their infallibility (`Ismah).',
      },
      {
        surahNumber: 5,
        ayahNumber: 1,
        surahNameArabic: 'المائدة',
        surahNameUrdu: 'سورۃ المائدۃ',
        surahNameEnglish: 'Al-Ma\'idah',
        nuzulRank: 112,
        mushafOrder: 5,
        period: 'Late Medinan',
        approximateYearCE: 631,
        yearLabel: '10 AH / 631 CE',
        arabicText: 'يَا أَيُّهَا الَّذِينَ آمَنُوا أَوْفُوا بِالْعُقُودِ',
        translationUrdu: 'اے ایمان والو! اپنے تمام معاہدوں اور عہد و پیمان کو پورا کرو۔',
        translationEnglish: 'O you who believe! Fulfill all contracts, covenants, and sacred treaties.',
        scholarlyInsightUrdu:
          'شریعتِ اسلامی کا آفاقی قاعدہ: تمام سیاسی، معاشی، ازدواجی اور الٰہی عہود کا پاس رکھنا ایمانی فریضہ ہے۔',
        scholarlyInsightEnglish:
          'Revealed in the final legislative surah, this universal legal maxim mandates absolute fidelity to civic, international, and divine covenants.',
      },
      {
        surahNumber: 62,
        ayahNumber: 9,
        surahNameArabic: 'الجمعة',
        surahNameUrdu: 'سورۃ الجمعۃ',
        surahNameEnglish: 'Al-Jumu\'ah',
        nuzulRank: 110,
        mushafOrder: 62,
        period: 'Early Medinan',
        approximateYearCE: 628,
        yearLabel: '7 AH / 628 CE',
        arabicText: 'يَا أَيُّهَا الَّذِينَ آمَنُوا إِذَا نُودِيَ لِلصَّلَاةِ مِن يَوْمِ الْجُمُعَةِ فَاسْعَوْا إِلَىٰ ذِكْرِ اللَّهِ وَذَرُوا الْبَيْعَ',
        translationUrdu: 'اے ایمان والو! جب جمعہ کے دن نماز کے لیے اذان دی جائے تو فوراً اللہ کے ذکر کی طرف دوڑ پڑو اور خرید و فروخت چھوڑ دو۔',
        translationEnglish: 'O you who believe! When the call is proclaimed for the prayer on Friday, hasten to the remembrance of Allah and leave off commerce.',
        scholarlyInsightUrdu:
          'اجتماعی شعور اور ریاستی بیداری: ہفتہ وار جمعہ میں دنیاوی تجارت معطل کر کے بندگی اور فکری اتحاد کا مظاہرہ۔',
        scholarlyInsightEnglish:
          'Institutionalization of weekly collective consciousness and solidarity, prioritizing spiritual renewal above commercial enterprise.',
      },
    ],
  },
  {
    id: 'people_of_book',
    titleArabic: 'يَا أَهْلَ الْكِتَابِ / بَنِي إِسْرَائِيلَ',
    titleUrdu: 'یا اہلِ کتاب / بنی اسرائیل (علمی و تاریخی مکالمہ)',
    titleEnglish: 'O People of the Book / Children of Israel (Theological Dialogue)',
    subtitleUrdu: 'ابراہیمی توحید کی طرف مشترکہ دعوت اور کلامی اختلافات کی درستی',
    subtitleEnglish: 'Abrahamic Convergence, Rectification of Dogmatic Excess & Scriptural Covenants',
    totalOccurrences: '۲۴+ براہِ راست خطابات (علاوہ درجنوں مکالمات)',
    meccanRatio: 10,
    medinanRatio: 90,
    primaryPeriodUrdu: 'مدینہ منورہ (۱ تا ۹ ہجری)',
    primaryPeriodEnglish: 'Medina (1 AH to 9 AH / 622–631 CE)',
    badgeColor: '#8B5CF6', // Purple
    iconName: 'BookOpen',
    theologicalRoleUrdu:
      'جب رسولِ خدا ﷺ مدینہ تشریف لائے تو اہلِ کتاب (یہود و نصاریٰ) کے ساتھ گہرا علمی و کلامی مکالمہ شروع ہوا۔ قرآن نے انہیں ان کے اپنے انبیاء اور تورات و انجیل کے مشترکہ عہد کی یاد دلائی۔',
    theologicalRoleEnglish:
      'Upon reaching Medina, the prophetic mission engaged Jewish and Christian communities in profound theological dialogues, invoking their own scriptures and ancestral covenants.',
    pedagogicalShiftUrdu:
      'قرآن کا اسلوب ان کے ساتھ مناظرانہ نہیں بلکہ باوقار دعوت کا ہے: «تعالوا إلى كلمة سواء» (آؤ ایک مشترکہ کلمے پر اکٹھے ہو جائیں)۔ اس کے ساتھ ہی تحریفات اور غلو کی پردہ دری بھی کی گئی۔',
    pedagogicalShiftEnglish:
      'The rhetorical tone is pedagogical and reconciliatory: "Come to a common word between us and you," while systematically addressing theological distortions and ecclesiastical excess.',
    classicalRuleUrdu:
      'تفسیر المیزان: «قرآن مجید اہلِ کتاب کو ان کے علمی مقام کی وجہ سے دلیل کے ساتھ مخاطب کرتا ہے اور انہیں ابراہیمی اصل کی طرف لوٹنے کی دعوت دیتا ہے۔»',
    classicalRuleEnglish:
      'Tafsir al-Mizan: "The Quran engages the People of the Book from an epistemic standpoint, appealing to scriptural continuity and common Abrahamic lineage."',
    sources: ['تفسير الميزان، ج ۳ ص ۲۵۰', 'مجمع البيان، ج ۲', 'التمهيد، ج ۲'],
    examples: [
      {
        surahNumber: 3,
        ayahNumber: 64,
        surahNameArabic: 'آل عمران',
        surahNameUrdu: 'سورۃ آلِ عمران',
        surahNameEnglish: 'Aal-e-Imran',
        nuzulRank: 89,
        mushafOrder: 3,
        period: 'Early Medinan',
        approximateYearCE: 625,
        yearLabel: '3 AH / 625 CE',
        arabicText: 'قُلْ يَا أَهْلَ الْكِتَابِ تَعَالَوْا إِلَىٰ كَلِمَةٍ سَوَاءٍ بَيْنَنَا وَبَيْنَكُمْ أَلَّا نَعْبُدَ إِلَّا اللَّهَ وَلَا نُشْرِكَ بِهِ شَيْئًا وَلَا يَتَّخِذَ بَعْضُنَا بَعْضًا أَرْبَابًا مِّن دُونِ اللَّهِ',
        translationUrdu: 'کہہ دیجیے کہ اے اہلِ کتاب! آؤ ایک ایسی بات پر جو ہمارے اور تمہارے درمیان مشترک ہے کہ ہم سوائے اللہ کے کسی کی بندگی نہ کریں اور کسی کو اس کا شریک نہ بنائیں اور ہم میں سے کوئی اللہ کو چھوڑ کر کسی کو اپنا رب نہ بنائے۔',
        translationEnglish: 'Say: "O People of the Book! Come to a word that is common between us and you: that we shall worship none but Allah, that we shall associate no partners with Him, and that none of us shall take others as lords beside Allah."',
        scholarlyInsightUrdu:
          'بین المذاہب مکالمے (Interfaith Dialogue) کا عظیم ترین ابراہیمی چارٹر: مشترکہ توحید اور مذہبی اشرافیہ کی غلامی سے نجات۔',
        scholarlyInsightEnglish:
          'The premier interfaith charter in prophetic history, proposing a unified monotheistic front devoid of ecclesiastical tyranny and idolatry.',
      },
      {
        surahNumber: 4,
        ayahNumber: 171,
        surahNameArabic: 'النساء',
        surahNameUrdu: 'سورۃ النساء',
        surahNameEnglish: 'An-Nisa',
        nuzulRank: 92,
        mushafOrder: 4,
        period: 'Early Medinan',
        approximateYearCE: 626,
        yearLabel: '4 AH / 626 CE',
        arabicText: 'يَا أَهْلَ الْكِتَابِ لَا تَغْلُوا فِي دِينِكُمْ وَلَا تَقُولُوا عَلَى اللَّهِ إِلَّا الْحَقَّ ۚ إِنَّمَا الْمَسِيحُ عِيسَى ابْنُ مَرْيَمَ رَسُولُ اللَّهِ وَكَلِمَتُهُ أَلْقَاهَا إِلَىٰ مَرْيَمَ وَرُوحٌ مِّنْهُ',
        translationUrdu: 'اے اہلِ کتاب! اپنے دین میں غلو نہ کرو اور اللہ پر حق کے سوا کوئی بات نہ کہو، بیشک عیسیٰ بن مریم صرف اللہ کے رسول اور اس کا کلمہ ہیں جسے اس نے مریم کی طرف القا کیا اور اس کی طرف سے ایک روح ہیں۔',
        translationEnglish: 'O People of the Book! Do not exceed the bounds in your religion, nor say concerning Allah anything but the truth. The Messiah, Jesus son of Mary, was only a messenger of Allah, His word imparted to Mary, and a spirit from Him.',
        scholarlyInsightUrdu:
          'عقائد میں غلو (Extremism) کی مذمت: حضرت عیسیٰ (ع) کی بندگی اور رسالت کا باوقار قرآنی دفاع۔',
        scholarlyInsightEnglish:
          'A gentle yet decisive correction of Christological excess, restoring Prophet Jesus (as) to his noble status as a divinely aided messenger of Allah.',
      },
      {
        surahNumber: 5,
        ayahNumber: 15,
        surahNameArabic: 'المائدة',
        surahNameUrdu: 'سورۃ المائدۃ',
        surahNameEnglish: 'Al-Ma\'idah',
        nuzulRank: 112,
        mushafOrder: 5,
        period: 'Late Medinan',
        approximateYearCE: 631,
        yearLabel: '10 AH / 631 CE',
        arabicText: 'يَا أَهْلَ الْكِتَابِ قَدْ جَاءَكُمْ رَسُولُنَا يُبَيِّنُ لَكُمْ كَثِيرًا مِّمَّا كُنتُمْ تُخْفُونَ مِنَ الْكِتَابِ وَيَعْفُو عَن كَثِيرٍ ۚ قَدْ جَاءَكُم مِّنَ اللَّهِ نُورٌ وَكِتَابٌ مُّبِينٌ',
        translationUrdu: 'اے اہلِ کتاب! تمہارے پاس ہمارا رسول آ گیا ہے جو تمہارے سامنے کتاب کی بہت سی ایسی باتیں ظاہر کر رہا ہے جنہیں تم چھپایا کرتے تھے اور بہت سی باتوں سے درگزر کرتا ہے۔ بیشک تمہارے پاس اللہ کی طرف سے ایک نور اور روشن کتاب آ چکی ہے۔',
        translationEnglish: 'O People of the Book! There has come to you Our Messenger, making clear to you much of what you used to conceal of the Scripture, and overlooking much. There has certainly come to you from Allah a Light and a Clear Book.',
        scholarlyInsightUrdu:
          'رسولِ اکرم ﷺ کی آمد اہلِ کتاب کے لیے کوئی اجنبی واقعہ نہیں بلکہ ان کی اپنی کتب کے چھپائے ہوئے حقائق کا روشن ظہور ہے۔',
        scholarlyInsightEnglish:
          'Affirming the prophetic advent as a clarifying light that honors authentic Torah and Gospel prophecies while dissolving centuries of ecclesiastical obfuscation.',
      },
    ],
  },
  {
    id: 'hypocrites',
    titleArabic: 'الْمُنَافِقُونَ وَالَّذِينَ فِي قُلُوبِهِم مَّرَضٌ',
    titleUrdu: 'المنافقون (منافقین کا کٹھگھرا اور نفسیاتی تجزیہ)',
    titleEnglish: 'The Hypocrites & Double-Standards (Psychological Exposure)',
    subtitleUrdu: 'داخلی فتنے، پروپیگنڈا اور شکست خوردہ ذہنیت کی پردہ دری',
    subtitleEnglish: 'Dissecting Fifth-Column Subversion, Psychological Duality & Defeatism',
    totalOccurrences: '۳۵+ مقامات (خالصتاً مدنی دور)',
    meccanRatio: 0,
    medinanRatio: 100,
    primaryPeriodUrdu: 'مدینہ منورہ (۲ تا ۹ ہجری / بدر تا تبوک)',
    primaryPeriodEnglish: 'Medina (2 AH to 9 AH / Post-Badr through Tabuk Expedition)',
    badgeColor: '#EF4444', // Red
    iconName: 'AlertTriangle',
    theologicalRoleUrdu:
      'مکہ میں مسلمان اقلیت میں تھے اس لیے نفاق کا کوئی وجود نہ تھا؛ وہاں یا مؤمن تھا یا کافر۔ ہجرت کے بعد جب مدینہ میں اسلامی ریاست طاقتور ہوئی تو مفاد پرست عناصر نے زبان سے اسلام کا اقرار کیا مگر دل سے دشمنی جاری رکھی۔',
    theologicalRoleEnglish:
      'In Mecca, persecution meant hypocrisy had no utility; individuals were either committed believers or open antagonists. Only in Medina, with the emergence of statehood, did opportunistic elements feign belief.',
    pedagogicalShiftUrdu:
      'قرآن نے منافقین کے جھوٹے نعروں («ہم تو صرف اصلاح کرنے والے ہیں»)، غزوات کے موقع پر پیٹھ پھیرنے، اور افواہ سازی کی نفسیات کو جراحی کی طرح بے نقاب کیا۔',
    pedagogicalShiftEnglish:
      'The revelation dissects the hypocrite psyche with surgical precision—exposing their deceptive claims of reform ("We are only peacemakers"), battle-line desertions, and covert alliances.',
    classicalRuleUrdu:
      'علامہ طباطبائی (تفسیر المیزان): «قرآن میں منافقین کا ذکر محض تاریخی واقعہ نہیں بلکہ ہر دور کے معاشروں میں چھپے ہوئے داخلی خطرات سے آگاہی ہے۔»',
    classicalRuleEnglish:
      'Tafsir al-Mizan: "The Quranic deconstruction of hypocrisy is not merely historical chronicle; it provides an enduring psychological diagnostic of internal sabotage in every era."',
    sources: ['تفسير الميزان، ج ۱۹ (سورة المنافقون)', 'مجمع البيان، ج ۱۰', 'التمهيد، ج ۱'],
    examples: [
      {
        surahNumber: 2,
        ayahNumber: 11,
        surahNameArabic: 'البقرة',
        surahNameUrdu: 'سورۃ البقرۃ',
        surahNameEnglish: 'Al-Baqarah',
        nuzulRank: 87,
        mushafOrder: 2,
        period: 'Early Medinan',
        approximateYearCE: 623,
        yearLabel: '2 AH / 623 CE',
        arabicText: 'وَإِذَا قِيلَ لَهُمْ لَا تُفْسِدُوا فِي الْأَرْضِ قَالُوا إِنَّمَا نَحْنُ مُصْلِحُونَ ۝ أَلَا إِنَّهُمْ هُمُ الْمُفْسِدُونَ وَلَٰكِن لَّا يَشْعُرُونَ',
        translationUrdu: 'اور جب ان سے کہا جاتا ہے کہ زمین میں فساد نہ پھیلاؤ تو کہتے ہیں کہ ہم تو صرف اصلاح کرنے والے ہیں! یاد رکھو کہ یہی لوگ فسادی ہیں مگر وہ شعور نہیں رکھتے۔',
        translationEnglish: 'And when it is said to them, "Do not cause corruption on the earth," they say, "We are only reformers!" Unquestionably, it is they who are the corrupters, but they perceive it not.',
        scholarlyInsightUrdu:
          'منافقت کی سب سے بڑی علامت: فتنہ و فساد برپا کر کے اسے "اصلاح پسندی اور امن" کا خوشنما نام دینا۔',
        scholarlyInsightEnglish:
          'The quintessential hallmark of hypocrisy: disguising moral and societal subversion beneath the deceptive banner of pragmatic reform.',
      },
      {
        surahNumber: 63,
        ayahNumber: 4,
        surahNameArabic: 'المنافقون',
        surahNameUrdu: 'سورۃ المنافقون',
        surahNameEnglish: 'Al-Munafiqun',
        nuzulRank: 104,
        mushafOrder: 63,
        period: 'Early Medinan',
        approximateYearCE: 627,
        yearLabel: '6 AH / 627 CE',
        arabicText: 'وَإِذَا رَأَيْتَهُمْ تُعْجِبُكَ أَجْسَامُهُمْ ۖ وَإِن يَقُولُوا تَسْمَعْ لِقَوْلِهِمْ ۖ كَأَنَّهُمْ خُشُبٌ مُّسَنَّدَةٌ ۖ يَحْسَبُونَ كُلَّ صَيْحَةٍ عَلَيْهِمْ ۚ هُمُ الْعَدُوُّ فَاحْذَرْهُمْ',
        translationUrdu: 'اور جب آپ ان کو دیکھتے ہیں تو ان کے جسم آپ کو اچھے معلوم ہوتے ہیں اور اگر وہ بات کرتے ہیں تو آپ ان کی گفتگو سنتے ہیں، گویا وہ دیوار سے لگی ہوئی لکڑیاں ہیں! وہ ہر چیخ کو اپنے خلاف سمجھتے ہیں؛ یہی اصل دشمن ہیں لہٰذا ان سے ہوشیار رہیں۔',
        translationEnglish: 'And when you see them, their physical forms impress you, and if they speak, you listen to their speech. Yet they are like propped-up timbers! They deem every shout to be directed against them. They are the true enemy, so beware of them!',
        scholarlyInsightUrdu:
          'ظاہری وجاہت اور چرب زبانی کے پیچھے اندرونی بزدلی اور روحانی کھوکھلا پن۔ قرآنی استعارہ: دیوار سے لگی بے جان لکڑیاں۔',
        scholarlyInsightEnglish:
          'A breathtaking psychological portrait: polished exteriors and eloquent rhetoric masking internal spiritual void and chronic paranoia.',
      },
      {
        surahNumber: 9,
        ayahNumber: 64,
        surahNameArabic: 'التوبة',
        surahNameUrdu: 'سورۃ التوبۃ',
        surahNameEnglish: 'At-Tawbah',
        nuzulRank: 113,
        mushafOrder: 9,
        period: 'Late Medinan',
        approximateYearCE: 631,
        yearLabel: '9 AH / 631 CE',
        arabicText: 'يَحْذَرُ الْمُنَافِقُونَ أَن تُنَزَّلَ عَلَيْهِمْ سُورَةٌ تُنَبِّئُهُم بِمَا فِي قُلُوبِهِمْ ۚ قُلِ اسْتَهْزِئُوا إِنَّ اللَّهَ مُخْرِجٌ مَّا تَحْذَرُونَ',
        translationUrdu: 'منافقین اس بات سے ڈرتے ہیں کہ کہیں ان کے بارے میں کوئی ایسی سورت نہ اتر آئے جو ان کے دلوں کی باتوں کو فاش کر دے؛ کہہ دیجیے کہ مذاق اڑاتے رہو، اللہ یقیناً اس چیز کو ظاہر کر کے رہے گا جس سے تم ڈرتے ہو۔',
        translationEnglish: 'The hypocrites fear lest a surah should be revealed disclosing what is in their hearts. Say: "Mock as you will; indeed, Allah will bring forth that which you dread!"',
        scholarlyInsightUrdu:
          'سورۃ التوبہ (المُبَعْثِرَہ / الفاضحہ): غزوۂ تبوک کے بعد منافقین کے چہروں سے آخری نقاب نوچنے والی سورۃ جس نے باطن کے راز کھول دیے۔',
        scholarlyInsightEnglish:
          'Known historically as Al-Fadihah ("The Discloser"), this late revelation tore away the final masks of fifth-columnists following the Tabuk expedition.',
      },
    ],
  },
  {
    id: 'prophetic',
    titleArabic: 'يَا أَيُّهَا النَّبِيُّ / الرَّسُولُ / الْمُزَّمِّلُ',
    titleUrdu: 'خطابِ نبوی و تسکینِ قلب (رسولِ اعظمؐ سے براہِ راست مکالمہ)',
    titleEnglish: 'Direct Prophetic Addresses (Consolation, Vigil & Global Mandate)',
    subtitleUrdu: 'غارِ حرا کی تنہائی سے راتوں کی عبادت اور غدیرِ خم کے الٹی میٹم تک',
    subtitleEnglish: 'From Cave Hira\'s Solitude to Nocturnal Vigils & the Final Ghadir Ultimatum',
    totalOccurrences: '۴۰+ براہِ راست خطابات (۲۳ سالہ مسلسل ساتھ)',
    meccanRatio: 40,
    medinanRatio: 60,
    primaryPeriodUrdu: '۲۳ سالہ محیط (بعثت تا وفاتِ حسرت آیات)',
    primaryPeriodEnglish: 'Encompassing the entire 23-year prophetic mission (610–632 CE)',
    badgeColor: '#F59E0B', // Amber
    iconName: 'Sparkles',
    theologicalRoleUrdu:
      'اللہ تعالیٰ کا اپنے حبیب ﷺ کے ساتھ براہِ راست، مشفقانہ اور قیادت آفریں مکالمہ۔ جب قریش نے طعنے دیے تو وحی نے تسلی دی؛ جب بوجھ بھاری ہوا تو راتوں کے قیام کی تلقین کی؛ اور جب دین مکمل ہوا تو حتمی اعلان کی ذمہ داری سونپی۔',
    theologicalRoleEnglish:
      'The intimate, tender, yet commanding dialogue of the Divine with the Seal of Prophets (pbuh)—comforting him in persecution, fortifying him in night vigils, and guiding statecraft.',
    pedagogicalShiftUrdu:
      'مکہ کے اوائل میں محبت بھرے القاب: «یا ایہا المزمل»، «یا ایہا المدثر»؛ درمیانی دور میں تسکینِ قلب: «ما ودعك ربك وما قلى»؛ اور مدینہ میں ریاست اور اعلانِ ولایت کا باوقار حکم: «يا أيها الرسول بلغ ما أنزل إليك»۔',
    pedagogicalShiftEnglish:
      'Early Mecca envelops him in affectionate mantles ("O Wrapped One", "O Cloaked One"); mid-Mecca consoles him during trials; late Medina vests him with sovereign proclamation authority at Ghadir Khumm.',
    classicalRuleUrdu:
      'شیخ طبرسی (مجمع البیان): «اللہ تعالیٰ نے قرآن میں اپنے نبی کو کبھی ان کے نام سے "یا محمد" کہہ کر پکارنے کے بجائے ہمیشہ صفاتی القاب (نبی، رسول، مزمل، مدثر) سے عزت دی ہے۔»',
    classicalRuleEnglish:
      'Shaykh Tabarsi (Majma\' al-Bayan): "Unlike other prophets who were addressed by personal names, Allah exclusively addressed Prophet Muhammad through sublime functional titles of honor and love."',
    sources: ['مجمع البيان في تفسير القرآن، ج ۱۰', 'تفسير الميزان، ج ۲۰', 'التمهيد، ج ۱'],
    examples: [
      {
        surahNumber: 73,
        ayahNumber: 1,
        surahNameArabic: 'المزمل',
        surahNameUrdu: 'سورۃ المزمل',
        surahNameEnglish: 'Al-Muzzammil',
        nuzulRank: 3,
        mushafOrder: 73,
        period: 'Early Meccan',
        approximateYearCE: 610,
        yearLabel: '1st Year / 610 CE',
        arabicText: 'يَا أَيُّهَا الْمُزَّمِّلُ ۝ قُمِ اللَّيْلَ إِلَّا قَلِيلًا ۝ نِّصْفَهُ أَوِ انقُصْ مِنْهُ قَلِيلًا ۝ أَوْ زِدْ عَلَيْهِ وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا ۝ إِنَّا سَنُلْقِي عَلَيْكَ قَوْلًا ثَقِيلًا',
        translationUrdu: 'اے چادر اوڑھنے والے! رات کو قیام کیجیے سوائے تھوڑے سے حصے کے، آدھی رات یا اس سے کچھ کم کر دیجیے یا اس پر اضافہ کیجیے اور قرآن کو ٹھہر ٹھہر کر ترتیل کے ساتھ پڑھیے، بیشک ہم آپ پر ایک بھاری کلام نازل کرنے والے ہیں۔',
        translationEnglish: 'O you wrapped in garments! Stand in prayer at night, except for a little—half of it, or a little less, or add to it, and recite the Quran in slow, measured tones. Indeed, We are about to cast upon you a heavy word.',
        scholarlyInsightUrdu:
          'نزولِ وحی کے ابتدائی ایام: نبوی قلب کو بارِ امانت اٹھانے کے لیے رات کے نوافل اور ترتیلِ قرآن سے روحانی توانائی فراہم کی گئی۔',
        scholarlyInsightEnglish:
          'Revealed at the dawn of prophethood: preparing the prophetic vessel for the colossal burden of divine revelation through nocturnal vigilance and measured recitation.',
      },
      {
        surahNumber: 93,
        ayahNumber: 3,
        surahNameArabic: 'الضحى',
        surahNameUrdu: 'سورۃ الضحیٰ',
        surahNameEnglish: 'Ad-Duha',
        nuzulRank: 11,
        mushafOrder: 93,
        period: 'Early Meccan',
        approximateYearCE: 612,
        yearLabel: '2nd Year / 612 CE',
        arabicText: 'مَا وَدَّعَكَ رَبُّكَ وَمَا قَلَىٰ ۝ وَلَلْآخِرَةُ خَيْرٌ لَّكَ مِنَ الْأُولَىٰ ۝ وَلَسَوْفَ يُعْطِيكَ رَبُّكَ فَتَرْضَىٰ',
        translationUrdu: 'آپ کے پروردگار نے نہ تو آپ کو چھوڑا ہے اور نہ ناراض ہوا ہے، اور یقیناً آپ کے لیے آخرت دنیا سے بہتر ہے، اور عنقریب آپ کا رب آپ کو اتنا عطا فرمائے گا کہ آپ راضی ہو جائیں گے۔',
        translationEnglish: 'Your Lord has not forsaken you, nor is He displeased. And surely the future is better for you than the past, and your Lord will surely give you so that you will be well pleased.',
        scholarlyInsightUrdu:
          'فترۃ الوحی کی تسلی: جب مشرکین نے طعنہ دیا کہ محمد کا رب چھوڑ گیا، تو اللہ نے قسم کھا کر دلجوئی فرمائی اور راضی کرنے کا وعدہ کیا۔',
        scholarlyInsightEnglish:
          'Divine tenderness during the cessation of revelation: refuting polytheist taunts with a categorical oath of eternal love and divine satisfaction.',
      },
      {
        surahNumber: 5,
        ayahNumber: 67,
        surahNameArabic: 'المائدة',
        surahNameUrdu: 'سورۃ المائدۃ',
        surahNameEnglish: 'Al-Ma\'idah',
        nuzulRank: 112,
        mushafOrder: 5,
        period: 'Late Medinan',
        approximateYearCE: 632,
        yearLabel: '10 AH / 632 CE (Ghadir Khumm)',
        arabicText: 'يَا أَيُّهَا الرَّسُولُ بَلِّغْ مَا أُنزِلَ إِلَيْكَ مِن رَّبِّكَ ۖ وَإِن لَّمْ تَفْعَلْ فَمَا بَلَّغْتَ رِسَالَتَهُ ۚ وَاللَّهُ يَعْصِمُكَ مِنَ النَّاسِ',
        translationUrdu: 'اے رسول! جو کچھ آپ کے پروردگار کی طرف سے آپ پر نازل کیا گیا ہے اسے (لوگوں تک) پہنچا دیجیے، اور اگر آپ نے ایسا نہ کیا تو آپ نے اس کی رسالت کا کوئی کام نہیں کیا؛ اور اللہ آپ کو لوگوں کے شر سے محفوظ رکھے گا۔',
        translationEnglish: 'O Messenger! Proclaim what has been revealed to you from your Lord; and if you do not, you have not delivered His message at all. And Allah will protect you from the people.',
        scholarlyInsightUrdu:
          'آیتِ تبلیغ (غدیرِ خم): ۲۳ سالہ رسالت کا حتمی اعلان۔ اگر ولایت و امامت کا یہ پیغام نہ پہنچایا تو گویا ۲۳ سالہ نبوت کا کام ہی ادا نہ ہوا۔ تمام کتبِ تفاسیر میں یہ نازک ترین اور فیصلہ کن نبوی خطاب ہے۔',
        scholarlyInsightEnglish:
          'Ayat al-Tabligh revealed at Ghadir Khumm: the crowning decree of 23 years. Fulfilling the leadership succession of Imam Ali (as) is equated to the very completion of the prophetic commission itself.',
      },
    ],
  },
];
