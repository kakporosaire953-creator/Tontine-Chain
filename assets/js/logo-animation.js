// ============================================
// TontineChain - Animation Logo Poisson-Scie
// Symbole BCEAO des pièces CFA
// Animations JavaScript Premium
// ============================================

document.addEventListener('DOMContentLoaded', function () {
    // ── Sélection du logo principal (navbar) ──
    const mainLogo = document.querySelector('.navbar .logo-icon');
    if (!mainLogo) return;

    // ── Éléments du logo ──
    const coinBorderInner = mainLogo.querySelector('.coin-border-inner');
    const sawfishBody = mainLogo.querySelector('.sawfish-body');
    const teeth = mainLogo.querySelectorAll('.tooth');
    const sawfishEye = mainLogo.querySelector('.sawfish-eye');
    const armLeft = mainLogo.querySelector('.sawfish-arm-left');
    const armRight = mainLogo.querySelector('.sawfish-arm-right');
    const legLeft = mainLogo.querySelector('.sawfish-leg-left');
    const legRight = mainLogo.querySelector('.sawfish-leg-right');
    const coinShine = mainLogo.querySelector('.coin-shine');

    // ══════════════════════════════════════════
    // 1. ANIMATION D'ENTRÉE CINÉMATIQUE
    // ══════════════════════════════════════════
    function cinematicEntrance() {
        mainLogo.style.opacity = '0';
        mainLogo.style.transform = 'scale(0.3) rotateY(-180deg)';

        requestAnimationFrame(() => {
            mainLogo.style.transition = 'all 1s cubic-bezier(0.34, 1.56, 0.64, 1)';
            mainLogo.style.opacity = '1';
            mainLogo.style.transform = 'scale(1) rotateY(0deg)';

            // Apparition séquentielle des dents du rostre
            teeth.forEach((tooth, i) => {
                tooth.style.opacity = '0';
                tooth.style.transform = 'scaleX(0)';
                setTimeout(() => {
                    tooth.style.transition = 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
                    tooth.style.opacity = '1';
                    tooth.style.transform = 'scaleX(1)';
                    tooth.style.transformOrigin = 'center';
                }, 800 + i * 150);
            });

            // Flash de l'œil doré
            if (sawfishEye) {
                setTimeout(() => {
                    sawfishEye.style.transition = 'all 0.5s ease';
                    sawfishEye.setAttribute('r', '8');
                    sawfishEye.style.opacity = '1';
                    setTimeout(() => {
                        sawfishEye.setAttribute('r', '5');
                        sawfishEye.style.opacity = '0.9';
                    }, 300);
                }, 1200);
            }
        });
    }
    cinematicEntrance();

    // ══════════════════════════════════════════
    // 2. ROTATION DU BORD POINTILLÉ
    // ══════════════════════════════════════════
    let borderRotation = 0;
    function rotateBorder() {
        borderRotation += 0.25;
        if (coinBorderInner) {
            coinBorderInner.style.transform = `rotate(${borderRotation}deg)`;
            coinBorderInner.style.transformOrigin = '100px 100px';
        }
        requestAnimationFrame(rotateBorder);
    }
    rotateBorder();

    // ══════════════════════════════════════════
    // 3. SHIMMER CASCADE SUR LES DENTS
    // ══════════════════════════════════════════
    function shimmerTeeth() {
        teeth.forEach((tooth, i) => {
            setTimeout(() => {
                const origFill = tooth.getAttribute('fill');
                tooth.style.transition = 'fill 0.3s ease, filter 0.3s ease';
                tooth.setAttribute('fill', '#FFD700');
                tooth.style.filter = 'drop-shadow(0 0 3px #FFD700)';

                setTimeout(() => {
                    tooth.setAttribute('fill', '#1B5E20');
                    tooth.style.filter = 'none';
                }, 250);
            }, i * 120);
        });
    }
    setInterval(shimmerTeeth, 4500);
    setTimeout(shimmerTeeth, 2000);

    // ══════════════════════════════════════════
    // 4. BRILLANCE DE L'ŒIL (PULSE DORÉ)
    // ══════════════════════════════════════════
    function pulseEye() {
        if (!sawfishEye) return;
        sawfishEye.style.transition = 'all 0.6s ease';
        sawfishEye.setAttribute('r', '7');
        sawfishEye.style.opacity = '1';
        sawfishEye.style.filter = 'drop-shadow(0 0 5px #FFD700)';

        setTimeout(() => {
            sawfishEye.setAttribute('r', '5');
            sawfishEye.style.opacity = '0.9';
            sawfishEye.style.filter = 'none';
        }, 400);
    }
    setInterval(pulseEye, 3500);

    // ══════════════════════════════════════════
    // 5. REFLET QUI SE DÉPLACE
    // ══════════════════════════════════════════
    let shinePhase = 0;
    function animateShine() {
        shinePhase += 0.015;
        if (coinShine) {
            const cx = 72 + Math.sin(shinePhase) * 15;
            const cy = 55 + Math.cos(shinePhase * 0.7) * 10;
            const opacity = 0.08 + Math.sin(shinePhase * 1.5) * 0.06;
            coinShine.setAttribute('cx', cx);
            coinShine.setAttribute('cy', cy);
            coinShine.style.opacity = opacity;
        }
        requestAnimationFrame(animateShine);
    }
    animateShine();

    // ══════════════════════════════════════════
    // 6. PARTICULES DORÉES AU SURVOL
    // ══════════════════════════════════════════
    function createGoldenParticle(logo) {
        const rect = logo.getBoundingClientRect();
        const particle = document.createElement('div');
        particle.className = 'golden-particle';

        const size = Math.random() * 6 + 2;
        const startX = rect.left + rect.width / 2 + (Math.random() - 0.5) * 30;
        const startY = rect.top + rect.height / 2 + (Math.random() - 0.5) * 30;

        particle.style.cssText = `
            position: fixed;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: #FFD700; /* radial-gradient removed */
            pointer-events: none;
            z-index: 10000;
            left: ${startX}px;
            top: ${startY}px;
            box-shadow: 0 0 ${size * 2}px #FFD700;
        `;
        document.body.appendChild(particle);

        const angle = Math.random() * Math.PI * 2;
        const distance = 40 + Math.random() * 60;
        const duration = 600 + Math.random() * 400;

        particle.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`, opacity: 0 }
        ], {
            duration: duration,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });

        setTimeout(() => particle.remove(), duration);
    }

    let particleInterval = null;

    // ══════════════════════════════════════════
    // 7. INTERACTIONS AU SURVOL
    // ══════════════════════════════════════════
    let isHovering = false;

    mainLogo.addEventListener('mouseenter', function () {
        isHovering = true;
        this.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.4s ease';
        this.style.transform = 'scale(1.15)';
        this.style.filter = 'drop-shadow(0 0 14px rgba(255, 215, 0, 0.7))';

        shimmerTeeth();

        if (sawfishEye) {
            sawfishEye.style.filter = 'drop-shadow(0 0 6px #FFD700)';
        }

        particleInterval = setInterval(() => createGoldenParticle(this), 100);
    });

    mainLogo.addEventListener('mouseleave', function () {
        isHovering = false;
        this.style.transform = 'scale(1)';
        this.style.filter = '';

        if (sawfishEye) {
            sawfishEye.style.filter = 'none';
        }

        if (particleInterval) {
            clearInterval(particleInterval);
            particleInterval = null;
        }
    });

    // ══════════════════════════════════════════
    // 8. FLIP 3D AU CLIC (PIÈCE QUI TOURNE)
    // ══════════════════════════════════════════
    mainLogo.addEventListener('click', function (e) {
        e.preventDefault();

        this.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        this.style.transform = 'rotateY(720deg) scale(1.15)';

        // Cascade dorée sur le symbole
        const greenParts = this.querySelectorAll('[fill="#1B5E20"]');
        greenParts.forEach((part, i) => {
            setTimeout(() => {
                part.setAttribute('fill', '#FFD700');
                setTimeout(() => {
                    part.setAttribute('fill', '#1B5E20');
                }, 200);
            }, i * 40);
        });

        // Burst de particules
        for (let i = 0; i < 18; i++) {
            setTimeout(() => createGoldenParticle(this), i * 30);
        }

        setTimeout(() => {
            this.style.transform = isHovering ? 'scale(1.15)' : 'scale(1)';
        }, 800);
    });

    // ══════════════════════════════════════════
    // 9. PARALLAXE AU SCROLL
    // ══════════════════════════════════════════
    let lastScrollY = 0;
    let ticking = false;

    function onScroll() {
        const currentY = window.pageYOffset;
        const diff = currentY - lastScrollY;

        if (coinBorderInner) {
            borderRotation += diff * 0.4;
        }

        lastScrollY = currentY;
        ticking = false;
    }

    window.addEventListener('scroll', function () {
        if (!ticking) {
            requestAnimationFrame(onScroll);
            ticking = true;
        }
    });

    // ══════════════════════════════════════════
    // 10. HALO AMBIANT SUBTIL
    // ══════════════════════════════════════════
    let glowPhase = 0;
    function ambientGlow() {
        glowPhase += 0.012;
        if (!isHovering) {
            const intensity = 3 + Math.sin(glowPhase) * 2;
            const alpha = 0.25 + Math.sin(glowPhase * 0.7) * 0.1;
            mainLogo.style.filter = `drop-shadow(0 0 ${intensity}px rgba(255, 184, 28, ${alpha}))`;
        }
        requestAnimationFrame(ambientGlow);
    }
    ambientGlow();

    console.log('🐟💰 Logo Poisson-Scie BCEAO — Symbole authentique des pièces CFA');
});

// ══════════════════════════════════════════════
// STYLES CSS INJECTÉS
// ══════════════════════════════════════════════
const logoStyles = document.createElement('style');
logoStyles.textContent = `
    .logo-icon {
        cursor: pointer;
        transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.4s ease;
        overflow: visible;
        perspective: 1000px;
        transform-style: preserve-3d;
    }

    .sawfish-symbol { transition: transform 0.3s ease; }
    .sawfish-body { transition: transform 0.3s ease; }
    .tooth { transition: fill 0.3s ease, filter 0.3s ease; transform-origin: center; }
    .sawfish-eye { transition: all 0.4s ease; }
    .coin-border-inner { transition: transform 0.05s linear; }
    .coin-shine { transition: cx 0.1s linear, cy 0.1s linear; }
    .golden-particle { will-change: transform, opacity; }

    .nav-brand span {
        color: #404040; /* linear-gradient removed */
        animation: textShimmer 4s ease-in-out infinite;
    }

    @keyframes textShimmer {
        0%, 100% { background-position: 0% center; }
        50% { background-position: 200% center; }
    }
`;
document.head.appendChild(logoStyles);
