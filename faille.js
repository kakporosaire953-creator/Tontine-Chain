// ================================================
// TONTINECHAIN — "LA FAILLE" (THE FAULT LINE)
// ================================================

class TectonicFracture {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            pointer-events: none;
            z-index: 999999;
            display: none;
        `;
        document.body.appendChild(this.canvas);
        
        this.isAnimating = false;
        this.points = [];
        
        // Simple Audio Context setup for rumble (generated via oscillator)
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }

    playRumble() {
        if (this.audioCtx.state === 'suspended') {
            this.audioCtx.resume();
        }
        
        const osc = this.audioCtx.createOscillator();
        const gainNode = this.audioCtx.createGain();
        
        osc.type = 'square';
        osc.frequency.setValueAtTime(40, this.audioCtx.currentTime); // Deep bass
        osc.frequency.exponentialRampToValueAtTime(10, this.audioCtx.currentTime + 1);
        
        gainNode.gain.setValueAtTime(0, this.audioCtx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.5, this.audioCtx.currentTime + 0.1);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + 1.5);
        
        osc.connect(gainNode);
        gainNode.connect(this.audioCtx.destination);
        
        osc.start();
        osc.stop(this.audioCtx.currentTime + 1.5);
    }

    generateFractureLine(width, height) {
        this.points = [];
        const segments = 40;
        const segmentWidth = width / segments;
        const centerY = height / 2;
        
        this.points.push({ x: 0, y: centerY });
        
        let currentY = centerY;
        for (let i = 1; i < segments; i++) {
            // Random walk with constraints
            const variation = (Math.random() - 0.5) * 60;
            currentY += variation;
            // Keep near center
            if (currentY < centerY - 100) currentY = centerY - 100;
            if (currentY > centerY + 100) currentY = centerY + 100;
            
            this.points.push({ x: i * segmentWidth, y: currentY });
        }
        
        this.points.push({ x: width, y: centerY });
    }

    trigger(isDark) {
        if (this.isAnimating) return;
        this.isAnimating = true;

        const width = window.innerWidth;
        const height = window.innerHeight;
        this.canvas.width = width;
        this.canvas.height = height;
        this.canvas.style.display = 'block';

        // Get colors
        const oldBg = isDark ? '#F5F2EB' : '#0D0E12'; // Previous background
        const glowColor = isDark ? '#14B8A6' : '#C05C42'; // Teal for dark, Terracotta for light

        this.generateFractureLine(width, height);
        this.playRumble();

        let progress = 0;
        const duration = 1200; // ms
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            progress = Math.min(elapsed / duration, 1);

            // Easing: easeInOutQuart
            const ease = progress < 0.5 ? 8 * progress * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 4) / 2;

            this.ctx.clearRect(0, 0, width, height);

            // Calculate vertical offset for plaques
            // They stay still for the first 20%, then slide apart
            let offset = 0;
            if (progress > 0.2) {
                const slideProgress = (progress - 0.2) / 0.8;
                const slideEase = slideProgress < 0.5 ? 4 * slideProgress * slideProgress * slideProgress : 1 - Math.pow(-2 * slideProgress + 2, 3) / 2;
                offset = slideEase * (height / 2 + 100);
            }

            // Draw Top Plate
            this.ctx.fillStyle = oldBg;
            this.ctx.beginPath();
            this.ctx.moveTo(0, 0);
            this.ctx.lineTo(width, 0);
            for (let i = this.points.length - 1; i >= 0; i--) {
                this.ctx.lineTo(this.points[i].x, this.points[i].y - offset);
            }
            this.ctx.closePath();
            this.ctx.fill();

            // Draw Bottom Plate
            this.ctx.beginPath();
            this.ctx.moveTo(0, height);
            this.ctx.lineTo(width, height);
            for (let i = this.points.length - 1; i >= 0; i--) {
                this.ctx.lineTo(this.points[i].x, this.points[i].y + offset);
            }
            this.ctx.closePath();
            this.ctx.fill();

            // Draw Magma/Glow line in the crack
            if (progress > 0.05 && progress < 0.8) {
                const glowIntensity = Math.sin((progress - 0.05) / 0.75 * Math.PI);
                this.ctx.beginPath();
                for (let i = 0; i < this.points.length; i++) {
                    if (i === 0) this.ctx.moveTo(this.points[i].x, this.points[i].y - offset);
                    else this.ctx.lineTo(this.points[i].x, this.points[i].y - offset);
                }
                for (let i = this.points.length - 1; i >= 0; i--) {
                    this.ctx.lineTo(this.points[i].x, this.points[i].y + offset);
                }
                this.ctx.fillStyle = glowColor;
                this.ctx.globalAlpha = glowIntensity * 0.8;
                this.ctx.fill();
                this.ctx.globalAlpha = 1.0;
            }

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                this.canvas.style.display = 'none';
                this.isAnimating = false;
            }
        };

        requestAnimationFrame(animate);
    }
}

// Init system
const tectonicSystem = new TectonicFracture();

function toggleTectonicTheme() {
    const isDark = document.body.getAttribute('data-theme') === 'basalte';
    const newTheme = isDark ? 'calcaire' : 'basalte';
    
    // Trigger animation BEFORE switching CSS so it covers the screen
    tectonicSystem.trigger(!isDark);
    
    // Slight delay so the canvas renders the solid color before DOM updates
    setTimeout(() => {
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('tc_theme', newTheme);
    }, 50);
}

// Restore theme on load
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('tc_theme') || 'calcaire';
    document.body.setAttribute('data-theme', savedTheme);
});
