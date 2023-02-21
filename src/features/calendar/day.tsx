import * as React from "react"
import { format, isSameDay } from "date-fns"
import { GridItem, Flex, Text } from "@chakra-ui/react"

import { useStore } from "@/store"

type CalendarDayProps = {
  year: number
  month: number
  day: number
}

function CalendarDay({ year, month, day }: CalendarDayProps) {
  const setDate = useStore((state) => state.setDate)
  const selectedDate = useStore((state) => state.date)

  const dateString = `${year}/${month}/${day}`

  const isSelected = isSameDay(new Date(selectedDate), new Date(dateString))

  const onDateChange = () => {
    setDate(dateString)
  }

  return (
    <GridItem tabIndex={-1} pos="relative" role="gridcell">
      <Flex alignItems="center" justifyContent="center">
        <Text
          role="button"
          fontSize="sm"
          onClick={onDateChange}
          {...(isSelected && {
            px: 1,
            bg: "red.500",
            color: "white",
            rounded: "full",
          })}>
          {day}
        </Text>
      </Flex>
    </GridItem>
  )
}

CalendarDay.displayName = "CalendarDay"

export default React.memo(CalendarDay)
