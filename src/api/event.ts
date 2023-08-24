import { fetcher } from "@/libs/fetcher"

import type { ReadEventParamsType, CreateEventPayloadType, UpdateEventPayloadType } from "@/features/events/schema"

export type Event = {
  id: string
  createdAt: string
  updatedAt: string
  title: string
  note: string | null
  start?: string | null
  end?: string | null
}

export type DateRange = {
  start: string
  end: string
}

export type CreateEventResponse = {
  data: Event
}

export const createEvent = async (data: CreateEventPayloadType) => {
  const res = await fetcher.post<CreateEventResponse>("/events", data)
  return res.data
}

export const updateEvent = async (id: Event["id"], data: UpdateEventPayloadType) => {
  const res = await fetcher.put<Event>(`/events/${id}`, data)
  return res.data
}

export const deleteEvent = async (id: Event["id"]) => {
  const res = await fetcher.delete(`/events/${id}`)
  return res
}

export const getEvent = async (id: Event["id"]) => {
  const res = await fetcher.get<Event>(`/events/${id}`)
  return res.data
}

export type EventsResponse<T = Event> = {
  data: T[]
  length: number
  hasNextPage: boolean
}

export const getEvents = async <T = Event>(query: ReadEventParamsType) => {
  const res = await fetcher.get<EventsResponse<T>>("/events", {
    params: query,
  })
  return res.data
}

export type DateEventsResponse = {
  data: (Event & DateRange)[]
}

export const getEventsByDate = async (date: string) => {
  const res = await fetcher.get<DateEventsResponse>(`/events/date/${date}`)
  return res.data
}
