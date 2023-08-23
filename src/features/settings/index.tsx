import { GearIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"

import Profile from "./profile"
import SettingsDialog from "./dialog"

function Settings() {
  return (
    <div className="flex items-center justify-between space-x-2">
      <Profile />

      <SettingsDialog>
        <Button variant="ghost" size="icon" className="w-6 h-6">
          <GearIcon />
        </Button>
      </SettingsDialog>
    </div>
  )
}

Settings.displayName = "Settings"

export default Settings
