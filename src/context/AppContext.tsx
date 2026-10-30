import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserSettings, 
  UserProgressItem, 
  UserMistakeRecord, 
  Achievement, 
  InterfaceLanguage, 
  ThemeMode 
} from '../types';
import { storageService } from '../services/storageService';
import { audioService } from '../services/audioService';

export type NavTab = 
  | 'home'
  | 'learning-path'
  | 'kana'
  | 'kanji'
  | 'kanji-detail'
  | 'kanji-flashcards'
  | 'vocabulary'
  | 'lessons'
  | 'lesson-detail'
  | 'grammar-lab'
  | 'sentence-builder'
  | 'reading-listening'
  | 'writing'
  | 'flashcards'
  | 'practice'
  | 'quiz'
  | 'memory'
  | 'speed'
  | 'daily-challenge'
  | 'mistakes'
  | 'favorites'
  | 'progress'
  | 'calendar'
  | 'appendices'
  | 'settings'
  | 'about';

interface AppContextType {
  activeTab: NavTab;
  selectedLessonId: string | null;
  selectedKanaId: string | null;
  selectedKanjiId: string | null;
  settings: UserSettings;
  completedLessons: string[];
  progress: Record<string, UserProgressItem>;
  mistakes: UserMistakeRecord[];
  achievements: Achievement[];
  streak: { currentStreak: number; longestStreak: number };
  senseiModalOpen: boolean;
  senseiInitialQuery: string;
  senseiContext: string;
  navigateTo: (tab: NavTab, options?: { lessonId?: string; kanaId?: string; kanjiId?: string }) => void;
  updateSettings: (newSettings: Partial<UserSettings>) => void;
  completeLesson: (lessonId: string) => void;
  recordPracticeAttempt: (itemId: string, isCorrect: boolean) => void;
  logMistake: (mistake: Omit<UserMistakeRecord, 'id' | 'timestamp' | 'reviewed' | 'mistakeCount'>) => void;
  currentlySpeaking: string | null;
  isSpeaking: boolean;
  toggleFavorite: (itemId: string) => void;
  toggleDifficult: (itemId: string) => void;
  speakText: (text: string, customRate?: number) => void;
  toggleSpeakText: (text: string, customRate?: number) => boolean;
  stopSpeakText: () => void;
  playSfx: (type: 'correct' | 'incorrect' | 'celebration' | 'click') => void;
  openSensei: (query?: string, context?: string) => void;
  closeSensei: () => void;
  resetAll: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<UserSettings>(() => storageService.getSettings());
  const [activeTab, setActiveTab] = useState<NavTab>(() => settings.onboardingCompleted ? 'home' : 'home');
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>('lesson_1');
  const [selectedKanaId, setSelectedKanaId] = useState<string | null>(null);
  const [selectedKanjiId, setSelectedKanjiId] = useState<string | null>('kanji-1');
  
  const [completedLessons, setCompletedLessons] = useState<string[]>(() => storageService.getCompletedLessons());
  const [progress, setProgress] = useState<Record<string, UserProgressItem>>(() => storageService.getProgress());
  const [mistakes, setMistakes] = useState<UserMistakeRecord[]>(() => storageService.getMistakes());
  const [achievements, setAchievements] = useState<Achievement[]>(() => storageService.getAchievements());
  const [streak, setStreak] = useState(() => storageService.getStreak());

  // Sensei modal state
  const [senseiModalOpen, setSenseiModalOpen] = useState(false);
  const [senseiInitialQuery, setSenseiInitialQuery] = useState('');
  const [senseiContext, setSenseiContext] = useState('');

  // Speech state
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentlySpeaking, setCurrentlySpeaking] = useState<string | null>(null);

  useEffect(() => {
    return audioService.subscribe((state) => {
      setIsSpeaking(state.isSpeaking);
      setCurrentlySpeaking(state.currentText);
    });
  }, []);

  // Handle dark mode theme change
  useEffect(() => {
    const root = document.documentElement;
    const isDark = 
      settings.theme === 'dark' || 
      (settings.theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [settings.theme]);

  const navigateTo = (tab: NavTab, options?: { lessonId?: string; kanaId?: string; kanjiId?: string }) => {
    audioService.playClick();
    if (options?.lessonId) setSelectedLessonId(options.lessonId);
    if (options?.kanaId) setSelectedKanaId(options.kanaId);
    if (options?.kanjiId) setSelectedKanjiId(options.kanjiId);
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: settings.reducedMotion ? 'auto' : 'smooth' });
  };

  const updateSettings = (newSettings: Partial<UserSettings>) => {
    const updated = storageService.saveSettings(newSettings);
    setSettings(updated);
  };

  const completeLesson = (lessonId: string) => {
    const updated = storageService.completeLesson(lessonId);
    setCompletedLessons([...updated]);
    setAchievements(storageService.getAchievements());
    audioService.playCelebration();
  };

  const recordPracticeAttempt = (itemId: string, isCorrect: boolean) => {
    const item = storageService.recordAttempt(itemId, isCorrect);
    setProgress(prev => ({ ...prev, [itemId]: item }));
    setAchievements(storageService.getAchievements());
    setStreak(storageService.getStreak());

    if (settings.soundEffects) {
      if (isCorrect) audioService.playCorrect();
      else audioService.playIncorrect();
    }
  };

  const logMistake = (mistake: Omit<UserMistakeRecord, 'id' | 'timestamp' | 'reviewed' | 'mistakeCount'>) => {
    storageService.logMistake(mistake);
    setMistakes(storageService.getMistakes());
  };

  const toggleFavorite = (itemId: string) => {
    storageService.toggleFavorite(itemId);
    setProgress({ ...storageService.getProgress() });
  };

  const toggleDifficult = (itemId: string) => {
    storageService.toggleDifficult(itemId);
    setProgress({ ...storageService.getProgress() });
  };

  const speakText = (text: string, customRate?: number) => {
    audioService.speakJapanese(text, customRate ?? settings.audioSpeed);
  };

  const toggleSpeakText = (text: string, customRate?: number): boolean => {
    return audioService.toggleSpeech(text, customRate ?? settings.audioSpeed);
  };

  const stopSpeakText = () => {
    audioService.stopSpeech();
  };

  const playSfx = (type: 'correct' | 'incorrect' | 'celebration' | 'click') => {
    if (!settings.soundEffects) return;
    if (type === 'correct') audioService.playCorrect();
    else if (type === 'incorrect') audioService.playIncorrect();
    else if (type === 'celebration') audioService.playCelebration();
    else audioService.playClick();
  };

  const openSensei = (query: string = '', context: string = '') => {
    setSenseiInitialQuery(query);
    setSenseiContext(context);
    setSenseiModalOpen(true);
  };

  const closeSensei = () => {
    setSenseiModalOpen(false);
  };

  const resetAll = () => {
    storageService.resetAllProgress();
    setSettings(storageService.getSettings());
    setCompletedLessons([]);
    setProgress({});
    setMistakes([]);
    setAchievements(storageService.getAchievements());
    setStreak({ currentStreak: 0, longestStreak: 0 });
    setActiveTab('home');
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        selectedLessonId,
        selectedKanaId,
        selectedKanjiId,
        settings,
        completedLessons,
        progress,
        mistakes,
        achievements,
        streak,
        senseiModalOpen,
        senseiInitialQuery,
        senseiContext,
        navigateTo,
        updateSettings,
        completeLesson,
        recordPracticeAttempt,
        logMistake,
        currentlySpeaking,
        isSpeaking,
        toggleFavorite,
        toggleDifficult,
        speakText,
        toggleSpeakText,
        stopSpeakText,
        playSfx,
        openSensei,
        closeSensei,
        resetAll,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
