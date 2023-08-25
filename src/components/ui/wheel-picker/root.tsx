import { CSSProperties, HTMLProps, useCallback, useMemo, useReducer } from "react"

import { sortByDomNode } from "./utils"
import { DEFAULT_HEIGHT, DEFAULT_ITEM_HEIGHT, DEFAULT_WHEEL_MODE } from "./constants"
import { PickerDataContext, PickerActionsContext } from "./context"
import type { WheelMode, Option, PickerValue } from "./types"

export type PickerRootProps<T = PickerValue> = {
  value: T
  onChange: (value: T, key: string) => void
  height?: number
  itemHeight?: number
  wheelMode?: WheelMode
} & Omit<HTMLProps<HTMLDivElement>, "value" | "onChange">

function pickerReducer(
  optionGroups: { [key: string]: Option[] },
  action: {
    type: "REGISTER_OPTION" | "UNREGISTER_OPTION"
    key: string
    option: Option
  }
) {
  switch (action.type) {
    case "REGISTER_OPTION": {
      const { key, option } = action
      let nextOptionsForKey = [...(optionGroups[key] || []), option]
      nextOptionsForKey = sortByDomNode(nextOptionsForKey, (o) => o.element.current)
      return {
        ...optionGroups,
        [key]: nextOptionsForKey,
      }
    }
    case "UNREGISTER_OPTION": {
      const { key, option } = action
      return {
        ...optionGroups,
        [key]: (optionGroups[key] || []).filter((o) => o !== option),
      }
    }
    default: {
      throw Error(`Unknown action: ${action.type as string}`)
    }
  }
}

function PickerRoot<T extends PickerValue>(props: PickerRootProps<T>) {
  const {
    style,
    children,
    value,
    onChange,
    height = DEFAULT_HEIGHT,
    itemHeight = DEFAULT_ITEM_HEIGHT,
    wheelMode = DEFAULT_WHEEL_MODE,
    ...restProps
  } = props

  const highlightStyle = useMemo<CSSProperties>(
    () => ({
      height: itemHeight,
      marginTop: -(itemHeight / 2),
      position: "absolute",
      top: "50%",
      left: 0,
      width: "100%",
      pointerEvents: "none",
    }),
    [itemHeight]
  )
  const containerStyle = useMemo<CSSProperties>(
    () => ({
      height: `${height}px`,
      position: "relative",
      display: "flex",
      justifyContent: "center",
      overflow: "hidden",
      maskImage:
        "linear-gradient(to top, transparent, transparent 5%, white 20%, white 80%, transparent 95%, transparent)",
      WebkitMaskImage:
        "linear-gradient(to top, transparent, transparent 5%, white 20%, white 80%, transparent 95%, transparent)",
    }),
    [height]
  )

  const [optionGroups, dispatch] = useReducer(pickerReducer, {})

  const pickerData = useMemo(
    () => ({ height, itemHeight, wheelMode, value, optionGroups }),
    [height, itemHeight, value, optionGroups, wheelMode]
  )

  const triggerChange = useCallback(
    (key: string, nextValue: string) => {
      if (value[key] === nextValue) return false
      const nextPickerValue = { ...value, [key]: nextValue }
      onChange(nextPickerValue, key)
      return true
    },
    [onChange, value]
  )
  const registerOption = useCallback((key: string, option: Option) => {
    dispatch({ type: "REGISTER_OPTION", key, option })
    return () => dispatch({ type: "UNREGISTER_OPTION", key, option })
  }, [])

  const pickerActions = useMemo(() => ({ registerOption, change: triggerChange }), [registerOption, triggerChange])

  return (
    <div
      style={{
        ...containerStyle,
        ...style,
      }}
      {...restProps}>
      <PickerActionsContext.Provider value={pickerActions}>
        <PickerDataContext.Provider value={pickerData}>{children}</PickerDataContext.Provider>
      </PickerActionsContext.Provider>
      <div style={highlightStyle}>
        <div className="absolute top-0 bottom-auto left-0 right-auto w-full h-[1px] bg-ring scale-y-50" />
        <div className="absolute top-auto bottom-0 left-0 right-auto w-full h-[1px] bg-ring scale-y-50" />
      </div>
    </div>
  )
}

export default PickerRoot
