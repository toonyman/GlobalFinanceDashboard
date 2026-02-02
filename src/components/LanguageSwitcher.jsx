import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'ko' : 'en';
        i18n.changeLanguage(newLang);
    };

    return (
        <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-200/50 hover:bg-slate-200/80 dark:bg-white/10 dark:hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-slate-200/60 dark:border-white/10 text-sm font-medium text-slate-900 dark:text-white"
        >
            <Globe className="w-4 h-4 text-slate-700 dark:text-white" />
            <span>{i18n.language === 'en' ? 'EN' : 'KO'}</span>
        </button>
    );
}
