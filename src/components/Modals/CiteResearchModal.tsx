import React, { useState } from 'react';
import { useQuran } from '@/context/QuranContext';
import { X, GraduationCap, Copy, Check, ExternalLink, BookOpen, Quote, Mail } from 'lucide-react';

interface CiteResearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CiteResearchModal: React.FC<CiteResearchModalProps> = ({ isOpen, onClose }) => {
  const { language } = useQuran();
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

  if (!isOpen) return null;

  const chicagoCitation = `Rizvi, Maulana Syed Imon. 2026. "Project Nuzooli: Diachronic Computational Framework for Chronological Quranic Exegesis and Legal Stratification." Research Platform and Dataset v2.0.0. https://nuzooli.vercel.app.`;

  const apaCitation = `Rizvi, M. S. I. (2026). Project Nuzooli: Diachronic Computational Framework for Chronological Quranic Exegesis and Legal Stratification (Version 2.0.0) [Data set & Computational framework]. https://nuzooli.vercel.app`;

  const bibtexCitation = `@software{rizvi_nuzooli_2026,
  author = {Rizvi, Maulana Syed Imon},
  title = {{Project Nuzooli: Diachronic Computational Framework for Chronological Quranic Exegesis and Legal Stratification}},
  year = {2026},
  version = {2.0.0},
  url = {https://nuzooli.vercel.app},
  repository = {https://github.com/syedimonrizvipmp-wq/nuzooli},
  keywords = {Quran, Digital Humanities, Tarteeb-e-Nuzul, Chronological Exegesis, Asbab al-Nuzul, Shia Hermeneutics}
}`;

  const handleCopy = (formatName: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedFormat(formatName);
    setTimeout(() => {
      setCopiedFormat(null);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-2xl rounded-3xl sacred-glass sacred-border sacred-shadow bg-[var(--bg-surface-elevated)] p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-[var(--border-subtle)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center shadow-xs">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-[var(--text-primary)] font-serif">
                  {language === 'en' ? 'Cite This Research Framework' : 'اس تحقیقی فریم ورک کا حوالہ (Citation)'}
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-700/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20">
                  FAIR / Open Access
                </span>
              </div>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                {language === 'en'
                  ? 'Digital Humanities & Diachronic Quranic Hermeneutics Citation Formats'
                  : 'بین الاقوامی مقالہ نگاری و جامعاتی حوالہ جاتی اسلوب'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[var(--bg-surface)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Principal Investigator & Project Info */}
        <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div>
            <span className="font-bold text-emerald-800 dark:text-emerald-300 block">
              Principal Investigator & Architect: Maulana Syed Imon Rizvi (مولانا سید آئمن رضوی)
            </span>
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 mt-0.5 text-[11px]">
              <span className="text-[var(--text-secondary)]">
                Project Nuzooli (v2.0.0) • Digital Humanities Laboratory
              </span>
              <a
                href="mailto:syedimonrizvipmp@gmail.com"
                className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-semibold hover:underline"
              >
                <Mail className="w-3 h-3" />
                <span>syedimonrizvipmp@gmail.com</span>
              </a>
            </div>
          </div>
          <a
            href="https://github.com/syedimonrizvipmp-wq/nuzooli"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-700 text-white font-semibold text-[11px] hover:bg-emerald-800 transition-colors shrink-0"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>GitHub Repository</span>
          </a>
        </div>

        {/* Citations List */}
        <div className="space-y-4">
          
          {/* Chicago 17th */}
          <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[var(--text-primary)] flex items-center gap-1.5">
                <Quote className="w-3.5 h-3.5 text-emerald-600" />
                <span>Chicago 17th Edition (Author-Date)</span>
              </span>
              <button
                onClick={() => handleCopy('chicago', chicagoCitation)}
                className="flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-emerald-700/10 hover:bg-emerald-700/20 text-emerald-800 dark:text-emerald-300 transition-colors cursor-pointer"
              >
                {copiedFormat === 'chicago' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Chicago</span>
                  </>
                )}
              </button>
            </div>
            <p className="text-xs font-serif text-[var(--text-secondary)] leading-relaxed bg-[var(--bg-primary)] p-3 rounded-xl border border-[var(--border-subtle)] select-all">
              {chicagoCitation}
            </p>
          </div>

          {/* APA 7th */}
          <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[var(--text-primary)] flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                <span>APA 7th Edition</span>
              </span>
              <button
                onClick={() => handleCopy('apa', apaCitation)}
                className="flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-emerald-700/10 hover:bg-emerald-700/20 text-emerald-800 dark:text-emerald-300 transition-colors cursor-pointer"
              >
                {copiedFormat === 'apa' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy APA</span>
                  </>
                )}
              </button>
            </div>
            <p className="text-xs font-sans text-[var(--text-secondary)] leading-relaxed bg-[var(--bg-primary)] p-3 rounded-xl border border-[var(--border-subtle)] select-all">
              {apaCitation}
            </p>
          </div>

          {/* BibTeX */}
          <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[var(--text-primary)] flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
                <span>BibTeX (LaTeX / Overleaf / Zotero)</span>
              </span>
              <button
                onClick={() => handleCopy('bibtex', bibtexCitation)}
                className="flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-emerald-700/10 hover:bg-emerald-700/20 text-emerald-800 dark:text-emerald-300 transition-colors cursor-pointer"
              >
                {copiedFormat === 'bibtex' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy BibTeX</span>
                  </>
                )}
              </button>
            </div>
            <pre className="text-[11px] font-mono text-[var(--text-secondary)] leading-relaxed bg-[var(--bg-primary)] p-3 rounded-xl border border-[var(--border-subtle)] overflow-x-auto select-all">
              {bibtexCitation}
            </pre>
          </div>

        </div>

        {/* Machine-readable citation standards notice */}
        <div className="mt-5 pt-4 border-t border-[var(--border-subtle)] text-[11px] text-[var(--text-muted)] flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Machine-readable metadata available via <code className="text-emerald-700 dark:text-emerald-400 font-mono">CITATION.cff</code> and <code className="text-emerald-700 dark:text-emerald-400 font-mono">RESEARCH_FRAMEWORK.md</code>.</span>
          <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold">License: CC BY-NC 4.0</span>
        </div>

      </div>
    </div>
  );
};
