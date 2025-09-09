import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  ChevronLeft, 
  ChevronRight, 
  Search, 
  Filter,
  RefreshCw,
  Download,
  MoreHorizontal,
} from 'lucide-react';

interface Column<T = Record<string, unknown>> {
  key: string;
  label: string;
  render?: (value: unknown, row: T) => React.ReactNode;
  sortable?: boolean;
}

interface ActionItem<T = Record<string, unknown>> {
  label: string | ((row: T) => string);
  icon?: React.ReactNode | ((row: T) => React.ReactNode);
  onClick: (row: T) => void;
  variant?: 'default' | 'destructive' | 'outline' | ((row: T) => 'default' | 'destructive' | 'outline');
  disabled?: boolean | ((row: T) => boolean);
}

interface DataTableProps<T = Record<string, unknown>> {
  title: string;
  data: T[];
  columns: Column<T>[];
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  loading?: boolean;
  searchPlaceholder?: string;
  filters?: {
    key: string;
    label: string;
    options: { value: string; label: string }[];
  }[];
  actions?: ActionItem<T>[];
  onPageChange?: (page: number) => void;
  onSearch?: (search: string) => void;
  onFilterChange?: (filterKey: string, value: string) => void;
  onRefresh?: () => void;
  onExport?: () => void;
  emptyMessage?: string;
}

export const DataTable = <T extends Record<string, unknown> = Record<string, unknown>>({
  title,
  data,
  columns,
  pagination,
  loading = false,
  searchPlaceholder = "Search...",
  filters = [],
  actions = [],
  onPageChange,
  onSearch,
  onFilterChange,
  onRefresh,
  onExport,
  emptyMessage = "No data available"
}: DataTableProps<T>) => {
  const [searchValue, setSearchValue] = useState('');
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});

  const handleSearch = (value: string) => {
    setSearchValue(value);
    onSearch?.(value);
  };

  const handleFilterChange = (filterKey: string, value: string) => {
    setFilterValues(prev => ({ ...prev, [filterKey]: value }));
    // Convert "all" to empty string for API calls
    const apiValue = value === "all" ? "" : value;
    onFilterChange?.(filterKey, apiValue);
  };

  const renderCell = (column: Column<T>, row: T): React.ReactNode => {
    const value = row[column.key];
    
    if (column.render) {
      return column.render(value, row);
    }
    
    return value as React.ReactNode;
  };

  return (
    <Card className="border-0 shadow-lg bg-background/50 backdrop-blur-sm">
      <CardHeader className="bg-gradient-to-r from-primary-indigo/5 to-primary-lavender/5 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-semibold text-foreground">{title}</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            {onExport && (
              <Button
                variant="outline"
                size="sm"
                onClick={onExport}
                className="border-foreground/20 hover:bg-foreground/5"
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            )}
            {onRefresh && (
              <Button
                variant="outline"
                size="sm"
                onClick={onRefresh}
                disabled={loading}
                className="border-foreground/20 hover:bg-foreground/5"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          {onSearch && (
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground/50" />
              <Input
                placeholder={searchPlaceholder}
                value={searchValue}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 border-foreground/20 focus:border-primary-indigo focus:ring-primary-indigo/20 transition-all duration-200"
              />
            </div>
          )}
          
          {filters.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <Select
                  key={filter.key}
                  value={filterValues[filter.key] || 'all'}
                  onValueChange={(value) => handleFilterChange(filter.key, value)}
                >
                  <SelectTrigger className="w-[180px] border-foreground/20 focus:border-primary-indigo focus:ring-primary-indigo/20">
                    <Filter className="h-4 w-4 mr-2 text-foreground/50" />
                    <SelectValue placeholder={filter.label} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All {filter.label}</SelectItem>
                    {filter.options.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ))}
            </div>
          )}
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-lg border border-foreground/20 bg-background">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-foreground/20">
                  {columns.map((column) => (
                    <th
                      key={column.key}
                      className="text-left py-4 px-6 font-semibold text-foreground/80 text-sm uppercase tracking-wide"
                    >
                      {column.label}
                    </th>
                  ))}
                  {actions.length > 0 && (
                    <th className="w-12"></th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan={columns.length + (actions.length > 0 ? 1 : 0)} className="text-center py-12">
                      <div className="flex flex-col items-center justify-center">
                        <div className="relative">
                          <RefreshCw className="h-8 w-8 animate-spin text-primary-indigo" />
                          <div className="absolute inset-0 rounded-full border-2 border-primary-indigo/20 animate-pulse"></div>
                        </div>
                        <p className="mt-3 text-foreground/70 font-medium">Loading data...</p>
                        <p className="text-sm text-foreground/50">Please wait while we fetch your data</p>
                      </div>
                    </td>
                  </tr>
                ) : data.length === 0 ? (
                  <tr>
                    <td colSpan={columns.length + (actions.length > 0 ? 1 : 0)} className="text-center py-12">
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                          <Search className="h-8 w-8 text-foreground/50" />
                        </div>
                        <h3 className="text-lg font-medium text-foreground mb-2">No data found</h3>
                        <p className="text-foreground/60 max-w-sm">{emptyMessage}</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  data.map((row, index) => (
                    <tr 
                      key={('_id' in row ? (row._id as string) : undefined) || index} 
                      className="hover:bg-gradient-to-r hover:from-primary-indigo/5 hover:to-primary-lavender/5 transition-all duration-200 group"
                    >
                      {columns.map((column) => (
                        <td key={column.key} className="py-4 px-6 text-sm text-foreground/80">
                          <div className="flex items-center">
                            {renderCell(column, row as T)}
                          </div>
                        </td>
                      ))}
                      {actions.length > 0 && (
                        <td className="py-4 px-6">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              {actions.map((action, actionIndex) => {
                                const label = typeof action.label === 'function' ? action.label(row) : action.label;
                                const icon = typeof action.icon === 'function' ? action.icon(row) : action.icon;
                                const variant = typeof action.variant === 'function' ? action.variant(row) : action.variant;
                                const disabled = typeof action.disabled === 'function' ? action.disabled(row) : action.disabled;
                                
                                return (
                                  <DropdownMenuItem
                                    key={actionIndex}
                                    onClick={() => action.onClick(row)}
                                    disabled={disabled}
                                    className={variant === 'destructive' ? 'text-secondary-pop focus:text-secondary-pop' : ''}
                                  >
                                    {icon && <span className="mr-2">{icon}</span>}
                                    {label}
                                  </DropdownMenuItem>
                                );
                              })}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {pagination && (
          <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4">
            <div className="text-sm text-foreground/70">
              <span className="font-medium">
                Showing page {pagination.currentPage} of {pagination.totalPages}
              </span>
              <span className="text-foreground/50 ml-2">
                ({pagination.totalItems} total items)
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange?.(pagination.currentPage - 1)}
                disabled={!pagination.hasPrev}
                className="border-foreground/20 hover:bg-foreground/5 disabled:opacity-50"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                  const pageNum = i + 1;
                  return (
                    <Button
                      key={pageNum}
                      variant={pageNum === pagination.currentPage ? "default" : "outline"}
                      size="sm"
                      onClick={() => onPageChange?.(pageNum)}
                      className="w-8 h-8 p-0"
                    >
                      {pageNum}
                    </Button>
                  );
                })}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange?.(pagination.currentPage + 1)}
                disabled={!pagination.hasNext}
                className="border-foreground/20 hover:bg-foreground/5 disabled:opacity-50"
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
