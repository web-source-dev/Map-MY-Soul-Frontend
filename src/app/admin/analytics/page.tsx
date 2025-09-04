'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign,
  Calendar,
  Activity,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { adminApi } from '@/lib/api';
import { showToast } from '@/lib/utils';

interface AnalyticsData {
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
  monthlyStats: Array<{
    _id: {
      year: number;
      month: number;
    };
    bookings: number;
    revenue: number;
  }>;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export default function AdminAnalytics() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState('6months');

  useEffect(() => {
    fetchAnalyticsData();
  }, [timeRange]);

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);
      const response = await adminApi.getOverview() as { success: boolean; data: AnalyticsData };
      
      if (response.success) {
        setData(response.data);
      } else {
        setError('Failed to fetch analytics data');
      }
    } catch (error) {
      console.error('Error fetching analytics data:', error);
      setError('Failed to load analytics data');
      showToast.error('Failed to load analytics data');
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

  const formatMonth = (month: number) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[month - 1];
  };

  const getRevenueGrowth = () => {
    if (!data?.monthlyStats || data.monthlyStats.length < 2) return 0;
    const current = data.monthlyStats[data.monthlyStats.length - 1]?.revenue || 0;
    const previous = data.monthlyStats[data.monthlyStats.length - 2]?.revenue || 0;
    return previous > 0 ? ((current - previous) / previous) * 100 : 0;
  };

  const getUserGrowth = () => {
    // Calculate based on monthly stats if available
    if (!data?.monthlyStats || data.monthlyStats.length < 2) return 0;
    const current = data.monthlyStats[data.monthlyStats.length - 1]?.bookings || 0;
    const previous = data.monthlyStats[data.monthlyStats.length - 2]?.bookings || 0;
    return previous > 0 ? ((current - previous) / previous) * 100 : 0;
  };

  const getBookingRate = () => {
    if (!data?.monthlyStats || data.monthlyStats.length < 2) return 0;
    const current = data.monthlyStats[data.monthlyStats.length - 1]?.bookings || 0;
    const previous = data.monthlyStats[data.monthlyStats.length - 2]?.bookings || 0;
    return previous > 0 ? ((current - previous) / previous) * 100 : 0;
  };

  const getAverageOrderValue = () => {
    if (!data?.overview.totalBookings || data.overview.totalBookings === 0) return 0;
    return data.overview.totalRevenue / data.overview.totalBookings;
  };

  const prepareMonthlyData = () => {
    if (!data?.monthlyStats) return [];
    return data.monthlyStats.map(stat => ({
      month: `${formatMonth(stat._id.month)} ${stat._id.year}`,
      bookings: stat.bookings,
      revenue: stat.revenue
    }));
  };

  const prepareBookingStatusData = () => {
    if (!data?.bookingStats) return [];
    return Object.entries(data.bookingStats).map(([status, count]) => ({
      status: status.charAt(0).toUpperCase() + status.slice(1),
      count,
      value: count
    }));
  };

  const prepareContactStatusData = () => {
    if (!data?.contactStats) return [];
    return Object.entries(data.contactStats).map(([status, count]) => ({
      status: status.replace('_', ' ').charAt(0).toUpperCase() + status.replace('_', ' ').slice(1),
      count,
      value: count
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
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
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Data</h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <Button onClick={fetchAnalyticsData}>Retry</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const revenueGrowth = getRevenueGrowth();
  const userGrowth = getUserGrowth();
  const bookingRate = getBookingRate();
  const averageOrderValue = getAverageOrderValue();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600 mt-1">Detailed analytics and insights for your platform</p>
        </div>
        <div className="flex items-center space-x-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">Last Month</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={fetchAnalyticsData} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue Growth</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {revenueGrowth >= 0 ? '+' : ''}{revenueGrowth.toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">vs last month</p>
            <div className="mt-2">
              <Badge variant={revenueGrowth >= 0 ? 'default' : 'destructive'}>
                {revenueGrowth >= 0 ? '↗' : '↘'} {formatCurrency(data.overview.totalRevenue)}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">User Growth</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {userGrowth >= 0 ? '+' : ''}{userGrowth.toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">vs last month</p>
            <div className="mt-2">
              <Badge variant={userGrowth >= 0 ? 'default' : 'destructive'}>
                {userGrowth >= 0 ? '↗' : '↘'} {data.overview.totalUsers.toLocaleString()} users
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Booking Rate</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {bookingRate >= 0 ? '+' : ''}{bookingRate.toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">vs last month</p>
            <div className="mt-2">
              <Badge variant={bookingRate >= 0 ? 'default' : 'destructive'}>
                {bookingRate >= 0 ? '↗' : '↘'} {data.overview.totalBookings.toLocaleString()} bookings
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(averageOrderValue)}</div>
            <p className="text-xs text-muted-foreground">per booking</p>
            <div className="mt-2">
              <Badge variant="outline">
                {data.overview.totalBookings} total bookings
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={prepareMonthlyData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value: number) => [formatCurrency(value), 'Revenue']}
                  labelFormatter={(label) => `Month: ${label}`}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#8884d8" 
                  strokeWidth={2}
                  dot={{ fill: '#8884d8', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Booking Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Booking Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={prepareMonthlyData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value: number) => [value, 'Bookings']}
                  labelFormatter={(label) => `Month: ${label}`}
                />
                <Legend />
                <Bar dataKey="bookings" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Status Distribution Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Booking Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Booking Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={prepareBookingStatusData()}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ status, percent }) => `${status} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {prepareBookingStatusData().map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => [value, 'Bookings']} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Contact Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={prepareContactStatusData()}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ status, percent }) => `${status} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {prepareContactStatusData().map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => [value, 'Contacts']} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Platform Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Platform Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{data.overview.totalServices}</div>
              <div className="text-sm text-gray-600">Services</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{data.overview.totalProducts}</div>
              <div className="text-sm text-gray-600">Products</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{data.overview.totalPodcasts}</div>
              <div className="text-sm text-gray-600">Podcasts</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{data.overview.totalNewsletterSubscribers}</div>
              <div className="text-sm text-gray-600">Newsletter Subscribers</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
