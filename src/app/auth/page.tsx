'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { LoginForm } from '@/components/auth/LoginForm';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { ForgotPasswordForm } from '@/components/auth/ForgotPasswordForm';
import { useAuth } from '@/contexts/AuthContext';

type AuthView = 'login' | 'register' | 'forgot-password';

export default function AuthPage() {
  const [currentView, setCurrentView] = useState<AuthView>('login');
  const searchParams = useSearchParams();
  const { setRedirectUrl } = useAuth();

  // Handle redirect parameter from URL
  useEffect(() => {
    const redirectParam = searchParams.get('redirect');
    if (redirectParam) {
      // Decode the redirect URL and save it
      try {
        const decodedRedirect = decodeURIComponent(redirectParam);
        setRedirectUrl(decodedRedirect);
      } catch (error) {
        console.error('Invalid redirect URL:', error);
      }
    }
  }, [searchParams, setRedirectUrl]);

  const renderForm = () => {
    switch (currentView) {
      case 'login':
        return (
          <LoginForm
            onSwitchToRegister={() => setCurrentView('register')}
            onSwitchToForgotPassword={() => setCurrentView('forgot-password')}
          />
        );
      case 'register':
        return (
          <RegisterForm
            onSwitchToLogin={() => setCurrentView('login')}
          />
        );
      case 'forgot-password':
        return (
          <ForgotPasswordForm
            onSwitchToLogin={() => setCurrentView('login')}
          />
        );

      default:
        return (
          <LoginForm
            onSwitchToRegister={() => setCurrentView('register')}
            onSwitchToForgotPassword={() => setCurrentView('forgot-password')}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {renderForm()}
      </div>
    </div>
  );
}
