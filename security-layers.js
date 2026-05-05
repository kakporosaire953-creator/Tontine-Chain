/* ================================================
   TONTINECHAIN — 7 COUCHES DE SÉCURITÉ (SIMULATION JS)
   ================================================ */

const TC = {

  /* ─────────────────────────────────────────────
     COUCHE 1 : AUTHENTIFICATION OTP
  ───────────────────────────────────────────── */
  otp: {
    _code: null,
    _cb: null,

    _gen() { return Math.floor(100000 + Math.random() * 900000).toString(); },

    show(callback) {
      this._code = this._gen();
      this._cb   = callback;

      // Notification SMS simulée
      TC.notif.send(`📱 Code OTP envoyé: ${this._code}`, 'sms');
      setTimeout(() => TC.notif.send(`📱 Code OTP (WhatsApp): ${this._code}`, 'whatsapp'), 800);

      const m = document.createElement('div');
      m.id = 'otpModal';
      m.className = 'tc-modal-overlay';
      m.innerHTML = `
        <div class="tc-modal">
          <div class="tc-modal-icon"><i class="fas fa-mobile-alt"></i></div>
          <h3>Vérification OTP</h3>
          <p>Code envoyé par <strong>SMS &amp; WhatsApp</strong> (via Infobip)</p>
          <div class="otp-channels-row">
            <span class="otp-ch sms"><i class="fas fa-sms"></i> SMS</span>
            <span class="otp-ch wa"><i class="fab fa-whatsapp"></i> WhatsApp</span>
          </div>
          <div class="tc-demo-box"><i class="fas fa-info-circle"></i> Mode démo — Code: <strong id="demoCode">${this._code}</strong></div>
          <div class="otp-row" id="otpDigits">
            ${[...Array(6)].map((_,i)=>`<input type="text" maxlength="1" class="otp-digit" data-i="${i}">`).join('')}
          </div>
          <button class="btn btn-primary btn-block" onclick="TC.otp.verify()"><i class="fas fa-check"></i> Vérifier</button>
          <button class="tc-link" onclick="TC.otp.resend()">Renvoyer le code</button>
        </div>`;
      document.body.appendChild(m);

      const digits = m.querySelectorAll('.otp-digit');
      digits.forEach((d,i) => {
        d.addEventListener('input', () => { if(d.value && i < 5) digits[i+1].focus(); });
        d.addEventListener('keydown', e => { if(e.key==='Backspace' && !d.value && i>0) digits[i-1].focus(); });
      });
      digits[0].focus();
    },

    verify() {
      const code = [...document.querySelectorAll('.otp-digit')].map(d=>d.value).join('');
      if(code.length < 6) { TC.notif.send('Entrez les 6 chiffres', 'error'); return; }
      if(code === this._code) {
        document.getElementById('otpModal').remove();
        TC.notif.send('✅ Identité OTP vérifiée !', 'success');
        if(this._cb) this._cb();
      } else {
        TC.notif.send('❌ Code incorrect', 'error');
        document.querySelectorAll('.otp-digit').forEach(d=>{ d.value=''; d.style.borderColor='#DC2626'; });
        setTimeout(()=>{ document.querySelectorAll('.otp-digit').forEach(d=>d.style.borderColor=''); }, 800);
        document.querySelectorAll('.otp-digit')[0].focus();
      }
    },

    resend() {
      this._code = this._gen();
      document.getElementById('demoCode').textContent = this._code;
      TC.notif.send(`📱 Nouveau code (WhatsApp): ${this._code}`, 'whatsapp');
    }
  },

  /* ─────────────────────────────────────────────
     COUCHE 2 : KYC / NPI
  ───────────────────────────────────────────── */
  kyc: {
    isDone() { return localStorage.getItem('tc_kyc') === 'true'; },

    show(callback) {
      if(this.isDone()) { if(callback) callback(); return; }
      const m = document.createElement('div');
      m.id = 'kycModal';
      m.className = 'tc-modal-overlay';
      m.innerHTML = `
        <div class="tc-modal">
          <div class="tc-modal-icon gold"><i class="fas fa-id-card"></i></div>
          <h3>Vérification KYC</h3>
          <p>Fournissez votre <strong>NPI</strong> (Numéro Personnel d'Identification) pour accéder aux fonctionnalités financières.</p>
          <div class="kyc-badges">
            <span class="kyc-badge"><i class="fas fa-shield-alt"></i> Anti-fraude</span>
            <span class="kyc-badge"><i class="fas fa-check"></i> ANSSFD</span>
          </div>
          <div class="tc-demo-box"><i class="fas fa-info-circle"></i> Mode démo — entrez n'importe quel NPI (8+ car.)</div>
          <div class="form-group" style="margin-top:16px">
            <div class="input-with-icon"><i class="fas fa-id-card"></i>
              <input id="kycNpi" class="form-input" placeholder="Ex: BJ-1234567890" maxlength="15" type="text">
            </div>
          </div>
          <div class="form-group">
            <div class="input-with-icon"><i class="fas fa-check-circle"></i>
              <input id="kycNpiConfirm" class="form-input" placeholder="Confirmez votre NPI" maxlength="15" type="text">
            </div>
          </div>
          <button class="btn btn-primary btn-block" id="kycBtn" onclick="TC.kyc.submit()">
            <i class="fas fa-user-check"></i> Vérifier mon identité
          </button>
          <button class="tc-link" onclick="document.getElementById('kycModal').remove()">Plus tard</button>
        </div>`;
      document.body.appendChild(m);
      window._kycCb = callback;
    },

    submit() {
      const npi = document.getElementById('kycNpi').value;
      const confirm = document.getElementById('kycNpiConfirm').value;
      if(npi.length < 8) { TC.notif.send('NPI trop court (min 8 caractères)', 'error'); return; }
      if(npi !== confirm) { TC.notif.send('Les NPI ne correspondent pas', 'error'); return; }
      const btn = document.getElementById('kycBtn');
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Vérification ANSSFD...';
      btn.disabled = true;
      setTimeout(() => {
        localStorage.setItem('tc_kyc', 'true');
        localStorage.setItem('tc_npi', npi);
        document.getElementById('kycModal').remove();
        TC.notif.send('✅ KYC validé ! Accès financier accordé.', 'success');
        TC.notif.sendMulti('Votre identité NPI a été vérifiée avec succès');
        if(window._kycCb) window._kycCb();
      }, 2200);
    }
  },

  /* ─────────────────────────────────────────────
     COUCHE 3 : SCORE DE CONFIANCE DYNAMIQUE
  ───────────────────────────────────────────── */
  trust: {
    get() {
      const payments = parseInt(localStorage.getItem('tc_payments') || '0');
      const ontime   = parseInt(localStorage.getItem('tc_ontime')   || '0');
      return Math.min(60 + payments * 4 + ontime * 2, 100);
    },
    level(s) {
      if(s>=90) return { label:'Excellent', color:'#00A86B' };
      if(s>=75) return { label:'Bon',       color:'#3B82F6' };
      if(s>=50) return { label:'Moyen',     color:'#F59E0B' };
      return           { label:'Faible',    color:'#DC2626' };
    },
    renderWidget(id) {
      const el = document.getElementById(id); if(!el) return;
      const s = this.get(), lv = this.level(s);
      el.innerHTML = `
        <div class="tc-widget">
          <div class="tc-widget-header" style="color:${lv.color}">
            <i class="fas fa-chart-bar"></i> Score de Confiance
            <span class="tc-badge" style="background:${lv.color}20;color:${lv.color}">${lv.label}</span>
          </div>
          <div class="tc-score-val" style="color:${lv.color}">${s}</div>
          <div class="tc-score-sub">points / 100</div>
          <div class="tc-bar"><div class="tc-bar-fill" style="width:${s}%;background:${lv.color}"></div></div>
          <div class="tc-score-items">
            <span><i class="fas fa-check" style="color:#00A86B"></i> Historique</span>
            <span><i class="fas fa-clock" style="color:#3B82F6"></i> Ponctualité</span>
            <span><i class="fas fa-users" style="color:#F59E0B"></i> Comportement</span>
          </div>
          <div class="tc-updated"><i class="fas fa-sync-alt"></i> Mis à jour en temps réel · Automatique</div>
        </div>`;
    }
  },

  /* ─────────────────────────────────────────────
     COUCHE 4 : NOTIFICATIONS MULTI-CANAL
  ───────────────────────────────────────────── */
  notif: {
    _cfg: {
      success:   { icon:'fas fa-check-circle',    color:'#00A86B', label:'Succès'    },
      error:     { icon:'fas fa-exclamation-circle', color:'#DC2626', label:'Erreur'  },
      sms:       { icon:'fas fa-sms',             color:'#3B82F6', label:'SMS'      },
      whatsapp:  { icon:'fab fa-whatsapp',        color:'#25D366', label:'WhatsApp' },
      email:     { icon:'fas fa-envelope',        color:'#8B5CF6', label:'Email'    },
      blockchain:{ icon:'fab fa-ethereum',        color:'#6366F1', label:'Blockchain'},
      ai:        { icon:'fas fa-brain',           color:'#F59E0B', label:'IA'       },
      info:      { icon:'fas fa-info-circle',     color:'#3B82F6', label:'Info'     }
    },

    send(msg, type='info') {
      const cfg = this._cfg[type] || this._cfg.info;
      const n = document.createElement('div');
      n.className = 'tc-toast';
      n.innerHTML = `<i class="${cfg.icon}" style="color:${cfg.color}"></i><span>${msg}</span>`;
      n.style.cssText = `position:fixed;bottom:20px;right:20px;z-index:99999;
        background:#fff;border-left:4px solid ${cfg.color};padding:14px 20px;
        border-radius:10px;box-shadow:0 8px 24px rgba(0,0,0,.12);
        display:flex;align-items:center;gap:12px;font-size:14px;
        max-width:360px;transform:translateX(120%);transition:transform .3s ease;
        font-family:'Manrope',sans-serif;`;
      document.body.appendChild(n);

      // Stack toasts
      const all = document.querySelectorAll('.tc-toast');
      all.forEach((t,i) => { t.style.bottom = (20 + i * 68) + 'px'; });

      setTimeout(() => n.style.transform='translateX(0)', 30);
      setTimeout(() => { n.style.transform='translateX(120%)'; setTimeout(()=>n.remove(),300); }, 4000);
    },

    sendMulti(msg) {
      ['sms','whatsapp','email'].forEach((ch,i) => {
        setTimeout(() => this.send(`[${ch.toUpperCase()}] ${msg}`, ch), i * 700);
      });
    },

    renderCenter(id) {
      const el = document.getElementById(id); if(!el) return;
      const items = [
        { type:'sms',       msg:'Cotisation de 50 000 FCFA due dans 5 jours',   time:'Il y a 2h'  },
        { type:'whatsapp',  msg:'Marie Koffi a payé sa cotisation',              time:'Il y a 4h'  },
        { type:'email',     msg:'Distribution de 600 000 FCFA effectuée',        time:'Hier'       },
        { type:'blockchain',msg:'Transaction confirmée sur Polygon (3 blocs)',    time:'Avant-hier' }
      ];
      const cfg = this._cfg;
      el.innerHTML = `
        <div class="tc-widget">
          <div class="tc-widget-header"><i class="fas fa-bell" style="color:#3B82F6"></i> Alertes Multi-Canal
            <span class="tc-badge" style="background:#EFF6FF;color:#3B82F6">${items.length}</span>
          </div>
          ${items.map(it=>`
            <div class="notif-row">
              <i class="${cfg[it.type].icon}" style="color:${cfg[it.type].color}"></i>
              <div class="notif-row-body">
                <div class="notif-ch" style="color:${cfg[it.type].color}">${cfg[it.type].label}</div>
                <div class="notif-msg">${it.msg}</div>
                <div class="notif-time">${it.time}</div>
              </div>
            </div>`).join('')}
        </div>`;
    }
  },

  /* ─────────────────────────────────────────────
     COUCHE 5 : PAIEMENTS FEDAPAY
  ───────────────────────────────────────────── */
  fedapay: {
    _method: 'mtn',

    pay(amount, tontineName, callback) {
      const m = document.createElement('div');
      m.id = 'fedaModal';
      m.className = 'tc-modal-overlay';
      m.innerHTML = `
        <div class="tc-modal fedapay-modal">
          <div class="feda-header">
            <div class="feda-logo"><i class="fas fa-credit-card"></i> FedaPay</div>
            <div class="feda-secure"><i class="fas fa-lock"></i> SSL</div>
          </div>
          <div class="feda-amount">${Number(amount).toLocaleString('fr-FR')} FCFA</div>
          <div class="feda-desc">Cotisation — ${tontineName}</div>
          <div class="payment-methods">
            <div class="pm active" onclick="TC.fedapay._select('mtn',this)">
              <div class="pm-icon" style="background:#FDB913;color:#000"><i class="fas fa-mobile-alt"></i></div>
              <div><div class="pm-name">MTN Mobile Money</div><div class="pm-sub">Instant · Sécurisé</div></div>
              <i class="fas fa-check-circle pm-check" style="color:#FDB913"></i>
            </div>
            <div class="pm" onclick="TC.fedapay._select('moov',this)">
              <div class="pm-icon" style="background:#E31E24;color:#fff"><i class="fas fa-mobile-alt"></i></div>
              <div><div class="pm-name">Moov Money</div><div class="pm-sub">Instant · Certifié</div></div>
              <i class="fas fa-check-circle pm-check" style="color:#E31E24;opacity:0"></i>
            </div>
          </div>
          <div class="form-group" style="margin-top:12px">
            <div class="input-with-icon"><i class="fas fa-phone"></i>
              <input id="fedaPhone" class="form-input" type="tel" placeholder="+229 97 XX XX XX">
            </div>
          </div>
          <button id="fedaBtn" class="btn btn-primary btn-block" onclick="TC.fedapay._confirm(${amount},'${tontineName}')">
            <i class="fas fa-lock"></i> Payer ${Number(amount).toLocaleString('fr-FR')} FCFA
          </button>
          <button class="tc-link" onclick="document.getElementById('fedaModal').remove()">Annuler</button>
          <div class="feda-footer"><i class="fas fa-shield-alt"></i> FedaPay · Webhook certifié · MTN & Moov</div>
        </div>`;
      document.body.appendChild(m);
      window._fedaCb = callback;
    },

    _select(method, el) {
      this._method = method;
      document.querySelectorAll('.pm').forEach(p=>{ p.classList.remove('active'); p.querySelector('.pm-check').style.opacity='0'; });
      el.classList.add('active'); el.querySelector('.pm-check').style.opacity='1';
    },

    _confirm(amount, tontineName) {
      const phone = document.getElementById('fedaPhone').value;
      if(!phone||phone.length<8) { TC.notif.send('Numéro invalide', 'error'); return; }
      const btn = document.getElementById('fedaBtn');
      btn.disabled = true;
      const steps = [
        [0,    'fas fa-spinner fa-spin', 'Connexion FedaPay...'],
        [1500, 'fas fa-spinner fa-spin', 'En attente Mobile Money...'],
        [3000, 'fas fa-spinner fa-spin', 'Webhook reçu · Enregistrement...'],
        [4500, 'fas fa-check',           'Confirmation blockchain...']
      ];
      steps.forEach(([ms, icon, label]) => setTimeout(()=>{ btn.innerHTML=`<i class="${icon}"></i> ${label}`; }, ms));
      setTimeout(() => {
        document.getElementById('fedaModal').remove();
        const tx = '0x'+[...Array(64)].map(()=>Math.floor(Math.random()*16).toString(16)).join('');
        localStorage.setItem('tc_payments', parseInt(localStorage.getItem('tc_payments')||'0')+1);
        localStorage.setItem('tc_ontime',   parseInt(localStorage.getItem('tc_ontime')||'0')+1);
        localStorage.setItem('tc_lastTx', tx);
        TC.notif.send(`✅ ${Number(amount).toLocaleString('fr-FR')} FCFA confirmé !`, 'success');
        setTimeout(()=>TC.notif.sendMulti(`Paiement ${tontineName}: ${Number(amount).toLocaleString('fr-FR')} FCFA reçu`), 400);
        setTimeout(()=>TC.blockchain.showConfirm(tx, amount), 1800);
        if(window._fedaCb) window._fedaCb(tx);
      }, 5500);
    }
  },

  /* ─────────────────────────────────────────────
     COUCHE 6 : ANALYSE DE RISQUE IA
  ───────────────────────────────────────────── */
  aiRisk: {
    _analyze(missed, total) {
      const raw = Math.max(0, Math.min(100, (missed/total)*80 + Math.random()*10));
      if(raw < 20) return { score: Math.round(raw), label:'Faible',  color:'#00A86B', rec:'Groupe sain — aucune action requise.' };
      if(raw < 50) return { score: Math.round(raw), label:'Modéré',  color:'#F59E0B', rec:'1-2 membres à surveiller. Rappel recommandé.' };
      return             { score: Math.round(raw), label:'Élevé',   color:'#DC2626', rec:'Action immédiate — risque de défaut élevé.' };
    },

    renderWidget(id) {
      const el = document.getElementById(id); if(!el) return;
      const groups = [
        { name:'Tontine Dantokpa', members:12, missed:0 },
        { name:'Association Artisans', members:8, missed:1 },
        { name:'Famille Miabe', members:5, missed:0 }
      ];
      el.innerHTML = `
        <div class="tc-widget">
          <div class="tc-widget-header"><i class="fas fa-brain" style="color:#F59E0B"></i> Analyse de Risque IA
            <span class="tc-badge" style="background:#FFFBEB;color:#F59E0B">ML · Prédictif</span>
          </div>
          ${groups.map(g=>{
            const a = this._analyze(g.missed, g.members);
            return `
              <div class="ai-risk-row">
                <div class="ai-risk-name">${g.name}</div>
                <div class="ai-risk-bar-wrap">
                  <div class="ai-risk-fill" style="width:${a.score}%;background:${a.color}"></div>
                </div>
                <span class="ai-risk-label" style="color:${a.color}">${a.label}</span>
              </div>
              <div class="ai-risk-rec" style="border-color:${a.color}40">
                <i class="fas fa-robot" style="color:${a.color}"></i> ${a.rec}
              </div>`;
          }).join('')}
          <div class="tc-updated"><i class="fas fa-sync-alt"></i> Analyse IA en temps réel · Prédictif · Préventif</div>
        </div>`;
    }
  },

  /* ─────────────────────────────────────────────
     COUCHE 7 : BLOCKCHAIN POLYGON
  ───────────────────────────────────────────── */
  blockchain: {
    showConfirm(txHash, amount) {
      const m = document.createElement('div');
      m.className = 'tc-modal-overlay';
      m.innerHTML = `
        <div class="tc-modal blockchain-modal">
          <div class="tc-modal-icon" style="background:#EEF2FF;color:#6366F1"><i class="fab fa-ethereum"></i></div>
          <h3>Transaction Confirmée</h3>
          <div class="chain-badge">Polygon PoS · Gasless (EIP-2771)</div>
          <div class="chain-amount">${Number(amount).toLocaleString('fr-FR')} FCFA</div>
          <div class="chain-row">
            <span class="chain-label">Hash</span>
            <span class="chain-val">${txHash.slice(0,20)}...${txHash.slice(-6)}</span>
          </div>
          <div class="chain-row">
            <span class="chain-label">Réseau</span>
            <span class="chain-val" style="color:#8B5CF6">Polygon PoS</span>
          </div>
          <div class="chain-row">
            <span class="chain-label">Statut</span>
            <span class="chain-val" style="color:#00A86B"><i class="fas fa-check-circle"></i> Confirmé (3 blocs)</span>
          </div>
          <div class="chain-row">
            <span class="chain-label">Smart Contract</span>
            <span class="chain-val">OpenZeppelin Audité ✓</span>
          </div>
          <div class="chain-row">
            <span class="chain-label">Frais utilisateur</span>
            <span class="chain-val" style="color:#00A86B">0 FCFA (Gasless)</span>
          </div>
          <div class="chain-immutable"><i class="fas fa-lock"></i> Enregistrement immuable — non modifiable</div>
          <button class="btn btn-primary btn-block" onclick="this.closest('.tc-modal-overlay').remove()">
            <i class="fas fa-check"></i> Fermer
          </button>
        </div>`;
      document.body.appendChild(m);
      TC.notif.send('🔗 Transaction Polygon confirmée (3 blocs)', 'blockchain');
    },

    renderWidget(id) {
      const el = document.getElementById(id); if(!el) return;
      const txHash = localStorage.getItem('tc_lastTx') || '0x' + [...Array(64)].map(()=>Math.floor(Math.random()*16).toString(16)).join('');
      el.innerHTML = `
        <div class="tc-widget">
          <div class="tc-widget-header"><i class="fab fa-ethereum" style="color:#6366F1"></i> Blockchain Polygon
            <span class="tc-badge" style="background:#EEF2FF;color:#6366F1">Gasless</span>
          </div>
          <div class="chain-info-row"><i class="fas fa-check-circle" style="color:#00A86B"></i>
            <span>Réseau: <strong>Polygon PoS</strong></span>
          </div>
          <div class="chain-info-row"><i class="fas fa-gas-pump" style="color:#6366F1"></i>
            <span>Frais: <strong style="color:#00A86B">0 FCFA (EIP-2771 Gasless)</strong></span>
          </div>
          <div class="chain-info-row"><i class="fas fa-key" style="color:#F59E0B"></i>
            <span>API: <strong>Laravel Sanctum</strong></span>
          </div>
          <div class="chain-info-row"><i class="fas fa-shield-alt" style="color:#3B82F6"></i>
            <span>Contrats: <strong>OpenZeppelin Audité</strong></span>
          </div>
          <div class="chain-hash-box">
            <div class="chain-hash-label">Dernier Tx Hash</div>
            <div class="chain-hash">${txHash.slice(0,22)}...${txHash.slice(-8)}</div>
          </div>
          <div class="tc-updated"><i class="fas fa-lock"></i> Immuable · On-chain · Transparent</div>
        </div>`;
    }
  }
};
