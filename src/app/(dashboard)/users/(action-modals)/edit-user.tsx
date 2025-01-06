import { z } from "zod"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ConfirmModal } from "@/components/Modals"
import { YInput } from "@/components/UI"
import { useEffect } from "react"
import { validateNationalCode } from "@/utils"
import { requiredStringSchema } from "@/constants"

export interface EditUserModalProps {
  isSubmitting: boolean
  selectedRow?: any
  onSubmit: (data: any) => void
  isShowing: boolean
  onHide: () => void
}

export function EditUserModal({
  selectedRow,
  isSubmitting,
  onSubmit,
  isShowing,
  onHide,
}: EditUserModalProps) {
  const { setValue, handleSubmit, reset, control } = useForm<any>({
    resolver: zodResolver(schema),
  })

  useEffect(() => {
    if (isShowing) {
      setValue("firstName", selectedRow?.firstName || "")
      setValue("lastName", selectedRow?.lastName || "")
      setValue("nationalCode", selectedRow?.nationalCode || "")
    } else if (!isShowing) {
      reset()
    }
  }, [selectedRow])

  return (
    <ConfirmModal
      actionVariant={"primary"}
      actionText={"ویرایش"}
      onActionClick={handleSubmit(onSubmit)}
      title={`ویرایش کاربر ${selectedRow?.firstName || ""} ${selectedRow?.lastName || ""}`}
      body={
        <>
          <Controller
            control={control}
            name={"firstName"}
            render={({ field, fieldState }) => (
              <YInput
                {...field}
                onChange={(e) => field.onChange(e.target.value)}
                title="نام"
                feedbackProps={{
                  text: fieldState.error?.message,
                }}
              />
            )}
          />
          <Controller
            control={control}
            name={"lastName"}
            render={({ field, fieldState }) => (
              <YInput
                {...field}
                onChange={(e) => field.onChange(e.target.value)}
                title="نام خانوادگی"
                feedbackProps={{
                  text: fieldState.error?.message,
                }}
              />
            )}
          />
          <Controller
            control={control}
            name={"nationalCode"}
            render={({ field, fieldState }) => (
              <YInput
                {...field}
                onChange={(e) => field.onChange(e.target.value)}
                title="کد ملی"
                feedbackProps={{
                  text: fieldState.error?.message,
                }}
              />
            )}
          />
        </>
      }
      isLoading={isSubmitting}
      showModal={isShowing}
      onHide={onHide}
    />
  )
}

const schema = z.object({
  firstName: requiredStringSchema(),
  lastName: requiredStringSchema(),
  nationalCode: requiredStringSchema().refine(validateNationalCode, {
    message: "کد ملی معتبر نیست",
  }),
})

export type EditUserSchemaType = z.infer<typeof schema>
