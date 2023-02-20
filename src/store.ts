import { create } from "zustand"

export type BoxEvent = {
  start: string
  end: string
}

type Pointer = {
  y: number
  id: string
}

type PointerSet = Record<"start" | "end", Pointer>

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
  isDragging: boolean
  setDragging: (isDragging: boolean) => void
  currentIdx: number
  setCurrentIdx: (idx: number) => void
  value: string
  setValue: (value: string) => void

  events: BoxEvent[]
  addEvent: (event: BoxEvent) => void

  pointer: PointerSet
  setPointer: (pointer: Partial<PointerSet>) => void
  resetPointer: () => void
}

export const useStore = create<Store>((set) => ({
  unit: 15,
  currentIdx: 0,
  setCurrentIdx: (idx: number) => set({ currentIdx: idx }),
  value: "",
  setValue: (value: string) => set({ value }),
  isDragging: false,
  setDragging: (isDragging: boolean) => set({ isDragging }),
  events: [],
  addEvent: (event) => set((state) => ({ events: [...state.events, event] })),
  pointer: DEFAULT_POINTER,
  setPointer: (pointer) => set((state) => ({ pointer: { ...state.pointer, ...pointer } })),
  resetPointer: () => set({ pointer: DEFAULT_POINTER }),
}))
