"use client"

import * as React from "react"
import { format, eachDayOfInterval, startOfWeek, endOfWeek } from "date-fns"

import CalendarHeader from "./header"
import CalendarMonth from "./month"

function CalendarWeek() {
  const weekStart = startOfWeek(new Date())
  const weekDays = eachDayOfInterval({ start: weekStart, end: endOfWeek(weekStart) })

  return (
    <thead>
      <tr className="mb-2 flex w-full items-center" aria-hidden="true">
        {weekDays.map((day) => (
          <th key={day.toString()} className="flex-1 text-center">
            <p className="text-sm font-semibold">{format(day, "EEE")}</p>
          </th>
        ))}
      </tr>
    </thead>
  )
}

function Calendar() {
  return (
    <div className="flex flex-col">
      <div className="px-3 mb-2">
        <CalendarHeader />
      </div>
      <table role="grid">
        <CalendarWeek />
        <CalendarMonth />
      </table>
    </div>
  )
}

export default React.memo(Calendar)
