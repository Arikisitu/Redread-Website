$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$dir = Join-Path $root "screenshots"
$jsonPath = Join-Path $root "screenshots.json"
$jsPath = Join-Path $root "assets\gallery-manifest.js"

$files = Get-ChildItem -LiteralPath $dir -File |
    Where-Object { $_.Extension.ToLowerInvariant() -in @(".png",".jpg",".jpeg",".webp",".gif") } |
    Sort-Object Name

$items = @()

foreach ($file in $files) {
    $label = [System.IO.Path]::GetFileNameWithoutExtension($file.Name)
    $label = ($label -replace '[-_]+', ' ') -replace '\s+', ' '
    $label = $label.Trim()

    $items += [ordered]@{
        src = "screenshots/$($file.Name)"
        title = $label.ToUpperInvariant()
        caption = "RedRead screenshot"
    }
}

if ($items.Count -eq 0) {
    $jsonText = "[]"
    $jsText = "/* Generated screenshot manifest. */`r`nwindow.REDREAD_SCREENSHOTS = [];`r`n"
} else {
    $jsonText = $items | ConvertTo-Json -Depth 5
    $jsItems = $items | ConvertTo-Json -Depth 5
    $jsText = "/* Generated screenshot manifest. */`r`nwindow.REDREAD_SCREENSHOTS = $jsItems;`r`n"
}

Set-Content -LiteralPath $jsonPath -Value $jsonText -Encoding UTF8
Set-Content -LiteralPath $jsPath -Value $jsText -Encoding UTF8

Write-Host ""
Write-Host "RedRead screenshot gallery updated." -ForegroundColor Green
Write-Host "Images found: $($files.Count)"
Write-Host ""
Write-Host "Refresh index.html to see the changes."
Write-Host ""
Read-Host "Press Enter to close"
