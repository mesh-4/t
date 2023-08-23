import dynamic from "next/dynamic"

import Boxer from "@/features/boxer"
import Calendar from "@/features/calendar"
import EventsList from "@/features/events/list"
import EventsListMenu from "@/features/events/list-menu"
import EventCreatorButton from "@/features/events/creator-button"
import Settings from "@/features/settings"

const SettingCommandMenu = dynamic(() => import("@/features/settings/command-menu"), { ssr: false })

type CoreAppLayoutProps = {
  children: React.ReactNode
}

export default function CoreAppLayout({ children }: CoreAppLayoutProps) {
  return (
    <>
      <div className="mx-auto w-full h-screen relative">
        <main className="flex h-full">
          <div className="flex flex-col flex-none w-[350px]">
            <div className="py-3 flex-none">
              <Calendar />
            </div>
            <Boxer layerClassName="px-3 flex-auto h-full scrollbar-hidden" />
            <div className="p-3 flex-none">
              <Settings />
            </div>
          </div>

          <div className="flex flex-col flex-none w-[350px] border-r border-l">
            <div className="flex-none flex w-full h-12 px-3 items-center border-b justify-between">
              <p className="text-base font-bold">Events</p>
              <EventCreatorButton />
            </div>
            <div className="flex-auto w-full h-full relative">
              <EventsListMenu>
                <div className="w-full h-full">
                  <EventsList />
                </div>
              </EventsListMenu>
            </div>
          </div>

          <div className="flex-1 relative">{children}</div>
        </main>
      </div>
      <SettingCommandMenu />
    </>
  )
}
