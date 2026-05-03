// ============================================
// TontineChain - App Navigation
// Sidebar toggle for mobile
// ============================================

(function() {
  'use strict';

  // Sidebar toggle for mobile
  const toggle = document.getElementById('sidebarToggle');
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.createElement('div');
  overlay.className = 'sidebar-overlay';
  
  if (toggle && sidebar) {
    function openSidebar() {
      document.body.classList.add('sidebar-open');
      document.body.appendChild(overlay);
      toggle.setAttribute('aria-expanded', 'true');
      
      // Animate spans to X
      const spans = toggle.querySelectorAll('span');
      if (spans[0]) spans[0].style.transform = 'translateY(8px) rotate(45deg)';
      if (spans[1]) spans[1].style.opacity = '0';
      if (spans[2]) spans[2].style.transform = 'translateY(-8px) rotate(-45deg)';
    }
    
    function closeSidebar() {
      document.body.classList.remove('sidebar-open');
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
      toggle.setAttribute('aria-expanded', 'false');
      
      // Animate spans back to hamburger
      const spans = toggle.querySelectorAll('span');
      if (spans[0]) spans[0].style.transform = '';
      if (spans[1]) spans[1].style.opacity = '';
      if (spans[2]) spans[2].style.transform = '';
    }
    
    toggle.addEventListener('click', function(e) {
      e.stopPropagation();
      document.body.classList.contains('sidebar-open') ? closeSidebar() : openSidebar();
    });
    
    overlay.addEventListener('click', closeSidebar);
    
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && document.body.classList.contains('sidebar-open')) {
        closeSidebar();
      }
    });
    
    window.addEventListener('resize', function() {
      if (window.innerWidth > 900 && document.body.classList.contains('sidebar-open')) {
        closeSidebar();
      }
    });
  }
  
  // Mark active nav link
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.sidebar-menu a');
  navLinks.forEach(function(link) {
    if (link.getAttribute('href') && currentPath.includes(link.getAttribute('href'))) {
      link.classList.add('active');
    }
  });
})();
