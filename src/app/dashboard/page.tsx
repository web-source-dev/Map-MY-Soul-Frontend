'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Heart, User, ShoppingBag, Clock, TrendingUp, Package, Star } from 'lucide-react';
import Link from 'next/link';
import { dashboardApi } from '@/lib/api';
import { showToast } from '@/lib/utils';

interface DashboardStats {
  upcomingBookings: number;
  recommendations: number;
  cartItems: number;
  wishlistItems: number;
  totalBookings: number;
}
interface Booking {
  serviceName: string;
  serviceProviderName: string;
  bookingDate: string;
  sessionType: string;
  status: string;
}
interface Recommendation {
  name: string;
  type: string;
  price: number;
}



interface DashboardOverview {
  bookings: Booking[];
  recommendations: {
    services: Recommendation[];
    products: Recommendation[];
    podcasts: Recommendation[];
  };
  cart: Recommendation[];
  wishlist: Recommendation[];
}

export default function DashboardPage() {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats>({
    upcomingBookings: 0,
    recommendations: 0,
    cartItems: 0,
    wishlistItems: 0,
    totalBookings: 0
  });
  const [overview, setOverview] = useState<DashboardOverview>({
    bookings: [],
    recommendations: { services: [], products: [], podcasts: [] },
    cart: [],
    wishlist: []
  });
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!isAuthenticated && !loading) {
      router.push('/auth');
      return;
    }

    if (isAuthenticated) {
      fetchDashboardData();
    }
  }, [isAuthenticated, loading]);

  const fetchDashboardData = async () => {
    try {
      setLoadingData(true);
      const [statsData, overviewData] = await Promise.all([
        dashboardApi.getStats(),
        dashboardApi.getOverview()
      ]);
      
      console.log('Dashboard stats data:', statsData); // Debug log
      console.log('Dashboard overview data:', overviewData); // Debug log
      console.log('Bookings in overview:', overviewData.bookings); // Debug log
      
      setStats(statsData);
      setOverview(overviewData);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      showToast.error('Failed to load dashboard data');
    } finally {
      setLoadingData(false);
    }
  };

  const getUpcomingBookings = () => {
    const upcomingBookings = overview.bookings.filter((booking: Booking) => {
      const bookingDate = new Date(booking.bookingDate);
      const now = new Date();
      const isUpcoming = bookingDate > now;
      const isConfirmed = booking.status === 'confirmed';
      const isPending = booking.status === 'pending';
      
      console.log('Dashboard booking check:', {
        serviceName: booking.serviceName,
        bookingDate: booking.bookingDate,
        parsedDate: bookingDate,
        now: now,
        isUpcoming,
        status: booking.status,
        isConfirmed,
        isPending,
        shouldShow: isUpcoming && (isConfirmed || isPending)
      });
      
      // Show bookings that are upcoming (future date) and either confirmed or pending
      return isUpcoming && (isConfirmed || isPending);
    });
    
    console.log('Dashboard upcoming bookings:', upcomingBookings);
    return upcomingBookings.slice(0, 3);
  };

  const getRecentRecommendations = () => {
    const allRecommendations = [
      ...overview.recommendations.services.map((item: Recommendation) => ({ ...item, type: 'service' })),
      ...overview.recommendations.products.map((item: Recommendation) => ({ ...item, type: 'product' })),
      ...overview.recommendations.podcasts.map((item: Recommendation) => ({ ...item, type: 'podcast' }))
    ];
    return allRecommendations.slice(0, 3);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading || loadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-indigo"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    router.push('/auth');
    return null;
  }

  const dashboardItems = [
    {
      title: 'Bookings',
      description: 'View and manage your upcoming bookings',
      icon: Calendar,
      href: '/dashboard/bookings',
      color: 'bg-blue-500',
      count: stats.totalBookings,
      badge: stats.upcomingBookings > 0 ? `${stats.upcomingBookings} upcoming` : null
    },
    {
      title: 'Recommendations',
      description: 'Personalized wellness recommendations',
      icon: Heart,
      href: '/dashboard/recommendations',
      color: 'bg-primary-indigo',
      count: stats.recommendations,
      badge: stats.recommendations > 0 ? `${stats.recommendations} new` : null
    },
    {
      title: 'Profile',
      description: 'Update your preferences and settings',
      icon: User,
      href: '/dashboard/profile',
      color: 'bg-primary-pastel',
      count: null,
      badge: null
    },
    {
      title: 'Cart',
      description: 'View your shopping cart',
      icon: ShoppingBag,
      href: '/dashboard/cart',
      color: 'bg-secondary-pop',
      count: stats.cartItems,
      badge: stats.cartItems > 0 ? `${stats.cartItems} items` : null
    },
    {
      title: 'Wishlist',
      description: 'Your saved items and favorites',
      icon: Star,
      href: '/dashboard/wishlist',
      color: 'bg-secondary-vivid',
      count: stats.wishlistItems,
      badge: stats.wishlistItems > 0 ? `${stats.wishlistItems} items` : null
    }
  ];

  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">
          Welcome back, {user?.displayName || 'User'}! ✨
        </h1>
        <p className="text-foreground/70 text-lg">
          Your wellness journey continues here. Here&apos;s what&apos;s happening with your account.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-background shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-primary-indigo/10 rounded-full">
                <Calendar className="h-6 w-6 text-primary-indigo" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-foreground/70">Upcoming Bookings</p>
                <p className="text-2xl font-bold text-foreground">{stats.upcomingBookings}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-background shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-primary-indigo/10 rounded-full">
                <Heart className="h-6 w-6 text-primary-indigo" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-foreground/70">Recommendations</p>
                <p className="text-2xl font-bold text-foreground">{stats.recommendations}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-background shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-primary-indigo/10 rounded-full">
                <ShoppingBag className="h-6 w-6 text-primary-indigo" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-foreground/70">Cart Items</p>
                <p className="text-2xl font-bold text-foreground">{stats.cartItems}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-background shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-primary-indigo/10 rounded-full">
                <Star className="h-6 w-6 text-primary-indigo" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-foreground/70">Wishlist</p>
                <p className="text-2xl font-bold text-foreground">{stats.wishlistItems}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Dashboard Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Upcoming Bookings */}
        <Card className="bg-background shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-primary-indigo" />
              <span>Upcoming Bookings</span>
            </CardTitle>
            <CardDescription>
              Your next wellness bookings
            </CardDescription>
          </CardHeader>
          <CardContent>
            {getUpcomingBookings().length > 0 ? (
              <div className="space-y-4">
                {getUpcomingBookings().map((booking: Booking, index: number) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-foreground/5">
                    <div>
                      <p className="font-medium text-foreground">{booking.serviceName}</p>
                      <p className="text-sm text-foreground/70">{booking.serviceProviderName}</p>
                      <p className="text-xs text-foreground/60">{formatDate(booking.bookingDate)}</p>
                    </div>
                    <Badge variant="secondary" className="bg-primary-indigo/10 text-blue-800">
                      {booking.sessionType}
                    </Badge>
                  </div>
                ))}
                <Button asChild variant="outline" className="w-full">
                  <Link href="/dashboard/bookings">View All Bookings</Link>
                </Button>
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-foreground/50 mx-auto mb-4" />
                <p className="text-foreground/60">No upcoming bookings</p>
                <p className="text-sm text-foreground/50 mb-4">Book your next wellness session</p>
                <Button asChild>
                  <Link href="/services">Book a Session</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Recommendations */}
        <Card className="bg-background shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-pink-600" />
              <span>Recent Recommendations</span>
            </CardTitle>
            <CardDescription>
              Personalized for your wellness journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            {getRecentRecommendations().length > 0 ? (
              <div className="space-y-4">
                {getRecentRecommendations().map((item: Recommendation, index: number) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-foreground/5">
                    <div>
                      <p className="font-medium text-foreground">{item.name}</p>
                      <p className="text-sm text-foreground/70">
                        {item.type === 'service' ? 'Wellness Service' : 
                         item.type === 'product' ? 'Product' : 'Podcast'}
                      </p>
                      {item.price && (
                        <p className="text-xs text-foreground/60">${item.price}</p>
                      )}
                    </div>
                    <Badge variant="secondary" className="bg-pink-100 text-pink-800">
                      {item.type}
                    </Badge>
                  </div>
                ))}
                <Button asChild variant="outline" className="w-full">
                  <Link href="/dashboard/recommendations">View All Recommendations</Link>
                </Button>
              </div>
            ) : (
              <div className="text-center py-8">
                <Heart className="h-12 w-12 text-foreground/50 mx-auto mb-4" />
                <p className="text-foreground/60">No recommendations yet</p>
                <p className="text-sm text-foreground/50 mb-4">Take our wellness quiz to get personalized recommendations</p>
                <Button asChild>
                  <Link href="/quiz">Take Wellness Quiz</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {dashboardItems.map((item) => (
          <Link key={item.title} href={item.href}>
            <Card className="bg-background shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-full ${item.color} bg-opacity-10 group-hover:bg-opacity-20 transition-all duration-300`}>
                    <item.icon className={`h-6 w-6 ${item.color.replace('bg-', 'text-')}`} />
                  </div>
                  {item.badge && (
                    <Badge variant="secondary" className="text-xs">
                      {item.badge}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary-indigo transition-colors duration-300">
                  {item.title}
                </CardTitle>
                <CardDescription className="text-foreground/70">
                  {item.description}
                </CardDescription>
                {item.count !== null && (
                  <p className="text-sm font-medium text-primary-indigo mt-2">
                    {item.count} {item.count === 1 ? 'item' : 'items'}
                  </p>
                )}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-foreground mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button asChild className="bg-primary-indigo hover:bg-primary-indigo/90 h-16 text-lg">
            <Link href="/services">
              <Calendar className="h-5 w-5 mr-2" />
              Book a Session
            </Link>
          </Button>
          <Button asChild variant="outline" className="h-16 text-lg">
            <Link href="/quiz">
              <TrendingUp className="h-5 w-5 mr-2" />
              Take Wellness Quiz
            </Link>
          </Button>
          <Button asChild variant="outline" className="h-16 text-lg">
            <Link href="/products">
              <Package className="h-5 w-5 mr-2" />
              Shop Products
            </Link>
          </Button>
          <Button asChild variant="outline" className="h-16 text-lg">
            <Link href="/contact">
              <User className="h-5 w-5 mr-2" />
              Get Support
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
}
