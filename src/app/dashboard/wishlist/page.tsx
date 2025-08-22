'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  Trash2, 
  ShoppingCart, 
  Package, 
  Star,
  Sparkles,
} from 'lucide-react';
import { useCartWishlist } from '@/contexts/CartWishlistContext';
import { showToast } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';

interface WishlistItem {
  productId: string;
  name: string;
  price: number;
  imageUrl: string;
  addedAt: Date;
}

export default function WishlistPage() {
  const { loading, isAuthenticated } = useAuth();
  const router = useRouter();
  const { wishlist, wishlistCount, removeFromWishlist, clearWishlist, addToCart, isInCart } = useCartWishlist();
  const [loadingWishlist, setLoadingWishlist] = useState(true);
  const [updatingItem, setUpdatingItem] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated && !loading) {
      router.push('/auth');
      return;
    }

    if (isAuthenticated) {
      // Wishlist data is loaded by the context
      setLoadingWishlist(false);
    }
  }, [isAuthenticated, loading]);

  const handleMoveToCart = async (item: WishlistItem) => {
    setUpdatingItem(item.productId);
    try {
      await addToCart({
        _id: item.productId,
        productId: item.productId,
        name: item.name,
        price: item.price,
        imageUrl: item.imageUrl
      });
      await removeFromWishlist(item.productId);
      showToast.success('Item moved to cart');
    } catch (error) {
      console.error('Error moving to cart:', error);
      showToast.error('Failed to move to cart');
    } finally {
      setUpdatingItem(null);
    }
  };

  const handleRemoveItem = async (productId: string) => {
    try {
      await removeFromWishlist(productId);
      showToast.success('Item removed from wishlist');
    } catch (error) {
      console.error('Error removing item:', error);
      showToast.error('Failed to remove item');
    }
  };

  const handleClearWishlist = async () => {
    try {
      await clearWishlist();
      showToast.success('Wishlist cleared');
    } catch (error) {
      console.error('Error clearing wishlist:', error);
      showToast.error('Failed to clear wishlist');
    }
  };

  const calculateTotalValue = () => {
    return wishlist.reduce((total, item) => total + item.price, 0);
  };

  const getRecentlyAdded = () => {
    return wishlist
      .sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime())
      .slice(0, 3);
  };

  if (loading || loadingWishlist) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
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
            <h1 className="text-4xl font-bold text-gray-900 mb-2">My Wishlist</h1>
            <p className="text-gray-600 text-lg">
              Save items you love for later
            </p>
          </div>
          <Button asChild className="bg-purple-600 hover:bg-purple-700">
            <Link href="/products">
              Discover More
            </Link>
          </Button>
        </div>
      </div>

      {/* Wishlist Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gradient-to-r from-pink-50 to-purple-50 border-pink-200">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-pink-100 rounded-full">
                <Heart className="h-6 w-6 text-pink-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Items</p>
                <p className="text-2xl font-bold text-gray-900">{wishlistCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-purple-100 rounded-full">
                <Star className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Value</p>
                <p className="text-2xl font-bold text-gray-900">${calculateTotalValue().toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-teal-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-green-100 rounded-full">
                <Sparkles className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">In Cart</p>
                <p className="text-2xl font-bold text-gray-900">
                  {wishlist.filter(item => isInCart(item.productId)).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Wishlist Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Wishlist Items */}
        <div className="lg:col-span-3">
          {wishlist.length > 0 ? (
            <div className="space-y-4">
              {wishlist.map((item) => (
                <Card key={item.productId} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-200">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      {/* Product Image */}
                      <div className="relative w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        {item.imageUrl ? (
                          <Image
                            src={item.imageUrl}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Package className="h-10 w-10 text-gray-400" />
                          </div>
                        )}
                        {/* Wishlist Badge */}
                        <div className="absolute top-2 left-2">
                          <Badge className="bg-pink-500 text-white text-xs px-2 py-1">
                            <Heart className="h-3 w-3 mr-1" />
                            Saved
                          </Badge>
                        </div>
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 truncate">
                          {item.name}
                        </h3>
                        <p className="text-xl font-bold text-purple-600">
                          ${item.price.toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-500">
                          Added {new Date(item.addedAt).toLocaleDateString()}
                        </p>
                        <div className="flex items-center space-x-2 mt-2">
                          {isInCart(item.productId) && (
                            <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                              In Cart
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col space-y-2">
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => handleMoveToCart(item)}
                          disabled={updatingItem === item.productId || isInCart(item.productId)}
                          className="bg-purple-600 hover:bg-purple-700"
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          {isInCart(item.productId) ? 'In Cart' : 'Add to Cart'}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveItem(item.productId)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Clear Wishlist Button */}
              <div className="flex justify-end">
                <Button
                  variant="outline"
                  onClick={handleClearWishlist}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear Wishlist
                </Button>
              </div>
            </div>
          ) : (
            <Card className="bg-white shadow-lg">
              <CardContent className="p-12 text-center">
                <div className="mx-auto w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mb-4">
                  <Heart className="h-10 w-10 text-pink-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Your wishlist is empty</h3>
                <p className="text-gray-600 mb-6">
                  Start saving items you love to your wishlist
                </p>
                <Button asChild className="bg-purple-600 hover:bg-purple-700">
                  <Link href="/products">
                    Browse Products
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Move All to Cart
                </Button>
                
            {/* Recently Added */}
            {getRecentlyAdded().length > 0 && (
                <div>
                    <p className="text-lg font-bold">Recently Added</p>
                  {getRecentlyAdded().map((item) => (
                    <div key={item.productId} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50">
                      <div className="relative w-12 h-12 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                        {item.imageUrl ? (
                          <Image
                            src={item.imageUrl}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <Package className="h-6 w-6 text-gray-400 m-auto" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(item.addedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
            )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Empty State for Mobile */}
      {wishlist.length === 0 && (
        <div className="lg:hidden mt-8">
          <Card className="bg-white shadow-lg">
            <CardContent className="p-8 text-center">
              <div className="mx-auto w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-4">
                <Heart className="h-8 w-8 text-pink-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Your wishlist is empty</h3>
              <p className="text-gray-600 mb-4">
                Start saving items you love to your wishlist
              </p>
              <Button asChild className="bg-purple-600 hover:bg-purple-700">
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
