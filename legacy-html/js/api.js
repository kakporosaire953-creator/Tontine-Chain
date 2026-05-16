// API Service - TontineChain Backend
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
            console.log(`[API] ${options.method || 'GET'} ${endpoint}`);
            
            // Add timeout to fetch
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
            
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                ...options,
                headers,
                mode: 'cors',
                credentials: 'omit',
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);

            let data;
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                data = await response.json();
            } else {
                const text = await response.text();
                console.warn(`[API] Non-JSON response:`, text);
                data = { message: text };
            }

            console.log(`[API] Response:`, response.status, data);

            if (!response.ok) {
                if (response.status === 401) {
                    localStorage.removeItem('authToken');
                    if (!window.location.pathname.includes('login.html') && !window.location.pathname.includes('signup.html')) {
                        window.location.href = 'login.html';
                    }
                }
                throw new Error(data.message || data.error || `HTTP ${response.status}`);
            }

            // Laravel data unwrapping
            if (data.data !== undefined) {
                return data.data;
            }
            return data;
        } catch (error) {
            console.error(`[API Error] ${endpoint}:`, error);
            
            // Better error messages for network issues
            if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
                throw new Error('Impossible de se connecter au serveur. Vérifiez votre connexion internet ou réessayez dans quelques instants.');
            }
            
            throw error;
        }
    },

    // Auth
    auth: {
        async requestOTP(email) {
            return API.request('/auth/request-otp', {
                method: 'POST',
                body: JSON.stringify({ email })
            });
        },
        async verifyOTP(email, code) {
            return API.request('/auth/verify-otp', {
                method: 'POST',
                body: JSON.stringify({ email, code })
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
