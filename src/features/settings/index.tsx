import Profile from "./profile"
import ColorModeBtn from "./color-mode-btn"

function Settings() {
  return (
    <div className="flex items-center justify-between space-x-2">
      <Profile />

      <ColorModeBtn />
    </div>
  )
}

Settings.displayName = "Settings"

export default Settings
