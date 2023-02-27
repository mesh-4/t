import * as React from "react"
import { nanoid } from "nanoid"
import { Box } from "@chakra-ui/react"

import { useStore } from "@/store"
import { TIMELINE_ID } from "@/constants"
import { useCallbackRef } from "@/hooks/use-callback-ref"
import { prefixWith, getClosetSlotByY } from "@/utils"

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
  const startY = useStore((state) => state.pointer.start)
  const getPointer = useStore((state) => state.getPointer)
  const setPointer = useStore((state) => state.setPointer)
  const resetPointer = useStore((state) => state.resetPointer)

  const targetRef = React.useRef<HTMLDivElement>(null)
  const timelineRef = React.useRef<HTMLDivElement>(null)

  const getTimeline = React.useCallback(() => {
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

  const isInteracting = isCreating || isUpdating !== ""

  const handleReset = useCallbackRef(() => {
    resetPointer()
    setLayer({
      isCreating: false,
      isUpdating: "",
    })
  })

  const handleAction = (clientY: number) => {
    const { topEdge, scroll } = getTimeline()
    const cursorY = clientY + scroll
    const endY = cursorY - topEdge

    if (isUpdating === "") {
      createEvent({
        id: nanoid(),
        start: prefixWith(date)(getClosetSlotByY(getPointer("start"))),
        end: prefixWith(date)(getClosetSlotByY(endY)),
      })
    } else {
      updateEvent(isUpdating, {
        end: prefixWith(date)(getClosetSlotByY(endY)),
      })
    }
  }

  const handleMove = (clientY: number) => {
    const { scroll, topEdge, bottomEdge } = getTimeline()
    const cursorY = clientY + scroll
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
      if (cursorY > getPointer("start") + 15) {
        setPointer({
          end: previewY,
        })
      }
    }
  }

  React.useEffect(() => {
    const handleMouseUp = (e: MouseEvent) => {
      if (e.target instanceof HTMLElement && !targetRef.current?.contains(e.target) && isInteracting) {
        handleAction(e.clientY)
        handleReset()
      }
    }

    document.addEventListener("mouseup", handleMouseUp)
    return () => {
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isCreating])

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (e.target instanceof HTMLElement && !targetRef.current?.contains(e.target) && isInteracting) {
        handleMove(e.clientY)
      }
    }

    document.addEventListener("mousemove", handleMouseMove)
    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
    }
  }, [isCreating])

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (!isInteracting) return
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
    const { topEdge, scroll } = getTimeline()
    const cursorY = e.clientY + scroll
    const startPoint = cursorY - topEdge
    setPointer({
      start: startPoint,
      end: startPoint,
    })
    setLayer({
      isCreating: true,
    })
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
