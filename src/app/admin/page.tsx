'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Calendar, 
  MessageSquare, 
  Mail, 
  Package, 
  Headphones, 
  DollarSign,
  Activity,
  UserPlus,
  AlertCircle
} from 'lucide-react';
import { adminApi } from '@/lib/api';
import { showToast } from '@/lib/utils';
import Link from 'next/link';

interface AdminOverviewData {
  overview: {
    totalUsers: number;
    totalBookings: number;
    totalContacts: number;
    totalNewsletterSubscribers: number;
    totalServices: number;
    totalProducts: number;
    totalPodcasts: number;
    totalRecommendations: number;
    totalRevenue: number;
  };
  bookingStats: {
    pending: number;
    confirmed: number;
    completed: number;
    cancelled: number;
  };
  contactStats: {
    new: number;
    in_progress: number;
    responded: number;
    resolved: number;
    closed: number;
  };
  userStats: {
    user: number;
    admin: number;
  };
  recentActivity: {
    bookings: Array<{
      _id: string;
      serviceName: string;
      customerId?: {
        firstName: string;
        lastName: string;
      };
      bookingDate: string;
      status: string;
    }>;
    contacts: Array<{
      _id: string;
      name: string;
      email: string;
      createdAt: string;
      status: string;
    }>;
    users: Array<{
      _id: string;
      firstName: string;
      lastName: string;
      email: string;
      createdAt: string;
      role: string;
    }>;
    auditLogs: Array<Record<string, unknown>>;
  };
  monthlyStats: Array<Record<string, unknown>>;
}

export default function AdminOverview() {
  const [data, setData] = useState<AdminOverviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      const response = await adminApi.getOverview() as { success: boolean; data: AdminOverviewData };
      
      if (response.success) {
        setData(response.data);
      } else {
        setError('Failed to fetch admin data');
      }
    } catch (error) {
      console.error('Error fetching admin data:', error);
      setError('Failed to load admin dashboard data');
      showToast.error('Failed to load admin dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'new':
        return 'bg-purple-100 text-purple-800';
      case 'in_progress':
        return 'bg-orange-100 text-orange-800';
      case 'responded':
        return 'bg-blue-100 text-blue-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-indigo"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Error Loading Data</h3>
              <p className="text-foreground/70 mb-4">{error}</p>
              <Button onClick={fetchAdminData}>Retry</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-foreground/70 mt-1">Overview of your platform&apos;s performance and activity</p>
        </div>
        <Button onClick={fetchAdminData} variant="outline">
          <Activity className="h-4 w-4 mr-2" />
          Refresh Data
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-foreground/60" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.overview.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-foreground/60">
              {data.userStats.user} regular users, {data.userStats.admin} admins
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-foreground/60" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.overview.totalBookings.toLocaleString()}</div>
            <p className="text-xs text-foreground/60">
              {data.bookingStats.pending} pending, {data.bookingStats.confirmed} confirmed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-foreground/60" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(data.overview.totalRevenue)}</div>
            <p className="text-xs text-foreground/60">
              From confirmed and completed bookings
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Newsletter Subscribers</CardTitle>
            <Mail className="h-4 w-4 text-foreground/60" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.overview.totalNewsletterSubscribers.toLocaleString()}</div>
            <p className="text-xs text-foreground/60">
              Active subscribers
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Content Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Services</CardTitle>
            <Package className="h-4 w-4 text-foreground/60" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.overview.totalServices}</div>
            <p className="text-xs text-foreground/60">Available services</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
            <Package className="h-4 w-4 text-foreground/60" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.overview.totalProducts}</div>
            <p className="text-xs text-foreground/60">Available products</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Podcasts</CardTitle>
            <Headphones className="h-4 w-4 text-foreground/60" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.overview.totalPodcasts}</div>
            <p className="text-xs text-foreground/60">Available podcasts</p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Stats and Recent Activity */}
      <Tabs defaultValue="bookings" className="space-y-4">
        <TabsList>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="contacts">Contacts</TabsTrigger>
          <TabsTrigger value="recent">Recent Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="bookings" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Pending</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-support-pastel">{data.bookingStats.pending}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Confirmed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary-indigo">{data.bookingStats.confirmed}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Completed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-support-pastel">{data.bookingStats.completed}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Cancelled</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-secondary-pop">{data.bookingStats.cancelled}</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="contacts" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">New</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary-lavender">{data.contactStats.new}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-support-pastel">{data.contactStats.in_progress}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Responded</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary-indigo">{data.contactStats.responded}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Resolved</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-support-pastel">{data.contactStats.resolved}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Closed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground/60">{data.contactStats.closed}</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="recent" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Bookings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Recent Bookings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {data.recentActivity.bookings.length > 0 ? (
                    data.recentActivity.bookings.map((booking) => (
                      <div key={booking._id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{booking.serviceName}</p>
                          <p className="text-sm text-foreground/70">
                            {booking.customerId?.firstName} {booking.customerId?.lastName}
                          </p>
                          <p className="text-xs text-foreground/60">{formatDate(booking.bookingDate)}</p>
                        </div>
                        <Badge className={getStatusColor(booking.status)}>
                          {booking.status}
                        </Badge>
                      </div>
                    ))
                  ) : (
                    <p className="text-foreground/60 text-center py-4">No recent bookings</p>
                  )}
                </div>
                <div className="mt-4">
                  <Link href="/admin/bookings">
                    <Button variant="outline" size="sm" className="w-full">
                      View All Bookings
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Recent Contacts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Recent Contacts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {data.recentActivity.contacts.length > 0 ? (
                    data.recentActivity.contacts.map((contact) => (
                      <div key={contact._id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{contact.name}</p>
                          <p className="text-sm text-foreground/70">{contact.email}</p>
                          <p className="text-xs text-foreground/60">{formatDate(contact.createdAt)}</p>
                        </div>
                        <Badge className={getStatusColor(contact.status)}>
                          {contact.status}
                        </Badge>
                      </div>
                    ))
                  ) : (
                    <p className="text-foreground/60 text-center py-4">No recent contacts</p>
                  )}
                </div>
                <div className="mt-4">
                  <Link href="/admin/contacts">
                    <Button variant="outline" size="sm" className="w-full">
                      View All Contacts
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Users */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <UserPlus className="h-5 w-5 mr-2" />
                Recent Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.recentActivity.users.length > 0 ? (
                  data.recentActivity.users.map((user) => (
                    <div key={user._id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{user.firstName} {user.lastName}</p>
                        <p className="text-sm text-foreground/70">{user.email}</p>
                        <p className="text-xs text-foreground/60">{formatDate(user.createdAt)}</p>
                      </div>
                      <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                        {user.role}
                      </Badge>
                    </div>
                  ))
                ) : (
                  <p className="text-foreground/60 text-center py-4 col-span-full">No recent users</p>
                )}
              </div>
              <div className="mt-4">
                <Link href="/admin/users">
                  <Button variant="outline" size="sm" className="w-full">
                    View All Users
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
