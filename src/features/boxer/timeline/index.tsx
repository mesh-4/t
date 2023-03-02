import * as React from "react"
import AutoSizer from "react-virtualized-auto-sizer"
import { VariableSizeList as List } from "react-window"

import { SLOT_HEIGHT, SLOT_LABELS, SUM_OF_SLOTS, SLOTS_HEIGHT } from "@/constants"

import TimelineSlot from "./slot"

function BoxerTimeline() {
  return (
    <AutoSizer disableHeight>
      {({ width }) => (
        <List
          width={width}
          height={SLOTS_HEIGHT}
          itemSize={(idx) => (idx === 0 ? SLOT_HEIGHT + 8 : SLOT_HEIGHT)}
          itemData={SLOT_LABELS}
          itemCount={SUM_OF_SLOTS}>
          {TimelineSlot}
        </List>
      )}
    </AutoSizer>
  )
}

export default React.memo(BoxerTimeline)
