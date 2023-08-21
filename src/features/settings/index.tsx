"use client"

import * as React from "react"
import { Flex } from "@chakra-ui/react"

import Profile from "./profile"
import ColorModeBtn from "./color-mode-btn"

function Settings() {
  return (
    <Flex align="center" justify="space-between" gap={2}>
      <ColorModeBtn />

      <Profile />
    </Flex>
  )
}

Settings.displayName = "Settings"

export default React.memo(Settings)
