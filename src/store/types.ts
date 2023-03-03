export type BoxEvent = {
  id: string
  title: string
  start: string
  end: string
  createdAt: number
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

export type Layer = {
  status: "idle" | "creating" | "updating"
  target: string
}
