import React from 'react';
import { useQuran } from '@/context/QuranContext';
import { URDU_TRANSLATORS, ENGLISH_TRANSLATORS } from '@/data/translations';
import { X, Sliders, Check } from 'lucide-react';

interface TypographyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TypographyModal: React.FC<TypographyModalProps> = ({ isOpen, onClose }) => {
  const { typography, updateTypography } = useQuran();

  if (!isOpen) return null;

  const arabicFonts = [
    { id: 'Amiri Quran', name: 'Amiri Quran (اميري قرآن)' },
    { id: 'KFGQPC Uthman Taha Naskh', name: 'KFGQPC Uthman Taha (مصحف مدینہ)' },
    { id: 'Al Qalam Quran Majeed Web', name: 'Al Qalam Quran Majeed (القلم)' },
    { id: 'Scheherazade New', name: 'Scheherazade New (شہرزاد)' },
    { id: 'Noto Naskh Arabic', name: 'Noto Naskh Arabic (نسخ)' },
  ];

  const urduFonts = [
    { id: 'Noto Nastaliq Urdu', name: 'Noto Nastaliq Urdu (نستعلیق)' },
    { id: 'Gulzar', name: 'Gulzar (گلزار نستعلیق)' },
    { id: 'Noto Naskh Arabic', name: 'Noto Naskh Urdu (نسخ اردو)' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-xl rounded-3xl sacred-glass sacred-border sacred-shadow bg-[var(--bg-surface-elevated)] p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-[var(--border-subtle)]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[var(--text-primary)] font-serif">
                Sacred Typography & Script Settings
              </h3>
              <p className="text-xs text-[var(--text-muted)]">
                خوشخطی و رسم الخط کی ترتیبات
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[var(--bg-surface)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          
          {/* 1. Arabic Script Family */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">
              Arabic Quranic Script (عربی رسم الخط)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {arabicFonts.map((f) => (
                <button
                  key={f.id}
                  onClick={() => updateTypography({ arabicFont: f.id })}
                  className={`p-3 rounded-2xl text-xs text-left border transition-all flex items-center justify-between ${
                    typography.arabicFont === f.id
                      ? 'bg-emerald-600/15 border-emerald-600 text-emerald-800 dark:text-emerald-200 font-bold shadow-sm'
                      : 'bg-[var(--bg-surface)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-emerald-500/40'
                  }`}
                >
                  <span style={{ fontFamily: f.id }}>{f.name}</span>
                  {typography.arabicFont === f.id && <Check className="w-4 h-4 text-emerald-600" />}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Urdu Script Family */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">
              Urdu Script (اردو خط)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {urduFonts.map((f) => (
                <button
                  key={f.id}
                  onClick={() => updateTypography({ urduFont: f.id })}
                  className={`p-3 rounded-2xl text-xs text-left border transition-all flex items-center justify-between ${
                    typography.urduFont === f.id
                      ? 'bg-emerald-600/15 border-emerald-600 text-emerald-800 dark:text-emerald-200 font-bold shadow-sm'
                      : 'bg-[var(--bg-surface)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-emerald-500/40'
                  }`}
                >
                  <span style={{ fontFamily: f.id }}>{f.name}</span>
                  {typography.urduFont === f.id && <Check className="w-4 h-4 text-emerald-600" />}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Font Size Sliders */}
          <div className="space-y-4 p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
            
            {/* Arabic Font Size */}
            <div>
              <div className="flex items-center justify-between mb-1.5 text-xs font-bold text-[var(--text-primary)]">
                <span>Arabic Ayah Size (حجمِ خطِ عربی)</span>
                <span className="text-emerald-700 dark:text-emerald-400 font-mono">{typography.arabicFontSize}px</span>
              </div>
              <input
                type="range"
                min="20"
                max="48"
                step="1"
                value={typography.arabicFontSize}
                onChange={(e) => updateTypography({ arabicFontSize: parseInt(e.target.value, 10) })}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

            {/* Translation Font Size */}
            <div>
              <div className="flex items-center justify-between mb-1.5 text-xs font-bold text-[var(--text-primary)]">
                <span>Translation Font Size (حجمِ ترجمہ)</span>
                <span className="text-emerald-700 dark:text-emerald-400 font-mono">{typography.translationFontSize}px</span>
              </div>
              <input
                type="range"
                min="14"
                max="28"
                step="1"
                value={typography.translationFontSize}
                onChange={(e) => updateTypography({ translationFontSize: parseInt(e.target.value, 10) })}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

            {/* Line Height / Leading */}
            <div>
              <div className="flex items-center justify-between mb-1.5 text-xs font-bold text-[var(--text-primary)]">
                <span>Line Spacing / Leading (سطروں کا فاصلہ)</span>
                <span className="text-emerald-700 dark:text-emerald-400 font-mono">{typography.lineHeight}x</span>
              </div>
              <input
                type="range"
                min="1.8"
                max="3.2"
                step="0.1"
                value={typography.lineHeight}
                onChange={(e) => updateTypography({ lineHeight: parseFloat(e.target.value) })}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

          </div>

          {/* 4. Translators Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Urdu Translator */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">
                Urdu Translator (مترجم اردو)
              </label>
              <div className="space-y-1.5">
                {URDU_TRANSLATORS.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => updateTypography({ urduTranslator: t.id as any })}
                    className={`w-full p-2.5 rounded-xl text-xs text-left border transition-all flex items-center justify-between ${
                      typography.urduTranslator === t.id
                        ? 'bg-emerald-600/15 border-emerald-600 text-emerald-800 dark:text-emerald-200 font-bold'
                        : 'bg-[var(--bg-surface)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-emerald-500/40'
                    }`}
                  >
                    <div>
                      <div>{t.name}</div>
                      <div className="text-[10px] text-[var(--text-muted)] font-urdu">{t.nameUrdu}</div>
                    </div>
                    {typography.urduTranslator === t.id && <Check className="w-4 h-4 text-emerald-600" />}
                  </button>
                ))}
              </div>
            </div>

            {/* English Translator */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">
                English Translator
              </label>
              <div className="space-y-1.5">
                {ENGLISH_TRANSLATORS.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => updateTypography({ englishTranslator: t.id as any })}
                    className={`w-full p-2.5 rounded-xl text-xs text-left border transition-all flex items-center justify-between ${
                      typography.englishTranslator === t.id
                        ? 'bg-emerald-600/15 border-emerald-600 text-emerald-800 dark:text-emerald-200 font-bold'
                        : 'bg-[var(--bg-surface)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-emerald-500/40'
                    }`}
                  >
                    <div>
                      <div>{t.name}</div>
                      <div className="text-[10px] text-[var(--text-muted)]">{t.translator}</div>
                    </div>
                    {typography.englishTranslator === t.id && <Check className="w-4 h-4 text-emerald-600" />}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Visibility Toggles */}
          <div className="flex items-center gap-6 pt-2">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[var(--text-primary)]">
              <input
                type="checkbox"
                checked={typography.showUrdu}
                onChange={(e) => updateTypography({ showUrdu: e.target.checked })}
                className="w-4 h-4 accent-emerald-600 rounded cursor-pointer"
              />
              <span>Show Urdu Translation (اردو ترجمہ دکھائیں)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[var(--text-primary)]">
              <input
                type="checkbox"
                checked={typography.showEnglish}
                onChange={(e) => updateTypography({ showEnglish: e.target.checked })}
                className="w-4 h-4 accent-emerald-600 rounded cursor-pointer"
              />
              <span>Show English Translation</span>
            </label>
          </div>

        </div>

      </div>
    </div>
  );
};
