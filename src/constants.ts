import type { QueryClientConfig } from "@tanstack/react-query"

export const QUERY_CLIENT_CONFIG: QueryClientConfig = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
}

export const TIMELINE_ID = "timeline"

// TODO make it configurable dynamically
export const SLOT_UNIT = 15 // 1 slot represents 15 minutes

export const SLOT_HEIGHT = 20

export const HOUR_OF_SLOTS = 4

export const SUM_OF_SLOTS = HOUR_OF_SLOTS * 24 // 24 hours, 4 slots per hour

export const SLOTS_HEIGHT = SLOT_HEIGHT * SUM_OF_SLOTS

export const SLOT_LABELS = Array.from({ length: SUM_OF_SLOTS }, (_, idx) => {
  const hour = Math.floor(idx / HOUR_OF_SLOTS)
  const minute = (idx % HOUR_OF_SLOTS) * SLOT_UNIT

  return hour.toString().padStart(2, "0").concat(":", minute.toString().padStart(2, "0"))
})
