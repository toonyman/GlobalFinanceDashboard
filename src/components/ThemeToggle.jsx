import React from 'react';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle({ theme, toggleTheme }) {

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-slate-200/50 hover:bg-slate-200/80 dark:bg-white/10 dark:hover:bg-white/20 transition-colors duration-300 backdrop-blur-sm border border-slate-200/60 dark:border-white/10"
            aria-label="Toggle theme"
        >
            {theme === 'dark' ? (
                <Moon className="w-5 h-5 text-blue-400" />
            ) : (
                <Sun className="w-5 h-5 text-yellow-500" />
            )}
        </button>
    );
}
