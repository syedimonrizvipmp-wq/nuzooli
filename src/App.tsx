import React, { useState } from 'react';
import { useQuran } from '@/context/QuranContext';
import { Navbar } from '@/components/Header/Navbar';
import { DisclaimerBanner } from '@/components/Header/DisclaimerBanner';
import { TimeRibbon } from '@/components/Timeline/TimeRibbon';
import { EventCard } from '@/components/Reader/EventCard';
import { MushafView } from '@/components/Reader/MushafView';
import { PerspectivesView } from '@/components/Perspectives/PerspectivesView';
import { ChronologicalPassageReader } from '@/components/Reader/ChronologicalPassageReader';
import { TypographyModal } from '@/components/Modals/TypographyModal';
import { BookmarksModal } from '@/components/Modals/BookmarksModal';
import { DataImportExportModal } from '@/components/Modals/DataImportExportModal';
import { DisclaimerModal } from '@/components/Modals/DisclaimerModal';
import { AudioPlayerBar } from '@/components/Reader/AudioPlayerBar';
import { ShieldAlert } from 'lucide-react';

export const AppContent: React.FC = () => {
  const { perspectiveMode, activeEvent } = useQuran();

  const [isTypographyOpen, setIsTypographyOpen] = useState(false);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
  const [isDataModalOpen, setIsDataModalOpen] = useState(false);
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors">
      
      {/* Top Academic & AI Research Notice Banner */}
      <DisclaimerBanner onOpenDisclaimerModal={() => setIsDisclaimerOpen(true)} />

      {/* Top Navigation */}
      <Navbar
        onOpenTypography={() => setIsTypographyOpen(true)}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        onOpenDataModal={() => setIsDataModalOpen(true)}
        onOpenDisclaimer={() => setIsDisclaimerOpen(true)}
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
      <DisclaimerModal
        isOpen={isDisclaimerOpen}
        onClose={() => setIsDisclaimerOpen(false)}
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

        {/* Academic & AI Disclaimer Footer Notice */}
        <div className="max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 mt-6 pt-6 border-t border-[var(--border-subtle)]">
          <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/5 border border-amber-500/25 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-start gap-3 text-left">
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/30">
                <ShieldAlert className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-bold text-amber-800 dark:text-amber-300 text-xs">
                    Academic Disclaimer & AI Integration Notice / علمی و تحقیقی دستبرداری
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                    Experimental (تجرباتی)
                  </span>
                </div>
                <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed max-w-3xl">
                  This platform is an experimental educational initiative utilizing AI-assisted modeling for chronological research. The creator assumes no religious or legal liability. Please cross-reference all historical contexts with certified classical exegeses and religious scholars.
                </p>
                <p className="text-[11px] font-urdu text-[var(--text-secondary)] text-right leading-relaxed" dir="rtl">
                  یہ ایک خالصتاً تعلیمی و تجرباتی منصوبہ ہے جس میں AI معاونت شامل ہے۔ مصنف یا ڈویلپرز پر کوئی شرعی یا قانونی ذمہ داری عائد نہیں ہوتی؛ حتمی تصدیق کے لیے مستند تفاسیر و علمائے کرام سے رجوع کریں۔
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsDisclaimerOpen(true)}
              className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-xs transition-colors shrink-0 cursor-pointer flex items-center gap-1.5"
            >
              <span>مکمل دستبرداری پڑھیں (Full Disclaimer)</span>
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default function App() {
  return <AppContent />;
}

