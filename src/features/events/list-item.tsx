import * as React from "react"
import { Flex, Text } from "@chakra-ui/react"

import { BoxEvent } from "@/store"

type EventListItemProps = {
  data: BoxEvent
}

function EventListItem({ data }: EventListItemProps) {
  return (
    <Flex mt={2} py={2} px={4} alignItems="center">
      <Text>{data.title}</Text>
    </Flex>
  )
}

EventListItem.displayName = "EventListItem"

export default React.memo(EventListItem)
