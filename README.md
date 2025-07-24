# English Learning Hub

英語文法学習サイト - AIを活用したインタラクティブな英語学習プラットフォーム

## 🚀 新機能

### リファクタリング完了
- **モジュラーアーキテクチャ**: 設定、API通信、UI操作、状態管理を分離
- **設定の一元化**: `config/app.config.js`で全設定を管理
- **エラーハンドリングの改善**: リトライ機能とタイムアウト処理
- **パフォーマンス最適化**: 遅延読み込みとキャッシュ機能
- **保守性の向上**: クラスベースの設計と型安全性

## 📁 プロジェクト構造

```
English-grammer2/
├── config/
│   └── app.config.js          # アプリケーション設定
├── utils/
│   ├── api.js                 # API通信管理
│   ├── ui.js                  # UI操作管理
│   └── state.js               # 状態管理
├── components/
│   ├── logo.js                # ロゴコンポーネント
│   └── ...                    # その他のコンポーネント
├── services/
│   └── openaiService.js       # OpenAI API サービス
├── parts-of-speech/           # 品詞関連ページ
├── sentence-patterns/         # 文型関連ページ
├── phrases/                   # 句関連ページ
├── clauses/                   # 節関連ページ
├── sentence-types/            # 文の種類関連ページ
├── tenses/                    # 時制関連ページ
├── modals/                    # 助動詞関連ページ
├── subjunctive/               # 仮定法関連ページ
├── comparison/                # 比較関連ページ
├── app.js                     # メインアプリケーション
├── index.html                 # メインページ
├── style.css                  # スタイルシート
├── server.js                  # サーバー（静的サイト用）
└── package.json               # 依存関係
```

## 🛠️ 技術スタック

- **フロントエンド**: HTML5, CSS3, JavaScript (ES6+)
- **スタイリング**: Tailwind CSS
- **バックエンド**: Node.js, Express.js
- **AI**: OpenAI API
- **フォント**: SF Pro Display (Apple公式フォント)

## 🚀 セットアップ

### 1. 依存関係のインストール
```bash
npm install
```

### 2. 環境変数の設定
`.env`ファイルを作成し、以下を設定：
```
OPENAI_API_KEY=your_openai_api_key_here
PORT=3000
```

### 3. 開発サーバーの起動
```bash
npm run dev
```

### 4. 本番ビルド
```bash
npm start
```

## 🚀 自動デプロイ設定

### GitHub Actions による自動デプロイ

このプロジェクトはGitHub Actionsを使用してレンタルサーバーに自動デプロイする設定が含まれています。

#### 必要な設定

1. **GitHub Secrets の設定**
   GitHubリポジトリのSettings > Secrets and variables > Actionsで以下を設定：

   - `HOST`: レンタルサーバーのIPアドレス
   - `USERNAME`: SSHユーザー名
   - `SSH_KEY`: SSH秘密鍵（base64エンコード）
   - `PORT`: SSHポート番号（通常は22）
   - `PROJECT_PATH`: サーバー上のプロジェクトパス

2. **サーバー側の準備**
   ```bash
   # PM2のインストール
   npm install -g pm2
   
   # プロジェクトディレクトリの作成
   mkdir -p /path/to/your/project
   cd /path/to/your/project
   
   # Gitリポジトリのクローン
   git clone https://github.com/your-username/your-repo.git .
   
   # 環境変数ファイルの作成
   cp env.example .env
   # .envファイルを編集して必要な値を設定
   
   # 初回デプロイ
   chmod +x scripts/deploy.sh
   ./scripts/deploy.sh
   ```

3. **デプロイの流れ**
   - `main`ブランチにプッシュすると自動的にデプロイが開始
   - 依存関係のインストール
   - PM2によるアプリケーションの再起動
   - デプロイ状況のログ確認

#### 手動デプロイ

```bash
# サーバーにSSH接続
ssh username@your-server

# プロジェクトディレクトリに移動
cd /path/to/your/project

# 最新のコードを取得
git pull origin main

# デプロイスクリプトを実行
./scripts/deploy.sh
```

## 🏗️ アーキテクチャ

### 設定管理 (`config/app.config.js`)
- API設定
- 難易度設定
- UI設定
- 学習トピック設定
- エラーメッセージ

### API通信管理 (`utils/api.js`)
- リトライ機能
- タイムアウト処理
- エラーハンドリング
- ヘルスチェック

### UI操作管理 (`utils/ui.js`)
- 要素の表示/非表示
- アニメーション
- メッセージ表示
- レスポンシブ対応

### 状態管理 (`utils/state.js`)
- アプリケーション状態
- 永続化
- リスナーシステム
- 統計情報

### メインアプリケーション (`app.js`)
- アプリケーション初期化
- イベントリスナー設定
- 問題生成・解答処理
- フィードバック表示

## 📚 学習コンテンツ

### 品詞
- 名詞、冠詞、動詞（be動詞、一般動詞、不規則動詞）
- 形容詞、副詞、前置詞、接続詞
- 単語・句・節の概念

### 文型
- 第1文型〜第5文型
- 受動態（各文型の受動態）
- 使役動詞、知覚動詞
- There is構文

### 句
- 不定詞、be to 不定詞
- 不定詞と動名詞の識別
- -ing形の4つの可能性
- 過去分詞の4つの可能性
- 付帯状況のwith構文

### 節
- 関係代名詞（制限用法・非制限用法）
- 前置詞＋関係代名詞
- 関係副詞、従属接続詞
- 間接疑問文、複合関係副詞
- 強調構文

### 文の種類
- 感嘆文、疑問文、平叙文、命令文
- 条件文

### 時制
- 現在形、過去形、完了形
- 3人称・単数・現在のs
- 時制の一致

### 助動詞
- can/could, will/would, may/might
- must, should, shall, need, dare

### 仮定法・比較
- 仮定法の公式、倒置、if節がない仮定法
- 比較級、最上級、原級比較

## 🎯 機能

### AI問題生成
- **和文英訳問題**: 日本語から英語への翻訳練習
- **英作文問題**: テーマに基づく英作文練習
- **穴埋め問題**: 文法項目に特化した穴埋め練習

### 難易度調整システム
- **自動調整**: 解答の出来に応じて難易度を自動調整
- **4段階**: 英検3級〜準1級レベル
- **履歴管理**: 難易度変更の履歴を記録

### 練習管理
- **練習回数**: 1日5回までの練習制限
- **進捗表示**: プログレスバーで進捗を可視化
- **統計情報**: 学習状況の統計表示

### フィードバックシステム
- **総合評価**: 100点満点での評価
- **文法チェック**: 詳細な文法エラーの指摘
- **改善提案**: 具体的な改善方法の提示
- **模範解答**: 参考となる模範解答の提供

## 🎨 デザイン

### Apple Design System
- **SF Pro Display**: Apple公式フォントの使用
- **グラスモーフィズム**: モダンなガラス効果
- **アニメーション**: スムーズなトランジション
- **レスポンシブ**: 全デバイス対応

### カラーパレット
- **Primary**: Army Blue (#101841)
- **Secondary**: Coolish Blue (#70acce)
- **Accent**: Maldive Blue (#144da0)

## 🔧 開発

### 新しい機能の追加
1. `config/app.config.js`で設定を追加
2. `utils/`ディレクトリに必要なユーティリティを作成
3. `app.js`で機能を統合
4. テストとドキュメント更新

### スタイルのカスタマイズ
- `style.css`でカスタムスタイルを追加
- Tailwind CSSクラスを活用
- レスポンシブデザインを考慮

## 📊 パフォーマンス

### 最適化済み
- **遅延読み込み**: 必要な時のみリソースを読み込み
- **キャッシュ**: 設定とデータのキャッシュ
- **エラー処理**: 堅牢なエラーハンドリング
- **メモリ管理**: 効率的なメモリ使用

## 🤝 貢献

1. このリポジトリをフォーク
2. 機能ブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 📄 ライセンス

MIT License - 詳細は [LICENSE](LICENSE) ファイルを参照

## 📞 サポート

問題や質問がある場合は、GitHubのIssuesページでお知らせください。

---

**English Learning Hub** - AIを活用した革新的な英語学習プラットフォーム 