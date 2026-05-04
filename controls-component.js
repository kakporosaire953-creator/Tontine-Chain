// Composant réutilisable pour les contrôles de langue et thème

function createControlsHTML() {
  return `
    <div class="controls-wrapper">
      <div class="lang-switcher">
        <button class="lang-btn active" data-lang="fr">FR</button>
        <button class="lang-btn" data-lang="fon">FON</button>
      </div>
      <button class="theme-toggle" title="Changer le thème">
        <i class="fas fa-moon"></i>
      </button>
    </div>
  `;
}

// Fonction pour injecter les contrôles dans un élément
function injectControls(targetSelector) {
  const target = document.querySelector(targetSelector);
  if (target) {
    const controlsDiv = document.createElement('div');
    controlsDiv.innerHTML = createControlsHTML();
    target.appendChild(controlsDiv.firstElementChild);
  }
}

// Fonction pour ajouter les contrôles à la navbar
function addControlsToNavbar() {
  // Pour la page d'accueil (navbar)
  const navbarActions = document.querySelector('.navbar-actions');
  if (navbarActions) {
    const controlsDiv = document.createElement('div');
    controlsDiv.innerHTML = createControlsHTML();
    navbarActions.insertBefore(controlsDiv.firstElementChild, navbarActions.firstChild);
  }
}

// Fonction pour ajouter les contrôles à la sidebar
function addControlsToSidebar() {
  const sidebarHeader = document.querySelector('.sidebar-header');
  if (sidebarHeader) {
    const controlsDiv = document.createElement('div');
    controlsDiv.className = 'sidebar-controls';
    controlsDiv.style.marginTop = '16px';
    controlsDiv.innerHTML = createControlsHTML();
    sidebarHeader.appendChild(controlsDiv);
  }
}

// Fonction pour ajouter les contrôles aux pages d'authentification
function addControlsToAuthPages() {
  const authHeader = document.querySelector('.auth-header');
  const authContainer = document.querySelector('.auth-container');
  
  if (authHeader || authContainer) {
    const controlsDiv = document.createElement('div');
    controlsDiv.className = 'auth-controls';
    controlsDiv.style.position = 'absolute';
    controlsDiv.style.top = '24px';
    controlsDiv.style.right = '24px';
    controlsDiv.style.zIndex = '10';
    controlsDiv.innerHTML = createControlsHTML();
    
    if (authHeader) {
      authHeader.style.position = 'relative';
      authHeader.appendChild(controlsDiv);
    } else if (authContainer) {
      authContainer.style.position = 'relative';
      authContainer.appendChild(controlsDiv);
    }
  }
}

// Initialiser les contrôles au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
  // Détecter le type de page et ajouter les contrôles appropriés
  if (document.querySelector('.navbar')) {
    addControlsToNavbar();
  }
  
  if (document.querySelector('.sidebar')) {
    addControlsToSidebar();
  }
  
  if (document.querySelector('.auth-container') || document.querySelector('.auth-header')) {
    addControlsToAuthPages();
  }
  
  // Réinitialiser les écouteurs après injection
  setTimeout(() => {
    if (typeof setLanguage === 'function') {
      document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const lang = btn.getAttribute('data-lang');
          setLanguage(lang);
        });
      });
    }
    
    if (typeof toggleTheme === 'function') {
      document.querySelectorAll('.theme-toggle').forEach(btn => {
        btn.addEventListener('click', toggleTheme);
      });
    }
  }, 100);
});

// Export pour utilisation dans d'autres fichiers
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { createControlsHTML, injectControls, addControlsToNavbar, addControlsToSidebar, addControlsToAuthPages };
}
