"use client"

import * as React from "react"
import { format, subMonths, addMonths } from "date-fns"
import { ChevronUpIcon, ChevronDownIcon } from "@radix-ui/react-icons"

import { useStore } from "@/store"
import { Button } from "@/components/ui/button"

function CalendarHeader() {
  const date = useStore((state) => state.date)
  const setDate = useStore((state) => state.setDate)

  const onNextMonthClick = () => {
    setDate(format(addMonths(new Date(date), 1), "yyyy/MM/dd"))
  }

  const onPrevMonthClick = () => {
    setDate(format(subMonths(new Date(date), 1), "yyyy/MM/dd"))
  }

  return (
    <div className="flex items-center justify-between">
      <p className="font-semibold">{format(new Date(date), "yyyy MMMM")}</p>

      <div className="flex items-center space-x-1">
        <Button size="icon" variant="ghost" className="w-5 h-5" onClick={onPrevMonthClick}>
          <ChevronUpIcon />
        </Button>
        <Button size="icon" variant="ghost" className="w-5 h-5" onClick={onNextMonthClick}>
          <ChevronDownIcon />
        </Button>
      </div>
    </div>
  )
}

CalendarHeader.displayName = "CalendarHeader"

export default React.memo(CalendarHeader)
