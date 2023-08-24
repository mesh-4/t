import * as React from "react"

import { useStore } from "@/store"
import { calculateEventPositioning } from "@/utils/algorithm/slot-events"
import { useEventsOfDate } from "@/hooks/events/queries"

import EventBox from "./box"

function EventsDay() {
  const date = useStore((state) => state.date)
  const { data: events } = useEventsOfDate(date.replace(/\//g, "-"))

  const eventSlots = React.useMemo(() => {
    return calculateEventPositioning(events)
  }, [events])

  return (
    <div className="absolute top-2 left-[35px] right-0">
      {eventSlots.map((event, idx) => (
        <EventBox key={event.id} idx={idx} data={event} left={event.left || "0%"} listData={events} />
      ))}
    </div>
  )
}

EventsDay.displayName = "EventsDay"

export default React.memo(EventsDay)
