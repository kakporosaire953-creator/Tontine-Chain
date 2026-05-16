const fs = require('fs');

const files = [
    "assistant-yao.html", "create-tontine.html", "dashboard.html", 
    "index.html", "join-tontine.html", "login.html", 
    "mes-tontines.html", "messagerie.html", "paiement.html", 
    "profil.html", "signup.html"
];

const script_tag = '\n  <script src="i18n.js"></script>\n';

files.forEach(filename => {
    if (fs.existsSync(filename)) {
        let content = fs.readFileSync(filename, 'utf8');
        
        if (!content.includes('i18n.js')) {
            if (content.includes('</body>')) {
                content = content.replace('</body>', script_tag + '</body>');
                fs.writeFileSync(filename, content, 'utf8');
                console.log(`Updated ${filename}`);
            } else {
                console.log(`Warning: </body> not found in ${filename}`);
            }
        } else {
            console.log(`Already updated: ${filename}`);
        }
    }
});
