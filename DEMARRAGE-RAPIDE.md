# 🚀 Démarrage Rapide - TontineChain

## Comment tester l'application maintenant

### Option 1: Test de Connectivité (Recommandé en premier)

1. Ouvrez `test-backend-connection.html` dans votre navigateur
2. Cliquez sur "Lancer les tests"
3. Vérifiez que les 3 tests passent:
   - ✅ Health Check
   - ✅ API Documentation
   - ⚠️ Groups Endpoint (nécessite authentification)

### Option 2: Test du Flux Complet

#### Étape 1: Inscription
```
1. Ouvrez index.html dans votre navigateur
2. Cliquez sur n'importe quel bouton → Redirige vers signup.html
3. Remplissez le formulaire d'inscription
4. Entrez votre numéro de téléphone (+229...)
5. Cliquez sur "Recevoir le code OTP"
6. Entrez le code OTP reçu
7. Vous serez redirigé vers dashboard.html
```

#### Étape 2: Dashboard
```
Le dashboard charge automatiquement:
- Vos statistiques (total épargné, tontines actives, etc.)
- Vos tontines
- Votre historique de gains
- Votre trust score
```

#### Étape 3: Créer une Tontine
```
1. Cliquez sur "Créer une Tontine"
2. Remplissez les 4 étapes:
   - Informations générales
   - Paramètres financiers
   - Inviter des membres (optionnel)
   - Confirmation
3. Soumettez
4. Retour au dashboard avec votre nouvelle tontine
```

#### Étape 4: Rejoindre une Tontine
```
1. Allez sur "Rejoindre une Tontine"
2. Parcourez les tontines disponibles
3. Utilisez les filtres (Commerce, Famille, etc.)
4. Cliquez sur "Rejoindre" sur une tontine
5. Confirmez
6. Vérifiez dans "Mes Tontines"
```

#### Étape 5: Mes Tontines
```
1. Allez sur "Mes Tontines"
2. Utilisez les filtres: Toutes, Actives, En attente, Terminées
3. Cliquez sur "Voir détails" pour plus d'infos
4. Cliquez sur "Payer" pour effectuer une cotisation
```

#### Étape 6: Paiements
```
1. Allez sur "Paiements"
2. Sélectionnez une tontine dans la liste
3. Choisissez votre méthode de paiement
4. Entrez votre numéro de téléphone
5. Cliquez sur "Payer"
6. Vérifiez l'historique des paiements
```

#### Étape 7: Profil
```
1. Allez sur "Profil"
2. Modifiez vos informations personnelles
3. Cliquez sur "Enregistrer les modifications"
4. Explorez les autres onglets:
   - Sécurité
   - Notifications
   - Wallet
```

---

## 🔍 Vérifications Importantes

### Console du Navigateur (F12)
Ouvrez la console pour voir les logs:
```
[API] GET /groups
[API] Response: 200 {...}
[Dashboard] Loaded 3 groups
```

### LocalStorage
Vérifiez que le token est stocké:
```javascript
// Dans la console du navigateur
localStorage.getItem('authToken')
// Devrait retourner un token JWT
```

### Network Tab
Vérifiez les requêtes API:
```
GET https://tonnine-benin-backend.onrender.com/api/v1/groups
Status: 200 OK
```

---

## ⚠️ Problèmes Courants

### 1. "Erreur de connexion"
**Solution:** Vérifiez que le backend est accessible
```bash
curl https://tonnine-benin-backend.onrender.com/api/v1/health
```

### 2. "Authentification requise"
**Solution:** Reconnectez-vous sur login.html

### 3. "Aucune tontine trouvée"
**Solution:** Créez d'abord une tontine ou vérifiez que le backend retourne des données

### 4. Page blanche
**Solution:** 
- Ouvrez la console (F12)
- Vérifiez les erreurs JavaScript
- Vérifiez que tous les fichiers JS sont chargés

---

## 📱 Test sur Mobile

1. Ouvrez l'application sur votre téléphone
2. Toutes les fonctionnalités sont responsive
3. Le menu bottom-nav est visible sur mobile
4. Les formulaires sont adaptés au tactile

---

## 🎯 Checklist de Test

- [ ] Test de connectivité backend (test-backend-connection.html)
- [ ] Inscription avec OTP
- [ ] Connexion avec OTP
- [ ] Dashboard charge les données
- [ ] Création d'une tontine
- [ ] Rejoindre une tontine
- [ ] Affichage "Mes Tontines"
- [ ] Paiement d'une cotisation
- [ ] Modification du profil
- [ ] Déconnexion

---

## 🔧 Outils de Debug

### 1. Console Logs
Tous les fichiers JS loggent leurs actions:
```javascript
console.log('[Dashboard] Loading data...')
console.log('[API] Response:', data)
```

### 2. Network Inspector
Vérifiez toutes les requêtes API dans l'onglet Network

### 3. LocalStorage Inspector
Vérifiez le token et les données stockées

### 4. Test Page
Utilisez `test-backend-connection.html` pour tester la connectivité

---

## 📞 Besoin d'Aide ?

1. **Console du navigateur** - Vérifiez les erreurs
2. **Network tab** - Vérifiez les requêtes API
3. **Backend logs** - Vérifiez les logs du serveur Laravel
4. **Documentation API** - https://tonnine-benin-backend.onrender.com/api/documentation

---

## ✅ Tout Fonctionne ?

Si tous les tests passent, félicitations ! 🎉

Votre application TontineChain est maintenant:
- ✅ Connectée au backend Laravel
- ✅ Fonctionnelle de bout en bout
- ✅ Prête pour les tests utilisateurs
- ✅ Prête pour la démo

**Prochaine étape:** Intégration FedaPay et blockchain Polygon pour les paiements réels !
