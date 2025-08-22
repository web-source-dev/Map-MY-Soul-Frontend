"use client";

import { useState } from "react";
import { X, Sparkles, Heart, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

// Logo URL from Wixstatic CDN
const logoUrl = "https://static.wixstatic.com/media/bdbc7d_0c6ab12123064711a5f85e34030152c8~mv2.png/v1/fill/w_536,h_531,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/bdbc7d_0c6ab12123064711a5f85e34030152c8~mv2.png";

interface NewsletterPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewsletterPopup = ({ isOpen, onClose }: NewsletterPopupProps) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    // TODO: Implement actual newsletter subscription logic
    console.log("Subscribing email:", email);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setEmail("");
      onClose();
    }, 1000);
  };

  // Close popup when clicking outside
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="relative max-w-md w-full">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors z-10"
        >
          <X className="w-4 h-4 text-gray-600" />
        </button>

        {/* Popup Content */}
        <div className="bg-gradient-to-b from-purple-50 to-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-200 via-transparent to-indigo-200"></div>
          </div>

          <div className="relative p-8">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative">
                <Image 
                  src={logoUrl} 
                  alt="Map My Soul" 
                  width={48}
                  height={48}
                  className="w-12 h-12" 
                />
                <div className="absolute -inset-1 bg-purple-500/20 rounded-full blur-sm"></div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Join Map My Soul</h2>
                <p className="text-sm text-gray-600 font-medium">Spiritual Wellness Newsletter</p>
              </div>
            </div>

            {/* Main Heading */}
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Awaken Your Soul
            </h3>
            
            {/* Slogan */}
            <p className="text-lg font-semibold text-gray-800 mb-4 leading-tight">
              Discover Your Path.<br />
              Transform Your Life.<br />
              <span className="text-purple-600">Embrace Your Purpose.</span>
            </p>

            {/* Description */}
            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
              Welcome to Map My Soul Daily. We&apos;ll send you the latest insights in spiritual growth, 
              healing practices, and soul transformation — straight to your inbox.
            </p>

            {/* Email Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  required
                />
              </div>
              
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Subscribing...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <Sparkles className="w-4 h-4" />
                    <span>Subscribe now</span>
                  </div>
                )}
              </Button>
            </form>

            {/* Privacy Notice */}
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500 flex items-center justify-center space-x-1">
                <Shield className="w-3 h-3" />
                <span>Your data is safe with us. Unsubscribe anytime.</span>
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  <Heart className="w-3 h-3 text-red-400" />
                  <span>10,000+ souls transformed</span>
                </div>
                <div className="w-px h-3 bg-gray-300"></div>
                <div className="flex items-center space-x-1">
                  <Sparkles className="w-3 h-3 text-purple-400" />
                  <span>Daily spiritual insights</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterPopup;
