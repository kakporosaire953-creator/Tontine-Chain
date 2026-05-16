// YAO Assistant JavaScript

const yaoResponses = {
  'prochaine échéance': {
    text: 'Votre prochaine échéance est le <strong>15 Mars 2026</strong> pour la tontine "Femmes Entrepreneures".<br><br>Montant à payer : <strong>50,000 FCFA</strong><br><br>Voulez-vous programmer un rappel ?',
    suggestions: ['Oui, rappelle-moi', 'Voir toutes mes échéances', 'Payer maintenant']
  },
  'analyse': {
    text: '<i class="fas fa-chart-bar" style="color:var(--blue-primary)"></i> <strong>Analyse de vos habitudes d\'épargne</strong><br><br><i class="fas fa-check-circle" style="color:var(--green-dark)"></i> Taux de paiement : <strong>100%</strong> (Excellent !)<br><i class="fas fa-coins" style="color:var(--gold-primary)"></i> Épargne mensuelle moyenne : <strong>175,000 FCFA</strong><br><i class="fas fa-chart-line" style="color:var(--blue-primary)"></i> Progression : <strong>+15%</strong> vs mois dernier<br><br>Vous êtes dans le top 10% des épargnants les plus réguliers !',
    suggestions: ['Voir les détails', 'Conseils d\'optimisation', 'Comparer avec d\'autres']
  },
  'optimiser': {
    text: '<i class="fas fa-lightbulb" style="color:var(--gold-primary)"></i> <strong>Conseils pour optimiser vos cotisations</strong><br><br>1. Augmentez votre cotisation mensuelle de 10% pour atteindre vos objectifs plus rapidement<br>2. Rejoignez une tontine à fréquence hebdomadaire pour une épargne plus régulière<br>3. Diversifiez avec une tontine à montant plus élevé<br><br>Voulez-vous que je vous aide à créer une nouvelle tontine ?',
    suggestions: ['Créer une tontine', 'Voir les tontines disponibles', 'Plus de conseils']
  },
  'résumé': {
    text: '<i class="fas fa-clipboard-list" style="color:var(--blue-primary)"></i> <strong>Résumé de vos tontines</strong><br><br><i class="fas fa-circle" style="color:var(--green-dark)"></i> <strong>3 tontines actives</strong><br>• Femmes Entrepreneures (12 membres)<br>• Commerçantes Dantokpa (8 membres)<br>• Artisanes Porto-Novo (10 membres)<br><br><i class="fas fa-coins" style="color:var(--gold-primary)"></i> Total épargné : <strong>2,450,000 FCFA</strong><br><i class="fas fa-calendar-alt" style="color:var(--blue-primary)"></i> Prochaine distribution : <strong>20 Mars 2026</strong>',
    suggestions: ['Voir les détails', 'Créer une nouvelle tontine', 'Inviter des membres']
  },
  'default': {
    text: 'Je comprends votre question. Voici ce que je peux vous dire :<br><br>Pour des informations plus précises, n\'hésitez pas à reformuler votre question ou à utiliser les suggestions ci-dessous.',
    suggestions: ['Mes échéances', 'Mes statistiques', 'Aide']
  }
};

async function sendMessage() {
  const input = document.getElementById('yaoInput');
  const message = input.value.trim();
  
  if (!message) return;
  
  // Add user message
  addMessage(message, 'user');
  
  // Clear input
  input.value = '';
  
  // Show typing indicator
  showTyping();
  
  try {
    // Call YAO API
    const result = await Promise.resolve({success: true, data: []}).then(message, {
      userId: localStorage.getItem('userId'),
      timestamp: new Date().toISOString()
    });
    
    hideTyping();
    
    if (result.success) {
      const response = result.data;
      addMessage(response.message, 'bot', response.suggestions || []);
    } else {
      // Fallback to local responses
      const response = getYaoResponse(message);
      addMessage(response.text, 'bot', response.suggestions);
    }
  } catch (error) {
    console.error('YAO message error:', error);
    hideTyping();
    
    // Fallback to local responses
    const response = getYaoResponse(message);
    addMessage(response.text, 'bot', response.suggestions);
  }
}

function addMessage(text, type, suggestions = []) {
  const messagesContainer = document.getElementById('yaoMessages');
  const messageDiv = document.createElement('div');
  messageDiv.className = `yao-message yao-${type}`;
  
  const time = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  
  if (type === 'user') {
    messageDiv.innerHTML = `
      <div class="message-content">
        <div class="message-bubble">
          <p>${text}</p>
        </div>
        <div class="message-time">${time}</div>
      </div>
      <div class="message-avatar">
        <i class="fas fa-user"></i>
      </div>
    `;
  } else {
    let suggestionsHTML = '';
    if (suggestions.length > 0) {
      suggestionsHTML = '<div class="message-suggestions">';
      suggestions.forEach(s => {
        suggestionsHTML += `<button class="suggestion-chip" onclick="sendSuggestion('${s}')">${s}</button>`;
      });
      suggestionsHTML += '</div>';
    }
    
    messageDiv.innerHTML = `
      <div class="message-avatar">
        <i class="fas fa-robot"></i>
      </div>
      <div class="message-content">
        <div class="message-bubble">
          <p>${text}</p>
        </div>
        ${suggestionsHTML}
        <div class="message-time">${time}</div>
      </div>
    `;
  }
  
  messagesContainer.appendChild(messageDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function showTyping() {
  const messagesContainer = document.getElementById('yaoMessages');
  const typingDiv = document.createElement('div');
  typingDiv.className = 'yao-message yao-bot typing-indicator';
  typingDiv.id = 'typingIndicator';
  typingDiv.innerHTML = `
    <div class="message-avatar">
      <i class="fas fa-robot"></i>
    </div>
    <div class="message-content">
      <div class="message-bubble">
        <div class="typing-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  `;
  messagesContainer.appendChild(typingDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function hideTyping() {
  const typingIndicator = document.getElementById('typingIndicator');
  if (typingIndicator) {
    typingIndicator.remove();
  }
}

function getYaoResponse(message) {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('échéance') || lowerMessage.includes('prochain')) {
    return yaoResponses['prochaine échéance'];
  } else if (lowerMessage.includes('analyse') || lowerMessage.includes('habitude')) {
    return yaoResponses['analyse'];
  } else if (lowerMessage.includes('optimis') || lowerMessage.includes('conseil')) {
    return yaoResponses['optimiser'];
  } else if (lowerMessage.includes('résumé') || lowerMessage.includes('liste')) {
    return yaoResponses['résumé'];
  } else {
    return yaoResponses['default'];
  }
}

function sendSuggestion(text) {
  document.getElementById('yaoInput').value = text;
  sendMessage();
}

function handleKeyPress(event) {
  if (event.key === 'Enter') {
    sendMessage();
  }
}

function clearChat() {
  if (confirm('Voulez-vous vraiment effacer cette conversation ?')) {
    const messagesContainer = document.getElementById('yaoMessages');
    messagesContainer.innerHTML = `
      <div class="yao-message yao-bot">
        <div class="message-avatar">
          <i class="fas fa-robot"></i>
        </div>
        <div class="message-content">
          <div class="message-bubble">
            <p><i class="fas fa-hand-sparkles" style="color:var(--gold-primary)"></i> Nouvelle conversation démarrée ! Comment puis-je vous aider ?</p>
          </div>
          <div class="message-time">Maintenant</div>
        </div>
      </div>
    `;
  }
}

// Auto-focus input on load
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('yaoInput')?.focus();
});

