// Dashboard Data Service
async function loadDashboardData() {
    console.log('[Dashboard] Starting data load...');
    
    const tontinesContainer = document.querySelector('.tontines-list');
    const historyContainer = document.querySelector('#history-section .activity-timeline');
    if (tontinesContainer) tontinesContainer.innerHTML = '<div style="padding:40px;text-align:center;"><i class="fas fa-spinner fa-spin" style="font-size:24px;color:var(--gold);"></i><p>Chargement de vos tontines...</p></div>';
    if (historyContainer) historyContainer.innerHTML = '<div style="padding:40px;text-align:center;"><i class="fas fa-spinner fa-spin" style="font-size:24px;color:var(--blue);"></i><p>Chargement de l\'historique...</p></div>';
    
    const totalSavedEl = document.getElementById('totalSaved');
    const activeTontinesEl = document.getElementById('activeTontines');
    const payoutRateEl = document.getElementById('payoutRate');
    
    if (totalSavedEl) totalSavedEl.textContent = '...';
    if (activeTontinesEl) activeTontinesEl.textContent = '...';
    if (payoutRateEl) payoutRateEl.textContent = '...';

    try {
        console.log('[Dashboard] Fetching user profile...');
        const user = await API.user.getProfile();
        console.log('[Dashboard] User:', user);
        
        const welcomeMsg = document.getElementById('welcomeMsg');
        if (welcomeMsg) {
            welcomeMsg.innerHTML = `Bonjour ${user.first_name || 'Utilisateur'} 👋`;
        }
        
        localStorage.setItem('user', JSON.stringify(user));
        
        console.log('[Dashboard] Fetching balance...');
        const balance = await API.user.getBalance();
        console.log('[Dashboard] Balance:', balance);
        
        if (totalSavedEl) totalSavedEl.textContent = (balance.total_saved || 0).toLocaleString() + ' FCFA';
        if (activeTontinesEl) activeTontinesEl.textContent = balance.active_groups || 0;
        if (payoutRateEl) payoutRateEl.textContent = (balance.payment_rate || 0) + '%';
        
        console.log('[Dashboard] Fetching groups...');
        const groups = await API.groups.list();
        console.log('[Dashboard] Groups:', groups);
        renderGroups(groups);
        
        console.log('[Dashboard] Fetching payouts...');
        const payouts = await API.user.getPayouts();
        console.log('[Dashboard] Payouts:', payouts);
        renderPayouts(payouts);

        console.log('[Dashboard] Fetching score...');
        const scoreData = await API.user.getScore();
        console.log('[Dashboard] Score:', scoreData);
        updateTrustScore(scoreData.score);

        console.log('[Dashboard] Data load complete!');
    } catch (error) {
        console.error("[Dashboard] Loading Error:", error);
        
        if (tontinesContainer) {
            tontinesContainer.innerHTML = `
                <div style="padding:40px;text-align:center;color:#EF4444;">
                    <i class="fas fa-exclamation-triangle" style="font-size:32px;margin-bottom:16px;"></i>
                    <p style="font-weight:600;margin-bottom:8px;">Erreur de chargement</p>
                    <p style="font-size:14px;color:#94A3B8;">${error.message}</p>
                    <button onclick="location.reload()" style="margin-top:16px;padding:8px 16px;background:#00C896;color:white;border:none;border-radius:6px;cursor:pointer;">
                        Réessayer
                    </button>
                </div>
            `;
        }
        
        if (historyContainer) {
            historyContainer.innerHTML = `<div style="padding:20px;text-align:center;color:#EF4444;"><i class="fas fa-exclamation-triangle"></i><p>Impossible de charger l'historique.</p></div>`;
        }
        
        if (totalSavedEl) totalSavedEl.textContent = '0 FCFA';
        if (activeTontinesEl) activeTontinesEl.textContent = '0';
        if (payoutRateEl) payoutRateEl.textContent = '0%';
    }
}

function renderGroups(groups) {
    const container = document.querySelector('.tontines-list');
    if (!container) return;

    if (!groups || groups.length === 0) {
        container.innerHTML = `
            <div style="padding:60px 20px;text-align:center;">
                <i class="fas fa-inbox" style="font-size:48px;color:#94A3B8;margin-bottom:16px;"></i>
                <h3 style="color:#1E293B;margin-bottom:8px;">Aucune tontine</h3>
                <p style="color:#64748B;margin-bottom:24px;">Créez votre première tontine ou rejoignez-en une existante</p>
                <button onclick="window.location.href='create-tontine.html'" class="btn btn-primary">
                    <i class="fas fa-plus"></i> Créer une tontine
                </button>
            </div>
        `;
        return;
    }

    container.innerHTML = groups.map(g => {
        const statusClass = g.status === 'active' ? 'active' : 'pending';
        const statusIcon = g.status === 'active' ? 'fa-circle' : 'fa-clock';
        const statusText = g.status === 'active' ? 'Active' : 'En attente';
        const progress = g.max_members > 0 ? Math.round((g.current_cycle / g.max_members) * 100) : 0;
        const nextPayoutDate = g.next_payout_at ? new Date(g.next_payout_at).toLocaleDateString('fr-FR') : 'N/A';
        
        return `
            <div class="tontine-card-modern">
                <div class="tontine-card-header">
                    <div class="tontine-badge tontine-badge-${statusClass}">
                        <i class="fas ${statusIcon}"></i> ${statusText}
                    </div>
                    <button class="tontine-menu-btn" onclick="showTontineDetail('${g.id}')">
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
                    <div class="tontine-card-next">
                        <i class="fas fa-calendar"></i>
                        <span>Prochain: ${nextPayoutDate}</span>
                    </div>
                    <button class="btn btn-primary btn-sm" onclick="showTontineDetail('${g.id}')">
                        Voir Détails
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function showTontineDetail(groupId) {
    console.log('[Dashboard] Show detail for group:', groupId);
    alert(`Détails de la tontine ${groupId} - À implémenter`);
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
    const badges = document.querySelectorAll('.badge-new');
    badges.forEach(badge => {
        if (badge.textContent.includes('Trust Score')) {
            badge.textContent = `Trust Score: ${score}%`;
        }
    });
}

document.addEventListener('DOMContentLoaded', loadDashboardData);
