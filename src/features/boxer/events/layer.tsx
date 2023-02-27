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
  const isCreating = useStore((state) => state.layer.isCreating)
  const isUpdating = useStore((state) => state.layer.isUpdating)
  const setLayer = useStore((state) => state.setLayer)
  const createEvent = useStore((state) => state.createEvent)
  const updateEvent = useStore((state) => state.updateEvent)

  const date = useStore((state) => state.date)
  const getPointer = useStore((state) => state.getPointer)
  const setPointer = useStore((state) => state.setPointer)
  const resetPointer = useStore((state) => state.resetPointer)

  const timelineRef = React.useRef<HTMLDivElement>(null)

  const isInteracting = isCreating || isUpdating !== ""

  const getTimeline = useCallbackRef(() => {
    const offsetTop = timelineRef.current?.offsetTop ?? 0
    const scrollHeight = timelineRef.current?.scrollHeight ?? 0
    const currentScroll = timelineRef.current?.scrollTop ?? 0

    return {
      currentScroll,
      topEdge: offsetTop,
      bottomEdge: offsetTop + scrollHeight,
    }
  })

  const handleReset = useCallbackRef(() => {
    resetPointer()
    setLayer({
      isCreating: false,
      isUpdating: "",
      isDragging: false,
    })
  })

  const handleAction = React.useCallback(
    (clientY: number) => {
      const { topEdge, currentScroll } = getTimeline()
      const endY = clientY + currentScroll - topEdge

      if (isUpdating === "") {
        const startY = getPointer("start")
        createEvent({
          id: nanoid(),
          start: prefixWith(date)(getClosetSlotByY(Math.min(startY, endY))),
          end: prefixWith(date)(getClosetSlotByY(Math.max(startY, endY))),
        })
      } else {
        updateEvent(isUpdating, {
          end: prefixWith(date)(getClosetSlotByY(getPointer("end"))),
        })
      }
    },
    [date, isUpdating]
  )

  const handleMove = React.useCallback(
    (clientY: number) => {
      const { topEdge, bottomEdge, currentScroll } = getTimeline()
      const cursorY = clientY + currentScroll
      const previewY = cursorY - topEdge

      if (cursorY < topEdge || cursorY > bottomEdge) {
        handleReset()
        return
      }

      if (isUpdating === "") {
        setPointer({
          end: previewY,
        })
        return
      } else {
        if (previewY > getPointer("start") + 20) {
          setPointer({
            end: previewY,
          })
        }
      }
    },
    [isUpdating]
  )

  React.useEffect(() => {
    const handleMouseUp = (e: MouseEvent) => {
      if (e.target instanceof HTMLElement && !timelineRef.current?.contains(e.target) && isInteracting) {
        handleAction(e.clientY)
        handleReset()
      }
    }

    document.addEventListener("mouseup", handleMouseUp)
    return () => {
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isInteracting, handleAction])

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (e.target instanceof HTMLElement && !timelineRef.current?.contains(e.target) && isInteracting) {
        handleMove(e.clientY)
      }
    }
    document.addEventListener("mousemove", handleMouseMove)
    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
    }
  }, [isInteracting])

  const onMouseUp = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault()
      if (e.type !== "mouseup") return
      if (!isInteracting) return
      handleAction(e.clientY)
      handleReset()
    },
    [isInteracting]
  )

  const onMouseMove = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault()
      if (!isInteracting) return
      handleMove(e.clientY)
    },
    [isInteracting]
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
