import { Layers } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ChildNode, Department } from "@/data/hierarchy"

interface HierarchyTreeProps {
  department: Department
  selectedId: string | null
  onSelect: (node: ChildNode) => void
}

export function HierarchyTree({ department, selectedId, onSelect }: HierarchyTreeProps) {
  return (
    <div className="flex flex-col items-center">
      {/* Parent node */}
      <div className="relative w-full max-w-sm rounded-xl bg-primary text-white px-6 py-5 shadow-[0_16px_32px_-16px_rgba(15,27,46,0.45)] ring-1 ring-primary-deep/40">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/15">
            <Layers className="h-4.5 w-4.5 text-accent" strokeWidth={1.75} />
          </span>
          <div className="min-w-0">
            <p className="text-[10px] font-mono uppercase tracking-[0.16em] text-white/55">
              {department.code}
            </p>
            <h2 className="font-display text-lg leading-snug truncate">
              {department.name}
            </h2>
          </div>
        </div>
      </div>

      {/* Connectors + children */}
      <div className={cn("org-tree-children w-full gap-2.5 sm:gap-6", department.children.length === 1 && "single")}>
        {department.children.map((child) => {
          const isSelected = child.id === selectedId
          return (
            <div key={child.id} className="org-tree-child flex justify-center">
              <button
                onClick={() => onSelect(child)}
                aria-pressed={isSelected}
                className={cn(
                  "group w-full max-w-[230px] rounded-xl border bg-surface px-3 py-3 sm:px-4 sm:py-4 text-left shadow-[0_1px_2px_rgba(16,24,38,0.04)] transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                  isSelected
                    ? "border-accent ring-2 ring-accent-soft shadow-[0_12px_24px_-14px_rgba(184,116,47,0.45)]"
                    : "border-line hover:border-primary/30 hover:shadow-[0_12px_24px_-14px_rgba(16,24,38,0.18)]",
                )}
              >
                <p
                  className={cn(
                    "text-[10px] font-mono uppercase tracking-[0.14em]",
                    isSelected ? "text-accent-ink" : "text-ink-faint",
                  )}
                >
                  {child.code}
                </p>
                <p className="mt-1 font-display text-[15px] leading-snug text-ink">
                  {child.name}
                </p>
                <div className="mt-2.5 flex items-center gap-1.5">
                  <span
                    className={cn(
                      "h-1.5 w-1.5 rounded-full",
                      isSelected ? "bg-accent" : "bg-line group-hover:bg-primary/40",
                    )}
                  />
                  <span className="text-[11px] text-ink-faint whitespace-nowrap">
                    {isSelected ? "Selected" : "Reporting unit"}
                  </span>
                </div>
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
