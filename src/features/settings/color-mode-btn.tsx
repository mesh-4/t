import * as React from "react"
import { useColorMode, Button } from "@chakra-ui/react"

function ColorModeBtn() {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Button size="sm" variant="outline" onClick={toggleColorMode}>
      {colorMode === "light" ? "Dark" : "Light"}
    </Button>
  )
}

ColorModeBtn.displayName = "ColorModeBtn"

export default React.memo(ColorModeBtn)
