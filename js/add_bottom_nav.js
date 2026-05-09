const fs = require('fs');

const pages = [
    'dashboard.html', 'mes-tontines.html', 'paiement.html', 
    'assistant-yao.html', 'profil.html', 'create-tontine.html', 'join-tontine.html'
];

pages.forEach(file => {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        
        const bottomNav = `
  <!-- Bottom Nav for Mobile -->
  <nav class="bottom-nav">
    <a href="dashboard.html" class="bottom-nav-item ${file === 'dashboard.html' ? 'active' : ''}">
      <i class="fas fa-th-large"></i>
      <span>Accueil</span>
    </a>
    <a href="mes-tontines.html" class="bottom-nav-item ${file === 'mes-tontines.html' ? 'active' : ''}">
      <i class="fas fa-users"></i>
      <span>Tontines</span>
    </a>
    <a href="paiement.html" class="bottom-nav-item ${file === 'paiement.html' ? 'active' : ''}">
      <i class="fas fa-credit-card"></i>
      <span>Paiement</span>
    </a>
    <a href="assistant-yao.html" class="bottom-nav-item ${file === 'assistant-yao.html' ? 'active' : ''}">
      <i class="fas fa-robot"></i>
      <span>YAO</span>
    </a>
    <a href="profil.html" class="bottom-nav-item ${file === 'profil.html' ? 'active' : ''}">
      <i class="fas fa-user"></i>
      <span>Profil</span>
    </a>
  </nav>
`;

        if (!content.includes('class="bottom-nav"')) {
            content = content.replace('</body>', bottomNav + '</body>');
            fs.writeFileSync(file, content, 'utf8');
            console.log(`Added bottom nav to ${file}`);
        }
    }
});
