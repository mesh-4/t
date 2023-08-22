import { notFound } from "next/navigation"

import { useSessionUser } from "@/auth/get-session-user"

import { getEventById } from "./models"

type EventParams = {
  eventId: string
}

export default async function EventEditor({ params }: { params: EventParams }) {
  const user = await useSessionUser()
  if (!user) {
    notFound()
  }

  const event = await getEventById({ userId: user.id, eventId: params.eventId })
  if (!event) {
    notFound()
  }

  return (
    <div>
      <p> {event.id}</p>
      <p> {event.title}</p>
    </div>
  )
}
