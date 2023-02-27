import * as React from "react"
import { format, isSameDay, isSameMonth } from "date-fns"
import { Box, Flex, Text } from "@chakra-ui/react"

import { useStore } from "@/store"

type CalendarDayProps = {
  date: Date
}

function CalendarDay({ date }: CalendarDayProps) {
  const currentDate = useStore((state) => state.date)
  const setDate = useStore((state) => state.setDate)

  const dateString = format(date, "yyyy-MM-dd")

  const isSelected = isSameDay(new Date(currentDate), new Date(dateString))

  const onDateChange = () => {
    setDate(dateString)
  }

  return (
    <Box as="td" flex={1} tabIndex={isSelected ? 0 : -1} role="gridcell" pos="relative">
      <Flex alignItems="center" justifyContent="center">
        <Text
          role="button"
          fontSize="sm"
          onClick={onDateChange}
          opacity={isSameMonth(date, new Date(currentDate)) ? 1 : 0.5}
          {...(isSelected && {
            px: 1,
            bg: "red.500",
            color: "white",
            rounded: "full",
          })}>
          {date.getDate()}
        </Text>
      </Flex>
    </Box>
  )
}

CalendarDay.displayName = "CalendarDay"

export default React.memo(CalendarDay)
