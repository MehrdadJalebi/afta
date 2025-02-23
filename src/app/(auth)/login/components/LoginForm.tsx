import { useState } from "react"
import { Col, Row, Spinner } from "react-bootstrap"
import { FormProvider, useForm } from "react-hook-form"
import { useMutation, useQuery } from "@tanstack/react-query"
import { mutateService, queryService } from "@/api"
import { YBtn, YNumberInput, YInput, YTypography } from "@/components/UI"
import { phoneNumberValidation, toastError } from "@/utils"
import { useAccountStore } from "@/store"
import { serverUrls } from "@/constants"
import { redirectToLogin } from "@/api/api-service"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"

interface Props {
  onSubmitForm: (data: any) => void
}

const validationSchema = z.object({
  phoneNumber: phoneNumberValidation,
})

export function LoginForm({ onSubmitForm }: Props) {
  const { mutateAsync, isPending } = useMutation(
    mutateService("emzano", "post", "/api/emzano/v1/Accounts/send-otp"),
  )

  const methods = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      phoneNumber: "",
    },
    mode: "onTouched",
  })
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods
  function submitForm(data: any) {
    mutateAsync({
      body: {
        phoneNumber: data?.phoneNumber,
      },
    })
      .then(() => onSubmitForm(data))
      .catch(({ message: { error } }) => {
        const errorMessage = error.message
        if (errorMessage) {
          toastError(errorMessage)
        } else {
          toastError("خطا در ورود")
        }
      })
  }

  return (
    <div className="w-100">
      <div className="text-primary mb-3">
        {<h6 className="fw-bold">به امضانو خوش آمدید.</h6>}
        <div className="fs-7 mt-2">
          برای ورود به امضانو، شماره همراه خود را وارد کنید.
        </div>
      </div>
      <FormProvider {...methods}>
        <form className="mt-6" onSubmit={handleSubmit(submitForm)}>
          <Row>
            <Col>
              <YNumberInput
                title="شماره همراه"
                placeholder="مثال: 09121234567"
                maxLength={11}
                feedbackProps={{
                  text: errors.phoneNumber?.message,
                }}
                {...register("phoneNumber")}
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
            <YBtn
              variant={"outline-primary"}
              className="me-2"
              href={"/login-password"}
            >
              ورود با کلمه عبور
            </YBtn>
            <YBtn
              variant={"outline-primary"}
              className="me-2"
              href={"/register"}
            >
              ثبت‌نام
            </YBtn>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}
