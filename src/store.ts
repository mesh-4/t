import { create } from "zustand"
import { format, isSameHour } from "date-fns"
import { nanoid } from "nanoid"
import merge from "lodash/merge"

import { prefixWith } from "@/utils"
import { getClosetSlotByY } from "@/features/boxer/metrics"

export type BoxEvent = {
  id: string
  start: string
  end: string
}

type Pointer = {
  y: number
  id: string
}

type PointerSet = Record<"start" | "end", Pointer>
type PointerEditSet = Record<"start" | "end", Partial<Pointer>>

const DEFAULT_POINTER = {
  start: {
    id: "",
    y: 0,
  },
  end: {
    id: "",
    y: 0,
  },
} as PointerSet

type Store = {
  unit: number

  direction?: "top" | "bottom"
  setDirection: (direction: "top" | "bottom") => void
  resetDirection: () => void

  isDragging: boolean
  setDragging: (isDragging: boolean) => void

  events: BoxEvent[]
  eventsInDay: () => BoxEvent[]
  eventsInSameHour: (date: string) => BoxEvent[]
  addEvent: (event: BoxEvent) => void
  createEvent: (endY: number) => void
  updateEvent: (id: string, event: Partial<Omit<BoxEvent, "id">>) => void
  updateEventViaPointer: (id: string) => void
  editEvent: string
  setEditEvent: (event: BoxEvent["id"]) => void

  pointer: PointerSet
  setPointer: (pointer: Partial<PointerSet>) => void
  updatePointer: (pointer: Partial<PointerEditSet>) => void
  resetPointer: () => void

  year: number
  setYear: (year: number) => void
  month: number
  setMonth: (month: number) => void
  date: string
  setDate: (date: string) => void
}

export const useStore = create<Store>((set, get) => ({
  unit: 15,

  direction: undefined,
  setDirection: (direction) => set({ direction }),
  resetDirection: () => set({ direction: undefined }),

  isDragging: false,
  setDragging: (isDragging: boolean) => set({ isDragging }),

  events: [],
  createEvent: (endY: number) =>
    set((state) => {
      const startY = state.pointer.start.y
      return {
        events: [
          ...state.events,
          {
            id: nanoid(),
            ...(startY < endY
              ? {
                  start: prefixWith(state.date)(getClosetSlotByY(startY)),
                  end: prefixWith(state.date)(getClosetSlotByY(endY)),
                }
              : {
                  start: prefixWith(state.date)(getClosetSlotByY(endY)),
                  end: prefixWith(state.date)(getClosetSlotByY(startY)),
                }),
          },
        ],
      }
    }),
  addEvent: (event) => set((state) => ({ events: [...state.events, event] })),
  updateEvent: (id, event) =>
    set((state) => ({ events: state.events.map((e) => (e.id === id ? merge(e, event) : e)) })),
  updateEventViaPointer: (id) => {
    return set((state) => {
      const { end } = state.pointer
      const { events } = state

      const event = events.find((e) => e.id === id)
      if (!event) return { events }

      const endSlot = getClosetSlotByY(end.y)

      const updatedEvent = {
        ...event,
        end: prefixWith(state.date)(endSlot),
      }

      return {
        events: events.map((e) => (e.id === id ? updatedEvent : e)),
      }
    })
  },
  eventsInDay: () => {
    const events = get().events
    const date = get().date

    return events.filter((e) => e.start.startsWith(date))
  },
  eventsInSameHour: (date) => {
    const events = get().eventsInDay()
    return events.filter((e) => isSameHour(new Date(e.start), new Date(date)))
  },

  editEvent: "",
  setEditEvent: (id) => set({ editEvent: id }),

  pointer: DEFAULT_POINTER,
  setPointer: (pointer) => set((state) => ({ pointer: { ...state.pointer, ...pointer } })),
  updatePointer: (pointer) =>
    set((state) => ({
      pointer: {
        start: {
          ...state.pointer.start,
          ...pointer.start,
        },
        end: {
          ...state.pointer.end,
          ...pointer.end,
        },
      },
    })),
  resetPointer: () => set({ pointer: DEFAULT_POINTER }),

  year: new Date().getFullYear(),
  setYear: (year) => set({ year }),
  month: new Date().getMonth() + 1,
  setMonth: (month) => set({ month }),
  date: format(new Date(), "yyyy/MM/dd"),
  setDate: (date) => set({ date }),
}))
