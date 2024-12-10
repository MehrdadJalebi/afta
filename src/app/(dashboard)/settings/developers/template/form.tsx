import {
  YBtn,
  YInput,
  YAlert,
  YTypography,
  YTextArea,
  YBadge,
} from "@/components/UI"
import { Col, Row } from "react-bootstrap"
import { z } from "zod"
import { validations } from "@/utils"
import { schemaForType } from "@/utils/form"
import { css } from "@emotion/react"
import { useRef } from "react"
import { themeColors } from "@/styles/bootstrap/variables"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormComponentProps } from "@/types/common"
import { MobilePreview } from "@/components/Utils"
import { RemainingCounter } from "@/app/(dashboard)/campaigns/(form)/components/RemainingCounter"
import { useRouter } from "next/navigation"

export interface TemplateFormProps extends FormComponentProps<SchemaType> {
  isUpdate?: boolean
}

export function TemplateForm({
  onSubmit,
  isSubmitting,
  initialValues,
  isUpdate,
}: TemplateFormProps) {
  const { register, handleSubmit, setValue, getValues, formState, watch } =
    useForm<SchemaType>({
      resolver: zodResolver(validationSchema),
      defaultValues: initialValues,
      mode: "onChange",
    })
  const textAreaSelectionRef = useRef<[number?, number?]>()
  const textAreaRef = useRef<HTMLTextAreaElement | null>()
  const { ref: formtextAreaRef, ...textAreaRegistration } = register("body")

  //TODO: create a SMSTextArea component
  const setTokenHandler = (tokenValue: string) => () => {
    textAreaSelectionRef.current = [
      textAreaRef.current?.selectionStart,
      textAreaRef.current?.selectionEnd,
    ]
    const currentValue = getValues("body")
    const startIndex = textAreaSelectionRef.current?.[0] || currentValue.length
    const endIndex = textAreaSelectionRef.current?.[1] || startIndex
    setValue(
      "body",
      currentValue.substring(0, startIndex) +
        tokenValue +
        currentValue.substring(endIndex),
    )
  }
  const onExceededMaxLength = (exceededState: boolean) => {
    setValue("hasExceeded", exceededState)
  }
  const router = useRouter()

  const backToTemplateListPage = () => {
    router.push("/settings/developers?active=templates")
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <YAlert variant={"primary"}>
        <YTypography>
          مقادیر&nbsp;
          <span dir="ltr">
            &quot;%token3&quot;, &quot;%token2&quot; و &quot;%token&quot;
          </span>
          &nbsp; شامل کاراکتر space نیستند.
        </YTypography>
        <YTypography className="mt-2">
          مقدار&nbsp;
          <span dir="ltr">&quot;%token10&quot;</span>&nbsp; شامل حداکثر ۴
          کاراکتر space و به طول حداکثر ۱۰ کاراکتر است.
        </YTypography>
        <YTypography className="mt-2">
          مقدار&nbsp;
          <span dir="ltr">&quot;%token20&quot;</span>&nbsp; شامل حداکثر ۸
          کاراکتر space و به طول حداکثر ۲۰ کاراکتر است.
        </YTypography>
      </YAlert>
      <Row>
        <Col md={7}>
          <div css={rightContentCss}>
            <YInput
              title={"نام قالب"}
              placeholder={"نام قالب را وارد کنید"}
              feedbackProps={{
                text: formState.errors.name?.message,
              }}
              {...register("name")}
            />
            <YTextArea
              {...textAreaRegistration}
              ref={(e) => {
                formtextAreaRef(e)
                textAreaRef.current = e
              }}
              height={154}
              title={"متن پیامک"}
              placeholder={"متن پیامک را وارد کنید"}
              feedbackProps={{ text: formState.errors.body?.message }}
            />
            <div className="d-flex mb-4 mt-2">
              <YBadge
                variant="dark"
                className="cursor-pointer"
                dir={"ltr"}
                onClick={setTokenHandler("%token")}
                small
              >
                %token
              </YBadge>
              <YBadge
                variant="dark"
                className="me-2 cursor-pointer"
                dir={"ltr"}
                onClick={setTokenHandler("%token2")}
                small
              >
                %token2
              </YBadge>
              <YBadge
                variant="dark"
                className="me-2 cursor-pointer"
                dir={"ltr"}
                onClick={setTokenHandler("%token3")}
                small
              >
                %token3
              </YBadge>
              <YBadge
                variant="dark"
                className="me-2 cursor-pointer"
                dir={"ltr"}
                onClick={setTokenHandler("%token10")}
                small
              >
                %token10
              </YBadge>
              <YBadge
                variant="dark"
                className="me-2 cursor-pointer"
                dir={"ltr"}
                onClick={setTokenHandler("%token20")}
                small
              >
                %token20
              </YBadge>
            </div>
            <RemainingCounter
              smsText={watch("body")}
              checkIsExceeded={onExceededMaxLength}
            />
          </div>
        </Col>
        <Col md={5}>
          <div className="d-flex w-100 h-100 justify-content-center align-items-center">
            <MobilePreview message={watch("body")} />
          </div>
        </Col>
      </Row>
      <div className={"float-start mt-5"}>
        <YBtn
          variant="outline-primary"
          type={"button"}
          className={"ms-3"}
          onClick={backToTemplateListPage}
          disabled={isSubmitting}
        >
          بازگشت
        </YBtn>
        <YBtn type={"submit"} loading={isSubmitting}>
          {!isUpdate && <i className={"icon-add"} />}
          {isUpdate ? "ویرایش قالب" : "ایجاد قالب"}
        </YBtn>
      </div>
    </form>
  )
}

type schemaType = Omit<IrisSchema<"SMSTemplateRequest">, "name" | "body">

const validationSchema = schemaForType<schemaType>()(
  z
    .object({
      name: z
        .string()
        .min(1, { message: validations.required })
        .regex(
          /^[a-zA-Z0-9_]*$/,
          "تنها کاراکتر‌های انگلیسی، اعداد و کاراکتر Underline (_) مجاز است.",
        ),
      body: z.string().min(1, { message: validations.required }),
      hasExceeded: z.boolean().optional(),
    })
    .superRefine((schema, ctx) => {
      if (schema.hasExceeded) {
        ctx.addIssue({
          message: "تعداد کاراکتر‌های شما از حد مجاز بیشتر است.",
          code: z.ZodIssueCode.custom,
          path: ["body"],
        })
      }
    }),
)

export type SchemaType = z.infer<typeof validationSchema>

const rightContentCss = css`
  padding: 32px;
  border-left: 1px solid ${themeColors.border_body};
`
