# タイマーを削除するPowerShellスクリプト

# HTMLファイルを検索してタイマーの要素を削除
Get-ChildItem -Recurse -Filter "*.html" | ForEach-Object {
    $filePath = $_.FullName
    $content = Get-Content $filePath -Raw -Encoding UTF8
    
    # タイマーカード全体を削除（学習時間計測ストップウォッチのセクション）
    $content = $content -replace '<!-- 学習時間計測ストップウォッチ -->[\s\S]*?<!-- タイトルパーツ -->', '<!-- タイトルパーツ -->'
    
    # タイマーカード全体を削除（学習時間計測ストップウォッチのセクション）- 別のパターン
    $content = $content -replace '<div class="apple-card mb-8">[\s\S]*?学習時間を計測しよう[\s\S]*?</div>\s*</div>\s*</div>', ''
    
    # タイマー関連のスクリプトを削除
    $content = $content -replace '// ストップウォッチ機能[\s\S]*?updateTimerDisplay\(\);', ''
    
    # タイマーボタンのイベントリスナーを削除
    $content = $content -replace 'document\.getElementById\(''start-timer''\)\.onclick[\s\S]*?\);', ''
    $content = $content -replace 'document\.getElementById\(''stop-timer''\)\.onclick[\s\S]*?\);', ''
    $content = $content -replace 'document\.getElementById\(''reset-timer''\)\.onclick[\s\S]*?\);', ''
    
    # タイマー表示の更新を削除
    $content = $content -replace 'document\.getElementById\(''timer-display''\)\.textContent[\s\S]*?\);', ''
    
    # 空行を整理
    $content = $content -replace '\n\s*\n\s*\n', "`n`n"
    
    # ファイルに書き戻し
    Set-Content $filePath $content -Encoding UTF8
    
    Write-Host "Processed: $($_.Name)"
}

Write-Host "Timer removal completed!" 