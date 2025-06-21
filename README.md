# English Learning Site with OpenAI AI

英語学習サイトのバックエンドAPIです。OpenAI AIを使用して動的に4択問題を生成します。

## 機能

- OpenAI AIを使用した動的問題生成
- 複数の文法トピック対応（名詞、動詞、形容詞、副詞、前置詞、接続詞）
- 難易度調整機能
- RESTful API
- CORS対応

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
  "topic": "noun",
  "difficulty": "medium"
}
```

**レスポンス：**
```json
{
  "success": true,
  "data": {
    "question": "次のうち名詞はどれ？",
    "options": [
      {"text": "run", "correct": false},
      {"text": "apple", "correct": true},
      {"text": "quickly", "correct": false},
      {"text": "beautiful", "correct": false}
    ],
    "explanation": "'apple'は物を表す名詞です。"
  },
  "topic": "noun",
  "difficulty": "medium"
}
```

## 利用可能なトピック

- `noun` - 名詞
- `verb` - 動詞
- `adjective` - 形容詞
- `adverb` - 副詞
- `preposition` - 前置詞
- `conjunction` - 接続詞

## 難易度

- `easy` - 初級
- `medium` - 中級
- `hard` - 上級

## フロントエンドとの連携

フロントエンド（index.html）を更新して、このバックエンドAPIを使用するように変更してください。

## セキュリティ

- APIキーは環境変数で管理
- CORS設定で許可されたオリジンのみアクセス可能
- 入力値の検証

## 開発

### ファイル構成
```
├── server.js              # メインサーバーファイル
├── services/
│   └── openaiService.js   # OpenAI AIサービス
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