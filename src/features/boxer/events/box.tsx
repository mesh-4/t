import * as React from "react"
import { format } from "date-fns"
import { Box, Flex, Text } from "@chakra-ui/react"

import { useStore, BoxEvent } from "@/store"
import { getSlotY } from "@/utils"

type EventBoxProps = {
  idx: number
  data: BoxEvent
}

function EventBox({ idx, data }: EventBoxProps) {
  const endY = useStore((state) => state.pointer.end.y)
  const editEvent = useStore((state) => state.editEvent)
  const setEditEvent = useStore((state) => state.setEditEvent)
  const setPointer = useStore((state) => state.setPointer)
  const setDragging = useStore((state) => state.setDragging)
  const eventsInSameHour = useStore((state) => state.eventsInSameHour)

  const [startPoint, setStartPoint] = React.useState(getSlotY(data.start))
  const [endPoint, setEndPoint] = React.useState(getSlotY(data.end))

  const size = React.useMemo(() => {
    const events = eventsInSameHour(data.start)
    const width = 100 / events.length
    const left = (100 / events.length) * events.indexOf(data)
    console.log({ width, left })
    return { width, left }
  }, [data.start, idx])

  React.useEffect(() => {
    setStartPoint(getSlotY(data.start))
    setEndPoint(getSlotY(data.end))
  }, [data.start, data.end])

  React.useEffect(() => {
    if (editEvent === data.id) {
      setEndPoint(endY)
    }
  }, [endY, editEvent])

  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type !== "mousedown") return

    setEditEvent(data.id)
    setPointer({
      start: {
        y: document.getElementById(data.start)?.offsetTop ?? 0,
        id: data.start,
      },
      end: {
        y: document.getElementById(data.end)?.offsetTop ?? 0,
        id: data.end,
      },
    })
    setDragging(true)
  }

  const onClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    console.log("clicked")
  }

  return (
    <Box
      pos="absolute"
      transformOrigin="bottom"
      borderRadius="md"
      width={`${size.width}%`}
      bg="rgba(49, 130, 206, 0.5)"
      top={`${startPoint}px`}
      left={`${size.left}%`}
      overflow="hidden"
      zIndex={idx + 1}
      height={`${Math.abs(endPoint - startPoint)}px`}>
      <Flex pos="relative" px={1} height="100%" flexDir="column">
        <Box flex="auto" w="100%" h="100%" onClick={onClick}>
          <Text fontSize="sm">
            {format(new Date(data.start), "p")} ~ {format(new Date(data.end), "p")}
          </Text>
        </Box>
        <Box flex="none" w="100%" h="16px" cursor="grab" onMouseDown={onMouseDown} />
      </Flex>
    </Box>
  )
}

EventBox.displayName = "EventBox"

export default React.memo(EventBox)
