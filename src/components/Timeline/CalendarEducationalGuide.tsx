import React, { useState } from 'react';
import {
  CALENDAR_GUIDE_CHAPTERS,
} from '../../data/calendarGuideData';
import {
  Clock,
  Compass,
  Moon,
  GitBranch,
  BookOpen,
  Calculator,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

interface Props {
  onBackToTimeline?: () => void;
}

export const CalendarEducationalGuide: React.FC<Props> = ({ onBackToTimeline }) => {
  const [selectedChapterId, setSelectedChapterId] = useState<string>(
    CALENDAR_GUIDE_CHAPTERS[0].id
  );
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Interactive Year Distance Calculator State
  const [inputYear, setInputYear] = useState<number>(570);
  const [isInputBce, setIsInputBce] = useState<boolean>(false);

  const activeChapter =
    CALENDAR_GUIDE_CHAPTERS.find((c) => c.id === selectedChapterId) ||
    CALENDAR_GUIDE_CHAPTERS[0];

  // Calculation for student interactive tool
  const currentYear = 2026;
  const calculatedYearsAgo = isInputBce
    ? currentYear + Math.abs(inputYear)
    : currentYear - inputYear;

  // Derive historical era
  const getEraInsight = () => {
    if (isInputBce) {
      if (inputYear >= 3000) return 'عہدِ آدمؑ و نوحؑ (قبل از تاریخ و طوفانِ عظیم)';
      if (inputYear >= 1500) return 'عہدِ ابراہیمؑ و اسماعیلؑ (تعمیرِ کعبہ کا دور)';
      if (inputYear >= 1000) return 'عہدِ موسیٰ کلیم اللہؑ (خروجِ مصر و نزولِ تورات)';
      return 'عہدِ داؤدؑ و سلیمانؑ تا قبلِ ولادتِ عیسیٰؑ';
    } else {
      if (inputYear >= 1 && inputYear < 570) return 'دورِ بعدِ مسیح تا قبلِ ولادتِ خاتم الانبیاءؐ';
      if (inputYear >= 570 && inputYear <= 622) {
        const aamAlFeel = inputYear - 570 + 1;
        const bithat = inputYear >= 610 ? inputYear - 610 + 1 : undefined;
        return `دورِ عام الفیل (سال ${aamAlFeel} عام الفیل)${bithat ? ` | سال ${bithat} بعثتِ نبویؐ` : ''}`;
      }
      if (inputYear >= 622) {
        const approxHijri = Math.round((inputYear - 622) * 1.03) + 1;
        return `اسلامی ہجری دور (تقریباً سال ${approxHijri} ہجری قمری)`;
      }
      return 'عہدِ قدیم';
    }
  };

  const getChapterIcon = (iconName: string) => {
    switch (iconName) {
      case 'Clock':
        return <Clock className="w-5 h-5 text-amber-500" />;
      case 'Compass':
        return <Compass className="w-5 h-5 text-emerald-500" />;
      case 'Moon':
        return <Moon className="w-5 h-5 text-cyan-500" />;
      case 'GitBranch':
        return <GitBranch className="w-5 h-5 text-purple-500" />;
      default:
        return <BookOpen className="w-5 h-5 text-amber-500" />;
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 font-sans" dir="rtl">
      {/* ── HEADER BANNER ── */}
      <div className="relative rounded-3xl p-6 sm:p-10 mb-8 bg-gradient-to-r from-emerald-950 via-teal-900 to-indigo-950 text-white border border-emerald-500/30 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-bold font-urdu">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>جامع تعلیمی و تدریسی گائیڈ بک برائے طلباء و اساتذہ</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold font-urdu leading-tight">
              منشورِ تقاویم: وقت، تاریخ اور تقویمی نظام کا الٰہی سفر
            </h1>
            <p className="text-sm sm:text-base text-emerald-100/90 font-urdu max-w-3xl leading-relaxed">
              حضرت آدمؑ سے لے کر رسولِ اعظمؐ تک، قبلِ مسیح کی الٹی گنتی، عام الفیل کا ۵۳ سالہ پل اور ہجری تقویم کے آغاز کے تمام اسرار و رموز کو ایک سلجھے ہوئے انداز میں سمجھیے۔
            </p>
          </div>

          {onBackToTimeline && (
            <button
              onClick={onBackToTimeline}
              className="self-start md:self-auto shrink-0 flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-bold font-urdu transition-all active:scale-95 shadow-md cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
              <span>ٹائم لائن پر واپس جائیں</span>
            </button>
          )}
        </div>
      </div>

      {/* ── INTERACTIVE STUDENT CALCULATOR CARD ── */}
      <div className="mb-10 rounded-3xl p-6 sm:p-8 bg-[var(--bg-surface)] border border-amber-500/30 shadow-xl relative overflow-hidden">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-urdu font-bold text-lg text-[var(--text-primary)]">
              انٹرایکٹو تعلیمی آلہ: "آج سے فاصلۂ زمانی و تقویمی شناخت کار"
            </h2>
            <p className="text-xs text-[var(--text-muted)] font-urdu">
              کوئی بھی سال درج کر کے جانیے کہ آج (سال ۲۰۲۶ء) سے اس کا فاصلہ کتنا ہے اور وہ کس اسلامی یا تاریخی دور میں واقع تھا!
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center bg-[var(--bg-surface-elevated)] p-4 sm:p-5 rounded-2xl border border-[var(--border-subtle)]">
          {/* Input Year */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[var(--text-secondary)] font-urdu block">
              سال درج کیجیے:
            </label>
            <input
              type="number"
              value={inputYear}
              onChange={(e) => setInputYear(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full px-4 py-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-primary)] font-bold text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Toggle BCE / CE */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[var(--text-secondary)] font-urdu block">
              عہد کا انتخاب:
            </label>
            <div className="flex rounded-xl bg-[var(--bg-surface)] p-1 border border-[var(--border-subtle)]">
              <button
                onClick={() => setIsInputBce(false)}
                className={`flex-1 py-1.5 text-xs font-bold font-urdu rounded-lg transition-all ${
                  !isInputBce
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
              >
                بعدِ مسیح (CE / AD)
              </button>
              <button
                onClick={() => setIsInputBce(true)}
                className={`flex-1 py-1.5 text-xs font-bold font-urdu rounded-lg transition-all ${
                  isInputBce
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
              >
                قبلِ مسیح (BCE / BC)
              </button>
            </div>
          </div>

          {/* Realtime Output Result */}
          <div className="p-3.5 rounded-xl bg-gradient-to-br from-amber-500/10 to-emerald-500/10 border border-amber-500/30 flex flex-col justify-center">
            <div className="text-[11px] font-bold text-[var(--text-muted)] font-urdu">
              آج (۲۰۲۶ء) سے زمانی فاصلہ:
            </div>
            <div className="text-lg font-black text-amber-600 dark:text-amber-400 font-urdu mt-0.5">
              {calculatedYearsAgo.toLocaleString()} سال قبل
            </div>
            <div className="text-[11px] text-emerald-800 dark:text-emerald-300 font-bold font-urdu mt-1 truncate">
              {getEraInsight()}
            </div>
          </div>
        </div>
      </div>

      {/* ── CHAPTER TABS SELECTOR ── */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-6">
        {CALENDAR_GUIDE_CHAPTERS.map((chapter) => {
          const isSelected = chapter.id === selectedChapterId;
          return (
            <button
              key={chapter.id}
              onClick={() => {
                setSelectedChapterId(chapter.id);
                setOpenFaqIndex(null);
              }}
              className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl shrink-0 font-urdu font-bold text-xs sm:text-sm transition-all duration-300 cursor-pointer ${
                isSelected
                  ? 'bg-emerald-700 text-white shadow-lg ring-2 ring-emerald-500/40'
                  : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)] hover:border-emerald-500/30'
              }`}
            >
              <span className="w-6 h-6 rounded-lg bg-black/20 flex items-center justify-center text-xs">
                {chapter.numberUrdu}
              </span>
              <span>{chapter.titleUrdu.split(':')[0]}</span>
            </button>
          );
        })}
      </div>

      {/* ── ACTIVE CHAPTER CONTENT ── */}
      <div className="rounded-3xl p-6 sm:p-10 bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-xl space-y-8">
        {/* Chapter Header */}
        <div className="border-b border-[var(--border-subtle)] pb-6 space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              {getChapterIcon(activeChapter.iconName)}
            </div>
            <div>
              <div className="text-xs font-bold text-amber-600 dark:text-amber-400 font-urdu">
                باب نمبر {activeChapter.numberUrdu}
              </div>
              <h2 className="text-xl sm:text-3xl font-bold font-urdu text-[var(--text-primary)]">
                {activeChapter.titleUrdu}
              </h2>
            </div>
          </div>
          <p className="text-sm font-semibold text-[var(--text-secondary)] font-urdu pt-1">
            {activeChapter.subtitleUrdu}
          </p>
          <div className="p-4 rounded-2xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-xs sm:text-sm font-urdu text-[var(--text-primary)] leading-relaxed mt-4">
            <span className="font-bold text-emerald-800 dark:text-emerald-300">خلاصۂ باب: </span>
            {activeChapter.summaryUrdu}
          </div>
        </div>

        {/* Sections */}
        {activeChapter.sections.map((section, sIdx) => (
          <div key={sIdx} className="space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] font-urdu flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span>{section.headingUrdu}</span>
            </h3>

            <div className="space-y-3 text-xs sm:text-sm text-[var(--text-secondary)] font-urdu leading-relaxed">
              {section.contentUrdu.map((paragraph, pIdx) => (
                <p key={pIdx} className="text-justify">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Highlight Box if present */}
            {section.highlightBox && (
              <div className="rounded-2xl p-5 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30 space-y-2 my-4">
                <div className="flex items-center gap-2 text-sm font-bold text-amber-700 dark:text-amber-300 font-urdu">
                  <CheckCircle2 className="w-4 h-4 text-amber-500" />
                  <span>{section.highlightBox.titleUrdu}</span>
                </div>
                <div className="text-xs sm:text-sm text-[var(--text-primary)] font-urdu whitespace-pre-line leading-relaxed">
                  {section.highlightBox.bodyUrdu}
                </div>
                {section.highlightBox.formulaUrdu && (
                  <div className="mt-3 p-3 rounded-xl bg-[var(--bg-surface)] border border-amber-500/40 font-mono text-xs text-amber-800 dark:text-amber-300 font-bold" dir="ltr">
                    {section.highlightBox.formulaUrdu}
                  </div>
                )}
              </div>
            )}

            {/* Comparison Points Table if present */}
            {section.comparisonPoints && section.comparisonPoints.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                {section.comparisonPoints.map((cp, cIdx) => (
                  <div
                    key={cIdx}
                    className="p-4 rounded-2xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] space-y-2"
                  >
                    <div className="font-bold text-xs sm:text-sm text-[var(--text-primary)] font-urdu border-b border-[var(--border-subtle)] pb-2">
                      {cp.titleUrdu}
                    </div>
                    <div className="space-y-1.5 text-xs font-urdu">
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-bold text-emerald-800 dark:text-emerald-300 shrink-0">
                          {cp.leftLabelUrdu}:
                        </span>
                        <span className="text-[var(--text-secondary)] text-left" dir="ltr">
                          {cp.leftValueUrdu}
                        </span>
                      </div>
                      <div className="flex items-start justify-between gap-2 pt-1 border-t border-[var(--border-subtle)]">
                        <span className="font-bold text-amber-800 dark:text-amber-300 shrink-0">
                          {cp.rightLabelUrdu}:
                        </span>
                        <span className="text-[var(--text-secondary)] text-left" dir="ltr">
                          {cp.rightValueUrdu}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* FAQs for students */}
        {activeChapter.faqList && activeChapter.faqList.length > 0 && (
          <div className="pt-6 border-t border-[var(--border-subtle)] space-y-3">
            <div className="flex items-center gap-2 font-bold text-sm sm:text-base text-[var(--text-primary)] font-urdu">
              <HelpCircle className="w-5 h-5 text-indigo-500" />
              <span>طلباء کے عام سوالات اور علمی جوابات (FAQ):</span>
            </div>

            <div className="space-y-2">
              {activeChapter.faqList.map((faq, fIdx) => {
                const isOpen = openFaqIndex === fIdx;
                return (
                  <div
                    key={fIdx}
                    className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] overflow-hidden transition-all"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : fIdx)}
                      className="w-full p-4 flex items-center justify-between gap-3 text-right font-urdu font-bold text-xs sm:text-sm text-[var(--text-primary)] hover:bg-[var(--bg-surface)] transition-colors cursor-pointer"
                    >
                      <span>{faq.questionUrdu}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-emerald-500 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-[var(--text-muted)] shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 pt-1 text-xs sm:text-sm font-urdu text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border-subtle)] bg-[var(--bg-surface)]">
                        {faq.answerUrdu}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
