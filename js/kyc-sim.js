// ================================================
// TONTINECHAIN — KYC VERIFICATION (REAL BACKEND)
// ================================================

const KYC = {
    checkStatus() {
        const userStr = localStorage.getItem('user');
        const user = userStr ? JSON.parse(userStr) : null;
        const isVerified = localStorage.getItem('tc_kyc_verified') === 'true';

        if (user && user.npi) {
            localStorage.setItem('tc_kyc_verified', 'true');
            this.removeBlockingOverlay();
            return true;
        }

        if (!isVerified) {
            this.showBlockingOverlay();
            return false;
        }
        return true;
    },

    showBlockingOverlay() {
        if (document.getElementById('kyc-overlay')) return;

        const overlay = document.createElement('div');
        overlay.id = 'kyc-overlay';
        overlay.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(15, 23, 42, 0.95); backdrop-filter: blur(8px);
            z-index: 9999; display: flex; align-items: center; justify-content: center;
            color: white; text-align: center; font-family: 'Manrope', sans-serif;
        `;

        overlay.innerHTML = `
            <div style="max-width: 450px; padding: 40px; background: #1E293B; border-radius: 24px; border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);">
                <div style="width: 80px; height: 80px; background: rgba(0,200,150,0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px; border: 1px solid #00C896;">
                    <i class="fas fa-user-shield" style="font-size: 32px; color: #00C896;"></i>
                </div>
                <h2 style="margin-bottom: 16px; font-family: 'Space Grotesk';">Vérification Obligatoire</h2>
                <p style="color: #94A3B8; margin-bottom: 32px; line-height: 1.6;">Conformément à la réglementation MIABE 2026, vous devez renseigner votre NPI pour accéder au Dashboard.</p>
                <button onclick="KYC.openModal()" class="btn btn-primary btn-large btn-block" style="background:#00C896; border:none; padding:15px; border-radius:12px; cursor:pointer; color:white; font-weight:700;">
                    Compléter mon Profil
                </button>
            </div>
        `;
        document.body.appendChild(overlay);
        document.body.style.overflow = 'hidden';
    },

    removeBlockingOverlay() {
        const overlay = document.getElementById('kyc-overlay');
        if (overlay) {
            overlay.remove();
            document.body.style.overflow = 'auto';
        }
    },

    openModal() {
        const npi = prompt("Veuillez entrer votre NPI (tout format accepté pour le moment) :");
        if (npi && npi.trim().length > 0) {
            this.verify(npi);
        } else {
            alert("NPI invalide (champ vide).");
        }
    },

    async verify(npi) {
        try {
            // Update profile with NPI via API
            await API.user.updateProfile({ npi });
            
            // Refresh local user data
            const user = await API.user.getProfile();
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('tc_kyc_verified', 'true');
            
            this.removeBlockingOverlay();
            alert("Profil vérifié avec succès !");
            location.reload();
        } catch (error) {
            alert("Erreur lors de la vérification : " + error.message);
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // Check status on dashboard or profile pages
    if (window.location.pathname.includes('dashboard.html') || window.location.pathname.includes('profil.html')) {
        KYC.checkStatus();
    }
});
