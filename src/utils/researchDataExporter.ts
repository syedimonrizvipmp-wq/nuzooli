/**
 * FAIR Research Data Export Engine
 * Tarteeb-e-Nuzooli Digital Humanities Laboratory
 * Principal Investigator: Maulana Syed Imon Rizvi
 * Standard: FAIR Data Principles (Findable, Accessible, Interoperable, Reusable)
 */

import { SURAHS_DATA } from '@/data/surahs';
import { GRADUAL_LEGISLATION_PATHWAYS } from '@/data/gradualLegislationData';

export interface FairChronologyRecord {
  surahNumber: number;
  surahNameEnglish: string;
  surahNameArabic: string;
  surahNameUrdu: string;
  chronologicalNuzulRank: number;
  canonicalMushafRank: number;
  deltaDisplacement: number;
  revelationPeriod: string;
  classification: 'meccan' | 'medinan';
  totalVerses: number;
}

export function generateChronologyMatrixCSV(): string {
  const headers = [
    'Canonical_Mushaf_Rank',
    'Surah_Name_English',
    'Surah_Name_Arabic',
    'Surah_Name_Urdu',
    'Chronological_Nuzul_Rank',
    'Delta_Displacement',
    'Revelation_Period',
    'Classification',
    'Total_Verses'
  ];

  const rows = SURAHS_DATA.map((s) => {
    const delta = Math.abs(s.nuzul - s.n);
    return [
      s.n,
      `"${s.en}"`,
      `"${s.ar}"`,
      `"${s.ur}"`,
      s.nuzul,
      delta,
      `"${s.revelationPeriod}"`,
      `"${s.type}"`,
      s.verses
    ].join(',');
  });

  return [headers.join(','), ...rows].join('\n');
}

export function generateChronologyMatrixJSON(): string {
  const records: FairChronologyRecord[] = SURAHS_DATA.map((s) => ({
    surahNumber: s.n,
    surahNameEnglish: s.en,
    surahNameArabic: s.ar,
    surahNameUrdu: s.ur,
    chronologicalNuzulRank: s.nuzul,
    canonicalMushafRank: s.n,
    deltaDisplacement: Math.abs(s.nuzul - s.n),
    revelationPeriod: s.revelationPeriod,
    classification: s.type,
    totalVerses: s.verses
  }));

  const payload = {
    metadata: {
      project: 'Project Nuzooli: Diachronic Computational Framework for Chronological Quranic Exegesis',
      principalInvestigator: 'Maulana Syed Imon Rizvi',
      canonicalUrl: 'https://nuzooli.vercel.app',
      datasetVersion: '2.0.0',
      license: 'CC BY-NC 4.0 (Creative Commons Attribution-NonCommercial 4.0 International)',
      generatedAt: new Date().toISOString(),
      standardsCompliance: 'FAIR Data Principles (Findable, Accessible, Interoperable, Reusable)',
      totalSurahs: records.length,
      methodology: 'Shia diachronic hermeneutical consensus compiled from Tafsir al-Mizan, Majma al-Bayan, and Al-Tamhid fi Ulum al-Quran'
    },
    data: records
  };

  return JSON.stringify(payload, null, 2);
}

export function generateGradualLegislationJSON(): string {
  const payload = {
    metadata: {
      project: 'Project Nuzooli: Diachronic Computational Framework for Chronological Quranic Exegesis',
      principalInvestigator: 'Maulana Syed Imon Rizvi',
      canonicalUrl: 'https://nuzooli.vercel.app',
      dataset: 'Tadrij al-Ahkam: 5 Evolutionary Legal Pathways & Stratified Jurisprudence',
      datasetVersion: '2.0.0',
      license: 'CC BY-NC 4.0',
      generatedAt: new Date().toISOString(),
      primaryClassicalSources: [
        'Ayatollah Muhammad Hadi Marifat, Al-Tamhid fi Ulum al-Quran',
        'Allamah Muhammad Husayn Tabatabai, Al-Mizan fi Tafsir al-Quran',
        'Ali ibn Ahmad al-Wahidi, Asbab al-Nuzul'
      ]
    },
    pathways: GRADUAL_LEGISLATION_PATHWAYS
  };

  return JSON.stringify(payload, null, 2);
}

export function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: `${mimeType};charset=utf-8;` });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
