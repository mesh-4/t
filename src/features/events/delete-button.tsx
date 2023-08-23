"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { TrashIcon } from "@radix-ui/react-icons"
import { useQueryClient } from "@tanstack/react-query"

import { Button } from "@/components/ui/button"
import { useDeleteEvent } from "@/hooks/events/mutations"

type EventDeleteButtonProps = {
  eventId: string
}

function EventDeleteButton({ eventId }: EventDeleteButtonProps) {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { mutate: deleteEvent, status } = useDeleteEvent()

  const onClick = () => {
    deleteEvent(eventId, {
      onSuccess: async (result) => {
        await queryClient.invalidateQueries({
          queryKey: ["events"],
        })
        router.push(`/app`)
      },
    })
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="w-6 h-6"
      onClick={onClick}
      disabled={status === "loading"}
      aria-label="Delete Event">
      <TrashIcon />
    </Button>
  )
}

EventDeleteButton.displayName = "EventDeleteButton"

export default React.memo(EventDeleteButton)
