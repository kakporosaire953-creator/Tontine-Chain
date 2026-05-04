// Toggle password visibility
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

// Password strength checker
const passwordInput = document.getElementById('password');
if (passwordInput) {
  passwordInput.addEventListener('input', function() {
    const password = this.value;
    const strengthFill = document.getElementById('strengthFill');
    const strengthText = document.getElementById('strengthText');
    
    let strength = 0;
    let text = '';
    let color = '';
    
    if (password.length === 0) {
      strength = 0;
      text = 'Entrez un mot de passe';
      color = '#E2E8F0';
    } else if (password.length < 6) {
      strength = 25;
      text = 'Faible';
      color = '#DC2626';
    } else if (password.length < 8) {
      strength = 50;
      text = 'Moyen';
      color = '#F59E0B';
    } else if (password.length < 12) {
      strength = 75;
      text = 'Bon';
      color = '#00A86B';
    } else {
      strength = 100;
      text = 'Excellent';
      color = '#00A86B';
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

// Helper pour gérer la base d'utilisateurs locale
function getUsers() {
  const users = localStorage.getItem('tontine_users');
  return users ? JSON.parse(users) : [];
}

function saveUser(user) {
  const users = getUsers();
  // VÃ©rifier si l'email existe dÃ©jÃ 
  if (users.find(u => u.email === user.email)) {
    return false;
  }
  users.push(user);
  localStorage.setItem('tontine_users', JSON.stringify(users));
  return true;
}

// Login form submission
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
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
    
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      // Stocker le token localement
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem('authToken', 'simulated_token_' + Date.now());
      storage.setItem('userId', user.email);
      storage.setItem('userName', user.firstName + ' ' + user.lastName);
      
      showNotification('Connexion réussie !', 'success');
      
      // Ultra fast redirect
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 100);
    } else {
      showNotification('Email ou mot de passe incorrect.', 'error');
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  });
}

// Signup form submission
const signupForm = document.getElementById('signupForm');
if (signupForm) {
  signupForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const terms = document.getElementById('terms').checked;
    
    // Validation
    if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
      showNotification('Veuillez remplir tous les champs obligatoires', 'error');
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
      showNotification('Veuillez accepter les conditions d\'utilisation', 'error');
      return;
    }
    
    const submitBtn = signupForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Création...';
    submitBtn.disabled = true;
    
    const user = { firstName, lastName, email, phone, password };
    
    if (saveUser(user)) {
      showNotification('Compte créé avec succès ! Redirection...', 'success');
      
      // Auto-login après inscription (ultra rapide)
      localStorage.setItem('authToken', 'simulated_token_' + Date.now());
      localStorage.setItem('userId', user.email);
      localStorage.setItem('userName', user.firstName + ' ' + user.lastName);
      
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 300);
    } else {
      showNotification('Cet email est déjà utilisé.', 'error');
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  });
}

// Connect wallet (Simulé)
async function connectWallet() {
  try {
    const walletAddress = '0x' + Math.random().toString(16).slice(2, 42);
    localStorage.setItem('authToken', 'simulated_wallet_token_' + Date.now());
    localStorage.setItem('walletAddress', walletAddress);
    localStorage.setItem('userName', 'Utilisateur Wallet');
    showNotification('Wallet connecté avec succès !', 'success');
    
    setTimeout(() => {
      window.location.href = 'dashboard.html';
    }, 100);
  } catch (error) {
    showNotification('Erreur lors de la connexion du wallet', 'error');
  }
}

// Notification helper function
function showNotification(message, type = 'info') {
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
  }, 2500);
}

// Affichage dynamiquement du nom sur le dashboard et les autres pages
document.addEventListener('DOMContentLoaded', () => {
    const userNameElement = document.querySelector('.user-name');
    if (userNameElement) {
        const userName = localStorage.getItem('userName') || 'Utilisateur';
        userNameElement.textContent = userName;
    }
});

// Check if user is already logged in
function checkAuth() {
  const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
  
  if (token && (window.location.pathname.includes('login.html') || window.location.pathname.includes('signup.html'))) {
    window.location.href = 'dashboard.html';
  }
}

// Run auth check on page load
checkAuth();
