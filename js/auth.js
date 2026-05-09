// ================================================
// TONTINECHAIN — SYSTÈME D'AUTHENTIFICATION (OTP + DEMO)
// ================================================

let currentPhone = '';
let signupData = null;

// Helper for storage (handles localStorage vs sessionStorage)
const storage = localStorage;

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
            profession: document.getElementById('profession') ? document.getElementById('profession').value : 'Membre'
        };
    }

    try {
        btn.disabled = true;
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';

        await API.auth.requestOTP(currentPhone);

        // Success: Switch steps
        document.getElementById('phoneForm').style.display = 'none';
        document.getElementById('otpForm').style.display = 'block';
        document.getElementById('displayPhone').textContent = currentPhone;

        showNotification("Code OTP envoyé !", "success");
    } catch (error) {
        console.error("OTP Request failed:", error);
        showNotification(error.message || "Erreur lors de l'envoi de l'OTP", "error");
    } finally {
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-paper-plane"></i> Recevoir le code OTP';
    }
}

async function handleOTPVerify(event) {
    if (event) event.preventDefault();
    const otpInput = document.getElementById('otp');
    if (!otpInput) return;

    const code = otpInput.value.trim();
    const btn = event.target.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;

    try {
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Vérification...';

        let result = await API.auth.verifyOTP(currentPhone, code);

        // Save token
        storage.setItem('authToken', result.token || result.access_token);
        
        // If we have signup data, update profile
        if (signupData) {
            try {
                await API.user.updateProfile(signupData);
            } catch (err) {
                console.error("Erreur lors de la mise à jour du profil :", err);
            }
            storage.setItem('userName', signupData.first_name + ' ' + signupData.last_name);
            storage.setItem('tc_kyc_verified', 'false');
        } else if (result.user) {
            storage.setItem('userName', result.user.first_name + ' ' + result.user.last_name);
            storage.setItem('tc_kyc_verified', result.user.npi ? 'true' : 'false');
        }

        showNotification('Connexion réussie !', 'success');
        
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 800);
    } catch (error) {
        showNotification("Erreur de connexion. Veuillez réessayer.", "error");
    } finally {
        btn.disabled = false;
        btn.innerHTML = originalText;
    }
}

function resetLogin() {
    document.getElementById('phoneForm').style.display = 'block';
    document.getElementById('otpForm').style.display = 'none';
}

function quickDemoLogin() {
    storage.setItem('authToken', 'demo_direct_' + Date.now());
    storage.setItem('userName', 'Visiteur Démo');
    storage.setItem('tc_kyc_verified', 'true');
    showNotification('Accès démo activé', 'success');
    setTimeout(() => { window.location.href = 'dashboard.html'; }, 500);
}

// --- Notification helper ---
function showNotification(message, type = 'info') {
  const existing = document.querySelector('.notification');
  if (existing) existing.remove();

  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.style.cssText = `
    position: fixed; top: 20px; right: 20px; z-index: 9999;
    padding: 15px 25px; border-radius: 12px; background: white;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1); display: flex; align-items: center; gap: 12px;
    transform: translateX(120%); transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  `;
  
  const colors = {
      success: '#00C896',
      error: '#1A6BFF',
      info: '#1A6BFF'
  };
  notification.style.borderLeft = `5px solid ${colors[type] || colors.info}`;

  notification.innerHTML = `
    <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}" style="color: ${colors[type]}"></i>
    <span style="font-family: 'Manrope', sans-serif; font-weight: 600; color: #1E293B;">${message}</span>
  `;

  document.body.appendChild(notification);
  setTimeout(() => notification.style.transform = 'translateX(0)', 10);
  
  setTimeout(() => {
    notification.style.transform = 'translateX(120%)';
    setTimeout(() => notification.remove(), 300);
  }, 4000);
}

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    const phoneForm = document.getElementById('phoneForm');
    const otpForm = document.getElementById('otpForm');
    const signupForm = document.getElementById('signupForm');

    if (phoneForm) phoneForm.addEventListener('submit', handleOTPRequest);
    if (otpForm) otpForm.addEventListener('submit', handleOTPVerify);
    if (signupForm) signupForm.addEventListener('submit', handleOTPRequest);

    // Dynamic name display
    const userNameElement = document.querySelector('.user-name');
    if (userNameElement) {
        userNameElement.textContent = storage.getItem('userName') || 'Utilisateur';
    }
});

// --- Auth Check for Pages ---
function requireAuth(targetUrl, authPage = 'login.html') {
  if (!storage.getItem('authToken')) {
    window.location.href = authPage + '?redirect=' + encodeURIComponent(targetUrl);
  } else {
    window.location.href = targetUrl;
  }
}

