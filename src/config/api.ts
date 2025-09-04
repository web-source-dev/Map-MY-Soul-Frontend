// API Configuration for connecting to backend
export const API_CONFIG = {
  // Backend base URL - can be overridden by environment variables
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'https://map-my-soul.onrender.com/api',
  BACKEND_URL: process.env.BACKEND_URL || 'https://map-my-soul.onrender.com',
   
  // API endpoints
  ENDPOINTS: {
    AUTH: {
      REGISTER: '/auth/register',
      LOGIN: '/auth/login',
      VERIFY: '/auth/verify',
      FORGOT_PASSWORD: '/auth/forgot-password',
      RESET_PASSWORD: '/auth/reset-password',
    },
    QUIZ: {
      SUBMIT: '/quiz/submit',
      RESULTS: '/quiz/results',
      ANALYTICS: '/quiz/analytics',
    },
    CONTACT: {
      SUBMIT: '/contact/submit',
    },
    NEWSLETTER: {
      SUBSCRIBE: '/newsletter/subscribe',
      UNSUBSCRIBE: '/newsletter/unsubscribe',
    },
    HEALTH: '/health',
  },
  
  // Request configuration
  REQUEST_CONFIG: {
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 10000, // 10 seconds
  },
};

// Helper function to get full API URL
export const getApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Helper function to get backend URL
export const getBackendUrl = (endpoint: string): string => {
  return `${API_CONFIG.BACKEND_URL}${endpoint}`;
};
