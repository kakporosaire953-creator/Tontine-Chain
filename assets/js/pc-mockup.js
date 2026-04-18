// ============================================
// TontineChain - PC Mockup Interactif
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const pcContainer = document.querySelector('.pc-container');
    const pcImage = document.querySelector('.pc-image');
    
    if (!pcContainer || !pcImage) return;
    
    // Effet 3D au mouvement de la souris
    pcContainer.addEventListener('mousemove', function(e) {
        const rect = pcContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * 10;
        const rotateY = ((x - centerX) / centerX) * -10;
        
        pcContainer.style.transform = `perspective(1500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });
    
    // Retour à la position normale
    pcContainer.addEventListener('mouseleave', function() {
        pcContainer.style.transform = 'perspective(1500px) rotateX(0deg) rotateY(0deg) scale(1)';
    });
    
    // Effet parallaxe au scroll
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero');
        
        if (heroSection && pcContainer) {
            const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
            
            if (scrolled < heroBottom) {
                const parallaxValue = scrolled * 0.2;
                pcContainer.style.transform = `translateY(${parallaxValue}px)`;
            }
        }
    });
    
    // Animation d'entrée au chargement
    setTimeout(() => {
        pcContainer.style.opacity = '1';
        pcContainer.style.transform = 'translateY(0)';
    }, 300);
    
    // Style initial pour l'animation
    pcContainer.style.opacity = '0';
    pcContainer.style.transform = 'translateY(30px)';
    pcContainer.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    
    console.log('💻 PC Mockup interactif initialisé');
    console.log('🖱️ Déplacez la souris sur le PC pour voir l\'effet 3D');
});
