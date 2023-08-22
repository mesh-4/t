import * as React from "react"
import { format, isSameHour } from "date-fns"

import { useStore } from "@/store"
import { cn, getYByTime } from "@/utils"
import type { Event } from "@/api/event"

type EventBoxProps = {
  idx: number
  data: Event
  listData?: Event[]
}

function EventBox({ idx, data, listData = [] }: EventBoxProps) {
  const endY = useStore((state) => state.pointer.end)
  const layerTarget = useStore((state) => state.layer.target)

  const setLayer = useStore((state) => state.setLayer)
  const setPointer = useStore((state) => state.setPointer)

  const [startPoint, setStartPoint] = React.useState(getYByTime(data.start))
  const [endPoint, setEndPoint] = React.useState(getYByTime(data.end))

  const left = React.useMemo(() => {
    const hourEvents = listData.filter((e) => isSameHour(new Date(e.start), new Date(data.start)))
    return (100 / hourEvents.length) * hourEvents.indexOf(data)
  }, [idx, data, listData])

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
    <div
      className=" overflow-hidden rounded-sm bg-blue-400/50 absolute"
      style={{ inset: `${startPoint}px 0% -${endPoint}px ${left}%`, zIndex: idx + 1 }}>
      <div className="relative flex flex-col px-1 h-full">
        <div className={cn("flex flex-auto w-full h-full", endPoint - startPoint > 25 ? "flex-col" : "flex-row")}>
          <p className="text-sm leading-[20px] mr-2">
            {format(new Date(data.start), "HH:mm")} ~ {format(new Date(data.end), "HH:mm")}
          </p>
          <p className="text-sm leading-[20px]">{data.title}</p>
        </div>
        <div className="absolute bottom-0 w-full h-2 cursor-row-resize" onMouseDown={onMouseDown} />
      </div>
    </div>
  )
}

EventBox.displayName = "EventBox"

export default React.memo(EventBox)
