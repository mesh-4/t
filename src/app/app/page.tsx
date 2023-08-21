import Boxer from "@/features/boxer"
import Calendar from "@/features/calendar"
import Events from "@/features/events"
import Settings from "@/features/settings"

export default function CoreApp() {
  return (
    <>
      <div className="mx-auto w-full h-screen relative">
        <main className="flex h-full">
          <div className="flex-[2] mr-2 py-[30px]">
            <Boxer />
          </div>
          <div className="flex flex-1 flex-col border-l-[1]">
            <div className="mb-6 flex-none">
              <Calendar />
            </div>
            <div className="px-3 flex-auto h-full">
              <Events />
            </div>
            <div className="px-3 mt-4 flex-none">
              <Settings />
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
