/**
 * TontineChain - FAQ Accordion
 * Gestion interactive des questions/réponses
 */

document.addEventListener('DOMContentLoaded', function() {
    initFAQ();
});

function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.closest('.faq-item');
            const isActive = faqItem.classList.contains('active');
            
            // Fermer tous les autres items de la même catégorie (optionnel)
            // const category = faqItem.closest('.faq-category');
            // category.querySelectorAll('.faq-item').forEach(item => {
            //     item.classList.remove('active');
            //     item.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            // });
            
            // Toggle l'item actuel
            if (isActive) {
                faqItem.classList.remove('active');
                this.setAttribute('aria-expanded', 'false');
            } else {
                faqItem.classList.add('active');
                this.setAttribute('aria-expanded', 'true');
            }
        });
        
        // Accessibilité clavier
        question.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Ouvrir automatiquement la première question (optionnel)
    // const firstQuestion = document.querySelector('.faq-question');
    // if (firstQuestion) {
    //     firstQuestion.click();
    // }
}

// Fonction pour ouvrir une question spécifique via URL hash
// Exemple: #faq-q1
function openFAQFromHash() {
    const hash = window.location.hash;
    if (hash && hash.startsWith('#faq-')) {
        const questionId = hash.substring(1);
        const question = document.getElementById(questionId);
        if (question) {
            question.click();
            question.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
}

// Écouter les changements de hash
window.addEventListener('hashchange', openFAQFromHash);
window.addEventListener('load', openFAQFromHash);
