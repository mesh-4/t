import { create } from "zustand"

export type BoxEvent = {
  start: string
  end: string
}

type Pointer = {
  y: number
  id: string
}

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

  pointer: {
    start: Pointer
    end: Pointer
  }
  setPointer: (
    pointer: Partial<{
      start: Pointer
      end: Pointer
    }>
  ) => void
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
  addEvent: (event: BoxEvent) => set((state) => ({ events: [...state.events, event] })),
  pointer: {
    start: {
      id: "",
      y: 0,
    },
    end: {
      id: "",
      y: 0,
    },
  },
  setPointer: (pointer) => set((state) => ({ pointer: { ...state.pointer, ...pointer } })),
}))
