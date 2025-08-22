"use client";

import { useState, useEffect } from "react";

export const useNewsletterPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Check if popup has been shown before
    const hasShownBefore = localStorage.getItem("newsletter-popup-shown");
    
    if (!hasShownBefore) {
      // Show popup after 30 seconds
      const timer = setTimeout(() => {
        setIsOpen(true);
        setHasShown(true);
        localStorage.setItem("newsletter-popup-shown", "true");
      }, 30000); // 30 seconds

      return () => clearTimeout(timer);
    }
  }, []);

  const openPopup = () => {
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  const resetPopup = () => {
    localStorage.removeItem("newsletter-popup-shown");
    setHasShown(false);
  };

  return {
    isOpen,
    hasShown,
    openPopup,
    closePopup,
    resetPopup,
  };
};
