import React from 'react';
import { useQuran } from '@/context/QuranContext';
import { Globe } from 'lucide-react';

interface LanguageToggleProps {
  className?: string;
  compact?: boolean;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({ className = '', compact = false }) => {
  const { language, setLanguage } = useQuran();

  return (
    <div
      dir="ltr"
      role="group"
      aria-label="Language Selector"
      className={`inline-flex items-center p-0.5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-2xs select-none transition-all ${className}`}
    >
      <div className="flex items-center gap-0.5 relative" dir="ltr">
        {/* EN Button */}
        <button
          type="button"
          onClick={() => setLanguage('en')}
          title="Switch to English"
          aria-pressed={language === 'en'}
          className={`flex items-center justify-center gap-1 px-2.5 py-1 text-xs rounded-xl font-bold transition-all cursor-pointer ${
            language === 'en'
              ? 'bg-emerald-700 text-white shadow-xs ring-1 ring-emerald-500/50'
              : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)]'
          }`}
        >
          {!compact && <Globe className={`w-3 h-3 ${language === 'en' ? 'text-amber-300' : 'text-emerald-600'}`} />}
          <span className="font-sans tracking-wide">EN</span>
        </button>

        {/* Divider */}
        <span className="w-px h-3.5 bg-[var(--border-subtle)] opacity-40 mx-0.5" />

        {/* Urdu Button */}
        <button
          type="button"
          onClick={() => setLanguage('ur')}
          title="اردو زبان منتخب کریں"
          aria-pressed={language === 'ur'}
          className={`flex items-center justify-center gap-1 px-2.5 py-1 text-xs rounded-xl font-bold transition-all cursor-pointer font-urdu ${
            language === 'ur'
              ? 'bg-emerald-700 text-white shadow-xs ring-1 ring-emerald-500/50'
              : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)]'
          }`}
        >
          <span className="leading-tight">اردو</span>
        </button>
      </div>
    </div>
  );
};
