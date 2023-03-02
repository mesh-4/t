import * as React from "react"
import { Box, Flex } from "@chakra-ui/react"

import { getYByTime } from "@/utils"

function CurrentTimeIndicator() {
  const rAF = React.useRef<number>(0)
  const indicatorRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const tick = () => {
      if (indicatorRef.current) {
        indicatorRef.current.style.display = "flex"
        indicatorRef.current.style.top = `${getYByTime(Date.now()) + 8}px`
      }
      rAF.current = requestAnimationFrame(tick)
    }

    rAF.current = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rAF.current)
    }
  }, [])

  return (
    <Flex
      ref={indicatorRef}
      display="none"
      flex="none"
      w="100%"
      userSelect="none"
      align="center"
      pos="absolute"
      left="0px"
      zIndex="docked"
      transform="translateY(-50%)">
      <Box w="60px" flex="none" />
      <Box w="100%" flex="auto" pos="relative">
        <Box w="100%" h="1px" bg="red.500" />
        <Box
          w="8px"
          h="8px"
          bg="red.500"
          rounded="full"
          pos="absolute"
          top="0px"
          left="0px"
          transform="translate(-50%, -50%)"
        />
      </Box>
    </Flex>
  )
}

CurrentTimeIndicator.displayName = "CurrentTimeIndicator"

export default React.memo(CurrentTimeIndicator)
