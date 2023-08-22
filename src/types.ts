import type { Event } from "@prisma/client"

export type CreateEventInput = {
  title: string
  start?: string
  end?: string
}

export type UpdateEventInput = {
  title?: string
  start?: string
  end?: string
}

export type ReadEventsQuery = {
  date?: string
  page?: string
  limit?: string
  order?: "asc" | "desc"
  orderBy?: keyof Event
}

export type ErrorResp = {
  error: {
    source?: string
    msg: string
  }
}

export type HttpMethod = "GET" | "DELETE" | "HEAD" | "OPTIONS" | "POST" | "PUT" | "PATCH" | "PURGE" | "LINK" | "UNLINK"
