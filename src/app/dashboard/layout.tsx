'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Home, 
  Calendar, 
  Heart, 
  User, 
  ShoppingBag, 
  Crown
} from 'lucide-react';
import Link from 'next/link';
import { LogoutButton } from '@/components/auth/LogoutButton';
import { useCartWishlist } from '@/contexts/CartWishlistContext';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Logo URL from Wixstatic CDN
const logoUrl = "https://static.wixstatic.com/media/bdbc7d_0c6ab12123064711a5f85e34030152c8~mv2.png/v1/fill/w_536,h_531,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/bdbc7d_0c6ab12123064711a5f85e34030152c8~mv2.png";

const sidebarItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: Home,
    badge: null
  },
  {
    title: 'Bookings',
    href: '/dashboard/bookings',
    icon: Calendar,
    badge: null
  },
  {
    title: 'Recommendations',
    href: '/dashboard/recommendations',
    icon: Heart,
    badge: 'New'
  },
  {
    title: 'Profile',
    href: '/dashboard/profile',
    icon: User,
    badge: null
  },
  {
    title: 'Cart',
    href: '/dashboard/cart',
    icon: ShoppingBag,
    badge: 'cart'
  },
  {
    title: 'Wishlist',
    href: '/dashboard/wishlist',
    icon: Heart,
    badge: 'wishlist'
  }
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, loading, user, isAdmin } = useAuth();
  const { cartCount, wishlistCount } = useCartWishlist();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    router.push('/auth');
    return null;
  }

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard';
    }
    return pathname.startsWith(href);
  };

  const getBadgeContent = (badge: string | null) => {
    if (badge === 'cart') {
      return cartCount > 0 ? cartCount.toString() : null;
    }
    if (badge === 'wishlist') {
      return wishlistCount > 0 ? wishlistCount.toString() : null;
    }
    return badge;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out flex flex-col
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-200">
          <Link href="/dashboard" className="flex items-center space-x-3">
            <Image 
              src={logoUrl} 
              alt="MapMySoul" 
              width={32}
              height={32}
              className="w-8 h-8" 
            />
            <div>
              <h1 className="text-lg font-bold text-gray-900">Map My Soul</h1>
              <p className="text-xs text-gray-500">Dashboard</p>
            </div>
          </Link>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={user?.avatar} alt={user?.displayName || user?.firstName} />
              <AvatarFallback className="bg-purple-500 text-white text-sm font-medium">
                {user?.firstName ? user.firstName.charAt(0).toUpperCase() : 
                 user?.displayName ? user.displayName.charAt(0).toUpperCase() : 
                 user?.email ? user.email.charAt(0).toUpperCase() : 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.displayName || user?.firstName || 'User'}
              </p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              {isAdmin && (
                <Badge variant="secondary" className="mt-1 text-xs">
                  <Crown className="h-3 w-3 mr-1" />
                  Admin
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              const badgeContent = getBadgeContent(item.badge);
              
              return (
                <Link key={item.href} href={item.href}>
                  <div className={`
                    flex items-center justify-between px-3 py-2 rounded-md transition-colors cursor-pointer
                    ${active 
                      ? 'bg-purple-100 text-purple-700' 
                      : 'text-gray-700 hover:bg-gray-100'
                    }
                  `}>
                    <div className="flex items-center space-x-3">
                      <Icon className={`h-5 w-5 ${active ? 'text-purple-600' : 'text-gray-500'}`} />
                      <span className="text-sm font-medium">{item.title}</span>
                    </div>
                    {badgeContent && (
                      <Badge 
                        variant="secondary" 
                        className={`
                          text-xs
                          ${active 
                            ? 'bg-purple-200 text-purple-700' 
                            : item.badge === 'New' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-gray-200 text-gray-700'
                          }
                        `}
                      >
                        {badgeContent}
                      </Badge>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-200">
          <div className="space-y-2">
            <Link href="/" className="block">
              <Button variant="ghost" size="sm" className="w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-100">
                <Home className="h-4 w-4 mr-2" />
                Back to Site
              </Button>
            </Link>
            <LogoutButton 
              variant="ghost" 
              size="sm" 
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              Sign Out
            </LogoutButton>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
