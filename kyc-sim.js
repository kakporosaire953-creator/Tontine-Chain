const KYC = {
    isVerified() {
        return localStorage.getItem('tc_kyc_verified') === 'true';
    },

    openModal(mandatory = false) {
        if (this.isVerified()) return;

        const modal = document.createElement('div');
        modal.className = 'kyc-overlay';
        modal.id = 'kyc-modal-overlay';
        
        const closeBtn = mandatory ? '' : `<button class="close-btn" onclick="this.closest('.kyc-overlay').remove()">&times;</button>`;
        
        modal.innerHTML = `
            <div class="kyc-modal">
                <div class="kyc-header">
                    <h3>${mandatory ? '⚠️ Vérification Obligatoire' : 'Vérification d\'Identité'}</h3>
                    ${closeBtn}
                </div>
                <div class="kyc-body">
                    <div id="kyc-step-1">
                        <div class="kyc-camera-sim">
                            <i class="fas fa-id-card"></i>
                            <div class="scan-line"></div>
                        </div>
                        <p class="kyc-hint">${mandatory ? '<b>Accès restreint :</b> Veuillez vérifier votre identité pour continuer.' : 'Placez votre pièce d\'identité (CIP, NPI ou Passeport) dans le cadre.'}</p>
                        <button class="btn btn-primary btn-block" onclick="KYC.startScan()">Démarrer la Vérification</button>
                    </div>
                    <div id="kyc-step-2" style="display:none">
                        <div class="kyc-loader">
                            <div class="spinner"></div>
                            <h4>Analyse en cours...</h4>
                            <p>Vérification cryptographique sur Polygon POS...</p>
                        </div>
                        <div class="kyc-progress-bar">
                            <div class="kyc-progress-fill" style="width:0%"></div>
                        </div>
                    </div>
                    <div id="kyc-step-3" style="display:none">
                        <div class="kyc-success">
                            <i class="fas fa-check-circle" style="color:#00A86B"></i>
                            <h4>Félicitations !</h4>
                            <p>Votre identité est confirmée. Toutes les fonctionnalités sont débloquées.</p>
                            <button class="btn btn-success btn-block" onclick="KYC.finish()">Accéder à mon Dashboard</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        
        // CSS Injection (if not already injected)
        if (!document.getElementById('kyc-styles')) {
            const style = document.createElement('style');
            style.id = 'kyc-styles';
            style.innerText = `
                .kyc-overlay { position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(15, 23, 42, 0.9); backdrop-filter:blur(8px); z-index:20000; display:flex; align-items:center; justify-content:center; animation: fadeIn 0.3s; }
                .kyc-modal { background:white; width:95%; max-width:450px; border-radius:24px; padding:32px; box-shadow:0 25px 50px -12px rgba(0,0,0,0.5); border: 1px solid rgba(0,168,107,0.2); }
                .kyc-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:24px; }
                .kyc-camera-sim { height:180px; background:#F8FAFC; border:2px dashed #E2E8F0; border-radius:16px; display:flex; align-items:center; justify-content:center; font-size:64px; color:#94A3B8; position:relative; overflow:hidden; margin-bottom:16px; }
                .scan-line { position:absolute; top:0; left:0; width:100%; height:3px; background:#00A86B; box-shadow:0 0 15px #00A86B; animation: scan 2.5s linear infinite; }
                .kyc-loader { text-align:center; padding:10px; }
                .spinner { width:45px; height:45px; border:4px solid #F1F5F9; border-top-color:#00A86B; border-radius:50%; animation: spin 1s linear infinite; margin:0 auto 16px; }
                .kyc-progress-bar { height:10px; background:#F1F5F9; border-radius:10px; overflow:hidden; margin-top:20px; }
                .kyc-progress-fill { height:100%; background:linear-gradient(90deg, #00A86B, #00FF87); transition: width 0.3s; }
                .kyc-success { text-align:center; padding:10px; }
                .kyc-success i { font-size:72px; margin-bottom:16px; }
                @keyframes scan { from { top:0 } to { top:100% } }
                @keyframes spin { from { transform:rotate(0deg) } to { transform:rotate(360deg) } }
                @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
            `;
            document.head.appendChild(style);
        }
    },

    startScan() {
        document.getElementById('kyc-step-1').style.display = 'none';
        document.getElementById('kyc-step-2').style.display = 'block';
        
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 8;
            if (progress > 100) progress = 100;
            document.querySelector('.kyc-progress-fill').style.width = progress + '%';
            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    document.getElementById('kyc-step-2').style.display = 'none';
                    document.getElementById('kyc-step-3').style.display = 'block';
                }, 800);
            }
        }, 150);
    },

    finish() {
        localStorage.setItem('tc_kyc_verified', 'true');
        document.getElementById('kyc-modal-overlay').remove();
        // Optionnel: rafraichir pour mettre à jour les badges
        window.location.reload();
    }
};

// Auto-trigger if mandatory on dashboard
if (window.location.pathname.includes('dashboard.html') && !KYC.isVerified()) {
    window.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => KYC.openModal(true), 1000);
    });
}
