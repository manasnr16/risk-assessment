import { useState } from "react"
import { Link, Navigate, useParams } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { Shell } from "@/components/Shell"
import { HierarchyTree } from "@/components/HierarchyTree"
import { SidePanel } from "@/components/SidePanel"
import { getDepartment, type ChildNode } from "@/data/hierarchy"

export function HierarchyPage() {
  const { departmentId } = useParams<{ departmentId: string }>()
  const department = departmentId ? getDepartment(departmentId) : undefined
  const [selected, setSelected] = useState<ChildNode | null>(null)

  if (!department) {
    return <Navigate to="/" replace />
  }

  const breadcrumb = (
    <div className="flex items-center gap-2 text-xs">
      <Link
        to="/"
        className="flex items-center gap-1.5 text-white/60 hover:text-white transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Departments
      </Link>
      <span className="text-white/30">/</span>
      <span className="font-mono uppercase tracking-wide text-white/80">
        {department.code} · {department.shortName}
      </span>
    </div>
  )

  return (
    <Shell breadcrumb={breadcrumb}>
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-12">
        <div className="max-w-2xl">
          <span className="text-xs font-mono uppercase tracking-[0.18em] text-accent-ink">
            Reporting Units
          </span>
          <h1 className="mt-2 font-display text-3xl sm:text-4xl text-ink tracking-tight">
            {department.name}
          </h1>
          <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
            {department.summary} Select a unit below to view its detail panel.
          </p>
        </div>

        <div className="mt-14 rounded-2xl border border-line bg-surface/60 px-6 py-14 sm:px-10">
          <HierarchyTree
            department={department}
            selectedId={selected?.id ?? null}
            onSelect={(node) => setSelected(node)}
          />
        </div>
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-20 bg-ink/10 backdrop-blur-[1px]"
          onClick={() => setSelected(null)}
          aria-hidden="true"
        />
      )}
      <SidePanel node={selected} onClose={() => setSelected(null)} />
    </Shell>
  )
}
