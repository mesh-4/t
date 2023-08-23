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
      <CurrentTimeIndicator />
      <BoxerTimeline />
      <EventPlaceholder />
    </EventsLayer>
  )
}

Boxer.displayName = "Boxer"

export default Boxer
