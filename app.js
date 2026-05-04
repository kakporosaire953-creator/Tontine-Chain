// Toggle Sidebar
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  const body = document.body;
  
  sidebar.classList.toggle('active');
  overlay.classList.toggle('active');
  body.classList.toggle('sidebar-open');
}

// Close sidebar when clicking outside on mobile
document.addEventListener('click', function(e) {
  const sidebar = document.getElementById('sidebar');
  const menuBtn = document.querySelector('.menu-btn');
  
  if (sidebar && sidebar.classList.contains('active')) {
    if (!sidebar.contains(e.target) && !menuBtn.contains(e.target)) {
      toggleSidebar();
    }
  }
});

// Active nav item
document.addEventListener('DOMContentLoaded', function() {
  const currentPage = window.location.pathname.split('/').pop();
  const navItems = document.querySelectorAll('.nav-item');
  
  navItems.forEach(item => {
    const href = item.getAttribute('href');
    if (href === currentPage) {
      navItems.forEach(nav => nav.classList.remove('active'));
      item.classList.add('active');
    }
  });
});

// Topbar search
const topbarSearch = document.querySelector('.topbar-search input');
if (topbarSearch) {
  topbarSearch.addEventListener('focus', function() {
    this.parentElement.classList.add('focused');
  });
  
  topbarSearch.addEventListener('blur', function() {
    this.parentElement.classList.remove('focused');
  });
}
