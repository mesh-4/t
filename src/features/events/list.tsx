import * as React from "react"
import { Box } from "@chakra-ui/react"

import EventCreator from "./creator"

function EventsList() {
  return (
    <Box w="full">
      <EventCreator />
    </Box>
  )
}

EventsList.displayName = "EventsList"

export default React.memo(EventsList)
