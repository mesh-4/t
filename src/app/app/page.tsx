import Boxer from "@/features/boxer"
import Calendar from "@/features/calendar"
// import Events from "@/features/events"
import Settings from "@/features/settings"

export default function CoreApp() {
  return (
    <>
      <div className="mx-auto w-full h-screen relative">
        <main className="flex h-full">
          <div className="flex flex-col flex-none w-[350px] border-l-[1]">
            <div className="py-3 flex-none">
              <Calendar />
            </div>
            <Boxer layerClassName="px-3 flex-auto h-full scrollbar-hidden" />
            <div className="py-3 flex-none">
              <Settings />
            </div>
          </div>
          <div className="flex-1 ml-2 pb-[30px] relative">
            <div className="flex flex-col w-full h-full"></div>
          </div>
        </main>
      </div>
    </>
  )
}
