import React from 'react';
import { DollarSign, Won } from 'lucide-react';

export default function CurrencySwitcher({ currency, setCurrency }) {
    const toggleCurrency = () => {
        setCurrency(prev => prev === 'USD' ? 'KRW' : 'USD');
    };

    return (
        <button
            onClick={toggleCurrency}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-white/10 text-sm font-medium"
            title="Switch Currency"
        >
            {currency === 'USD' ? (
                <>
                    <DollarSign className="w-4 h-4 text-emerald-400" />
                    <span>USD</span>
                </>
            ) : (
                <>
                    <span className="w-4 h-4 text-blue-400 font-bold flex items-center justify-center">₩</span>
                    <span>KRW</span>
                </>
            )}
        </button>
    );
}
