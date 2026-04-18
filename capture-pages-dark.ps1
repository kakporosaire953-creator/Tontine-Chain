# Script PowerShell pour capturer les pages en mode dark
# Nécessite: Node.js et Puppeteer installés

Write-Host "=== Capture des Pages TontineChain en Mode Dark ===" -ForegroundColor Green
Write-Host ""

# Vérifier si Node.js est installé
try {
    $nodeVersion = node --version
    Write-Host "Node.js detecte: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "ERREUR: Node.js n'est pas installe!" -ForegroundColor Red
    Write-Host "Installez Node.js depuis: https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

# Créer le dossier pour les captures si nécessaire
$captureDir = "assets/images/mockups"
if (-not (Test-Path $captureDir)) {
    New-Item -ItemType Directory -Path $captureDir -Force | Out-Null
    Write-Host "Dossier cree: $captureDir" -ForegroundColor Cyan
}

# Créer le script Node.js pour Puppeteer
$puppeteerScript = @"
const puppeteer = require('puppeteer');
const path = require('path');

const pages = [
    { name: 'index', url: 'index.html', title: 'Page Accueil' },
    { name: 'dashboard', url: 'app/dashboard.html', title: 'Dashboard' },
    { name: 'connexion', url: 'app/connexion.html', title: 'Connexion' },
    { name: 'inscription', url: 'app/inscription.html', title: 'Inscription' },
    { name: 'creer-tontine', url: 'app/creer-tontine.html', title: 'Créer Tontine' },
    { name: 'paiement', url: 'app/paiement.html', title: 'Paiement' },
    { name: 'messagerie', url: 'app/messagerie.html', title: 'Messagerie' },
    { name: 'assistant-yao', url: 'app/assistant-yao.html', title: 'Assistant YAO' }
];

async function capturePages() {
    console.log('Lancement du navigateur...');
    const browser = await puppeteer.launch({
        headless: 'new',
        defaultViewport: {
            width: 1920,
            height: 1080
        }
    });

    const page = await browser.newPage();

    for (const pageInfo of pages) {
        try {
            console.log(\`\nCapture: \${pageInfo.title}...\`);
            
            // Charger la page
            const filePath = path.resolve(__dirname, pageInfo.url);
            await page.goto(\`file://\${filePath}\`, {
                waitUntil: 'networkidle0',
                timeout: 30000
            });

            // Attendre que la page soit chargée
            await page.waitForTimeout(2000);

            // Activer le mode dark
            await page.evaluate(() => {
                document.documentElement.setAttribute('data-theme', 'dark');
            });

            // Attendre que les transitions se terminent
            await page.waitForTimeout(1000);

            // Capturer la page entière
            const screenshotPath = \`assets/images/mockups/\${pageInfo.name}-dark.png\`;
            await page.screenshot({
                path: screenshotPath,
                fullPage: true
            });

            console.log(\`✓ Capture sauvegardee: \${screenshotPath}\`);

            // Capturer aussi en viewport (1920x1080)
            const viewportPath = \`assets/images/mockups/\${pageInfo.name}-dark-viewport.png\`;
            await page.screenshot({
                path: viewportPath,
                fullPage: false
            });

            console.log(\`✓ Viewport sauvegarde: \${viewportPath}\`);

        } catch (error) {
            console.error(\`✗ Erreur pour \${pageInfo.title}: \${error.message}\`);
        }
    }

    await browser.close();
    console.log('\n=== Captures terminees! ===');
}

capturePages().catch(console.error);
"@

# Sauvegarder le script Puppeteer
$puppeteerScript | Out-File -FilePath "capture-script.js" -Encoding UTF8

Write-Host "Script Puppeteer cree: capture-script.js" -ForegroundColor Cyan
Write-Host ""

# Vérifier si Puppeteer est installé
Write-Host "Verification de Puppeteer..." -ForegroundColor Yellow

if (-not (Test-Path "node_modules/puppeteer")) {
    Write-Host "Installation de Puppeteer..." -ForegroundColor Yellow
    npm install puppeteer
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "ERREUR: Installation de Puppeteer echouee!" -ForegroundColor Red
        exit 1
    }
}

Write-Host "Puppeteer pret!" -ForegroundColor Green
Write-Host ""

# Lancer les captures
Write-Host "Lancement des captures..." -ForegroundColor Cyan
node capture-script.js

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "=== SUCCES ===" -ForegroundColor Green
    Write-Host "Les captures sont dans: $captureDir" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Fichiers crees:" -ForegroundColor Yellow
    Get-ChildItem $captureDir -Filter "*-dark*.png" | ForEach-Object {
        Write-Host "  - $($_.Name)" -ForegroundColor White
    }
} else {
    Write-Host ""
    Write-Host "=== ERREUR ===" -ForegroundColor Red
    Write-Host "Verifiez les erreurs ci-dessus" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Appuyez sur une touche pour continuer..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
