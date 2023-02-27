import * as React from "react"
import padStart from "lodash/padStart"
import { Box } from "@chakra-ui/react"

import { SLOT_UNIT } from "@/constants"

type SlotProps = {
  idx: number
  date: string
  hour: number
}

function BoxerSlot({ idx, date, hour }: SlotProps) {
  const minute = idx * SLOT_UNIT

  const slotId = React.useMemo(() => {
    return `${date}-${padStart(hour.toString(), 2, "0")}:${padStart(minute.toString(), 2, "0")}`
  }, [date, hour, minute])

  return <Box w="100%" h="20px" id={slotId} borderTop={minute === 0 ? "2px" : "1px"} borderColor="gray.700" />
}

BoxerSlot.displayName = "BoxerSlot"

export default React.memo(BoxerSlot)
