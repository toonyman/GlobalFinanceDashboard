import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DividendCalculator from './components/DividendCalculator';
import DigitalAssetCalculator from './components/DigitalAssetCalculator';
import ThemeToggle from './components/ThemeToggle';
import LanguageSwitcher from './components/LanguageSwitcher';
import ShareButton from './components/ShareButton';

import CurrencySwitcher from './components/CurrencySwitcher';
import SEO from './components/SEO';
import { LayoutDashboard, WalletCards } from 'lucide-react';

function App() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('dividend');
  const [currency, setCurrency] = useState('USD'); // Default currency

  const currencySymbol = currency === 'USD' ? '$' : '₩';

  return (
    <div className="min-h-screen pb-12 font-sans selection:bg-electric-500/30">
      <SEO />

      {/* Navbar */}
      <nav className="fixed top-0 inset-x-0 z-40 bg-white/80 dark:bg-background/80 backdrop-blur-lg border-b border-slate-200 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">
              GF
            </div>
            <h1 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-gray-400 hidden sm:block">
              {t('app.title')}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <CurrencySwitcher currency={currency} setCurrency={setCurrency} />
            <LanguageSwitcher />
            <ThemeToggle />
            <ShareButton />
          </div>
        </div>
      </nav>

      <main className="pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


        {/* Tab Navigation */}
        <div className="flex justify-center mb-10 animate-slide-up">
          <div className="bg-slate-100 dark:bg-white/5 backdrop-blur-sm p-1.5 rounded-2xl border border-slate-200 dark:border-white/10 flex gap-2">
            <button
              onClick={() => setActiveTab('dividend')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 font-medium ${activeTab === 'dividend'
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span className="hidden sm:inline">{t('app.dividendCalculator')}</span>
              <span className="sm:hidden">Dividend</span>
            </button>
            <button
              onClick={() => setActiveTab('crypto')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 font-medium ${activeTab === 'crypto'
                ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
            >
              <WalletCards className="w-4 h-4" />
              <span className="hidden sm:inline">{t('app.cryptoCalculator')}</span>
              <span className="sm:hidden">Crypto</span>
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="max-w-4xl mx-auto">
          <div className="transition-all duration-500 transform">
            {activeTab === 'dividend'
              ? <DividendCalculator currencySymbol={currencySymbol} />
              : <DigitalAssetCalculator currencySymbol={currencySymbol} />
            }
          </div>
        </div>


      </main>

      <footer className="py-8 text-center text-slate-500 dark:text-gray-500 text-sm border-t border-slate-200 dark:border-white/5 mt-12 bg-slate-50 dark:bg-black/20 backdrop-blur-lg">
        <p>&copy; {new Date().getFullYear()} Global Finance Dashboard. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
