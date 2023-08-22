"use client"

import * as React from "react"
import { format } from "date-fns"

import { useStore } from "@/store"

function CalendarHeader() {
  const date = useStore((state) => state.date)

  return (
    <div>
      <p className=" font-semibold">{format(new Date(date), "yyyy MMMM")}</p>
    </div>
  )
}

CalendarHeader.displayName = "CalendarHeader"

export default React.memo(CalendarHeader)
