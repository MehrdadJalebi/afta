import { YBtn, YInput, YTextArea, YTypography } from "@/components/UI"
import { Plus, Trash } from "lucide-react"
import { Col, Row } from "react-bootstrap"
import { z } from "zod"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormComponentProps } from "@/types/common"
import { useRouter } from "next/navigation"
import { validateNationalCode } from "@/utils"
import { requiredStringSchema } from "@/constants"
import { themeColors } from "@/styles/bootstrap/variables"

export interface ContractFormProps
  extends FormComponentProps<z.infer<typeof validationSchema>> {
  isUpdate?: boolean
}

const validationSchema = z.object({
  title: requiredStringSchema(),
  description: requiredStringSchema(),
  nationalCodes: z
    .array(
      z.object({
        nationalCode: z.string().optional().refine(validateNationalCode, {
          message: "کد ملی معتبر نیست",
        }),
      }),
    )
    .optional(),
})

export function ContractForm({
  onSubmit,
  isSubmitting,
  isUpdate,
}: ContractFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    getValues,
  } = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      title: "",
      description: "",
      nationalCodes: [],
    },
    mode: "onChange",
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "nationalCodes",
  })

  const router = useRouter()
  const backToContractListPage = () => {
    router.push("/contracts")
  }

  const appendHandler = () => {}
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
      <div className="mb-2">
        <YTypography variant="detail-regular" color="gray_700" className="mb-2">
          کد ملی طرفین قرارداد
        </YTypography>
        {fields.map((field, index) => (
          <Row key={field.id} className="mb-3">
            <Col xs={6}>
              <YInput
                placeholder={`کد ملی ${index + 1}`}
                feedbackProps={{
                  text: errors.nationalCodes?.[index]?.nationalCode?.message,
                }}
                {...register(`nationalCodes.${index}.nationalCode`)}
              />
            </Col>
            <Col xs={2} className="d-flex align-items-center">
              <YBtn
                variant="danger"
                type="button"
                className="align-self-start"
                onClick={() => remove(index)}
              >
                <Trash color="white" size={20} />
              </YBtn>
            </Col>
          </Row>
        ))}

        <YBtn
          variant="outline-primary"
          onClick={() => append({ nationalCode: "" })}
          className="mt-3"
        >
          اضافه کردن کد ملی
        </YBtn>
      </div>

      <div className="float-start">
        <YBtn
          variant="outline-primary"
          type="button"
          className="ms-3"
          onClick={backToContractListPage}
          disabled={isSubmitting}
        >
          بازگشت
        </YBtn>
        <YBtn type="submit" loading={isSubmitting}>
          {!isUpdate && <Plus color="white" size={20} className="ms-1" />}
          {isUpdate ? "ویرایش قرارداد" : "ایجاد قرارداد"}
        </YBtn>
      </div>
    </form>
  )
}
