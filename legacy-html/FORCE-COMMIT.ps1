# FORCE COMMIT - TontineChain
Clear-Host
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "   FORCE COMMIT - TONTINECHAIN" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Tuer vim
Write-Host "[1/6] Fermeture de vim..." -ForegroundColor Yellow
Get-Process | Where-Object {$_.ProcessName -like "*vim*"} | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 1

# Supprimer les fichiers de merge
Write-Host "[2/6] Nettoyage des fichiers de merge..." -ForegroundColor Yellow
Remove-Item -Force .git\MERGE_HEAD -ErrorAction SilentlyContinue
Remove-Item -Force .git\MERGE_MODE -ErrorAction SilentlyContinue
Remove-Item -Force .git\MERGE_MSG -ErrorAction SilentlyContinue
Start-Sleep -Seconds 1

# Reset
Write-Host "[3/6] Reset de l'état git..." -ForegroundColor Yellow
git reset --merge 2>$null
Start-Sleep -Seconds 1

# Ajouter
Write-Host "[4/6] Ajout de tous les fichiers..." -ForegroundColor Yellow
git add -A

# Commit
Write-Host "[5/6] Commit..." -ForegroundColor Yellow
git commit -m "Integration backend-frontend complete - Fix donnees demo"

# Push
Write-Host "[6/6] Push vers GitHub..." -ForegroundColor Yellow
git push origin main --force

Write-Host ""
Write-Host "================================================" -ForegroundColor Green
Write-Host "   TERMINE !" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Green
Write-Host ""
Write-Host "Verifiez sur GitHub:" -ForegroundColor White
Write-Host "https://github.com/kakporosaire953-creator/Tontine-Chain" -ForegroundColor Cyan
Write-Host ""

Read-Host "Appuyez sur Entree pour fermer"
