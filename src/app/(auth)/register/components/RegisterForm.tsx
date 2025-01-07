import { useState } from "react"
import { Col, Row, Spinner } from "react-bootstrap"
import { FormProvider, useForm } from "react-hook-form"
import { useMutation, useQuery } from "@tanstack/react-query"
import { mutateService, queryService } from "@/api"
import { YBtn, YNumberInput, YInput } from "@/components/UI"
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

  const {
    data: captcha,
    isFetched: isCaptchaFetched,
    refetch,
  } = useQuery(queryService("afta", "/api/afta/v1/Accounts/captcha"))

  const methods = useForm<any>({
    defaultValues: {
      phoneNumber: "",
      nationalCode: "",
      firstName: "",
      lastName: "",
      captchaInputText: "",
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
        captchaInputText: data.captchaInputText,
        captchaText: captcha?.data?.captchaTextValue,
        captchaToken: captcha?.data?.captchaTokenValue,
      },
    })
      .then(() => onSubmitForm(data))
      .catch(({ message: { error } }) => {
        const errorMessage = error.message
        if (errorMessage === "Invalid captcha") {
          toastError("کد وارد شده معتبر نیست.")
        } else if (errorMessage === "Invalid captcha") {
          toastError("")
        }
        refetch()
      })
  }

  return (
    <div className="w-100">
      <div className="text-primary mb-3">
        {<h6 className="fw-bold">به افتا خوش آمدید.</h6>}
        <div className="fs-7 mt-2">
          برای ثبت‌نام در افتا، مشخصات خود را وارد کنید.
        </div>
      </div>
      <FormProvider {...methods}>
        <form className="mt-6" onSubmit={methods.handleSubmit(submitForm)}>
          <Row className="mb-3">
            <Col>
              <YNumberInput title="نام" {...register("firstName")} />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <YNumberInput title="نام خانوادگی" {...register("lastName")} />
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
          <Row className="mb-3">
            <Col xs={10}>
              <YInput
                title="کد مقابل را وارد کنید"
                maxLength={10}
                {...register("captchaInputText")}
              />
            </Col>
            <Col
              xs={2}
              className="d-flex justify-content-center align-items-end ps-5"
            >
              {isCaptchaFetched ? (
                <Image
                  src={captcha?.data?.captchaImgUrl!}
                  alt={"captcha"}
                  width={90}
                  height={40}
                />
              ) : (
                <Spinner variant={"primary"} className="mb-2" />
              )}
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
        </form>
      </FormProvider>
    </div>
  )
}
