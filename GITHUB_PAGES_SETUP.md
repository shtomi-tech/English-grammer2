# GitHub Pages での公開手順

このドキュメントでは、英語文法学習サイトをGitHub Pagesで公開する手順を説明します。

## 前提条件

- GitHubアカウントを持っている
- このプロジェクトをGitHubリポジトリにプッシュしている

## 手順

### 1. GitHubリポジトリの作成

1. GitHubにログイン
2. 右上の「+」ボタン → 「New repository」をクリック
3. リポジトリ名を入力（例：`english-grammar-learning`）
4. 「Public」を選択
5. 「Create repository」をクリック

### 2. ローカルプロジェクトをGitHubにプッシュ

```bash
# ローカルプロジェクトでGitを初期化（まだの場合）
git init

# リモートリポジトリを追加
git remote add origin https://github.com/あなたのユーザー名/english-grammar-learning.git

# ファイルをステージング
git add .

# コミット
git commit -m "Initial commit"

# mainブランチにプッシュ
git push -u origin main
```

### 3. GitHub Pagesの設定

1. GitHubリポジトリのページで「Settings」タブをクリック
2. 左サイドバーの「Pages」をクリック
3. 「Source」セクションで「GitHub Actions」を選択
4. 設定は自動的に適用されます

### 4. デプロイの確認

1. mainブランチにプッシュすると、自動的にGitHub Actionsが実行されます
2. 「Actions」タブでデプロイの進行状況を確認できます
3. デプロイが完了すると、サイトのURLが表示されます

## サイトのURL

デプロイが完了すると、以下の形式のURLでサイトにアクセスできます：

```
https://あなたのユーザー名.github.io/english-grammar-learning/
```

## 注意事項

### 静的サイトの制限

GitHub Pagesは静的サイトホスティングサービスのため、以下の制限があります：

- **サーバーサイドのAPI機能は使用できません**
- Node.jsサーバー（server.js）は動作しません
- OpenAI APIなどの外部API呼び出しは、フロントエンドから直接行う必要があります

### 現在の機能

このサイトは以下の機能を提供します：

- ✅ 文法解説ページ
- ✅ 練習問題（静的コンテンツ）
- ✅ ナビゲーション機能
- ✅ レスポンシブデザイン

### 将来的な拡張

AI機能を追加したい場合は、以下の選択肢があります：

1. **別のAPIサーバーを用意**
   - Vercel、Netlify、HerokuなどでAPIサーバーをデプロイ
   - フロントエンドからAPIサーバーにリクエスト

2. **フロントエンドのみのAI機能**
   - OpenAI APIを直接フロントエンドから呼び出し
   - APIキーの管理に注意が必要

## トラブルシューティング

### デプロイが失敗する場合

1. GitHub Actionsのログを確認
2. ファイルパスやリンクが正しいか確認
3. ブランチ名が`main`になっているか確認

### サイトが表示されない場合

1. GitHub Pagesの設定を確認
2. デプロイが完了しているか確認
3. URLが正しいか確認

## ローカルでのテスト

デプロイ前にローカルでテストする場合：

```bash
# 依存関係をインストール
npm install

# 静的サイトをビルド
npm run build

# ローカルサーバーでテスト
npm run serve
```

これで `http://localhost:8080` でサイトを確認できます。

## 更新方法

サイトを更新する場合は、以下の手順で行います：

```bash
# 変更をコミット
git add .
git commit -m "Update content"

# GitHubにプッシュ
git push origin main
```

プッシュすると自動的にデプロイが実行されます。 