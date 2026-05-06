// ================================================
// TONTINECHAIN â€” SystÃ¨me de Traduction FR / FON Automatique
// ================================================

const I18N = {
  currentLang: localStorage.getItem('tc_lang') || 'fr',

  // Dictionnaire FR -> FON
  dict: {
    // Navigation & Boutons
    "ProblÃ¨me": "Tagba",
    "Solution": "AlÉ”",
    "FonctionnalitÃ©s": "NÇ” e wÉ› Ã© sixu wÃ  lÉ›",
    "Comment Ã§a marche": "AlÄ› Ã© nÉ” w'azÉ”ÌŒ gbÉ”n Ã©",
    "FAQ": "NÃ¹kanbyÉ”Ì",
    "Connexion": "ByÉ” mÉ›",
    "Commencer": "BÉ›Ì€",
    "S'inscrire": "WlÇŽn nyikÉ”",
    "CrÃ©er ma Tontine": "BlÃ³ asÃº ce",
    "CrÃ©er ma premiÃ¨re tontine": "BlÃ³ asÃº ce nukÉ”ntÉ”n",
    "CrÃ©er ma tontine maintenant": "BlÃ³ asÃº ce dÃ¬n",
    "Rejoindre une Tontine": "ByÉ” asÃº É–Ã© mÉ›",
    "CrÃ©er une Tontine": "BlÃ³ asÃº É–Ã©",
    "Rejoindre": "ByÉ” mÉ›",
    "Se Connecter": "ByÉ” mÉ›",
    "DÃ©connexion": "TÉ”Ìn",
    "GÃ©rer": "KpÃ© nukÃºn",
    "Voir DÃ©tails": "KpÉ”Ìn nÇ” lÉ›",

    // Dashboard
    "Dashboard": "TÃ¡blo",
    "Mes Tontines": "AsÃº ce lÉ›",
    "Paiements": "SÃ¹xÃ³",
    "Messagerie": "WÉ›n lÉ›",
    "Assistant YAO": "AlÉ”dÃ³tÉ”Ì YAO",
    "Mon Profil": "MÉ› ce",
    "ParamÃ¨tres": "ÃiÉ–e lÉ›",
    "Nouvelle Tontine": "AsÃº yÉ”ÌŒyÉ”Ì",
    "Total Ã‰pargnÃ©": "AkwÉ›Ì kplÃ© bÇ",
    "Tontines Actives": "AsÃº e É–Ã² azÉ”ÌŒ wÃ  wÉ› lÉ›",
    "Taux de Paiement": "SÃ¹xÃ³ sÃ­n akÉ”Ì",
    "ActivitÃ© RÃ©cente": "NÇ” e jÉ› yÃ¬ Ã© lÉ›",

    // Home - Hero
    "SÃ©curisez vos": "Nya xÉ›si nÃº",
    "avec la Blockchain": "kpÃ³ Blockchain kpÃ³",
    "Smart Contracts AuditÃ©s": "Smart Contracts e Ã¨ kpÉ”Ìn lÉ›",
    "DonnÃ©es ChiffrÃ©es": "DÇ’ e Ã¨ sÉ”Ì nyÃ¬ nÇ” jlÉ›ÌŒ lÉ›",
    "100% Transparent": "100% MÉ”jÉ›mÉ›",

    // Home - Textes
    "Le ProblÃ¨me": "Tagba É”",
    "La Solution": "AlÉ” É”",
    "SÃ©curitÃ© Absolue": "CyÃ¡ncyÃ¡n BÇ",
    "Transparence Totale": "MÉ”jÉ›mÉ› BÇ",
    "Automatisation": "Ã‰É–Ã©e KpÃ©",
    "Questions FrÃ©quentes": "NÃ¹kanbyÉ”Ì hwÉ›hwÉ› lÉ›",
    
    // Auth
    "Adresse email": "E-mail",
    "Mot de passe": "NyÇkÉ”gbÃ¨",
    "PrÃ©nom": "NyikÉ”",
    "Nom": "TÉ”Ì nyikÉ”",
    "NumÃ©ro de tÃ©lÃ©phone": "TÉ›lÉ›fÃ³nu",
    "Confirmer le mot de passe": "VÉ”Ì nyÇkÉ”gbÃ¨ É” xlÉ›Ì",
    "Se souvenir de moi": "FlÃ­n mÃ¬",
    
    // Ajouts supplÃ©mentaires pour index.html complet
    "La PremiÃ¨re Tontine": "AsÃº NukÉ”ntÉ”n",
    "au BÃ©nin": "É–Ã² BenÉ›",
    "Fini les dÃ©tournements": "AkwÉ›Ì fÃ­nfÃ­n sÃº ta",
    "Paiements automatiques": "SÃ¹xÃ³ Ã©É–Ã©e kpÃ©",
    "100% SÃ©curisÃ©e": "CyÃ¡ncyÃ¡n 100%",
    "Fini les": "AkwÉ›Ì fÃ­nfÃ­n sÃº ta kpÃ³",
    "dÃ©tournements": "akwÉ›Ì fÃ­nfÃ­n",
    "et les": "kpÃ³",
    "retards de paiement": "hwenu gbigbÉ”",
    "! Cotisez avec vos proches, et rÃ©cupÃ©rez votre cagnotte Ã  temps garanti par notre technologie anti-fraude. SÃ©curisÃ© via Mobile Money.": "! KplÃ© akwÉ›Ì kpÃ³ hÉ›ÌŒnnumÉ” lÉ› kpÃ³, bÃ³ mÉ” akwÉ›Ì towe hwenu e jÉ›xa Ã©. Ãˆ cyÃ¡n gbÉ”n Mobile Money jÃ­.",
    "Plaintes/an": "Plaintes/xwÃ¨",
    "FCFA gÃ©rÃ©s": "FCFA e Ã¨ kpÃ© nukÃºn d'Ã© wÃº",
    "Femmes": "NyÉ”ÌŒnu lÉ›",
    "Smart contracts auditÃ©s": "Smart contracts e Ã¨ kpÉ”Ìn lÉ›",
    "RÃ©seau sÃ©curisÃ© BÃ©nin": "FÃ­ e Ã¨ cyÃ¡n É–Ã² BenÉ› Ã©",
    "Les Tontines Traditionnelles :": "AsÃº XÃ³xÃ³ lÉ› :",
    "Risques Majeurs": "Tagba ÃaxÃ³ lÉ›",
    "Plaintes enregistrÃ©es Ã  Porto-Novo en 2021": "Plaintes e Ã¨ wlan É–Ã² XÉ”gbonu É–Ã² 2021",
    "Des tontines connaissent des incidents majeurs": "AsÃº É–Ã© lÉ› nÉ” mÉ” tagba É–axÃ³",
    "FCFA dans la microfinance bÃ©ninoise": "FCFA É–Ã² akwÉ›Ì kplÃ© BenÉ› tÉ”n mÉ›",
    "Cale SÃ¨che": "Cale SÃ¨che (AkwÉ›Ì bÇ bÃº)",
    "Les collecteurs disparaissent avec l'Ã©pargne de tout le groupe": "KplÃ©tÉ”Ì lÉ› nÉ” hÉ”n kpÃ³ kplÃ©kplÃ© É” sÃ­n akwÉ›Ì kpÃ³",
    "600+ plaintes Ã  Porto-Novo (2021)": "600+ plaintes É–Ã² XÉ”gbonu (2021)",
    "Collecteurs en fuite avec les fonds": "KplÃ©tÉ”Ì lÉ› hÉ”n kpÃ³ akwÉ›Ì É” kpÃ³",
    "Familles ruinÃ©es du jour au lendemain": "XwÃ©do lÉ› gba zÇŽn É–okpÃ³ mÉ›",
    "Aucun recours lÃ©gal efficace": "AcÉ›kpa sÃ­n alÉ”dÃ³ É–Ä› tÃ­Ã¬n ÇŽ",
    "Carnets FalsifiÃ©s": "Wema e Ã¨ huzu lÉ›",
    "Registres physiques perdus, brÃ»lÃ©s ou modifiÃ©s frauduleusement": "Wema lÉ› bÃº, fiÉ”, abÇ Ã¨ huzu ye",
    "Carnets \"perdus\" ou dÃ©truits": "Wema bÃº abÇ Ã¨ hÉ›n gblÃ©",
    "Montants modifiÃ©s Ã  la main": "Ãˆ huzu akwÉ›Ì lÉ› kpÃ³ alÉ” kpÃ³",
    "Litiges impossibles Ã  rÃ©soudre": "Ãˆ hÉ›n É”, Ã¨ nÉ” É–Ã³ gbe É–Ã³ kpÉ”Ì ÇŽ",
    "Qui a payÃ© ? Qui doit recevoir ?": "MÉ›ÌŒ ka sÃº xÃ³? MÉ›ÌŒ ka na yÃ­?",
    "Femmes VulnÃ©rables": "NyÉ”ÌŒnu lÉ› É–Ã² tagba mÉ›",
    "70% des participantes sont des femmes entrepreneures sans protection": "NyÉ”ÌŒnu ajÉ”ÌŒwatÉ”Ì lÉ› wÉ› nyÃ­ 70% bÉ” ye kÃºn É–Ã³ cyÃ¡ncyÃ¡n Ã³",
    "Exclues du systÃ¨me bancaire formel": "Ye kÃºn nÉ” byÉ” banki mÉ› Ã³",
    "28% du financement artisanal": "28% akwÉ›Ì e Ã¨ nÉ” zÃ¡n nÃº alÉ”nÇ”zÉ”Ì lÉ›",
    "59% des femmes dÃ©pendent des tontines": "NyÉ”ÌŒnu lÉ› sÃ­n 59% nÉ” gÃ¡n gbÉ”n asÃº jÃ­",
    "ZÃ©ro protection juridique": "SÉ›Ìn sÃ­n cyÃ¡ncyÃ¡n kÃºn tÃ­Ã¬n Ã³",
    "\"Plus de 600 plaintes ont Ã©tÃ© enregistrÃ©es Ã  Porto-Novo en 2021 concernant la collecte illÃ©gale d'Ã©pargne.\"": "\"Plaintes 600+ jÉ› É–Ã² XÉ”gbonu É–Ã² 2021 nÃº akwÉ›Ì kplÃ© e mÃ¡ sÉ”gbe xÃ¡ sÉ›Ìn ÇŽ Ã©.\"",
    "Sources officielles :": "FÃ­ e xÃ³ É” gosÃ­n lÉ› :",
    "ANSSFD (Agence Nationale de Surveillance des SFD), Journal La Nation (08 mars 2022), Louis Biao (DG ANSSFD)": "ANSSFD, Journal La Nation (08 mars 2022), Louis Biao",
    "Tontines BÃ©ninoises": "AsÃº BenÉ› tÉ”n lÉ›",
    "Architecture Smart Contract": "AlÄ› Smart Contract nÉ” w'azÉ”ÌŒ gbÉ”n Ã©",
    "Ã‰tape 1": "AfÉ”É–itÉ› 1",
    "CrÃ©ation du Groupe": "KplÃ©kplÃ© É” sÃ­n bÇblÃ³",
    "DÃ©finissez les membres et les rÃ¨gles": "ÃÃ¨ mÉ› lÉ› kpÃ³ sÉ›Ìn lÉ› kpÃ³ tÉ”Ìn",
    "Ã‰tape 2": "AfÉ”É–itÉ› 2",
    "Factory DÃ©ploie": "Factory nÉ” blÃ³ nÇ” lÉ›",
    "Un smart contract unique pour votre groupe": "Smart contract É–okpÃ³ nÃº kplÃ©kplÃ© towe",
    "Ã‰tape 3": "AfÉ”É–itÉ› 3",
    "Fonds SÃ©curisÃ©s": "AkwÉ›Ì lÉ› É–Ã² ayi jÃ­",
    "Coffre-fort numÃ©rique immuable": "AkwÉ›Ì sÃ­n xÉ”ta e Ã¨ ma sixu huzu ÇŽ Ã©",
    "Ã‰tape 4": "AfÉ”É–itÉ› 4",
    "Distribution Auto": "MÃ­mÃ¡ Ã‰É–Ã©e",
    "Paiements automatiques selon l'ordre": "SÃ¹xÃ³ Ã©É–Ã©e kpÃ© sÉ”gbe xÃ¡ tuto É”",
    "Smart contracts immuables qui protÃ¨gent vos fonds": "Smart contracts nÉ” cyÃ¡n akwÉ›Ì towe lÉ›",
    "Isolation des fonds par groupe": "AkwÉ›Ì lÉ› nÉ” É–Ã² kplÃ©kplÃ© É–okpÃ³ É–okpÃ³ mÉ›",
    "Impossible de dÃ©tourner": "Ãˆ hÉ›n É”, Ã¨ fÃ­n ÇŽ",
    "AuditÃ© OpenZeppelin": "OpenZeppelin kpÉ”Ìn",
    "Chaque transaction tracÃ©e sur la blockchain": "NÇ” e Ã¨ wÃ  lÉ› bÇ É–Ã² blockchain jÃ­",
    "Historique immuable": "HwenuxÃ³ e Ã¨ ma sixu huzu ÇŽ Ã©",
    "VÃ©rification indÃ©pendante": "GbÃ©jÃ© kpÉ”Ìn gbÉ”n vovo",
    "Preuve de solvabilitÃ©": "KÃºnnuÉ–ewema akwÉ›Ì sÃ­n",
    "RÃ¨gles appliquÃ©es automatiquement par le code": "SÉ›Ìn lÉ› nÉ” w'azÉ”ÌŒ Ã©É–Ã©e kpÃ© gbÉ”n kode jÃ­",
    "LibÃ©ration automatique": "MÃ­mÃ¡ Ã©É–Ã©e",
    "Gestion des retards": "KpÃ© nukÃºn dÃ³ hwenu gbigbÉ” wÃº",
    "Notifications temps rÃ©el": "GbÃ¨ nÃº mÉ› É–Ã² hwenu gbÃ©jÃ­",
    "Stack Technique": "AzÉ”ÌŒwanÃº lÉ›",
    "FonctionnalitÃ©s Exclusives": "NÇ” e wÉ› Ã© sixu wÃ  lÉ› bÇ",
    "Bien plus qu'une simple tontine": "ZÉ› asÃº kpowun wÃº",
    "Des outils intelligents pour gÃ©rer vos tontines en toute simplicitÃ©": "AzÉ”ÌŒwanÃº ayijikpÃ¡n nÃº asÃº towe lÉ›",
    "Blockchain SÃ©curisÃ©e": "Blockchain e Ã¨ cyÃ¡n Ã©",
    "Smart contracts auditÃ©s sur Polygon. Vos fonds sont protÃ©gÃ©s 24/7 par la technologie blockchain.": "Smart contracts e Ã¨ kpÉ”Ìn É–Ã² Polygon jÃ­. Blockchain nÉ” cyÃ¡n akwÉ›Ì towe lÉ› 24/7.",
    "Immuable et inviolable": "Ãˆ hÉ›n É” Ã¨ huzu ÇŽ, Ã¨ gba ÇŽ",
    "Automatisation complÃ¨te": "Ã‰É–Ã©e kpÃ© bÇ",
    "NOUVEAU": "YÆ†ÌŒYÆ†Ì",
    "YAO - Assistant IA": "YAO - AlÉ”dÃ³tÉ”Ì IA",
    "Votre conseiller financier intelligent disponible 24/7 pour vous guider dans vos dÃ©cisions.": "AlÉ”dÃ³tÉ”Ì towe e nÉ” na we gbe É–Ã² 24/7 Ã©.",
    "Conseils personnalisÃ©s": "GbÃ¨ nina mÉ›É–Ã©sunÉ” tÉ”n",
    "RÃ©ponses instantanÃ©es": "XÃ³sin blewun",
    "Analyse de vos tontines": "GbÃ©jÃ© kpÉ”Ìn asÃº towe lÉ›",
    "Messagerie IntÃ©grÃ©e": "WÉ›n lÉ› É–Ã² mÉ›",
    "Communiquez avec les membres de votre groupe en temps rÃ©el, directement dans l'application.": "ÃÉ” xÃ³ xÃ¡ kplÃ©kplÃ© towe lÉ› É–Ã² hwenu gbÃ©jÃ­ É–Ã² apilikesiÉ”n mÉ›.",
    "Chat en direct": "XÃ³É–iÉ–É” blewun",
    "Notifications push": "GbÃ¨ nÃº mÉ›",
    "Partage de fichiers": "MÃ¡mÃ¡ wema lÉ›",
    "Infrastructure de SÃ©curitÃ©": "CyÃ¡ncyÃ¡n sÃ­n DodÃ³",
    "7 Couches de Protection": "CyÃ¡ncyÃ¡n 7",
    "Chaque interaction est sÃ©curisÃ©e par notre architecture backend multi-niveaux": "NÇ” bÇ nÉ” cyÃ¡n gbÉ”n cyÃ¡ncyÃ¡n wunkÃ¡ wunkÃ¡ mÇtÉ”n jÃ­",
    "Authentification OTP": "OTP gbÃ©jÃ© kpÉ”Ìn",
    "Connexion sans mot de passe via un code unique envoyÃ© par SMS et WhatsApp. Impossible de compromettre votre compte.": "ByÉ” mÉ› gbÉ”n SMS kpÃ³ WhatsApp kpÃ³. Ãˆ hÉ›n É” Ã¨ gba kÉ”ÌntÃ¬ towe ÇŽ.",
    "VÃ©rification KYC (NPI)": "KYC (NPI) gbÃ©jÃ© kpÉ”Ìn",
    "Chaque membre doit fournir son NumÃ©ro Personnel d'Identification (NPI) avant d'accÃ©der aux fonctionnalitÃ©s financiÃ¨res.": "MÉ› É–okpÃ³ É–okpÃ³ É–Ã³ na na NPI tÉ”n cÃ³bÃ³ mÉ” akwÉ›Ì sÃ­n azÉ”ÌŒ lÉ›.",
    "IdentitÃ©": "MÉ›ÌŒ ka nyÃ­ we",
    "Anti-fraude": "AkwÉ›Ì fÃ­nfÃ­n sÃº ta",
    "Score de Confiance Dynamique": "JiÉ–e sÃ­n akÉ”Ì",
    "Un algorithme Ã©value la fiabilitÃ© de chaque membre en temps rÃ©el selon sa ponctualitÃ©, son historique et son comportement.": "Algorithme nÉ” gbÃ©jÃ© mÉ› É–okpÃ³ É–okpÃ³ kpÉ”Ìn É–Ã² hwenu gbÃ©jÃ­ sÉ”gbe xÃ¡ hwenu tÉ”n.",
    "Temps rÃ©el": "Hwenu gbÃ©jÃ­",
    "Automatique": "Ã‰É–Ã©e",
    "Notifications Multi-Canal": "GbÃ¨ nÃº mÉ› gbÉ”n ali gÄ›gÃ© jÃ­",
    "Alertes critiques envoyÃ©es simultanÃ©ment par SMS, WhatsApp et Email via l'API Infobip professionnelle.": "WÉ›n taji lÉ› nÉ” yÃ¬ SMS, WhatsApp kpÃ³ Email kpÃ³ jÃ­ gbÉ”n Infobip jÃ­.",
    "Paiements SÃ©curisÃ©s (FedaPay)": "SÃ¹xÃ³ CyÃ¡ncyÃ¡n (FedaPay)",
    "IntÃ©gration directe avec MTN Mobile Money et Moov Money via la passerelle FedaPay certifiÃ©e.": "ZÇŽn MTN MoMo kpÃ³ Moov kpÃ³ gbÉ”n FedaPay jÃ­.",
    "Analyse de Risque IA": "IA sÃ­n Ayi kpÃ­kpÃ©",
    "Un moteur prÃ©dictif scanne chaque groupe pour dÃ©tecter les risques de dÃ©faut et recommander des actions prÃ©ventives.": "MÉ” nÉ” kpÉ”Ìn kplÃ©kplÃ© lÉ› bÇ bÃ¡ mÉ” tagba lÉ› cÃ³bÃ³ na wÄ›.",
    "PrÃ©dictif": "ÃÉ” d'ayÇ",
    "PrÃ©ventif": "GbÃ©jÃ© cÃ³bÃ³ jÉ›",
    "Blockchain & Smart Contracts": "Blockchain kpÃ³ Smart Contracts kpÃ³",
    "La couche finale et immuable. Chaque tontine est ancrÃ©e sur la blockchain Polygon avec des transactions gasless (EIP-2771) â€” zÃ©ro frais pour les utilisateurs. Les accÃ¨s API sont sÃ©curisÃ©s par Laravel Sanctum et les contrats auditÃ©s par OpenZeppelin.": "CyÃ¡ncyÃ¡n gudo tÉ”n. AsÃº bÇ É–Ã² Polygon jÃ­, akwÉ›Ì vÉ”Ì€. Laravel Sanctum kpÃ³ OpenZeppelin kpÃ³ nÉ” cyÃ¡n.",
    "DÃ©couvrez YAO": "KplÉ”Ìn YAO",
    "Votre assistant IA personnel": "AlÉ”dÃ³tÉ”Ì IA towe",
    "YAO vous aide Ã  prendre les meilleures dÃ©cisions financiÃ¨res. Posez vos questions, obtenez des conseils personnalisÃ©s et gÃ©rez vos tontines en toute confiance.": "YAO nÉ” d'alÉ” we bÃ¡ sÉ”Ì gbe. KÃ n nÇ” byÉ”Ì, mÉ” wÄ›É–exÃ¡mÉ› kpÃ³ jiÉ–e kpÃ³.",
    "Analyse intelligente": "GbÃ©jÃ© kpÉ”Ìn kpÃ³ nÃ¹nywÉ› kpÃ³",
    "YAO analyse vos habitudes d'Ã©pargne et vous propose des optimisations": "YAO nÉ” kpÉ”Ìn alÄ› a nÉ” kplÃ© akwÉ›Ì gbÉ”n Ã© bÃ¡ na wÄ› we",
    "Alertes proactives": "GbÃ¨ nÃº mÉ› cÃ³bÃ³ jÉ›",
    "Recevez des notifications avant les Ã©chÃ©ances importantes": "MÉ” wÉ›n cÃ³bÃ³ azÇŽn taji lÉ› na sÃ¹",
    "Support multilingue": "GbÃ¨ vovo lÉ›",
    "FranÃ§ais, Fon, et autres langues locales": "FlansÃ©, FÉ”n, kpÃ³ gbÃ¨ É–Ä›vo lÉ› kpÃ³",
    "En ligne": "ÃÃ² zÇŽnmÉ›",
    "Bonjour ! Je suis YAO, votre assistant IA. Comment puis-je vous aider aujourd'hui ?": "KÃº dÃ³ ! NyÉ› wÉ› nyÃ­ YAO, alÉ”dÃ³tÉ”Ì IA towe. NÉ›ÌŒ un ka sixu d'alÉ” we gbÉ”n dÃ¬n?",
    "Quelle est ma prochaine Ã©chÃ©ance ?": "HwetÉ›nu wÉ› azÇŽn ce bÉ” d'Ã© wÃº É” na sÃ¹?",
    "Votre prochaine cotisation est le ": "SÃ¹xÃ³ towe e ja Ã© wÉ› nyÃ­ ",
    "15 Mars 2026": "15 XwÃ©jisun 2026",
    " (50,000 FCFA). Voulez-vous programmer un rappel ?": " (50,000 FCFA). A jlÃ³ bÃ¡ sÉ”Ì flÃ­nmÉ› Ã ?",
    "Lancez votre tontine en ": "BÉ› asÃº towe É–Ã² ",
    "4 Ã©tapes": "AfÉ”É–itÉ› 4",
    "Simple comme bonjour, sÃ©curisÃ© par la blockchain": "Ã‰ bÉ”kÃºn, blockchain cyÃ¡n",
    "Rassemblez vos amis, collÃ¨gues ou membres de votre association": "KplÃ© xÉ”ÌntÉ”n lÉ›, gbÉ›ÌŒtÉ”Ì lÉ› abÇ akÉ”ta towe",
    "Montant, frÃ©quence, pÃ©nalitÃ©s - tout est codÃ© dans le smart contract": "AkwÉ›Ì, hwenu, akwÉ›Ì sÃºnsÃºn - nÇ” bÇ É–Ã² smart contract mÉ›",
    "Chaque membre connecte son wallet et accepte les rÃ¨gles": "MÉ› bÇ nÉ” zÃ¡n wallet yÄ›tÉ”n bÃ³ nÉ” yÃ­ gbÃ¨ nÃº sÉ›Ìn lÉ›",
    "Les cotisations sont automatiques, la distribution aussi !": "AkwÉ›Ì kplÃ© É” nyÃ­ Ã©É–Ã©e kpÃ©, mÃ­mÃ¡ É” lÉ”mÉ”!",
    "Gratuit â€¢ SÃ©curisÃ© â€¢ Sans engagement": "VÉ”Ì€ â€¢ Ãˆ cyÃ¡n â€¢ MÉ›É–Ã© kÃºn gbÉ›Ì we Ã³",
    "Vous avez des questions ?": "A É–Ã³ nÃ¹kanbyÉ”Ì Ã ?",
    "On a les rÃ©ponses !": "MÇ É–Ã³ xÃ³sin lÉ›!",
    "GÃ©nÃ©ral": "KpÉ”Ì mÉ›",
    "Qu'est-ce que TontineChain ?": "EtÉ› ka nyÃ­ TontineChain?",
    "TontineChain est une plateforme qui sÃ©curise les tontines bÃ©ninoises grÃ¢ce Ã  la blockchain. Vos fonds sont protÃ©gÃ©s par des smart contracts immuables, impossible de dÃ©tourner ou falsifier.": "TontineChain nÉ” cyÃ¡n asÃº BenÉ› tÉ”n lÉ› kpÃ³ blockchain kpÃ³. Smart contracts nÉ” cyÃ¡n akwÉ›Ì towe lÉ›, Ã¨ hÉ›n É” Ã¨ fÃ­n ÇŽ.",
    "Comment Ã§a fonctionne ?": "NÉ›ÌŒ Ã© ka nÉ” w'azÉ”ÌŒ gbÉ”n?",
    "Vous crÃ©ez un groupe, dÃ©finissez les rÃ¨gles (montant, frÃ©quence), invitez les membres. Chaque cotisation est enregistrÃ©e sur la blockchain et la distribution est automatique.": "A blÃ³ kplÃ©kplÃ©, sÉ”Ì sÉ›Ìn lÉ›, ylÉ” mÉ› lÉ›. AkwÉ›Ì bÇ É–Ã² blockchain jÃ­ bÉ” mÃ­mÃ¡ nÉ” nyÃ­ Ã©É–Ã©e kpÃ©.",
    "SÃ©curitÃ©": "CyÃ¡ncyÃ¡n",
    "Mes fonds sont-ils vraiment sÃ©curisÃ©s ?": "AkwÉ›Ì ce lÉ› ka É–Ã² ayi jÃ­ nÇ”gbÃ³ Ã ?",
    "Oui ! Les smart contracts sont auditÃ©s par OpenZeppelin et dÃ©ployÃ©s sur Polygon. Une fois les rÃ¨gles dÃ©finies, personne (mÃªme nous) ne peut modifier ou dÃ©tourner les fonds.": "ÆÉ›n! OpenZeppelin kpÉ”Ìn smart contracts lÉ› bÉ” ye É–Ã² Polygon jÃ­. MÉ›É–Ã© sixu huzu abÇ fÃ­n akwÉ›Ì lÉ› ÇŽ.",
    "Que se passe-t-il si un membre ne paie pas ?": "EtÉ› ka nÉ” jÉ› nÃº mÉ›É–Ã© ma sÃº xÃ³ ÇŽ?",
    "Les pÃ©nalitÃ©s sont automatiques et codÃ©es dans le smart contract. Le membre en retard ne peut pas recevoir sa cagnotte tant qu'il n'a pas rÃ©gularisÃ©.": "AkwÉ›Ì sÃºnsÃºn lÉ› nyÃ­ Ã©É–Ã©e kpÃ©. MÉ› e gbu hwenu É” sixu yÃ­ akwÉ›Ì ÇŽ kaka jÉ› hwenu e Ã© na sÃº xÃ³ Ã©.",
    "Technique": "AzÉ”ÌŒ",
    "Dois-je connaÃ®tre la blockchain ?": "Un É–Ã³ na tuÃ¹n blockchain Ã ?",
    "Non ! L'interface est simple comme une app mobile. Vous n'avez besoin que d'un wallet (MetaMask) pour commencer.": "GbeÉ–Ã©! Ã‰ bÉ”kÃºn di apilikesiÉ”n. A É–Ã³ na É–Ã³ wallet (MetaMask) kpowun bÃ¡ bÉ›.",
    "Quels sont les frais ?": "AkwÉ›Ì nabi wÉ›?",
    "Les frais de transaction sur Polygon sont < 0.01 USD. Pas d'abonnement, pas de frais cachÃ©s.": "AkwÉ›Ì e Ã¨ nÉ” sÃº É–Ã² Polygon jÃ­ É” hwe. Ãˆ nÉ” sÃº akwÉ›Ì É–Ä›vo ÇŽ.",
    "Comment payer ma cotisation ?": "NÉ›ÌŒ un ka na sÃº xÃ³ ce gbÉ”n?",
    "Vous pouvez payer en Mobile Money (MTN, Moov), carte bancaire ou crypto (USDC, USDT). Le montant est converti automatiquement.": "A sixu sÃº kpÃ³ Mobile Money (MTN, Moov), carte bancaire abÇ crypto (USDC, USDT) kpÃ³.",
    "Quand vais-je recevoir ma cagnotte ?": "HwetÉ›nu wÉ› un na yÃ­ akwÉ›Ì ce?",
    "Selon l'ordre dÃ©fini au dÃ©part. DÃ¨s que c'est votre tour, les fonds sont libÃ©rÃ©s automatiquement sur votre wallet.": "SÉ”gbe xÃ¡ tuto É”. NÃº hwenu towe sÃ¹ É”, akwÉ›Ì nÉ” wÃ¡ wallet towe mÉ› Ã©É–Ã©e kpÃ©.",
    "PrÃªt Ã  sÃ©curiser votre tontine ?": "A É–Ã² gbesisÉ” mÉ› bÃ¡ cyÃ¡n asÃº towe Ã ?",
    "Rejoignez les centaines de groupes qui ont choisi la sÃ©curitÃ© blockchain": "WÃ¡ kplÃ©kplÃ© e ko cyan blockchain lÉ› mÉ›",
    "SÃ©curisez vos tontines bÃ©ninoises avec la blockchain. Fini les dÃ©tournements, place Ã  la transparence totale.": "Cyan asÃº BenÉ›tÉ”n towe lÉ› kpÃ³ blockchain kpÃ³. AkwÉ›Ì fÃ­nfÃ­n sÃº ta, mÉ”jÉ›mÉ› wÃ¡.",
    "Produit": "NÇ” É”",
    "Commencer gratuitement": "BÉ›Ì€ vÉ”Ì€",
    "Ressources": "AlÉ”dÃ³ lÉ›",
    "Documentation": "WÄ›ma lÉ›",
    "Blog": "Blog",
    "Support": "AlÉ”dÃ³",
    "Contact": "KÃ n bÃ¬byÉ”Ì€",
    "Conditions d'utilisation": "SÉ›Ìn e Ã¨ na xwedÃ³ lÉ›",
    "Politique de confidentialitÃ©": "NÇ” e kÃ n nÇ” hÉ›n mimÉ” lÉ›",
    "Mentions lÃ©gales": "SÉ›Ìn xÃ³ lÉ›",
    "Â© 2026 TontineChain. Tous droits rÃ©servÃ©s.": "Â© 2026 TontineChain. AcÉ› lÉ› bÇ Ã¨ hÉ›n.",
    "Sources officielles : ANSSFD (Agence Nationale de Surveillance des SFD), Journal La Nation, Louis Biao (DG ANSSFD), Lelart & Gnansounou (JSTOR)": "FÃ­ e xÃ³ É” gosÃ­n lÉ› : ANSSFD, Journal La Nation, Louis Biao, Lelart & Gnansounou",
    
    // Dashboard & ActivitÃ©s
    "Active": "ÃÃ² azÉ”ÌŒ wÃ  wÉ›",
    "Association des Artisans": "Artisan-gbÉ›Ì",
    "Ã‰pargne collective pour projets artisanaux": "AkwÉ›Ì kplÃ©kplÃ© nÃº alÉ”nÇ”zÉ”Ì lÉ›",
    "membres": "mÉ› lÉ›",
    "Cycle": "LilÉ›",
    "Prochain:": "E ja Ã©:",
    "Famille Miabe": "Miabe-xwÃ©do",
    "Tontine familiale pour Ã©vÃ©nements": "AsÃº xwÃ©do tÉ”n nÃº hwenÃ¹nÇ” lÉ›",
    "En attente de 3 membres pour dÃ©marrer": "MÉ› 3 wÉ› mÇ É–Ã² te kpÉ”Ìn cÃ³bÃ³ na bÉ›Ì€",
    "Inviter des membres": "YlÉ”ÌŒ mÉ› lÉ›",
    "Paiement reÃ§u": "Ãˆ yÃ­ akwÉ›Ì",
    "Marie Koffi a payÃ© sa cotisation - Tontine des Femmes": "Marie Koffi sÃº xÃ³ tÉ”n - NyÉ”ÌŒnu lÉ› sÃ­n asÃº",
    "Il y a 2 heures": "Gan 2 É–Ã­e",
    "Nouveau membre": "MÉ› yÉ”ÌŒyÉ”Ì",
    "Jean Dossou a rejoint Association des Artisans": "Jean Dossou byÉ” Artisan-gbÉ›Ì mÉ›",
    "Il y a 5 heures": "Gan 5 É–Ã­e",
    "Distribution effectuÃ©e": "MÃ­mÃ¡ ko nyÃ­",
    "Cagnotte distribuÃ©e Ã  Sophie Agbota": "Ãˆ sÉ”Ì akwÉ›Ì É” nÃ¡ Sophie Agbota",
    "Hier": "SÉ”",
    "Paiement effectuÃ©e": "Ãˆ sÃº xÃ³",
    "Paiement effectuÃ©": "Ãˆ sÃº xÃ³",
    "Vous avez payÃ© votre cotisation - Association des Artisans": "A ko sÃº xÃ³ towe - Artisan-gbÉ›Ì",
    "Il y a 2 jours": "AzÇŽn 2 É–Ã­e",
    "VÃ©rification d'identitÃ© requise": "Ãˆ É–Ã³ na tuÃ¹n mÉ›ÌŒ ka nyÃ­ we Ã©",
    "ComplÃ©tez votre KYC pour les fonctionnalitÃ©s financiÃ¨res": "FÃ³ KYC towe bÃ¡ mÉ” akwÉ›Ì sÃ­n azÉ”ÌŒ lÉ›",
    "VÃ©rifier": "GbÃ©jÃ© kpÉ”Ìn",
    "Score de Confiance": "JiÉ–e sÃ­n akÉ”Ì",
    "Alertes Multi-Canal": "GbÃ¨ vovo lÉ›",
    "Analyse de Risque IA": "IA sÃ­n Ayi kpÃ­kpÃ©",
    "Blockchain Polygon": "Blockchain Polygon",
    "Voir tout": "KpÉ”Ìn bÇ",
    "Payer": "SÃº xÃ³",
    "Messagerie": "WÉ›n lÉ›",
    "Cotonou": "XÉ”gbonu (Cotonou)",
    "Association des Femmes de Dantokpa": "Dantokpa-nyÉ”ÌŒnu lÉ›",
    "Tontine commerciale pour les revendeuses": "AjÉ”ÌŒwatÉ”Ì lÉ› sÃ­n asÃº",
    "Membres": "MÉ› lÉ›",
    "Cotisation": "AkwÉ›Ì kplÃ©",
    "Total": "BÇ",
    "Prochaine": "E ja Ã©",
    "CrÃ©e par": "Ãˆ blÃ³ gbÉ”n",
    
    // Auth & CrÃ©ation
    "AccÃ©dez Ã  votre espace sÃ©curisÃ©": "ByÉ” fÃ­ e Ã¨ cyÃ¡n nÃº we É” mÉ›",
    "ou": "Ã lÇ’",
    "Connecter Wallet": "ZÃ¡n Wallet",
    "Pas encore de compte ?": "A ko É–Ã³ kÉ”ÌntÃ¬ ÇŽ Ã ?",
    "Rejoignez la rÃ©volution des tontines sÃ©curisÃ©es": "WÃ¡ asÃº e Ã¨ cyÃ¡n lÉ› mÉ›",
    "J'accepte les conditions d'utilisation": "Un yÃ­ gbÃ¨ nÃº sÉ›Ìn lÉ›",
    "DÃ©jÃ  un compte ?": "A ko É–Ã³ kÉ”ÌntÃ¬ Ã ?",
    "Se connecter": "ByÉ” mÉ›",
    "Nom de la tontine": "AsÃº sÃ­n nyikÉ”",
    "Montant de la cotisation": "AkwÉ›Ì kplÃ©",
    "FrÃ©quence des versements": "Hwenu e Ã¨ na nÉ” sÃº xÃ³ Ã©",
    "Nombre de membres maximum": "MÉ› nabi e na byÉ” mÉ› Ã©",
    "Date de dÃ©but": "AzÇŽn e bÉ›Ì€ Ã©",
    "RÃ¨gles et Conditions": "SÉ›Ìn lÉ› kpÃ³ nÇ” e na wÃ  lÉ› kpÃ³",
    "Tontine en cours": "AsÃº É–Ã² bÇblÃ³ jÃ­",
    "TerminÃ©e": "Ã‰ ko fÃ³",
    "Fonds collectÃ©s": "AkwÉ›Ì e Ã¨ kplÃ© Ã©",
    "Prochaine distribution": "MÃ­mÃ¡ e ja Ã©",
    "Membres du groupe": "MÉ› e É–Ã² kplÃ©kplÃ© É” mÉ› lÉ›",
    "Ajouter un membre": "GÉ”Ì mÉ› É–okpÃ³",
    "Modifier les paramÃ¨tres": "ÃiÉ–e lÉ›",

    // Login & Signup spÃ©cifique
    "Bon retour !": "KÃº dÃ³ wÇŽ !",
    "Connectez-vous pour accÃ©der Ã  vos tontines": "ByÉ” mÉ› bÃ¡ mÉ” asÃº towe lÉ›",
    "Email ou TÃ©lÃ©phone": "Email abÇ TÉ›lÉ›fÃ³nu",
    "Email ou tÃ©lÃ©phone": "Email abÇ TÉ›lÉ›fÃ³nu",
    "Mot de passe oubliÃ© ?": "A wÉ”n nyÇkÉ”gbÃ¨ towe Ã ?",
    "OU": "ABÇ",
    "Vous n'avez pas de compte ?": "A ko É–Ã³ kÉ”ÌntÃ¬ ÇŽ Ã ?",
    "CrÃ©er un compte": "BlÃ³ kÉ”ÌntÃ¬ É–okpÃ³",
    "Utilisateurs actifs": "MÉ› e É–Ã² azÉ”ÌŒ wÃ  wÉ› lÉ›",
    "Tontines crÃ©es": "AsÃº e Ã¨ blÃ³ lÉ›",
    "FCFA sÃ©curisÃ©s": "FCFA e Ã¨ cyÃ¡n lÉ›",
    "Vos tontines, sÃ©curisÃ©es par la blockchain": "Blockchain nÉ” cyÃ¡n asÃº towe lÉ›",
    "AccÃ©dez Ã  votre dashboard, gÃ©rez vos cotisations et suivez vos tontines en temps rÃ©el.": "ByÉ” tÃ¡blo towe mÉ›, kpÃ© nukÃºn dÃ³ akwÉ›Ì kplÃ© towe lÉ› wÃº bÃ³ xwedÃ³ asÃº towe lÉ› É–Ã² hwenu gbÃ©jÃ­.",
    "SÃ©curitÃ© maximale": "CyÃ¡ncyÃ¡n bÇ",
    "Smart contracts auditÃ©s et immuables": "Smart contracts e Ã¨ kpÉ”Ìn lÉ› bÃ³ ma sixu huzu ÇŽ lÉ›",
    "Transparence totale": "MÉ”jÉ›mÉ› bÇ",
    "Toutes les transactions sur la blockchain": "NÇ” bÇ É–Ã² blockchain jÃ­",
    "Assistant IA YAO": "AlÉ”dÃ³tÉ”Ì IA YAO",
    "Conseils personnalisÃ©s 24/7": "GbÃ¨ nina mÉ›É–Ã©sunÉ” tÉ”n 24/7",
    "CrÃ©ez un compte": "BlÃ³ kÉ”ÌntÃ¬ É–okpÃ³",
    "Rejoignez des milliers d'utilisateurs qui sÃ©curisent leurs tontines": "ByÉ” mÉ› gÄ›gÃ© e É–Ã² asÃº yÄ›tÉ”n cyÃ¡n wÉ› lÉ› mÉ›",
    "PrÃ©nom *": "NyikÉ” *",
    "Nom *": "TÉ”Ì nyikÉ” *",
    "Email *": "Email *",
    "TÃ©lÃ©phone *": "TÉ›lÉ›fÃ³nu *",
    "Mot de passe *": "NyÇkÉ”gbÃ¨ *",
    "Confirmer le mot de passe *": "VÉ”Ì nyÇkÉ”gbÃ¨ É” xlÉ›Ì *",
    "Entrez un mot de passe": "WlÇŽn nyÇkÉ”gbÃ¨ towe",
    "J'accepte les": "Un yÃ­ gbÃ¨ nÃº",
    "Conditions d'utilisation": "SÉ›Ìn e Ã¨ na xwedÃ³ lÉ›",
    "Politique de confidentialitÃ©": "NÇ” e kÃ n nÇ” hÉ›n mimÉ” lÉ›",
    "Commencez Gratuitement": "BÉ›Ì€ vÉ”Ì€",
    "CrÃ©ez votre compte en moins de 2 minutes et commencez Ã  Ã©pargner en toute sÃ©curitÃ©.": "BlÃ³ kÉ”ÌntÃ¬ towe É–Ã² ganxixo 2 mÉ› bÃ³ bÉ›Ì akwÉ›Ì kplÃ© kpÃ³ cyÃ¡ncyÃ¡n kpÃ³.",
    "Inscription 100% gratuite": "WlÇŽn nyikÉ” vÉ”Ì€ 100%",
    "Aucun frais cachÃ©s": "AkwÉ›Ì É–Ä›vo kÃºn É–Ã² mÉ› Ã³",
    "Support client 24/7": "AlÉ”dÃ³ mÉ› 24/7",
    "Assistant IA YAO inclus": "AlÉ”dÃ³tÉ”Ì IA YAO É–Ã² mÉ›",
    "Messagerie sÃ©curisÃ©e": "WÉ›n lÉ› É–Ã² ayi jÃ­",
    "Notifications en temps rÃ©el": "GbÃ¨ nÃº mÉ› É–Ã² hwenu gbÃ©jÃ­",
    "CommerÃ§ante, Dantokpa": "AjÉ”ÌŒwatÉ”Ì, Dantokpa",
    "\"Depuis que j'utilise TontineChain, je n'ai plus peur des dÃ©tournements. Tout est transparent et sÃ©curisÃ© !\"": "\"SÃ­n hwenu e un bÉ›Ì TontineChain É”, un sÉ”Ì nÉ” É–Ã¬ xÉ›si nÃº akwÉ›Ì fÃ­nfÃ­n ÇŽ. NÇ” bÇ É–Ã² mÉ”jÉ›mÉ› bÃ³ É–Ã² ayi jÃ­ !\""
  },

  translateTextNode(node) {
    if (this.currentLang === 'fr') return;
    
    const text = node.nodeValue.trim();
    if (text === '') return;

    if (this.dict[text]) {
      node.nodeValue = node.nodeValue.replace(text, this.dict[text]);
      if (!node.tcOriginal) node.tcOriginal = text;
    }
  },

  restoreTextNode(node) {
    if (node.tcOriginal) {
      node.nodeValue = node.nodeValue.replace(node.nodeValue.trim(), node.tcOriginal);
    }
  },

  walkDOM(node) {
    if (node.nodeType === 3) {
      if (this.currentLang === 'fon') {
        this.translateTextNode(node);
      } else {
        this.restoreTextNode(node);
      }
    } else if (node.nodeType === 1 && node.nodeName !== "SCRIPT" && node.nodeName !== "STYLE") {
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
    const path = window.location.pathname;
    const isTranslatablePage = path.endsWith('index.html') || path.endsWith('/') || path === '' || 
                               path.endsWith('login.html') || path.endsWith('signup.html');
    
    if (isTranslatablePage) {
      this.walkDOM(document.body);
      document.documentElement.lang = this.currentLang === 'fon' ? 'fon' : 'fr';
    }
  },

  setLang(lang) {
    this.currentLang = lang;
    localStorage.setItem('tc_lang', lang);
    
    if (isHomePage) {
        if (lang === 'fr') {
            window.location.reload();
            return;
        }
        this.applyAll();
    }
    
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
    btn.style.marginLeft = '16px';
    
    // Inject near "TontineChain â€¢ Cotonou" badge in Hero if exists
    const heroBadge = document.querySelector('.hero .badge');
    if (heroBadge) {
        btn.style.marginLeft = '16px';
        btn.style.marginRight = '0';
        heroBadge.appendChild(btn);
    } else {
        // Fallback for dashboard/auth pages
        const topbar = document.querySelector('.topbar-actions') || document.querySelector('.topbar');
        const navButtons = document.querySelector('.nav-buttons');
        
        if (topbar) {
            topbar.insertBefore(btn, topbar.firstChild);
        } else if (navButtons) {
            navButtons.insertBefore(btn, navButtons.firstChild);
        } else {
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

