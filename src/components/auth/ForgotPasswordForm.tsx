'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { CustomTextInput } from '@/components/ui/custom-text-input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, ArrowLeft, CheckCircle } from 'lucide-react';

interface ForgotPasswordFormProps {
  onSwitchToLogin: () => void;
}

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ onSwitchToLogin }) => {
  const { forgotPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      await forgotPassword(email);
      setSuccess(true);
    } catch (err) {
      console.error('Error sending reset token:', err);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
            <CheckCircle className="h-6 w-6 text-green-500" />
            Email Sent Successfully
          </CardTitle>
          <CardDescription className="text-center">
            Check your email for password reset instructions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-green-50 border border-green-200 rounded-md">
            <p className="mb-2 text-green-800">We&apos;ve sent a password reset link to your email address.</p>
            <p className="text-sm text-green-600">
              Click the link in the email to reset your password. The link will expire in 1 hour.
            </p>
          </div>
          
          <Button onClick={onSwitchToLogin} className="w-full">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to login
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Forgot password</CardTitle>
        <CardDescription className="text-center">
          Enter your email address and we&apos;ll send you a reset token
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

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending reset token...
              </>
            ) : (
              'Send reset token'
            )}
          </Button>
        </form>

        <div className="mt-4 text-center text-sm">
          Remember your password?{' '}
          <Button
            type="button"
            variant="link"
            className="px-0"
            onClick={onSwitchToLogin}
            disabled={loading}
          >
            Sign in
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
