import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { ALL_VOCABULARY, LESSONS_DATA } from '../../data/lessonsData';
import { VocabularyItem } from '../../types';
import { TTSAudioButton } from '../common/TTSAudioButton';
import { 
  Search, 
  Volume2, 
  Star, 
  AlertCircle, 
  Filter, 
  BookOpen, 
  CheckCircle,
  Eye,
  EyeOff
} from 'lucide-react';

export const VocabularyExplorerView: React.FC = () => {
  const { settings, progress, toggleFavorite, toggleDifficult, speakText } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLesson, setSelectedLesson] = useState<string>('all');
  const [selectedPos, setSelectedPos] = useState<string>('all');
  const [filterMode, setFilterMode] = useState<'all' | 'favorites' | 'difficult' | 'mastered'>('all');
  const [revealAll, setRevealAll] = useState(true);

  // Filter vocabulary
  const filteredVocab = useMemo(() => {
    return ALL_VOCABULARY.filter(item => {
      // Lesson filter
      if (selectedLesson !== 'all' && item.lesson !== Number(selectedLesson)) {
        return false;
      }

      // POS filter
      if (selectedPos !== 'all' && item.partOfSpeech !== selectedPos) {
        return false;
      }

      // Status filters
      const itemProgress = progress[item.id];
      if (filterMode === 'favorites' && !itemProgress?.isFavorite) return false;
      if (filterMode === 'difficult' && !itemProgress?.isDifficult) return false;
      if (filterMode === 'mastered' && itemProgress?.mastery !== 'mastered') return false;

      // Search term
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesJp = item.japanese.toLowerCase().includes(q);
        const matchesKana = item.kana.toLowerCase().includes(q);
        const matchesRomaji = item.romaji.toLowerCase().includes(q);
        const matchesEn = item.english.toLowerCase().includes(q);
        const matchesBn = item.bangla.toLowerCase().includes(q);

        if (!matchesJp && !matchesKana && !matchesRomaji && !matchesEn && !matchesBn) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, selectedLesson, selectedPos, filterMode, progress]);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Title & Stats */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-stone-200 dark:border-stone-800">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <span>{settings.language === 'bn' ? 'জাপানি শব্দভাণ্ডার অভিধান' : 'Vocabulary Explorer'}</span>
            <span className="text-xs px-2 py-0.5 rounded bg-[#C23A2B]/10 text-[#C23A2B] font-mono">
              {filteredVocab.length} words
            </span>
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
            {settings.language === 'bn'
              ? 'পাঠ ০ থেকে ২৫ এর পাঠ্যবই অনুযায়ী শব্দতালিকা, অর্থ, উচ্চারণ এবং উদাহরণ বাক্য।'
              : 'Official verified textbook vocabulary with audio, Romaji, English, and Bangla explanations.'}
          </p>
        </div>

        <button
          onClick={() => setRevealAll(!revealAll)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-50 transition-colors self-start md:self-auto"
        >
          {revealAll ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
          <span>{revealAll ? 'Hide Translations' : 'Reveal Translations'}</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
        {/* Search Input */}
        <div className="sm:col-span-5 relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={settings.language === 'bn' ? 'জাপানি, রোমাজি, ইংরেজি বা বাংলায় অনুসন্ধান...' : 'Search in Japanese, Romaji, English, or Bangla...'}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-[#C23A2B]"
          />
        </div>

        {/* Lesson Filter */}
        <div className="sm:col-span-3">
          <select
            value={selectedLesson}
            onChange={(e) => setSelectedLesson(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-1 focus:ring-[#C23A2B]"
          >
            <option value="all">All Lessons (0–25)</option>
            {LESSONS_DATA.map(l => (
              <option key={l.id} value={l.number}>
                Lesson {l.number}: {l.titleEn}
              </option>
            ))}
          </select>
        </div>

        {/* Status Mode Segment */}
        <div className="sm:col-span-4 flex items-center gap-1 p-1 bg-stone-100 dark:bg-stone-800 rounded-xl overflow-x-auto">
          <button
            onClick={() => setFilterMode('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${filterMode === 'all' ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-xs' : 'text-stone-500'}`}
          >
            All
          </button>
          <button
            onClick={() => setFilterMode('favorites')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${filterMode === 'favorites' ? 'bg-white dark:bg-stone-700 text-amber-600 dark:text-amber-400 shadow-xs' : 'text-stone-500'}`}
          >
            Saved
          </button>
          <button
            onClick={() => setFilterMode('difficult')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${filterMode === 'difficult' ? 'bg-white dark:bg-stone-700 text-rose-600 dark:text-rose-400 shadow-xs' : 'text-stone-500'}`}
          >
            Difficult
          </button>
          <button
            onClick={() => setFilterMode('mastered')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${filterMode === 'mastered' ? 'bg-white dark:bg-stone-700 text-emerald-600 dark:text-emerald-400 shadow-xs' : 'text-stone-500'}`}
          >
            Mastered
          </button>
        </div>
      </div>

      {/* Vocabulary Cards List */}
      {filteredVocab.length === 0 ? (
        <div className="py-16 text-center text-stone-400 space-y-2">
          <BookOpen className="w-8 h-8 mx-auto text-stone-300 dark:text-stone-700" />
          <p className="text-sm font-medium">No matching vocabulary found.</p>
          <p className="text-xs">Try adjusting your search terms or filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filteredVocab.map((item) => {
            const itemProgress = progress[item.id];
            const isFav = !!itemProgress?.isFavorite;
            const isDiff = !!itemProgress?.isDifficult;
            const mastery = itemProgress?.mastery || 'new';

            return (
              <div
                key={item.id}
                className="group relative flex flex-col justify-between p-4 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl hover:border-stone-300 dark:hover:border-stone-700 transition-all shadow-xs"
              >
                <div>
                  {/* Card Header: Lesson & Tag, Actions */}
                  <div className="flex items-center justify-between text-[11px] text-stone-400 pb-2">
                    <span className="font-mono">Lesson {item.lesson} · {item.partOfSpeech}</span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => toggleDifficult(item.id)}
                        className={`p-1 rounded hover:bg-stone-100 dark:hover:bg-stone-800 ${isDiff ? 'text-rose-500 fill-rose-500' : 'text-stone-300'}`}
                        title="Mark Difficult"
                      >
                        <AlertCircle className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => toggleFavorite(item.id)}
                        className={`p-1 rounded hover:bg-stone-100 dark:hover:bg-stone-800 ${isFav ? 'text-amber-500 fill-amber-500' : 'text-stone-300'}`}
                        title="Favorite"
                      >
                        <Star className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Japanese Main Term */}
                  <div className="flex items-baseline justify-between gap-2 mt-1">
                    <div>
                      <div className="text-2xl font-bold font-jp text-stone-900 dark:text-stone-100 group-hover:text-[#C23A2B] transition-colors">
                        {item.japanese}
                      </div>
                      <div className="text-xs font-jp text-stone-500">
                        {item.kana}
                      </div>
                    </div>
                    <TTSAudioButton 
                      text={item.japanese}
                      reading={item.kana}
                      enableSpeedToggle={true}
                      size="md"
                      title={`Pronounce ${item.japanese} (${item.romaji})`}
                    />
                  </div>

                  {/* Romaji */}
                  {settings.showRomaji && (
                    <div className="text-xs font-mono text-[#C23A2B] dark:text-[#E85D4D] mt-1">
                      {item.romaji}
                    </div>
                  )}

                  {/* Meanings */}
                  {revealAll && (
                    <div className="mt-3 pt-2.5 border-t border-stone-100 dark:border-stone-800/80 space-y-1">
                      <div className="text-xs font-semibold text-stone-800 dark:text-stone-200">
                        {item.english}
                      </div>
                      {settings.showBangla && item.bangla && (
                        <div className="text-xs text-stone-600 dark:text-stone-400 font-sans">
                          {item.bangla}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Example Sentence Card with TTS Audio Toggle */}
                  {revealAll && item.example && (
                    <div className="mt-3 p-3 bg-stone-50 dark:bg-stone-800/50 rounded-xl border border-stone-200/60 dark:border-stone-700/50 text-xs space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div className="space-y-1">
                          <div className="font-jp text-stone-900 dark:text-stone-100 font-semibold text-xs leading-relaxed">
                            {item.example.japanese}
                          </div>
                          <div className="text-[11px] text-stone-500 font-mono">
                            {item.example.romaji}
                          </div>
                        </div>
                        <TTSAudioButton 
                          text={item.example.japanese}
                          reading={item.example.kana}
                          size="xs"
                          enableSpeedToggle={true}
                          title={`Listen to example: ${item.example.japanese}`}
                        />
                      </div>
                      <div className="text-[11px] text-stone-700 dark:text-stone-300 pt-1 border-t border-stone-200/40 dark:border-stone-700/40">
                        {settings.language === 'bn' ? item.example.bangla : item.example.english}
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer status */}
                <div className="mt-3 pt-2 flex items-center justify-between text-[10px] text-stone-400">
                  <span className="capitalize">{mastery}</span>
                  {item.isVerifiedTextbook && (
                    <span className="text-stone-400">Verified Textbook</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
