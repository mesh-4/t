import * as React from "react"
import { withHistory } from "slate-history"
import { Editable, ReactEditor, Slate, withReact, RenderElementProps } from "slate-react"
import { createEditor, Editor as SlateEditor, Element as SlateElement, Node as SlateNode, Descendant } from "slate"

import EditorElement from "./element"
import { withShortcuts, SHORTCUTS } from "./plugins/shortcuts"

const INITIAL_VALUE: Descendant[] = [
  {
    type: "paragraph",
    children: [
      {
        text: "",
      },
    ],
  },
]

export function Editor() {
  const renderElement = React.useCallback((props: RenderElementProps) => <EditorElement {...props} />, [])
  const editor = React.useMemo(() => withShortcuts(withReact(withHistory(createEditor()))), [])

  const handleDOMBeforeInput = React.useCallback(
    (e: InputEvent) => {
      queueMicrotask(() => {
        const pendingDiffs = ReactEditor.androidPendingDiffs(editor)

        const scheduleFlush = pendingDiffs?.some(({ diff, path }) => {
          if (!diff.text.endsWith(" ")) {
            return false
          }

          const { text } = SlateNode.leaf(editor, path)
          const beforeText = text.slice(0, diff.start) + diff.text.slice(0, -1)
          if (!(beforeText in SHORTCUTS)) {
            return
          }

          const blockEntry = SlateEditor.above(editor, {
            at: path,
            match: (n) => SlateElement.isElement(n) && SlateEditor.isBlock(editor, n),
          })
          if (!blockEntry) {
            return false
          }

          const [, blockPath] = blockEntry
          return SlateEditor.isStart(editor, SlateEditor.start(editor, path), blockPath)
        })

        if (scheduleFlush) {
          ReactEditor.androidScheduleFlush(editor)
        }
      })
    },
    [editor]
  )

  return (
    <Slate editor={editor} initialValue={INITIAL_VALUE}>
      <Editable
        className="outline-none px-3 prose prose-stone dark:prose-invert porse-p:m-0"
        onDOMBeforeInput={handleDOMBeforeInput}
        renderElement={renderElement}
        placeholder="Anything to do..."
        renderPlaceholder={({ children, attributes }) => (
          <div {...attributes} style={{ ...attributes["style"], opacity: 1 }}>
            <p className="m-0 text-muted-foreground">{children}</p>
          </div>
        )}
        spellCheck
        autoFocus
      />
    </Slate>
  )
}
