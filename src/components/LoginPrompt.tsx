"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Heart, ShoppingBag, User, Calendar, Sparkles } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface LoginPromptProps {
  isOpen: boolean;
  onClose: () => void;
  action: 'cart' | 'wishlist' | 'booking' | 'quiz';
}

const LoginPrompt = ({ isOpen, onClose, action }: LoginPromptProps) => {
  const pathname = usePathname();
  
  // Create the auth URL with redirect parameter
  const getAuthUrl = () => {
    const currentUrl = encodeURIComponent(pathname);
    return `/auth?redirect=${currentUrl}`;
  };

  const getActionDetails = () => {
    switch (action) {
      case 'cart':
        return {
          icon: <ShoppingBag className="w-5 h-5 text-primary" />,
          title: 'Add to Cart',
          description: 'add items to your cart',
          message: 'You need to be logged in to add items to your cart. This helps us provide you with a personalized shopping experience.'
        };
      case 'wishlist':
        return {
          icon: <Heart className="w-5 h-5 text-red-500" />,
          title: 'Add to Wishlist',
          description: 'add items to your wishlist',
          message: 'You need to be logged in to save items to your wishlist. This helps us provide you with a personalized shopping experience.'
        };
      case 'booking':
        return {
          icon: <Calendar className="w-5 h-5 text-primary" />,
          title: 'Book Session',
          description: 'book your session',
          message: 'You need to be logged in to book sessions. This helps us provide you with a personalized booking experience.'
        };
      case 'quiz':
        return {
          icon: <Sparkles className="w-5 h-5 text-primary" />,
          title: 'Quiz Results',
          description: 'get quiz results',
          message: 'You need to be logged in to get personalized quiz results. This helps us provide you with a personalized quiz experience.'
        };
      default:
        return {
          icon: <User className="w-5 h-5 text-primary" />,
          title: 'Login Required',
          description: 'access this feature',
          message: 'You need to be logged in to access this feature.'
        };
    }
  };

  const actionDetails = getActionDetails();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {actionDetails.icon}
            {actionDetails.title}
          </DialogTitle>
          <DialogDescription>
            Please log in to {actionDetails.description}.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col gap-4">
          <p className="text-sm text-muted-foreground">
            {actionDetails.message}
          </p>
          
          <div className="flex gap-3">
            <Link href={getAuthUrl()} className="flex-1">
              <Button className="w-full">
                <User className="w-4 h-4 mr-2" />
                Sign In
              </Button>
            </Link>
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginPrompt;
