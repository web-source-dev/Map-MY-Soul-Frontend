'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Video, Phone, MapPin, X, CheckCircle } from 'lucide-react';
import { bookingApi } from '@/lib/api';
import { showToast } from '@/lib/utils';
import Link from 'next/link';

interface Booking {
  id: string;
  serviceName: string;
  servicePrice: number;
  serviceProviderName: string;
  bookingDate: string;
  bookingTime: string;
  sessionDuration: number;
  sessionType: string;
  sessionPlatform: string;
  status: string;
  paymentStatus: string;
  specialRequests?: string;
  createdAt: string;
  confirmedAt?: string;
  completedAt?: string;
  cancelledAt?: string;
}

export default function BookingsPage() {
  const { loading, isAuthenticated } = useAuth();
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(true);

  useEffect(() => {
    if (!isAuthenticated && !loading) {
      router.push('/auth');
      return;
    }

    if (isAuthenticated) {
      fetchBookings();
    }
  }, [isAuthenticated, loading]);

  const fetchBookings = async () => {
    try {
      setLoadingBookings(true);
      const response = await bookingApi.getUserBookings() as { bookings: Booking[] };
      setBookings(response.bookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      showToast.error('Failed to load bookings');
    } finally {
      setLoadingBookings(false);
    }
  };

  const cancelBooking = async (bookingId: string) => {
    try {
      await bookingApi.cancelBooking(bookingId);
      showToast.success('Booking cancelled successfully');
      fetchBookings(); // Refresh the list
    } catch (error) {
      console.error('Error cancelling booking:', error);
      showToast.error('Failed to cancel booking');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'confirmed':
        return <Badge variant="default" className="bg-green-100 text-green-800">Confirmed</Badge>;
      case 'completed':
        return <Badge variant="default" className="bg-blue-100 text-blue-800">Completed</Badge>;
      case 'cancelled':
        return <Badge variant="destructive" className="bg-red-100 text-red-800">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getSessionTypeIcon = (sessionType: string) => {
    switch (sessionType) {
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'audio':
        return <Phone className="h-4 w-4" />;
      case 'in_person':
        return <MapPin className="h-4 w-4" />;
      default:
        return <Video className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    return timeString;
  };

  if (loading || loadingBookings) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const upcomingBookings = bookings.filter(booking => 
    booking.status === 'pending' || booking.status === 'confirmed'
  );
  const pastBookings = bookings.filter(booking => 
    booking.status === 'completed' || booking.status === 'cancelled'
  );

  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">My Bookings</h1>
            <p className="text-gray-600 text-lg">
              Manage your wellness sessions and appointments
            </p>
          </div>
          <Button asChild className="bg-purple-600 hover:bg-purple-700">
            <Link href="/services">
              Book New Session
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-white shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-full">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                <p className="text-2xl font-bold text-gray-900">{bookings.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Upcoming</p>
                <p className="text-2xl font-bold text-gray-900">{upcomingBookings.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-full">
                <CheckCircle className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">
                  {bookings.filter(b => b.status === 'completed').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-red-100 rounded-full">
                <X className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Cancelled</p>
                <p className="text-2xl font-bold text-gray-900">
                  {bookings.filter(b => b.status === 'cancelled').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Bookings */}
      {upcomingBookings.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Sessions</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {upcomingBookings.map((booking) => (
              <Card key={booking.id} className="bg-white shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{booking.serviceName}</CardTitle>
                    {getStatusBadge(booking.status)}
                  </div>
                  <CardDescription>
                    with {booking.serviceProviderName}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-700">{formatDate(booking.bookingDate)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-700">{formatTime(booking.bookingTime)}</span>
                      <span className="text-gray-500">({booking.sessionDuration} minutes)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getSessionTypeIcon(booking.sessionType)}
                      <span className="text-gray-700 capitalize">
                        {booking.sessionType.replace('_', ' ')} Session
                      </span>
                      {booking.sessionPlatform && (
                        <span className="text-gray-500">via {booking.sessionPlatform}</span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-700 font-medium">
                        ${booking.servicePrice}
                      </span>
                    </div>
                    {booking.specialRequests && (
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-600">
                          <strong>Special Requests:</strong> {booking.specialRequests}
                        </p>
                      </div>
                    )}
                    <div className="flex space-x-2 pt-4">
                      {booking.status === 'pending' && (
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => cancelBooking(booking.id)}
                        >
                          Cancel Booking
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Past Bookings */}
      {pastBookings.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Past Sessions</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {pastBookings.map((booking) => (
              <Card key={booking.id} className="bg-white shadow-lg opacity-75">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{booking.serviceName}</CardTitle>
                    {getStatusBadge(booking.status)}
                  </div>
                  <CardDescription>
                    with {booking.serviceProviderName}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-700">{formatDate(booking.bookingDate)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-700">{formatTime(booking.bookingTime)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-700 font-medium">
                        ${booking.servicePrice}
                      </span>
                    </div>
                    <div className="flex space-x-2 pt-4">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      {booking.status === 'completed' && (
                        <Button variant="outline" size="sm">
                          Book Again
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {bookings.length === 0 && (
        <Card className="bg-white shadow-lg">
          <CardContent className="p-12 text-center">
            <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No bookings yet</h3>
            <p className="text-gray-600 mb-6">
              Start your wellness journey by booking your first session
            </p>
            <Button asChild className="bg-purple-600 hover:bg-purple-700">
              <Link href="/services">
                Browse Services
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </>
  );
}
