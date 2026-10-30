import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { senseiService } from '../../services/senseiService';
import { Sparkles, X, Send, Brain, Bot, HelpCircle } from 'lucide-react';

export const SenseiModal: React.FC = () => {
  const { 
    senseiModalOpen, 
    closeSensei, 
    senseiInitialQuery, 
    senseiContext, 
    settings 
  } = useApp();

  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [modelUsed, setModelUsed] = useState<string>('gemini-4-argon (Thinking Level: High)');

  const quickPrompts = [
    'Why is は (wa) used instead of が (ga) in this sentence?',
    'Explain Verb Groups and the te-form conjugation rules.',
    'When should I use あげます vs くれます?',
    'What is the difference between と and たら conditionals?',
    'How do I distinguish animate (います) vs inanimate (あります)?'
  ];

  useEffect(() => {
    if (senseiModalOpen) {
      if (senseiInitialQuery) {
        setQuery(senseiInitialQuery);
        handleAsk(senseiInitialQuery);
      } else {
        setQuery('');
        setResult(null);
      }
    }
  }, [senseiModalOpen, senseiInitialQuery]);

  if (!senseiModalOpen) return null;

  const handleAsk = async (userPrompt?: string) => {
    const textToAsk = userPrompt || query;
    if (!textToAsk.trim() || loading) return;

    setLoading(true);
    setResult(null);

    const res = await senseiService.getExplanation({
      question: textToAsk,
      context: senseiContext,
      userLanguage: settings.language,
    });

    setResult(res.explanation);
    setModelUsed(res.model === 'gemini-4-argon' ? 'Gemini 4 Argon (Thinking: High)' : 'Sensei Pedagogical Engine');
    setLoading(false);
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in"
      onClick={closeSensei}
    >
      <div 
        className="w-full max-w-2xl bg-[#FAF9F5] dark:bg-[#151619] border border-stone-300 dark:border-stone-800 rounded-2xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 dark:border-stone-800 bg-white/70 dark:bg-stone-900/70">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#C23A2B] to-[#E11D48] text-white flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                  {settings.language === 'bn' ? 'ব্লেইজ সেনসেই এআই' : 'Blaze Sensei AI'}
                </h3>
                <span className="text-[10px] font-mono text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 px-2 py-0.5 rounded border border-rose-200/50 dark:border-rose-900/50 flex items-center gap-1">
                  <Brain className="w-3 h-3" /> Thinking Mode: HIGH
                </span>
              </div>
              <p className="text-[11px] text-stone-500 dark:text-stone-400">
                Deep linguistic & grammar nuance tutor powered by Gemini 4 Argon
              </p>
            </div>
          </div>
          <button 
            onClick={closeSensei} 
            className="p-1.5 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {senseiContext && (
            <div className="p-3 bg-stone-100 dark:bg-stone-800/60 rounded-lg text-xs text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700">
              <span className="font-semibold text-stone-800 dark:text-stone-200">Current Context:</span> {senseiContext}
            </div>
          )}

          {/* Quick prompt suggestions */}
          {!result && !loading && (
            <div className="space-y-2">
              <p className="text-xs font-semibold text-stone-600 dark:text-stone-400 flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-[#C23A2B]" />
                {settings.language === 'bn' ? 'জনপ্রিয় ব্যাকরণ জিজ্ঞাসা:' : 'Frequently asked Japanese nuances:'}
              </p>
              <div className="flex flex-col gap-1.5">
                {quickPrompts.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setQuery(p);
                      handleAsk(p);
                    }}
                    className="text-left text-xs p-2.5 rounded-lg border border-stone-200 dark:border-stone-800 hover:border-[#C23A2B]/40 hover:bg-[#C23A2B]/5 transition-all text-stone-700 dark:text-stone-300"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Loading state with thinking indicator */}
          {loading && (
            <div className="py-12 flex flex-col items-center justify-center space-y-3 text-center">
              <div className="relative">
                <div className="w-10 h-10 rounded-full border-2 border-[#C23A2B] border-t-transparent animate-spin" />
                <Brain className="w-5 h-5 text-[#C23A2B] absolute inset-0 m-auto animate-pulse" />
              </div>
              <p className="text-xs font-medium text-stone-700 dark:text-stone-300">
                Sensei is reasoning deeply with Gemini 4 Argon...
              </p>
              <p className="text-[11px] text-stone-500 max-w-sm">
                Analyzing syntax hierarchy, particle cases, and nuances to craft your explanation.
              </p>
            </div>
          )}

          {/* Explanation Output */}
          {result && (
            <div className="space-y-3">
              <div className="p-4 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl space-y-2 text-xs leading-relaxed text-stone-800 dark:text-stone-200 whitespace-pre-line font-sans">
                {result}
              </div>
              <div className="flex items-center justify-between text-[11px] text-stone-500">
                <span>Model: {modelUsed}</span>
                <button
                  onClick={() => { setResult(null); setQuery(''); }}
                  className="text-[#C23A2B] hover:underline"
                >
                  Ask another question
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Input Footer */}
        <div className="p-4 border-t border-stone-200 dark:border-stone-800 bg-white/70 dark:bg-stone-900/70">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleAsk(); }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={settings.language === 'bn' ? 'যেকোনো ব্যাকরণ বা শব্দের নিয়ম জিজ্ঞাসা করুন...' : 'Ask Sensei about any particle, grammar rule, or sentence nuance...'}
              className="flex-1 px-3.5 py-2 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-[#C23A2B]"
            />
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#C23A2B] hover:bg-[#A82E21] disabled:opacity-50 rounded-lg flex items-center gap-1.5 transition-all shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Ask</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
