import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  description,
  icon: Icon,
  trend,
  className = '',
  variant = 'default'
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'success':
        return {
          card: 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200',
          icon: 'text-green-600 bg-green-100',
          value: 'text-green-700',
          trend: 'text-green-600'
        };
      case 'warning':
        return {
          card: 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200',
          icon: 'text-yellow-600 bg-yellow-100',
          value: 'text-yellow-700',
          trend: 'text-yellow-600'
        };
      case 'danger':
        return {
          card: 'bg-gradient-to-br from-red-50 to-pink-50 border-red-200',
          icon: 'text-red-600 bg-red-100',
          value: 'text-red-700',
          trend: 'text-red-600'
        };
      case 'info':
        return {
          card: 'bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200',
          icon: 'text-blue-600 bg-blue-100',
          value: 'text-blue-700',
          trend: 'text-blue-600'
        };
      default:
        return {
          card: 'bg-gradient-to-br from-gray-50 to-slate-50 border-gray-200',
          icon: 'text-purple-600 bg-purple-100',
          value: 'text-gray-800',
          trend: 'text-purple-600'
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <Card className={`${styles.card} ${className} border-0 shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden relative`}>
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
        <CardTitle className="text-sm font-medium text-gray-600 tracking-wide uppercase">
          {title}
        </CardTitle>
        <div className={`p-2 rounded-lg ${styles.icon} transition-all duration-300 group-hover:scale-110`}>
          <Icon className="h-5 w-5" />
        </div>
      </CardHeader>
      
      <CardContent className="relative z-10">
        <div className={`text-3xl font-bold ${styles.value} mb-2 transition-all duration-300 group-hover:scale-105`}>
          {typeof value === 'number' && value >= 1000 
            ? value.toLocaleString() 
            : value}
        </div>
        
        {description && (
          <p className="text-sm text-gray-500 mb-3 leading-relaxed">
            {description}
          </p>
        )}
        
        {trend && (
          <div className="flex items-center space-x-2">
            <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${
              trend.isPositive 
                ? 'bg-green-100 text-green-700' 
                : 'bg-red-100 text-red-700'
            }`}>
              {trend.isPositive ? (
                <TrendingUp className="h-3 w-3 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 mr-1" />
              )}
              {trend.isPositive ? '+' : ''}{trend.value}%
            </div>
            <span className="text-xs text-gray-400">
              from last month
            </span>
          </div>
        )}
      </CardContent>
      
      {/* Subtle border accent */}
      <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${
        variant === 'success' ? 'from-green-400 to-emerald-400' :
        variant === 'warning' ? 'from-yellow-400 to-orange-400' :
        variant === 'danger' ? 'from-red-400 to-pink-400' :
        variant === 'info' ? 'from-blue-400 to-cyan-400' :
        'from-purple-400 to-indigo-400'
      } transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
    </Card>
  );
};
