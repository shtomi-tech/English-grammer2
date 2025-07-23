# 学習ガイドを削除するPowerShellスクリプト

# HTMLファイルを検索して学習ガイドの要素を削除
Get-ChildItem -Recurse -Filter "*.html" | ForEach-Object {
    $filePath = $_.FullName
    $content = Get-Content $filePath -Raw -Encoding UTF8
    
    # 学習ガイドのコンテナ要素を削除
    $content = $content -replace '<!-- 学習方法ガイド（共通パーツ） -->\s*<div id="learning-guide-container"></div>\s*', ''
    
    # 学習ガイドのスクリプト部分を削除（fetch('../components/learning-guide.html')を含む部分）
    $content = $content -replace '// 学習方法ガイドの読み込みとカスタマイズ[\s\S]*?fetch\(.*?learning-guide\.html.*?\)[\s\S]*?}\);', ''
    
    # 学習ガイドのタイトル設定部分を削除
    $content = $content -replace 'document\.getElementById\(''learning-guide-title-text''\)\.textContent[\s\S]*?\);', ''
    $content = $content -replace 'document\.getElementById\(''learning-guide-step1-desc''\)\.textContent[\s\S]*?\);', ''
    $content = $content -replace 'document\.getElementById\(''learning-guide-step2-desc''\)\.textContent[\s\S]*?\);', ''
    $content = $content -replace 'document\.getElementById\(''learning-guide-step3-desc''\)\.textContent[\s\S]*?\);', ''
    $content = $content -replace 'document\.getElementById\(''learning-guide-tip1''\)\.innerHTML[\s\S]*?\);', ''
    $content = $content -replace 'document\.getElementById\(''learning-guide-tip2''\)\.innerHTML[\s\S]*?\);', ''
    $content = $content -replace 'document\.getElementById\(''learning-guide-tip3''\)\.innerHTML[\s\S]*?\);', ''
    $content = $content -replace 'document\.getElementById\(''learning-guide-title''\)\.textContent[\s\S]*?\);', ''
    $content = $content -replace 'document\.getElementById\(''learning-guide-time''\)\.innerHTML[\s\S]*?\);', ''
    
    # 学習ガイドのコンテナ設定部分を削除
    $content = $content -replace 'document\.getElementById\(''learning-guide-container''\)\.innerHTML[\s\S]*?\);', ''
    
    # 空行を整理
    $content = $content -replace '\n\s*\n\s*\n', "`n`n"
    
    # ファイルに書き戻し
    Set-Content $filePath $content -Encoding UTF8
    
    Write-Host "Processed: $($_.Name)"
}

Write-Host "Learning guide removal completed!" 