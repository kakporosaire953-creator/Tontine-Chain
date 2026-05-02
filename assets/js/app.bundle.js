/**
 * TontineChain — app.bundle.js
 * Bundle consolidé : remplace les 10 fichiers JS séparés
 * (theme.js géré séparément car doit s'exécuter avant le rendu)
 *
 * Modules inclus :
 *  1. Scroll progress bar
 *  2. Navbar scroll + auto-hide
 *  3. Mobile menu (unique, sans doublons)
 *  4. Reveal on scroll (IntersectionObserver)
 *  5. Smooth scroll ancres
 *  6. Active nav link
 *  7. Lang toggle
 *  8. Counter animation sur les stats
 *  9. Button ripple effect
 * 10. Card tilt 3D (desktop)
 * 11. FAQ accordion
 * 12. Logo hover (particules dorées)
 * 13. Stagger containers
 */

(function () {
  'use strict';

  /* ─────────────────────────────────────────
     UTILITAIRES
  ───────────────────────────────────────── */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
  const ready = (fn) =>
    document.readyState === 'loading'
      ? document.addEventListener('DOMContentLoaded', fn)
      : fn();

  /* ─────────────────────────────────────────
     1. SCROLL PROGRESS BAR
  ───────────────────────────────────────── */
  function initScrollProgress() {
    const bar = document.createElement('div');
    bar.id = 'scroll-progress';
    document.body.prepend(bar);

    window.addEventListener('scroll', () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (window.scrollY / total * 100) + '%';
    }, { passive: true });
  }

  /* ─────────────────────────────────────────
     2. NAVBAR SCROLL EFFECT
  ───────────────────────────────────────── */
  function initNavbar() {
    const navbar = $('.navbar');
    if (!navbar) return;

    let lastY = 0;

    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      navbar.classList.toggle('scrolled', y > 60);

      // Auto-hide en descendant, réapparaît en remontant
      if (y > lastY && y > 400) {
        navbar.style.transform = 'translateY(-100%)';
      } else {
        navbar.style.transform = 'translateY(0)';
      }
      lastY = y;
    }, { passive: true });
  }

  /* ─────────────────────────────────────────
     3. MOBILE MENU (version unique)
  ───────────────────────────────────────── */
  function initMobileMenu() {
    const toggle  = $('.menu-toggle');
    const menu    = $('.nav-menu');
    const navbar  = $('.navbar');
    if (!toggle || !menu) return;

    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-controls', 'nav-menu');
    menu.id = 'nav-menu';

    const open = () => {
      menu.classList.add('mobile-open');
      toggle.classList.add('open');
      toggle.setAttribute('aria-expanded', 'true');
    };

    const close = () => {
      menu.classList.remove('mobile-open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    };

    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      menu.classList.contains('mobile-open') ? close() : open();
    });

    // Fermer sur clic lien
    $$('a', menu).forEach(a => a.addEventListener('click', close));

    // Fermer sur clic extérieur
    document.addEventListener('click', (e) => {
      if (!navbar?.contains(e.target)) close();
    });

    // Fermer sur Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
    });
  }

  /* ─────────────────────────────────────────
     4. REVEAL ON SCROLL
  ───────────────────────────────────────── */
  function initReveal() {
    const els = $$('.reveal-up');
    if (!els.length) return;

    if (!('IntersectionObserver' in window)) {
      els.forEach(el => el.classList.add('visible'));
      return;
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    els.forEach(el => io.observe(el));
  }

  /* ─────────────────────────────────────────
     5. SMOOTH SCROLL ANCRES (version unique)
  ───────────────────────────────────────── */
  function initSmoothScroll() {
    $$('a[href^="#"]').forEach(a => {
      a.addEventListener('click', (e) => {
        const href = a.getAttribute('href');
        if (href === '#') return;
        const target = $(href);
        if (!target) return;
        e.preventDefault();
        const offset = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: offset, behavior: 'smooth' });
      });
    });
  }

  /* ─────────────────────────────────────────
     6. ACTIVE NAV LINK AU SCROLL
  ───────────────────────────────────────── */
  function initActiveNav() {
    const sections = $$('section[id]');
    const links    = $$('.nav-menu a[href^="#"]');
    if (!sections.length || !links.length) return;

    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 120) current = s.id;
      });
      links.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + current);
      });
    }, { passive: true });
  }

  /* ─────────────────────────────────────────
     7. LANG TOGGLE
  ───────────────────────────────────────── */
  function initLangToggle() {
    const toggle = $('.lang-toggle');
    if (!toggle) return;

    $$('span', toggle).forEach(span => {
      span.addEventListener('click', () => {
        $$('span', toggle).forEach(s => s.classList.remove('active'));
        span.classList.add('active');
      });
    });
  }

  /* ─────────────────────────────────────────
     8. COUNTER ANIMATION SUR LES STATS
  ───────────────────────────────────────── */
  function initCounters() {
    const els = $$('.stat-value, .stat-visual-number, .projection-number');
    if (!els.length || !('IntersectionObserver' in window)) return;

    const easeOut = (t) => 1 - Math.pow(1 - t, 3);

    const animate = (el, target, duration = 1800) => {
      const start = performance.now();
      const isDecimal = String(target).includes('.');
      const step = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const value = easeOut(progress) * target;
        el.textContent = isDecimal
          ? value.toFixed(1)
          : Math.round(value).toLocaleString('fr-FR');
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const raw = el.dataset.count;
        if (!raw) return;
        animate(el, parseFloat(raw));
        io.unobserve(el);
      });
    }, { threshold: 0.5 });

    els.forEach(el => io.observe(el));
  }

  /* ─────────────────────────────────────────
     9. BUTTON RIPPLE
  ───────────────────────────────────────── */
  function initRipple() {
    const style = document.createElement('style');
    style.textContent = '@keyframes ripple{to{transform:scale(2.5);opacity:0;}}';
    document.head.appendChild(style);

    $$('.btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const r = document.createElement('span');
        r.style.cssText = `
          position:absolute;border-radius:50%;pointer-events:none;
          width:${size}px;height:${size}px;
          left:${e.clientX - rect.left - size / 2}px;
          top:${e.clientY - rect.top - size / 2}px;
          background:rgba(255,255,255,.25);
          transform:scale(0);animation:ripple .5s ease-out forwards;
        `;
        btn.style.position = 'relative';
        btn.style.overflow = 'hidden';
        btn.appendChild(r);
        setTimeout(() => r.remove(), 600);
      });
    });
  }

  /* ─────────────────────────────────────────
     10. CARD TILT 3D (desktop uniquement)
  ───────────────────────────────────────── */
  function initCardTilt() {
    if (!window.matchMedia('(hover: hover)').matches) return;

    $$('.step-card-new, .trust-card, .solution-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width  - 0.5;
        const y = (e.clientY - rect.top)  / rect.height - 0.5;
        card.style.transform = `translateY(-6px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
      });
      card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });
  }

  /* ─────────────────────────────────────────
     11. FAQ ACCORDION
  ───────────────────────────────────────── */
  function initFAQ() {
    $$('.faq-question').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item');
        const isOpen = item.classList.contains('active');
        item.classList.toggle('active', !isOpen);
        btn.setAttribute('aria-expanded', String(!isOpen));
      });

      btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          btn.click();
        }
      });
    });
  }

  /* ─────────────────────────────────────────
     12. LOGO — PARTICULES DORÉES AU SURVOL
  ───────────────────────────────────────── */
  function initLogoHover() {
    const logo = $('.navbar .logo-icon');
    if (!logo) return;

    const createParticle = () => {
      const rect = logo.getBoundingClientRect();
      const p = document.createElement('div');
      const size = Math.random() * 5 + 2;
      p.style.cssText = `
        position:fixed;width:${size}px;height:${size}px;border-radius:50%;
        background:#FFB81C;pointer-events:none;z-index:10000;
        left:${rect.left + rect.width / 2 + (Math.random() - .5) * 30}px;
        top:${rect.top + rect.height / 2 + (Math.random() - .5) * 30}px;
        box-shadow:0 0 ${size * 2}px #FFB81C;
      `;
      document.body.appendChild(p);
      const angle = Math.random() * Math.PI * 2;
      const dist  = 40 + Math.random() * 50;
      p.animate([
        { transform: 'translate(0,0) scale(1)', opacity: 1 },
        { transform: `translate(${Math.cos(angle)*dist}px,${Math.sin(angle)*dist}px) scale(0)`, opacity: 0 }
      ], { duration: 600 + Math.random() * 300, easing: 'ease-out' });
      setTimeout(() => p.remove(), 900);
    };

    let interval = null;
    logo.addEventListener('mouseenter', () => { interval = setInterval(createParticle, 80); });
    logo.addEventListener('mouseleave', () => { clearInterval(interval); interval = null; });
  }

  /* ─────────────────────────────────────────
     13. STAGGER CONTAINERS
  ───────────────────────────────────────── */
  function initStagger() {
    $$('.stagger-container').forEach(container => {
      [...container.children].forEach((child, i) => {
        child.style.setProperty('--stagger-index', i);
        child.classList.add('stagger-item');
      });
    });
  }

  /* ─────────────────────────────────────────
     INIT GLOBAL
  ───────────────────────────────────────── */
  ready(() => {
    initScrollProgress();
    initNavbar();
    initMobileMenu();
    initReveal();
    initSmoothScroll();
    initActiveNav();
    initLangToggle();
    initCounters();
    initRipple();
    initCardTilt();
    initFAQ();
    initLogoHover();
    initStagger();

    console.log('🇧🇯 TontineChain — app.bundle.js chargé');
  });

})();
