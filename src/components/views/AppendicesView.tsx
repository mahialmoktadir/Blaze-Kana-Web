import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  COUNTERS_TABLE, 
  VERB_CONJUGATION_TABLE, 
  JAPANESE_NUMBERS, 
  TIME_EXPRESSIONS 
} from '../../data/appendicesData';
import { Table, Volume2, Search } from 'lucide-react';

export const AppendicesView: React.FC = () => {
  const { settings, speakText } = useApp();
  const [activeTab, setActiveTab] = useState<'counters' | 'verbs' | 'numbers' | 'time'>('counters');
  const [search, setSearch] = useState('');

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200 dark:border-stone-800">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <span>{settings.language === 'bn' ? 'পরিশিষ্ট ও তথ্যসূত্রের সারণী' : 'Master Reference Tables'}</span>
            <span className="text-xs px-2 py-0.5 rounded bg-[#C23A2B]/10 text-[#C23A2B] font-mono">
              Appendices A–D
            </span>
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
            Authoritative reference charts for Japanese Counters, Verb Conjugations (Group I, II, III), Numbers (1–100M), and Time.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 p-1 bg-stone-200/60 dark:bg-stone-800 rounded-xl overflow-x-auto">
        <button
          onClick={() => setActiveTab('counters')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
            activeTab === 'counters' ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-xs' : 'text-stone-600 dark:text-stone-400'
          }`}
        >
          Appendix C: Counters (助数詞)
        </button>
        <button
          onClick={() => setActiveTab('verbs')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
            activeTab === 'verbs' ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-xs' : 'text-stone-600 dark:text-stone-400'
          }`}
        >
          Appendix D: Verb Conjugations
        </button>
        <button
          onClick={() => setActiveTab('numbers')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
            activeTab === 'numbers' ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-xs' : 'text-stone-600 dark:text-stone-400'
          }`}
        >
          Appendix A: Numbers (数字)
        </button>
        <button
          onClick={() => setActiveTab('time')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
            activeTab === 'time' ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-xs' : 'text-stone-600 dark:text-stone-400'
          }`}
        >
          Appendix B: Time Expressions
        </button>
      </div>

      {/* Appendix C: Counters */}
      {activeTab === 'counters' && (
        <div className="space-y-4 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {COUNTERS_TABLE.map((counter, idx) => (
              <div
                key={idx}
                className="p-5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl space-y-3 shadow-xs"
              >
                <div className="flex items-center justify-between pb-2 border-b border-stone-100 dark:border-stone-800">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold font-jp text-stone-900 dark:text-stone-100">
                      {counter.kanji}
                    </span>
                    <span className="text-xs font-bold text-stone-700 dark:text-stone-300">
                      {counter.category}
                    </span>
                  </div>
                  <span className="text-[11px] text-stone-400 font-mono">
                    How many: {counter.interrogative.japanese} ({counter.interrogative.romaji})
                  </span>
                </div>

                <p className="text-xs text-stone-500">
                  {settings.language === 'bn' ? counter.descriptionBn : counter.descriptionEn}
                </p>

                <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                  {counter.items.slice(0, 6).map((item) => (
                    <div 
                      key={item.count}
                      onClick={() => speakText(item.kana)}
                      className="cursor-pointer p-2 rounded-lg bg-stone-50 dark:bg-stone-800/60 hover:bg-[#C23A2B]/10 hover:border-[#C23A2B]/40 border border-stone-200/50 dark:border-stone-700 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-1.5 font-jp">
                        <span className="font-mono text-stone-400">{item.count}.</span>
                        <span className="font-bold text-stone-900 dark:text-stone-100">{item.japanese}</span>
                      </div>
                      <span className="font-mono text-[11px] text-[#C23A2B]">{item.romaji}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Appendix D: Verb Conjugation Master Table */}
      {activeTab === 'verbs' && (
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl overflow-hidden shadow-xs animate-fade-in">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-stone-100 dark:bg-stone-800 border-b border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 font-semibold">
                  <th className="p-3">Lesson</th>
                  <th className="p-3">Meaning</th>
                  <th className="p-3">Class</th>
                  <th className="p-3">Dictionary Form</th>
                  <th className="p-3">-Masu Form</th>
                  <th className="p-3">-Te Form</th>
                  <th className="p-3">-Nai Form</th>
                  <th className="p-3">-Ta Form</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-stone-800 font-jp">
                {VERB_CONJUGATION_TABLE.map((v, i) => (
                  <tr key={i} className="hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors">
                    <td className="p-3 font-mono text-stone-400">{v.lesson}</td>
                    <td className="p-3 font-sans font-medium text-stone-900 dark:text-stone-100">
                      {settings.language === 'bn' ? v.meaningBn : v.meaningEn}
                    </td>
                    <td className="p-3 font-mono text-[11px] text-stone-500">{v.group}</td>
                    <td className="p-3 font-bold text-stone-900 dark:text-stone-100">{v.dictionary}</td>
                    <td className="p-3 text-stone-700 dark:text-stone-300">{v.masu}</td>
                    <td className="p-3 text-emerald-600 dark:text-emerald-400 font-semibold">{v.te}</td>
                    <td className="p-3 text-rose-600 dark:text-rose-400">{v.nai}</td>
                    <td className="p-3 text-amber-600 dark:text-amber-400">{v.ta}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Appendix A: Numbers */}
      {activeTab === 'numbers' && (
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 space-y-4 shadow-xs animate-fade-in">
          <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wider">
            Japanese Numerals (1 to 100 Million)
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            {JAPANESE_NUMBERS.map((num, i) => (
              <div 
                key={i} 
                onClick={() => speakText(num.kana)}
                className="cursor-pointer p-3 rounded-xl bg-stone-50 dark:bg-stone-800 hover:bg-[#C23A2B]/10 border border-stone-200/60 dark:border-stone-700 transition-all flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-stone-400 font-semibold">{num.value.toLocaleString()}</span>
                  <Volume2 className="w-3.5 h-3.5 text-stone-400" />
                </div>
                <div className="font-jp text-xl font-bold text-stone-900 dark:text-stone-100 mt-1">
                  {num.kanji}
                </div>
                <div className="text-xs font-mono text-[#C23A2B] mt-0.5">
                  {num.romaji}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Appendix B: Time */}
      {activeTab === 'time' && (
        <div className="space-y-6 animate-fade-in">
          {/* Days of Week */}
          <div className="p-6 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl space-y-3 shadow-xs">
            <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wider">
              Days of the Week (曜日)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 text-xs text-center">
              {TIME_EXPRESSIONS.daysOfWeek.map((day, i) => (
                <div key={i} className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200/60 dark:border-stone-700">
                  <div className="font-jp font-bold text-base text-stone-900 dark:text-stone-100">{day.kanji}</div>
                  <div className="font-mono text-[11px] text-[#C23A2B]">{day.romaji}</div>
                  <div className="text-[11px] text-stone-500 mt-1">{settings.language === 'bn' ? day.bn : day.en}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Months */}
          <div className="p-6 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl space-y-3 shadow-xs">
            <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wider">
              Months of the Year (月)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2.5 text-xs">
              {TIME_EXPRESSIONS.months.map((m, i) => (
                <div key={i} className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200/60 dark:border-stone-700">
                  <div className="font-jp font-bold text-base text-stone-900 dark:text-stone-100">{m.kanji}</div>
                  <div className="font-mono text-[11px] text-[#C23A2B]">{m.romaji}</div>
                  <div className="text-[11px] text-stone-500 mt-0.5">{settings.language === 'bn' ? m.bn : m.en}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Irregular Days of Month */}
          <div className="p-6 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl space-y-3 shadow-xs">
            <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wider">
              Irregular Calendar Days of the Month (1st, 2nd, 3rd, 4th, 20th...)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
              {TIME_EXPRESSIONS.daysOfMonthIrregular.map((d, i) => (
                <div key={i} className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200/60 dark:border-stone-700 flex items-center justify-between">
                  <div>
                    <span className="font-mono font-bold text-stone-400 mr-2">{d.day}</span>
                    <span className="font-jp font-bold text-stone-900 dark:text-stone-100">{d.kanji}</span>
                  </div>
                  <span className="font-mono text-[#C23A2B]">{d.romaji}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
