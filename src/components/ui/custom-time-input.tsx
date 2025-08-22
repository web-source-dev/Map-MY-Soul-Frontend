import * as React from "react"
import { Clock, ChevronUp, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "./button"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"

interface CustomTimeInputProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: string
  onChange?: (time: string) => void
  placeholder?: string
  disabled?: boolean
  required?: boolean
  className?: string
  format?: "12h" | "24h"
}

const CustomTimeInput = React.forwardRef<HTMLDivElement, CustomTimeInputProps>(
  ({ className, value, onChange, placeholder = "Select time", disabled, required, format = "24h", ...props }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const [selectedHour, setSelectedHour] = React.useState<number>(0)
    const [selectedMinute, setSelectedMinute] = React.useState<number>(0)
    const [isAM, setIsAM] = React.useState<boolean>(true)

    React.useEffect(() => {
      if (value) {
        const [hours, minutes] = value.split(':').map(Number)
        if (format === "12h") {
          const isAMTime = hours < 12
          setSelectedHour(hours === 0 ? 12 : hours > 12 ? hours - 12 : hours)
          setIsAM(isAMTime)
        } else {
          setSelectedHour(hours)
        }
        setSelectedMinute(minutes)
      }
    }, [value, format])

    const formatTime = (hour: number, minute: number, am: boolean) => {
      let displayHour = hour
      let displayMinute = minute.toString().padStart(2, '0')
      
      if (format === "12h") {
        displayHour = hour === 0 ? 12 : hour
        return `${displayHour}:${displayMinute} ${am ? 'AM' : 'PM'}`
      } else {
        const fullHour = am ? hour : hour + 12
        if (fullHour === 24) displayHour = 0
        else if (fullHour === 12) displayHour = 12
        else displayHour = fullHour
        return `${displayHour.toString().padStart(2, '0')}:${displayMinute}`
      }
    }

    const getOutputValue = () => {
      let outputHour = selectedHour
      
      if (format === "12h") {
        if (selectedHour === 12) {
          outputHour = isAM ? 0 : 12
        } else {
          outputHour = isAM ? selectedHour : selectedHour + 12
        }
      }
      
      return `${outputHour.toString().padStart(2, '0')}:${selectedMinute.toString().padStart(2, '0')}`
    }

    const handleTimeSelect = () => {
      onChange?.(getOutputValue())
      setIsOpen(false)
    }

    const incrementHour = () => {
      const maxHour = format === "12h" ? 12 : 23
      setSelectedHour(prev => prev >= maxHour ? (format === "12h" ? 1 : 0) : prev + 1)
    }

    const decrementHour = () => {
      const maxHour = format === "12h" ? 12 : 23
      setSelectedHour(prev => prev <= 1 ? maxHour : prev - 1)
    }

    const incrementMinute = () => {
      setSelectedMinute(prev => prev >= 59 ? 0 : prev + 1)
    }

    const decrementMinute = () => {
      setSelectedMinute(prev => prev <= 0 ? 59 : prev - 1)
    }

    const hours = Array.from({ length: format === "12h" ? 12 : 24 }, (_, i) => 
      format === "12h" ? (i === 0 ? 12 : i) : i
    )
    
    const minutes = Array.from({ length: 60 }, (_, i) => i)

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
              <Clock className="h-4 w-4 opacity-50" />
              <span className={cn(!value && "text-muted-foreground")}>
                {value ? formatTime(selectedHour, selectedMinute, isAM) : placeholder}
              </span>
            </div>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="p-4">
            <div className="flex items-center justify-center gap-4 mb-4">
              {/* Hour Selection */}
              <div className="flex flex-col items-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={incrementHour}
                  className="h-8 w-8 p-0 mb-2"
                >
                  <ChevronUp className="h-4 w-4" />
                </Button>
                <div className="text-2xl font-bold min-w-[3rem] text-center">
                  {selectedHour.toString().padStart(2, '0')}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={decrementHour}
                  className="h-8 w-8 p-0 mt-2"
                >
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>

              <div className="text-2xl font-bold">:</div>

              {/* Minute Selection */}
              <div className="flex flex-col items-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={incrementMinute}
                  className="h-8 w-8 p-0 mb-2"
                >
                  <ChevronUp className="h-4 w-4" />
                </Button>
                <div className="text-2xl font-bold min-w-[3rem] text-center">
                  {selectedMinute.toString().padStart(2, '0')}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={decrementMinute}
                  className="h-8 w-8 p-0 mt-2"
                >
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>

              {/* AM/PM Selection for 12h format */}
              {format === "12h" && (
                <div className="flex flex-col gap-1 ml-4">
                  <Button
                    variant={isAM ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setIsAM(true)}
                    className="h-8 px-3"
                  >
                    AM
                  </Button>
                  <Button
                    variant={!isAM ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setIsAM(false)}
                    className="h-8 px-3"
                  >
                    PM
                  </Button>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setIsOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleTimeSelect}
                className="flex-1"
              >
                Select Time
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    )
  }
)

CustomTimeInput.displayName = "CustomTimeInput"

export { CustomTimeInput }
