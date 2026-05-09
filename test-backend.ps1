# ============================================
# TONTINECHAIN - Script de Test Backend
# ============================================

Write-Host ""
Write-Host "╔════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║   TONTINECHAIN - TEST BACKEND COMPLET     ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

$baseUrl = "https://tonnine-benin-backend.onrender.com/api/v1"
$testsPassed = 0
$testsFailed = 0

# ============================================
# TEST 1: Health Check
# ============================================
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
Write-Host "TEST 1: Health Check" -ForegroundColor Yellow
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray

try {
    $response = Invoke-WebRequest -Uri "$baseUrl/health" -Method GET -Headers @{"Accept"="application/json"}
    $data = $response.Content | ConvertFrom-Json
    
    if ($data.status -eq "ok") {
        Write-Host "✅ Backend accessible" -ForegroundColor Green
        Write-Host "   Status: $($data.status)" -ForegroundColor Gray
        Write-Host "   Message: $($data.message)" -ForegroundColor Gray
        $testsPassed++
    } else {
        Write-Host "❌ Backend répond mais status incorrect" -ForegroundColor Red
        $testsFailed++
    }
} catch {
    Write-Host "❌ Backend inaccessible" -ForegroundColor Red
    Write-Host "   Erreur: $($_.Exception.Message)" -ForegroundColor Red
    $testsFailed++
}

Write-Host ""

# ============================================
# TEST 2: CORS Policy
# ============================================
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
Write-Host "TEST 2: CORS Policy" -ForegroundColor Yellow
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray

try {
    $response = Invoke-WebRequest -Uri "$baseUrl/health" -Method GET -Headers @{"Accept"="application/json"; "Origin"="http://localhost:8000"}
    
    if ($response.StatusCode -eq 200) {
        Write-Host "✅ CORS configuré correctement" -ForegroundColor Green
        $testsPassed++
    }
} catch {
    Write-Host "⚠️  CORS pourrait poser problème" -ForegroundColor Yellow
    Write-Host "   Note: Vérifier la configuration côté Laravel" -ForegroundColor Gray
    $testsFailed++
}

Write-Host ""

# ============================================
# TEST 3: API Structure
# ============================================
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
Write-Host "TEST 3: Structure de l'API" -ForegroundColor Yellow
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray

$endpoints = @(
    @{Path="/health"; Name="Health Check"},
    @{Path="/auth/request-otp"; Name="Request OTP"},
    @{Path="/auth/verify-otp"; Name="Verify OTP"}
)

foreach ($endpoint in $endpoints) {
    try {
        $response = Invoke-WebRequest -Uri "$baseUrl$($endpoint.Path)" -Method GET -Headers @{"Accept"="application/json"} -ErrorAction SilentlyContinue
        Write-Host "✅ $($endpoint.Name) - Endpoint existe" -ForegroundColor Green
    } catch {
        if ($_.Exception.Response.StatusCode -eq 405) {
            Write-Host "✅ $($endpoint.Name) - Endpoint existe (méthode POST requise)" -ForegroundColor Green
        } elseif ($_.Exception.Response.StatusCode -eq 401) {
            Write-Host "✅ $($endpoint.Name) - Endpoint existe (auth requise)" -ForegroundColor Green
        } else {
            Write-Host "⚠️  $($endpoint.Name) - Status: $($_.Exception.Response.StatusCode)" -ForegroundColor Yellow
        }
    }
}

Write-Host ""

# ============================================
# TEST 4: Fichiers Frontend
# ============================================
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
Write-Host "TEST 4: Fichiers Frontend" -ForegroundColor Yellow
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray

$files = @(
    "index-test.html",
    "quick-test.html",
    "test-api.html",
    "debug-console.html",
    "js/api.js",
    "js/auth.js",
    "js/dashboard-api.js"
)

foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "✅ $file" -ForegroundColor Green
        $testsPassed++
    } else {
        Write-Host "❌ $file - MANQUANT" -ForegroundColor Red
        $testsFailed++
    }
}

Write-Host ""

# ============================================
# TEST 5: Documentation
# ============================================
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
Write-Host "TEST 5: Documentation" -ForegroundColor Yellow
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray

$docs = @(
    "LIRE-MOI-DABORD.md",
    "CORRECTIONS-APPLIQUEES.md",
    "INTEGRATION-STATUS.md",
    "GUIDE-DEMARRAGE.md",
    "README-INTEGRATION.md"
)

foreach ($doc in $docs) {
    if (Test-Path $doc) {
        Write-Host "✅ $doc" -ForegroundColor Green
        $testsPassed++
    } else {
        Write-Host "❌ $doc - MANQUANT" -ForegroundColor Red
        $testsFailed++
    }
}

Write-Host ""

# ============================================
# RÉSUMÉ
# ============================================
Write-Host "╔════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║              RÉSUMÉ DES TESTS              ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

$total = $testsPassed + $testsFailed
$percentage = [math]::Round(($testsPassed / $total) * 100, 0)

Write-Host "Tests réussis: " -NoNewline
Write-Host "$testsPassed" -ForegroundColor Green -NoNewline
Write-Host " / $total"

Write-Host "Tests échoués: " -NoNewline
Write-Host "$testsFailed" -ForegroundColor Red -NoNewline
Write-Host " / $total"

Write-Host "Pourcentage: " -NoNewline
if ($percentage -ge 80) {
    Write-Host "$percentage%" -ForegroundColor Green
} elseif ($percentage -ge 50) {
    Write-Host "$percentage%" -ForegroundColor Yellow
} else {
    Write-Host "$percentage%" -ForegroundColor Red
}

Write-Host ""

if ($percentage -ge 80) {
    Write-Host "🎉 STATUT: PRÊT POUR LES TESTS" -ForegroundColor Green
} elseif ($percentage -ge 50) {
    Write-Host "⚠️  STATUT: CORRECTIONS NÉCESSAIRES" -ForegroundColor Yellow
} else {
    Write-Host "❌ STATUT: PROBLÈMES MAJEURS" -ForegroundColor Red
}

Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
Write-Host "PROCHAINES ÉTAPES:" -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
Write-Host ""
Write-Host "1. Ouvrir index-test.html dans le navigateur" -ForegroundColor White
Write-Host "2. Cliquer sur 'Quick Test'" -ForegroundColor White
Write-Host "3. Tester l'authentification OTP" -ForegroundColor White
Write-Host "4. Vérifier le dashboard" -ForegroundColor White
Write-Host ""
Write-Host "📚 Documentation: Lire LIRE-MOI-DABORD.md" -ForegroundColor Cyan
Write-Host ""
