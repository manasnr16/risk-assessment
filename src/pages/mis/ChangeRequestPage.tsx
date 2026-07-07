import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ArrowLeft, CheckCircle, PlusCircle, Edit3, Trash2, LayoutGrid } from "lucide-react"
import { useForm } from "react-hook-form"
import { Shell } from "@/components/Shell"
import { Button } from "@/components/ui/button"
import { FormSection } from "@/components/mis/FormSection"
import { FormField, inputCls, textareaCls } from "@/components/mis/FormField"
import { TagInput } from "@/components/mis/TagInput"
import { FileUpload } from "@/components/mis/FileUpload"
import { RequesterFields } from "@/components/mis/RequesterFields"
import { cn } from "@/lib/utils"

interface FormValues {
  requestedBy: string
  managerName: string
  businessJustification: string
  metricName?: string
  metricDefinition?: string
  metricDataSource?: string
  metricDisplayFormat?: string
  currentDefinition?: string
  newDefinition?: string
  deletionReason?: string
}

const changeTypes = [
  { id: "add-metric", label: "Add Metric", icon: PlusCircle },
  { id: "change-definition", label: "Change Definition", icon: Edit3 },
  { id: "delete-metric", label: "Delete Metric", icon: Trash2 },
  { id: "change-view", label: "Change Report View", icon: LayoutGrid },
]

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
    <span className="font-mono uppercase tracking-wide text-white/80">Change Request</span>
  </div>
)

export function ChangeRequestPage() {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ shouldUnregister: true })

  const [changeType, setChangeType] = useState("")
  const [models, setModels] = useState<string[]>([])
  const [requestorType, setRequestorType] = useState("")
  const [sampleFiles, setSampleFiles] = useState<File[]>([])
  const [submitted, setSubmitted] = useState(false)

  const displayFormats = ["Number", "Percentage", "Currency", "Decimal/Float", "Text"]

  const onSubmit = (_data: FormValues) => setSubmitted(true)

  if (submitted) {
    return (
      <Shell breadcrumb={breadcrumb}>
        <div className="mx-auto max-w-3xl px-6 py-24 text-center">
          <CheckCircle className="h-12 w-12 text-signal mx-auto mb-4" />
          <h2 className="font-display text-2xl text-ink mb-2">Change Request Submitted</h2>
          <p className="text-ink-soft mb-8">
            Your change request has been submitted and will be reviewed by the MIS team.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Button onClick={() => navigate("/mis/track")}>Track Requests</Button>
            <Button variant="outline" onClick={() => navigate("/mis")}>Back to MIS</Button>
          </div>
        </div>
      </Shell>
    )
  }

  return (
    <Shell breadcrumb={breadcrumb}>
      <div className="mx-auto max-w-3xl px-6 lg:px-8 py-12">
        <div className="mb-10">
          <span className="text-xs font-mono uppercase tracking-[0.18em] text-accent-ink">Change Request</span>
          <h1 className="mt-2 font-display text-3xl text-ink tracking-tight">MIS Change Request</h1>
          <p className="mt-2 text-[15px] text-ink-soft">
            Add, redefine, or remove a metric or change an existing report.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-10">

            <FormSection title="What Kind of Change?">
              <div className="grid grid-cols-2 gap-3">
                {changeTypes.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setChangeType(id)}
                    className={cn(
                      "flex items-center gap-3 rounded-xl border p-4 text-left transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1",
                      changeType === id
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-line bg-surface text-ink-soft hover:border-primary/30 hover:bg-line-soft hover:text-ink",
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ring-1 transition-colors",
                        changeType === id
                          ? "bg-primary/10 text-primary ring-primary/20"
                          : "bg-line-soft text-ink-faint ring-line",
                      )}
                    >
                      <Icon className="h-4.5 w-4.5" strokeWidth={1.75} />
                    </span>
                    <span className="text-sm font-medium">{label}</span>
                  </button>
                ))}
              </div>
            </FormSection>

            <FormSection title="Details" className="transition-all duration-300 ease-in-out">
              {!changeType && (
                <div className="rounded-lg border border-dashed border-line bg-surface px-4 py-3 text-sm text-ink-faint">
                  Select a change type above to enter the required details.
                </div>
              )}

              {changeType === "add-metric" && (
                <div className="space-y-4 animate-[fadeIn_220ms_ease-out]">
                  <FormField label="Metric Name" required error={errors.metricName?.message}>
                    <input
                      {...register("metricName", { required: "Required" })}
                      className={inputCls}
                      placeholder="Enter metric name"
                    />
                  </FormField>

                  <FormField label="Metric Definition/Formula" required error={errors.metricDefinition?.message}>
                    <textarea
                      {...register("metricDefinition", { required: "Required" })}
                      className={textareaCls}
                      placeholder="Describe formula or definition"
                    />
                  </FormField>

                  <FormField label="Data Source/Field(s) Used" required error={errors.metricDataSource?.message}>
                    <textarea
                      {...register("metricDataSource", { required: "Required" })}
                      className={textareaCls}
                      placeholder="List source tables, columns, or fields"
                    />
                  </FormField>

                  <FormField label="Display Format" required error={errors.metricDisplayFormat?.message}>
                    <select
                      {...register("metricDisplayFormat", { required: "Required" })}
                      className={inputCls}
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select format
                      </option>
                      {displayFormats.map((format) => (
                        <option key={format} value={format}>
                          {format}
                        </option>
                      ))}
                    </select>
                  </FormField>
                </div>
              )}

              {changeType === "change-definition" && (
                <div className="space-y-4 animate-[fadeIn_220ms_ease-out]">
                  <FormField label="Metric Name" required error={errors.metricName?.message}>
                    <input
                      {...register("metricName", { required: "Required" })}
                      className={inputCls}
                      placeholder="Enter metric name"
                    />
                  </FormField>

                  <FormField label="Current Definition (for reference)" required error={errors.currentDefinition?.message}>
                    <textarea
                      {...register("currentDefinition", { required: "Required" })}
                      className={textareaCls}
                      placeholder="Paste or describe current definition"
                    />
                  </FormField>

                  <FormField label="New Definition" required error={errors.newDefinition?.message}>
                    <textarea
                      {...register("newDefinition", { required: "Required" })}
                      className={textareaCls}
                      placeholder="Provide the updated definition"
                    />
                  </FormField>
                </div>
              )}

              {changeType === "delete-metric" && (
                <div className="space-y-4 animate-[fadeIn_220ms_ease-out]">
                  <FormField label="Metric Name" required error={errors.metricName?.message}>
                    <input
                      {...register("metricName", { required: "Required" })}
                      className={inputCls}
                      placeholder="Enter metric name"
                    />
                  </FormField>

                  <FormField label="Reason for Deletion" required error={errors.deletionReason?.message}>
                    <textarea
                      {...register("deletionReason", { required: "Required" })}
                      className={textareaCls}
                      placeholder="Explain why this metric should be removed"
                    />
                  </FormField>
                </div>
              )}

              {changeType === "change-view" && (
                <div className="rounded-lg border border-line bg-line-soft/50 px-4 py-3 text-sm text-ink-soft animate-[fadeIn_220ms_ease-out]">
                  No additional fields are required for this change type. Please attach a sample output showing the desired report layout.
                </div>
              )}
            </FormSection>

            <FormSection title="Requester & Approval">
              <RequesterFields
                register={register}
                errors={errors}
                requestorType={requestorType}
                onRequestorTypeChange={(v) => setRequestorType(v as string)}
              />
            </FormSection>

            <FormSection title="Request Details">
              <FormField label="Model(s) Affected">
                <TagInput value={models} onChange={setModels} />
              </FormField>
              <FormField label="Business Justification" required error={errors.businessJustification?.message}>
                <textarea
                  {...register("businessJustification", { required: "Required" })}
                  className={textareaCls}
                  placeholder="Why is this change needed?"
                />
              </FormField>
            </FormSection>

            <FormSection title="Sample Output">
              <FileUpload files={sampleFiles} onFilesChange={setSampleFiles} />
            </FormSection>

          </div>

          <div className="mt-10 flex items-center gap-3 border-t border-line pt-8">
            <Button type="submit">Submit Change Request</Button>
            <Button type="button" variant="ghost" onClick={() => navigate("/mis")}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Shell>
  )
}
