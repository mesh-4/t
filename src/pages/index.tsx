import Head from "next/head"
import { isEmpty } from "lodash"
import { FiMoon, FiSun } from "react-icons/fi"
import { useRouter } from "next/router"
import { Box, Flex, Heading, Button, IconButton, useColorMode } from "@chakra-ui/react"
import { signIn } from "next-auth/react"

import { useSession } from "@/hooks/use-session"

export default function Home() {
  const { colorMode, toggleColorMode } = useColorMode()
  const [data] = useSession()
  const router = useRouter()

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
              mr={2}
              aria-label="toggle theme"
              icon={colorMode === "light" ? <FiMoon /> : <FiSun />}
              onClick={toggleColorMode}
            />
            {isEmpty(data) ? (
              <Button onClick={() => signIn()}>Join</Button>
            ) : (
              <Button onClick={() => router.push("/app")}>Dashboard</Button>
            )}
          </Flex>
        </Flex>
      </Box>
    </>
  )
}
