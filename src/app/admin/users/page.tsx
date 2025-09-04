'use client';

import React, { useState, useEffect } from 'react';
import { DataTable } from '@/components/admin/DataTable';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { adminApi } from '@/lib/api';
import { showToast } from '@/lib/utils';
import { formatDate } from '@/lib/utils';
import { Eye, UserCheck, UserX, Trash2, Mail, Calendar } from 'lucide-react';

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  isActive: boolean;
  isVerified: boolean;
  createdAt: string;
  profile?: {
    displayName?: string;
    avatar?: string;
  };
}

interface UsersResponse {
  success: boolean;
  data: {
    users: User[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalUsers: number;
      hasNext: boolean;
      hasPrev: boolean;
    };
  };
}

interface ActionItem {
  label: string;
  icon?: React.ReactNode;
  onClick: (row: any) => void;
  variant?: 'default' | 'destructive' | 'outline';
  disabled?: boolean;
}

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [pagination, setPagination] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, [currentPage, searchTerm, roleFilter]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await adminApi.getUsers({
        page: currentPage,
        limit: 10,
        search: searchTerm,
        role: roleFilter
      }) as UsersResponse;

      if (response.success) {
        setUsers(response.data.users);
        setPagination(response.data.pagination);
      } else {
        showToast.error('Failed to fetch users');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      showToast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (search: string) => {
    setSearchTerm(search);
    setCurrentPage(1);
  };

  const handleFilterChange = (filterKey: string, value: string) => {
    if (filterKey === 'role') {
      setRoleFilter(value);
      setCurrentPage(1);
    }
  };

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setIsViewDialogOpen(true);
  };

  const handleToggleUserStatus = async (user: User) => {
    try {
      const response = await adminApi.updateUserStatus(user._id, !user.isActive) as { success: boolean; message?: string };
      
      if (response.success) {
        showToast.success(response.message || 'User status updated successfully');
        fetchUsers(); // Refresh the data
      } else {
        showToast.error('Failed to update user status');
      }
    } catch (error) {
      console.error('Error updating user status:', error);
      showToast.error('Failed to update user status');
    }
  };

  const handleDeleteUser = async (user: User) => {
    if (!confirm(`Are you sure you want to delete user ${user.firstName} ${user.lastName}? This action cannot be undone.`)) {
      return;
    }

    try {
      const response = await adminApi.deleteUser(user._id) as { success: boolean; message?: string };
      
      if (response.success) {
        showToast.success(response.message || 'User deleted successfully');
        fetchUsers(); // Refresh the data
      } else {
        showToast.error('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      showToast.error('Failed to delete user');
    }
  };

  const actions = [
    {
      label: 'View Details',
      icon: <Eye className="h-4 w-4" />,
      onClick: handleViewUser
    },
    {
      label: (user: User) => user.isActive ? 'Deactivate User' : 'Activate User',
      icon: (user: User) => user.isActive ? <UserX className="h-4 w-4" /> : <UserCheck className="h-4 w-4" />,
      onClick: handleToggleUserStatus,
      variant: (user: User) => user.isActive ? 'destructive' : 'default'
    },
    {
      label: 'Delete User',
      icon: <Trash2 className="h-4 w-4" />,
      onClick: handleDeleteUser,
      variant: 'destructive'
    }
  ];

  const columns = [
    {
      key: 'name',
      label: 'Name',
      render: (value: any, row: User) => (
        <div>
          <div className="font-medium">
            {row.firstName} {row.lastName}
          </div>
          {row.profile?.displayName && (
            <div className="text-sm text-gray-500 capitalize font-bold">
              {row.profile.displayName}
            </div>
          )}
        </div>
      )
    },
    {
      key: 'email',
      label: 'Email',
      render: (value: string) => (
        <div className="text-sm">{value}</div>
      )
    },
    {
      key: 'role',
      label: 'Role',
      render: (value: string) => (
        <Badge variant={value === 'admin' ? 'default' : 'secondary'}>
          {value}
        </Badge>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (value: any, row: User) => (
        <div className="space-y-1">
          <Badge variant={row.isActive ? 'default' : 'destructive'}>
            {row.isActive ? 'Active' : 'Inactive'}
          </Badge>
          {row.isVerified && (
            <Badge variant="outline" className="ml-1">
              Verified
            </Badge>
          )}
        </div>
      )
    },
    {
      key: 'createdAt',
      label: 'Joined',
      render: (value: string) => (
        <div className="text-sm text-gray-600">
          {formatDate(value)}
        </div>
      )
    }
  ];

  const filters = [
    {
      key: 'role',
      label: 'Filter by Role',
      options: [
        { value: 'user', label: 'User' },
        { value: 'admin', label: 'Admin' }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Users Management</h1>
        <p className="text-gray-600 mt-1">Manage all registered users on the platform</p>
      </div>

      <DataTable
        title="Users"
        data={users}
        columns={columns}
        pagination={pagination}
        loading={loading}
        searchPlaceholder="Search users by name or email..."
        filters={filters}
        actions={actions as ActionItem[]}
        onPageChange={handlePageChange}
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        onRefresh={fetchUsers}
        emptyMessage="No users found"
      />

      {/* User Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
            <DialogDescription>
              Detailed information about {selectedUser?.firstName} {selectedUser?.lastName}
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-900">Personal Information</h4>
                  <div className="mt-2 space-y-2">
                    <div>
                      <span className="text-sm text-gray-600">Full Name:</span>
                      <p className="font-medium">{selectedUser.firstName} {selectedUser.lastName}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Email:</span>
                      <p className="font-medium">{selectedUser.email}</p>
                    </div>
                    {selectedUser.profile?.displayName && (
                      <div>
                        <span className="text-sm text-gray-600">Display Name:</span>
                        <p className="font-medium">{selectedUser.profile.displayName}</p>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Account Information</h4>
                  <div className="mt-2 space-y-2">
                    <div>
                      <span className="text-sm text-gray-600">Role:</span>
                      <Badge variant={selectedUser.role === 'admin' ? 'default' : 'secondary'}>
                        {selectedUser.role}
                      </Badge>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Status:</span>
                      <Badge variant={selectedUser.isActive ? 'default' : 'destructive'}>
                        {selectedUser.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Verification:</span>
                      <Badge variant={selectedUser.isVerified ? 'default' : 'outline'}>
                        {selectedUser.isVerified ? 'Verified' : 'Not Verified'}
                      </Badge>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Joined:</span>
                      <p className="font-medium">{formatDate(selectedUser.createdAt)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
