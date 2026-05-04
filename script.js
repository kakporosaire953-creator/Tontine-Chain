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

