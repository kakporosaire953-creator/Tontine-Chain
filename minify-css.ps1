# Script PowerShell pour minifier les fichiers CSS
# TontineChain - Optimisation Performance

Write-Host "Minification des fichiers CSS..." -ForegroundColor Green
Write-Host ""

# Fonction pour minifier un fichier CSS
function Minify-CSS {
    param (
        [string]$InputFile,
        [string]$OutputFile
    )
    
    Write-Host "Minification de $InputFile..." -ForegroundColor Cyan
    
    # Lire le contenu
    $content = Get-Content $InputFile -Raw
    
    # Supprimer les commentaires
    $content = $content -replace '/\*[\s\S]*?\*/', ''
    
    # Supprimer les espaces multiples
    $content = $content -replace '\s+', ' '
    
    # Supprimer les espaces autour des caracteres speciaux
    $content = $content -replace '\s*{\s*', '{'
    $content = $content -replace '\s*}\s*', '}'
    $content = $content -replace '\s*:\s*', ':'
    $content = $content -replace '\s*;\s*', ';'
    $content = $content -replace '\s*,\s*', ','
    $content = $content -replace '\s*>\s*', '>'
    $content = $content -replace '\s*\+\s*', '+'
    $content = $content -replace '\s*~\s*', '~'
    
    # Supprimer les points-virgules avant }
    $content = $content -replace ';}', '}'
    
    # Supprimer les espaces en debut et fin
    $content = $content.Trim()
    
    # Ecrire le fichier minifie
    $content | Out-File -FilePath $OutputFile -Encoding UTF8 -NoNewline
    
    # Calculer la reduction
    $originalSize = (Get-Item $InputFile).Length
    $minifiedSize = (Get-Item $OutputFile).Length
    $reduction = [math]::Round((($originalSize - $minifiedSize) / $originalSize) * 100, 2)
    
    Write-Host "   Taille originale: $([math]::Round($originalSize/1KB, 2)) KB" -ForegroundColor Yellow
    Write-Host "   Taille minifiee: $([math]::Round($minifiedSize/1KB, 2)) KB" -ForegroundColor Yellow
    Write-Host "   Reduction: $reduction%" -ForegroundColor Green
    Write-Host ""
}

# Liste des fichiers CSS a minifier
$cssFiles = @(
    @{Input="assets/css/global.css"; Output="assets/css/global.min.css"},
    @{Input="assets/css/style.css"; Output="assets/css/style.min.css"},
    @{Input="assets/css/sections.css"; Output="assets/css/sections.min.css"},
    @{Input="assets/css/theme.css"; Output="assets/css/theme.min.css"},
    @{Input="assets/css/logo.css"; Output="assets/css/logo.min.css"},
    @{Input="assets/css/app.css"; Output="assets/css/app.min.css"}
)

# Minifier chaque fichier
foreach ($file in $cssFiles) {
    if (Test-Path $file.Input) {
        Minify-CSS -InputFile $file.Input -OutputFile $file.Output
    } else {
        Write-Host "Fichier non trouve: $($file.Input)" -ForegroundColor Red
    }
}

Write-Host "Minification terminee!" -ForegroundColor Green
Write-Host ""
Write-Host "Prochaine etape: Mettre a jour les liens dans les fichiers HTML" -ForegroundColor Cyan
Write-Host "Remplacer les liens CSS par les versions .min.css" -ForegroundColor Gray
