import Link from "next/link"

export default function NotFoundEvent() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested event</p>
      <Link href="/app">Return Home</Link>
    </div>
  )
}
