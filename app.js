// メインアプリケーションクラス
class EnglishLearningApp {
  constructor() {
    this.config = null;
    this.apiService = null;
    this.uiManager = null;
    this.stateManager = null;
    this.isInitialized = false;
  }

  // アプリケーションを初期化
  async initialize() {
    try {
      // 設定を読み込み
      await this.loadConfig();
      
      // 各マネージャーを初期化
      this.apiService = initializeApiService(this.config);
      this.uiManager = initializeUIManager(this.config);
      this.stateManager = initializeStateManager(this.config);
      
      // イベントリスナーを設定
      this.setupEventListeners();
      
      // 初期状態を設定
      this.initializeAppState();
      
      this.isInitialized = true;
      console.log('English Learning App initialized successfully');
      
    } catch (error) {
      console.error('Failed to initialize app:', error);
      this.uiManager?.showError('アプリケーションの初期化に失敗しました');
    }
  }

  // 設定を読み込み
  async loadConfig() {
    // 設定ファイルを動的に読み込み
    const configScript = document.createElement('script');
    configScript.src = 'config/app.config.js';
    
    return new Promise((resolve, reject) => {
      configScript.onload = () => {
        if (window.AppConfig) {
          this.config = window.AppConfig;
          resolve();
        } else {
          reject(new Error('Failed to load app config'));
        }
      };
      configScript.onerror = () => reject(new Error('Failed to load config file'));
      document.head.appendChild(configScript);
    });
  }

  // イベントリスナーを設定
  setupEventListeners() {
    // DOMContentLoadedイベント
    document.addEventListener('DOMContentLoaded', () => {
      this.onDOMContentLoaded();
    });

    // ウィンドウリサイズイベント
    window.addEventListener('resize', () => {
      this.uiManager?.adjustForDevice();
    });

    // 状態変更リスナー
    this.stateManager.subscribe('currentDifficulty', (newDifficulty) => {
      this.uiManager?.updateDifficultyDisplay(newDifficulty);
    });

    this.stateManager.subscribe('practiceCount', (newCount) => {
      this.uiManager?.updatePracticeCount(newCount, this.config.difficulty.maxPracticeCount);
    });

    this.stateManager.subscribe('isServerAvailable', (isAvailable) => {
      this.handleServerStatusChange(isAvailable);
    });
  }

  // DOMContentLoaded時の処理
  onDOMContentLoaded() {
    // サブメニューのトグル機能を設定
    this.setupSubmenuToggles();
    
    // 難易度選択ボタンを設定
    this.setupDifficultySelectors();
    
    // サーバーの状態をチェック
    this.checkServerHealth();
    
    // デバイスに応じた調整
    this.uiManager?.adjustForDevice();
  }

  // サブメニューのトグル機能を設定
  setupSubmenuToggles() {
    const submenuConfigs = [
      { toggleId: 'relative-pronoun-toggle', submenuId: 'relative-pronoun-submenu', iconId: 'relative-pronoun-icon' },
      { toggleId: 'verb-toggle', submenuId: 'verb-submenu', iconId: 'verb-icon' },
      { toggleId: 'infinitive-toggle', submenuId: 'infinitive-submenu', iconId: 'infinitive-icon' },
      { toggleId: 'preposition-toggle', submenuId: 'preposition-submenu', iconId: 'preposition-icon' },
      { toggleId: 'ing-four-toggle', submenuId: 'ing-four-submenu', iconId: 'ing-four-icon' }
    ];

    submenuConfigs.forEach(config => {
      const toggle = document.getElementById(config.toggleId);
      if (toggle) {
        toggle.addEventListener('click', () => {
          this.uiManager?.toggleSubmenu(config.toggleId, config.submenuId, config.iconId);
        });
      }
    });
  }

  // 難易度選択ボタンを設定
  setupDifficultySelectors() {
    const difficultySelectors = document.querySelectorAll('.difficulty-selector');
    
    difficultySelectors.forEach(selector => {
      const buttons = selector.querySelectorAll('.difficulty-btn');
      
      buttons.forEach(button => {
        button.addEventListener('click', () => {
          // 同じセクション内の他のボタンからactiveクラスを削除
          buttons.forEach(btn => btn.classList.remove('active'));
          // クリックされたボタンにactiveクラスを追加
          button.classList.add('active');
          
          // 状態を更新
          const difficulty = button.dataset.difficulty;
          if (difficulty) {
            this.stateManager?.updateDifficulty(difficulty);
          }
        });
      });
    });
  }

  // サーバーの状態をチェック
  async checkServerHealth() {
    try {
      const isHealthy = await this.apiService?.checkHealth();
      this.stateManager?.updateServerStatus(isHealthy);
    } catch (error) {
      console.error('Server health check failed:', error);
      this.stateManager?.updateServerStatus(false);
    }
  }

  // サーバー状態変更時の処理
  handleServerStatusChange(isAvailable) {
    if (!isAvailable) {
      this.uiManager?.showError('サーバーとの接続が切断されました');
    }
  }

  // アプリケーションの初期状態を設定
  initializeAppState() {
    // 難易度表示を更新
    const currentDifficulty = this.stateManager?.get('currentDifficulty');
    if (currentDifficulty) {
      this.uiManager?.updateDifficultyDisplay(currentDifficulty);
    }

    // 練習回数表示を更新
    const practiceCount = this.stateManager?.get('practiceCount');
    if (practiceCount !== undefined) {
      this.uiManager?.updatePracticeCount(practiceCount, this.config.difficulty.maxPracticeCount);
    }
  }

  // 問題生成
  async generateQuestion(topic, questionType = 'translation') {
    if (!this.isInitialized) {
      throw new Error('App not initialized');
    }

    try {
      this.uiManager?.showLoading('questionContainer', '問題を生成中...');
      this.uiManager?.updateButtonState('generateQuestion', true, '生成中...');

      let result;
      const difficulty = this.stateManager?.get('currentDifficulty');

      switch (questionType) {
        case 'translation':
          result = await this.apiService?.generateTranslationQuestion(topic, difficulty);
          break;
        case 'writing':
          result = await this.apiService?.generateWritingQuestion(topic, difficulty);
          break;
        case 'fillBlank':
          result = await this.apiService?.generateFillInTheBlank(topic, difficulty);
          break;
        default:
          throw new Error(`Unknown question type: ${questionType}`);
      }

      this.displayQuestion(result, questionType);
      this.uiManager?.showSuccess('問題が正常に生成されました');

    } catch (error) {
      console.error('Question generation failed:', error);
      this.uiManager?.showError(this.config.messages.errors.questionGeneration);
    } finally {
      this.uiManager?.hideLoading('questionContainer');
      this.uiManager?.updateButtonState('generateQuestion', false, '新しい問題を生成');
    }
  }

  // 問題を表示
  displayQuestion(questionData, questionType) {
    switch (questionType) {
      case 'translation':
        this.displayTranslationQuestion(questionData);
        break;
      case 'writing':
        this.displayWritingQuestion(questionData);
        break;
      case 'fillBlank':
        this.displayFillBlankQuestion(questionData);
        break;
    }
  }

  // 和文英訳問題を表示
  displayTranslationQuestion(questionData) {
    const questionContainer = document.getElementById('questionContainer');
    const questionText = document.getElementById('question');
    const hintsElement = document.getElementById('hints');

    if (questionText) {
      questionText.innerHTML = questionData.question;
    }

    // 解答欄をリセット
    const userAnswer = document.getElementById('userAnswer');
    if (userAnswer) userAnswer.value = '';

    // 添削結果をリセット
    const feedbackContainer = document.getElementById('feedback');
    if (feedbackContainer) feedbackContainer.classList.add('hidden');

    // ヒントを設定
    if (questionData.hints && questionData.hints.length > 0) {
      this.setupHints(hintsElement, questionData.hints);
    } else {
      hintsElement?.classList.add('hidden');
    }

    questionContainer?.classList.remove('hidden');
  }

  // 英作文問題を表示
  displayWritingQuestion(questionData) {
    // 実装は後で追加
  }

  // 穴埋め問題を表示
  displayFillBlankQuestion(questionData) {
    // 実装は後で追加
  }

  // ヒントを設定
  setupHints(hintsElement, hints) {
    if (!hintsElement) return;

    hintsElement.innerHTML = `
      <div class="flex items-center justify-between mb-2">
        <strong>ヒント</strong>
        <button id="showHintsBtn" class="text-sm bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition-colors">
          ヒントを表示
        </button>
      </div>
      <div id="hintsContent" class="hidden">
        ${hints.join('<br>')}
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
  }

  // 解答を送信
  async submitAnswer(topic, userAnswer, questionType = 'translation') {
    if (!this.isInitialized) {
      throw new Error('App not initialized');
    }

    try {
      this.uiManager?.updateButtonState('submitAnswer', true, '添削中...');
      const feedbackContainer = document.getElementById('feedback');
      if (feedbackContainer) feedbackContainer.classList.add('hidden');

      let result;
      const difficulty = this.stateManager?.get('currentDifficulty');

      switch (questionType) {
        case 'translation':
          result = await this.apiService?.gradeTranslationAnswer(topic, userAnswer, difficulty);
          break;
        case 'writing':
          result = await this.apiService?.gradeWritingAnswer(topic, userAnswer, difficulty);
          break;
        default:
          throw new Error(`Unknown question type: ${questionType}`);
      }

      this.displayFeedback(result, questionType);
      
      // 解答の出来に基づいて難易度を調整
      if (result.overallScore) {
        const difficultyChanged = this.stateManager?.adjustDifficultyBasedOnPerformance(result.overallScore);
        if (difficultyChanged) {
          this.showDifficultyChangeMessage();
        }
      }
      
      // 練習回数を更新
      this.stateManager?.updatePracticeCount();

    } catch (error) {
      console.error('Answer submission failed:', error);
      this.uiManager?.showError(this.config.messages.errors.answerSubmission);
    } finally {
      this.uiManager?.updateButtonState('submitAnswer', false, '添削してもらう');
    }
  }

  // フィードバックを表示
  displayFeedback(feedbackData, questionType) {
    const feedbackContainer = document.getElementById('feedback');
    const feedbackContent = document.getElementById('feedbackContent');

    if (!feedbackContainer || !feedbackContent) return;

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

  // 難易度変更メッセージを表示
  showDifficultyChangeMessage() {
    setTimeout(() => {
      const feedbackContent = document.getElementById('feedbackContent');
      if (feedbackContent) {
        const difficultyMessage = document.createElement('div');
        difficultyMessage.className = 'bg-blue-50 p-4 rounded border-l-4 border-blue-400 mt-4';
        const currentDifficulty = this.stateManager?.get('currentDifficulty');
        const level = this.config.difficulty.levels[currentDifficulty];
        difficultyMessage.innerHTML = `
          <h4 class="font-semibold text-blue-800 mb-2">🎯 難易度調整</h4>
          <p class="text-blue-700">あなたの解答の出来に応じて、次回の問題は <strong>${level.name}</strong> で出題されます。</p>
        `;
        feedbackContent.appendChild(difficultyMessage);
      }
    }, 1000);
  }

  // アプリケーションをリセット
  reset() {
    this.stateManager?.reset();
    this.uiManager?.showSuccess('アプリケーションがリセットされました');
  }

  // 統計情報を取得
  getStatistics() {
    return this.stateManager?.getStatistics();
  }
}

// グローバルアプリケーションインスタンス
let app = null;

// アプリケーションを初期化
async function initializeApp() {
  if (!app) {
    app = new EnglishLearningApp();
    await app.initialize();
  }
  return app;
}

// アプリケーションを取得
function getApp() {
  if (!app) {
    throw new Error('App not initialized. Call initializeApp first.');
  }
  return app;
}

// グローバル関数として公開
window.initializeApp = initializeApp;
window.getApp = getApp;

// ページ読み込み時にアプリケーションを初期化
document.addEventListener('DOMContentLoaded', async () => {
  try {
    await initializeApp();
  } catch (error) {
    console.error('Failed to initialize app:', error);
  }
}); 