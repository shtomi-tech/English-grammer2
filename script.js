// バックエンドAPI設定
const API_BASE_URL = 'http://localhost:3000';

// 選択された難易度を取得する関数
function getSelectedDifficulty(generateBtnId) {
    const generateBtn = document.getElementById(generateBtnId);
    const difficultySelector = generateBtn.closest('.apple-ai-section').querySelector('.difficulty-selector');
    const activeBtn = difficultySelector.querySelector('.difficulty-btn.active');
    return activeBtn ? activeBtn.dataset.difficulty : 'medium';
}

// 英作文問題を表示する関数
function displayWritingQuestion(questionData, containerId, questionTextId, hintsId) {
    const questionContainer = document.getElementById(containerId);
    const questionText = document.getElementById(questionTextId);
    const hintsElement = document.getElementById(hintsId);

    // 問題文を設定
    questionText.innerHTML = questionData.question;

    // 解答欄をリセット
    const userAnswer = document.getElementById('userAnswer');
    if (userAnswer) userAnswer.value = '';

    // 添削結果をリセット
    const feedbackContainer = document.getElementById('feedback');
    const feedbackContent = document.getElementById('feedbackContent');
    if (feedbackContainer) feedbackContainer.classList.add('hidden');
    if (feedbackContent) feedbackContent.innerHTML = '';

    // ヒントを設定（存在する場合）
    if (questionData.hints && questionData.hints.length > 0) {
        hintsElement.innerHTML = `
            <div class="flex items-center justify-between mb-2">
                <strong>ヒント</strong>
                <button id="showHintsBtn" class="text-sm bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition-colors">
                    ヒントを表示
                </button>
            </div>
            <div id="hintsContent" class="hidden">
                ${questionData.hints.join('<br>')}
            </div>
        `;
        hintsElement.classList.remove('hidden');
        
        // ヒント表示ボタンのイベントリスナーを設定
        setTimeout(() => {
            const showHintsBtn = document.getElementById('showHintsBtn');
            const hintsContent = document.getElementById('hintsContent');
            
            if (showHintsBtn && hintsContent) {
                showHintsBtn.addEventListener('click', function() {
                    if (hintsContent.classList.contains('hidden')) {
                        hintsContent.classList.remove('hidden');
                        this.textContent = 'ヒントを隠す';
                    } else {
                        hintsContent.classList.add('hidden');
                        this.textContent = 'ヒントを表示';
                    }
                });
            }
        }, 100);
    } else {
        hintsElement.classList.add('hidden');
    }

    // コンテナを表示
    questionContainer.classList.remove('hidden');
}

// 英作文問題の添削結果を表示する関数
function displayWritingFeedback(feedbackData, feedbackId, feedbackContentId) {
    const feedbackContainer = document.getElementById(feedbackId);
    const feedbackContent = document.getElementById(feedbackContentId);

    let feedbackHTML = '';

    // 総合評価
    if (feedbackData.overallScore) {
        feedbackHTML += `
            <div class="bg-white p-4 rounded border">
                <h4 class="font-semibold text-gray-800 mb-2">総合評価</h4>
                <div class="flex items-center mb-2">
                    <span class="text-lg font-bold text-blue-600">${feedbackData.overallScore}/100</span>
                    <span class="ml-2 text-sm text-gray-600">点</span>
                </div>
                <p class="text-gray-700">${feedbackData.overallComment}</p>
            </div>
        `;
    }

    // 文法チェック
    if (feedbackData.grammarCheck) {
        feedbackHTML += `
            <div class="bg-white p-4 rounded border">
                <h4 class="font-semibold text-gray-800 mb-2">文法チェック</h4>
                <div class="space-y-2">
                    ${feedbackData.grammarCheck.map(item => `
                        <div class="flex items-start">
                            <span class="text-${item.type === 'error' ? 'red' : item.type === 'warning' ? 'yellow' : 'green'}-500 mr-2">●</span>
                            <div>
                                <p class="text-sm font-medium text-gray-800">${item.original}</p>
                                <p class="text-sm text-gray-600">→ ${item.suggestion}</p>
                                <p class="text-xs text-gray-500">${item.explanation}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    // 改善提案
    if (feedbackData.improvements) {
        feedbackHTML += `
            <div class="bg-white p-4 rounded border">
                <h4 class="font-semibold text-gray-800 mb-2">改善提案</h4>
                <ul class="list-disc list-inside space-y-1 text-sm text-gray-700">
                    ${feedbackData.improvements.map(improvement => `<li>${improvement}</li>`).join('')}
                </ul>
            </div>
        `;
    }

    // 模範解答
    if (feedbackData.modelAnswer) {
        feedbackHTML += `
            <div class="bg-white p-4 rounded border">
                <h4 class="font-semibold text-gray-800 mb-2">模範解答例</h4>
                <div class="bg-green-50 p-3 rounded border-l-4 border-green-400">
                    <p class="text-gray-800">${feedbackData.modelAnswer}</p>
                </div>
            </div>
        `;
    }

    feedbackContent.innerHTML = feedbackHTML;
    feedbackContainer.classList.remove('hidden');
}

// 和文英訳問題生成関数
async function generateWritingQuestion(topic, difficulty) {
    const generateBtn = document.getElementById('generateQuestion');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const questionContainer = document.getElementById('questionContainer');

    generateBtn.disabled = true;
    generateBtn.textContent = '生成中...';
    loadingIndicator.classList.remove('hidden');
    questionContainer.classList.add('hidden');

    try {
        const response = await fetch(`${API_BASE_URL}/api/generate-translation-question`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                topic: topic,
                difficulty: difficulty
            })
        });

        if (!response.ok) {
            throw new Error(`API request failed: ${response.status}`);
        }

        const result = await response.json();

        if (!result.success) {
            throw new Error(result.error || 'Failed to generate translation question');
        }

        displayWritingQuestion(result.data, 'questionContainer', 'question', 'hints');

    } catch (error) {
        console.error('Error generating translation question:', error);
        alert('和文英訳問題の生成に失敗しました。もう一度お試しください。');
    } finally {
        generateBtn.disabled = false;
        generateBtn.textContent = '新しい和文英訳問題を生成';
        loadingIndicator.classList.add('hidden');
    }
}

// 和文英訳添削関数
async function submitWritingAnswer(topic, userAnswer, difficulty) {
    const submitBtn = document.getElementById('submitAnswer');
    const feedbackContainer = document.getElementById('feedback');

    submitBtn.disabled = true;
    submitBtn.textContent = '添削中...';
    feedbackContainer.classList.add('hidden');

    try {
        const response = await fetch(`${API_BASE_URL}/api/grade-translation-answer`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                topic: topic,
                userAnswer: userAnswer,
                difficulty: difficulty
            })
        });

        if (!response.ok) {
            throw new Error(`API request failed: ${response.status}`);
        }

        const result = await response.json();

        if (!result.success) {
            throw new Error(result.error || 'Failed to grade translation answer');
        }

        displayWritingFeedback(result.data, 'feedback', 'feedbackContent');

    } catch (error) {
        console.error('Error grading translation answer:', error);
        alert('添削に失敗しました。もう一度お試しください。');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = '添削してもらう';
    }
}

// 和文英訳問題のイベントリスナーを設定
function setupWritingQuestionEventListeners(topic) {
    const generateBtn = document.getElementById('generateQuestion');
    const submitBtn = document.getElementById('submitAnswer');
    const difficultySelect = document.getElementById('difficulty');

    if (generateBtn) {
        generateBtn.addEventListener('click', function() {
            const difficulty = difficultySelect.value;
            generateWritingQuestion(topic, difficulty);
        });
    }

    if (submitBtn) {
        submitBtn.addEventListener('click', function() {
            const userAnswer = document.getElementById('userAnswer').value.trim();
            const difficulty = difficultySelect.value;
            
            if (!userAnswer) {
                alert('解答を入力してください。');
                return;
            }
            
            submitWritingAnswer(topic, userAnswer, difficulty);
        });
    }
}

// 難易度選択ボタンのイベントリスナーを設定
function setupDifficultySelectors() {
    const difficultySelectors = document.querySelectorAll('.difficulty-selector');
    
    difficultySelectors.forEach(selector => {
        const buttons = selector.querySelectorAll('.difficulty-btn');
        
        buttons.forEach(button => {
            button.addEventListener('click', function() {
                // 同じセクション内の他のボタンからactiveクラスを削除
                buttons.forEach(btn => btn.classList.remove('active'));
                // クリックされたボタンにactiveクラスを追加
                this.classList.add('active');
            });
        });
    });
}

// サーバーの状態をチェック
async function checkServerHealth() {
    try {
        const response = await fetch(`${API_BASE_URL}/health`);
        if (response.ok) {
            console.log('Backend server is running');
            return true;
        }
    } catch (error) {
        console.error('Backend server is not available:', error);
        return false;
    }
}

// ページ読み込み時の初期化
document.addEventListener('DOMContentLoaded', function() {
    // サーバーの状態をチェック
    checkServerHealth();

    // 難易度選択機能を初期化
    setupDifficultySelectors();
}); 