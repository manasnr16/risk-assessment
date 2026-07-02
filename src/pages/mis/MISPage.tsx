import { Link } from "react-router-dom"
import { ArrowLeft, FilePlus, PencilLine, Zap, LayoutDashboard, ClipboardList, ArrowUpRight } from "lucide-react"
import { Shell } from "@/components/Shell"

const cards = [
  {
    title: "New MIS Request",
    description: "Request an entirely new report or MIS to be built from scratch.",
    icon: FilePlus,
    href: "/mis/new-request",
    code: "MR-NEW",
  },
  {
    title: "MIS Change Request",
    description: "Add, redefine, or remove a metric or change an existing report.",
    icon: PencilLine,
    href: "/mis/change-request",
    code: "MR-CHG",
  },
  {
    title: "Adhoc Request",
    description: "A one-off data pull, question, or investigation.",
    icon: Zap,
    href: "/mis/adhoc",
    code: "MR-ADH",
  },
  {
    title: "Existing MIS",
    description: "Browse existing MIS reports and repositories.",
    icon: LayoutDashboard,
    href: "/mis/existing",
    code: "MR-EXS",
  },
  {
    title: "Track Requests",
    description: "View status of submitted requests.",
    icon: ClipboardList,
    href: "/mis/track",
    code: "MR-TRK",
  },
]

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
    <span className="font-mono uppercase tracking-wide text-white/80">MIS & Reporting</span>
  </div>
)

export function MISPage() {
  return (
    <Shell breadcrumb={breadcrumb}>
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-12">
        <div className="max-w-2xl">
          <span className="text-xs font-mono uppercase tracking-[0.18em] text-accent-ink">
            MIS & Reporting
          </span>
          <h1 className="mt-2 font-display text-3xl sm:text-4xl text-ink tracking-tight">
            Management Information
          </h1>
          <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
            Submit requests, browse existing reports, and track the status of your MIS submissions.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map(({ title, description, icon: Icon, href, code }) => (
            <Link
              key={href}
              to={href}
              className="group relative flex flex-col w-full text-left rounded-xl border border-line bg-surface p-5 pl-6 shadow-[0_1px_2px_rgba(16,24,38,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_12px_24px_-12px_rgba(16,24,38,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <span className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full bg-line-soft group-hover:bg-accent transition-colors duration-200" />

              <div className="flex items-start justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/5 text-primary ring-1 ring-primary/10 group-hover:bg-accent-soft group-hover:text-accent-ink group-hover:ring-accent-soft transition-colors duration-200">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <ArrowUpRight className="h-4 w-4 text-ink-faint opacity-0 -translate-x-1 translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:text-accent-ink" />
              </div>

              <h3 className="mt-4 font-display text-[17px] leading-snug text-ink">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft flex-1">{description}</p>

              <div className="mt-4 border-t border-line-soft pt-3">
                <span className="inline-flex items-center rounded-full border border-line bg-line-soft px-2.5 py-0.5 text-[11px] font-semibold tracking-wide font-mono uppercase text-ink-soft">
                  {code}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Shell>
  )
}
