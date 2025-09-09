'use client';

import React from 'react';
import { ContactForm } from '@/components/ContactForm';
import Layout from '@/components/Layout';

export default function ContactPage() {
  return (
    <Layout>
    <div className="min-h-screen bg-gradient-to-br from-primary-indigo/10 via-background to-primary-lavender/10">
      <div className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            Have a question, feedback, or need support? We&apos;d love to hear from you. 
            Our team is here to help you on your spiritual wellness journey.
          </p>
        </div>

        {/* Contact Form */}
        <ContactForm />

        {/* Additional Information */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-indigo/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-indigo" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Quick Response</h3>
              <p className="text-foreground/70">
                We typically respond within 24-48 hours during business days.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-indigo/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-indigo" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Expert Support</h3>
              <p className="text-foreground/70">
                Our team of spiritual wellness experts is here to help you.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-indigo/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-indigo" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Personalized Care</h3>
              <p className="text-foreground/70">
                Every inquiry is handled with care and personalized attention.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-background rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">What services do you offer?</h3>
                <p className="text-foreground/70">
                  We offer a wide range of spiritual wellness services including tarot readings, 
                  crystal therapy, aura cleansing, and personalized spiritual guidance sessions.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">How do I book a session?</h3>
                <p className="text-foreground/70">
                  You can book a session through our services page. Simply choose your preferred 
                  service, select an available time slot, and complete your booking.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">What is your cancellation policy?</h3>
                <p className="text-foreground/70">
                  We understand that life happens. You can cancel or reschedule your session 
                  up to 24 hours before your scheduled appointment without any charges.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Do you offer refunds?</h3>
                <p className="text-foreground/70">
                  Yes, we offer refunds for digital products within 30 days of purchase. 
                  For services, refunds are handled on a case-by-case basis.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
}
