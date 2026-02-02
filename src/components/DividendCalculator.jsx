import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calculator, TrendingUp, DollarSign } from 'lucide-react';

export default function DividendCalculator() {
    const { t, i18n } = useTranslation();
    const [inputs, setInputs] = useState({
        initial: 10000,
        monthly: 500,
        yieldRate: 3.5,
        growthRate: 7.0,
        years: 20
    });

    const [data, setData] = useState([]);
    const [result, setResult] = useState({
        totalValue: 0,
        annualDividend: 0,
        monthlyIncome: 0
    });

    const currency = t('common.currency');

    useEffect(() => {
        calculateDividends();
    }, [inputs]);

    const calculateDividends = () => {
        let currentPrincipal = parseFloat(inputs.initial);
        let currentYield = parseFloat(inputs.yieldRate) / 100;
        const growthRate = parseFloat(inputs.growthRate) / 100;
        const monthlyContrib = parseFloat(inputs.monthly);
        const years = parseInt(inputs.years);

        const chartData = [];

        for (let year = 1; year <= years; year++) {
            // Add monthly contributions
            currentPrincipal += monthlyContrib * 12;

            // Calculate dividend for the year
            let annualDividend = currentPrincipal * currentYield;

            // Reinvest dividends (simplified: assuming annual reinvestment for better performance)
            currentPrincipal += annualDividend;

            // Grow the dividend yield
            currentYield = currentYield * (1 + growthRate);

            chartData.push({
                year: `Y${year}`,
                value: Math.round(currentPrincipal),
                dividend: Math.round(annualDividend)
            });
        }

        setData(chartData);
        setResult({
            totalValue: Math.round(currentPrincipal),
            annualDividend: Math.round(chartData[years - 1]?.dividend || 0),
            monthlyIncome: Math.round((chartData[years - 1]?.dividend || 0) / 12)
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputs(prev => ({ ...prev, [name]: value }));
    };

    const formatMoney = (val) => new Intl.NumberFormat(i18n.language === 'ko' ? 'ko-KR' : 'en-US').format(val);

    return (
        <div className="glass-card p-6 md:p-8 animate-fade-in relative overflow-hidden">
            <div className="absolute top-0 right-0 p-32 bg-emerald-500/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-emerald-500/20 rounded-xl">
                    <TrendingUp className="w-6 h-6 text-emerald-400" />
                </div>
                <h2 className="text-2xl font-bold text-white">{t('app.dividendCalculator')}</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Input Section */}
                <div className="space-y-6">
                    <div>
                        <label className="block text-gray-400 text-sm mb-2">{t('dividend.initialInvestment')}</label>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input
                                type="number"
                                name="initial"
                                value={inputs.initial}
                                onChange={handleInputChange}
                                className="glass-input pl-10"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-400 text-sm mb-2">{t('dividend.monthlyContribution')}</label>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input
                                type="number"
                                name="monthly"
                                value={inputs.monthly}
                                onChange={handleInputChange}
                                className="glass-input pl-10"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-400 text-sm mb-2">{t('dividend.dividendRate')}</label>
                            <input
                                type="number"
                                name="yieldRate"
                                value={inputs.yieldRate}
                                onChange={handleInputChange}
                                className="glass-input"
                                step="0.1"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-400 text-sm mb-2">{t('dividend.growthRate')}</label>
                            <input
                                type="number"
                                name="growthRate"
                                value={inputs.growthRate}
                                onChange={handleInputChange}
                                className="glass-input"
                                step="0.1"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-400 text-sm mb-2">{t('dividend.years')}: {inputs.years}</label>
                        <input
                            type="range"
                            name="years"
                            min="1"
                            max="50"
                            value={inputs.years}
                            onChange={handleInputChange}
                            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                        />
                    </div>
                </div>

                {/* Results & Chart Section */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-emerald-500/50 transition-colors">
                            <p className="text-gray-400 text-sm mb-1">{t('dividend.totalValue')}</p>
                            <p className="text-xl md:text-2xl font-bold text-white tracking-tight">
                                {currency} {formatMoney(result.totalValue)}
                            </p>
                        </div>
                        <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-emerald-500/50 transition-colors">
                            <p className="text-gray-400 text-sm mb-1">{t('dividend.annualDividend')}</p>
                            <p className="text-xl md:text-2xl font-bold text-emerald-400 tracking-tight">
                                {currency} {formatMoney(result.annualDividend)}
                            </p>
                        </div>
                        <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-emerald-500/50 transition-colors">
                            <p className="text-gray-400 text-sm mb-1">{t('dividend.monthlyIncome')}</p>
                            <p className="text-xl md:text-2xl font-bold text-emerald-400 tracking-tight">
                                {currency} {formatMoney(result.monthlyIncome)}
                            </p>
                        </div>
                    </div>

                    <div className="h-[300px] w-full bg-black/20 rounded-xl p-4 border border-white/5">
                        <h3 className="text-sm text-gray-400 mb-4 ml-2">{t('dividend.chartTitle')}</h3>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                                <XAxis dataKey="year" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis
                                    stroke="#94a3b8"
                                    fontSize={12}
                                    tickFormatter={(val) => `${val / 1000}k`}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff' }}
                                    itemStyle={{ color: '#10b981' }}
                                    formatter={(val) => `${currency} ${formatMoney(val)}`}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#10b981"
                                    strokeWidth={2}
                                    fillOpacity={1}
                                    fill="url(#colorValue)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}
