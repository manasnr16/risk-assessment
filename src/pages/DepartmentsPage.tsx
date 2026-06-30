import { Shell } from "@/components/Shell"
import { DepartmentCard } from "@/components/DepartmentCard"
import { departments } from "@/data/hierarchy"

export function DepartmentsPage() {
  return (
    <Shell>
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-12">
        <div className="max-w-2xl">
          <span className="text-base font-mono uppercase tracking-[0.18em] text-accent-ink">
            Departments
          </span>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {departments.map((department) => (
            <DepartmentCard key={department.id} department={department} />
          ))}
        </div>
      </div>
    </Shell>
  )
}
