# タイマーのHTMLブロックと関連JSを強力に削除するスクリプト

Get-ChildItem -Recurse -Filter "*.html" | ForEach-Object {
    $filePath = $_.FullName
    $content = Get-Content $filePath -Raw -Encoding UTF8

    # タイマーのapple-card全体を削除（timer-displayを含むdiv.apple-card ... </div> まで）
    $content = $content -replace '<div class="apple-card mb-8">[\s\S]*?<div id="timer-display"[\s\S]*?</div>\s*</div>', ''

    # タイマーのHTMLブロックが他のパターンでも残っていれば削除
    $content = $content -replace '<div id="timer-display"[\s\S]*?</div>', ''

    # タイマー関連のスクリプト（let timerInterval; など）を削除
    $content = $content -replace 'let timerInterval;[\s\S]*?updateTimerDisplay\(\);', ''

    # タイマーのボタンやイベントリスナーも削除
    $content = $content -replace 'document\.getElementById\(''start-timer''\)\.onclick[\s\S]*?;\n', ''
    $content = $content -replace 'document\.getElementById\(''stop-timer''\)\.onclick[\s\S]*?;\n', ''
    $content = $content -replace 'document\.getElementById\(''reset-timer''\)\.onclick[\s\S]*?;\n', ''

    # 空行を整理
    $content = $content -replace '\n\s*\n\s*\n', "`n`n"

    Set-Content $filePath $content -Encoding UTF8
    Write-Host "Processed: $($_.Name)"
}

Write-Host "Strong timer removal completed!" 