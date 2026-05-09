// ================================================
// TONTINECHAIN — API Service (Laravel Backend)
// ================================================

const API_BASE_URL = 'https://tonnine-benin-backend.onrender.com/api/v1';

// Configure axios instance
const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// Request interceptor - Add token to all requests
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        console.log(`[API] ${config.method.toUpperCase()} ${config.url}`);
        return config;
    },
    (error) => {
        console.error('[API] Request error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor - Handle responses and errors
axiosInstance.interceptors.response.use(
    (response) => {
        console.log(`[API] Response:`, response.status, response.data);
        
        // Laravel data unwrapping
        if (response.data && response.data.data !== undefined) {
            return { ...response, data: response.data.data };
        }
        return response;
    },
    (error) => {
        console.error('[API Error]:', error.response || error);
        
        // Handle 401 Unauthorized
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            if (!window.location.pathname.includes('login.html')) {
                window.location.href = 'login.html';
            }
        }
        
        // Extract error message
        const message = error.response?.data?.message 
            || error.response?.data?.error 
            || error.message 
            || `HTTP ${error.response?.status || 'Error'}`;
        
        return Promise.reject(new Error(message));
    }
);

const API = {
    async request(endpoint, options = {}) {
        try {
            const response = await axiosInstance({
                url: endpoint,
                method: options.method || 'GET',
                data: options.body ? JSON.parse(options.body) : undefined,
                headers: options.headers
            });
            return response.data;
        } catch (error) {
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
