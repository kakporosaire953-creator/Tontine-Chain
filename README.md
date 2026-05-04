# TontineChain - Plateforme de Tontines Sécurisées par Blockchain 🇧🇯

## 📋 Description

TontineChain est une plateforme web innovante qui sécurise les tontines béninoises grâce à la technologie blockchain. Le projet vise à résoudre les problèmes majeurs des tontines traditionnelles : détournements (Cale Sèche), carnets falsifiés, et absence de protection pour les participants (majoritairement des femmes).

## ✨ Fonctionnalités Principales

### Pages Publiques
- **Page d'accueil** (`index.html`) - Landing page avec sections Problème, Solution, Fonctionnalités, FAQ
- **Connexion** (`login.html`) - Authentification utilisateur
- **Inscription** (`signup.html`) - Création de compte avec validation

### Pages Application
- **Dashboard** (`dashboard.html`) - Vue d'ensemble des tontines, statistiques, activité récente
- **Créer une Tontine** (`create-tontine.html`) - Formulaire multi-étapes (4 étapes)
- **Rejoindre une Tontine** (`join-tontine.html`) - Recherche et adhésion aux tontines disponibles

### Fonctionnalités Techniques
- ✅ Design responsive (mobile-first)
- ✅ Formulaires multi-étapes avec validation
- ✅ Système de filtres et recherche
- ✅ Animations et transitions fluides
- ✅ Indicateur de force de mot de passe
- ✅ Toggle password visibility
- ✅ Interface moderne et intuitive

## 🎨 Design System

### Palette de Couleurs
- **Or** : `#FFB81C` (Logo, accents)
- **Bleu** : `#1E40AF` (Blockchain, technologie)
- **Vert** : `#00A86B` (Actions principales, succès)

### Typographie
- **Titres** : Space Grotesk
- **Corps** : Manrope

### Icônes
- Font Awesome 6.5.1

## 📁 Structure du Projet

```
MIABE HACKATHON 1/
├── index.html                      # Page d'accueil
├── login.html                      # Connexion
├── signup.html                     # Inscription
├── dashboard.html                  # Tableau de bord
├── create-tontine.html            # Création de tontine
├── join-tontine.html              # Rejoindre une tontine
├── style.css                       # Styles CSS principaux
├── script.js                       # JavaScript général
├── auth.js                         # Authentification
├── create-tontine.js              # Logique création tontine
├── join-tontine.js                # Logique rejoindre tontine
├── assets/
│   └── images/
│       ├── logo-tontinechain.jpeg
│       ├── dashboard.png
│       ├── femmes-tontine-reunion.png
│       ├── femmes-technologie.png
│       └── femmes-marche-dantokpa.png
├── README.md
└── DOCUMENTATION_COMPLETE_TONTINECHAIN.md
```

## 🚀 Installation et Utilisation

### Prérequis
Aucun ! Le projet utilise uniquement HTML, CSS et JavaScript vanilla.

### Lancement
1. Clonez ou téléchargez le projet
2. Ouvrez `index.html` dans votre navigateur
3. Naviguez entre les pages

### Navigation
- **Accueil** → `index.html`
- **Connexion** → `login.html`
- **Inscription** → `signup.html`
- **Dashboard** → `dashboard.html` (après connexion)
- **Créer** → `create-tontine.html`
- **Rejoindre** → `join-tontine.html`

## 🎯 Pages Détaillées

### 1. Page d'Accueil (index.html)
- Hero avec statistiques clés
- Section Problème (3 cartes détaillées)
- Section Solution (Architecture smart contract)
- Fonctionnalités (YAO Assistant IA, Messagerie)
- Comment ça marche (4 étapes)
- FAQ (4 catégories)
- Footer complet

### 2. Dashboard (dashboard.html)
- 4 cartes statistiques
- Actions rapides (4 boutons)
- Liste des tontines (3 exemples)
- Activité récente (4 items)

### 3. Créer une Tontine (create-tontine.html)
**Formulaire multi-étapes :**
1. Informations de base (nom, description, catégorie)
2. Règles financières (montant, fréquence, durée)
3. Inviter des membres
4. Confirmation et récapitulatif

### 4. Rejoindre une Tontine (join-tontine.html)
- Barre de recherche
- Filtres par catégorie
- Rejoindre par code d'invitation
- Liste des tontines disponibles (4 exemples)

### 5. Connexion (login.html)
- Formulaire email/mot de passe
- Option "Se souvenir de moi"
- Lien mot de passe oublié
- Connexion avec Wallet
- Design split-screen avec visuel

### 6. Inscription (signup.html)
- Formulaire complet (prénom, nom, email, téléphone, mot de passe)
- Indicateur de force du mot de passe
- Validation en temps réel
- Acceptation des CGU
- Design split-screen avec témoignage

## 🔧 Technologies Utilisées

- **HTML5** - Structure sémantique
- **CSS3** - Variables CSS, Grid, Flexbox
- **JavaScript ES6+** - Vanilla JS
- **Font Awesome 6.5.1** - Icônes
- **Google Fonts** - Space Grotesk, Manrope

## 📱 Responsive Design

Le site est entièrement responsive avec 3 breakpoints :
- **Mobile** : < 768px
- **Tablet** : 768px - 900px
- **Desktop** : > 900px

## 🎨 Composants UI

### Boutons
- `btn-primary` - Bouton vert principal
- `btn-outline` - Bouton bordure verte
- `btn-large` - Taille augmentée
- `btn-block` - Pleine largeur

### Cartes
- `stat-card-dash` - Cartes statistiques dashboard
- `tontine-card` - Cartes tontines
- `action-card` - Cartes actions rapides
- `tontine-item` - Items liste tontines

### Formulaires
- `form-input` - Input standard
- `input-with-icon` - Input avec icône
- `form-group` - Groupe de champs
- `form-row` - Ligne de 2 colonnes

## 🔐 Sécurité

- Validation côté client
- Indicateur de force de mot de passe
- Toggle visibility mot de passe
- Simulation d'authentification (tokens)

## 📊 Statistiques du Projet

- **6 pages HTML** complètes
- **5 fichiers JavaScript** fonctionnels
- **1 fichier CSS** (~2500+ lignes)
- **5 images** optimisées
- **100% responsive**
- **0 dépendances** externes (sauf CDN fonts/icons)

## 🚧 Fonctionnalités à Venir

- Backend API REST
- Intégration blockchain réelle
- Smart contracts Solidity
- Paiements Mobile Money
- Assistant IA YAO fonctionnel
- Messagerie temps réel
- Notifications push
- Multi-langue (FR/FON)
- Dark mode

## 👥 Équipe

Projet développé pour le **MIABE HACKATHON 1**

## 📄 Licence

Tous droits réservés © 2026 TontineChain

## 📞 Contact

- Email: contact@tontinechain.bj
- Localisation: Cotonou, Bénin 🇧🇯

---

**Made with ❤️ in Benin**
