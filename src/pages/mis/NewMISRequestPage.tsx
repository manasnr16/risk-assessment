import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ArrowLeft, CheckCircle } from "lucide-react"
import { useForm } from "react-hook-form"
import { Shell } from "@/components/Shell"
import { Button } from "@/components/ui/button"
import { FormSection } from "@/components/mis/FormSection"
import { FormField, inputCls, textareaCls } from "@/components/mis/FormField"
import { ToggleGroup } from "@/components/mis/ToggleGroup"
import { TagInput } from "@/components/mis/TagInput"
import { FileUpload } from "@/components/mis/FileUpload"
import { RequesterFields } from "@/components/mis/RequesterFields"

interface FormValues {
  reportName: string
  businessPurpose: string
  targetAudience: string
  neededBy: string
  dataSources: string
  keyMetrics: string
  requestedBy: string
  managerName: string
  businessJustification: string
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
    <span className="font-mono uppercase tracking-wide text-white/80">New Request</span>
  </div>
)

export function NewMISRequestPage() {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>()

  const [frequency, setFrequency] = useState("")
  const [deliveryFormat, setDeliveryFormat] = useState<string[]>([])
  const [models, setModels] = useState<string[]>([])
  const [requestorType, setRequestorType] = useState("")
  const [sampleFiles, setSampleFiles] = useState<File[]>([])
  const [submitted, setSubmitted] = useState(false)

  const onSubmit = (_data: FormValues) => setSubmitted(true)

  if (submitted) {
    return (
      <Shell breadcrumb={breadcrumb}>
        <div className="mx-auto max-w-3xl px-6 py-24 text-center">
          <CheckCircle className="h-12 w-12 text-signal mx-auto mb-4" />
          <h2 className="font-display text-2xl text-ink mb-2">Request Submitted</h2>
          <p className="text-ink-soft mb-8">
            Your MIS request has been submitted and will be reviewed by the MIS team.
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
          <span className="text-xs font-mono uppercase tracking-[0.18em] text-accent-ink">New Request</span>
          <h1 className="mt-2 font-display text-3xl text-ink tracking-tight">New MIS Request</h1>
          <p className="mt-2 text-[15px] text-ink-soft">
            Complete the form below to request a new report or MIS to be built from scratch.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-10">

            <FormSection title="Report Details">
              <FormField label="MIS / Report Name" required error={errors.reportName?.message}>
                <input
                  {...register("reportName", { required: "Required" })}
                  className={inputCls}
                  placeholder="e.g. Portfolio Vintage Loss Report"
                />
              </FormField>
              <FormField label="Business Purpose" required error={errors.businessPurpose?.message}>
                <textarea
                  {...register("businessPurpose", { required: "Required" })}
                  className={textareaCls}
                  placeholder="What decision or question will this report support?"
                />
              </FormField>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="Target Audience / Stakeholders">
                  <input
                    {...register("targetAudience")}
                    className={inputCls}
                    placeholder="e.g. Risk Committee, Portfolio Managers"
                  />
                </FormField>
                <FormField label="Needed By">
                  <input
                    {...register("neededBy")}
                    type="date"
                    className={inputCls}
                  />
                </FormField>
              </div>
            </FormSection>

            <FormSection title="Frequency">
              <FormField label="Select frequency">
                <ToggleGroup
                  options={["Daily", "Weekly", "Monthly", "Quarterly"]}
                  value={frequency}
                  onChange={(v) => setFrequency(v as string)}
                />
              </FormField>
            </FormSection>

            <FormSection title="Delivery Format">
              <FormField label="Select all that apply">
                <ToggleGroup
                  options={["Excel Workbook", "PDF", "Dashboard", "Email Summary"]}
                  value={deliveryFormat}
                  onChange={(v) => setDeliveryFormat(v as string[])}
                  multi
                />
              </FormField>
            </FormSection>

            <FormSection title="Scope">
              <FormField label="Model(s) / Segment(s) Involved">
                <TagInput value={models} onChange={setModels} />
              </FormField>
              <FormField label="Data Sources Needed">
                <input
                  {...register("dataSources")}
                  className={inputCls}
                  placeholder="e.g. account_monthly_performance, bureau_attribute_vector"
                />
              </FormField>
              <FormField label="Key Metrics Required" required error={errors.keyMetrics?.message}>
                <textarea
                  {...register("keyMetrics", { required: "Required" })}
                  className={textareaCls}
                  placeholder="List the metrics / KPIs this report should show"
                />
              </FormField>
            </FormSection>

            <FormSection title="Requester & Approval">
              <RequesterFields
                register={register}
                errors={errors}
                requestorType={requestorType}
                onRequestorTypeChange={(v) => setRequestorType(v as string)}
              />
            </FormSection>

            <FormSection title="Sample Output">
              <FileUpload files={sampleFiles} onFilesChange={setSampleFiles} />
            </FormSection>

          </div>

          <div className="mt-10 flex items-center gap-3 border-t border-line pt-8">
            <Button type="submit">Submit MIS Request</Button>
            <Button type="button" variant="ghost" onClick={() => navigate("/mis")}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Shell>
  )
}
