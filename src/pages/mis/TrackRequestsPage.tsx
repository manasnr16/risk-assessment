import { useState } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, CheckCircle, XCircle, Clock, AlertCircle } from "lucide-react"
import { Shell } from "@/components/Shell"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { trackRequests, type TrackRequest } from "@/data/mis"
import { cn } from "@/lib/utils"
import { inputCls, textareaCls } from "@/components/mis/FormField"

type Tab = "all" | "New MIS" | "Change Request" | "Adhoc"

interface ApprovalState {
  approverName: string
  comments: string
  action?: "approved" | "rejected"
}

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
    <span className="font-mono uppercase tracking-wide text-white/80">Track Requests</span>
  </div>
)

function statusIcon(status: TrackRequest["status"]) {
  if (status === "Approved") return <CheckCircle className="h-4 w-4 text-signal" />
  if (status === "Rejected") return <XCircle className="h-4 w-4 text-red-400" />
  if (status === "In Review") return <AlertCircle className="h-4 w-4 text-accent" />
  return <Clock className="h-4 w-4 text-ink-faint" />
}

function statusBadgeVariant(status: TrackRequest["status"]) {
  if (status === "Approved") return "signal"
  if (status === "In Review") return "accent"
  return "default"
}

function RequestCard({
  request,
  approval,
  onApprovalChange,
  onAction,
}: {
  request: TrackRequest
  approval: ApprovalState
  onApprovalChange: (update: Partial<ApprovalState>) => void
  onAction: (action: "approved" | "rejected") => void
}) {
  return (
    <div className="rounded-xl border border-line bg-surface shadow-[0_1px_2px_rgba(16,24,38,0.04)] overflow-hidden">
      {/* Header */}
      <div className="flex items-start justify-between px-6 py-4 border-b border-line bg-paper/30">
        <div className="flex items-center gap-3">
          {statusIcon(request.status)}
          <div>
            <p className="text-xs font-mono text-ink-faint uppercase tracking-wide">{request.id}</p>
            <p className="font-display text-base text-ink">{request.type}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={statusBadgeVariant(request.status)}>{request.status}</Badge>
          <Badge variant="default">{request.submittedAt}</Badge>
        </div>
      </div>

      {/* Details grid */}
      <div className="px-6 py-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
        <Detail label="Requester" value={request.requester} />
        <Detail label="Department" value={request.department} />
        <Detail label="TAT" value={request.tat} />
        <Detail label="Models Affected" value={request.modelsAffected.join(", ")} mono />
        <Detail label="Display Format" value={request.displayFormat.join(", ")} />
        <Detail
          label="Sample Output"
          value={request.sampleOutput ?? "—"}
          mono={!!request.sampleOutput}
        />
        <div className="sm:col-span-2 lg:col-span-3">
          <Detail label="Justification" value={request.justification} />
        </div>
        <div className="sm:col-span-2 lg:col-span-3">
          <Detail label="Metric Definition" value={request.metricDefinition} />
        </div>
      </div>

      {/* Approval section */}
      <div className="border-t border-line px-6 py-5 bg-paper/20">
        <p className="text-[11px] font-mono uppercase tracking-[0.14em] text-ink-faint mb-4">
          Approval
        </p>
        {approval.action ? (
          <div
            className={cn(
              "flex items-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium",
              approval.action === "approved"
                ? "border-signal-soft bg-signal-soft text-signal"
                : "border-red-200 bg-red-50 text-red-600",
            )}
          >
            {approval.action === "approved" ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              <XCircle className="h-4 w-4" />
            )}
            {approval.action === "approved" ? "Approved" : "Rejected"} by{" "}
            <span className="font-semibold">{approval.approverName || "Approver"}</span>
            {approval.comments && (
              <span className="text-xs font-normal ml-1">· {approval.comments}</span>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-ink">Approver Name</label>
                <input
                  className={inputCls}
                  placeholder="Approver name"
                  value={approval.approverName}
                  onChange={(e) => onApprovalChange({ approverName: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-ink">Comments</label>
                <textarea
                  className={`${textareaCls} min-h-[42px]`}
                  placeholder="Optional comments"
                  value={approval.comments}
                  onChange={(e) => onApprovalChange({ comments: e.target.value })}
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                onClick={() => onAction("approved")}
                className="bg-signal hover:bg-signal/90"
              >
                <CheckCircle className="h-3.5 w-3.5" />
                Approve
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onAction("rejected")}
                className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
              >
                <XCircle className="h-3.5 w-3.5" />
                Reject
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function Detail({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="space-y-0.5">
      <p className="text-[11px] font-mono uppercase tracking-[0.12em] text-ink-faint">{label}</p>
      <p className={cn("text-sm text-ink-soft", mono && "font-mono text-xs text-primary")}>{value}</p>
    </div>
  )
}

const tabs: { label: string; value: Tab }[] = [
  { label: "All", value: "all" },
  { label: "New MIS", value: "New MIS" },
  { label: "Change Request", value: "Change Request" },
  { label: "Adhoc", value: "Adhoc" },
]

export function TrackRequestsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("all")
  const [approvals, setApprovals] = useState<Record<string, ApprovalState>>(
    () =>
      Object.fromEntries(
        trackRequests.map((r) => [r.id, { approverName: "", comments: "" }]),
      ),
  )

  const filtered =
    activeTab === "all" ? trackRequests : trackRequests.filter((r) => r.type === activeTab)

  const updateApproval = (id: string, update: Partial<ApprovalState>) => {
    setApprovals((prev) => ({ ...prev, [id]: { ...prev[id], ...update } }))
  }

  const handleAction = (id: string, action: "approved" | "rejected") => {
    setApprovals((prev) => ({ ...prev, [id]: { ...prev[id], action } }))
  }

  return (
    <Shell breadcrumb={breadcrumb}>
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-12">
        <div className="max-w-2xl mb-8">
          <span className="text-xs font-mono uppercase tracking-[0.18em] text-accent-ink">
            Track Requests
          </span>
          <h1 className="mt-2 font-display text-3xl text-ink tracking-tight">Request Workflow</h1>
          <p className="mt-2 text-[15px] text-ink-soft">
            Review, approve, or reject submitted MIS requests.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-line mb-8">
          {tabs.map((tab) => {
            const count =
              tab.value === "all"
                ? trackRequests.length
                : trackRequests.filter((r) => r.type === tab.value).length
            return (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={cn(
                  "flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px",
                  activeTab === tab.value
                    ? "border-primary text-primary"
                    : "border-transparent text-ink-soft hover:text-ink hover:border-line",
                )}
              >
                {tab.label}
                <span
                  className={cn(
                    "rounded-full px-1.5 py-0.5 text-[10px] font-mono",
                    activeTab === tab.value
                      ? "bg-primary/10 text-primary"
                      : "bg-line-soft text-ink-faint",
                  )}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Cards */}
        <div className="space-y-4">
          {filtered.map((request) => (
            <RequestCard
              key={request.id}
              request={request}
              approval={approvals[request.id]}
              onApprovalChange={(update) => updateApproval(request.id, update)}
              onAction={(action) => handleAction(request.id, action)}
            />
          ))}
          {filtered.length === 0 && (
            <div className="rounded-xl border border-line bg-surface px-6 py-16 text-center">
              <p className="text-ink-faint text-sm">No requests found.</p>
            </div>
          )}
        </div>
      </div>
    </Shell>
  )
}
