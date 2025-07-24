// アプリケーション設定
const AppConfig = {
  // API設定
  api: {
    baseUrl: process.env.NODE_ENV === 'production' 
      ? 'https://your-api-domain.com' 
      : 'http://localhost:3000',
    timeout: 30000,
    retryAttempts: 3
  },

  // 難易度設定
  difficulty: {
    levels: {
      easy: { 
        name: '英検3級レベル（初級）', 
        color: 'text-green-600',
        score: { min: 0, max: 40 }
      },
      medium: { 
        name: '英検準2級レベル（中級）', 
        color: 'text-yellow-600',
        score: { min: 41, max: 80 }
      },
      hard: { 
        name: '英検2級レベル（上級）', 
        color: 'text-red-600',
        score: { min: 81, max: 100 }
      },
      expert: { 
        name: '英検準1級レベル（最上級）', 
        color: 'text-purple-600',
        score: { min: 81, max: 100 }
      }
    },
    default: 'easy',
    maxPracticeCount: 5
  },

  // UI設定
  ui: {
    animations: {
      duration: 300,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
    },
    colors: {
      primary: {
        armyBlue: '#101841',
        coolishBlue: '#70acce',
        maldiveBlue: '#144da0'
      },
      background: {
        white: '#ffffff',
        glass: 'rgba(16, 24, 65, 0.1)',
        glassBorder: 'rgba(16, 24, 65, 0.2)'
      },
      text: {
        primary: '#101841',
        secondary: '#2d3748'
      }
    },
    breakpoints: {
      mobile: 768,
      tablet: 1024,
      desktop: 1200
    }
  },

  // 学習設定
  learning: {
    topics: {
      partsOfSpeech: [
        'noun', 'article', 'be-verb', 'verb', 'irregular-verbs',
        'adjective', 'adverb', 'preposition', 'conjunction', 'word-phrase-clause'
      ],
      sentencePatterns: [
        'pattern1', 'pattern2', 'pattern3', 'pattern4', 'pattern5',
        'passive-pattern3', 'passive-pattern4', 'passive-pattern5',
        'causative-verb', 'perception-verb', 'there-is'
      ],
      phrases: [
        'infinitive', 'be-to-infinitive', 'infinitive-gerund-identification',
        'infinitive-gerund-logical-subject', 'gerund', 'participle',
        'participle-construction', 'with-absolute-construction',
        'interrogative-to-infinitive', 'indirect-question'
      ],
      clauses: [
        'relative-pronoun', 'relative-pronoun-restrictive-nonrestrictive',
        'preposition-relative-pronoun', 'relative-adverb',
        'subordinating-conjunction', 'compound-relative-clause',
        'emphatic-construction'
      ],
      sentenceTypes: [
        'exclamatory-sentence', 'interrogative-sentence',
        'declarative-sentence', 'imperative-sentence', 'conditionals'
      ],
      tenses: [
        'present-tense', 'third-person-singular-present-s',
        'past-tense', 'perfect-tenses', 'tense-agreement'
      ],
      modals: [
        'auxiliary-verb-types', 'can-could', 'will-would',
        'may-might', 'must', 'should', 'shall', 'need', 'dare'
      ],
      subjunctive: [
        'formulas', 'inversion', 'if-less-subjunctive'
      ],
      comparison: [
        'comparative', 'superlative', 'positive'
      ]
    }
  },

  // エラーメッセージ
  messages: {
    errors: {
      apiConnection: 'サーバーとの接続に失敗しました。',
      questionGeneration: '問題の生成に失敗しました。もう一度お試しください。',
      answerSubmission: '解答の送信に失敗しました。もう一度お試しください。',
      invalidInput: '入力内容が正しくありません。',
      networkError: 'ネットワークエラーが発生しました。'
    },
    success: {
      questionGenerated: '問題が正常に生成されました。',
      answerSubmitted: '解答が正常に送信されました。',
      practiceCompleted: '練習が完了しました。お疲れさまでした！'
    }
  }
};

// 設定の検証
function validateConfig() {
  const requiredKeys = ['api', 'difficulty', 'ui', 'learning', 'messages'];
  for (const key of requiredKeys) {
    if (!AppConfig[key]) {
      throw new Error(`Required config key missing: ${key}`);
    }
  }
  return true;
}

// 設定をエクスポート
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { AppConfig, validateConfig };
} else if (typeof window !== 'undefined') {
  window.AppConfig = AppConfig;
  window.validateConfig = validateConfig;
} 