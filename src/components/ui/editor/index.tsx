"use client"

import * as React from "react"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Link from "@tiptap/extension-link"
import Placeholder from "@tiptap/extension-placeholder"

import { EDITOR_EMPTY_VALUE } from "./constants"
import EditorBubble from "./bubble"

type EditorProps = {
  initialVal?: string | null
  onChange?: (value: string) => void
}

export function Editor({ initialVal, onChange }: EditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link,
      Placeholder.configure({
        placeholder: "Write something …",
      }),
    ],
    content: JSON.parse(initialVal || EDITOR_EMPTY_VALUE),
    editorProps: {
      attributes: {
        class: "prose dark:prose-invert w-full focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      const json = editor.getJSON()
      onChange?.(JSON.stringify(json))
    },
  })

  const onGroundClick = React.useCallback(() => {
    if (!editor) return
    editor.chain().focus("end").run()
  }, [editor])

  return (
    <>
      <EditorContent editor={editor} />
      {editor && <EditorBubble editor={editor} />}
    </>
  )
}
