import { useSessionUser } from "@/auth/get-session-user"
import CommonHeader from "@/components/common-header"

export default async function Home() {
  const user = await useSessionUser()

  return (
    <div>
      <CommonHeader isAuth={!!user} />
    </div>
  )
}
