import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from 'recharts';
import { Bitcoin, Calculator, DollarSign, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function DigitalAssetCalculator({ currencySymbol = '$' }) {
    const { t, i18n } = useTranslation();
    const [inputs, setInputs] = useState({
        avgPrice: 50000,
        quantity: 0.5,
        currentPrice: 55000
    });

    const [result, setResult] = useState({
        invested: 0,
        currentValue: 0,
        profit: 0,
        roi: 0,
        isProfit: true
    });

    const currency = currencySymbol;

    useEffect(() => {
        const avg = parseFloat(inputs.avgPrice) || 0;
        const qty = parseFloat(inputs.quantity) || 0;
        const curr = parseFloat(inputs.currentPrice) || 0;

        const invested = avg * qty;
        const value = curr * qty;
        const profit = value - invested;
        const roi = invested > 0 ? (profit / invested) * 100 : 0;

        setResult({
            invested,
            currentValue: value,
            profit,
            roi,
            isProfit: profit >= 0
        });
    }, [inputs]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputs(prev => ({ ...prev, [name]: value }));
    };

    const formatMoney = (val) => new Intl.NumberFormat(i18n.language === 'ko' ? 'ko-KR' : 'en-US').format(val);

    const chartData = [
        { name: t('crypto.investedAmount'), value: result.invested },
        { name: t('crypto.currentValue'), value: result.currentValue }
    ];

    return (
        <div className="glass-card p-6 md:p-8 animate-fade-in relative overflow-hidden">
            <div className="absolute top-0 left-0 p-32 bg-blue-500/10 blur-3xl rounded-full -translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-blue-100 dark:bg-blue-500/20 rounded-xl">
                    <Bitcoin className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{t('app.cryptoCalculator')}</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Input Section */}
                <div className="space-y-6">
                    <div>
                        <label className="block text-slate-500 dark:text-gray-400 text-sm mb-2">{t('crypto.avgPrice')}</label>
                        <input
                            type="number"
                            name="avgPrice"
                            value={inputs.avgPrice}
                            onChange={handleInputChange}
                            className="glass-input focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-slate-500 dark:text-gray-400 text-sm mb-2">{t('crypto.quantity')}</label>
                        <input
                            type="number"
                            name="quantity"
                            value={inputs.quantity}
                            onChange={handleInputChange}
                            className="glass-input focus:ring-blue-500"
                            step="0.00000001"
                        />
                    </div>

                    <div>
                        <label className="block text-slate-500 dark:text-gray-400 text-sm mb-2">{t('crypto.currentPrice')}</label>
                        <input
                            type="number"
                            name="currentPrice"
                            value={inputs.currentPrice}
                            onChange={handleInputChange}
                            className="glass-input focus:ring-blue-500"
                        />
                        {/* Quick adjust buttons */}
                        <div className="flex gap-2 mt-2">
                            {[-10, -5, +5, +10].map(percent => (
                                <button
                                    key={percent}
                                    onClick={() => setInputs(prev => ({
                                        ...prev,
                                        currentPrice: Math.round(parseFloat(prev.currentPrice) * (1 + percent / 100))
                                    }))}
                                    className="px-2 py-1 text-xs rounded bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-600 dark:text-gray-300 transition-colors"
                                >
                                    {percent > 0 ? '+' : ''}{percent}%
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Results Section */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                            <p className="text-slate-500 dark:text-gray-400 text-sm mb-1">{t('crypto.profit')}</p>
                            <div className={`flex items-center gap-2 text-2xl font-bold ${result.isProfit ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
                                {result.isProfit ? <ArrowUpRight className="w-6 h-6" /> : <ArrowDownRight className="w-6 h-6" />}
                                {currency} {formatMoney(result.profit)}
                            </div>
                        </div>

                        <div className="p-5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                            <p className="text-slate-500 dark:text-gray-400 text-sm mb-1">{t('crypto.roi')}</p>
                            <div className={`text-2xl font-bold ${result.isProfit ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
                                {result.isProfit ? '+' : ''}{result.roi.toFixed(2)}%
                            </div>
                        </div>
                    </div>

                    <div className="h-[250px] w-full bg-slate-100 dark:bg-black/20 rounded-xl p-4 border border-slate-200 dark:border-white/5 flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData} layout="vertical">
                                <XAxis type="number" hide />
                                <YAxis type="category" dataKey="name" width={100} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff' }}
                                    cursor={{ fill: 'transparent' }}
                                    formatter={(val) => `${currency} ${formatMoney(val)}`}
                                />
                                <Bar dataKey="value" barSize={32} radius={[0, 4, 4, 0]}>
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={index === 0 ? '#64748b' : (result.isProfit ? '#10b981' : '#ef4444')} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="flex justify-between items-center text-sm text-slate-500 dark:text-gray-500 bg-slate-100 dark:bg-white/5 p-3 rounded-lg border border-slate-200 dark:border-white/5">
                        <span>{t('crypto.breakeven')}</span>
                        <span className="text-slate-900 dark:text-white font-mono">{currency} {formatMoney(inputs.avgPrice)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
