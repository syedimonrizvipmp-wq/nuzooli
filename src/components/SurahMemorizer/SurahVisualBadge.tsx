import React, { useState, useEffect } from 'react';

interface Props {
  mushafOrder: number;
  fallbackEmoji: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  altText?: string;
  className?: string;
}

const SIZE_MAP = {
  sm: 'w-14 h-14 text-2xl sm:text-3xl',
  md: 'w-20 h-20 text-4xl',
  lg: 'w-24 h-24 text-5xl',
  xl: 'w-36 h-36 sm:w-44 sm:h-44 text-7xl',
};

const SPECIFIC_IMAGE_MAP: Record<number, string[]> = {
  1: ['1.png', '1 Fateha.png', '1-Fateha.png'],
  2: ['2.png', '2 baqarah.png', '2-baqarah.png'],
  3: ['3.png', '3 Aale-imran.png', '3-Aale-imran.png'],
  4: ['4.png', '4 nisaa.png', '4-nisaa.png'],
  5: ['5.png', '5 almaida.png', '5-almaida.png'],
  6: ['6.png', '6 anaam.png', '6-anaam.png'],
  7: ['7.png', '7 aaraaf.png', '7-aaraaf.png'],
  8: ['8.png', '8 anfaal.png', '8-anfaal.png'],
  9: ['9.png', '9 taubah.png', '9-taubah.png'],
  10: ['10.png', '10 younus.png', '10-younus.png'],
};

const IMAGE_PATHS = (num: number) => {
  const specific = SPECIFIC_IMAGE_MAP[num] || [];
  const paths: string[] = [];

  // 1. Direct numbered paths
  paths.push(`/images/surahs/${num}.png`);

  // 2. Exact user filenames (URL encoded & raw)
  specific.forEach((filename) => {
    paths.push(`/images/surahs/${encodeURIComponent(filename)}`);
    paths.push(`/images/surahs/${filename}`);
  });

  // 3. Fallbacks
  paths.push(
    `/images/surahs/${num}.webp`,
    `/images/surahs/surah-${String(num).padStart(3, '0')}.png`,
    `/images/surahs/surah-${String(num).padStart(3, '0')}.webp`,
    `/images/surahs/${num}.jpg`
  );

  return Array.from(new Set(paths));
};

export const SurahVisualBadge: React.FC<Props> = ({
  mushafOrder,
  fallbackEmoji,
  size = 'md',
  altText = 'Surah Symbol',
  className = '',
}) => {
  const [imageIndex, setImageIndex] = useState<number>(0);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    setImageIndex(0);
    setHasError(false);
  }, [mushafOrder]);

  const paths = IMAGE_PATHS(mushafOrder);
  const currentPath = paths[imageIndex];

  const handleImageError = () => {
    if (imageIndex < paths.length - 1) {
      setImageIndex((prev) => prev + 1);
    } else {
      setHasError(true);
    }
  };

  const sizeClasses = SIZE_MAP[size];

  return (
    <div
      className={`relative rounded-2xl sm:rounded-3xl flex items-center justify-center overflow-hidden shrink-0 transition-transform duration-300 group-hover:scale-105 border-2 border-amber-500/30 bg-gradient-to-br from-amber-500/15 via-emerald-600/10 to-amber-500/5 shadow-md ${sizeClasses} ${className}`}
    >
      {!hasError ? (
        <img
          src={currentPath}
          alt={altText}
          onError={handleImageError}
          className="w-full h-full object-contain p-1.5 transition-all duration-300"
          loading="lazy"
        />
      ) : (
        <div className="flex items-center justify-center w-full h-full select-none transform transition-transform duration-300 group-hover:scale-110">
          <span className="drop-shadow-md">{fallbackEmoji}</span>
        </div>
      )}

      {/* Subtle gold glow ring on hover */}
      <div className="absolute inset-0 rounded-2xl sm:rounded-3xl ring-1 ring-inset ring-amber-400/20 pointer-events-none" />
    </div>
  );
};
