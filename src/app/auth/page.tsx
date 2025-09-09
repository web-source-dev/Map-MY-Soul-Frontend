'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { LoginForm } from '@/components/auth/LoginForm';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { ForgotPasswordForm } from '@/components/auth/ForgotPasswordForm';
import { useAuth } from '@/contexts/AuthContext';

type AuthView = 'login' | 'register' | 'forgot-password';

function AuthContent() {
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
    <div className="w-full max-w-md">
      {renderForm()}
    </div>
  );
}

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-indigo/10 via-primary-lavender/10 to-secondary-vivid/10 flex items-center justify-center p-4">
      <Suspense fallback={
        <div className="w-full max-w-md">
          <div className="bg-background rounded-lg shadow-lg p-8">
            <div className="animate-pulse">
              <div className="h-8 bg-foreground/10 rounded mb-4"></div>
              <div className="h-4 bg-foreground/10 rounded mb-2"></div>
              <div className="h-4 bg-foreground/10 rounded mb-6"></div>
              <div className="h-10 bg-foreground/10 rounded mb-4"></div>
              <div className="h-10 bg-foreground/10 rounded"></div>
            </div>
          </div>
        </div>
      }>
        <AuthContent />
      </Suspense>
    </div>
  );
}
