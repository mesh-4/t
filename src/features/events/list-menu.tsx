"use client"

import * as React from "react"
import { usePostHog } from "posthog-js/react"
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
  const posthog = usePostHog()
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

  const handleCreateEvent = () => {
    posthog.capture("event-create_via_ctx_menu")
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

  const handleCreateSubEvent = () => {
    if (!currentEventId) return
    posthog.capture("sub_event-create_via_menu")
    createEvent(
      { title: "New Sub Event", note: EDITOR_EMPTY_VALUE, parentId: currentEventId },
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

  const handleDeleteEvent = () => {
    if (!currentEventId) return
    posthog.capture("event-delete_via_menu")
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
        <ContextMenuItem onClick={handleCreateEvent}>Create event</ContextMenuItem>
        {currentEventId && (
          <>
            <ContextMenuSeparator />
            <ContextMenuLabel>Current event</ContextMenuLabel>
            <ContextMenuItem onClick={handleCreateSubEvent}>Create sub event</ContextMenuItem>
            <ContextMenuItem onClick={handleDeleteEvent}>Delete event</ContextMenuItem>
          </>
        )}
      </ContextMenuContent>
    </ContextMenu>
  )
}

export default EventsListMenu
