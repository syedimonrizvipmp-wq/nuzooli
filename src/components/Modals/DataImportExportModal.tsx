import React, { useState } from 'react';
import { useQuran } from '@/context/QuranContext';
import { RevelationEvent } from '@/types/quran';
import { X, Database, Download, Upload, RefreshCw, AlertCircle, CheckCircle } from 'lucide-react';

interface DataImportExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DataImportExportModal: React.FC<DataImportExportModalProps> = ({ isOpen, onClose }) => {
  const { events, importCustomEvents, resetToDefaultSeed } = useQuran();
  const [jsonInput, setJsonInput] = useState('');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  if (!isOpen) return null;

  const handleExport = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(events, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `tarteeb_e_nuzul_events_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    setFeedback({ type: 'success', message: 'Chronological dataset exported successfully.' });
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
      // Validate first item
      const first = parsed[0] as RevelationEvent;
      if (!first.chronologicalOrder || !first.surahNumber || !Array.isArray(first.verses)) {
        throw new Error('Invalid RevelationEvent schema. Missing chronologicalOrder or verses.');
      }
      importCustomEvents(parsed);
      setFeedback({
        type: 'success',
        message: `Successfully ingested ${parsed.length} Chronological Revelation Events!`,
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
            <div className="w-9 h-9 rounded-xl bg-emerald-700 text-white flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[var(--text-primary)] font-serif">
                Dataset Management & JSON Hooks
              </h3>
              <p className="text-xs text-[var(--text-muted)]">
                تنزيل اور درآمدِ مواد (Custom Ingestion)
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

        {feedback && (
          <div
            className={`p-3 rounded-2xl mb-4 text-xs font-semibold flex items-center gap-2 ${
              feedback.type === 'success'
                ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300'
                : 'bg-red-500/10 border border-red-500/20 text-red-700 dark:text-red-300'
            }`}
          >
            {feedback.type === 'success' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            <span>{feedback.message}</span>
          </div>
        )}

        <div className="space-y-6">
          
          {/* Action Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={handleExport}
              className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-emerald-500/40 text-xs font-bold text-[var(--text-primary)] transition-all"
            >
              <Download className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
              <span>Export Active Dataset (JSON)</span>
            </button>
            <button
              onClick={handleReset}
              className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-red-500/40 text-xs font-bold text-[var(--text-primary)] transition-all"
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
              rows={8}
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              placeholder={`Paste an array of RevelationEvent objects:\n[\n  {\n    "chronologicalOrder": 6,\n    "surahNumber": 111,\n    "surahNameEnglish": "Al-Masad",\n    ...\n  }\n]`}
              className="w-full p-3 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs font-mono text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
            />
          </div>

          <button
            onClick={handleImport}
            className="w-full py-3 rounded-2xl bg-emerald-700 text-white text-xs font-bold hover:bg-emerald-800 transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <Upload className="w-4 h-4" />
            <span>Ingest Custom Events Dataset</span>
          </button>

        </div>

      </div>
    </div>
  );
};
