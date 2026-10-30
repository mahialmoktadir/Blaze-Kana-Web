import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { N5_KANJI_DATA, KANJI_CATEGORIES } from '../../data/kanjiData';
import { KanjiCategory, KanjiItem, KanjiViewMode } from '../../types/kanji';
import { TTSAudioButton } from '../common/TTSAudioButton';
import { 
  Search, 
  Filter, 
  Grid3X3, 
  Table, 
  Star, 
  CheckCircle2, 
  BookOpen, 
  Flame, 
  Layers, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const KanjiExplorerView: React.FC = () => {
  const { navigateTo, progress, settings } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<KanjiCategory | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'new' | 'learning' | 'mastered' | 'favorite'>('all');
  const [viewMode, setViewMode] = useState<KanjiViewMode>('grid');

  // Filter Kanji list
  const filteredKanji = useMemo(() => {
    return N5_KANJI_DATA.filter((k) => {
      // Category filter
      if (selectedCategory !== 'all' && k.category !== selectedCategory) {
        return false;
      }

      // Mastery / Favorite filter
      const itemProgress = progress[k.id];
      const mastery = itemProgress?.mastery || 'new';
      if (selectedStatus === 'favorite' && !itemProgress?.isFavorite) {
        return false;
      }
      if (selectedStatus === 'mastered' && mastery !== 'mastered') {
        return false;
      }
      if (selectedStatus === 'learning' && (mastery !== 'learning' && mastery !== 'review')) {
        return false;
      }
      if (selectedStatus === 'new' && mastery !== 'new') {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchChar = k.character.includes(query);
        const matchMeaningEn = k.meaningEn.toLowerCase().includes(query);
        const matchMeaningBn = k.meaningBn.toLowerCase().includes(query);
        const matchOnyomi = k.onyomi.some(on => on.includes(query) || on.toLowerCase().includes(query));
        const matchKunyomi = k.kunyomi.some(kun => kun.includes(query) || kun.toLowerCase().includes(query));
        const matchRomaji = k.onyomiRomaji.some(r => r.includes(query)) || k.kunyomiRomaji.some(r => r.includes(query));
        return matchChar || matchMeaningEn || matchMeaningBn || matchOnyomi || matchKunyomi || matchRomaji;
      }

      return true;
    });
  }, [searchQuery, selectedCategory, selectedStatus, progress]);

  // Overall statistics
  const masteredCount = useMemo(() => {
    return N5_KANJI_DATA.filter(k => progress[k.id]?.mastery === 'mastered').length;
  }, [progress]);

  const learningCount = useMemo(() => {
    return N5_KANJI_DATA.filter(k => progress[k.id]?.mastery === 'learning' || progress[k.id]?.mastery === 'review').length;
  }, [progress]);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-stone-900 via-[#18191d] to-[#0b0b0c] text-white p-6 sm:p-8 lg:p-10 border border-stone-800 shadow-xl overflow-hidden">
        {/* Ambient watermark of Kanji 一 二 三 */}
        <div className="absolute right-4 -bottom-6 text-8xl sm:text-9xl font-black font-jp text-white/5 pointer-events-none select-none">
          漢字
        </div>

        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff5700]/20 border border-[#ff5700]/40 text-[#ff8533] text-xs font-mono font-bold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>80 Kanji from the supplied N5 Kanji Book</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {settings.language === 'bn' ? 'জেএলপিটি এন৫ কাঞ্জি হাব' : 'JLPT N5 Kanji Master Hub'}
          </h1>

          <p className="text-sm text-stone-300 leading-relaxed font-sans">
            {settings.language === 'bn' 
              ? 'এন৫ পাঠ্যবইয়ের ৮০টি কাঞ্জি আয়ত্ত করুন। প্রতিটি কাঞ্জির জন্য রয়েছে অ্যানিমেটেড স্মৃতিসহায়ক দৃশ্য, বাংলা ও ইংরেজি অর্থ, স্ট্রোক অর্ডার গাইড, উচ্চারণ অডিও ও শব্দভাণ্ডার।'
              : 'Master all 80 fundamental Kanji characters covered by the N5 curriculum. Every character includes an animated memory mnemonic, stroke tracing trainer, native TTS audio, and vocabulary compounds.'}
          </p>

          {/* Quick Stats Bar */}
          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-1.5 text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>{masteredCount} / 80 Mastered</span>
            </div>
            <div className="flex items-center gap-1.5 text-amber-400">
              <BookOpen className="w-4 h-4" />
              <span>{learningCount} Learning</span>
            </div>
            <div className="flex items-center gap-1.5 text-stone-400">
              <span>{80 - masteredCount - learningCount} New</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#16171b] border border-stone-200 dark:border-stone-800 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={settings.language === 'bn' ? 'কাঞ্জি, অর্থ বা উচ্চারণ খুঁজুন...' : 'Search kanji, meaning, reading...'}
              className="w-full pl-10 pr-4 py-2 rounded-xl text-xs bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-white placeholder-stone-400 focus:outline-none focus:border-[#ff5700]"
            />
          </div>

          {/* View Modes & Status Filter */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as any)}
              className="px-3 py-2 rounded-xl text-xs bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 focus:outline-none cursor-pointer"
            >
              <option value="all">{settings.language === 'bn' ? 'সকল অগ্রগতি' : 'All Progress'}</option>
              <option value="new">{settings.language === 'bn' ? 'নতুন কাঞ্জি' : 'New Only'}</option>
              <option value="learning">{settings.language === 'bn' ? 'শিখছেন' : 'In Progress'}</option>
              <option value="mastered">{settings.language === 'bn' ? 'আয়ত্তকৃত' : 'Mastered'}</option>
              <option value="favorite">{settings.language === 'bn' ? 'সংরক্ষিত' : 'Saved Stars'}</option>
            </select>

            {/* Grid vs Table toggle */}
            <div className="flex bg-stone-100 dark:bg-stone-800 p-1 rounded-xl">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-xs' : 'text-stone-400'}`}
                title="Grid Cards View"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-lg transition-all ${viewMode === 'table' ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-xs' : 'text-stone-400'}`}
                title="Compact Table View"
              >
                <Table className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap font-medium transition-all cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-[#ff5700] text-white shadow-sm font-bold'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
            }`}
          >
            {settings.language === 'bn' ? 'সকল কাঞ্জি (৮০)' : 'All 80 Kanji'}
          </button>

          {KANJI_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedCategory === cat.id
                  ? 'bg-[#ff5700] text-white shadow-sm font-bold'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
              }`}
            >
              <span>{settings.language === 'bn' ? cat.nameBn : cat.nameEn}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${selectedCategory === cat.id ? 'bg-black/30 text-white' : 'bg-stone-200 dark:bg-stone-700 text-stone-500'}`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      {viewMode === 'grid' ? (
        /* Grid Cards View */
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4">
          {filteredKanji.map((kanji) => {
            const itemProgress = progress[kanji.id];
            const isFav = !!itemProgress?.isFavorite;
            const isMastered = itemProgress?.mastery === 'mastered';

            return (
              <div
                key={kanji.id}
                onClick={() => navigateTo('kanji-detail', { kanjiId: kanji.id })}
                className="group relative p-4 rounded-2xl bg-white dark:bg-[#16171b] border border-stone-200 dark:border-stone-800 hover:border-[#ff5700] dark:hover:border-[#ff5700] shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
              >
                {/* Card Top: Index & Favorite */}
                <div className="flex items-center justify-between text-[11px] text-stone-400 font-mono">
                  <span>#{kanji.curriculumIndex}</span>
                  <div className="flex items-center gap-1">
                    {isMastered && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
                    {isFav && <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />}
                  </div>
                </div>

                {/* Central Kanji Character */}
                <div className="my-2 text-center">
                  <div className="text-4xl sm:text-5xl font-bold font-jp text-stone-900 dark:text-white group-hover:scale-105 transition-transform">
                    {kanji.character}
                  </div>
                  <div className="text-xs font-bold text-stone-800 dark:text-stone-200 mt-1 truncate">
                    {kanji.meaningEn}
                  </div>
                  <div className="text-[11px] font-medium text-[#ff5700] truncate">
                    {kanji.meaningBn}
                  </div>
                </div>

                {/* Bottom Readings & Quick Audio */}
                <div className="pt-2 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between text-[11px]">
                  <span className="text-stone-500 font-jp truncate max-w-[90px]">
                    {kanji.kunyomi[0] ? kanji.kunyomi[0].replace('.', '') : kanji.onyomi[0]}
                  </span>

                  <div onClick={(e) => e.stopPropagation()}>
                    <TTSAudioButton 
                      text={kanji.character}
                      reading={kanji.kunyomi[0] ? kanji.kunyomi[0].replace('.', '') : kanji.onyomi[0]}
                      size="sm"
                      title={`Pronounce ${kanji.character}`}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Compact Table View */
        <div className="rounded-2xl bg-white dark:bg-[#16171b] border border-stone-200 dark:border-stone-800 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 dark:bg-stone-900/60 text-stone-500 font-mono uppercase border-b border-stone-200 dark:border-stone-800">
                <tr>
                  <th className="py-3 px-4">#</th>
                  <th className="py-3 px-4">Kanji</th>
                  <th className="py-3 px-4">English Meaning</th>
                  <th className="py-3 px-4">বাংলা অর্থ</th>
                  <th className="py-3 px-4">On’yomi (音)</th>
                  <th className="py-3 px-4">Kun’yomi (訓)</th>
                  <th className="py-3 px-4">Strokes</th>
                  <th className="py-3 px-4 text-right">Listen / Open</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-stone-800/60 font-sans">
                {filteredKanji.map((kanji) => (
                  <tr
                    key={kanji.id}
                    onClick={() => navigateTo('kanji-detail', { kanjiId: kanji.id })}
                    className="hover:bg-stone-50 dark:hover:bg-stone-900/40 transition-colors cursor-pointer"
                  >
                    <td className="py-3 px-4 font-mono text-stone-400">#{kanji.curriculumIndex}</td>
                    <td className="py-3 px-4 font-jp text-xl font-bold text-stone-900 dark:text-white">
                      {kanji.character}
                    </td>
                    <td className="py-3 px-4 font-semibold text-stone-800 dark:text-stone-200">{kanji.meaningEn}</td>
                    <td className="py-3 px-4 text-[#ff5700] font-medium">{kanji.meaningBn}</td>
                    <td className="py-3 px-4 font-jp text-stone-600 dark:text-stone-300">{kanji.onyomi.join('、') || '—'}</td>
                    <td className="py-3 px-4 font-jp text-stone-600 dark:text-stone-300">{kanji.kunyomi.join('、') || '—'}</td>
                    <td className="py-3 px-4 font-mono text-stone-400">{kanji.strokeCount}</td>
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-2" onClick={e => e.stopPropagation()}>
                        <TTSAudioButton 
                          text={kanji.character}
                          reading={kanji.kunyomi[0] ? kanji.kunyomi[0].replace('.', '') : kanji.onyomi[0]}
                          size="sm"
                        />
                        <button
                          onClick={() => navigateTo('kanji-detail', { kanjiId: kanji.id })}
                          className="p-1 rounded-md text-stone-400 hover:text-[#ff5700]"
                        >
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredKanji.length === 0 && (
        <div className="py-12 text-center space-y-3">
          <div className="text-3xl font-jp text-stone-300 dark:text-stone-700">見つかりません</div>
          <p className="text-xs text-stone-500">
            {settings.language === 'bn' ? 'কোনো কাঞ্জি পাওয়া যায়নি। অন্য শব্দ দিয়ে খুঁজুন।' : 'No kanji matches your search or filters. Try adjusting your query.'}
          </p>
        </div>
      )}
    </div>
  );
};
