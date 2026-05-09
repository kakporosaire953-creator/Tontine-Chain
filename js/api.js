// ================================================
// TONTINECHAIN — API Service (Laravel Backend)
// ================================================

const API_BASE_URL = 'https://tonnine-benin-backend.onrender.com/api/v1';

const API = {
    async request(endpoint, options = {}) {
        const token = localStorage.getItem('authToken');
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` }),
            ...options.headers
        };

        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                ...options,
                headers
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Une erreur est survenue');
            }

            return data;
        } catch (error) {
            console.error(`API Error (${endpoint}):`, error);
            throw error;
        }
    },

    // Auth
    auth: {
        async requestOTP(phone) {
            return API.request('/auth/request-otp', {
                method: 'POST',
                body: JSON.stringify({ phone })
            });
        },
        async verifyOTP(phone, code) {
            return API.request('/auth/verify-otp', {
                method: 'POST',
                body: JSON.stringify({ phone, code })
            });
        }
    },

    // User
    user: {
        async getProfile() {
            return API.request('/users/me');
        },
        async updateProfile(data) {
            return API.request('/users/me', {
                method: 'PATCH',
                body: JSON.stringify(data)
            });
        },
        async getScore() {
            return API.request('/users/me/score');
        },
        async getBalance() {
            return API.request('/users/me/balance');
        },
        async getPayouts() {
            return API.request('/users/me/payouts');
        }
    },

    // Groups
    groups: {
        async list() {
            return API.request('/groups');
        },
        async create(data) {
            return API.request('/groups', {
                method: 'POST',
                body: JSON.stringify(data)
            });
        },
        async getDetails(groupId) {
            return API.request(`/groups/${groupId}`);
        },
        async join(groupId) {
            return API.request(`/groups/${groupId}/join`, { method: 'POST' });
        },
        async getStats(groupId) {
            return API.request(`/groups/${groupId}/stats`);
        }
    },

    // Contributions
    contributions: {
        async getPending() {
            return API.request('/contributions/pending');
        },
        async pay(contributionId) {
            return API.request(`/contributions/${contributionId}/pay`, { method: 'POST' });
        }
    }
};
