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
import Image from "next/image"

interface Props {
  onSubmitForm: (data: any) => void
}

export function RegisterForm({ onSubmitForm }: Props) {
  const { mutateAsync, isPending } = useMutation(
    mutateService("afta", "post", "/api/afta/v1/Accounts/register"),
  )

  const methods = useForm<any>({
    defaultValues: {
      phoneNumber: "",
      nationalCode: "",
      firstName: "",
      lastName: "",
    },
    mode: "onChange",
  })
  const { register } = methods
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
        if (errorMessage === "Invalid captcha") {
          toastError("کد وارد شده معتبر نیست.")
        } else {
          toastError("خطا در ثبت‌نام")
        }
      })
  }

  return (
    <div className="w-100">
      <div className="text-primary mb-3">
        {<h6 className="fw-bold">به امضانو خوش آمدید.</h6>}
        <div className="fs-7 mt-2">
          برای ثبت‌نام در امضانو، مشخصات خود را وارد کنید.
        </div>
      </div>
      <FormProvider {...methods}>
        <form className="mt-6" onSubmit={methods.handleSubmit(submitForm)}>
          <Row className="mb-3">
            <Col>
              <YInput title="نام" {...register("firstName")} />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <YInput title="نام خانوادگی" {...register("lastName")} />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <YNumberInput
                title="شماره ملی"
                placeholder="مثال: 0010145263"
                maxLength={10}
                {...register("nationalCode")}
              />
            </Col>
          </Row>
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
