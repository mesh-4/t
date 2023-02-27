import * as React from "react"
import { Box } from "@chakra-ui/react"

import { useStore } from "@/store"

type EventsCreateLayerProps = {
  getTimeline: () => {
    currentScroll: number
    topEdge: number
    bottomEdge: number
  }
}

function EventsCreateLayer({ getTimeline }: EventsCreateLayerProps) {
  const setLayer = useStore((state) => state.setLayer)
  const setPointer = useStore((state) => state.setPointer)

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (e.type !== "mousedown") {
      return
    }

    const { topEdge, currentScroll } = getTimeline()
    const startPoint = e.clientY + currentScroll - topEdge

    setPointer({
      start: startPoint,
      end: startPoint,
    })
    setLayer({
      isCreating: true,
    })
  }

  return <Box pos="absolute" top={2} left={0} h="calc(100% - 8px)" w="100%" onMouseDown={onMouseDown} />
}

EventsCreateLayer.displayName = "EventsCreateLayer"

export default React.memo(EventsCreateLayer)
