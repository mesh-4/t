import * as React from "react"
import { Box, Text } from "@chakra-ui/react"

import { useStore } from "@/store"
import { getClosetSlotByY } from "@/utils"

function EventPlaceholder() {
  const endY = useStore((state) => state.pointer.end)
  const startY = useStore((state) => state.pointer.start)
  const layerStatus = useStore((state) => state.layer.status)

  if (layerStatus !== "creating") {
    return null
  }

  return (
    <Box
      pos="absolute"
      left="60px"
      top={`${Math.min(startY, endY)}px`}
      w="calc(100% - 60px)"
      h={`${Math.abs(endY - startY)}px`}
      bg="rgba(72, 187, 120, 0.5)"
      rounded="md"
      zIndex="9999"
      overflow="hidden"
      pointerEvents="none">
      <Text px={1} fontSize="sm">
        {getClosetSlotByY(Math.min(startY, endY))} ~ {getClosetSlotByY(Math.max(startY, endY))}
      </Text>
    </Box>
  )
}

EventPlaceholder.displayName = "EventPlaceholder"

export default React.memo(EventPlaceholder)
