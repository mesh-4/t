"use client"

import * as React from "react"
import { isSameDay } from "date-fns"

import { useStore } from "@/store"

import BoxerTimeline from "./timeline"
import EventsLayer from "./events/layer"
import EventPlaceholder from "./events/placeholder"
import CurrentTimeIndicator from "./indicator/current-time"

type BoxerProps = {
  layerClassName?: string
}

function Boxer({ layerClassName }: BoxerProps) {
  const date = useStore((state) => state.date)

  return (
    <EventsLayer className={layerClassName}>
      {isSameDay(new Date(date), new Date()) && <CurrentTimeIndicator />}
      <BoxerTimeline />
      <EventPlaceholder />
    </EventsLayer>
  )
}

Boxer.displayName = "Boxer"

export default React.memo(Boxer)
