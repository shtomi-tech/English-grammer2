// アプリケーション状態管理クラス
class StateManager {
  constructor(config) {
    this.config = config;
    this.state = {
      currentDifficulty: config.difficulty.default,
      practiceCount: 0,
      difficultyHistory: [],
      currentTopic: null,
      isServerAvailable: false,
      userPreferences: this.loadUserPreferences()
    };
    
    this.listeners = new Map();
  }

  // 状態を取得
  get(key) {
    return this.state[key];
  }

  // 状態を設定
  set(key, value) {
    const oldValue = this.state[key];
    this.state[key] = value;
    
    // リスナーに通知
    this.notifyListeners(key, value, oldValue);
    
    // 永続化が必要な項目を保存
    this.savePersistentData(key, value);
  }

  // 状態を更新（部分更新）
  update(updates) {
    Object.keys(updates).forEach(key => {
      this.set(key, updates[key]);
    });
  }

  // リスナーを登録
  subscribe(key, callback) {
    if (!this.listeners.has(key)) {
      this.listeners.set(key, new Set());
    }
    this.listeners.get(key).add(callback);
  }

  // リスナーを削除
  unsubscribe(key, callback) {
    if (this.listeners.has(key)) {
      this.listeners.get(key).delete(callback);
    }
  }

  // リスナーに通知
  notifyListeners(key, newValue, oldValue) {
    if (this.listeners.has(key)) {
      this.listeners.get(key).forEach(callback => {
        try {
          callback(newValue, oldValue);
        } catch (error) {
          console.error('State listener error:', error);
        }
      });
    }
  }

  // 難易度を更新
  updateDifficulty(newDifficulty) {
    const oldDifficulty = this.state.currentDifficulty;
    
    // 履歴に追加
    this.state.difficultyHistory.push({
      from: oldDifficulty,
      to: newDifficulty,
      timestamp: new Date()
    });
    
    this.set('currentDifficulty', newDifficulty);
  }

  // 練習回数を更新
  updatePracticeCount() {
    const newCount = this.state.practiceCount + 1;
    const maxCount = this.config.difficulty.maxPracticeCount;
    
    if (newCount <= maxCount) {
      this.set('practiceCount', newCount);
    }
  }

  // 練習回数をリセット
  resetPracticeCount() {
    this.set('practiceCount', 0);
  }

  // 難易度をリセット
  resetDifficulty() {
    this.set('currentDifficulty', this.config.difficulty.default);
    this.set('difficultyHistory', []);
  }

  // 解答の出来に基づいて難易度を調整
  adjustDifficultyBasedOnPerformance(score) {
    const currentDifficulty = this.state.currentDifficulty;
    const levels = this.config.difficulty.levels;
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
    } else if (score <= 40) {
      // 低得点の場合、難易度を下げる
      if (currentDifficulty === 'expert') {
        newDifficulty = 'hard';
      } else if (currentDifficulty === 'hard') {
        newDifficulty = 'medium';
      } else if (currentDifficulty === 'medium') {
        newDifficulty = 'easy';
      }
    }
    
    if (newDifficulty !== currentDifficulty) {
      this.updateDifficulty(newDifficulty);
      return true; // 難易度が変更された
    }
    
    return false; // 難易度は変更されなかった
  }

  // サーバーの状態を更新
  updateServerStatus(isAvailable) {
    this.set('isServerAvailable', isAvailable);
  }

  // 現在のトピックを設定
  setCurrentTopic(topic) {
    this.set('currentTopic', topic);
  }

  // ユーザー設定を保存
  saveUserPreferences(preferences) {
    this.state.userPreferences = { ...this.state.userPreferences, ...preferences };
    localStorage.setItem('userPreferences', JSON.stringify(this.state.userPreferences));
  }

  // ユーザー設定を読み込み
  loadUserPreferences() {
    try {
      const saved = localStorage.getItem('userPreferences');
      return saved ? JSON.parse(saved) : {};
    } catch (error) {
      console.error('Failed to load user preferences:', error);
      return {};
    }
  }

  // 永続化データを保存
  savePersistentData(key, value) {
    const persistentKeys = ['userPreferences', 'currentDifficulty'];
    
    if (persistentKeys.includes(key)) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error(`Failed to save ${key}:`, error);
      }
    }
  }

  // 永続化データを読み込み
  loadPersistentData() {
    try {
      const savedDifficulty = localStorage.getItem('currentDifficulty');
      if (savedDifficulty) {
        this.state.currentDifficulty = JSON.parse(savedDifficulty);
      }
    } catch (error) {
      console.error('Failed to load persistent data:', error);
    }
  }

  // 統計情報を取得
  getStatistics() {
    const history = this.state.difficultyHistory;
    const totalChanges = history.length;
    const recentChanges = history.slice(-10); // 最近10回の変更
    
    return {
      totalPracticeCount: this.state.practiceCount,
      currentDifficulty: this.state.currentDifficulty,
      totalDifficultyChanges: totalChanges,
      recentDifficultyChanges: recentChanges,
      averageScore: this.calculateAverageScore(),
      preferredTopics: this.getPreferredTopics()
    };
  }

  // 平均スコアを計算
  calculateAverageScore() {
    // 実装は後で追加
    return 0;
  }

  // 好まれるトピックを取得
  getPreferredTopics() {
    // 実装は後で追加
    return [];
  }

  // 状態をリセット
  reset() {
    this.state = {
      currentDifficulty: this.config.difficulty.default,
      practiceCount: 0,
      difficultyHistory: [],
      currentTopic: null,
      isServerAvailable: false,
      userPreferences: this.loadUserPreferences()
    };
    
    // リスナーに通知
    Object.keys(this.state).forEach(key => {
      this.notifyListeners(key, this.state[key], null);
    });
  }

  // 状態をエクスポート
  export() {
    return {
      ...this.state,
      timestamp: new Date().toISOString()
    };
  }

  // 状態をインポート
  import(data) {
    if (data && typeof data === 'object') {
      Object.keys(data).forEach(key => {
        if (key !== 'timestamp' && this.state.hasOwnProperty(key)) {
          this.set(key, data[key]);
        }
      });
    }
  }
}

// グローバルインスタンスを作成
let stateManager = null;

// 状態マネージャーを初期化
function initializeStateManager(config) {
  stateManager = new StateManager(config);
  stateManager.loadPersistentData();
  return stateManager;
}

// 状態マネージャーを取得
function getStateManager() {
  if (!stateManager) {
    throw new Error('StateManager not initialized. Call initializeStateManager first.');
  }
  return stateManager;
}

// エクスポート
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { StateManager, initializeStateManager, getStateManager };
} else if (typeof window !== 'undefined') {
  window.StateManager = StateManager;
  window.initializeStateManager = initializeStateManager;
  window.getStateManager = getStateManager;
} 