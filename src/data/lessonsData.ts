import { Lesson } from '../types';

export const LESSONS_DATA: Lesson[] = [
  // --- Lesson 0: Orientation ---
  {
    id: 'lesson_0',
    number: 0,
    dayNumber: 0,
    isOrientation: true,
    title: 'Japanese Language Introduction',
    titleEn: 'Japanese Language Essentials & Writing Systems',
    titleBn: 'জাপানি ভাষা ও বর্ণমালার পরিচিতি',
    descriptionEn: 'Orientation to Hiragana, Katakana, Kanji, sentence word order (SOV), mora timing, and particles.',
    descriptionBn: 'হিরাগানা, কাতাকানা, কাঞ্জি, বাক্যের ক্রম (SOV), মোরা এবং বিভক্তির প্রাথমিক পরিচিতি।',
    estimatedMinutes: 15,
    objectives: [
      'Understand the three Japanese writing systems: Hiragana, Katakana, and Kanji',
      'Learn Japanese Subject-Object-Verb (SOV) sentence order',
      'Understand the 5 pure vowel sounds: a, i, u, e, o',
      'Discover the function of particles (joshi)'
    ],
    vocabulary: [
      { id: 'v0_1', japanese: '日本語', kana: 'にほんご', romaji: 'nihongo', english: 'Japanese language', bangla: 'জাপানি ভাষা', partOfSpeech: 'noun', lesson: 0, example: { japanese: '日本語を勉強します。', kana: 'にほんごをべんきょうします。', romaji: 'Nihongo o benkyou shimasu.', english: 'I study Japanese.', bangla: 'আমি জাপানি ভাষা পড়ি।' } },
      { id: 'v0_2', japanese: 'ひらがな', kana: 'ひらがな', romaji: 'hiragana', english: 'Hiragana script', bangla: 'হিরাগানা বর্ণমালা', partOfSpeech: 'noun', lesson: 0 },
      { id: 'v0_3', japanese: 'カタカナ', kana: 'カタカナ', romaji: 'katakana', english: 'Katakana script', bangla: 'কাতাকানা বর্ণমালা', partOfSpeech: 'noun', lesson: 0 },
      { id: 'v0_4', japanese: '漢字', kana: 'かんじ', romaji: 'kanji', english: 'Kanji characters', bangla: 'কাঞ্জি অক্ষর', partOfSpeech: 'noun', lesson: 0 },
      { id: 'v0_5', japanese: 'はい', kana: 'はい', romaji: 'hai', english: 'yes', bangla: 'হ্যাঁ', partOfSpeech: 'expression', lesson: 0 },
      { id: 'v0_6', japanese: 'いいえ', kana: 'いいえ', romaji: 'iie', english: 'no', bangla: 'না', partOfSpeech: 'expression', lesson: 0 },
      { id: 'v0_7', japanese: '初めまして', kana: 'はじめまして', romaji: 'hajimemashite', english: 'Nice to meet you / How do you do?', bangla: 'আপনার সাথে পরিচিত হয়ে ভালো লাগল', partOfSpeech: 'expression', lesson: 0 },
    ],
    grammarPoints: [
      {
        id: 'g0_1',
        lesson: 0,
        pattern: 'SOV Word Order & Predicates',
        titleEn: 'Word Order: Predicate Always at the End',
        titleBn: 'শব্দক্রম: ক্রিয়া বা প্রেডিকেট সর্বদা বাক্যের শেষে',
        explanationEn: 'In Japanese, the verb or predicate (desu/masu) always sits at the very end of the sentence. Modifiers precede the words they modify.',
        explanationBn: 'জাপানি ভাষায় ক্রিয়া বা প্রেডিকেট সবসময় বাক্যের একদম শেষে বসে (কর্তা + কর্ম + ক্রিয়া)।',
        structure: [
          { label: 'Subject / Topic', type: 'topic' },
          { label: 'Object', type: 'object' },
          { label: 'Predicate (Verb / Desu)', type: 'predicate' },
        ],
        examples: [
          { japanese: 'わたしは 日本語を 勉強します。', kana: 'わたしは にほんごを べんきょうします。', romaji: 'Watashi wa nihongo o benkyou shimasu.', english: 'I study Japanese.', bangla: 'আমি জাপানি ভাষা পড়ি।' }
        ]
      },
      {
        id: 'g0_2',
        lesson: 0,
        pattern: 'Particle (助詞 joshi) System',
        titleEn: 'Grammatical Postpositional Particles',
        titleBn: 'বিভক্তি (পার্টিকল) ব্যবস্থা',
        explanationEn: 'Particles are short grammatical markers attached to words to denote their function (Topic は, Subject が, Object を, Destination へ, Time に). Note: Topic marker は is pronounced "wa".',
        explanationBn: 'জাপানি পার্টিকল শব্দের সাথে যুক্ত হয়ে তাদের ভূমিকা নির্দেশ করে। বিষয় নির্দেশক 「は」 এর উচ্চারণ "wa" হয়।',
        structure: [
          { label: 'Noun', type: 'topic' },
          { label: 'Particle (は wa / を o / に ni)', type: 'particle' },
          { label: 'Predicate', type: 'predicate' }
        ],
        examples: [
          { japanese: 'これは 本です。', kana: 'これは ほんです。', romaji: 'Kore wa hon desu.', english: 'This is a book.', bangla: 'এটি একটি বই।' }
        ]
      }
    ],
    quiz: [
      {
        id: 'q0_1',
        question: 'Where does the main verb or predicate sit in a standard Japanese sentence?',
        type: 'multiple-choice',
        options: ['At the beginning', 'In the middle', 'At the very end', 'Directly before the subject'],
        correctAnswer: 'At the very end',
        explanation: 'Japanese is an SOV language where predicates strictly conclude the sentence.'
      },
      {
        id: 'q0_2',
        question: 'How is the topic particle は pronounced when used in a sentence?',
        type: 'multiple-choice',
        options: ['ha', 'wa', 'ba', 'ya'],
        correctAnswer: 'wa',
        explanation: 'The topic particle is written as は but traditionally pronounced "wa".'
      }
    ]
  },

  // --- Lesson 1 ---
  {
    id: 'lesson_1',
    number: 1,
    dayNumber: 1,
    title: 'Basic Conversation & Introductions',
    titleEn: 'Introductions & Identity (N1 は N2 です)',
    titleBn: 'প্রাথমিক পরিচয় ও কথোপকথন',
    descriptionEn: 'Express identity, nationality, professions, affirmative and negative statements, and ask questions with particle か.',
    descriptionBn: 'নিজের নাম, দেশ, পেশা প্রকাশ, হ্যাঁ-বোধক ও না-বোধক বাক্য গঠন এবং প্রশ্ন করা।',
    estimatedMinutes: 20,
    objectives: [
      'Master the basic equivalence sentence: N1 は N2 です',
      'Use the negative form じゃありません / ではありません',
      'Form questions using the question particle か',
      'Use the "also" particle も and noun modifier の'
    ],
    vocabulary: [
      { id: 'v1_1', japanese: 'わたし', kana: 'わたし', romaji: 'watashi', english: 'I / me', bangla: 'আমি', partOfSpeech: 'pronoun', lesson: 1, isVerifiedTextbook: true },
      { id: 'v1_2', japanese: 'あなた', kana: 'あなた', romaji: 'anata', english: 'you', bangla: 'আপনি / তুমি', partOfSpeech: 'pronoun', lesson: 1, isVerifiedTextbook: true },
      { id: 'v1_3', japanese: 'あの人', kana: 'あのひと', romaji: 'anohito', english: 'that person', bangla: 'ওই ব্যক্তি', partOfSpeech: 'pronoun', lesson: 1, isVerifiedTextbook: true },
      { id: 'v1_4', japanese: '先生', kana: 'せんせい', romaji: 'sensei', english: 'teacher / instructor', bangla: 'শিক্ষক', partOfSpeech: 'noun', lesson: 1, isVerifiedTextbook: true },
      { id: 'v1_5', japanese: '学生', kana: 'がくせい', romaji: 'gakusei', english: 'student', bangla: 'ছাত্র / শিক্ষার্থী', partOfSpeech: 'noun', lesson: 1, isVerifiedTextbook: true },
      { id: 'v1_6', japanese: '会社員', kana: 'かいしゃいん', romaji: 'kaishain', english: 'company employee', bangla: 'কোম্পানি চাকুরিজীবী', partOfSpeech: 'noun', lesson: 1, isVerifiedTextbook: true },
      { id: 'v1_7', japanese: '銀行員', kana: 'ぎんこういん', romaji: 'ginkouin', english: 'bank employee', bangla: 'ব্যাংক কর্মকর্তা', partOfSpeech: 'noun', lesson: 1, isVerifiedTextbook: true },
      { id: 'v1_8', japanese: '医者', kana: 'いしゃ', romaji: 'isha', english: 'medical doctor', bangla: 'ডাক্তার / চিকিৎসক', partOfSpeech: 'noun', lesson: 1, isVerifiedTextbook: true },
      { id: 'v1_9', japanese: '研究者', kana: 'けんきゅうしゃ', romaji: 'kenkyuusha', english: 'researcher / scholar', bangla: 'গবেষক', partOfSpeech: 'noun', lesson: 1, isVerifiedTextbook: true },
      { id: 'v1_10', japanese: '大学', kana: 'だいがく', romaji: 'daigaku', english: 'university', bangla: 'বিশ্ববিদ্যালয়', partOfSpeech: 'noun', lesson: 1, isVerifiedTextbook: true },
      { id: 'v1_11', japanese: '病院', kana: 'びょういん', romaji: 'byouin', english: 'hospital', bangla: 'হাসপাতাল', partOfSpeech: 'noun', lesson: 1, isVerifiedTextbook: true },
      { id: 'v1_12', japanese: 'だれ', kana: 'だれ', romaji: 'dare', english: 'who', bangla: 'কে', partOfSpeech: 'pronoun', lesson: 1, isVerifiedTextbook: true },
      { id: 'v1_13', japanese: '何歳', kana: 'なんさい', romaji: 'nansai', english: 'how old', bangla: 'কত বয়স', partOfSpeech: 'pronoun', lesson: 1, isVerifiedTextbook: true },
      { id: 'v1_14', japanese: '日本', kana: 'にほん', romaji: 'nihon', english: 'Japan', bangla: 'জাপান', partOfSpeech: 'noun', lesson: 1, isVerifiedTextbook: true },
      { id: 'v1_15', japanese: '～さん', kana: '～さん', romaji: '~san', english: 'Mr. / Ms. (polite honorific)', bangla: 'জনাব / বেগম (সম্মানসূচক)', partOfSpeech: 'prefix-suffix', lesson: 1, isVerifiedTextbook: true },
      { id: 'v1_16', japanese: '～人', kana: '～じん', romaji: '~jin', english: 'nationality suffix (e.g. Japanese)', bangla: 'জাতীয়তা প্রত্যয়', partOfSpeech: 'prefix-suffix', lesson: 1, isVerifiedTextbook: true },
      { id: 'v1_17', japanese: 'アメリカ', kana: 'アメリカ', romaji: 'amerika', english: 'U.S.A.', bangla: 'যুক্তরাষ্ট্র', partOfSpeech: 'noun', lesson: 1, isVerifiedTextbook: true },
    ],
    grammarPoints: [
      {
        id: 'g1_1',
        lesson: 1,
        pattern: 'N1 は N2 です',
        titleEn: 'N1 is N2 (Topic marker は and copula です)',
        titleBn: 'N1 হলো N2 (বিষয় নির্দেশক は এবং です)',
        explanationEn: 'The particle は indicates that N1 is the topic of the sentence. です functions as the polite affirmative copula ("is / am / are").',
        explanationBn: 'は পার্টিকল N1 কে বাক্যের মূল বিষয় হিসেবে স্থাপন করে এবং です হলো ভদ্র রূপ ("হয়")।',
        structure: [
          { label: 'Topic (N1)', type: 'topic' },
          { label: 'は (wa)', type: 'particle' },
          { label: 'Predicate (N2)', type: 'predicate' },
          { label: 'です (desu)', type: 'predicate' },
        ],
        examples: [
          {
            japanese: 'わたしは ミラーです。',
            kana: 'わたしは みらーです。',
            romaji: 'Watashi wa Miraa desu.',
            english: 'I am Mr. Miller.',
            bangla: 'আমি মিলার।',
            breakdown: [
              { word: 'わたし', role: 'Topic' },
              { word: 'は', role: 'Topic Particle (pronounced wa)', particle: true },
              { word: 'ミラー', role: 'Name / Predicate' },
              { word: 'です', role: 'Copula (is/am)' }
            ]
          },
          {
            japanese: 'ワンさんは 医者です。',
            kana: 'わんさんは いしゃです。',
            romaji: 'Wan-san wa isha desu.',
            english: 'Mr. Wang is a doctor.',
            bangla: 'মিঃ ওয়াং একজন ডাক্তার।'
          }
        ]
      },
      {
        id: 'g1_2',
        lesson: 1,
        pattern: 'N1 は N2 じゃありません',
        titleEn: 'N1 is NOT N2 (Negative copula)',
        titleBn: 'N1, N2 নয় (না-বোধক রূপ)',
        explanationEn: 'じゃありません is the everyday negative form of です. The more formal written equivalent is ではありません.',
        explanationBn: 'じゃありません হলো です এর না-বোধক রূপ। আনুষ্ঠানিক রূপ হলো ではありません।',
        structure: [
          { label: 'Topic (N1)', type: 'topic' },
          { label: 'は (wa)', type: 'particle' },
          { label: 'Predicate (N2)', type: 'predicate' },
          { label: 'じゃありません', type: 'predicate' }
        ],
        examples: [
          {
            japanese: 'サントスさんは 学生じゃありません。',
            kana: 'さんとすさんは がくせいじゃありません。',
            romaji: 'Santosu-san wa gakusei ja arimasen.',
            english: 'Mr. Santos is not a student.',
            bangla: 'মিঃ সান্তোস কোনো ছাত্র নন।'
          }
        ]
      },
      {
        id: 'g1_3',
        lesson: 1,
        pattern: 'Sentence + か',
        titleEn: 'Question Marker Particle か',
        titleBn: 'প্রশ্নবোধক পার্টিকল か',
        explanationEn: 'Adding か to the end of a sentence turns it into a question with rising intonation. No question mark is needed in formal Japanese.',
        explanationBn: 'বাক্যের শেষে か যুক্ত করলে বাক্যটি প্রশ্নে পরিণত হয়।',
        structure: [
          { label: 'Statement', type: 'topic' },
          { label: 'か (ka)', type: 'particle' }
        ],
        examples: [
          {
            japanese: 'ミラーさんは アメリカ人ですか。',
            kana: 'みらーさんは あめりかじんですか。',
            romaji: 'Miraa-san wa amerika-jin desu ka.',
            english: 'Is Mr. Miller an American?',
            bangla: 'মিলার সাহেব কি আমেরিকান?'
          }
        ]
      },
      {
        id: 'g1_4',
        lesson: 1,
        pattern: 'N も / N1 の N2',
        titleEn: 'Also (も) & Belonging/Category (の)',
        titleBn: '"ও" বিভক্তি (も) এবং সম্বন্ধ পদ (の)',
        explanationEn: 'も replaces は when the same predicate applies to a new topic ("also"). の connects two nouns where N1 modifies or possesses N2.',
        explanationBn: 'একই তথ্য অন্য কারও ক্ষেত্রে প্রযোজ্য হলে は এর বদলে も বসে। の দুটি বিশেষ্যকে যুক্ত করে সম্বন্ধ বোঝায়।',
        structure: [
          { label: 'N1 (Organization)', type: 'topic' },
          { label: 'の (no)', type: 'particle' },
          { label: 'N2 (Role/Person)', type: 'predicate' }
        ],
        examples: [
          {
            japanese: 'グプタさんも 会社員です。',
            kana: 'ぐぷたさんも かいしゃいんです。',
            romaji: 'Guputa-san mo kaishain desu.',
            english: 'Mr. Gupta is also a company employee.',
            bangla: 'গুপ্ত সাহেবও একজন কোম্পানি কর্মকর্তা।'
          },
          {
            japanese: 'ミラーさんは IMCの 社員です。',
            kana: 'みらーさんは あいえむしーの しゃいんです。',
            romaji: 'Miraa-san wa IMC no shain desu.',
            english: 'Mr. Miller is an employee of IMC.',
            bangla: 'মিলার সাহেব আইএমসি এর একজন কর্মী।'
          }
        ]
      }
    ],
    quiz: [
      {
        id: 'q1_1',
        question: 'Choose the correct particle: わたし（　）がくせいです。',
        type: 'multiple-choice',
        options: ['は', 'も', 'の', 'か'],
        correctAnswer: 'は',
        explanation: 'The topic particle は is used to mark わたし as the sentence topic.'
      },
      {
        id: 'q1_2',
        question: 'How do you say "Mr. Miller is not a doctor"?',
        type: 'multiple-choice',
        options: [
          'ミラーさんは 医者です',
          'ミラーさんは 医者じゃありません',
          'ミラーさんも 医者です',
          'ミラーさんは 医者ですか'
        ],
        correctAnswer: 'ミラーさんは 医者じゃありません',
        explanation: 'じゃありません is the negative form of です.'
      },
      {
        id: 'q1_3',
        question: 'Translate: "He is also an employee" -> かれ（　）かいしゃいんです。',
        type: 'multiple-choice',
        options: ['も', 'は', 'の', 'を'],
        correctAnswer: 'も',
        explanation: 'Particle も means "also / too".'
      }
    ]
  },

  // --- Lesson 2 ---
  {
    id: 'lesson_2',
    number: 2,
    dayNumber: 2,
    title: 'Demonstratives (これ, それ, あれ)',
    titleEn: 'Things & Possessions (これ, このN, の)',
    titleBn: 'বস্তু ও অধিকার নির্দেশক শব্দ',
    descriptionEn: 'Learn pronouns (kore, sore, are), noun modifiers (kono, sono, ano), alternative questions, and polite prefixes.',
    descriptionBn: 'নিকটবর্তী ও দূরবর্তী বস্তু নির্দেশ (এটা, ওটা, সেটা) এবং মালিকানা প্রকাশ।',
    estimatedMinutes: 20,
    objectives: [
      'Differentiate between これ (near speaker), それ (near listener), and あれ (far from both)',
      'Use demonstrative adjectives: この, その, あの + Noun',
      'Use particle の to signify possession and category',
      'Ask alternative questions with ～か、～か'
    ],
    vocabulary: [
      { id: 'v2_1', japanese: 'これ', kana: 'これ', romaji: 'kore', english: 'this (near speaker)', bangla: 'এটি / এইটা', partOfSpeech: 'pronoun', lesson: 2, isVerifiedTextbook: true },
      { id: 'v2_2', japanese: 'それ', kana: 'それ', romaji: 'sore', english: 'that (near listener)', bangla: 'ওটি / ওইটা', partOfSpeech: 'pronoun', lesson: 2, isVerifiedTextbook: true },
      { id: 'v2_3', japanese: 'あれ', kana: 'あれ', romaji: 'are', english: 'that (far from both)', bangla: 'সেইটি / সেইটা', partOfSpeech: 'pronoun', lesson: 2, isVerifiedTextbook: true },
      { id: 'v2_4', japanese: '本', kana: 'ほん', romaji: 'hon', english: 'book', bangla: 'বই', partOfSpeech: 'noun', lesson: 2, isVerifiedTextbook: true },
      { id: 'v2_5', japanese: '辞書', kana: 'じしょ', romaji: 'jisho', english: 'dictionary', bangla: 'অভিধান', partOfSpeech: 'noun', lesson: 2, isVerifiedTextbook: true },
      { id: 'v2_6', japanese: '雑誌', kana: 'ざっし', romaji: 'zasshi', english: 'magazine', bangla: 'ম্যাগাজিন / সাময়িকী', partOfSpeech: 'noun', lesson: 2, isVerifiedTextbook: true },
      { id: 'v2_7', japanese: '新聞', kana: 'しんぶん', romaji: 'shinbun', english: 'newspaper', bangla: 'সংবাদপত্র', partOfSpeech: 'noun', lesson: 2, isVerifiedTextbook: true },
      { id: 'v2_8', japanese: '鍵', kana: 'かぎ', romaji: 'kagi', english: 'key', bangla: 'চাবি', partOfSpeech: 'noun', lesson: 2, isVerifiedTextbook: true },
      { id: 'v2_9', japanese: '時計', kana: 'とけい', romaji: 'tokei', english: 'watch / clock', bangla: 'ঘড়ি', partOfSpeech: 'noun', lesson: 2, isVerifiedTextbook: true },
      { id: 'v2_10', japanese: '傘', kana: 'かさ', romaji: 'kasa', english: 'umbrella', bangla: 'ছাতা', partOfSpeech: 'noun', lesson: 2, isVerifiedTextbook: true },
      { id: 'v2_11', japanese: '鞄', kana: 'かばん', romaji: 'kaban', english: 'bag / briefcase', bangla: 'ব্যাগ', partOfSpeech: 'noun', lesson: 2, isVerifiedTextbook: true },
      { id: 'v2_12', japanese: '机', kana: 'つくえ', romaji: 'tsukue', english: 'desk', bangla: 'ডেস্ক / টেবিল', partOfSpeech: 'noun', lesson: 2, isVerifiedTextbook: true },
      { id: 'v2_13', japanese: 'いす', kana: 'いす', romaji: 'isu', english: 'chair', bangla: 'চেয়ার', partOfSpeech: 'noun', lesson: 2, isVerifiedTextbook: true },
      { id: 'v2_14', japanese: '車', kana: 'くるま', romaji: 'kuruma', english: 'car', bangla: 'গাড়ি', partOfSpeech: 'noun', lesson: 2, isVerifiedTextbook: true },
      { id: 'v2_15', japanese: '何', kana: 'なん / なに', romaji: 'nan / nani', english: 'what', bangla: 'কী', partOfSpeech: 'pronoun', lesson: 2, isVerifiedTextbook: true },
    ],
    grammarPoints: [
      {
        id: 'g2_1',
        lesson: 2,
        pattern: 'これ / それ / あれ',
        titleEn: 'Demonstrative Pronouns (Ko-So-A-Do)',
        titleBn: 'বস্তুবাচক সর্বনাম (কো-সো-আ-দো ধারা)',
        explanationEn: 'これ refers to something near the speaker. それ refers to something near the listener. あれ refers to something far from both.',
        explanationBn: 'বক্তার কাছের জিনিস これ, শ্রোতার কাছের জিনিস それ, আর উভয়ের থেকে দূরে থাকা জিনিস あれ।',
        structure: [
          { label: 'Demonstrative (これ/それ/あれ)', type: 'topic' },
          { label: 'は', type: 'particle' },
          { label: 'Noun', type: 'predicate' },
          { label: 'です', type: 'predicate' },
        ],
        examples: [
          { japanese: 'これは 辞書です。', kana: 'これは じしょです。', romaji: 'Kore wa jisho desu.', english: 'This is a dictionary.', bangla: 'এটি একটি অভিধান।' },
          { japanese: 'それは 何ですか。', kana: 'それは なんですか。', romaji: 'Sore wa nan desu ka.', english: 'What is that (near you)?', bangla: 'ওটা কী?' }
        ]
      },
      {
        id: 'g2_2',
        lesson: 2,
        pattern: 'この N / その N / あの N',
        titleEn: 'Demonstrative Adjectives + Noun',
        titleBn: 'নামবাচক নির্দেশক বিশেষ্য (এই বই, ওই চাবি)',
        explanationEn: 'Unlike これ, この cannot stand alone; it MUST modify a noun directly (e.g. この本 = this book).',
        explanationBn: 'この, その, あの সরাসরি কোনো বিশেষ্য (Noun) এর আগে বসে (যেমন: この本 = এই বইটি)। একা বসতে পারে না।',
        structure: [
          { label: 'この / その / あの', type: 'topic' },
          { label: 'Noun', type: 'topic' },
          { label: 'は', type: 'particle' },
          { label: 'Predicate', type: 'predicate' }
        ],
        examples: [
          { japanese: 'この本は わたしのです。', kana: 'このほんは わたしのです。', romaji: 'Kono hon wa watashi no desu.', english: 'This book is mine.', bangla: 'এই বইটি আমার।' }
        ]
      }
    ],
    quiz: [
      {
        id: 'q2_1',
        question: 'Which word should be used for an object far away from both the speaker and listener?',
        type: 'multiple-choice',
        options: ['これ', 'それ', 'あれ', 'どれ'],
        correctAnswer: 'あれ',
        explanation: 'あれ is used for objects at a distance from both conversational participants.'
      },
      {
        id: 'q2_2',
        question: 'Fill in the blank: （　）本は わたしのです。',
        type: 'multiple-choice',
        options: ['この', 'これ', 'ここ', 'こちら'],
        correctAnswer: 'この',
        explanation: 'Before a noun (本), we must use the modifier この, not the pronoun これ.'
      }
    ]
  },

  // --- Lesson 3 ---
  {
    id: 'lesson_3',
    number: 3,
    dayNumber: 3,
    title: 'Places and Locations',
    titleEn: 'Locations & Directions (ここ, そこ, あそこ, どこ)',
    titleBn: 'স্থান, দিক ও অবস্থান নির্দেশ',
    descriptionEn: 'Learn place demonstratives (koko, soko, asoko), polite equivalents (kochira), asking where (doko/dochira), and department stores/prices.',
    descriptionBn: 'স্থান নির্দেশ (এখানে, সেখানে, ওইখানে, কোথায়), কেনাকাটা ও দিক নির্দেশক বিনয়ী শব্দ।',
    estimatedMinutes: 20,
    objectives: [
      'Use place demonstratives ここ, そこ, あそこ',
      'Use polite directional terms こちら, そちら, あちら, どちら',
      'Ask where something is located with どこ / どちら',
      'Describe origin of manufactured goods using の'
    ],
    vocabulary: [
      { id: 'v3_1', japanese: 'ここ', kana: 'ここ', romaji: 'koko', english: 'here / this place', bangla: 'এখানে', partOfSpeech: 'pronoun', lesson: 3, isVerifiedTextbook: true },
      { id: 'v3_2', japanese: 'そこ', kana: 'そこ', romaji: 'soko', english: 'there (near listener)', bangla: 'সেখানে', partOfSpeech: 'pronoun', lesson: 3, isVerifiedTextbook: true },
      { id: 'v3_3', japanese: 'あそこ', kana: 'あそこ', romaji: 'asoko', english: 'over there', bangla: 'ওইখানে (উভয়ের দূরে)', partOfSpeech: 'pronoun', lesson: 3, isVerifiedTextbook: true },
      { id: 'v3_4', japanese: 'どこ', kana: 'どこ', romaji: 'doko', english: 'where', bangla: 'কোথায়', partOfSpeech: 'pronoun', lesson: 3, isVerifiedTextbook: true },
      { id: 'v3_5', japanese: '教室', kana: 'きょうしつ', romaji: 'kyoushitsu', english: 'classroom', bangla: 'শ্রেণিকক্ষ', partOfSpeech: 'noun', lesson: 3, isVerifiedTextbook: true },
      { id: 'v3_6', japanese: '食堂', kana: 'しょくどう', romaji: 'shokudou', english: 'dining hall / canteen', bangla: 'ক্যান্টিন / খাবার ঘর', partOfSpeech: 'noun', lesson: 3, isVerifiedTextbook: true },
      { id: 'v3_7', japanese: '事務所', kana: 'じむしょ', romaji: 'jimusho', english: 'office', bangla: 'অফিস / কার্যালয়', partOfSpeech: 'noun', lesson: 3, isVerifiedTextbook: true },
      { id: 'v3_8', japanese: '部屋', kana: 'へや', romaji: 'heya', english: 'room', bangla: 'কক্ষ / ঘর', partOfSpeech: 'noun', lesson: 3, isVerifiedTextbook: true },
      { id: 'v3_9', japanese: 'トイレ', kana: 'といれ', romaji: 'toire', english: 'restroom / toilet', bangla: 'শৌচাগার / টয়লেট', partOfSpeech: 'noun', lesson: 3, isVerifiedTextbook: true },
      { id: 'v3_10', japanese: 'エレベーター', kana: 'えれべーたー', romaji: 'erebeetaa', english: 'elevator', bangla: 'লিফট', partOfSpeech: 'noun', lesson: 3, isVerifiedTextbook: true },
      { id: 'v3_11', japanese: '会社', kana: 'かいしゃ', romaji: 'kaisha', english: 'company', bangla: 'কোম্পানি', partOfSpeech: 'noun', lesson: 3, isVerifiedTextbook: true },
      { id: 'v3_12', japanese: 'いくら', kana: 'いくら', romaji: 'ikura', english: 'how much (price)', bangla: 'কত দাম', partOfSpeech: 'pronoun', lesson: 3, isVerifiedTextbook: true },
    ],
    grammarPoints: [
      {
        id: 'g3_1',
        lesson: 3,
        pattern: 'N は Place です',
        titleEn: 'Stating Location of Persons, Things, or Places',
        titleBn: 'ব্যক্তি বা বস্তুর অবস্থান নির্দেশ',
        explanationEn: 'This pattern indicates where a person, place, or object is located.',
        explanationBn: 'কোনো ব্যক্তি, বস্তু বা স্থান কোথায় অবস্থিত তা প্রকাশ করে।',
        structure: [
          { label: 'Subject (N)', type: 'topic' },
          { label: 'は', type: 'particle' },
          { label: 'Place', type: 'location' },
          { label: 'です', type: 'predicate' }
        ],
        examples: [
          { japanese: 'お手洗いは あそこです。', kana: 'おてあらいは あそこです。', romaji: 'Otearai wa asoko desu.', english: 'The restroom is over there.', bangla: 'শৌচাগারটি ওইদিকে।' },
          { japanese: '事務所は どこですか。', kana: 'じむしょは どこですか。', romaji: 'Jimusho wa doko desu ka.', english: 'Where is the office?', bangla: 'অফিসটি কোথায়?' }
        ]
      }
    ],
    quiz: [
      {
        id: 'q3_1',
        question: 'Which word politely means "which direction / where"?',
        type: 'multiple-choice',
        options: ['どちら', 'どこ', 'ここ', 'だれ'],
        correctAnswer: 'どちら',
        explanation: 'どちら is the polite equivalent of どこ.'
      }
    ]
  },

  // --- Lesson 4 ---
  {
    id: 'lesson_4',
    number: 4,
    dayNumber: 4,
    title: 'Time, Verbs, and Schedules',
    titleEn: 'Telling Time & Daily Routines (Vます / Vません)',
    titleBn: 'সময়, ক্রিয়াপদ ও দৈনন্দিন রুটিন',
    descriptionEn: 'Learn to tell hours and minutes, conjugating non-past/past verbs (masu/masen/mashita/masendeshita), time particle ni, and kara/made.',
    descriptionBn: 'সময় বলা, বর্তমান ও অতীতকালের ক্রিয়ার রূপ এবং শুরু ও শেষ সময় (থেকে/পর্যন্ত) প্রকাশ।',
    estimatedMinutes: 25,
    objectives: [
      'Tell time accurately in hours and minutes',
      'Conjugate verbs into masu, masen, mashita, and masen deshita',
      'Use particle に for specific clock times',
      'Use から (from) and まで (until) to describe schedules'
    ],
    vocabulary: [
      { id: 'v4_1', japanese: '起きます', kana: 'おきます', romaji: 'okimasu', english: 'wake up / get up', bangla: 'ঘুম থেকে ওঠা', partOfSpeech: 'verb-ii', lesson: 4, isVerifiedTextbook: true },
      { id: 'v4_2', japanese: '寝ます', kana: 'ねます', romaji: 'nemasu', english: 'sleep / go to bed', bangla: 'ঘুমানো', partOfSpeech: 'verb-ii', lesson: 4, isVerifiedTextbook: true },
      { id: 'v4_3', japanese: '働きます', kana: 'はたらきます', romaji: 'hatarakimasu', english: 'work', bangla: 'কাজ করা', partOfSpeech: 'verb-i', lesson: 4, isVerifiedTextbook: true },
      { id: 'v4_4', japanese: '勉強します', kana: 'べんきょうします', romaji: 'benkyoushimasu', english: 'study', bangla: 'পড়াশোনা করা', partOfSpeech: 'verb-iii', lesson: 4, isVerifiedTextbook: true },
      { id: 'v4_5', japanese: '終わります', kana: 'おわります', romaji: 'owarimasu', english: 'finish / end', bangla: 'শেষ হওয়া', partOfSpeech: 'verb-i', lesson: 4, isVerifiedTextbook: true },
      { id: 'v4_6', japanese: '今', kana: 'いま', romaji: 'ima', english: 'now', bangla: 'এখন', partOfSpeech: 'noun', lesson: 4, isVerifiedTextbook: true },
      { id: 'v4_7', japanese: '～時', kana: '～じ', romaji: '~ji', english: "o'clock", bangla: 'টা (ঘড়ির ঘণ্টা)', partOfSpeech: 'counter', lesson: 4, isVerifiedTextbook: true },
      { id: 'v4_8', japanese: '～分', kana: '～ふん / ～ぷん', romaji: '~fun / ~pun', english: 'minute', bangla: 'মিনিট', partOfSpeech: 'counter', lesson: 4, isVerifiedTextbook: true },
      { id: 'v4_9', japanese: '半', kana: 'はん', romaji: 'han', english: 'half past', bangla: 'সাড়ে / অর্ধেক', partOfSpeech: 'noun', lesson: 4, isVerifiedTextbook: true },
      { id: 'v4_10', japanese: '朝', kana: 'あさ', romaji: 'asa', english: 'morning', bangla: 'সকাল', partOfSpeech: 'noun', lesson: 4, isVerifiedTextbook: true },
      { id: 'v4_11', japanese: '昼', kana: 'ひる', romaji: 'hiru', english: 'daytime / noon', bangla: 'দুপুর', partOfSpeech: 'noun', lesson: 4, isVerifiedTextbook: true },
      { id: 'v4_12', japanese: '晩 / 夜', kana: 'ばん / よる', romaji: 'ban / yoru', english: 'night / evening', bangla: 'রাত', partOfSpeech: 'noun', lesson: 4, isVerifiedTextbook: true },
      { id: 'v4_13', japanese: '昨日', kana: 'きのう', romaji: 'kinou', english: 'yesterday', bangla: 'গতকাল', partOfSpeech: 'noun', lesson: 4, isVerifiedTextbook: true },
      { id: 'v4_14', japanese: '今日', kana: 'きょう', romaji: 'kyou', english: 'today', bangla: 'আজ', partOfSpeech: 'noun', lesson: 4, isVerifiedTextbook: true },
      { id: 'v4_15', japanese: '明日', kana: 'あした', romaji: 'ashita', english: 'tomorrow', bangla: 'আগামীকাল', partOfSpeech: 'noun', lesson: 4, isVerifiedTextbook: true },
    ],
    grammarPoints: [
      {
        id: 'g4_1',
        lesson: 4,
        pattern: 'Vます / Vません / Vました / Vませんでした',
        titleEn: 'Four Basic Verb Inflections (Tense & Polarity)',
        titleBn: 'ক্রিয়াপদের চারটি মৌলিক ভদ্র রূপ',
        explanationEn: 'Polite verbs inflect for non-past (present/future) and past, affirmative and negative.',
        explanationBn: 'জাপানি ক্রিয়া বর্তমান/ভবিষ্যৎ ও অতীতকালের জন্য ৪টি ভদ্র রূপে পরিবর্তিত হয়।',
        structure: [
          { label: 'Non-past Affirmative', type: 'verb' },
          { label: 'Non-past Negative', type: 'verb' },
          { label: 'Past Affirmative', type: 'verb' },
          { label: 'Past Negative', type: 'verb' }
        ],
        examples: [
          { japanese: '毎朝 ６時に 起きます。', kana: 'まいあさ ろくじに おきます。', romaji: 'Maiasa roku-ji ni okimasu.', english: 'I wake up at 6 every morning.', bangla: 'আমি প্রতিদিন সকাল ৬টায় উঠি।' },
          { japanese: '昨日は 勉強しませんでした。', kana: 'きのうは べんきょうしませんでした。', romaji: 'Kinou wa benkyou shimasendeshita.', english: 'I did not study yesterday.', bangla: 'আমি গতকাল পড়িনি।' }
        ]
      },
      {
        id: 'g4_2',
        lesson: 4,
        pattern: 'N1 から N2 まで',
        titleEn: 'From N1 until N2 (Time or Place)',
        titleBn: 'শুরু থেকে শেষ সময় বা স্থান',
        explanationEn: 'から marks the starting point; まで marks the limit or ending point.',
        explanationBn: 'から শুরু এবং まで শেষ সীমানা নির্দেশ করে।',
        structure: [
          { label: 'Start Time/Place', type: 'time' },
          { label: 'から', type: 'particle' },
          { label: 'End Time/Place', type: 'time' },
          { label: 'まで', type: 'particle' }
        ],
        examples: [
          { japanese: '銀行は ９時から ３時までです。', kana: 'ぎんこうは くじから さんじまでです。', romaji: 'Ginkou wa ku-ji kara san-ji made desu.', english: 'The bank is open from 9:00 to 3:00.', bangla: 'ব্যাংক সকাল ৯টা থেকে ৩টা পর্যন্ত খোলা।' }
        ]
      }
    ],
    quiz: [
      {
        id: 'q4_1',
        question: 'What is the past negative of 働きます (hatarakimasu)?',
        type: 'multiple-choice',
        options: ['働きません', '働きました', '働きませんでした', '働く'],
        correctAnswer: '働きませんでした',
        explanation: '-masen deshita indicates the polite past negative.'
      }
    ]
  },

  // --- Lesson 5 ---
  {
    id: 'lesson_5',
    number: 5,
    dayNumber: 5,
    title: 'Movement and Transportation',
    titleEn: 'Going, Coming & Returning (へ / で / と)',
    titleBn: 'চলাচল, যাতায়াত ও মাধ্যম',
    descriptionEn: 'Learn destination particle へ (pronounced e), vehicles with particle で, companion particle と, and dates.',
    descriptionBn: 'গন্তব্য (へ), পরিবহনের মাধ্যম (で), সঙ্গী (と) এবং পঞ্জিকার তারিখ প্রকাশ।',
    estimatedMinutes: 25,
    objectives: [
      'Use particle へ (pronounced e) for directional movement',
      'Use vehicle + で for means of transport',
      'Deny movement completely with どこ[へ]も 行きません',
      'Understand calendar dates and irregular day counts (tsuitachi, futsuka...)'
    ],
    vocabulary: [
      { id: 'v5_1', japanese: '行きます', kana: 'いきます', romaji: 'ikimasu', english: 'go', bangla: 'যাওয়া', partOfSpeech: 'verb-i', lesson: 5, isVerifiedTextbook: true },
      { id: 'v5_2', japanese: '来ます', kana: 'きます', romaji: 'kimasu', english: 'come', bangla: 'আসা', partOfSpeech: 'verb-iii', lesson: 5, isVerifiedTextbook: true },
      { id: 'v5_3', japanese: '帰ります', kana: 'かえります', romaji: 'kaerimasu', english: 'return / go home', bangla: 'ফিরে যাওয়া / বাড়ি ফেরা', partOfSpeech: 'verb-i', lesson: 5, isVerifiedTextbook: true },
      { id: 'v5_4', japanese: '駅', kana: 'えき', romaji: 'eki', english: 'station', bangla: 'স্টেশন', partOfSpeech: 'noun', lesson: 5, isVerifiedTextbook: true },
      { id: 'v5_5', japanese: '飛行機', kana: 'ひこうき', romaji: 'hikouki', english: 'airplane', bangla: 'উড়োজাহাজ', partOfSpeech: 'noun', lesson: 5, isVerifiedTextbook: true },
      { id: 'v5_6', japanese: '電車', kana: 'でんしゃ', romaji: 'densha', english: 'train', bangla: 'ট্রেন', partOfSpeech: 'noun', lesson: 5, isVerifiedTextbook: true },
      { id: 'v5_7', japanese: '地下鉄', kana: 'ちかてつ', romaji: 'chikatetsu', english: 'subway', bangla: 'পাতালরেল', partOfSpeech: 'noun', lesson: 5, isVerifiedTextbook: true },
      { id: 'v5_8', japanese: '新幹線', kana: 'しんかんせん', romaji: 'shinkansen', english: 'bullet train', bangla: 'বুলেট ট্রেন', partOfSpeech: 'noun', lesson: 5, isVerifiedTextbook: true },
      { id: 'v5_9', japanese: 'バス', kana: 'ばす', romaji: 'basu', english: 'bus', bangla: 'বাস', partOfSpeech: 'noun', lesson: 5, isVerifiedTextbook: true },
      { id: 'v5_10', japanese: '自転車', kana: 'じてんしゃ', romaji: 'jitensha', english: 'bicycle', bangla: 'সাইকেল', partOfSpeech: 'noun', lesson: 5, isVerifiedTextbook: true },
      { id: 'v5_11', japanese: '歩いて', kana: 'あるいて', romaji: 'aruite', english: 'on foot', bangla: 'পায়ে হেঁটে', partOfSpeech: 'expression', lesson: 5, isVerifiedTextbook: true },
      { id: 'v5_12', japanese: '友達', kana: 'ともだち', romaji: 'tomodachi', english: 'friend', bangla: 'বন্ধু', partOfSpeech: 'noun', lesson: 5, isVerifiedTextbook: true },
      { id: 'v5_13', japanese: '一人で', kana: 'ひとりで', romaji: 'hitoride', english: 'alone / by oneself', bangla: 'একা একা', partOfSpeech: 'adverb', lesson: 5, isVerifiedTextbook: true },
      { id: 'v5_14', japanese: 'いつ', kana: 'いつ', romaji: 'itsu', english: 'when', bangla: 'কখন', partOfSpeech: 'pronoun', lesson: 5, isVerifiedTextbook: true },
    ],
    grammarPoints: [
      {
        id: 'g5_1',
        lesson: 5,
        pattern: 'Place へ 行きます / 来ます / 帰ります',
        titleEn: 'Destination Particle へ (pronounced e)',
        titleBn: 'গন্তব্য নির্দেশক বিভক্তি へ (উচ্চারণ e)',
        explanationEn: 'When movement verbs are used, the destination is marked with へ (pronounced "e", not "he").',
        explanationBn: 'যাওয়া বা আসার গন্তব্য বোঝাতে へ পার্টিকল ব্যবহৃত হয় (উচ্চারণ "e")।',
        structure: [
          { label: 'Destination', type: 'location' },
          { label: 'へ (e)', type: 'particle' },
          { label: 'Movement Verb', type: 'verb' }
        ],
        examples: [
          { japanese: '京都へ 行きます。', kana: 'きょうとへ いきます。', romaji: 'Kyouto e ikimasu.', english: 'I am going to Kyoto.', bangla: 'আমি কিয়োটো যাচ্ছি।' }
        ]
      },
      {
        id: 'g5_2',
        lesson: 5,
        pattern: 'Vehicle で 行きます',
        titleEn: 'Means of Transport with で',
        titleBn: 'যানবাহনের মাধ্যম নির্দেশক で',
        explanationEn: 'The particle で denotes the method of transport (train, bus, bike). Note: 歩いて (on foot) does not take で.',
        explanationBn: 'পরিবহনের মাধ্যম বোঝাতে で বসে। তবে পায়ে হেঁটে (歩いて) বললে で বসবে না।',
        structure: [
          { label: 'Vehicle', type: 'object' },
          { label: 'で', type: 'particle' },
          { label: 'Movement Verb', type: 'verb' }
        ],
        examples: [
          { japanese: '電車で 行きます。', kana: 'でんしゃで いきます。', romaji: 'Densha de ikimasu.', english: 'I go by train.', bangla: 'আমি ট্রেনে যাব।' }
        ]
      }
    ],
    quiz: [
      {
        id: 'q5_1',
        question: 'Which particle marks the destination: とうきょう（　）いきます。',
        type: 'multiple-choice',
        options: ['へ', 'で', 'を', 'が'],
        correctAnswer: 'へ',
        explanation: 'Particle へ indicates directional movement toward a destination.'
      }
    ]
  },

  // --- Lessons 6 to 25 (Comprehensive Curriculum) ---
  {
    id: 'lesson_6',
    number: 6,
    dayNumber: 6,
    title: 'Direct Objects and Invitations',
    titleEn: 'Transitive Actions & Invitations (を, で, ませんか, ましょう)',
    titleBn: 'কর্ম কারক ও বন্ধুত্বপূর্ণ প্রস্তাব',
    descriptionEn: 'Learn direct object marker を (pronounced o), action location で, invitations with ませんか, and volitional ましょう.',
    descriptionBn: 'কর্ম বিভক্তি を, কাজের স্থান で এবং কাউকে আমন্ত্রণ জানানোর উপায়।',
    estimatedMinutes: 25,
    objectives: [
      'Mark the direct object of a transitive verb using を',
      'Mark the location where an action takes place using で',
      'Politely invite someone using Vませんか',
      'Make positive suggestions using Vましょう ("Let\'s do...")'
    ],
    vocabulary: [
      { id: 'v6_1', japanese: '食べます', kana: 'たべます', romaji: 'tabemasu', english: 'eat', bangla: 'খাওয়া', partOfSpeech: 'verb-ii', lesson: 6, isVerifiedTextbook: true },
      { id: 'v6_2', japanese: '飲みます', kana: 'のみます', romaji: 'nomimasu', english: 'drink', bangla: 'পান করা', partOfSpeech: 'verb-i', lesson: 6, isVerifiedTextbook: true },
      { id: 'v6_3', japanese: '見ます', kana: 'みます', romaji: 'mimasu', english: 'see / watch', bangla: 'দেখা', partOfSpeech: 'verb-ii', lesson: 6, isVerifiedTextbook: true },
      { id: 'v6_4', japanese: '聞きます', kana: 'ききます', romaji: 'kikimasu', english: 'hear / listen', bangla: 'শোনা', partOfSpeech: 'verb-i', lesson: 6, isVerifiedTextbook: true },
      { id: 'v6_5', japanese: '読みます', kana: 'よみます', romaji: 'yomimasu', english: 'read', bangla: 'পড়া', partOfSpeech: 'verb-i', lesson: 6, isVerifiedTextbook: true },
      { id: 'v6_6', japanese: '買います', kana: 'かいます', romaji: 'kaimasu', english: 'buy', bangla: 'কেনা', partOfSpeech: 'verb-i', lesson: 6, isVerifiedTextbook: true },
      { id: 'v6_7', japanese: 'パン', kana: 'ぱん', romaji: 'pan', english: 'bread', bangla: 'পাউরুটি', partOfSpeech: 'noun', lesson: 6, isVerifiedTextbook: true },
      { id: 'v6_8', japanese: '水', kana: 'みず', romaji: 'mizu', english: 'water', bangla: 'পানি', partOfSpeech: 'noun', lesson: 6, isVerifiedTextbook: true },
      { id: 'v6_9', japanese: 'お茶', kana: 'おちゃ', romaji: 'ocha', english: 'tea / green tea', bangla: 'চা', partOfSpeech: 'noun', lesson: 6, isVerifiedTextbook: true },
      { id: 'v6_10', japanese: '魚', kana: 'さかな', romaji: 'sakana', english: 'fish', bangla: 'মাছ', partOfSpeech: 'noun', lesson: 6, isVerifiedTextbook: true },
    ],
    grammarPoints: [
      {
        id: 'g6_1',
        lesson: 6,
        pattern: 'N を V (transitive)',
        titleEn: 'Direct Object Particle を (pronounced o)',
        titleBn: 'কর্ম কারক বিভক্তি を (উচ্চারণ o)',
        explanationEn: 'The direct object of an action is marked with particle を.',
        explanationBn: 'সরাসরি কর্ম (যাকে উদ্দেশ্য করে কাজ করা হয়) を পার্টিকল দিয়ে চিহ্নিত হয়।',
        structure: [
          { label: 'Object (N)', type: 'object' },
          { label: 'を (o)', type: 'particle' },
          { label: 'Transitive Verb', type: 'verb' }
        ],
        examples: [
          { japanese: 'パンを 食べます。', kana: 'ぱんを たべます。', romaji: 'Pan o tabemasu.', english: 'I eat bread.', bangla: 'আমি পাউরুটি খাই।' }
        ]
      },
      {
        id: 'g6_2',
        lesson: 6,
        pattern: 'Vませんか / Vましょう',
        titleEn: 'Invitations & Joint Suggestions',
        titleBn: 'আমন্ত্রণ ও যৌথ সম্মতি',
        explanationEn: 'Vませんか asks if the listener would like to do something with you. Vましょう enthusiastically agrees or suggests doing it together.',
        explanationBn: 'Vませんか কাউকে ভদ্রভাবে আমন্ত্রণ জানায় ("করবেন কি?"), আর Vましょう বলে "চলুন একসাথে করি"।',
        structure: [
          { label: 'Verb Stem', type: 'verb' },
          { label: 'ませんか (Shall we?) / ましょう (Let\'s)', type: 'predicate' }
        ],
        examples: [
          { japanese: 'いっしょに お茶を 飲みませんか。', kana: 'いっしょに おちゃを のみませんか。', romaji: 'Isshoni ocha o nomimasen ka.', english: 'Would you like to drink tea together?', bangla: 'একসাথে চা পান করবেন কি?' },
          { japanese: 'ええ、飲みましょう。', kana: 'ええ、のみましょう。', romaji: 'Ee, nomimashou.', english: 'Yes, let\'s drink.', bangla: 'হ্যাঁ, চলুন পান করি।' }
        ]
      }
    ],
    quiz: [
      {
        id: 'q6_1',
        question: 'Which particle marks the direct object: みず（　）のみます。',
        type: 'multiple-choice',
        options: ['を', 'に', 'で', 'は'],
        correctAnswer: 'を',
        explanation: 'Particle を marks the direct object of a transitive verb.'
      }
    ]
  },

  {
    id: 'lesson_7',
    number: 7,
    dayNumber: 7,
    title: 'Tools, Languages, Giving and Receiving',
    titleEn: 'Tools, Instruments, Giving (あげます) & Receiving (もらいます)',
    titleBn: 'উপকরণ, ভাষা, দেওয়া ও নেওয়া',
    descriptionEn: 'Express tools/means with で, ask how to say things in other languages, and master object giving and receiving.',
    descriptionBn: 'কাজের উপায়/উপকরণ (で), অন্য ভাষায় শব্দ বলা এবং উপহার আদান-প্রদান।',
    estimatedMinutes: 25,
    objectives: [
      'Express tools, means, or language with で',
      'Give things to others: Person に N を あげます',
      'Receive things: Person に/から N を もらいます',
      'Use もう Vました ("Already done")'
    ],
    vocabulary: [
      { id: 'v7_1', japanese: '切ります', kana: 'きります', romaji: 'kirimasu', english: 'cut / slice', bangla: 'কাটা', partOfSpeech: 'verb-i', lesson: 7, isVerifiedTextbook: true },
      { id: 'v7_2', japanese: 'あげます', kana: 'あげます', romaji: 'agemasu', english: 'give', bangla: 'দেওয়া', partOfSpeech: 'verb-ii', lesson: 7, isVerifiedTextbook: true },
      { id: 'v7_3', japanese: 'もらいます', kana: 'もらいます', romaji: 'moraimasu', english: 'receive', bangla: 'গ্রহন করা / পাওয়া', partOfSpeech: 'verb-i', lesson: 7, isVerifiedTextbook: true },
      { id: 'v7_4', japanese: '箸', kana: 'はし', romaji: 'hashi', english: 'chopsticks', bangla: 'চপস্টিক', partOfSpeech: 'noun', lesson: 7, isVerifiedTextbook: true },
      { id: 'v7_5', japanese: '手', kana: 'て', romaji: 'te', english: 'hand', bangla: 'হাত', partOfSpeech: 'noun', lesson: 7, isVerifiedTextbook: true },
      { id: 'v7_6', japanese: 'プレゼント', kana: 'ぷれぜんと', romaji: 'purezento', english: 'present / gift', bangla: 'উপহার', partOfSpeech: 'noun', lesson: 7, isVerifiedTextbook: true },
      { id: 'v7_7', japanese: 'お金', kana: 'おかね', romaji: 'okane', english: 'money', bangla: 'টাকা', partOfSpeech: 'noun', lesson: 7, isVerifiedTextbook: true },
      { id: 'v7_8', japanese: '切符', kana: 'きっぷ', romaji: 'kippu', english: 'ticket', bangla: 'টিকিট', partOfSpeech: 'noun', lesson: 7, isVerifiedTextbook: true },
      { id: 'v7_9', japanese: 'もう', kana: 'もう', romaji: 'mou', english: 'already', bangla: 'ইতিমধ্যে', partOfSpeech: 'adverb', lesson: 7, isVerifiedTextbook: true },
      { id: 'v7_10', japanese: 'まだ', kana: 'まだ', romaji: 'mada', english: 'not yet', bangla: 'এখনও না', partOfSpeech: 'adverb', lesson: 7, isVerifiedTextbook: true },
    ],
    grammarPoints: [
      {
        id: 'g7_1',
        lesson: 7,
        pattern: 'Tool / Language で V',
        titleEn: 'Instrument or Language Particle で',
        titleBn: 'উপকরণ বা ভাষার মাধ্যম নির্দেশক で',
        explanationEn: 'The particle で specifies the instrument, method, or language used to perform an action.',
        explanationBn: 'কোন মাধ্যমে বা কী দিয়ে কাজটি করা হচ্ছে তা বোঝাতে で বসে।',
        structure: [
          { label: 'Tool / Means', type: 'object' },
          { label: 'で', type: 'particle' },
          { label: 'Action Verb', type: 'verb' }
        ],
        examples: [
          { japanese: 'はしで 食べます。', kana: 'はしで たべます。', romaji: 'Hashi de tabemasu.', english: 'I eat with chopsticks.', bangla: 'আমি চপস্টিক দিয়ে খাই।' }
        ]
      },
      {
        id: 'g7_2',
        lesson: 7,
        pattern: 'Person に N を あげます / もらいます',
        titleEn: 'Giving (あげます) & Receiving (もらいます)',
        titleBn: 'দেওয়া (あげます) ও নেওয়া (もらいます)',
        explanationEn: 'Person に marks the recipient when giving, and the giver/source when receiving.',
        explanationBn: 'কাউকে কিছু দিলে তার নামের পর に এবং কিছু গ্রহন করলে দাতার নামের পর に বা から বসে।',
        structure: [
          { label: 'Person', type: 'topic' },
          { label: 'に', type: 'particle' },
          { label: 'Gift / Object', type: 'object' },
          { label: 'あげます / もらいます', type: 'verb' }
        ],
        examples: [
          { japanese: '木村さんに 花を あげました。', kana: 'きむらさんに はなを あげました。', romaji: 'Kimura-san ni hana o agemashita.', english: 'I gave flowers to Ms. Kimura.', bangla: 'আমি কিমুরা-সানকে ফুল দিয়েছিলাম।' }
        ]
      }
    ],
    quiz: [
      {
        id: 'q7_1',
        question: 'Translate: "I write with a pen" -> ペン（　）書きます。',
        type: 'multiple-choice',
        options: ['で', 'を', 'に', 'と'],
        correctAnswer: 'で',
        explanation: 'Particle で denotes the tool used to execute an action.'
      }
    ]
  },

  {
    id: 'lesson_8',
    number: 8,
    dayNumber: 8,
    title: 'Adjectives (い-adj and な-adj)',
    titleEn: 'Adjective Types, Inflections & Modification',
    titleBn: 'বিশেষণ (ই-বিশেষণ ও না-বিশেষণ)',
    descriptionEn: 'Learn the two distinct Japanese adjective groups, non-past/past affirmative/negative forms, and modifying nouns.',
    descriptionBn: 'জাপানি ভাষার দুই ধরনের বিশেষণ, কালভেদে তাদের রূপান্তর এবং বিশেষ্যের গুণ বর্ণনা।',
    estimatedMinutes: 25,
    objectives: [
      'Distinguish between い-adjectives and な-adjectives',
      'Conjugate い-adjectives (〜くない, 〜かった, 〜くなかった)',
      'Conjugate な-adjectives (〜じゃない, 〜でした, 〜じゃありませんでした)',
      'Modify nouns directly: [い-adj] Noun vs [な-adj] な Noun'
    ],
    vocabulary: [
      { id: 'v8_1', japanese: 'ハンサム[な]', kana: 'はんさむ[な]', romaji: 'hansamu[na]', english: 'handsome', bangla: 'সুদর্শন', partOfSpeech: 'na-adj', lesson: 8, isVerifiedTextbook: true },
      { id: 'v8_2', japanese: 'きれい[な]', kana: 'きれい[な]', romaji: 'kirei[na]', english: 'beautiful / clean', bangla: 'সুন্দর / পরিচ্ছন্ন', partOfSpeech: 'na-adj', lesson: 8, isVerifiedTextbook: true },
      { id: 'v8_3', japanese: '静か[な]', kana: 'しずか[な]', romaji: 'shizuka[na]', english: 'quiet', bangla: 'শান্ত / নীরব', partOfSpeech: 'na-adj', lesson: 8, isVerifiedTextbook: true },
      { id: 'v8_4', japanese: '有名[な]', kana: 'ゆうめい[な]', romaji: 'yuumei[na]', english: 'famous', bangla: 'বিখ্যাত', partOfSpeech: 'na-adj', lesson: 8, isVerifiedTextbook: true },
      { id: 'v8_5', japanese: '親切[な]', kana: 'しんせつ[な]', romaji: 'shinsetsu[na]', english: 'kind', bangla: 'দয়ালু / অমায়িক', partOfSpeech: 'na-adj', lesson: 8, isVerifiedTextbook: true },
      { id: 'v8_6', japanese: '大きい', kana: 'おおきい', romaji: 'ookii', english: 'big / large', bangla: 'বড়', partOfSpeech: 'i-adj', lesson: 8, isVerifiedTextbook: true },
      { id: 'v8_7', japanese: '小さい', kana: 'ちいさい', romaji: 'chiisai', english: 'small', bangla: 'ছোট', partOfSpeech: 'i-adj', lesson: 8, isVerifiedTextbook: true },
      { id: 'v8_8', japanese: '新しい', kana: 'あたらしい', romaji: 'atarashii', english: 'new', bangla: 'নতুন', partOfSpeech: 'i-adj', lesson: 8, isVerifiedTextbook: true },
      { id: 'v8_9', japanese: '古い', kana: 'ふるい', romaji: 'furui', english: 'old (not people)', bangla: 'পুরাতন', partOfSpeech: 'i-adj', lesson: 8, isVerifiedTextbook: true },
      { id: 'v8_10', japanese: 'いい', kana: 'いい', romaji: 'ii', english: 'good', bangla: 'ভালো', partOfSpeech: 'i-adj', lesson: 8, isVerifiedTextbook: true },
      { id: 'v8_11', japanese: 'おいしい', kana: 'おいしい', romaji: 'oishii', english: 'delicious', bangla: 'সুস্বাদু', partOfSpeech: 'i-adj', lesson: 8, isVerifiedTextbook: true },
      { id: 'v8_12', japanese: '高い', kana: 'たかい', romaji: 'takai', english: 'high / expensive', bangla: 'উঁচু / ব্যয়বহুল', partOfSpeech: 'i-adj', lesson: 8, isVerifiedTextbook: true },
    ],
    grammarPoints: [
      {
        id: 'g8_1',
        lesson: 8,
        pattern: 'い-adj vs な-adj Conjugation',
        titleEn: 'Predicate Conjugation Comparison',
        titleBn: 'বিশেষণের কালভেদ রূপান্তর',
        explanationEn: 'い-adjectives inflect internally by dropping い (e.g. たかくない, たかかった). な-adjectives take copula changes (しずかじゃない, しずかでした).',
        explanationBn: 'ই-বিশেষণ শব্দের শেষ い পরিবর্তন করে (যেমন: たかくない), আর না-বিশেষণ です এর রূপ পরিবর্তন করে।',
        structure: [
          { label: 'い-adj stem + くない / かった', type: 'adjective' },
          { label: 'な-adj + じゃない / でした', type: 'adjective' }
        ],
        examples: [
          { japanese: '富士山は 高いです。', kana: 'ふじさんは たかいです。', romaji: 'Fujisan wa takai desu.', english: 'Mt. Fuji is high.', bangla: 'ফুজি পর্বত উঁচু।' },
          { japanese: '昨日は 寒くなかったです。', kana: 'きのうは さむくなかったです。', romaji: 'Kinou wa samukunakatta desu.', english: 'Yesterday was not cold.', bangla: 'গতকাল ঠান্ডা ছিল না।' }
        ]
      }
    ],
    quiz: [
      {
        id: 'q8_1',
        question: 'What is the negative form of おいしい (delicious)?',
        type: 'multiple-choice',
        options: ['おいしくない', 'おいしいじゃない', 'おいしくないでした', 'おいしでした'],
        correctAnswer: 'おいしくない',
        explanation: 'Drop the final い and add くない.'
      }
    ]
  },

  {
    id: 'lesson_9',
    number: 9,
    dayNumber: 9,
    title: 'Preferences and Capabilities',
    titleEn: 'Likes, Dislikes & Skills (N が 好き / わかります)',
    titleBn: 'পছন্দ-অপছন্দ ও দক্ষতা প্রকাশ',
    descriptionEn: 'Express preferences (suki/kirai), abilities (jouzu/heta), understanding (wakarimasu), possession (arimasu), and reasons with kara.',
    descriptionBn: 'পছন্দ, অপছন্দ, দক্ষতা এবং কারণ (から = কারণ) প্রকাশ।',
    estimatedMinutes: 25,
    objectives: [
      'Express likes and dislikes: N が 好きです / 嫌いです',
      'Express skill levels: N が 上手です / 下手です',
      'Use が with わかります (understand) and あります (possess)',
      'Give reasons using から (because) and ask with どうして (why)'
    ],
    vocabulary: [
      { id: 'v9_1', japanese: 'わかります', kana: 'わかります', romaji: 'wakarimasu', english: 'understand', bangla: 'বুঝতে পারা', partOfSpeech: 'verb-i', lesson: 9, isVerifiedTextbook: true },
      { id: 'v9_2', japanese: 'あります', kana: 'あります', romaji: 'arimasu', english: 'have / possess', bangla: 'থাকা / আছে', partOfSpeech: 'verb-i', lesson: 9, isVerifiedTextbook: true },
      { id: 'v9_3', japanese: '好き[な]', kana: 'すき[な]', romaji: 'suki[na]', english: 'like / fond of', bangla: 'পছন্দ', partOfSpeech: 'na-adj', lesson: 9, isVerifiedTextbook: true },
      { id: 'v9_4', japanese: '嫌い[な]', kana: 'きらい[な]', romaji: 'kirai[na]', english: 'dislike', bangla: 'অপছন্দ', partOfSpeech: 'na-adj', lesson: 9, isVerifiedTextbook: true },
      { id: 'v9_5', japanese: '上手[な]', kana: 'じょうず[な]', romaji: 'jouzu[na]', english: 'good at', bangla: 'দক্ষ / পারদর্শী', partOfSpeech: 'na-adj', lesson: 9, isVerifiedTextbook: true },
      { id: 'v9_6', japanese: '下手[な]', kana: 'へた[な]', romaji: 'heta[na]', english: 'poor at', bangla: 'অদক্ষ / দুর্বল', partOfSpeech: 'na-adj', lesson: 9, isVerifiedTextbook: true },
      { id: 'v9_7', japanese: '料理', kana: 'りょうり', romaji: 'ryouri', english: 'cooking / cuisine', bangla: 'রান্না / খাদ্য', partOfSpeech: 'noun', lesson: 9, isVerifiedTextbook: true },
      { id: 'v9_8', japanese: 'から', kana: 'から', romaji: 'kara', english: 'because', bangla: 'কারণ', partOfSpeech: 'particle', lesson: 9, isVerifiedTextbook: true },
      { id: 'v9_9', japanese: 'どうして', kana: 'どうして', romaji: 'doushite', english: 'why', bangla: 'কেন', partOfSpeech: 'pronoun', lesson: 9, isVerifiedTextbook: true },
    ],
    grammarPoints: [
      {
        id: 'g9_1',
        lesson: 9,
        pattern: 'N が すき / じょうず / わかります',
        titleEn: 'Particle が for Targets of Preference and Ability',
        titleBn: 'পছন্দ ও যোগ্যতার লক্ষ্য নির্দেশক が',
        explanationEn: 'The object of desire, preference, skill, or understanding takes が instead of を.',
        explanationBn: 'পছন্দ, দক্ষতা বা বোঝার লক্ষ্যবস্তুর সাথে を এর পরিবর্তে が বিভক্তি বসে।',
        structure: [
          { label: 'Topic (Person)', type: 'topic' },
          { label: 'は', type: 'particle' },
          { label: 'Target Object', type: 'object' },
          { label: 'が', type: 'particle' },
          { label: '好き / 上手 / あります', type: 'predicate' }
        ],
        examples: [
          { japanese: 'わたしは 日本料理が 好きです。', kana: 'わたしは にほんりょうりが すきです。', romaji: 'Watashi wa nihon-ryouri ga suki desu.', english: 'I like Japanese food.', bangla: 'আমি জাপানি খাবার পছন্দ করি।' }
        ]
      }
    ],
    quiz: [
      {
        id: 'q9_1',
        question: 'Which particle is used with すき (like): にほんご（　）すきです。',
        type: 'multiple-choice',
        options: ['が', 'を', 'に', 'で'],
        correctAnswer: 'が',
        explanation: 'Predicate adjectives of preference (suki, kirai) require が for the target.'
      }
    ]
  },

  {
    id: 'lesson_10',
    number: 10,
    dayNumber: 10,
    title: 'Existence and Location',
    titleEn: 'Animate vs Inanimate Existence (います / あります)',
    titleBn: 'সজীব ও নির্জীব বস্তুর উপস্থিতি',
    descriptionEn: 'Distinguish animate existence (imasu) from inanimate existence (arimasu), positional nouns (ue, shita, mae, ushiro), and non-exhaustive ya.',
    descriptionBn: 'মানুষ/প্রাণী (います) এবং জড়বস্তু (あります) এর অবস্থান এবং স্থান নির্দেশক শব্দ।',
    estimatedMinutes: 25,
    objectives: [
      'Use います for people and animals',
      'Use あります for inanimate objects and plants',
      'Describe spatial relations using 上, 下, 前, 後ろ, 中, 隣',
      'Connect nouns non-exhaustively with や'
    ],
    vocabulary: [
      { id: 'v10_1', japanese: 'います', kana: 'います', romaji: 'imasu', english: 'exist / be (animate)', bangla: 'আছেন / আছে (সজীব)', partOfSpeech: 'verb-ii', lesson: 10, isVerifiedTextbook: true },
      { id: 'v10_2', japanese: 'あります', kana: 'あります', romaji: 'arimasu', english: 'exist / be (inanimate)', bangla: 'আছে (নির্জীব)', partOfSpeech: 'verb-i', lesson: 10, isVerifiedTextbook: true },
      { id: 'v10_3', japanese: '男の人', kana: 'おとこのひと', romaji: 'otoko no hito', english: 'man', bangla: 'পুরুষ', partOfSpeech: 'noun', lesson: 10, isVerifiedTextbook: true },
      { id: 'v10_4', japanese: '女の人', kana: 'おんなのひと', romaji: 'onna no hito', english: 'woman', bangla: 'মহিলা', partOfSpeech: 'noun', lesson: 10, isVerifiedTextbook: true },
      { id: 'v10_5', japanese: '犬', kana: 'いぬ', romaji: 'inu', english: 'dog', bangla: 'কুকুর', partOfSpeech: 'noun', lesson: 10, isVerifiedTextbook: true },
      { id: 'v10_6', japanese: '猫', kana: 'ねこ', romaji: 'neko', english: 'cat', bangla: 'বিড়াল', partOfSpeech: 'noun', lesson: 10, isVerifiedTextbook: true },
      { id: 'v10_7', japanese: '上', kana: 'うえ', romaji: 'ue', english: 'above / on top', bangla: 'উপরে', partOfSpeech: 'noun', lesson: 10, isVerifiedTextbook: true },
      { id: 'v10_8', japanese: '下', kana: 'した', romaji: 'shita', english: 'under / below', bangla: 'নিচে', partOfSpeech: 'noun', lesson: 10, isVerifiedTextbook: true },
      { id: 'v10_9', japanese: '前', kana: 'まえ', romaji: 'mae', english: 'in front of', bangla: 'সামনে', partOfSpeech: 'noun', lesson: 10, isVerifiedTextbook: true },
      { id: 'v10_10', japanese: '後ろ', kana: 'うしろ', romaji: 'ushiro', english: 'behind', bangla: 'পেছনে', partOfSpeech: 'noun', lesson: 10, isVerifiedTextbook: true },
    ],
    grammarPoints: [
      {
        id: 'g10_1',
        lesson: 10,
        pattern: 'Place に N が います / あります',
        titleEn: 'Existence in a Location',
        titleBn: 'নির্দিষ্ট স্থানে কোনো কিছুর অবস্থান',
        explanationEn: 'The location of existence is marked with に. Animate beings (people, animals) use います; inanimate things and plants use あります.',
        explanationBn: 'যে স্থানে আছে তা বোঝাতে に বসে। জীবিত প্রাণীর ক্ষেত্রে います এবং নির্জীব বস্তুর ক্ষেত্রে あります বসে।',
        structure: [
          { label: 'Place', type: 'location' },
          { label: 'に', type: 'particle' },
          { label: 'Entity (N)', type: 'object' },
          { label: 'が', type: 'particle' },
          { label: 'います / あります', type: 'verb' }
        ],
        examples: [
          { japanese: '机の上に 本が あります。', kana: 'つくえのうえに ほんが あります。', romaji: 'Tsukue no ue ni hon ga arimasu.', english: 'There is a book on the desk.', bangla: 'টেবিলের ওপর একটি বই আছে।' },
          { japanese: '庭に 犬が います。', kana: 'にわに いぬが います。', romaji: 'Niwa ni inu ga imasu.', english: 'There is a dog in the garden.', bangla: 'বাগানে একটি কুকুর আছে।' }
        ]
      }
    ],
    quiz: [
      {
        id: 'q10_1',
        question: 'Which verb should be used for a cat (ねこ): へやに ねこが（　）。',
        type: 'multiple-choice',
        options: ['います', 'あります', 'します', '行きます'],
        correctAnswer: 'います',
        explanation: 'Cats are living animals, requiring the animate existence verb います.'
      }
    ]
  },

  // --- Lessons 11 to 25 summaries with authentic curriculum data ---
  {
    id: 'lesson_11',
    number: 11,
    dayNumber: 11,
    title: 'Numbers, Quantifiers, and Frequency',
    titleEn: 'Japanese Counting Suffixes & Frequency (〜回, だけ)',
    titleBn: 'গণনা পদ্ধতি ও পুনরাবৃত্তি',
    descriptionEn: 'Learn native Japanese numbers (hitotsu, futatsu...), counter suffixes (nin, dai, mai, hon, satsu, hiki), and frequency.',
    descriptionBn: 'জাপানি মৌলিক সংখ্যা, গণনাসূচক প্রত্যয় ও কতবার কাজটি হচ্ছে তা প্রকাশ।',
    estimatedMinutes: 25,
    objectives: ['Count items using ひとつ〜とお', 'Use counter suffixes 人, 台, 枚, 本, 冊', 'Express action frequency: Period に X回 V'],
    vocabulary: [
      { id: 'v11_1', japanese: 'りんご', kana: 'りんご', romaji: 'ringo', english: 'apple', bangla: 'আপেল', partOfSpeech: 'noun', lesson: 11, isVerifiedTextbook: true },
      { id: 'v11_2', japanese: '切手', kana: 'きって', romaji: 'kitte', english: 'postage stamp', bangla: 'ডাকটিকেট', partOfSpeech: 'noun', lesson: 11, isVerifiedTextbook: true },
      { id: 'v11_3', japanese: '兄弟', kana: 'きょうだい', romaji: 'kyoudai', english: 'siblings', bangla: 'ভাইবোন', partOfSpeech: 'noun', lesson: 11, isVerifiedTextbook: true },
      { id: 'v11_4', japanese: 'どのくらい', kana: 'どのくらい', romaji: 'donokurai', english: 'how long / how much', bangla: 'কতক্ষণ / কতটা', partOfSpeech: 'pronoun', lesson: 11, isVerifiedTextbook: true },
    ],
    grammarPoints: [
      {
        id: 'g11_1',
        lesson: 11,
        pattern: 'Quantifier placement & Frequency',
        titleEn: 'Quantifiers follow the noun/particle directly',
        titleBn: 'গণনাবাচক শব্দের বাক্যে অবস্থান',
        explanationEn: 'Quantifiers are placed immediately after the object particle: りんごを ４つ 買いました.',
        explanationBn: 'সংখ্যাবাচক শব্দ সরাসরি পার্টিকলের পরে বসে।',
        structure: [{ label: 'Noun', type: 'object' }, { label: 'を', type: 'particle' }, { label: 'Quantifier (4つ)', type: 'predicate' }, { label: 'Verb', type: 'verb' }],
        examples: [{ japanese: 'りんごを ４つ 買いました。', kana: 'りんごを よっつ かいました。', romaji: 'Ringo o yottsu kaimashita.', english: 'I bought four apples.', bangla: 'আমি চারটি আপেল কিনেছি।' }]
      }
    ],
    quiz: [{ id: 'q11_1', question: 'How do you say "two things" in native Japanese numbers?', type: 'multiple-choice', options: ['ふたつ', 'ひとつ', 'みっつ', 'よっつ'], correctAnswer: 'ふたつ', explanation: 'ふたつ (futatsu) is native counting for two things.' }]
  },

  {
    id: 'lesson_12',
    number: 12,
    dayNumber: 12,
    title: 'Comparisons and Superlatives',
    titleEn: 'Comparing Items (N1 は N2 より, どちらが, いちばん)',
    titleBn: 'তুলনা ও সর্বোত্তম নির্ধারণ',
    descriptionEn: 'Learn comparisons (N1 is more adj than N2), comparing two items with dochira, and finding superlatives with ichiban.',
    descriptionBn: 'দুটি বস্তুর মধ্যে তুলনা এবং কোন দলের মধ্যে সর্বসেরা নির্ণয়।',
    estimatedMinutes: 25,
    objectives: ['Compare two items: N1 は N2 より adj です', 'Ask which is more: N1 と N2 と どちらが adj ですか', 'Express superlatives with いちばん'],
    vocabulary: [
      { id: 'v12_1', japanese: '簡単[な]', kana: 'かんたん[な]', romaji: 'kantan[na]', english: 'easy / simple', bangla: 'সহজ', partOfSpeech: 'na-adj', lesson: 12, isVerifiedTextbook: true },
      { id: 'v12_2', japanese: '近い', kana: 'ちかい', romaji: 'chikai', english: 'near / close', bangla: 'কাছে', partOfSpeech: 'i-adj', lesson: 12, isVerifiedTextbook: true },
      { id: 'v12_3', japanese: '遠い', kana: 'とおい', romaji: 'tooi', english: 'far', bangla: 'দূরে', partOfSpeech: 'i-adj', lesson: 12, isVerifiedTextbook: true },
      { id: 'v12_4', japanese: '季節', kana: 'きせつ', romaji: 'kisetsu', english: 'season', bangla: 'ঋতু', partOfSpeech: 'noun', lesson: 12, isVerifiedTextbook: true },
    ],
    grammarPoints: [
      {
        id: 'g12_1',
        lesson: 12,
        pattern: 'N1 は N2 より Adj です',
        titleEn: 'N1 is more Adj than N2',
        titleBn: 'N1, N2 এর চেয়ে বেশি বিশেষণযুক্ত',
        explanationEn: 'より indicates the standard of comparison ("than N2").',
        explanationBn: 'より মানে "চেয়ে / অপেক্ষা"।',
        structure: [{ label: 'N1', type: 'topic' }, { label: 'は', type: 'particle' }, { label: 'N2', type: 'object' }, { label: 'より', type: 'particle' }, { label: 'Adj です', type: 'predicate' }],
        examples: [{ japanese: '新幹線は 車より 速いです。', kana: 'しんかんせんは くるまより はやいです。', romaji: 'Shinkansen wa kuruma yori hayai desu.', english: 'The bullet train is faster than cars.', bangla: 'বুলেট ট্রেন গাড়ির চেয়ে দ্রুত।' }]
      }
    ],
    quiz: [{ id: 'q12_1', question: 'Which word means "the most" in superlatives?', type: 'multiple-choice', options: ['いちばん', 'より', 'ずっと', 'どちら'], correctAnswer: 'いちばん', explanation: 'いちばん (ichiban) means the number one / most.' }]
  },

  {
    id: 'lesson_13',
    number: 13,
    dayNumber: 13,
    title: 'Desires and Purpose of Movement',
    titleEn: 'Expressing Wishes (ほしい, Vたい) & Purpose (に 行きます)',
    titleBn: 'ইচ্ছা প্রকাশ ও গমনের উদ্দেশ্য',
    descriptionEn: 'Expressing desire for an object (hoshii), desire to do an action (V-tai), and purpose of movement (place e verb-stem ni ikimasu).',
    descriptionBn: 'কোন বস্তু চাওয়া (ほしい), কোন কাজ করতে চাওয়া (Vたい) এবং উদ্দেশ্য নিয়ে যাওয়া।',
    estimatedMinutes: 25,
    objectives: ['Want an object: N が ほしいです', 'Want to perform action: Vます-stem + たいです', 'Purpose of motion: Place へ Vstem に 行きます'],
    vocabulary: [
      { id: 'v13_1', japanese: '遊びます', kana: 'あそびます', romaji: 'asobimasu', english: 'play / enjoy oneself', bangla: 'আনন্দ করা / খেলা', partOfSpeech: 'verb-i', lesson: 13, isVerifiedTextbook: true },
      { id: 'v13_2', japanese: '泳ぎます', kana: 'およぎます', romaji: 'oyogimasu', english: 'swim', bangla: 'সাঁতার কাটা', partOfSpeech: 'verb-i', lesson: 13, isVerifiedTextbook: true },
      { id: 'v13_3', japanese: '欲しい', kana: 'ほしい', romaji: 'hoshii', english: 'want (tangible object)', bangla: 'চাওয়া (বস্তু)', partOfSpeech: 'i-adj', lesson: 13, isVerifiedTextbook: true },
      { id: 'v13_4', japanese: '疲れます', kana: 'つかれます', romaji: 'tsukaremasu', english: 'get tired', bangla: 'ক্লান্ত হওয়া', partOfSpeech: 'verb-ii', lesson: 13, isVerifiedTextbook: true },
    ],
    grammarPoints: [
      {
        id: 'g13_1',
        lesson: 13,
        pattern: 'Vます-stem + たいです',
        titleEn: 'Desire to do an action',
        titleBn: 'কোনো কাজ করার ইচ্ছা প্রকাশ',
        explanationEn: 'Drop ます and attach たいです. Inflects like an い-adjective (たくない, たかった).',
        explanationBn: 'মাসু বাদ দিয়ে たいです যুক্ত হয়।',
        structure: [{ label: 'Verb stem', type: 'verb' }, { label: 'たいです', type: 'predicate' }],
        examples: [{ japanese: '日本へ 行きたいです。', kana: 'にほんへ いきたいです。', romaji: 'Nihon e ikitai desu.', english: 'I want to go to Japan.', bangla: 'আমি জাপানে যেতে চাই।' }]
      }
    ],
    quiz: [{ id: 'q13_1', question: 'How do you say "I want to eat"?', type: 'multiple-choice', options: ['食べたいです', '食べます', '食べたかったです', '食べない'], correctAnswer: '食べたいです', explanation: 'Tabemasu stem tabe + tai desu.' }]
  },

  {
    id: 'lesson_14',
    number: 14,
    dayNumber: 14,
    title: 'Te-Form and Requests',
    titleEn: 'Verb Classification, Te-Form & Polite Requests (Vてください)',
    titleBn: 'তে-রূপ ও বিনীত অনুরোধ',
    descriptionEn: 'The monumental core lesson: Verb Groups I, II, III, -te conjugation rules, requests (te kudasai), and ongoing action (te imasu).',
    descriptionBn: 'জাপানি ভাষার ৩টি দল, তে-রূপের নিয়মাবলী এবং "অনুগ্রহ করে করুন" বলা।',
    estimatedMinutes: 30,
    objectives: ['Master Group I, II, and III verb classification', 'Conjugate all verbs into -te form', 'Make requests with Vてください', 'Describe ongoing actions with Vています'],
    vocabulary: [
      { id: 'v14_1', japanese: 'つけます', kana: 'つけます', romaji: 'tsukemasu', english: 'turn on (light/appliance)', bangla: 'চালু করা', partOfSpeech: 'verb-ii', lesson: 14, isVerifiedTextbook: true },
      { id: 'v14_2', japanese: '消します', kana: 'けします', romaji: 'keshimasu', english: 'turn off', bangla: 'বন্ধ করা', partOfSpeech: 'verb-i', lesson: 14, isVerifiedTextbook: true },
      { id: 'v14_3', japanese: '開けます', kana: 'あけます', romaji: 'akemasu', english: 'open', bangla: 'খোলা', partOfSpeech: 'verb-ii', lesson: 14, isVerifiedTextbook: true },
      { id: 'v14_4', japanese: '閉めます', kana: 'しめます', romaji: 'shimemasu', english: 'close / shut', bangla: 'বন্ধ করা', partOfSpeech: 'verb-ii', lesson: 14, isVerifiedTextbook: true },
      { id: 'v14_5', japanese: '待ちます', kana: 'まちます', romaji: 'machimasu', english: 'wait', bangla: 'অপেক্ষা করা', partOfSpeech: 'verb-i', lesson: 14, isVerifiedTextbook: true },
    ],
    grammarPoints: [
      {
        id: 'g14_1',
        lesson: 14,
        pattern: 'Vて ください',
        titleEn: 'Polite Requests (Please do...)',
        titleBn: 'ভদ্র অনুরোধ (দয়া করে করুন)',
        explanationEn: 'Attach ください to the verb -te form for standard polite requests.',
        explanationBn: 'তে-রূপের পরে ください যুক্ত করে অনুরোধ করা হয়।',
        structure: [{ label: 'Verb (te-form)', type: 'verb' }, { label: 'ください', type: 'predicate' }],
        examples: [{ japanese: 'ちょっと 待ってください。', kana: 'ちょっと まってください。', romaji: 'Chotto matte kudasai.', english: 'Please wait a moment.', bangla: 'দয়া করে একটু অপেক্ষা করুন।' }]
      }
    ],
    quiz: [{ id: 'q14_1', question: 'What is the -te form of 書きます (kakimasu)?', type: 'multiple-choice', options: ['書いて', '書いで', '待って', '書きて'], correctAnswer: '書いて', explanation: 'Group I verbs ending in -ki become -ite (kaite).' }]
  },

  {
    id: 'lesson_15',
    number: 15,
    dayNumber: 15,
    title: 'Permissions, Prohibitions, and States',
    titleEn: 'Asking Permission (Vてもいいですか) & Prohibition (Vてはいけません)',
    titleBn: 'অনুমতি, নিষেধাজ্ঞা ও বর্তমান অবস্থা',
    descriptionEn: 'Asking permission ("May I?"), strict prohibitions ("You must not"), and persistent states (kekkon shiteimasu, sundeimasu).',
    descriptionBn: 'অনুমতি চাওয়া (Vてもいいですか), নিষেধাজ্ঞা (Vてはいけません) এবং দীর্ঘস্থায়ী অবস্থা প্রকাশ।',
    estimatedMinutes: 25,
    objectives: ['Ask permission: Vてもいいですか', 'State prohibition: Vてはいけません', 'Describe continuous states: Vています'],
    vocabulary: [
      { id: 'v15_1', japanese: '置きます', kana: 'おきます', romaji: 'okimasu', english: 'put / place', bangla: 'রাখা', partOfSpeech: 'verb-i', lesson: 15, isVerifiedTextbook: true },
      { id: 'v15_2', japanese: '作ります', kana: 'つくります', romaji: 'tsukurimasu', english: 'make / produce', bangla: 'তৈরি করা', partOfSpeech: 'verb-i', lesson: 15, isVerifiedTextbook: true },
      { id: 'v15_3', japanese: '売ります', kana: 'うります', romaji: 'urimasu', english: 'sell', bangla: 'বিক্রি করা', partOfSpeech: 'verb-i', lesson: 15, isVerifiedTextbook: true },
      { id: 'v15_4', japanese: '知っています', kana: 'しっています', romaji: 'shitteimasu', english: 'I know', bangla: 'আমি জানি', partOfSpeech: 'expression', lesson: 15, isVerifiedTextbook: true },
      { id: 'v15_5', japanese: '住んでいます', kana: 'すんでいます', romaji: 'sundeimasu', english: 'I live in', bangla: 'বসবাস করছি', partOfSpeech: 'expression', lesson: 15, isVerifiedTextbook: true },
    ],
    grammarPoints: [
      {
        id: 'g15_1',
        lesson: 15,
        pattern: 'Vて も いいですか / Vて は いけません',
        titleEn: 'Permission vs Prohibition',
        titleBn: 'অনুমতি বনাম নিষেধাজ্ঞা',
        explanationEn: 'Vてもいいですか politely asks permission. Vてはいけません states strong prohibition.',
        explanationBn: 'অনুমতি চাওয়া এবং কঠোর নিষেধাজ্ঞা প্রকাশ।',
        structure: [{ label: 'V-te', type: 'verb' }, { label: 'も いいですか / は いけません', type: 'predicate' }],
        examples: [{ japanese: '写真を 撮っても いいですか。', kana: 'しゃしんを とっても いいですか。', romaji: 'Shashin o tottemo ii desu ka.', english: 'May I take a photo?', bangla: 'আমি কি ছবি তুলতে পারি?' }]
      }
    ],
    quiz: [{ id: 'q15_1', question: 'How do you say "You must not enter here"?', type: 'multiple-choice', options: ['入ってはいけません', '入ってもいいです', '入ってください', '入ります'], correctAnswer: '入ってはいけません', explanation: 'V-te wa ikemasen means "must not do".' }]
  },

  {
    id: 'lesson_16',
    number: 16,
    dayNumber: 16,
    title: 'Sequential Actions and Attribute Description',
    titleEn: 'Chaining Actions (V1-te, V2) & N1 は N2 が Adj',
    titleBn: 'ধারাবাহিক কাজ ও বৈশিষ্ট্য প্রকাশ',
    descriptionEn: 'Connecting actions in chronological order with te-form, V-te kara (after doing V1), and describing attributes (elephant has long trunk).',
    descriptionBn: 'একের পর এক কাজ করা (V1-te, V2) এবং কারও নির্দিষ্ট অঙ্গ বা গুণ বর্ণনা।',
    estimatedMinutes: 25,
    objectives: ['Chain sequential verbs using -te form', 'Use V1-te から V2 ("after doing V1")', 'Attribute descriptions: N1 は N2 が adj です'],
    vocabulary: [
      { id: 'v16_1', japanese: '乗ります', kana: 'のります', romaji: 'norimasu', english: 'ride / get on (train)', bangla: 'চড়া (ট্রেন/বাসে)', partOfSpeech: 'verb-i', lesson: 16, isVerifiedTextbook: true },
      { id: 'v16_2', japanese: '降ります', kana: 'おります', romaji: 'orimasu', english: 'get off', bangla: 'নামা', partOfSpeech: 'verb-ii', lesson: 16, isVerifiedTextbook: true },
      { id: 'v16_3', japanese: '浴びます', kana: 'あびます', romaji: 'abimasu', english: 'take (a shower)', bangla: 'গোসল নেওয়া', partOfSpeech: 'verb-ii', lesson: 16, isVerifiedTextbook: true },
      { id: 'v16_4', japanese: '若い', kana: 'わかい', romaji: 'wakai', english: 'young', bangla: 'তরুণ / যুবক', partOfSpeech: 'i-adj', lesson: 16, isVerifiedTextbook: true },
    ],
    grammarPoints: [
      {
        id: 'g16_1',
        lesson: 16,
        pattern: 'V1-て から、V2',
        titleEn: 'After doing V1, do V2',
        titleBn: 'V1 করার পর V2 করা',
        explanationEn: 'Emphasizes that action 2 does not take place until action 1 is completely finished.',
        explanationBn: 'প্রথম কাজটি শেষ হওয়ার পরই দ্বিতীয় কাজটি শুরু হওয়া বোঝায়।',
        structure: [{ label: 'V1-te', type: 'verb' }, { label: 'から', type: 'particle' }, { label: 'V2', type: 'verb' }],
        examples: [{ japanese: '国へ 帰ってから、働きます。', kana: 'くにへ かえってから、はたらきます。', romaji: 'Kuni e kaette kara, hatarakimasu.', english: 'After returning to my country, I will work.', bangla: 'দেশে ফেরার পর আমি কাজ করব।' }]
      }
    ],
    quiz: [{ id: 'q16_1', question: 'How do you say "The elephant has a long trunk"?', type: 'multiple-choice', options: ['象は 鼻が 長いです', '象の 鼻は 長いです', '象が 鼻は 長いです', '象に 鼻が 長いです'], correctAnswer: '象は 鼻が 長いです', explanation: 'Topic (elephant は) + attribute (nose が) + adjective (long desu).' }]
  },

  {
    id: 'lesson_17',
    number: 17,
    dayNumber: 17,
    title: 'Obligations and Negative Form',
    titleEn: 'Nai-Form, "Must Do" (なければなりません) & "Do not have to"',
    titleBn: 'বাধ্যবাধকতা ও নাই-রূপ',
    descriptionEn: 'Learn Verb ない-form conjugation, "Please don\'t" (naide kudasai), "Must do" (nakereba narimasen), and "Need not" (nakutemo ii).',
    descriptionBn: 'নাই-রূপের রূপান্তর, "বাধ্যতামূলক করতে হবে" এবং "না করলেও চলবে"।',
    estimatedMinutes: 25,
    objectives: ['Conjugate verbs into ない-form', 'Request prohibition: Vないでください', 'Express obligation: Vなければなりません', 'State absence of obligation: Vなくてもいいです'],
    vocabulary: [
      { id: 'v17_1', japanese: '覚えます', kana: 'おぼえます', romaji: 'oboemasu', english: 'remember / memorize', bangla: 'মনে রাখা / মুখস্থ করা', partOfSpeech: 'verb-ii', lesson: 17, isVerifiedTextbook: true },
      { id: 'v17_2', japanese: '忘れます', kana: 'わすれます', romaji: 'wasuremasu', english: 'forget', bangla: 'ভুলে যাওয়া', partOfSpeech: 'verb-ii', lesson: 17, isVerifiedTextbook: true },
      { id: 'v17_3', japanese: '払います', kana: 'はらいます', romaji: 'haraimasu', english: 'pay', bangla: 'পরিশোধ করা', partOfSpeech: 'verb-i', lesson: 17, isVerifiedTextbook: true },
      { id: 'v17_4', japanese: '大切[な]', kana: 'たいせつ[な]', romaji: 'taisetsu[na]', english: 'precious / important', bangla: 'গুরুত্বপূর্ণ / মূল্যবান', partOfSpeech: 'na-adj', lesson: 17, isVerifiedTextbook: true },
    ],
    grammarPoints: [
      {
        id: 'g17_1',
        lesson: 17,
        pattern: 'Vなければ なりません',
        titleEn: 'Must do (Obligation)',
        titleBn: 'অবশ্যই করতে হবে (বাধ্যবাধকতা)',
        explanationEn: 'Drop the final い of the ない-form and add ければなりません ("Must do").',
        explanationBn: 'নাই-রূপের い বাদ দিয়ে ければなりません যুক্ত হয়।',
        structure: [{ label: 'V-nai stem', type: 'verb' }, { label: 'ければ なりません', type: 'predicate' }],
        examples: [{ japanese: '薬を 飲まなければ なりません。', kana: 'くすりを のまなければ なりません。', romaji: 'Kusuri o nomanakereba narimasen.', english: 'I must take medicine.', bangla: 'আমাকে অবশ্যই ওষুধ খেতে হবে।' }]
      }
    ],
    quiz: [{ id: 'q17_1', question: 'What is the nai-form of 読みます (yomimasu)?', type: 'multiple-choice', options: ['読まない', '読めない', '読みない', '読わない'], correctAnswer: '読まない', explanation: 'Group I u-verbs shift to the a-row (yomanai).' }]
  },

  {
    id: 'lesson_18',
    number: 18,
    dayNumber: 18,
    title: 'Ability and Dictionary Form',
    titleEn: 'Dictionary Form, Potential (ことができます) & Hobbies',
    titleBn: 'অভিধান রূপ ও সামর্থ্য প্রকাশ',
    descriptionEn: 'Learn dictionary form verbs, expressing abilities ("can do"), talking about hobbies, and time clauses before an action (mae ni).',
    descriptionBn: 'ক্রিয়ার মূল বা অভিধান রূপ, "করতে সক্ষম হওয়া" এবং শখ বর্ণনা।',
    estimatedMinutes: 25,
    objectives: ['Identify and conjugate verb dictionary forms', 'Express potential: V-dict ことができます', 'Describe hobbies: わたしの趣味は Vこと です', 'Express sequence: V-dict まえに'],
    vocabulary: [
      { id: 'v18_1', japanese: 'できます', kana: 'できます', romaji: 'dekimasu', english: 'can do / be able to', bangla: 'পারতে পারা / সম্ভব হওয়া', partOfSpeech: 'verb-ii', lesson: 18, isVerifiedTextbook: true },
      { id: 'v18_2', japanese: '洗います', kana: 'あらいます', romaji: 'araimasu', english: 'wash', bangla: 'ধোয়া', partOfSpeech: 'verb-i', lesson: 18, isVerifiedTextbook: true },
      { id: 'v18_3', japanese: '弾きます', kana: 'ひきます', romaji: 'hikimasu', english: 'play (piano/strings)', bangla: 'বাজানো (যন্ত্র)', partOfSpeech: 'verb-i', lesson: 18, isVerifiedTextbook: true },
      { id: 'v18_4', japanese: '運転します', kana: 'うんてんします', romaji: 'untenshimasu', english: 'drive', bangla: 'গাড়ি চালানো', partOfSpeech: 'verb-iii', lesson: 18, isVerifiedTextbook: true },
    ],
    grammarPoints: [
      {
        id: 'g18_1',
        lesson: 18,
        pattern: 'V-dictionary ことができます',
        titleEn: 'Ability or Potential ("Can do")',
        titleBn: 'করতে পারার সামর্থ্য',
        explanationEn: 'By adding こと to the dictionary form verb, it acts as a noun phrase meaning "the action of doing", followed by が できます.',
        explanationBn: 'অভিধান রূপের সাথে こと যুক্ত করে ক্রিয়াকে বিশেষ্যে রূপান্তর করে が できます যোগ করা হয়।',
        structure: [{ label: 'V-dictionary', type: 'verb' }, { label: 'こと が できます', type: 'predicate' }],
        examples: [{ japanese: '漢字を 読むことが できます。', kana: 'かんじを よむことが できます。', romaji: 'Kanji o yomu koto ga dekimasu.', english: 'I can read kanji.', bangla: 'আমি কাঞ্জি পড়তে পারি।' }]
      }
    ],
    quiz: [{ id: 'q18_1', question: 'How do you say "I can drive"?', type: 'multiple-choice', options: ['運転することが できます', '運転して できます', '運転します ことができます', '運転した ことができます'], correctAnswer: '運転することが できます', explanation: 'Dictionary form (unten suru) + koto ga dekimasu.' }]
  },

  {
    id: 'lesson_19',
    number: 19,
    dayNumber: 19,
    title: 'Past Experience and Changes',
    titleEn: 'Ta-Form, Experience (Vたことがあります) & Listing Actions',
    titleBn: 'অতীত অভিজ্ঞতা ও রূপান্তর',
    descriptionEn: 'Learn Verb た-form (past plain), expressing life experiences ("have done before"), listing non-exhaustive actions (tari, tari), and becoming (naru).',
    descriptionBn: 'তা-রূপ, অতীত জীবনের অভিজ্ঞতা ("করেছি") এবং একাধিক কাজ তালিকার মতো বলা।',
    estimatedMinutes: 25,
    objectives: ['Conjugate verbs into た-form (matches -te form pattern)', 'State past life experience: Vた ことがあります', 'List representative actions: V1たり、V2たり します', 'State change of state: Adj + なります'],
    vocabulary: [
      { id: 'v19_1', japanese: '登ります', kana: 'のぼります', romaji: 'noborimasu', english: 'climb (mountain)', bangla: 'পাহাড়ে ওঠা', partOfSpeech: 'verb-i', lesson: 19, isVerifiedTextbook: true },
      { id: 'v19_2', japanese: '泊まります', kana: 'とまります', romaji: 'tomarimasu', english: 'stay (at hotel)', bangla: 'থাকা (হোটেলে)', partOfSpeech: 'verb-i', lesson: 19, isVerifiedTextbook: true },
      { id: 'v19_3', japanese: '掃除します', kana: 'そうじします', romaji: 'soujishimasu', english: 'clean (a room)', bangla: 'পরিষ্কার করা', partOfSpeech: 'verb-iii', lesson: 19, isVerifiedTextbook: true },
      { id: 'v19_4', japanese: 'なります', kana: 'なります', romaji: 'narimasu', english: 'become', bangla: 'হওয়া / পরিণত হওয়া', partOfSpeech: 'verb-i', lesson: 19, isVerifiedTextbook: true },
    ],
    grammarPoints: [
      {
        id: 'g19_1',
        lesson: 19,
        pattern: 'Vた ことが あります',
        titleEn: 'Past Life Experience ("Have done")',
        titleBn: 'অতীত অভিজ্ঞতা ("করেছি")',
        explanationEn: 'Follows the verb ta-form to express that someone has had a certain life experience in the past.',
        explanationBn: 'তা-রূপের পর ことが あります যোগ করে জীবনে কখনো কোনো কাজ করার অভিজ্ঞতা প্রকাশ পায়।',
        structure: [{ label: 'V-ta form', type: 'verb' }, { label: 'ことが あります', type: 'predicate' }],
        examples: [{ japanese: '日本へ 行ったことが あります。', kana: 'にほんへ いったことが あります。', romaji: 'Nihon e itta koto ga arimasu.', english: 'I have been to Japan before.', bangla: 'আমি পূর্বে জাপানে গিয়েছি।' }]
      }
    ],
    quiz: [{ id: 'q19_1', question: 'What is the ta-form of 食べます (tabemasu)?', type: 'multiple-choice', options: ['食べた', '食べいた', '食べった', '食べだ'], correctAnswer: '食べた', explanation: 'Group II ru-verbs drop masu and add ta (tabeta).' }]
  },

  {
    id: 'lesson_20',
    number: 20,
    dayNumber: 20,
    title: 'Plain and Polite Speech',
    titleEn: 'Casual Plain Style (普通形) vs Formal Polite Style',
    titleBn: 'সাধারণ কথোপকথন বনাম ভদ্র রীতি',
    descriptionEn: 'Understanding conversational registers: when to use plain style (friends, family, peers) versus polite style (public, superiors, strangers).',
    descriptionBn: 'বন্ধু ও পরিবারের সাথে অনানুষ্ঠানিক ভাষা এবং অফিসে ভদ্র ভাষার পার্থক্য।',
    estimatedMinutes: 25,
    objectives: ['Understand the differences between polite (teineigo) and plain (futsuugo)', 'Practice converting sentences into plain form', 'Learn natural particle omission in casual speech'],
    vocabulary: [
      { id: 'v20_1', japanese: '要ります', kana: 'いります', romaji: 'irimasu', english: 'need / require', bangla: 'প্রয়োজন হওয়া', partOfSpeech: 'verb-i', lesson: 20, isVerifiedTextbook: true },
      { id: 'v20_2', japanese: '調べます', kana: 'しらべます', romaji: 'shirabemasu', english: 'check / investigate', bangla: 'যাচাই করা', partOfSpeech: 'verb-ii', lesson: 20, isVerifiedTextbook: true },
      { id: 'v20_3', japanese: '僕', kana: 'ぼく', romaji: 'boku', english: 'I (casual male)', bangla: 'আমি (অনানুষ্ঠানিক পুরুষ)', partOfSpeech: 'pronoun', lesson: 20, isVerifiedTextbook: true },
      { id: 'v20_4', japanese: '君', kana: 'きみ', romaji: 'kimi', english: 'you (casual peer)', bangla: 'তুমি', partOfSpeech: 'pronoun', lesson: 20, isVerifiedTextbook: true },
    ],
    grammarPoints: [
      {
        id: 'g20_1',
        lesson: 20,
        pattern: 'Plain Form Conversational Rules',
        titleEn: 'Plain Style Table & Intonation',
        titleBn: 'অনানুষ্ঠানিক ভাষার নিয়ম',
        explanationEn: 'In casual plain speech, です is replaced by だ (or dropped), questions use rising intonation without か, and particles are often omitted.',
        explanationBn: 'ঘনিষ্ঠ আড্ডায় です এর বদলে だ বসে এবং বাক্যের শেষে か না বলে কণ্ঠস্বর উঁচু করে প্রশ্ন করা হয়।',
        structure: [{ label: 'Plain verb / adj / noun', type: 'predicate' }],
        examples: [{ japanese: 'コーヒー 飲む？ ―― うん、飲む。', kana: 'こーひー のむ？ ―― うん、のむ。', romaji: 'Koohii nomu? -- Un, nomu.', english: 'Drink coffee? -- Yeah, I will.', bangla: 'কফি খাবে? -- হ্যাঁ, খাব।' }]
      }
    ],
    quiz: [{ id: 'q20_1', question: 'What is the plain affirmative equivalent of 行きます (ikimasu)?', type: 'multiple-choice', options: ['行く', '行かない', '行った', '行くだ'], correctAnswer: '行く', explanation: 'The dictionary form 行く (iku) is the plain non-past affirmative.' }]
  },

  {
    id: 'lesson_21',
    number: 21,
    dayNumber: 21,
    title: 'Opinions and Quotations',
    titleEn: 'Personal Conjectures (〜と思います) & Quoted Speech (〜と言います)',
    titleBn: 'মতামত প্রকাশ ও উদ্ধৃতি',
    descriptionEn: 'Express personal thoughts/opinions (plain form + to omoimasu), quote what someone said (to iimasu), and seek agreement with deshou.',
    descriptionBn: 'নিজের মতামত দেওয়া ("আমি মনে করি...") এবং অন্যের বক্তব্য উদ্ধৃত করা।',
    estimatedMinutes: 25,
    objectives: ['Express opinion: Plain form + と 思います', 'Report speech: Plain form + と 言いました', 'Seek confirmation: でしょう？'],
    vocabulary: [
      { id: 'v21_1', japanese: '考えます', kana: 'かんがえます', romaji: 'kangaemasu', english: 'think / consider', bangla: 'চিন্তা করা', partOfSpeech: 'verb-ii', lesson: 21, isVerifiedTextbook: true },
      { id: 'v21_2', japanese: '言います', kana: 'いいます', romaji: 'iimasu', english: 'say', bangla: 'বলা', partOfSpeech: 'verb-i', lesson: 21, isVerifiedTextbook: true },
      { id: 'v21_3', japanese: '勝ちます', kana: 'かちます', romaji: 'kachimasu', english: 'win', bangla: 'জেতা', partOfSpeech: 'verb-i', lesson: 21, isVerifiedTextbook: true },
      { id: 'v21_4', japanese: '役に立ちます', kana: 'やくにたちます', romaji: 'yaku ni tachimasu', english: 'be useful', bangla: 'কাজে আসা / উপকারী', partOfSpeech: 'verb-i', lesson: 21, isVerifiedTextbook: true },
    ],
    grammarPoints: [
      {
        id: 'g21_1',
        lesson: 21,
        pattern: 'Plain form + と 思います',
        titleEn: 'I think that...',
        titleBn: 'আমি মনে করি যে...',
        explanationEn: 'The clause before と takes the plain form, expressing the speaker’s conjecture or personal opinion.',
        explanationBn: 'と এর আগের বাক্যটি সাধারণ রূপে বসে এবং নিজের অনুমান বা মতামত প্রকাশ করে।',
        structure: [{ label: 'Plain Clause', type: 'topic' }, { label: 'と 思います', type: 'predicate' }],
        examples: [{ japanese: 'あしたは 雨が 降ると 思います。', kana: 'あしたは あめが ふると おもいます。', romaji: 'Ashita wa ame ga furu to omoimasu.', english: 'I think it will rain tomorrow.', bangla: 'আমি মনে করি আগামীকাল বৃষ্টি হবে।' }]
      }
    ],
    quiz: [{ id: 'q21_1', question: 'Fill in the blank: 日本は べんりだ（　）おもいます。', type: 'multiple-choice', options: ['と', 'を', 'に', 'が'], correctAnswer: 'と', explanation: 'Particle と serves as the quotation particle before 思います.' }]
  },

  {
    id: 'lesson_22',
    number: 22,
    dayNumber: 22,
    title: 'Noun Modification and Relative Clauses',
    titleEn: 'Relative Clauses (Clauses Modifying a Noun)',
    titleBn: 'বিশেষ্য সম্প্রসারণ ও আপেক্ষিক বাক্যাংশ',
    descriptionEn: 'Learn how to describe and modify nouns with entire plain sentences (e.g. "The cake I baked", "The person who lives in Tokyo").',
    descriptionBn: 'কোনো বিশেষ্যকে আস্ত একটি ছোট বাক্য দিয়ে অলংকৃত বা বর্ণনা করা।',
    estimatedMinutes: 25,
    objectives: ['Form relative clauses in plain form directly preceding nouns', 'Use particle が for subjects within modifying clauses', 'Express time/appointment to do something: V-dict 時間/約束'],
    vocabulary: [
      { id: 'v22_1', japanese: '着ます', kana: 'きます', romaji: 'kimasu', english: 'put on (shirt/jacket)', bangla: 'পোশাক পরা', partOfSpeech: 'verb-ii', lesson: 22, isVerifiedTextbook: true },
      { id: 'v22_2', japanese: '履きます', kana: 'はきます', romaji: 'hakimasu', english: 'put on (shoes/pants)', bangla: 'জুতো/প্যান্ট পরা', partOfSpeech: 'verb-i', lesson: 22, isVerifiedTextbook: true },
      { id: 'v22_3', japanese: '眼鏡', kana: 'めがね', romaji: 'megane', english: 'glasses', bangla: 'চশমা', partOfSpeech: 'noun', lesson: 22, isVerifiedTextbook: true },
      { id: 'v22_4', japanese: '帽子', kana: 'ぼうし', romaji: 'boushi', english: 'hat / cap', bangla: 'টুপি', partOfSpeech: 'noun', lesson: 22, isVerifiedTextbook: true },
    ],
    grammarPoints: [
      {
        id: 'g22_1',
        lesson: 22,
        pattern: 'Plain Clause + Noun',
        titleEn: 'Noun-Modifying Clause',
        titleBn: 'বিশেষ্য বর্ণনাকারী আপেক্ষিক বাক্য',
        explanationEn: 'In Japanese, the modifying clause ALWAYS precedes the noun directly. The internal subject takes が, never は.',
        explanationBn: 'জাপানি ভাষায় বর্ণনাকারী ছোট বাক্যটি সরাসরি বিশেষ্যের আগে বসে এবং তার ভেতরের কর্তা が নেয়।',
        structure: [{ label: 'Modifying Clause (Subject が Verb-plain)', type: 'topic' }, { label: 'Noun Modified', type: 'predicate' }],
        examples: [{ japanese: 'わたしが 作った ケーキです。', kana: 'わたしが つくった けーきです。', romaji: 'Watashi ga tsukutta keeki desu.', english: 'This is the cake that I baked.', bangla: 'এটি আমার তৈরি করা কেক।' }]
      }
    ],
    quiz: [{ id: 'q22_1', question: 'Which particle marks the subject inside a relative clause?', type: 'multiple-choice', options: ['が', 'は', 'で', 'へ'], correctAnswer: 'が', explanation: 'Inside relative clauses, subjects are marked with が, not は.' }]
  },

  {
    id: 'lesson_23',
    number: 23,
    dayNumber: 23,
    title: 'Conditional When and Consequences',
    titleEn: 'Natural Inevitability (Vと) & Time Conditions (〜とき)',
    titleBn: 'স্বাভাবিক শর্ত ও সময়ভিত্তিক প্রেক্ষাপট',
    descriptionEn: 'Using V dictionary form + と for inevitable consequences or machine directions, and とき for "when doing something".',
    descriptionBn: 'বোতাম টিপলে স্বাভাবিকভাবে যা ঘটে (と) এবং "করার সময়" (とき)।',
    estimatedMinutes: 25,
    objectives: ['Use V-dict + と for inevitable natural results', 'Use とき with dictionary form vs past ta-form', 'Describe routes traversed with motion verbs + を'],
    vocabulary: [
      { id: 'v23_1', japanese: '探します', kana: 'さがします', romaji: 'sagashimasu', english: 'look for / search', bangla: 'খোঁজা', partOfSpeech: 'verb-i', lesson: 23, isVerifiedTextbook: true },
      { id: 'v23_2', japanese: '遅れます', kana: 'おくれます', romaji: 'okuremasu', english: 'be late', bangla: 'দেরি হওয়া', partOfSpeech: 'verb-ii', lesson: 23, isVerifiedTextbook: true },
      { id: 'v23_3', japanese: '間に合います', kana: 'まにあいます', romaji: 'maniamasu', english: 'be in time for', bangla: 'সময়মতো পৌঁছানো', partOfSpeech: 'verb-i', lesson: 23, isVerifiedTextbook: true },
    ],
    grammarPoints: [
      {
        id: 'g23_1',
        lesson: 23,
        pattern: 'V-dict + と、～',
        titleEn: 'Inevitable Natural Consequence ("When/If")',
        titleBn: 'অনিবার্য পরিণতি ("করলে")',
        explanationEn: 'Indicates that if action A occurs, consequence B naturally and inevitably follows.',
        explanationBn: 'প্রথম কাজটি করলে প্রাকৃতিকভাবেই পরের পরিণতিটি ঘটে।',
        structure: [{ label: 'V-dictionary', type: 'verb' }, { label: 'と', type: 'particle' }, { label: 'Consequence', type: 'predicate' }],
        examples: [{ japanese: 'このボタンを 押すと、おつりが 出ます。', kana: 'このぼたんを おすと、おつりが でます।', romaji: 'Kono botan o osu to, otsuri ga demasu.', english: 'If you press this button, the change comes out.', bangla: 'এই বোতামটি চাপলে অবশিষ্ট টাকা বের হয়ে আসবে।' }]
      }
    ],
    quiz: [{ id: 'q23_1', question: 'Which pattern shows that pressing a button makes a door open automatically?', type: 'multiple-choice', options: ['押すと、開きます', '押したら、開きます', '押しても、開きます', '押して、開きます'], correctAnswer: '押すと、開きます', explanation: 'V-dict + と indicates inevitable mechanical or natural consequences.' }]
  },

  {
    id: 'lesson_24',
    number: 24,
    dayNumber: 24,
    title: 'Giving and Receiving Favors',
    titleEn: 'Benefactive Verbs (Vてあげます, Vてもらいます, Vてくれます)',
    titleBn: 'উপকার করা ও নেওয়া (সেবা আদান-প্রদান)',
    descriptionEn: 'Express doing favors for others (te agemasu), having favors done for you (te moraimasu), and someone doing a favor for you (te kuremasu).',
    descriptionBn: 'অন্যের উপকার করে দেওয়া, কারো থেকে উপকার পাওয়া বা নিজের জন্য কেউ কিছু করে দেওয়া।',
    estimatedMinutes: 25,
    objectives: ['Distinguish あげます, もらいます, and くれます', 'Express doing a favor: Vてあげます', 'Express receiving a favor: Vてもらいます / Vてくれます'],
    vocabulary: [
      { id: 'v24_1', japanese: '直します', kana: 'なおします', romaji: 'naoshimasu', english: 'repair / fix', bangla: 'মেরামত করা', partOfSpeech: 'verb-i', lesson: 24, isVerifiedTextbook: true },
      { id: 'v24_2', japanese: '連れて行きます', kana: 'つれていきます', romaji: 'tsureteikimasu', english: 'take someone along', bangla: 'কাউকে সাথে নিয়ে যাওয়া', partOfSpeech: 'verb-i', lesson: 24, isVerifiedTextbook: true },
      { id: 'v24_3', japanese: '紹介します', kana: 'しょうかいします', romaji: 'shoukaishimasu', english: 'introduce', bangla: 'পরিচয় করিয়ে দেওয়া', partOfSpeech: 'verb-iii', lesson: 24, isVerifiedTextbook: true },
      { id: 'v24_4', japanese: '説明します', kana: 'せつめいします', romaji: 'setsumeishimasu', english: 'explain', bangla: 'ব্যাখ্যা করা', partOfSpeech: 'verb-iii', lesson: 24, isVerifiedTextbook: true },
    ],
    grammarPoints: [
      {
        id: 'g24_1',
        lesson: 24,
        pattern: 'Vて あげます / もらいます / くれます',
        titleEn: 'Benefactive Giving and Receiving Services',
        titleBn: 'কাজের মাধ্যমে উপকার করা বা নেওয়া',
        explanationEn: 'くれる is used when someone does an action for the speaker or speaker\'s family. もらう means receiving a favor from someone.',
        explanationBn: 'কেউ যখন বক্তার উপকার করে দেয় তখন くれます বসে। কারো থেকে উপকার পেলে もらいます বসে।',
        structure: [{ label: 'Benefactor / Recipient', type: 'topic' }, { label: 'V-te', type: 'verb' }, { label: 'あげます / くれます / もらいます', type: 'predicate' }],
        examples: [{ japanese: '山田さんは 傘を 貸してくれました。', kana: 'やまださんは かさを かしてくれました。', romaji: 'Yamada-san wa kasa o kashite kuremashita.', english: 'Mr. Yamada kindly lent me an umbrella.', bangla: 'মিঃ ইয়ামাদা আমাকে ছাতা ধার দিয়েছিলেন।' }]
      }
    ],
    quiz: [{ id: 'q24_1', question: 'When someone kindly does a favor FOR YOU, which verb is used?', type: 'multiple-choice', options: ['くれます', 'あげます', 'もらいます', 'やります'], correctAnswer: 'くれます', explanation: 'くれます signifies giving or doing a favor for the speaker.' }]
  },

  {
    id: 'lesson_25',
    number: 25,
    dayNumber: 25,
    title: 'Conditionals and Concessions',
    titleEn: 'The Tara Conditional (〜たら) & Concessions (〜ても)',
    titleBn: 'শর্তসাপেক্ষ বাক্য ও ছাড় প্রদান',
    descriptionEn: 'The comprehensive conditional form (plain past + ra), actions completed in the future, and concessions ("even if", temo).',
    descriptionBn: 'শর্তবাচক "যদি/করলে" (たら) এবং ছাড়বাচক "এমনকি হলেও" (ても)।',
    estimatedMinutes: 30,
    objectives: ['Master the tara conditional: Plain past + ら', 'Express subsequent actions: 10時になったら、出かけましょう', 'Express concessions: Vなくても / い-adj くても / な-adj でも'],
    vocabulary: [
      { id: 'v25_1', japanese: '着きます', kana: 'つきます', romaji: 'tsukimasu', english: 'arrive', bangla: 'পৌঁছানো', partOfSpeech: 'verb-i', lesson: 25, isVerifiedTextbook: true },
      { id: 'v25_2', japanese: '足ります', kana: 'たります', romaji: 'tarimasu', english: 'be sufficient / enough', bangla: 'যথেষ্ট হওয়া', partOfSpeech: 'verb-ii', lesson: 25, isVerifiedTextbook: true },
      { id: 'v25_3', japanese: '田舎', kana: 'いなか', romaji: 'inaka', english: 'countryside / hometown', bangla: 'গ্রামের বাড়ি', partOfSpeech: 'noun', lesson: 25, isVerifiedTextbook: true },
      { id: 'v25_4', japanese: 'もし', kana: 'もし', romaji: 'moshi', english: 'if (supposition)', bangla: 'যদি', partOfSpeech: 'adverb', lesson: 25, isVerifiedTextbook: true },
    ],
    grammarPoints: [
      {
        id: 'g25_1',
        lesson: 25,
        pattern: 'Vたら、～ (Conditional)',
        titleEn: 'Tara Conditional Clause ("If / When")',
        titleBn: 'তারা শর্তসাপেক্ষ বাক্য ("করলে / হলে")',
        explanationEn: 'Attach ら to the plain past form (ta-form). If the condition is fulfilled, the main clause is executed.',
        explanationBn: 'অতীত রূপের (তা-রূপ) সাথে ら যুক্ত করে শর্ত গঠন করা হয়।',
        structure: [{ label: 'V-ta / Past + ら', type: 'verb' }, { label: 'Main Clause', type: 'predicate' }],
        examples: [{ japanese: '雨が 降ったら、出かけません。', kana: 'あめが ふったら、でかけません。', romaji: 'Ame ga futtara, dekakemasen.', english: 'If it rains, I will not go out.', bangla: 'যদি বৃষ্টি হয়, তবে আমি বের হব না।' }]
      },
      {
        id: 'g25_2',
        lesson: 25,
        pattern: 'Vても / Adj くても / N でも',
        titleEn: 'Concessive Clause ("Even if / Although")',
        titleBn: 'ছাড়বাচক বাক্য ("এমনকি হলেও")',
        explanationEn: 'Expresses that the consequence in the main clause will hold true even if the condition occurs.',
        explanationBn: 'শর্তটি সত্য হলেও মূল বিষয়টি অপরিবর্তিত থাকবে বোঝায় ("বৃষ্টি হলেও বের হব")।',
        structure: [{ label: 'V-te + も', type: 'verb' }, { label: 'Main Clause', type: 'predicate' }],
        examples: [{ japanese: '雨が 降っても、出かけます。', kana: 'あめが ふっても、でかけます。', romaji: 'Ame ga futtemo, dekakemasu.', english: 'Even if it rains, I will go out.', bangla: 'বৃষ্টি হলেও আমি বের হব।' }]
      }
    ],
    quiz: [
      {
        id: 'q25_1',
        question: 'How do you say "If I have money, I will buy a car"?',
        type: 'multiple-choice',
        options: [
          'お金が あったら、車を 買います',
          'お金が あると、車を 買います',
          'お金が あっても、車を 買います',
          'お金が あれば、車を 買います'
        ],
        correctAnswer: 'お金が あったら、車を 買います',
        explanation: 'Past ta-form (atta) + ra gives the tara conditional.'
      }
    ]
  }
];

// Helper to get all vocabulary flattened
export const ALL_VOCABULARY = LESSONS_DATA.flatMap(l => l.vocabulary);
