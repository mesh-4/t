"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type LangSelectorProps = {
  defaultValue?: string
} & React.ComponentPropsWithoutRef<typeof SelectTrigger>

function LangSelector({ defaultValue = "en", ...triggerProps }: LangSelectorProps) {
  const router = useRouter()

  const onChange = React.useCallback((value: string) => {
    document.cookie = `lang=${value};path=/`
    router.refresh()
  }, [])

  return (
    <>
      <Select defaultValue={defaultValue} onValueChange={onChange}>
        <SelectTrigger {...triggerProps}>
          <SelectValue placeholder="Lang" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="en">English</SelectItem>
          <SelectItem value="zh-TW">繁體中文</SelectItem>
        </SelectContent>
      </Select>
    </>
  )
}

LangSelector.displayName = "LangSelector"

export default LangSelector
