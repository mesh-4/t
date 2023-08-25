import * as React from "react"

import { cn } from "@/utils"

import { isFunc } from "./utils"
import { usePickerActions, usePickerData, useColumnData } from "./context"

type PickerItemRenderProps = {
  selected: boolean
}

export type PickerItemProps = {
  children: React.ReactNode | ((renderProps: PickerItemRenderProps) => React.ReactNode)
  value: string
} & Omit<React.HTMLProps<HTMLDivElement>, "value" | "children">

function PickerItem({ style, children, className, value, ...restProps }: PickerItemProps) {
  const optionRef = React.useRef<HTMLDivElement | null>(null)

  const { itemHeight, value: pickerValue } = usePickerData("Picker.Item")
  const pickerActions = usePickerActions("Picker.Item")
  const { key } = useColumnData("Picker.Item")

  React.useEffect(() => pickerActions.registerOption(key, { value, element: optionRef }), [key, pickerActions, value])

  const handleClick = React.useCallback(() => {
    pickerActions.change(key, value)
  }, [pickerActions, key, value])

  return (
    <div
      ref={optionRef}
      onClick={handleClick}
      className={cn("flex items-center justify-center", className)}
      style={{ height: `${itemHeight}px`, ...style }}
      {...restProps}>
      {isFunc(children) ? children({ selected: pickerValue[key] === value }) : children}
    </div>
  )
}

export default PickerItem
