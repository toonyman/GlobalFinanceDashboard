import React from 'react';
import { useTranslation } from 'react-i18next';

export default function AdPlaceholder({ height = '90px', className = '' }) {
    const { t } = useTranslation();

    return (
        <div
            style={{ height }}
            className={`w-full flex items-center justify-center bg-white/5 border border-white/10 rounded-lg backdrop-blur-sm overflow-hidden group ${className}`}
        >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
            <span className="text-gray-500 font-mono text-sm tracking-widest select-none uppercase">
                {t('app.adSpace')}
            </span>
        </div>
    );
}
