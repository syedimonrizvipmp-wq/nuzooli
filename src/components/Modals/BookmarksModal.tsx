import React from 'react';
import { useQuran } from '@/context/QuranContext';
import { X, Bookmark, Trash2, ArrowRight, Compass } from 'lucide-react';

interface BookmarksModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookmarksModal: React.FC<BookmarksModalProps> = ({ isOpen, onClose }) => {
  const { bookmarks, toggleBookmark, setActiveEventOrder, setPerspectiveMode, activeEventOrder } = useQuran();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg rounded-3xl sacred-glass sacred-border sacred-shadow bg-[var(--bg-surface-elevated)] p-6 sm:p-8 max-h-[85vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[var(--border-subtle)]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-700 text-white flex items-center justify-center">
              <Bookmark className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[var(--text-primary)] font-serif">
                Saved Verses & Reading Journey
              </h3>
              <p className="text-xs text-[var(--text-muted)]">
                نشان زد آیات اور یادداشتیں
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

        {/* Resume Journey Card */}
        <div className="mb-4 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase font-bold text-emerald-700 dark:text-emerald-400">
              Current Chronological Station
            </div>
            <div className="text-sm font-bold text-[var(--text-primary)]">
              Revelation Event #{activeEventOrder}
            </div>
          </div>
          <button
            onClick={() => {
              setPerspectiveMode('nuzul');
              onClose();
            }}
            className="px-3 py-1.5 rounded-xl bg-emerald-700 text-white text-xs font-bold hover:bg-emerald-800 transition-colors flex items-center gap-1"
          >
            <span>Resume Journey</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bookmarks List */}
        <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
          {bookmarks.length === 0 ? (
            <div className="text-center py-10 text-[var(--text-muted)]">
              <Bookmark className="w-10 h-10 mx-auto mb-2 opacity-30" />
              <p className="text-sm font-medium">No bookmarks saved yet.</p>
              <p className="text-xs mt-1">
                Click the bookmark icon on any Ayah while reading to save it here.
              </p>
            </div>
          ) : (
            bookmarks.map((bm) => (
              <div
                key={bm.id}
                className="p-3.5 rounded-2xl sacred-border bg-[var(--bg-surface)] hover:border-emerald-500/40 transition-all flex items-center justify-between gap-3 group"
              >
                <div
                  className="cursor-pointer flex-1"
                  onClick={() => {
                    setActiveEventOrder(bm.eventOrder);
                    setPerspectiveMode('nuzul');
                    onClose();
                  }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-sm text-[var(--text-primary)] font-serif">
                      {bm.surahName}
                    </span>
                    <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                      Ayah {bm.ayahRangeText}
                    </span>
                  </div>
                  <div className="text-[11px] text-[var(--text-muted)] flex items-center gap-2">
                    <span className="flex items-center gap-1">
                      <Compass className="w-3 h-3 text-amber-500" />
                      Revelation Event #{bm.eventOrder}
                    </span>
                    <span>•</span>
                    <span>{new Date(bm.timestamp).toLocaleDateString()}</span>
                  </div>
                </div>

                <button
                  onClick={() =>
                    toggleBookmark({
                      eventOrder: bm.eventOrder,
                      surahNumber: bm.surahNumber,
                      surahName: bm.surahName,
                      ayahNumber: bm.ayahNumber,
                      ayahRangeText: bm.ayahRangeText,
                    })
                  }
                  className="p-2 rounded-xl text-[var(--text-muted)] hover:text-red-600 hover:bg-red-500/10 transition-colors"
                  title="Remove Bookmark"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
