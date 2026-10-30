import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ALL_VOCABULARY } from '../../data/lessonsData';
import { Star, AlertCircle, Volume2, Play, BookOpen } from 'lucide-react';
import { TTSAudioButton } from '../common/TTSAudioButton';

export const FavoritesView: React.FC = () => {
  const { progress, toggleFavorite, toggleDifficult, speakText, navigateTo, settings } = useApp();
  const [activeTab, setActiveTab] = useState<'favorites' | 'difficult'>('favorites');

  const favoriteItems = ALL_VOCABULARY.filter(v => progress[v.id]?.isFavorite);
  const difficultItems = ALL_VOCABULARY.filter(v => progress[v.id]?.isDifficult);

  const displayedList = activeTab === 'favorites' ? favoriteItems : difficultItems;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200 dark:border-stone-800">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <span>{settings.language === 'bn' ? 'সংরক্ষিত ও কঠিন শব্দাবলী' : 'Saved & Difficult Words'}</span>
            <span className="text-xs px-2 py-0.5 rounded bg-[#C23A2B]/10 text-[#C23A2B] font-mono">
              Collections
            </span>
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
            Personalized collection of bookmarked words and flagged difficult vocabulary for targeted review.
          </p>
        </div>

        {displayedList.length > 0 && (
          <button
            onClick={() => navigateTo('flashcards')}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#C23A2B] hover:bg-[#A82E21] rounded-xl shadow-xs inline-flex items-center gap-1.5 self-start sm:self-auto"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Practice in Flashcards</span>
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setActiveTab('favorites')}
          className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl border transition-all ${
            activeTab === 'favorites' 
              ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-200' 
              : 'border-stone-200 dark:border-stone-800 text-stone-500'
          }`}
        >
          <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
          <span>Bookmarked Words ({favoriteItems.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('difficult')}
          className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl border transition-all ${
            activeTab === 'difficult' 
              ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-700 text-rose-800 dark:text-rose-200' 
              : 'border-stone-200 dark:border-stone-800 text-stone-500'
          }`}
        >
          <AlertCircle className="w-4 h-4 text-rose-500" />
          <span>Difficult Items ({difficultItems.length})</span>
        </button>
      </div>

      {/* Content Grid */}
      {displayedList.length === 0 ? (
        <div className="p-12 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl text-center space-y-3 shadow-xs">
          <BookOpen className="w-10 h-10 mx-auto text-stone-300 dark:text-stone-700" />
          <h3 className="text-base font-bold text-stone-800 dark:text-stone-200">
            No words in this list yet
          </h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            While exploring the vocabulary or studying lessons, tap the star or warning icon on any word to bookmark it here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {displayedList.map(item => (
            <div
              key={item.id}
              className="p-4 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl space-y-2 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] text-stone-400">
                  <span className="font-mono">Lesson {item.lesson}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleDifficult(item.id)}
                      className={`p-1 rounded ${progress[item.id]?.isDifficult ? 'text-rose-500 fill-rose-500' : 'text-stone-300'}`}
                      title="Toggle Difficult"
                    >
                      <AlertCircle className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => toggleFavorite(item.id)}
                      className={`p-1 rounded ${progress[item.id]?.isFavorite ? 'text-amber-500 fill-amber-500' : 'text-stone-300'}`}
                      title="Toggle Favorite"
                    >
                      <Star className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="flex items-baseline justify-between gap-2 mt-1">
                  <div>
                    <span className="text-2xl font-bold font-jp text-stone-900 dark:text-stone-100">
                      {item.japanese}
                    </span>
                    <span className="text-xs text-stone-500 font-jp ml-2">
                      {item.kana}
                    </span>
                  </div>
                  <TTSAudioButton 
                    text={item.japanese}
                    reading={item.kana}
                    enableSpeedToggle={true}
                    size="sm"
                    title={`Pronounce ${item.japanese}`}
                  />
                </div>

                <div className="text-xs font-mono text-[#C23A2B] mt-0.5">
                  {item.romaji}
                </div>

                <div className="text-xs text-stone-800 dark:text-stone-200 font-semibold mt-2">
                  {item.english}
                </div>
                {settings.showBangla && item.bangla && (
                  <div className="text-xs text-stone-600 dark:text-stone-400 font-sans">
                    {item.bangla}
                  </div>
                )}

                {/* Example sentence card with audio toggle */}
                {item.example && (
                  <div className="mt-3 p-2.5 bg-stone-50 dark:bg-stone-800/60 rounded-xl border border-stone-200/50 dark:border-stone-700/50 text-xs space-y-1.5">
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-0.5">
                        <div className="font-jp font-semibold text-stone-900 dark:text-stone-100 text-xs">
                          {item.example.japanese}
                        </div>
                        <div className="text-[11px] font-mono text-stone-500">
                          {item.example.romaji}
                        </div>
                      </div>
                      <TTSAudioButton 
                        text={item.example.japanese}
                        reading={item.example.kana}
                        size="xs"
                        enableSpeedToggle={true}
                        title={`Listen to sentence: ${item.example.japanese}`}
                      />
                    </div>
                    <div className="text-[11px] text-stone-600 dark:text-stone-400 pt-1 border-t border-stone-100 dark:border-stone-700">
                      {settings.language === 'bn' ? item.example.bangla : item.example.english}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
