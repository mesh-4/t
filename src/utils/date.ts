import { SLOT_UNIT, SLOT_LABELS, SLOTS_HEIGHT, SLOT_HEIGHT } from "@/constants"

export function prefixWith(prefix: string) {
  return (id: string | number) => {
    return `${prefix} ${id}`
  }
}

export function getTimeByY(y: number) {
  const hour = Math.floor(y / (SLOTS_HEIGHT / 24))
  const minutes = Math.floor((y % (SLOTS_HEIGHT / 24)) / (SLOTS_HEIGHT / 24 / 4))

  return hour.toString().padStart(2, "0").concat(":", minutes.toString().padStart(2, "0"))
}

export function getYByTime(time: number | string) {
  const date = new Date(time)
  const hour = date.getHours()
  const minutes = date.getMinutes()

  return (hour + minutes / 60) * (SLOTS_HEIGHT / 24)
}

export function getClosetSlotByY(targetY: number) {
  const distance = Math.abs(targetY - 8)

  // Calculate the number of 15-minute units from topY to the targetY
  const numUnits = distance / SLOT_HEIGHT

  // Calculate the number of minutes represented by the units
  const totalMinutes = numUnits * SLOT_UNIT

  // Calculate the number of minutes from the last valid 15-minute slot
  const minutesFromLastSlot = totalMinutes % (24 * 60)

  // Calculate the closest valid 15-minute slot
  const closestIndex = Math.round(minutesFromLastSlot / SLOT_UNIT) % SLOT_LABELS.length
  const closestLabel = SLOT_LABELS[closestIndex]

  return closestLabel
}

export function getClosetSlotByTime(time: number | string) {
  const y = getYByTime(time)
  return getClosetSlotByY(y)
}

export function getTimezoneOffsetHour() {
  const hours = new Date().getTimezoneOffset() / 60
  return -1 * hours
}

export function getDateWithOffset(input: string, offset?: number): Date {
  const date = new Date(input)
  if (offset) {
    date.setDate(date.getDate() + offset)
  }
  return date
}
