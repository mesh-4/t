"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "@radix-ui/react-icons"

import { cn } from "@/utils"
import { Calendar } from "@/components/ui/calendar"
import { Button, ButtonProps } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

type DatePickerProps = {
  defaultValue?: Date
  onChange?: (date: Date) => void
  placeholder?: string
} & Omit<ButtonProps, "defaultValue" | "onChange">

export function DatePicker({
  onChange,
  defaultValue,
  placeholder = "Pick a date",
  className,
  ...buttonProps
}: DatePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(defaultValue)

  const onDateChange = (newDate: Date | undefined) => {
    setDate((prevDate) => {
      return newDate ?? prevDate
    })
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn("w-[240px] justify-start text-left font-normal", className)}
          {...buttonProps}>
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "yyyy-MM-dd") : <span className="text-muted-foreground">{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" selected={date} onSelect={onDateChange} initialFocus />
      </PopoverContent>
    </Popover>
  )
}
