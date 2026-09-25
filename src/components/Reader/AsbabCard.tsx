import React, { useState } from 'react';
import { RevelationEvent } from '@/types/quran';
import { BookOpen, Scroll, ChevronDown, ChevronUp, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';

interface AsbabCardProps {
  event: RevelationEvent;
}

export const AsbabCard: React.FC<AsbabCardProps> = ({ event }) => {
  const [langTab, setLangTab] = useState<'ur' | 'en'>('ur');
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [showIkhtilaf, setShowIkhtilaf] = useState<boolean>(false);

  const asbab = event.asbabUnNuzul;

  return (
    <div className="w-full mb-8 rounded-3xl overflow-hidden sacred-border sacred-shadow bg-[var(--bg-surface-card)] transition-all">
      
      {/* Sacred Header Banner */}
      <div className="bg-gradient-to-r from-emerald-700/15 via-emerald-600/10 to-amber-500/10 p-4 sm:p-5 border-b border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-700 text-white flex items-center justify-center shadow-sm">
            <Scroll className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                شانِ نزول و تاریخی پس منظر
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-600/15 text-emerald-700 dark:text-emerald-300 border border-emerald-600/20 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                Shia Scholarly Tradition (روایاتِ اہل بیتؑ)
              </span>
            </div>
            <h3 className={`text-base sm:text-lg font-bold text-[var(--text-primary)] mt-0.5 ${langTab === 'ur' ? 'font-urdu' : 'font-serif'}`}>
              {langTab === 'ur' ? asbab.titleUrdu : asbab.titleEnglish}
            </h3>
          </div>
        </div>

        {/* Right Controls: Urdu/English Tab & Minimize */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-[var(--bg-surface)] p-1 rounded-xl border border-[var(--border-subtle)]">
            <button
              onClick={() => setLangTab('ur')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                langTab === 'ur'
                  ? 'bg-emerald-700 text-white shadow-sm font-urdu'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              اردو
            </button>
            <button
              onClick={() => setLangTab('en')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                langTab === 'en'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              English
            </button>
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            title={isExpanded ? 'Collapse Context Banner' : 'Expand Context Banner'}
            className="p-1.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all cursor-pointer"
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Body Content */}
      {isExpanded && (
        <div className="p-4 sm:p-6 space-y-4 animate-fade-in">
          
          {/* Summary Box */}
          <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border-s-4 border-s-emerald-600">
            <p
              dir={langTab === 'en' ? 'ltr' : 'rtl'}
              className={`text-sm leading-relaxed text-[var(--text-secondary)] ${
                langTab === 'ur' ? 'font-urdu text-base' : 'font-sans'
              }`}
            >
              {langTab === 'ur' ? asbab.summaryUrdu : asbab.summaryEnglish}
            </p>
          </div>

          {/* Detailed Narrative */}
          <div className="prose max-w-none">
            <h4 className={`text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2 ${langTab === 'ur' ? 'font-urdu' : 'font-sans'}`}>
              {langTab === 'ur' ? 'تفصیلی تاریخی و تفسیری احوال' : 'Detailed Historical & Exegetical Account'}
            </h4>
            <p
              dir={langTab === 'en' ? 'ltr' : 'rtl'}
              className={`text-sm sm:text-base leading-relaxed text-[var(--text-primary)] ${
                langTab === 'ur' ? 'font-urdu text-lg leading-loose' : 'font-sans leading-relaxed'
              }`}
            >
              {langTab === 'ur' ? asbab.detailedContextUrdu : asbab.detailedContextEnglish}
            </p>
          </div>

          {/* Sources Section */}
          <div className="pt-3 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-[var(--text-muted)] flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                المصادر (Sources):
              </span>
              {asbab.sources.map((src, i) => (
                <span
                  key={i}
                  className="px-2.5 py-0.5 rounded-lg text-xs bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-secondary)] font-medium"
                >
                  {src}
                </span>
              ))}
            </div>

            {/* Ikhtilaf / Scholarly Nuances Toggle */}
            {asbab.scholarlyNotes && asbab.scholarlyNotes.length > 0 && (
              <button
                onClick={() => setShowIkhtilaf(!showIkhtilaf)}
                className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1"
              >
                <AlertCircle className="w-3.5 h-3.5" />
                <span>
                  {showIkhtilaf ? 'اختلافی و تحقیقی نکات چھپائیں' : 'اختلافی و تحقیقی نکات (Scholarly Notes)'}
                </span>
              </button>
            )}
          </div>

          {/* Scholarly Nuances Accordion */}
          {showIkhtilaf && asbab.scholarlyNotes && (
            <div className="mt-3 p-4 rounded-2xl bg-emerald-950/5 dark:bg-emerald-950/30 border border-emerald-500/20 space-y-3 animate-fade-in">
              <h5 className="text-xs font-bold text-emerald-900 dark:text-emerald-200 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                تحقیقی و تقابلی آراء (Scholarly Opinions & Placement Nuances)
              </h5>
              {asbab.scholarlyNotes.map((note, idx) => (
                <div key={idx} className="text-xs space-y-1">
                  <div className="font-bold text-[var(--text-primary)]">{note.topic}</div>
                  <div className="font-urdu text-[var(--text-secondary)] leading-relaxed">
                    <strong>مؤقفِ شیعہ:</strong> {note.shiaView}
                  </div>
                  {note.comparativeNote && (
                    <div className="text-[var(--text-muted)] font-sans italic">
                      Note: {note.comparativeNote}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

        </div>
      )}

    </div>
  );
};
