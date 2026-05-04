// API Service Layer for TontineChain
// Handles all HTTP requests to the backend

class ApiService {
  constructor() {
    this.baseUrl = API_CONFIG.BASE_URL;
    this.timeout = API_CONFIG.TIMEOUT;
  }

  // Generic request handler
  async request(endpoint, options = {}) {
    const url = buildUrl(endpoint, options.params || {});
    const config = {
      method: options.method || 'GET',
      headers: {
        ...getAuthHeaders(),
        ...options.headers
      },
      signal: AbortSignal.timeout(this.timeout)
    };

    if (options.body) {
      config.body = JSON.stringify(options.body);
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Une erreur est survenue');
      }

      return { success: true, data };
    } catch (error) {
      console.error('API Error:', error);
      return { 
        success: false, 
        error: error.message || 'Erreur de connexion au serveur' 
      };
    }
  }

  // Authentication Methods
  async login(email, password, remember = false) {
    return this.request(API_CONFIG.ENDPOINTS.AUTH.LOGIN, {
      method: 'POST',
      body: { email, password, remember }
    });
  }

  async register(userData) {
    return this.request(API_CONFIG.ENDPOINTS.AUTH.REGISTER, {
      method: 'POST',
      body: userData
    });
  }

  async logout() {
    return this.request(API_CONFIG.ENDPOINTS.AUTH.LOGOUT, {
      method: 'POST'
    });
  }

  async refreshToken() {
    return this.request(API_CONFIG.ENDPOINTS.AUTH.REFRESH_TOKEN, {
      method: 'POST'
    });
  }

  async forgotPassword(email) {
    return this.request(API_CONFIG.ENDPOINTS.AUTH.FORGOT_PASSWORD, {
      method: 'POST',
      body: { email }
    });
  }

  async resetPassword(token, newPassword) {
    return this.request(API_CONFIG.ENDPOINTS.AUTH.RESET_PASSWORD, {
      method: 'POST',
      body: { token, newPassword }
    });
  }

  async connectWallet(walletAddress, signature) {
    return this.request(API_CONFIG.ENDPOINTS.AUTH.CONNECT_WALLET, {
      method: 'POST',
      body: { walletAddress, signature }
    });
  }

  // User Methods
  async getUserProfile() {
    return this.request(API_CONFIG.ENDPOINTS.USER.PROFILE);
  }

  async updateUserProfile(profileData) {
    return this.request(API_CONFIG.ENDPOINTS.USER.UPDATE_PROFILE, {
      method: 'PUT',
      body: profileData
    });
  }

  async changePassword(oldPassword, newPassword) {
    return this.request(API_CONFIG.ENDPOINTS.USER.CHANGE_PASSWORD, {
      method: 'POST',
      body: { oldPassword, newPassword }
    });
  }

  async uploadAvatar(file) {
    const formData = new FormData();
    formData.append('avatar', file);
    
    return this.request(API_CONFIG.ENDPOINTS.USER.UPLOAD_AVATAR, {
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data' },
      body: formData
    });
  }

  async getUserStats() {
    return this.request(API_CONFIG.ENDPOINTS.USER.GET_STATS);
  }

  async getNotifications() {
    return this.request(API_CONFIG.ENDPOINTS.USER.GET_NOTIFICATIONS);
  }

  // Tontine Methods
  async createTontine(tontineData) {
    return this.request(API_CONFIG.ENDPOINTS.TONTINE.CREATE, {
      method: 'POST',
      body: tontineData
    });
  }

  async getTontines(filters = {}) {
    return this.request(API_CONFIG.ENDPOINTS.TONTINE.LIST, {
      method: 'GET',
      params: filters
    });
  }

  async getTontineById(id) {
    return this.request(API_CONFIG.ENDPOINTS.TONTINE.GET_BY_ID, {
      params: { id }
    });
  }

  async updateTontine(id, updateData) {
    return this.request(API_CONFIG.ENDPOINTS.TONTINE.UPDATE, {
      method: 'PUT',
      params: { id },
      body: updateData
    });
  }

  async joinTontine(id) {
    return this.request(API_CONFIG.ENDPOINTS.TONTINE.JOIN, {
      method: 'POST',
      params: { id }
    });
  }

  async joinTontineByCode(inviteCode) {
    return this.request(API_CONFIG.ENDPOINTS.TONTINE.JOIN_BY_CODE, {
      method: 'POST',
      body: { inviteCode }
    });
  }

  async leaveTontine(id) {
    return this.request(API_CONFIG.ENDPOINTS.TONTINE.LEAVE, {
      method: 'POST',
      params: { id }
    });
  }

  async getTontineMembers(id) {
    return this.request(API_CONFIG.ENDPOINTS.TONTINE.GET_MEMBERS, {
      params: { id }
    });
  }

  async addTontineMember(id, memberData) {
    return this.request(API_CONFIG.ENDPOINTS.TONTINE.ADD_MEMBER, {
      method: 'POST',
      params: { id },
      body: memberData
    });
  }

  async getTontineHistory(id) {
    return this.request(API_CONFIG.ENDPOINTS.TONTINE.GET_HISTORY, {
      params: { id }
    });
  }

  async searchTontines(query, filters = {}) {
    return this.request(API_CONFIG.ENDPOINTS.TONTINE.SEARCH, {
      method: 'GET',
      params: { query, ...filters }
    });
  }

  // Payment Methods
  async makePayment(paymentData) {
    return this.request(API_CONFIG.ENDPOINTS.PAYMENT.MAKE_PAYMENT, {
      method: 'POST',
      body: paymentData
    });
  }

  async getPaymentHistory(filters = {}) {
    return this.request(API_CONFIG.ENDPOINTS.PAYMENT.GET_HISTORY, {
      params: filters
    });
  }

  async getPaymentMethods() {
    return this.request(API_CONFIG.ENDPOINTS.PAYMENT.GET_METHODS);
  }

  async addPaymentMethod(methodData) {
    return this.request(API_CONFIG.ENDPOINTS.PAYMENT.ADD_METHOD, {
      method: 'POST',
      body: methodData
    });
  }

  async verifyPayment(paymentId) {
    return this.request(API_CONFIG.ENDPOINTS.PAYMENT.VERIFY_PAYMENT, {
      params: { id: paymentId }
    });
  }

  async getPendingPayments() {
    return this.request(API_CONFIG.ENDPOINTS.PAYMENT.GET_PENDING);
  }

  async processMobileMoneyPayment(paymentData) {
    return this.request(API_CONFIG.ENDPOINTS.PAYMENT.MOBILE_MONEY, {
      method: 'POST',
      body: paymentData
    });
  }

  // Blockchain Methods
  async deploySmartContract(contractData) {
    return this.request(API_CONFIG.ENDPOINTS.BLOCKCHAIN.DEPLOY_CONTRACT, {
      method: 'POST',
      body: contractData
    });
  }

  async getContractInfo(contractAddress) {
    return this.request(API_CONFIG.ENDPOINTS.BLOCKCHAIN.GET_CONTRACT, {
      params: { address: contractAddress }
    });
  }

  async verifyTransaction(txHash) {
    return this.request(API_CONFIG.ENDPOINTS.BLOCKCHAIN.VERIFY_TRANSACTION, {
      params: { hash: txHash }
    });
  }

  async getWalletBalance(address) {
    return this.request(API_CONFIG.ENDPOINTS.BLOCKCHAIN.GET_BALANCE, {
      params: { address }
    });
  }

  async getGasPrice() {
    return this.request(API_CONFIG.ENDPOINTS.BLOCKCHAIN.GET_GAS_PRICE);
  }

  // Messaging Methods
  async getConversations() {
    return this.request(API_CONFIG.ENDPOINTS.MESSAGING.GET_CONVERSATIONS);
  }

  async getMessages(conversationId) {
    return this.request(API_CONFIG.ENDPOINTS.MESSAGING.GET_MESSAGES, {
      params: { id: conversationId }
    });
  }

  async sendMessage(conversationId, message, attachments = []) {
    return this.request(API_CONFIG.ENDPOINTS.MESSAGING.SEND_MESSAGE, {
      method: 'POST',
      params: { id: conversationId },
      body: { message, attachments }
    });
  }

  async createConversation(participants) {
    return this.request(API_CONFIG.ENDPOINTS.MESSAGING.CREATE_CONVERSATION, {
      method: 'POST',
      body: { participants }
    });
  }

  // YAO Assistant Methods
  async sendYaoMessage(message, context = {}) {
    return this.request(API_CONFIG.ENDPOINTS.YAO.SEND_MESSAGE, {
      method: 'POST',
      body: { message, context }
    });
  }

  async getYaoHistory() {
    return this.request(API_CONFIG.ENDPOINTS.YAO.GET_HISTORY);
  }

  async getYaoSuggestions() {
    return this.request(API_CONFIG.ENDPOINTS.YAO.GET_SUGGESTIONS);
  }

  async analyzeHabits() {
    return this.request(API_CONFIG.ENDPOINTS.YAO.ANALYZE_HABITS);
  }

  async getRecommendations() {
    return this.request(API_CONFIG.ENDPOINTS.YAO.GET_RECOMMENDATIONS);
  }

  // Dashboard Methods
  async getDashboardOverview() {
    return this.request(API_CONFIG.ENDPOINTS.DASHBOARD.GET_OVERVIEW);
  }

  async getDashboardStats() {
    return this.request(API_CONFIG.ENDPOINTS.DASHBOARD.GET_STATS);
  }

  async getRecentActivity() {
    return this.request(API_CONFIG.ENDPOINTS.DASHBOARD.GET_RECENT_ACTIVITY);
  }

  async getChartsData() {
    return this.request(API_CONFIG.ENDPOINTS.DASHBOARD.GET_CHARTS_DATA);
  }
}

// Create singleton instance
const apiService = new ApiService();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = apiService;
}
