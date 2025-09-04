import { getApiUrl, getBackendUrl } from '@/config/api';

interface Booking {
  serviceName: string;
  serviceProviderName: string;
  bookingDate: string;
  sessionType: string;
  status: string;
}

interface RecommendationService {
  name: string;
  type: string;
  price: number;
}

interface RecommendationProduct {
  name: string;
  type: string;
  price: number;
}

interface RecommendationPodcast {
  name: string;
  type: string;
  price: number;
}

interface Recommendations {
  services: RecommendationService[];
  products: RecommendationProduct[];
  podcasts: RecommendationPodcast[];
}


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

  getProfile: async () => {
    return await backendRequest('/api/auth/profile');
  },

  updateProfile: async (data: unknown) => {
    return await backendRequest('/api/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  changePassword: async (data: unknown) => {
    return await backendRequest('/api/auth/change-password', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  uploadImage: async (imageData: string) => {
    return await backendRequest('/api/auth/upload-image', {
      method: 'POST',
      body: JSON.stringify({ imageData }),
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

  getUserBookings: async () => {
    return await backendRequest('/api/bookings/user');
  },

  cancelBooking: async (bookingId: string) => {
    return await backendRequest(`/api/bookings/${bookingId}/cancel`, {
      method: 'PUT',
    });
  },
};

export const contactApi = {
  submit: async (contactData: unknown) => {
    return await backendRequest('/api/contact/submit', {
      method: 'POST',
      body: JSON.stringify(contactData),
    });
  },
};

export const newsletterApi = {
  subscribe: async (email: string, source: string = 'popup', preferences?: object) => {
    return await backendRequest('/api/newsletter/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email, source, preferences }),
    });
  },
  
  unsubscribe: async (email: string) => {
    return await backendRequest('/api/newsletter/unsubscribe', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },
};

export const recommendationsApi = {
  getUserRecommendations: async () => {
    return await backendRequest('/api/recommendations/user');
  },

  getRecommendationsHistory: async () => {
    return await backendRequest('/api/recommendations/user/history');
  },
};

// Admin API functions
export const adminApi = {
  getOverview: async () => {
    return await backendRequest('/api/admin/overview');
  },

  getUsers: async (params?: { page?: number; limit?: number; search?: string; role?: string }) => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.search) queryParams.append('search', params.search);
    if (params?.role) queryParams.append('role', params.role);
    
    const queryString = queryParams.toString();
    return await backendRequest(`/api/admin/users${queryString ? `?${queryString}` : ''}`);
  },

  getBookings: async (params?: { page?: number; limit?: number; status?: string; serviceId?: string }) => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.status) queryParams.append('status', params.status);
    if (params?.serviceId) queryParams.append('serviceId', params.serviceId);
    
    const queryString = queryParams.toString();
    return await backendRequest(`/api/admin/bookings${queryString ? `?${queryString}` : ''}`);
  },

  getContacts: async (params?: { page?: number; limit?: number; status?: string; contactType?: string }) => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.status) queryParams.append('status', params.status);
    if (params?.contactType) queryParams.append('contactType', params.contactType);
    
    const queryString = queryParams.toString();
    return await backendRequest(`/api/admin/contacts${queryString ? `?${queryString}` : ''}`);
  },

  updateContactStatus: async (contactId: string, status: string, responseMessage?: string) => {
    return await backendRequest(`/api/admin/contacts/${contactId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status, responseMessage }),
    });
  },

  deleteContact: async (contactId: string) => {
    return await backendRequest(`/api/admin/contacts/${contactId}`, {
      method: 'DELETE',
    });
  },

  updateUserStatus: async (userId: string, isActive: boolean) => {
    return await backendRequest(`/api/admin/users/${userId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ isActive }),
    });
  },

  deleteUser: async (userId: string) => {
    return await backendRequest(`/api/admin/users/${userId}`, {
      method: 'DELETE',
    });
  },

  updateBookingStatus: async (bookingId: string, status: string) => {
    return await backendRequest(`/api/admin/bookings/${bookingId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  },

  deleteBooking: async (bookingId: string) => {
    return await backendRequest(`/api/admin/bookings/${bookingId}`, {
      method: 'DELETE',
    });
  },

  getAuditLogs: async (params?: { page?: number; limit?: number; action?: string; resource?: string }) => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.action) queryParams.append('action', params.action);
    if (params?.resource) queryParams.append('resource', params.resource);
    
    const queryString = queryParams.toString();
    return await backendRequest(`/api/admin/audit-logs${queryString ? `?${queryString}` : ''}`);
  },

  getSystemStats: async () => {
    return await backendRequest('/api/admin/system-stats');
  },
};

// Dashboard API functions
export const dashboardApi = {
  getOverview: async () => {
    try {
      const [bookings, recommendations, cart, wishlist] = await Promise.all([
        backendRequest('/api/bookings/user'),
        backendRequest('/api/recommendations/user'),
        backendRequest('/api/auth/cart'),
        backendRequest('/api/auth/wishlist')
      ]);

      return {
        bookings: (bookings as { bookings: Booking[] }).bookings || [],
        recommendations: (recommendations as { recommendations: Recommendations }).recommendations || { services: [], products: [], podcasts: [] },
        cart: (cart as { cart: RecommendationProduct[] }).cart || [],
        wishlist: (wishlist as { wishlist: RecommendationPodcast[] }).wishlist || []
      };
    } catch (error) {
      console.error('Error fetching dashboard overview:', error);
      return {
        bookings: [],
        recommendations: { services: [], products: [], podcasts: [] },
        cart: [],
        wishlist: []
      };
    }
  },

  getStats: async () => {
    try {
      const [bookings, recommendations, cart, wishlist] = await Promise.all([
        backendRequest('/api/bookings/user'),
        backendRequest('/api/recommendations/user'),
        backendRequest('/api/auth/cart'),
        backendRequest('/api/auth/wishlist')
      ]);

      const allBookings = (bookings as { bookings: Booking[] }).bookings || [];
      console.log('All bookings:', allBookings); // Debug log

      const upcomingBookings = allBookings.filter((booking: Booking) => {
        const bookingDate = new Date(booking.bookingDate);
        const now = new Date();
        const isUpcoming = bookingDate > now;
        const isConfirmed = booking.status === 'confirmed';
        const isPending = booking.status === 'pending';
        
        console.log('Booking check:', {
          serviceName: booking.serviceName,
          bookingDate: booking.bookingDate,
          parsedDate: bookingDate,
          now: now,
          isUpcoming,
          status: booking.status,
          isConfirmed,
          isPending,
          shouldShow: isUpcoming && (isConfirmed || isPending)
        });
        
        // Show bookings that are upcoming (future date) and either confirmed or pending
        return isUpcoming && (isConfirmed || isPending);
      });

      console.log('Upcoming bookings:', upcomingBookings); // Debug log

      const totalRecommendations = ((recommendations as { recommendations: Recommendations }).recommendations || { services: [], products: [], podcasts: [] });
      const recommendationCount = (totalRecommendations.services?.length || 0) + 
                                 (totalRecommendations.products?.length || 0) + 
                                 (totalRecommendations.podcasts?.length || 0);

      return {
        upcomingBookings: upcomingBookings.length,
        recommendations: recommendationCount,
        cartItems: ((cart as { cart: RecommendationProduct[] }).cart || []).length,
        wishlistItems: ((wishlist as { wishlist: RecommendationPodcast[] }).wishlist || []).length,
        totalBookings: allBookings.length
      };
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      return {
        upcomingBookings: 0,
        recommendations: 0,
        cartItems: 0,
        wishlistItems: 0,
        totalBookings: 0
      };
    }
  }
};