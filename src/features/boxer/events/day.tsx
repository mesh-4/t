import * as React from "react"
import { Box } from "@chakra-ui/react"

import { useStore } from "@/store"
import { useEventsOfDate } from "@/hooks/events/queries"

import EventBox from "./box"

function EventsDay() {
  const date = useStore((state) => state.date)
  const { data: events } = useEventsOfDate(date)

  return (
    <Box pos="absolute" top={2} left="60px" right={0}>
      {events.map((event, idx) => (
        <EventBox key={event.id} idx={idx} data={event} listData={events} />
      ))}
    </Box>
  )
}

EventsDay.displayName = "EventsDay"

export default React.memo(EventsDay)
