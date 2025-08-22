'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, Play, ShoppingCart, Calendar, Sparkles } from 'lucide-react';
import { recommendationsApi } from '@/lib/api';
import { showToast } from '@/lib/utils';
import Link from 'next/link';

interface Recommendation {
  serviceId?: string;
  productId?: string;
  podcastId?: string;
  name?: string;
  title?: string;
  price?: number;
  description?: string;
  practitionerType?: string;
  image?: string;
  imageUrl?: string;
  link?: string;
  episode?: string;
}

interface RecommendationsData {
  services: Recommendation[];
  products: Recommendation[];
  podcasts: Recommendation[];
}

export default function RecommendationsPage() {
  const { loading, isAuthenticated } = useAuth();
  const router = useRouter();
  const [recommendations, setRecommendations] = useState<RecommendationsData>({
    services: [],
    products: [],
    podcasts: []
  });
  const [loadingRecommendations, setLoadingRecommendations] = useState(true);

  useEffect(() => {
    if (!isAuthenticated && !loading) {
      router.push('/auth');
      return;
    }

    if (isAuthenticated) {
      fetchRecommendations();
    }
  }, [isAuthenticated, loading]);

  const fetchRecommendations = async () => {
    try {
      setLoadingRecommendations(true);
      const response = await recommendationsApi.getUserRecommendations() as { recommendations: RecommendationsData };
      setRecommendations(response.recommendations);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      showToast.error('Failed to load recommendations');
    } finally {
      setLoadingRecommendations(false);
    }
  };

  const getTotalRecommendations = () => {
    return recommendations.services.length + recommendations.products.length + recommendations.podcasts.length;
  };

  if (loading || loadingRecommendations) {
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
            <h1 className="text-4xl font-bold text-gray-900 mb-2">My Recommendations</h1>
            <p className="text-gray-600 text-lg">
              Personalized wellness recommendations just for you
            </p>
          </div>
          <Button asChild className="bg-purple-600 hover:bg-purple-700">
            <Link href="/quiz">
              Take Quiz Again
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-white shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-pink-100 rounded-full">
                <Heart className="h-6 w-6 text-pink-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Recommendations</p>
                <p className="text-2xl font-bold text-gray-900">{getTotalRecommendations()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-full">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Services</p>
                <p className="text-2xl font-bold text-gray-900">{recommendations.services.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-full">
                <ShoppingCart className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Products</p>
                <p className="text-2xl font-bold text-gray-900">{recommendations.products.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-full">
                <Play className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Podcasts</p>
                <p className="text-2xl font-bold text-gray-900">{recommendations.podcasts.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations Tabs */}
      <Tabs defaultValue="services" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="services" className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>Services ({recommendations.services.length})</span>
          </TabsTrigger>
          <TabsTrigger value="products" className="flex items-center space-x-2">
            <ShoppingCart className="h-4 w-4" />
            <span>Products ({recommendations.products.length})</span>
          </TabsTrigger>
          <TabsTrigger value="podcasts" className="flex items-center space-x-2">
            <Play className="h-4 w-4" />
            <span>Podcasts ({recommendations.podcasts.length})</span>
          </TabsTrigger>
        </TabsList>

        {/* Services Tab */}
        <TabsContent value="services" className="space-y-6">
          {recommendations.services.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.services.map((service, index) => (
                <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{service.name}</CardTitle>
                      <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                        <Sparkles className="h-3 w-3 mr-1" />
                        Recommended
                      </Badge>
                    </div>
                    {service.practitionerType && (
                      <CardDescription>
                        {service.practitionerType}
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {service.description && (
                        <p className="text-gray-600 text-sm line-clamp-3">
                          {service.description}
                        </p>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-semibold text-gray-900">
                          ${service.price}
                        </span>
                        <Button asChild size="sm" className="bg-purple-600 hover:bg-purple-700">
                          <Link href={`/book/${service.serviceId}`}>
                            Book Session
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="bg-white shadow-lg">
              <CardContent className="p-12 text-center">
                <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No service recommendations</h3>
                <p className="text-gray-600 mb-6">
                  Take our wellness quiz to get personalized service recommendations
                </p>
                <Button asChild className="bg-purple-600 hover:bg-purple-700">
                  <Link href="/quiz">
                    Take Quiz
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Products Tab */}
        <TabsContent value="products" className="space-y-6">
          {recommendations.products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.products.map((product, index) => (
                <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{product.name}</CardTitle>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        <Sparkles className="h-3 w-3 mr-1" />
                        Recommended
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {product.description && (
                        <p className="text-gray-600 text-sm line-clamp-3">
                          {product.description}
                        </p>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-semibold text-gray-900">
                          ${product.price}
                        </span>
                        <Button asChild size="sm" className="bg-green-600 hover:bg-green-700">
                          <Link href={`/products/${product.productId}`}>
                            View Product
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="bg-white shadow-lg">
              <CardContent className="p-12 text-center">
                <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No product recommendations</h3>
                <p className="text-gray-600 mb-6">
                  Take our wellness quiz to get personalized product recommendations
                </p>
                <Button asChild className="bg-purple-600 hover:bg-purple-700">
                  <Link href="/quiz">
                    Take Quiz
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Podcasts Tab */}
        <TabsContent value="podcasts" className="space-y-6">
          {recommendations.podcasts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.podcasts.map((podcast, index) => (
                <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{podcast.title}</CardTitle>
                      <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                        <Sparkles className="h-3 w-3 mr-1" />
                        Recommended
                      </Badge>
                    </div>
                    {podcast.episode && (
                      <CardDescription>
                        Episode: {podcast.episode}
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {podcast.description && (
                        <p className="text-gray-600 text-sm line-clamp-3">
                          {podcast.description}
                        </p>
                      )}
                      <div className="flex items-center justify-between">
                        <Button asChild size="sm" className="bg-purple-600 hover:bg-purple-700">
                          <Link href={podcast.link || '#'} target="_blank">
                            <Play className="h-4 w-4 mr-2" />
                            Listen Now
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="bg-white shadow-lg">
              <CardContent className="p-12 text-center">
                <Play className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No podcast recommendations</h3>
                <p className="text-gray-600 mb-6">
                  Take our wellness quiz to get personalized podcast recommendations
                </p>
                <Button asChild className="bg-purple-600 hover:bg-purple-700">
                  <Link href="/quiz">
                    Take Quiz
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Empty State for All */}
      {getTotalRecommendations() === 0 && (
        <Card className="bg-white shadow-lg mt-8">
          <CardContent className="p-12 text-center">
            <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No recommendations yet</h3>
            <p className="text-gray-600 mb-6">
              Complete our wellness quiz to receive personalized recommendations for services, products, and podcasts
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-purple-600 hover:bg-purple-700">
                <Link href="/quiz">
                  Take Wellness Quiz
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/services">
                  Browse Services
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
