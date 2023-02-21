import { isSameMonth } from "date-fns"

export const compareSameMonth = (prevDate: string, nextDate: string) => {
  return isSameMonth(new Date(prevDate), new Date(nextDate))
}
