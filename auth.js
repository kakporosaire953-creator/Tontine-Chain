// ================================================
// TONTINECHAIN — SYSTÈME D'AUTHENTIFICATION
// ================================================

// --- Utilitaire de hashage SHA-256 (côté client) ---
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// --- Toggle password visibility ---
function togglePassword(inputId) {
  const input = document.getElementById(inputId);
  const button = input.parentElement.querySelector('.toggle-password');
  const icon = button.querySelector('i');

  if (input.type === 'password') {
    input.type = 'text';
    icon.classList.remove('fa-eye');
    icon.classList.add('fa-eye-slash');
  } else {
    input.type = 'password';
    icon.classList.remove('fa-eye-slash');
    icon.classList.add('fa-eye');
  }
}

// --- Password strength checker ---
const passwordInput = document.getElementById('password');
if (passwordInput) {
  passwordInput.addEventListener('input', function () {
    const password = this.value;
    const strengthFill = document.getElementById('strengthFill');
    const strengthText = document.getElementById('strengthText');
    if (!strengthFill || !strengthText) return;

    let strength = 0;
    let text = '';
    let color = '';

    if (password.length === 0) {
      strength = 0; text = 'Entrez un mot de passe'; color = '#E2E8F0';
    } else if (password.length < 6) {
      strength = 25; text = 'Faible'; color = '#DC2626';
    } else if (password.length < 8) {
      strength = 50; text = 'Moyen'; color = '#F59E0B';
    } else if (password.length < 12) {
      strength = 75; text = 'Bon'; color = '#00A86B';
    } else {
      strength = 100; text = 'Excellent'; color = '#00A86B';
    }

    // Check for complexity
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength += 10;
    if (password.match(/[0-9]/)) strength += 10;
    if (password.match(/[^a-zA-Z0-9]/)) strength += 10;
    strength = Math.min(strength, 100);

    strengthFill.style.width = strength + '%';
    strengthFill.style.background = color;
    strengthText.textContent = text;
    strengthText.style.color = color;
  });
}

// --- Gestion base utilisateurs locale ---
function getUsers() {
  const users = localStorage.getItem('tontine_users');
  return users ? JSON.parse(users) : [];
}

async function saveUser(user) {
  const users = getUsers();
  // Vérifier si l'email existe déjà
  if (users.find(u => u.email === user.email)) {
    return false;
  }
  // Hasher le mot de passe avant stockage
  user.password = await hashPassword(user.password);
  users.push(user);
  localStorage.setItem('tontine_users', JSON.stringify(users));
  return true;
}

// --- Rate Limiter ---
const loginAttempts = {
  count: 0,
  lastAttempt: 0,
  maxAttempts: 5,
  lockoutMs: 60000, // 1 minute

  canAttempt() {
    const now = Date.now();
    // Reset après le lockout
    if (this.count >= this.maxAttempts && (now - this.lastAttempt) > this.lockoutMs) {
      this.count = 0;
    }
    return this.count < this.maxAttempts;
  },

  recordAttempt() {
    this.count++;
    this.lastAttempt = Date.now();
  },

  reset() {
    this.count = 0;
  },

  getRemainingSeconds() {
    const elapsed = Date.now() - this.lastAttempt;
    return Math.ceil((this.lockoutMs - elapsed) / 1000);
  }
};

// --- Validation helpers ---
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
  return /^(\+229\s?)?\d{2}\s?\d{2}\s?\d{2}\s?\d{2}$/.test(phone.replace(/\s/g, '').length >= 8 ? phone : '');
}

// --- Login form ---
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    // Rate limiting check
    if (!loginAttempts.canAttempt()) {
      const remaining = loginAttempts.getRemainingSeconds();
      showNotification(`Trop de tentatives. Réessayez dans ${remaining}s`, 'error');
      return;
    }

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember') ? document.getElementById('remember').checked : false;

    if (!email || !password) {
      showNotification('Veuillez remplir tous les champs', 'error');
      return;
    }

    const submitBtn = loginForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Connexion...';
    submitBtn.disabled = true;

    // Hasher le mot de passe pour comparaison
    const hashedPassword = await hashPassword(password);
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === hashedPassword);

    if (user) {
      loginAttempts.reset();

      // Stocker les infos utilisateur (PAS le token encore — on attend l'OTP)
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem('userId', user.email);
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
            setTimeout(() => {
              window.location.href = 'dashboard.html';
            }, 300);
          });
        } else {
          // Fallback si security-layers.js n'est pas chargé
          storage.setItem('authToken', 'token_' + Date.now() + '_' + Math.random().toString(36).slice(2));
          window.location.href = 'dashboard.html';
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

      setTimeout(() => {
        window.location.href = 'dashboard.html';
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

// --- Auth check (redirection si déjà connecté) ---
function checkAuth() {
  const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
  const isAuthPage = window.location.pathname.includes('login.html') || window.location.pathname.includes('signup.html');

  if (token && isAuthPage) {
    window.location.href = 'dashboard.html';
  }
}
checkAuth();

// --- Require auth pour les pages protégées ---
function requireAuth(targetUrl) {
  if (!localStorage.getItem('authToken') && !sessionStorage.getItem('authToken')) {
    window.location.href = 'login.html';
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
