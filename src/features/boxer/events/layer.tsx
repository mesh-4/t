import * as React from "react"
import { Box } from "@chakra-ui/react"

import { useStore } from "@/store"
import { TIMELINE_ID } from "@/constants"
import { useCallbackRef } from "@/hooks/use-callback-ref"

type EventLayerProps = {
  children?: React.ReactNode
}

function EventsLayer({ children }: EventLayerProps) {
  const editEvent = useStore((state) => state.editEvent)
  const setEditEvent = useStore((state) => state.setEditEvent)
  const createEvent = useStore((state) => state.createEvent)
  const updateEvent = useStore((state) => state.updateEventViaPointer)

  const startY = useStore((state) => state.pointer.start.y)
  const setPointer = useStore((state) => state.setPointer)
  const resetPointer = useStore((state) => state.resetPointer)
  const updatePointer = useStore((state) => state.updatePointer)

  const isDragging = useStore((state) => state.isDragging)
  const setDragging = useStore((state) => state.setDragging)

  const targetRef = React.useRef<HTMLDivElement>(null)
  const timelineRef = React.useRef<HTMLDivElement>(null)

  const getTimelineTop = React.useCallback(() => {
    const height = timelineRef.current?.scrollHeight ?? 0
    const offset = timelineRef.current?.offsetTop ?? 0
    const scroll = timelineRef.current?.scrollTop ?? 0

    return {
      offset,
      scroll,
      height,
      topEdge: offset,
      bottomEdge: offset + height,
    }
  }, [])

  const handleReset = useCallbackRef(() => {
    resetPointer()
    setEditEvent("")
    setDragging(false)
  })

  const handleAction = (clientY: number) => {
    const { offset, scroll } = getTimelineTop()
    const cursorY = clientY + scroll
    const endPoint = cursorY - offset

    if (editEvent === "") {
      createEvent(endPoint)
    } else {
      updateEvent(editEvent)
    }
  }

  const handleMove = (clientY: number) => {
    const { offset, scroll, topEdge, bottomEdge } = getTimelineTop()
    const cursorY = clientY + scroll
    const previewY = cursorY - offset

    if (cursorY < topEdge || cursorY > bottomEdge) {
      handleReset()
      return
    }

    if (editEvent === "") {
      setPointer({
        end: {
          y: previewY,
          id: "",
        },
      })
      return
    } else {
      if (cursorY > startY + 15) {
        updatePointer({
          end: {
            y: previewY,
          },
        })
      }
    }
  }

  React.useEffect(() => {
    const handleMouseUp = (e: MouseEvent) => {
      if (e.target instanceof HTMLElement && !targetRef.current?.contains(e.target) && isDragging) {
        handleAction(e.clientY)
        handleReset()
      }
    }

    document.addEventListener("mouseup", handleMouseUp)
    return () => {
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging])

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (e.target instanceof HTMLElement && !targetRef.current?.contains(e.target) && isDragging) {
        handleMove(e.clientY)
      }
    }

    document.addEventListener("mousemove", handleMouseMove)
    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
    }
  }, [isDragging])

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (!isDragging) return
    handleMove(e.clientY)
  }

  const onMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (e.type !== "mouseup") return
    handleAction(e.clientY)
    handleReset()
  }

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (e.type !== "mousedown") return
    const { offset, scroll } = getTimelineTop()
    const cursorY = e.clientY + scroll
    const startPoint = cursorY - offset
    updatePointer({
      start: {
        y: startPoint,
      },
      end: {
        y: startPoint,
      },
    })
    setDragging(true)
  }

  const onMouseLeave = () => {}

  return (
    <Box
      w="100%"
      h="100%"
      pt={2}
      id={TIMELINE_ID}
      ref={timelineRef}
      flexDir="column"
      pos="relative"
      overflowY="scroll"
      onMouseUp={onMouseUp}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}>
      {children}
    </Box>
  )
}

EventsLayer.displayName = "EventsLayer"

export default React.memo(EventsLayer)
