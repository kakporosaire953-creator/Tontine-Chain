// Filter tontines by category
const filterButtons = document.querySelectorAll('.filter-btn');
let allTontines = [];
let filteredTontines = [];

// Load tontines from API
async function loadTontines() {
  try {
    const result = await Promise.resolve({success: true, data: []}).then({ status: 'active', available: true });
    
    if (result.success) {
      allTontines = result.data.tontines || [];
      filteredTontines = allTontines;
      renderTontines(filteredTontines);
    } else {
      showNotification('Erreur lors du chargement des tontines', 'error');
    }
  } catch (error) {
    console.error('Load tontines error:', error);
    showNotification('Erreur de connexion', 'error');
  }
}

// Render tontines list
function renderTontines(tontines) {
  const container = document.getElementById('tontinesContainer');
  if (!container) return;
  
  if (tontines.length === 0) {
    container.innerHTML = '<p class="no-results">Aucune tontine trouvée</p>';
    return;
  }
  
  container.innerHTML = tontines.map(tontine => `
    <div class="tontine-item" data-category="${tontine.category}">
      <div class="tontine-item-header">
        <h3 class="tontine-item-title">${tontine.name}</h3>
        <span class="tontine-badge">${tontine.category}</span>
      </div>
      <p class="tontine-item-desc">${tontine.description}</p>
      <div class="tontine-item-stats">
        <div class="stat">
          <i class="fas fa-users"></i>
          <span>${tontine.currentMembers}/${tontine.maxMembers} membres</span>
        </div>
        <div class="stat">
          <i class="fas fa-coins"></i>
          <span>${tontine.contributionAmount.toLocaleString()} FCFA</span>
        </div>
        <div class="stat">
          <i class="fas fa-calendar"></i>
          <span>${tontine.frequency}</span>
        </div>
      </div>
      <div class="tontine-item-footer">
        <button class="btn-primary" onclick="joinTontine('${tontine.id}')">
          <i class="fas fa-user-plus"></i> Rejoindre
        </button>
      </div>
    </div>
  `).join('');
}

// Filter buttons
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    const filter = btn.getAttribute('data-filter');
    
    if (filter === 'all') {
      filteredTontines = allTontines;
    } else {
      filteredTontines = allTontines.filter(t => t.category === filter);
    }
    
    renderTontines(filteredTontines);
  });
});

// Search functionality
const searchInput = document.getElementById('searchInput');
searchInput?.addEventListener('input', async (e) => {
  const searchTerm = e.target.value.trim();
  
  if (searchTerm.length < 2) {
    renderTontines(filteredTontines);
    return;
  }
  
  try {
    const result = await Promise.resolve({success: true, data: []}).then(searchTerm);
    
    if (result.success) {
      renderTontines(result.data.tontines || []);
    }
  } catch (error) {
    console.error('Search error:', error);
  }
});

// Join by invite code
const inviteCodeInput = document.getElementById('inviteCode');
const joinByCodeBtn = document.querySelector('.join-code-input .btn');

joinByCodeBtn?.addEventListener('click', async () => {
  const code = inviteCodeInput.value.trim();
  
  if (!code) {
    showNotification('Veuillez entrer un code d\'invitation', 'error');
    return;
  }
  
  joinByCodeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Vérification...';
  joinByCodeBtn.disabled = true;
  
  try {
    const result = await Promise.resolve({success: true, data: []}).then(code);
    
    if (result.success) {
      showNotification('Vous avez rejoint la tontine avec succès!', 'success');
      setTimeout(() => {
        window.location.href = 'mes-tontines.html';
      }, 1500);
    } else {
      throw new Error(result.error);
    }
  } catch (error) {
    console.error('Join by code error:', error);
    showNotification(error.message || 'Code invalide ou tontine non disponible', 'error');
    joinByCodeBtn.innerHTML = '<i class="fas fa-check"></i> Rejoindre';
    joinByCodeBtn.disabled = false;
  }
});

// Join tontine function
async function joinTontine(tontineId) {
  if (!confirm('Voulez-vous vraiment rejoindre cette tontine ?')) {
    return;
  }
  
  try {
    const result = await Promise.resolve({success: true, data: []}).then(tontineId);
    
    if (result.success) {
      showNotification('Demande envoyée avec succès! Vous recevrez une notification une fois accepté.', 'success');
      setTimeout(() => {
        window.location.href = 'mes-tontines.html';
      }, 1500);
    } else {
      throw new Error(result.error);
    }
  } catch (error) {
    console.error('Join tontine error:', error);
    showNotification(error.message || 'Erreur lors de l\'adhésion à la tontine', 'error');
  }
}

// Notification helper
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
    <span>${message}</span>
  `;
  document.body.appendChild(notification);
  setTimeout(() => notification.classList.add('show'), 100);
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 4000);
}

// Load tontines on page load
document.addEventListener('DOMContentLoaded', loadTontines);

