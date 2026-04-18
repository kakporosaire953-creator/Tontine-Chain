/**
 * Script pour activer automatiquement le mode dark
 * Ajouter ce script dans les pages HTML pour activation automatique
 */

(function() {
    // Vérifier si ?dark=1 est dans l'URL
    const urlParams = new URLSearchParams(window.location.search);
    const darkMode = urlParams.get('dark');
    
    if (darkMode === '1') {
        // Activer immédiatement le mode dark
        document.documentElement.setAttribute('data-theme', 'dark');
        
        // Sauvegarder dans localStorage
        localStorage.setItem('theme', 'dark');
        
        console.log('✅ Mode dark activé automatiquement');
    }
})();
