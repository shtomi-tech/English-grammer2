# 和文英訳練習問題を削除するPowerShellスクリプト

# HTMLファイルを検索して和文英訳練習問題の要素を削除
Get-ChildItem -Recurse -Filter "*.html" | ForEach-Object {
    $filePath = $_.FullName
    $content = Get-Content $filePath -Raw -Encoding UTF8
    
    # practice-question.htmlコンポーネントの読み込みを削除
    $content = $content -replace 'fetch\([''"]\.\.\/components\/practice-question\.html[''"]\)[\s\S]*?\.then\([\s\S]*?\)\.catch\([\s\S]*?\);', ''
    $content = $content -replace 'fetch\([''"]components\/practice-question\.html[''"]\)[\s\S]*?\.then\([\s\S]*?\)\.catch\([\s\S]*?\);', ''
    
    # 和文英訳問題のイベントリスナーを削除
    $content = $content -replace '// 和文英訳問題のイベントリスナーを設定[\s\S]*?generateBtn\.textContent = ''新しい和文英訳問題を生成'';', ''
    
    # 和文英訳関連の関数呼び出しを削除
    $content = $content -replace 'generateTranslationProblem\(\);', ''
    $content = $content -replace 'checkTranslationAnswer\(\);', ''
    
    # 和文英訳関連のDOM要素を削除
    $content = $content -replace '<div id="translation-practice-container">[\s\S]*?</div>\s*</div>\s*</div>', ''
    
    # 空行を整理
    $content = $content -replace '\n\s*\n\s*\n', "`n`n"
    
    # ファイルに書き戻し
    Set-Content $filePath $content -Encoding UTF8
    
    Write-Host "Processed: $($_.Name)"
}

# JavaScriptファイルから和文英訳関連のコードを削除
Get-ChildItem -Recurse -Filter "*.js" | ForEach-Object {
    $filePath = $_.FullName
    $content = Get-Content $filePath -Raw -Encoding UTF8
    
    # 和文英訳問題生成関数を削除
    $content = $content -replace '// 和文英訳問題生成関数[\s\S]*?function generateTranslationProblem\(\)[\s\S]*?}', ''
    
    # 和文英訳添削関数を削除
    $content = $content -replace '// 和文英訳添削関数[\s\S]*?function checkTranslationAnswer\(\)[\s\S]*?}', ''
    
    # 和文英訳関連の静的データを削除
    $content = $content -replace '// 和文英訳の静的データ[\s\S]*?const translationProblems = \[[\s\S]*?\];', ''
    
    # 和文英訳関連の関数を削除
    $content = $content -replace 'function getStaticTranslationProblem\(\)[\s\S]*?}', ''
    
    # 空行を整理
    $content = $content -replace '\n\s*\n\s*\n', "`n`n"
    
    # ファイルに書き戻し
    Set-Content $filePath $content -Encoding UTF8
    
    Write-Host "Processed JS: $($_.Name)"
}

# practice-question.htmlコンポーネントファイルを削除
if (Test-Path "components/practice-question.html") {
    Remove-Item "components/practice-question.html"
    Write-Host "Removed: components/practice-question.html"
}

Write-Host "Translation practice removal completed!" 