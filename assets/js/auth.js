// ============================================
// TontineChain - Authentification
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // Password Toggle
    const passwordToggles = document.querySelectorAll('.password-toggle');
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.replace('fa-eye', 'fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.replace('fa-eye-slash', 'fa-eye');
            }
        });
    });
    
    // Password Strength Checker
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            const strengthFill = document.querySelector('.strength-fill');
            const strengthText = document.querySelector('.strength-text');
            
            if (!strengthFill || !strengthText) return;
            
            const strength = calculatePasswordStrength(password);
            
            strengthFill.className = 'strength-fill';
            
            if (strength < 40) {
                strengthFill.classList.add('weak');
                strengthText.textContent = 'Faible';
                strengthText.style.color = '#E63946';
            } else if (strength < 70) {
                strengthFill.classList.add('medium');
                strengthText.textContent = 'Moyen';
                strengthText.style.color = '#F59E0B';
            } else {
                strengthFill.classList.add('strong');
                strengthText.textContent = 'Fort';
                strengthText.style.color = '#10B981';
            }
        });
    }
    
    function calculatePasswordStrength(password) {
        let strength = 0;
        
        if (password.length >= 8) strength += 25;
        if (password.length >= 12) strength += 15;
        if (/[a-z]/.test(password)) strength += 15;
        if (/[A-Z]/.test(password)) strength += 15;
        if (/[0-9]/.test(password)) strength += 15;
        if (/[^a-zA-Z0-9]/.test(password)) strength += 15;
        
        return strength;
    }
    
    // Form Validation - Inscription
    const inscriptionForm = document.getElementById('inscriptionForm');
    if (inscriptionForm) {
        inscriptionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nom = document.getElementById('nom').value.trim();
            const email = document.getElementById('email').value.trim();
            const telephone = document.getElementById('telephone').value.trim();
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const terms = document.getElementById('terms').checked;
            
            let isValid = true;
            
            // Reset errors
            document.querySelectorAll('.form-error').forEach(error => error.textContent = '');
            document.querySelectorAll('input').forEach(input => input.classList.remove('error'));
            
            // Validate nom
            if (nom.length < 3) {
                showError('nom', 'Le nom doit contenir au moins 3 caractères');
                isValid = false;
            }
            
            // Validate email
            if (!isValidEmail(email)) {
                showError('email', 'Email invalide');
                isValid = false;
            }
            
            // Validate telephone
            if (!isValidPhone(telephone)) {
                showError('telephone', 'Numéro de téléphone invalide');
                isValid = false;
            }
            
            // Validate password
            if (password.length < 8) {
                showError('password', 'Le mot de passe doit contenir au moins 8 caractères');
                isValid = false;
            }
            
            // Validate confirm password
            if (password !== confirmPassword) {
                showError('confirmPassword', 'Les mots de passe ne correspondent pas');
                isValid = false;
            }
            
            // Validate terms
            if (!terms) {
                showNotification('Vous devez accepter les conditions d\'utilisation', 'error');
                isValid = false;
            }
            
            if (isValid) {
                // Simulate API call
                showNotification('Inscription réussie ! Redirection...', 'success');
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 2000);
            }
        });
    }
    
    // Form Validation - Connexion
    const connexionForm = document.getElementById('connexionForm');
    if (connexionForm) {
        connexionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const identifier = document.getElementById('identifier').value.trim();
            const password = document.getElementById('password').value;
            
            let isValid = true;
            
            // Reset errors
            document.querySelectorAll('.form-error').forEach(error => error.textContent = '');
            document.querySelectorAll('input').forEach(input => input.classList.remove('error'));
            
            // Validate identifier
            if (!identifier) {
                showError('identifier', 'Email ou téléphone requis');
                isValid = false;
            }
            
            // Validate password
            if (!password) {
                showError('password', 'Mot de passe requis');
                isValid = false;
            }
            
            if (isValid) {
                // Simulate API call
                showNotification('Connexion réussie ! Redirection...', 'success');
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 2000);
            }
        });
    }
    
    // Wallet Connect
    const walletConnectBtn = document.getElementById('walletConnect');
    if (walletConnectBtn) {
        walletConnectBtn.addEventListener('click', async function() {
            if (typeof window.ethereum !== 'undefined') {
                try {
                    const accounts = await window.ethereum.request({ 
                        method: 'eth_requestAccounts' 
                    });
                    
                    showNotification('Wallet connecté : ' + accounts[0].substring(0, 10) + '...', 'success');
                    
                    setTimeout(() => {
                        window.location.href = 'dashboard.html';
                    }, 2000);
                } catch (error) {
                    showNotification('Erreur de connexion au wallet', 'error');
                }
            } else {
                showNotification('MetaMask n\'est pas installé. Veuillez l\'installer pour continuer.', 'error');
                setTimeout(() => {
                    window.open('https://metamask.io/download/', '_blank');
                }, 2000);
            }
        });
    }
    
    // Helper Functions
    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const errorSpan = field.parentElement.querySelector('.form-error') || 
                         field.closest('.form-group').querySelector('.form-error');
        
        if (field) field.classList.add('error');
        if (errorSpan) errorSpan.textContent = message;
    }
    
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function isValidPhone(phone) {
        const re = /^(\+229)?[0-9\s]{8,}$/;
        return re.test(phone);
    }
    
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 4000);
    }
    
    // Add notification styles if not already present
    if (!document.getElementById('notification-styles')) {
        const notificationStyles = document.createElement('style');
        notificationStyles.id = 'notification-styles';
        notificationStyles.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                background: white;
                padding: 1rem 1.5rem;
                border-radius: 0.75rem;
                box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
                display: flex;
                align-items: center;
                gap: 0.75rem;
                z-index: 10000;
                transform: translateX(400px);
                transition: transform 0.3s ease;
                min-width: 300px;
            }
            
            .notification.show {
                transform: translateX(0);
            }
            
            .notification-success {
                border-left: 4px solid #10B981;
            }
            
            .notification-success i {
                color: #10B981;
            }
            
            .notification-error {
                border-left: 4px solid #E63946;
            }
            
            .notification-error i {
                color: #E63946;
            }
            
            .notification i {
                font-size: 1.25rem;
            }
            
            .notification span {
                font-weight: 500;
                color: #374151;
            }
        `;
        document.head.appendChild(notificationStyles);
    }
    
    console.log('🔐 Auth system initialized');
});
