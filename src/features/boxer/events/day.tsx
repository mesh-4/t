import * as React from "react"
import { Box, Flex } from "@chakra-ui/react"

import { useStore } from "@/store"

import EventBox from "./box"

function EventsDay() {
  const eventsInSameDate = useStore((state) => state.eventsInSameDate())

  return (
    <Flex w="100%" h="100%" pos="absolute" top={0} left="60px" cursor="pointer">
      <Box w="calc(100% - 60px)" pos="relative">
        {eventsInSameDate.map((event, idx) => (
          <EventBox key={event.id} idx={idx} data={event} />
        ))}
      </Box>
    </Flex>
  )
}

EventsDay.displayName = "EventsDay"

export default React.memo(EventsDay)
