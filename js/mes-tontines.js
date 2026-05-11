// Load user's tontines from API
async function loadMyTontines() {
  console.log('[MesTontines] Loading user tontines...');
  
  const container = document.querySelector('.tontines-grid') || document.querySelector('.tontines-list');
  if (!container) return;
  
  container.innerHTML = '<div style="padding:60px;text-align:center;"><i class="fas fa-spinner fa-spin" style="font-size:32px;color:var(--gold);"></i><p style="margin-top:16px;">Chargement de vos tontines...</p></div>';
  
  try {
    const groups = await API.groups.list();
    console.log('[MesTontines] Loaded', groups.length, 'groups');
    
    if (!groups || groups.length === 0) {
      container.innerHTML = `
        <div style="padding:80px 20px;text-align:center;">
          <i class="fas fa-inbox" style="font-size:64px;color:#94A3B8;margin-bottom:20px;"></i>
          <h3 style="color:#1E293B;margin-bottom:12px;">Aucune tontine</h3>
          <p style="color:#64748B;margin-bottom:32px;">Vous n'avez pas encore rejoint de tontine</p>
          <button onclick="window.location.href='create-tontine.html'" class="btn btn-primary" style="margin-right:12px;">
            <i class="fas fa-plus"></i> Créer une tontine
          </button>
          <button onclick="window.location.href='join-tontine.html'" class="btn btn-outline">
            <i class="fas fa-user-plus"></i> Rejoindre une tontine
          </button>
        </div>
      `;
      return;
    }
    
    renderTontines(groups);
  } catch (error) {
    console.error('[MesTontines] Error:', error);
    container.innerHTML = `
      <div style="padding:60px 20px;text-align:center;color:#EF4444;">
        <i class="fas fa-exclamation-triangle" style="font-size:48px;margin-bottom:20px;"></i>
        <h3 style="margin-bottom:12px;">Erreur de chargement</h3>
        <p style="color:#64748B;margin-bottom:24px;">${error.message}</p>
        <button onclick="location.reload()" class="btn btn-primary">
          <i class="fas fa-redo"></i> Réessayer
        </button>
      </div>
    `;
  }
}

function renderTontines(groups) {
  const container = document.querySelector('.tontines-grid') || document.querySelector('.tontines-list');
  if (!container) return;
  
  container.innerHTML = groups.map(g => {
    const statusClass = g.status === 'active' ? 'active' : g.status === 'completed' ? 'completed' : 'pending';
    const statusIcon = g.status === 'active' ? 'fa-circle' : g.status === 'completed' ? 'fa-check-circle' : 'fa-clock';
    const statusText = g.status === 'active' ? 'Active' : g.status === 'completed' ? 'Terminée' : 'En attente';
    const progress = g.max_members > 0 ? Math.round((g.current_cycle / g.max_members) * 100) : 0;
    
    return `
      <div class="tontine-detailed-card" data-status="${g.status}">
        <div class="tontine-card-header">
          <div class="tontine-badge tontine-badge-${statusClass}">
            <i class="fas ${statusIcon}"></i> ${statusText}
          </div>
          <button class="tontine-menu-btn" onclick="showTontineOptions('${g.id}')">
            <i class="fas fa-ellipsis-v"></i>
          </button>
        </div>
        
        <h3 class="tontine-card-title">${g.name || 'Sans nom'}</h3>
        <p class="tontine-card-desc">${g.description || 'Pas de description'}</p>
        
        <div class="tontine-card-stats">
          <div class="tontine-card-stat">
            <i class="fas fa-users"></i>
            <span>${g.members_count || 0}/${g.max_members || 0} membres</span>
          </div>
          <div class="tontine-card-stat">
            <i class="fas fa-coins"></i>
            <span>${(g.contribution_amount || 0).toLocaleString()} FCFA</span>
          </div>
          <div class="tontine-card-stat">
            <i class="fas fa-calendar"></i>
            <span>${g.frequency || 'Mensuel'}</span>
          </div>
        </div>
        
        <div class="tontine-card-progress">
          <div class="progress-info">
            <span>Cycle ${g.current_cycle || 0}/${g.max_members || 0}</span>
            <span>${progress}%</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${progress}%"></div>
          </div>
        </div>
        
        <div class="tontine-card-footer">
          <button class="btn btn-primary btn-sm" onclick="viewTontineDetails('${g.id}')">
            <i class="fas fa-eye"></i> Voir détails
          </button>
          ${g.status === 'active' ? `
            <button class="btn btn-outline btn-sm" onclick="payContribution('${g.id}')">
              <i class="fas fa-credit-card"></i> Payer
            </button>
          ` : ''}
        </div>
      </div>
    `;
  }).join('');
}

function viewTontineDetails(groupId) {
  console.log('[MesTontines] View details:', groupId);
  // Redirect to detail page or show modal
  alert('Détails de la tontine ' + groupId + ' - À implémenter');
}

function payContribution(groupId) {
  console.log('[MesTontines] Pay contribution:', groupId);
  window.location.href = 'paiement.html?group=' + groupId;
}

function showTontineOptions(groupId) {
  console.log('[MesTontines] Show options:', groupId);
  alert('Options pour la tontine ' + groupId);
}

// Filter tabs
const filterTabs = document.querySelectorAll('.filter-tab');
filterTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    filterTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    
    const filter = tab.getAttribute('data-filter');
    const cards = document.querySelectorAll('.tontine-detailed-card');
    
    cards.forEach(card => {
      const status = card.getAttribute('data-status');
      if (filter === 'all' || status === filter) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// Load on page ready
document.addEventListener('DOMContentLoaded', loadMyTontines);
