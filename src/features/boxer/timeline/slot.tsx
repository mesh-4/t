import * as React from "react"
import { ListChildComponentProps, areEqual } from "react-window"

import { cn } from "@/utils"

function TimelineSlot({ data, index, style }: ListChildComponentProps<string[]>) {
  const label = data[index]
  const [hour, minutes] = label.split(":")
  const startOfHour = minutes === "00"

  return (
    <div style={style}>
      <div className={cn("flex w-full h-full select-none", index === 0 ? "pt-2" : "pt-0")}>
        <div className={cn("flex-none relative", startOfHour ? "w-[30px]" : "w-[35px]")}>
          {startOfHour && <p className="text-sm leading-none -translate-y-1/2">{hour.toString().padStart(2, "0")}</p>}
        </div>
        <div
          id={label}
          className={cn(
            "flex-auto w-full border-gray-300 dark:border-gray-700",
            startOfHour ? "border-t-2" : "border-t-[1px]"
          )}
        />
      </div>
    </div>
  )
}

TimelineSlot.displayName = "TimelineSlot"

export default React.memo(TimelineSlot, areEqual)
