"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ShoppingBag, Eye, Heart } from "lucide-react";
import Image from "next/image";
import { useCartWishlist } from "@/contexts/CartWishlistContext";
import { useAuth } from "@/contexts/AuthContext";
import LoginPrompt from "./LoginPrompt";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  product: {
    _id: string;
    name: string;
    price: number;
    imageUrl?: string;
    description?: string;
  };
  onQuickView?: () => void;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart, addToWishlist, removeFromWishlist, isInCart, isInWishlist, loading } = useCartWishlist();
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [loginAction, setLoginAction] = useState<'cart' | 'wishlist'>('cart');

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      setLoginAction('cart');
      setShowLoginPrompt(true);
      return;
    }
    await addToCart({
      _id: product._id,
      productId: product._id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl || ''
    });
  };

  const handleAddToWishlist = async () => {
    if (!isAuthenticated) {
      setLoginAction('wishlist');
      setShowLoginPrompt(true);
      return;
    }
    
    // Toggle wishlist: remove if already in wishlist, add if not
    if (isInWishlist(product._id)) {
      await removeFromWishlist(product._id);
    } else {
      await addToWishlist({
        _id: product._id,
        productId: product._id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl || ''
      });
    }
  };

  const handleViewProduct = () => {
    // Navigate to the product detail page
    router.push(`/products/${product._id}`);
  };

  return (
    <Card className="modern-card group hover-lift">
      <CardContent className="p-0">
        <div className="relative overflow-hidden rounded-t-2xl">
          <Image 
            src={product.imageUrl || "/assets/spiritual-products.jpg"} 
            alt={product.name}
            width={600}
            height={400}
            className="w-full h-48 object-cover transition-transform duration-200 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          
          {/* Action Buttons */}
          <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-background/90 backdrop-blur-sm hover:bg-background rounded-lg"
                  onClick={handleViewProduct}
                >
                  <Eye className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                View Details
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`backdrop-blur-sm rounded-lg ${
                    isInWishlist(product._id) 
                      ? 'bg-primary-indigo text-secondary-pop hover:bg-primary-indigo/90 hover:text-secondary-pop' 
                      : 'bg-background hover:bg-background text-primary-indigo'
                  }`}
                  onClick={handleAddToWishlist}
                  disabled={loading}
                >
                  <Heart className={`w-4 h-4 ${isInWishlist(product._id) ? 'fill-current' : ''}`} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                {isInWishlist(product._id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
        
        <div className="p-5">
          <h3 className="text-lg font-semibold text-foreground mb-3 cursor-pointer hover:text-primary transition-colors" onClick={handleViewProduct}>
            {product.name}
          </h3>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-primary-indigo">${product.price}</span>
            <Button 
              size="sm" 
              className={`font-medium rounded-lg transition-all duration-200 ${
                isInCart(product._id)
                  ? 'bg-secondary-pop hover:bg-secondary-pop/90 text-background'
                  : 'bg-primary-indigo hover:bg-primary-indigo/90 text-background'
              }`}
              onClick={handleAddToCart}
              disabled={loading}
            >
              <ShoppingBag className="w-4 h-4 mr-2" />
              {isInCart(product._id) ? 'In Cart Add More' : 'Add to Cart'}
            </Button>
          </div>
        </div>
      </CardContent>
      
      <LoginPrompt 
        isOpen={showLoginPrompt} 
        onClose={() => setShowLoginPrompt(false)} 
        action={loginAction} 
      />
    </Card>
  );
};

export default ProductCard;