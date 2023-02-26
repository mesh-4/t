import * as React from "react"
import { Box, Flex } from "@chakra-ui/react"

import { useStore } from "@/store"

import EventBox from "./box"

function EventsDay() {
  const eventsInDay = useStore((state) => state.eventsInDay())

  return (
    <Flex w="100%" h="100%" pos="absolute" top={0} left="60px" cursor="pointer">
      <Box w="calc(100% - 60px)" pos="relative">
        {eventsInDay.map((event, idx) => (
          <EventBox key={event.id} idx={idx} data={event} />
        ))}
      </Box>
    </Flex>
  )
}

export default EventsDay
