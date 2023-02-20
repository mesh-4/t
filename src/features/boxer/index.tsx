import * as React from "react"
import { Box, Flex, Text } from "@chakra-ui/react"

import { useStore, BoxEvent } from "@/store"

import BoxerBody from "./body"

function EventPlaceholder() {
  const isDragging = useStore((state) => state.isDragging)
  const endY = useStore((state) => state.pointer.end.y)
  const startY = useStore((state) => state.pointer.start.y)

  if (!isDragging) {
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

type EventBoxProps = {
  data: BoxEvent
}

function EventBox({ data }: EventBoxProps) {
  const startPoint = React.useMemo(() => {
    const element = document.getElementById(data.start)
    if (!element) return 0
    return element.offsetTop
  }, [])

  const endPoint = React.useMemo(() => {
    const element = document.getElementById(data.end)
    if (!element) return 0
    return element.offsetTop
  }, [])

  return (
    <Box
      pos="absolute"
      transformOrigin="bottom"
      borderRadius="md"
      width="20%"
      bg="blue.400"
      height={`${Math.abs(endPoint - startPoint)}px`}
      sx={{ top: startPoint, left: "60px", overflow: "hidden" }}>
      <Text px={1}>{data.start}</Text>
    </Box>
  )
}

// start: 10 ~ 200 / move down
// start: 200 ~ 10 / move up

function Boxer() {
  const events = useStore((state) => state.events)
  const isDragging = useStore((state) => state.isDragging)
  const setPointer = useStore((state) => state.setPointer)

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) {
      return
    }
    setPointer({
      end: {
        y: e.clientY + e.currentTarget.scrollTop - e.currentTarget.offsetTop,
        id: "",
      },
    })
  }

  return (
    <Flex w="100%" h="100%" pt={2} flexDir="column" pos="relative" onMouseMove={onMouseMove} overflowY="scroll">
      <EventPlaceholder />
      {events.map((event, idx) => (
        <EventBox key={`event-${idx}`} data={event} />
      ))}
      <BoxerBody date="2023/02/20" />
    </Flex>
  )
}

export default Boxer
