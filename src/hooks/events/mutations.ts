import { useMutation } from "@tanstack/react-query"

import { createEvent, updateEvent, deleteEvent } from "@/api/event"
import type { UpdateEventPayloadType } from "@/features/events/schema"

export const useCreateEvent = () => {
  return useMutation({
    mutationFn: createEvent,
  })
}

export const useUpdateEvent = () => {
  return useMutation({
    mutationFn: (input: { id: string } & UpdateEventPayloadType) => {
      const { id, ...data } = input
      return updateEvent(id, data)
    },
  })
}

export const useDeleteEvent = () => {
  return useMutation({
    mutationFn: deleteEvent,
  })
}
