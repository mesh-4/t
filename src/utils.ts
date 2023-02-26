export const prefixWith = (prefix: string) => (id: string | number) => `${prefix}-${id}`

export const displayTime = (time: number) => (time < 10 ? `0${time}` : time)

export const getSlotY = (id: string) => {
  const slot = document.getElementById(id)
  return slot?.offsetTop ?? 0
}
