@echo off
cls
echo.
echo ================================================
echo   COMMIT AUTOMATIQUE - TONTINECHAIN
echo ================================================
echo.
echo Fermeture de vim...
taskkill /F /IM vim.exe >nul 2>&1
taskkill /F /IM gvim.exe >nul 2>&1
timeout /t 1 /nobreak >nul

echo Annulation du merge...
git merge --abort >nul 2>&1
timeout /t 1 /nobreak >nul

echo Ajout des fichiers...
git add .

echo Commit en cours...
git commit -m "Integration complete backend-frontend - Toutes fonctionnalites connectees au backend Laravel"

echo.
echo ================================================
echo   PUSH VERS GITHUB
echo ================================================
echo.
git push origin main

echo.
echo ================================================
echo   TERMINE ! Verifiez sur GitHub
echo ================================================
echo.
echo Allez sur: https://github.com/kakporosaire953-creator/Tontine-Chain
echo.
pause
