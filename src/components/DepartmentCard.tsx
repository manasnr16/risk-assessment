import { ArrowUpRight } from "lucide-react"
import { useNavigate } from "react-router-dom"
import type { Department } from "@/data/hierarchy"
import { deptIconMap } from "@/components/icon-map"
import { Badge } from "@/components/ui/badge"

export function DepartmentCard({ department }: { department: Department }) {
  const navigate = useNavigate()
  const Icon = deptIconMap[department.icon]
  const destination = department.id === "mis-reporting" ? "/mis" : `/department/${department.id}`

  return (
    <button
      onClick={() => navigate(destination)}
      className="group relative w-full text-left rounded-xl border border-line bg-surface p-5 pl-6 shadow-[0_1px_2px_rgba(16,24,38,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_12px_24px_-12px_rgba(16,24,38,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
    >
      <span className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full bg-line-soft group-hover:bg-accent transition-colors duration-200" />

      <div className="flex items-start justify-between">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/5 text-primary ring-1 ring-primary/10 group-hover:bg-accent-soft group-hover:text-accent-ink group-hover:ring-accent-soft transition-colors duration-200">
          <Icon className="h-5 w-5" strokeWidth={1.75} />
        </span>
        <ArrowUpRight className="h-4 w-4 text-ink-faint opacity-0 -translate-x-1 translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:text-accent-ink" />
      </div>

      <h3 className="mt-4 font-display text-[17px] leading-snug text-ink">
        {department.name}
      </h3>
      <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
        {department.summary}
      </p>

      <div className="mt-4 flex items-center border-t border-line-soft pt-3">
        <Badge variant="default">{department.code}</Badge>
      </div>
    </button>
  )
}
