'use client';

import * as React from "react"
import * as ToastPrimitives from "@radix-ui/react-toast"
import { cva, type VariantProps } from "class-variance-authority"
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react"

import { cn } from "@/lib/utils"

const ToastProvider = ToastPrimitives.Provider

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "fixed bottom-4 z-[100] flex max-h-screen w-full flex-col p-4 sm:bottom-4 sm:right-4 sm:flex-col md:max-w-[420px]",
      className
    )}
    {...props}
  />
))
ToastViewport.displayName = ToastPrimitives.Viewport.displayName

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center py-2 px-3 transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-bottom-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "bg-white text-foreground shadow-sm",
        success: "bg-white text-emerald-900 shadow-sm",
        error: "bg-white text-red-900 shadow-sm",
        warning: "bg-white text-amber-900 shadow-sm",
        info: "bg-white text-blue-900 shadow-sm",
        mystical: "bg-white text-[#4B2ECC] shadow-sm",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

// Countdown Timer Component
const ToastCountdown = ({ duration = 5000, variant = "default", onComplete }: { duration?: number; variant?: string | null; onComplete?: () => void }) => {
  const [timeLeft, setTimeLeft] = React.useState(duration);
  
  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 100) {
          clearInterval(timer);
          // Call onComplete when countdown finishes
          if (onComplete) {
            setTimeout(onComplete, 50); // Small delay to ensure smooth animation
          }
          return 0;
        }
        return prev - 100;
      });
    }, 100);
    
    return () => clearInterval(timer);
  }, [onComplete]);
  
  const progress = (timeLeft / duration) * 100;
  
  const getProgressColor = () => {
    switch (variant) {
      case 'success': return 'bg-emerald-500';
      case 'error': return 'bg-red-500';
      case 'warning': return 'bg-amber-500';
      case 'info': return 'bg-blue-500';
      case 'mystical': return 'bg-[#4B2ECC]';
      default: return 'bg-gray-400';
    }
  };
  
  return (
    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black/5">
      <div 
        className={cn("h-full transition-all duration-100 ease-linear", getProgressColor())}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

// Icon component for different toast types
const ToastIcon = ({ variant }: { variant?: string | null }) => {
  const iconClass = "w-4 h-4 flex-shrink-0"
  
  switch (variant) {
    case 'success':
      return <CheckCircle className={cn(iconClass, "text-emerald-600")} />;
    case 'error':
      return <AlertCircle className={cn(iconClass, "text-red-600")} />;
    case 'warning':
      return <AlertTriangle className={cn(iconClass, "text-amber-600")} />;
    case 'info':
      return <Info className={cn(iconClass, "text-blue-600")} />;
    case 'mystical':
      return <CheckCircle className={cn(iconClass, "text-[#4B2ECC]")} />;
    default:
      return <Info className={cn(iconClass, "text-gray-600")} />;
  }
};

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
    VariantProps<typeof toastVariants> & { showCountdown?: boolean }
>(({ className, variant, showCountdown = true, onOpenChange, ...props }, ref) => {
  const handleCountdownComplete = React.useCallback(() => {
    if (onOpenChange) {
      onOpenChange(false);
    }
  }, [onOpenChange]);

  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(toastVariants({ variant }), "relative", className)}
      onOpenChange={onOpenChange}
      {...props}
    >
      <div className="flex items-start gap-2 flex-1 min-w-0">
        <div className="mt-0.5">
          <ToastIcon variant={variant} />
        </div>
        <div className="flex-1 min-w-0">
          {props.children}
        </div>
      </div>
      <div className="w-px bg-gray-200 mx-3 self-stretch" />
      <ToastClose />
      {showCountdown && <ToastCountdown variant={variant} onComplete={handleCountdownComplete} />}
    </ToastPrimitives.Root>
  )
})
Toast.displayName = ToastPrimitives.Root.displayName

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-lg border bg-transparent px-3 text-sm font-medium transition-all duration-200 hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-[#4B2ECC]/20 focus:ring-offset-1 disabled:pointer-events-none disabled:opacity-50",
      className
    )}
    {...props}
  />
))
ToastAction.displayName = ToastPrimitives.Action.displayName

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      "flex items-center justify-center p-1 text-gray-400 hover:text-gray-600 transition-colors duration-200 focus:outline-none",
      className
    )}
    toast-close=""
    {...props}
  >
    <X className="h-4 w-4" />
  </ToastPrimitives.Close>
))
ToastClose.displayName = ToastPrimitives.Close.displayName

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn("text-sm font-medium leading-relaxed", className)}
    {...props}
  />
))
ToastTitle.displayName = ToastPrimitives.Title.displayName

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn("text-sm leading-relaxed", className)}
    {...props}
  />
))
ToastDescription.displayName = ToastPrimitives.Description.displayName

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>

type ToastActionElement = React.ReactElement<typeof ToastAction>

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
}
