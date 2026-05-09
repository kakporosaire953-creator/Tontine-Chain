@echo off
chcp 65001 >nul
cls

echo.
echo ╔════════════════════════════════════════════╗
echo ║   TONTINECHAIN - TEST BACKEND COMPLET     ║
echo ╚════════════════════════════════════════════╝
echo.

echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo TEST 1: Health Check Backend
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
curl -s https://tonnine-benin-backend.onrender.com/api/v1/health
echo.
echo.

echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo TEST 2: Vérification des Fichiers
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.

if exist "index-test.html" (echo ✅ index-test.html) else (echo ❌ index-test.html MANQUANT)
if exist "quick-test.html" (echo ✅ quick-test.html) else (echo ❌ quick-test.html MANQUANT)
if exist "test-api.html" (echo ✅ test-api.html) else (echo ❌ test-api.html MANQUANT)
if exist "debug-console.html" (echo ✅ debug-console.html) else (echo ❌ debug-console.html MANQUANT)
if exist "js\api.js" (echo ✅ js\api.js) else (echo ❌ js\api.js MANQUANT)
if exist "js\auth.js" (echo ✅ js\auth.js) else (echo ❌ js\auth.js MANQUANT)
if exist "js\dashboard-api.js" (echo ✅ js\dashboard-api.js) else (echo ❌ js\dashboard-api.js MANQUANT)

echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo TEST 3: Documentation
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.

if exist "LIRE-MOI-DABORD.md" (echo ✅ LIRE-MOI-DABORD.md) else (echo ❌ LIRE-MOI-DABORD.md MANQUANT)
if exist "CORRECTIONS-APPLIQUEES.md" (echo ✅ CORRECTIONS-APPLIQUEES.md) else (echo ❌ CORRECTIONS-APPLIQUEES.md MANQUANT)
if exist "INTEGRATION-STATUS.md" (echo ✅ INTEGRATION-STATUS.md) else (echo ❌ INTEGRATION-STATUS.md MANQUANT)
if exist "GUIDE-DEMARRAGE.md" (echo ✅ GUIDE-DEMARRAGE.md) else (echo ❌ GUIDE-DEMARRAGE.md MANQUANT)
if exist "README-INTEGRATION.md" (echo ✅ README-INTEGRATION.md) else (echo ❌ README-INTEGRATION.md MANQUANT)

echo.
echo ╔════════════════════════════════════════════╗
echo ║              RÉSUMÉ                        ║
echo ╚════════════════════════════════════════════╝
echo.
echo 🎉 STATUT: PRÊT POUR LES TESTS
echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo PROCHAINES ÉTAPES:
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
echo 1. Ouvrir index-test.html dans le navigateur
echo 2. Cliquer sur 'Quick Test'
echo 3. Tester l'authentification OTP
echo 4. Vérifier le dashboard
echo.
echo 📚 Documentation: Lire LIRE-MOI-DABORD.md
echo.
echo 🌐 GitHub: https://github.com/kakporosaire953-creator/Tontine-Chain
echo.

pause
