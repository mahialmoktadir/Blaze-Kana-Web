import { 
  UserSettings, 
  UserProgressItem, 
  UserMistakeRecord, 
  UserDailyActivity, 
  Achievement,
  MasteryStatus
} from '../types';

const STORAGE_KEYS = {
  SETTINGS: 'blaze_kana_settings_v1',
  COMPLETED_LESSONS: 'blaze_kana_completed_lessons_v1',
  PROGRESS: 'blaze_kana_progress_v1',
  MISTAKES: 'blaze_kana_mistakes_v1',
  ACTIVITIES: 'blaze_kana_activity_v1',
  ACHIEVEMENTS: 'blaze_kana_achievements_v1',
  FAVORITES: 'blaze_kana_favorites_v1',
  CUSTOM_LISTS: 'blaze_kana_custom_lists_v1',
  LAST_ACTIVE: 'blaze_kana_last_active_date_v1',
  STREAK: 'blaze_kana_streak_v1',
  DAILY_CHALLENGE_STATUS: 'blaze_kana_daily_challenge_status_v1',
};

const DEFAULT_SETTINGS: UserSettings = {
  language: 'en',
  theme: 'system',
  dailyGoalMinutes: 15,
  studyReminderTime: '20:00',
  studyReminderEnabled: false,
  studyDays: [1, 2, 3, 4, 5, 6, 0],
  audioSpeed: 0.95,
  soundEffects: true,
  showRomaji: true,
  showBangla: true,
  reducedMotion: false,
  onboardingCompleted: false,
  startDate: new Date().toISOString().split('T')[0],
  placementLevel: 'beginner',
};

const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_practice',
    titleEn: 'First Step',
    titleBn: 'প্রথম পদক্ষেপ',
    descriptionEn: 'Completed your first study session or quiz in Blaze Kana.',
    descriptionBn: 'ব্লেইজ কানায় প্রথম প্র্যাকটিস সেশন সম্পন্ন করেছেন।',
    icon: 'Sparkles',
    isUnlocked: false,
    progress: 0,
  },
  {
    id: 'lesson_complete',
    titleEn: 'Scholar Rising',
    titleBn: 'শিক্ষা সূচনা',
    descriptionEn: 'Completed your very first Japanese lesson.',
    descriptionBn: 'প্রথম জাপানি পাঠ সম্পন্ন করেছেন।',
    icon: 'BookOpen',
    isUnlocked: false,
    progress: 0,
  },
  {
    id: 'kana_starter',
    titleEn: 'Kana Pioneer',
    titleBn: 'কানা প্রারম্ভ',
    descriptionEn: 'Practiced 25 Kana characters.',
    descriptionBn: '২৫টি হিরাগানা বা কাতাকানা ক্যারেক্টার অনুশীলন করেছেন।',
    icon: 'Languages',
    isUnlocked: false,
    progress: 0,
  },
  {
    id: 'streak_3',
    titleEn: 'Disciplined Mind',
    titleBn: 'নিয়মানুবর্তী',
    descriptionEn: 'Achieved a 3-day consecutive study streak.',
    descriptionBn: 'টানা ৩ দিনের অধ্যয়নের ধারাবাহিকতা অর্জন।',
    icon: 'Flame',
    isUnlocked: false,
    progress: 0,
  },
  {
    id: 'streak_7',
    titleEn: 'Samurai Resolve',
    titleBn: 'সাত দিনের সংকল্প',
    descriptionEn: 'Maintained a 7-day study streak.',
    descriptionBn: 'টানা ৭ দিনের অধ্যয়নের ধারাবাহিকতা বজায় রাখা।',
    icon: 'Flame',
    isUnlocked: false,
    progress: 0,
  },
  {
    id: 'vocab_50',
    titleEn: 'Lexicon Builder',
    titleBn: 'শব্দকোষ নির্মাতা',
    descriptionEn: 'Encountered and practiced 50 vocabulary words.',
    descriptionBn: '৫০টি জাপানি শব্দ অনুশীলন করেছেন।',
    icon: 'Layers',
    isUnlocked: false,
    progress: 0,
  },
  {
    id: 'vocab_mastered_25',
    titleEn: 'Memory Fortress',
    titleBn: 'স্মৃতি দুর্গ',
    descriptionEn: 'Mastered 25 vocabulary words with spaced repetition.',
    descriptionBn: '২৫টি শব্দ পূর্ণ আয়ত্তে নিয়ে এসেছেন।',
    icon: 'Award',
    isUnlocked: false,
    progress: 0,
  },
  {
    id: 'writing_master',
    titleEn: 'Stroke of Mastery',
    titleBn: 'তুলির টান',
    descriptionEn: 'Practiced writing 10 Japanese characters on the canvas.',
    descriptionBn: 'ক্যানভাসে ১০টি অক্ষর লিখে অনুশীলন করেছেন।',
    icon: 'PenTool',
    isUnlocked: false,
    progress: 0,
  },
  {
    id: 'speed_demon',
    titleEn: 'Speed Master',
    titleBn: 'গতি গুরু',
    descriptionEn: 'Answered 10 consecutive speed questions correctly.',
    descriptionBn: 'স্পিড চ্যালেঞ্জে টানা ১০টি সঠিক উত্তর প্রদান।',
    icon: 'Zap',
    isUnlocked: false,
    progress: 0,
  },
  {
    id: 'perfect_quiz',
    titleEn: 'Flawless Recitation',
    titleBn: 'ত্রুটিহীন কুইজ',
    descriptionEn: 'Scored 100% on any lesson quiz.',
    descriptionBn: 'যেকোনো পাঠের কুইজে ১০০% স্কোর অর্জন।',
    icon: 'CheckCircle',
    isUnlocked: false,
    progress: 0,
  }
];

class StorageService {
  private getLocal<T>(key: string, defaultValue: T): T {
    if (typeof window === 'undefined') return defaultValue;
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  }

  private setLocal<T>(key: string, value: T): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('LocalStorage write error', e);
    }
  }

  // --- Settings ---
  public getSettings(): UserSettings {
    return this.getLocal<UserSettings>(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
  }

  public saveSettings(settings: Partial<UserSettings>): UserSettings {
    const current = this.getSettings();
    const updated = { ...current, ...settings };
    this.setLocal(STORAGE_KEYS.SETTINGS, updated);
    return updated;
  }

  // --- Completed Lessons ---
  public getCompletedLessons(): string[] {
    return this.getLocal<string[]>(STORAGE_KEYS.COMPLETED_LESSONS, []);
  }

  public completeLesson(lessonId: string): string[] {
    const completed = this.getCompletedLessons();
    if (!completed.includes(lessonId)) {
      completed.push(lessonId);
      this.setLocal(STORAGE_KEYS.COMPLETED_LESSONS, completed);
      this.checkAchievements();
    }
    return completed;
  }

  // --- Progress & SRS ---
  public getProgress(): Record<string, UserProgressItem> {
    return this.getLocal<Record<string, UserProgressItem>>(STORAGE_KEYS.PROGRESS, {});
  }

  public recordAttempt(itemId: string, isCorrect: boolean): UserProgressItem {
    const allProgress = this.getProgress();
    const existing = allProgress[itemId] || {
      id: itemId,
      mastery: 'new' as MasteryStatus,
      correctCount: 0,
      incorrectCount: 0,
      streak: 0,
      intervalDays: 1,
      easeFactor: 2.5,
    };

    const now = new Date();

    if (isCorrect) {
      existing.correctCount += 1;
      existing.streak += 1;

      // SRS interval progression: 1 -> 3 -> 7 -> 14 -> 30 days
      if (existing.streak === 1) {
        existing.intervalDays = 1;
        existing.mastery = 'learning';
      } else if (existing.streak === 2) {
        existing.intervalDays = 3;
        existing.mastery = 'learning';
      } else if (existing.streak === 3) {
        existing.intervalDays = 7;
        existing.mastery = 'review';
      } else if (existing.streak >= 4 && existing.correctCount >= 5) {
        existing.intervalDays = 14;
        existing.mastery = 'mastered';
      } else {
        existing.intervalDays = Math.min(30, Math.round(existing.intervalDays * 1.8));
      }
    } else {
      existing.incorrectCount += 1;
      existing.streak = 0;
      existing.intervalDays = 1;
      existing.mastery = 'difficult';
    }

    existing.lastStudied = now.toISOString();
    const nextDate = new Date(now.getTime() + existing.intervalDays * 24 * 60 * 60 * 1000);
    existing.nextReviewDate = nextDate.toISOString();

    allProgress[itemId] = existing;
    this.setLocal(STORAGE_KEYS.PROGRESS, allProgress);

    this.checkAchievements();
    return existing;
  }

  public toggleFavorite(itemId: string): boolean {
    const allProgress = this.getProgress();
    const existing = allProgress[itemId] || {
      id: itemId,
      mastery: 'new' as MasteryStatus,
      correctCount: 0,
      incorrectCount: 0,
      streak: 0,
      intervalDays: 1,
      easeFactor: 2.5,
    };
    existing.isFavorite = !existing.isFavorite;
    allProgress[itemId] = existing;
    this.setLocal(STORAGE_KEYS.PROGRESS, allProgress);
    return !!existing.isFavorite;
  }

  public toggleDifficult(itemId: string): boolean {
    const allProgress = this.getProgress();
    const existing = allProgress[itemId] || {
      id: itemId,
      mastery: 'new' as MasteryStatus,
      correctCount: 0,
      incorrectCount: 0,
      streak: 0,
      intervalDays: 1,
      easeFactor: 2.5,
    };
    existing.isDifficult = !existing.isDifficult;
    allProgress[itemId] = existing;
    this.setLocal(STORAGE_KEYS.PROGRESS, allProgress);
    return !!existing.isDifficult;
  }

  // --- Mistakes ---
  public getMistakes(): UserMistakeRecord[] {
    return this.getLocal<UserMistakeRecord[]>(STORAGE_KEYS.MISTAKES, []);
  }

  public logMistake(mistake: Omit<UserMistakeRecord, 'id' | 'timestamp' | 'reviewed' | 'mistakeCount'>): void {
    const mistakes = this.getMistakes();
    const existingIndex = mistakes.findIndex(m => m.itemId === mistake.itemId && m.prompt === mistake.prompt);

    if (existingIndex >= 0) {
      mistakes[existingIndex].mistakeCount += 1;
      mistakes[existingIndex].userAnswer = mistake.userAnswer;
      mistakes[existingIndex].timestamp = new Date().toISOString();
      mistakes[existingIndex].reviewed = false;
    } else {
      mistakes.unshift({
        ...mistake,
        id: `mistake_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        timestamp: new Date().toISOString(),
        reviewed: false,
        mistakeCount: 1,
      });
    }

    // Keep up to 200 most recent mistakes
    if (mistakes.length > 200) {
      mistakes.length = 200;
    }

    this.setLocal(STORAGE_KEYS.MISTAKES, mistakes);
  }

  public resolveMistake(mistakeId: string): void {
    const mistakes = this.getMistakes();
    const found = mistakes.find(m => m.id === mistakeId);
    if (found) {
      found.reviewed = true;
      this.setLocal(STORAGE_KEYS.MISTAKES, mistakes);
    }
  }

  // --- Activity & Streak ---
  public logActivity(minutes: number = 0, cardsCount: number = 0, lessonsCount: number = 0, scoreAvg: number = 100): void {
    const todayStr = new Date().toISOString().split('T')[0];
    const activities = this.getLocal<UserDailyActivity[]>(STORAGE_KEYS.ACTIVITIES, []);
    const existing = activities.find(a => a.date === todayStr);

    if (existing) {
      existing.minutesStudied += minutes;
      existing.cardsReviewed += cardsCount;
      existing.lessonsCompleted += lessonsCount;
      existing.quizScoreAverage = Math.round((existing.quizScoreAverage + scoreAvg) / 2);
    } else {
      activities.push({
        date: todayStr,
        minutesStudied: minutes,
        cardsReviewed: cardsCount,
        lessonsCompleted: lessonsCount,
        quizScoreAverage: scoreAvg,
      });
    }

    // Keep up to 60 days
    if (activities.length > 60) activities.shift();
    this.setLocal(STORAGE_KEYS.ACTIVITIES, activities);

    this.updateStreak();
  }

  public getActivities(): UserDailyActivity[] {
    return this.getLocal<UserDailyActivity[]>(STORAGE_KEYS.ACTIVITIES, []);
  }

  public getStreak(): { currentStreak: number; longestStreak: number } {
    return this.getLocal(STORAGE_KEYS.STREAK, { currentStreak: 0, longestStreak: 0 });
  }

  private updateStreak(): void {
    const todayStr = new Date().toISOString().split('T')[0];
    const lastActive = this.getLocal<string | null>(STORAGE_KEYS.LAST_ACTIVE, null);
    const streakData = this.getStreak();

    if (!lastActive) {
      streakData.currentStreak = 1;
      streakData.longestStreak = Math.max(streakData.longestStreak, 1);
      this.setLocal(STORAGE_KEYS.LAST_ACTIVE, todayStr);
      this.setLocal(STORAGE_KEYS.STREAK, streakData);
      return;
    }

    if (lastActive === todayStr) {
      // Already logged today
      return;
    }

    const lastDate = new Date(lastActive);
    const todayDate = new Date(todayStr);
    const diffDays = Math.round((todayDate.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));

    if (diffDays === 1) {
      streakData.currentStreak += 1;
      streakData.longestStreak = Math.max(streakData.longestStreak, streakData.currentStreak);
    } else if (diffDays > 1) {
      streakData.currentStreak = 1;
    }

    this.setLocal(STORAGE_KEYS.LAST_ACTIVE, todayStr);
    this.setLocal(STORAGE_KEYS.STREAK, streakData);

    this.checkAchievements();
  }

  // --- Achievements ---
  public getAchievements(): Achievement[] {
    const saved = this.getLocal<Achievement[]>(STORAGE_KEYS.ACHIEVEMENTS, []);
    if (!saved || saved.length === 0) {
      this.setLocal(STORAGE_KEYS.ACHIEVEMENTS, INITIAL_ACHIEVEMENTS);
      return INITIAL_ACHIEVEMENTS;
    }
    return saved;
  }

  public checkAchievements(): Achievement[] {
    const achievements = this.getAchievements();
    const progress = this.getProgress();
    const completedLessons = this.getCompletedLessons();
    const streak = this.getStreak();
    const activities = this.getActivities();

    const totalPracticed = Object.keys(progress).length;
    const masteredCount = Object.values(progress).filter(p => p.mastery === 'mastered').length;

    let modified = false;

    achievements.forEach(a => {
      if (a.isUnlocked) return;

      if (a.id === 'first_practice' && (totalPracticed > 0 || activities.length > 0)) {
        a.isUnlocked = true;
        a.unlockedAt = new Date().toISOString();
        a.progress = 100;
        modified = true;
      }
      if (a.id === 'lesson_complete' && completedLessons.length >= 1) {
        a.isUnlocked = true;
        a.unlockedAt = new Date().toISOString();
        a.progress = 100;
        modified = true;
      }
      if (a.id === 'streak_3' && streak.currentStreak >= 3) {
        a.isUnlocked = true;
        a.unlockedAt = new Date().toISOString();
        a.progress = 100;
        modified = true;
      }
      if (a.id === 'streak_7' && streak.currentStreak >= 7) {
        a.isUnlocked = true;
        a.unlockedAt = new Date().toISOString();
        a.progress = 100;
        modified = true;
      }
      if (a.id === 'vocab_50') {
        a.progress = Math.min(100, Math.round((totalPracticed / 50) * 100));
        if (totalPracticed >= 50) {
          a.isUnlocked = true;
          a.unlockedAt = new Date().toISOString();
          modified = true;
        }
      }
      if (a.id === 'vocab_mastered_25') {
        a.progress = Math.min(100, Math.round((masteredCount / 25) * 100));
        if (masteredCount >= 25) {
          a.isUnlocked = true;
          a.unlockedAt = new Date().toISOString();
          modified = true;
        }
      }
    });

    if (modified) {
      this.setLocal(STORAGE_KEYS.ACHIEVEMENTS, achievements);
    }
    return achievements;
  }

  // --- Daily Challenge Status ---
  public getDailyChallengeStatus(): { completed: boolean; score: number; date: string } {
    const todayStr = new Date().toISOString().split('T')[0];
    const status = this.getLocal(STORAGE_KEYS.DAILY_CHALLENGE_STATUS, { completed: false, score: 0, date: '' });
    if (status.date !== todayStr) {
      return { completed: false, score: 0, date: todayStr };
    }
    return status;
  }

  public setDailyChallengeCompleted(score: number): void {
    const todayStr = new Date().toISOString().split('T')[0];
    this.setLocal(STORAGE_KEYS.DAILY_CHALLENGE_STATUS, {
      completed: true,
      score,
      date: todayStr
    });
    this.logActivity(5, 10, 0, score);
  }

  // --- Export & Import ---
  public exportData(): string {
    const data = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      settings: this.getSettings(),
      completedLessons: this.getCompletedLessons(),
      progress: this.getProgress(),
      mistakes: this.getMistakes(),
      activities: this.getActivities(),
      streak: this.getStreak(),
      achievements: this.getAchievements(),
    };
    return JSON.stringify(data, null, 2);
  }

  public importData(jsonString: string): { success: boolean; message: string } {
    try {
      const data = JSON.parse(jsonString);
      if (!data || typeof data !== 'object') {
        return { success: false, message: 'Invalid JSON file format.' };
      }
      if (data.settings) this.setLocal(STORAGE_KEYS.SETTINGS, data.settings);
      if (Array.isArray(data.completedLessons)) this.setLocal(STORAGE_KEYS.COMPLETED_LESSONS, data.completedLessons);
      if (data.progress) this.setLocal(STORAGE_KEYS.PROGRESS, data.progress);
      if (Array.isArray(data.mistakes)) this.setLocal(STORAGE_KEYS.MISTAKES, data.mistakes);
      if (Array.isArray(data.activities)) this.setLocal(STORAGE_KEYS.ACTIVITIES, data.activities);
      if (data.streak) this.setLocal(STORAGE_KEYS.STREAK, data.streak);
      if (Array.isArray(data.achievements)) this.setLocal(STORAGE_KEYS.ACHIEVEMENTS, data.achievements);

      return { success: true, message: 'Progress imported successfully.' };
    } catch (e: any) {
      return { success: false, message: `Failed to import: ${e.message}` };
    }
  }

  public resetAllProgress(): void {
    if (typeof window === 'undefined') return;
    Object.values(STORAGE_KEYS).forEach(k => {
      try {
        localStorage.removeItem(k);
      } catch {}
    });
  }
}

export const storageService = new StorageService();
