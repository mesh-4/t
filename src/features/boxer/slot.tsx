import * as React from "react"
import { Box } from "@chakra-ui/react"

import { useStore } from "@/store"
import { padNumWithZero } from "@/utils"

type SlotProps = {
  idx: number
  date: string
  hour: number
}

function BoxerSlot({ idx, date, hour }: SlotProps) {
  const unit = useStore((state) => state.unit)
  const minute = idx * unit

  return (
    <Box
      flex="none"
      w="100%"
      h="15px"
      id={`${date}-${padNumWithZero(hour)}:${padNumWithZero(minute)}`}
      borderTop={minute === 0 ? "2px" : "1px"}
      borderColor="gray.700"
    />
  )
}

BoxerSlot.displayName = "BoxerSlot"

export default React.memo(BoxerSlot)
