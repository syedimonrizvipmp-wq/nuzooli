import React, { useState } from 'react';
import { useQuran } from '@/context/QuranContext';
import { RevelationEvent } from '@/types/quran';
import {
  X,
  Database,
  Download,
  Upload,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  FileSpreadsheet,
  FileCode,
  GraduationCap,
  Sparkles
} from 'lucide-react';
import {
  generateChronologyMatrixCSV,
  generateChronologyMatrixJSON,
  generateGradualLegislationJSON,
  downloadFile
} from '@/utils/researchDataExporter';

interface DataImportExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCite?: () => void;
}

export const DataImportExportModal: React.FC<DataImportExportModalProps> = ({
  isOpen,
  onClose,
  onOpenCite
}) => {
  const { events, importCustomEvents, resetToDefaultSeed, language } = useQuran();
  const [activeTab, setActiveTab] = useState<'fair' | 'backup'>('fair');
  const [jsonInput, setJsonInput] = useState('');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  if (!isOpen) return null;

  // FAIR Exports
  const handleExportCSV = () => {
    const csv = generateChronologyMatrixCSV();
    downloadFile(csv, 'nuzooli-chronology-matrix.csv', 'text/csv');
    setFeedback({
      type: 'success',
      message: 'Downloaded "nuzooli-chronology-matrix.csv" (114 Surahs with Delta Displacement metric).'
    });
  };

  const handleExportMatrixJSON = () => {
    const json = generateChronologyMatrixJSON();
    downloadFile(json, 'nuzooli-chronology-matrix.json', 'application/json');
    setFeedback({
      type: 'success',
      message: 'Downloaded "nuzooli-chronology-matrix.json" (FAIR-compliant chronology matrix).'
    });
  };

  const handleExportLegislationJSON = () => {
    const json = generateGradualLegislationJSON();
    downloadFile(json, 'gradual-legislation-tracks.json', 'application/json');
    setFeedback({
      type: 'success',
      message: 'Downloaded "gradual-legislation-tracks.json" (5 Legal Tracks & Classical Exegetical Provenance).'
    });
  };

  // Platform Backup & Custom Ingestion
  const handleExportActiveEvents = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(events, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `tarteeb_e_nuzul_events_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    setFeedback({ type: 'success', message: 'Active chronological dataset exported successfully.' });
  };

  const handleImport = () => {
    setFeedback(null);
    if (!jsonInput.trim()) {
      setFeedback({ type: 'error', message: 'Please paste valid JSON data into the box.' });
      return;
    }
    try {
      const parsed = JSON.parse(jsonInput);
      if (!Array.isArray(parsed) || parsed.length === 0) {
        throw new Error('Data must be an array of RevelationEvent objects.');
      }
      const first = parsed[0] as RevelationEvent;
      if (!first.chronologicalOrder || !first.surahNumber || !Array.isArray(first.verses)) {
        throw new Error('Invalid RevelationEvent schema. Missing chronologicalOrder or verses.');
      }
      importCustomEvents(parsed);
      setFeedback({
        type: 'success',
        message: `Successfully ingested ${parsed.length} Chronological Revelation Events!`
      });
      setJsonInput('');
    } catch (err: any) {
      setFeedback({ type: 'error', message: `Import Failed: ${err.message}` });
    }
  };

  const handleReset = () => {
    if (window.confirm('Reset dataset to initial authentic Shia seed data? Any custom pasted events will be removed.')) {
      resetToDefaultSeed();
      setFeedback({ type: 'success', message: 'Reset to default Shia chronological seed data.' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-2xl rounded-3xl sacred-glass sacred-border sacred-shadow bg-[var(--bg-surface-elevated)] p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[var(--border-subtle)]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-700 text-white flex items-center justify-center shadow-xs">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[var(--text-primary)] font-serif">
                {language === 'en' ? 'Research Data Engine & FAIR Repository' : 'ریسرچ ڈیٹا انجن و برآمد مواد'}
              </h3>
              <p className="text-xs text-[var(--text-muted)]">
                {language === 'en'
                  ? 'FAIR Open-Access Datasets & Custom Platform Ingestion'
                  : 'اوپن ایکسس تحقیقی مواد (FAIR Standard) و کسٹم امپورٹ'}
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

        {/* Tab Switcher */}
        <div className="flex rounded-xl bg-[var(--bg-surface)] p-1 border border-[var(--border-subtle)] mb-5">
          <button
            onClick={() => { setActiveTab('fair'); setFeedback(null); }}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'fair'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>{language === 'en' ? 'FAIR Research Datasets' : 'تحقیقی مواد (FAIR)'}</span>
          </button>
          <button
            onClick={() => { setActiveTab('backup'); setFeedback(null); }}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'backup'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>{language === 'en' ? 'Platform Backup & Ingestion' : 'پلیٹ فارم بیک اپ و امپورٹ'}</span>
          </button>
        </div>

        {feedback && (
          <div
            className={`p-3 rounded-2xl mb-4 text-xs font-semibold flex items-center gap-2 ${
              feedback.type === 'success'
                ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300'
                : 'bg-red-500/10 border border-red-500/20 text-red-700 dark:text-red-300'
            }`}
          >
            {feedback.type === 'success' ? <CheckCircle className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
            <span>{feedback.message}</span>
          </div>
        )}

        {/* TAB 1: FAIR Research Datasets */}
        {activeTab === 'fair' && (
          <div className="space-y-4 animate-fade-in">
            <div className="p-3.5 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 text-xs flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-bold text-emerald-800 dark:text-emerald-300 block">
                  FAIR Data Principles Compliance (Findable, Accessible, Interoperable, Reusable)
                </span>
                <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                  These datasets are curated for computational linguistics, diachronic Quranic studies, and digital humanities researchers. Free for non-commercial scholarly use under the <span className="font-semibold text-emerald-700 dark:text-emerald-400">CC BY-NC 4.0</span> license.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {/* Dataset 1: CSV Matrix */}
              <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-emerald-500/40 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs font-bold text-[var(--text-primary)]">
                      nuzooli-chronology-matrix.csv
                    </span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
                      RFC 4180 CSV
                    </span>
                  </div>
                  <p className="text-[11px] text-[var(--text-muted)]">
                    All 114 Surahs with Canonical vs Revelation rank, absolute Delta metric (|Nuzul - Mushaf|), revelation period, and verse counts.
                  </p>
                </div>
                <button
                  onClick={handleExportCSV}
                  className="px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shrink-0 shadow-xs cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download CSV</span>
                </button>
              </div>

              {/* Dataset 2: JSON Matrix */}
              <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-emerald-500/40 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <FileCode className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs font-bold text-[var(--text-primary)]">
                      nuzooli-chronology-matrix.json
                    </span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
                      JSON-LD Ready
                    </span>
                  </div>
                  <p className="text-[11px] text-[var(--text-muted)]">
                    Structured machine-readable matrix with complete metadata, provenance, DOI/URL, and Shia scholarly consensus references.
                  </p>
                </div>
                <button
                  onClick={handleExportMatrixJSON}
                  className="px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shrink-0 shadow-xs cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download JSON</span>
                </button>
              </div>

              {/* Dataset 3: Legal Tracks JSON */}
              <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-emerald-500/40 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <FileCode className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs font-bold text-[var(--text-primary)]">
                      gradual-legislation-tracks.json
                    </span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-700 dark:text-amber-300">
                      Jurisprudence & Exegesis
                    </span>
                  </div>
                  <p className="text-[11px] text-[var(--text-muted)]">
                    All 5 legal evolutionary tracks (15 historical stages) with primary citations to <em>Al-Tamhid</em>, <em>Al-Mizan</em>, and <em>Asbab al-Nuzul</em>.
                  </p>
                </div>
                <button
                  onClick={handleExportLegislationJSON}
                  className="px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shrink-0 shadow-xs cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download JSON</span>
                </button>
              </div>
            </div>

            {/* Citation quick trigger */}
            {onOpenCite && (
              <div className="pt-2 flex items-center justify-between text-xs text-[var(--text-muted)]">
                <span>Publishing a scholarly paper using this data?</span>
                <button
                  onClick={() => {
                    onClose();
                    onOpenCite();
                  }}
                  className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-bold hover:underline cursor-pointer"
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>View Academic Citations (Chicago, APA, BibTeX)</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: Platform Backup & Ingestion */}
        {activeTab === 'backup' && (
          <div className="space-y-6 animate-fade-in">
            {/* Action Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleExportActiveEvents}
                className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-emerald-500/40 text-xs font-bold text-[var(--text-primary)] transition-all cursor-pointer"
              >
                <Download className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                <span>Export Active State (JSON)</span>
              </button>
              <button
                onClick={handleReset}
                className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-red-500/40 text-xs font-bold text-[var(--text-primary)] transition-all cursor-pointer"
              >
                <RefreshCw className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                <span>Reset to Default Seed Data</span>
              </button>
            </div>

            {/* Paste JSON Ingestion Box */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">
                Ingest Custom Chronological Revelation Events (JSON)
              </label>
              <textarea
                rows={7}
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                placeholder={`Paste an array of RevelationEvent objects:\n[\n  {\n    "chronologicalOrder": 6,\n    "surahNumber": 111,\n    "surahNameEnglish": "Al-Masad",\n    ...\n  }\n]`}
                className="w-full p-3 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs font-mono text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
              />
            </div>

            <button
              onClick={handleImport}
              className="w-full py-3 rounded-2xl bg-emerald-700 text-white text-xs font-bold hover:bg-emerald-800 transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              <span>Ingest Custom Events Dataset</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
