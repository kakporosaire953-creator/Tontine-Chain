@echo off
cls
echo.
echo ================================================
echo   FORCE COMMIT - TONTINECHAIN
echo ================================================
echo.

REM Tuer vim
echo [1/6] Fermeture de vim...
taskkill /F /IM vim.exe >nul 2>&1
taskkill /F /IM gvim.exe >nul 2>&1
timeout /t 1 /nobreak >nul

REM Supprimer les fichiers de merge
echo [2/6] Nettoyage des fichiers de merge...
del /F /Q .git\MERGE_HEAD >nul 2>&1
del /F /Q .git\MERGE_MODE >nul 2>&1
del /F /Q .git\MERGE_MSG >nul 2>&1
timeout /t 1 /nobreak >nul

REM Reset si nécessaire
echo [3/6] Reset de l'état git...
git reset --merge >nul 2>&1
timeout /t 1 /nobreak >nul

REM Ajouter tous les fichiers
echo [4/6] Ajout de tous les fichiers...
git add -A

REM Commit
echo [5/6] Commit...
git commit -m "Integration backend-frontend complete - Fix donnees demo"

REM Push
echo [6/6] Push vers GitHub...
git push origin main --force

echo.
echo ================================================
echo   TERMINE !
echo ================================================
echo.
echo Verifiez sur GitHub:
echo https://github.com/kakporosaire953-creator/Tontine-Chain
echo.
pause
