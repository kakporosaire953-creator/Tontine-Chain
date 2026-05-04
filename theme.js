// Système de thème Dark/Light pour TontineChain

// Thème actuel
let currentTheme = localStorage.getItem('theme') || 'light';

// Fonction pour définir le thème
function setTheme(theme) {
  currentTheme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  
  // Mettre à jour l'icône du bouton
  const themeIcon = document.querySelector('.theme-toggle i');
  if (themeIcon) {
    if (theme === 'dark') {
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
    } else {
      themeIcon.classList.remove('fa-sun');
      themeIcon.classList.add('fa-moon');
    }
  }
  
  // Mettre à jour tous les boutons de thème
  document.querySelectorAll('.theme-toggle').forEach(btn => {
    const icon = btn.querySelector('i');
    if (icon) {
      if (theme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
      } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
      }
    }
  });
}

// Fonction pour basculer le thème
function toggleTheme() {
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  setTheme(newTheme);
}

// Initialiser le thème au chargement
document.addEventListener('DOMContentLoaded', () => {
  setTheme(currentTheme);
  
  // Ajouter les écouteurs sur les boutons de thème
  document.querySelectorAll('.theme-toggle').forEach(btn => {
    btn.addEventListener('click', toggleTheme);
  });
  
  // Détecter la préférence système si aucune préférence n'est sauvegardée
  if (!localStorage.getItem('theme')) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');
  }
});

// Export pour utilisation dans d'autres fichiers
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { setTheme, toggleTheme, currentTheme };
}
