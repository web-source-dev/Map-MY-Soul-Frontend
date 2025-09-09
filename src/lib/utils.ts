'use client';

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { toast } from "@/hooks/use-toast"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Toast utility functions
export const showToast = {
  success: (message: string, description?: string) => {
    // If description is provided, use message as title and description as description
    // Otherwise, use message as the main message
    if (description) {
      toast.success(message, description)
    } else {
      toast.success(message)
    }
  },
  
  error: (message: string, description?: string) => {
    // If description is provided, use message as title and description as description
    // Otherwise, use message as the main message
    if (description) {
      toast.error(message, description)
    } else {
      toast.error(message)
    }
  },
  
  // Helper to show backend error messages in a user-friendly way
  backendError: (error: string | { message: string; error?: string }) => {
    let errorMessage = "Something went wrong. Please try again.";
    
    if (typeof error === 'string') {
      errorMessage = error;
    } else if (error?.message) {
      errorMessage = error.message;
    } else if (error?.error) {
      errorMessage = error.error;
    }
    
    // Make error messages more user-friendly
    const userFriendlyMessages: Record<string, string> = {
      'User with this email already exists': 'An account with this email already exists. Please try logging in instead.',
      'Invalid credentials': 'Invalid email or password. Please check your credentials and try again.',
      'User not found': 'No account found with this email address. Please check your email or create a new account.',
      'Invalid or expired reset token': 'The password reset link has expired or is invalid. Please request a new one.',
      'Password reset email sent successfully': 'Password reset email sent! Check your inbox for further instructions.',
      'Password reset successful': 'Your password has been successfully reset. You can now sign in with your new password.',
      'User created successfully': 'Account created successfully! Welcome to Map My Soul.',
      'Login successful': 'Welcome back! You have been successfully signed in.',
      'Access token required': 'Please sign in to continue.',
      'Invalid token': 'Your session has expired. Please sign in again.',
      'Authentication required': 'Please sign in to access this feature.',
      'Admin access required': 'You need administrator privileges to access this feature.',
      'User access required': 'You need to be signed in to access this feature.',
    };
    
    // Check if we have a user-friendly message for this error
    if (userFriendlyMessages[errorMessage]) {
      errorMessage = userFriendlyMessages[errorMessage];
    }
    
    toast.error(errorMessage)
  },
  
  // Helper to show backend success messages
  backendSuccess: (message: string) => {
    const userFriendlyMessages: Record<string, string> = {
      'User created successfully': 'Account created successfully! Welcome to Map My Soul.',
      'Login successful': 'Welcome back! You have been successfully signed in.',
      'Password reset email sent successfully': 'Password reset email sent! Check your inbox for further instructions.',
      'Password reset successful': 'Your password has been successfully reset. You can now sign in with your new password.',
    };
    
    const friendlyMessage = userFriendlyMessages[message] || message;
    
    toast.success(friendlyMessage)
  }
}

// Date formatting utility
export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};
