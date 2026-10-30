import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { BottomNav } from './components/layout/BottomNav';
import { Footer } from './components/layout/Footer';
import { SenseiModal } from './components/common/SenseiModal';
import { OnboardingView } from './components/views/OnboardingView';

// Views
import { DashboardView } from './components/views/DashboardView';
import { LearningPathView } from './components/views/LearningPathView';
import { LessonCatalogueView } from './components/views/LessonCatalogueView';
import { LessonDetailView } from './components/views/LessonDetailView';
import { KanaChartView } from './components/views/KanaChartView';
import { KanjiExplorerView } from './components/views/KanjiExplorerView';
import { KanjiDetailView } from './components/views/KanjiDetailView';
import { VocabularyExplorerView } from './components/views/VocabularyExplorerView';
import { GrammarLabView } from './components/views/GrammarLabView';
import { SentenceBuilderView } from './components/views/SentenceBuilderView';
import { WritingCanvasView } from './components/views/WritingCanvasView';
import { ReadingListeningView } from './components/views/ReadingListeningView';
import { FlashcardsView } from './components/views/FlashcardsView';
import { PracticeHubView } from './components/views/PracticeHubView';
import { DailyChallengeView } from './components/views/DailyChallengeView';
import { SpeedChallengeView } from './components/views/SpeedChallengeView';
import { MemoryPracticeView } from './components/views/MemoryPracticeView';
import { MistakeReviewView } from './components/views/MistakeReviewView';
import { FavoritesView } from './components/views/FavoritesView';
import { ProgressView } from './components/views/ProgressView';
import { CalendarView } from './components/views/CalendarView';
import { AppendicesView } from './components/views/AppendicesView';
import { SettingsView } from './components/views/SettingsView';
import { AboutView } from './components/views/AboutView';

const MainContent: React.FC = () => {
  const { activeTab } = useApp();

  const renderView = () => {
    switch (activeTab) {
      case 'home':
        return <DashboardView />;
      case 'learning-path':
        return <LearningPathView />;
      case 'lessons':
        return <LessonCatalogueView />;
      case 'lesson-detail':
        return <LessonDetailView />;
      case 'kana':
        return <KanaChartView />;
      case 'kanji':
        return <KanjiExplorerView />;
      case 'kanji-detail':
        return <KanjiDetailView />;
      case 'vocabulary':
        return <VocabularyExplorerView />;
      case 'grammar-lab':
        return <GrammarLabView />;
      case 'sentence-builder':
        return <SentenceBuilderView />;
      case 'writing':
        return <WritingCanvasView />;
      case 'reading-listening':
        return <ReadingListeningView />;
      case 'flashcards':
        return <FlashcardsView />;
      case 'practice':
        return <PracticeHubView />;
      case 'daily-challenge':
        return <DailyChallengeView />;
      case 'speed':
        return <SpeedChallengeView />;
      case 'memory':
        return <MemoryPracticeView />;
      case 'mistakes':
        return <MistakeReviewView />;
      case 'favorites':
        return <FavoritesView />;
      case 'progress':
        return <ProgressView />;
      case 'calendar':
        return <CalendarView />;
      case 'appendices':
        return <AppendicesView />;
      case 'settings':
        return <SettingsView />;
      case 'about':
        return <AboutView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F5] dark:bg-[#121316] text-stone-900 dark:text-stone-100 transition-colors">
      <Header />
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 overflow-hidden">
          {renderView()}
        </main>
      </div>
      <Footer />
      <BottomNav />
      <SenseiModal />
      <OnboardingView />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
