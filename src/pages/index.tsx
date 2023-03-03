import Head from "next/head"
import { FiMoon, FiSun } from "react-icons/fi"
import { Box, Flex, Heading, Button, IconButton, useColorMode } from "@chakra-ui/react"
import { signIn } from "next-auth/react"

export default function Home() {
  const { colorMode, toggleColorMode } = useColorMode()

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
        <Flex as="main" w="full" align="center" justifyContent="space-between">
          <Heading size="md">Timebox</Heading>

          <Flex>
            <IconButton
              aria-label="toggle theme"
              icon={colorMode === "light" ? <FiMoon /> : <FiSun />}
              onClick={toggleColorMode}
            />
            <Button ml={2} onClick={() => signIn()}>
              Join
            </Button>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}
