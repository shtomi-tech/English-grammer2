# practice-question.htmlのfetch記述を完全削除するスクリプト

# HTMLファイルからfetch記述を削除
Get-ChildItem -Recurse -Filter "*.html" | ForEach-Object {
    $filePath = $_.FullName
    $content = Get-Content $filePath -Raw -Encoding UTF8
    
    # fetch('components/practice-question.html')またはfetch("components/practice-question.html")
    $content = [regex]::Replace($content, 'fetch\(["'']components/practice-question.html["'']\)[^;]*;', '')
    $content = [regex]::Replace($content, 'fetch\(["'']\.\.\/components/practice-question.html["'']\)[^;]*;', '')
    
    # fetchのPromiseチェーン全体を削除（.then, .catch含む）
    $content = [regex]::Replace($content, 'fetch\(["''](\.\./)?components/practice-question.html["'']\)[\s\S]*?\.catch\([\s\S]*?\);', '')
    
    # 空行を整理
    $content = [regex]::Replace($content, '\n\s*\n\s*\n', "`n`n")
    
    Set-Content $filePath $content -Encoding UTF8
    Write-Host "Processed: $($_.Name)"
}

# JSファイルからfetch記述を削除
Get-ChildItem -Recurse -Filter "*.js" | ForEach-Object {
    $filePath = $_.FullName
    $content = Get-Content $filePath -Raw -Encoding UTF8
    
    $content = [regex]::Replace($content, 'fetch\(["'']components/practice-question.html["'']\)[^;]*;', '')
    $content = [regex]::Replace($content, 'fetch\(["'']\.\.\/components/practice-question.html["'']\)[^;]*;', '')
    $content = [regex]::Replace($content, 'fetch\(["''](\.\./)?components/practice-question.html["'']\)[\s\S]*?\.catch\([\s\S]*?\);', '')
    
    $content = [regex]::Replace($content, '\n\s*\n\s*\n', "`n`n")
    Set-Content $filePath $content -Encoding UTF8
    Write-Host "Processed JS: $($_.Name)"
}

Write-Host "practice-question.html fetch removal completed!" 