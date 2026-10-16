import React, { useState } from 'react';
import { X, ShieldAlert, Cpu, BookOpen, CheckCircle, Scale, Sparkles } from 'lucide-react';

interface DisclaimerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DisclaimerModal: React.FC<DisclaimerModalProps> = ({ isOpen, onClose }) => {
  const [langTab, setLangTab] = useState<'both' | 'urdu' | 'english'>('both');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-3xl rounded-3xl sacred-glass sacred-border sacred-shadow bg-[var(--bg-surface-elevated)] max-h-[90vh] flex flex-col overflow-hidden border border-amber-500/30">
        
        {/* Header */}
        <div className="p-5 sm:p-6 pb-4 border-b border-[var(--border-subtle)] bg-linear-to-r from-amber-500/10 via-emerald-500/5 to-transparent flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-600/20 border border-amber-500/40 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 shadow-inner">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                  AI Governance
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                  Human-in-the-Loop (HITL)
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-700 dark:text-blue-300 border border-blue-500/30">
                  Hawzah Oversight
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] font-serif mt-1">
                Methodological Transparency & Scholarly Disclaimer / علمی و شرعی ضابطۂ کار
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 rounded-full hover:bg-[var(--bg-surface)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors shrink-0 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center justify-between px-6 py-2.5 bg-[var(--bg-surface)]/60 border-b border-[var(--border-subtle)] text-xs">
          <span className="text-[var(--text-muted)] hidden sm:inline">Select display language / زبان کا انتخاب:</span>
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-subtle)]">
            <button
              onClick={() => setLangTab('both')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                langTab === 'both'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              Bilingual (دونوں زبانیں)
            </button>
            <button
              onClick={() => setLangTab('urdu')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all font-urdu cursor-pointer ${
                langTab === 'urdu'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              اردو ضابطہ و وضاحت
            </button>
            <button
              onClick={() => setLangTab('english')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                langTab === 'english'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              English Framework
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-sm leading-relaxed">
          
          {/* URDU SECTION */}
          {(langTab === 'both' || langTab === 'urdu') && (
            <div className="p-5 rounded-2xl bg-amber-500/5 border border-amber-500/25 space-y-4 font-urdu text-right" dir="rtl">
              <div className="flex items-center justify-start gap-2 border-b border-amber-500/20 pb-3">
                <Sparkles className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
                <h4 className="text-base sm:text-lg font-bold text-amber-900 dark:text-amber-200">
                  علمی شفافیت، جدید ٹیکنالوجی (AI) کا ضابطۂ کار اور شرعی وضاحت
                </h4>
              </div>

              <div className="space-y-4 text-[13px] sm:text-[14px] text-[var(--text-primary)] leading-loose">
                <div className="p-3.5 rounded-xl bg-[var(--bg-surface)] border border-amber-500/20 space-y-1.5">
                  <h5 className="font-bold text-amber-800 dark:text-amber-300 text-[14px] flex items-center justify-start gap-2">
                    <span className="w-6 h-6 rounded-lg bg-amber-600/20 text-amber-700 dark:text-amber-300 inline-flex items-center justify-center text-xs font-sans">1</span>
                    <span>۱. ٹیکنالوجی اور حوزوی علمی نگرانی (Human-in-the-Loop):</span>
                  </h5>
                  <p className="text-[var(--text-secondary)] pr-8">
                    منظومہ ترتیبِ نزولی (Project Nuzooli) میں جدید کمپیوٹیشنل ماڈلز اور مصنوعی ذہانت (AI) کو صرف بطورِ تحقیقی و انتظامی معاون استعمال کیا گیا ہے، تاکہ تفسیری و تاریخی مواد کی درجہ بندی اور تقابلی جائزے کو تیز تر بنایا جا سکے۔ پلیٹ فارم پر موجود تمام تر تاریخی مراحل، تدریجِ احکام اور مآخذ کی حتمی جانچ اور تصدیق ۱۱ سالہ روایتی حوزوی علوم (<em>درسِ نظامی / حوزہ علمیہ</em>) کی روشنی میں باقاعدہ علمی بنیادوں پر کی جاتی ہے۔
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[var(--bg-surface)] border border-amber-500/20 space-y-1.5">
                  <h5 className="font-bold text-amber-800 dark:text-amber-300 text-[14px] flex items-center justify-start gap-2">
                    <span className="w-6 h-6 rounded-lg bg-amber-600/20 text-amber-700 dark:text-amber-300 inline-flex items-center justify-center text-xs font-sans">2</span>
                    <span>۲. تحقیقی و تاریخی حیثیت (عدمِ فتویٰ):</span>
                  </h5>
                  <p className="text-[var(--text-secondary)] pr-8">
                    یہ پلیٹ فارم خالصتاً ایک علمی و قرآنی ریسرچ پروجیکٹ ہے جس کا مقصد ترتیبِ نزولی اور تاریخی سیاق و سباق کا تحقیقی مطالعہ ہے۔ یہ کسی بھی طرح سے کوئی شرعی فتویٰ یا حتمی مذہبی حکم نہیں ہے، اور نہ ہی اس سے مصحفِ عثمانی کی متفقہ اور متواتر تلاوتی ترتیب میں کسی تغیر کا ادعا مقصود ہے۔
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[var(--bg-surface)] border border-amber-500/20 space-y-1.5">
                  <h5 className="font-bold text-amber-800 dark:text-amber-300 text-[14px] flex items-center justify-start gap-2">
                    <span className="w-6 h-6 rounded-lg bg-amber-600/20 text-amber-700 dark:text-amber-300 inline-flex items-center justify-center text-xs font-sans">3</span>
                    <span>۳. کلاسیکی و مستند مآخذ کی پاسداری:</span>
                  </h5>
                  <p className="text-[var(--text-secondary)] pr-8">
                    پلیٹ فارم پر تمام تر تراتیب و اسباب کو ائمۂ تفسیر—خصوصاً آیت اللہ محمد ہادی معرفتؒ (<em>التمہید فی علوم القرآن</em>)، علامہ محمد حسین طباطبائیؒ (<em>تفسیر المیزان</em>)، اور امام واحدیؒ (<em>اسباب النزول</em>)—کے مستند مآخذ سے مربوط کیا گیا ہے۔ اوپن سائنس کے اصولوں کے تحت یہ پروجیکٹ مسلسل علمی نظرِ ثانی اور محققین کی آراء کے لیے کھلا ہے۔
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[var(--bg-surface)] border border-amber-500/20 space-y-1.5">
                  <h5 className="font-bold text-amber-800 dark:text-amber-300 text-[14px] flex items-center justify-start gap-2">
                    <span className="w-6 h-6 rounded-lg bg-amber-600/20 text-amber-700 dark:text-amber-300 inline-flex items-center justify-center text-xs font-sans">4</span>
                    <span>۴. براءتِ ذمہ داری (قانونی و شرعی استثنا):</span>
                  </h5>
                  <p className="text-[var(--text-secondary)] pr-8">
                    یہ تمام تر تحقیقی مواد اور ڈیٹاسیٹس بلا معاوضہ، صرف علمی و تحقیقی استفادے کے لیے فراہم کیے جا رہے ہیں۔ مرتبین، محقق اور معاونین کسی بھی نادانستہ خطاء، ذاتی تفہیم یا خارجی تعبیر کی شرعی یا قانونی ذمہ داری سے مکمل براءت کا اعلان کرتے ہیں۔
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ENGLISH SECTION */}
          {(langTab === 'both' || langTab === 'english') && (
            <div className="p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/25 space-y-4 text-left" dir="ltr">
              <div className="flex items-center justify-start gap-2 border-b border-emerald-500/20 pb-3">
                <Scale className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <h4 className="text-sm sm:text-base font-bold text-emerald-900 dark:text-emerald-200 uppercase tracking-wide">
                  Methodological Transparency, AI Governance & Scholarly Disclaimer
                </h4>
              </div>

              <div className="space-y-4 text-xs sm:text-[13px] text-[var(--text-primary)]">
                
                {/* Point 1 */}
                <div className="p-3.5 rounded-xl bg-[var(--bg-surface)] border border-emerald-500/20 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span className="font-bold text-emerald-800 dark:text-emerald-300">
                      1. Human-in-the-Loop (HITL) Computational Architecture:
                    </span>
                  </div>
                  <p className="text-[var(--text-secondary)] pl-6 leading-relaxed">
                    Project Nuzooli utilizes advanced natural language processing (NLP) and large language models (LLMs) strictly as computational research instruments—accelerating corpus indexing, structural cross-referencing, and multi-perspective chronological synthesis. All algorithmic outputs, thematic taxonomies, and diachronic alignments are critically audited, cross-verified, and contextualized under traditional philological and seminary-trained (<em>Hawzah / Dars-e-Nizami</em>) oversight.
                  </p>
                </div>

                {/* Point 2 */}
                <div className="p-3.5 rounded-xl bg-[var(--bg-surface)] border border-emerald-500/20 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span className="font-bold text-emerald-800 dark:text-emerald-300">
                      2. Non-Prescriptive & Historical-Analytical Scope:
                    </span>
                  </div>
                  <p className="text-[var(--text-secondary)] pl-6 leading-relaxed">
                    This platform is an academic research instrument dedicated to diachronic text exploration (<em>Tarteeb-e-Nuzul</em>) and comparative legal pedagogy (<em>Tadrij al-Ahkam</em>). It does not constitute a canonical legislative edict (<em>fatwa</em>), nor does it seek to alter the universally consecrated canonical sequence of the <em>Uthmanic Mushaf</em>. All chronological sequences are investigative frameworks grounded in classical historical reports and modern hermeneutical models.
                  </p>
                </div>

                {/* Point 3 */}
                <div className="p-3.5 rounded-xl bg-[var(--bg-surface)] border border-emerald-500/20 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span className="font-bold text-emerald-800 dark:text-emerald-300">
                      3. Primary Source Provenance & Continuous Peer Review:
                    </span>
                  </div>
                  <p className="text-[var(--text-secondary)] pl-6 leading-relaxed">
                    While data models strive for the highest philological fidelity against canonical authorities—principally Ayatollah Muhammad Hadi Ma'rifat's <em>Al-Tamhid fi 'Ulum al-Qur'an</em>, Allamah Muhammad Husayn Tabataba'i's <em>Tafsir al-Mizan</em>, and classical <em>Asbab al-Nuzul</em> literature—this repository operates under open-science principles. It is subject to continuous scholarly peer review, critical refinement, and academic versioning. Users and researchers are encouraged to verify textual contexts directly against cited classical editions.
                  </p>
                </div>

                {/* Point 4 */}
                <div className="p-3.5 rounded-xl bg-[var(--bg-surface)] border border-emerald-500/20 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                    <span className="font-bold text-amber-800 dark:text-amber-300">
                      4. Complete Limitation of Theological & Legal Liability:
                    </span>
                  </div>
                  <p className="text-[var(--text-secondary)] pl-6 leading-relaxed">
                    All data, analytical charts, and exportable datasets are made accessible strictly for non-commercial academic inquiry, scientific research, and pedagogical study. The principal investigator, developers, and affiliated contributors disclaim any religious, sectarian, or legal liability for any third-party interpretations, typographical oversights, or derivative uses of this computational framework.
                  </p>
                </div>

              </div>
            </div>
          )}

          {/* Quick Notice Callout */}
          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-300 text-xs">
            <CheckCircle className="w-4 h-4 shrink-0" />
            <span>
              By using this application, you acknowledge its experimental, scholarly, and educational nature, accepting that all materials are subject to continuous Hawzah-trained review and open-science refinement.
            </span>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-[11px] text-[var(--text-muted)] text-center sm:text-left">
            Project Nuzooli &bull; Version 2.0.0 &bull; Maulana Syed Imon Rizvi
          </div>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-linear-to-r from-amber-600 to-emerald-700 hover:from-amber-700 hover:to-emerald-800 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <CheckCircle className="w-4 h-4" />
            <span>I Understand & Acknowledge (تفہیم و توثیق)</span>
          </button>
        </div>

      </div>
    </div>
  );
};
