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

// Login form submission
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;
    
    if (!email || !password) {
      showNotification('Veuillez remplir tous les champs', 'error');
      return;
    }
    
    // Show loading
    const submitBtn = loginForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Connexion...';
    submitBtn.disabled = true;
    
    try {
      // Call API service
      const result = await apiService.login(email, password, remember);
      
      if (result.success) {
        // Store auth token
        const storage = remember ? localStorage : sessionStorage;
        storage.setItem('authToken', result.data.token);
        storage.setItem('userId', result.data.user.id);
        storage.setItem('userName', result.data.user.name);
        
        showNotification('Connexion réussie !', 'success');
        
        // Redirect after short delay
        setTimeout(() => {
          window.location.href = 'dashboard.html';
        }, 500);
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Login error:', error);
      showNotification(error.message || 'Erreur de connexion. Vérifiez vos identifiants.', 'error');
      
      // Reset button
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  });
}

// Signup form submission
const signupForm = document.getElementById('signupForm');
if (signupForm) {
  signupForm.addEventListener('submit', async function(e) {
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
    
    // Show loading
    const submitBtn = signupForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Création du compte...';
    submitBtn.disabled = true;
    
    try {
      // Call API service
      const result = await apiService.register({
        firstName,
        lastName,
        email,
        phone,
        password
      });
      
      if (result.success) {
        showNotification('Compte créé avec succès ! Vérifiez votre email pour confirmer votre inscription.', 'success');
        
        // Redirect after short delay
        setTimeout(() => {
          window.location.href = 'login.html';
        }, 1500);
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Signup error:', error);
      showNotification(error.message || 'Erreur lors de la création du compte.', 'error');
      
      // Reset button
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  });
}

// Connect wallet
async function connectWallet() {
  try {
    // Check if MetaMask is installed
    if (typeof window.ethereum === 'undefined') {
      showNotification('Veuillez installer MetaMask pour connecter votre wallet', 'error');
      return;
    }
    
    // Request account access
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const walletAddress = accounts[0];
    
    // Get signature for authentication
    const message = `TontineChain - Connexion sécurisée\nAdresse: ${walletAddress}\nDate: ${new Date().toISOString()}`;
    const signature = await window.ethereum.request({
      method: 'personal_sign',
      params: [message, walletAddress]
    });
    
    // Call API to authenticate with wallet
    const result = await apiService.connectWallet(walletAddress, signature);
    
    if (result.success) {
      localStorage.setItem('authToken', result.data.token);
      localStorage.setItem('walletAddress', walletAddress);
      showNotification('Wallet connecté avec succès !', 'success');
      
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 500);
    } else {
      throw new Error(result.error);
    }
  } catch (error) {
    console.error('Wallet connection error:', error);
    showNotification(error.message || 'Erreur lors de la connexion du wallet', 'error');
  }
}

// Notification helper function
function showNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
    <span>${message}</span>
  `;
  
  // Add to body
  document.body.appendChild(notification);
  
  // Show notification
  setTimeout(() => notification.classList.add('show'), 100);
  
  // Remove after 4 seconds
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 4000);
}

// Check if user is already logged in
function checkAuth() {
  const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
  
  if (token && (window.location.pathname.includes('login.html') || window.location.pathname.includes('signup.html'))) {
    window.location.href = 'dashboard.html';
  }
}

// Run auth check on page load
checkAuth();
