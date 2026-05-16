# Fix Git Merge et Commit - TontineChain
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Fix Git Merge et Commit - TontineChain" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Tuer tous les processus vim
Write-Host "[1/5] Fermeture des processus vim..." -ForegroundColor Yellow
Get-Process | Where-Object {$_.ProcessName -like "*vim*"} | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 2

# Annuler le merge en cours
Write-Host "[2/5] Annulation du merge en cours..." -ForegroundColor Yellow
git merge --abort 2>$null
Start-Sleep -Seconds 1

# Vérifier le statut
Write-Host "[3/5] Verification du statut git..." -ForegroundColor Yellow
git status

# Ajouter tous les fichiers
Write-Host "[4/5] Ajout des fichiers modifies..." -ForegroundColor Yellow
git add .

# Commit avec message
Write-Host "[5/5] Commit des changements..." -ForegroundColor Yellow
git commit -m "Integration complete backend-frontend - Toutes fonctionnalites connectees au backend Laravel"

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "Commit termine ! Maintenant push..." -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

# Push vers GitHub
git push origin main

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "TERMINE ! Tous les changements sont sur GitHub" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green

Read-Host "Appuyez sur Entree pour fermer"
