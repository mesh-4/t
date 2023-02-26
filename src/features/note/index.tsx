import * as React from "react"
import { Box, Flex, Text } from "@chakra-ui/react"

function Note() {
  return (
    <Box>
      <Text fontWeight={700} mb={4}>
        Note
      </Text>
      <Box>
        <Box contentEditable />
      </Box>
    </Box>
  )
}

export default React.memo(Note)
