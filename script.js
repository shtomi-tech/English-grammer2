// バックエンドAPI設定
const API_BASE_URL = 'http://localhost:3000';

// 練習回数管理
let practiceCount = 0;
const MAX_PRACTICE_COUNT = 5;

// 難易度管理
let currentDifficulty = 'easy'; // easy, medium, hard, expert
const difficultyLevels = {
    easy: { name: '英検3級レベル（初級）', color: 'text-green-600' },
    medium: { name: '英検準2級レベル（中級）', color: 'text-yellow-600' },
    hard: { name: '英検2級レベル（上級）', color: 'text-red-600' },
    expert: { name: '英検準1級レベル（最上級）', color: 'text-purple-600' }
};

// 難易度調整の履歴
let difficultyHistory = [];

// 難易度を更新する関数
function updateDifficulty(newDifficulty) {
    const oldDifficulty = currentDifficulty;
    currentDifficulty = newDifficulty;
    
    // 履歴に追加
    difficultyHistory.push({
        from: oldDifficulty,
        to: newDifficulty,
        timestamp: new Date()
    });
    
    // UIを更新
    updateDifficultyDisplay();
}

// 難易度表示を更新する関数
function updateDifficultyDisplay() {
    const difficultyElement = document.getElementById('currentDifficulty');
    const explanationElement = document.getElementById('difficultyExplanation');
    
    if (difficultyElement) {
        const level = difficultyLevels[currentDifficulty];
        difficultyElement.textContent = level.name;
        difficultyElement.className = `text-xl font-bold ${level.color}`;
    }
    
    if (explanationElement) {
        if (difficultyHistory.length > 0) {
            const lastChange = difficultyHistory[difficultyHistory.length - 1];
            if (lastChange.from !== lastChange.to) {
                const fromName = difficultyLevels[lastChange.from].name;
                const toName = difficultyLevels[lastChange.to].name;
                explanationElement.textContent = `前回の解答により ${fromName} → ${toName} に調整されました`;
            } else {
                explanationElement.textContent = '解答の出来に応じて自動調整されます';
            }
        } else {
            explanationElement.textContent = '解答の出来に応じて自動調整されます';
        }
    }
}

// 解答の出来に基づいて難易度を調整する関数
function adjustDifficultyBasedOnPerformance(score) {
    let newDifficulty = currentDifficulty;
    
    if (score >= 80) {
        // 高得点の場合、難易度を上げる
        if (currentDifficulty === 'easy') {
            newDifficulty = 'medium';
        } else if (currentDifficulty === 'medium') {
            newDifficulty = 'hard';
        } else if (currentDifficulty === 'hard') {
            newDifficulty = 'expert';
        }
        // expertの場合はそのまま
    } else if (score <= 40) {
        // 低得点の場合、難易度を下げる
        if (currentDifficulty === 'expert') {
            newDifficulty = 'hard';
        } else if (currentDifficulty === 'hard') {
            newDifficulty = 'medium';
        } else if (currentDifficulty === 'medium') {
            newDifficulty = 'easy';
        }
        // easyの場合はそのまま
    }
    // 40-80点の場合は難易度を維持
    
    if (newDifficulty !== currentDifficulty) {
        updateDifficulty(newDifficulty);
        return true; // 難易度が変更された
    }
    
    return false; // 難易度は変更されなかった
}

// 難易度を初期化する関数
function initializeDifficulty() {
    // 常に初級レベルから開始
    currentDifficulty = 'easy';
    difficultyHistory = [];
    
    updateDifficultyDisplay();
}

// 練習回数を更新する関数
function updatePracticeCount() {
    practiceCount++;
    if (practiceCount > MAX_PRACTICE_COUNT) {
        practiceCount = MAX_PRACTICE_COUNT;
    }
    
    const countElement = document.getElementById('practiceCount');
    const progressFill = document.getElementById('progressFill');
    const practiceMessage = document.getElementById('practiceMessage');
    
    if (countElement) {
        countElement.textContent = practiceCount;
    }
    
    if (progressFill) {
        const progressPercentage = (practiceCount / MAX_PRACTICE_COUNT) * 100;
        progressFill.style.width = `${progressPercentage}%`;
    }
    
    if (practiceMessage) {
        if (practiceCount >= MAX_PRACTICE_COUNT) {
            practiceMessage.innerHTML = '<span class="text-green-600 font-semibold">🎉 おめでとうございます！5回の練習を完了しました！</span>';
        } else {
            const remaining = MAX_PRACTICE_COUNT - practiceCount;
            practiceMessage.textContent = `あと${remaining}回で完了です。頑張りましょう！`;
        }
    }
}

// 練習回数を初期化する関数
function initializePracticeCount() {
    // 常に0から開始
    practiceCount = 0;
    
    const countElement = document.getElementById('practiceCount');
    const progressFill = document.getElementById('progressFill');
    const practiceMessage = document.getElementById('practiceMessage');
    
    if (countElement) {
        countElement.textContent = practiceCount;
    }
    
    if (progressFill) {
        progressFill.style.width = '0%';
    }
    
    if (practiceMessage) {
        practiceMessage.textContent = '練習を開始しましょう！';
    }
}

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
async function generateWritingQuestion(topic) {
    const generateBtn = document.getElementById('generateQuestion');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const questionContainer = document.getElementById('questionContainer');

    generateBtn.disabled = true;
    generateBtn.textContent = '生成中...';
    loadingIndicator.classList.remove('hidden');
    questionContainer.classList.add('hidden');

    try {
        // grammar.jsonから説明文を取得
        const grammarRes = await fetch('../grammar.json');
        const grammarData = await grammarRes.json();
        
        // currentTopicをgrammar.jsonのキー形式に変換
        let grammarKey = typeof currentTopic !== 'undefined' ? currentTopic : topic;
        
        // ハイフンをアンダースコアに変換する関数
        function convertToGrammarKey(key) {
            return key.replace(/-/g, '_');
        }
        
        grammarKey = convertToGrammarKey(grammarKey);
        let grammarExplanation = grammarData[grammarKey] || '';

        const response = await fetch(`${API_BASE_URL}/api/generate-translation-question`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ topic, difficulty: currentDifficulty, grammarExplanation })
        });

        if (!response.ok) throw new Error(`API request failed: ${response.status}`);

        const result = await response.json();
        if (!result.success) throw new Error(result.error || 'Failed to generate translation question');

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
async function submitWritingAnswer(topic, userAnswer) {
    const submitBtn = document.getElementById('submitAnswer');
    const feedbackContainer = document.getElementById('feedback');

    submitBtn.disabled = true;
    submitBtn.textContent = '添削中...';
    feedbackContainer.classList.add('hidden');

    try {
        const response = await fetch(`${API_BASE_URL}/api/grade-translation-answer`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ topic, userAnswer, difficulty: currentDifficulty })
        });

        if (!response.ok) throw new Error(`API request failed: ${response.status}`);

        const result = await response.json();
        if (!result.success) throw new Error(result.error || 'Failed to grade translation answer');

        displayWritingFeedback(result.data, 'feedback', 'feedbackContent');
        
        // 解答の出来に基づいて難易度を調整
        if (result.data.overallScore) {
            const difficultyChanged = adjustDifficultyBasedOnPerformance(result.data.overallScore);
            if (difficultyChanged) {
                // 難易度が変更された場合の特別なメッセージを表示
                setTimeout(() => {
                    const feedbackContent = document.getElementById('feedbackContent');
                    if (feedbackContent) {
                        const difficultyMessage = document.createElement('div');
                        difficultyMessage.className = 'bg-blue-50 p-4 rounded border-l-4 border-blue-400 mt-4';
                        const level = difficultyLevels[currentDifficulty];
                        difficultyMessage.innerHTML = `
                            <h4 class="font-semibold text-blue-800 mb-2">🎯 難易度調整</h4>
                            <p class="text-blue-700">あなたの解答の出来に応じて、次回の問題は <strong>${level.name}</strong> で出題されます。</p>
                        `;
                        feedbackContent.appendChild(difficultyMessage);
                    }
                }, 1000);
            }
        }
        
        // 添削完了時に練習回数を更新
        updatePracticeCount();

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

    if (generateBtn) {
        generateBtn.addEventListener('click', () => {
            generateWritingQuestion(topic);
        });
    }

    if (submitBtn) {
        submitBtn.addEventListener('click', () => {
            const userAnswer = document.getElementById('userAnswer').value.trim();
            
            if (!userAnswer) {
                alert('解答を入力してください。');
                return;
            }
            
            submitWritingAnswer(topic, userAnswer);
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

// grammar.jsonから該当項目を取得して表示する関数
function renderGrammarExplanation(key, targetId) {
    fetch('../grammar.json')
        .then(response => response.json())
        .then(data => {
            const explanation = data[key];
            if (explanation) {
                document.getElementById(targetId).innerHTML = explanation.replace(/\n/g, '<br>');
            } else {
                document.getElementById(targetId).textContent = '説明が見つかりませんでした。';
            }
        })
        .catch(() => {
            document.getElementById(targetId).textContent = '文法説明の読み込みに失敗しました。';
        });
}

// サブメニューのトグル機能
function setupSubmenuToggles() {
    // 関係代名詞のトグル
    const relativePronounToggle = document.getElementById('relative-pronoun-toggle');
    const relativePronounSubmenu = document.getElementById('relative-pronoun-submenu');
    const relativePronounIcon = document.getElementById('relative-pronoun-icon');
    
    if (relativePronounToggle && relativePronounSubmenu && relativePronounIcon) {
        relativePronounToggle.addEventListener('click', function() {
            const isHidden = relativePronounSubmenu.classList.contains('hidden');
            
            if (isHidden) {
                // サブメニューを表示
                relativePronounSubmenu.classList.remove('hidden');
                relativePronounIcon.style.transform = 'rotate(180deg)';
            } else {
                // サブメニューを非表示
                relativePronounSubmenu.classList.add('hidden');
                relativePronounIcon.style.transform = 'rotate(0deg)';
            }
        });
    }
    
    // 動詞のトグル
    const verbToggle = document.getElementById('verb-toggle');
    const verbSubmenu = document.getElementById('verb-submenu');
    const verbIcon = document.getElementById('verb-icon');
    
    if (verbToggle && verbSubmenu && verbIcon) {
        verbToggle.addEventListener('click', function() {
            const isHidden = verbSubmenu.classList.contains('hidden');
            
            if (isHidden) {
                // サブメニューを表示
                verbSubmenu.classList.remove('hidden');
                verbIcon.style.transform = 'rotate(180deg)';
            } else {
                // サブメニューを非表示
                verbSubmenu.classList.add('hidden');
                verbIcon.style.transform = 'rotate(0deg)';
            }
        });
    }
    
    // 不定詞のトグル
    const infinitiveToggle = document.getElementById('infinitive-toggle');
    const infinitiveSubmenu = document.getElementById('infinitive-submenu');
    const infinitiveIcon = document.getElementById('infinitive-icon');
    
    if (infinitiveToggle && infinitiveSubmenu && infinitiveIcon) {
        infinitiveToggle.addEventListener('click', function() {
            const isHidden = infinitiveSubmenu.classList.contains('hidden');
            
            if (isHidden) {
                // サブメニューを表示
                infinitiveSubmenu.classList.remove('hidden');
                infinitiveIcon.style.transform = 'rotate(180deg)';
            } else {
                // サブメニューを非表示
                infinitiveSubmenu.classList.add('hidden');
                infinitiveIcon.style.transform = 'rotate(0deg)';
            }
        });
    }
    
    // 動名詞のトグル
    const gerundToggle = document.getElementById('gerund-toggle');
    const gerundSubmenu = document.getElementById('gerund-submenu');
    const gerundIcon = document.getElementById('gerund-icon');
    
    if (gerundToggle && gerundSubmenu && gerundIcon) {
        gerundToggle.addEventListener('click', function() {
            const isHidden = gerundSubmenu.classList.contains('hidden');
            
            if (isHidden) {
                // サブメニューを表示
                gerundSubmenu.classList.remove('hidden');
                gerundIcon.style.transform = 'rotate(180deg)';
            } else {
                // サブメニューを非表示
                gerundSubmenu.classList.add('hidden');
                gerundIcon.style.transform = 'rotate(0deg)';
            }
        });
    }
    
    // 前置詞のトグル
    const prepositionToggle = document.getElementById('preposition-toggle');
    const prepositionSubmenu = document.getElementById('preposition-submenu');
    const prepositionIcon = document.getElementById('preposition-icon');
    
    if (prepositionToggle && prepositionSubmenu && prepositionIcon) {
        prepositionToggle.addEventListener('click', function() {
            const isHidden = prepositionSubmenu.classList.contains('hidden');
            
            if (isHidden) {
                // サブメニューを表示
                prepositionSubmenu.classList.remove('hidden');
                prepositionIcon.style.transform = 'rotate(180deg)';
            } else {
                // サブメニューを非表示
                prepositionSubmenu.classList.add('hidden');
                prepositionIcon.style.transform = 'rotate(0deg)';
            }
        });
    }
    
    // -ing形の4つの可能性のトグル
    const ingFourToggle = document.getElementById('ing-four-toggle');
    const ingFourSubmenu = document.getElementById('ing-four-submenu');
    const ingFourIcon = document.getElementById('ing-four-icon');
    
    if (ingFourToggle && ingFourSubmenu && ingFourIcon) {
        ingFourToggle.addEventListener('click', function() {
            const isHidden = ingFourSubmenu.classList.contains('hidden');
            
            if (isHidden) {
                // サブメニューを表示
                ingFourSubmenu.classList.remove('hidden');
                ingFourIcon.style.transform = 'rotate(180deg)';
            } else {
                // サブメニューを非表示
                ingFourSubmenu.classList.add('hidden');
                ingFourIcon.style.transform = 'rotate(0deg)';
            }
        });
    }
}

// ページ読み込み時の初期化
document.addEventListener('DOMContentLoaded', function() {
    // サーバーの状態をチェック
    checkServerHealth();

    // 難易度システムを初期化
    initializeDifficulty();

    // 練習回数を初期化
    initializePracticeCount();

    setupSubmenuToggles();
});

 