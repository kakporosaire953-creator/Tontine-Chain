// ================================================
// TONTINECHAIN — DASHBOARD DATA SERVICE
// ================================================

async function loadDashboardData() {
    // Show loading state and clear mock data
    const tontinesContainer = document.querySelector('.tontines-list');
    const historyContainer = document.querySelector('#history-section .activity-timeline');
    if (tontinesContainer) tontinesContainer.innerHTML = '<div style="padding:40px;text-align:center;"><i class="fas fa-spinner fa-spin" style="font-size:24px;color:var(--color-gold);"></i><p>Chargement de vos tontines...</p></div>';
    if (historyContainer) historyContainer.innerHTML = '<div style="padding:40px;text-align:center;"><i class="fas fa-spinner fa-spin" style="font-size:24px;color:var(--color-blue);"></i><p>Chargement de l\'historique...</p></div>';
    
    document.getElementById('totalSaved').textContent = '...';
    document.getElementById('activeTontines').textContent = '...';
    document.getElementById('payoutRate').textContent = '...';

    try {
        // 1. Get User Profile
        const user = await API.user.getProfile();
        document.getElementById('welcomeMsg').innerHTML = `Bonjour ${user.first_name || 'Utilisateur'} 👋`;
        
        // 2. Get Balance & Stats
        const balance = await API.user.getBalance();
        updateCounter('totalSaved', balance.total_saved || 0, ' FCFA');
        updateCounter('activeTontines', balance.active_groups || 0);
        updateCounter('payoutRate', balance.payment_rate || 0, '%');
        
        // 3. Get Groups
        const groups = await API.groups.list();
        renderGroups(groups);
        
        // 4. Get Payouts
        const payouts = await API.user.getPayouts();
        renderPayouts(payouts);

        // 5. Get Score
        const scoreData = await API.user.getScore();
        updateTrustScore(scoreData.score);

    } catch (error) {
        console.error("Dashboard Loading Error:", error);
        if (tontinesContainer) tontinesContainer.innerHTML = `<div style="padding:40px;text-align:center;color:red;"><i class="fas fa-exclamation-triangle"></i><p>Erreur: ${error.message}</p></div>`;
        if (historyContainer) historyContainer.innerHTML = `<div style="padding:40px;text-align:center;color:red;"><i class="fas fa-exclamation-triangle"></i><p>Impossible de charger l'historique.</p></div>`;
        document.getElementById('totalSaved').textContent = '0 FCFA';
        document.getElementById('activeTontines').textContent = '0';
        document.getElementById('payoutRate').textContent = '0%';
    }
}

function updateCounter(id, target, suffix = '') {
    const el = document.getElementById(id);
    if (!el) return;
    el.setAttribute('data-target', target);
    // Trigger existing animation if available
}

function renderGroups(groups) {
    const container = document.querySelector('.tontines-list');
    if (!container || !groups.length) return;

    container.innerHTML = groups.map(g => `
        <div class="tontine-card-modern">
            <div class="tontine-card-header">
                <div class="tontine-badge tontine-badge-${g.status === 'active' ? 'active' : 'pending'}">
                    <i class="fas ${g.status === 'active' ? 'fa-circle' : 'fa-clock'}"></i> 
                    ${g.status === 'active' ? 'Active' : 'En attente'}
                </div>
                <button class="tontine-menu-btn" onclick="showTontineDetail('${g.id}')"><i class="fas fa-ellipsis-v"></i></button>
            </div>
            <h3 class="tontine-card-title">${g.name}</h3>
            <p class="tontine-card-desc">${g.description || 'Pas de description'}</p>
            <div class="tontine-card-stats">
                <div class="tontine-card-stat"><i class="fas fa-users"></i><span>${g.members_count}/${g.max_members} membres</span></div>
                <div class="tontine-card-stat"><i class="fas fa-coins"></i><span>${g.contribution_amount.toLocaleString()} FCFA</span></div>
            </div>
            <div class="tontine-card-progress">
                <div class="progress-info"><span>Cycle ${g.current_cycle}/${g.max_members}</span><span>${Math.round((g.current_cycle/g.max_members)*100)}%</span></div>
                <div class="progress-bar"><div class="progress-fill" style="width: ${(g.current_cycle/g.max_members)*100}%"></div></div>
            </div>
            <div class="tontine-card-footer">
                <div class="tontine-card-next"><i class="fas fa-calendar"></i><span>Prochain: ${new Date(g.next_payout_at).toLocaleDateString()}</span></div>
                <button class="btn btn-primary btn-sm" onclick="showTontineDetail('${g.id}')">Voir Détails</button>
            </div>
        </div>
    `).join('');
}

function renderPayouts(payouts) {
    const container = document.querySelector('#history-section .activity-timeline');
    if (!container) return;

    if (!payouts.length) {
        container.innerHTML = '<p style="text-align:center; padding:20px; color:#64748B;">Aucun gain reçu pour le moment.</p>';
        return;
    }

    container.innerHTML = payouts.map(p => `
        <div class="activity-item">
            <div class="activity-icon" style="background:#ECFDF5; color:#059669;"><i class="fas fa-arrow-down"></i></div>
            <div class="activity-content">
                <div class="activity-title">Gain reçu - ${p.group_name}</div>
                <div class="activity-desc">Cycle ${p.cycle_number} • Blockchain ID: ${p.tx_hash ? p.tx_hash.substring(0,10)+'...' : 'N/A'}</div>
                <div class="activity-time">${new Date(p.created_at).toLocaleDateString()}</div>
            </div>
            <div class="activity-amount" style="color:#059669; font-weight:800;">+${p.amount.toLocaleString()} FCFA</div>
        </div>
    `).join('');
}

function updateTrustScore(score) {
    const badge = document.querySelector('.badge-new');
    if (badge) badge.textContent = `Trust Score: ${score}%`;
}

document.addEventListener('DOMContentLoaded', loadDashboardData);
