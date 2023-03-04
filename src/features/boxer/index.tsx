import * as React from "react"

import BoxerTimeline from "./timeline"
import EventsLayer from "./events/layer"
import EventPlaceholder from "./events/placeholder"
import CurrentTimeIndicator from "./indicator/current-time"
import { useStore } from "@/store"
import { isSameDay } from "date-fns"

function Boxer() {
  const date = useStore((state) => state.date)

  return (
    <EventsLayer>
      {isSameDay(new Date(date), new Date()) && <CurrentTimeIndicator />}
      <BoxerTimeline />
      <EventPlaceholder />
    </EventsLayer>
  )
}

Boxer.displayName = "Boxer"

export default React.memo(Boxer)
