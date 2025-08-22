"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ShoppingBag, Heart, Star, Shield, Sparkles, Leaf } from "lucide-react";
import Image from "next/image";
import { useCartWishlist } from "@/contexts/CartWishlistContext";
import { useAuth } from "@/contexts/AuthContext";
import LoginPrompt from "@/components/LoginPrompt";
import { backendRequest } from "@/lib/api";
import { showToast } from "@/lib/utils";

interface Product {
    _id: string;
    name: string;
    description?: string;
    price: number;
    imageUrl?: string;
    stock?: number;
    createdAt?: string;
    updatedAt?: string;
}

const ProductDetailPage = () => {
    const params = useParams();
    const router = useRouter();
    const { isAuthenticated } = useAuth();
    const { addToCart, addToWishlist, isInCart, isInWishlist, loading } = useCartWishlist();
    const productId = params.productId as string;

    const [product, setProduct] = useState<Product | null>(null);
    const [loadingProduct, setLoadingProduct] = useState(true);
    const [showLoginPrompt, setShowLoginPrompt] = useState(false);
    const [loginAction, setLoginAction] = useState<'cart' | 'wishlist'>('cart');

    useEffect(() => {
        fetchProduct();
    }, [productId]);

    const fetchProduct = async () => {
        try {
            setLoadingProduct(true);
            const response = await backendRequest(`/api/products/${productId}`);
            setProduct(response.product);
        } catch (error) {
            console.error('Failed to fetch product:', error);
            showToast.error('Failed to load product details');
        } finally {
            setLoadingProduct(false);
        }
    };

    const handleAddToCart = async () => {
        if (!isAuthenticated) {
            setLoginAction('cart');
            setShowLoginPrompt(true);
            return;
        }
        if (product) {
            await addToCart(product);
        }
    };

    const handleAddToWishlist = async () => {
        if (!isAuthenticated) {
            setLoginAction('wishlist');
            setShowLoginPrompt(true);
            return;
        }
        if (product) {
            await addToWishlist(product);
        }
    };

    if (loadingProduct) {
        return (
            <Layout>
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                        <p className="text-muted-foreground">Loading product details...</p>
                    </div>
                </div>
            </Layout>
        );
    }

    if (!product) {
        return (
            <Layout>
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
                        <p className="text-muted-foreground mb-4">The product you're looking for doesn't exist.</p>
                        <Button onClick={() => router.push('/products')}>
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Products
                        </Button>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="min-h-screen py-10">
                <div className="max-w-7xl mx-auto container-padding">
                    {/* Back Button */}
                    <div className="mb-6">
                        <Button
                            variant="outline"
                            onClick={() => router.push('/products')}
                            className="mb-4"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Products
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Product Image */}
                        <div className="space-y-6">
                            <div className="relative overflow-hidden rounded-2xl shadow-lg">
                                <Image
                                    src={product.imageUrl || "/assets/spiritual-products.jpg"}
                                    alt={product.name}
                                    width={800}
                                    height={600}
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                        </div>

                        {/* Product Details */}
                        <div className="space-y-6">
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                                    {product.name}
                                </h1>


                                <div className="flex items-center gap-4">
                                    <div className="text-3xl font-bold text-primary">
                                        ${product.price}
                                    </div>

                                    {product.stock !== undefined && (
                                        <div>
                                            <Badge
                                                variant={product.stock > 0 ? "default" : "destructive"}
                                            >
                                                {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
                                            </Badge>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Product Description */}
                            {product.description && (
                                <p className="text-muted-foreground leading-relaxed">
                                    {product.description}
                                </p>
                            )}

                            {/* Action Buttons */}
                            <div className="space-y-4">
                                <div className="flex gap-4">
                                    <Button
                                        size="lg"
                                        className={`flex-1 font-medium rounded-lg transition-all duration-200 ${isInCart(product._id)
                                            ? 'bg-green-600 hover:bg-green-700 text-white'
                                            : 'bg-primary hover:bg-primary/90 text-primary-foreground'
                                            }`}
                                        onClick={handleAddToCart}
                                        disabled={loading || (product.stock !== undefined && product.stock <= 0)}
                                    >
                                        <ShoppingBag className="w-5 h-5 mr-2" />
                                        {isInCart(product._id) ? 'In Cart' : 'Add to Cart'}
                                    </Button>

                                    <Button
                                        variant="outline"
                                        size="lg"
                                        className={`rounded-lg transition-all duration-200 ${isInWishlist(product._id)
                                            ? 'border-red-500 text-red-600 hover:bg-red-50'
                                            : ''
                                            }`}
                                        onClick={handleAddToWishlist}
                                        disabled={loading}
                                    >
                                        <Heart className={`w-5 h-5 ${isInWishlist(product._id) ? 'fill-current' : ''}`} />
                                    </Button>
                                </div>

                                {product.stock !== undefined && product.stock <= 0 && (
                                    <div className="text-center p-4 bg-amber-50 border border-amber-200 rounded-lg">
                                        <p className="text-amber-800 text-sm">
                                            This item is currently out of stock. Please check back later.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Login Prompt */}
            <LoginPrompt
                isOpen={showLoginPrompt}
                onClose={() => setShowLoginPrompt(false)}
                action={loginAction}
            />
        </Layout>
    );
};

export default ProductDetailPage;
