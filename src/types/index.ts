export * from './kanji';

export type InterfaceLanguage = 'en' | 'bn' | 'ja';

export type ThemeMode = 'light' | 'dark' | 'system';

export type MasteryStatus = 'new' | 'learning' | 'review' | 'difficult' | 'mastered';

export type PartOfSpeech = 
  | 'noun' 
  | 'verb-i' 
  | 'verb-ii' 
  | 'verb-iii' 
  | 'i-adj' 
  | 'na-adj' 
  | 'adverb' 
  | 'particle' 
  | 'expression' 
  | 'counter' 
  | 'pronoun' 
  | 'prefix-suffix';

export interface VocabularyItem {
  id: string;
  japanese: string;       // Kanji or Kana
  kana: string;           // Reading in Hiragana / Katakana
  romaji: string;
  english: string;
  bangla: string;
  partOfSpeech: PartOfSpeech;
  lesson: number;
  topic?: string;
  difficulty?: 'beginner' | 'intermediate';
  tags?: string[];
  example?: {
    japanese: string;
    kana: string;
    romaji: string;
    english: string;
    bangla: string;
  };
  isVerifiedTextbook?: boolean;
}

export interface GrammarPoint {
  id: string;
  lesson: number;
  pattern: string;
  titleEn: string;
  titleBn: string;
  explanationEn: string;
  explanationBn: string;
  structure: {
    label: string;
    type: 'topic' | 'particle' | 'predicate' | 'object' | 'verb' | 'adjective' | 'time' | 'location';
    color?: string;
  }[];
  examples: {
    japanese: string;
    kana: string;
    romaji: string;
    english: string;
    bangla: string;
    breakdown?: { word: string; role: string; particle?: boolean }[];
  }[];
  commonMistakes?: string[];
  formalityNote?: string;
}

export interface LessonQuizQuestion {
  id: string;
  question: string;
  promptJp?: string;
  type: 'multiple-choice' | 'type-romaji' | 'type-japanese' | 'particle-fill' | 'word-order';
  options?: string[];
  correctAnswer: string;
  acceptedAnswers?: string[];
  explanation: string;
  explanationBn?: string;
}

export interface Lesson {
  id: string;
  number: number;
  title: string;
  titleEn: string;
  titleBn: string;
  descriptionEn: string;
  descriptionBn: string;
  estimatedMinutes: number;
  dayNumber: number; // For the 30-day roadmap
  objectives: string[];
  vocabulary: VocabularyItem[];
  grammarPoints: GrammarPoint[];
  quiz: LessonQuizQuestion[];
  isOrientation?: boolean;
  isAssessment?: boolean;
}

export interface KanaCharacter {
  id: string;
  character: string;
  romaji: string;
  type: 'hiragana' | 'katakana';
  category: 'gojuon' | 'dakuten' | 'handakuten' | 'yoon' | 'extended';
  row: string; // 'a', 'ka', 'sa', etc.
  column?: string; // 'a', 'i', 'u', 'e', 'o'
  strokeCount: number;
  strokeHint?: string;
  exampleWord: string;
  exampleKana: string;
  exampleMeaningEn: string;
  exampleMeaningBn: string;
  audioText: string;
  similarChars?: string[];
}

export interface VerbConjugationEntry {
  lesson: number;
  meaningEn: string;
  meaningBn: string;
  group: 'Group I' | 'Group II' | 'Group III';
  dictionary: string;
  masu: string;
  te: string;
  nai: string;
  ta: string;
  romaji: string;
  ruleExplanation?: string;
}

export interface CounterEntry {
  category: string;
  kanji: string;
  descriptionEn: string;
  descriptionBn: string;
  items: {
    count: number;
    japanese: string;
    kana: string;
    romaji: string;
  }[];
  interrogative: {
    japanese: string;
    kana: string;
    romaji: string;
  };
}

export interface UserProgressItem {
  id: string;
  mastery: MasteryStatus;
  correctCount: number;
  incorrectCount: number;
  streak: number;
  lastStudied?: string; // ISO date
  nextReviewDate?: string; // ISO date
  intervalDays: number;
  easeFactor: number;
  isFavorite?: boolean;
  isDifficult?: boolean;
}

export interface UserMistakeRecord {
  id: string;
  itemId: string;
  itemType: 'vocab' | 'kana' | 'grammar' | 'quiz';
  prompt: string;
  userAnswer: string;
  correctAnswer: string;
  lesson?: number;
  timestamp: string;
  reviewed: boolean;
  mistakeCount: number;
}

export interface UserDailyActivity {
  date: string; // YYYY-MM-DD
  minutesStudied: number;
  cardsReviewed: number;
  lessonsCompleted: number;
  quizScoreAverage: number;
}

export interface Achievement {
  id: string;
  titleEn: string;
  titleBn: string;
  descriptionEn: string;
  descriptionBn: string;
  icon: string;
  isUnlocked: boolean;
  unlockedAt?: string;
  progress: number; // 0 to 100
}

export interface UserSettings {
  language: InterfaceLanguage;
  theme: ThemeMode;
  dailyGoalMinutes: number;
  studyReminderTime: string; // "20:00"
  studyReminderEnabled: boolean;
  studyDays: number[]; // 0 = Sun, 1 = Mon ...
  audioSpeed: number; // 0.8, 1.0, 1.2
  soundEffects: boolean;
  showRomaji: boolean;
  showBangla: boolean;
  reducedMotion: boolean;
  onboardingCompleted: boolean;
  startDate: string; // YYYY-MM-DD
  placementLevel: 'beginner' | 'kana-known' | 'elementary';
}
