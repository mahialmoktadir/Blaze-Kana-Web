export type KanjiCategory = 
  | 'numbers-currency'
  | 'time-nature'
  | 'people-family'
  | 'positions-directions'
  | 'daily-study-actions';

export interface KanjiStrokeStep {
  step: number;
  instructionEn: string;
  instructionBn: string;
  direction: 'horizontal' | 'vertical' | 'slant-left' | 'slant-right' | 'hook' | 'dot' | 'box';
  svgPath: string; // SVG path for stroke visualization
}

export interface KanjiVocabItem {
  japanese: string;
  kana: string;
  romaji: string;
  english: string;
  bangla: string;
  exampleSentence?: string;
  exampleKana?: string;
  exampleEn?: string;
  exampleBn?: string;
}

export interface SimilarKanjiComparison {
  character: string;
  meaningEn: string;
  meaningBn: string;
  differenceEn: string;
  differenceBn: string;
}

export interface KanjiItem {
  id: string;
  character: string;
  meaningEn: string;
  meaningBn: string;
  category: KanjiCategory;
  categoryEn: string;
  categoryBn: string;
  onyomi: string[];
  onyomiRomaji: string[];
  kunyomi: string[];
  kunyomiRomaji: string[];
  strokeCount: number;
  strokeOrder: KanjiStrokeStep[];
  mnemonic: {
    storyEn: string;
    storyBn: string;
    visualConcept: string;
    animationType: string;
    pictorialIcon?: string;
  };
  vocabulary: KanjiVocabItem[];
  similarKanji?: SimilarKanjiComparison[];
  pitfalls?: {
    en: string;
    bn: string;
  };
  jlptLevel: string; // "80 Kanji from the supplied N5 Kanji Book"
  curriculumIndex: number; // 1 to 80
}

export type KanjiViewMode = 'grid' | 'table' | 'cards';
