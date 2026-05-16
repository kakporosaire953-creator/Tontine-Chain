import os

files = [
    "assistant-yao.html", "create-tontine.html", "dashboard.html", 
    "index.html", "join-tontine.html", "login.html", 
    "mes-tontines.html", "messagerie.html", "paiement.html", 
    "profil.html", "signup.html"
]

script_tag = '\n  <script src="i18n.js"></script>\n'

for filename in files:
    if os.path.exists(filename):
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
        
        if 'i18n.js' not in content:
            if '</body>' in content:
                content = content.replace('</body>', script_tag + '</body>')
                with open(filename, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"Updated {filename}")
            else:
                print(f"Warning: </body> not found in {filename}")
        else:
            print(f"Already updated: {filename}")
