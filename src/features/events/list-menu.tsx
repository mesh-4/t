"use client"

import * as React from "react"
import { useQueryClient } from "@tanstack/react-query"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { useCreateEvent, useDeleteEvent } from "@/hooks/events/mutations"
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu"

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
      { title: "New Event" },
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
      <ContextMenuTrigger className="w-full h-full">{children}</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>{pathname ?? "home"}</ContextMenuItem>
        <ContextMenuItem onClick={handleCreate}>Create event</ContextMenuItem>
        {currentEventId && <ContextMenuItem onClick={handleDelete}>Delete event</ContextMenuItem>}
      </ContextMenuContent>
    </ContextMenu>
  )
}

export default EventsListMenu
