import * as React from "react"
import { format, eachDayOfInterval, startOfWeek, endOfWeek } from "date-fns"
import { Box, Flex, Text } from "@chakra-ui/react"

import CalendarHeader from "./header"
import CalendarMonth from "./month"

function CalendarWeek() {
  const weekStart = startOfWeek(new Date())
  const weekDays = eachDayOfInterval({ start: weekStart, end: endOfWeek(weekStart) })

  return (
    <Flex w="full" alignItems="center" aria-hidden="true" mb={2}>
      {weekDays.map((day) => (
        <Box key={day.toString()} flex="1" textAlign="center">
          <Text fontSize="sm" fontWeight={700}>
            {format(day, "EEE")}
          </Text>
        </Box>
      ))}
    </Flex>
  )
}

function Calendar() {
  return (
    <Flex flexDir="column">
      <CalendarHeader />
      <CalendarWeek />
      <CalendarMonth />
    </Flex>
  )
}

export default React.memo(Calendar)
