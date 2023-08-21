"use client"
import { Box, Flex, Heading } from "@chakra-ui/react"

import CommonHeaderEntry from "@/components/common-header-entry"

type CommonHeaderProps = {
  isAuth?: boolean
}

const CommonHeader = ({ isAuth = false }: CommonHeaderProps) => {
  return (
    <Box
      mx="auto"
      py="30px"
      w="95%"
      h="100vh"
      pos="relative"
      maxW={{ base: "375px", sm: "680px", md: "900px", lg: "1200px" }}>
      <Flex as="main" w="full" align="center" justifyContent="space-between">
        <Heading size="2">Timebox</Heading>

        <Flex>
          <CommonHeaderEntry isAuth={isAuth} />
        </Flex>
      </Flex>
    </Box>
  )
}

export default CommonHeader
