# 📸 Guide: Créer les Maquettes en Mode Dark

## 🎯 Objectif
Créer des captures d'écran professionnelles de toutes les pages en mode dark pour le dossier `assets/images/mockups/`

---

## 🚀 Méthode 1: Script Automatique (Recommandé)

### Prérequis
- Node.js installé ([télécharger](https://nodejs.org/))
- PowerShell (déjà sur Windows)

### Étapes
1. Ouvrir PowerShell dans le dossier du projet
2. Exécuter: `./capture-pages-dark.ps1`
3. Attendre la fin des captures
4. Les images seront dans `assets/images/mockups/`

### Pages Capturées
- ✅ index-dark.png (Page d'accueil)
- ✅ dashboard-dark.png (Dashboard)
- ✅ connexion-dark.png (Connexion)
- ✅ inscription-dark.png (Inscription)
- ✅ creer-tontine-dark.png (Créer Tontine)
- ✅ paiement-dark.png (Paiement)
- ✅ messagerie-dark.png (Messagerie)
- ✅ assistant-yao-dark.png (Assistant YAO)

---

## 🖱️ Méthode 2: Captures Manuelles

### Prérequis
- Navigateur Chrome/Edge/Firefox
- Extension de capture d'écran (ou outil intégré)

### Étapes Détaillées

#### 1. Préparer le Navigateur
```
1. Ouvrir Chrome/Edge
2. Installer extension "Full Page Screen Capture" (optionnel)
3. Ouvrir les DevTools (F12)
4. Définir la résolution: 1920x1080
```

#### 2. Pour Chaque Page

**Page d'Accueil (index.html)**
```
1. Ouvrir: file:///[chemin]/index.html
2. Activer le mode dark (bouton en bas à droite)
3. Attendre 2 secondes (transitions)
4. Capturer la page complète
5. Sauvegarder: assets/images/mockups/index-dark.png
```

**Dashboard (app/dashboard.html)**
```
1. Ouvrir: file:///[chemin]/app/dashboard.html
2. Activer le mode dark
3. Attendre 2 secondes
4. Capturer la page complète
5. Sauvegarder: assets/images/mockups/dashboard-dark.png
```

**Connexion (app/connexion.html)**
```
1. Ouvrir: file:///[chemin]/app/connexion.html
2. Activer le mode dark
3. Attendre 2 secondes
4. Capturer la page complète
5. Sauvegarder: assets/images/mockups/connexion-dark.png
```

**Inscription (app/inscription.html)**
```
1. Ouvrir: file:///[chemin]/app/inscription.html
2. Activer le mode dark
3. Attendre 2 secondes
4. Capturer la page complète
5. Sauvegarder: assets/images/mockups/inscription-dark.png
```

**Créer Tontine (app/creer-tontine.html)**
```
1. Ouvrir: file:///[chemin]/app/creer-tontine.html
2. Activer le mode dark
3. Attendre 2 secondes
4. Capturer la page complète
5. Sauvegarder: assets/images/mockups/creer-tontine-dark.png
```

**Paiement (app/paiement.html)**
```
1. Ouvrir: file:///[chemin]/app/paiement.html
2. Activer le mode dark
3. Attendre 2 secondes
4. Capturer la page complète
5. Sauvegarder: assets/images/mockups/paiement-dark.png
```

**Messagerie (app/messagerie.html)**
```
1. Ouvrir: file:///[chemin]/app/messagerie.html
2. Activer le mode dark
3. Attendre 2 secondes
4. Capturer la page complète
5. Sauvegarder: assets/images/mockups/messagerie-dark.png
```

**Assistant YAO (app/assistant-yao.html)**
```
1. Ouvrir: file:///[chemin]/app/assistant-yao.html
2. Activer le mode dark
3. Attendre 2 secondes
4. Capturer la page complète
5. Sauvegarder: assets/images/mockups/assistant-yao-dark.png
```

---

## 🛠️ Méthode 3: Outils de Capture

### Windows
**Outil Capture d'écran (intégré)**
```
1. Win + Shift + S
2. Sélectionner "Capture de fenêtre"
3. Cliquer sur la fenêtre du navigateur
4. Coller dans Paint/Photoshop
5. Sauvegarder en PNG
```

**Snipping Tool**
```
1. Rechercher "Outil Capture d'écran"
2. Mode: Fenêtre
3. Capturer
4. Sauvegarder
```

### Extensions Navigateur

**Chrome/Edge: Full Page Screen Capture**
```
1. Installer l'extension
2. Cliquer sur l'icône
3. Attendre la capture
4. Télécharger le PNG
```

**Firefox: Screenshot**
```
1. Clic droit sur la page
2. "Prendre une capture d'écran"
3. "Enregistrer la page entière"
4. Télécharger
```

---

## 📐 Spécifications Techniques

### Résolutions Recommandées

**Desktop (Prioritaire)**
```
Largeur: 1920px
Hauteur: Variable (page complète)
Format: PNG
Qualité: 100%
```

**Viewport (Optionnel)**
```
Largeur: 1920px
Hauteur: 1080px
Format: PNG
Qualité: 100%
```

**Mobile (Optionnel)**
```
Largeur: 375px (iPhone)
Hauteur: Variable
Format: PNG
Qualité: 100%
```

### Paramètres de Capture

```
Format: PNG (pas JPG)
Compression: Aucune
Profondeur: 24-bit
Transparence: Non
DPI: 72 (écran)
```

---

## 🎨 Checklist Qualité

Avant de sauvegarder chaque capture, vérifier:

- [ ] Mode dark activé (fond noir, accents or/vert)
- [ ] Page complètement chargée (images, fonts)
- [ ] Pas de scrollbar visible
- [ ] Résolution correcte (1920px largeur minimum)
- [ ] Format PNG (pas JPG)
- [ ] Nom de fichier correct (ex: dashboard-dark.png)
- [ ] Sauvegardé dans assets/images/mockups/

---

## 📂 Structure des Fichiers

```
assets/
└── images/
    └── mockups/
        ├── index-dark.png              (Page d'accueil)
        ├── index-dark-viewport.png     (Viewport 1920x1080)
        ├── dashboard-dark.png          (Dashboard complet)
        ├── dashboard-dark-viewport.png
        ├── connexion-dark.png          (Page connexion)
        ├── connexion-dark-viewport.png
        ├── inscription-dark.png        (Page inscription)
        ├── inscription-dark-viewport.png
        ├── creer-tontine-dark.png      (Créer tontine)
        ├── creer-tontine-dark-viewport.png
        ├── paiement-dark.png           (Page paiement)
        ├── paiement-dark-viewport.png
        ├── messagerie-dark.png         (Messagerie)
        ├── messagerie-dark-viewport.png
        ├── assistant-yao-dark.png      (Assistant YAO)
        └── assistant-yao-dark-viewport.png
```

---

## 🚨 Problèmes Courants

### Le mode dark ne s'active pas
```
Solution:
1. Ouvrir la console (F12)
2. Taper: document.documentElement.setAttribute('data-theme', 'dark')
3. Appuyer sur Entrée
4. Capturer
```

### Les images ne chargent pas
```
Solution:
1. Vérifier que les fichiers existent dans assets/images/
2. Attendre 5 secondes après le chargement
3. Rafraîchir la page (F5)
```

### La capture est floue
```
Solution:
1. Augmenter la résolution du navigateur
2. Utiliser le zoom 100% (Ctrl+0)
3. Capturer en PNG (pas JPG)
```

### La page est trop longue
```
Solution:
1. Utiliser "Full Page Screen Capture"
2. Ou capturer en plusieurs parties
3. Ou utiliser le script automatique
```

---

## 🎯 Résultat Attendu

### Exemple de Capture Réussie

**Caractéristiques**:
- ✅ Fond noir (#0a0a0a)
- ✅ Accents or (#FFB81C) et vert (#16a34a)
- ✅ Texte blanc lisible
- ✅ Ombres et effets de lueur visibles
- ✅ Animations figées dans un état esthétique
- ✅ Pas de scrollbar
- ✅ Résolution nette (1920px+)

---

## 📊 Utilisation des Maquettes

Ces captures seront utilisées pour:

1. **Documentation**: README.md, présentation
2. **Portfolio**: Showcase du projet
3. **Pitch**: Présentation jury MIABE
4. **Marketing**: Site web, réseaux sociaux
5. **Tests**: Comparaison avant/après modifications

---

## 🔧 Optimisation Post-Capture

### Optionnel: Compression des Images

Si les fichiers sont trop lourds (>2MB):

```powershell
# Installer TinyPNG CLI
npm install -g tinypng-cli

# Compresser les images
tinypng assets/images/mockups/*.png
```

Ou utiliser des outils en ligne:
- TinyPNG.com
- Squoosh.app
- ImageOptim (Mac)

---

## ✅ Validation Finale

Avant de considérer les maquettes terminées:

- [ ] 8 pages capturées en mode dark
- [ ] Toutes les images en PNG
- [ ] Résolution minimum 1920px largeur
- [ ] Fichiers dans assets/images/mockups/
- [ ] Noms de fichiers corrects
- [ ] Qualité visuelle vérifiée
- [ ] Taille totale raisonnable (<50MB)

---

## 🎉 Félicitations!

Une fois toutes les captures réalisées, vous aurez un portfolio visuel complet de TontineChain en mode dark, prêt pour la présentation au jury MIABE!

---

**Besoin d'aide?**
- Vérifier que Node.js est installé: `node --version`
- Vérifier que le script existe: `ls capture-pages-dark.ps1`
- Lancer le script: `./capture-pages-dark.ps1`

**Temps estimé**:
- Méthode automatique: 5-10 minutes
- Méthode manuelle: 30-45 minutes
