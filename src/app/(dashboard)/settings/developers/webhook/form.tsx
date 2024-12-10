import { YBtn, YInput, YSelect } from "@/components/UI"
import { Col, Row } from "react-bootstrap"
import { z } from "zod"
import { validations } from "@/utils"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormComponentProps } from "@/types/common"
import { useRouter } from "next/navigation"
import { selectSchema } from "@/constants"
import { webhookTypeOptions } from "@/enums/webhook"

export interface WebhookFormProps
  extends FormComponentProps<z.infer<typeof validationSchema>> {
  isUpdate?: boolean
}

export function WebhookForm({
  onSubmit,
  isSubmitting,
  initialValues,
  isUpdate,
}: WebhookFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
    defaultValues: initialValues,
  })
  const router = useRouter()

  const backToWebhookListPage = () => {
    router.push("/settings/developers")
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Col xs={12} md={6}>
          <YInput
            title={"نام وب‌هوک"}
            feedbackProps={{
              text: errors.name?.message,
            }}
            {...register("name")}
          />
        </Col>
        <Col xs={12} md={6}>
          <YInput
            title={"آدرس وب‌هوک"}
            feedbackProps={{
              text: errors.url?.message,
            }}
            {...register("url")}
          />
        </Col>
        <Col xs={12} md={6}>
          <Controller
            control={control}
            name={"type"}
            render={({ field: { ref: _, ...field }, fieldState }) => (
              <YSelect
                {...field}
                options={webhookTypeOptions}
                isDisabled={field.disabled}
                yInputProps={{
                  title: "نوع وب‌هوک",
                  feedbackProps: { text: fieldState.error?.message },
                }}
              />
            )}
          />
        </Col>
      </Row>
      <div className={"float-start"}>
        <YBtn
          variant="outline-primary"
          type={"button"}
          className={"ms-3"}
          onClick={backToWebhookListPage}
          disabled={isSubmitting}
        >
          بازگشت
        </YBtn>
        <YBtn type={"submit"} loading={isSubmitting}>
          {!isUpdate && <i className={"icon-add"} />}
          {isUpdate ? "ویرایش وب‌هوک" : "ایجاد وب‌هوک"}
        </YBtn>
      </div>
    </form>
  )
}

const validationSchema = z.object({
  name: z.string().min(1, { message: validations.required }),
  url: z.string().url({ message: validations.url }),
  type: z.object(selectSchema.shape, { message: validations.required }),
})
