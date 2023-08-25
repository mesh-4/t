import type { MutableRefObject } from "react"

export type WheelMode = "off" | "natural" | "normal"

export type Option = {
  value: string
  element: MutableRefObject<HTMLElement | null>
}

export type PickerValue = {
  [key: string]: string
}
