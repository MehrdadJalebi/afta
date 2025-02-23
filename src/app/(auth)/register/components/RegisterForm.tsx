import { useState } from "react"
import { Col, Row, Spinner } from "react-bootstrap"
import { Controller, FormProvider, useForm } from "react-hook-form"
import { useMutation, useQuery } from "@tanstack/react-query"
import { mutateService, queryService } from "@/api"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { YBtn, YNumberInput, YInput, YTypography } from "@/components/UI"
import {
  phoneNumberValidation,
  validateNationalCode,
  toastError,
  validations,
} from "@/utils"
import Image from "next/image"
import { requiredStringSchema } from "@/constants"

interface Props {
  onSubmitForm: (data: any) => void
}

const validationSchema = z.object({
  phoneNumber: phoneNumberValidation,
  nationalCode: z.string().refine(validateNationalCode, {
    message: "کد ملی معتبر نیست",
  }),
  firstName: requiredStringSchema(),
  lastName: requiredStringSchema(),
})

export function RegisterForm({ onSubmitForm }: Props) {
  const { mutateAsync, isPending } = useMutation(
    mutateService("emzano", "post", "/api/emzano/v1/Accounts/register"),
  )

  const methods = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      phoneNumber: "",
      nationalCode: "",
      firstName: "",
      lastName: "",
    },
    mode: "onTouched",
  })

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods

  function submitForm(data: any) {
    mutateAsync({
      body: {
        cellphone: data.phoneNumber,
        nationalCode: data.nationalCode,
        firstName: data.firstName,
        lastName: data.lastName,
      },
    })
      .then(() => onSubmitForm(data))
      .catch(({ message: { error } }) => {
        const errorMessage = error.message
        if (errorMessage) {
          toastError(errorMessage)
        } else {
          toastError("خطا در ثبت‌نام")
        }
      })
  }

  return (
    <div className="w-100">
      <div className="text-primary mb-3">
        <h6 className="fw-bold">به امضانو خوش آمدید.</h6>
        <div className="fs-7 mt-2">
          برای ثبت‌نام در امضانو، مشخصات خود را وارد کنید.
        </div>
      </div>
      <FormProvider {...methods}>
        <form className="mt-6" onSubmit={handleSubmit(submitForm)}>
          <Row className="mb-3">
            <Col>
              <Controller
                control={control}
                name={"firstName"}
                render={({ field }) => (
                  <YInput
                    {...field}
                    title="نام"
                    feedbackProps={{
                      text: errors.firstName?.message,
                    }}
                  />
                )}
              />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Controller
                control={control}
                name={"lastName"}
                render={({ field }) => (
                  <YInput
                    {...field}
                    title="نام خانوادگی"
                    feedbackProps={{
                      text: errors.lastName?.message,
                    }}
                  />
                )}
              />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Controller
                control={control}
                name={"nationalCode"}
                render={({ field }) => (
                  <YNumberInput
                    {...field}
                    title="شماره ملی"
                    placeholder="مثال: 0010145263"
                    maxLength={10}
                    feedbackProps={{
                      text: errors.nationalCode?.message,
                    }}
                  />
                )}
              />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Controller
                control={control}
                name={"phoneNumber"}
                render={({ field }) => (
                  <YNumberInput
                    {...field}
                    title="شماره همراه"
                    placeholder="مثال: 09121234567"
                    maxLength={11}
                    feedbackProps={{
                      text: errors.phoneNumber?.message,
                    }}
                  />
                )}
              />
            </Col>
          </Row>
          <YBtn
            data-testid="send-otp-btn"
            loading={isPending}
            variant="primary"
            type="submit"
            className="w-100 mt-3"
          >
            دریافت رمز یک‌بار مصرف
          </YBtn>
          <div className="fs-7 mt-4 mx-auto d-flex justify-content-center align-items-center">
            <YTypography variant="label-regular" color="primary">
              قبلا ثبت‌نام کرده‌اید؟
            </YTypography>
            <YBtn variant={"outline-primary"} className="me-2" href={"/login"}>
              وارد شوید
            </YBtn>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}
