/**
 * TontineChain - Premium Animations & Sync Engine 2026
 * Unified core for scroll-reveals, staggered cascades, and frame-synced animations.
 */

class AnimationEngine {
    constructor() {
        this.revealObserver = null;
        this.statsObserver = null;
        this.init();
    }

    init() {
        this.setupObservers();
        this.setupMagneticButtons();
        this.setupStaggerContainers();
    }

    setupObservers() {
        // 1. Unified Scroll Reveal Observer
        const revealOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };

        this.revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    
                    // If it's a stat box, trigger counter
                    if (entry.target.classList.contains('stat-card') || entry.target.querySelector('.stat-number')) {
                        this.handleStatCounter(entry.target);
                    }
                    
                    this.revealObserver.unobserve(entry.target);
                }
            });
        }, revealOptions);

        // Start observing
        document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-scale, .stagger-item').forEach(el => {
            this.revealObserver.observe(el);
        });
    }

    handleStatCounter(container) {
        const numberEl = container.querySelector('.stat-number, .stat-value, .projection-number');
        if (!numberEl || container.dataset.animated) return;

        const text = numberEl.textContent;
        let targetValue = 0;
        let suffix = '';

        // Extract value and suffix
        if (text.includes('Mds')) {
            targetValue = parseFloat(text) * 1000000000;
            suffix = 'Mds';
        } else if (text.includes('M')) {
            targetValue = parseFloat(text) * 1000000;
            suffix = 'M';
        } else if (text.includes('K') || text.includes('k')) {
            targetValue = parseFloat(text) * 1000;
            suffix = 'K';
        } else {
            targetValue = parseInt(text.replace(/[^0-9]/g, ''));
            suffix = text.replace(/[0-9]/g, '');
        }

        if (!isNaN(targetValue)) {
            this.animateValue(numberEl, 0, targetValue, 2000, suffix);
            container.dataset.animated = 'true';
        }
    }

    animateValue(obj, start, end, duration, suffix = '') {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const current = Math.floor(progress * (end - start) + start);
            
            obj.innerHTML = this.formatNumber(current, suffix);
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    formatNumber(num, suffix) {
        if (suffix === 'Mds') return (num / 1000000000).toFixed(0) + 'Mds';
        if (suffix === 'M') return (num / 1000000).toFixed(0) + 'M';
        if (suffix === 'K') return (num / 1000).toFixed(0) + 'K';
        return num.toLocaleString() + suffix;
    }

    setupMagneticButtons() {
        const buttons = document.querySelectorAll('.btn-primary, .btn-commencer, .nav-brand');
        buttons.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.05)`;
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = '';
            });
        });
    }

    setupStaggerContainers() {
        const containers = document.querySelectorAll('.stagger-container, .tontines-grid, .odd-grid, .steps-container');
        containers.forEach(container => {
            const children = Array.from(container.children);
            children.forEach((child, index) => {
                child.classList.add('stagger-item');
                child.style.setProperty('--stagger-index', index);
                this.revealObserver.observe(child);
            });
        });
    }
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    window.animationEngine = new AnimationEngine();
});
