import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/utils"

const inputVariants = cva(
  "flex h-9 w-full bg-transparent px-3 py-1 text-sm transition-colors placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "rounded-md border border-input shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
        file: "file:border-0 file:bg-transparent file:text-sm file:font-medium",
        immerse: "outline-none focus:ring-0",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, variant, ...props }, ref) => {
  return <input type={type} className={cn(inputVariants({ variant, className }))} ref={ref} {...props} />
})
Input.displayName = "Input"

export { Input }
