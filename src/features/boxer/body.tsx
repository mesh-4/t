import * as React from "react"

import BoxerHour from "./hour"

type BoxerBodyProps = {
  date: string
}

function BoxerBody({ date }: BoxerBodyProps) {
  return (
    <>
      {Array.from({ length: 24 }, (_, i) => (
        <BoxerHour key={i} date={date} hour={i} />
      ))}
    </>
  )
}

export default React.memo(BoxerBody)
