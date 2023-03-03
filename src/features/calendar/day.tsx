import * as React from "react"
import { format, isSameDay, isSameMonth, subDays, addDays } from "date-fns"
import { Box, Flex, Text } from "@chakra-ui/react"

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
    <Box as="td" flex={1} tabIndex={isSelected ? 0 : -1} role="gridcell" pos="relative" onKeyDown={onKeyDown}>
      <Flex alignItems="center" justifyContent="center">
        <Text
          role="button"
          fontSize="sm"
          width="21px"
          textAlign="center"
          onClick={onDateChange}
          opacity={isSameMonth(date, new Date(currentDate)) ? 1 : 0.5}
          {...(isSelected && {
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
