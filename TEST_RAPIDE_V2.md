# ⚡ Test Rapide Mobile V2 - 2 Minutes

## 🎯 Tests Essentiels

### ✅ Test 1: Menu Hamburger (30 secondes)
1. Ouvrir https://tontine-chain.vercel.app sur mobile
2. Cliquer sur le bouton hamburger (☰)
3. **Vérifier**: Le menu s'ouvre ✅
4. Cliquer sur le X
5. **Vérifier**: Le menu se ferme ✅
6. **Résultat attendu**: Pas de blocage, fermeture fluide

### ✅ Test 2: Logo + Switcher (30 secondes)
1. Sur la page d'accueil mobile
2. **Vérifier**: Le logo TontineChain est visible ✅
3. **Vérifier**: Le switcher FR/FON est à côté ✅
4. **Vérifier**: Pas de chevauchement ✅
5. Sur iPhone SE (< 380px): Seul le logo doit être visible

### ✅ Test 3: Mockup Mobile (30 secondes)
1. Scroller vers la section Hero
2. **Vérifier**: Un téléphone mockup est visible ✅
3. **Vérifier**: Le téléphone "flotte" avec animation ✅
4. **Vérifier**: L'image dashboard mobile est affichée ✅
5. **Résultat attendu**: Design premium avec ombres

### ✅ Test 4: Navigation (30 secondes)
1. Ouvrir le menu hamburger
2. Cliquer sur "Problème"
3. **Vérifier**: Scroll vers la section + menu se ferme ✅
4. Répéter avec "Solution", "FAQ"
5. **Résultat attendu**: Navigation fluide

---

## 🐛 Si Problème Détecté

### Menu ne se ferme pas
- Vider le cache: Ctrl + Shift + R
- Vérifier la console (F12) pour erreurs JS

### Logo chevauche le switcher
- Vérifier la largeur de l'écran
- Sur < 380px, le nom doit être masqué

### Mockup pas visible
- Vérifier que vous êtes sur mobile (< 768px)
- L'image doit être `mobile-dashboard.png`

---

## ✅ Checklist Rapide

- [ ] Menu hamburger s'ouvre et se ferme
- [ ] Pas de collision logo/switcher
- [ ] Mockup mobile visible et animé
- [ ] Navigation fonctionne
- [ ] Pas de scroll horizontal

**Temps total**: 2 minutes  
**Statut**: ✅ Tous les bugs corrigés
