# 🔗 TontineChain - Intégration Backend Complète

[![Status](https://img.shields.io/badge/Status-Ready%20for%20Testing-success)](https://github.com)
[![Backend](https://img.shields.io/badge/Backend-Laravel%2012-red)](https://tonnine-benin-backend.onrender.com)
[![Frontend](https://img.shields.io/badge/Frontend-Vanilla%20JS-yellow)](https://github.com)
[![Hackathon](https://img.shields.io/badge/Hackathon-MIABE%202026-blue)](https://github.com)

> Plateforme de tontines sécurisées par blockchain au Bénin

---

## 🎯 Statut du Projet

**✅ PRÊT POUR LES TESTS**

L'intégration frontend ↔ backend est complète avec :
- ✅ Logs détaillés pour le debugging
- ✅ Gestion robuste des erreurs
- ✅ 3 outils de test intégrés
- ✅ Protection contre les valeurs null
- ✅ Redirection automatique si déconnecté
- ✅ Documentation complète

---

## 🚀 Démarrage Rapide

### 1. Cloner le projet
```bash
git clone [url-du-repo]
cd TontineChain
```

### 2. Lancer un serveur local
```bash
# Python
python -m http.server 8000

# Node.js
npx http-server -p 8000

# PHP
php -S localhost:8000
```

### 3. Ouvrir le centre de test
```
http://localhost:8000/index-test.html
```

### 4. Lancer Quick Test
Cliquer sur "Quick Test" pour vérifier la connexion backend en 30 secondes.

---

## 📁 Structure du Projet

```
TontineChain/
├── 🧪 OUTILS DE TEST
│   ├── index-test.html          # Centre de test (COMMENCER ICI)
│   ├── quick-test.html          # Test rapide (30 sec)
│   ├── test-api.html            # Tests complets
│   └── debug-console.html       # Console de debugging
│
├── 📚 DOCUMENTATION
│   ├── LIRE-MOI-DABORD.md       # Guide de démarrage (LIRE EN 1er)
│   ├── CORRECTIONS-APPLIQUEES.md # Résumé des corrections
│   ├── INTEGRATION-STATUS.md    # État de l'intégration
│   └── GUIDE-DEMARRAGE.md       # Guide complet
│
├── 🌐 APPLICATION
│   ├── index.html               # Page d'accueil
│   ├── signup.html              # Inscription
│   ├── login.html               # Connexion
│   ├── dashboard.html           # Tableau de bord
│   ├── create-tontine.html      # Création de tontine
│   └── join-tontine.html        # Rejoindre une tontine
│
├── 🎨 CSS
│   ├── base.css                 # Styles de base
│   ├── animations.css           # Animations
│   ├── components.css           # Composants
│   └── style.css                # Styles principaux
│
└── ⚙️ JAVASCRIPT
    ├── api.js                   # ⭐ Service API (IMPORTANT)
    ├── auth.js                  # Authentification OTP
    ├── dashboard-api.js         # Dashboard data
    ├── create-tontine.js        # Création de tontine
    └── i18n.js                  # Traduction FR/FON
```

---

## 🧪 Outils de Test

### 1. Centre de Test (index-test.html)
Interface centrale avec accès à tous les outils et la documentation.

**Utilisation:**
```
http://localhost:8000/index-test.html
```

### 2. Quick Test (quick-test.html)
Test automatique en 4 étapes :
- ✅ Backend Health
- ✅ API Configuration
- ✅ Token Storage
- ✅ CORS Policy

**Utilisation:**
```
http://localhost:8000/quick-test.html
```
Les tests se lancent automatiquement.

### 3. Tests Complets (test-api.html)
Interface pour tester tous les endpoints :
- Health check
- Authentification OTP
- Profil utilisateur
- Groupes
- Balance & Stats

**Utilisation:**
```
http://localhost:8000/test-api.html
```

### 4. Debug Console (debug-console.html)
Console avec commandes rapides :
- Voir le token
- Voir l'utilisateur
- Tester l'API
- Effacer le storage

**Utilisation:**
```
http://localhost:8000/debug-console.html
```

---

## 📚 Documentation

### Ordre de Lecture Recommandé

1. **LIRE-MOI-DABORD.md** - Démarrage rapide (3 min)
2. **CORRECTIONS-APPLIQUEES.md** - Comprendre les corrections
3. **INTEGRATION-STATUS.md** - État détaillé
4. **GUIDE-DEMARRAGE.md** - Guide complet

---

## 🔧 Fichiers Clés

### js/api.js ⭐
**Le plus important** - Gère toutes les communications avec le backend.

**Fonctionnalités:**
- Configuration de l'URL de base
- Gestion automatique du token Bearer
- Unwrapping des réponses Laravel
- Gestion des erreurs 401
- Logs détaillés

**Exemple:**
```javascript
// Appel API simple
const user = await API.user.getProfile();

// Tous les logs sont automatiques
// [API] GET /users/me
// [API] Response: 200 {...}
```

### js/auth.js
Gestion de l'authentification OTP.

**Fonctionnalités:**
- Formatage automatique du numéro (+229)
- Envoi et vérification OTP
- Stockage du token
- Redirection après connexion

### js/dashboard-api.js
Chargement des données du dashboard.

**Fonctionnalités:**
- Profil utilisateur
- Balance et statistiques
- Liste des tontines
- Historique des gains
- Score de confiance

---

## 🔍 Debugging

### Vérifier la Console
Ouvrir la console du navigateur (F12) pour voir les logs :
```
[API] GET /users/me
[API] Response: 200 {...}
[Dashboard] Starting data load...
[Dashboard] User: {...}
```

### Commandes Utiles
```javascript
// Voir le token
localStorage.getItem('authToken')

// Voir l'utilisateur
JSON.parse(localStorage.getItem('user'))

// Tester un endpoint
API.user.getProfile().then(console.log).catch(console.error)

// Effacer tout
localStorage.clear()
location.reload()
```

---

## 🌐 Backend

### URLs
- **API Base:** https://tonnine-benin-backend.onrender.com/api/v1
- **Health:** https://tonnine-benin-backend.onrender.com/api/v1/health
- **Documentation:** https://tonnine-benin-backend.onrender.com/api/documentation

### Endpoints Intégrés

#### Authentification
- `POST /auth/request-otp` - Demander un code OTP
- `POST /auth/verify-otp` - Vérifier le code OTP

#### Utilisateur
- `GET /users/me` - Profil utilisateur
- `PATCH /users/me` - Mettre à jour le profil
- `GET /users/me/balance` - Balance et statistiques
- `GET /users/me/score` - Score de confiance
- `GET /users/me/payouts` - Historique des gains

#### Groupes (Tontines)
- `GET /groups` - Liste des groupes
- `POST /groups` - Créer un groupe
- `GET /groups/{id}` - Détails d'un groupe
- `POST /groups/{id}/join` - Rejoindre un groupe

---

## ✅ Checklist d'Intégration

### Backend
- [x] Health check fonctionnel
- [x] CORS configuré
- [ ] Authentification OTP (à tester avec vrai backend)

### Frontend
- [x] Service API avec logs
- [x] Gestion des erreurs
- [x] Formatage des données
- [x] Protection contre null
- [x] Redirection auto si 401

### Tests
- [x] Quick Test créé
- [x] Tests complets créés
- [x] Debug console créée
- [x] Centre de test créé

### Documentation
- [x] LIRE-MOI-DABORD.md
- [x] CORRECTIONS-APPLIQUEES.md
- [x] INTEGRATION-STATUS.md
- [x] GUIDE-DEMARRAGE.md

---

## 🚀 Prochaines Étapes

### Immédiat
1. Tester l'authentification OTP avec le vrai backend
2. Vérifier le chargement du dashboard
3. Créer une tontine de test

### Court terme
1. Implémenter les détails de tontine
2. Système de paiement
3. Messagerie entre membres

### Moyen terme
1. Système d'enchères
2. Notifications en temps réel
3. Tests end-to-end

---

## 🐛 Problèmes Connus

### 1. Cold Start du Backend
**Symptôme:** Première requête lente (15-30 sec)  
**Cause:** Render.com met le backend en veille  
**Solution:** Attendre que le premier appel réussisse

### 2. OTP Réels
**Symptôme:** Besoin d'un vrai numéro béninois  
**Solution:** Utiliser +229... ou demander un mode test au backend

### 3. Token Expiration
**Symptôme:** Redirection vers login après quelques heures  
**Solution:** Implémenté - Redirection automatique en cas de 401

---

## 📞 Support

### En cas de problème

1. **Lancer quick-test.html**
2. **Vérifier la console (F12)**
3. **Utiliser debug-console.html**
4. **Consulter INTEGRATION-STATUS.md**

### Logs Utiles
```javascript
// Voir tous les items du localStorage
console.table(localStorage)

// Tester manuellement
API.user.getProfile().then(console.log).catch(console.error)
```

---

## 🎓 Technologies

### Frontend
- HTML5 / CSS3
- Vanilla JavaScript (ES6+)
- Font Awesome 6.5.1
- Google Fonts

### Backend
- Laravel 12 (PHP 8.2+)
- Polygon PoS (Blockchain)
- FedaPay (Paiements)
- Infobip (SMS/WhatsApp)

---

## 📄 Licence

Projet développé dans le cadre du **Hackathon MIABE 2026**.  
Domaine : D02 - Inclusion Financière.

---

## 👥 Équipe

**Hackathon MIABE 2026**  
Domaine D02 - Inclusion Financière

---

## 🌟 Résumé

**Avant:** Intégration configurée mais non fonctionnelle.

**Après:**
- ✅ Logs détaillés partout
- ✅ Gestion robuste des erreurs
- ✅ 4 outils de test
- ✅ 4 documents de documentation
- ✅ Protection complète des données
- ✅ **PRÊT POUR LES TESTS**

---

**Dernière mise à jour:** 9 Mai 2026  
**Version:** 1.0.0  
**Statut:** ✅ Ready for Testing
