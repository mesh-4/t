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

export const HTTP_ERROR_CODES = {
  400: "bad_request",
  401: "unauthorized",
  403: "forbidden",
  404: "not_found",
  405: "method_not_allowed",
  406: "not_acceptable",
  407: "proxy_authentication_required",
  408: "request_timeout",
  409: "conflict",
  410: "gone",
  411: "length_required",
  412: "precondition_failed",
  413: "payload_too_large",
  414: "uri_too_long",
  415: "unsupported_media_type",
  416: "range_not_satisfiable",
  417: "expectation_failed",
  421: "misdirected_request",
  422: "unprocessable_entity",
  424: "failed_dependency",
  425: "too_early",
  426: "upgrade_required",
  428: "precondition_required",
  429: "too_many_requests",
  500: "internal",
} as const
export type HttpErrorCode = keyof typeof HTTP_ERROR_CODES

export const PRISMA_ERROR_CODES: Record<string, HttpErrorCode> = {
  P1008: 408,
  P2000: 400,
  P2001: 404,
  P2002: 409,
  P2003: 409,
  P2004: 409,
  P2005: 400,
  P2006: 400,
  P2007: 400,
  P2008: 500,
  P2009: 500,
  P2010: 500,
  P2011: 400,
  P2012: 400,
  P2013: 400,
  P2014: 409,
  P2015: 404,
  P2016: 500,
  P2017: 500,
  P2018: 404,
  P2019: 400,
  P2020: 400,
  P2021: 500,
  P2022: 500,
  P2023: 500,
  P2024: 408,
  P2025: 404,
  P2026: 500,
  P2027: 500,
  P2028: 500,
  P2030: 500,
  P2033: 500,
  P2034: 500,
}
