/**
 * TontineChain - Premium Animations & Interactions
 * 
 * Animations fluides et interactions premium pour une UX exceptionnelle
 */

(function() {
  'use strict';

  // ══════════════════════════════════════════════════════════════
  // SCROLL REVEAL ANIMATIONS
  // ══════════════════════════════════════════════════════════════
  
  function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-up');
    
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => revealObserver.observe(el));
  }

  // ══════════════════════════════════════════════════════════════
  // PARALLAX EFFECT
  // ══════════════════════════════════════════════════════════════
  
  function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      
      parallaxElements.forEach(el => {
        const speed = el.dataset.speed || 0.5;
        const yPos = -(scrolled * speed);
        el.style.transform = `translateY(${yPos}px)`;
      });
    });
  }

  // ══════════════════════════════════════════════════════════════
  // SMOOTH SCROLL POUR LES ANCRES
  // ══════════════════════════════════════════════════════════════
  
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // ══════════════════════════════════════════════════════════════
  // RIPPLE EFFECT POUR LES BOUTONS
  // ══════════════════════════════════════════════════════════════
  
  function initRippleEffect() {
    document.querySelectorAll('.btn, .btn-primary, .btn-green, .btn-outline').forEach(button => {
      button.classList.add('btn-ripple');
    });
  }

  // ══════════════════════════════════════════════════════════════
  // COUNTER ANIMATION POUR LES STATS
  // ══════════════════════════════════════════════════════════════
  
  function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target.toLocaleString('fr-FR');
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current).toLocaleString('fr-FR');
      }
    }, 16);
  }

  function initCounterAnimations() {
    const counters = document.querySelectorAll('.stat-value, .stat-box-value, .projection-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const text = target.textContent.trim();
          const number = parseInt(text.replace(/[^0-9]/g, ''));
          
          if (!isNaN(number) && number > 0) {
            target.textContent = '0';
            animateCounter(target, number);
          }
          
          counterObserver.unobserve(target);
        }
      });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => counterObserver.observe(counter));
  }

  // ══════════════════════════════════════════════════════════════
  // HOVER EFFECT 3D POUR LES CARTES
  // ══════════════════════════════════════════════════════════════
  
  function init3DCardEffect() {
    const cards = document.querySelectorAll('.card, .tontine-card, .stat-box');
    
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
      });
    });
  }

  // ══════════════════════════════════════════════════════════════
  // LOADING SKELETON
  // ══════════════════════════════════════════════════════════════
  
  function showSkeleton(element) {
    element.classList.add('skeleton');
  }

  function hideSkeleton(element) {
    element.classList.remove('skeleton');
  }

  // ══════════════════════════════════════════════════════════════
  // NAVBAR SCROLL EFFECT
  // ══════════════════════════════════════════════════════════════
  
  function initNavbarScroll() {
    const navbar = document.querySelector('.navbar, nav');
    if (!navbar) return;
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
      } else {
        navbar.style.boxShadow = 'none';
      }
      
      // Auto-hide navbar on scroll down
      if (currentScroll > lastScroll && currentScroll > 500) {
        navbar.style.transform = 'translateY(-100%)';
      } else {
        navbar.style.transform = 'translateY(0)';
      }
      
      lastScroll = currentScroll;
    });
  }

  // ══════════════════════════════════════════════════════════════
  // LAZY LOADING IMAGES
  // ══════════════════════════════════════════════════════════════
  
  function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  }

  // ══════════════════════════════════════════════════════════════
  // TOAST NOTIFICATIONS
  // ══════════════════════════════════════════════════════════════
  
  function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      padding: 1rem 1.5rem;
      background: ${type === 'success' ? '#16a34a' : '#ef4444'};
      color: white;
      border-radius: 0.5rem;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
      z-index: 10000;
      animation: fadeInUp 0.3s ease-out;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.style.animation = 'fadeOut 0.3s ease-out';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // ══════════════════════════════════════════════════════════════
  // INITIALISATION
  // ══════════════════════════════════════════════════════════════
  
  function init() {
    // Vérifier si prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
      initScrollReveal();
      initParallax();
      init3DCardEffect();
      initCounterAnimations();
    }
    
    initSmoothScroll();
    initRippleEffect();
    initNavbarScroll();
    initLazyLoading();
  }

  // Démarrer quand le DOM est prêt
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Exposer les fonctions utiles
  window.TontineAnimations = {
    showToast,
    showSkeleton,
    hideSkeleton,
    animateCounter
  };

})();
