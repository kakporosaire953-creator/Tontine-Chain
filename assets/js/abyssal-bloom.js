/**
 * Abyssal Bloom - Advanced Dark Mode System
 * Interactive Bioluminescent Layer & Circular Transition
 */

class AbyssalBloom {
    constructor() {
        this.container = document.getElementById('abyssal-bloom-container');
        this.canvas = document.getElementById('abyssal-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.overlay = document.querySelector('.abyssal-transition-overlay');
        this.toggle = document.getElementById('dark-mode-toggle');
        
        this.particles = [];
        this.isDarkMode = localStorage.getItem('theme') === 'dark';
        this.mouse = { x: -1000, y: -1000 };
        
        this.init();
    }

    init() {
        // Setup toggle
        this.toggle.addEventListener('click', (e) => this.toggleTheme(e));
        
        // Window events
        window.addEventListener('resize', () => this.resize());
        window.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        
        // Initial state
        if (this.isDarkMode) {
            document.body.classList.add('dark-mode');
        } else if (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.body.classList.add('dark-mode');
            this.isDarkMode = true;
        }

        this.resize();
        this.createParticles();
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    handleMouseMove(e) {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;
    }

    toggleTheme(e) {
        const toggleRect = this.toggle.getBoundingClientRect();
        const centerX = toggleRect.left + toggleRect.width / 2;
        const centerY = toggleRect.top + toggleRect.height / 2;

        // Position l'overlay sur le toggle
        this.overlay.style.clipPath = `circle(0% at ${centerX}px ${centerY}px)`;
        
        // Déclenche l'animation
        requestAnimationFrame(() => {
            this.overlay.classList.add('active');
            this.overlay.style.clipPath = `circle(150% at ${centerX}px ${centerY}px)`;
            
            setTimeout(() => {
                this.isDarkMode = !this.isDarkMode;
                document.body.classList.toggle('dark-mode');
                localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
                
                // Retrait progressif de l'overlay après le switch
                setTimeout(() => {
                    this.overlay.style.opacity = '0';
                    setTimeout(() => {
                        this.overlay.classList.remove('active');
                        this.overlay.style.opacity = '1';
                        this.overlay.style.clipPath = 'circle(0% at center)';
                    }, 600);
                }, 100);
            }, 600); // Milieu de la transition clip-path
        });
    }

    createParticles() {
        const particleCount = 60;
        this.particles = [];
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.5 + 0.1,
                hue: Math.random() > 0.5 ? 160 : 280 // Vert ou Violet
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        if (this.isDarkMode) {
            this.particles.forEach(p => {
                // Mouvement
                p.x += p.speedX;
                p.y += p.speedY;

                // Repousser aux bords
                if (p.x < 0) p.x = this.canvas.width;
                if (p.x > this.canvas.width) p.x = 0;
                if (p.y < 0) p.y = this.canvas.height;
                if (p.y > this.canvas.height) p.y = 0;

                // Interaction souris (attraction légère)
                const dx = this.mouse.x - p.x;
                const dy = this.mouse.y - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150) {
                    p.x += dx * 0.01;
                    p.y += dy * 0.01;
                    p.opacity = Math.min(p.opacity + 0.02, 0.8);
                } else {
                    p.opacity = Math.max(p.opacity - 0.01, 0.2);
                }

                // Dessin
                this.ctx.beginPath();
                this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                
                const gradient = this.ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
                gradient.addColorStop(0, `hsla(${p.hue}, 100%, 70%, ${p.opacity})`);
                gradient.addColorStop(1, `hsla(${p.hue}, 100%, 70%, 0)`);
                
                this.ctx.fillStyle = gradient;
                this.ctx.fill();
            });
        }

        requestAnimationFrame(() => this.animate());
    }
}

// Initialisation au chargement
document.addEventListener('DOMContentLoaded', () => {
    new AbyssalBloom();
});
