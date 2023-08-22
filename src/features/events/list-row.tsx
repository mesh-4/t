import * as React from "react"
import { format } from "date-fns"
import { useHotkeys } from "react-hotkeys-hook"
import { useQueryClient } from "@tanstack/react-query"
import { usePathname, useRouter } from "next/navigation"
import { ListChildComponentProps, areEqual } from "react-window"

import { cn } from "@/utils"
import { useDeleteEvent } from "@/hooks/events/mutations"
import type { Event } from "@/api/event"

function EventsListRow({ index, style, data }: ListChildComponentProps<Event[]>) {
  const router = useRouter()
  const pathname = usePathname()
  const queryClient = useQueryClient()
  const { mutate: deleteEvent } = useDeleteEvent()

  const item = data[index]
  const isSelected = !!pathname && pathname.includes(item.id)

  useHotkeys(
    "mod+backspace",
    () => {
      deleteEvent(item.id, {
        onSuccess: async () => {
          await queryClient.invalidateQueries({
            queryKey: ["events"],
          })
          if (!!data[index + 1]) {
            router.push(`/app/${data[index + 1].id}`)
          } else if (!!data[index - 1]) {
            router.push(`/app/${data[index - 1].id}`)
          } else {
            router.push("/app")
          }
        },
      })
    },
    {
      enabled: isSelected,
    }
  )

  const onClick = () => {
    if (isSelected) return
    router.push(`/app/${item.id}`)
  }

  return (
    <div
      className={cn(
        "flex px-4 border-b items-center justify-between",
        isSelected && "bg-accent text-accent-foreground"
      )}
      style={style}
      onClick={onClick}>
      <div>
        <p className="w-[300px] truncate">{item.title}</p>
        <time className="text-sm text-muted-foreground">{format(new Date(item.updatedAt), "yyyy-MM-dd HH:mm")}</time>
      </div>
    </div>
  )
}

export default React.memo(EventsListRow, areEqual)
