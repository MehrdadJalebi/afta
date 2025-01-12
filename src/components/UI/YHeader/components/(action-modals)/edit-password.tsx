import { z } from "zod"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ConfirmModal } from "@/components/Modals"
import { YInput } from "@/components/UI"
import { requiredStringSchema } from "@/constants"
import { useEffect } from "react"

export interface EditPasswordModalProps {
  isSubmitting: boolean
  onSubmit: (data: any) => void
  isShowing: boolean
  onHide: () => void
}

export function EditPasswordModal({
  isSubmitting,
  onSubmit,
  isShowing,
  onHide,
}: EditPasswordModalProps) {
  const { setValue, handleSubmit, control } = useForm<any>({
    resolver: zodResolver(schema),
  })

  useEffect(() => {
    setValue("password", undefined)
    setValue("reEnterPassword", undefined)
  }, [isShowing])

  return (
    <ConfirmModal
      actionVariant={"primary"}
      actionText={"ویرایش"}
      onActionClick={handleSubmit(onSubmit)}
      title={"ویرایش کلمه عبور"}
      body={
        <>
          <Controller
            control={control}
            name={"password"}
            render={({ field, fieldState }) => (
              <YInput
                {...field}
                type="password"
                onChange={(e) => field.onChange(e.target.value)}
                title="کلمه عبور جدید"
                feedbackProps={{
                  text: fieldState.error?.message,
                }}
              />
            )}
          />
          <Controller
            control={control}
            name={"reEnterPassword"}
            render={({ field, fieldState }) => (
              <YInput
                {...field}
                type="password"
                onChange={(e) => field.onChange(e.target.value)}
                title="تکرار کلمه عبور جدید"
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
  password: requiredStringSchema(),
  reEnterPassword: requiredStringSchema(),
})

export type EditPasswordSchemaType = z.infer<typeof schema>
