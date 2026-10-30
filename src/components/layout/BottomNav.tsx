import React, { useState } from 'react';
import { useApp, NavTab } from '../../context/AppContext';
import { 
  Home, 
  BookOpen, 
  Languages, 
  Zap, 
  Menu, 
  X,
  Layers,
  Cpu,
  PenTool,
  Headphones,
  Flame,
  AlertCircle,
  BarChart3,
  Settings,
  Info
} from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { activeTab, navigateTo, settings, mistakes } = useApp();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const mistakeCount = mistakes.filter(m => !m.reviewed).length;

  const handleNav = (tab: NavTab) => {
    navigateTo(tab);
    setDrawerOpen(false);
  };

  const primaryTabs = [
    { tab: 'home' as NavTab, labelEn: 'Home', labelBn: 'হোম', icon: Home },
    { tab: 'kanji' as NavTab, labelEn: 'N5 Kanji', labelBn: 'কাঞ্জি', icon: BookOpen },
    { tab: 'lessons' as NavTab, labelEn: 'Lessons', labelBn: 'পাঠ', icon: Layers },
    { tab: 'kana' as NavTab, labelEn: 'Kana', labelBn: 'কানা', icon: Languages },
  ];

  return (
    <>
      {/* Mobile Drawer Sheet */}
      {drawerOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex flex-col justify-end md:hidden animate-fade-in"
          onClick={() => setDrawerOpen(false)}
        >
          <div 
            className="bg-[#FAF9F5] dark:bg-[#151619] border-t border-stone-200 dark:border-stone-800 rounded-t-2xl p-5 max-h-[80vh] overflow-y-auto space-y-4"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-stone-200 dark:border-stone-800">
              <span className="text-sm font-bold text-stone-900 dark:text-stone-100">
                {settings.language === 'bn' ? 'আরও শিক্ষণ টুল' : 'All Learning Tools'}
              </span>
              <button 
                onClick={() => setDrawerOpen(false)} 
                className="p-1.5 text-stone-500 hover:text-stone-900 dark:hover:text-stone-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <button onClick={() => handleNav('kanji')} className="flex items-center gap-2 p-2.5 rounded-lg bg-[#ff5700]/10 text-[#ff5700] border border-[#ff5700]/30 text-left font-bold col-span-2">
                <BookOpen className="w-4 h-4 text-[#ff5700]" />
                <span>{settings.language === 'bn' ? 'JLPT N5 কাঞ্জি (৮০টি অক্ষর)' : 'JLPT N5 Kanji Hub (80 Characters)'}</span>
              </button>

              <button onClick={() => handleNav('vocabulary')} className="flex items-center gap-2 p-2.5 rounded-lg bg-stone-100 dark:bg-stone-800/60 text-stone-800 dark:text-stone-200 text-left">
                <Layers className="w-4 h-4 text-[#ff5700]" />
                <span>{settings.language === 'bn' ? 'শব্দভাণ্ডার' : 'Vocabulary'}</span>
              </button>

              <button onClick={() => handleNav('grammar-lab')} className="flex items-center gap-2 p-2.5 rounded-lg bg-stone-100 dark:bg-stone-800/60 text-stone-800 dark:text-stone-200 text-left">
                <Cpu className="w-4 h-4 text-[#C23A2B]" />
                <span>{settings.language === 'bn' ? 'গ্রামার ল্যাব' : 'Grammar Lab'}</span>
              </button>

              <button onClick={() => handleNav('writing')} className="flex items-center gap-2 p-2.5 rounded-lg bg-stone-100 dark:bg-stone-800/60 text-stone-800 dark:text-stone-200 text-left">
                <PenTool className="w-4 h-4 text-[#C23A2B]" />
                <span>{settings.language === 'bn' ? 'হাতে লেখা ক্যানভাস' : 'Writing Canvas'}</span>
              </button>

              <button onClick={() => handleNav('reading-listening')} className="flex items-center gap-2 p-2.5 rounded-lg bg-stone-100 dark:bg-stone-800/60 text-stone-800 dark:text-stone-200 text-left">
                <Headphones className="w-4 h-4 text-[#C23A2B]" />
                <span>{settings.language === 'bn' ? 'পড়া ও শোনা' : 'Reading & Audio'}</span>
              </button>

              <button onClick={() => handleNav('flashcards')} className="flex items-center gap-2 p-2.5 rounded-lg bg-stone-100 dark:bg-stone-800/60 text-stone-800 dark:text-stone-200 text-left">
                <Layers className="w-4 h-4 text-[#C23A2B]" />
                <span>{settings.language === 'bn' ? 'ফ্ল্যাশ কার্ড' : 'Flashcards'}</span>
              </button>

              <button onClick={() => handleNav('daily-challenge')} className="flex items-center gap-2 p-2.5 rounded-lg bg-stone-100 dark:bg-stone-800/60 text-stone-800 dark:text-stone-200 text-left">
                <Flame className="w-4 h-4 text-amber-500" />
                <span>{settings.language === 'bn' ? 'দৈনিক চ্যালেঞ্জ' : 'Daily Challenge'}</span>
              </button>

              <button onClick={() => handleNav('mistakes')} className="flex items-center gap-2 p-2.5 rounded-lg bg-stone-100 dark:bg-stone-800/60 text-stone-800 dark:text-stone-200 text-left relative">
                <AlertCircle className="w-4 h-4 text-rose-500" />
                <span>{settings.language === 'bn' ? 'ভুল পর্যালোচনা' : 'Mistakes'}</span>
                {mistakeCount > 0 && (
                  <span className="ml-auto text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-[#C23A2B] text-white">
                    {mistakeCount}
                  </span>
                )}
              </button>

              <button onClick={() => handleNav('progress')} className="flex items-center gap-2 p-2.5 rounded-lg bg-stone-100 dark:bg-stone-800/60 text-stone-800 dark:text-stone-200 text-left">
                <BarChart3 className="w-4 h-4 text-emerald-500" />
                <span>{settings.language === 'bn' ? 'অগ্রগতি ট্র্যাকার' : 'Analytics'}</span>
              </button>

              <button onClick={() => handleNav('settings')} className="flex items-center gap-2 p-2.5 rounded-lg bg-stone-100 dark:bg-stone-800/60 text-stone-800 dark:text-stone-200 text-left">
                <Settings className="w-4 h-4 text-stone-500" />
                <span>{settings.language === 'bn' ? 'সেটিংস' : 'Settings'}</span>
              </button>

              <button onClick={() => handleNav('about')} className="flex items-center gap-2 p-2.5 rounded-lg bg-stone-100 dark:bg-stone-800/60 text-stone-800 dark:text-stone-200 text-left">
                <Info className="w-4 h-4 text-stone-500" />
                <span>{settings.language === 'bn' ? 'পরিচিতি' : 'About Blaze'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Persistent Bottom Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 h-14 bg-[#FAF9F5]/95 dark:bg-[#121316]/95 border-t border-stone-200 dark:border-stone-800 backdrop-blur-md md:hidden flex items-center justify-around px-2">
        {primaryTabs.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.tab || (item.tab === 'lessons' && activeTab === 'lesson-detail');
          return (
            <button
              key={item.tab}
              onClick={() => handleNav(item.tab)}
              className={`flex flex-col items-center justify-center w-14 py-1 text-[10px] transition-colors ${
                isActive 
                  ? 'text-[#C23A2B] dark:text-[#E85D4D] font-semibold' 
                  : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
              }`}
            >
              <Icon className="w-4 h-4 mb-0.5" />
              <span>{settings.language === 'bn' ? item.labelBn : item.labelEn}</span>
            </button>
          );
        })}

        {/* More Menu */}
        <button
          onClick={() => setDrawerOpen(true)}
          className={`flex flex-col items-center justify-center w-14 py-1 text-[10px] text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 relative`}
        >
          <Menu className="w-4 h-4 mb-0.5" />
          <span>{settings.language === 'bn' ? 'আরও' : 'More'}</span>
          {mistakeCount > 0 && (
            <span className="absolute top-1 right-3 w-2 h-2 rounded-full bg-[#C23A2B]" />
          )}
        </button>
      </nav>
    </>
  );
};
