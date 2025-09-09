'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

interface UserRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export const UserRoute: React.FC<UserRouteProps> = ({ 
  children, 
  redirectTo = '/auth' 
}) => {
  const { isUser, isAdmin, isAuthenticated, loading, setRedirectUrl } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        // Save the current URL before redirecting to login
        setRedirectUrl(pathname);
        router.push(redirectTo);
      } else if (!isUser && !isAdmin) {
        router.push('/'); // Redirect to home if not a valid user
      }
    }
  }, [isUser, isAdmin, isAuthenticated, loading, router, redirectTo, pathname, setRedirectUrl]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-indigo"></div>
      </div>
    );
  }

  if (!isAuthenticated || (!isUser && !isAdmin)) {
    return null;
  }

  return <>{children}</>;
};
