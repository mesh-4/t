import { Box, Flex } from "@chakra-ui/react"

import Boxer from "@/features/boxer"

export default function Home() {
  return (
    <Box
      mx="auto"
      pt="20px"
      pb="50px"
      w="95%"
      h="100vh"
      pos="relative"
      maxW={{ base: "375px", sm: "680px", md: "900px", lg: "1200px" }}>
      <Flex as="main" h="100%">
        <Box flex="2" height="500px">
          <Boxer />
        </Box>
        <Box flex="1"></Box>
      </Flex>
    </Box>
  )
}
