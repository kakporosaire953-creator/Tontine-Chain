/* ============================================
   TontineChain - Menu Mobile
   Gestion du menu hamburger responsive
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;
    const navLinks = document.querySelectorAll('.nav-menu a');

    if (!menuToggle || !navMenu) {
        console.warn('Menu mobile: Éléments non trouvés');
        return;
    }

    // Toggle menu
    menuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMenu();
    });

    // Fermer le menu en cliquant sur un lien
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMenu();
        });
    });

    // Fermer le menu en cliquant sur l'overlay
    document.addEventListener('click', function(e) {
        if (body.classList.contains('menu-open') && 
            !navMenu.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            closeMenu();
        }
    });

    // Fermer avec la touche Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && body.classList.contains('menu-open')) {
            closeMenu();
        }
    });

    // Gestion du focus trap
    const focusableElements = navMenu.querySelectorAll(
        'a[href], button:not([disabled])'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    navMenu.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    e.preventDefault();
                    lastFocusable.focus();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    e.preventDefault();
                    firstFocusable.focus();
                }
            }
        }
    });

    function toggleMenu() {
        const isOpen = body.classList.toggle('menu-open');
        menuToggle.setAttribute('aria-expanded', isOpen);
        
        if (isOpen) {
            // Focus sur le premier élément du menu
            setTimeout(() => {
                firstFocusable?.focus();
            }, 100);
        }
    }

    function closeMenu() {
        body.classList.remove('menu-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.focus();
    }

    // Initialisation ARIA
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-controls', 'nav-menu');
    navMenu.setAttribute('id', 'nav-menu');

    console.log('✅ Menu mobile initialisé');
});
