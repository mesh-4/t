import { fetcher } from "@/libs/fetcher"

import type { ReadEventParamsType, CreateEventPayloadType, UpdateEventPayloadType } from "@/features/events/schema"

export type Event = {
  id: string
  title: string
  start: number
  end: number
  createdAt: string
  updatedAt: string
}

export type CreateEventResponse = {
  data: Event
}

export const createEvent = async (data: CreateEventPayloadType) => {
  const res = await fetcher.post<CreateEventResponse>("/events", data)
  return res.data
}

export const updateEvent = async (id: Event["id"], data: UpdateEventPayloadType) => {
  const res = await fetcher.post<Event>(`/events/${id}`, data)
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

export type EventsResponse = {
  data: Event[]
  length: number
  hasNextPage: boolean
}

export const getEvents = async (query: ReadEventParamsType) => {
  const res = await fetcher.get<EventsResponse>("/events", {
    params: query,
  })
  return res.data
}
