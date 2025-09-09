import * as React from "react"
import { cn } from "@/lib/utils"

interface CustomTextInputProps extends Omit<React.HTMLAttributes<HTMLInputElement>, 'onChange'> {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  disabled?: boolean
  required?: boolean
  className?: string
  type?: "text" | "email" | "password" | "number" | "tel" | "url"
  icon?: React.ReactNode
  error?: string
  success?: string
  clearable?: boolean
  onClear?: () => void
}

const CustomTextInput = React.forwardRef<HTMLInputElement, CustomTextInputProps>(
  ({ 
    className, 
    value, 
    onChange, 
    placeholder, 
    disabled, 
    required, 
    type = "text",
    icon,
    error,
    success,
    clearable = false,
    onClear,
    ...props 
  }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false)
    const [showPassword, setShowPassword] = React.useState(false)
    const [inputType, setInputType] = React.useState(type)

    React.useEffect(() => {
      if (type === "password") {
        setInputType(showPassword ? "text" : "password")
      } else {
        setInputType(type)
      }
    }, [type, showPassword])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.value)
    }

    const handleClear = () => {
      onChange?.('')
      onClear?.()
    }

    const getStatusColor = () => {
      if (error) return "border-secondary-pop focus:ring-secondary-pop"
      if (success) return "border-support-pastel focus:ring-support-pastel"
      return "border-input focus:ring-ring"
    }

    return (
      <div className="relative">
        <div
          className={cn(
            "flex items-center gap-2 rounded-md border bg-background px-3 py-2 text-sm ring-offset-background transition-all duration-200",
            getStatusColor(),
            isFocused && "ring-2 ring-offset-2",
            disabled && "opacity-50 cursor-not-allowed",
            className
          )}
        >
          {icon && (
            <div className="flex-shrink-0 text-foreground/60">
              {icon}
            </div>
          )}
          
          <input
            ref={ref}
            type={inputType}
            value={value || ""}
            onChange={handleChange}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={cn(
              "flex-1 bg-transparent outline-none placeholder:text-foreground/50 disabled:cursor-not-allowed",
              "text-sm"
            )}
            {...props}
          />
          
          <div className="flex items-center gap-1">
            {clearable && value && (
              <button
                type="button"
                onClick={handleClear}
                className="p-1 hover:bg-muted rounded-sm transition-colors"
                disabled={disabled}
              >
                <svg
                  className="h-3 w-3 text-foreground/60"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
            
            {type === "password" && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="p-1 hover:bg-muted rounded-sm transition-colors"
                disabled={disabled}
              >
                {showPassword ? (
                  <svg
                    className="h-4 w-4 text-foreground/60"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-4 w-4 text-foreground/60"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            )}
          </div>
        </div>
        
        {(error || success) && (
          <div className={cn(
            "mt-1 text-xs",
            error ? "text-secondary-pop" : "text-support-pastel"
          )}>
            {error || success}
          </div>
        )}
      </div>
    )
  }
)

CustomTextInput.displayName = "CustomTextInput"

export { CustomTextInput }
