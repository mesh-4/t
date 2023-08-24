import type { Event, DateRange } from "@/api/event"

function isOverlapping(a: Event & DateRange, b: Event & DateRange) {
  return new Date(a.start) < new Date(b.end) && new Date(b.start) < new Date(a.end)
}

type Position = {
  left: string | null
}

export function calculateEventPositioning(events: (Event & DateRange)[]) {
  let positionedEvents = events.map((e) => ({ ...e, left: null })) as (Event & DateRange & Position)[]

  positionedEvents.forEach((event) => {
    if (event.left !== null) return

    const overlappingEvents = positionedEvents.filter((e) => e.id !== event.id && isOverlapping(event, e))

    // Including the current event in the overlapping count
    const totalOverlapping = overlappingEvents.length + 1
    const width = 100 / totalOverlapping

    // Setting position for the current event
    event.left = `${0}%`

    // Setting position for other overlapping events
    overlappingEvents.forEach((e, idx) => {
      if (e.left === null) {
        e.left = `${width * (idx + 1)}%`
      }
    })
  })

  return positionedEvents
}
