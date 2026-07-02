import { Link } from "react-router-dom"
import { ArrowLeft, Eye } from "lucide-react"
import { Shell } from "@/components/Shell"
import { Badge } from "@/components/ui/badge"
import {
  bauReports,
  reportMetadata,
  runLog,
  makerCheckerReports,
  qcReports,
} from "@/data/mis"

const breadcrumb = (
  <div className="flex items-center gap-2 text-xs">
    <Link to="/" className="flex items-center gap-1.5 text-white/60 hover:text-white transition-colors">
      <ArrowLeft className="h-3.5 w-3.5" />
      Departments
    </Link>
    <span className="text-white/30">/</span>
    <Link to="/mis" className="text-white/60 hover:text-white transition-colors font-mono uppercase tracking-wide">
      MIS & Reporting
    </Link>
    <span className="text-white/30">/</span>
    <span className="font-mono uppercase tracking-wide text-white/80">Existing MIS</span>
  </div>
)

const thCls = "px-4 py-3 text-left text-[11px] font-mono uppercase tracking-[0.12em] text-ink-faint whitespace-nowrap"
const tdCls = "px-4 py-3 text-sm text-ink-soft"

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-line bg-surface overflow-hidden shadow-[0_1px_2px_rgba(16,24,38,0.04)]">
      <div className="px-6 py-4 border-b border-line">
        <h3 className="text-[11px] font-mono uppercase tracking-[0.16em] text-ink-faint">{title}</h3>
      </div>
      {children}
    </div>
  )
}

function statusVariant(status: string) {
  if (status === "Active" || status === "Approved") return "signal"
  if (status === "Under Review" || status === "Pending Review") return "accent"
  return "default"
}

export function ExistingMISPage() {
  return (
    <Shell breadcrumb={breadcrumb}>
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-12">
        <div className="max-w-2xl mb-10">
          <span className="text-xs font-mono uppercase tracking-[0.18em] text-accent-ink">Existing MIS</span>
          <h1 className="mt-2 font-display text-3xl text-ink tracking-tight">Report Repository</h1>
          <p className="mt-2 text-[15px] text-ink-soft">
            Browse current BAU reports, run logs, quality control outputs, and maker-checker status.
          </p>
        </div>

        <div className="space-y-6">

          {/* BAU Reports */}
          <SectionCard title="BAU Reports">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-line bg-paper/50">
                  <tr>
                    <th className={thCls}>Report</th>
                    <th className={thCls}>Size</th>
                    <th className={thCls}>Last Updated</th>
                    <th className={thCls}>Status</th>
                    <th className={thCls}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {bauReports.map((row) => (
                    <tr key={row.id} className="border-t border-line hover:bg-paper/40 transition-colors">
                      <td className={`${tdCls} font-medium text-ink`}>{row.report}</td>
                      <td className={tdCls}>{row.size}</td>
                      <td className={`${tdCls} font-mono text-xs`}>{row.lastUpdated}</td>
                      <td className={tdCls}>
                        <Badge variant={statusVariant(row.status)}>{row.status}</Badge>
                      </td>
                      <td className={tdCls}>
                        <button className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary-soft transition-colors">
                          <Eye className="h-3.5 w-3.5" />
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionCard>

          {/* Report Metadata */}
          <SectionCard title="Report Metadata">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-line bg-paper/50">
                  <tr>
                    <th className={thCls}>Model</th>
                    <th className={thCls}>Window</th>
                    <th className={thCls}>Score Column</th>
                    <th className={thCls}>Months</th>
                  </tr>
                </thead>
                <tbody>
                  {reportMetadata.map((row, i) => (
                    <tr key={i} className="border-t border-line hover:bg-paper/40 transition-colors">
                      <td className={`${tdCls} font-medium text-ink`}>{row.model}</td>
                      <td className={`${tdCls} font-mono text-xs`}>{row.window}</td>
                      <td className={`${tdCls} font-mono text-xs text-accent-ink`}>{row.scoreColumn}</td>
                      <td className={tdCls}>{row.months}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionCard>

          {/* Latest Run Log */}
          <SectionCard title="Latest Run Log">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-line bg-paper/50">
                  <tr>
                    <th className={thCls}>Model</th>
                    <th className={thCls}>Window</th>
                    <th className={`${thCls} text-right`}>Population</th>
                    <th className={`${thCls} text-right`}>Included</th>
                    <th className={`${thCls} text-right`}>Excluded</th>
                  </tr>
                </thead>
                <tbody>
                  {runLog.map((row, i) => (
                    <tr key={i} className="border-t border-line hover:bg-paper/40 transition-colors">
                      <td className={`${tdCls} font-medium text-ink`}>{row.model}</td>
                      <td className={`${tdCls} font-mono text-xs`}>{row.window}</td>
                      <td className={`${tdCls} text-right font-mono text-xs`}>{row.population}</td>
                      <td className={`${tdCls} text-right font-mono text-xs text-signal`}>{row.included}</td>
                      <td className={`${tdCls} text-right font-mono text-xs text-accent-ink`}>{row.excluded}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionCard>

          {/* Maker Checker */}
          <SectionCard title="Maker Checker Reports">
            <div className="divide-y divide-line">
              {makerCheckerReports.map((row) => (
                <div key={row.id} className="flex items-center justify-between px-6 py-4 hover:bg-paper/40 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-ink">{row.reportName}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={statusVariant(row.reviewStatus)}>{row.reviewStatus}</Badge>
                    <button className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary-soft transition-colors">
                      <Eye className="h-3.5 w-3.5" />
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* QC Reports */}
          <SectionCard title="QC Reports">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-line bg-paper/50">
                  <tr>
                    <th className={thCls}>Model</th>
                    <th className={thCls}>Window</th>
                    <th className={`${thCls} text-right`}>Bad Rate</th>
                    <th className={`${thCls} text-right`}>Avg Score</th>
                    <th className={thCls}>Top Decision Reasons</th>
                  </tr>
                </thead>
                <tbody>
                  {qcReports.map((row, i) => (
                    <tr key={i} className="border-t border-line hover:bg-paper/40 transition-colors">
                      <td className={`${tdCls} font-medium text-ink`}>{row.model}</td>
                      <td className={`${tdCls} font-mono text-xs`}>{row.window}</td>
                      <td className={`${tdCls} text-right font-mono text-xs text-accent-ink`}>{row.badRate}</td>
                      <td className={`${tdCls} text-right font-mono text-xs`}>{row.avgScore}</td>
                      <td className={`${tdCls} max-w-xs`}>{row.topDecisionReasons}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionCard>

        </div>
      </div>
    </Shell>
  )
}
