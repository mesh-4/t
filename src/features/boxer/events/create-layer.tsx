import * as React from "react"

import { useStore } from "@/store"

type EventsCreateLayerProps = {
  getTimeline: () => {
    topEdge: number
    bottomEdge: number
    currentScroll: number
  }
}

function EventsCreateLayer({ getTimeline }: EventsCreateLayerProps) {
  const setLayer = useStore((state) => state.setLayer)
  const setPointer = useStore((state) => state.setPointer)

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (e.type !== "mousedown") return

    const { topEdge, currentScroll } = getTimeline()
    const startPoint = e.clientY + currentScroll - topEdge

    setPointer({
      start: startPoint,
      end: startPoint,
    })
    setLayer({
      status: "creating",
    })
  }

  return (
    <div
      style={{
        position: "absolute",
        top: "8px",
        left: 0,
        width: "100%",
        height: "calc(100% - 8px)",
      }}
      onMouseDown={onMouseDown}
    />
  )
}

EventsCreateLayer.displayName = "EventsCreateLayer"

export default React.memo(EventsCreateLayer)
