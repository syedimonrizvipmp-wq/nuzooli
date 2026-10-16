/**
 * Chronological Revelation Verses & Scholarly Provenance Metadata
 * Academic Framework: Tarteeb-e-Nuzooli Digital Humanities Laboratory
 * Principal Investigator: Maulana Syed Imon Rizvi
 */

import { ScholarlyProvenance } from './gradualLegislationData';

export interface ChronologicalMilestoneVerse {
  stepNumber: number;
  surahNumber: number;
  surahNameEnglish: string;
  surahNameArabic: string;
  surahNameUrdu: string;
  ayahNumber: number;
  verseRange: string;
  yearNabawiOrHijri: string;
  revelationEpoch: 'Early Meccan' | 'Mid Meccan' | 'Late Meccan' | 'Early Medinan' | 'Mid Medinan' | 'Late Medinan';
  textArabic: string;
  textUrdu: string;
  textEnglish: string;
  thematicClassification: string;
  scholarlyProvenance: ScholarlyProvenance;
}

export const CHRONOLOGICAL_MILESTONE_VERSES: ChronologicalMilestoneVerse[] = [
  {
    stepNumber: 1,
    surahNumber: 96,
    surahNameEnglish: 'Al-Alaq',
    surahNameArabic: 'العلق',
    surahNameUrdu: 'سورۃ العلق',
    ayahNumber: 1,
    verseRange: '1-5',
    yearNabawiOrHijri: '1st Year Nabawi (13 BH / 610 CE)',
    revelationEpoch: 'Early Meccan',
    textArabic: 'اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ',
    textUrdu: 'پڑھیے اپنے پروردگار کے نام سے جس نے پیدا کیا۔',
    textEnglish: 'Read in the name of your Lord who created.',
    thematicClassification: 'Epistemology & Divine Commission',
    scholarlyProvenance: {
      primarySource: "Al-Tamhid fi 'Ulum al-Qur'an",
      classicalAuthority: "Ayatollah Muhammad Hadi Ma'rifat",
      volumeAndPage: "Vol. 1, pp. 68-74",
      editionInfo: "Qom: Mu'assasat al-Nashr al-Islami",
      exegeticalNoteUrdu: "مکتبِ اہلِ بیتؑ کے متفقہ روایات کے مطابق جبلِ نور (غارِ حرا) میں پہلی نازل شدہ آیات۔",
      exegeticalNoteEnglish: "Unanimous transmission across Shia exegesis confirming verses 1-5 as the primordial revelation at Mount Hira."
    }
  },
  {
    stepNumber: 5,
    surahNumber: 1,
    surahNameEnglish: 'Al-Fatihah',
    surahNameArabic: 'الفاتحة',
    surahNameUrdu: 'سورۃ الفاتحہ',
    ayahNumber: 1,
    verseRange: '1-7',
    yearNabawiOrHijri: '1st Year Nabawi (610 CE)',
    revelationEpoch: 'Early Meccan',
    textArabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ۝ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
    textUrdu: 'اللہ کے نام سے جو بڑا مہربان نہایت رحم والا ہے۔ سب تعریفیں اللہ کے لیے ہیں جو تمام جہانوں کا پالنے والا ہے۔',
    textEnglish: 'In the name of Allah, the Entirely Merciful, the Especially Merciful. All praise is due to Allah, Lord of the worlds.',
    thematicClassification: 'Foundational Liturgy & Monotheism',
    scholarlyProvenance: {
      primarySource: "Al-Mizan fi Tafsir al-Qur'an",
      classicalAuthority: "Allamah Muhammad Husayn Tabataba'i",
      volumeAndPage: "Vol. 1, pp. 15-46",
      editionInfo: "Beirut: Mu'assasat al-A'lami",
      exegeticalNoteUrdu: "علامہ طباطبائی کے مطابق بسم اللہ ہر سورت کا لازمی جزو ہے اور فاتحہ پہلی مکمل نازل شدہ سورت برائے اقامتِ نماز ہے۔",
      exegeticalNoteEnglish: "Tabataba'i establishes the Bismillah as an integral verse and Al-Fatihah as the first complete liturgical surah revealed for prayer."
    }
  },
  {
    stepNumber: 27,
    surahNumber: 22,
    surahNameEnglish: 'Al-Hajj',
    surahNameArabic: 'الحج',
    surahNameUrdu: 'سورۃ الحج',
    ayahNumber: 39,
    verseRange: '39-40',
    yearNabawiOrHijri: '1 AH (623 CE)',
    revelationEpoch: 'Early Medinan',
    textArabic: 'أُذِنَ لِلَّذِينَ يُقَاتَلُونَ بِأَنَّهُمْ ظُلِمُوا ۚ وَإِنَّ اللَّهَ عَلَىٰ نَصْرِهِمْ لَقَدِيرٌ',
    textUrdu: 'جن لوگوں پر جنگ مسلط کی گئی ہے انہیں لڑنے کی اجازت دی گئی ہے کیونکہ ان پر ظلم کیا گیا ہے۔',
    textEnglish: 'Permission to fight has been given to those who are being fought, because they were wronged.',
    thematicClassification: 'Just War & Human Rights',
    scholarlyProvenance: {
      primarySource: "Asbab al-Nuzul",
      classicalAuthority: "Ali ibn Ahmad al-Wahidi",
      volumeAndPage: "p. 238",
      editionInfo: "Cairo: Dar al-Hadith",
      exegeticalNoteUrdu: "قرآن میں دفاعِ خود اختیاری کا سب سے پہلا قانونی فرمان۔",
      exegeticalNoteEnglish: "Al-Wahidi records the consensus identifying 22:39 as the inaugural constitutional charter for justified self-defense."
    }
  },
  {
    stepNumber: 33,
    surahNumber: 33,
    surahNameEnglish: 'Al-Ahzab',
    surahNameArabic: 'الأحزاب',
    surahNameUrdu: 'سورۃ الاحزاب',
    ayahNumber: 33,
    verseRange: '33',
    yearNabawiOrHijri: '5 AH (627 CE)',
    revelationEpoch: 'Mid Medinan',
    textArabic: 'إِنَّمَا يُرِيدُ اللَّهُ لِيُذْهِبَ عَنكُمُ الرِّجْسَ أَهْلَ الْبَيْتِ وَيُطَهِّرَكُمْ تَطْهِيرًا',
    textUrdu: 'اللہ تو بس یہی چاہتا ہے کہ اے اہلِ بیت! تم سے ہر قسم کی برائی اور ناپاکی دور رکھے اور تمہیں خوب پاک و پاکیزہ رکھے۔',
    textEnglish: 'Allah only intends to remove from you the impurity of sin, O people of the household, and to purify you with extensive purification.',
    thematicClassification: 'Wilayah & Spiritual Purity',
    scholarlyProvenance: {
      primarySource: "Al-Mizan fi Tafsir al-Qur'an",
      classicalAuthority: "Allamah Muhammad Husayn Tabataba'i",
      volumeAndPage: "Vol. 16, pp. 309-322 (Ayat al-Tathir)",
      editionInfo: "Beirut: Mu'assasat al-A'lami",
      exegeticalNoteUrdu: "حدیثِ کساء اور ۴۰ سے زائد متواتر شیعہ و سنی اسناد کے ذریعے پنجتنِ پاکؑ کی عصمتِ مطلقہ کی دلیل۔",
      exegeticalNoteEnglish: "Tabataba'i marshals over forty multi-source prophetic traditions proving the exclusivity and infallible purification of the Ahl al-Bayt."
    }
  },
  {
    stepNumber: 36,
    surahNumber: 5,
    surahNameEnglish: "Al-Ma'idah",
    surahNameArabic: 'المائدة',
    surahNameUrdu: 'سورۃ المائدہ',
    ayahNumber: 67,
    verseRange: '67',
    yearNabawiOrHijri: '10 AH (18 Dhu al-Hijjah / 632 CE)',
    revelationEpoch: 'Late Medinan',
    textArabic: 'يَا أَيُّهَا الرَّسُولُ بَلِّغْ مَا أُنزِلَ إِلَيْكَ مِن رَّبِّكَ ۖ وَإِن لَّمْ تَفْعَلْ فَمَا بَلَّغْتَ رِسَالَتَهُ',
    textUrdu: 'اے رسول! جو کچھ آپ کے پروردگار کی طرف سے آپ پر نازل کیا گیا ہے اسے پہنچا دیجیے؛ اور اگر آپ نے ایسا نہ کیا تو آپ نے اس کی رسالت کا کوئی حق ادا نہیں کیا۔',
    textEnglish: 'O Messenger, announce that which has been revealed to you from your Lord, and if you do not, then you have not conveyed His message.',
    thematicClassification: 'Culmination of Revelation & Succession',
    scholarlyProvenance: {
      primarySource: "Al-Tamhid fi 'Ulum al-Qur'an & Asbab al-Nuzul",
      classicalAuthority: "Ayatollah Muhammad Hadi Ma'rifat & Al-Wahidi",
      volumeAndPage: "Al-Tamhid Vol. 1, pp. 195-201; Wahidi p. 192",
      editionInfo: "Qom & Cairo Historical Manuscripts",
      exegeticalNoteUrdu: "غدیرِ خم کے مقام پر نزولِ آیتِ تبلیغ اور اعلانِ ولایتِ علی ابن ابی طالب علیہ السلام۔",
      exegeticalNoteEnglish: "Descent at Ghadir Khumm on 18 Dhu al-Hijjah 10 AH commanding the public covenant and formal succession of Imam Ali (as)."
    }
  }
];
