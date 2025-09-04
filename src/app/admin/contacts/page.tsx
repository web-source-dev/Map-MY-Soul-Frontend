'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { DataTable } from '@/components/admin/DataTable';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { adminApi } from '@/lib/api';
import { showToast, formatDate } from '@/lib/utils';
import { Eye, Edit, Trash2 } from 'lucide-react';

interface Contact extends Record<string, unknown> {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  contactType: string;
  priority: string;
  status: string;
  createdAt: string;
  respondedAt?: string;
  responseMessage?: string;
  userId?: string;
}

interface ContactsResponse {
  success: boolean;
  data: {
    contacts: Contact[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalContacts: number;
      hasNext: boolean;
      hasPrev: boolean;
    };
  };
}


export default function AdminContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [pagination, setPagination] = useState<{
    currentPage: number;
    totalPages: number;
    totalContacts: number;
    totalItems: number;
    hasNext: boolean;
    hasPrev: boolean;
  } | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [contactTypeFilter, setContactTypeFilter] = useState('');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchContacts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await adminApi.getContacts({
        page: currentPage,
        limit: 10,
        status: statusFilter,
        contactType: contactTypeFilter
      }) as ContactsResponse;

      if (response.success) {
        setContacts(response.data.contacts);
        setPagination({
          ...response.data.pagination,
          totalItems: response.data.pagination.totalContacts
        });
      } else {
        showToast.error('Failed to fetch contacts');
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
      showToast.error('Failed to load contacts');
    } finally {
      setLoading(false);
    }
  }, [currentPage, statusFilter, contactTypeFilter]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (search: string) => {
    setSearchTerm(search);
    setCurrentPage(1);
  };

  const handleFilterChange = (filterKey: string, value: string) => {
    if (filterKey === 'status') {
      setStatusFilter(value);
      setCurrentPage(1);
    } else if (filterKey === 'contactType') {
      setContactTypeFilter(value);
      setCurrentPage(1);
    }
  };

  const handleViewContact = (contact: Contact) => {
    setSelectedContact(contact);
    setIsViewDialogOpen(true);
  };

  const handleEditContact = (contact: Contact) => {
    setSelectedContact(contact);
    setIsEditDialogOpen(true);
  };

  const handleStatusUpdate = async (contactId: string, status: string, responseMessage?: string) => {
    try {
      setIsUpdating(true);
      const response = await adminApi.updateContactStatus(contactId, status, responseMessage) as { success: boolean; message?: string };
      
      if (response.success) {
        showToast.success('Contact status updated successfully');
        fetchContacts(); // Refresh the data
        setIsEditDialogOpen(false);
        setSelectedContact(null);
      } else {
        showToast.error('Failed to update contact status');
      }
    } catch (error) {
      console.error('Error updating contact status:', error);
      showToast.error('Failed to update contact status');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteContact = async (contact: Contact) => {
    if (!confirm(`Are you sure you want to delete this contact from ${contact.name}? This action cannot be undone.`)) {
      return;
    }

    try {
      const response = await adminApi.deleteContact(contact._id) as { success: boolean; message?: string };
      
      if (response.success) {
        showToast.success('Contact deleted successfully');
        fetchContacts(); // Refresh the data
      } else {
        showToast.error('Failed to delete contact');
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
      showToast.error('Failed to delete contact');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const actions = [
    {
      label: 'View Details',
      icon: <Eye className="h-4 w-4" />,
      onClick: handleViewContact
    },
    {
      label: 'Edit & Respond',
      icon: <Edit className="h-4 w-4" />,
      onClick: handleEditContact
    },
    {
      label: 'Delete Contact',
      icon: <Trash2 className="h-4 w-4" />,
      onClick: handleDeleteContact,
      variant: 'destructive' as const
    }
  ];

  const columns = [
    {
      key: 'name',
      label: 'Contact',
      render: (value: unknown, row: Contact) => (
        <div>
          <div className="font-medium">{row.name}</div>
          <div className="text-sm text-gray-600">{row.email}</div>
        </div>
      )
    },
    {
      key: 'subject',
      label: 'Subject',
      render: (value: unknown) => (
        <div className="text-sm font-medium">{value as string}</div>
      )
    },
    {
      key: 'contactType',
      label: 'Type',
      render: (value: unknown) => (
        <Badge variant="outline" className="capitalize">
          {(value as string).replace('_', ' ')}
        </Badge>
      )
    },
    {
      key: 'priority',
      label: 'Priority',
      render: (value: unknown) => (
        <Badge className={getPriorityColor(value as string)}>
          {value as string}
        </Badge>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (value: unknown) => (
        <Badge className={getStatusColor(value as string)}>
          {(value as string).replace('_', ' ')}
        </Badge>
      )
    },
    {
      key: 'createdAt',
      label: 'Received',
      render: (value: unknown) => (
        <div className="text-sm text-gray-600">
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
        { value: 'new', label: 'New' },
        { value: 'in_progress', label: 'In Progress' },
        { value: 'responded', label: 'Responded' },
        { value: 'resolved', label: 'Resolved' },
        { value: 'closed', label: 'Closed' }
      ]
    },
    {
      key: 'contactType',
      label: 'Filter by Type',
      options: [
        { value: 'general', label: 'General' },
        { value: 'support', label: 'Support' },
        { value: 'feedback', label: 'Feedback' },
        { value: 'partnership', label: 'Partnership' },
        { value: 'other', label: 'Other' }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Contact Management</h1>
        <p className="text-gray-600 mt-1">Manage and respond to contact form submissions</p>
      </div>

      <DataTable<Contact>
        title="Contacts"
        data={contacts}
        columns={columns}
        pagination={pagination}
        loading={loading}
        searchPlaceholder="Search contacts by name or email..."
        filters={filters}
        actions={actions}
        onPageChange={handlePageChange}
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        onRefresh={fetchContacts}
        emptyMessage="No contacts found"
      />

      {/* Contact View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Contact Details</DialogTitle>
            <DialogDescription>
              Contact from {selectedContact?.name} ({selectedContact?.email})
            </DialogDescription>
          </DialogHeader>
          {selectedContact && (
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">Subject</h4>
                <p className="text-sm text-gray-600">{selectedContact.subject}</p>
              </div>
              <div>
                <h4 className="font-medium">Message</h4>
                <p className="text-sm text-gray-600 whitespace-pre-wrap">{selectedContact.message}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium">Type</h4>
                  <Badge variant="outline" className="capitalize">
                    {selectedContact.contactType.replace('_', ' ')}
                  </Badge>
                </div>
                <div>
                  <h4 className="font-medium">Priority</h4>
                  <Badge className={getPriorityColor(selectedContact.priority)}>
                    {selectedContact.priority}
                  </Badge>
                </div>
              </div>
              {selectedContact.responseMessage && (
                <div>
                  <h4 className="font-medium">Response</h4>
                  <p className="text-sm text-gray-600">{selectedContact.responseMessage}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Responded on {formatDate(selectedContact.respondedAt || '')}
                  </p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Contact Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Contact Status</DialogTitle>
            <DialogDescription>
              Update the status and add a response for this contact.
            </DialogDescription>
          </DialogHeader>
          {selectedContact && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Status</label>
                <Select
                  defaultValue={selectedContact.status}
                  onValueChange={(value) => {
                    setSelectedContact({ ...selectedContact, status: value });
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="responded">Responded</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Response Message</label>
                <Textarea
                  placeholder="Add a response message..."
                  value={selectedContact.responseMessage || ''}
                  onChange={(e) => {
                    setSelectedContact({ ...selectedContact, responseMessage: e.target.value });
                  }}
                  rows={4}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsEditDialogOpen(false);
                    setSelectedContact(null);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    handleStatusUpdate(
                      selectedContact._id,
                      selectedContact.status,
                      selectedContact.responseMessage
                    );
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
