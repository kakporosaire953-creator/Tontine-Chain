/**
 * ============================================
 * MENU MOBILE - VERSION PROFESSIONNELLE
 * ============================================
 * Fonctionnalités:
 * - Toggle menu hamburger
 * - Fermeture automatique après clic sur lien
 * - Fermeture au clic sur overlay
 * - Blocage scroll body
 * - Animation icône hamburger → croix
 * - Navigation clavier (Escape pour fermer)
 * - Accessibilité ARIA
 * ============================================
 */

(function() {
    'use strict';
    
    /**
     * Initialisation du menu mobile
     */
    function initMobileMenu() {
        // Sélection des éléments
        const toggle = document.querySelector('.mobile-menu-toggle');
        const menu = document.querySelector('.nav-menu');
        const body = document.body;
        const html = document.documentElement;
        
        // Vérification de l'existence des éléments
        if (!toggle || !menu) {
            console.warn('⚠️ Menu mobile: éléments non trouvés');
            return;
        }
        
        console.log('✅ Menu mobile: Initialisation réussie');
        
        /**
         * Ouvrir le menu
         */
        function openMenu() {
            menu.classList.add('active');
            body.classList.add('menu-open');
            toggle.setAttribute('aria-expanded', 'true');
            toggle.querySelector('i').className = 'fas fa-times';
            
            // Focus sur le premier lien
            const firstLink = menu.querySelector('a');
            if (firstLink) {
                setTimeout(() => firstLink.focus(), 100);
            }
            
            console.log('📱 Menu ouvert');
        }
        
        /**
         * Fermer le menu
         */
        function closeMenu() {
            menu.classList.remove('active');
            body.classList.remove('menu-open');
            toggle.setAttribute('aria-expanded', 'false');
            toggle.querySelector('i').className = 'fas fa-bars';
            
            console.log('📱 Menu fermé');
        }
        
        /**
         * Toggle menu (ouvrir/fermer)
         */
        function toggleMenu(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const isActive = menu.classList.contains('active');
            
            if (isActive) {
                closeMenu();
            } else {
                openMenu();
            }
        }
        
        /**
         * Event: Clic sur le bouton hamburger
         */
        toggle.addEventListener('click', toggleMenu);
        
        /**
         * Event: Clic sur un lien du menu
         */
        const links = menu.querySelectorAll('a');
        links.forEach(function(link) {
            link.addEventListener('click', function(e) {
                // Fermer le menu après un court délai
                setTimeout(closeMenu, 100);
                console.log('🔗 Lien cliqué:', this.textContent.trim());
            });
        });
        
        /**
         * Event: Clic sur les boutons de langue dans le menu mobile
         */
        const langButtons = menu.querySelectorAll('.lang-toggle-mobile span.lang-fr, .lang-toggle-mobile span.lang-fon');
        langButtons.forEach(function(btn) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                // Déclencher le changement de langue
                const langToggle = document.querySelector('.lang-toggle');
                if (langToggle) {
                    langToggle.click();
                }
                console.log('🌐 Langue changée:', this.textContent.trim());
            });
        });
        
        /**
         * Event: Clic sur l'overlay (en dehors du menu)
         */
        document.addEventListener('click', function(e) {
            if (body.classList.contains('menu-open')) {
                // Si clic en dehors du menu et du toggle
                if (!menu.contains(e.target) && !toggle.contains(e.target)) {
                    closeMenu();
                    console.log('🔲 Menu fermé via overlay');
                }
            }
        });
        
        /**
         * Event: Touche Escape pour fermer
         */
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && body.classList.contains('menu-open')) {
                closeMenu();
                toggle.focus();
                console.log('⌨️ Menu fermé via Escape');
            }
        });
        
        /**
         * Event: Redimensionnement de la fenêtre
         * Fermer le menu si on passe en desktop
         */
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                if (window.innerWidth > 968 && body.classList.contains('menu-open')) {
                    closeMenu();
                    console.log('🖥️ Menu fermé (passage en desktop)');
                }
            }, 250);
        });
        
        /**
         * Trap focus dans le menu quand ouvert
         */
        menu.addEventListener('keydown', function(e) {
            if (!body.classList.contains('menu-open')) return;
            
            if (e.key === 'Tab') {
                const focusableElements = menu.querySelectorAll('a, button');
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];
                
                // Si Shift+Tab sur le premier élément, aller au dernier
                if (e.shiftKey && document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
                // Si Tab sur le dernier élément, aller au premier
                else if (!e.shiftKey && document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        });
        
        /**
         * Initialiser l'attribut ARIA
         */
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-controls', 'nav-menu');
        menu.setAttribute('id', 'nav-menu');
        
        console.log('✅ Menu mobile: Tous les événements attachés');
    }
    
    /**
     * Démarrage quand le DOM est prêt
     */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMobileMenu);
    } else {
        initMobileMenu();
    }
    
})();
