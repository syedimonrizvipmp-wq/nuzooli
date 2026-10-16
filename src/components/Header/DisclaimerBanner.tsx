import React, { useState, useEffect } from 'react';
import { useQuran } from '@/context/QuranContext';
import { ShieldAlert, X, ChevronRight, Sparkles } from 'lucide-react';

interface DisclaimerBannerProps {
  onOpenDisclaimerModal: () => void;
}

export const DisclaimerBanner: React.FC<DisclaimerBannerProps> = ({ onOpenDisclaimerModal }) => {
  const { language } = useQuran();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const isDismissed = localStorage.getItem('tarteeb_disclaimer_dismissed_v2');
    if (isDismissed === 'true') {
      setIsVisible(false);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('tarteeb_disclaimer_dismissed_v2', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="w-full bg-linear-to-r from-amber-600/15 via-emerald-600/10 to-amber-600/15 border-b border-amber-500/30 text-[var(--text-primary)] transition-colors">
      <div className="max-w-[1780px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-12 h-9 sm:h-10 flex items-center justify-between gap-3 text-xs overflow-hidden">
        
        {/* Left / Center content */}
        <div className="flex items-center gap-2.5 flex-1 min-w-0 h-full">
          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-amber-500/20 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/30 shadow-xs">
            <ShieldAlert className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
          </div>
          
          <div className="flex items-center gap-x-2 truncate text-[11px] sm:text-xs leading-none">
            <span className="font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1 shrink-0">
              <Sparkles className="w-3 h-3 text-amber-500 inline" />
              <span>{language === 'en' ? 'AI & Academic Research Notice:' : 'علمی و تحقیقی نوٹس:'}</span>
            </span>
            <span className={`text-[var(--text-secondary)] hidden md:inline truncate leading-normal ${language === 'en' ? 'font-sans' : 'font-urdu'}`}>
              {language === 'en'
                ? 'This platform is an ongoing academic initiative utilizing AI-assisted modeling. No legal or religious liability is assumed.'
                : 'یہ ایک تجرباتی علمی و تحقیقی کاوش ہے جس میں AI معاونت شامل ہے؛ مصنف پر کوئی شرعی و قانونی ذمہ داری عائد نہیں۔'}
            </span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 shrink-0 h-full">
          <button
            onClick={onOpenDisclaimerModal}
            className={`h-6 sm:h-7 px-2.5 rounded-lg bg-amber-600/20 hover:bg-amber-600/30 text-amber-900 dark:text-amber-200 font-semibold border border-amber-500/30 text-[11px] flex items-center gap-1 transition-colors cursor-pointer leading-none ${language === 'en' ? 'font-sans' : 'font-urdu'}`}
          >
            <span className="leading-none">{language === 'en' ? 'Read Notice' : 'تفصیل پڑھیں'}</span>
            <ChevronRight className="w-3 h-3" />
          </button>
          <button
            onClick={handleDismiss}
            aria-label="Dismiss banner"
            className="w-6 h-6 rounded-md flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
            title="Dismiss notice"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
