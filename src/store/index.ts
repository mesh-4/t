import { create } from "zustand"
import { format, isSameHour, minutesToMilliseconds } from "date-fns"
import merge from "lodash/merge"
import { nanoid } from "nanoid"

export type BoxEvent = {
  id: string
  title: string
  start: string
  end: string
}

export type CreateBoxEventInput = {
  title: string
  start?: string
  end?: string
}

export type Pointer = {
  start: number
  end: number
}

const DEFAULT_POINTER = {
  start: 0,
  end: 0,
} as Pointer

type Layer = {
  status: "idle" | "creating" | "updating"
  target: string
}

const DEFAULT_LAYER = {
  status: "idle",
  target: "",
} as Layer

const DEFAULT_DATE = format(new Date(), "yyyy/MM/dd")

type Store = {
  unit: number

  date: string
  setDate: (date: string) => void

  layer: Layer
  setLayer: (layer: Partial<Layer>) => void
  resetLayer: () => void

  pointer: Pointer
  setPointer: (pointer: Partial<Pointer>) => void
  getPointer: (field: keyof Pointer) => number
  resetPointer: () => void

  events: BoxEvent[]
  eventsInSameDate: () => BoxEvent[]
  eventsInSameHour: (date: string) => BoxEvent[]
  createEvent: (input: CreateBoxEventInput) => void
  updateEvent: (id: string, event: Partial<Omit<BoxEvent, "id">>) => void
  deleteEvent: (id: string) => void
}

export const useStore = create<Store>((set, get) => ({
  unit: 15,

  date: DEFAULT_DATE,
  setDate: (date) => set({ date }),

  layer: DEFAULT_LAYER,
  setLayer: (layer) => set((state) => ({ layer: { ...state.layer, ...layer } })),
  resetLayer: () => set({ layer: DEFAULT_LAYER }),

  pointer: DEFAULT_POINTER,
  setPointer: (pointer) => set((state) => ({ pointer: { ...state.pointer, ...pointer } })),
  getPointer: (field) => get().pointer[field],
  resetPointer: () => set({ pointer: DEFAULT_POINTER }),

  events: [],
  eventsInSameDate: () => {
    const date = get().date
    const events = get().events
    return events.filter((e) => e.start.startsWith(date))
  },
  eventsInSameHour: (date) => {
    const events = get().eventsInSameDate()
    return events.filter((e) => isSameHour(new Date(e.start), new Date(date)))
  },
  createEvent: (input) => {
    const createTime = Date.now()

    // * find nearest 15 minutes
    const nearestSlot = Math.round(createTime / minutesToMilliseconds(15)) * minutesToMilliseconds(15)

    const event = {
      id: nanoid(),
      title: input.title,
      start: input.start || format(nearestSlot, "yyyy/MM/dd HH:mm"),
      end: input.end || format(nearestSlot + minutesToMilliseconds(15), "yyyy/MM/dd HH:mm"),
    }

    return set((state) => ({
      events: [...state.events, event],
    }))
  },
  updateEvent: (id, event) =>
    set((state) => ({ events: state.events.map((e) => (e.id === id ? merge(e, event) : e)) })),
  deleteEvent: (id) => set((state) => ({ events: state.events.filter((e) => e.id !== id) })),
}))
