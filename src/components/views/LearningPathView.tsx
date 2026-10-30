import React from 'react';
import { useApp } from '../../context/AppContext';
import { LESSONS_DATA } from '../../data/lessonsData';
import { 
  CheckCircle2, 
  Circle, 
  Calendar, 
  Clock, 
  ArrowRight, 
  Award, 
  BookOpen, 
  Sparkles 
} from 'lucide-react';

interface DaySchedule {
  day: number;
  type: 'lesson' | 'review' | 'assessment' | 'graduation';
  lessonNumber?: number;
  titleEn: string;
  titleBn: string;
  duration: number;
}

export const LearningPathView: React.FC = () => {
  const { completedLessons, navigateTo, settings } = useApp();

  // 30-day schedule definition
  const schedule: DaySchedule[] = [
    { day: 0, type: 'lesson', lessonNumber: 0, titleEn: 'Orientation & Writing Systems', titleBn: 'পরিচিতি ও বর্ণমালা', duration: 15 },
    // Days 1-5
    { day: 1, type: 'lesson', lessonNumber: 1, titleEn: 'Lesson 1: Basic Conversations', titleBn: 'পাঠ ১: প্রাথমিক কথোপকথন', duration: 20 },
    { day: 2, type: 'lesson', lessonNumber: 2, titleEn: 'Lesson 2: Demonstratives (これ, それ, あれ)', titleBn: 'পাঠ ২: নির্দেশক শব্দ', duration: 20 },
    { day: 3, type: 'lesson', lessonNumber: 3, titleEn: 'Lesson 3: Places and Locations (ここ, そこ)', titleBn: 'পাঠ ৩: স্থান ও দিক', duration: 20 },
    { day: 4, type: 'lesson', lessonNumber: 4, titleEn: 'Lesson 4: Time, Verbs, and Schedules', titleBn: 'পাঠ ৪: সময় ও রুটিন', duration: 25 },
    { day: 5, type: 'lesson', lessonNumber: 5, titleEn: 'Lesson 5: Movement and Transportation', titleBn: 'পাঠ ৫: যাতায়াত', duration: 25 },
    // Days 6-10
    { day: 6, type: 'lesson', lessonNumber: 6, titleEn: 'Lesson 6: Direct Objects & Invitations', titleBn: 'পাঠ ৬: কর্ম ও আমন্ত্রণ', duration: 25 },
    { day: 7, type: 'lesson', lessonNumber: 7, titleEn: 'Lesson 7: Giving & Receiving (あげます)', titleBn: 'পাঠ ৭: দেওয়া-নেওয়া', duration: 25 },
    { day: 8, type: 'lesson', lessonNumber: 8, titleEn: 'Lesson 8: Adjectives (い and な)', titleBn: 'পাঠ ৮: বিশেষণসমূহ', duration: 25 },
    { day: 9, type: 'lesson', lessonNumber: 9, titleEn: 'Lesson 9: Preferences & Capabilities', titleBn: 'পাঠ ৯: পছন্দ ও দক্ষতা', duration: 25 },
    { day: 10, type: 'lesson', lessonNumber: 10, titleEn: 'Lesson 10: Existence (います / あります)', titleBn: 'পাঠ ১০: সজীব ও নির্জীব অবস্থান', duration: 25 },
    // Days 11-15
    { day: 11, type: 'lesson', lessonNumber: 11, titleEn: 'Lesson 11: Numbers, Quantifiers & Frequency', titleBn: 'পাঠ ১১: সংখ্যা ও গণনা প্রত্যয়', duration: 25 },
    { day: 12, type: 'lesson', lessonNumber: 12, titleEn: 'Lesson 12: Comparative Sentences', titleBn: 'পাঠ ১২: তুলনা ও শ্রেষ্ঠত্ব', duration: 25 },
    { day: 13, type: 'lesson', lessonNumber: 13, titleEn: 'Lesson 13: Desires & Purpose of Motion', titleBn: 'পাঠ ১৩: ইচ্ছা ও উদ্দেশ্য', duration: 25 },
    { day: 14, type: 'lesson', lessonNumber: 14, titleEn: 'Lesson 14: Verb Groups & Te-Form Requests', titleBn: 'পাঠ ১৪: তে-রূপ ও অনুরোধ', duration: 30 },
    { day: 15, type: 'lesson', lessonNumber: 15, titleEn: 'Lesson 15: Permissions & Prohibitions', titleBn: 'পাঠ ১৫: অনুমতি ও নিষেধ', duration: 25 },
    // Days 16-20
    { day: 16, type: 'lesson', lessonNumber: 16, titleEn: 'Lesson 16: Sequential Actions (Vてから)', titleBn: 'পাঠ ১৬: ধারাবাহিক ক্রিয়া', duration: 25 },
    { day: 17, type: 'lesson', lessonNumber: 17, titleEn: 'Lesson 17: Obligations & Nai-Form', titleBn: 'পাঠ ১৭: নাই-রূপ ও বাধ্যবাধকতা', duration: 25 },
    { day: 18, type: 'lesson', lessonNumber: 18, titleEn: 'Lesson 18: Capabilities & Dictionary Form', titleBn: 'পাঠ ১৮: অভিধান রূপ ও সামর্থ্য', duration: 25 },
    { day: 19, type: 'lesson', lessonNumber: 19, titleEn: 'Lesson 19: Past Experiences & Changes', titleBn: 'পাঠ ১৯: তা-রূপ ও অতীত অভিজ্ঞতা', duration: 25 },
    { day: 20, type: 'lesson', lessonNumber: 20, titleEn: 'Lesson 20: Plain Style vs Polite Style', titleBn: 'পাঠ ২০: সাধারণ বনাম ভদ্র ভাষা', duration: 25 },
    // Days 21-25
    { day: 21, type: 'lesson', lessonNumber: 21, titleEn: 'Lesson 21: Opinions & Quotations', titleBn: 'পাঠ ২১: মতামত ও উদ্ধৃতি', duration: 25 },
    { day: 22, type: 'lesson', lessonNumber: 22, titleEn: 'Lesson 22: Noun Modification & Relative Clauses', titleBn: 'পাঠ ২২: আপেক্ষিক বাক্যাংশ', duration: 25 },
    { day: 23, type: 'lesson', lessonNumber: 23, titleEn: 'Lesson 23: Conditionals & Inevitability (Vと)', titleBn: 'পাঠ ২৩: স্বাভাবিক শর্ত ও সময়', duration: 25 },
    { day: 24, type: 'lesson', lessonNumber: 24, titleEn: 'Lesson 24: Giving & Receiving Favors', titleBn: 'পাঠ ২৪: উপকার আদান-প্রদান', duration: 25 },
    { day: 25, type: 'lesson', lessonNumber: 25, titleEn: 'Lesson 25: Conditionals (〜たら) & Concessions', titleBn: 'পাঠ ২৫: তারা শর্ত ও ছাড়', duration: 30 },
    // Days 26-30
    { day: 26, type: 'review', titleEn: 'Day 26: Mid-Curriculum Review & Catch-up', titleBn: 'দিন ২৬: পুনরাবৃত্তি ও দুর্বলতা নিরাময়', duration: 30 },
    { day: 27, type: 'review', titleEn: 'Day 27: Difficult Particles & Verb Inflections Drill', titleBn: 'দিন ২৭: জটিল পার্টিকল ও ক্রিয়াপদ চর্চা', duration: 30 },
    { day: 28, type: 'review', titleEn: 'Day 28: Complex Sentence Builder Mastery', titleBn: 'দিন ২৮: জটিল বাক্য গঠন অনুশীলন', duration: 30 },
    { day: 29, type: 'assessment', titleEn: 'Day 29: Comprehensive Vocabulary & Grammar Assessment', titleBn: 'দিন ২৯: সর্বাঙ্গীন শব্দ ও ব্যাকরণ মূল্যায়ন', duration: 35 },
    { day: 30, type: 'graduation', titleEn: 'Day 30: Final Graduation Assessment & Learning Report', titleBn: 'দিন ৩০: সমাপনী মূল্যায়ন ও ডিগ্রি সার্টিফিকেট', duration: 35 },
  ];

  const handleDayClick = (item: DaySchedule) => {
    if (item.lessonNumber !== undefined) {
      const lesson = LESSONS_DATA.find(l => l.number === item.lessonNumber);
      if (lesson) navigateTo('lesson-detail', { lessonId: lesson.id });
    } else if (item.type === 'review') {
      navigateTo('mistakes');
    } else if (item.type === 'assessment' || item.type === 'graduation') {
      navigateTo('practice');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Roadmap Header */}
      <div className="pb-4 border-b border-stone-200 dark:border-stone-800">
        <h2 className="text-xl font-bold tracking-tight text-stone-900 dark:text-stone-100 flex items-center gap-2">
          <span>{settings.language === 'bn' ? '৩০ দিনের নির্দেশিত জাপানি রোডম্যাপ' : '30-Day Guided Japanese Roadmap'}</span>
          <span className="text-xs px-2 py-0.5 rounded bg-[#C23A2B]/10 text-[#C23A2B] font-mono">
            Structured
          </span>
        </h2>
        <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
          A disciplined, step-by-step 30-day curriculum guiding you from zero to JLPT N5 mastery with spaced review milestones.
        </p>
      </div>

      {/* Timeline List */}
      <div className="space-y-3">
        {schedule.map((item) => {
          const isDone = item.lessonNumber !== undefined 
            ? completedLessons.includes(`lesson_${item.lessonNumber}`)
            : false;

          let badgeColor = 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300';
          if (item.type === 'review') badgeColor = 'bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-200';
          if (item.type === 'assessment') badgeColor = 'bg-purple-100 dark:bg-purple-950/40 text-purple-800 dark:text-purple-200';
          if (item.type === 'graduation') badgeColor = 'bg-rose-100 dark:bg-rose-950/40 text-[#C23A2B] font-bold';

          return (
            <div
              key={item.day}
              onClick={() => handleDayClick(item)}
              className={`group cursor-pointer p-4 bg-white dark:bg-stone-900 border rounded-2xl flex items-center justify-between gap-4 transition-all ${
                isDone 
                  ? 'border-emerald-200 dark:border-emerald-900/60 shadow-xs' 
                  : 'border-stone-200 dark:border-stone-800 hover:border-[#C23A2B]/60 hover:shadow-xs'
              }`}
            >
              <div className="flex items-center gap-4">
                {/* Day Badge */}
                <div className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center shrink-0 ${badgeColor}`}>
                  <span className="text-[10px] uppercase font-mono tracking-wider font-semibold">
                    {item.day === 0 ? 'Intro' : 'Day'}
                  </span>
                  <span className="text-base font-bold font-mono -mt-1">
                    {item.day === 0 ? '0' : item.day}
                  </span>
                </div>

                {/* Day details */}
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 group-hover:text-[#C23A2B] transition-colors">
                      {item.titleEn}
                    </h3>
                    {isDone && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    )}
                  </div>
                  {settings.showBangla && (
                    <p className="text-xs text-stone-500 dark:text-stone-400 font-sans">
                      {item.titleBn}
                    </p>
                  )}
                  <span className="text-[11px] text-stone-400 flex items-center gap-1 font-mono">
                    <Clock className="w-3 h-3" /> {item.duration} min study
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-[#C23A2B]">
                <span className="hidden sm:inline">{isDone ? 'Review' : 'Open'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
