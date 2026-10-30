import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { InterfaceLanguage } from '../../types';
import { Sparkles, Globe, Clock, Check, ArrowRight } from 'lucide-react';

export const OnboardingView: React.FC = () => {
  const { settings, updateSettings, navigateTo } = useApp();

  const [step, setStep] = useState(1);
  const [selectedLang, setSelectedLang] = useState<InterfaceLanguage>(settings.language || 'en');
  const [selectedGoal, setSelectedGoal] = useState<number>(15);
  const [selectedLevel, setSelectedLevel] = useState<'beginner' | 'kana-known' | 'elementary'>('beginner');
  const [wantsBangla, setWantsBangla] = useState(true);

  if (settings.onboardingCompleted) return null;

  const handleFinish = () => {
    updateSettings({
      language: selectedLang,
      dailyGoalMinutes: selectedGoal,
      placementLevel: selectedLevel,
      showBangla: wantsBangla,
      onboardingCompleted: true,
    });
    navigateTo('home');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-[#FAF9F5] dark:bg-[#151619] border border-stone-300 dark:border-stone-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
        {/* Step Indicator */}
        <div className="flex items-center justify-between text-xs text-stone-400 font-mono">
          <span>BLAZE KANA WELCOME</span>
          <span>Step {step} of 3</span>
        </div>

        {/* Step 1: Language & Bengali explanations */}
        {step === 1 && (
          <div className="space-y-5 animate-fade-in">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">
                Choose Your Learning Interface
              </h2>
              <p className="text-xs text-stone-500">
                Select your preferred language. You can change this at any time in Settings.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { code: 'en' as const, label: 'English', sub: 'Standard' },
                { code: 'bn' as const, label: 'বাংলা', sub: 'Bengali' },
                { code: 'ja' as const, label: '日本語', sub: 'Japanese' },
              ].map(lang => (
                <button
                  key={lang.code}
                  onClick={() => setSelectedLang(lang.code)}
                  className={`p-4 rounded-2xl border text-center transition-all ${
                    selectedLang === lang.code
                      ? 'border-[#C23A2B] bg-[#C23A2B]/10 text-[#C23A2B] font-bold shadow-xs'
                      : 'border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300'
                  }`}
                >
                  <span className="text-base block">{lang.label}</span>
                  <span className="text-[10px] text-stone-400">{lang.sub}</span>
                </button>
              ))}
            </div>

            <label className="flex items-center gap-3 p-3 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 cursor-pointer">
              <input
                type="checkbox"
                checked={wantsBangla}
                onChange={(e) => setWantsBangla(e.target.checked)}
                className="w-4 h-4 accent-[#C23A2B]"
              />
              <span className="text-xs text-stone-700 dark:text-stone-300 font-medium">
                Include Bengali (বাংলা) translations for vocabulary and grammar rules
              </span>
            </label>

            <button
              onClick={() => setStep(2)}
              className="w-full py-3 text-xs font-semibold text-white bg-[#C23A2B] hover:bg-[#A82E21] rounded-xl shadow-xs flex items-center justify-center gap-2"
            >
              <span>Next: Daily Study Goal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 2: Daily Study Goal */}
        {step === 2 && (
          <div className="space-y-5 animate-fade-in">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">
                Set Your Daily Study Goal
              </h2>
              <p className="text-xs text-stone-500">
                How many minutes would you like to dedicate to Japanese each day?
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { min: 10, label: '10 min / day', desc: 'Casual pace' },
                { min: 15, label: '15 min / day', desc: 'Recommended standard' },
                { min: 20, label: '20 min / day', desc: 'Accelerated learning' },
                { min: 30, label: '30 min / day', desc: 'Intensive JLPT path' },
              ].map(goal => (
                <button
                  key={goal.min}
                  onClick={() => setSelectedGoal(goal.min)}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    selectedGoal === goal.min
                      ? 'border-[#C23A2B] bg-[#C23A2B]/10 text-[#C23A2B] font-bold shadow-xs'
                      : 'border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300'
                  }`}
                >
                  <span className="text-sm block">{goal.label}</span>
                  <span className="text-[11px] text-stone-400 font-normal">{goal.desc}</span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setStep(1)}
                className="w-1/3 py-3 text-xs font-semibold rounded-xl border border-stone-200 dark:border-stone-800 text-stone-600"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="w-2/3 py-3 text-xs font-semibold text-white bg-[#C23A2B] hover:bg-[#A82E21] rounded-xl shadow-xs flex items-center justify-center gap-2"
              >
                <span>Next: Level Assessment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Current Level */}
        {step === 3 && (
          <div className="space-y-5 animate-fade-in">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">
                Your Current Japanese Experience
              </h2>
              <p className="text-xs text-stone-500">
                We'll tailor your personalized learning path starting point.
              </p>
            </div>

            <div className="space-y-2.5">
              {[
                { key: 'beginner' as const, title: 'Absolute Beginner', desc: 'I am starting from scratch and want to learn Hiragana and Katakana first.' },
                { key: 'kana-known' as const, title: 'Know Hiragana & Katakana', desc: 'I can read basic Kana, ready to dive straight into Lesson 1 vocabulary.' },
                { key: 'elementary' as const, title: 'Elementary Learner', desc: 'I have some basic vocabulary, want to master all 25 Minna-style lessons.' }
              ].map(lvl => (
                <button
                  key={lvl.key}
                  onClick={() => setSelectedLevel(lvl.key)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all ${
                    selectedLevel === lvl.key
                      ? 'border-[#C23A2B] bg-[#C23A2B]/10 text-[#C23A2B] shadow-xs'
                      : 'border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300'
                  }`}
                >
                  <span className="text-xs font-bold block">{lvl.title}</span>
                  <span className="text-[11px] text-stone-500 block mt-0.5">{lvl.desc}</span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setStep(2)}
                className="w-1/3 py-3 text-xs font-semibold rounded-xl border border-stone-200 dark:border-stone-800 text-stone-600"
              >
                Back
              </button>
              <button
                onClick={handleFinish}
                className="w-2/3 py-3 text-xs font-semibold text-white bg-[#C23A2B] hover:bg-[#A82E21] rounded-xl shadow-xs flex items-center justify-center gap-2"
              >
                <span>Enter Blaze Kana</span>
                <Check className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
