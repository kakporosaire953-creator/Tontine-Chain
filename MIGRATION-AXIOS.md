# 🔄 Migration vers Axios

## Changement Effectué

L'API TontineChain utilise maintenant **Axios** au lieu de `fetch()` pour toutes les requêtes HTTP.

---

## ✅ Pourquoi Axios ?

### Avantages par rapport à fetch()

1. **Meilleure gestion des erreurs**
   - Axios rejette automatiquement les promesses pour les codes HTTP d'erreur (4xx, 5xx)
   - fetch() nécessite une vérification manuelle de `response.ok`

2. **Intercepteurs puissants**
   - Ajout automatique du token Bearer sur toutes les requêtes
   - Gestion centralisée des erreurs 401 (redirection automatique)
   - Logging automatique de toutes les requêtes/réponses

3. **Transformation automatique des données**
   - Parsing JSON automatique
   - Pas besoin d'appeler `.json()` manuellement

4. **Timeout intégré**
   - Timeout de 30 secondes configuré par défaut
   - Évite les requêtes qui restent bloquées indéfiniment

5. **Meilleure compatibilité**
   - Fonctionne sur tous les navigateurs (même les anciens)
   - Polyfill automatique si nécessaire

---

## 🔧 Implémentation

### Configuration Axios (js/api.js)

```javascript
// Instance axios configurée
const axiosInstance = axios.create({
    baseURL: 'https://tonnine-benin-backend.onrender.com/api/v1',
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// Intercepteur de requête - Ajoute le token automatiquement
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        console.log(`[API] ${config.method.toUpperCase()} ${config.url}`);
        return config;
    }
);

// Intercepteur de réponse - Gère les erreurs et unwrap Laravel data
axiosInstance.interceptors.response.use(
    (response) => {
        console.log(`[API] Response:`, response.status, response.data);
        
        // Laravel data unwrapping automatique
        if (response.data && response.data.data !== undefined) {
            return { ...response, data: response.data.data };
        }
        return response;
    },
    (error) => {
        // Gestion automatique des erreurs 401
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = 'login.html';
        }
        
        const message = error.response?.data?.message 
            || error.response?.data?.error 
            || error.message;
        
        return Promise.reject(new Error(message));
    }
);
```

---

## 📦 CDN Axios

Axios est chargé via CDN dans tous les fichiers HTML qui utilisent l'API:

```html
<!-- Axios CDN -->
<script src="https://cdn.jsdelivr.net/npm/axios@1.6.7/dist/axios.min.js"></script>
<script src="js/api.js"></script>
```

### Fichiers modifiés:
- ✅ `test-api.html`
- ✅ `quick-test.html`
- ✅ `debug-console.html`
- ✅ `dashboard.html`
- ✅ `login.html`
- ✅ `signup.html`
- ✅ `create-tontine.html`
- ✅ `join-tontine.html`

---

## 🎯 Utilisation

### Avant (fetch)

```javascript
const response = await fetch(`${API_BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
});

if (!response.ok) {
    throw new Error('Request failed');
}

const data = await response.json();
```

### Après (axios)

```javascript
// Le token, les headers et le parsing JSON sont automatiques !
const data = await API.user.getProfile();
```

---

## 🔍 Logs Automatiques

Toutes les requêtes sont maintenant loggées automatiquement:

```
[API] GET /users/me
[API] Response: 200 { id: 1, first_name: "John", ... }
```

En cas d'erreur:
```
[API Error]: { status: 401, message: "Unauthenticated" }
```

---

## 🚀 Avantages pour le Développement

1. **Debugging plus facile**
   - Tous les appels API sont visibles dans la console
   - Les erreurs sont plus claires

2. **Code plus propre**
   - Moins de code répétitif
   - Gestion centralisée des erreurs

3. **Maintenance simplifiée**
   - Un seul endroit pour modifier la configuration
   - Intercepteurs réutilisables

4. **Meilleure expérience utilisateur**
   - Redirection automatique si le token expire
   - Messages d'erreur plus clairs

---

## 🧪 Tests

Pour tester la nouvelle implémentation:

1. **Ouvrir le serveur**
   ```bash
   node server.js
   ```

2. **Tester avec Quick Test**
   ```
   http://localhost:8000/quick-test.html
   ```

3. **Tester les endpoints**
   ```
   http://localhost:8000/test-api.html
   ```

4. **Vérifier la console (F12)**
   - Vous devriez voir les logs `[API]` pour chaque requête

---

## 📊 Comparaison

| Fonctionnalité | fetch() | axios |
|----------------|---------|-------|
| Parsing JSON automatique | ❌ | ✅ |
| Gestion erreurs HTTP | ❌ | ✅ |
| Intercepteurs | ❌ | ✅ |
| Timeout | ❌ | ✅ |
| Token automatique | ❌ | ✅ |
| Logs automatiques | ❌ | ✅ |
| Laravel unwrapping | ❌ | ✅ |
| Compatibilité navigateurs | ⚠️ | ✅ |

---

## 🔗 Ressources

- **Documentation Axios**: https://axios-http.com/docs/intro
- **CDN Axios**: https://cdn.jsdelivr.net/npm/axios@1.6.7/dist/axios.min.js
- **GitHub Axios**: https://github.com/axios/axios

---

## ✅ Résultat

L'intégration backend est maintenant **plus robuste**, **plus facile à débugger** et **plus maintenable** grâce à Axios.

**Prochaine étape**: Tester l'authentification OTP et le dashboard avec la nouvelle implémentation !
