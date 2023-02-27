import * as React from "react"

import { useStore } from "@/store"

import BoxerHour from "./hour"

function BoxerBody() {
  const date = useStore((state) => state.date)

  return (
    <>
      {Array.from({ length: 24 }, (_, i) => (
        <BoxerHour key={i} date={date} hour={i} />
      ))}
    </>
  )
}

BoxerBody.displayName = "BoxerBody"

export default React.memo(BoxerBody)
