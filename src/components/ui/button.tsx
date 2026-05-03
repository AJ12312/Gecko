import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "rounded-full bg-gradient-to-br from-white/12 to-white/6 border border-white/10 shadow-[0_2px_12px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.08)] text-white/80 hover:from-white/18 hover:to-white/10 hover:text-white hover:-translate-y-px",
        destructive:
          "rounded-full bg-destructive text-white hover:bg-destructive/90",
        outline:
          "rounded-full border border-white/10 bg-transparent hover:bg-white/05 hover:text-white text-white/60",
        secondary:
          "rounded-full bg-white/06 text-white/60 hover:bg-white/10 hover:text-white",
        ghost:
          "rounded-sm hover:bg-white/05 hover:text-white text-white/60",
        link:
          "text-white underline-offset-4 hover:underline",
        emerald:
          "rounded-full bg-[#10B981] text-[#0F1115] font-semibold hover:bg-[#059669] shadow-[0_4px_16px_rgba(16,185,129,0.25)]",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm:      "h-8 px-4 text-xs",
        lg:      "h-12 px-8 text-base",
        icon:    "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
