# TontineChain - Tontines Sécurisées par Blockchain

<div align="center">
  <img src="assets/images/logo-tontinechain.jpeg" alt="TontineChain Logo" width="200"/>
  
  <p><strong>La première plateforme de tontines 100% sécurisée au Bénin</strong></p>
  
  <p>
    <a href="https://kakporosaire953-creator.github.io/Tontine-Chain/">
      <i class="fas fa-globe"></i> Site Web
    </a>
    •
    <a href="#fonctionnalites">
      <i class="fas fa-star"></i> Fonctionnalités
    </a>
    •
    <a href="#technologies">
      <i class="fas fa-code"></i> Technologies
    </a>
    •
    <a href="#installation">
      <i class="fas fa-download"></i> Installation
    </a>
  </p>
</div>

---

## <i class="fas fa-info-circle"></i> À Propos

TontineChain est une application web innovante qui révolutionne les tontines traditionnelles au Bénin en utilisant la technologie blockchain. Notre mission est d'éliminer les détournements de fonds, les carnets falsifiés et de protéger les femmes entrepreneures qui dépendent des tontines pour leur activité économique.

### <i class="fas fa-exclamation-triangle"></i> Le Problème

Les tontines traditionnelles au Bénin font face à des défis majeurs :

- **600+ plaintes** enregistrées à Porto-Novo en 2021 (Source: ANSSFD)
- **15-20%** des tontines connaissent des incidents majeurs
- **200 milliards FCFA** dans la microfinance béninoise
- **70%** des participantes sont des femmes sans protection juridique
- **Cale Sèche** : Collecteurs qui disparaissent avec l'épargne
- **Carnets falsifiés** : Registres perdus ou modifiés frauduleusement

### <i class="fas fa-lightbulb"></i> Notre Solution

TontineChain combine la blockchain Polygon avec les pratiques traditionnelles des tontines béninoises pour offrir :

- <i class="fas fa-shield-alt"></i> **Sécurité absolue** : Smart contracts immuables
- <i class="fas fa-eye"></i> **Transparence totale** : Toutes les transactions tracées
- <i class="fas fa-robot"></i> **Automatisation** : Paiements automatiques selon l'ordre
- <i class="fas fa-mobile-alt"></i> **Accessibilité** : Interface simple en français et fon
- <i class="fas fa-credit-card"></i> **Mobile Money** : Intégration MTN et Moov via FedaPay

---

## <i class="fas fa-star"></i> Fonctionnalités

### <i class="fas fa-link"></i> Blockchain Sécurisée

- Smart contracts audités sur Polygon PoS
- Transactions gasless (EIP-2771) - zéro frais pour les utilisateurs
- Isolation des fonds par groupe
- Historique immuable de toutes les transactions

### <i class="fas fa-robot"></i> YAO - Assistant IA

- Conseiller financier intelligent disponible 24/7
- Analyse des habitudes d'épargne
- Alertes proactives avant les échéances
- Support multilingue (Français, Fon)

### <i class="fas fa-comments"></i> Messagerie Intégrée

- Chat en direct entre membres du groupe
- Notifications push en temps réel
- Partage de fichiers et documents

### <i class="fas fa-shield-alt"></i> 7 Couches de Protection

1. **Authentification OTP** : Connexion sans mot de passe via SMS/WhatsApp
2. **Vérification KYC (NPI)** : Identification obligatoire avant accès
3. **Score de Confiance** : Évaluation dynamique de la fiabilité
4. **Notifications Multi-Canal** : Alertes par SMS, WhatsApp et Email
5. **Paiements Sécurisés** : Intégration FedaPay certifiée
6. **Analyse de Risque IA** : Détection prédictive des défauts
7. **Blockchain** : Couche finale immuable avec smart contracts

---

## <i class="fas fa-code"></i> Technologies

### Frontend

- **HTML5/CSS3** : Structure et design responsive
- **JavaScript Vanilla** : Logique applicative sans framework
- **Font Awesome 6.5.1** : Icônes et symboles
- **Google Fonts** : Typographie (Space Grotesk, Manrope, Playfair Display)

### Architecture CSS Modulaire

```
css/
├── base.css           # Variables, reset, typographie
├── animations.css     # Animations et transitions
├── components.css     # Composants réutilisables
├── home.css          # Styles page d'accueil
├── style.css         # Styles globaux
├── layout-fix.css    # Corrections de layout
└── security-layers.css # Styles couches de sécurité
```

### JavaScript Modulaire

```
js/
├── app.js              # Initialisation application
├── auth.js             # Authentification OTP
├── blockchain.js       # Intégration blockchain
├── create-tontine.js   # Création de tontines
├── join-tontine.js     # Rejoindre une tontine
├── mes-tontines.js     # Gestion des tontines
├── yao.js              # Assistant IA YAO
├── i18n.js             # Internationalisation
├── animations.js       # Animations scroll
├── script.js           # Utilitaires généraux
├── share.js            # Partage social
├── kyc-sim.js          # Simulation KYC
├── faille.js           # Détection failles
├── fix_i18n.js         # Corrections i18n
├── remove_numbers.js   # Nettoyage données
└── add_bottom_nav.js   # Navigation mobile
```

### Blockchain & Backend

- **Polygon PoS** : Blockchain principale
- **Solidity** : Langage smart contracts
- **OpenZeppelin** : Librairies de sécurité
- **Chainlink** : Automation et oracles
- **Laravel 12** : Backend API REST
- **Laravel Sanctum** : Authentification API

### Services Externes

- **Infobip** : Envoi SMS et WhatsApp
- **FedaPay** : Paiements Mobile Money (MTN, Moov)
- **Render.com** : Hébergement backend

---

## <i class="fas fa-folder-open"></i> Structure du Projet

```
Tontine-Chain/
├── assets/
│   └── images/              # Images et logos
├── css/                     # Feuilles de style modulaires
├── js/                      # Scripts JavaScript
├── index.html               # Page d'accueil
├── signup.html              # Inscription
├── login.html               # Connexion
├── dashboard.html           # Tableau de bord
├── create-tontine.html      # Création de tontine
├── join-tontine.html        # Rejoindre une tontine
├── mes-tontines.html        # Mes tontines
├── profil.html              # Profil utilisateur
├── paiement.html            # Paiement
├── messagerie.html          # Messagerie
├── assistant-yao.html       # Assistant IA
├── manifest.json            # PWA manifest
└── README.md                # Documentation
```

---

## <i class="fas fa-download"></i> Installation

### Prérequis

- Navigateur web moderne (Chrome, Firefox, Safari, Edge)
- Serveur web local (optionnel pour développement)

### Installation Locale

1. **Cloner le repository**

```bash
git clone https://github.com/kakporosaire953-creator/Tontine-Chain.git
cd Tontine-Chain
```

2. **Ouvrir avec un serveur local**

Option 1 - Python:
```bash
python -m http.server 8000
```

Option 2 - Node.js:
```bash
npx http-server -p 8000
```

Option 3 - PHP:
```bash
php -S localhost:8000
```

3. **Accéder à l'application**

Ouvrir le navigateur et aller sur `http://localhost:8000`

### Déploiement

Le site est déployé sur GitHub Pages :
```
https://kakporosaire953-creator.github.io/Tontine-Chain/
```

---

## <i class="fas fa-rocket"></i> Utilisation

### 1. Inscription

- Accéder à la page d'inscription
- Entrer nom, prénom et numéro de téléphone (+229)
- Recevoir et entrer le code OTP
- Compléter le profil avec le NPI

### 2. Créer une Tontine

- Cliquer sur "Créer ma Tontine"
- Définir les paramètres :
  - Nom et description
  - Montant de cotisation
  - Fréquence (hebdomadaire, mensuelle)
  - Nombre de membres
  - Durée en cycles
- Inviter les membres
- Valider la création

### 3. Rejoindre une Tontine

- Parcourir les tontines publiques
- Filtrer par catégorie, montant, durée
- Consulter les détails
- Envoyer une demande d'adhésion

### 4. Gérer ses Tontines

- Voir le tableau de bord avec statistiques
- Consulter l'historique des transactions
- Effectuer les paiements via Mobile Money
- Recevoir les notifications d'échéances
- Communiquer avec les membres

### 5. Utiliser YAO

- Ouvrir l'assistant IA
- Poser des questions sur les tontines
- Recevoir des conseils personnalisés
- Obtenir des analyses de performance

---

## <i class="fas fa-paint-brush"></i> Design & UX

### Principes de Design

- **Simplicité** : Interface épurée et intuitive
- **Accessibilité** : Contraste élevé, textes lisibles
- **Responsive** : Adapté mobile, tablette et desktop
- **Performance** : Chargement rapide, animations fluides
- **Localisation** : Français et Fon

### Palette de Couleurs

- **Vert (#00C896)** : Confiance, sécurité, croissance
- **Bleu (#3B82F6)** : Technologie, fiabilité
- **Or (#F59E0B)** : Valeur, richesse
- **Rouge (#EF4444)** : Alertes, urgence
- **Gris (#64748B)** : Textes secondaires

### Typographie

- **Space Grotesk** : Titres et headers (moderne, tech)
- **Manrope** : Corps de texte (lisible, professionnel)
- **Playfair Display** : Accents élégants

---

## <i class="fas fa-lock"></i> Sécurité

### Smart Contracts

- Audités par OpenZeppelin
- Tests unitaires complets
- Déploiement sur Polygon mainnet
- Upgradeable via proxy pattern

### Authentification

- OTP via SMS et WhatsApp (Infobip)
- Pas de mots de passe stockés
- Sessions sécurisées avec tokens JWT
- Vérification KYC obligatoire (NPI)

### Données

- Chiffrement end-to-end
- Stockage décentralisé sur IPFS
- Backup automatique
- Conformité RGPD

### Paiements

- Intégration FedaPay certifiée PCI-DSS
- Webhooks sécurisés
- Vérification double des transactions
- Historique immuable sur blockchain

---

## <i class="fas fa-chart-line"></i> Roadmap

### Phase 1 - MVP (Terminé)

- [x] Interface utilisateur complète
- [x] Authentification OTP
- [x] Création et gestion de tontines
- [x] Intégration blockchain Polygon
- [x] Assistant IA YAO
- [x] Messagerie intégrée

### Phase 2 - Lancement (En cours)

- [ ] Tests utilisateurs au Bénin
- [ ] Intégration FedaPay production
- [ ] Déploiement smart contracts mainnet
- [ ] Campagne marketing locale
- [ ] Partenariats avec associations

### Phase 3 - Expansion (2026)

- [ ] Application mobile native (iOS/Android)
- [ ] Support d'autres pays (Togo, Côte d'Ivoire)
- [ ] Système de crédit basé sur le score
- [ ] Marketplace de services financiers
- [ ] Programme de parrainage

---

## <i class="fas fa-users"></i> Équipe

**Développé pour le Hackathon MIABE 2026**

- **Conception & Développement** : Équipe TontineChain
- **Design UI/UX** : Interface moderne et accessible
- **Blockchain** : Smart contracts Solidity
- **Backend** : API Laravel 12

---

## <i class="fas fa-balance-scale"></i> Licence

Ce projet est développé dans le cadre du Hackathon MIABE 2026.

Tous droits réservés © 2026 TontineChain

---

## <i class="fas fa-envelope"></i> Contact

- **Site Web** :https://tontine-chain-pied.vercel.app/
- **GitHub** : [https://github.com/kakporosaire953-creator/Tontine-Chain](https://github.com/kakporosaire953-creator/Tontine-Chain)
- **Email** : contact@tontinechain.bj

---

## <i class="fas fa-heart"></i> Remerciements

- **ANSSFD** : Données sur les tontines au Bénin
- **Journal La Nation** : Reportages sur la Cale Sèche
- **Communauté Blockchain Bénin** : Support technique
- **Femmes entrepreneures** : Retours utilisateurs
- **Hackathon MIABE 2026** : Opportunité de développement

---

<div align="center">
  <p><strong>Fait avec <i class="fas fa-heart"></i> au Bénin pour les Béninois</strong></p>
  <p>TontineChain - Fini les détournements, place à la confiance</p>
</div>
