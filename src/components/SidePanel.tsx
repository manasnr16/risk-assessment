import { FileStack, Sparkles, FileBarChart2, X } from "lucide-react"
import type { ChildNode } from "@/data/hierarchy"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const futureModules = [
  {
    icon: FileStack,
    title: "Future Forms",
    description: "Structured intake and assessment forms for this unit.",
  },
  {
    icon: Sparkles,
    title: "Future AI Analysis",
    description: "Model-assisted insight and anomaly detection.",
  },
  {
    icon: FileBarChart2,
    title: "Future Reports",
    description: "Scheduled and ad-hoc reporting outputs.",
  },
]

interface SidePanelProps {
  node: ChildNode | null
  onClose: () => void
}

export function SidePanel({ node, onClose }: SidePanelProps) {
  return (
    <aside
      className={cn(
        "fixed inset-y-0 right-0 z-30 w-full max-w-sm border-l border-line bg-surface shadow-[-16px_0_40px_-24px_rgba(16,24,38,0.35)] transition-transform duration-300 ease-out",
        node ? "translate-x-0" : "translate-x-full",
      )}
      aria-hidden={!node}
    >
      {node && (
        <div className="flex h-full flex-col">
          <div className="flex items-start justify-between border-b border-line px-6 py-5">
            <div>
              <Badge variant="accent">{node.code}</Badge>
              <h3 className="mt-2.5 font-display text-xl leading-snug text-ink">
                {node.name}
              </h3>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} aria-label="Close panel">
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
            <section>
              <p className="text-[11px] font-mono uppercase tracking-[0.14em] text-ink-faint">
                Description
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {node.description}
              </p>
            </section>

            <section>
              <p className="text-[11px] font-mono uppercase tracking-[0.14em] text-ink-faint">
                Planned Modules
              </p>
              <div className="mt-3 space-y-2.5">
                {futureModules.map(({ icon: Icon, title, description }) => (
                  <div
                    key={title}
                    className="flex items-start gap-3 rounded-lg border border-dashed border-line bg-paper/60 px-4 py-3.5"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/5 text-primary ring-1 ring-primary/10">
                      <Icon className="h-4 w-4" strokeWidth={1.75} />
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-ink">{title}</p>
                        <Badge variant="default" className="font-sans normal-case font-medium">
                          Coming soon
                        </Badge>
                      </div>
                      <p className="mt-0.5 text-xs leading-relaxed text-ink-faint">
                        {description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="border-t border-line px-6 py-4">
            <p className="text-xs text-ink-faint">
              Unit of{" "}
              <span className="font-mono text-ink-soft">{node.id.split("-")[0]}</span>
            </p>
          </div>
        </div>
      )}
    </aside>
  )
}
