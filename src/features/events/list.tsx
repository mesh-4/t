"use client"

import * as React from "react"
import flatten from "lodash/flatten"
import AutoSizer from "react-virtualized-auto-sizer"
import InfiniteLoader from "react-window-infinite-loader"
import { FixedSizeList as List } from "react-window"

import { useInfiniteEvents } from "@/hooks/events/queries"

import EventsListRow from "./list-row"

function EventsList() {
  const { data, fetchNextPage, hasNextPage } = useInfiniteEvents({
    order: "desc",
    orderBy: "updatedAt",
  })

  const flattenEvents = React.useMemo(() => {
    if (!data) return []
    return flatten(data.pages.map((page) => page.data))
  }, [data])

  const isItemLoaded = (index: number) => {
    return !hasNextPage || index < flattenEvents.length
  }

  const handleLoadMoreItems = () => {
    fetchNextPage()
  }

  return (
    <AutoSizer>
      {({ height, width }) => (
        <InfiniteLoader
          isItemLoaded={isItemLoaded}
          itemCount={flattenEvents.length}
          loadMoreItems={handleLoadMoreItems}>
          {({ onItemsRendered, ref }) => (
            <List
              ref={ref}
              width={width}
              height={height}
              itemSize={64}
              itemData={flattenEvents}
              itemCount={flattenEvents.length}
              onItemsRendered={onItemsRendered}>
              {EventsListRow}
            </List>
          )}
        </InfiniteLoader>
      )}
    </AutoSizer>
  )
}

EventsList.displayName = "EventsList"

export default React.memo(EventsList)
