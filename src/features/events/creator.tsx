"use client"

import * as React from "react"
import { useQueryClient } from "@tanstack/react-query"

import { useCreateEvent } from "@/hooks/events/mutations"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

function EventCreator() {
  const inputRef = React.useRef<HTMLInputElement>(null)

  const queryClient = useQueryClient()
  const { mutate: createEvent } = useCreateEvent()

  const handleCreate = () => {
    if (!inputRef.current) return
    createEvent(
      {
        title: inputRef.current.value,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["events"],
          })
        },
      }
    )
    inputRef.current.value = ""
  }

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const element = e.target as HTMLInputElement
      if (!element.value) return

      createEvent(
        {
          title: element.value,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ["events"],
            })
          },
        }
      )
      element.value = ""
    }
  }

  return (
    <div className="w-full flex items-center">
      <Input ref={inputRef} className="w-full flex-grow" placeholder="Enter event title" onKeyPress={onKeyPress} />
      <div className="w-[80px]">
        <Button size="sm" variant="ghost" onClick={handleCreate}>
          Create
        </Button>
      </div>
    </div>
  )
}

EventCreator.displayName = "EventCreator"

export default React.memo(EventCreator)
