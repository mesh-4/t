import * as React from "react"
import AutoSizer from "react-virtualized-auto-sizer"
import { FixedSizeList as List } from "react-window"

import { useStore } from "@/store"

import EventsListRow from "./list-row"
function EventsList() {
  const events = useStore((state) => state.events)

  return (
    <AutoSizer>
      {({ height, width }) => (
        <List width={width} height={height} itemSize={45} itemData={events} itemCount={events.length}>
          {EventsListRow}
        </List>
      )}
    </AutoSizer>
  )
}

EventsList.displayName = "EventsList"

export default React.memo(EventsList)
