# デザインシステム - Apple Human Interface Guidelines 準拠

## 1. カラーシステム

### プライマリカラー
```css
:root {
  /* メインカラー */
  --primary-blue: #007AFF;
  --primary-blue-dark: #0056CC;
  --primary-blue-light: #4DA3FF;
  
  /* セカンダリカラー */
  --secondary-gray: #8E8E93;
  --secondary-gray-dark: #636366;
  --secondary-gray-light: #C7C7CC;
  
  /* アクセントカラー */
  --accent-green: #34C759;
  --accent-orange: #FF9500;
  --accent-red: #FF3B30;
  --accent-purple: #AF52DE;
}
```

### セマンティックカラー
```css
:root {
  /* 成功・完了 */
  --success: #34C759;
  --success-bg: rgba(52, 199, 89, 0.1);
  
  /* 警告・注意 */
  --warning: #FF9500;
  --warning-bg: rgba(255, 149, 0, 0.1);
  
  /* エラー・危険 */
  --error: #FF3B30;
  --error-bg: rgba(255, 59, 48, 0.1);
  
  /* 情報 */
  --info: #007AFF;
  --info-bg: rgba(0, 122, 255, 0.1);
}
```

### ニュートラルカラー
```css
:root {
  /* グレースケール */
  --gray-50: #F2F2F7;
  --gray-100: #E5E5EA;
  --gray-200: #D1D1D6;
  --gray-300: #C7C7CC;
  --gray-400: #AEAEB2;
  --gray-500: #8E8E93;
  --gray-600: #636366;
  --gray-700: #48484A;
  --gray-800: #3A3A3C;
  --gray-900: #1C1C1E;
  
  /* 背景色 */
  --bg-primary: #FFFFFF;
  --bg-secondary: #F2F2F7;
  --bg-tertiary: #E5E5EA;
  
  /* テキスト色 */
  --text-primary: #000000;
  --text-secondary: #3C3C43;
  --text-tertiary: #8E8E93;
  --text-quaternary: #C7C7CC;
}
```

## 2. タイポグラフィ

### フォントファミリー
```css
:root {
  --font-family-primary: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-family-secondary: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-family-mono: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
}
```

### フォントサイズ
```css
:root {
  /* ディスプレイ */
  --text-display-large: 3.5rem;    /* 56px */
  --text-display-medium: 2.75rem;  /* 44px */
  --text-display-small: 2.25rem;   /* 36px */
  
  /* ヘッドライン */
  --text-headline-large: 2rem;     /* 32px */
  --text-headline-medium: 1.75rem; /* 28px */
  --text-headline-small: 1.5rem;   /* 24px */
  
  /* タイトル */
  --text-title-large: 1.375rem;    /* 22px */
  --text-title-medium: 1.25rem;    /* 20px */
  --text-title-small: 1.125rem;    /* 18px */
  
  /* ボディ */
  --text-body-large: 1.125rem;     /* 18px */
  --text-body-medium: 1rem;        /* 16px */
  --text-body-small: 0.875rem;     /* 14px */
  
  /* ラベル */
  --text-label-large: 0.875rem;    /* 14px */
  --text-label-medium: 0.8125rem;  /* 13px */
  --text-label-small: 0.75rem;     /* 12px */
}
```

### フォントウェイト
```css
:root {
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --font-weight-heavy: 800;
}
```

### ライン高
```css
:root {
  --line-height-tight: 1.2;
  --line-height-normal: 1.4;
  --line-height-relaxed: 1.6;
  --line-height-loose: 1.8;
}
```

## 3. 余白・間隔

### スペーシングスケール
```css
:root {
  --space-0: 0;
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-20: 5rem;     /* 80px */
  --space-24: 6rem;     /* 96px */
}
```

### レイアウトスペーシング
```css
:root {
  /* コンテナパディング */
  --container-padding: var(--space-4);
  --container-padding-large: var(--space-6);
  
  /* セクション間隔 */
  --section-spacing: var(--space-8);
  --section-spacing-large: var(--space-12);
  
  /* コンポーネント間隔 */
  --component-spacing: var(--space-4);
  --component-spacing-small: var(--space-2);
  --component-spacing-large: var(--space-6);
}
```

## 4. 角丸

### ボーダーラディウス
```css
:root {
  --radius-none: 0;
  --radius-small: 0.25rem;    /* 4px */
  --radius-medium: 0.5rem;    /* 8px */
  --radius-large: 0.75rem;    /* 12px */
  --radius-xl: 1rem;          /* 16px */
  --radius-2xl: 1.5rem;       /* 24px */
  --radius-3xl: 2rem;         /* 32px */
  --radius-full: 9999px;
}
```

### 用途別角丸
```css
:root {
  /* ボタン */
  --radius-button: var(--radius-medium);
  --radius-button-large: var(--radius-large);
  
  /* カード */
  --radius-card: var(--radius-large);
  --radius-card-large: var(--radius-xl);
  
  /* 入力フィールド */
  --radius-input: var(--radius-medium);
  
  /* モーダル */
  --radius-modal: var(--radius-xl);
}
```

## 5. 影の効果

### シャドウスケール
```css
:root {
  /* 軽い影 */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-sm-colored: 0 1px 2px 0 rgba(0, 122, 255, 0.1);
  
  /* 標準影 */
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-md-colored: 0 4px 6px -1px rgba(0, 122, 255, 0.1), 0 2px 4px -1px rgba(0, 122, 255, 0.06);
  
  /* 大きな影 */
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --shadow-lg-colored: 0 10px 15px -3px rgba(0, 122, 255, 0.1), 0 4px 6px -2px rgba(0, 122, 255, 0.05);
  
  /* 特大影 */
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  --shadow-xl-colored: 0 20px 25px -5px rgba(0, 122, 255, 0.1), 0 10px 10px -5px rgba(0, 122, 255, 0.04);
  
  /* 内側影 */
  --shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
}
```

### 用途別シャドウ
```css
:root {
  /* カード */
  --shadow-card: var(--shadow-md);
  --shadow-card-hover: var(--shadow-lg);
  
  /* ボタン */
  --shadow-button: var(--shadow-sm);
  --shadow-button-hover: var(--shadow-md);
  
  /* モーダル */
  --shadow-modal: var(--shadow-xl);
  
  /* ドロップダウン */
  --shadow-dropdown: var(--shadow-lg);
}
```

## 6. コンポーネント設計

### ボタン
```css
/* プライマリボタン */
.btn-primary {
  background: var(--primary-blue);
  color: white;
  border: none;
  border-radius: var(--radius-button);
  padding: var(--space-3) var(--space-4);
  font-size: var(--text-body-medium);
  font-weight: var(--font-weight-medium);
  box-shadow: var(--shadow-button);
  transition: all 0.2s ease;
}

.btn-primary:hover {
  background: var(--primary-blue-dark);
  box-shadow: var(--shadow-button-hover);
  transform: translateY(-1px);
}

/* セカンダリボタン */
.btn-secondary {
  background: transparent;
  color: var(--primary-blue);
  border: 1px solid var(--primary-blue);
  border-radius: var(--radius-button);
  padding: var(--space-3) var(--space-4);
  font-size: var(--text-body-medium);
  font-weight: var(--font-weight-medium);
  transition: all 0.2s ease;
}

.btn-secondary:hover {
  background: var(--primary-blue);
  color: white;
}

/* ボタンサイズ */
.btn-small {
  padding: var(--space-2) var(--space-3);
  font-size: var(--text-body-small);
}

.btn-large {
  padding: var(--space-4) var(--space-6);
  font-size: var(--text-body-large);
}
```

### カード
```css
.card {
  background: var(--bg-primary);
  border-radius: var(--radius-card);
  box-shadow: var(--shadow-card);
  padding: var(--space-6);
  transition: all 0.2s ease;
}

.card:hover {
  box-shadow: var(--shadow-card-hover);
  transform: translateY(-2px);
}

.card-header {
  margin-bottom: var(--space-4);
}

.card-title {
  font-size: var(--text-title-medium);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  margin-bottom: var(--space-2);
}

.card-content {
  color: var(--text-secondary);
  line-height: var(--line-height-normal);
}
```

### 入力フィールド
```css
.input {
  background: var(--bg-primary);
  border: 1px solid var(--gray-300);
  border-radius: var(--radius-input);
  padding: var(--space-3) var(--space-4);
  font-size: var(--text-body-medium);
  color: var(--text-primary);
  transition: all 0.2s ease;
}

.input:focus {
  outline: none;
  border-color: var(--primary-blue);
  box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.1);
}

.input:disabled {
  background: var(--bg-secondary);
  color: var(--text-tertiary);
  cursor: not-allowed;
}

.input-error {
  border-color: var(--error);
}

.input-error:focus {
  border-color: var(--error);
  box-shadow: 0 0 0 3px rgba(255, 59, 48, 0.1);
}
```

### アラート
```css
.alert {
  padding: var(--space-4);
  border-radius: var(--radius-medium);
  margin-bottom: var(--space-4);
  border-left: 4px solid;
}

.alert-success {
  background: var(--success-bg);
  border-left-color: var(--success);
  color: var(--success);
}

.alert-warning {
  background: var(--warning-bg);
  border-left-color: var(--warning);
  color: var(--warning);
}

.alert-error {
  background: var(--error-bg);
  border-left-color: var(--error);
  color: var(--error);
}

.alert-info {
  background: var(--info-bg);
  border-left-color: var(--info);
  color: var(--info);
}
```

## 7. アクセシビリティ配慮

### フォーカス表示
```css
/* フォーカス可能要素のスタイル */
.focus-visible {
  outline: 2px solid var(--primary-blue);
  outline-offset: 2px;
}

/* キーボードナビゲーション用 */
@media (prefers-reduced-motion: no-preference) {
  .focus-visible {
    transition: outline 0.2s ease;
  }
}
```

### コントラスト比
```css
/* 高コントラストモード対応 */
@media (prefers-contrast: high) {
  :root {
    --text-primary: #000000;
    --text-secondary: #1C1C1E;
    --bg-primary: #FFFFFF;
    --bg-secondary: #F2F2F7;
  }
}
```

### モーション軽減
```css
/* モーション軽減設定 */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### スクリーンリーダー対応
```css
/* 視覚的に隠すがスクリーンリーダーには読み上げられる */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

## 8. レスポンシブデザイン

### ブレークポイント
```css
:root {
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1536px;
}
```

### メディアクエリ
```css
/* モバイルファースト */
@media (min-width: 640px) {
  /* スマートフォン */
}

@media (min-width: 768px) {
  /* タブレット */
}

@media (min-width: 1024px) {
  /* デスクトップ */
}

@media (min-width: 1280px) {
  /* 大画面デスクトップ */
}
```

## 9. アニメーション

### トランジション
```css
:root {
  --transition-fast: 0.15s ease;
  --transition-normal: 0.2s ease;
  --transition-slow: 0.3s ease;
}
```

### イージング
```css
:root {
  --ease-linear: linear;
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
}
```

## 10. 実装ガイドライン

### CSS変数の使用
```css
/* 推奨 */
.button {
  background: var(--primary-blue);
  color: var(--text-primary);
  padding: var(--space-4);
}

/* 非推奨 */
.button {
  background: #007AFF;
  color: #000000;
  padding: 16px;
}
```

### コンポーネント設計原則
1. **一貫性**: 同じ要素は同じスタイルを使用
2. **再利用性**: 汎用的なコンポーネントを作成
3. **保守性**: CSS変数を使用して変更を容易に
4. **アクセシビリティ**: スクリーンリーダーとキーボードナビゲーションに対応
5. **パフォーマンス**: 不要なアニメーションを避ける

### 命名規則
```css
/* BEM記法を使用 */
.block {}
.block__element {}
.block--modifier {}

/* 例 */
.card {}
.card__title {}
.card--featured {}
```

このデザインシステムにより、一貫性のある美しいUIを構築できます。 