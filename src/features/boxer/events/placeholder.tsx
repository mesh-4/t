import * as React from "react"
import { Box, Text } from "@chakra-ui/react"

import { useStore } from "@/store"

function EventPlaceholder() {
  const isDragging = useStore((state) => state.isDragging)
  const editEvent = useStore((state) => state.editEvent)
  const endY = useStore((state) => state.pointer.end.y)
  const startY = useStore((state) => state.pointer.start.y)

  if (!isDragging && editEvent !== "") {
    return null
  }

  return (
    <Box
      pos="absolute"
      left="60px"
      top={`${Math.min(startY, endY)}px`}
      transformOrigin="bottom"
      borderRadius="md"
      width="20%"
      height={`${Math.abs(endY - startY)}px`}
      bg="blue.400"
      overflow="hidden">
      <Text px={1}>test</Text>
    </Box>
  )
}

EventPlaceholder.displayName = "EventPlaceholder"

export default React.memo(EventPlaceholder)
