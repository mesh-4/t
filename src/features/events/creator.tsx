"use client"

import * as React from "react"
import { useQueryClient } from "@tanstack/react-query"

import { cn } from "@/utils"
import { useCreateEvent } from "@/hooks/events/mutations"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Editor } from "@/components/ui/editor"

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
    <div className={cn("w-full transition-all")}>
      <Input
        ref={inputRef}
        name="title"
        variant="immerse"
        className="w-full flex-grow text-2xl font-bold"
        placeholder="Enter event title"
        onKeyPress={onKeyPress}
      />

      <div className="w-full">
        <Editor />
      </div>
    </div>
  )
}

EventCreator.displayName = "EventCreator"

export default React.memo(EventCreator)
