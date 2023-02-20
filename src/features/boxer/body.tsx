import * as React from "react"
import { Box, Flex, Text } from "@chakra-ui/react"

import { useStore } from "@/store"

const displayTime = (time: number) => {
  return time < 10 ? `0${time}` : time
}

type SlotProps = {
  idx: number
  date: string
  hour: number
}

function Slot({ idx, date, hour }: SlotProps) {
  const unit = useStore((state) => state.unit)
  const setDragging = useStore((state) => state.setDragging)
  const setPointer = useStore((state) => state.setPointer)
  const addEvent = useStore((state) => state.addEvent)
  const pointer = useStore((state) => state.pointer)

  const minute = idx * unit
  const elementId = `${date}-${displayTime(hour)}:${displayTime(minute)}`

  const onMouseUp = (e: React.SyntheticEvent<HTMLDivElement>) => {
    e.stopPropagation()
    setDragging(false)

    console.log({
      start: pointer.start.id,
      end: e.currentTarget.id,
    })

    addEvent({
      start: pointer.start.id,
      end: e.currentTarget.id,
    })
    setPointer({
      start: {
        y: 0,
        id: "",
      },
      end: {
        y: 0,
        id: "",
      },
    })
  }

  const onMouseDown = (e: React.SyntheticEvent<HTMLDivElement>) => {
    e.stopPropagation()

    const startY = e.currentTarget.offsetTop
    setPointer({
      start: {
        y: startY,
        id: elementId,
      },
      end: {
        y: startY,
        id: "",
      },
    })
    setDragging(true)
  }

  return (
    <Box
      flex="none"
      w="100%"
      h="15px"
      id={elementId}
      borderTop={minute === 0 ? "2px" : "0px"}
      borderColor="gray.700"
      onMouseUp={onMouseUp}
      onMouseDown={onMouseDown}
    />
  )
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
          <Slot key={i} idx={i} date={date} hour={hour} />
        ))}
      </Box>
    </Flex>
  )
}

// start: 10 ~ 200 / move down
// start: 200 ~ 10 / move up

type BoxerBodyProps = {
  date: string
}

function BoxerBody({ date }: BoxerBodyProps) {
  return (
    <>
      {Array.from({ length: 24 }, (_, i) => (
        <Hour key={i} date={date} hour={i} />
      ))}
    </>
  )
}

export default React.memo(BoxerBody)
