// ============================================
// TontineChain - Création de Tontine
// ============================================

let currentStep = 1;
const totalSteps = 4;
let members = [
    { name: 'Adjovi Kossou', email: 'adjovi@example.com', role: 'Organisateur', confirmed: true }
];

function nextStep() {
    if (validateStep(currentStep)) {
        if (currentStep < totalSteps) {
            // Hide current step
            document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.remove('active');
            document.querySelectorAll('.creation-steps .step')[currentStep - 1].classList.remove('active');
            
            // Show next step
            currentStep++;
            document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.add('active');
            document.querySelectorAll('.creation-steps .step')[currentStep - 1].classList.add('active');
            
            // Update summary if on last step
            if (currentStep === 4) {
                updateSummary();
            }
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
}

function prevStep() {
    if (currentStep > 1) {
        // Hide current step
        document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.remove('active');
        document.querySelectorAll('.creation-steps .step')[currentStep - 1].classList.remove('active');
        
        // Show previous step
        currentStep--;
        document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.add('active');
        document.querySelectorAll('.creation-steps .step')[currentStep - 1].classList.add('active');
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function validateStep(step) {
    const currentStepElement = document.querySelector(`.form-step[data-step="${step}"]`);
    const inputs = currentStepElement.querySelectorAll('input[required], select[required], textarea[required]');
    
    let isValid = true;
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });
    
    if (!isValid) {
        showNotification('Veuillez remplir tous les champs requis', 'error');
    }
    
    return isValid;
}

function addMember() {
    const nameInput = document.getElementById('memberName');
    const emailInput = document.getElementById('memberEmail');
    
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    
    if (!name || !email) {
        showNotification('Veuillez remplir le nom et l\'email', 'error');
        return;
    }
    
    // Add member to list
    members.push({
        name: name,
        email: email,
        role: 'Membre',
        confirmed: false
    });
    
    // Update UI
    renderMembers();
    
    // Clear inputs
    nameInput.value = '';
    emailInput.value = '';
    
    showNotification('Membre ajouté avec succès', 'success');
}

function renderMembers() {
    const membersList = document.querySelector('.members-list');
    membersList.innerHTML = '';
    
    members.forEach((member, index) => {
        const initial = member.name.charAt(0).toUpperCase();
        const statusClass = member.confirmed ? 'paid' : 'pending';
        const statusText = member.confirmed ? 'Confirmé' : 'En attente';
        
        const memberHTML = `
            <div class="member-item">
                <div class="member-avatar">${initial}</div>
                <div class="member-info">
                    <div class="member-name">${member.name}${index === 0 ? ' (Vous)' : ''}</div>
                    <div class="member-role">${member.role}</div>
                </div>
                <span class="member-status ${statusClass}">${statusText}</span>
                ${index > 0 ? `<button type="button" class="btn-icon-delete" onclick="removeMember(${index})"><i class="fas fa-times"></i></button>` : ''}
            </div>
        `;
        
        membersList.insertAdjacentHTML('beforeend', memberHTML);
    });
}

function removeMember(index) {
    members.splice(index, 1);
    renderMembers();
    showNotification('Membre retiré', 'info');
}

function updateSummary() {
    const name = document.getElementById('tontineName').value;
    const cotisation = document.getElementById('cotisation').value;
    const frequence = document.getElementById('frequence').value;
    const duree = document.getElementById('duree').value;
    
    document.getElementById('summaryName').textContent = name;
    document.getElementById('summaryMembers').textContent = members.length;
    document.getElementById('summaryCotisation').textContent = formatNumber(cotisation) + ' FCFA';
    document.getElementById('summaryFrequence').textContent = frequence.charAt(0).toUpperCase() + frequence.slice(1);
    
    const cagnotte = cotisation * members.length;
    document.getElementById('summaryCagnotte').textContent = formatNumber(cagnotte) + ' FCFA';
}

function formatNumber(num) {
    return parseInt(num).toLocaleString('fr-FR');
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Form submission
document.getElementById('createTontineForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Show loading
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalHTML = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Déploiement en cours...</span>';
    submitBtn.disabled = true;
    
    // Simulate blockchain deployment
    setTimeout(() => {
        showNotification('Smart contract déployé avec succès !', 'success');
        
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 2000);
    }, 3000);
});

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    renderMembers();
    console.log('✨ Create Tontine initialized');
});
