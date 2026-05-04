const translations = {
    fr: {
        "nav.problem": "Problème",
        "nav.solution": "Solution",
        "nav.features": "Fonctionnalités",
        "nav.how": "Comment ça marche",
        "nav.faq": "FAQ",
        "nav.login": "Connexion",
        "nav.start": "Commencer",
        "dash.home": "Dashboard",
        "dash.mytontines": "Mes Tontines",
        "dash.create": "Créer une Tontine",
        "dash.join": "Rejoindre",
        "dash.payments": "Paiements",
        "dash.messages": "Messagerie",
        "dash.assistant": "Assistant YAO",
        "dash.profile": "Mon Profil",
        "dash.settings": "Paramètres",
        "dash.logout": "Déconnexion"
    },
    fon: {
        "nav.problem": "Tagba",
        "nav.solution": "Al?g?",
        "nav.features": "Az? l?",
        "nav.how": "Le e n? waz? gb?n",
        "nav.faq": "Nùkanby? l?",
        "nav.login": "Bi gbè",
        "nav.start": "B??",
        "dash.home": "Kp?n t?n",
        "dash.mytontines": "Tontine ce l?",
        "dash.create": "Blo Tontine y?y?",
        "dash.join": "G? na",
        "dash.payments": "Aku? susu",
        "dash.messages": "W?n l?",
        "dash.assistant": "Al?g?t? YAO",
        "dash.profile": "Nyik? ce",
        "dash.settings": "Tuto l?",
        "dash.logout": "T?n"
    }
};

let currentLang = localStorage.getItem('tontine_lang') || 'fr';

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('tontine_lang', lang);
    
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            let badge = '';
            // Preserve badges (like the NEW or notification badges)
            const badgeEl = el.querySelector('.badge-new, .badge-notif');
            if (badgeEl) {
                badge = badgeEl.outerHTML;
            }
            
            const icon = el.querySelector('i');
            if (icon) {
                el.innerHTML = icon.outerHTML + ' <span>' + translations[lang][key] + '</span> ' + badge;
            } else {
                el.innerText = translations[lang][key];
            }
        }
    });

    document.querySelectorAll('.langToggleBtn').forEach(btn => {
        btn.innerText = lang === 'fr' ? 'FON' : 'FR';
    });
}

function toggleLanguage() {
    setLanguage(currentLang === 'fr' ? 'fon' : 'fr');
}

document.addEventListener("DOMContentLoaded", () => {
    setLanguage(currentLang);
    document.querySelectorAll('.langToggleBtn').forEach(btn => {
        btn.addEventListener('click', toggleLanguage);
    });
});
