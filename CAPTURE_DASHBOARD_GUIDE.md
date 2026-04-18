# 📸 Guide de Capture du Dashboard

## 🎯 Objectif

Capturer le dashboard actuel (app/dashboard.html) et remplacer l'image dans le PC mockup sur la page d'accueil (index.html).

---

## 🚀 Méthode 1 : Interface Web (Recommandée)

### Étapes :

1. **Ouvre le fichier de capture**
   ```
   Ouvre capture-dashboard.html dans ton navigateur
   ```

2. **Suis les instructions à l'écran**
   - Clique sur "Ouvrir le Dashboard"
   - Le dashboard s'ouvre dans une nouvelle fenêtre
   - Prends une capture d'écran

3. **Capture d'écran**
   - **Windows :** `Windows + Shift + S`
   - **Mac :** `Cmd + Shift + 4`
   - Sélectionne toute la zone du dashboard

4. **Sauvegarde l'image**
   - Sauvegarde dans : `assets/images/`
   - Nom du fichier : `dashboard-screenshot.png`

5. **Vérifie le résultat**
   - Ouvre `index.html` dans ton navigateur
   - Scroll jusqu'au PC mockup
   - L'image devrait être mise à jour !

---

## 🖥️ Méthode 2 : Script PowerShell (Windows)

### Prérequis :
- Windows 10/11
- Chrome ou Edge installé
- PowerShell

### Étapes :

1. **Ouvre PowerShell**
   - Clique droit sur le dossier du projet
   - "Ouvrir dans le terminal" ou "PowerShell ici"

2. **Exécute le script**
   ```powershell
   .\capture-dashboard.ps1
   ```

3. **Suis les instructions**
   - Le dashboard s'ouvre automatiquement
   - Prends la capture (Windows + Shift + S)
   - Sauvegarde dans `assets/images/dashboard-screenshot.png`
   - Appuie sur Entrée dans PowerShell

4. **Vérification automatique**
   - Le script vérifie si l'image existe
   - Affiche les infos de l'image
   - Confirme le succès

---

## 📐 Dimensions Recommandées

Pour un affichage optimal dans le PC mockup :

| Paramètre | Valeur Recommandée |
|-----------|-------------------|
| Largeur | 1920px minimum |
| Hauteur | 1080px minimum |
| Ratio | 16:9 (paysage) |
| Format | PNG (meilleure qualité) |
| Taille | < 500 KB |

---

## 🎨 Conseils pour une Belle Capture

### 1. Mode d'Affichage
- ✅ Utilise le mode **Light** (plus clair, plus professionnel)
- ✅ Ou le mode **Dark** si tu préfères (plus moderne)

### 2. Résolution
- ✅ Mets le navigateur en **plein écran** (F11)
- ✅ Zoom à **100%** (Ctrl + 0)
- ✅ Résolution d'écran **1920×1080** ou plus

### 3. Contenu
- ✅ Assure-toi que toutes les **données sont visibles**
- ✅ Les **graphiques** sont bien affichés
- ✅ Pas de **messages d'erreur** ou de console ouverte

### 4. Qualité
- ✅ Capture en **PNG** pour la meilleure qualité
- ✅ Pas de compression excessive
- ✅ Image **nette et claire**

---

## 🔧 Méthode 3 : Extensions de Navigateur

### Chrome / Edge

**Extension : "Full Page Screen Capture"**
1. Installe l'extension depuis le Chrome Web Store
2. Ouvre `app/dashboard.html`
3. Clique sur l'icône de l'extension
4. Clique sur "Capture Entire Page"
5. Télécharge l'image
6. Renomme en `dashboard-screenshot.png`
7. Place dans `assets/images/`

**Extension : "Awesome Screenshot"**
1. Installe l'extension
2. Ouvre le dashboard
3. Clique sur l'extension
4. Sélectionne "Capture visible part of page"
5. Sauvegarde l'image

### Firefox

**Fonction Intégrée :**
1. Ouvre le dashboard
2. Appuie sur `Shift + F2` (ouvre la console développeur)
3. Tape : `screenshot --fullpage`
4. L'image est sauvegardée dans tes Téléchargements
5. Déplace-la vers `assets/images/dashboard-screenshot.png`

---

## 📁 Structure des Fichiers

```
tontinechain/
├── assets/
│   └── images/
│       ├── dashboard-screenshot.png  ← TON IMAGE ICI
│       └── ...
├── app/
│   └── dashboard.html  ← PAGE À CAPTURER
├── index.html  ← PAGE AVEC LE PC MOCKUP
├── capture-dashboard.html  ← OUTIL WEB
└── capture-dashboard.ps1  ← SCRIPT POWERSHELL
```

---

## ✅ Vérification

### Comment vérifier que ça a marché ?

1. **Ouvre index.html dans ton navigateur**
2. **Scroll jusqu'à la section Hero**
3. **Regarde le PC mockup**
4. **L'image à l'intérieur devrait être ton dashboard !**

### L'image ne change pas ?

- ✅ Vide le cache du navigateur (Ctrl + Shift + R)
- ✅ Vérifie que le nom du fichier est exact : `dashboard-screenshot.png`
- ✅ Vérifie que l'image est dans `assets/images/`
- ✅ Vérifie que l'image n'est pas corrompue

---

## 🎯 Résultat Attendu

Avant :
```
PC Mockup → Image générique/ancienne
```

Après :
```
PC Mockup → Ton dashboard actuel avec :
  - Tes stats (600,000 FCFA, 3 Actives, etc.)
  - Tes cartes de tontines
  - Ton activité récente
  - Ton design actuel
```

---

## 💡 Astuces Bonus

### Capture Multiple
Si tu veux plusieurs versions :
```
dashboard-screenshot-light.png  (mode clair)
dashboard-screenshot-dark.png   (mode sombre)
```

Puis change dans index.html selon ta préférence.

### Optimisation de l'Image
Pour réduire la taille sans perdre en qualité :
1. Utilise TinyPNG.com
2. Ou un outil comme ImageOptim (Mac) / FileOptimizer (Windows)
3. Vise < 500 KB pour un chargement rapide

### Automatisation Future
Si tu veux automatiser complètement :
- Utilise Puppeteer (Node.js)
- Ou Playwright
- Ou Selenium

---

## 🆘 Problèmes Courants

### "Le script ne s'exécute pas"
```powershell
# Autorise l'exécution des scripts
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### "L'image est floue"
- Augmente la résolution de ton écran
- Capture en plein écran (F11)
- Utilise le format PNG

### "L'image est trop grande"
- Compresse avec TinyPNG.com
- Ou réduis la résolution à 1920×1080

### "L'image ne s'affiche pas"
- Vérifie le chemin : `assets/images/dashboard-screenshot.png`
- Vide le cache : Ctrl + Shift + R
- Vérifie les permissions du fichier

---

## 📞 Besoin d'Aide ?

Si tu rencontres des problèmes :
1. Vérifie que tous les fichiers sont au bon endroit
2. Essaie la méthode manuelle (Windows + Shift + S)
3. Vérifie la console du navigateur (F12) pour les erreurs

---

**Date de création :** 18 Avril 2026
**Statut :** ✅ OUTILS DE CAPTURE PRÊTS
