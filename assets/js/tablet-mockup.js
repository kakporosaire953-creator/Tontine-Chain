// ============================================
// TontineChain - Tablette Interactive Réaliste
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const mockupFrame = document.querySelector('.mockup-frame');
    const mockupContent = document.querySelector('.mockup-content');
    
    if (!mockupFrame || !mockupContent) return;
    
    // Données des tontines
    const tontines = [
        {
            name: 'Femmes Entrepreneures',
            members: 12,
            tour: 8,
            total: 12,
            cagnotte: '600,000 FCFA',
            progress: 66
        },
        {
            name: 'Commerçantes Dantokpa',
            members: 8,
            tour: 3,
            total: 8,
            cagnotte: '200,000 FCFA',
            progress: 37
        },
        {
            name: 'Artisanes Porto-Novo',
            members: 10,
            tour: 5,
            total: 10,
            cagnotte: '300,000 FCFA',
            progress: 50
        }
    ];
    
    let currentIndex = 0;
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    
    // Fonction pour mettre à jour la carte
    function updateTontineCard() {
        const tontine = tontines[currentIndex];
        const card = document.querySelector('.mockup-tontine-card');
        
        if (!card) return;
        
        // Animation de sortie
        card.style.opacity = '0';
        card.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            // Mise à jour du contenu
            card.querySelector('h4').textContent = tontine.name;
            card.querySelector('.progress-label span:first-child').textContent = `Tour ${tontine.tour}/${tontine.total}`;
            card.querySelector('.progress-label span:last-child').textContent = `${tontine.progress}%`;
            card.querySelector('.progress-fill').style.width = `${tontine.progress}%`;
            
            // Mise à jour des stats
            const statCards = document.querySelectorAll('.mockup-stat-card');
            if (statCards[0]) {
                statCards[0].querySelector('.stat-value').textContent = tontine.cagnotte;
            }
            
            // Animation d'entrée
            card.style.opacity = '1';
            card.style.transform = 'translateX(0)';
        }, 300);
    }
    
    // Rotation automatique toutes les 5 secondes
    setInterval(() => {
        currentIndex = (currentIndex + 1) % tontines.length;
        updateTontineCard();
    }, 5000);
    
    // Interaction avec la tablette - Mouvement 3D
    mockupFrame.addEventListener('mousedown', function(e) {
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        mockupFrame.style.transition = 'none';
    });
    
    document.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;
        
        const rotateY = (deltaX / window.innerWidth) * 30;
        const rotateX = -(deltaY / window.innerHeight) * 30;
        
        mockupFrame.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
    });
    
    document.addEventListener('mouseup', function() {
        if (isDragging) {
            isDragging = false;
            mockupFrame.style.transition = 'transform 0.5s ease';
            mockupFrame.style.transform = 'rotateY(0deg) rotateX(0deg)';
        }
    });
    
    // Interaction clavier pour navigation
    document.addEventListener('keydown', function(e) {
        if (!mockupFrame) return;
        
        mockupFrame.style.transition = 'transform 0.3s ease';
        
        switch(e.key) {
            case 'ArrowLeft':
                mockupFrame.classList.add('tilt-left');
                setTimeout(() => mockupFrame.classList.remove('tilt-left'), 300);
                currentIndex = (currentIndex - 1 + tontines.length) % tontines.length;
                updateTontineCard();
                break;
            case 'ArrowRight':
                mockupFrame.classList.add('tilt-right');
                setTimeout(() => mockupFrame.classList.remove('tilt-right'), 300);
                currentIndex = (currentIndex + 1) % tontines.length;
                updateTontineCard();
                break;
            case 'ArrowUp':
                mockupFrame.classList.add('tilt-up');
                setTimeout(() => mockupFrame.classList.remove('tilt-up'), 300);
                break;
            case 'ArrowDown':
                mockupFrame.classList.add('tilt-down');
                setTimeout(() => mockupFrame.classList.remove('tilt-down'), 300);
                break;
        }
    });
    
    // Interaction tactile pour mobile
    let touchStartX = 0;
    let touchStartY = 0;
    
    mockupFrame.addEventListener('touchstart', function(e) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    });
    
    mockupFrame.addEventListener('touchmove', function(e) {
        if (!touchStartX || !touchStartY) return;
        
        const touchEndX = e.touches[0].clientX;
        const touchEndY = e.touches[0].clientY;
        
        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;
        
        const rotateY = (deltaX / window.innerWidth) * 20;
        const rotateX = -(deltaY / window.innerHeight) * 20;
        
        mockupFrame.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
    });
    
    mockupFrame.addEventListener('touchend', function() {
        mockupFrame.style.transition = 'transform 0.5s ease';
        mockupFrame.style.transform = 'rotateY(0deg) rotateX(0deg)';
        touchStartX = 0;
        touchStartY = 0;
    });
    
    // Interaction avec les boutons
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Animation de clic
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Effet visuel
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.width = '100%';
            ripple.style.height = '100%';
            ripple.style.top = '0';
            ripple.style.left = '0';
            ripple.style.background = 'rgba(255, 255, 255, 0.5)';
            ripple.style.borderRadius = '12px';
            ripple.style.pointerEvents = 'none';
            ripple.style.animation = 'ripple 0.6s ease-out';
            
            this.style.position = 'relative';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Animation de la notification
    const notifBadge = document.querySelector('.notif-badge');
    if (notifBadge) {
        setInterval(() => {
            notifBadge.style.animation = 'none';
            setTimeout(() => {
                notifBadge.style.animation = 'pulse 1s ease-in-out';
            }, 10);
        }, 5000);
    }
    
    // Animation de la barre de progression
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const width = progressFill.style.width;
                    progressFill.style.width = '0%';
                    setTimeout(() => {
                        progressFill.style.width = width;
                    }, 100);
                }
            });
        });
        
        observer.observe(progressFill);
    }
    
    // Effet parallaxe au scroll
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero');
        
        if (heroSection && mockupFrame) {
            const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
            
            if (scrolled < heroBottom) {
                const parallaxValue = scrolled * 0.3;
                mockupFrame.style.transform = `translateY(${parallaxValue}px) rotateY(0deg) rotateX(0deg)`;
            }
        }
    });
    
    console.log('📱 Tablette interactive réaliste initialisée');
    console.log('💡 Utilisez les flèches du clavier ou glissez la souris pour interagir');
});

// Animation CSS pour le ripple
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        0% {
            opacity: 1;
            transform: scale(0);
        }
        100% {
            opacity: 0;
            transform: scale(2);
        }
    }
    
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.2);
        }
    }
    
    .mockup-tontine-card {
        transition: opacity 0.3s ease, transform 0.3s ease;
    }
    
    .progress-fill {
        transition: width 1s ease-out;
    }
    
    .action-btn {
        transition: transform 0.15s ease;
    }
`;
document.head.appendChild(style);
