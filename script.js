// 移行ガイド: このファイルは新しいアーキテクチャに移行されました
// 
// 新しいファイル構造:
// - config/app.config.js: アプリケーション設定
// - utils/api.js: API通信管理
// - utils/ui.js: UI操作管理
// - utils/state.js: 状態管理
// - app.js: メインアプリケーション
//
// このファイルは後方互換性のため残されていますが、
// 新しい機能は上記のファイルで実装されています。

console.log('English Learning App - リファクタリング完了');
console.log('新しいアーキテクチャに移行しました。詳細はREADME.mdを参照してください。');

// レガシー関数（後方互換性のため）
// これらの関数は新しいアーキテクチャでは自動的に処理されます

// 古い関数の警告
function showLegacyWarning() {
    console.warn('この関数は非推奨です。新しいアーキテクチャを使用してください。');
}

// レガシー関数のスタブ
window.generateWritingQuestion = function(topic) {
    showLegacyWarning();
    const app = window.getApp?.();
    if (app) {
        return app.generateQuestion(topic, 'translation');
    }
};

window.submitWritingAnswer = function(topic, userAnswer) {
    showLegacyWarning();
    const app = window.getApp?.();
    if (app) {
        return app.submitAnswer(topic, userAnswer, 'translation');
    }
};

window.setupWritingQuestionEventListeners = function(topic) {
    showLegacyWarning();
    // 新しいアーキテクチャでは自動的に処理されます
};

window.setupDifficultySelectors = function() {
    showLegacyWarning();
    // 新しいアーキテクチャでは自動的に処理されます
};

window.checkServerHealth = function() {
    showLegacyWarning();
    const app = window.getApp?.();
    if (app) {
        return app.checkServerHealth();
    }
};

window.renderGrammarExplanation = function(key, targetId) {
    showLegacyWarning();
    // 新しいアーキテクチャでは自動的に処理されます
};

window.setupSubmenuToggles = function() {
    showLegacyWarning();
    // 新しいアーキテクチャでは自動的に処理されます
};

// 初期化の警告
document.addEventListener('DOMContentLoaded', function() {
    console.log('レガシー初期化が検出されました。新しいアーキテクチャに移行することを推奨します。');
    
    // 新しいアーキテクチャが利用可能な場合は使用
    if (window.initializeApp) {
        window.initializeApp().catch(console.error);
    }
});


