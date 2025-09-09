'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Home, 
  Users, 
  Calendar, 
  MessageSquare, 
  BarChart3,
  Activity,
  Crown,
  Menu,
  X
} from 'lucide-react';
import Link from 'next/link';
import { LogoutButton } from '@/components/auth/LogoutButton';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AdminRoute } from '@/components/auth/AdminRoute';

// Logo URL from Wixstatic CDN
const logoUrl = "https://static.wixstatic.com/media/bdbc7d_0c6ab12123064711a5f85e34030152c8~mv2.png/v1/fill/w_536,h_531,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/bdbc7d_0c6ab12123064711a5f85e34030152c8~mv2.png";

const adminSidebarItems = [
  {
    title: 'Overview',
    href: '/admin',
    icon: Home,
    badge: null
  },
  {
    title: 'Users',
    href: '/admin/users',
    icon: Users,
    badge: null
  },
  {
    title: 'Bookings',
    href: '/admin/bookings',
    icon: Calendar,
    badge: null
  },
  {
    title: 'Contacts',
    href: '/admin/contacts',
    icon: MessageSquare,
    badge: null
  },
  {
    title: 'Analytics',
    href: '/admin/analytics',
    icon: BarChart3,
    badge: null
  },
  {
    title: 'Audit Logs',
    href: '/admin/audit-logs',
    icon: Activity,
    badge: null
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, loading, user, isAdmin } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-foreground/5">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-indigo"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    router.push('/auth');
    return null;
  }

  if (!isAdmin) {
    router.push('/dashboard');
    return null;
  }

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === '/admin';
    }
    return pathname.startsWith(href);
  };

  return (
    <AdminRoute>
      <div className="min-h-screen bg-foreground/5">
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Mobile header */}
        <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-background border-b border-foreground/20 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Image 
                src={logoUrl} 
                alt="MapMySoul" 
                width={32}
                height={32}
                className="w-8 h-8" 
              />
              <div>
                <h1 className="text-lg font-bold text-foreground">Admin Panel</h1>
                <p className="text-xs text-foreground/60">Map My Soul</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Sidebar */}
        <div className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-background shadow-lg transform transition-transform duration-300 ease-in-out flex flex-col
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${sidebarOpen ? 'top-0' : 'top-16 lg:top-0'}
        `}>
          {/* Sidebar Header */}
          <div className="p-4 border-b border-foreground/20">
            <Link href="/admin" className="flex items-center space-x-3">
              <Image 
                src={logoUrl} 
                alt="MapMySoul" 
                width={32}
                height={32}
                className="w-8 h-8" 
              />
              <div>
                <h1 className="text-lg font-bold text-foreground">Admin Panel</h1>
                <p className="text-xs text-foreground/60">Map My Soul</p>
              </div>
            </Link>
          </div>

          {/* Admin User Info */}
          <div className="p-4 border-b border-foreground/20">
            <div className="flex items-center space-x-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={user?.avatar} alt={user?.displayName || user?.firstName} />
                <AvatarFallback className="bg-primary-indigo text-background text-sm font-medium">
                  {user?.firstName ? user.firstName.charAt(0).toUpperCase() : 
                   user?.displayName ? user.displayName.charAt(0).toUpperCase() : 
                   user?.email ? user.email.charAt(0).toUpperCase() : 'A'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {user?.displayName || user?.firstName || 'Admin'}
                </p>
                <p className="text-xs text-foreground/60 truncate">{user?.email}</p>
                <Badge variant="secondary" className="mt-1 text-xs">
                  <Crown className="h-3 w-3 mr-1" />
                  Administrator
                </Badge>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-1">
              {adminSidebarItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                
                return (
                  <Link key={item.href} href={item.href}>
                    <div className={`
                      flex items-center justify-between px-3 py-2 rounded-md transition-colors cursor-pointer
                      ${active 
                        ? 'bg-primary-indigo/10 text-primary-indigo' 
                        : 'text-foreground hover:bg-foreground/5'
                      }
                    `}>
                      <div className="flex items-center space-x-3">
                        <Icon className={`h-5 w-5 ${active ? 'text-primary-indigo' : 'text-foreground/60'}`} />
                        <span className="text-sm font-medium">{item.title}</span>
                      </div>
                      {item.badge && (
                        <Badge 
                          variant="secondary" 
                          className={`
                            text-xs
                            ${active 
                              ? 'bg-primary-indigo/20 text-primary-indigo' 
                              : 'bg-foreground/20 text-foreground/70'
                            }
                          `}
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-foreground/20">
            <div className="space-y-2">
              <Link href="/" className="block">
                <Button variant="ghost" size="sm" className="w-full justify-start text-gray-600 hover:text-foreground hover:bg-gray-100">
                  <Home className="h-4 w-4 mr-2" />
                  Back to Site
                </Button>
              </Link>
              <LogoutButton 
                variant="ghost" 
                size="sm" 
                className="w-full justify-start text-secondary-pop hover:text-secondary-pop/90 hover:bg-secondary-pop/5"
              >
                Sign Out
              </LogoutButton>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:pl-64">
          {/* Page Content */}
          <main className="p-6 pt-20 lg:pt-6">
            {children}
          </main>
        </div>
      </div>
    </AdminRoute>
  );
}
