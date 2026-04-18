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
    
    // Mobile Sidebar Toggle
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
            const icon = this.querySelector('i');
            if (sidebar.classList.contains('active')) {
                icon.classList.replace('fa-bars', 'fa-times');
            } else {
                icon.classList.replace('fa-times', 'fa-bars');
            }
        });
        
        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', function(e) {
            if (window.innerWidth <= 1024 && 
                sidebar.classList.contains('active') && 
                !sidebar.contains(e.target) && 
                !sidebarToggle.contains(e.target)) {
                sidebar.classList.remove('active');
                sidebarToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
            }
        });
    }
    
    console.log('📊 Dashboard initialized with mobile menu support');
});
