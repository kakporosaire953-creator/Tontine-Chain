# 🚀 Guide de Démarrage - TontineChain

## 📋 Prérequis

- Navigateur moderne (Chrome, Firefox, Edge)
- Connexion Internet
- Backend Laravel accessible: https://tonnine-benin-backend.onrender.com

---

## 🔧 Installation

### 1. Cloner le projet
```bash
git clone [url-du-repo]
cd TontineChain
```

### 2. Ouvrir avec un serveur local
```bash
# Option 1: Python
python -m http.server 8000

# Option 2: Node.js
npx http-server -p 8000

# Option 3: PHP
php -S localhost:8000

# Option 4: VS Code Live Server
# Clic droit sur index.html > Open with Live Server
```

### 3. Accéder à l'application
```
http://localhost:8000
```

---

## 🧪 Tester l'Intégration Backend

### Étape 1: Ouvrir l'outil de test
```
http://localhost:8000/test-api.html
```

### Étape 2: Vérifier la connexion
1. Le test `/health` devrait s'exécuter automatiquement
2. Résultat attendu: `{"status":"ok","message":"Service is healthy"}`

### Étape 3: Tester l'authentification
1. Entrer un numéro de téléphone (format: +22997000000)
2. Cliquer sur "Request OTP"
3. Vérifier la console du navigateur (F12) pour les logs
4. Si succès, un code OTP est envoyé (vérifier avec le backend)

### Étape 4: Vérifier le token
```javascript
// Dans la console du navigateur
localStorage.getItem('authToken')
```

---

## 📱 Utilisation de l'Application

### 1. Page d'Accueil (index.html)
- Présentation du projet
- Sections: Problème, Solution, Fonctionnalités, FAQ
- Toggle FR/FON en haut à droite

### 2. Inscription (signup.html)
- Entrer prénom, nom, téléphone
- Recevoir un code OTP
- Vérifier le code
- Redirection automatique vers le dashboard

### 3. Connexion (login.html)
- Entrer le numéro de téléphone
- Recevoir un code OTP
- Vérifier le code
- Redirection automatique vers le dashboard

### 4. Dashboard (dashboard.html)
- Vue d'ensemble des tontines
- Statistiques (Total épargné, Tontines actives, Taux de paiement)
- Historique des gains
- Score de confiance

### 5. Créer une Tontine (create-tontine.html)
- Formulaire en 4 étapes
- Configuration des règles
- Invitation des membres
- Confirmation et création

### 6. Rejoindre une Tontine (join-tontine.html)
- Liste des tontines publiques
- Recherche et filtres
- Demande d'adhésion

---

## 🔍 Debugging

### Activer les logs console
Les logs sont automatiquement activés. Ouvrir la console (F12) pour voir:
```
[API] GET /users/me
[API] Response: 200 {...}
[Dashboard] Starting data load...
[Dashboard] User: {...}
```

### Problèmes courants

#### 1. "Erreur de connexion"
**Cause:** Backend inaccessible ou token invalide  
**Solution:**
```javascript
// Vérifier le backend
fetch('https://tonnine-benin-backend.onrender.com/api/v1/health')
  .then(r => r.json())
  .then(console.log)

// Vérifier le token
console.log(localStorage.getItem('authToken'))
```

#### 2. "401 Unauthorized"
**Cause:** Token expiré ou invalide  
**Solution:** Se reconnecter via login.html

#### 3. "CORS Error"
**Cause:** Backend ne permet pas les requêtes depuis votre domaine  
**Solution:** Vérifier la configuration CORS côté Laravel

#### 4. "Aucune tontine"
**Cause:** Compte vide ou backend ne retourne pas de données  
**Solution:** Créer une tontine de test

---

## 📂 Structure des Fichiers

```
TontineChain/
├── index.html              # Page d'accueil
├── login.html              # Connexion
├── signup.html             # Inscription
├── dashboard.html          # Tableau de bord
├── create-tontine.html     # Création de tontine
├── join-tontine.html       # Rejoindre une tontine
├── mes-tontines.html       # Mes tontines
├── profil.html             # Profil utilisateur
├── paiement.html           # Paiements
├── messagerie.html         # Messagerie
├── assistant-yao.html      # Assistant IA
├── test-api.html           # Outil de test API
│
├── css/
│   ├── base.css            # Styles de base
│   ├── animations.css      # Animations
│   ├── components.css      # Composants
│   ├── home.css            # Page d'accueil
│   ├── style.css           # Styles principaux
│   ├── layout-fix.css      # Corrections layout
│   └── security-layers.css # Couches de sécurité
│
├── js/
│   ├── api.js              # Service API (IMPORTANT)
│   ├── auth.js             # Authentification
│   ├── dashboard-api.js    # Dashboard data
│   ├── kyc-sim.js          # Vérification KYC
│   ├── create-tontine.js   # Création de tontine
│   ├── join-tontine.js     # Rejoindre tontine
│   ├── blockchain.js       # Simulation blockchain
│   ├── i18n.js             # Traduction FR/FON
│   ├── yao.js              # Assistant IA
│   ├── animations.js       # Animations
│   └── app.js              # Application principale
│
├── assets/
│   └── images/             # Images et logos
│
├── README.md               # Documentation principale
├── INTEGRATION-STATUS.md   # État de l'intégration
└── GUIDE-DEMARRAGE.md      # Ce fichier
```

---

## 🔑 Fichiers Clés

### js/api.js
**Le plus important** - Gère toutes les communications avec le backend
- Configuration de l'URL de base
- Gestion automatique du token Bearer
- Unwrapping des réponses Laravel
- Gestion des erreurs 401

### js/auth.js
Gestion de l'authentification OTP
- Formatage automatique du numéro (+229)
- Envoi et vérification OTP
- Stockage du token
- Redirection après connexion

### js/dashboard-api.js
Chargement des données du dashboard
- Profil utilisateur
- Balance et statistiques
- Liste des tontines
- Historique des gains
- Score de confiance

---

## 🎨 Personnalisation

### Changer les couleurs
Éditer `css/base.css`:
```css
:root {
  --gold: #F5A623;
  --blue: #1A6BFF;
  --green: #00C896;
}
```

### Changer le thème
Cliquer sur le bouton "Faille" en bas à droite pour basculer entre:
- **Calcaire** (clair)
- **Basalte** (sombre)

### Ajouter une traduction
Éditer `js/i18n.js`:
```javascript
dict: {
  "Nouveau texte": "Traduction en Fon",
  // ...
}
```

---

## 📞 Support

### En cas de problème

1. **Vérifier la console** (F12)
2. **Tester avec test-api.html**
3. **Vérifier le backend**:
   ```bash
   curl https://tonnine-benin-backend.onrender.com/api/v1/health
   ```
4. **Consulter INTEGRATION-STATUS.md**

### Logs utiles
```javascript
// Voir tous les items du localStorage
console.table(localStorage)

// Voir le token
console.log(localStorage.getItem('authToken'))

// Voir l'utilisateur
console.log(JSON.parse(localStorage.getItem('user')))

// Tester un endpoint
API.user.getProfile().then(console.log).catch(console.error)
```

---

## 🚀 Prochaines Étapes

1. ✅ Tester l'authentification OTP avec le vrai backend
2. ✅ Vérifier le chargement du dashboard
3. ⏳ Créer une tontine de test
4. ⏳ Inviter des membres
5. ⏳ Tester les paiements
6. ⏳ Tester le système d'enchères

---

**Dernière mise à jour:** 9 Mai 2026  
**Version:** 1.0.0  
**Hackathon:** MIABE 2026 - Domaine D02
