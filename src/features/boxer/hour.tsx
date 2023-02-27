import * as React from "react"
import padStart from "lodash/padStart"
import { Box, Flex, Text } from "@chakra-ui/react"

import { useStore } from "@/store"

import BoxerSlot from "./slot"

type BoxerHourProps = {
  date: string
  hour: number
}

function BoxerHour({ date, hour }: BoxerHourProps) {
  const unit = useStore((state) => state.unit)

  return (
    <Flex flex="none" w="100%" userSelect="none">
      <Box w="60px" pos="relative" flex="none">
        <Text fontSize="sm" lineHeight="none" transform="translateY(-50%)">
          {padStart(hour.toString(), 2, "0")}:00
        </Text>
      </Box>
      <Box width="100%" flex="auto">
        {Array.from({ length: 60 / unit }, (_, i) => (
          <BoxerSlot key={i} idx={i} date={date} hour={hour} />
        ))}
      </Box>
    </Flex>
  )
}

BoxerHour.displayName = "BoxerHour"

export default React.memo(BoxerHour)
