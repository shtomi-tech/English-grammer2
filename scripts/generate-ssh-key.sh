#!/bin/bash

# SSH鍵自動生成スクリプト
# 初心者向け - 対話式でSSH鍵を生成し、サーバーに登録します

set -e

echo "🔑 SSH鍵自動生成スクリプト"
echo "================================"

# 色付きの出力関数
print_success() {
    echo -e "\033[32m✅ $1\033[0m"
}

print_info() {
    echo -e "\033[34mℹ️  $1\033[0m"
}

print_warning() {
    echo -e "\033[33m⚠️  $1\033[0m"
}

print_error() {
    echo -e "\033[31m❌ $1\033[0m"
}

# 1. ユーザー情報の入力
echo ""
echo "📝 ユーザー情報を入力してください"
echo "--------------------------------"

read -p "メールアドレスを入力してください: " email
read -p "サーバーのIPアドレスを入力してください: " server_ip
read -p "サーバーのユーザー名を入力してください: " username
read -p "SSHポート番号を入力してください（通常は22）: " ssh_port

# デフォルト値の設定
ssh_port=${ssh_port:-22}

echo ""
print_info "入力された情報:"
echo "  メールアドレス: $email"
echo "  サーバーIP: $server_ip"
echo "  ユーザー名: $username"
echo "  SSHポート: $ssh_port"

# 2. .sshディレクトリの作成
echo ""
print_info "SSHディレクトリを作成中..."
mkdir -p ~/.ssh
chmod 700 ~/.ssh

# 3. SSH鍵の生成
echo ""
print_info "SSH鍵を生成中..."
ssh-keygen -t rsa -b 4096 -C "$email" -f ~/.ssh/id_rsa -N ""

if [ $? -eq 0 ]; then
    print_success "SSH鍵の生成が完了しました"
else
    print_error "SSH鍵の生成に失敗しました"
    exit 1
fi

# 4. 権限の設定
echo ""
print_info "SSH鍵の権限を設定中..."
chmod 600 ~/.ssh/id_rsa
chmod 644 ~/.ssh/id_rsa.pub

# 5. 公開鍵の内容を表示
echo ""
print_info "生成された公開鍵:"
echo "--------------------------------"
cat ~/.ssh/id_rsa.pub
echo "--------------------------------"

# 6. サーバーへの公開鍵登録
echo ""
print_info "サーバーに公開鍵を登録中..."
print_warning "サーバーのパスワードを求められます"

ssh-copy-id -p $ssh_port $username@$server_ip

if [ $? -eq 0 ]; then
    print_success "公開鍵の登録が完了しました"
else
    print_warning "公開鍵の自動登録に失敗しました"
    echo ""
    print_info "手動で公開鍵を登録してください:"
    echo "1. サーバーにSSH接続: ssh $username@$server_ip"
    echo "2. 以下のコマンドを実行:"
    echo "   mkdir -p ~/.ssh"
    echo "   echo '$(cat ~/.ssh/id_rsa.pub)' >> ~/.ssh/authorized_keys"
    echo "   chmod 700 ~/.ssh"
    echo "   chmod 600 ~/.ssh/authorized_keys"
fi

# 7. 接続テスト
echo ""
print_info "SSH接続をテスト中..."
ssh -p $ssh_port -o ConnectTimeout=10 $username@$server_ip "echo 'SSH接続テスト成功！'"

if [ $? -eq 0 ]; then
    print_success "SSH接続テストが成功しました"
else
    print_warning "SSH接続テストに失敗しました"
fi

# 8. 秘密鍵のbase64エンコード
echo ""
print_info "秘密鍵をbase64エンコード中..."
base64_key=$(cat ~/.ssh/id_rsa | base64 -w 0)

# 9. GitHub Secrets用の情報を表示
echo ""
print_success "SSH鍵の生成が完了しました！"
echo ""
print_info "GitHub Secrets に設定する情報:"
echo "--------------------------------"
echo "名前: SSH_KEY"
echo "値: 以下の長い文字列をコピーしてください"
echo "--------------------------------"
echo "$base64_key"
echo "--------------------------------"

# 10. 設定手順を表示
echo ""
print_info "次のステップ:"
echo "1. GitHubリポジトリの Settings → Secrets and variables → Actions に移動"
echo "2. 'New repository secret' をクリック"
echo "3. 名前: SSH_KEY"
echo "4. 値: 上記のbase64エンコードされた文字列を貼り付け"
echo "5. 'Add secret' をクリック"
echo ""
print_info "その他の必要なSecrets:"
echo "- HOST: $server_ip"
echo "- USERNAME: $username"
echo "- PORT: $ssh_port"
echo "- PROJECT_PATH: /home/$username/your-project-path"

echo ""
print_success "SSH鍵の生成と設定が完了しました！" 