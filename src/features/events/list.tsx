import * as React from "react"
import { Box } from "@chakra-ui/react"

import { useStore } from "@/store"

import EventCreator from "./creator"
import EventListItem from "./list-item"

function EventsList() {
  const events = useStore((state) => state.events)

  return (
    <Box w="full">
      <EventCreator />
      {events.map((event) => (
        <EventListItem key={event.id} data={event} />
      ))}
    </Box>
  )
}

EventsList.displayName = "EventsList"

export default React.memo(EventsList)
