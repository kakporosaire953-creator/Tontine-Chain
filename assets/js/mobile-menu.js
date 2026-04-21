/* ============================================
   TontineChain - Menu Mobile
   Gestion du menu hamburger responsive
   ============================================ */

(function() {
    'use strict';
    
    // Attendre que le DOM soit chargé
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMenu);
    } else {
        initMenu();
    }
    
    function initMenu() {
        const menuToggle = document.querySelector('.menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        const body = document.body;
        
        // Vérification des éléments
        if (!menuToggle) {
            console.error('❌ Menu toggle button not found');
            return;
        }
        
        if (!navMenu) {
            console.error('❌ Nav menu not found');
            return;
        }
        
        console.log('✅ Menu elements found:', {
            menuToggle: menuToggle,
            navMenu: navMenu
        });
        
        // Toggle menu au clic sur le bouton
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const isOpen = body.classList.contains('menu-open');
            console.log('Menu toggle clicked. Current state:', isOpen ? 'open' : 'closed');
            
            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        });
        
        // Fermer le menu en cliquant sur un lien
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                console.log('Nav link clicked, closing menu');
                closeMenu();
            });
        });
        
        // Fermer le menu en cliquant sur l'overlay
        document.addEventListener('click', function(e) {
            if (body.classList.contains('menu-open')) {
                // Si le clic n'est ni sur le menu ni sur le bouton
                if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                    console.log('Overlay clicked, closing menu');
                    closeMenu();
                }
            }
        });
        
        // Fermer avec la touche Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && body.classList.contains('menu-open')) {
                console.log('Escape pressed, closing menu');
                closeMenu();
            }
        });
        
        function openMenu() {
            console.log('Opening menu...');
            body.classList.add('menu-open');
            menuToggle.setAttribute('aria-expanded', 'true');
            
            // Focus sur le premier lien
            setTimeout(function() {
                const firstLink = navMenu.querySelector('a');
                if (firstLink) {
                    firstLink.focus();
                }
            }, 100);
        }
        
        function closeMenu() {
            console.log('Closing menu...');
            body.classList.remove('menu-open');
            menuToggle.setAttribute('aria-expanded', 'false');
            
            // Remettre le focus sur le bouton
            setTimeout(function() {
                menuToggle.focus();
            }, 100);
        }
        
        // Initialisation ARIA
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-controls', 'nav-menu');
        menuToggle.setAttribute('aria-label', 'Menu de navigation');
        navMenu.setAttribute('id', 'nav-menu');
        
        console.log('✅ Menu mobile initialisé avec succès');
    }
})();
