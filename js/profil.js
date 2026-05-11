// Profile Page - TontineChain
let currentUser = null;

async function loadProfileData() {
  console.log('[Profile] Loading user profile...');
  
  try {
    const user = await API.user.getProfile();
    console.log('[Profile] User data:', user);
    currentUser = user;
    
    // Update profile display
    updateProfileDisplay(user);
    
    // Load balance for stats
    const balance = await API.user.getBalance();
    updateProfileStats(balance);
    
  } catch (error) {
    console.error('[Profile] Load error:', error);
    showNotification('Erreur lors du chargement du profil', 'error');
  }
}

function updateProfileDisplay(user) {
  // Update name
  const nameElements = document.querySelectorAll('h2');
  nameElements.forEach(el => {
    if (el.textContent.includes('Rosaire') || el.closest('.profil-info-section')) {
      el.textContent = `${user.first_name || ''} ${user.last_name || ''}`.trim() || 'Utilisateur';
    }
  });
  
  // Update email
  const emailElements = document.querySelectorAll('.profil-info-section p');
  if (emailElements.length > 0) {
    emailElements[0].textContent = user.email || user.phone || 'Non renseigné';
  }
  
  // Update form fields
  const firstNameInput = document.querySelector('input[value="Rosaire"]');
  if (firstNameInput) firstNameInput.value = user.first_name || '';
  
  const lastNameInput = document.querySelector('input[value="Miabe"]');
  if (lastNameInput) lastNameInput.value = user.last_name || '';
  
  const emailInput = document.querySelector('input[type="email"]');
  if (emailInput) emailInput.value = user.email || '';
  
  const phoneInput = document.querySelector('input[type="tel"]');
  if (phoneInput) phoneInput.value = user.phone || '';
  
  // Update wallet address if available
  const walletValue = document.querySelector('.wallet-value');
  if (walletValue && user.wallet_address) {
    walletValue.innerHTML = `
      ${user.wallet_address}
      <button class="icon-btn" onclick="copyToClipboard('${user.wallet_address}')" title="Copier">
        <i class="fas fa-copy"></i>
      </button>
    `;
  }
}

function updateProfileStats(balance) {
  const statValues = document.querySelectorAll('.profil-stat-value');
  if (statValues.length >= 3) {
    statValues[0].textContent = balance.active_groups || 0;
    statValues[1].textContent = (balance.payment_rate || 100) + '%';
    
    // Calculate member since (mock for now)
    const memberSince = localStorage.getItem('memberSince') || new Date().toISOString();
    const months = Math.floor((Date.now() - new Date(memberSince).getTime()) / (1000 * 60 * 60 * 24 * 30));
    statValues[2].textContent = months > 0 ? months + ' mois' : 'Nouveau';
  }
}

async function updateProfile(event) {
  event.preventDefault();
  
  const form = event.target;
  const formData = new FormData(form);
  
  const data = {
    first_name: form.querySelector('input[type="text"]').value,
    last_name: form.querySelectorAll('input[type="text"]')[1].value,
    email: form.querySelector('input[type="email"]').value,
    phone: form.querySelector('input[type="tel"]').value,
  };
  
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enregistrement...';
  
  try {
    await API.user.updateProfile(data);
    console.log('[Profile] Profile updated');
    
    showNotification('Profil mis à jour avec succès !', 'success');
    
    // Reload profile data
    setTimeout(() => loadProfileData(), 1000);
    
  } catch (error) {
    console.error('[Profile] Update error:', error);
    showNotification(error.message || 'Erreur lors de la mise à jour', 'error');
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalText;
  }
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showNotification('Adresse copiée !', 'success');
  }).catch(err => {
    console.error('Copy failed:', err);
    showNotification('Erreur lors de la copie', 'error');
  });
}

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
    error: '#EF4444',
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

// Profile tabs (already in HTML, just ensure it works)
document.addEventListener('DOMContentLoaded', () => {
  loadProfileData();
  
  // Attach form submit handlers
  const profileForms = document.querySelectorAll('.profil-form');
  profileForms.forEach((form, index) => {
    if (index === 0) { // Only first form (personal info)
      form.addEventListener('submit', updateProfile);
    }
  });
  
  // Profile menu tabs
  const profileMenuItems = document.querySelectorAll('.profil-menu-item');
  const profileTabs = document.querySelectorAll('.profil-tab');

  profileMenuItems.forEach(item => {
    item.addEventListener('click', () => {
      const tabId = item.getAttribute('data-tab');
      
      profileMenuItems.forEach(i => i.classList.remove('active'));
      profileTabs.forEach(t => t.classList.remove('active'));
      
      item.classList.add('active');
      document.getElementById(tabId).classList.add('active');
    });
  });
});
