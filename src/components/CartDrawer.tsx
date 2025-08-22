"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, X, Plus, Minus, Trash2, ShoppingCart } from "lucide-react";
import { useCartWishlist } from "@/contexts/CartWishlistContext";
import Image from "next/image";

const CartDrawer = () => {
  const { cart, cartCount, removeFromCart, updateCartQuantity, clearCart, loading } = useCartWishlist();
  const [isOpen, setIsOpen] = useState(false);

  const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  const handleQuantityChange = async (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      await removeFromCart(productId);
    } else {
      await updateCartQuantity(productId, newQuantity);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="rounded-lg relative">
          <ShoppingBag className="w-4 h-4" />
          {cartCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {cartCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Shopping Cart ({cartCount} items)
          </SheetTitle>
        </SheetHeader>
        
        <div className="flex flex-col h-full min-h-0">
          {cart.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
              <ShoppingBag className="w-16 h-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Your cart is empty</h3>
              <p className="text-muted-foreground">Add some products to get started</p>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto py-4 space-y-4 min-h-0">
                {cart.map((item) => (
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
                          className="h-6 w-6 p-0"
                          onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                          disabled={loading}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        
                        <span className="text-sm font-medium w-8 text-center">
                          {item.quantity}
                        </span>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                          disabled={loading}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                          onClick={() => removeFromCart(item.productId)}
                          disabled={loading}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-medium text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-4 space-y-4 flex-shrink-0 mb-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Total:</span>
                  <span className="font-semibold text-lg">${totalPrice.toFixed(2)}</span>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={clearCart}
                    disabled={loading}
                  >
                    Clear Cart
                  </Button>
                  <Button className="flex-1">
                    Checkout
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
