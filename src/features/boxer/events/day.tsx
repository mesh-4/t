import * as React from "react"
import { Box } from "@chakra-ui/react"

import { useStore } from "@/store"

import EventBox from "./box"

function EventsDay() {
  const eventsInSameDate = useStore((state) => state.eventsInSameDate())

  return (
    <Box pos="absolute" top={2} left="60px" right={0}>
      {eventsInSameDate.map((event, idx) => (
        <EventBox key={event.id} idx={idx} data={event} />
      ))}
    </Box>
  )
}

EventsDay.displayName = "EventsDay"

export default React.memo(EventsDay)
