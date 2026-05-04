// Toggle mobile menu
function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  const icon = document.getElementById('menuIcon');
  
  menu.classList.toggle('active');
  
  if (menu.classList.contains('active')) {
    icon.classList.remove('fa-bars');
    icon.classList.add('fa-times');
  } else {
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
  }
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.mobile-menu a').forEach(link => {
  link.addEventListener('click', () => {
    const menu = document.getElementById('mobileMenu');
    const icon = document.getElementById('menuIcon');
    
    menu.classList.remove('active');
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
  });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Toggle FAQ
function toggleFaq(id) {
  const answer = document.getElementById(id);
  const icon = document.getElementById(id + '-icon');
  
  // Close all other FAQs
  document.querySelectorAll('.faq-answer').forEach(item => {
    if (item.id !== id && item.classList.contains('active')) {
      item.classList.remove('active');
      const otherIcon = document.getElementById(item.id + '-icon');
      if (otherIcon) {
        otherIcon.classList.remove('rotate');
      }
    }
  });
  
  // Toggle current FAQ
  answer.classList.toggle('active');
  icon.classList.toggle('rotate');
}


// ===== ANIMATIONS DE SLIDE ET COMPTEUR =====
document.addEventListener("DOMContentLoaded", function() {
    // 1. Slide Animations
    const slideElements = document.querySelectorAll('.scroll-reveal, .card, .stat-box, .problem-card, .solution-card, .step-card, .feature-card, .architecture-card, .hero-left, .hero-right');
    
    slideElements.forEach(el => {
        el.classList.add('slide-up');
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Animer une seule fois
            }
        });
    }, { threshold: 0.1 });

    slideElements.forEach(el => observer.observe(el));

    // 2. Compteur Animé (Numbers Counter)
    const counters = document.querySelectorAll('.stat-number, .stat-box-number');
    const speed = 100; // Plus c'est bas, plus c'est rapide

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                if(counter.classList.contains('counted')) return;
                
                counter.classList.add('counted');
                const text = counter.innerText;
                const target = parseInt(text.replace(/[^0-9]/g, '')); // Extraire le nombre
                const prefix = text.match(/^[^0-9]*/) ? text.match(/^[^0-9]*/)[0] : '';
                const suffix = text.replace(/^[^0-9]*[0-9]+/, ''); // Extraire le suffixe (Mds, +, etc)

                if(target > 0) {
                    const inc = target / speed;
                    let count = 0;
                    
                    const updateCount = () => {
                        count += inc;
                        if (count < target) {
                            counter.innerText = prefix + Math.ceil(count) + suffix;
                            requestAnimationFrame(updateCount);
                        } else {
                            counter.innerText = prefix + target + suffix;
                        }
                    };
                    updateCount();
                }
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
});

