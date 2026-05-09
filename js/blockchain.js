// ================================================
// TONTINECHAIN — Simulated Blockchain Proof System
// ================================================

const BC = {
    showTransactionProof(hash = null) {
        if (!hash) hash = '0x' + Math.random().toString(16).slice(2) + Math.random().toString(16).slice(2);
        
        const overlay = document.createElement('div');
        overlay.className = 'bc-overlay';
        
        overlay.innerHTML = `
            <div class="bc-popup">
                <div class="bc-header">
                    <div class="bc-icon-wrapper">
                        <i class="fas fa-link animate-spin-slow"></i>
                    </div>
                    <h3>Ancrage Blockchain</h3>
                    <div class="bc-badge">Polygon POS</div>
                </div>
                
                <div class="bc-body">
                    <div class="bc-step completed">
                        <i class="fas fa-check-circle"></i>
                        <span>Validation Smart Contract</span>
                    </div>
                    <div class="bc-step completed">
                        <i class="fas fa-check-circle"></i>
                        <span>Génération du Hash</span>
                    </div>
                    <div class="bc-step processing">
                        <i class="fas fa-circle-notch fa-spin"></i>
                        <span>Confirmation du Bloc #15,824...</span>
                    </div>
                </div>

                <div class="bc-hash-box">
                    <span class="label">Transaction Hash :</span>
                    <code class="hash-text">${hash}</code>
                </div>

                <div class="bc-footer">
                    <button class="btn btn-primary btn-block" onclick="this.closest('.bc-overlay').remove()">
                        <i class="fas fa-eye"></i> Vérifier sur PolygonScan
                    </button>
                    <p class="bc-security-note">Sécurisé par Smart Contract Audité</p>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);

        // Auto transition processing to completed after 2s
        setTimeout(() => {
            const processingStep = overlay.querySelector('.bc-step.processing');
            if (processingStep) {
                processingStep.className = 'bc-step completed';
                processingStep.querySelector('i').className = 'fas fa-check-circle';
            }
        }, 2000);
    },

    init() {
        // Intercept some buttons for demo purposes
        document.addEventListener('click', (e) => {
            if (e.target.innerText && (e.target.innerText.includes('Payer') || e.target.innerText.includes('Créer'))) {
                // For demo, show proof after 1s
                setTimeout(() => this.showTransactionProof(), 500);
            }
        });
    }
};

// CSS Injection for the popup
const bcStyles = `
.bc-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(15, 23, 42, 0.8);
    backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    animation: fadeIn 0.3s ease;
}

.bc-popup {
    background: #ffffff;
    width: 90%;
    max-width: 400px;
    border-radius: 24px;
    padding: 32px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    border: 1px solid rgba(255, 255, 255, 0.1);
    position: relative;
    overflow: hidden;
}

.bc-header {
    text-align: center;
    margin-bottom: 24px;
}

.bc-icon-wrapper {
    width: 64px;
    height: 64px;
    background: #8247E5; /* Polygon Purple */
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    margin: 0 auto 16px;
    box-shadow: 0 0 20px rgba(130, 71, 229, 0.4);
}

.bc-badge {
    display: inline-block;
    padding: 4px 12px;
    background: rgba(130, 71, 229, 0.1);
    color: #8247E5;
    border-radius: 50px;
    font-size: 12px;
    font-weight: 700;
    margin-top: 8px;
}

.bc-body {
    margin-bottom: 24px;
}

.bc-step {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 12px;
    font-size: 14px;
    color: #64748B;
}

.bc-step.completed { color: #00A86B; }
.bc-step.completed i { color: #00A86B; }
.bc-step.processing { color: #3B82F6; }

.bc-hash-box {
    background: #F8FAFC;
    padding: 16px;
    border-radius: 12px;
    margin-bottom: 24px;
    border: 1px dashed #E2E8F0;
}

.bc-hash-box .label {
    display: block;
    font-size: 11px;
    color: #94A3B8;
    text-transform: uppercase;
    margin-bottom: 4px;
}

.bc-hash-box .hash-text {
    display: block;
    font-family: 'Courier New', monospace;
    font-size: 12px;
    word-break: break-all;
    color: #1E293B;
}

.bc-footer {
    text-align: center;
}

.bc-security-note {
    font-size: 11px;
    color: #94A3B8;
    margin-top: 12px;
}

@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
.animate-spin-slow { animation: spin-slow 3s linear infinite; }
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = bcStyles;
document.head.appendChild(styleSheet);

BC.init();
