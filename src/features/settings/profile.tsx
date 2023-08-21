"use client"

import * as React from "react"
import { useSession } from "next-auth/react"

function Profile() {
  const { data: session } = useSession()

  if (!session?.user) {
    return null
  }

  return (
    <div className="pl-3 py-2 relative select-none">
      <p className="text-sm leading-[1]">{session.user.name}</p>
      <p className="text-xs leading-[1.15]">{session.user.email}</p>
    </div>
  )
}

Profile.displayName = "Profile"

export default Profile
