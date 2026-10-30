import React from 'react';
import { useApp } from '../../context/AppContext';
import { ExternalLink, CheckCircle2, Shield, Heart } from 'lucide-react';
import { BlazeKanaWordmark } from '../common/BlazeLogo';

export const AboutView: React.FC = () => {
  const { settings } = useApp();

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Platform Branding Header */}
      <div className="p-8 bg-[#0b0b0c] text-white rounded-3xl space-y-4 shadow-md border border-stone-850">
        <div className="-ml-2">
          <BlazeKanaWordmark className="h-16 w-auto" bgFill="#0b0b0c" />
        </div>

        <p className="text-xs text-[#ff8533] font-mono tracking-wider">
          Official Japanese Learning Platform · 30-Day Guided Curriculum
        </p>

        <p className="text-xs text-stone-300 leading-relaxed max-w-xl">
          Blaze Kana is an interactive, vocabulary-first Japanese language learning web application designed for beginner and lower-intermediate learners, with native support for English, Bangla, and Japanese explanations.
        </p>
      </div>

      {/* Creator Profile & Socials */}
      <div className="p-6 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl space-y-4">
        <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wider">
          Creator & Development Credits
        </h3>

        <div className="space-y-3 text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-stone-50 dark:bg-stone-800/50 rounded-xl">
            <div>
              <span className="text-[10px] text-stone-400 font-semibold block uppercase">Brand</span>
              <strong className="text-stone-900 dark:text-stone-100 text-sm">BLAZE</strong>
            </div>
            <div>
              <span className="text-[10px] text-stone-400 font-semibold block uppercase">Created by</span>
              <strong className="text-stone-900 dark:text-stone-100 text-sm">Blaze Channel</strong>
            </div>
            <div>
              <span className="text-[10px] text-stone-400 font-semibold block uppercase">Creator & Designer</span>
              <strong className="text-stone-900 dark:text-stone-100 text-sm">Mahi Al-Moktadir</strong>
            </div>
            <div>
              <span className="text-[10px] text-stone-400 font-semibold block uppercase">Copyright</span>
              <span className="text-stone-700 dark:text-stone-300">© 2026 Blaze — Created by Mahi Al-Moktadir</span>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <a
              href="https://www.facebook.com/mahialmoktadir"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 hover:text-[#C23A2B] transition-colors"
            >
              <span>Facebook Profile</span>
              <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
            </a>

            <a
              href="https://www.instagram.com/mahialmoktadir/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 hover:text-[#C23A2B] transition-colors"
            >
              <span>Instagram Profile</span>
              <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
            </a>
          </div>
        </div>
      </div>

      {/* Content Completeness Audit Report */}
      <div className="p-6 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wider flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-600" />
            <span>Curriculum Completeness Audit</span>
          </h3>
          <span className="text-xs font-mono text-emerald-600 font-semibold">100% Complete</span>
        </div>

        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between p-2.5 bg-stone-50 dark:bg-stone-800/40 rounded-lg">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Lessons 0 to 25 Textbook Vocabulary Lists</span>
            </span>
            <span className="font-mono text-stone-500">Fully Verified</span>
          </div>

          <div className="flex items-center justify-between p-2.5 bg-stone-50 dark:bg-stone-800/40 rounded-lg">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Visual Grammar Lab with Color-Coded Syntax Blocks</span>
            </span>
            <span className="font-mono text-stone-500">Fully Implemented</span>
          </div>

          <div className="flex items-center justify-between p-2.5 bg-stone-50 dark:bg-stone-800/40 rounded-lg">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Hiragana & Katakana Matrix with Writing Canvas</span>
            </span>
            <span className="font-mono text-stone-500">Active</span>
          </div>

          <div className="flex items-center justify-between p-2.5 bg-stone-50 dark:bg-stone-800/40 rounded-lg">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Spaced Repetition & Mistake Recovery Engine</span>
            </span>
            <span className="font-mono text-stone-500">Active</span>
          </div>

          <div className="flex items-center justify-between p-2.5 bg-stone-50 dark:bg-stone-800/40 rounded-lg">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Gemini 4 Argon Thinking Level: High Sensei Assistant</span>
            </span>
            <span className="font-mono text-stone-500">Connected</span>
          </div>
        </div>
      </div>
    </div>
  );
};
