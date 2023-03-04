import { useQuery, useInfiniteQuery } from "@tanstack/react-query"

import type { ReadEventsQuery } from "@/types"
import { getEvent, getEvents } from "@/api/event"

export function useEvent(id: string) {
  return useQuery({
    queryKey: ["event", id],
    queryFn: () => getEvent(id),
  })
}

export function useEventsOfDate(date: string) {
  const { data, ...others } = useQuery({
    queryKey: ["events", { date }],
    queryFn: () => getEvents({ date }),
  })
  const result = data?.data ?? []
  return { data: result, ...others }
}

const DEFAULT_QUERY: ReadEventsQuery = {
  order: "asc",
  orderBy: "createdAt",
}

export function useInfiniteEvents({ order, orderBy } = DEFAULT_QUERY) {
  return useInfiniteQuery({
    queryKey: ["events", { order, orderBy }],
    queryFn: ({ pageParam = 0 }) => getEvents({ page: pageParam.toString(), order, orderBy }),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.hasNextPage) {
        return allPages.length + 1
      }
      return undefined
    },
    getPreviousPageParam: () => undefined,
  })
}