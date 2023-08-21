"use client"

import EventsList from "./list"
import EventCreator from "./creator"

function Events() {
  return (
    <div className="flex flex-col h-full">
      <p className="mb-2 flex-none text-base font-bold">Events</p>
      <div className="flex flex-auto w-full h-full flex-col">
        <div className="mb-2 flex-none w-full">
          <EventCreator />
        </div>
        <div className="flex-auto w-full h-full">
          <EventsList />
        </div>
      </div>
    </div>
  )
}

Events.displayName = "Events"

export default Events
