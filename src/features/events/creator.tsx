import * as React from "react"
import { Box, Input, InputGroup, InputRightElement, Button } from "@chakra-ui/react"
import { FiPlus } from "react-icons/fi"

import { useStore } from "@/store"

function EventCreator() {
  const inputRef = React.useRef<HTMLInputElement>(null)

  const createEvent = useStore((state) => state.createEvent)

  const handleCreate = () => {
    if (!inputRef.current) return
    createEvent({
      title: inputRef.current.value,
    })
    inputRef.current.value = ""
  }

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const element = e.target as HTMLInputElement
      if (!element.value) return

      createEvent({
        title: element.value,
      })
      element.value = ""
    }
  }

  return (
    <InputGroup w="full">
      <Input
        ref={inputRef}
        w="full"
        placeholder="Enter event title"
        onKeyPress={onKeyPress}
        focusBorderColor="teal.500"
      />
      <InputRightElement width="5rem">
        <Button size="sm" variant="ghost" onClick={handleCreate}>
          Create
        </Button>
      </InputRightElement>
    </InputGroup>
  )
}

EventCreator.displayName = "EventCreator"

export default React.memo(EventCreator)
