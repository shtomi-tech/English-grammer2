// 静的データファイル - GitHub Pages用
const STATIC_QUESTIONS = {
    // 品詞の問題
    noun: [
        {
            question: "次の文の空所に入る適切な名詞を選びなさい。<br>I bought a new ___ for my computer.",
            options: [
                { text: "mouse", correct: true },
                { text: "mouses", correct: false },
                { text: "mice", correct: false },
                { text: "mouses", correct: false }
            ],
            explanation: "「mouse」は可算名詞で、複数形は「mice」です。コンピュータのマウスを指す場合は「mouse」が正解です。",
            difficulty: "基礎",
            exam_type: "英検3級レベル"
        }
    ],
    article: [
        {
            question: "次の文の空所に入る適切な冠詞を選びなさい。<br>I saw ___ elephant at the zoo.",
            options: [
                { text: "a", correct: false },
                { text: "an", correct: true },
                { text: "the", correct: false },
                { text: "no article", correct: false }
            ],
            explanation: "「elephant」は母音で始まる単語なので、不定冠詞は「an」を使います。",
            difficulty: "基礎",
            exam_type: "英検3級レベル"
        }
    ],
    verb: [
        {
            question: "次の文の空所に入る適切な動詞を選びなさい。<br>She ___ to school every day.",
            options: [
                { text: "go", correct: false },
                { text: "goes", correct: true },
                { text: "going", correct: false },
                { text: "went", correct: false }
            ],
            explanation: "主語が三人称単数（She）で、現在形なので「goes」が正解です。",
            difficulty: "基礎",
            exam_type: "英検3級レベル"
        }
    ],
    // 文型の問題
    pattern1: [
        {
            question: "次の文の文型を選びなさい。<br>The bird flies.",
            options: [
                { text: "第1文型（S+V）", correct: true },
                { text: "第2文型（S+V+C）", correct: false },
                { text: "第3文型（S+V+O）", correct: false },
                { text: "第4文型（S+V+O1+O2）", correct: false }
            ],
            explanation: "主語（The bird）+ 自動詞（flies）の構造なので第1文型です。",
            difficulty: "基礎",
            exam_type: "英検3級レベル"
        }
    ],
    pattern2: [
        {
            question: "次の文の文型を選びなさい。<br>He is a student.",
            options: [
                { text: "第1文型（S+V）", correct: false },
                { text: "第2文型（S+V+C）", correct: true },
                { text: "第3文型（S+V+O）", correct: false },
                { text: "第4文型（S+V+O1+O2）", correct: false }
            ],
            explanation: "主語（He）+ be動詞（is）+ 補語（a student）の構造なので第2文型です。",
            difficulty: "基礎",
            exam_type: "英検3級レベル"
        }
    ],
    // 時制の問題
    present_tense: [
        {
            question: "次の文の時制を選びなさい。<br>I study English every day.",
            options: [
                { text: "現在形", correct: true },
                { text: "現在進行形", correct: false },
                { text: "現在完了形", correct: false },
                { text: "過去形", correct: false }
            ],
            explanation: "「study」は現在形で、習慣的な動作を表しています。",
            difficulty: "基礎",
            exam_type: "英検3級レベル"
        }
    ],
    // 助動詞の問題
    can: [
        {
            question: "次の文の助動詞の用法を選びなさい。<br>I can swim.",
            options: [
                { text: "能力", correct: true },
                { text: "許可", correct: false },
                { text: "依頼", correct: false },
                { text: "推量", correct: false }
            ],
            explanation: "「can swim」は「泳げる」という能力を表しています。",
            difficulty: "基礎",
            exam_type: "英検3級レベル"
        }
    ],
    // 比較の問題
    comparative: [
        {
            question: "次の文の比較級を正しく選びなさい。<br>This book is ___ than that one.",
            options: [
                { text: "more interesting", correct: true },
                { text: "more interestinger", correct: false },
                { text: "interestinger", correct: false },
                { text: "most interesting", correct: false }
            ],
            explanation: "「interesting」は3音節以上の形容詞なので「more + 原級」の形で比較級を作ります。",
            difficulty: "標準",
            exam_type: "英検準2級レベル"
        }
    ]
};

// 英作文の静的データ
const STATIC_WRITING_QUESTIONS = {
    noun: {
        question: "あなたの好きな本について英語で説明してください。",
        hints: ["本のタイトル", "作者", "なぜ好きなのか", "簡単な英語で書く"]
    },
    article: {
        question: "あなたの家族について英語で説明してください。",
        hints: ["家族の人数", "それぞれの職業", "冠詞に注意", "be動詞を使う"]
    },
    verb: {
        question: "あなたの一日の生活について英語で説明してください。",
        hints: ["朝の習慣", "学校や仕事", "夕方の過ごし方", "現在形で書く"]
    }
};

// 和文英訳の静的データ
const STATIC_TRANSLATION_QUESTIONS = {
    noun: {
        question: "私は新しい車を買いました。",
        hints: ["I bought", "a new car", "過去形を使う"]
    },
    article: {
        question: "彼は医者です。",
        hints: ["He is", "a doctor", "冠詞に注意"]
    },
    verb: {
        question: "私は毎日英語を勉強します。",
        hints: ["I study", "English", "every day", "現在形を使う"]
    }
};

// 静的データを取得する関数
function getStaticQuestion(topic, difficulty = 'medium') {
    const questions = STATIC_QUESTIONS[topic];
    if (questions && questions.length > 0) {
        // 簡単なランダム選択（実際のランダムではないが、静的データ用）
        const index = Math.floor(Math.random() * questions.length);
        return questions[index];
    }
    return null;
}

// 静的英作文問題を取得する関数
function getStaticWritingQuestion(topic) {
    return STATIC_WRITING_QUESTIONS[topic] || null;
}

// 静的和文英訳問題を取得する関数
function getStaticTranslationQuestion(topic) {
    return STATIC_TRANSLATION_QUESTIONS[topic] || null;
} 