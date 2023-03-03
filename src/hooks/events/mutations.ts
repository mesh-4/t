import { useMutation } from "@tanstack/react-query"

import { createEvent, updateEvent, deleteEvent } from "@/api/event"
import type { UpdateEventInput } from "@/types"

export const useCreateEvent = () => {
  return useMutation({
    mutationFn: createEvent,
  })
}

export const useUpdateEvent = () => {
  return useMutation({
    mutationFn: (input: { id: string } & UpdateEventInput) => {
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
