"use client"

import * as React from "react"
import { isSameDay } from "date-fns"
import { useQueryClient } from "@tanstack/react-query"

import { useStore } from "@/store"
import { TIMELINE_ID } from "@/constants"
import { useCallbackRef } from "@/hooks/use-callback-ref"
import { cn, prefixWith, getClosetSlotByY, getYByTime } from "@/utils"

import { useCreateEvent, useUpdateEvent } from "@/hooks/events/mutations"

import EventDay from "./day"
import EventsCreateLayer from "./create-layer"

type EventLayerProps = {
  className?: string
  children?: React.ReactNode
}

function EventsLayer({ className, children }: EventLayerProps) {
  const date = useStore((state) => state.date)

  const layerTarget = useStore((state) => state.layer.target)
  const layerStatus = useStore((state) => state.layer.status)
  const resetLayer = useStore((state) => state.resetLayer)

  const getPointer = useStore((state) => state.getPointer)
  const setPointer = useStore((state) => state.setPointer)
  const resetPointer = useStore((state) => state.resetPointer)

  const queryClient = useQueryClient()
  const { mutate: createEvent } = useCreateEvent()
  const { mutate: updateEvent } = useUpdateEvent()

  const timelineRef = React.useRef<HTMLDivElement>(null)
  const scrollMutateTimes = React.useRef(0)

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

  const handleAction = (clientY: number) => {
    if (layerStatus === "idle") return
    const { topEdge, currentScroll } = getTimeline()
    const endY = clientY + currentScroll - topEdge

    if (layerStatus === "creating") {
      const startY = getPointer("start")
      createEvent(
        {
          title: "New Event",
          start: new Date(prefixWith(date)(getClosetSlotByY(Math.min(startY, endY)))).toISOString(),
          end: new Date(prefixWith(date)(getClosetSlotByY(Math.max(startY, endY)))).toISOString(),
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ["events"],
            })
          },
        }
      )
    }

    if (layerStatus === "updating") {
      updateEvent(
        {
          id: layerTarget,
          end: new Date(prefixWith(date)(getClosetSlotByY(getPointer("end")))).toISOString(),
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ["events"],
            })
          },
        }
      )
    }
  }

  const handleMove = (clientY: number) => {
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
  }

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

  React.useEffect(() => {
    if (isSameDay(new Date(date), new Date()) && scrollMutateTimes.current === 0) {
      setTimeout(() => {
        if (timelineRef.current) {
          const target = getYByTime(Date.now())
          const offsetHeight = timelineRef.current.offsetHeight
          const scrollHeight = timelineRef.current.scrollHeight

          if (target > offsetHeight / 2 || target < scrollHeight - offsetHeight / 2) {
            timelineRef.current.scrollTop = getYByTime(Date.now()) - offsetHeight / 4
            scrollMutateTimes.current += 1
          }
        }
      }, 100)
    }
  }, [date])

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
    <div
      id={TIMELINE_ID}
      ref={timelineRef}
      className={cn("w-full h-full relative overflow-y-scroll", className)}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}>
      <div className="relative w-full">
        {children}
        <EventDay />
        <EventsCreateLayer getTimeline={getTimeline} />
      </div>
    </div>
  )
}

EventsLayer.displayName = "EventsLayer"

export default EventsLayer
