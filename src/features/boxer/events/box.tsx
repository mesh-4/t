import * as React from "react"
import { format, isSameHour } from "date-fns"
import { Box, Flex, Text } from "@chakra-ui/react"

import { getYByTime } from "@/utils"
import { useStore, BoxEvent } from "@/store"

type EventBoxProps = {
  idx: number
  data: BoxEvent
}

function EventBox({ idx, data }: EventBoxProps) {
  const events = useStore((state) => state.events)
  const endY = useStore((state) => state.pointer.end)
  const layerTarget = useStore((state) => state.layer.target)

  const setLayer = useStore((state) => state.setLayer)
  const setPointer = useStore((state) => state.setPointer)

  const [startPoint, setStartPoint] = React.useState(getYByTime(data.start))
  const [endPoint, setEndPoint] = React.useState(getYByTime(data.end))

  const left = React.useMemo(() => {
    const date = data.start.split("-")[0]
    const hourEvents = events
      .filter((e) => e.start.startsWith(date))
      .filter((e) => isSameHour(new Date(e.start), new Date(date)))
    return (100 / hourEvents.length) * hourEvents.indexOf(data)
  }, [idx, data, events])

  React.useEffect(() => {
    if (layerTarget === data.id) {
      setEndPoint(endY)
    } else {
      setStartPoint(getYByTime(data.start))
      setEndPoint(getYByTime(data.end))
    }
  }, [endY, data, layerTarget])

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type !== "mousedown") return

    const startSlotY = getYByTime(data.start)
    const endSlotY = getYByTime(data.end)

    setLayer({
      status: "updating",
      target: data.id,
    })
    setPointer({
      start: startSlotY,
      end: endSlotY,
    })
  }

  return (
    <Box
      overflow="hidden"
      rounded="md"
      bg="rgba(49, 130, 206, 0.5)"
      pos="absolute"
      inset={`${startPoint}px 0% -${endPoint}px ${left}%`}
      zIndex={idx + 1}>
      <Flex pos="relative" px={1} height="100%" flexDir="column">
        <Flex flex="auto" flexDir={endPoint - startPoint > 25 ? "column" : "row"} w="100%" h="100%">
          <Text fontSize="sm" mr={2} lineHeight="20px">
            {format(new Date(data.start), "HH:mm")} ~ {format(new Date(data.end), "HH:mm")}
          </Text>
          <Text fontSize="sm" lineHeight="20px">
            {data.title}
          </Text>
        </Flex>
        <Box pos="absolute" bottom={0} w="100%" h="8px" cursor="row-resize" onMouseDown={onMouseDown} />
      </Flex>
    </Box>
  )
}

EventBox.displayName = "EventBox"

export default React.memo(EventBox)
