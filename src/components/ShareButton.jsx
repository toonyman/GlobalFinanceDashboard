import React, { useState } from 'react';
import { Share2, Facebook, Twitter, Linkedin, Link, Check, MessageCircle, MessageSquare } from 'lucide-react';

export default function ShareButton() {
    const [isOpen, setIsOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    const url = window.location.href;
    const title = document.title;

    const shareLinks = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
        linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
        reddit: `https://reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const openShare = (network) => {
        window.open(shareLinks[network], '_blank', 'width=600,height=400');
        setIsOpen(false);
    };

    return (
        <div className="relative z-50">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-electric-500 to-indigo-600 hover:from-electric-400 hover:to-indigo-500 text-white font-medium shadow-lg shadow-blue-500/20 transition duration-300 transform hover:scale-105"
            >
                <Share2 className="w-4 h-4" />
                <span>Share</span>
            </button>

            {isOpen && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
                    <div className="absolute right-0 top-12 w-48 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-xl shadow-2xl z-50 p-2 transform animate-fade-in origin-top-right">
                        <button onClick={() => openShare('facebook')} className="flex items-center gap-3 w-full px-3 py-2 text-sm text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg transition-colors">
                            <Facebook className="w-4 h-4 text-blue-500" /> Facebook
                        </button>
                        <button onClick={() => openShare('twitter')} className="flex items-center gap-3 w-full px-3 py-2 text-sm text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg transition-colors">
                            <Twitter className="w-4 h-4 text-sky-400" /> X (Twitter)
                        </button>
                        <button onClick={() => openShare('linkedin')} className="flex items-center gap-3 w-full px-3 py-2 text-sm text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg transition-colors">
                            <Linkedin className="w-4 h-4 text-blue-600" /> LinkedIn
                        </button>
                        <button onClick={() => openShare('reddit')} className="flex items-center gap-3 w-full px-3 py-2 text-sm text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg transition-colors">
                            <MessageSquare className="w-4 h-4 text-orange-500" /> Reddit
                        </button>
                        <div className="h-px bg-slate-200 dark:bg-white/10 my-1" />
                        <button onClick={handleCopy} className="flex items-center gap-3 w-full px-3 py-2 text-sm text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg transition-colors">
                            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Link className="w-4 h-4 text-gray-400" />}
                            {copied ? 'Copied!' : 'Copy Link'}
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
