"use client"

import * as React from "react"
import debounce from "lodash/debounce"
import { useQueryClient } from "@tanstack/react-query"
import { UpdateIcon } from "@radix-ui/react-icons"
import type { Descendant } from "slate"

import { cn } from "@/utils"
import { Input } from "@/components/ui/input"
import { Editor } from "@/components/ui/editor"
import { useUpdateEvent } from "@/hooks/events/mutations"
import type { Event } from "@/api/event"

type EventEditorProps = {
  data: Event
}

function EventEditor({ data }: EventEditorProps) {
  const queryClient = useQueryClient()
  const { mutate: updateEvent, status } = useUpdateEvent()

  const onTitleSave = React.useCallback((input: string) => {
    updateEvent(
      {
        id: data.id,
        title: input,
      },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({
            queryKey: ["events"],
          })
        },
      }
    )
  }, [])

  const debouncedSaveTitle = React.useMemo(() => {
    return debounce(onTitleSave, 500)
  }, [onTitleSave])

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.trim()
    if (!input || input.length < 1) return
    debouncedSaveTitle(input)
  }

  const onNoteSave = React.useCallback((input: string) => {
    updateEvent({
      id: data.id,
      note: input,
    })
  }, [])

  const debouncedSaveNote = React.useMemo(() => {
    return debounce(onNoteSave, 500)
  }, [onNoteSave])

  const onNoteChange = (val: Descendant[]) => {
    const newNote = JSON.stringify(val)
    debouncedSaveNote(newNote)
  }

  return (
    <div className="w-full relative">
      <div
        className={cn("absolute top-0 right-0 opacity-0 transition-opacity", {
          "opacity-100 animate-spin": status === "loading",
        })}>
        <UpdateIcon />
      </div>

      <Input
        name="title"
        variant="immerse"
        defaultValue={data.title || ""}
        onChange={onTitleChange}
        className="w-full flex-grow text-2xl font-bold"
        placeholder="Enter event title"
      />

      <div className="w-full">
        <Editor initialVal={data.note || undefined} onChange={onNoteChange} />
      </div>
    </div>
  )
}

export default EventEditor
