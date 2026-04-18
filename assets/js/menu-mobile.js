// Menu Mobile Simple
(function() {
    'use strict';
    
    function initMenu() {
        const toggle = document.querySelector('.mobile-menu-toggle');
        const menu = document.querySelector('.nav-menu');
        
        if (!toggle || !menu) return;
        
        // Toggle menu
        toggle.addEventListener('click', function() {
            menu.classList.toggle('active');
            const icon = this.querySelector('i');
            
            if (menu.classList.contains('active')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });
        
        // Fermer au clic sur un lien
        menu.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
                menu.classList.remove('active');
                toggle.querySelector('i').className = 'fas fa-bars';
            });
        });
        
        // Fermer au clic sur l'overlay
        menu.addEventListener('click', function(e) {
            if (e.target === this && this.classList.contains('active')) {
                this.classList.remove('active');
                toggle.querySelector('i').className = 'fas fa-bars';
            }
        });
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMenu);
    } else {
        initMenu();
    }
})();
