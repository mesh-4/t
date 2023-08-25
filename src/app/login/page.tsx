import { Suspense } from "react"

import { Button } from "@/components/ui/button"

import SignInForm from "./form"

export default function SignInPage() {
  return (
    <div className="z-10 mx-auto mt-[calc(30vh)] h-fit w-full max-w-md overflow-hidden sm:rounded-2xl sm:shadow-xl">
      <div className="flex flex-col items-center justify-center space-y-3 dark:bg-black px-4 py-6 pt-8 text-center sm:px-16">
        <h3 className="text-xl font-semibold">Sign in to T</h3>
        <p className="text-sm text-gray-500">Note, Schedule</p>
      </div>
      <Suspense
        fallback={
          <div className="flex flex-col space-y-3 bg-gray-50 px-4 py-8 sm:px-16">
            <Button disabled variant="secondary" />
            <div className="mx-auto h-5 w-3/4 rounded-lg bg-gray-100" />
          </div>
        }>
        <SignInForm />
      </Suspense>
    </div>
  )
}
