import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DividendCalculator from './components/DividendCalculator';
import DigitalAssetCalculator from './components/DigitalAssetCalculator';
import ThemeToggle from './components/ThemeToggle';
import LanguageSwitcher from './components/LanguageSwitcher';
import ShareButton from './components/ShareButton';
import AdPlaceholder from './components/AdPlaceholder';
import SEO from './components/SEO';
import { LayoutDashboard, WalletCards } from 'lucide-react';

function App() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('dividend');

  return (
    <div className="min-h-screen pb-12 font-sans selection:bg-electric-500/30">
      <SEO />

      {/* Navbar */}
      <nav className="fixed top-0 inset-x-0 z-40 bg-background/80 backdrop-blur-lg border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">
              GF
            </div>
            <h1 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 hidden sm:block">
              {t('app.title')}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <ThemeToggle />
            <ShareButton />
          </div>
        </div>
      </nav>

      <main className="pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Ad Space */}
        <div className="mb-8 animate-fade-in">
          <AdPlaceholder height="90px" />
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-10 animate-slide-up">
          <div className="bg-white/5 backdrop-blur-sm p-1.5 rounded-2xl border border-white/10 flex gap-2">
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left/Main Column - Calculator */}
          <div className="lg:col-span-12 xl:col-span-9 space-y-8">
            <div className="transition-all duration-500 transform">
              {activeTab === 'dividend' ? <DividendCalculator /> : <DigitalAssetCalculator />}
            </div>

            {/* Mid Ad Space */}
            <AdPlaceholder height="250px" />
          </div>

          {/* Right Column - Placeholder or Future Features (Hidden on mobile for now, or used for Ads) */}
          <div className="hidden xl:block xl:col-span-3 space-y-8">
            <div className="glass-card p-6 h-[600px] flex flex-col justify-center items-center text-center">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Pro Features</h3>
              <p className="text-gray-400 mb-6">Unlock advanced analytics and personalized portfolio tracking.</p>
              <button className="glass-button w-full border-indigo-500/30 hover:bg-indigo-500/20 text-indigo-300">
                Coming Soon
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Ad Space */}
        <div className="my-8">
          <AdPlaceholder height="90px" />
        </div>
      </main>

      <footer className="py-8 text-center text-gray-500 text-sm border-t border-white/5 mt-12 bg-black/20 backdrop-blur-lg">
        <p>&copy; {new Date().getFullYear()} Global Finance Dashboard. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
