@echo off
chcp 65001 >nul
cls

echo.
echo ╔════════════════════════════════════════════╗
echo ║   TONTINECHAIN - LANCEMENT SERVEUR        ║
echo ╚════════════════════════════════════════════╝
echo.

echo 🚀 Démarrage du serveur Node.js...
echo.

start /B node server.js

timeout /t 2 /nobreak >nul

echo ✅ Serveur lancé sur http://localhost:8000
echo.
echo 📱 Ouverture du navigateur...
echo.

start http://localhost:8000/index-test.html

echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo SERVEUR EN COURS D'EXÉCUTION
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
echo 🌐 URL: http://localhost:8000/index-test.html
echo.
echo 🛑 Pour arrêter le serveur:
echo    - Fermer cette fenêtre
echo    - OU appuyer sur Ctrl+C
echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.

node server.js
