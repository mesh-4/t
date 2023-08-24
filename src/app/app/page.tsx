import { notFound } from "next/navigation"

import { useSessionUser } from "@/auth/get-session-user"

export default async function AppOverview() {
  const user = await useSessionUser()
  if (!user) {
    notFound()
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-none flex w-full h-12 px-3 items-center border-b justify-between">
        <p className="text-base font-bold">Overview</p>
      </div>
      <div className="flex-1 h-full overflow-hidden p-2"></div>
    </div>
  )
}
