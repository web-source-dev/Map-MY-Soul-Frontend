'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { CustomTextInput } from '@/components/ui/custom-text-input';
import { CustomDateInput } from '@/components/ui/custom-date-input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitchToLogin }) => {
  const { register, getRedirectUrl, clearRedirectUrl } = useAuth();
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [birthPlace, setBirthPlace] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (password !== confirmPassword) {
      // This validation error will be shown via toast
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      // This validation error will be shown via toast
      setLoading(false);
      return;
    }

    const success = await register(firstName, lastName, email, password);
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
        <CardTitle className="text-2xl font-bold text-center">Create account</CardTitle>
        <CardDescription className="text-center">
          Enter your information to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <CustomTextInput
                placeholder="Enter your first name"
                value={firstName}
                onChange={(value) => setFirstName(value)}
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <CustomTextInput
                placeholder="Enter your last name"
                value={lastName}
                onChange={(value) => setLastName(value)}
                disabled={loading}
              />
            </div>
          </div>

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

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <CustomDateInput
                value={dateOfBirth}
                onChange={(date) => setDateOfBirth(date)}
                max={new Date().toISOString().split('T')[0]}
                placeholder="Select birth date"
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="birthPlace">Place of Birth</Label>
              <CustomTextInput
                placeholder="City, Country"
                value={birthPlace}
                onChange={(value) => setBirthPlace(value)}
                disabled={loading}
              />
            </div>
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

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <CustomTextInput
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(value) => setConfirmPassword(value)}
              disabled={loading}
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating account...
              </>
            ) : (
              'Create account'
            )}
          </Button>
        </form>

        <div className="mt-4 text-center text-sm">
          Already have an account?{' '}
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
