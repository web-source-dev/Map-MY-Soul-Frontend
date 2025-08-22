'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, authApi, tokenStorage } from '@/lib/auth';
import { showToast } from '@/lib/utils';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  isUser: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (firstName: string, lastName: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<{ emailSent: boolean; resetToken?: string; expiresAt?: string }>;
  resetPassword: (resetToken: string, newPassword: string) => Promise<boolean>;
  refreshUser: () => Promise<void>;
  setRedirectUrl: (url: string) => void;
  getRedirectUrl: () => string | null;
  clearRedirectUrl: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Computed properties for easier access control
  const isAuthenticated = !!user;
  const isUser = isAuthenticated && user?.role === 'user';
  const isAdmin = isAuthenticated && user?.role === 'admin';

  // Redirect URL management
  const setRedirectUrl = (url: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_redirect_url', url);
    }
  };

  const getRedirectUrl = (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('auth_redirect_url');
    }
    return null;
  };

  const clearRedirectUrl = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_redirect_url');
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = tokenStorage.getToken();
        const storedUser = tokenStorage.getUser();

        console.log('Auth initialization - Token exists:', !!token);
        console.log('Auth initialization - User exists:', !!storedUser);

        if (token && storedUser) {
          // Verify token with backend
          const { isValid, user: verifiedUser } = await authApi.verifyToken(token);
          
          console.log('Token verification result:', { isValid, userExists: !!verifiedUser });
          
          if (isValid && verifiedUser) {
            setUser(verifiedUser);
            tokenStorage.setUser(verifiedUser);
          } else {
            // Token is invalid, clear storage
            console.log('Token invalid, clearing storage');
            tokenStorage.clear();
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        tokenStorage.clear();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await authApi.login({ email, password });
      tokenStorage.setToken(response.token);
      tokenStorage.setUser(response.user);
      setUser(response.user);
      
      // Debug: Verify token was stored
      console.log('Login successful, token stored:', !!tokenStorage.getToken());
      console.log('User stored:', !!tokenStorage.getUser());
      
      showToast.backendSuccess(response.message);
      return true;
    } catch (error) {
      showToast.backendError(error as string);
      return false;
    }
  };

  const register = async (firstName: string, lastName: string, email: string, password: string): Promise<boolean> => {
    try {
      const response = await authApi.register({ firstName, lastName, email, password });
      tokenStorage.setToken(response.token);
      tokenStorage.setUser(response.user);
      setUser(response.user);
      showToast.backendSuccess(response.message);
      return true;
    } catch (error) {
      showToast.backendError(error as string);
      return false;
    }
  };

  const logout = () => {
    tokenStorage.clear();
    clearRedirectUrl(); // Clear redirect URL on logout
    setUser(null);
    showToast.success('Signed out', 'You have been successfully signed out.');
  };

  const forgotPassword = async (email: string) => {
    try {
      const response = await authApi.forgotPassword({ email });
      if (response.emailSent) {
        showToast.backendSuccess(response.message);
      } else {
        showToast.success('Reset token generated', 'Please check the response for your reset token.');
      }
      return response;
    } catch (error) {
      showToast.backendError(error as string);
      throw error;
    }
  };

  const resetPassword = async (resetToken: string, newPassword: string): Promise<boolean> => {
    try {
      const response = await authApi.resetPassword({ resetToken, newPassword });
      showToast.backendSuccess(response.message);
      return true;
    } catch (error) {
      showToast.backendError(error as string);
      return false;
    }
  };

  const refreshUser = async (): Promise<void> => {
    try {
      const token = tokenStorage.getToken();
      if (token) {
        const { isValid, user: verifiedUser } = await authApi.verifyToken(token);
        if (isValid && verifiedUser) {
          setUser(verifiedUser);
          tokenStorage.setUser(verifiedUser);
        }
      }
    } catch (error) {
      console.error('Error refreshing user:', error);
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    isAuthenticated,
    isUser,
    isAdmin,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    refreshUser,
    setRedirectUrl,
    getRedirectUrl,
    clearRedirectUrl,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
