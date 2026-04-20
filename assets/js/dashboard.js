// ============================================
// TontineChain - Dashboard
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // Animate progress bars
    const progressBars = document.querySelectorAll('.progress-fill');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.width = width;
        }, 300);
    });
    
    // Animate stat values
    const statValues = document.querySelectorAll('.stat-box-value');
    statValues.forEach(stat => {
        const text = stat.textContent;
        if (text.includes('FCFA')) {
            const value = parseInt(text.replace(/[^0-9]/g, ''));
            animateValue(stat, 0, value, 1500, ' FCFA');
        } else if (text.includes('%')) {
            const value = parseInt(text);
            animateValue(stat, 0, value, 1000, '%');
        } else if (!isNaN(parseInt(text))) {
            const value = parseInt(text);
            animateValue(stat, 0, value, 1000);
        }
    });
    
    function animateValue(element, start, end, duration, suffix = '') {
        if (!element) return;
        
        const range = end - start;
        const increment = range / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
                element.textContent = formatNumber(end) + suffix;
                clearInterval(timer);
            } else {
                element.textContent = formatNumber(Math.floor(current)) + suffix;
            }
        }, 16);
        
        // Store timer reference for cleanup
        if (!element.dataset.timerId) {
            element.dataset.timerId = timer;
        }
    }
    
    function formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    
    // Card hover effects
    const tontineCards = document.querySelectorAll('.tontine-card');
    tontineCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    console.log('📊 Dashboard initialized');
});
