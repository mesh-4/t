import * as React from "react"
import { useSession } from "next-auth/react"
import { Box, Text, BoxProps } from "@chakra-ui/react"

function Profile({ ...boxProps }: BoxProps) {
  const { data: session } = useSession()

  if (!session?.user) {
    return null
  }

  return (
    <Box pl={3} py={2} pos="relative" userSelect="none" {...boxProps}>
      <Text fontSize="sm" lineHeight="1">
        {session.user.name}
      </Text>
      <Text fontSize="xs" lineHeight="1.15">
        {session.user.email}
      </Text>
    </Box>
  )
}

Profile.displayName = "Profile"

export default React.memo(Profile)
