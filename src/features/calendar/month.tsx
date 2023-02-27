import * as React from "react"
import { Flex, Box } from "@chakra-ui/react"

import { useStore } from "@/store"

import CalendarDay from "./day"

import { addDays, startOfDay, startOfMonth, startOfWeek, endOfWeek, endOfMonth, eachDayOfInterval } from "date-fns"

type Week = Date[]

function takeWeek(start: Date = new Date()): () => Week {
  let date = startOfWeek(startOfDay(start))

  return () => {
    const result = eachDayOfInterval({
      start: date,
      end: endOfWeek(date),
    })
    date = addDays(result[6], 1)
    return result
  }
}

function takeMonth(start: Date = new Date()): () => Week[] {
  let month: Week[] = []
  let date = start

  function lastDayOfRange(range: Week[]): Date {
    return range[range.length - 1][6]
  }

  return () => {
    const weekGen = takeWeek(startOfMonth(date))
    const endDate = startOfDay(endOfWeek(endOfMonth(date)))
    month.push(weekGen())

    while (lastDayOfRange(month) < endDate) {
      month.push(weekGen())
    }

    const [range] = [month]
    month = []
    date = addDays(lastDayOfRange(range), 1)

    return range
  }
}
function CalendarMonth() {
  const date = useStore((state) => state.date)

  const slots = takeMonth(new Date(date))() as Array<Array<Date>>

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
