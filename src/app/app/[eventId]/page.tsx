import { notFound } from "next/navigation"

import EventEditor from "@/features/events/editor"
import EventDeleteButton from "@/features/events/delete-button"
import { useSessionUser } from "@/auth/get-session-user"

import { getEventById } from "./models"

type EventParams = {
  eventId: string
}

export default async function EventEdit({ params }: { params: EventParams }) {
  const user = await useSessionUser()
  if (!user) {
    notFound()
  }

  const event = await getEventById({ userId: user.id, eventId: params.eventId })
  if (!event) {
    notFound()
  }

  return (
    <div className="flex flex-col">
      <div className="flex-none flex w-full h-12 px-3 items-center border-b justify-end">
        <EventDeleteButton eventId={event.id} />
      </div>
      <div className="flex-auto h-full p-2">
        <EventEditor
          data={{
            ...event,
            createdAt: event.createdAt.toISOString(),
            updatedAt: event.updatedAt.toISOString(),
            start: event.start?.toISOString(),
            end: event.end?.toISOString(),
          }}
        />
      </div>
    </div>
  )
}
