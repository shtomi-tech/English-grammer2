# English Grammar Learning Site

英語文法学習サイトです。文法の説明、練習問題、AIを使った学習支援機能を提供します。

## 機能

- 文法解説（品詞、時制、文型、関係代名詞など）
- 練習問題
- AIを使った学習支援（※静的サイトでは一部機能制限）

## 技術スタック

- HTML5
- CSS3
- JavaScript
- OpenAI API（一部機能）

## ローカル開発

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

## GitHub Pagesでの公開

このサイトはGitHub Pagesで公開されています。

### デプロイ方法

1. このリポジトリをGitHubにプッシュ
2. GitHubのSettings > Pagesで、Sourceを「GitHub Actions」に設定
3. mainブランチにプッシュすると自動的にデプロイされます

### 注意事項

- GitHub Pagesは静的サイトホスティングのため、サーバーサイドのAPI機能は使用できません
- AI機能を使用する場合は、別途APIサーバーを用意するか、フロントエンドのみの機能に制限してください

## ライセンス

MIT License 