import React, { useState } from 'react';
import { X, ShieldAlert, AlertTriangle, Cpu, BookOpen, CheckCircle, Scale } from 'lucide-react';

interface DisclaimerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DisclaimerModal: React.FC<DisclaimerModalProps> = ({ isOpen, onClose }) => {
  const [langTab, setLangTab] = useState<'both' | 'urdu' | 'english'>('both');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-2xl rounded-3xl sacred-glass sacred-border sacred-shadow bg-[var(--bg-surface-elevated)] max-h-[90vh] flex flex-col overflow-hidden border border-amber-500/30">
        
        {/* Header */}
        <div className="p-5 sm:p-6 pb-4 border-b border-[var(--border-subtle)] bg-linear-to-r from-amber-500/10 via-emerald-500/5 to-transparent flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-600/20 border border-amber-500/40 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 shadow-inner">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                  Experimental & Academic Research
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                  AI-Assisted Study
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] font-serif mt-1">
                Academic & AI Research Notice / علمی و تحقیقی وضاحت
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 rounded-full hover:bg-[var(--bg-surface)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center justify-between px-6 py-2.5 bg-[var(--bg-surface)]/60 border-b border-[var(--border-subtle)] text-xs">
          <span className="text-[var(--text-muted)] hidden sm:inline">Select display language:</span>
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-subtle)]">
            <button
              onClick={() => setLangTab('both')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                langTab === 'both'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              Bilingual (دونوں)
            </button>
            <button
              onClick={() => setLangTab('urdu')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all font-urdu ${
                langTab === 'urdu'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              اردو وضاحت
            </button>
            <button
              onClick={() => setLangTab('english')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                langTab === 'english'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              English Notice
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-sm leading-relaxed">
          
          {/* URDU SECTION */}
          {(langTab === 'both' || langTab === 'urdu') && (
            <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-3 font-urdu text-right" dir="rtl">
              <div className="flex items-center justify-start gap-2 border-b border-amber-500/20 pb-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                <h4 className="text-base font-bold text-amber-800 dark:text-amber-300">
                  علمی و تحقیقی دستبرداری، اعتذار اور عدمِ ذمہ داری کی وضاحت
                </h4>
              </div>

              <div className="space-y-3 text-[13px] text-[var(--text-primary)] leading-loose">
                <p>
                  <strong>۱. تجرباتی نوعیت (Experimental Nature):</strong>{' '}
                  یہ پلیٹ فارم قرآن مجید کی زمانی و تاریخی ترتیبِ نزول، اسبابِ نزول اور قرآنی مقطوعات کے ربط کو سمجھنے کی ایک جدید، تجرباتی (Experimental) اور تعلیمی کاوش ہے۔ اس میں مختلف تحقیقی ماڈلز اور تقابلی زوایا آزمائے جا رہے ہیں اور یہ منصوبہ مسلسل ارتقائی و تدریجی مرحلے میں ہے۔
                </p>

                <p>
                  <strong>۲. مصنوعی ذہانت (AI) کی شمولیت:</strong>{' '}
                  اس منصوبے میں وسیع قرآنی و تاریخی مواد کے استخراج، موازنے، زمانی نقشہ بندی اور موضوعاتی زمرہ بندی کے عمل میں جدید الگورتھمز اور مصنوعی ذہانت (Artificial Intelligence - AI) کی معاونت بھی شامل کی گئی ہے۔
                </p>

                <p>
                  <strong>۳. مکمل براءتِ ذمہ (Disclaimer of Liability):</strong>{' '}
                  اس ویب سائٹ و ایپلیکیشن پر پیش کردہ معلومات محض فکری، تعلیمی اور تحقیقی غور و فکر کی غرض سے مرتب کی گئی ہیں۔ اس میں کسی بھی قسم کے سہو، نادانستہ خطاء، تکنیکی لغزش یا الگورتھمک تفسیری فرق کی کوئی قانونی، شرعی یا مذہبی ذمہ داری مرتب کنندہ، ڈویلپرز یا معاونین پر عائد نہیں ہوتی۔
                </p>

                <p>
                  <strong>۴. مستند تفاسیر و علمائے کرام سے تصدیق:</strong>{' '}
                  یہ پلیٹ فارم کسی بھی طرح روایتی مصحف شریف کی تلاوت یا جید علمائے دین و مراجعِ عظام کے فتاویٰ و مستند تفاسیر کا نعم البدل نہیں ہے۔ محققین و قارئین سے پرزور گزارش ہے کہ تمام تاریخی، زمانی اور فقہی نتائج کی حتمی توثیق کے لیے مستند کلاسیکی کتبِ تفاسیر اور مستند مذہبی اساتذہ سے ہی رجوع فرمائیں۔
                </p>
              </div>
            </div>
          )}

          {/* ENGLISH SECTION */}
          {(langTab === 'both' || langTab === 'english') && (
            <div className="p-4 sm:p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 space-y-3 text-left" dir="ltr">
              <div className="flex items-center justify-start gap-2 border-b border-emerald-500/20 pb-2">
                <Scale className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <h4 className="text-sm font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wide">
                  Academic Research, AI Integration & Legal Disclaimer
                </h4>
              </div>

              <div className="space-y-3 text-xs sm:text-[13px] text-[var(--text-primary)]">
                <div className="flex items-start gap-2.5">
                  <Cpu className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <p>
                    <strong>Experimental & AI-Assisted Exploration:</strong> This platform is an ongoing academic initiative exploring computational representations of the chronological order of revelation (Tarteeb-e-Nuzul). Computational intelligence (AI) and automated analytical models are utilized to process, cross-reference, and structure vast historical exegesis data.
                  </p>
                </div>

                <div className="flex items-start gap-2.5">
                  <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <p>
                    <strong>Complete Disclaimer of Liability:</strong> All information, chronologies, thematic matrices, and historical links are provided strictly for exploratory, academic, and non-commercial educational purposes. The compilers, developers, and institutions assume <strong>no religious, doctrinal, or legal liability whatsoever</strong> for any inadvertent errors, algorithmic discrepancies, omissions, or experimental hypotheses.
                  </p>
                </div>

                <div className="flex items-start gap-2.5">
                  <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <p>
                    <strong>Requirement of Independent Verification:</strong> This application does not constitute a canonical ruling or replace established theological authority. Users are strongly urged to independently verify all contexts and citations directly with classical exegetical references (e.g., <em>Al-Tamhid</em>, <em>Tafsir al-Mizan</em>, <em>Majma' al-Bayan</em>) and accredited scholars.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Quick Notice Callout */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-300 text-xs">
            <CheckCircle className="w-4 h-4 shrink-0" />
            <span>
              By using this application, you acknowledge its experimental and educational nature, accepting that all materials are subject to continuous review and refinement.
            </span>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-[11px] text-[var(--text-muted)] text-center sm:text-left">
            Tarteeb-e-Nuzul Research &bull; Version 2.0
          </div>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-emerald-700 hover:from-amber-700 hover:to-emerald-800 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-4 h-4" />
            <span>I Understand & Acknowledge (تفہیم و توثیق)</span>
          </button>
        </div>

      </div>
    </div>
  );
};
