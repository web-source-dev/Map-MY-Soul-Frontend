'use client';

import {
  Toast,
  ToastProvider,
  ToastViewport,
} from "@/components/ui/toast"
import { useToast } from "@/hooks/use-toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, variant, ...props }) {
        // Get the type name for display
        const getTypeName = (variant?: string | null) => {
          switch (variant) {
            case 'success': return 'Success';
            case 'error': return 'Error';
            case 'warning': return 'Warning';
            case 'info': return 'Info';
            case 'mystical': return 'Mystical';
            default: return 'Info';
          }
        };
        
        const typeName = getTypeName(variant);
        const message = title || description || '';
        
        return (
          <Toast key={id} variant={variant} {...props}>
            <div className="text-sm leading-relaxed">
              <span className="font-medium">{typeName}:</span>{' '}
              <span className="font-normal">{message}</span>
            </div>
            {action}
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}