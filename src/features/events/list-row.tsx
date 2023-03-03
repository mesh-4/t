import * as React from "react"
import { useQueryClient } from "@tanstack/react-query"
import { Flex, Text, Center, Button } from "@chakra-ui/react"
import { ListChildComponentProps, areEqual } from "react-window"

import { useDeleteEvent } from "@/hooks/events/mutations"
import type { Event } from "@/api/event"

function EventsListRow({ index, style, data }: ListChildComponentProps<Event[]>) {
  const queryClient = useQueryClient()
  const { mutate: deleteEvent } = useDeleteEvent()

  const item = data[index]

  const onDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault()
    deleteEvent(item.id, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["events"],
        })
      },
    })
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
