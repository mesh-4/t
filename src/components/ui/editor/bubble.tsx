import * as React from "react"
import { BubbleMenu, Editor } from "@tiptap/react"
import { FontBoldIcon, FontItalicIcon, StrikethroughIcon, CodeIcon, QuoteIcon } from "@radix-ui/react-icons"

import { Toggle } from "@/components/ui/toggle"

type EditorBubbleProps = {
  editor: Editor
}

function EditorBubble({ editor }: EditorBubbleProps) {
  return (
    <BubbleMenu className="bg-popover border p-1 rounded-lg" editor={editor} tippyOptions={{ duration: 100 }}>
      <Toggle
        size="sm"
        pressed={editor.isActive("bold")}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
        aria-label="Toggle bold">
        <FontBoldIcon />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("italic")}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
        aria-label="Toggle bold">
        <FontItalicIcon />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("strike")}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
        aria-label="Toggle strike through">
        <StrikethroughIcon />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("quote")}
        onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
        aria-label="Toggle quote">
        <QuoteIcon />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("code")}
        onPressedChange={() => editor.chain().focus().toggleCode().run()}
        aria-label="Toggle code">
        <CodeIcon />
      </Toggle>
    </BubbleMenu>
  )
}

export default EditorBubble
