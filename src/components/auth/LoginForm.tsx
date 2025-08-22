'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { CustomTextInput } from '@/components/ui/custom-text-input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

interface LoginFormProps {
  onSwitchToRegister: () => void;
  onSwitchToForgotPassword: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSwitchToRegister,
  onSwitchToForgotPassword,
}) => {
  const { login, getRedirectUrl, clearRedirectUrl } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const success = await login(email, password);
    if (success) {
      // Get the saved redirect URL or default to home page
      const redirectUrl = getRedirectUrl();
      clearRedirectUrl(); // Clear the saved URL
      
      // Redirect to the saved URL or home page
      router.push(redirectUrl || '/');
    }
    
    setLoading(false);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Welcome back</CardTitle>
        <CardDescription className="text-center">
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <CustomTextInput
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(value) => setEmail(value)}
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <CustomTextInput
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(value) => setPassword(value)}
              disabled={loading}
            />
          </div>

          <Button
            type="button"
            variant="link"
            className="px-0 text-sm"
            onClick={onSwitchToForgotPassword}
            disabled={loading}
          >
            Forgot your password?
          </Button>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              'Sign in'
            )}
          </Button>
        </form>

        <div className="mt-4 text-center text-sm">
          Don't have an account?{' '}
          <Button
            type="button"
            variant="link"
            className="px-0"
            onClick={onSwitchToRegister}
            disabled={loading}
          >
            Sign up
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
