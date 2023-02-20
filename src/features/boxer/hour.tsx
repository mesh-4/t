import * as React from "react"
import { Box, Flex, Text } from "@chakra-ui/react"

import { useStore } from "@/store"

import BoxerSlot from "./slot"

const displayTime = (time: number) => {
  return time < 10 ? `0${time}` : time
}

type HourProps = {
  date: string
  hour: number
}

function Hour({ date, hour }: HourProps) {
  const unit = useStore((state) => state.unit)

  return (
    <Flex flex="none" w="100%" userSelect="none">
      <Box w="60px" pos="relative" flex="none">
        <Text fontSize="sm" lineHeight="none" transform="translateY(-50%)">
          {displayTime(hour)}:00
        </Text>
      </Box>
      <Box width="100%" flex="auto" cursor="pointer">
        {Array.from({ length: 60 / unit }, (_, i) => (
          <BoxerSlot key={i} idx={i} date={date} hour={hour} />
        ))}
      </Box>
    </Flex>
  )
}

export default React.memo(Hour)
