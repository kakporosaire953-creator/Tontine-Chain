// ================================================
// TONTINECHAIN — Système de Traduction FR / FON Automatique
// ================================================

const I18N = {
  currentLang: localStorage.getItem('tc_lang') || 'fr',

  // Dictionnaire FR -> FON
  dict: {
    // Navigation & Boutons
    "Problème": "Tagba",
    "Solution": "Alɔ",
    "Fonctionnalités": "Nǔ e wɛ é sixu wà lɛ",
    "Comment ça marche": "Alě é nɔ w'azɔ̌ gbɔn é",
    "FAQ": "Nùkanbyɔ́",
    "Connexion": "Byɔ mɛ",
    "Commencer": "Bɛ̀",
    "S'inscrire": "Wlǎn nyikɔ",
    "Créer ma Tontine": "Bló asú ce",
    "Créer ma première tontine": "Bló asú ce nukɔntɔn",
    "Créer ma tontine maintenant": "Bló asú ce dìn",
    "Rejoindre une Tontine": "Byɔ asú ɖé mɛ",
    "Créer une Tontine": "Bló asú ɖé",
    "Rejoindre": "Byɔ mɛ",
    "Se Connecter": "Byɔ mɛ",
    "Déconnexion": "Tɔ́n",
    "Gérer": "Kpé nukún",
    "Voir Détails": "Kpɔ́n nǔ lɛ",

    // Dashboard
    "Dashboard": "Táblo",
    "Mes Tontines": "Asú ce lɛ",
    "Paiements": "Sùxó",
    "Messagerie": "Wɛn lɛ",
    "Assistant YAO": "Alɔdótɔ́ YAO",
    "Mon Profil": "Mɛ ce",
    "Paramètres": "Ðiɖe lɛ",
    "Nouvelle Tontine": "Asú yɔ̌yɔ́",
    "Total Épargné": "Akwɛ́ kplé bǐ",
    "Tontines Actives": "Asú e ɖò azɔ̌ wà wɛ lɛ",
    "Taux de Paiement": "Sùxó sín akɔ́",
    "Activité Récente": "Nǔ e jɛ yì é lɛ",

    // Home - Hero
    "Sécurisez vos": "Nya xɛsi nú",
    "avec la Blockchain": "kpó Blockchain kpó",
    "Smart Contracts Audités": "Smart Contracts e è kpɔ́n lɛ",
    "Données Chiffrées": "Dǒ e è sɔ́ nyì nǔ jlɛ̌ lɛ",
    "100% Transparent": "100% Mɔjɛmɛ",

    // Home - Textes
    "Le Problème": "Tagba ɔ",
    "La Solution": "Alɔ ɔ",
    "Sécurité Absolue": "Cyáncyán Bǐ",
    "Transparence Totale": "Mɔjɛmɛ Bǐ",
    "Automatisation": "Éɖée Kpé",
    "Questions Fréquentes": "Nùkanbyɔ́ hwɛhwɛ lɛ",
    
    // Auth
    "Adresse email": "E-mail",
    "Mot de passe": "Nyǐkɔgbè",
    "Prénom": "Nyikɔ",
    "Nom": "Tɔ́ nyikɔ",
    "Numéro de téléphone": "Tɛlɛfónu",
    "Confirmer le mot de passe": "Vɔ́ nyǐkɔgbè ɔ xlɛ́",
    "Se souvenir de moi": "Flín mì"
  },

  translateTextNode(node) {
    if (this.currentLang === 'fr') return; // Default is FR in HTML
    
    const text = node.nodeValue.trim();
    if (text === '') return;

    // Check if we have exact match
    if (this.dict[text]) {
      node.nodeValue = node.nodeValue.replace(text, this.dict[text]);
      // Save original for switching back
      if (!node.tcOriginal) node.tcOriginal = text;
    }
  },

  restoreTextNode(node) {
    if (node.tcOriginal) {
      node.nodeValue = node.nodeValue.replace(node.nodeValue.trim(), node.tcOriginal);
    }
  },

  walkDOM(node) {
    if (node.nodeType === 3) { // Text node
      if (this.currentLang === 'fon') {
        this.translateTextNode(node);
      } else {
        this.restoreTextNode(node);
      }
    } else if (node.nodeType === 1 && node.nodeName !== "SCRIPT" && node.nodeName !== "STYLE") {
      // Inputs placeholders
      if (node.placeholder) {
        if (this.currentLang === 'fon' && this.dict[node.placeholder]) {
          node.tcOriginalPlaceholder = node.placeholder;
          node.placeholder = this.dict[node.placeholder];
        } else if (this.currentLang === 'fr' && node.tcOriginalPlaceholder) {
          node.placeholder = node.tcOriginalPlaceholder;
        }
      }
      for (let i = 0; i < node.childNodes.length; i++) {
        this.walkDOM(node.childNodes[i]);
      }
    }
  },

  applyAll() {
    this.walkDOM(document.body);
    document.documentElement.lang = this.currentLang === 'fon' ? 'fon' : 'fr';
  },

  setLang(lang) {
    // If switching to French, reload the page to restore original DOM easily
    if (lang === 'fr' && this.currentLang === 'fon') {
      localStorage.setItem('tc_lang', 'fr');
      window.location.reload();
      return;
    }
    
    this.currentLang = lang;
    localStorage.setItem('tc_lang', lang);
    this.applyAll();
    this.updateToggle();
  },

  updateToggle() {
    const btn = document.getElementById('langToggle');
    if (!btn) return;
    const isFon = this.currentLang === 'fon';
    btn.innerHTML = isFon
      ? '<span style="font-weight:700">FON</span> / <span style="opacity:.5">FR</span>'
      : '<span style="opacity:.5">FON</span> / <span style="font-weight:700">FR</span>';
  },

  injectToggle() {
    // Create button
    const btn = document.createElement('button');
    btn.id = 'langToggle';
    btn.className = 'lang-toggle-btn';
    
    // Desktop navbar
    const navButtons = document.querySelector('.nav-buttons');
    if (navButtons) {
        navButtons.insertBefore(btn, navButtons.firstChild);
    } else {
        // Mobile or Dashboard topbar
        const topbar = document.querySelector('.topbar-actions') || document.querySelector('.topbar');
        if (topbar) topbar.insertBefore(btn, topbar.firstChild);
        else {
            btn.style.position = 'fixed';
            btn.style.bottom = '20px';
            btn.style.right = '20px';
            btn.style.zIndex = '9999';
            document.body.appendChild(btn);
        }
    }
    
    btn.onclick = () => this.setLang(this.currentLang === 'fr' ? 'fon' : 'fr');
    this.updateToggle();
  },

  init() {
    document.addEventListener('DOMContentLoaded', () => {
      this.injectToggle();
      if (this.currentLang === 'fon') {
        // slight delay to let other scripts render components
        setTimeout(() => this.applyAll(), 100);
      }
    });
  }
};

I18N.init();
