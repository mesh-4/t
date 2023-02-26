import Head from "next/head"
import { Box, Flex } from "@chakra-ui/react"

import Boxer from "@/features/boxer"
import Calendar from "@/features/calendar"
import Note from "@/features/note"

export default function Home() {
  return (
    <>
      <Head>
        <title>Timebox</title>
      </Head>
      <Box
        mx="auto"
        py="30px"
        w="95%"
        h="100vh"
        pos="relative"
        maxW={{ base: "375px", sm: "680px", md: "900px", lg: "1200px" }}>
        <Flex as="main" h="100%">
          <Box flex="2" mr={4}>
            <Boxer />
          </Box>
          <Flex flex="1" flexDir="column">
            <Box mb={4} flex="none">
              <Calendar />
            </Box>
            <Box flex="auto" px={3}>
              <Note />
            </Box>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}
