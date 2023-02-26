import * as React from "react"

import BoxerBody from "./body"
import EventDay from "./events/day"
import EventsLayer from "./events/layer"
import EventPlaceholder from "./events/placeholder"
import CurrentTimeIndicator from "./indicator"

function Boxer() {
  return (
    <EventsLayer>
      <CurrentTimeIndicator />
      <EventDay />
      <BoxerBody />
      <EventPlaceholder />
    </EventsLayer>
  )
}

export default Boxer
