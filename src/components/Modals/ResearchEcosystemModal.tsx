import React, { useState } from 'react';
import { useQuran } from '@/context/QuranContext';
import {
  X,
  Network,
  ExternalLink,
  BookOpen,
  Clock,
  Volume2,
  Compass,
  CheckCircle2,
  Sparkles,
  Layers
} from 'lucide-react';
import {
  ECOSYSTEM_PROJECTS,
  ECOSYSTEM_CATEGORIES,
  EcosystemProject
} from '@/data/ecosystemProjectsData';

interface ResearchEcosystemModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResearchEcosystemModal: React.FC<ResearchEcosystemModalProps> = ({
  isOpen,
  onClose
}) => {
  const { language } = useQuran();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  if (!isOpen) return null;

  const filteredProjects =
    selectedCategory === 'all'
      ? ECOSYSTEM_PROJECTS
      : ECOSYSTEM_PROJECTS.filter((p) => p.category === selectedCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'textual':
        return <BookOpen className="w-4 h-4 text-emerald-500" />;
      case 'temporal':
        return <Clock className="w-4 h-4 text-amber-500" />;
      case 'phonetics':
        return <Volume2 className="w-4 h-4 text-purple-500" />;
      case 'ethics':
        return <Compass className="w-4 h-4 text-rose-500" />;
      default:
        return <Layers className="w-4 h-4 text-emerald-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-5xl rounded-3xl sacred-glass sacred-border sacred-shadow bg-[var(--bg-surface-elevated)] max-h-[92vh] flex flex-col overflow-hidden border border-emerald-500/30">
        
        {/* Header */}
        <div className="p-5 sm:p-6 pb-4 border-b border-[var(--border-subtle)] bg-linear-to-r from-emerald-600/15 via-teal-600/10 to-amber-600/15 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-md">
              <Network className="w-6 h-6" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30">
                  Scholarly Ecosystem
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-500/30">
                  Digital Islamicate Laboratory
                </span>
              </div>
              <h3 className={`text-lg sm:text-xl font-bold text-[var(--text-primary)] mt-1 ${language === 'en' ? 'font-serif' : 'font-urdu'}`}>
                {language === 'en'
                  ? 'Digital Islamicate Research Ecosystem'
                  : 'ڈیجیٹل علومِ اسلامیہ ریسرچ ایکو سسٹم'}
              </h3>
              <p className={`text-xs text-[var(--text-muted)] mt-0.5 ${language === 'en' ? 'font-sans' : 'font-urdu leading-normal'}`}>
                {language === 'en'
                  ? 'An interconnected network of computational hermeneutics, diachronic timelines & applied ethics by Maulana Syed Imon Rizvi'
                  : 'مولانا سید آئمن رضوی کے زیرِ سرپرستی قرآنی زمانیات، تفسیری علوم اور اخلاقیات کا باہم مربوط نیٹ ورک'}
              </p>
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

        {/* Category Filters */}
        <div className="px-5 sm:px-6 py-2.5 bg-[var(--bg-surface)]/70 border-b border-[var(--border-subtle)] flex items-center gap-2 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-[var(--bg-primary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)]'
            }`}
          >
            <span className={language === 'en' ? 'font-sans' : 'font-urdu'}>
              {language === 'en' ? 'All Platforms (7)' : 'تمام منصوبے (۷)'}
            </span>
          </button>
          {ECOSYSTEM_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-[var(--bg-primary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)]'
              }`}
            >
              {getCategoryIcon(cat.id)}
              <span className={language === 'en' ? 'font-sans' : 'font-urdu'}>
                {language === 'en' ? cat.titleEnglish : cat.titleUrdu}
              </span>
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredProjects.map((project: EcosystemProject) => (
              <div
                key={project.id}
                className={`p-4 sm:p-5 rounded-2xl bg-[var(--bg-surface)] border transition-all flex flex-col justify-between gap-3 relative group ${
                  project.isCurrent
                    ? 'border-emerald-500/50 bg-emerald-500/5'
                    : 'border-[var(--border-subtle)] hover:border-emerald-500/40 hover:shadow-md'
                }`}
              >
                {/* Top Badge & Metric */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(project.category)}
                    <span className={`text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] ${language === 'en' ? 'font-sans' : 'font-urdu'}`}>
                      {language === 'en' ? project.categoryLabelEnglish : project.categoryLabelUrdu}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {project.metrics && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] text-[var(--text-secondary)]">
                        {project.metrics}
                      </span>
                    )}
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        project.isCurrent
                          ? 'bg-emerald-700 text-white'
                          : 'bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20'
                      }`}
                    >
                      <span className={language === 'en' ? 'font-sans' : 'font-urdu'}>{project.statusTag}</span>
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-1.5">
                  <h4 className={`text-sm sm:text-base font-bold text-[var(--text-primary)] group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors flex items-center justify-between ${language === 'en' ? 'font-serif' : 'font-urdu leading-normal'}`}>
                    <span>{language === 'en' ? project.titleEnglish : project.titleUrdu}</span>
                  </h4>
                  <p className={`text-[11px] font-semibold text-emerald-800 dark:text-emerald-300 ${language === 'en' ? 'font-sans' : 'font-urdu'}`}>
                    {language === 'en' ? project.subtitleEnglish : project.subtitleUrdu}
                  </p>
                  <p className={`leading-relaxed ${language === 'en' ? 'font-sans text-xs text-[var(--text-secondary)]' : 'font-urdu text-[12px] leading-loose text-right text-[var(--text-secondary)]'}`} dir={language === 'ur' ? 'rtl' : 'ltr'}>
                    {language === 'en' ? project.descriptionEnglish : project.descriptionUrdu}
                  </p>
                </div>

                {/* Action Link */}
                <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between">
                  {project.isCurrent ? (
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                      <CheckCircle2 className="w-4 h-4" />
                      <span className={language === 'en' ? 'font-sans' : 'font-urdu'}>
                        {language === 'en' ? 'Currently Active Platform' : 'موجودہ فعال پلیٹ فارم'}
                      </span>
                    </span>
                  ) : (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-all shadow-xs cursor-pointer group-hover:translate-x-0.5"
                    >
                      <span className={language === 'en' ? 'font-sans' : 'font-urdu'}>
                        {language === 'en' ? 'Launch Platform' : 'پلیٹ فارم کھولیں'}
                      </span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  <span className="text-[10px] text-[var(--text-muted)] font-mono">
                    {project.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Notes */}
        <div className="p-4 sm:p-5 border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[var(--text-muted)]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>
              {language === 'en'
                ? 'All platforms are freely accessible for open-access academic and educational research.'
                : 'تمام پلیٹ فارمز اوپن ایکسس تعلیمی و تحقیقی استفادے کے لیے بلا معاوضہ دستیاب ہیں۔'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[var(--bg-primary)] hover:bg-[var(--border-subtle)] text-[var(--text-primary)] font-semibold transition-colors cursor-pointer border border-[var(--border-subtle)]"
          >
            {language === 'en' ? 'Close Window' : 'بند کریں'}
          </button>
        </div>

      </div>
    </div>
  );
};
