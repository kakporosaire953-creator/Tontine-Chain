# 🌊 TontineChain - Intégration du Système de Thème "Liquid Gold / Deep Ocean"

## 📋 Vue d'ensemble

Système de thème unique avec transition en vague liquide polygonale et effets visuels avancés :
- **Mode Light "Liquid Gold"** : blanc chaud, accents or, texture papier
- **Mode Dark "Deep Ocean"** : bleu nuit profond, particules bioluminescentes, aurora

---

## 🚀 Intégration en 4 étapes

### Étape 1 : Ajouter les imports dans `<head>`

Dans **chaque page HTML**, ajouter ces 2 lignes dans la section `<head>` :

```html
<link rel="stylesheet" href="assets/css/theme.css">
<link rel="stylesheet" href="../assets/css/theme.css"> <!-- Pour les pages dans /app -->
```

### Étape 2 : Ajouter `data-theme` sur `<html>`

Sur la balise `<html>` de chaque page :

```html
<html lang="fr" data-theme="">
```

### Étape 3 : Ajouter le bouton toggle avant `</body>`

Copier le contenu de `assets/html/theme-toggle.html` juste avant la balise `</body>` :

```html
<!-- Canvas pour les particules bioluminescentes (mode dark) -->
<canvas id="bioluminescent-canvas"></canvas>

<!-- Overlay pour la transition en vague liquide -->
<div id="theme-transition-overlay"></div>

<!-- Bouton toggle flottant -->
<button 
  id="theme-toggle-fab" 
  onclick="window.TontineTheme.toggle()"
  aria-label="Activer le mode sombre"
  aria-pressed="false"
  type="button">
  
  <!-- Icône soleil (mode light) -->
  <svg class="icon-sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
  </svg>
  
  <!-- Icône lune (mode dark) -->
  <svg class="icon-moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path fill-rule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clip-rule="evenodd" />
  </svg>
  
  <!-- Tooltip -->
  <span id="theme-toggle-tooltip">Mode sombre</span>
</button>
```

### Étape 4 : Ajouter le script JS avant `</body>`

Juste après le bouton toggle, ajouter :

```html
<script src="assets/js/theme.js"></script>
<script src="../assets/js/theme.js"></script> <!-- Pour les pages dans /app -->
```

---

## 📁 Structure des fichiers créés

```
assets/
├── css/
│   └── theme.css          ← Variables CSS + styles des 2 modes
├── js/
│   └── theme.js           ← Logique de transition + particules
└── html/
    └── theme-toggle.html  ← Bouton toggle (à copier dans chaque page)
```

---

## 🎨 Caractéristiques uniques

### Mode Light "Liquid Gold"
- Fond blanc chaud `#fdfaf4`
- Accents or `#d97706`
- Texture papier subtile (SVG noise)
- Ombres dorées sur les cartes
- Reflet or sur les titres H1/H2

### Mode Dark "Deep Ocean"
- Fond bleu nuit `#010d1a`
- Accents cyan `#00e5c8`
- 60 particules bioluminescentes qui fuient la souris
- Barre aurora animée en haut de page
- Lueur cyan sur les titres
- Halo radial sur les cartes au hover

### Transition en vague liquide
- Vague polygonale (pas de cercle classique)
- Part du coin inférieur droit (là où est le bouton)
- 8 points de contrôle avec stagger de 60ms
- Tremblement organique pour effet naturel
- Durée : 900ms

### Bouton toggle flottant
- Position : `fixed` en bas à droite
- Mode light : fond or avec ombre dorée
- Mode dark : fond sombre avec bordure cyan pulsante
- Tooltip au hover (désactivé sur mobile)
- Animation d'entrée au chargement (delay 800ms)

---

## ⚙️ Fonctionnalités techniques

### Persistance
- Choix sauvegardé dans `localStorage` (clé : `tontinechain-theme`)
- Respect de `prefers-color-scheme` au premier chargement
- Application sans transition au chargement de page

### Accessibilité
- `aria-label` et `aria-pressed` sur le bouton
- Respect de `prefers-reduced-motion` :
  - Transition instantanée
  - Pas de particules
  - Pas d'animations

### API JavaScript
```javascript
// Toggle le thème
window.TontineTheme.toggle();

// Obtenir le thème actuel
window.TontineTheme.getCurrentTheme(); // 'light' ou 'dark'

// Définir un thème spécifique
window.TontineTheme.setTheme('dark');
```

---

## 🎯 Points importants

1. **Le bouton NE doit PAS être dans la navbar** - il flotte en bas à droite
2. **Les couleurs de marque restent fixes** :
   - Bleu `#1e3a5f`
   - Orange `#f97316`
   - Vert `#16a34a` (boutons primaires)
3. **La navbar reste inchangée** - seuls les backgrounds/textes/surfaces changent
4. **Ajouter les classes CSS appropriées** :
   - `.brand` ou `.logo-text` pour le nom du site
   - `.card` ou `.surface` pour les cartes
5. **Chemins relatifs** : ajuster selon la profondeur de la page (`assets/` ou `../assets/`)

---

## 📱 Responsive

Le bouton s'adapte automatiquement :
- Desktop : `52px × 52px`, `bottom: 2rem`, `right: 2rem`
- Mobile : `46px × 46px`, `bottom: 1.2rem`, `right: 1.2rem`
- Tooltip désactivé sur mobile (touch device)

---

## 🐛 Dépannage

### Le thème ne s'applique pas
- Vérifier que `data-theme=""` est sur `<html>`
- Vérifier que `theme.css` est bien chargé
- Vérifier la console pour les erreurs JS

### Les particules ne s'affichent pas
- Vérifier que le canvas `#bioluminescent-canvas` existe
- Vérifier que vous êtes en mode dark
- Vérifier que `prefers-reduced-motion` n'est pas activé

### La transition ne fonctionne pas
- Vérifier que `#theme-transition-overlay` existe
- Vérifier que `theme.js` est bien chargé
- Vérifier la console pour les erreurs

### Chemins cassés
- Pages à la racine : `assets/css/theme.css`
- Pages dans `/app` : `../assets/css/theme.css`

---

## ✅ Checklist d'intégration

Pour chaque page HTML :

- [ ] Ajouter `<link rel="stylesheet" href="assets/css/theme.css">` dans `<head>`
- [ ] Ajouter `data-theme=""` sur la balise `<html>`
- [ ] Copier le contenu de `theme-toggle.html` avant `</body>`
- [ ] Ajouter `<script src="assets/js/theme.js"></script>` avant `</body>`
- [ ] Ajuster les chemins relatifs si la page est dans un sous-dossier
- [ ] Tester le toggle en cliquant sur le bouton
- [ ] Vérifier que les particules apparaissent en mode dark
- [ ] Vérifier que la transition en vague fonctionne

---

## 🎉 Résultat attendu

Un système de thème jamais vu avec :
- Une transition liquide organique unique au monde
- Des effets visuels immersifs (particules, aurora, lueurs)
- Une expérience utilisateur fluide et accessible
- Une persistance du choix entre les sessions
- Un design cohérent avec l'identité TontineChain

Profite bien de ce système de thème unique! 🌊✨
