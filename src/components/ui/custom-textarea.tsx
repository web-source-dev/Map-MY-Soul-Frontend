import * as React from "react"
import { cn } from "@/lib/utils"

interface CustomTextareaProps extends Omit<React.HTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  disabled?: boolean
  required?: boolean
  className?: string
  rows?: number
  maxLength?: number
  error?: string
  success?: string
  resize?: "none" | "vertical" | "horizontal" | "both"
}

const CustomTextarea = React.forwardRef<HTMLTextAreaElement, CustomTextareaProps>(
  ({ 
    className, 
    value, 
    onChange, 
    placeholder, 
    disabled, 
    required, 
    rows = 4,
    maxLength,
    error,
    success,
    resize = "vertical",
    ...props 
  }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange?.(e.target.value)
    }

    const getStatusColor = () => {
      if (error) return "border-red-500 focus:ring-red-500"
      if (success) return "border-green-500 focus:ring-green-500"
      return "border-input focus:ring-ring"
    }

    const getResizeClass = () => {
      switch (resize) {
        case "none":
          return "resize-none"
        case "vertical":
          return "resize-y"
        case "horizontal":
          return "resize-x"
        case "both":
          return "resize"
        default:
          return "resize-y"
      }
    }

    return (
      <div className="relative">
        <div
          className={cn(
            "rounded-md border bg-background ring-offset-background transition-all duration-200",
            getStatusColor(),
            isFocused && "ring-2 ring-offset-2",
            disabled && "opacity-50 cursor-not-allowed",
            className
          )}
        >
          <textarea
            ref={ref}
            value={value || ""}
            onChange={handleChange}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            rows={rows}
            maxLength={maxLength}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={cn(
              "flex-1 w-full bg-transparent outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed",
              "text-sm px-3 py-2",
              getResizeClass(),
              "min-h-[80px]"
            )}
            {...props}
          />
        </div>
        
        {(error || success) && (
          <div className={cn(
            "mt-1 text-xs",
            error ? "text-red-500" : "text-green-500"
          )}>
            {error || success}
          </div>
        )}
        
        {maxLength && (
          <div className="mt-1 text-xs text-muted-foreground text-right">
            {(value?.length || 0)} / {maxLength}
          </div>
        )}
      </div>
    )
  }
)

CustomTextarea.displayName = "CustomTextarea"

export { CustomTextarea }
