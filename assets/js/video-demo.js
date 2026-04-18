// ============================================
// TontineChain - Vidéo Démo Interactive
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const video = document.querySelector('.demo-video');
    const playPauseBtn = document.querySelector('.video-play-pause');
    const soundBtn = document.querySelector('.video-sound');
    const progressBar = document.querySelector('.video-progress-bar');
    const progressContainer = document.querySelector('.video-progress');
    const demoSteps = document.querySelectorAll('.demo-step');
    
    if (!video) {
        console.log('⚠️ Vidéo non trouvée - Utilisation du fallback');
        return;
    }
    
    // Gestion lecture/pause
    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', function() {
            if (video.paused) {
                video.play();
                this.querySelector('i').classList.replace('fa-play', 'fa-pause');
            } else {
                video.pause();
                this.querySelector('i').classList.replace('fa-pause', 'fa-play');
            }
        });
    }
    
    // Gestion du son
    if (soundBtn) {
        soundBtn.addEventListener('click', function() {
            video.muted = !video.muted;
            const icon = this.querySelector('i');
            if (video.muted) {
                icon.classList.replace('fa-volume-up', 'fa-volume-mute');
            } else {
                icon.classList.replace('fa-volume-mute', 'fa-volume-up');
            }
        });
    }
    
    // Mise à jour de la barre de progression
    video.addEventListener('timeupdate', function() {
        const progress = (video.currentTime / video.duration) * 100;
        if (progressBar) {
            progressBar.style.width = progress + '%';
        }
        
        // Mise à jour des étapes en fonction du temps
        updateDemoSteps(video.currentTime, video.duration);
    });
    
    // Clic sur la barre de progression
    if (progressContainer) {
        progressContainer.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const pos = (e.clientX - rect.left) / rect.width;
            video.currentTime = pos * video.duration;
        });
    }
    
    // Fonction pour mettre à jour les étapes actives
    function updateDemoSteps(currentTime, duration) {
        const progress = currentTime / duration;
        
        // Diviser la vidéo en 4 parties égales pour les 4 étapes
        demoSteps.forEach((step, index) => {
            const stepStart = index / 4;
            const stepEnd = (index + 1) / 4;
            
            if (progress >= stepStart && progress < stepEnd) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
        
        // Dernière étape
        if (progress >= 0.75) {
            demoSteps[3]?.classList.add('active');
        }
    }
    
    // Clic sur les étapes pour naviguer
    demoSteps.forEach((step, index) => {
        step.addEventListener('click', function() {
            const targetTime = (index / 4) * video.duration;
            video.currentTime = targetTime;
            video.play();
            if (playPauseBtn) {
                playPauseBtn.querySelector('i').classList.replace('fa-play', 'fa-pause');
            }
        });
    });
    
    // Gestion de la fin de la vidéo
    video.addEventListener('ended', function() {
        if (playPauseBtn) {
            playPauseBtn.querySelector('i').classList.replace('fa-pause', 'fa-play');
        }
        // Recommencer automatiquement (loop)
        video.currentTime = 0;
        video.play();
    });
    
    // Gestion des erreurs de chargement vidéo
    video.addEventListener('error', function() {
        console.error('❌ Erreur de chargement de la vidéo');
        // Afficher le fallback
        const fallback = document.querySelector('.video-fallback');
        if (fallback) {
            fallback.style.display = 'flex';
            video.style.display = 'none';
        }
    });
    
    // Animation du fallback si pas de vidéo
    const fallbackSteps = [
        {
            title: 'Inscription',
            fields: ['Votre nom', 'Votre téléphone', 'Mot de passe'],
            button: 'S\'inscrire'
        },
        {
            title: 'Connexion',
            fields: ['Email ou Téléphone', 'Mot de passe'],
            button: 'Se connecter'
        },
        {
            title: 'Dashboard',
            fields: ['3 Tontines actives', '450,000 FCFA', 'Prochain tour: 15 Mars'],
            button: 'Voir mes tontines'
        },
        {
            title: 'Créer Tontine',
            fields: ['Nom de la tontine', 'Nombre de membres', 'Montant cotisation'],
            button: 'Créer'
        }
    ];
    
    let currentFallbackStep = 0;
    
    function animateFallback() {
        const fallbackContent = document.querySelector('.fallback-content');
        if (!fallbackContent) return;
        
        const step = fallbackSteps[currentFallbackStep];
        
        fallbackContent.innerHTML = `
            <div class="step-screen">
                <div class="screen-header">
                    <h3>${step.title}</h3>
                </div>
                <div class="screen-body">
                    <div class="form-demo">
                        ${step.fields.map(field => `<div class="input-demo">${field}</div>`).join('')}
                        <div class="button-demo">${step.button}</div>
                    </div>
                </div>
            </div>
        `;
        
        // Mettre à jour les étapes
        demoSteps.forEach((stepEl, index) => {
            if (index === currentFallbackStep) {
                stepEl.classList.add('active');
            } else {
                stepEl.classList.remove('active');
            }
        });
        
        currentFallbackStep = (currentFallbackStep + 1) % fallbackSteps.length;
    }
    
    // Si pas de vidéo, animer le fallback
    if (video.error || !video.src) {
        setInterval(animateFallback, 3000);
        animateFallback();
    }
    
    console.log('🎥 Vidéo démo initialisée');
});
