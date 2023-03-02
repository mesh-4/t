import * as React from "react"
import { Box, Flex, Text } from "@chakra-ui/react"
import { ListChildComponentProps, areEqual } from "react-window"

function TimelineSlot({ data, index, style }: ListChildComponentProps<string[]>) {
  const label = data[index]
  const [hour, minutes] = label.split(":")
  const startOfHour = minutes === "00"

  return (
    <div style={style}>
      <Flex w="100%" h="100%" pt={index === 0 ? 2 : 0} userSelect="none">
        <Box flex="none" w="60px" pos="relative">
          {startOfHour && (
            <Text fontSize="sm" lineHeight="none" transform="translateY(-50%)">
              {hour.toString().padStart(2, "0")}:00
            </Text>
          )}
        </Box>
        <Box flex="auto" w="100%" id={label} borderTop={startOfHour ? "2px" : "1px"} borderColor="gray.700" />
      </Flex>
    </div>
  )
}

TimelineSlot.displayName = "TimelineSlot"

export default React.memo(TimelineSlot, areEqual)
