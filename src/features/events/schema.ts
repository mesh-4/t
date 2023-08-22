import { z } from "zod"

export const ReadEventParams = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
  date: z.string().optional(),
  order: z.string().optional(),
  orderBy: z.string().optional(),
})

export const CreateEventPayload = z.object({
  title: z.string(),
  note: z.string().optional(),
  start: z.string().optional(),
  end: z.string().optional(),
})

export const UpdateEventPayload = z.object({
  title: z.string().optional(),
  note: z.string().optional(),
  start: z.string().optional(),
  end: z.string().optional(),
})
