import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ArrowLeft, CheckCircle } from "lucide-react"
import { useForm } from "react-hook-form"
import { Shell } from "@/components/Shell"
import { Button } from "@/components/ui/button"
import { FormSection } from "@/components/mis/FormSection"
import { FormField, textareaCls } from "@/components/mis/FormField"
import { ToggleGroup } from "@/components/mis/ToggleGroup"
import { TagInput } from "@/components/mis/TagInput"
import { FileUpload } from "@/components/mis/FileUpload"
import { RequesterFields } from "@/components/mis/RequesterFields"

interface FormValues {
  requestedBy: string
  managerName: string
  businessJustification: string
  description: string
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
    <span className="font-mono uppercase tracking-wide text-white/80">Adhoc Request</span>
  </div>
)

export function AdhocRequestPage() {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>()

  const [models, setModels] = useState<string[]>([])
  const [natureOfRequest, setNatureOfRequest] = useState("")
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
            Your adhoc request has been submitted and will be picked up by the MIS team.
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
          <span className="text-xs font-mono uppercase tracking-[0.18em] text-accent-ink">Adhoc</span>
          <h1 className="mt-2 font-display text-3xl text-ink tracking-tight">Adhoc Request</h1>
          <p className="mt-2 text-[15px] text-ink-soft">
            A one-off data pull, question, or analytics request.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-10">

            <FormSection title="Requester & Approval">
              <RequesterFields
                register={register}
                errors={errors}
                requestorType={requestorType}
                onRequestorTypeChange={(v) => setRequestorType(v as string)}
              />
            </FormSection>

            <FormSection title="Request">
              <FormField label="Model(s) / Segment(s) Involved">
                <TagInput value={models} onChange={setModels} />
              </FormField>
              <FormField label="Nature of Request" required>
                <ToggleGroup
                  options={["Data Pull", "Analysis / Investigation", "Question / Clarification", "Other"]}
                  value={natureOfRequest}
                  onChange={(v) => setNatureOfRequest(v as string)}
                />
              </FormField>
              <FormField label="Description" required error={errors.description?.message}>
                <textarea
                  {...register("description", { required: "Required" })}
                  className={`${textareaCls} min-h-[120px]`}
                  placeholder="Describe what you need in detail"
                />
              </FormField>
            </FormSection>

            <FormSection title="Sample Output">
              <FileUpload files={sampleFiles} onFilesChange={setSampleFiles} />
            </FormSection>

          </div>

          <div className="mt-10 flex items-center gap-3 border-t border-line pt-8">
            <Button type="submit">Submit Request</Button>
            <Button type="button" variant="ghost" onClick={() => navigate("/mis")}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Shell>
  )
}
