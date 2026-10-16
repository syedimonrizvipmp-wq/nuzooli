import { en } from './en';
import { ur } from './ur';
import { Language, TranslationDictionary } from '@/types/i18n';

export const translations: Record<Language, TranslationDictionary> = {
  en,
  ur,
};

export { en, ur };
export * from '@/types/i18n';
