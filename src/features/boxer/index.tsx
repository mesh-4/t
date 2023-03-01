import * as React from "react"

import BoxerBody from "./body"
import EventsLayer from "./events/layer"
import EventPlaceholder from "./events/placeholder"
import CurrentTimeIndicator from "./indicator/current-time"

function Boxer() {
  return (
    <EventsLayer>
      <CurrentTimeIndicator />
      <BoxerBody />
      <EventPlaceholder />
    </EventsLayer>
  )
}

export default Boxer
