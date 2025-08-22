'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CustomTextInput } from '@/components/ui/custom-text-input';
import { CustomSelect } from '@/components/ui/custom-select';
import { CustomTextarea } from '@/components/ui/custom-textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, AlertCircle, Mail, Phone, MapPin } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { contactApi } from '@/lib/api';
import { showToast } from '@/lib/utils';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  contactType: string;
  priority: string;
}

interface ContactFormProps {
  className?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({ className = '' }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState<ContactFormData>({
    name: user?.displayName || '',
    email: user?.email || '',
    subject: '',
    message: '',
    contactType: 'general',
    priority: 'medium'
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const contactTypeOptions = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'support', label: 'Technical Support' },
    { value: 'feedback', label: 'Feedback' },
    { value: 'partnership', label: 'Partnership' },
    { value: 'other', label: 'Other' }
  ];

  const priorityOptions = [
    { value: 'low', label: 'Low Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'high', label: 'High Priority' },
    { value: 'urgent', label: 'Urgent' }
  ];

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      errors.subject = 'Subject is required';
    } else if (formData.subject.trim().length < 5) {
      errors.subject = 'Subject must be at least 5 characters';
    }

    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await contactApi.submit(formData);
      if (response) {

        showToast.success('Thank you for contacting us. We have received your message and will get back to you as soon as possible.');
        setFormData({
          name: user?.displayName || '',
          email: user?.email || '',
          subject: '',
          message: '',
          contactType: 'general',
          priority: 'medium'
        });
      } else {
        showToast.error('Failed to submit contact form');
      }
      setValidationErrors({});
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear validation error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors(prev => ({ ...prev, [field]: '' }));
    }
  };


  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Information */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold">Get in Touch</CardTitle>
              <CardDescription>
                We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-purple-600 mt-1" />
                <div>
                  <h4 className="font-semibold">Email</h4>
                  <p className="text-sm text-gray-600">info@mapmysoul.com</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-purple-600 mt-1" />
                <div>
                  <h4 className="font-semibold">Phone</h4>
                  <p className="text-sm text-gray-600">+1 (555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-purple-600 mt-1" />
                <div>
                  <h4 className="font-semibold">Address</h4>
                  <p className="text-sm text-gray-600">
                    123 Spiritual Street<br />
                    Wellness City, WC 12345<br />
                    United States
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h4 className="font-semibold mb-2">Response Time</h4>
                <p className="text-sm text-gray-600">
                  We typically respond within 24-48 hours during business days.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold">Send us a Message</CardTitle>
              <CardDescription>
                Fill out the form below and we&apos;ll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert className="mb-6 border-red-200 bg-red-50">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <CustomTextInput
                      id="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(value) => handleInputChange('name', value)}
                      disabled={loading}
                      error={validationErrors.name}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <CustomTextInput
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={formData.email}
                      onChange={(value) => handleInputChange('email', value)}
                      disabled={loading}
                      error={validationErrors.email}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <CustomTextInput
                    id="subject"
                    placeholder="What is this regarding?"
                    value={formData.subject}
                    onChange={(value) => handleInputChange('subject', value)}
                    disabled={loading}
                    error={validationErrors.subject}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contactType">Contact Type</Label>
                    <CustomSelect
                      id="contactType"
                      options={contactTypeOptions}
                      value={formData.contactType}
                      onChange={(value) => handleInputChange('contactType', value)}
                      disabled={loading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority Level</Label>
                    <CustomSelect
                      id="priority"
                      options={priorityOptions}
                      value={formData.priority}
                      onChange={(value) => handleInputChange('priority', value)}
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <CustomTextarea
                    id="message"
                    placeholder="Please describe your inquiry in detail..."
                    value={formData.message}
                    onChange={(value: string) => handleInputChange('message', value)}
                    disabled={loading}
                    error={validationErrors.message}
                    rows={6}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={loading}
                  size="lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <Mail className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
