import * as React from "react"
import { ChevronDown, Check, Search, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "./button"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"

interface CustomSelectOption {
  value: string
  label: string
  disabled?: boolean
}

interface CustomSelectProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: string
  onChange?: (value: string) => void
  options: CustomSelectOption[]
  placeholder?: string
  disabled?: boolean
  required?: boolean
  className?: string
  searchable?: boolean
  clearable?: boolean
  multiple?: boolean
  maxHeight?: string
}

const CustomSelect = React.forwardRef<HTMLDivElement, CustomSelectProps>(
  ({ 
    className, 
    value, 
    onChange, 
    options, 
    placeholder = "Select an option", 
    disabled, 
    required, 
    searchable = false,
    clearable = false,
    multiple = false,
    maxHeight = "200px",
    ...props 
  }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const [searchTerm, setSearchTerm] = React.useState("")
    const [selectedValues, setSelectedValues] = React.useState<string[]>(
      value ? (multiple ? value.split(',').filter(Boolean) : [value]) : []
    )

    React.useEffect(() => {
      if (value) {
        setSelectedValues(multiple ? value.split(',').filter(Boolean) : [value])
      } else {
        setSelectedValues([])
      }
    }, [value, multiple])

    const filteredOptions = React.useMemo(() => {
      if (!searchable || !searchTerm) return options
      return options.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }, [options, searchTerm, searchable])

    const selectedOption = React.useMemo(() => {
      if (multiple) return null
      return options.find(option => option.value === value)
    }, [options, value, multiple])

    const selectedOptions = React.useMemo(() => {
      if (!multiple) return []
      return options.filter(option => selectedValues.includes(option.value))
    }, [options, selectedValues, multiple])

    const handleSelect = (optionValue: string) => {
      if (multiple) {
        const newValues = selectedValues.includes(optionValue)
          ? selectedValues.filter(v => v !== optionValue)
          : [...selectedValues, optionValue]
        setSelectedValues(newValues)
        onChange?.(newValues.join(','))
      } else {
        setSelectedValues([optionValue])
        onChange?.(optionValue)
        setIsOpen(false)
      }
    }

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation()
      setSelectedValues([])
      onChange?.('')
      setSearchTerm("")
    }

    const handleRemoveOption = (optionValue: string) => {
      const newValues = selectedValues.filter(v => v !== optionValue)
      setSelectedValues(newValues)
      onChange?.(newValues.join(','))
    }

    const displayValue = React.useMemo(() => {
      if (multiple) {
        if (selectedOptions.length === 0) return placeholder
        if (selectedOptions.length === 1) return selectedOptions[0].label
        return `${selectedOptions.length} items selected`
      }
      return selectedOption?.label || placeholder
    }, [multiple, selectedOptions, selectedOption, placeholder])

    return (
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <div
            ref={ref}
            className={cn(
              "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              className
            )}
            onClick={() => !disabled && setIsOpen(!isOpen)}
            {...props}
          >
            <div className="flex items-center gap-2 flex-1 min-w-0">
              {multiple && selectedOptions.length > 0 ? (
                <div className="flex flex-wrap gap-1 flex-1">
                  {selectedOptions.slice(0, 2).map((option) => (
                    <span
                      key={option.value}
                      className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-primary/10 text-primary rounded-md border border-primary/20"
                    >
                      {option.label}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleRemoveOption(option.value)
                        }}
                        className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                  {selectedOptions.length > 2 && (
                    <span className="text-xs text-muted-foreground px-2 py-1">
                      +{selectedOptions.length - 2} more
                    </span>
                  )}
                </div>
              ) : (
                <span className={cn(
                  "truncate",
                  !selectedOption && "text-muted-foreground"
                )}>
                  {displayValue}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1">
              {clearable && selectedValues.length > 0 && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="p-1 hover:bg-muted rounded-sm"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
              <ChevronDown className={cn(
                "h-4 w-4 opacity-50 transition-transform",
                isOpen && "rotate-180"
              )} />
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
          <div className="p-3">
            {searchable && (
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search options..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onClick={(e) => e.stopPropagation()}
                  autoFocus
                />
              </div>
            )}
            
            <div 
              className="space-y-1 max-h-60 overflow-y-auto"
              style={{ maxHeight }}
            >
              {filteredOptions.length === 0 ? (
                <div className="px-3 py-4 text-sm text-muted-foreground text-center">
                  <div className="flex flex-col items-center gap-2">
                    <Search className="h-8 w-8 text-muted-foreground/50" />
                    <p>No options found</p>
                    {searchTerm && (
                      <p className="text-xs">Try a different search term</p>
                    )}
                  </div>
                </div>
              ) : (
                filteredOptions.map((option) => {
                  const isSelected = selectedValues.includes(option.value)
                  const isDisabled = option.disabled
                  
                  return (
                    <button
                      key={option.value}
                      onClick={() => !isDisabled && handleSelect(option.value)}
                      disabled={isDisabled}
                      className={cn(
                        "w-full flex items-center justify-between px-3 py-2.5 text-sm rounded-md transition-all duration-150 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed",
                        isSelected && "bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20",
                        !isSelected && "hover:border hover:border-accent-foreground/20"
                      )}
                    >
                      <span className="truncate font-medium">{option.label}</span>
                      {isSelected && (
                        <div className="flex items-center gap-1">
                          <Check className="h-4 w-4 text-primary" />
                        </div>
                      )}
                    </button>
                  )
                })
              )}
            </div>
            
            {multiple && selectedValues.length > 0 && (
              <div className="mt-3 pt-3 border-t border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground">
                    {selectedValues.length} selected
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSelectedValues([])
                      onChange?.('')
                    }}
                    className="h-6 px-2 text-xs"
                  >
                    Clear All
                  </Button>
                </div>
                <div className="flex flex-wrap gap-1">
                  {selectedOptions.slice(0, 3).map((option) => (
                    <span
                      key={option.value}
                      className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-primary/10 text-primary rounded-md"
                    >
                      {option.label}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleRemoveOption(option.value)
                        }}
                        className="hover:bg-primary/20 rounded-full p-0.5"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                  {selectedOptions.length > 3 && (
                    <span className="text-xs text-muted-foreground px-2 py-1">
                      +{selectedOptions.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    )
  }
)

CustomSelect.displayName = "CustomSelect"

export { CustomSelect }
