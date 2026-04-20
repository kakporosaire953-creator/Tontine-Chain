/**
 * TontineChain - Menu Mobile Hamburger
 * Gestion du menu mobile avec animations fluides
 */

(function() {
    'use strict';

    // Éléments DOM
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;
    let overlay = null;

    // Créer l'overlay
    function createOverlay() {
        overlay = document.createElement('div');
        overlay.className = 'mobile-menu-overlay';
        overlay.addEventListener('click', closeMenu);
        body.appendChild(overlay);
    }

    // Ouvrir le menu
    function openMenu() {
        if (!overlay) createOverlay();
        
        menuToggle.classList.add('active');
        navMenu.classList.add('active');
        overlay.classList.add('active');
        body.classList.add('menu-open');
        
        // Accessibilité
        menuToggle.setAttribute('aria-expanded', 'true');
        navMenu.setAttribute('aria-hidden', 'false');
    }

    // Fermer le menu
    function closeMenu() {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
        body.classList.remove('menu-open');
        
        // Accessibilité
        menuToggle.setAttribute('aria-expanded', 'false');
        navMenu.setAttribute('aria-hidden', 'true');
    }

    // Toggle menu
    function toggleMenu() {
        if (navMenu.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    // Event listeners
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
        
        // Fermer le menu quand on clique sur un lien
        const menuLinks = navMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                // Petit délai pour permettre la navigation
                setTimeout(closeMenu, 300);
            });
        });

        // Fermer avec la touche Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                closeMenu();
            }
        });

        // Créer l'icône hamburger si elle n'existe pas
        if (!menuToggle.querySelector('.hamburger-icon')) {
            menuToggle.innerHTML = `
                <div class="hamburger-icon">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            `;
        }

        // Attributs d'accessibilité
        menuToggle.setAttribute('aria-label', 'Menu de navigation');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-controls', 'nav-menu');
        navMenu.setAttribute('id', 'nav-menu');
        navMenu.setAttribute('aria-hidden', 'true');
    }

    console.log('📱 Menu mobile initialized');
})();
