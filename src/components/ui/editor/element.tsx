import * as React from "react"
import { RenderElementProps } from "slate-react"

function EditorElement({ attributes, children, element }: RenderElementProps) {
  switch (element.type) {
    case "block-quote":
      return <blockquote {...attributes}>{children}</blockquote>
    case "ordered-list":
      return <ol {...attributes}>{children}</ol>
    case "bulleted-list":
      return <ul {...attributes}>{children}</ul>
    case "heading-one":
      return <h1 {...attributes}>{children}</h1>
    case "heading-two":
      return <h2 {...attributes}>{children}</h2>
    case "heading-three":
      return <h3 {...attributes}>{children}</h3>
    case "heading-four":
      return <h4 {...attributes}>{children}</h4>
    case "list-item":
      return <li {...attributes}>{children}</li>
    default:
      return <p {...attributes}>{children}</p>
  }
}

export default EditorElement
