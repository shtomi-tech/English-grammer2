# SSH鍵自動生成スクリプト (Windows PowerShell版)
# 初心者向け - 対話式でSSH鍵を生成し、サーバーに登録します

# エラー時に停止
$ErrorActionPreference = "Stop"

Write-Host "🔑 SSH鍵自動生成スクリプト (Windows版)" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# 色付きの出力関数
function Write-Success {
    param([string]$Message)
    Write-Host "✅ $Message" -ForegroundColor Green
}

function Write-Info {
    param([string]$Message)
    Write-Host "ℹ️  $Message" -ForegroundColor Blue
}

function Write-Warning {
    param([string]$Message)
    Write-Host "⚠️  $Message" -ForegroundColor Yellow
}

function Write-Error {
    param([string]$Message)
    Write-Host "❌ $Message" -ForegroundColor Red
}

# 1. ユーザー情報の入力
Write-Host ""
Write-Host "📝 ユーザー情報を入力してください" -ForegroundColor White
Write-Host "--------------------------------" -ForegroundColor White

$email = Read-Host "メールアドレスを入力してください"
$server_ip = Read-Host "サーバーのIPアドレスを入力してください"
$username = Read-Host "サーバーのユーザー名を入力してください"
$ssh_port = Read-Host "SSHポート番号を入力してください（通常は22）"

# デフォルト値の設定
if ([string]::IsNullOrEmpty($ssh_port)) {
    $ssh_port = "22"
}

Write-Host ""
Write-Info "入力された情報:"
Write-Host "  メールアドレス: $email"
Write-Host "  サーバーIP: $server_ip"
Write-Host "  ユーザー名: $username"
Write-Host "  SSHポート: $ssh_port"

# 2. OpenSSHの確認
Write-Host ""
Write-Info "OpenSSHの確認中..."
try {
    $sshVersion = ssh -V 2>&1
    Write-Success "OpenSSHが利用可能です"
} catch {
    Write-Error "OpenSSHが見つかりません"
    Write-Host ""
    Write-Info "OpenSSHをインストールしてください:"
    Write-Host "1. Windows設定 → アプリ → オプション機能"
    Write-Host "2. '機能の追加' をクリック"
    Write-Host "3. 'OpenSSH クライアント' を検索してインストール"
    Write-Host "4. コンピューターを再起動"
    exit 1
}

# 3. .sshディレクトリの作成
Write-Host ""
Write-Info "SSHディレクトリを作成中..."
$sshDir = "$env:USERPROFILE\.ssh"
if (!(Test-Path $sshDir)) {
    New-Item -ItemType Directory -Path $sshDir -Force
}

# 4. SSH鍵の生成
Write-Host ""
Write-Info "SSH鍵を生成中..."
$privateKeyPath = "$sshDir\id_rsa"
$publicKeyPath = "$sshDir\id_rsa.pub"

try {
    ssh-keygen -t rsa -b 4096 -C $email -f $privateKeyPath -N '""'
    Write-Success "SSH鍵の生成が完了しました"
} catch {
    Write-Error "SSH鍵の生成に失敗しました"
    exit 1
}

# 5. 権限の設定
Write-Host ""
Write-Info "SSH鍵の権限を設定中..."
try {
    # 秘密鍵の権限を制限
    icacls $privateKeyPath /inheritance:r
    icacls $privateKeyPath /grant:r "$env:USERNAME`:F"
    
    # 公開鍵の権限を設定
    icacls $publicKeyPath /inheritance:r
    icacls $publicKeyPath /grant:r "$env:USERNAME`:F"
    
    Write-Success "権限の設定が完了しました"
} catch {
    Write-Warning "権限の設定に失敗しました"
}

# 6. 公開鍵の内容を表示
Write-Host ""
Write-Info "生成された公開鍵:"
Write-Host "--------------------------------" -ForegroundColor Gray
Get-Content $publicKeyPath
Write-Host "--------------------------------" -ForegroundColor Gray

# 7. サーバーへの公開鍵登録
Write-Host ""
Write-Info "サーバーに公開鍵を登録中..."
Write-Warning "サーバーのパスワードを求められます"

try {
    ssh-copy-id -p $ssh_port "${username}@${server_ip}"
    Write-Success "公開鍵の登録が完了しました"
} catch {
    Write-Warning "公開鍵の自動登録に失敗しました"
    Write-Host ""
    Write-Info "手動で公開鍵を登録してください:"
    Write-Host "1. サーバーにSSH接続: ssh $username@$server_ip"
    Write-Host "2. 以下のコマンドを実行:"
    Write-Host "   mkdir -p ~/.ssh"
    Write-Host "   echo '$(Get-Content $publicKeyPath)' >> ~/.ssh/authorized_keys"
    Write-Host "   chmod 700 ~/.ssh"
    Write-Host "   chmod 600 ~/.ssh/authorized_keys"
}

# 8. 接続テスト
Write-Host ""
Write-Info "SSH接続をテスト中..."
try {
    $testResult = ssh -p $ssh_port -o ConnectTimeout=10 "${username}@${server_ip}" "echo 'SSH接続テスト成功！'"
    Write-Success "SSH接続テストが成功しました"
} catch {
    Write-Warning "SSH接続テストに失敗しました"
}

# 9. 秘密鍵のbase64エンコード
Write-Host ""
Write-Info "秘密鍵をbase64エンコード中..."
$privateKeyContent = Get-Content $privateKeyPath -Raw
$base64Key = [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes($privateKeyContent))

# 10. GitHub Secrets用の情報を表示
Write-Host ""
Write-Success "SSH鍵の生成が完了しました！"
Write-Host ""
Write-Info "GitHub Secrets に設定する情報:"
Write-Host "--------------------------------" -ForegroundColor Gray
Write-Host "名前: SSH_KEY"
Write-Host "値: 以下の長い文字列をコピーしてください"
Write-Host "--------------------------------" -ForegroundColor Gray
Write-Host $base64Key -ForegroundColor Yellow
Write-Host "--------------------------------" -ForegroundColor Gray

# 11. 設定手順を表示
Write-Host ""
Write-Info "次のステップ:"
Write-Host "1. GitHubリポジトリの Settings → Secrets and variables → Actions に移動"
Write-Host "2. 'New repository secret' をクリック"
Write-Host "3. 名前: SSH_KEY"
Write-Host "4. 値: 上記のbase64エンコードされた文字列を貼り付け"
Write-Host "5. 'Add secret' をクリック"
Write-Host ""
Write-Info "その他の必要なSecrets:"
Write-Host "- HOST: $server_ip"
Write-Host "- USERNAME: $username"
Write-Host "- PORT: $ssh_port"
Write-Host "- PROJECT_PATH: /home/$username/your-project-path"

Write-Host ""
Write-Success "SSH鍵の生成と設定が完了しました！" 