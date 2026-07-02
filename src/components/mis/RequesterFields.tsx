import type { UseFormRegister, FieldErrors } from "react-hook-form"
import { FormField, inputCls, textareaCls } from "./FormField"
import { ToggleGroup } from "./ToggleGroup"

interface RequesterFieldsProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: FieldErrors<any>
  requestorType: string
  onRequestorTypeChange: (val: string | string[]) => void
}

export function RequesterFields({
  register,
  errors,
  requestorType,
  onRequestorTypeChange,
}: RequesterFieldsProps) {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          label="Requested By"
          required
          error={errors.requestedBy?.message as string | undefined}
        >
          <input
            {...register("requestedBy", { required: "Required" })}
            className={inputCls}
            placeholder="Your name"
          />
        </FormField>
        <FormField
          label="Manager Name"
          required
          error={errors.managerName?.message as string | undefined}
        >
          <input
            {...register("managerName", { required: "Required" })}
            className={inputCls}
            placeholder="Your manager's name"
          />
        </FormField>
      </div>
      <FormField label="Requestor Type" required>
        <ToggleGroup
          options={["Regulator / Auditor", "MRM / Sponsor", "Internal"]}
          value={requestorType}
          onChange={onRequestorTypeChange}
        />
      </FormField>
      <FormField
        label="Business Justification"
        required
        error={errors.businessJustification?.message as string | undefined}
      >
        <textarea
          {...register("businessJustification", { required: "Required" })}
          className={textareaCls}
          placeholder="Why is this report needed?"
        />
      </FormField>
    </>
  )
}
