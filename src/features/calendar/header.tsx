import * as React from "react"
import { format } from "date-fns"
import { Box, Text } from "@chakra-ui/react"

import { useStore } from "@/store"

function CalendarHeader() {
  const year = useStore((state) => state.year)
  const month = useStore((state) => state.month)

  return (
    <Box mb={2} pl={3}>
      <Text fontWeight={700}>{format(new Date(`${year}/${month}/01`), "yyyy MMMM")}</Text>
    </Box>
  )
}

CalendarHeader.displayName = "CalendarHeader"

export default React.memo(CalendarHeader)
