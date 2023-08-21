import * as React from "react"

import { useStore } from "@/store"
import { getClosetSlotByY } from "@/utils"

function EventPlaceholder() {
  const endY = useStore((state) => state.pointer.end)
  const startY = useStore((state) => state.pointer.start)
  const layerStatus = useStore((state) => state.layer.status)

  if (layerStatus !== "creating") {
    return null
  }

  return (
    <div
      className="absolute left-[60px] w-[calc(100%-60px)] rounded-md bg-green-500/50 z-[9999] overflow-hidden pointer-events-none"
      style={{ top: `${Math.min(startY, endY)}px`, height: `${Math.abs(endY - startY)}px` }}>
      <p className="px-1 text-sm">
        {getClosetSlotByY(Math.min(startY, endY))} ~ {getClosetSlotByY(Math.max(startY, endY))}
      </p>
    </div>
  )
}

EventPlaceholder.displayName = "EventPlaceholder"

export default React.memo(EventPlaceholder)
