# English Learning Site with OpenAI AI

英語学習サイトのバックエンドAPIです。OpenAI AIを使用して動的に4択問題を生成します。**大学受験（センター試験、国公立大学、私立大学）向けの高度な文法問題を生成**する機能を備えています。

## 機能

- **大学受験向けの高度な文法問題生成**
  - センター試験、国公立大学、私立大学の入試レベルに対応
  - 受験生が間違いやすいポイントを狙った問題
  - 実践的で応用力を問う問題設計
- OpenAI AIを使用した動的問題生成
- 複数の文法トピック対応（品詞、文型、時制、助動詞、仮定法、比較など）
- 難易度調整機能（基礎・標準・発展レベル）
- 詳細な解説付き
- RESTful API
- CORS対応

## 大学受験向けの特徴

### 出題方針
- 大学入試で実際に出題されるレベルの問題
- 受験生が間違いやすいポイントを狙った問題
- 実践的で応用力を問う問題
- 各文法項目の詳細な焦点設定

### 対応文法項目
- **品詞**: 名詞、冠詞、be動詞、一般動詞、形容詞、副詞、前置詞、接続詞
- **文型**: 第1〜5文型とその受動態
- **句・節**: 動名詞、不定詞、分詞、関係代名詞、関係副詞
- **時制**: 現在形、過去形、進行形、完了形（現在・過去・未来）
- **助動詞**: can, will, may, must, should
- **仮定法**: 仮定法過去、過去完了、未来、倒置
- **比較**: 比較級、最上級、原級

### 問題の特徴
- 日本語の問題文、英語の選択肢
- 受験生が実際に間違いそうな不正解選択肢
- 詳細な解説（正解の理由、不正解の理由、関連する文法事項）
- 難易度と試験タイプの表示

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

`.env`ファイルを作成し、以下の内容を設定してください：

```env
# OpenAI API設定
OPENAI_API_KEY=your_openai_api_key_here

# サーバー設定
PORT=3000

# CORS設定
CORS_ORIGIN=http://localhost:5500
```

### 3. OpenAI APIキーの取得

1. [OpenAI Platform](https://platform.openai.com/api-keys) にアクセス
2. APIキーを作成
3. `.env`ファイルの`OPENAI_API_KEY`に設定

### 4. サーバーの起動

開発モード：
```bash
npm run dev
```

本番モード：
```bash
npm start
```

## API エンドポイント

### ヘルスチェック
```
GET /health
```

### 問題生成
```
POST /api/generate-question
```

**リクエストボディ：**
```json
{
  "topic": "article",
  "difficulty": "medium"
}
```

**レスポンス：**
```json
{
  "success": true,
  "data": {
    "question": "次の文の空所に入る適切な冠詞を選びなさい。",
    "options": [
      {"text": "a", "correct": false},
      {"text": "an", "correct": true},
      {"text": "the", "correct": false},
      {"text": "no article", "correct": false}
    ],
    "explanation": "詳細な解説（正解の理由、不正解の理由、関連する文法事項）",
    "difficulty": "標準",
    "exam_type": "大学入試レベル"
  },
  "topic": "article",
  "difficulty": "medium"
}
```

## 利用可能なトピック

### 品詞
- `noun` - 名詞（可算名詞・不可算名詞、集合名詞、物質名詞、抽象名詞）
- `article` - 冠詞（a, an, theの使い分け、固有名詞と冠詞）
- `be_verb` - be動詞（am, is, are、進行形・受動態・完了形での用法）
- `verb` - 一般動詞（自動詞・他動詞、動詞の語法、句動詞）
- `adjective` - 形容詞（語順、限定用法・叙述用法、比較級・最上級）
- `adverb` - 副詞（位置、頻度・程度を表す副詞、文修飾副詞）
- `preposition` - 前置詞（使い分け、慣用表現、前置詞の省略）
- `conjunction` - 接続詞（等位・従属接続詞、使い分け、省略）

### 文型
- `pattern1` - 第1文型（S+V：自動詞の識別、There構文）
- `pattern2` - 第2文型（S+V+C：不完全自動詞、補語の種類）
- `pattern3` - 第3文型（S+V+O：他動詞、目的語の種類、受動態）
- `pattern4` - 第4文型（S+V+O1+O2：直接・間接目的語、受動態）
- `pattern5` - 第5文型（S+V+O+C：不完全他動詞、知覚・使役動詞）
- `passive3` - 第3文型受動態（時制、助動詞、by以外の前置詞）
- `passive4` - 第4文型受動態（2つのパターン、間接目的語主語）
- `passive5` - 第5文型受動態（知覚・使役動詞の受動態）

### 句・節
- `gerund` - 動名詞（目的語に取る動詞、意味上の主語、否定）
- `infinitive` - 不定詞（3用法、目的語に取る動詞、原形不定詞）
- `participle` - 分詞（形容詞的用法、分詞構文、意味上の主語）
- `participle_construction` - 分詞構文（時制、否定、独立分詞構文）
- `relative_pronoun` - 関係代名詞（格変化、制限・非制限用法、省略）
- `relative_adverb` - 関係副詞（前置詞＋関係代名詞の書き換え、省略）
- `subordinate_conjunction` - 従属接続詞（時・条件・譲歩・理由）
- `indirect_question` - 間接疑問文（語順、関係詞節との区別）

### 時制
- `present_tense` - 現在形（用法、副詞節での現在形、進行形との使い分け）
- `past_tense` - 過去形（用法、過去進行形との使い分け、過去完了との関連）
- `progressive_tense` - 進行形（用法、進行形にできない動詞、未来進行形）
- `present_perfect` - 現在完了（3用法、過去形との使い分け）
- `past_perfect` - 過去完了（用法、過去完了進行形、大過去）
- `future_perfect` - 未来完了形（用法、未来完了進行形）

### 助動詞
- `can` - can（3用法、be able toとの使い分け、過去形could）
- `will` - will（用法、be going toとの使い分け、過去形would）
- `may` - may（用法、mightとの使い分け、過去形might）
- `must` - must（用法、have toとの使い分け、否定形）
- `should` - should（用法、ought toとの使い分け、過去形）

### 仮定法
- `subjunctive_past` - 仮定法過去（形、用法、wish節）
- `subjunctive_past_perfect` - 仮定法過去完了（形、用法、混合仮定法）
- `subjunctive_future` - 仮定法未来（形、用法、should/were to）
- `subjunctive_inversion` - 仮定法倒置（形、用法、倒置の条件）

### 比較
- `comparative` - 比較級（作り方、不規則変化、修飾語）
- `superlative` - 最上級（作り方、不規則変化、冠詞）
- `positive` - 原級（形、否定、修飾語）

## 難易度

- `easy` - 基礎レベル（基本的な文法知識を問う）
- `medium` - 標準レベル（応用力と理解度を問う、推奨）
- `hard` - 発展レベル（高度な文法知識と実践力を問う）

## フロントエンドとの連携

フロントエンド（index.html）は既に更新されており、以下の機能を提供します：

- 大学受験向けの問題表示
- 難易度と試験タイプの情報表示
- 詳細な解説の表示
- 美しいUI/UXデザイン

## セキュリティ

- APIキーは環境変数で管理
- CORS設定で許可されたオリジンのみアクセス可能
- 入力値の検証

## 開発

### ファイル構成
```
├── server.js              # メインサーバーファイル
├── services/
│   └── openaiService.js   # OpenAI AIサービス（大学受験向けプロンプト）
├── index.html             # フロントエンド（大学受験向けUI）
├── style.css              # スタイルシート
├── package.json           # 依存関係
├── .env                   # 環境変数（.gitignoreに追加）
└── README.md             # このファイル
```

### ログ

サーバーのログはコンソールに出力されます。エラーやAPI呼び出しの詳細が確認できます。

## トラブルシューティング

### APIキーエラー
- OpenAI APIキーが正しく設定されているか確認
- APIキーが有効か確認

### CORSエラー
- `.env`ファイルの`CORS_ORIGIN`が正しく設定されているか確認
- フロントエンドのURLと一致しているか確認

### 問題生成エラー
- インターネット接続を確認
- OpenAI APIの利用制限を確認

## 今後の拡張予定

- より多くの大学入試パターンへの対応
- 問題の難易度自動調整機能
- 学習進捗管理機能
- 模擬試験機能 

<div class="related-section">
  <h2>関連項目</h2>
  <div class="related-navigation">
    <button id="prev-related">前へ</button>
    <span id="current-related"></span>
    <button id="next-related">次へ</button>
  </div>
</div> 