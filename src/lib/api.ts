import { getApiUrl, getBackendUrl } from '@/config/api';

// Generic API request function
export const apiRequest = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<unknown> => {
  const url = getApiUrl(endpoint);
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  // Add authorization header if token exists
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('auth_token');
    if (token) {
      defaultOptions.headers = {
        ...defaultOptions.headers,
        'Authorization': `Bearer ${token}`,
      };
    }
  }

  try {
    const response = await fetch(url, defaultOptions);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Direct backend request (bypassing Next.js API routes)
export const backendRequest = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<unknown> => {
  const url = getBackendUrl(endpoint);
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  // Add authorization header if token exists
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('auth_token');
    if (token) {
      defaultOptions.headers = {
        ...defaultOptions.headers,
        'Authorization': `Bearer ${token}`,
      };
    } else {
      console.warn('No auth token found in localStorage for request to:', endpoint);
    }
  }

  try {
    const response = await fetch(url, defaultOptions);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      
      // Handle authentication errors specifically
      if (response.status === 401) {
        console.error('Authentication error for endpoint:', endpoint, errorData);
        // Clear invalid token
        if (typeof window !== 'undefined') {
          localStorage.removeItem('auth_token');
          localStorage.removeItem('auth_user');
        }
        throw new Error(errorData.message || 'Authentication required');
      }
      
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Backend request failed:', error);
    throw error;
  }
};

// Health check function
export const checkBackendHealth = async (): Promise<boolean> => {
  try {
    const response = await backendRequest('/health') as { status: string };
    return response.status === 'OK'; 
  } catch (error) {
    console.error('Backend health check failed:', error);
    return false;
  }
};

// Debug function to check authentication status
export const debugAuthStatus = () => {
  if (typeof window === 'undefined') {
    console.log('Debug: Running on server side');
    return;
  }
  
  const token = localStorage.getItem('auth_token');
  const user = localStorage.getItem('auth_user');
  
  console.log('Debug: Auth Status');
  console.log('Token exists:', !!token);
  console.log('User exists:', !!user);
  console.log('Token length:', token?.length || 0);
  
  if (token) {
    try {
      const decoded = JSON.parse(atob(token.split('.')[1]));
      console.log('Token payload:', decoded);
      console.log('Token expires:', new Date(decoded.exp * 1000));
      console.log('Token is expired:', Date.now() > decoded.exp * 1000);
    } catch (error) {
      console.log('Token decode error:', error);
    }
  }
};

// Quiz API functions
export const quizApi = {
  submit: async (quizData: unknown) => {
    return await backendRequest('/api/quiz/submit', {
      method: 'POST',
      body: JSON.stringify(quizData),
    });
  },
  
  getResults: async (sessionId: string) => {
    return await backendRequest(`/api/quiz/results/${sessionId}`);
  },
};

// Auth API functions (using direct backend calls for better error handling)
export const authApiDirect = {
  register: async (data: unknown) => {
    return await backendRequest('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  
  login: async (data: unknown) => {
    return await backendRequest('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  
  verifyToken: async (token: string) => {
    return await backendRequest('/api/auth/verify', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  },
  
  forgotPassword: async (data: unknown) => {
    return await backendRequest('/api/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  
  resetPassword: async (data: unknown) => {
    return await backendRequest('/api/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

// Services and Products API helpers
export const catalogApi = {
  getServices: async () => {
    return await backendRequest('/api/services');
  },
  getProducts: async () => {
    return await backendRequest('/api/products');
  },
  getPodcasts: async () => {
    return await backendRequest('/api/podcasts');
  },
};

// Booking API functions
export const bookingApi = {
  createBooking: async (bookingData: unknown) => {
    return await backendRequest('/api/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    });
  },
  
  getAvailability: async (serviceId: string, date: string) => {
    return await backendRequest(`/api/bookings/service/${serviceId}/availability?date=${date}`);
  },
};