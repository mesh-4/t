"use client"

import * as React from "react"
import padStart from "lodash/padStart"
import { format, set } from "date-fns"
import { ClockIcon } from "@radix-ui/react-icons"

import { cn } from "@/utils"
import { Button, ButtonProps } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { WheelPickerRoot, WheelPickerColumn, WheelPickerItem } from "@/components/ui/wheel-picker"

const HOURS = Array.from({ length: 24 }, (_, i) => i)
const MINUTES = Array.from({ length: 60 }, (_, i) => i)
const SECONDS = Array.from({ length: 60 }, (_, i) => i)

type PickerValue = {
  hour: string
  minute: string
  second: string
}

type TimePickerProps = {
  defaultValue?: Date
  onChange?: (date: Date) => void
  placeholder?: string
} & Omit<ButtonProps, "defaultValue" | "onChange">

export function TimePicker({
  onChange,
  defaultValue,
  placeholder = "Pick a time",
  className,
  ...buttonProps
}: TimePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(defaultValue)

  const pickerValue = React.useMemo<PickerValue>(() => {
    return {
      hour: date?.getHours().toString() ?? "0",
      minute: date?.getMinutes().toString() ?? "0",
      second: date?.getSeconds().toString() ?? "0",
    }
  }, [date])

  const onTimeChange = React.useCallback(
    (newVal: PickerValue) => {
      const newDate = set(date ?? new Date(), {
        hours: parseInt(newVal.hour, 10),
        minutes: parseInt(newVal.minute, 10),
        seconds: parseInt(newVal.second, 10),
      })

      setDate(newDate)
      onChange?.(newDate)
    },
    [date, onChange]
  )

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn("w-[240px] justify-start text-left font-normal", className)}
          {...buttonProps}>
          <ClockIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "HH:mm:ss") : <span className="text-muted-foreground">{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="w-[200px] h-[150px] px-2">
          <WheelPickerRoot height={150} value={pickerValue} onChange={onTimeChange} wheelMode="natural">
            <WheelPickerColumn name="hour">
              {HOURS.map((hour) => (
                <WheelPickerItem key={hour} value={`${hour}`}>
                  {({ selected }) => (
                    <div className={selected ? "font-semibold text-foreground" : "text-muted-foreground"}>
                      {padStart(`${hour}`, 2, "0")}
                    </div>
                  )}
                </WheelPickerItem>
              ))}
            </WheelPickerColumn>
            <WheelPickerColumn name="minute">
              {MINUTES.map((minute) => (
                <WheelPickerItem key={minute} value={`${minute}`}>
                  {({ selected }) => (
                    <div className={selected ? "font-semibold text-foreground" : "text-muted-foreground"}>
                      {padStart(`${minute}`, 2, "0")}
                    </div>
                  )}
                </WheelPickerItem>
              ))}
            </WheelPickerColumn>
            <WheelPickerColumn name="second">
              {SECONDS.map((second) => (
                <WheelPickerItem key={second} value={`${second}`}>
                  {({ selected }) => (
                    <div className={selected ? "font-semibold text-foreground" : "text-muted-foreground"}>
                      {padStart(`${second}`, 2, "0")}
                    </div>
                  )}
                </WheelPickerItem>
              ))}
            </WheelPickerColumn>
          </WheelPickerRoot>
        </div>
      </PopoverContent>
    </Popover>
  )
}
