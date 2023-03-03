import { create } from "zustand"
import { format } from "date-fns"

import type { Layer, Pointer } from "./types"

const DEFAULT_POINTER = {
  start: 0,
  end: 0,
} as Pointer

const DEFAULT_LAYER = {
  status: "idle",
  target: "",
} as Layer

const DEFAULT_DATE = format(new Date(), "yyyy/MM/dd")

type Store = {
  date: string
  setDate: (date: string) => void

  layer: Layer
  setLayer: (layer: Partial<Layer>) => void
  resetLayer: () => void

  pointer: Pointer
  setPointer: (pointer: Partial<Pointer>) => void
  getPointer: (field: keyof Pointer) => number
  resetPointer: () => void
}

export const useStore = create<Store>((set, get) => ({
  date: DEFAULT_DATE,
  setDate: (date) => set({ date }),

  layer: DEFAULT_LAYER,
  setLayer: (layer) => set((state) => ({ layer: { ...state.layer, ...layer } })),
  resetLayer: () => set({ layer: DEFAULT_LAYER }),

  pointer: DEFAULT_POINTER,
  setPointer: (pointer) => set((state) => ({ pointer: { ...state.pointer, ...pointer } })),
  getPointer: (field) => get().pointer[field],
  resetPointer: () => set({ pointer: DEFAULT_POINTER }),
}))
