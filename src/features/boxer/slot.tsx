import * as React from "react"
import { Box } from "@chakra-ui/react"
import { isBefore } from "date-fns"

import { useStore } from "@/store"

const displayTime = (time: number) => {
  return time < 10 ? `0${time}` : time
}

type SlotProps = {
  idx: number
  date: string
  hour: number
}

function BoxerSlot({ idx, date, hour }: SlotProps) {
  const unit = useStore((state) => state.unit)
  const setDragging = useStore((state) => state.setDragging)
  const setPointer = useStore((state) => state.setPointer)
  const addEvent = useStore((state) => state.addEvent)
  const startId = useStore((state) => state.pointer.start.id)
  const resetPointer = useStore((state) => state.resetPointer)

  const minute = idx * unit

  const onMouseDown = (e: React.SyntheticEvent<HTMLDivElement>) => {
    e.preventDefault()

    if (e.type === "mousedown") {
      const startY = e.currentTarget.offsetTop

      setPointer({
        start: {
          y: startY,
          id: e.currentTarget.id,
        },
        end: {
          y: startY,
          id: "",
        },
      })
    } else {
      const latestId = e.currentTarget.id

      if (isBefore(new Date(startId), new Date(latestId))) {
        addEvent({
          start: startId,
          end: latestId,
        })
      } else {
        addEvent({
          start: latestId,
          end: startId,
        })
      }

      resetPointer()
    }

    setDragging(e.type === "mousedown")
  }

  return (
    <Box
      flex="none"
      w="100%"
      h="15px"
      id={`${date}-${displayTime(hour)}:${displayTime(minute)}`}
      borderTop={minute === 0 ? "2px" : "0px"}
      borderColor="gray.700"
      onMouseUp={onMouseDown}
      onMouseDown={onMouseDown}
    />
  )
}

export default React.memo(BoxerSlot)
