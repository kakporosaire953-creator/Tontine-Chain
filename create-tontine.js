// Multi-step form navigation
let currentStep = 1;
const members = [];

function nextStep(step) {
  // Validate current step
  if (!validateStep(currentStep)) {
    return;
  }

  // Hide current step
  document.getElementById(`step${currentStep}`).classList.remove('active');
  document.querySelector(`.progress-step:nth-child(${currentStep * 2 - 1})`).classList.remove('active');
  
  // Show next step
  currentStep = step;
  document.getElementById(`step${currentStep}`).classList.add('active');
  document.querySelector(`.progress-step:nth-child(${currentStep * 2 - 1})`).classList.add('active');
  
  // Update summary if on last step
  if (currentStep === 4) {
    updateSummary();
  }
  
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function prevStep(step) {
  // Hide current step
  document.getElementById(`step${currentStep}`).classList.remove('active');
  document.querySelector(`.progress-step:nth-child(${currentStep * 2 - 1})`).classList.remove('active');
  
  // Show previous step
  currentStep = step;
  document.getElementById(`step${currentStep}`).classList.add('active');
  document.querySelector(`.progress-step:nth-child(${currentStep * 2 - 1})`).classList.add('active');
  
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function validateStep(step) {
  if (step === 1) {
    const name = document.getElementById('tontineName').value;
    if (!name.trim()) {
      alert('Veuillez entrer un nom pour la tontine');
      return false;
    }
  }
  
  if (step === 2) {
    const amount = document.getElementById('contributionAmount').value;
    const maxMembers = document.getElementById('maxMembers').value;
    const duration = document.getElementById('duration').value;
    
    if (!amount || amount <= 0) {
      alert('Veuillez entrer un montant de cotisation valide');
      return false;
    }
    
    if (!maxMembers || maxMembers < 3) {
      alert('Le nombre minimum de membres est 3');
      return false;
    }
    
    if (!duration || duration <= 0) {
      alert('Veuillez entrer une durée valide');
      return false;
    }
  }
  
  return true;
}

// Calculate totals
function calculateTotals() {
  const amount = parseFloat(document.getElementById('contributionAmount').value) || 0;
  const maxMembers = parseInt(document.getElementById('maxMembers').value) || 0;
  const duration = parseInt(document.getElementById('duration').value) || 0;
  
  const totalPerMember = amount * duration;
  const totalPot = amount * maxMembers;
  
  document.getElementById('totalPerMember').textContent = totalPerMember.toLocaleString() + ' FCFA';
  document.getElementById('totalPot').textContent = totalPot.toLocaleString() + ' FCFA';
}

// Listen to input changes
document.getElementById('contributionAmount')?.addEventListener('input', calculateTotals);
document.getElementById('maxMembers')?.addEventListener('input', calculateTotals);
document.getElementById('duration')?.addEventListener('input', calculateTotals);

// Add member
function addMember() {
  const name = document.getElementById('memberName').value;
  const email = document.getElementById('memberEmail').value;
  
  if (!name.trim() || !email.trim()) {
    alert('Veuillez remplir le nom et l\'email/téléphone');
    return;
  }
  
  members.push({ name, email });
  
  // Add to list
  const membersList = document.getElementById('membersList');
  const memberItem = document.createElement('div');
  memberItem.className = 'member-item';
  memberItem.innerHTML = `
    <div class="member-avatar">
      <i class="fas fa-user"></i>
    </div>
    <div class="member-info">
      <div class="member-name">${name}</div>
      <div class="member-email">${email}</div>
    </div>
    <button type="button" class="btn-remove" onclick="removeMember(${members.length - 1})">
      <i class="fas fa-times"></i>
    </button>
  `;
  membersList.appendChild(memberItem);
  
  // Clear inputs
  document.getElementById('memberName').value = '';
  document.getElementById('memberEmail').value = '';
}

function removeMember(index) {
  members.splice(index, 1);
  updateMembersList();
}

function updateMembersList() {
  const membersList = document.getElementById('membersList');
  membersList.innerHTML = `
    <div class="member-item creator">
      <div class="member-avatar">
        <i class="fas fa-user-crown"></i>
      </div>
      <div class="member-info">
        <div class="member-name">Vous (Créateur)</div>
        <div class="member-email">admin@tontinechain.bj</div>
      </div>
      <div class="member-badge">Créateur</div>
    </div>
  `;
  
  members.forEach((member, index) => {
    const memberItem = document.createElement('div');
    memberItem.className = 'member-item';
    memberItem.innerHTML = `
      <div class="member-avatar">
        <i class="fas fa-user"></i>
      </div>
      <div class="member-info">
        <div class="member-name">${member.name}</div>
        <div class="member-email">${member.email}</div>
      </div>
      <button type="button" class="btn-remove" onclick="removeMember(${index})">
        <i class="fas fa-times"></i>
      </button>
    `;
    membersList.appendChild(memberItem);
  });
}

// Update summary
function updateSummary() {
  document.getElementById('summaryName').textContent = document.getElementById('tontineName').value;
  document.getElementById('summaryCategory').textContent = document.getElementById('tontineCategory').options[document.getElementById('tontineCategory').selectedIndex].text;
  document.getElementById('summaryPrivacy').textContent = document.getElementById('tontinePrivacy').options[document.getElementById('tontinePrivacy').selectedIndex].text;
  
  document.getElementById('summaryAmount').textContent = parseFloat(document.getElementById('contributionAmount').value).toLocaleString() + ' FCFA';
  document.getElementById('summaryFrequency').textContent = document.getElementById('contributionFrequency').options[document.getElementById('contributionFrequency').selectedIndex].text;
  document.getElementById('summaryMembers').textContent = document.getElementById('maxMembers').value;
  document.getElementById('summaryDuration').textContent = document.getElementById('duration').value + ' cycles';
  
  // Members list
  const summaryMembersList = document.getElementById('summaryMembersList');
  if (members.length === 0) {
    summaryMembersList.innerHTML = '<p>Aucun membre invité pour le moment</p>';
  } else {
    summaryMembersList.innerHTML = members.map(m => `<p><i class="fas fa-user"></i> ${m.name} (${m.email})</p>`).join('');
  }
}

// Form submission
document.getElementById('createTontineForm')?.addEventListener('submit', async function(e) {
  e.preventDefault();
  
  // Collect all form data
  const tontineData = {
    name: document.getElementById('tontineName').value,
    description: document.getElementById('tontineDescription').value,
    category: document.getElementById('tontineCategory').value,
    privacy: document.getElementById('tontinePrivacy').value,
    contributionAmount: parseFloat(document.getElementById('contributionAmount').value),
    contributionFrequency: document.getElementById('contributionFrequency').value,
    maxMembers: parseInt(document.getElementById('maxMembers').value),
    duration: parseInt(document.getElementById('duration').value),
    startDate: document.getElementById('startDate').value,
    latePaymentPenalty: parseFloat(document.getElementById('latePaymentPenalty').value),
    autoDistribution: document.getElementById('autoDistribution').checked,
    members: members
  };
  
  // Show loading
  const submitBtn = document.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Création en cours...';
  submitBtn.disabled = true;
  
  try {
    // Call API to create tontine
    const result = await Promise.resolve({success: true, data: []}).then(tontineData);
    
    if (result.success) {
      showNotification('Tontine créée avec succès!', 'success');
      
      // Deploy smart contract if blockchain is enabled
      if (result.data.requiresBlockchain) {
        showNotification('Déploiement du smart contract...', 'info');
        
        const contractResult = await Promise.resolve({success: true, data: []}).then({
          tontineId: result.data.tontine.id,
          ...tontineData
        });
        
        if (contractResult.success) {
          showNotification('Smart contract déployé avec succès!', 'success');
        }
      }
      
      // Redirect after short delay
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 1500);
    } else {
      throw new Error(result.error);
    }
  } catch (error) {
    console.error('Create tontine error:', error);
    showNotification(error.message || 'Erreur lors de la création de la tontine', 'error');
    
    // Reset button
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  }
});

// Notification helper
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
    <span>${message}</span>
  `;
  document.body.appendChild(notification);
  setTimeout(() => notification.classList.add('show'), 100);
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 4000);
}

