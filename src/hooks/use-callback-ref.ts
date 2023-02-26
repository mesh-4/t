import * as React from "react"

type Callback = (...args: any[]) => any

export function useCallbackRef<T extends Callback>(callback: T | undefined): T {
  // * register callback to ref
  const callbackRef = React.useRef(callback)

  // * while callback changes, update ref
  React.useEffect(() => {
    callbackRef.current = callback
  })

  // * return a memoized callback that calls the ref
  return React.useMemo(() => ((...args) => callbackRef.current?.(...args)) as T, [])
}
