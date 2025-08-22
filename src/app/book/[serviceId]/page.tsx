"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, ArrowLeft, CheckCircle, Star, ChevronLeft, ChevronRight, Video, Phone as PhoneIcon, MapPin } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { backendRequest } from "@/lib/api";
import { showToast } from "@/lib/utils";
import LoginPrompt from "@/components/LoginPrompt";

interface Service {
  _id: string;
  name: string;
  description: string;
  price: number;
  serviceProviderName: string;
  serviceProviderEmail: string;
  serviceType: string;
  duration?: number;
  rating?: number;
  reviewCount?: number;
}

interface BookingForm {
  bookingDate: string;
  bookingTime: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  sessionType: string;
  sessionPlatform: string;
  specialRequests: string;
}

// Calendar component
const CalendarComponent = ({ selectedDate, onDateSelect }: { selectedDate: string; onDateSelect: (date: string) => void }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 8, 1)); // September 2025
  const [nextMonth, setNextMonth] = useState(new Date(2025, 9, 1)); // October 2025

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startingDayOfWeek };
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const isDateSelected = (date: Date) => {
    return formatDate(date) === selectedDate;
  };

  const isDateDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      const newCurrentMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
      const newNextMonth = new Date(nextMonth.getFullYear(), nextMonth.getMonth() - 1, 1);
      setCurrentMonth(newCurrentMonth);
      setNextMonth(newNextMonth);
    } else {
      const newCurrentMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
      const newNextMonth = new Date(nextMonth.getFullYear(), nextMonth.getMonth() + 1, 1);
      setCurrentMonth(newCurrentMonth);
      setNextMonth(newNextMonth);
    }
  };

  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const renderCalendar = (date: Date, title: string) => {
    const { daysInMonth, startingDayOfWeek } = getDaysInMonth(date);
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="h-8"></div>);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(date.getFullYear(), date.getMonth(), day);
      const isSelected = isDateSelected(currentDate);
      const isDisabled = isDateDisabled(currentDate);
      
      days.push(
        <button
          key={day}
          onClick={() => !isDisabled && onDateSelect(formatDate(currentDate))}
          disabled={isDisabled}
          className={`
            h-8 w-8 rounded-full text-sm font-medium transition-colors
            ${isSelected 
              ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
              : isDisabled 
                ? 'text-muted-foreground cursor-not-allowed' 
                : 'hover:bg-muted cursor-pointer'
            }
          `}
        >
          {day}
        </button>
      );
    }
    
    return (
      <Card className="flex-1">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-1 text-center">
            {/* Day headers */}
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="h-8 flex items-center justify-center text-xs font-medium text-muted-foreground">
                {day}
              </div>
            ))}
            {/* Calendar days */}
            {days}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-4">
      {/* Navigation Controls */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigateMonth('prev')}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Button>
        <div className="text-sm text-muted-foreground">
          {formatMonthYear(currentMonth)} - {formatMonthYear(nextMonth)}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigateMonth('next')}
          className="flex items-center gap-2"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {renderCalendar(currentMonth, formatMonthYear(currentMonth))}
        {renderCalendar(nextMonth, formatMonthYear(nextMonth))}
      </div>
    </div>
  );
};

const BookingPage = () => {
  const router = useRouter();
  const params = useParams();
  const { user, isAuthenticated } = useAuth();
  const serviceId = params.serviceId as string;

  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const [formData, setFormData] = useState<BookingForm>({
    bookingDate: "",
    bookingTime: "",
    fullName: "",
    email: "",
    phoneNumber: "",
    sessionType: "video",
    sessionPlatform: "Zoom",
    specialRequests: "",
  });

  // Auto-populate user data when authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      setFormData(prev => ({
        ...prev,
        fullName: `${user.displayName}` || "" ,
        email: user.email
      }));
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    fetchService();
  }, [serviceId]);

  const fetchService = async () => {
    try {
      const response = await backendRequest(`/api/services/${serviceId}`);
      setService(response.service);
    } catch (error) {
      console.error('Failed to fetch service:', error);
      showToast.error('Failed to load service details');
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailability = async (date: string) => {
    try {
      const response = await backendRequest(`/api/bookings/service/${serviceId}/availability?date=${date}`);
      setAvailableSlots(response.availableSlots || []);
    } catch (error) {
      console.error('Failed to fetch availability:', error);
      showToast.error('Failed to load available time slots');
      setAvailableSlots([]);
    }
  };

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    setFormData(prev => ({ ...prev, bookingDate: date, bookingTime: "" }));
    if (date) {
      fetchAvailability(date);
    }
  };

  const handleInputChange = (field: keyof BookingForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      setShowLoginPrompt(true);
      return;
    }
    
    if (!formData.bookingDate || !formData.bookingTime) {
      showToast.error('Please select a date and time');
      return;
    }

    setSubmitting(true);
    
    try {
      const response = await backendRequest('/api/bookings', {
        method: 'POST',
        body: JSON.stringify({
          serviceId,
          bookingDate: formData.bookingDate,
          bookingTime: formData.bookingTime,
          sessionDuration: service?.duration || 90,
          sessionType: formData.sessionType,
          sessionPlatform: formData.sessionPlatform,
          specialRequests: formData.specialRequests,
          customerPhone: formData.phoneNumber
        })
      });

      showToast.success('Booking created successfully!');
      setBookingSuccess(true);
      
      setTimeout(() => {
        router.push('/my-bookings');
      }, 2000);

    } catch (error: unknown) {
      console.error('Booking error:', error);
      
      if (error instanceof Error && (error.message?.includes('Access token required') || error.message?.includes('Unauthorized') || error.message?.includes('Authentication required'))) {
        setShowLoginPrompt(true);
      } else {
        showToast.error(error instanceof Error ? error.message : 'Failed to create booking');
      }
    } finally {
      setSubmitting(false);
    }
  };

  // Use available slots from backend instead of generating static slots
  const timeSlots = availableSlots;

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading service details...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!service) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Service Not Found</h2>
            <p className="text-muted-foreground mb-4">The service you&apos;re looking for doesn&apos;t exist.</p>
            <Button onClick={() => router.push('/services')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Services
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  if (bookingSuccess) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Booking Successful!</h2>
            <p className="text-muted-foreground mb-4">Your booking has been created successfully.</p>
            <p className="text-sm text-muted-foreground">Redirecting to your bookings...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen py-10">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="mb-2">
            <Button 
              variant="outline" 
              onClick={() => router.push('/services')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Services
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Panel - Service Details & Availability */}
            <div className="lg:col-span-2">
              {/* Service Title and Details */}
              <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {service.name}
                </h1>
                <div className="flex items-center gap-4 mb-4">
                  <Badge variant="secondary">Online Session</Badge>
                  <Badge variant="secondary">{service.duration || 90} minutes</Badge>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{service.rating || 5.0}</span>
                  </div>
                  <Badge variant="outline">Spiritual Healing</Badge>
                </div>
              </div>

              {/* Availability Section */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Availability</h2>

                {/* Custom Calendar */}
                <div className="mb-6">
                  <CalendarComponent 
                    selectedDate={formData.bookingDate}
                    onDateSelect={handleDateChange}
                  />
                </div>

                {/* Time Selection */}
                {formData.bookingDate && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Select Time</h3>
                    {timeSlots.length > 0 ? (
                      <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                        {timeSlots.map((time) => (
                          <Button
                            key={time}
                            variant={formData.bookingTime === time ? "default" : "outline"}
                            onClick={() => handleInputChange('bookingTime', time)}
                            className="h-12"
                          >
                            {time}
                          </Button>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground mb-2">No available time slots for this date</p>
                        <p className="text-sm text-muted-foreground">Please select another date or contact us for availability</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Right Panel - Booking Summary & Form */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">

                {/* Booking Form */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Add details for exact booking</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* Date and Time Display */}
                      {formData.bookingDate && (
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-1">Date</label>
                            <Input
                              value={new Date(formData.bookingDate).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                              readOnly
                              className="bg-muted"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">Time</label>
                            <Input
                              value={formData.bookingTime}
                              readOnly
                              className="bg-muted"
                            />
                          </div>
                        </div>
                      )}

                      {/* Authentication Status */}
                      {!isAuthenticated ? (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <User className="w-4 h-4 text-yellow-600" />
                            <span className="font-medium text-yellow-800">Login Required</span>
                          </div>
                          <p className="text-sm text-yellow-700">
                            Please log in to book this service. Your information will be securely saved.
                          </p>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setShowLoginPrompt(true)}
                            className="mt-2"
                          >
                            Log In to Continue
                          </Button>
                        </div>
                      ) : (
                        <>
                          {/* Full Name */}
                          <div>
                            <label className="block text-sm font-medium mb-1">Full Name</label>
                            <Input
                              value={formData.fullName}
                              onChange={(e) => handleInputChange('fullName', e.target.value)}
                              placeholder="Enter your full name"
                              required
                            />
                          </div>

                          {/* Email */}
                          <div>
                            <label className="block text-sm font-medium mb-1">Email Address</label>
                            <Input
                              type="email"
                              value={formData.email}
                              onChange={(e) => handleInputChange('email', e.target.value)}
                              placeholder="Enter your email"
                              required
                            />
                          </div>

                          {/* Session Type */}
                          <div>
                            <label className="block text-sm font-medium mb-1">Session Type</label>
                            <Select 
                              value={formData.sessionType} 
                              onValueChange={(value) => {
                                handleInputChange('sessionType', value);
                                // Update platform based on session type
                                if (value === 'video') {
                                  handleInputChange('sessionPlatform', 'Zoom');
                                } else if (value === 'audio') {
                                  handleInputChange('sessionPlatform', 'Phone Call');
                                } else if (value === 'in_person') {
                                  handleInputChange('sessionPlatform', 'In Person');
                                }
                              }}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="video">
                                  <div className="flex items-center gap-2">
                                    <Video className="w-4 h-4" />
                                    Video Call (Zoom)
                                  </div>
                                </SelectItem>
                                <SelectItem value="audio">
                                  <div className="flex items-center gap-2">
                                    <PhoneIcon className="w-4 h-4" />
                                    Audio Call
                                  </div>
                                </SelectItem>
                                <SelectItem value="in_person">
                                  <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4" />
                                    In Person
                                  </div>
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          {/* Phone Number */}
                          <div>
                            <label className="block text-sm font-medium mb-1">Phone Number</label>
                            <Input
                              type="tel"
                              value={formData.phoneNumber}
                              onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                              placeholder="Enter your phone number"
                            />
                          </div>

                          {/* Special Requests */}
                          <div>
                            <label className="block text-sm font-medium mb-1">Special Requests (Optional)</label>
                            <Textarea
                              value={formData.specialRequests}
                              onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                              placeholder="Any specific requests or information..."
                              rows={3}
                            />
                          </div>
                        </>
                      )}

                      {/* Payment Summary */}
                      <div className="border-t pt-4 space-y-2">
                        <div className="flex justify-between">
                          <span>${service.price} x 1 session</span>
                          <span>${service.price}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Service Fee</span>
                          <span>$0</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg border-t pt-2">
                          <span>Total</span>
                          <span>${service.price}</span>
                        </div>
                      </div>

                      {/* Submit Button */}
                      <Button 
                        type="submit" 
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3"
                        disabled={submitting || !formData.bookingDate || !formData.bookingTime || !isAuthenticated}
                      >
                        {submitting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Processing...
                          </>
                        ) : (
                          'Proceed to Payment'
                        )}
                      </Button>

                      <p className="text-xs text-muted-foreground text-center">
                        Your payment won&apos;t be charged until the session is confirmed.
                      </p>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Login Prompt */}
      <LoginPrompt 
        isOpen={showLoginPrompt} 
        onClose={() => setShowLoginPrompt(false)} 
        action="booking"
      />
    </Layout>
  );
};

export default BookingPage;
