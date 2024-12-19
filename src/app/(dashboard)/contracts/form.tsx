import { YBtn, YInput, YSelect, YTextArea } from "@/components/UI"
import { Col, Row } from "react-bootstrap"
import { z } from "zod"
import { validations } from "@/utils"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormComponentProps } from "@/types/common"
import { useRouter } from "next/navigation"
import { selectSchema } from "@/constants"

export interface ContractFormProps
  extends FormComponentProps<z.infer<typeof validationSchema>> {
  isUpdate?: boolean
}

export function ContractForm({
  onSubmit,
  isSubmitting,
  initialValues,
  isUpdate,
}: ContractFormProps) {
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

  const backToContractListPage = () => {
    router.push("/contracts")
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Col xs={12} md={6}>
          <YInput
            title={"نام قرارداد"}
            feedbackProps={{
              text: errors.title?.message,
            }}
            {...register("title")}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <YTextArea
            title={"متن قرارداد"}
            feedbackProps={{
              text: errors.description?.message,
            }}
            rows={10}
            height={"100%"}
            {...register("description")}
          />
        </Col>
      </Row>
      <div className={"float-start"}>
        <YBtn
          variant="outline-primary"
          type={"button"}
          className={"ms-3"}
          onClick={backToContractListPage}
          disabled={isSubmitting}
        >
          بازگشت
        </YBtn>
        <YBtn type={"submit"} loading={isSubmitting}>
          {!isUpdate && <i className={"icon-add"} />}
          {isUpdate ? "ویرایش قرارداد" : "ایجاد قرارداد"}
        </YBtn>
      </div>
    </form>
  )
}

const validationSchema = z.object({
  title: z.string().min(1, { message: validations.required }),
  description: z.string().min(1, { message: validations.required }),
})

/*
import { useFunctionQuery } from "@/api/useApi"

  const { data: functions } = useFunctionQuery()
  const functionsOptions = functions?.data.map((item: string) => {
    return { label: item, value: item}
  })


<Col xs={12} md={6}>
          <Controller
            control={control}
            name={"type"}
            render={({ field: { ref: _, ...field }, fieldState }) => (
              <YSelect
                {...field}
                options={functionsOptions}
                isDisabled={field.disabled}
                yInputProps={{
                  title: "نوع قرارداد",
                  feedbackProps: { text: fieldState.error?.message },
                }}
              />
            )}
          />
        </Col>
*/
