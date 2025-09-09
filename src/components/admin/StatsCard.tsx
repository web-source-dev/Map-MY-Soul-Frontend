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
          card: 'bg-gradient-to-br from-support-pastel/10 to-support-pastel/5 border-support-pastel/30',
          icon: 'text-support-pastel bg-support-pastel/10',
          value: 'text-support-pastel',
          trend: 'text-support-pastel'
        };
      case 'warning':
        return {
          card: 'bg-gradient-to-br from-support-pastel/10 to-secondary-vivid/5 border-support-pastel/30',
          icon: 'text-support-pastel bg-support-pastel/10',
          value: 'text-support-pastel',
          trend: 'text-support-pastel'
        };
      case 'danger':
        return {
          card: 'bg-gradient-to-br from-secondary-pop/10 to-secondary-pop/5 border-secondary-pop/30',
          icon: 'text-secondary-pop bg-secondary-pop/10',
          value: 'text-secondary-pop',
          trend: 'text-secondary-pop'
        };
      case 'info':
        return {
          card: 'bg-gradient-to-br from-primary-indigo/10 to-primary-lavender/5 border-primary-indigo/30',
          icon: 'text-primary-indigo bg-primary-indigo/10',
          value: 'text-primary-indigo',
          trend: 'text-primary-indigo'
        };
      default:
        return {
          card: 'bg-gradient-to-br from-foreground/5 to-foreground/10 border-foreground/20',
          icon: 'text-primary-indigo bg-primary-indigo/10',
          value: 'text-foreground',
          trend: 'text-primary-indigo'
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <Card className={`${styles.card} ${className} border-0 shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden relative`}>
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
        <CardTitle className="text-sm font-medium text-foreground/70 tracking-wide uppercase">
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
          <p className="text-sm text-foreground/60 mb-3 leading-relaxed">
            {description}
          </p>
        )}
        
        {trend && (
          <div className="flex items-center space-x-2">
            <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${
              trend.isPositive 
                ? 'bg-support-pastel/10 text-support-pastel' 
                : 'bg-secondary-pop/10 text-secondary-pop'
            }`}>
              {trend.isPositive ? (
                <TrendingUp className="h-3 w-3 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 mr-1" />
              )}
              {trend.isPositive ? '+' : ''}{trend.value}%
            </div>
            <span className="text-xs text-foreground/50">
              from last month
            </span>
          </div>
        )}
      </CardContent>
      
      {/* Subtle border accent */}
      <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${
        variant === 'success' ? 'from-support-pastel to-support-pastel' :
        variant === 'warning' ? 'from-support-pastel to-secondary-vivid' :
        variant === 'danger' ? 'from-secondary-pop to-secondary-pop' :
        variant === 'info' ? 'from-primary-indigo to-primary-lavender' :
        'from-primary-indigo to-primary-lavender'
      } transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
    </Card>
  );
};
