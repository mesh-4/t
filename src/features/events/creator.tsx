"use client"

import * as React from "react"
import { useQueryClient } from "@tanstack/react-query"

import { cn } from "@/utils"
import { useCreateEvent } from "@/hooks/events/mutations"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

function EventCreator() {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [isTyping, setTyping] = React.useState(false)

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

  const onFocusTitle = () => {
    setTyping(true)
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
        className="w-full flex-grow"
        onFocus={onFocusTitle}
        placeholder="Enter event title"
        onKeyPress={onKeyPress}
      />

      <div className="w-full">
        <div>
          <Input />
        </div>

        <div className="flex items-end space-x-2">
          <Button size="sm" variant="ghost" onClick={() => setTyping(false)}>
            Cancel
          </Button>
          <Button size="sm" variant="ghost" onClick={handleCreate}>
            Create
          </Button>
        </div>
      </div>
    </div>
  )
}

EventCreator.displayName = "EventCreator"

export default React.memo(EventCreator)
