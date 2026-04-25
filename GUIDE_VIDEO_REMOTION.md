# 🎬 Guide Vidéo de Présentation TontineChain avec Remotion

## ✅ Installation Terminée

Remotion est maintenant installé et configuré dans votre projet!

## 🎥 Contenu de la Vidéo (30 secondes)

### Scène 1: Intro (0-5s)
- Logo TontineChain animé
- Titre avec effet de zoom
- Sous-titre "Tontines Sécurisées par Blockchain 🇧🇯"

### Scène 2: Le Problème (5-11s)
- 200 milliards FCFA en jeu
- 600+ plaintes de détournement
- Carnets falsifiés
- 70% de femmes victimes

### Scène 3: La Solution (11-17s)
- Smart Contracts Immuables
- Transparence Totale
- Distribution Automatique
- Sécurité Absolue

### Scène 4: Comment ça marche (17-24s)
- 4 étapes animées avec icônes
- Processus simplifié

### Scène 5: Call to Action (24-30s)
- "Créez votre Tontine Sécurisée"
- URL du site
- Bouton animé

## 🚀 Commandes

### 1. Prévisualiser la vidéo
```bash
npm run remotion:preview
```
Cela ouvrira un navigateur avec l'éditeur Remotion où vous pourrez:
- Voir la vidéo en temps réel
- Modifier les scènes
- Ajuster les timings
- Changer les couleurs

### 2. Rendre la vidéo finale
```bash
npm run remotion:render
```
La vidéo sera générée dans le dossier `out/video.mp4`

## 🎨 Personnalisation

### Modifier les couleurs
Dans `remotion/TontineChainPresentation.jsx`:
- Vert: `#0B6623`
- Or: `#FFD700`
- Bleu: `#1E40AF`

### Modifier les durées
```javascript
// Dans Root.jsx
durationInFrames={900} // 30s à 30 FPS

// Dans TontineChainPresentation.jsx
<Sequence from={0} durationInFrames={150}> // 5 secondes
```

### Ajouter des images
```javascript
<Img src="/assets/images/dashboard.png" />
```

## 📊 Spécifications Vidéo

- **Résolution**: 1920x1080 (Full HD)
- **FPS**: 30
- **Durée**: 30 secondes
- **Format**: MP4
- **Qualité**: Haute

## 🎬 Workflow Recommandé

1. **Prévisualiser**:
   ```bash
   npm run remotion:preview
   ```

2. **Modifier** les scènes dans `remotion/TontineChainPresentation.jsx`

3. **Tester** les changements en temps réel

4. **Rendre** la vidéo finale:
   ```bash
   npm run remotion:render
   ```

5. **Partager** `out/video.mp4`

## 🎯 Astuces

### Changer le texte
Modifiez directement dans les composants:
```javascript
<h1>Votre nouveau titre</h1>
```

### Ajouter une scène
```javascript
<Sequence from={900} durationInFrames={150}>
  <VotreNouvelleScene />
</Sequence>
```

### Exporter en différentes résolutions
```bash
# 720p
remotion render TontineChainPresentation out/video-720p.mp4 --height=720

# 4K
remotion render TontineChainPresentation out/video-4k.mp4 --height=2160
```

## 🐛 Dépannage

### Erreur "Module not found"
```bash
npm install
```

### Vidéo trop lente à rendre
Réduisez la qualité:
```bash
remotion render TontineChainPresentation out/video.mp4 --quality=50
```

### Port déjà utilisé
```bash
npm run remotion:preview -- --port=3001
```

## 📱 Formats Recommandés

### YouTube
- 1920x1080, 30 FPS ✅ (déjà configuré)

### Instagram/TikTok
```bash
remotion render TontineChainPresentation out/video-vertical.mp4 --width=1080 --height=1920
```

### Twitter
- 1280x720, 30 FPS
```bash
remotion render TontineChainPresentation out/video-twitter.mp4 --width=1280 --height=720
```

## 🎨 Palette de Couleurs TontineChain

- **Vert Émeraude**: `#0B6623` (Primaire)
- **Or Royal**: `#FFD700` (Accent)
- **Bleu Blockchain**: `#1E40AF` (Secondaire)
- **Noir**: `#1a1a1a` (Fond)
- **Blanc**: `#ffffff` (Texte)

## 📦 Structure des Fichiers

```
remotion/
├── Root.jsx                      # Configuration principale
├── TontineChainPresentation.jsx  # Toutes les scènes
└── (ajoutez vos scènes ici)

out/
└── video.mp4                     # Vidéo finale
```

## 🚀 Prochaines Étapes

1. Lancez `npm run remotion:preview`
2. Explorez l'éditeur Remotion
3. Modifiez les textes/couleurs selon vos besoins
4. Rendez votre vidéo finale
5. Partagez sur les réseaux sociaux!

## 💡 Idées d'Amélioration

- Ajouter des captures d'écran du dashboard
- Inclure des témoignages
- Ajouter de la musique de fond
- Créer des versions courtes (15s, 10s)
- Traduire en Fon

---

**Besoin d'aide?** Consultez la documentation Remotion: https://remotion.dev
