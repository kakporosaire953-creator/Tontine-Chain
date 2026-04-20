// ============================================
// TontineChain - Payment Logic
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    const methodCards = document.querySelectorAll('.method-card');
    const tontineSelect = document.getElementById('tontineSelect');
    const sumAmount = document.getElementById('sumAmount');
    const sumTotal = document.getElementById('sumTotal');
    const btnConfirmPay = document.getElementById('btnConfirmPay');
    const paymentOverlay = document.getElementById('paymentOverlay');

    // Handle Method Selection
    methodCards.forEach(card => {
        card.addEventListener('click', function() {
            methodCards.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Handle Tontine Selection
    if (tontineSelect) {
        tontineSelect.addEventListener('change', function() {
            try {
                const rawValue = this.value.replace(/[^0-9]/g, '');
                const amount = parseInt(rawValue, 10);
                
                if (isNaN(amount) || amount <= 0) {
                    console.error('Invalid amount selected');
                    return;
                }
                
                const fees = 150;
                const total = amount + fees;

                if (sumAmount) sumAmount.textContent = formatNumber(amount) + ' FCFA';
                if (sumTotal) sumTotal.textContent = formatNumber(total) + ' FCFA';
            } catch (error) {
                console.error('Error parsing amount:', error);
            }
        });
    }

    // Handle Payment Confirmation
    if (btnConfirmPay) {
        btnConfirmPay.addEventListener('click', function() {
            // Validate selection
            const selectedMethod = document.querySelector('.method-card.active');
            if (!selectedMethod) {
                alert('Veuillez sélectionner une méthode de paiement');
                return;
            }
            
            if (!tontineSelect || !tontineSelect.value) {
                alert('Veuillez sélectionner une tontine');
                return;
            }
            
            const originalHTML = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Transaction Blockchain en cours...</span>';
            this.disabled = true;

            // Simulate Network Delay
            setTimeout(() => {
                if (paymentOverlay) {
                    paymentOverlay.style.display = 'flex';
                }
                // Trigger confetti or similar if available
                console.log('✅ Payment successful');
            }, 3000);
        });
    }

    function formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
});
