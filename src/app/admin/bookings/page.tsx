'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { DataTable } from '@/components/admin/DataTable';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { adminApi } from '@/lib/api';
import { showToast, formatDate } from '@/lib/utils';
import { Eye, Edit, Trash2 } from 'lucide-react';

interface Booking extends Record<string, unknown> {
  _id: string;
  serviceName: string;
  servicePrice: number;
  serviceProviderName: string;
  serviceProviderEmail: string;
  customerId: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  bookingDate: string;
  bookingTime: string;
  sessionDuration: number;
  sessionType: string;
  sessionPlatform: string;
  specialRequests?: string;
  status: string;
  paymentStatus: string;
  createdAt: string;
  confirmedAt?: string;
  completedAt?: string;
  cancelledAt?: string;
  cancelledBy?: string;
  cancellationReason?: string;
}

interface BookingsResponse {
  success: boolean;
  data: {
    bookings: Booking[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalBookings: number;
      hasNext: boolean;
      hasPrev: boolean;
    };
  };
}

export default function AdminBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [pagination, setPagination] = useState<{
    currentPage: number;
    totalPages: number;
    totalBookings: number;
    totalItems: number;
    hasNext: boolean;
    hasPrev: boolean;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const fetchBookings = useCallback(async () => {
    try {
      setLoading(true);
      const response = await adminApi.getBookings({
        page: currentPage,
        limit: 10,
        status: statusFilter
      }) as BookingsResponse;

      if (response.success) {
        setBookings(response.data.bookings);
        setPagination({
          ...response.data.pagination,
          totalItems: response.data.pagination.totalBookings
        });
      } else {
        showToast.error('Failed to fetch bookings');
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
      showToast.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  }, [currentPage, statusFilter]);
  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);



  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = () => {
    setCurrentPage(1);
  };

  const handleFilterChange = (filterKey: string, value: string) => {
    if (filterKey === 'status') {
      setStatusFilter(value);
      setCurrentPage(1);
    }
  };

  const handleViewBooking = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsViewDialogOpen(true);
  };

  const handleEditBooking = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsEditDialogOpen(true);
  };

  const handleStatusUpdate = async (bookingId: string, status: string) => {
    try {
      setIsUpdating(true);
      const response = await adminApi.updateBookingStatus(bookingId, status) as { success: boolean; message?: string };
      
      if (response.success) {
        showToast.success('Booking status updated successfully');
        fetchBookings(); // Refresh the data
        setIsEditDialogOpen(false);
        setSelectedBooking(null);
      } else {
        showToast.error('Failed to update booking status');
      }
    } catch (error) {
      console.error('Error updating booking status:', error);
      showToast.error('Failed to update booking status');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteBooking = async (booking: Booking) => {
    if (!confirm(`Are you sure you want to delete this booking for ${booking.customerName}? This action cannot be undone.`)) {
      return;
    }

    try {
      const response = await adminApi.deleteBooking(booking._id) as { success: boolean; message?: string };
      
      if (response.success) {
        showToast.success('Booking deleted successfully');
        fetchBookings(); // Refresh the data
      } else {
        showToast.error('Failed to delete booking');
      }
    } catch (error) {
      console.error('Error deleting booking:', error);
      showToast.error('Failed to delete booking');
    }
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
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'refunded':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const actions = [
    {
      label: 'View Details',
      icon: <Eye className="h-4 w-4" />,
      onClick: handleViewBooking
    },
    {
      label: 'Update Status',
      icon: <Edit className="h-4 w-4" />,
      onClick: handleEditBooking
    },
    {
      label: 'Delete Booking',
      icon: <Trash2 className="h-4 w-4" />,
      onClick: handleDeleteBooking,
      variant: 'destructive' as const
    }
  ];

  const columns = [
    {
      key: 'customer',
      label: 'Customer',
      render: (value: unknown, row: Booking) => (
        <div>
          <div className="font-medium">{row.customerName}</div>
          <div className="text-sm text-foreground/70">{row.customerEmail}</div>
          {row.customerPhone && (
            <div className="text-sm text-foreground/60">{row.customerPhone}</div>
          )}
        </div>
      )
    },
    {
      key: 'service',
      label: 'Service',
      render: (value: unknown, row: Booking) => (
        <div>
          <div className="font-medium">{row.serviceName}</div>
          <div className="text-sm text-foreground/70">{row.serviceProviderName}</div>
          <div className="text-sm text-foreground/60">{formatCurrency(row.servicePrice)}</div>
        </div>
      )
    },
    {
      key: 'booking',
      label: 'Booking Details',
      render: (value: unknown, row: Booking) => (
        <div>
          <div className="font-medium">{formatDate(row.bookingDate)}</div>
          <div className="text-sm text-foreground/70">{row.bookingTime}</div>
          <div className="text-sm text-foreground/60">{row.sessionDuration} min</div>
        </div>
      )
    },
    {
      key: 'session',
      label: 'Session',
      render: (value: unknown, row: Booking) => (
        <div>
          <Badge variant="outline" className="capitalize">
            {row.sessionType.replace('_', ' ')}
          </Badge>
          <div className="text-sm text-foreground/70 mt-1">{row.sessionPlatform}</div>
        </div>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (value: unknown, row: Booking) => (
        <div className="space-y-1">
          <Badge className={getStatusColor(row.status)}>
            {row.status}
          </Badge>
          <Badge className={getPaymentStatusColor(row.paymentStatus)}>
            {row.paymentStatus}
          </Badge>
        </div>
      )
    },
    {
      key: 'createdAt',
      label: 'Booked',
      render: (value: unknown) => (
        <div className="text-sm text-foreground/70">
          {formatDate(value as string)}
        </div>
      )
    }
  ];

  const filters = [
    {
      key: 'status',
      label: 'Filter by Status',
      options: [
        { value: 'pending', label: 'Pending' },
        { value: 'confirmed', label: 'Confirmed' },
        { value: 'completed', label: 'Completed' },
        { value: 'cancelled', label: 'Cancelled' }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Bookings Management</h1>
        <p className="text-foreground/70 mt-1">Manage all service bookings and appointments</p>
      </div>

      <DataTable<Booking>
        title="Bookings"
        data={bookings}
        columns={columns}
        pagination={pagination || { currentPage: 1, totalPages: 1, totalItems: 0, hasNext: false, hasPrev: false }}
        loading={loading}
        searchPlaceholder="Search bookings by customer name or email..."
        filters={filters}
        actions={actions}
        onPageChange={handlePageChange}
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        onRefresh={fetchBookings}
        emptyMessage="No bookings found"
      />

      {/* Booking View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Booking Details</DialogTitle>
            <DialogDescription>
              Booking for {selectedBooking?.serviceName} by {selectedBooking?.customerName}
            </DialogDescription>
          </DialogHeader>
          {selectedBooking && (
            <div className="space-y-6">
              {/* Customer Information */}
              <div>
                <h4 className="font-medium mb-2">Customer Information</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-foreground/70">Name:</span>
                    <p className="font-medium">{selectedBooking.customerName}</p>
                  </div>
                  <div>
                    <span className="text-foreground/70">Email:</span>
                    <p className="font-medium">{selectedBooking.customerEmail}</p>
                  </div>
                  {selectedBooking.customerPhone && (
                    <div>
                      <span className="text-foreground/70">Phone:</span>
                      <p className="font-medium">{selectedBooking.customerPhone}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Service Information */}
              <div>
                <h4 className="font-medium mb-2">Service Information</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-foreground/70">Service:</span>
                    <p className="font-medium">{selectedBooking.serviceName}</p>
                  </div>
                  <div>
                    <span className="text-foreground/70">Price:</span>
                    <p className="font-medium">{formatCurrency(selectedBooking.servicePrice)}</p>
                  </div>
                  <div>
                    <span className="text-foreground/70">Provider:</span>
                    <p className="font-medium">{selectedBooking.serviceProviderName}</p>
                  </div>
                  <div>
                    <span className="text-foreground/70">Provider Email:</span>
                    <p className="font-medium">{selectedBooking.serviceProviderEmail}</p>
                  </div>
                </div>
              </div>

              {/* Booking Details */}
              <div>
                <h4 className="font-medium mb-2">Booking Details</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-foreground/70">Date:</span>
                    <p className="font-medium">{formatDate(selectedBooking.bookingDate)}</p>
                  </div>
                  <div>
                    <span className="text-foreground/70">Time:</span>
                    <p className="font-medium">{selectedBooking.bookingTime}</p>
                  </div>
                  <div>
                    <span className="text-foreground/70">Duration:</span>
                    <p className="font-medium">{selectedBooking.sessionDuration} minutes</p>
                  </div>
                  <div>
                    <span className="text-foreground/70">Type:</span>
                    <p className="font-medium capitalize">{selectedBooking.sessionType.replace('_', ' ')}</p>
                  </div>
                  <div>
                    <span className="text-foreground/70">Platform:</span>
                    <p className="font-medium">{selectedBooking.sessionPlatform}</p>
                  </div>
                </div>
              </div>

              {/* Status Information */}
              <div>
                <h4 className="font-medium mb-2">Status Information</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-foreground/70">Booking Status:</span>
                    <Badge className={getStatusColor(selectedBooking.status)}>
                      {selectedBooking.status}
                    </Badge>
                  </div>
                  <div>
                    <span className="text-foreground/70">Payment Status:</span>
                    <Badge className={getPaymentStatusColor(selectedBooking.paymentStatus)}>
                      {selectedBooking.paymentStatus}
                    </Badge>
                  </div>
                  {selectedBooking.confirmedAt && (
                    <div>
                      <span className="text-foreground/70">Confirmed:</span>
                      <p className="font-medium">{formatDate(selectedBooking.confirmedAt)}</p>
                    </div>
                  )}
                  {selectedBooking.completedAt && (
                    <div>
                      <span className="text-foreground/70">Completed:</span>
                      <p className="font-medium">{formatDate(selectedBooking.completedAt)}</p>
                    </div>
                  )}
                  {selectedBooking.cancelledAt && (
                    <div>
                      <span className="text-foreground/70">Cancelled:</span>
                      <p className="font-medium">{formatDate(selectedBooking.cancelledAt)}</p>
                    </div>
                  )}
                  {selectedBooking.cancellationReason && (
                    <div className="col-span-2">
                      <span className="text-foreground/70">Cancellation Reason:</span>
                      <p className="font-medium">{selectedBooking.cancellationReason}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Special Requests */}
              {selectedBooking.specialRequests && (
                <div>
                  <h4 className="font-medium mb-2">Special Requests</h4>
                  <p className="text-sm text-foreground/70 whitespace-pre-wrap">{selectedBooking.specialRequests}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Booking Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Booking Status</DialogTitle>
            <DialogDescription>
              Update the status of this booking.
            </DialogDescription>
          </DialogHeader>
          {selectedBooking && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Booking Status</label>
                <Select
                  defaultValue={selectedBooking.status}
                  onValueChange={(value) => {
                    setSelectedBooking({ ...selectedBooking, status: value });
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsEditDialogOpen(false);
                    setSelectedBooking(null);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    handleStatusUpdate(selectedBooking._id, selectedBooking.status);
                  }}
                  disabled={isUpdating}
                >
                  {isUpdating ? 'Updating...' : 'Update Status'}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
