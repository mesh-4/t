import DisplayToday from "@/features/date/display-today"

import BoxerTimeline from "./timeline"
import EventsLayer from "./events/layer"
import EventPlaceholder from "./events/placeholder"
import CurrentTimeIndicator from "./indicator/current-time"

type BoxerProps = {
  layerClassName?: string
}

function Boxer({ layerClassName }: BoxerProps) {
  return (
    <EventsLayer className={layerClassName}>
      <DisplayToday>
        <CurrentTimeIndicator />
      </DisplayToday>
      <BoxerTimeline />
      <EventPlaceholder />
    </EventsLayer>
  )
}

Boxer.displayName = "Boxer"

export default Boxer
