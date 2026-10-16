import React from 'react';
import { useQuran } from '@/context/QuranContext';
import {
  Network,
  BookOpen,
  Clock,
  Volume2,
  Compass,
  ArrowUpRight,
  Sparkles,
  Layers,
  Mail
} from 'lucide-react';
import { ECOSYSTEM_PROJECTS, EcosystemProject } from '@/data/ecosystemProjectsData';

interface ResearchEcosystemGridProps {
  onOpenModal?: () => void;
}

export const ResearchEcosystemGrid: React.FC<ResearchEcosystemGridProps> = ({ onOpenModal }) => {
  const { language } = useQuran();

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'textual':
        return <BookOpen className="w-3.5 h-3.5 text-emerald-500" />;
      case 'temporal':
        return <Clock className="w-3.5 h-3.5 text-amber-500" />;
      case 'phonetics':
        return <Volume2 className="w-3.5 h-3.5 text-purple-500" />;
      case 'ethics':
        return <Compass className="w-3.5 h-3.5 text-rose-500" />;
      default:
        return <Layers className="w-3.5 h-3.5 text-emerald-500" />;
    }
  };

  // We highlight the external sister projects in this directory
  const directoryProjects = ECOSYSTEM_PROJECTS.filter((p) => !p.isCurrent);

  return (
    <section className="w-full py-10 sm:py-14 border-t border-[var(--border-subtle)] bg-[var(--bg-surface)]/60 transition-colors">
      <div className="max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 pb-6 border-b border-[var(--border-subtle)]">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-500/25">
                <Network className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                <span>
                  {language === 'en'
                    ? 'Digital Islamicate Research Ecosystem'
                    : 'ڈیجیٹل علومِ اسلامیہ ریسرچ ایکو سسٹم'}
                </span>
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/25">
                Maulana Syed Imon Rizvi
              </span>
            </div>
            
            <h3 className="text-xl sm:text-2xl font-bold font-serif text-[var(--text-primary)]">
              {language === 'en'
                ? 'Interconnected Computational Humanities & Exegetical Network'
                : 'باہم مربوط قرآنی، تاریخی و کلامی ڈیجیٹل لیبارٹریز'}
            </h3>
            
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              {language === 'en'
                ? 'Explore the sister research platforms bridging classical Hawzah scholarship with modern text analytics, millennial diachronic timelines, and applied virtue ethics.'
                : 'قرآنی علوم، تقابلِ تفاسیر، ۵،۹۴۶ سالہ اسلامی تقویم، تجوید کی صوتیات اور نہج البلاغہ کے تنظیمی اصولوں پر مشتمل ہم قدم پلیٹ فارمز۔'}
            </p>
          </div>

          {onOpenModal && (
            <button
              onClick={onOpenModal}
              className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 shrink-0 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'Launch Full Ecosystem Drawer' : 'پورا نیٹ ورک ملاحظہ کریں'}</span>
            </button>
          )}
        </div>

        {/* 4-Column Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5 sm:gap-4">
          {directoryProjects.map((project: EcosystemProject) => (
            <a
              key={project.id}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 rounded-2xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] hover:border-emerald-500/50 hover:shadow-lg transition-all flex flex-col justify-between gap-3 relative overflow-hidden cursor-pointer"
            >
              {/* Category & Status */}
              <div>
                <div className="flex items-center justify-between gap-1 mb-2">
                  <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                    {getCategoryIcon(project.category)}
                    <span className="truncate">
                      {language === 'en' ? project.categoryLabelEnglish : project.categoryLabelUrdu}
                    </span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-emerald-600 dark:group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                </div>

                {/* Project Title */}
                <h4 className="text-sm font-bold text-[var(--text-primary)] group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors font-serif leading-snug">
                  {language === 'en' ? project.titleEnglish : project.titleUrdu}
                </h4>
                
                <p className="text-[11px] font-semibold text-emerald-800 dark:text-emerald-300 mt-0.5">
                  {language === 'en' ? project.subtitleEnglish : project.subtitleUrdu}
                </p>

                {/* Short Description */}
                <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed mt-2 line-clamp-3">
                  {language === 'en' ? project.descriptionEnglish : project.descriptionUrdu}
                </p>
              </div>

              {/* Bottom Tag & Metric */}
              <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between gap-1 text-[10px]">
                <span className="font-semibold text-emerald-700 dark:text-emerald-400 truncate">
                  {project.statusTag}
                </span>
                <span className="text-[9px] text-[var(--text-muted)] font-mono shrink-0">
                  {project.metrics?.split('•')[0] || ''}
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* Banner note */}
        <div className="p-3.5 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 text-xs flex flex-col sm:flex-row items-center justify-between gap-2 text-[var(--text-secondary)]">
          <div className="flex flex-wrap items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold text-[var(--text-primary)]">
              Digital Quranic Hermeneutics Laboratory &bull; Maulana Syed Imon Rizvi
            </span>
            <span className="hidden md:inline">&bull;</span>
            <a
              href="mailto:syedimonrizvipmp@gmail.com"
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 hover:underline"
            >
              <Mail className="w-3 h-3" />
              <span>syedimonrizvipmp@gmail.com</span>
            </a>
          </div>
          <span className="text-[10px] font-mono text-[var(--text-muted)]">
            Ecosystem v2.0 &bull; 7 Integrated Platforms
          </span>
        </div>

      </div>
    </section>
  );
};
