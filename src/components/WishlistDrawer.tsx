"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Heart, Trash2, ShoppingCart } from "lucide-react";
import { useCartWishlist } from "@/contexts/CartWishlistContext";
import Image from "next/image";

const WishlistDrawer = () => {
  const { wishlist, wishlistCount, removeFromWishlist, addToCart, clearWishlist, loading } = useCartWishlist();
  const [isOpen, setIsOpen] = useState(false);

  const handleMoveToCart = async (item: { productId: string; name: string; price: number; imageUrl: string }) => {
    await addToCart({
      _id: item.productId, // Use productId as _id since WishlistItem doesn't have _id
      productId: item.productId,  
      name: item.name,
      price: item.price,
      imageUrl: item.imageUrl,
    });
    await removeFromWishlist(item.productId);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="rounded-lg relative">
          <Heart className="w-4 h-4" />
          {wishlistCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {wishlistCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5" />
            Wishlist ({wishlistCount} items)
          </SheetTitle>
        </SheetHeader>
        
        <div className="flex flex-col h-full min-h-0">
          {wishlist.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
              <Heart className="w-16 h-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Your wishlist is empty</h3>
              <p className="text-muted-foreground">Save products you love for later</p>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto py-4 space-y-4 min-h-0">
                {wishlist.map((item) => (
                  <div key={item.productId} className="flex gap-3 p-3 border rounded-lg">
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <Image
                        src={item.imageUrl || "/assets/spiritual-products.jpg"}
                        alt={item.name}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">${item.price}</p>
                      
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() => handleMoveToCart(item)}
                          disabled={loading}
                        >
                          <ShoppingCart className="w-3 h-3 mr-1" />
                          Move to Cart
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                          onClick={() => removeFromWishlist(item.productId)}
                          disabled={loading}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-4 flex-shrink-0 mb-4">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    clearWishlist();
                  }}
                  disabled={loading}
                >
                  Clear Wishlist
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default WishlistDrawer;
