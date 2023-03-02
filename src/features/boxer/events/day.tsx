import * as React from "react"
import { Box } from "@chakra-ui/react"

import { useStore } from "@/store"

import EventBox from "./box"

function EventsDay() {
  const date = useStore((state) => state.date)
  const events = useStore((state) => state.events)

  const data = React.useMemo(() => {
    return events.filter((event) => event.start.startsWith(date))
  }, [date, events])

  return (
    <Box pos="absolute" top={2} left="60px" right={0}>
      {data.map((event, idx) => (
        <EventBox key={event.id} idx={idx} data={event} />
      ))}
    </Box>
  )
}

EventsDay.displayName = "EventsDay"

export default React.memo(EventsDay)
