// UI操作管理クラス
class UIManager {
  constructor(config) {
    this.config = config;
    this.animations = config.ui.animations;
    this.colors = config.ui.colors;
  }

  // 要素の表示/非表示を切り替え
  toggleElement(elementId, show = true) {
    const element = document.getElementById(elementId);
    if (!element) return false;

    if (show) {
      element.classList.remove('hidden');
    } else {
      element.classList.add('hidden');
    }
    return true;
  }

  // 要素をフェードイン
  fadeIn(elementId, duration = this.animations.duration) {
    const element = document.getElementById(elementId);
    if (!element) return;

    element.style.opacity = '0';
    element.style.transition = `opacity ${duration}ms ${this.animations.easing}`;
    element.classList.remove('hidden');
    
    requestAnimationFrame(() => {
      element.style.opacity = '1';
    });
  }

  // 要素をフェードアウト
  fadeOut(elementId, duration = this.animations.duration) {
    const element = document.getElementById(elementId);
    if (!element) return;

    element.style.transition = `opacity ${duration}ms ${this.animations.easing}`;
    element.style.opacity = '0';
    
    setTimeout(() => {
      element.classList.add('hidden');
      element.style.opacity = '';
    }, duration);
  }

  // ローディング表示
  showLoading(containerId, message = '読み込み中...') {
    const container = document.getElementById(containerId);
    if (!container) return;

    const loadingHTML = `
      <div class="apple-loading">
        <div class="apple-spinner"></div>
        <div class="apple-loading-text">${message}</div>
      </div>
    `;
    container.innerHTML = loadingHTML;
    container.classList.remove('hidden');
  }

  // ローディング非表示
  hideLoading(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.classList.add('hidden');
  }

  // ボタンの状態を更新
  updateButtonState(buttonId, disabled = false, text = null) {
    const button = document.getElementById(buttonId);
    if (!button) return;

    button.disabled = disabled;
    if (text !== null) {
      button.textContent = text;
    }
  }

  // メッセージを表示
  showMessage(message, type = 'info', duration = 3000) {
    const messageContainer = document.createElement('div');
    messageContainer.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
      type === 'error' ? 'bg-red-500 text-white' :
      type === 'success' ? 'bg-green-500 text-white' :
      'bg-blue-500 text-white'
    }`;
    messageContainer.textContent = message;

    document.body.appendChild(messageContainer);

    // フェードイン
    messageContainer.style.opacity = '0';
    messageContainer.style.transform = 'translateY(-20px)';
    messageContainer.style.transition = `all ${this.animations.duration}ms ${this.animations.easing}`;

    requestAnimationFrame(() => {
      messageContainer.style.opacity = '1';
      messageContainer.style.transform = 'translateY(0)';
    });

    // 自動削除
    setTimeout(() => {
      messageContainer.style.opacity = '0';
      messageContainer.style.transform = 'translateY(-20px)';
      setTimeout(() => {
        if (messageContainer.parentNode) {
          messageContainer.parentNode.removeChild(messageContainer);
        }
      }, this.animations.duration);
    }, duration);
  }

  // エラーメッセージを表示
  showError(message) {
    this.showMessage(message, 'error');
  }

  // 成功メッセージを表示
  showSuccess(message) {
    this.showMessage(message, 'success');
  }

  // プログレスバーを更新
  updateProgress(progressId, percentage) {
    const progressElement = document.getElementById(progressId);
    if (!progressElement) return;

    progressElement.style.width = `${Math.min(100, Math.max(0, percentage))}%`;
  }

  // 難易度表示を更新
  updateDifficultyDisplay(difficulty) {
    const difficultyElement = document.getElementById('currentDifficulty');
    const explanationElement = document.getElementById('difficultyExplanation');
    
    if (difficultyElement) {
      const level = this.config.difficulty.levels[difficulty];
      difficultyElement.textContent = level.name;
      difficultyElement.className = `text-xl font-bold ${level.color}`;
    }
    
    if (explanationElement) {
      explanationElement.textContent = '解答の出来に応じて自動調整されます';
    }
  }

  // 練習回数表示を更新
  updatePracticeCount(count, maxCount) {
    const countElement = document.getElementById('practiceCount');
    const progressFill = document.getElementById('progressFill');
    const practiceMessage = document.getElementById('practiceMessage');
    
    if (countElement) {
      countElement.textContent = count;
    }
    
    if (progressFill) {
      const progressPercentage = (count / maxCount) * 100;
      progressFill.style.width = `${progressPercentage}%`;
    }
    
    if (practiceMessage) {
      if (count >= maxCount) {
        practiceMessage.innerHTML = '<span class="text-green-600 font-semibold">🎉 おめでとうございます！5回の練習を完了しました！</span>';
      } else {
        const remaining = maxCount - count;
        practiceMessage.textContent = `あと${remaining}回で完了です。頑張りましょう！`;
      }
    }
  }

  // サブメニューのトグル
  toggleSubmenu(toggleId, submenuId, iconId) {
    const toggle = document.getElementById(toggleId);
    const submenu = document.getElementById(submenuId);
    const icon = document.getElementById(iconId);
    
    if (!toggle || !submenu || !icon) return;

    const isHidden = submenu.classList.contains('hidden');
    
    if (isHidden) {
      submenu.classList.remove('hidden');
      icon.style.transform = 'rotate(180deg)';
    } else {
      submenu.classList.add('hidden');
      icon.style.transform = 'rotate(0deg)';
    }
  }

  // 難易度選択ボタンの状態を更新
  updateDifficultyButtons(selectorClass, activeDifficulty) {
    const selectors = document.querySelectorAll(selectorClass);
    
    selectors.forEach(selector => {
      const buttons = selector.querySelectorAll('.difficulty-btn');
      buttons.forEach(button => {
        button.classList.remove('active');
        if (button.dataset.difficulty === activeDifficulty) {
          button.classList.add('active');
        }
      });
    });
  }

  // レスポンシブ対応
  isMobile() {
    return window.innerWidth <= this.config.ui.breakpoints.mobile;
  }

  isTablet() {
    return window.innerWidth > this.config.ui.breakpoints.mobile && 
           window.innerWidth <= this.config.ui.breakpoints.tablet;
  }

  isDesktop() {
    return window.innerWidth > this.config.ui.breakpoints.tablet;
  }

  // デバイスに応じたスタイル調整
  adjustForDevice() {
    const device = this.isMobile() ? 'mobile' : 
                  this.isTablet() ? 'tablet' : 'desktop';
    
    document.body.setAttribute('data-device', device);
  }

  // スクロール位置を取得
  getScrollPosition() {
    return {
      x: window.pageXOffset || document.documentElement.scrollLeft,
      y: window.pageYOffset || document.documentElement.scrollTop
    };
  }

  // 要素までスクロール
  scrollToElement(elementId, offset = 0) {
    const element = document.getElementById(elementId);
    if (!element) return;

    const elementPosition = element.offsetTop - offset;
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    });
  }

  // ページトップにスクロール
  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}

// グローバルインスタンスを作成
let uiManager = null;

// UIマネージャーを初期化
function initializeUIManager(config) {
  uiManager = new UIManager(config);
  return uiManager;
}

// UIマネージャーを取得
function getUIManager() {
  if (!uiManager) {
    throw new Error('UIManager not initialized. Call initializeUIManager first.');
  }
  return uiManager;
}

// エクスポート
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { UIManager, initializeUIManager, getUIManager };
} else if (typeof window !== 'undefined') {
  window.UIManager = UIManager;
  window.initializeUIManager = initializeUIManager;
  window.getUIManager = getUIManager;
} 