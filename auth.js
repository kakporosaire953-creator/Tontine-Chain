// ================================================
// TONTINECHAIN — SYSTÈME D'AUTHENTIFICATION (OTP + API)
// ================================================

// --- Gestion des étapes OTP ---
let currentPhone = '';
let signupData = null;

async function handleOTPRequest(event) {
    if (event) event.preventDefault();
    const phoneInput = document.getElementById('phone');
    if (!phoneInput) return;

    currentPhone = phoneInput.value.trim();
    const btn = document.getElementById('sendOTPBtn');

    // If signup, collect extra info
    if (event.target.id === 'signupForm') {
        signupData = {
            first_name: document.getElementById('firstName').value,
            last_name: document.getElementById('lastName').value,
            npi: document.getElementById('npi').value,
            profession: document.getElementById('profession') ? document.getElementById('profession').value : 'Membre'
        };
    }

    try {
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';

        await API.auth.requestOTP(currentPhone);

        // Success: Switch steps
        const phoneForm = document.getElementById('phoneForm') || document.getElementById('signupForm');
        phoneForm.style.display = 'none';
        document.getElementById('otpForm').style.display = 'block';
        document.getElementById('displayPhone').textContent = currentPhone;

        alert("Code OTP envoyé avec succès !");
    } catch (error) {
        alert("Erreur: " + error.message);
    } finally {
        btn.disabled = false;
        btn.innerHTML = btn.id === 'sendOTPBtn' ? '<i class="fas fa-paper-plane"></i> Recevoir le code OTP' : '<i class="fas fa-user-plus"></i> Créer mon compte';
    }
}

async function handleOTPVerify(event) {
    if (event) event.preventDefault();
    const otpInput = document.getElementById('otp');
    if (!otpInput) return;

    const code = otpInput.value.trim();
    const btn = event.target.querySelector('button[type="submit"]');

    try {
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Vérification...';

        const result = await API.auth.verifyOTP(currentPhone, code);

        // Success: Save token
        localStorage.setItem('authToken', result.token);
        
        // If we have signup data, update profile immediately
        if (signupData) {
            await API.user.updateProfile(signupData);
        }

        // Fetch final profile
        const user = await API.user.getProfile();
        localStorage.setItem('user', JSON.stringify(user));
        
        if (user.npi) {
            localStorage.setItem('tc_kyc_verified', 'true');
        }

        window.location.href = 'dashboard.html';
    } catch (error) {
        alert("Code invalide ou expiré. Veuillez réessayer.");
    } finally {
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-check-circle"></i> Vérifier & Se connecter';
    }
}

function resetLogin() {
    document.getElementById('phoneForm').style.display = 'block';
    document.getElementById('otpForm').style.display = 'none';
}

// --- Initialisation des formulaires ---
document.addEventListener('DOMContentLoaded', () => {
    const phoneForm = document.getElementById('phoneForm');
    const otpForm = document.getElementById('otpForm');

    if (phoneForm) phoneForm.addEventListener('submit', handleOTPRequest);
    if (otpForm) otpForm.addEventListener('submit', handleOTPVerify);
});

// --- Autres fonctions utilitaires ---
function togglePassword(inputId) {
  const input = document.getElementById(inputId);
      storage.setItem('userName', user.firstName + ' ' + user.lastName);

      showNotification('Identifiants vérifiés ! Vérification OTP...', 'success');

      // Attendre un court instant puis afficher l'OTP
      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;

        // Vérifier que TC.otp existe (security-layers.js chargé)
        if (typeof TC !== 'undefined' && TC.otp) {
          TC.otp.show(() => {
            // OTP validé => créer le token et rediriger
            storage.setItem('authToken', 'token_' + Date.now() + '_' + Math.random().toString(36).slice(2));
            showNotification('Connexion réussie !', 'success');
            const params = new URLSearchParams(window.location.search);
            const redirectUrl = params.get('redirect') || 'dashboard.html';
            setTimeout(() => {
              window.location.href = redirectUrl;
            }, 300);
          });
        } else {
          // Fallback si security-layers.js n'est pas chargé
          storage.setItem('authToken', 'token_' + Date.now() + '_' + Math.random().toString(36).slice(2));
          const params = new URLSearchParams(window.location.search);
          const redirectUrl = params.get('redirect') || 'dashboard.html';
          window.location.href = redirectUrl;
        }
      }, 500);
    } else {
      loginAttempts.recordAttempt();
      const remaining = loginAttempts.maxAttempts - loginAttempts.count;
      if (remaining > 0) {
        showNotification(`Email ou mot de passe incorrect. ${remaining} tentative(s) restante(s).`, 'error');
      } else {
        showNotification('Compte temporairement bloqué. Réessayez dans 1 minute.', 'error');
      }
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  });
}

// --- Signup form ---
const signupForm = document.getElementById('signupForm');
if (signupForm) {
  signupForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const terms = document.getElementById('terms').checked;

    // Validation complète
    if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
      showNotification('Veuillez remplir tous les champs obligatoires', 'error');
      return;
    }

    if (!isValidEmail(email)) {
      showNotification('Adresse email invalide', 'error');
      return;
    }

    if (phone.replace(/\D/g, '').length < 8) {
      showNotification('Numéro de téléphone invalide (min 8 chiffres)', 'error');
      return;
    }

    if (password !== confirmPassword) {
      showNotification('Les mots de passe ne correspondent pas', 'error');
      return;
    }

    if (password.length < 8) {
      showNotification('Le mot de passe doit contenir au moins 8 caractères', 'error');
      return;
    }

    if (!terms) {
      showNotification("Veuillez accepter les conditions d'utilisation", 'error');
      return;
    }

    const submitBtn = signupForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Création du compte...';
    submitBtn.disabled = true;

    const user = { firstName, lastName, email, phone, password };

    const saved = await saveUser(user);
    if (saved) {
      showNotification('Compte créé avec succès !', 'success');

      // Auto-login après inscription
      localStorage.setItem('userId', user.email);
      localStorage.setItem('userName', user.firstName + ' ' + user.lastName);
      localStorage.setItem('authToken', 'token_' + Date.now() + '_' + Math.random().toString(36).slice(2));

      const params = new URLSearchParams(window.location.search);
      const redirectUrl = params.get('redirect') || 'dashboard.html';

      setTimeout(() => {
        window.location.href = redirectUrl;
      }, 800);
    } else {
      showNotification('Cet email est déjà utilisé.', 'error');
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  });
}

// --- Connect wallet (Simulé pour la démo) ---
async function connectWallet() {
  // Vérifier si MetaMask est disponible
  if (typeof window.ethereum !== 'undefined') {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const walletAddress = accounts[0];
      localStorage.setItem('authToken', 'wallet_' + Date.now() + '_' + Math.random().toString(36).slice(2));
      localStorage.setItem('walletAddress', walletAddress);
      localStorage.setItem('userName', 'Wallet ' + walletAddress.slice(0, 6) + '...' + walletAddress.slice(-4));
      showNotification('Wallet connecté avec succès !', 'success');
      setTimeout(() => { window.location.href = 'dashboard.html'; }, 500);
    } catch (error) {
      showNotification('Connexion au wallet refusée', 'error');
    }
  } else {
    // Mode démo si pas de MetaMask
    const walletAddress = '0x' + [...Array(40)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
    localStorage.setItem('authToken', 'wallet_demo_' + Date.now());
    localStorage.setItem('walletAddress', walletAddress);
    localStorage.setItem('userName', 'Wallet ' + walletAddress.slice(0, 6) + '...' + walletAddress.slice(-4));
    showNotification('Wallet connecté (mode démo)', 'success');
    setTimeout(() => { window.location.href = 'dashboard.html'; }, 500);
  }
}

// --- Notification helper ---
function showNotification(message, type = 'info') {
  // Supprimer les notifications existantes
  document.querySelectorAll('.notification').forEach(n => n.remove());

  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
    <span>${message}</span>
  `;

  document.body.appendChild(notification);
  setTimeout(() => notification.classList.add('show'), 10);
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 200);
  }, 3000);
}

// --- Affichage dynamique du nom ---
document.addEventListener('DOMContentLoaded', () => {
  const userNameElement = document.querySelector('.user-name');
  if (userNameElement) {
    const userName = localStorage.getItem('userName') || sessionStorage.getItem('userName') || 'Utilisateur';
    userNameElement.textContent = userName;
  }
});

// --- Require auth pour les pages protégées ---
function requireAuth(targetUrl, authPage = 'login.html') {
  if (!localStorage.getItem('authToken') && !sessionStorage.getItem('authToken')) {
    window.location.href = authPage + '?redirect=' + encodeURIComponent(targetUrl);
  } else {
    window.location.href = targetUrl;
  }
}

// --- Mot de passe oublié (modal démo) ---
function showForgotPassword() {
  const modal = document.createElement('div');
  modal.className = 'tc-modal-overlay';
  modal.id = 'forgotModal';
  modal.innerHTML = `
    <div style="
      background: #fff;
      border-radius: 20px;
      padding: 40px;
      max-width: 420px;
      width: 90%;
      text-align: center;
      box-shadow: 0 25px 60px rgba(0,0,0,0.15);
      font-family: 'Manrope', sans-serif;
    ">
      <div style="
        width: 64px; height: 64px;
        border-radius: 16px;
        background: linear-gradient(135deg, #EFF6FF, #DBEAFE);
        display: flex; align-items: center; justify-content: center;
        margin: 0 auto 20px;
        font-size: 24px; color: #3B82F6;
      "><i class="fas fa-envelope"></i></div>
      <h3 style="font-family: 'Space Grotesk', sans-serif; font-size: 22px; margin-bottom: 8px;">Réinitialiser le mot de passe</h3>
      <p style="color: #64748B; font-size: 14px; margin-bottom: 24px;">Entrez votre email pour recevoir un lien de réinitialisation</p>
      <div class="form-group" style="text-align: left; margin-bottom: 16px;">
        <div class="input-with-icon">
          <i class="fas fa-envelope"></i>
          <input type="email" id="forgotEmail" class="form-input" placeholder="exemple@email.com" required>
        </div>
      </div>
      <button class="btn btn-primary btn-block" onclick="sendResetEmail()" style="margin-bottom: 12px;">
        <i class="fas fa-paper-plane"></i> Envoyer le lien
      </button>
      <button style="
        background: none; border: none; color: #64748B;
        cursor: pointer; font-size: 14px; font-family: 'Manrope', sans-serif;
      " onclick="document.getElementById('forgotModal').remove()">Annuler</button>
    </div>
  `;
  document.body.appendChild(modal);
}

function sendResetEmail() {
  const email = document.getElementById('forgotEmail').value.trim();
  if (!email || !isValidEmail(email)) {
    showNotification('Veuillez entrer une adresse email valide', 'error');
    return;
  }
  document.getElementById('forgotModal').remove();
  showNotification(`Lien de réinitialisation envoyé à ${email} (démo)`, 'success');
}

// Bind events on load
document.addEventListener('DOMContentLoaded', () => {
  const phoneForm = document.getElementById('phoneForm');
  const signupForm = document.getElementById('signupForm');
  const otpForm = document.getElementById('otpForm');

  if (phoneForm) phoneForm.addEventListener('submit', handleOTPRequest);
  if (signupForm) signupForm.addEventListener('submit', handleOTPRequest);
  if (otpForm) otpForm.addEventListener('submit', handleOTPVerify);
});
