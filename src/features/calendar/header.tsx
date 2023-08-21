import * as React from "react"
import { format } from "date-fns"

import { useStore } from "@/store"

function CalendarHeader() {
  const date = useStore((state) => state.date)

  return (
    <div className="mb-2 pl-3">
      <p className=" font-semibold">{format(new Date(date), "yyyy MMMM")}</p>
    </div>
  )
}

CalendarHeader.displayName = "CalendarHeader"

export default React.memo(CalendarHeader)
