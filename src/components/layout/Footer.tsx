import React from 'react';
import { useApp } from '../../context/AppContext';
import { ExternalLink } from 'lucide-react';
import { BlazeFlameEmblem } from '../common/BlazeLogo';

export const Footer: React.FC = () => {
  const { navigateTo, settings } = useApp();

  return (
    <footer className="w-full border-t border-stone-200 dark:border-stone-800 bg-[#FAF9F5] dark:bg-[#121316] py-10 px-4 sm:px-6 transition-colors mb-14 md:mb-0">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md bg-[#0b0b0c] p-0.5 flex items-center justify-center border border-stone-800">
              <BlazeFlameEmblem className="w-full h-full" bgFill="#0b0b0c" />
            </div>
            <span className="font-bold text-base tracking-tight text-stone-900 dark:text-stone-100">
              BLAZE<span className="text-[#ff5700]"> KANA</span>
            </span>
            <span className="text-xs text-stone-400">·</span>
            <span className="text-xs text-stone-500 dark:text-stone-400">
              Japanese Learning Platform
            </span>
          </div>
          <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed max-w-md">
            Developed by <strong>BLAZE</strong> · Created by <strong>Blaze Channel</strong><br />
            Creator & Designer: <strong>Mahi Al-Moktadir</strong>
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 text-xs text-stone-600 dark:text-stone-400">
          <div className="flex items-center gap-4">
            <a 
              href="https://www.facebook.com/mahialmoktadir" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-[#ff5700] transition-colors"
            >
              Facebook <ExternalLink className="w-3 h-3 text-stone-400" />
            </a>
            <a 
              href="https://www.instagram.com/mahialmoktadir/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-[#ff5700] transition-colors"
            >
              Instagram <ExternalLink className="w-3 h-3 text-stone-400" />
            </a>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigateTo('about')}
              className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
            >
              {settings.language === 'bn' ? 'পরিচিতি' : 'About Platform'}
            </button>
            <span className="text-stone-300 dark:text-stone-700">·</span>
            <button 
              onClick={() => navigateTo('appendices')}
              className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
            >
              {settings.language === 'bn' ? 'তথ্যসূত্র' : 'Reference Tables'}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-4 border-t border-stone-200/60 dark:border-stone-800/60 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-stone-500 dark:text-stone-400">
        <span>© 2026 Blaze — Created by Mahi Al-Moktadir</span>
        <span>A structured vocabulary-first 30-day Japanese curriculum</span>
      </div>
    </footer>
  );
};
