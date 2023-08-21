"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Select } from "@radix-ui/themes"

type LangSelectorProps = {
  defaultValue?: string
} & React.ComponentPropsWithoutRef<typeof Select.Trigger>

const LangSelector = ({ defaultValue = "en", ...triggerProps }: LangSelectorProps) => {
  const router = useRouter()

  const onChange = React.useCallback((value: string) => {
    document.cookie = `lang=${value};path=/`
    router.refresh()
  }, [])

  return (
    <Select.Root defaultValue={defaultValue} onValueChange={onChange}>
      <Select.Trigger placeholder="Lang" />
      <Select.Content>
        <Select.Group>
          <Select.Item value="en">English</Select.Item>
          <Select.Item value="zh-TW">繁體中文</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  )
}

export default LangSelector
