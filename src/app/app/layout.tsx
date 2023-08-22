import Boxer from "@/features/boxer"
import Calendar from "@/features/calendar"
import EventsList from "@/features/events/list"
import EventsListMenu from "@/features/events/list-menu"
import Settings from "@/features/settings"

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
            <EventsListMenu>
              <EventsList />
            </EventsListMenu>
          </div>

          <div className="flex-1 pt-3 mx-2 relative">{children}</div>
        </main>
      </div>
    </>
  )
}
