import React from 'react';
import { useApp } from '../../context/AppContext';
import { LESSONS_DATA } from '../../data/lessonsData';
import { 
  BookOpen, 
  Flame, 
  Sparkles, 
  Calendar, 
  ArrowRight, 
  Award,
  CheckCircle2,
  Compass
} from 'lucide-react';

export const BlazeDashboardBanner: React.FC = () => {
  const { 
    settings, 
    completedLessons, 
    streak, 
    progress, 
    navigateTo 
  } = useApp();

  // Find next uncompleted lesson
  const nextLesson = LESSONS_DATA.find(l => !completedLessons.includes(l.id)) || LESSONS_DATA[1];
  const totalMastered = Object.values(progress).filter(p => p.mastery === 'mastered').length;

  return (
    <div className="relative rounded-3xl bg-[#0b0b0c] text-white p-6 sm:p-8 lg:p-10 border border-stone-800 shadow-2xl overflow-hidden">
      {/* Background SVG Canvas Layer - Direct 1:1 Rendering of the Official Vector Art */}
      <div className="absolute inset-0 w-full h-full pointer-events-none opacity-20 sm:opacity-25 select-none overflow-hidden">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1200 520" 
          className="w-full h-full object-cover sm:object-right"
          preserveAspectRatio="xMaxYMid slice"
        >
          <defs>
            <style>{`
              .bg-color { fill: #0b0b0c; }
              .flame-orange { fill: #ff5700; }
              .flame-light { fill: #ff8533; }
              .flame-white { fill: #ffffff; }
              .flame-dark { fill: #cc4400; }
            `}</style>
          </defs>

          {/* Standalone Ambient Icon Mark in Background */}
          <g transform="translate(930, 260)">
            <g transform="translate(-70, -110) scale(1.4)">
              <path className="flame-orange" d="M100,10 C130,50 145,85 140,130 C136,165 112,190 85,200 C58,190 35,165 30,130 C25,85 50,45 100,10 Z" />
              <path className="bg-color" d="M95,35 C115,65 125,95 120,130 C116,155 100,175 80,185 C65,175 50,155 45,130 C42,95 65,65 95,35 Z" />
              <path className="flame-white" d="M60,65 Q100,55 125,75 Q115,65 95,65 Z" />
              <path className="flame-white" d="M72,82 C85,80 102,88 100,105 C98,122 75,115 70,100 C68,92 70,85 72,82 Z" />
              <path className="bg-color" d="M82,92 C88,90 92,96 90,102 C88,107 80,105 78,100 C77,96 79,93 82,92 Z" />
              <path className="flame-white" d="M88,55 C90,100 82,145 68,180 C60,198 42,215 22,225 C45,210 62,190 70,165 C78,135 80,95 78,55 Z" />
              <path className="flame-light" d="M105,130 C125,132 142,148 135,175 C128,198 102,210 85,215 C108,205 125,188 122,165 C120,148 112,138 105,130 Z" />
              <polygon className="flame-white" points="100,0 106,18 100,24 94,18" />
            </g>
          </g>
        </svg>
      </div>

      {/* Atmospheric Fire Glow */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#ff5700]/20 blur-3xl pointer-events-none" />
      <div className="absolute left-1/3 top-0 w-64 h-64 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div className="space-y-4 max-w-2xl">
          {/* Header Horizontal SVG Identity Rendered Perfectly */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 rounded-2xl bg-[#0b0b0c] p-1.5 border border-stone-800 shadow-md">
              <svg viewBox="15 0 135 230" className="w-full h-full" fill="none">
                <path fill="#ff5700" d="M100,10 C130,50 145,85 140,130 C136,165 112,190 85,200 C58,190 35,165 30,130 C25,85 50,45 100,10 Z" />
                <path fill="#0b0b0c" d="M95,35 C115,65 125,95 120,130 C116,155 100,175 80,185 C65,175 50,155 45,130 C42,95 65,65 95,35 Z" />
                <path fill="#ffffff" d="M60,65 Q100,55 125,75 Q115,65 95,65 Z" />
                <path fill="#ffffff" d="M72,82 C85,80 102,88 100,105 C98,122 75,115 70,100 C68,92 70,85 72,82 Z" />
                <path fill="#0b0b0c" d="M82,92 C88,90 92,96 90,102 C88,107 80,105 78,100 C77,96 79,93 82,92 Z" />
                <path fill="#ffffff" d="M88,55 C90,100 82,145 68,180 C60,198 42,215 22,225 C45,210 62,190 70,165 C78,135 80,95 78,55 Z" />
                <path fill="#ff8533" d="M105,130 C125,132 142,148 135,175 C128,198 102,210 85,215 C108,205 125,188 122,165 C120,148 112,138 105,130 Z" />
                <polygon fill="#ffffff" points="100,0 106,18 100,24 94,18" />
              </svg>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black tracking-widest text-white leading-none font-sans">
                BLAZE<span className="text-[#ff5700]"> KANA</span>
              </div>
              <div className="text-[10px] sm:text-xs font-bold text-stone-400 tracking-[0.3em] uppercase mt-1 font-sans">
                JAPANESE LEARNING PLATFORM
              </div>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans max-w-xl">
            {settings.language === 'bn'
              ? `স্বাগতম! আজকের নির্ধারিত পাঠ: পাঠ ${nextLesson.number} — "${nextLesson.titleBn}" এবং নতুন JLPT N5 কাঞ্জি সিস্টেম (৮০টি কাঞ্জি)। বাস্তব চিত্রকল্প ও উচ্চারণের মাধ্যমে জাপানি ভাষা শিখুন।`
              : `Welcome to Blaze Kana! Continue your mastery with Lesson ${nextLesson.number}: "${nextLesson.titleEn}", and explore the new Visual JLPT N5 Kanji System covering all 80 characters with animated memory aids.`}
          </p>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => navigateTo('kanji')}
              className="px-5 py-2.5 text-xs font-bold text-white bg-[#ff5700] hover:bg-[#e04d00] rounded-xl shadow-lg shadow-[#ff5700]/25 inline-flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
            >
              <span className="px-1.5 py-0.5 rounded bg-black/30 text-[10px] font-mono border border-white/20">N5</span>
              <span>{settings.language === 'bn' ? '৮০টি কাঞ্জি এক্সপ্লোর করুন' : 'Master 80 N5 Kanji'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigateTo('lesson-detail', { lessonId: nextLesson.id })}
              className="px-4 py-2.5 text-xs font-semibold text-stone-200 bg-white/10 hover:bg-white/15 rounded-xl border border-white/15 inline-flex items-center gap-2 transition-all cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-[#ff8533]" />
              <span>{settings.language === 'bn' ? `পাঠ ${nextLesson.number}` : `Lesson ${nextLesson.number}`}</span>
            </button>

            <button
              onClick={() => navigateTo('learning-path')}
              className="px-4 py-2.5 text-xs font-medium text-stone-300 hover:text-white hover:bg-white/5 rounded-xl border border-stone-800 transition-all cursor-pointer font-sans"
            >
              <Calendar className="w-4 h-4 inline mr-1.5 text-stone-400" />
              {settings.language === 'bn' ? '৩০ দিনের রোডম্যাপ' : '30-Day Plan'}
            </button>
          </div>

          {/* Creator Credit & Copyright */}
          <div className="pt-2 text-[11px] text-stone-400 font-mono flex flex-wrap items-center gap-2">
            <span className="font-bold text-white">© 2026 BLAZE</span>
            <span>·</span>
            <span>Created by <strong className="text-stone-300">Mahi Al-Moktadir</strong></span>
            <span>·</span>
            <span className="text-[#ff8533]">Visual JLPT N5 Curriculum</span>
          </div>
        </div>

        {/* Right Side Stats / Quick Progress Card */}
        <div className="lg:w-72 bg-[#121316]/80 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-stone-800 space-y-4 shrink-0">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider font-mono">
              {settings.language === 'bn' ? 'দৈনিক স্ট্রিক' : 'Daily Streak'}
            </span>
            <div className="flex items-center gap-1 text-[#ff8533] font-bold text-sm font-mono">
              <Flame className="w-4 h-4 fill-[#ff5700] text-[#ff5700]" />
              <span>{streak.currentStreak} {settings.language === 'bn' ? 'দিন' : 'Days'}</span>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-stone-300 font-medium">
                {settings.language === 'bn' ? 'এন৫ কাঞ্জি আয়ত্ত' : 'N5 Kanji Mastered'}
              </span>
              <span className="text-stone-400 font-mono">
                {totalMastered}/80
              </span>
            </div>
            <div className="w-full bg-stone-800 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-[#ff5700] to-[#ff8533] h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, Math.round((totalMastered / 80) * 100))}%` }}
              />
            </div>
          </div>

          <div className="pt-2 border-t border-stone-800/80 flex items-center justify-between text-xs text-stone-400">
            <span>{settings.language === 'bn' ? 'পাঠ সম্পন্ন:' : 'Lessons Completed:'}</span>
            <span className="font-mono font-bold text-white">
              {completedLessons.length} / {LESSONS_DATA.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
