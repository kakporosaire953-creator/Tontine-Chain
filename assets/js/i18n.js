document.addEventListener('DOMContentLoaded', () => {
    const i18n = {
        currentLang: localStorage.getItem('tontine-lang') || 'fr',
        
        init() {
            // Forcer le français par défaut si aucune langue n'est stockée
            if (!localStorage.getItem('tontine-lang')) {
                localStorage.setItem('tontine-lang', 'fr');
                this.currentLang = 'fr';
            }
            
            this.captureOriginals();
            this.updateUI();
            this.setupToggle();
        },

        // Mémorise le contenu HTML d'origine pour servir de fallback parfait (Français par défaut)
        captureOriginals() {
            // Capturer les textes
            document.querySelectorAll('[data-i18n]').forEach(el => {
                if (!el.getAttribute('data-i18n-original')) {
                    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                        el.setAttribute('data-i18n-original', el.placeholder || '');
                    } else {
                        // On stocke le innerHTML complet pour garder les icônes et le style
                        el.setAttribute('data-i18n-original', el.innerHTML);
                    }
                }
            });

            // Capturer les placeholders et aria-labels
            document.querySelectorAll('[data-i18n-placeholder], [data-i18n-aria]').forEach(el => {
                const placeholderKey = el.getAttribute('data-i18n-placeholder');
                const ariaKey = el.getAttribute('data-i18n-aria');
                
                if (placeholderKey && !el.getAttribute('data-i18n-placeholder-original')) {
                    el.setAttribute('data-i18n-placeholder-original', el.placeholder || '');
                }
                if (ariaKey && !el.getAttribute('data-i18n-aria-original')) {
                    el.setAttribute('data-i18n-aria-original', el.getAttribute('aria-label') || '');
                }
            });
        },

        setupToggle() {
            const toggles = document.querySelectorAll('.lang-toggle');
            toggles.forEach(toggle => {
                this.updateToggleState(toggle);
                
                toggle.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.currentLang = this.currentLang === 'fr' ? 'fon' : 'fr';
                    localStorage.setItem('tontine-lang', this.currentLang);
                    this.updateUI();
                    
                    document.querySelectorAll('.lang-toggle').forEach(t => this.updateToggleState(t));
                });
            });
        },

        updateToggleState(toggle) {
            const frSpan = toggle.querySelector('.lang-fr');
            const fonSpan = toggle.querySelector('.lang-fon');
            if (frSpan && fonSpan) {
                if (this.currentLang === 'fr') {
                    frSpan.classList.add('active');
                    fonSpan.classList.remove('active');
                } else {
                    frSpan.classList.remove('active');
                    fonSpan.classList.add('active');
                }
            }
        },

        updateUI() {
            // 1. Traduction des contenus
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                const original = el.getAttribute('data-i18n-original');
                
                let translation = null;
                if (this.currentLang !== 'fr' && window.translations[this.currentLang]) {
                    translation = window.translations[this.currentLang][key];
                }

                // Appliquer la traduction ou l'original
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = translation || original;
                } else {
                    // Utiliser innerHTML pour préserver les icônes SI c'est l'original, 
                    // ou si la traduction contient délibérément du HTML.
                    el.innerHTML = translation || original;
                }
            });

            // 2. Traduction des placeholders et aria-labels
            document.querySelectorAll('[data-i18n-placeholder], [data-i18n-aria]').forEach(el => {
                const placeholderKey = el.getAttribute('data-i18n-placeholder');
                const ariaKey = el.getAttribute('data-i18n-aria');
                
                if (placeholderKey) {
                    const original = el.getAttribute('data-i18n-placeholder-original');
                    let translation = (this.currentLang !== 'fr') ? (window.translations[this.currentLang]?.[placeholderKey]) : null;
                    el.placeholder = translation || original;
                }

                if (ariaKey) {
                    const original = el.getAttribute('data-i18n-aria-original');
                    let translation = (this.currentLang !== 'fr') ? (window.translations[this.currentLang]?.[ariaKey]) : null;
                    if (translation || original) {
                        el.setAttribute('aria-label', translation || original);
                    }
                }
            });

            document.documentElement.lang = this.currentLang === 'fr' ? 'fr' : 'fon';
        }
    };

    window.i18n = i18n;
    i18n.init();
});
