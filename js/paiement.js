// Payment Page - TontineChain
let selectedGroup = null;
let pendingContributions = [];

async function loadPaymentData() {
  console.log('[Payment] Loading payment data...');
  
  try {
    // Load user's groups
    const groups = await API.groups.list();
    console.log('[Payment] Groups:', groups);
    
    // Load pending contributions
    const pending = await API.contributions.getPending();
    console.log('[Payment] Pending contributions:', pending);
    pendingContributions = pending || [];
    
    // Populate tontine select
    populateTontineSelect(groups);
    
    // Load payment history
    await loadPaymentHistory();
    
    // Update stats
    updatePaymentStats();
  } catch (error) {
    console.error('[Payment] Load error:', error);
    showNotification('Erreur lors du chargement des données', 'error');
  }
}

function populateTontineSelect(groups) {
  const select = document.getElementById('tontineSelect');
  if (!select) return;
  
  if (!groups || groups.length === 0) {
    select.innerHTML = '<option>Aucune tontine disponible</option>';
    return;
  }
  
  select.innerHTML = groups
    .filter(g => g.status === 'active')
    .map(g => `
      <option value="${g.id}" data-amount="${g.contribution_amount}">
        ${g.name} - ${g.contribution_amount.toLocaleString()} FCFA
      </option>
    `).join('');
  
  // Set first group as selected
  if (groups.length > 0) {
    selectedGroup = groups[0];
    updatePaymentAmount(groups[0].contribution_amount);
  }
  
  // Listen for changes
  select.addEventListener('change', (e) => {
    const option = e.target.selectedOptions[0];
    const amount = parseInt(option.getAttribute('data-amount'));
    updatePaymentAmount(amount);
    selectedGroup = groups.find(g => g.id === e.target.value);
  });
}

function updatePaymentAmount(amount) {
  const amountDisplay = document.querySelector('.amount-value');
  const payButton = document.querySelector('.btn-large');
  
  if (amountDisplay) {
    amountDisplay.textContent = amount.toLocaleString() + ' FCFA';
  }
  
  if (payButton) {
    payButton.innerHTML = `<i class="fas fa-lock"></i> Payer ${amount.toLocaleString()} FCFA`;
  }
}

async function loadPaymentHistory() {
  const historyContainer = document.querySelector('.payment-history-list');
  if (!historyContainer) return;
  
  try {
    const payouts = await API.user.getPayouts();
    console.log('[Payment] Payouts:', payouts);
    
    if (!payouts || payouts.length === 0) {
      historyContainer.innerHTML = '<p style="text-align:center;padding:40px;color:#64748B;">Aucun historique de paiement</p>';
      return;
    }
    
    historyContainer.innerHTML = payouts.map(p => {
      const isCredit = p.type === 'payout' || p.amount > 0;
      const iconClass = isCredit ? 'payment-icon-received' : 'payment-icon-success';
      const icon = isCredit ? 'fa-arrow-down' : 'fa-check';
      const amountClass = isCredit ? 'payment-amount-credit' : 'payment-amount-debit';
      const amountSign = isCredit ? '+' : '-';
      
      return `
        <div class="payment-history-item">
          <div class="payment-history-icon ${iconClass}">
            <i class="fas ${icon}"></i>
          </div>
          <div class="payment-history-info">
            <div class="payment-history-title">${p.group_name || 'Paiement'}</div>
            <div class="payment-history-date">${new Date(p.created_at).toLocaleDateString('fr-FR')} • ${new Date(p.created_at).toLocaleTimeString('fr-FR', {hour: '2-digit', minute: '2-digit'})}</div>
          </div>
          <div class="payment-history-amount ${amountClass}">
            ${amountSign}${Math.abs(p.amount).toLocaleString()} FCFA
          </div>
        </div>
      `;
    }).join('');
  } catch (error) {
    console.error('[Payment] History error:', error);
    historyContainer.innerHTML = '<p style="text-align:center;padding:40px;color:#EF4444;">Erreur de chargement</p>';
  }
}

async function updatePaymentStats() {
  try {
    const balance = await API.user.getBalance();
    console.log('[Payment] Balance:', balance);
    
    const stats = document.querySelectorAll('.payment-stat-value');
    if (stats.length >= 3) {
      stats[0].textContent = (balance.total_paid_this_month || 0).toLocaleString() + ' FCFA';
      stats[1].textContent = (balance.total_received || 0).toLocaleString() + ' FCFA';
      stats[2].textContent = (balance.payment_rate || 100) + '%';
    }
  } catch (error) {
    console.error('[Payment] Stats error:', error);
  }
}

async function processPayment() {
  if (!selectedGroup) {
    showNotification('Veuillez sélectionner une tontine', 'error');
    return;
  }
  
  const phoneInput = document.querySelector('input[type="tel"]');
  const phone = phoneInput ? phoneInput.value.trim() : '';
  
  if (!phone) {
    showNotification('Veuillez entrer votre numéro de téléphone', 'error');
    return;
  }
  
  const payButton = document.querySelector('.btn-large');
  const originalText = payButton.innerHTML;
  payButton.disabled = true;
  payButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Traitement en cours...';
  
  try {
    // Find pending contribution for this group
    const contribution = pendingContributions.find(c => c.group_id === selectedGroup.id);
    
    if (!contribution) {
      showNotification('Aucune contribution en attente pour cette tontine', 'info');
      payButton.disabled = false;
      payButton.innerHTML = originalText;
      return;
    }
    
    // Process payment via API
    const result = await API.contributions.pay(contribution.id);
    console.log('[Payment] Payment result:', result);
    
    showNotification('Paiement effectué avec succès !', 'success');
    
    // Show blockchain confirmation if available
    if (result.tx_hash) {
      setTimeout(() => {
        showNotification('Transaction blockchain: ' + result.tx_hash.substring(0, 10) + '...', 'success');
      }, 1000);
    }
    
    // Reload data
    setTimeout(() => {
      loadPaymentData();
    }, 2000);
    
  } catch (error) {
    console.error('[Payment] Payment error:', error);
    showNotification(error.message || 'Erreur lors du paiement', 'error');
  } finally {
    payButton.disabled = false;
    payButton.innerHTML = originalText;
  }
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

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  loadPaymentData();
  
  // Attach payment button handler
  const payButton = document.querySelector('.btn-large');
  if (payButton) {
    payButton.addEventListener('click', processPayment);
  }
});
