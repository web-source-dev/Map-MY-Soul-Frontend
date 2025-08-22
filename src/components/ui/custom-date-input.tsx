import * as React from "react"
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "./button"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"

interface CustomDateInputProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: string
  onChange?: (date: string) => void
  placeholder?: string
  disabled?: boolean
  required?: boolean
  className?: string
  max?: string
  min?: string
}

const CustomDateInput = React.forwardRef<HTMLDivElement, CustomDateInputProps>(
  ({ className, value, onChange, placeholder = "Select date", max, min, ...props }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const [currentDate, setCurrentDate] = React.useState(() => {
      if (value) {
        return new Date(value)
      }
      return new Date()
    })

    const [selectedDate, setSelectedDate] = React.useState<Date | null>(
      value ? new Date(value) : null
    )

    React.useEffect(() => {
      if (value) {
        setSelectedDate(new Date(value))
        setCurrentDate(new Date(value))
      }
    }, [value])

    const getDaysInMonth = (date: Date) => {
      return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
    }

    const getFirstDayOfMonth = (date: Date) => {
      return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
    }

    const formatDate = (date: Date) => {
      return date.toISOString().split('T')[0]
    }

    const handleDateSelect = (day: number) => {
      const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
      
      // Check min/max constraints
      if (min && newDate < new Date(min)) return
      if (max && newDate > new Date(max)) return
      
      setSelectedDate(newDate)
      onChange?.(formatDate(newDate))
      setIsOpen(false)
    }

    const goToPreviousMonth = () => {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
    }

    const goToNextMonth = () => {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
    }

    const isToday = (day: number) => {
      const today = new Date()
      return day === today.getDate() && 
             currentDate.getMonth() === today.getMonth() && 
             currentDate.getFullYear() === today.getFullYear()
    }

    const isSelected = (day: number) => {
      if (!selectedDate) return false
      return day === selectedDate.getDate() && 
             currentDate.getMonth() === selectedDate.getMonth() && 
             currentDate.getFullYear() === selectedDate.getFullYear()
    }

    const isDisabled = (day: number) => {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
      if (min && date < new Date(min)) return true
      if (max && date > new Date(max)) return true
      return false
    }

    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ]

    const daysInMonth = getDaysInMonth(currentDate)
    const firstDayOfMonth = getFirstDayOfMonth(currentDate)
    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-9 w-9" />)
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const disabled = isDisabled(day)
      const today = isToday(day)
      const selected = isSelected(day)
      
      days.push(
        <button
          key={day}
          onClick={() => !disabled && handleDateSelect(day)}
          disabled={disabled}
          className={cn(
            "h-9 w-9 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed",
            today && "bg-primary text-primary-foreground hover:bg-primary/90",
            selected && !today && "bg-primary/20 text-primary hover:bg-primary/30",
            disabled && "text-muted-foreground"
          )}
        >
          {day}
        </button>
      )
    }

    return (
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <div
            ref={ref}
            className={cn(
              "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              className
            )}
            {...props}
          >
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 opacity-50" />
              <span className={cn(!selectedDate && "text-muted-foreground")}>
                {selectedDate ? formatDate(selectedDate) : placeholder}
              </span>
            </div>
            <ChevronRight className="h-4 w-4 opacity-50" />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="p-3">
            <div className="flex items-center justify-between mb-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={goToPreviousMonth}
                className="h-8 w-8 p-0"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center gap-2">
                <div className="text-sm font-medium">
                  {monthNames[currentDate.getMonth()]}
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCurrentDate(new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), 1))}
                    className="h-6 w-6 p-0"
                  >
                    <ChevronLeft className="h-3 w-3" />
                  </Button>
                  <button
                    onClick={() => {
                      const currentYear = currentDate.getFullYear()
                      const newYear = prompt('Enter year:', currentYear.toString())
                      if (newYear && !isNaN(Number(newYear))) {
                        const year = Math.max(1900, Math.min(2100, Number(newYear)))
                        setCurrentDate(new Date(year, currentDate.getMonth(), 1))
                      }
                    }}
                    className="text-sm font-medium min-w-[3rem] text-center hover:bg-accent hover:text-accent-foreground px-2 py-1 rounded transition-colors"
                  >
                    {currentDate.getFullYear()}
                  </button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCurrentDate(new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), 1))}
                    className="h-6 w-6 p-0"
                  >
                    <ChevronRight className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={goToNextMonth}
                className="h-8 w-8 p-0"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-7 gap-1 mb-2">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="h-9 w-9 flex items-center justify-center text-xs font-medium text-muted-foreground">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {days}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    )
  }
)

CustomDateInput.displayName = "CustomDateInput"

export { CustomDateInput }
