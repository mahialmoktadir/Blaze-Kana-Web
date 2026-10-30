import React from 'react';
import { useApp, NavTab } from '../../context/AppContext';
import { 
  Compass, 
  BookOpen, 
  Languages, 
  Layers, 
  Cpu, 
  Shuffle, 
  PenTool, 
  Headphones, 
  Zap, 
  Calendar, 
  AlertCircle, 
  Star, 
  BarChart3, 
  Settings, 
  Info, 
  Table, 
  Flame,
  CheckCircle2
} from 'lucide-react';

interface NavGroup {
  labelEn: string;
  labelBn: string;
  items: {
    tab: NavTab;
    labelEn: string;
    labelBn: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string | number;
  }[];
}

export const Sidebar: React.FC = () => {
  const { activeTab, navigateTo, settings, mistakes, progress } = useApp();

  const mistakeCount = mistakes.filter(m => !m.reviewed).length;
  const favoriteCount = Object.values(progress).filter(p => p.isFavorite).length;

  const navGroups: NavGroup[] = [
    {
      labelEn: 'Guided Learning',
      labelBn: 'ধারাবাহিক শিখন',
      items: [
        { tab: 'home', labelEn: 'Dashboard', labelBn: 'ড্যাশবোর্ড', icon: Compass },
        { tab: 'learning-path', labelEn: '30-Day Plan', labelBn: '৩০ দিনের পরিকল্পনা', icon: Calendar },
        { tab: 'lessons', labelEn: 'Lessons 0–25', labelBn: 'পাঠ ০–২৫', icon: BookOpen },
      ],
    },
    {
      labelEn: 'Core Curriculum',
      labelBn: 'মূল পাঠ্যক্রম',
      items: [
        { tab: 'kana', labelEn: 'Learn Kana', labelBn: 'কানা চার্ট', icon: Languages },
        { tab: 'kanji', labelEn: 'JLPT N5 Kanji', labelBn: 'এন৫ কাঞ্জি (৮০)', icon: BookOpen, badge: '80' },
        { tab: 'vocabulary', labelEn: 'Vocabulary', labelBn: 'শব্দভাণ্ডার', icon: Layers },
        { tab: 'grammar-lab', labelEn: 'Grammar Lab', labelBn: 'গ্রামার ল্যাব', icon: Cpu },
        { tab: 'sentence-builder', labelEn: 'Sentence Builder', labelBn: 'বাক্য গঠন', icon: Shuffle },
      ],
    },
    {
      labelEn: 'Skills & Practice',
      labelBn: 'দক্ষতা ও অনুশীলন',
      items: [
        { tab: 'writing', labelEn: 'Writing Canvas', labelBn: 'হাতে লেখা ক্যানভাস', icon: PenTool },
        { tab: 'reading-listening', labelEn: 'Reading & Audio', labelBn: 'পড়া ও শোনা', icon: Headphones },
        { tab: 'flashcards', labelEn: 'Flashcards', labelBn: 'ফ্ল্যাশ কার্ড', icon: Layers },
        { tab: 'practice', labelEn: 'Practice Hub', labelBn: 'কাস্টম অনুশীলন', icon: Zap },
        { tab: 'daily-challenge', labelEn: 'Daily Challenge', labelBn: 'দৈনিক চ্যালেঞ্জ', icon: Flame },
      ],
    },
    {
      labelEn: 'Smart Review',
      labelBn: 'স্মার্ট পুনরাবৃত্তি',
      items: [
        { 
          tab: 'mistakes', 
          labelEn: 'Mistake Review', 
          labelBn: 'ভুল পর্যালোচনা', 
          icon: AlertCircle, 
          badge: mistakeCount > 0 ? mistakeCount : undefined 
        },
        { 
          tab: 'favorites', 
          labelEn: 'Saved Words', 
          labelBn: 'সংরক্ষিত শব্দ', 
          icon: Star, 
          badge: favoriteCount > 0 ? favoriteCount : undefined 
        },
        { tab: 'progress', labelEn: 'Analytics', labelBn: 'অগ্রগতি ট্র্যাকার', icon: BarChart3 },
        { tab: 'calendar', labelEn: 'Study Reminders', labelBn: 'পড়ার অনুস্মারক', icon: Calendar },
        { tab: 'appendices', labelEn: 'Appendices Reference', labelBn: 'পরিশিষ্ট তথ্যসূত্র', icon: Table },
      ],
    },
    {
      labelEn: 'System',
      labelBn: 'সিস্টেম',
      items: [
        { tab: 'settings', labelEn: 'Settings', labelBn: 'সেটিংস', icon: Settings },
        { tab: 'about', labelEn: 'About Blaze', labelBn: 'ব্লেইজ পরিচিতি', icon: Info },
      ],
    },
  ];

  return (
    <aside className="w-64 shrink-0 hidden md:block border-r border-stone-200 dark:border-stone-800 bg-[#FAF9F5]/50 dark:bg-[#121316]/50 min-h-[calc(100vh-4rem)] p-4 select-none">
      <div className="space-y-6">
        {navGroups.map((group, gIdx) => (
          <div key={gIdx} className="space-y-1">
            <div className="px-2.5 pb-1 text-[11px] font-semibold tracking-wider text-stone-500 dark:text-stone-400 uppercase">
              {settings.language === 'bn' ? group.labelBn : group.labelEn}
            </div>
            {group.items.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.tab || (item.tab === 'lessons' && activeTab === 'lesson-detail');
              return (
                <button
                  key={item.tab}
                  onClick={() => navigateTo(item.tab)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-md transition-colors ${
                    isActive
                      ? 'bg-[#C23A2B]/10 dark:bg-[#C23A2B]/20 text-[#C23A2B] dark:text-[#E85D4D] font-semibold'
                      : 'text-stone-600 dark:text-stone-300 hover:bg-stone-200/60 dark:hover:bg-stone-800/60 hover:text-stone-900 dark:hover:text-stone-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#C23A2B] dark:text-[#E85D4D]' : 'text-stone-500 dark:text-stone-400'}`} />
                    <span className="truncate">{settings.language === 'bn' ? item.labelBn : item.labelEn}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#C23A2B] text-white">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </aside>
  );
};
