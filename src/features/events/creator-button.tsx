"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Pencil2Icon } from "@radix-ui/react-icons"
import { useQueryClient } from "@tanstack/react-query"

import { Button } from "@/components/ui/button"
import { EDITOR_EMPTY_VALUE } from "@/components/ui/editor/constants"
import { useCreateEvent } from "@/hooks/events/mutations"

function EventCreatorButton() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { mutate: createEvent, status } = useCreateEvent()

  const onClick = () => {
    createEvent(
      {
        title: "New Event",
        note: EDITOR_EMPTY_VALUE,
      },
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

  return (
    <Button
      variant="ghost"
      size="icon"
      className="w-6 h-6"
      onClick={onClick}
      disabled={status === "loading"}
      aria-label="Create Event">
      <Pencil2Icon />
    </Button>
  )
}

EventCreatorButton.displayName = "EventCreatorButton"

export default React.memo(EventCreatorButton)
