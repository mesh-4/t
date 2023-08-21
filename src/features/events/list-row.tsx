import * as React from "react"
import { useQueryClient } from "@tanstack/react-query"
import { ListChildComponentProps, areEqual } from "react-window"

import { useDeleteEvent } from "@/hooks/events/mutations"
import { Button } from "@/components/ui/button"
import type { Event } from "@/api/event"

function EventsListRow({ index, style, data }: ListChildComponentProps<Event[]>) {
  const queryClient = useQueryClient()
  const { mutate: deleteEvent } = useDeleteEvent()

  const item = data[index]

  const onDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault()
    deleteEvent(item.id, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["events"],
        })
      },
    })
  }

  return (
    <div style={style}>
      <div className="flex mt-[5px] pl-4 items-center justify-between border-[1px] h-[40px] rounded-md border-gray-200 dark:border-gray-600">
        <div>
          <p>{item.title}</p>
        </div>
        <div>
          <Button size="sm" variant="ghost" onClick={onDeleteClick}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  )
}

export default React.memo(EventsListRow, areEqual)
