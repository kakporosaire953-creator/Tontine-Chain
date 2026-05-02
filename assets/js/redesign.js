/* ============================================================
   TontineChain — Redesign Interactions
   ============================================================ */

(function () {
  'use strict';

  /* ── Scroll progress bar ── */
  const progressBar = document.createElement('div');
  progressBar.id = 'scroll-progress';
  document.body.prepend(progressBar);

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = (scrolled / total * 100) + '%';
  }, { passive: true });

  /* ── Navbar scroll effect ── */
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    navbar?.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  /* ── Mobile menu ── */
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu    = document.querySelector('.nav-menu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      const open = navMenu.classList.toggle('mobile-open');
      menuToggle.classList.toggle('open', open);
      menuToggle.setAttribute('aria-expanded', open);
    });

    // Close on link click
    navMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navMenu.classList.remove('mobile-open');
        menuToggle.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on outside click
    document.addEventListener('click', e => {
      if (!navbar?.contains(e.target)) {
        navMenu.classList.remove('mobile-open');
        menuToggle.classList.remove('open');
      }
    });
  }

  /* ── Reveal on scroll (IntersectionObserver) ── */
  const revealEls = document.querySelectorAll('.reveal-up');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('visible'));
  }

  /* ── Smooth scroll for anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: offset, behavior: 'smooth' });
      }
    });
  });

  /* ── Active nav link on scroll ── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

  const activateLink = () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    navLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  };
  window.addEventListener('scroll', activateLink, { passive: true });

  /* ── Lang toggle ── */
  const langToggle = document.querySelector('.lang-toggle');
  if (langToggle) {
    langToggle.querySelectorAll('span').forEach(span => {
      span.addEventListener('click', () => {
        langToggle.querySelectorAll('span').forEach(s => s.classList.remove('active'));
        span.classList.add('active');
      });
    });
  }

  /* ── Counter animation for stats ── */
  const animateCounter = (el, target, duration = 1800) => {
    const start = performance.now();
    const isDecimal = target.toString().includes('.');
    const update = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = eased * target;
      el.textContent = isDecimal
        ? value.toFixed(1)
        : Math.round(value).toLocaleString('fr-FR');
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  };

  const statEls = document.querySelectorAll('.stat-value[data-count]');
  if ('IntersectionObserver' in window && statEls.length) {
    const statIO = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          animateCounter(el, parseFloat(el.dataset.count));
          statIO.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    statEls.forEach(el => statIO.observe(el));
  }

  /* ── Button ripple effect ── */
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      ripple.style.cssText = `
        position:absolute; border-radius:50%; pointer-events:none;
        width:${size}px; height:${size}px;
        left:${e.clientX - rect.left - size/2}px;
        top:${e.clientY - rect.top - size/2}px;
        background:rgba(255,255,255,.25);
        transform:scale(0); animation:ripple .5s ease-out forwards;
      `;
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Ripple keyframe
  const style = document.createElement('style');
  style.textContent = '@keyframes ripple{to{transform:scale(2.5);opacity:0;}}';
  document.head.appendChild(style);

  /* ── Card tilt on hover (desktop only) ── */
  if (window.matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('.step-card-new, .trust-card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width  - 0.5;
        const y = (e.clientY - rect.top)  / rect.height - 0.5;
        card.style.transform = `translateY(-6px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  console.log('🇧🇯 TontineChain Redesign loaded');
})();
