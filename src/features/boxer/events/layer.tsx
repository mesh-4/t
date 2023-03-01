import * as React from "react"
import { nanoid } from "nanoid"
import { Box } from "@chakra-ui/react"

import { useStore } from "@/store"
import { TIMELINE_ID } from "@/constants"
import { useCallbackRef } from "@/hooks/use-callback-ref"
import { prefixWith, getClosetSlotByY } from "@/utils"
import EventDay from "./day"
import EventsCreateLayer from "./create-layer"

type EventLayerProps = {
  children?: React.ReactNode
}

function EventsLayer({ children }: EventLayerProps) {
  const date = useStore((state) => state.date)

  const layerTarget = useStore((state) => state.layer.target)
  const layerStatus = useStore((state) => state.layer.status)
  const resetLayer = useStore((state) => state.resetLayer)

  const createEvent = useStore((state) => state.createEvent)
  const updateEvent = useStore((state) => state.updateEvent)

  const getPointer = useStore((state) => state.getPointer)
  const setPointer = useStore((state) => state.setPointer)
  const resetPointer = useStore((state) => state.resetPointer)

  const timelineRef = React.useRef<HTMLDivElement>(null)

  const getTimeline = useCallbackRef(() => {
    const offsetTop = timelineRef.current?.offsetTop ?? 0
    const scrollHeight = timelineRef.current?.scrollHeight ?? 0
    const currentScroll = timelineRef.current?.scrollTop ?? 0

    return {
      topEdge: offsetTop,
      bottomEdge: offsetTop + scrollHeight,
      currentScroll,
    }
  })

  const handleReset = useCallbackRef(() => {
    resetPointer()
    resetLayer()
  })

  const handleAction = React.useCallback(
    (clientY: number) => {
      if (layerStatus === "idle") return
      const { topEdge, currentScroll } = getTimeline()
      const endY = clientY + currentScroll - topEdge

      if (layerStatus === "creating") {
        const startY = getPointer("start")
        createEvent({
          title: "New Event",
          start: prefixWith(date)(getClosetSlotByY(Math.min(startY, endY))),
          end: prefixWith(date)(getClosetSlotByY(Math.max(startY, endY))),
        })
      }

      if (layerStatus === "updating") {
        updateEvent(layerTarget, {
          end: prefixWith(date)(getClosetSlotByY(getPointer("end"))),
        })
      }
    },
    [date, layerStatus, layerTarget]
  )

  const handleMove = React.useCallback(
    (clientY: number) => {
      if (layerStatus === "idle") return
      const { topEdge, bottomEdge, currentScroll } = getTimeline()
      const cursorY = clientY + currentScroll
      const previewY = cursorY - topEdge

      if (cursorY < topEdge || cursorY > bottomEdge) {
        handleReset()
        return
      }

      if (layerStatus === "creating") {
        setPointer({
          end: previewY,
        })
      }

      if (layerStatus === "updating") {
        if (previewY > getPointer("start") + 20) {
          setPointer({
            end: previewY,
          })
        }
      }
    },
    [layerStatus]
  )

  React.useEffect(() => {
    const handleMouseUp = (e: MouseEvent) => {
      if (e.target instanceof HTMLElement && !timelineRef.current?.contains(e.target)) {
        handleAction(e.clientY)
        handleReset()
      }
    }

    document.addEventListener("mouseup", handleMouseUp)
    return () => {
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [handleAction])

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (e.target instanceof HTMLElement && !timelineRef.current?.contains(e.target)) {
        handleMove(e.clientY)
      }
    }

    document.addEventListener("mousemove", handleMouseMove)
    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
    }
  }, [handleMove])

  React.useEffect(() => {
    document.addEventListener("resize", handleReset)
    return () => {
      document.removeEventListener("resize", handleReset)
    }
  }, [])

  const onMouseUp = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault()
      if (e.type !== "mouseup") return
      handleAction(e.clientY)
      handleReset()
    },
    [handleAction]
  )

  const onMouseMove = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault()
      handleMove(e.clientY)
    },
    [handleMove]
  )

  return (
    <Box
      id={TIMELINE_ID}
      ref={timelineRef}
      w="100%"
      h="100%"
      pos="relative"
      overflowY="scroll"
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}>
      <Box pos="relative" pt={2}>
        {children}
        <EventDay />
        <EventsCreateLayer getTimeline={getTimeline} />
      </Box>
    </Box>
  )
}

EventsLayer.displayName = "EventsLayer"

export default React.memo(EventsLayer)
