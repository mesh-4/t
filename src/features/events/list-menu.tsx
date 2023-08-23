"use client"

import * as React from "react"
import { useQueryClient } from "@tanstack/react-query"
import { useRouter, usePathname } from "next/navigation"

import { EDITOR_EMPTY_VALUE } from "@/components/ui/editor/constants"
import { useCreateEvent, useDeleteEvent } from "@/hooks/events/mutations"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuLabel,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuSeparator,
} from "@/components/ui/context-menu"

type EventsListMenuProps = {
  children: React.ReactNode
}

function EventsListMenu({ children }: EventsListMenuProps) {
  const router = useRouter()
  const pathname = usePathname()
  const queryClient = useQueryClient()
  const { mutate: createEvent } = useCreateEvent()
  const { mutate: deleteEvent } = useDeleteEvent()

  const currentEventId = React.useMemo(() => {
    if (!pathname) return null
    const [, id] = pathname.split("/app/")
    // TODO ignore other functional routes(e.g. settings)
    return id
  }, [pathname])

  const handleCreate = () => {
    createEvent(
      { title: "New Event", note: EDITOR_EMPTY_VALUE },
      {
        onSuccess: async (result) => {
          await queryClient.invalidateQueries({
            queryKey: ["events"],
          })
          router.push(`/app/${result.data.id}`)
        },
      }
    )
  }

  const handleDelete = () => {
    if (!currentEventId) return
    deleteEvent(currentEventId, {
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ["events"],
        })
        router.push(`/app`)
      },
    })
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={handleCreate}>Create event</ContextMenuItem>
        {currentEventId && (
          <>
            <ContextMenuSeparator />
            <ContextMenuLabel>Current event</ContextMenuLabel>
            <ContextMenuItem onClick={handleDelete}>Delete event</ContextMenuItem>
          </>
        )}
      </ContextMenuContent>
    </ContextMenu>
  )
}

export default EventsListMenu
