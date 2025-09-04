'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Activity, 
  Shield, 
  Clock, 
  RefreshCw,
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { adminApi } from '@/lib/api';
import { showToast } from '@/lib/utils';

interface AuditLog {
  _id: string;
  userId?: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  sessionId?: string;
  action: string;
  resource: string;
  resourceId?: string;
  ipAddress: string;
  userAgent: string;
  country?: string;
  timestamp: string;
  details: Record<string, unknown>;
  success: boolean;
  errorMessage?: string;
  responseTime?: number;
}

interface AuditLogsResponse {
  success: boolean;
  data: {
    logs: AuditLog[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalLogs: number;
      hasNext: boolean;
      hasPrev: boolean;
    };
  };
}

interface SystemStatsResponse {
  success: boolean;
  data: {
    today: {
      newUsers: number;
      newBookings: number;
      newContacts: number;
      newLogs: number;
    };
    thisMonth: {
      newUsers: number;
      newBookings: number;
      newContacts: number;
      newLogs: number;
    };
  };
}

export default function AdminAuditLogs() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [systemStats, setSystemStats] = useState<SystemStatsResponse['data'] | null>(null);
  const [pagination, setPagination] = useState<AuditLogsResponse['data']['pagination'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [actionFilter, setActionFilter] = useState('');
  const [resourceFilter, setResourceFilter] = useState('');
  const [successFilter, setSuccessFilter] = useState('');

  useEffect(() => {
    fetchAuditLogs();
    fetchSystemStats();
  }, [currentPage, actionFilter, resourceFilter, successFilter]);

  const fetchAuditLogs = async () => {
    try {
      setLoading(true);
      const response = await adminApi.getAuditLogs({
        page: currentPage,
        limit: 20,
        action: actionFilter,
        resource: resourceFilter
      }) as AuditLogsResponse;

      if (response.success) {
        setLogs(response.data.logs);
        setPagination(response.data.pagination);
      } else {
        showToast.error('Failed to fetch audit logs');
      }
    } catch (error) {
      console.error('Error fetching audit logs:', error);
      showToast.error('Failed to load audit logs');
    } finally {
      setLoading(false);
    }
  };

  const fetchSystemStats = async () => {
    try {
      const response = await adminApi.getSystemStats() as SystemStatsResponse;
      if (response.success) {
        setSystemStats(response.data);
      }
    } catch (error) {
      console.error('Error fetching system stats:', error);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (filterKey: string, value: string) => {
    if (filterKey === 'action') {
      setActionFilter(value);
      setCurrentPage(1);
    } else if (filterKey === 'resource') {
      setResourceFilter(value);
      setCurrentPage(1);
    } else if (filterKey === 'success') {
      setSuccessFilter(value);
      setCurrentPage(1);
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'CREATE':
        return 'bg-green-100 text-green-800';
      case 'READ':
        return 'bg-blue-100 text-blue-800';
      case 'UPDATE':
        return 'bg-yellow-100 text-yellow-800';
      case 'DELETE':
        return 'bg-red-100 text-red-800';
      case 'LOGIN':
        return 'bg-purple-100 text-purple-800';
      case 'LOGOUT':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getResourceColor = (resource: string) => {
    switch (resource) {
      case 'USER_PROFILE':
        return 'bg-blue-100 text-blue-800';
      case 'QUIZ_DATA':
        return 'bg-green-100 text-green-800';
      case 'AUTH':
        return 'bg-purple-100 text-purple-800';
      case 'PRODUCTS':
        return 'bg-orange-100 text-orange-800';
      case 'SERVICES':
        return 'bg-indigo-100 text-indigo-800';
      case 'PODCASTS':
        return 'bg-pink-100 text-pink-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getSuccessColor = (success: boolean) => {
    return success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  const prepareActivityData = () => {
    if (!logs.length) return [];
    
    const activityByHour: { [key: number]: number } = {};
    logs.forEach(log => {
      const hour = new Date(log.timestamp).getHours();
      activityByHour[hour] = (activityByHour[hour] || 0) + 1;
    });

    return Array.from({ length: 24 }, (_, i) => ({
      hour: `${i}:00`,
      activity: activityByHour[i] || 0
    }));
  };

  const prepareActionData = () => {
    if (!logs.length) return [];
    
    const actionCounts: { [key: string]: number } = {};
    logs.forEach(log => {
      actionCounts[log.action] = (actionCounts[log.action] || 0) + 1;
    });

    return Object.entries(actionCounts).map(([action, count]) => ({
      action,
      count
    }));
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const truncateText = (text: string, maxLength: number = 50) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Audit Logs</h1>
          <p className="text-gray-600 mt-1">System security and activity audit logs</p>
        </div>
        <Button onClick={fetchAuditLogs} variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Logs</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pagination?.totalLogs || 0}</div>
            <p className="text-xs text-muted-foreground">All time</p>
            {systemStats && (
              <div className="mt-2">
                <Badge variant="outline">
                  {systemStats.today.newLogs} today
                </Badge>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Security Events</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {logs.filter(log => !log.success).length}
            </div>
            <p className="text-xs text-muted-foreground">Failed attempts</p>
            <div className="mt-2">
              <Badge variant="destructive">
                {((logs.filter(log => !log.success).length / logs.length) * 100).toFixed(1)}% failure rate
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Set(logs.filter(log => log.action === 'LOGIN').map(log => log.sessionId)).size}
            </div>
            <p className="text-xs text-muted-foreground">Unique sessions</p>
            <div className="mt-2">
              <Badge variant="outline">
                {new Set(logs.map(log => log.ipAddress)).size} unique IPs
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Activity by Hour</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={prepareActivityData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip formatter={(value: number) => [value, 'Events']} />
                <Bar dataKey="activity" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Action Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={prepareActionData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="action" />
                <YAxis />
                <Tooltip formatter={(value: number) => [value, 'Count']} />
                <Bar dataKey="count" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Audit Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Select value={actionFilter} onValueChange={(value) => handleFilterChange('action', value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Actions</SelectItem>
                <SelectItem value="CREATE">CREATE</SelectItem>
                <SelectItem value="READ">READ</SelectItem>
                <SelectItem value="UPDATE">UPDATE</SelectItem>
                <SelectItem value="DELETE">DELETE</SelectItem>
                <SelectItem value="LOGIN">LOGIN</SelectItem>
                <SelectItem value="LOGOUT">LOGOUT</SelectItem>
                <SelectItem value="QUIZ_SUBMIT">QUIZ_SUBMIT</SelectItem>
              </SelectContent>
            </Select>

            <Select value={resourceFilter} onValueChange={(value) => handleFilterChange('resource', value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Resource" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Resources</SelectItem>
                <SelectItem value="USER_PROFILE">User Profile</SelectItem>
                <SelectItem value="QUIZ_DATA">Quiz Data</SelectItem>
                <SelectItem value="AUTH">Authentication</SelectItem>
                <SelectItem value="PRODUCTS">Products</SelectItem>
                <SelectItem value="SERVICES">Services</SelectItem>
                <SelectItem value="PODCASTS">Podcasts</SelectItem>
              </SelectContent>
            </Select>

            <Select value={successFilter} onValueChange={(value) => handleFilterChange('success', value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="true">Success</SelectItem>
                <SelectItem value="false">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Audit Logs Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Timestamp</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">User</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Action</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Resource</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={7} className="text-center py-8">
                      <div className="flex items-center justify-center">
                        <RefreshCw className="h-6 w-6 animate-spin text-gray-400 mr-2" />
                        Loading...
                      </div>
                    </td>
                  </tr>
                ) : logs.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-8 text-gray-500">
                      No audit logs found
                    </td>
                  </tr>
                ) : (
                  logs
                    .filter(log => {
                      if (successFilter && successFilter !== 'all') {
                        return log.success.toString() === successFilter;
                      }
                      return true;
                    })
                    .map((log) => (
                      <tr key={log._id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="text-sm text-gray-600">
                            {formatTimestamp(log.timestamp)}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          {log.userId ? (
                            <div>
                              <div className="font-medium">
                                {log.userId.firstName} {log.userId.lastName}
                              </div>
                              <div className="text-sm text-gray-600">{log.userId.email}</div>
                            </div>
                          ) : (
                            <div className="text-sm text-gray-500">
                              Anonymous ({log.sessionId ? truncateText(log.sessionId, 8) : 'No Session'})
                            </div>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <Badge className={getActionColor(log.action)}>
                            {log.action}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Badge className={getResourceColor(log.resource)}>
                            {log.resource.replace('_', ' ')}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Badge className={getSuccessColor(log.success)}>
                            {log.success ? 'Success' : 'Failed'}
                          </Badge>
                          {!log.success && log.errorMessage && (
                            <div className="text-xs text-red-600 mt-1">
                              {truncateText(log.errorMessage, 30)}
                            </div>
                          )}
                        </td>                        
                      </tr>
                    ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pagination && (
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-gray-600">
                Showing page {pagination.currentPage} of {pagination.totalPages} 
                ({pagination.totalLogs} total logs)
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={!pagination.hasPrev}
                >
                  Previous
                </Button>
                <span className="text-sm text-gray-600">
                  Page {pagination.currentPage} of {pagination.totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={!pagination.hasNext}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
