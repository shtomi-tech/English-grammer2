// 時制変換問題のデータ（動詞穴埋め形式＋日本語訳）
const tenseConversionProblems = [
    // 過去形への変換
    {
        original: "I go to school every day.",
        blanked: "I ____ to school every day.",
        japanese: "私は毎日学校に行く。",
        target: "過去形",
        correctVerb: "went",
        hint: "goの過去形はwentです。",
        explanation: "go → went（不規則変化）"
    },
    {
        original: "She sees a beautiful sunset.",
        blanked: "She ____ a beautiful sunset.",
        japanese: "彼女は美しい夕日を見る。",
        target: "過去形",
        correctVerb: "saw",
        hint: "seeの過去形はsawです。",
        explanation: "see → saw（不規則変化）"
    },
    {
        original: "He takes the book from the shelf.",
        blanked: "He ____ the book from the shelf.",
        japanese: "彼は棚から本を取る。",
        target: "過去形",
        correctVerb: "took",
        hint: "takeの過去形はtookです。",
        explanation: "take → took（不規則変化）"
    },
    {
        original: "They make dinner together.",
        blanked: "They ____ dinner together.",
        japanese: "彼らは一緒に夕食を作る。",
        target: "過去形",
        correctVerb: "made",
        hint: "makeの過去形はmadeです。",
        explanation: "make → made（不規則変化）"
    },
    {
        original: "We buy groceries at the store.",
        blanked: "We ____ groceries at the store.",
        japanese: "私たちはお店で食料品を買う。",
        target: "過去形",
        correctVerb: "bought",
        hint: "buyの過去形はboughtです。",
        explanation: "buy → bought（不規則変化）"
    },
    // 完了形への変換
    {
        original: "I go to Paris.",
        blanked: "I have ____ to Paris.",
        japanese: "私はパリに行く。",
        target: "現在完了形",
        correctVerb: "gone",
        hint: "goの過去分詞形はgoneです。",
        explanation: "go → gone（過去分詞）"
    },
    {
        original: "She sees that movie.",
        blanked: "She has ____ that movie.",
        japanese: "彼女はその映画を見る。",
        target: "現在完了形",
        correctVerb: "seen",
        hint: "seeの過去分詞形はseenです。",
        explanation: "see → seen（過去分詞）"
    },
    {
        original: "He writes a letter.",
        blanked: "He has ____ a letter.",
        japanese: "彼は手紙を書く。",
        target: "現在完了形",
        correctVerb: "written",
        hint: "writeの過去分詞形はwrittenです。",
        explanation: "write → written（過去分詞）"
    },
    {
        original: "They make great progress.",
        blanked: "They have ____ great progress.",
        japanese: "彼らは大きな進歩を遂げる。",
        target: "現在完了形",
        correctVerb: "made",
        hint: "makeの過去分詞形はmadeです。",
        explanation: "make → made（過去分詞）"
    },
    {
        original: "We buy a new car.",
        blanked: "We have ____ a new car.",
        japanese: "私たちは新しい車を買う。",
        target: "現在完了形",
        correctVerb: "bought",
        hint: "buyの過去分詞形はboughtです。",
        explanation: "buy → bought（過去分詞）"
    },
    // 受動態への変換
    {
        original: "He writes the letter.",
        blanked: "The letter is ____ by him.",
        japanese: "その手紙は彼によって書かれる。",
        target: "受動態",
        correctVerb: "written",
        hint: "writeの過去分詞はwrittenです。",
        explanation: "write → written（過去分詞）"
    },
    {
        original: "They build the house.",
        blanked: "The house is ____ by them.",
        japanese: "その家は彼らによって建てられる。",
        target: "受動態",
        correctVerb: "built",
        hint: "buildの過去分詞はbuiltです。",
        explanation: "build → built（過去分詞）"
    },
    {
        original: "She takes the book.",
        blanked: "The book is ____ by her.",
        japanese: "その本は彼女によって取られる。",
        target: "受動態",
        correctVerb: "taken",
        hint: "takeの過去分詞はtakenです。",
        explanation: "take → taken（過去分詞）"
    },
    {
        original: "We make the decision.",
        blanked: "The decision is ____ by us.",
        japanese: "その決定は私たちによってなされる。",
        target: "受動態",
        correctVerb: "made",
        hint: "makeの過去分詞はmadeです。",
        explanation: "make → made（過去分詞）"
    },
    {
        original: "He sends the email.",
        blanked: "The email is ____ by him.",
        japanese: "そのメールは彼によって送られる。",
        target: "受動態",
        correctVerb: "sent",
        hint: "sendの過去分詞はsentです。",
        explanation: "send → sent（過去分詞）"
    },
    {
        original: "He finds the key.",
        blanked: "He ____ the key.",
        japanese: "彼はその鍵を見つける。",
        target: "過去形",
        correctVerb: "found",
        hint: "findの過去形はfoundです。",
        explanation: "find → found（不規則変化）"
    },
    {
        original: "They leave the house.",
        blanked: "They ____ the house.",
        japanese: "彼らは家を出る。",
        target: "過去形",
        correctVerb: "left",
        hint: "leaveの過去形はleftです。",
        explanation: "leave → left（不規則変化）"
    },
    {
        original: "She has already eaten breakfast.",
        blanked: "She has already ____ breakfast.",
        japanese: "彼女はすでに朝食を食べた。",
        target: "過去分詞",
        correctVerb: "eaten",
        hint: "eatの過去分詞はeatenです。",
        explanation: "eat → eaten（過去分詞）"
    },
    {
        original: "Did you read the book?",
        blanked: "Did you ____ the book?",
        japanese: "あなたはその本を読みましたか？",
        target: "原形",
        correctVerb: "read",
        hint: "助動詞の後は動詞の原形です。",
        explanation: "read（原形）"
    },
    {
        original: "The window was broken by the wind.",
        blanked: "The window was ____ by the wind.",
        japanese: "その窓は風によって壊された。",
        target: "過去分詞",
        correctVerb: "broken",
        hint: "breakの過去分詞はbrokenです。",
        explanation: "break → broken（過去分詞）"
    },
    {
        original: "He began to speak.",
        blanked: "He ____ to speak.",
        japanese: "彼は話し始めた。",
        target: "過去形",
        correctVerb: "began",
        hint: "beginの過去形はbeganです。",
        explanation: "begin → began（不規則変化）"
    },
    {
        original: "She has drunk all the milk.",
        blanked: "She has ____ all the milk.",
        japanese: "彼女は牛乳を全部飲んでしまった。",
        target: "過去分詞",
        correctVerb: "drunk",
        hint: "drinkの過去分詞はdrunkです。",
        explanation: "drink → drunk（過去分詞）"
    },
    {
        original: "They ran in the park.",
        blanked: "They ____ in the park.",
        japanese: "彼らは公園で走った。",
        target: "過去形",
        correctVerb: "ran",
        hint: "runの過去形はranです。",
        explanation: "run → ran（不規則変化）"
    },
    {
        original: "The story was told by my father.",
        blanked: "The story was ____ by my father.",
        japanese: "その話は父によって語られた。",
        target: "過去分詞",
        correctVerb: "told",
        hint: "tellの過去分詞はtoldです。",
        explanation: "tell → told（過去分詞）"
    },
    {
        original: "She gave me a present.",
        blanked: "She ____ me a present.",
        japanese: "彼女は私にプレゼントをくれた。",
        target: "過去形",
        correctVerb: "gave",
        hint: "giveの過去形はgaveです。",
        explanation: "give → gave（不規則変化）"
    }
];

class TenseConversionPractice {
    constructor() {
        this.currentProblem = null;
        this.currentProblemIndex = 0;
        this.totalProblems = 10;
        this.practiceActive = false;
        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        document.getElementById('start-practice').addEventListener('click', () => {
            this.startPractice();
        });

        document.getElementById('check-answer').addEventListener('click', () => {
            this.checkAnswer();
        });

        document.getElementById('next-question').addEventListener('click', () => {
            this.nextQuestion();
        });

        document.getElementById('show-explanation').addEventListener('click', () => {
            this.showExplanation();
        });

        // Enterキーで回答チェック
        document.getElementById('user-answer').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.checkAnswer();
            }
        });
    }

    startPractice() {
        this.practiceActive = true;
        this.currentProblemIndex = 0;
        document.getElementById('start-area').classList.add('hidden');
        // hiddenクラスを必ず外す
        const area = document.getElementById('tense-practice-area');
        area.classList.remove('hidden');
        area.style.display = '';
        // 問題リストをシャッフル
        this.shuffledProblems = this.shuffleArray([...tenseConversionProblems]);
        this.loadQuestion();
    }

    // 配列をシャッフルする関数を追加
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    loadQuestion() {
        if (this.currentProblemIndex >= this.totalProblems) {
            this.showCompletion();
            return;
        }
        this.currentProblem = this.shuffledProblems[this.currentProblemIndex];
        // 問題表示
        document.getElementById('question-number').textContent = `${this.currentProblemIndex + 1} / ${this.totalProblems}`;
        document.getElementById('original-sentence').textContent = this.currentProblem.blanked;
        document.getElementById('target-tense').textContent = this.currentProblem.target;
        // 日本語訳を表示
        document.getElementById('japanese-translation').textContent = `日本語訳: ${this.currentProblem.japanese}`;
        // 入力フィールドをクリア
        document.getElementById('user-answer').value = '';
        // 結果エリアを隠す
        document.getElementById('result-area').classList.add('hidden');
        document.getElementById('explanation-area').classList.add('hidden');
        document.getElementById('hint-area').classList.add('hidden');
        // 入力フィールドにフォーカス
        document.getElementById('user-answer').focus();
    }

    checkAnswer() {
        const userAnswer = document.getElementById('user-answer').value.trim();
        const correctVerb = this.currentProblem.correctVerb;
        // 大文字小文字無視で判定
        const isCorrect = userAnswer.toLowerCase() === correctVerb.toLowerCase();
        this.showResult(isCorrect, userAnswer, correctVerb);
    }

    showResult(isCorrect, userAnswer, correctVerb) {
        const resultArea = document.getElementById('result-area');
        const resultMessage = document.getElementById('result-message');
        if (isCorrect) {
            resultMessage.className = 'text-center p-5 rounded-xl mb-4 text-lg font-bold bg-green-100 text-green-800 border border-green-200';
            resultMessage.innerHTML = `
                <div class="text-lg font-bold mb-2">正解！</div>
                <div class="text-sm">
                    あなたの回答: <strong>${userAnswer}</strong><br>
                    正解: <strong>${correctVerb}</strong>
                </div>
            `;
        } else {
            resultMessage.className = 'text-center p-5 rounded-xl mb-4 text-lg font-bold bg-red-100 text-red-800 border border-red-200';
            resultMessage.innerHTML = `
                <div class="text-lg font-bold mb-2">不正解</div>
                <div class="text-sm">
                    あなたの回答: <strong>${userAnswer}</strong><br>
                    正解: <strong>${correctVerb}</strong>
                </div>
            `;
        }
        resultArea.classList.remove('hidden');
        this.practiceActive = false;
    }

    showExplanation() {
        const explanationArea = document.getElementById('explanation-area');
        const explanationContent = document.getElementById('explanation-content');
        
        explanationContent.innerHTML = this.currentProblem.explanation.replace(/\n/g, '<br>');
        explanationArea.classList.remove('hidden');
    }

    nextQuestion() {
        this.currentProblemIndex++;
        this.loadQuestion();
    }

    showCompletion() {
        document.getElementById('tense-practice-area').innerHTML = `
            <div class="text-center p-8">
                <div class="text-4xl mb-4">🎉</div>
                <h3 class="text-2xl font-bold text-green-600 mb-4">練習完了！</h3>
                <p class="text-gray-600 mb-6">時制変換の練習が完了しました。</p>
                <button id="restart-practice" class="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg">
                    もう一度練習する
                </button>
            </div>
        `;
        
        document.getElementById('restart-practice').addEventListener('click', () => {
            this.startPractice();
        });
    }
}

// 練習を初期化
function initTensePractice() {
    if (document.getElementById('start-practice')) {
        new TenseConversionPractice();
    } else {
        setTimeout(initTensePractice, 100);
    }
}

// DOMContentLoadedとページ読み込み完了の両方で初期化を試行
document.addEventListener('DOMContentLoaded', initTensePractice);
window.addEventListener('load', initTensePractice); 