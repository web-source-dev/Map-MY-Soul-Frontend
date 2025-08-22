'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { showToast } from '@/lib/utils';
import { getBackendUrl } from '@/config/api';

interface CartItem {
  productId: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  addedAt: Date;
}

interface WishlistItem {
  productId: string;
  name: string;
  price: number;
  imageUrl: string;
  addedAt: Date;
}

interface CartWishlistContextType {
  cart: CartItem[];
  wishlist: WishlistItem[];
  cartCount: number;
  wishlistCount: number;
  addToCart: (product: { _id: string; productId: string; name: string; price: number; imageUrl: string }) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateCartQuantity: (productId: string, quantity: number) => Promise<void>;
  addToWishlist: (product: { _id: string; productId: string; name: string; price: number; imageUrl: string }) => Promise<void>;
  removeFromWishlist: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  clearWishlist: () => Promise<void>;
  isInCart: (productId: string) => boolean;
  isInWishlist: (productId: string) => boolean;
  loading: boolean;
}

const CartWishlistContext = createContext<CartWishlistContextType | undefined>(undefined);

export const useCartWishlist = () => {
  const context = useContext(CartWishlistContext);
  if (context === undefined) {
    throw new Error('useCartWishlist must be used within a CartWishlistProvider');
  }
  return context;
};

interface CartWishlistProviderProps {
  children: React.ReactNode;
}

export const CartWishlistProvider: React.FC<CartWishlistProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated, user } = useAuth();

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const wishlistCount = wishlist.length;

  // Load cart and wishlist from backend on authentication
  useEffect(() => {
    if (isAuthenticated && user) {
      loadCartAndWishlist();
    } else {
      // Clear cart and wishlist when user logs out
      setCart([]);
      setWishlist([]);
    }
  }, [isAuthenticated, user]);

  const loadCartAndWishlist = async () => {
    if (!isAuthenticated) return;

    setLoading(true);
    try {
      const [cartResponse, wishlistResponse] = await Promise.all([
        fetch(getBackendUrl('/api/auth/cart'), {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
          },
        }),
        fetch(getBackendUrl('/api/auth/wishlist'), {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
          },
        }),
      ]);

      if (cartResponse.ok) {
        const cartData = await cartResponse.json();
        setCart(cartData.cart || []);
      }

      if (wishlistResponse.ok) {
        const wishlistData = await wishlistResponse.json();
        setWishlist(wishlistData.wishlist || []);
      }
    } catch (error) {
      console.error('Error loading cart and wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product: { _id: string; productId: string; name: string; price: number; imageUrl: string }) => {
    if (!isAuthenticated) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(getBackendUrl('/api/auth/cart/add'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
        body: JSON.stringify({
          productId: product._id,
          quantity: 1,
          productDetails: {
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl,
          },
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setCart(data.cart || []);
        showToast.success('Added to cart', `${product.name} has been added to your cart`);
      } else if (response.status === 429) {
        showToast.error('Rate limit exceeded', 'Please wait a moment before trying again');
      } else {
        throw new Error('Failed to add to cart');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      showToast.error('Failed to add to cart');
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (productId: string) => {
    if (!isAuthenticated) return;

    setLoading(true);
    try {
      const response = await fetch(getBackendUrl(`/api/auth/cart/remove/${productId}`), {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCart(data.cart || []);
        showToast.success('Removed from cart');
      } else if (response.status === 429) {
        showToast.error('Rate limit exceeded', 'Please wait a moment before trying again');
      } else {
        throw new Error('Failed to remove from cart');
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
      showToast.error('Failed to remove from cart');
    } finally {
      setLoading(false);
    }
  };

  const updateCartQuantity = async (productId: string, quantity: number) => {
    if (!isAuthenticated) return;

    setLoading(true);
    try {
      const response = await fetch(getBackendUrl('/api/auth/cart/update'), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
        body: JSON.stringify({
          productId,
          quantity,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setCart(data.cart || []);
      } else if (response.status === 429) {
        showToast.error('Rate limit exceeded', 'Please wait a moment before trying again');
      } else {
        throw new Error('Failed to update cart');
      }
    } catch (error) {
      console.error('Error updating cart:', error);
      showToast.error('Failed to update cart');
    } finally {
      setLoading(false);
    }
  };

  const addToWishlist = async (product: { _id: string; productId: string; name: string; price: number; imageUrl: string }) => {
    if (!isAuthenticated) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(getBackendUrl('/api/auth/wishlist/add'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
        body: JSON.stringify({
          productId: product._id,
          productDetails: {
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl,
          },
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setWishlist(data.wishlist || []);
        showToast.success('Added to wishlist', `${product.name} has been added to your wishlist`);
      } else if (response.status === 429) {
        showToast.error('Rate limit exceeded', 'Please wait a moment before trying again');
      } else {
        throw new Error('Failed to add to wishlist');
      }
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      showToast.error('Failed to add to wishlist');
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (productId: string) => {
    if (!isAuthenticated) return;

    setLoading(true);
    try {
      const response = await fetch(getBackendUrl(`/api/auth/wishlist/remove/${productId}`), {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setWishlist(data.wishlist || []);
        showToast.success('Removed from wishlist');
      } else if (response.status === 429) {
        showToast.error('Rate limit exceeded', 'Please wait a moment before trying again');
      } else {
        throw new Error('Failed to remove from wishlist');
      }
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      showToast.error('Failed to remove from wishlist');
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    if (!isAuthenticated) return;

    setLoading(true);
    try {
      const response = await fetch(getBackendUrl('/api/auth/cart/clear'), {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCart(data.cart || []);
        showToast.success('Cart cleared');
      } else if (response.status === 429) {
        showToast.error('Rate limit exceeded', 'Please wait a moment before trying again');
      } else {
        throw new Error('Failed to clear cart');
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
      showToast.error('Failed to clear cart');
    } finally {
      setLoading(false);
    }
  };

  const clearWishlist = async () => {
    if (!isAuthenticated) return;

    setLoading(true);
    try {
      const response = await fetch(getBackendUrl('/api/auth/wishlist/clear'), {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setWishlist(data.wishlist || []);
        showToast.success('Wishlist cleared');
      } else if (response.status === 429) {
        showToast.error('Rate limit exceeded', 'Please wait a moment before trying again');
      } else {
        throw new Error('Failed to clear wishlist');
      }
    } catch (error) {
      console.error('Error clearing wishlist:', error);
      showToast.error('Failed to clear wishlist');
    } finally {
      setLoading(false);
    }
  };

  const isInCart = (productId: string) => {
    return cart.some(item => item.productId === productId);
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some(item => item.productId === productId);
  };

  const value: CartWishlistContextType = {
    cart,
    wishlist,
    cartCount,
    wishlistCount,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    addToWishlist,
    removeFromWishlist,
    clearCart,
    clearWishlist,
    isInCart,
    isInWishlist,
    loading,
  };

  return (
    <CartWishlistContext.Provider value={value}>
      {children}
    </CartWishlistContext.Provider>
  );
};
