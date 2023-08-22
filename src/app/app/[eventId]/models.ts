import { cache } from "react"
import "server-only"

import prisma from "@/libs/prisma"

type GetEventParams = {
  userId: string
  eventId: string
}

export const preload = (params: GetEventParams) => {
  void getEventById(params)
}

export const getEventById = cache(async (params: GetEventParams) => {
  const event = await prisma.event.findUnique({
    where: {
      userId: params.userId,
      id: params.eventId,
    },
  })
  return event
})
