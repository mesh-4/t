"use client"

import * as React from "react"
import debounce from "lodash/debounce"
import { format, addMinutes } from "date-fns"
import { useRouter } from "next/navigation"
import { useQueryClient, QueryKey } from "@tanstack/react-query"
import { UpdateIcon, Cross1Icon } from "@radix-ui/react-icons"

import { cn } from "@/utils"
import { Input } from "@/components/ui/input"
import { Editor } from "@/components/ui/editor"
import { Button } from "@/components/ui/button"
import { useUpdateEvent } from "@/hooks/events/mutations"
import { DatePicker } from "@/components/ui/date-picker"
import { TimePicker } from "@/components/ui/time-picker"
import type { Event } from "@/api/event"

type EventEditorProps = {
  data: Event
}

function EventEditor({ data }: EventEditorProps) {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { mutate: updateEvent, status } = useUpdateEvent()

  const refreshQuery = async (extraKey = [] as QueryKey) => {
    await queryClient.invalidateQueries({
      queryKey: ["events", ...extraKey],
    })
  }

  const onTitleSave = React.useCallback(
    (input: string) => {
      updateEvent(
        {
          id: data.id,
          title: input,
        },
        {
          onSuccess: async () => {
            await refreshQuery()
          },
        }
      )
    },
    [refreshQuery]
  )

  const debouncedSaveTitle = React.useMemo(() => {
    return debounce(onTitleSave, 1000)
  }, [onTitleSave])

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.trim()
    if (!input || input.length < 1) return
    debouncedSaveTitle(input)
  }

  const onNoteSave = React.useCallback((input: string) => {
    updateEvent(
      {
        id: data.id,
        note: input,
      },
      {
        onSuccess: async () => {
          await refreshQuery()
        },
      }
    )
  }, [])

  const debouncedSaveNote = React.useMemo(() => {
    return debounce(onNoteSave, 2000)
  }, [onNoteSave])

  const onNoteChange = (newNote: string) => {
    debouncedSaveNote(newNote)
  }

  const onDueDateSave = React.useCallback((input: { start?: string; end?: string }) => {
    updateEvent(
      {
        id: data.id,
        ...input,
      },
      {
        onSuccess: async () => {
          await refreshQuery([{ date: format(new Date(input.start || input.end || data.start!), "yyyy-MM-dd") }])
          router.refresh()
        },
      }
    )
  }, [])

  const onDueDateCreate = React.useCallback(() => {
    const now = new Date()
    const end = addMinutes(now, 30)

    updateEvent(
      {
        id: data.id,
        start: now.toISOString(),
        end: end.toISOString(),
      },
      {
        onSuccess: async () => {
          await refreshQuery([{ date: format(new Date(data.start!), "yyyy-MM-dd") }])
          router.refresh()
        },
      }
    )
  }, [router])

  const onDueDateDelete = () => {
    updateEvent(
      {
        id: data.id,
        start: null,
        end: null,
      },
      {
        onSuccess: async (result) => {
          await queryClient.invalidateQueries({
            queryKey: ["events", { date: format(new Date(data.start!), "yyyy-MM-dd") }],
          })
          router.refresh()
        },
      }
    )
  }

  const debouncedSaveDueDate = React.useMemo(() => {
    return debounce(onDueDateSave, 1000)
  }, [onDueDateSave])

  const onDueDateChange = (field: "start" | "end") => {
    return (input: Date) => {
      debouncedSaveDueDate({ [field]: input.toISOString() })
    }
  }

  return (
    <div className="w-full h-full flex flex-col relative">
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
        className="w-full flex-none text-2xl font-bold mb-6"
        placeholder="Enter event title"
      />

      <div className="px-3 mb-6">
        {!!data.start && !!data.end ? (
          <>
            <div className="mb-2 flex items-center">
              <p className="text-sm mr-2">Due Date</p>
              <Button
                size="icon"
                className="w-5 h-5"
                variant="ghost"
                disabled={status === "loading"}
                onClick={onDueDateDelete}>
                <Cross1Icon />
              </Button>
            </div>
            <div className="flex space-x-2 items-center justify-start">
              <div className="space-y-1 flex flex-col">
                <TimePicker
                  size="sm"
                  className="w-[150px]"
                  defaultValue={new Date(data.start)}
                  onChange={onDueDateChange("start")}
                />
                <DatePicker
                  size="sm"
                  className="w-[150px]"
                  defaultValue={new Date(data.start)}
                  onChange={onDueDateChange("start")}
                />
              </div>
              <div className="space-y-1 flex flex-col">
                <TimePicker
                  size="sm"
                  className="w-[150px]"
                  defaultValue={new Date(data.end)}
                  onChange={onDueDateChange("end")}
                />
                <DatePicker
                  size="sm"
                  className="w-[150px]"
                  defaultValue={new Date(data.end)}
                  onChange={onDueDateChange("end")}
                />
              </div>
            </div>
          </>
        ) : (
          <Button size="sm" variant="outline" disabled={status === "loading"} onClick={onDueDateCreate}>
            Add due date
          </Button>
        )}
      </div>

      <div className="w-full flex-1 px-3 overflow-y-scroll scrollbar-hidden">
        <Editor initialVal={data.note || undefined} onChange={onNoteChange} />
      </div>
    </div>
  )
}

export default EventEditor
