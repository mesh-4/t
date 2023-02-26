import * as React from "react"
import { Grid, Flex, Box, GridItem } from "@chakra-ui/react"
import { getWeeksInMonth, addDays, startOfDay, startOfMonth, startOfWeek, endOfWeek, endOfMonth } from "date-fns"

import { useStore } from "@/store"

import CalendarDay from "./day"

function takeWeek(start = new Date()) {
  let date = startOfWeek(startOfDay(start))

  return function () {
    const week = [...Array(7)].map((_, i) => addDays(date, i))
    date = addDays(week[6], 1)
    return week
  }
}

function takeMonth(start = new Date()) {
  let month: any = []
  let date = start

  function lastDayOfRange(range: any) {
    return range[range.length - 1][6]
  }

  return function () {
    const weekGen = takeWeek(startOfMonth(date))
    const endDate = startOfDay(endOfWeek(endOfMonth(date)))
    month.push(weekGen())

    while (lastDayOfRange(month) < endDate) {
      month.push(weekGen())
    }

    const range = month
    month = []
    date = addDays(lastDayOfRange(range), 1)

    return range
  }
}

function CalendarMonth() {
  const year = useStore((state) => state.year)
  const month = useStore((state) => state.month)

  // start day of month
  const start = new Date(`${year}/${month}/01`).getDay()

  // number of days in month
  const days = new Date(year, month, 0).getDate()

  // array of days in month
  const dateArray = Array.from({ length: days }, (_, i) => i + 1)

  const slots = takeMonth(new Date(year, month, 0))() as Array<Array<Date>>

  return (
    <Box as="tbody" role="rowgroup">
      {slots.map((week, i) => (
        <Flex key={`week-${i}`} as="tr" w="100%" role="row">
          {week.map((day, j) => (
            <CalendarDay key={`day-${j}`} date={day} />
          ))}
        </Flex>
      ))}
    </Box>
  )
}

CalendarMonth.displayName = "CalendarMonth"

export default React.memo(CalendarMonth)

/**
<Grid templateColumns="repeat(7, 1fr)" role="grid">
  {Array.from({ length: start }, (_, i) => (
    <GridItem key={i} tabIndex={-1} role="cell" aria-disabled="true" p={2} />
  ))}
  {dateArray.map((date) => (
    <CalendarDay key={date} year={year} month={month} day={date} />
  ))}
</Grid>
 */
