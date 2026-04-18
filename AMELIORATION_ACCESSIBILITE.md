# ♿ AMÉLIORATION DE L'ACCESSIBILITÉ - TONTINECHAIN

## 🎯 Objectif

Rendre le site accessible à tous, y compris les personnes utilisant des lecteurs d'écran, ayant des déficiences visuelles ou motrices.

---

## ✅ Étape 1 Complétée: Images

- ✅ Tous les attributs `alt` sont descriptifs
- ✅ Lazy loading ajouté
- ✅ Dimensions width/height spécifiées

---

## 🔄 Étape 2: Attributs ARIA à Ajouter

### Navigation

**À ajouter sur la navbar:**
```html
<nav class="navbar" role="navigation" aria-label="Navigation principale">
```

**À ajouter sur les liens:**
```html
<a href="#probleme" aria-label="Aller à la section Problème">Problème</a>
```

### Boutons

**Toggle theme:**
```html
<button id="theme-toggle-btn" 
        aria-label="Changer de thème" 
        aria-pressed="false">
```

**Boutons d'action:**
```html
<button class="btn btn-primary" 
        aria-label="Créer une nouvelle tontine">
    Créer ma Tontine
</button>
```

### Formulaires

**Labels explicites:**
```html
<label for="email" class="sr-only">Adresse email</label>
<input type="email" 
       id="email" 
       name="email" 
       aria-required="true"
       aria-describedby="email-help">
<span id="email-help" class="help-text">
    Nous ne partagerons jamais votre email
</span>
```

### Sections

**Landmarks ARIA:**
```html
<header role="banner">
<main role="main">
<section aria-labelledby="problem-title">
<footer role="contentinfo">
```

---

## 📝 Checklist Accessibilité

### Structure HTML
- [ ] Ajouter `lang="fr"` sur `<html>`
- [ ] Hiérarchie des titres correcte (H1 → H2 → H3)
- [ ] Landmarks ARIA (header, main, nav, footer)
- [ ] Skip links pour navigation clavier

### Navigation
- [ ] Tous les liens ont un texte descriptif
- [ ] Focus visible sur tous les éléments interactifs
- [ ] Navigation au clavier fonctionnelle
- [ ] Ordre de tabulation logique

### Contenu
- [ ] Contraste de couleurs suffisant (WCAG AA)
- [ ] Texte redimensionnable jusqu'à 200%
- [ ] Pas de contenu qui clignote
- [ ] Animations respectent prefers-reduced-motion ✅

### Formulaires
- [ ] Tous les inputs ont des labels
- [ ] Messages d'erreur clairs
- [ ] Validation accessible
- [ ] Autocomplete approprié

### Multimédia
- [ ] Images décoratives avec alt=""
- [ ] Images informatives avec alt descriptif ✅
- [ ] Vidéos avec sous-titres (si applicable)
- [ ] Transcriptions audio (si applicable)

---

## 🎨 Contraste des Couleurs

### Mode Light
- ✅ Texte noir (#0f172a) sur fond blanc (#ffffff) - Ratio 19:1
- ✅ Texte gris (#475569) sur fond blanc - Ratio 9:1
- ⚠️ À vérifier: Liens verts sur fond blanc

### Mode Dark
- ✅ Texte blanc (#ffffff) sur fond noir (#0a0a0a) - Ratio 21:1
- ✅ Texte gris clair (#d4d4d4) sur fond noir - Ratio 13:1
- ✅ Accents or (#FFB81C) sur fond noir - Ratio 8:1

**Outil de test**: https://webaim.org/resources/contrastchecker/

---

## ⌨️ Navigation Clavier

### Touches à Supporter

- **Tab**: Naviguer entre les éléments
- **Shift + Tab**: Navigation inverse
- **Enter**: Activer liens/boutons
- **Space**: Activer boutons/checkboxes
- **Esc**: Fermer modals/menus
- **Arrow keys**: Navigation dans menus

### Skip Links

Ajouter en haut de chaque page:
```html
<a href="#main-content" class="skip-link">
    Aller au contenu principal
</a>
```

CSS:
```css
.skip-link {
    position: absolute;
    top: -40px;
    left: 0;
    background: var(--color-primary);
    color: white;
    padding: 8px;
    text-decoration: none;
    z-index: 100;
}

.skip-link:focus {
    top: 0;
}
```

---

## 🔍 Focus Visible

Déjà implémenté dans theme.css:
```css
*:focus-visible {
  outline: 2px solid var(--brand-green);
  outline-offset: 2px;
}
```

✅ Bon travail! À garder.

---

## 📱 Responsive et Zoom

### Tests à Faire

1. **Zoom 200%**
   - Texte reste lisible
   - Pas de scroll horizontal
   - Boutons restent cliquables

2. **Mobile**
   - Touch targets minimum 44x44px
   - Pas de hover-only interactions
   - Formulaires utilisables

3. **Orientation**
   - Portrait et paysage fonctionnels
   - Contenu s'adapte

---

## 🎯 Priorités d'Implémentation

### Priorité 1 (Critique)
1. Ajouter `lang="fr"` sur `<html>`
2. Ajouter landmarks ARIA (header, main, nav, footer)
3. Vérifier contraste des couleurs
4. Tester navigation clavier

### Priorité 2 (Important)
1. Ajouter skip links
2. Labels sur tous les formulaires
3. ARIA labels sur boutons d'action
4. Messages d'erreur accessibles

### Priorité 3 (Amélioration)
1. ARIA live regions pour notifications
2. Descriptions étendues pour graphiques
3. Breadcrumbs avec ARIA
4. Tooltips accessibles

---

## 🧪 Outils de Test

### Automatiques
- **WAVE**: https://wave.webaim.org/
- **axe DevTools**: Extension Chrome/Firefox
- **Lighthouse**: Dans Chrome DevTools
- **Pa11y**: Outil en ligne de commande

### Manuels
- **Lecteur d'écran**: NVDA (Windows), VoiceOver (Mac)
- **Navigation clavier**: Débrancher la souris
- **Zoom**: Tester à 200% et 400%
- **Contraste**: WebAIM Contrast Checker

---

## 📊 Score Actuel vs Cible

### Actuel (Estimé)
- **Structure**: 70/100
- **Navigation**: 60/100
- **Contenu**: 80/100
- **Formulaires**: 50/100
- **Global**: 65/100

### Cible
- **Structure**: 95/100
- **Navigation**: 90/100
- **Contenu**: 95/100
- **Formulaires**: 90/100
- **Global**: 92/100

---

## 💡 Bonnes Pratiques

1. **Tester avec de vrais utilisateurs** - Personnes utilisant des lecteurs d'écran
2. **Automatiser les tests** - Intégrer dans le workflow de développement
3. **Former l'équipe** - Sensibiliser à l'accessibilité
4. **Documenter** - Créer un guide d'accessibilité pour le projet
5. **Itérer** - L'accessibilité est un processus continu

---

## 🔗 Ressources

- **WCAG 2.1**: https://www.w3.org/WAI/WCAG21/quickref/
- **MDN Accessibility**: https://developer.mozilla.org/en-US/docs/Web/Accessibility
- **WebAIM**: https://webaim.org/
- **A11y Project**: https://www.a11yproject.com/
- **ARIA Authoring Practices**: https://www.w3.org/WAI/ARIA/apg/

---

**Date**: 18 Avril 2026  
**Status**: 🔄 En Cours | Lazy Loading ✅ | ARIA À Ajouter  
**Impact**: 🎯 Accessibilité pour tous les utilisateurs
