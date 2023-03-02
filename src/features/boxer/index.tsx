import * as React from "react"

import BoxerTimeline from "./timeline"
import EventsLayer from "./events/layer"
import EventPlaceholder from "./events/placeholder"
import CurrentTimeIndicator from "./indicator/current-time"

function Boxer() {
  return (
    <EventsLayer>
      <CurrentTimeIndicator />
      <BoxerTimeline />
      <EventPlaceholder />
    </EventsLayer>
  )
}

Boxer.displayName = "Boxer"

export default React.memo(Boxer)
