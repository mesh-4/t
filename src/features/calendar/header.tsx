import * as React from "react"
import { format } from "date-fns"
import { Box, Text } from "@chakra-ui/react"

import { useStore } from "@/store"

function CalendarHeader() {
  const date = useStore((state) => state.date)

  return (
    <Box mb={2} pl={3}>
      <Text fontWeight={700}>{format(new Date(date), "yyyy MMMM")}</Text>
    </Box>
  )
}

CalendarHeader.displayName = "CalendarHeader"

export default React.memo(CalendarHeader)
