/**
 * TontineChain - Professional Theme System
 * 
 * Système de thème moderne, performant et accessible
 */

(function() {
  'use strict';

  // Configuration
  const STORAGE_KEY = 'tontinechain-theme';
  const THEME_LIGHT = 'light';
  const THEME_DARK = 'dark';
  
  // État
  let currentTheme = THEME_LIGHT;
  
  /**
   * Initialisation au chargement
   */
  function init() {
    // Récupérer le thème sauvegardé ou utiliser DARK par défaut
    const savedTheme = localStorage.getItem(STORAGE_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // MODE DARK PAR DÉFAUT
    currentTheme = savedTheme || THEME_DARK;
    
    // Appliquer le thème sans transition
    document.body.classList.add('no-transition');
    applyTheme(currentTheme);
    
    // Retirer la classe no-transition après un court délai
    setTimeout(() => {
      document.body.classList.remove('no-transition');
    }, 50);
    
    // Créer le bouton toggle
    createToggleButton();
    
    // Écouter les changements de préférence système
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(STORAGE_KEY)) {
        applyTheme(e.matches ? THEME_DARK : THEME_LIGHT);
      }
    });
  }
  
  /**
   * Appliquer un thème
   */
  function applyTheme(theme) {
    const html = document.documentElement;
    
    if (theme === THEME_DARK) {
      html.setAttribute('data-theme', 'dark');
    } else {
      html.removeAttribute('data-theme');
    }
    
    currentTheme = theme;
    localStorage.setItem(STORAGE_KEY, theme);
    
    // Mettre à jour le bouton si il existe
    updateToggleButton();
    
    // Dispatch event pour d'autres scripts
    window.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
  }
  
  /**
   * Toggle entre les thèmes
   */
  function toggleTheme() {
    const newTheme = currentTheme === THEME_LIGHT ? THEME_DARK : THEME_LIGHT;
    applyTheme(newTheme);
  }
  
  /**
   * Créer le bouton toggle
   */
  function createToggleButton() {
    // Vérifier si le bouton existe déjà
    if (document.getElementById('theme-toggle-btn')) {
      return;
    }
    
    const button = document.createElement('button');
    button.id = 'theme-toggle-btn';
    button.setAttribute('aria-label', 'Changer de thème');
    button.setAttribute('type', 'button');
    button.innerHTML = `
      <i class="fas fa-sun icon-sun"></i>
      <i class="fas fa-moon icon-moon"></i>
    `;
    
    button.addEventListener('click', toggleTheme);
    
    document.body.appendChild(button);
    
    updateToggleButton();
  }
  
  /**
   * Mettre à jour l'état du bouton
   */
  function updateToggleButton() {
    const button = document.getElementById('theme-toggle-btn');
    if (!button) return;
    
    const isDark = currentTheme === THEME_DARK;
    button.setAttribute('aria-label', isDark ? 'Activer le mode clair' : 'Activer le mode sombre');
  }
  
  /**
   * API publique
   */
  window.TontineTheme = {
    toggle: toggleTheme,
    setTheme: applyTheme,
    getTheme: () => currentTheme,
    isDark: () => currentTheme === THEME_DARK,
    isLight: () => currentTheme === THEME_LIGHT
  };
  
  // Initialiser au chargement
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
})();
