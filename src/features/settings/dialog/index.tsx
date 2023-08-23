"use client"

import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import LangSelector from "@/locales/components/lang-selector"
import ColorModeSelector from "@/features/settings/color-mode-selector"

type SettingDialogProps = {
  children: React.ReactNode
}

function SettingDialog({ children }: SettingDialogProps) {
  const router = useRouter()

  const onSignOut = () => {
    signOut().then(() => {
      router.push(`/`)
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Setting</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <p className="mb-2 text-sm">Color Mode</p>
            <div className="w-[180px]">
              <ColorModeSelector />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="mb-2 text-sm">Language</p>
            <div className="w-[180px]">
              <LangSelector />
            </div>
          </div>

          <div className="ml-auto">
            <Button variant="outline" onClick={onSignOut}>
              Logout
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default SettingDialog
