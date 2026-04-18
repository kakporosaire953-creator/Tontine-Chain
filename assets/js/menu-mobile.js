/**
 * Menu Mobile - Version Finale
 */
(function() {
    'use strict';
    
    function initMobileMenu() {
        const toggle = document.querySelector('.mobile-menu-toggle');
        const menu = document.querySelector('.nav-menu');
        const body = document.body;
        
        if (!toggle || !menu) {
            console.warn('Menu mobile: éléments non trouvés');
            return;
        }
        
        console.log('✅ Menu mobile initialisé');
        
        // Toggle menu
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const isActive = menu.classList.contains('active');
            
            if (isActive) {
                // Fermer
                menu.classList.remove('active');
                body.classList.remove('menu-open');
                this.querySelector('i').className = 'fas fa-bars';
                console.log('Menu fermé');
            } else {
                // Ouvrir
                menu.classList.add('active');
                body.classList.add('menu-open');
                this.querySelector('i').className = 'fas fa-times';
                console.log('Menu ouvert');
            }
        });
        
        // Fermer au clic sur un lien
        const links = menu.querySelectorAll('a');
        links.forEach(function(link) {
            link.addEventListener('click', function() {
                menu.classList.remove('active');
                body.classList.remove('menu-open');
                toggle.querySelector('i').className = 'fas fa-bars';
                console.log('Menu fermé via lien');
            });
        });
        
        // Fermer au clic sur l'overlay
        body.addEventListener('click', function(e) {
            if (body.classList.contains('menu-open') && 
                !menu.contains(e.target) && 
                !toggle.contains(e.target)) {
                menu.classList.remove('active');
                body.classList.remove('menu-open');
                toggle.querySelector('i').className = 'fas fa-bars';
                console.log('Menu fermé via overlay');
            }
        });
    }
    
    // Initialiser quand le DOM est prêt
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMobileMenu);
    } else {
        initMobileMenu();
    }
})();
