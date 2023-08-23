"use client"

import * as React from "react"
import { isSameDay } from "date-fns"

import { getYByTime } from "@/utils"
import { useStore } from "@/store"

function CurrentTimeIndicator() {
  const focusDate = useStore((state) => state.date)
  const rAF = React.useRef<number>(0)
  const indicatorRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const tick = () => {
      if (indicatorRef.current) {
        if (!isSameDay(new Date(focusDate), new Date())) {
          indicatorRef.current.style.display = "none"
          return
        }

        indicatorRef.current.style.display = "flex"
        indicatorRef.current.style.top = `${getYByTime(Date.now()) + 8}px`
      }
      rAF.current = requestAnimationFrame(tick)
    }

    rAF.current = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rAF.current)
    }
  }, [focusDate])

  return (
    <div
      ref={indicatorRef}
      className="hidden flex-none w-full select-none items-center absolute left-0 z-[30] -translate-y-1/2">
      <div className="flex-none w-[30px]" />
      <div className="flex-auto w-full relative">
        <div className="w-full h-[1px] bg-red-500" />
        <div className="w-2 h-2 bg-red-500 rounded-full absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2" />
      </div>
    </div>
  )
}

CurrentTimeIndicator.displayName = "CurrentTimeIndicator"

export default React.memo(CurrentTimeIndicator)
