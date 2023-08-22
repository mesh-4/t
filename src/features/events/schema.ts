import { z } from "zod"

const OrderEnum = z.enum(["asc", "desc"])

export const ReadEventParams = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
  date: z.string().optional(),
  order: OrderEnum.optional(),
  orderBy: z.string().optional(),
})
export type ReadEventParamsType = z.infer<typeof ReadEventParams>

export const CreateEventPayload = z.object({
  title: z.string(),
  note: z.string().optional(),
  start: z.string().optional(),
  end: z.string().optional(),
})
export type CreateEventPayloadType = z.infer<typeof CreateEventPayload>

export const UpdateEventPayload = z.object({
  title: z.string().optional(),
  note: z.string().optional(),
  start: z.string().optional(),
  end: z.string().optional(),
})
export type UpdateEventPayloadType = z.infer<typeof UpdateEventPayload>
