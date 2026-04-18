# Modifications - Remplacement Tablette par PC

## Date: 2026-04-17

## Résumé des changements

### 1. HTML (index.html)
- ✅ Remplacé la section `dashboard-mockup` (tablette) par `pc-mockup` (PC)
- ✅ Simplifié la structure HTML pour utiliser une image directe
- ✅ Ajouté un effet de lueur (`pc-glow`) sous le PC
- ✅ Mis à jour l'icône de la légende (tablet-alt → laptop)
- ✅ Changé le script `tablet-mockup.js` par `pc-mockup.js`

### 2. CSS (assets/css/style.css)
- ✅ Ajouté les styles `.pc-mockup` avec effet 3D
- ✅ Créé `.pc-container` avec perspective et transformation 3D
- ✅ Stylisé `.pc-image` avec:
  - Ombres multiples pour effet de profondeur
  - Filtres pour améliorer la luminosité et le contraste
  - Bordure dorée subtile (couleur primaire)
  - Rotation 3D pour "regarder" le visiteur
- ✅ Ajouté `.pc-glow` avec animation de pulsation
- ✅ Renforcé le style `.demo-caption`:
  - Texte en gras (font-weight: 700)
  - Bordure dorée de 2px
  - Ombre plus prononcée
  - Icône plus grande (1.5rem)
- ✅ Responsive design pour mobile et tablette

### 3. JavaScript (assets/js/pc-mockup.js)
- ✅ Créé nouveau fichier pour animations du PC
- ✅ Effet 3D au mouvement de la souris
- ✅ Effet parallaxe au scroll
- ✅ Animation d'entrée au chargement
- ✅ Retour à la position normale au mouseleave

## Caractéristiques visuelles

### Effet "Gras" et Professionnel
1. **Ombres multiples** pour créer de la profondeur
2. **Filtres CSS** pour améliorer l'image (brightness, contrast, saturation)
3. **Bordure dorée** pour attirer l'attention
4. **Lueur animée** sous le PC (couleur primaire)
5. **Rotation 3D** pour donner l'impression que le PC "regarde" le visiteur

### Effet "Regard vers le visiteur"
- Rotation initiale: `rotateY(-8deg) rotateX(3deg)`
- Le PC est légèrement tourné vers la gauche et incliné vers le haut
- Crée l'illusion que l'écran est orienté vers le visiteur
- Au survol, l'effet s'accentue avec une légère mise à l'échelle

### Interactivité
- Mouvement 3D au survol de la souris
- Effet parallaxe au scroll
- Animation fluide avec cubic-bezier
- Responsive sur tous les appareils

## Image utilisée
- URL: https://i.postimg.cc/Kz8Lm7Qy/laptop-mockup.jpg
- Alt text: "MacBook Pro - TontineChain Dashboard"
- Format: JPG optimisé pour le web

## Compatibilité
- ✅ Desktop (1920px+)
- ✅ Laptop (1024px - 1920px)
- ✅ Tablet (768px - 1024px)
- ✅ Mobile (< 768px)

## Notes techniques
- Utilisation de `perspective` et `transform-style: preserve-3d` pour l'effet 3D
- Animation CSS `@keyframes glowPulse` pour la lueur
- JavaScript vanilla (pas de dépendances)
- Performance optimisée avec `cubic-bezier` pour les transitions

## Résultat final
Le PC est maintenant affiché de manière professionnelle et attrayante, avec un effet 3D qui donne l'impression qu'il "regarde" le visiteur. La légende est bien visible en gras avec une bordure dorée qui attire l'attention.
