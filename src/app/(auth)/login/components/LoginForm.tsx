import { useState } from "react"
import { Col, Row, Spinner } from "react-bootstrap"
import { FormProvider, useForm } from "react-hook-form"
import { useMutation, useQuery } from "@tanstack/react-query"
import { mutateService, queryService } from "@/api"
import { YBtn, YNumberInput, YInput, YTypography } from "@/components/UI"
import {
  phoneNumberValidation,
  validateNationalCode,
  toastError,
} from "@/utils"
import { useAccountStore } from "@/store"
import { serverUrls } from "@/constants"
import { redirectToLogin } from "@/api/api-service"
import Image from "next/image"

interface Props {
  onSubmitForm: (data: any) => void
}

export function LoginForm({ onSubmitForm }: Props) {
  const { mutateAsync, isPending } = useMutation(
    mutateService("afta", "post", "/api/afta/v1/Accounts/send-otp"),
  )

  const methods = useForm<any>({
    defaultValues: {
      phoneNumber: "",
      nationalCode: "",
      captchaInputText: "",
    },
    mode: "onChange",
  })
  const { register } = methods
  function submitForm(data: any) {
    mutateAsync({
      body: {},
      params: {
        query: {
          phoneNumber: data?.phoneNumber,
        },
      },
    })
      .then(() => onSubmitForm(data))
      .catch(({ message: { error } }) => {
        const errorMessage = error.message
        toastError("خطا در ورود")
      })
  }

  return (
    <div className="w-100">
      <div className="text-primary mb-3">
        {<h6 className="fw-bold">به افتا خوش آمدید.</h6>}
        <div className="fs-7 mt-2">
          برای ورود به افتا، شماره همراه خود را وارد کنید.
        </div>
      </div>
      <FormProvider {...methods}>
        <form className="mt-6" onSubmit={methods.handleSubmit(submitForm)}>
          <Row className="mb-3">
            <Col>
              <YNumberInput
                title="شماره همراه"
                placeholder="مثال: 09121234567"
                maxLength={11}
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
