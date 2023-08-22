import * as React from "react"
import { format, isSameDay, isSameMonth, subDays, addDays } from "date-fns"

import { cn } from "@/utils"
import { useStore } from "@/store"

type CalendarDayProps = {
  date: Date
}

function CalendarDay({ date }: CalendarDayProps) {
  const currentDate = useStore((state) => state.date)
  const setDate = useStore((state) => state.setDate)

  const dateString = format(date, "yyyy/MM/dd")

  const isSelected = isSameDay(new Date(currentDate), new Date(dateString))

  const onDateChange = () => {
    setDate(dateString)
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (e.key === "ArrowLeft") {
      setDate(format(subDays(date, 1), "yyyy/MM/dd"))
    }
    if (e.key === "ArrowRight") {
      setDate(format(addDays(date, 1), "yyyy/MM/dd"))
    }
    if (e.key === "ArrowUp") {
      setDate(format(subDays(date, 7), "yyyy/MM/dd"))
    }
    if (e.key === "ArrowDown") {
      setDate(format(addDays(date, 7), "yyyy/MM/dd"))
    }
    e.currentTarget.blur()
  }

  return (
    <td className="flex-1 relative" tabIndex={isSelected ? 0 : -1} role="gridcell" onKeyDown={onKeyDown}>
      <div className="flex items-center justify-center">
        <p
          role="button"
          className={cn(
            "text-sm w-[21px] text-center",
            isSelected && "bg-red-500 text-white",
            isSameMonth(date, new Date(currentDate)) ? "opacity-100" : "opacity-50"
          )}
          onClick={onDateChange}>
          {date.getDate()}
        </p>
      </div>
    </td>
  )
}

CalendarDay.displayName = "CalendarDay"

export default React.memo(CalendarDay)
