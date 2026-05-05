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
    "Se souvenir de moi": "Flín mì",
    
    // Ajouts supplémentaires pour index.html complet
    "La Première Tontine": "Asú Nukɔntɔn",
    "au Bénin": "ɖò Benɛ",
    "Fini les détournements": "Akwɛ́ fínfín sú ta",
    "Paiements automatiques": "Sùxó éɖée kpé",
    "100% Sécurisée": "Cyáncyán 100%",
    "Fini les": "Akwɛ́ fínfín sú ta kpó",
    "détournements": "akwɛ́ fínfín",
    "et les": "kpó",
    "retards de paiement": "hwenu gbigbɔ",
    "! Cotisez avec vos proches, et récupérez votre cagnotte à temps garanti par notre technologie anti-fraude. Sécurisé via Mobile Money.": "! Kplé akwɛ́ kpó hɛ̌nnumɔ lɛ kpó, bó mɔ akwɛ́ towe hwenu e jɛxa é. È cyán gbɔn Mobile Money jí.",
    "Plaintes/an": "Plaintes/xwè",
    "FCFA gérés": "FCFA e è kpé nukún d'é wú",
    "Femmes": "Nyɔ̌nu lɛ",
    "Smart contracts audités": "Smart contracts e è kpɔ́n lɛ",
    "Réseau sécurisé Bénin": "Fí e è cyán ɖò Benɛ é",
    "Les Tontines Traditionnelles :": "Asú Xóxó lɛ :",
    "Risques Majeurs": "Tagba Ðaxó lɛ",
    "Plaintes enregistrées à Porto-Novo en 2021": "Plaintes e è wlan ɖò Xɔgbonu ɖò 2021",
    "Des tontines connaissent des incidents majeurs": "Asú ɖé lɛ nɔ mɔ tagba ɖaxó",
    "FCFA dans la microfinance béninoise": "FCFA ɖò akwɛ́ kplé Benɛ tɔn mɛ",
    "Cale Sèche": "Cale Sèche (Akwɛ́ bǐ bú)",
    "Les collecteurs disparaissent avec l'épargne de tout le groupe": "Kplétɔ́ lɛ nɔ hɔn kpó kplékplé ɔ sín akwɛ́ kpó",
    "600+ plaintes à Porto-Novo (2021)": "600+ plaintes ɖò Xɔgbonu (2021)",
    "Collecteurs en fuite avec les fonds": "Kplétɔ́ lɛ hɔn kpó akwɛ́ ɔ kpó",
    "Familles ruinées du jour au lendemain": "Xwédo lɛ gba zǎn ɖokpó mɛ",
    "Aucun recours légal efficace": "Acɛkpa sín alɔdó ɖě tíìn ǎ",
    "Carnets Falsifiés": "Wema e è huzu lɛ",
    "Registres physiques perdus, brûlés ou modifiés frauduleusement": "Wema lɛ bú, fiɔ, abǐ è huzu ye",
    "Carnets \"perdus\" ou détruits": "Wema bú abǐ è hɛn gblé",
    "Montants modifiés à la main": "È huzu akwɛ́ lɛ kpó alɔ kpó",
    "Litiges impossibles à résoudre": "È hɛn ɔ, è nɔ ɖó gbe ɖó kpɔ́ ǎ",
    "Qui a payé ? Qui doit recevoir ?": "Mɛ̌ ka sú xó? Mɛ̌ ka na yí?",
    "Femmes Vulnérables": "Nyɔ̌nu lɛ ɖò tagba mɛ",
    "70% des participantes sont des femmes entrepreneures sans protection": "Nyɔ̌nu ajɔ̌watɔ́ lɛ wɛ nyí 70% bɔ ye kún ɖó cyáncyán ó",
    "Exclues du système bancaire formel": "Ye kún nɔ byɔ banki mɛ ó",
    "28% du financement artisanal": "28% akwɛ́ e è nɔ zán nú alɔnǔzɔ́ lɛ",
    "59% des femmes dépendent des tontines": "Nyɔ̌nu lɛ sín 59% nɔ gán gbɔn asú jí",
    "Zéro protection juridique": "Sɛ́n sín cyáncyán kún tíìn ó",
    "\"Plus de 600 plaintes ont été enregistrées à Porto-Novo en 2021 concernant la collecte illégale d'épargne.\"": "\"Plaintes 600+ jɛ ɖò Xɔgbonu ɖò 2021 nú akwɛ́ kplé e má sɔgbe xá sɛ́n ǎ é.\"",
    "Sources officielles :": "Fí e xó ɔ gosín lɛ :",
    "ANSSFD (Agence Nationale de Surveillance des SFD), Journal La Nation (08 mars 2022), Louis Biao (DG ANSSFD)": "ANSSFD, Journal La Nation (08 mars 2022), Louis Biao",
    "Tontines Béninoises": "Asú Benɛ tɔn lɛ",
    "Architecture Smart Contract": "Alě Smart Contract nɔ w'azɔ̌ gbɔn é",
    "Étape 1": "Afɔɖitɛ 1",
    "Création du Groupe": "Kplékplé ɔ sín bǐbló",
    "Définissez les membres et les règles": "Ðè mɛ lɛ kpó sɛ́n lɛ kpó tɔ́n",
    "Étape 2": "Afɔɖitɛ 2",
    "Factory Déploie": "Factory nɔ bló nǔ lɛ",
    "Un smart contract unique pour votre groupe": "Smart contract ɖokpó nú kplékplé towe",
    "Étape 3": "Afɔɖitɛ 3",
    "Fonds Sécurisés": "Akwɛ́ lɛ ɖò ayi jí",
    "Coffre-fort numérique immuable": "Akwɛ́ sín xɔta e è ma sixu huzu ǎ é",
    "Étape 4": "Afɔɖitɛ 4",
    "Distribution Auto": "Mímá Éɖée",
    "Paiements automatiques selon l'ordre": "Sùxó éɖée kpé sɔgbe xá tuto ɔ",
    "Smart contracts immuables qui protègent vos fonds": "Smart contracts nɔ cyán akwɛ́ towe lɛ",
    "Isolation des fonds par groupe": "Akwɛ́ lɛ nɔ ɖò kplékplé ɖokpó ɖokpó mɛ",
    "Impossible de détourner": "È hɛn ɔ, è fín ǎ",
    "Audité OpenZeppelin": "OpenZeppelin kpɔ́n",
    "Chaque transaction tracée sur la blockchain": "Nǔ e è wà lɛ bǐ ɖò blockchain jí",
    "Historique immuable": "Hwenuxó e è ma sixu huzu ǎ é",
    "Vérification indépendante": "Gbéjé kpɔ́n gbɔn vovo",
    "Preuve de solvabilité": "Kúnnuɖewema akwɛ́ sín",
    "Règles appliquées automatiquement par le code": "Sɛ́n lɛ nɔ w'azɔ̌ éɖée kpé gbɔn kode jí",
    "Libération automatique": "Mímá éɖée",
    "Gestion des retards": "Kpé nukún dó hwenu gbigbɔ wú",
    "Notifications temps réel": "Gbè nú mɛ ɖò hwenu gbéjí",
    "Stack Technique": "Azɔ̌wanú lɛ",
    "Fonctionnalités Exclusives": "Nǔ e wɛ é sixu wà lɛ bǐ",
    "Bien plus qu'une simple tontine": "Zɛ asú kpowun wú",
    "Des outils intelligents pour gérer vos tontines en toute simplicité": "Azɔ̌wanú ayijikpán nú asú towe lɛ",
    "Blockchain Sécurisée": "Blockchain e è cyán é",
    "Smart contracts audités sur Polygon. Vos fonds sont protégés 24/7 par la technologie blockchain.": "Smart contracts e è kpɔ́n ɖò Polygon jí. Blockchain nɔ cyán akwɛ́ towe lɛ 24/7.",
    "Immuable et inviolable": "È hɛn ɔ è huzu ǎ, è gba ǎ",
    "Automatisation complète": "Éɖée kpé bǐ",
    "NOUVEAU": "YƆ̌YƆ́",
    "YAO - Assistant IA": "YAO - Alɔdótɔ́ IA",
    "Votre conseiller financier intelligent disponible 24/7 pour vous guider dans vos décisions.": "Alɔdótɔ́ towe e nɔ na we gbe ɖò 24/7 é.",
    "Conseils personnalisés": "Gbè nina mɛɖésunɔ tɔn",
    "Réponses instantanées": "Xósin blewun",
    "Analyse de vos tontines": "Gbéjé kpɔ́n asú towe lɛ",
    "Messagerie Intégrée": "Wɛn lɛ ɖò mɛ",
    "Communiquez avec les membres de votre groupe en temps réel, directement dans l'application.": "Ðɔ xó xá kplékplé towe lɛ ɖò hwenu gbéjí ɖò apilikesiɔn mɛ.",
    "Chat en direct": "Xóɖiɖɔ blewun",
    "Notifications push": "Gbè nú mɛ",
    "Partage de fichiers": "Mámá wema lɛ",
    "Infrastructure de Sécurité": "Cyáncyán sín Dodó",
    "7 Couches de Protection": "Cyáncyán 7",
    "Chaque interaction est sécurisée par notre architecture backend multi-niveaux": "Nǔ bǐ nɔ cyán gbɔn cyáncyán wunká wunká mǐtɔn jí",
    "Authentification OTP": "OTP gbéjé kpɔ́n",
    "Connexion sans mot de passe via un code unique envoyé par SMS et WhatsApp. Impossible de compromettre votre compte.": "Byɔ mɛ gbɔn SMS kpó WhatsApp kpó. È hɛn ɔ è gba kɔ́ntì towe ǎ.",
    "Vérification KYC (NPI)": "KYC (NPI) gbéjé kpɔ́n",
    "Chaque membre doit fournir son Numéro Personnel d'Identification (NPI) avant d'accéder aux fonctionnalités financières.": "Mɛ ɖokpó ɖokpó ɖó na na NPI tɔn cóbó mɔ akwɛ́ sín azɔ̌ lɛ.",
    "Identité": "Mɛ̌ ka nyí we",
    "Anti-fraude": "Akwɛ́ fínfín sú ta",
    "Score de Confiance Dynamique": "Jiɖe sín akɔ́",
    "Un algorithme évalue la fiabilité de chaque membre en temps réel selon sa ponctualité, son historique et son comportement.": "Algorithme nɔ gbéjé mɛ ɖokpó ɖokpó kpɔ́n ɖò hwenu gbéjí sɔgbe xá hwenu tɔn.",
    "Temps réel": "Hwenu gbéjí",
    "Automatique": "Éɖée",
    "Notifications Multi-Canal": "Gbè nú mɛ gbɔn ali gěgé jí",
    "Alertes critiques envoyées simultanément par SMS, WhatsApp et Email via l'API Infobip professionnelle.": "Wɛn taji lɛ nɔ yì SMS, WhatsApp kpó Email kpó jí gbɔn Infobip jí.",
    "Paiements Sécurisés (FedaPay)": "Sùxó Cyáncyán (FedaPay)",
    "Intégration directe avec MTN Mobile Money et Moov Money via la passerelle FedaPay certifiée.": "Zǎn MTN MoMo kpó Moov kpó gbɔn FedaPay jí.",
    "Analyse de Risque IA": "IA sín Ayi kpíkpé",
    "Un moteur prédictif scanne chaque groupe pour détecter les risques de défaut et recommander des actions préventives.": "Mɔ nɔ kpɔ́n kplékplé lɛ bǐ bá mɔ tagba lɛ cóbó na wě.",
    "Prédictif": "Ðɔ d'ayǐ",
    "Préventif": "Gbéjé cóbó jɛ",
    "Blockchain & Smart Contracts": "Blockchain kpó Smart Contracts kpó",
    "La couche finale et immuable. Chaque tontine est ancrée sur la blockchain Polygon avec des transactions gasless (EIP-2771) — zéro frais pour les utilisateurs. Les accès API sont sécurisés par Laravel Sanctum et les contrats audités par OpenZeppelin.": "Cyáncyán gudo tɔn. Asú bǐ ɖò Polygon jí, akwɛ́ vɔ̀. Laravel Sanctum kpó OpenZeppelin kpó nɔ cyán.",
    "Découvrez YAO": "Kplɔ́n YAO",
    "Votre assistant IA personnel": "Alɔdótɔ́ IA towe",
    "YAO vous aide à prendre les meilleures décisions financières. Posez vos questions, obtenez des conseils personnalisés et gérez vos tontines en toute confiance.": "YAO nɔ d'alɔ we bá sɔ́ gbe. Kàn nǔ byɔ́, mɔ wěɖexámɛ kpó jiɖe kpó.",
    "Analyse intelligente": "Gbéjé kpɔ́n kpó nùnywɛ kpó",
    "YAO analyse vos habitudes d'épargne et vous propose des optimisations": "YAO nɔ kpɔ́n alě a nɔ kplé akwɛ́ gbɔn é bá na wě we",
    "Alertes proactives": "Gbè nú mɛ cóbó jɛ",
    "Recevez des notifications avant les échéances importantes": "Mɔ wɛn cóbó azǎn taji lɛ na sù",
    "Support multilingue": "Gbè vovo lɛ",
    "Français, Fon, et autres langues locales": "Flansé, Fɔn, kpó gbè ɖěvo lɛ kpó",
    "En ligne": "Ðò zǎnmɛ",
    "Bonjour ! Je suis YAO, votre assistant IA. Comment puis-je vous aider aujourd'hui ?": "Kú dó ! Nyɛ wɛ nyí YAO, alɔdótɔ́ IA towe. Nɛ̌ un ka sixu d'alɔ we gbɔn dìn?",
    "Quelle est ma prochaine échéance ?": "Hwetɛnu wɛ azǎn ce bɔ d'é wú ɔ na sù?",
    "Votre prochaine cotisation est le ": "Sùxó towe e ja é wɛ nyí ",
    "15 Mars 2026": "15 Xwéjisun 2026",
    " (50,000 FCFA). Voulez-vous programmer un rappel ?": " (50,000 FCFA). A jló bá sɔ́ flínmɛ à?",
    "Lancez votre tontine en ": "Bɛ asú towe ɖò ",
    "4 étapes": "Afɔɖitɛ 4",
    "Simple comme bonjour, sécurisé par la blockchain": "É bɔkún, blockchain cyán",
    "Rassemblez vos amis, collègues ou membres de votre association": "Kplé xɔ́ntɔn lɛ, gbɛ̌tɔ́ lɛ abǐ akɔta towe",
    "Montant, fréquence, pénalités - tout est codé dans le smart contract": "Akwɛ́, hwenu, akwɛ́ súnsún - nǔ bǐ ɖò smart contract mɛ",
    "Chaque membre connecte son wallet et accepte les règles": "Mɛ bǐ nɔ zán wallet yětɔn bó nɔ yí gbè nú sɛ́n lɛ",
    "Les cotisations sont automatiques, la distribution aussi !": "Akwɛ́ kplé ɔ nyí éɖée kpé, mímá ɔ lɔmɔ!",
    "Gratuit • Sécurisé • Sans engagement": "Vɔ̀ • È cyán • Mɛɖé kún gbɛ́ we ó",
    "Vous avez des questions ?": "A ɖó nùkanbyɔ́ à?",
    "On a les réponses !": "Mǐ ɖó xósin lɛ!",
    "Général": "Kpɔ́ mɛ",
    "Qu'est-ce que TontineChain ?": "Etɛ ka nyí TontineChain?",
    "TontineChain est une plateforme qui sécurise les tontines béninoises grâce à la blockchain. Vos fonds sont protégés par des smart contracts immuables, impossible de détourner ou falsifier.": "TontineChain nɔ cyán asú Benɛ tɔn lɛ kpó blockchain kpó. Smart contracts nɔ cyán akwɛ́ towe lɛ, è hɛn ɔ è fín ǎ.",
    "Comment ça fonctionne ?": "Nɛ̌ é ka nɔ w'azɔ̌ gbɔn?",
    "Vous créez un groupe, définissez les règles (montant, fréquence), invitez les membres. Chaque cotisation est enregistrée sur la blockchain et la distribution est automatique.": "A bló kplékplé, sɔ́ sɛ́n lɛ, ylɔ mɛ lɛ. Akwɛ́ bǐ ɖò blockchain jí bɔ mímá nɔ nyí éɖée kpé.",
    "Sécurité": "Cyáncyán",
    "Mes fonds sont-ils vraiment sécurisés ?": "Akwɛ́ ce lɛ ka ɖò ayi jí nǔgbó à?",
    "Oui ! Les smart contracts sont audités par OpenZeppelin et déployés sur Polygon. Une fois les règles définies, personne (même nous) ne peut modifier ou détourner les fonds.": "Ɛɛn! OpenZeppelin kpɔ́n smart contracts lɛ bɔ ye ɖò Polygon jí. Mɛɖé sixu huzu abǐ fín akwɛ́ lɛ ǎ.",
    "Que se passe-t-il si un membre ne paie pas ?": "Etɛ ka nɔ jɛ nú mɛɖé ma sú xó ǎ?",
    "Les pénalités sont automatiques et codées dans le smart contract. Le membre en retard ne peut pas recevoir sa cagnotte tant qu'il n'a pas régularisé.": "Akwɛ́ súnsún lɛ nyí éɖée kpé. Mɛ e gbu hwenu ɔ sixu yí akwɛ́ ǎ kaka jɛ hwenu e é na sú xó é.",
    "Technique": "Azɔ̌",
    "Dois-je connaître la blockchain ?": "Un ɖó na tuùn blockchain à?",
    "Non ! L'interface est simple comme une app mobile. Vous n'avez besoin que d'un wallet (MetaMask) pour commencer.": "Gbeɖé! É bɔkún di apilikesiɔn. A ɖó na ɖó wallet (MetaMask) kpowun bá bɛ.",
    "Quels sont les frais ?": "Akwɛ́ nabi wɛ?",
    "Les frais de transaction sur Polygon sont < 0.01 USD. Pas d'abonnement, pas de frais cachés.": "Akwɛ́ e è nɔ sú ɖò Polygon jí ɔ hwe. È nɔ sú akwɛ́ ɖěvo ǎ.",
    "Comment payer ma cotisation ?": "Nɛ̌ un ka na sú xó ce gbɔn?",
    "Vous pouvez payer en Mobile Money (MTN, Moov), carte bancaire ou crypto (USDC, USDT). Le montant est converti automatiquement.": "A sixu sú kpó Mobile Money (MTN, Moov), carte bancaire abǐ crypto (USDC, USDT) kpó.",
    "Quand vais-je recevoir ma cagnotte ?": "Hwetɛnu wɛ un na yí akwɛ́ ce?",
    "Selon l'ordre défini au départ. Dès que c'est votre tour, les fonds sont libérés automatiquement sur votre wallet.": "Sɔgbe xá tuto ɔ. Nú hwenu towe sù ɔ, akwɛ́ nɔ wá wallet towe mɛ éɖée kpé.",
    "Prêt à sécuriser votre tontine ?": "A ɖò gbesisɔ mɛ bá cyán asú towe à?",
    "Rejoignez les centaines de groupes qui ont choisi la sécurité blockchain": "Wá kplékplé e ko cyan blockchain lɛ mɛ",
    "Sécurisez vos tontines béninoises avec la blockchain. Fini les détournements, place à la transparence totale.": "Cyan asú Benɛtɔn towe lɛ kpó blockchain kpó. Akwɛ́ fínfín sú ta, mɔjɛmɛ wá.",
    "Produit": "Nǔ ɔ",
    "Commencer gratuitement": "Bɛ̀ vɔ̀",
    "Ressources": "Alɔdó lɛ",
    "Documentation": "Wěma lɛ",
    "Blog": "Blog",
    "Support": "Alɔdó",
    "Contact": "Kàn bìbyɔ̀",
    "Conditions d'utilisation": "Sɛ́n e è na xwedó lɛ",
    "Politique de confidentialité": "Nǔ e kàn nǔ hɛn mimɔ lɛ",
    "Mentions légales": "Sɛ́n xó lɛ",
    "© 2026 TontineChain. Tous droits réservés.": "© 2026 TontineChain. Acɛ lɛ bǐ è hɛn.",
    "Sources officielles : ANSSFD (Agence Nationale de Surveillance des SFD), Journal La Nation, Louis Biao (DG ANSSFD), Lelart & Gnansounou (JSTOR)": "Fí e xó ɔ gosín lɛ : ANSSFD, Journal La Nation, Louis Biao, Lelart & Gnansounou",
    
    // Dashboard & Activités
    "Active": "Ðò azɔ̌ wà wɛ",
    "Association des Artisans": "Artisan-gbɛ́",
    "Épargne collective pour projets artisanaux": "Akwɛ́ kplékplé nú alɔnǔzɔ́ lɛ",
    "membres": "mɛ lɛ",
    "Cycle": "Lilɛ",
    "Prochain:": "E ja é:",
    "Famille Miabe": "Miabe-xwédo",
    "Tontine familiale pour événements": "Asú xwédo tɔn nú hwenùnǔ lɛ",
    "En attente de 3 membres pour démarrer": "Mɛ 3 wɛ mǐ ɖò te kpɔ́n cóbó na bɛ̀",
    "Inviter des membres": "Ylɔ̌ mɛ lɛ",
    "Paiement reçu": "È yí akwɛ́",
    "Marie Koffi a payé sa cotisation - Tontine des Femmes": "Marie Koffi sú xó tɔn - Nyɔ̌nu lɛ sín asú",
    "Il y a 2 heures": "Gan 2 ɖíe",
    "Nouveau membre": "Mɛ yɔ̌yɔ́",
    "Jean Dossou a rejoint Association des Artisans": "Jean Dossou byɔ Artisan-gbɛ́ mɛ",
    "Il y a 5 heures": "Gan 5 ɖíe",
    "Distribution effectuée": "Mímá ko nyí",
    "Cagnotte distribuée à Sophie Agbota": "È sɔ́ akwɛ́ ɔ ná Sophie Agbota",
    "Hier": "Sɔ",
    "Paiement effectuée": "È sú xó",
    "Paiement effectué": "È sú xó",
    "Vous avez payé votre cotisation - Association des Artisans": "A ko sú xó towe - Artisan-gbɛ́",
    "Il y a 2 jours": "Azǎn 2 ɖíe",
    "Vérification d'identité requise": "È ɖó na tuùn mɛ̌ ka nyí we é",
    "Complétez votre KYC pour les fonctionnalités financières": "Fó KYC towe bá mɔ akwɛ́ sín azɔ̌ lɛ",
    "Vérifier": "Gbéjé kpɔ́n",
    "Score de Confiance": "Jiɖe sín akɔ́",
    "Alertes Multi-Canal": "Gbè vovo lɛ",
    "Analyse de Risque IA": "IA sín Ayi kpíkpé",
    "Blockchain Polygon": "Blockchain Polygon",
    "Voir tout": "Kpɔ́n bǐ",
    "Payer": "Sú xó",
    "Messagerie": "Wɛn lɛ",
    "Cotonou": "Xɔgbonu (Cotonou)",
    "Association des Femmes de Dantokpa": "Dantokpa-nyɔ̌nu lɛ",
    "Tontine commerciale pour les revendeuses": "Ajɔ̌watɔ́ lɛ sín asú",
    "Membres": "Mɛ lɛ",
    "Cotisation": "Akwɛ́ kplé",
    "Total": "Bǐ",
    "Prochaine": "E ja é",
    "Crée par": "È bló gbɔn"
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
    btn.style.marginLeft = '16px';
    
    // Inject near "TontineChain • Cotonou" badge in Hero if exists
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
