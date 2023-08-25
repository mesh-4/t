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

export const CreateEventInput = z.object({
  title: z.string(),
  note: z.string().optional(),
  start: z.string().optional(),
  end: z.string().optional(),
})

export const CreateEventPayload = CreateEventInput.extend({
  parentId: z.string().optional(),
  subEvents: CreateEventInput.array().optional(),
})
export type CreateEventPayloadType = z.infer<typeof CreateEventPayload>

export const UpdateEventPayload = z.object({
  title: z.string().optional(),
  note: z.string().optional(),
  start: z.string().optional().nullable(),
  end: z.string().optional().nullable(),
  parentId: z.string().optional(),
})
export type UpdateEventPayloadType = z.infer<typeof UpdateEventPayload>
