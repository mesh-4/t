import * as React from "react"
import { Box, Flex, Text } from "@chakra-ui/react"

import EventsList from "./list"
import EventCreator from "./creator"

function Events() {
  return (
    <Flex h="full" flexDir="column">
      <Text mb={2} flex="none" fontSize="md" fontWeight="bold">
        Events
      </Text>
      <Flex flex="auto" w="full" h="100%" flexDir="column">
        <Box mb={2} flex="none" w="full">
          <EventCreator />
        </Box>
        <Box flex="auto" w="full" h="full">
          <EventsList />
        </Box>
      </Flex>
    </Flex>
  )
}

Events.displayName = "Events"

export default React.memo(Events)
