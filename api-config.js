// API Configuration for TontineChain Backend
// This file centralizes all API endpoints and configuration

const API_CONFIG = {
  // Base URL - Change this to your actual backend URL
  BASE_URL: process.env.API_URL || 'http://localhost:3000/api',
  
  // API Version
  VERSION: 'v1',
  
  // Timeout settings
  TIMEOUT: 30000, // 30 seconds
  
  // Endpoints
  ENDPOINTS: {
    // Authentication
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      LOGOUT: '/auth/logout',
      REFRESH_TOKEN: '/auth/refresh',
      FORGOT_PASSWORD: '/auth/forgot-password',
      RESET_PASSWORD: '/auth/reset-password',
      VERIFY_EMAIL: '/auth/verify-email',
      CONNECT_WALLET: '/auth/connect-wallet'
    },
    
    // User Management
    USER: {
      PROFILE: '/user/profile',
      UPDATE_PROFILE: '/user/profile/update',
      CHANGE_PASSWORD: '/user/change-password',
      UPLOAD_AVATAR: '/user/avatar',
      GET_STATS: '/user/stats',
      GET_NOTIFICATIONS: '/user/notifications',
      MARK_NOTIFICATION_READ: '/user/notifications/:id/read'
    },
    
    // Tontine Management
    TONTINE: {
      CREATE: '/tontine/create',
      LIST: '/tontine/list',
      GET_BY_ID: '/tontine/:id',
      UPDATE: '/tontine/:id/update',
      DELETE: '/tontine/:id/delete',
      JOIN: '/tontine/:id/join',
      LEAVE: '/tontine/:id/leave',
      GET_MEMBERS: '/tontine/:id/members',
      ADD_MEMBER: '/tontine/:id/members/add',
      REMOVE_MEMBER: '/tontine/:id/members/:memberId/remove',
      GET_HISTORY: '/tontine/:id/history',
      GET_STATS: '/tontine/:id/stats',
      SEARCH: '/tontine/search',
      JOIN_BY_CODE: '/tontine/join-by-code'
    },
    
    // Payment Management
    PAYMENT: {
      MAKE_PAYMENT: '/payment/make',
      GET_HISTORY: '/payment/history',
      GET_METHODS: '/payment/methods',
      ADD_METHOD: '/payment/methods/add',
      REMOVE_METHOD: '/payment/methods/:id/remove',
      VERIFY_PAYMENT: '/payment/:id/verify',
      GET_PENDING: '/payment/pending',
      MOBILE_MONEY: '/payment/mobile-money',
      CARD_PAYMENT: '/payment/card',
      CRYPTO_PAYMENT: '/payment/crypto'
    },
    
    // Blockchain Integration
    BLOCKCHAIN: {
      DEPLOY_CONTRACT: '/blockchain/deploy',
      GET_CONTRACT: '/blockchain/contract/:address',
      VERIFY_TRANSACTION: '/blockchain/transaction/:hash',
      GET_BALANCE: '/blockchain/balance/:address',
      GET_GAS_PRICE: '/blockchain/gas-price',
      ESTIMATE_GAS: '/blockchain/estimate-gas'
    },
    
    // Messaging
    MESSAGING: {
      GET_CONVERSATIONS: '/messaging/conversations',
      GET_MESSAGES: '/messaging/conversations/:id/messages',
      SEND_MESSAGE: '/messaging/conversations/:id/send',
      CREATE_CONVERSATION: '/messaging/conversations/create',
      MARK_AS_READ: '/messaging/conversations/:id/read',
      UPLOAD_FILE: '/messaging/upload'
    },
    
    // YAO Assistant (AI)
    YAO: {
      SEND_MESSAGE: '/yao/message',
      GET_HISTORY: '/yao/history',
      GET_SUGGESTIONS: '/yao/suggestions',
      ANALYZE_HABITS: '/yao/analyze',
      GET_RECOMMENDATIONS: '/yao/recommendations'
    },
    
    // Dashboard & Analytics
    DASHBOARD: {
      GET_OVERVIEW: '/dashboard/overview',
      GET_STATS: '/dashboard/stats',
      GET_RECENT_ACTIVITY: '/dashboard/activity',
      GET_CHARTS_DATA: '/dashboard/charts'
    }
  }
};

// Helper function to build full URL
function buildUrl(endpoint, params = {}) {
  let url = `${API_CONFIG.BASE_URL}${endpoint}`;
  
  // Replace path parameters
  Object.keys(params).forEach(key => {
    url = url.replace(`:${key}`, params[key]);
  });
  
  return url;
}

// Helper function to get auth headers
function getAuthHeaders() {
  const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : ''
  };
}

// Export configuration
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { API_CONFIG, buildUrl, getAuthHeaders };
}
