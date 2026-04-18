# Script PowerShell pour capturer le dashboard TontineChain
# Nécessite : Chrome/Edge installé

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  CAPTURE DASHBOARD TONTINECHAIN" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Vérifier si Chrome est installé
$chromePath = "C:\Program Files\Google\Chrome\Application\chrome.exe"
$edgePath = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"

$browserPath = $null
if (Test-Path $chromePath) {
    $browserPath = $chromePath
    Write-Host "✓ Chrome détecté" -ForegroundColor Green
} elseif (Test-Path $edgePath) {
    $browserPath = $edgePath
    Write-Host "✓ Edge détecté" -ForegroundColor Green
} else {
    Write-Host "✗ Aucun navigateur compatible trouvé" -ForegroundColor Red
    Write-Host "  Installe Chrome ou Edge pour continuer" -ForegroundColor Yellow
    exit
}

Write-Host ""
Write-Host "INSTRUCTIONS :" -ForegroundColor Yellow
Write-Host "1. Le dashboard va s'ouvrir dans ton navigateur" -ForegroundColor White
Write-Host "2. Attends que la page soit complètement chargée" -ForegroundColor White
Write-Host "3. Utilise l'outil de capture :" -ForegroundColor White
Write-Host "   - Windows + Shift + S (Windows 10/11)" -ForegroundColor Cyan
Write-Host "   - Ou Print Screen puis colle dans Paint" -ForegroundColor Cyan
Write-Host "4. Sauvegarde l'image dans : assets/images/dashboard-screenshot.png" -ForegroundColor White
Write-Host ""

# Obtenir le chemin absolu du dashboard
$currentPath = Get-Location
$dashboardPath = Join-Path $currentPath "app\dashboard.html"
$dashboardUrl = "file:///$($dashboardPath -replace '\\', '/')"

Write-Host "Ouverture du dashboard..." -ForegroundColor Cyan
Write-Host "URL: $dashboardUrl" -ForegroundColor Gray
Write-Host ""

# Ouvrir le dashboard en plein écran
Start-Process $browserPath -ArgumentList "--start-fullscreen", $dashboardUrl

Write-Host "✓ Dashboard ouvert !" -ForegroundColor Green
Write-Host ""
Write-Host "PROCHAINES ÉTAPES :" -ForegroundColor Yellow
Write-Host "1. Appuie sur F11 pour le mode plein écran (si pas déjà fait)" -ForegroundColor White
Write-Host "2. Prends la capture d'écran (Windows + Shift + S)" -ForegroundColor White
Write-Host "3. Sauvegarde dans : assets\images\dashboard-screenshot.png" -ForegroundColor White
Write-Host "4. Appuie sur Entrée ici quand c'est fait..." -ForegroundColor White
Write-Host ""

Read-Host "Appuie sur Entrée quand la capture est sauvegardée"

# Vérifier si l'image existe
$imagePath = Join-Path $currentPath "assets\images\dashboard-screenshot.png"
if (Test-Path $imagePath) {
    Write-Host ""
    Write-Host "✓ Image trouvée !" -ForegroundColor Green
    
    # Obtenir les infos de l'image
    $imageInfo = Get-Item $imagePath
    $sizeKB = [math]::Round($imageInfo.Length / 1KB, 2)
    
    Write-Host "  Fichier : $($imageInfo.Name)" -ForegroundColor Cyan
    Write-Host "  Taille  : $sizeKB KB" -ForegroundColor Cyan
    Write-Host "  Modifié : $($imageInfo.LastWriteTime)" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "✓ SUCCÈS ! L'image du dashboard a été mise à jour." -ForegroundColor Green
    Write-Host ""
    Write-Host "Tu peux maintenant :" -ForegroundColor Yellow
    Write-Host "  1. Ouvrir index.html pour voir le résultat" -ForegroundColor White
    Write-Host "  2. Ou lancer le serveur local pour tester" -ForegroundColor White
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "✗ Image non trouvée" -ForegroundColor Red
    Write-Host "  Assure-toi de sauvegarder l'image dans :" -ForegroundColor Yellow
    Write-Host "  $imagePath" -ForegroundColor Cyan
    Write-Host ""
}

Write-Host "Appuie sur Entrée pour fermer..." -ForegroundColor Gray
Read-Host
