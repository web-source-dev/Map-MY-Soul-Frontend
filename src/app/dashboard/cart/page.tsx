'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  CreditCard, 
  Package, 
  Truck, 
  ArrowRight,
  Heart,
  Star
} from 'lucide-react';
import { useCartWishlist } from '@/contexts/CartWishlistContext';
import { showToast } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import { Tooltip, TooltipContent } from '@/components/ui/tooltip';
import { TooltipTrigger } from '@/components/ui/tooltip';

interface CartItem {
  productId: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  addedAt: Date;
}

export default function CartPage() {
  const { loading, isAuthenticated } = useAuth();
  const router = useRouter();
  const { cart, cartCount, removeFromCart, updateCartQuantity, clearCart, addToWishlist, isInWishlist } = useCartWishlist();
  const [loadingCart, setLoadingCart] = useState(true);
  const [updatingItem, setUpdatingItem] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated && !loading) {
      router.push('/auth');
      return;
    }

    if (isAuthenticated) {
      // Cart data is loaded by the context
      setLoadingCart(false);
    }
  }, [isAuthenticated, loading]);

  const handleQuantityChange = async (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setUpdatingItem(productId);
    try {
      await updateCartQuantity(productId, newQuantity);
    } catch (error) {
      console.error('Error updating quantity:', error);
      showToast.error('Failed to update quantity');
    } finally {
      setUpdatingItem(null);
    }
  };

  const handleRemoveItem = async (productId: string) => {
    try {
      await removeFromCart(productId);
      showToast.success('Item removed from cart');
    } catch (error) {
      console.error('Error removing item:', error);
      showToast.error('Failed to remove item');
    }
  };

  const handleMoveToWishlist = async (item: CartItem) => {
    try {
      await addToWishlist({
        _id: item.productId,
        productId: item.productId,
        name: item.name,
        price: item.price,
        imageUrl: item.imageUrl
      });
      await removeFromCart(item.productId);
      showToast.success('Item moved to wishlist');
    } catch (error) {
      console.error('Error moving to wishlist:', error);
      showToast.error('Failed to move to wishlist');
    }
  };

  const handleClearCart = async () => {
    try {
      await clearCart();
      showToast.success('Cart cleared');
    } catch (error) {
      console.error('Error clearing cart:', error);
      showToast.error('Failed to clear cart');
    }
  };

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.08; // 8% tax
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  if (loading || loadingCart) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-indigo"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">My Cart</h1>
            <p className="text-foreground/70 text-lg">
              Review your items and proceed to checkout
            </p>
          </div>
          <Button asChild className="bg-primary-indigo hover:bg-primary-indigo/90">
            <Link href="/products">
              Continue Shopping
            </Link>
          </Button>
        </div>
      </div>

      {/* Cart Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          {cart.length > 0 ? (
            <div className="space-y-4">
              {cart.map((item) => (
                <Card key={item.productId} className="bg-background shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      {/* Product Image */}
                      <div className="relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        {item.imageUrl ? (
                          <Image
                            src={item.imageUrl}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Package className="h-8 w-8 text-gray-400" />
                          </div>
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-foreground truncate">
                          {item.name}
                        </h3>
                        <p className="text-lg font-bold text-primary-indigo">
                          ${item.price.toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-500">
                          Added {new Date(item.addedAt).toLocaleDateString()}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                          disabled={updatingItem === item.productId}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <div className="w-16 text-center">
                          <Input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => {
                              const value = parseInt(e.target.value);
                              if (!isNaN(value) && value > 0) {
                                handleQuantityChange(item.productId, value);
                              }
                            }}
                            className="text-center"
                            min="1"
                            disabled={updatingItem === item.productId}
                          />
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                          disabled={updatingItem === item.productId}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Item Total */}
                      <div className="text-right">
                        <p className="text-lg font-bold text-foreground">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col space-y-2">
                        <Tooltip>
                          <TooltipTrigger>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleMoveToWishlist(item)}
                              disabled={isInWishlist(item.productId)}
                              className="text-foreground/70 hover:text-secondary-pop border border-secondary-pop"
                            >
                              <Heart className={`h-4 w-4 ${isInWishlist(item.productId) ? 'fill-secondary-pop text-background' : ''}`} />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="right">
                            Move to Wishlist
                          </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                        <TooltipTrigger>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveItem(item.productId)}
                          className="text-foreground/70 hover:text-secondary-vivid border border-secondary-vivid"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        </TooltipTrigger>
                          <TooltipContent side="right">
                            Remove from Cart
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Clear Cart Button */}
              <div className="flex justify-end">
                <Button
                  variant="outline"
                  onClick={handleClearCart}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear Cart
                </Button>
              </div>
            </div>
          ) : (
            <Card className="bg-background shadow-lg">
              <CardContent className="p-12 text-center">
                <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">Your cart is empty</h3>
                <p className="text-foreground/70 mb-6">
                  Start shopping to add items to your cart
                </p>
                <Button asChild className="bg-primary-indigo hover:bg-primary-indigo/90">
                  <Link href="/products">
                    Browse Products
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="bg-background shadow-lg sticky top-6">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ShoppingCart className="h-5 w-5" />
                <span>Order Summary</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Summary Details */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-foreground/70">Items ({cartCount})</span>
                  <span className="font-medium">${calculateSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-foreground/70">Tax</span>
                  <span className="font-medium">${calculateTax().toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary-indigo">${calculateTotal().toFixed(2)}</span>
                </div>
              </div>

              {/* Shipping Info */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Truck className="h-4 w-4 text-foreground/70" />
                  <span className="text-sm font-medium text-gray-700">Free Shipping</span>
                </div>
                <p className="text-xs text-gray-500">
                  Orders over $50 qualify for free shipping
                </p>
              </div>

              {/* Checkout Button */}
              <Button 
                className="w-full bg-primary-indigo hover:bg-primary-indigo/90"
                disabled={cart.length === 0}
                size="lg"
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Proceed to Checkout
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>

              {/* Security Badge */}
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 text-xs text-gray-500">
                  <Star className="h-3 w-3 text-green-500" />
                  <span>Secure Checkout</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Empty State for Mobile */}
      {cart.length === 0 && (
        <div className="lg:hidden mt-8">
          <Card className="bg-background shadow-lg">
            <CardContent className="p-8 text-center">
              <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Your cart is empty</h3>
              <p className="text-foreground/70 mb-4">
                Start shopping to add items to your cart
              </p>
              <Button asChild className="bg-primary-indigo hover:bg-primary-indigo/90">
                <Link href="/products">
                  Browse Products
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
