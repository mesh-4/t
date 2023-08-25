import { createContext, useContext } from "react"

import type { WheelMode, Option, PickerValue } from "./types"

type PickerDataContextData = {
  height: number
  itemHeight: number
  wheelMode: WheelMode
  value: PickerValue
  optionGroups: { [key: string]: Option[] }
} | null

export const PickerDataContext = createContext<PickerDataContextData>(null)

export function usePickerData(componentName: string) {
  const context = useContext(PickerDataContext)
  if (context === null) {
    const error = new Error(`<${componentName} /> is missing a parent <Picker /> component.`)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(error, usePickerData)
    }
    throw error
  }
  return context
}

type PickerActionsContextData = {
  registerOption(key: string, option: Option): () => void
  change(key: string, value: string): boolean
} | null

export const PickerActionsContext = createContext<PickerActionsContextData>(null)

export function usePickerActions(componentName: string) {
  const context = useContext(PickerActionsContext)
  if (context === null) {
    const error = new Error(`<${componentName} /> is missing a parent <Picker /> component.`)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(error, usePickerActions)
    }
    throw error
  }
  return context
}

type PickerColumnDataContextData = {
  key: string
} | null

export const PickerColumnDataContext = createContext<PickerColumnDataContextData>(null)

export function useColumnData(componentName: string) {
  const context = useContext(PickerColumnDataContext)
  if (context === null) {
    const error = new Error(`<${componentName} /> is missing a parent <Picker.Column /> component.`)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(error, useColumnData)
    }
    throw error
  }
  return context
}
