import { startOfDay } from "date-fns"

export const prefixWith = (prefix: string) => (id: string | number) => `${prefix}-${id}`

export const padNumWithZero = (val: number) => (val < 10 ? `0${val}` : val)

export const getSlotY = (id: string) => {
  const slot = document.getElementById(id)
  return slot?.offsetTop ?? 0
}

const slotHeight = 20

const totalHeight = slotHeight * 4 * 24

const allSlots = Array.from({ length: 24 * 4 }, (_, i) => {
  const hour = Math.floor(i / 4)
  const minute = (i % 4) * 15
  return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
})

export function getTimeByY(y: number) {
  const hour = Math.floor(y / (totalHeight / 24))
  const minute = Math.floor((y % (totalHeight / 24)) / (totalHeight / 24 / 4))
  return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
}

export function getYByTime(time: number) {
  const date = new Date(time)
  const hour = date.getHours()
  const minutes = date.getMinutes()
  return (hour + minutes / 60) * (totalHeight / 24)
}

export function getClosetSlotByY(targetY: number) {
  const distance = Math.abs(targetY - 8)

  // Calculate the number of 15-minute units from topY to the targetY
  const numUnits = distance / 20

  // Calculate the number of minutes represented by the units
  const totalMinutes = numUnits * 15

  // Calculate the number of minutes from the last valid 15-minute slot
  const minutesFromLastSlot = totalMinutes % (24 * 60)

  // Calculate the closest valid 15-minute slot
  const closestIndex = Math.round(minutesFromLastSlot / 15) % allSlots.length
  const closestLabel = allSlots[closestIndex]

  return closestLabel
}

export function getDateToY(date: string) {
  const target = new Date(date)
  const dayStart = startOfDay(new Date(date))

  const distance = target.getTime() - dayStart.getTime()
  const minutes = Math.floor(distance / 1000 / 60)

  return (minutes * 20) / 15
}
