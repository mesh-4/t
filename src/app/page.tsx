import { useSessionUser } from "@/auth/get-session-user"
import CommonHeader from "@/components/common-header"
import MarketingBanner from "@/components/marketing/banner"

export default async function Home() {
  const user = await useSessionUser()

  return (
    <div>
      <CommonHeader isAuth={!!user} />
      <MarketingBanner />
    </div>
  )
}
