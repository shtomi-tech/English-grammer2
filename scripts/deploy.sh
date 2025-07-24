#!/bin/bash

# デプロイスクリプト
set -e

echo "🚀 Starting deployment..."

# ログディレクトリを作成
mkdir -p logs

# 依存関係をインストール
echo "📦 Installing dependencies..."
npm ci --production

# 環境変数ファイルをコピー（存在する場合）
if [ -f .env ]; then
    echo "📋 Copying environment variables..."
    cp .env .env.backup
fi

# PM2でアプリケーションを再起動
echo "🔄 Restarting application with PM2..."
pm2 restart english-grammar-app || pm2 start ecosystem.config.js --env production

# デプロイ完了
echo "✅ Deployment completed successfully!"

# アプリケーションの状態を確認
echo "📊 Application status:"
pm2 status

# ログを表示
echo "📝 Recent logs:"
pm2 logs english-grammar-app --lines 10 