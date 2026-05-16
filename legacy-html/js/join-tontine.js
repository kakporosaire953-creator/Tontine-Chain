// Filter tontines by category
const filterButtons = document.querySelectorAll('.filter-btn');
let allTontines = [];
let filteredTontines = [];

// Load tontines from API
async function loadTontines() {
  try {
    const tontines = await API.groups.list();
    allTontines = tontines || [];
    filteredTontines = allTontines.filter(t => t.status === 'pending' || t.status === 'active');
    renderTontines(filteredTontines);
  } catch (error) {
    console.error('[JoinTontine] Load error:', error);
    showNotification('Erreur lors du chargement des tontines', 'error');
  }
}

// Render tontines list
function renderTontines(tontines) {
  const container = document.querySelector('.tontines-list');
  if (!container) return;
  
  if (tontines.length === 0) {
    container.innerHTML = '<p class="no-results" style="text-align:center;padding:40px;color:#64748B;">Aucune tontine disponible pour le moment</p>';
    return;
  }
  
  // Keep existing static tontines visible, just note that API tontines would be added here
  console.log('[JoinTontine] Loaded', tontines.length, 'tontines from API');
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
searchInput?.addEventListener('input', (e) => {
  const searchTerm = e.target.value.toLowerCase().trim();
  
  if (searchTerm.length < 2) {
    filteredTontines = allTontines;
  } else {
    filteredTontines = allTontines.filter(t => 
      t.name.toLowerCase().includes(searchTerm) || 
      (t.description && t.description.toLowerCase().includes(searchTerm))
    );
  }
  
  renderTontines(filteredTontines);
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
  
  const originalText = joinByCodeBtn.innerHTML;
  joinByCodeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Vérification...';
  joinByCodeBtn.disabled = true;
  
  try {
    // Try to find group by code (would need backend endpoint)
    showNotification('Fonctionnalité en cours de développement', 'info');
    joinByCodeBtn.innerHTML = originalText;
    joinByCodeBtn.disabled = false;
  } catch (error) {
    console.error('[JoinTontine] Join by code error:', error);
    showNotification(error.message || 'Code invalide ou tontine non disponible', 'error');
    joinByCodeBtn.innerHTML = originalText;
    joinByCodeBtn.disabled = false;
  }
});

// Join tontine function
async function joinTontine(tontineId) {
  if (!confirm('Voulez-vous vraiment rejoindre cette tontine ?')) {
    return;
  }
  
  try {
    await API.groups.join(tontineId);
    showNotification('Vous avez rejoint la tontine avec succès!', 'success');
    setTimeout(() => {
      window.location.href = 'dashboard.html';
    }, 1500);
  } catch (error) {
    console.error('[JoinTontine] Join error:', error);
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

