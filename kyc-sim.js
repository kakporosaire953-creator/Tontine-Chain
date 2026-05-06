// ================================================
// TONTINECHAIN — Simulated KYC Verification System
// ================================================

const KYC = {
    openModal() {
        const modal = document.createElement('div');
        modal.className = 'kyc-overlay';
        modal.innerHTML = `
            <div class="kyc-modal">
                <div class="kyc-header">
                    <h3>Vérification d'Identité</h3>
                    <button class="close-btn" onclick="this.closest('.kyc-overlay').remove()">&times;</button>
                </div>
                <div class="kyc-body">
                    <div id="kyc-step-1">
                        <div class="kyc-camera-sim">
                            <i class="fas fa-id-card"></i>
                            <div class="scan-line"></div>
                        </div>
                        <p class="kyc-hint">Placez votre pièce d'identité (CIP, NPI ou Passeport) dans le cadre.</p>
                        <button class="btn btn-primary btn-block" onclick="KYC.startScan()">Prendre la Photo</button>
                    </div>
                    <div id="kyc-step-2" style="display:none">
                        <div class="kyc-loader">
                            <div class="spinner"></div>
                            <h4>Analyse en cours...</h4>
                            <p>Vérification des données auprès de l'ANIP et de la base de données Blockchain.</p>
                        </div>
                        <div class="kyc-progress-bar">
                            <div class="kyc-progress-fill" style="width:0%"></div>
                        </div>
                    </div>
                    <div id="kyc-step-3" style="display:none">
                        <div class="kyc-success">
                            <i class="fas fa-check-circle"></i>
                            <h4>Identité Vérifiée !</h4>
                            <p>Votre Trust Score a été augmenté de +15%.</p>
                            <button class="btn btn-success btn-block" onclick="this.closest('.kyc-overlay').remove()">Terminer</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        
        // CSS Injection
        const style = document.createElement('style');
        style.innerText = `
            .kyc-overlay { position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.8); backdrop-filter:blur(5px); z-index:20000; display:flex; align-items:center; justify-content:center; animation: fadeIn 0.3s; }
            .kyc-modal { background:white; width:90%; max-width:450px; border-radius:24px; padding:32px; box-shadow:0 25px 50px -12px rgba(0,0,0,0.5); }
            .kyc-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:24px; }
            .kyc-camera-sim { height:200px; background:#F1F5F9; border:2px dashed #CBD5E1; border-radius:16px; display:flex; align-items:center; justify-content:center; font-size:64px; color:#94A3B8; position:relative; overflow:hidden; margin-bottom:16px; }
            .scan-line { position:absolute; top:0; left:0; width:100%; height:2px; background:#00A86B; box-shadow:0 0 10px #00A86B; animation: scan 2s linear infinite; }
            .kyc-loader { text-align:center; padding:20px; }
            .spinner { width:40px; height:40px; border:4px solid #F1F5F9; border-top-color:#00A86B; border-radius:50%; animation: spin 1s linear infinite; margin:0 auto 16px; }
            .kyc-progress-bar { height:8px; background:#F1F5F9; border-radius:4px; overflow:hidden; margin-top:20px; }
            .kyc-progress-fill { height:100%; background:#00A86B; transition: width 0.3s; }
            .kyc-success { text-align:center; padding:20px; color:#059669; }
            .kyc-success i { font-size:64px; margin-bottom:16px; }
            @keyframes scan { from { top:0 } to { top:100% } }
            @keyframes spin { from { transform:rotate(0deg) } to { transform:rotate(360deg) } }
        `;
        document.head.appendChild(style);
    },

    startScan() {
        document.getElementById('kyc-step-1').style.display = 'none';
        document.getElementById('kyc-step-2').style.display = 'block';
        
        let progress = 0;
        const interval = setInterval(() => {
            progress += 5;
            document.querySelector('.kyc-progress-fill').style.width = progress + '%';
            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    document.getElementById('kyc-step-2').style.display = 'none';
                    document.getElementById('kyc-step-3').style.display = 'block';
                }, 500);
            }
        }, 150);
    }
};
