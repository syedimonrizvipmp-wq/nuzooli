import React, { useState } from 'react';
import { useQuran } from '@/context/QuranContext';
import { Navbar } from '@/components/Header/Navbar';
import { TimeRibbon } from '@/components/Timeline/TimeRibbon';
import { EventCard } from '@/components/Reader/EventCard';
import { MushafView } from '@/components/Reader/MushafView';
import { PerspectivesView } from '@/components/Perspectives/PerspectivesView';
import { ChronologicalPassageReader } from '@/components/Reader/ChronologicalPassageReader';
import { TypographyModal } from '@/components/Modals/TypographyModal';
import { BookmarksModal } from '@/components/Modals/BookmarksModal';
import { DataImportExportModal } from '@/components/Modals/DataImportExportModal';
import { AudioPlayerBar } from '@/components/Reader/AudioPlayerBar';

export const AppContent: React.FC = () => {
  const { perspectiveMode, activeEvent } = useQuran();

  const [isTypographyOpen, setIsTypographyOpen] = useState(false);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
  const [isDataModalOpen, setIsDataModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors">
      
      {/* Top Navigation */}
      <Navbar
        onOpenTypography={() => setIsTypographyOpen(true)}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        onOpenDataModal={() => setIsDataModalOpen(true)}
      />

      {/* Interactive 23-Year Time-Ribbon Discovery Engine (Surah Chronology) */}
      {perspectiveMode === 'nuzul' && <TimeRibbon />}

      {/* Main View Area */}
      <main className="flex-1 max-w-[1780px] w-full mx-auto px-3 sm:px-6 lg:px-8 xl:px-12 py-3 sm:py-6">
        {perspectiveMode === 'nuzul' && <EventCard event={activeEvent} />}
        {perspectiveMode === 'passage_nuzul' && <ChronologicalPassageReader />}
        {perspectiveMode === 'mushaf' && <MushafView />}
        {perspectiveMode === 'perspectives' && <PerspectivesView />}
      </main>

      {/* Persistent Audio Player Bar */}
      <AudioPlayerBar />

      {/* Modals */}
      <TypographyModal
        isOpen={isTypographyOpen}
        onClose={() => setIsTypographyOpen(false)}
      />
      <BookmarksModal
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
      />
      <DataImportExportModal
        isOpen={isDataModalOpen}
        onClose={() => setIsDataModalOpen(false)}
      />

      {/* Sacred Footer */}
      <footer className="w-full mt-auto py-8 border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] text-xs text-[var(--text-muted)] transition-colors">
        <div className="max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 font-bold text-[var(--text-primary)] mb-1.5">
              <img src="/logo.jpeg" alt="Tarteeb-e-Nuzul Emblem" className="w-6 h-6 rounded-lg object-cover border border-emerald-500/40 shadow-xs" />
              <span className="font-serif text-sm">Tarteeb-e-Nuzul (ترتیبِ نزولی)</span>
              <span>—</span>
              <span className="font-urdu">قرآن مجید کی زمانی ترتیب و تفہیم</span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-700 text-white shadow-xs">
                A Quranic Research & Educational Initiative by Maulana Syed Imon Rizvi
              </span>
            </div>
            <p className="max-w-xl text-[11px] leading-relaxed text-[var(--text-secondary)]">
              Exegesis, chronology & Asbab al-Nuzul sourced from authentic Shia scholarship: <em>Al-Tamhid fi Ulum al-Quran</em> (Ayatollah Ma'rifat), <em>Tafsir al-Mizan</em> (Allamah Tabataba'i), <em>Majma' al-Bayan</em> (Shaykh Tabarsi), and translations by Allamah Zeeshan Haider Jawadi & Ayatollah Najafi.
            </p>
          </div>
          <div className="flex flex-col items-center sm:items-end gap-1 text-[11px]">
            <span className="font-urdu text-[12px] text-emerald-800 dark:text-emerald-300 font-bold">
              ایک علمی و قرآنی تحقیقی خدمت — مولانا سید آئمن رضوی
            </span>
            <span className="text-emerald-700 dark:text-emerald-400 font-semibold">
              Prophetic Mission 610 CE – 632 CE (23-Year Divine Timeline)
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default function App() {
  return <AppContent />;
}
