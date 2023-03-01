import * as React from "react"
import { Box, Text } from "@chakra-ui/react"

import EventsList from "./list"

function Events() {
  return (
    <Box>
      <Text mb={2} fontSize="md" fontWeight="bold">
        Events
      </Text>
      <EventsList />
    </Box>
  )
}

export default React.memo(Events)
