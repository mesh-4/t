"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { useRouter } from "next/navigation"
import { signOut } from "next-auth/react"
import { SunIcon, MoonIcon, PlusIcon, ExitIcon, LaptopIcon } from "@radix-ui/react-icons"
import { useQueryClient } from "@tanstack/react-query"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { useCreateEvent } from "@/hooks/events/mutations"
import { EDITOR_EMPTY_VALUE } from "@/components/ui/editor/constants"

function SettingCommandMenu() {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()
  const { setTheme } = useTheme()
  const queryClient = useQueryClient()
  const { mutate } = useCreateEvent()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const handleSignOut = () => {
    signOut()
    router.push("/login")
  }

  const handleCreateEvent = () => {
    mutate(
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
          setOpen(false)
        },
      }
    )
  }

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Events">
          <CommandItem onClick={handleCreateEvent}>
            <PlusIcon className="mr-2 h-4 w-4" />
            <span>Create Event</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />

        <CommandGroup heading="Theme">
          <CommandItem onClick={() => setTheme("dark")}>
            <MoonIcon className="mr-2 h-4 w-4" />
            <span>Dark theme</span>
          </CommandItem>
          <CommandItem onClick={() => setTheme("light")}>
            <SunIcon className="mr-2 h-4 w-4" />
            <span>Light theme</span>
          </CommandItem>
          <CommandItem onClick={() => setTheme("system")}>
            <LaptopIcon className="mr-2 h-4 w-4" />
            <span>System theme</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />

        <CommandGroup heading="Settings">
          <CommandItem onClick={handleSignOut}>
            <ExitIcon className="mr-2 h-4 w-4" />
            <span>Logout</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}

export default SettingCommandMenu
