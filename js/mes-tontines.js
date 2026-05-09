// Filter tabs
const filterTabs = document.querySelectorAll('.filter-tab');
const tontineCards = document.querySelectorAll('.tontine-detailed-card');

filterTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // Remove active class from all tabs
    filterTabs.forEach(t => t.classList.remove('active'));
    // Add active class to clicked tab
    tab.classList.add('active');
    
    const filter = tab.getAttribute('data-filter');
    
    // Filter tontines
    tontineCards.forEach(card => {
      const status = card.getAttribute('data-status');
      
      if (filter === 'all' || status === filter) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

