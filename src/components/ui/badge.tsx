import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold tracking-wide font-mono uppercase",
  {
    variants: {
      variant: {
        default: "border-line bg-line-soft text-ink-soft",
        accent: "border-accent-soft bg-accent-soft text-accent-ink",
        signal: "border-signal-soft bg-signal-soft text-signal",
        primary: "border-primary/15 bg-primary/5 text-primary",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
