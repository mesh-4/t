import * as React from "react"
import { format, eachDayOfInterval, startOfWeek, endOfWeek, isSameDay } from "date-fns"
import { Box, Flex, Text, Grid, GridItem } from "@chakra-ui/react"

import { useStore } from "@/store"

function CalendarHeader() {
  const date = useStore((state) => state.date)

  return (
    <Box mb={2} pl={3}>
      <Text fontWeight={700}>{format(new Date(date), "yyyy MMMM")}</Text>
    </Box>
  )
}

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

type CalendarDayProps = {
  date: string
}

function CalendarDay({ date }: CalendarDayProps) {
  const displayDay = format(new Date(date), "d")
  const selectedDate = useStore((state) => state.date)
  const setDate = useStore((state) => state.setDate)

  const isSelected = isSameDay(new Date(selectedDate), new Date(date))

  const onDateChange = () => {
    setDate(date)
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
          {displayDay}
        </Text>
      </Flex>
    </GridItem>
  )
}

function CalendarBody() {
  const dateString = useStore((state) => state.date)
  const [year, month] = dateString.split("/")

  // start day of month
  const start = new Date(`${year}/${month}/01`).getDay()

  // number of days in month
  const days = new Date(+year, +month, 0).getDate()

  // array of days in month
  const dateArray = Array.from({ length: days }, (_, i) => `${year}/${month}/${i + 1 < 10 ? "0" : ""}${i + 1}`)

  return (
    <Grid templateColumns="repeat(7, 1fr)" role="grid">
      {Array.from({ length: start }, (_, i) => (
        <GridItem key={i} tabIndex={-1} role="gridcell" aria-disabled="true" p={2} />
      ))}
      {dateArray.map((date) => (
        <CalendarDay key={date} date={date} />
      ))}
    </Grid>
  )
}

function Calendar() {
  return (
    <Flex flexDir="column">
      <CalendarHeader />
      <CalendarWeek />
      <CalendarBody />
    </Flex>
  )
}

export default React.memo(Calendar)
