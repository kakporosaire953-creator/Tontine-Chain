import axios from 'axios';

const API_BASE_URL =
  import.meta?.env?.VITE_API_BASE_URL ||
  'https://tonnine-benin-backend.onrender.com/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Interceptor pour le token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('tontine_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

function toFormUrlEncoded(data) {
  const params = new URLSearchParams();
  Object.entries(data || {}).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    params.append(key, String(value));
  });
  return params;
}

function postForm(path, data, config) {
  // Backend (OnRender) currently expects form-urlencoded for auth endpoints.
  return api.post(path, toFormUrlEncoded(data), {
    ...(config || {}),
    headers: {
      ...(config?.headers || {}),
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
    },
  });
}

// --- Auth ---
export const requestOtp = (data) => api.post('/auth/request-otp', data);
export const verifyOtp = (data) => api.post('/auth/verify-otp', data);

// --- User & Profile ---
export const getMe = () => api.get('/users/me');
export const updateMe = (data) => api.patch('/users/me', data);
export const updateProfile = (data) => api.post('/user/profile', data);
export const getMyScore = () => api.get('/users/me/score');
export const getMyPayouts = () => api.get('/users/me/payouts');
export const getMyBalance = () => api.get('/users/me/balance');
export const getLeaderboard = () => api.get('/users/leaderboard');

/**
 * Upload du document KYC pour analyse IA (OCR + Vérification)
 * @param {FormData} formData - Doit contenir la clé 'document'
 */
export const uploadKyc = (formData) => api.post('/users/me/kyc', formData, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

// --- Groups ---
export const createGroup = (data) => api.post('/groups', data);
export const getGroups = () => api.get('/groups');
export const getGroupDetails = (groupId) => api.get(`/groups/${groupId}`);
export const joinGroup = (groupCodeOrId) => api.post(`/groups/${groupCodeOrId}/join`);
export const startGroup = (groupId) => api.post(`/groups/${groupId}/start`);
export const getGroupStats = (groupId) => api.get(`/groups/${groupId}/stats`);
export const proposeSwap = (groupId, data) => api.post(`/groups/${groupId}/propose-swap`, data);
export const submitBid = (groupId, data) => api.post(`/groups/${groupId}/bid`, data);
export const getBids = (groupId) => api.get(`/groups/${groupId}/bids`);

// --- Contributions ---
export const getPendingContributions = () => api.get('/contributions/pending');
export const initiatePayment = (contributionId) => api.post(`/contributions/${contributionId}/pay`);

// --- Payouts ---
export const getPayoutsList = () => api.get('/payouts');
export const getPayoutDetails = (payoutId) => api.get(`/payouts/${payoutId}`);

// --- Incidents ---
export const getIncidents = () => api.get('/incidents');
export const getIncidentDetails = (incidentId) => api.get(`/incidents/${incidentId}`);

// --- Notifications ---
export const getNotificationsList = () => api.get('/notifications');
export const markNotificationAsRead = (notificationId) => api.patch(`/notifications/${notificationId}/read`);

// --- Votes ---
export const getVotesList = () => api.get('/votes');
export const getVoteDetails = (voteId) => api.get(`/votes/${voteId}`);
export const castVote = (voteId, data) => api.post(`/votes/${voteId}/cast`, data);

// --- AI (YAO Assistant) ---
export const chatWithAi = (data) => api.post('/ai/yao', data);

// --- Messages & Chat ---
export const getMessages = (groupId) => api.get(`/groups/${groupId}/messages`);
export const sendMessage = (groupId, data) => api.post(`/groups/${groupId}/messages`, data);

// --- Actions Spécifiques ---
export const inviteMember = (groupId, data) => api.post(`/groups/${groupId}/invite`, data);
export const downloadContract = (groupId) => api.get(`/groups/${groupId}/contract`, { responseType: 'blob' });

// --- Debug & Testing (MIABE 2026 Only) ---
export const runMigration = () => api.get('/debug/migrate');
export const runCheckDeadlines = () => api.get('/debug/run-deadlines');

export default api;
