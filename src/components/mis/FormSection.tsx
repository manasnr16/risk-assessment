import { cn } from "@/lib/utils"

interface FormSectionProps {
  title: string
  children: React.ReactNode
  className?: string
}

export function FormSection({ title, children, className }: FormSectionProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <div className="border-b border-line pb-2.5">
        <p className="text-[11px] font-mono uppercase tracking-[0.16em] text-ink-faint">
          {title}
        </p>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  )
}
