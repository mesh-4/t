import * as React from "react"
import { Box, Flex, Text, Center, Button } from "@chakra-ui/react"
import { ListChildComponentProps, areEqual } from "react-window"

import { useStore, BoxEvent } from "@/store"

function EventsListRow({ index, style, data }: ListChildComponentProps<BoxEvent[]>) {
  const deleteEvent = useStore((state) => state.deleteEvent)

  const item = data[index]

  const onDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault()
    deleteEvent(item.id)
  }

  return (
    <div style={style}>
      <Flex
        mt="5px"
        pl={4}
        alignItems="center"
        justifyContent="space-between"
        border="1px"
        h="40px"
        rounded="md"
        borderColor="gray.600">
        <Text>{item.title}</Text>
        <Center w="5rem">
          <Button mx="auto" size="sm" variant="ghost" onClick={onDeleteClick}>
            Delete
          </Button>
        </Center>
      </Flex>
    </div>
  )
}

export default React.memo(EventsListRow, areEqual)
