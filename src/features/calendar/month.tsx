import * as React from "react"
import { Grid, GridItem } from "@chakra-ui/react"

import { useStore } from "@/store"

import CalendarDay from "./day"

function CalendarMonth() {
  const year = useStore((state) => state.year)
  const month = useStore((state) => state.month)

  // start day of month
  const start = new Date(`${year}/${month}/01`).getDay()

  // number of days in month
  const days = new Date(year, month, 0).getDate()

  // array of days in month
  const dateArray = Array.from({ length: days }, (_, i) => i + 1)

  return (
    <Grid templateColumns="repeat(7, 1fr)" role="grid">
      {Array.from({ length: start }, (_, i) => (
        <GridItem key={i} tabIndex={-1} role="gridcell" aria-disabled="true" p={2} />
      ))}
      {dateArray.map((date) => (
        <CalendarDay key={date} year={year} month={month} day={date} />
      ))}
    </Grid>
  )
}

CalendarMonth.displayName = "CalendarMonth"

export default React.memo(CalendarMonth)
