@echo off
echo ========================================
echo Fix Git Merge et Commit - TontineChain
echo ========================================
echo.

REM Tuer tous les processus vim
echo [1/5] Fermeture des processus vim...
taskkill /F /IM vim.exe 2>nul
taskkill /F /IM gvim.exe 2>nul
timeout /t 2 /nobreak >nul

REM Annuler le merge en cours
echo [2/5] Annulation du merge en cours...
git merge --abort 2>nul
timeout /t 1 /nobreak >nul

REM Vérifier le statut
echo [3/5] Verification du statut git...
git status

REM Ajouter tous les fichiers
echo [4/5] Ajout des fichiers modifies...
git add .

REM Commit avec message
echo [5/5] Commit des changements...
git commit -m "Integration complete backend-frontend - Toutes fonctionnalites connectees au backend Laravel"

echo.
echo ========================================
echo Commit termine ! Maintenant push...
echo ========================================
echo.

REM Push vers GitHub
git push origin main

echo.
echo ========================================
echo TERMINE ! Tous les changements sont sur GitHub
echo ========================================
pause
