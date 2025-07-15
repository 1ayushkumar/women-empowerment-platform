import axios from 'axios';
import toast from 'react-hot-toast';

// Create axios instance
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const message = error.response?.data?.message || 'Something went wrong';
    
    // Handle specific error cases
    if (error.response?.status === 401) {
      // Unauthorized - clear token and update auth state
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      // Import auth store dynamically to avoid circular imports
      import('../store/authStore.js').then(({ default: useAuthStore }) => {
        useAuthStore.getState().logout();
      });

      toast.error('Session expired. Please login again.');
      // Don't redirect here, let the ProtectedRoute handle it
    } else if (error.response?.status === 403) {
      toast.error('Access denied. Insufficient permissions.');
    } else if (error.response?.status === 404) {
      toast.error('Resource not found.');
    } else if (error.response?.status >= 500) {
      toast.error('Server error. Please try again later.');
    } else {
      toast.error(message);
    }
    
    return Promise.reject(error);
  }
);

// ==================== AUTH API ====================

export const authAPI = {
  // Register new user
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  // Login user
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  // Get current user profile
  getProfile: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  // Update user profile
  updateProfile: async (profileData) => {
    const response = await api.put('/auth/profile', profileData);
    return response.data;
  },

  // Logout user
  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  },
};

// ==================== FINANCE API ====================

export const financeAPI = {
  // Get transactions with optional filters
  getTransactions: async (params = {}) => {
    const response = await api.get('/finance/transactions', { params });
    return response.data;
  },

  // Create new transaction
  createTransaction: async (transactionData) => {
    const response = await api.post('/finance/transactions', transactionData);
    return response.data;
  },

  // Update transaction
  updateTransaction: async (id, transactionData) => {
    const response = await api.put(`/finance/transactions/${id}`, transactionData);
    return response.data;
  },

  // Delete transaction
  deleteTransaction: async (id) => {
    const response = await api.delete(`/finance/transactions/${id}`);
    return response.data;
  },

  // Get financial summary
  getSummary: async (params = {}) => {
    const response = await api.get('/finance/summary', { params });
    return response.data;
  },

  // Get savings goals
  getGoals: async () => {
    const response = await api.get('/finance/goals');
    return response.data;
  },

  // Create new savings goal
  createGoal: async (goalData) => {
    const response = await api.post('/finance/goals', goalData);
    return response.data;
  },

  // Add contribution to goal
  addContribution: async (goalId, contributionData) => {
    const response = await api.post(`/finance/goals/${goalId}/contribute`, contributionData);
    return response.data;
  },

  // Update savings goal
  updateGoal: async (id, goalData) => {
    const response = await api.put(`/finance/goals/${id}`, goalData);
    return response.data;
  },

  // Delete savings goal
  deleteGoal: async (id) => {
    const response = await api.delete(`/finance/goals/${id}`);
    return response.data;
  },
};

// ==================== UTILITY FUNCTIONS ====================

// Format currency in Indian Rupees
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
  }).format(amount);
};

// Format date for display
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

// Format date for input fields
export const formatDateForInput = (date) => {
  return new Date(date).toISOString().split('T')[0];
};

// Check if user is authenticated
export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token;
};

// Get current user from localStorage
export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// Save user data to localStorage
export const saveUserData = (user, token) => {
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('token', token);
};

// Clear user data from localStorage
export const clearUserData = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
};

export default api;
