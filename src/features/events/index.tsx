import * as React from "react"
import { Box, Heading } from "@chakra-ui/react"

import EventsList from "./list"

function Events() {
  return (
    <Box>
      <Heading mb={2} size="md">
        Events
      </Heading>
      <EventsList />
    </Box>
  )
}

export default React.memo(Events)
