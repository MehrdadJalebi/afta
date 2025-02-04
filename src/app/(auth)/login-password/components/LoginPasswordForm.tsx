import { useState } from "react"
import { Col, Row, Spinner } from "react-bootstrap"
import { FormProvider, useForm } from "react-hook-form"
import Cookies from "js-cookie"
import { useMutation, useQuery } from "@tanstack/react-query"
import { mutateService, queryService } from "@/api"
import { YBtn, YNumberInput, YInput, YTypography } from "@/components/UI"
import {
  phoneNumberValidation,
  validateNationalCode,
  toastError,
} from "@/utils"
import { useRouter } from "next/navigation"

import { useAccountStore } from "@/store"
import { serverUrls } from "@/constants"
import { redirectToLogin } from "@/api/api-service"

import Image from "next/image"

export function LoginPasswordForm() {
  const { mutateAsync, isPending } = useMutation(
    mutateService("afta", "post", "/api/afta/v1/Accounts/token-password"),
  )
  const {
    data: captcha,
    isFetched: isCaptchaFetched,
    refetch,
  } = useQuery(queryService("afta", "/api/afta/v1/Accounts/captcha"))

  const router = useRouter()

  const [isRedirecting, setIsRedirecting] = useState(false)
  const methods = useForm<any>({
    defaultValues: {
      username: "",
      password: "",
      captchaInputText: "",
    },
    mode: "onChange",
  })
  const { register } = methods
  const { setBearerToken } = useAccountStore.getState()

  function submitForm(data: any) {
    mutateAsync({
      body: {
        username: data?.username,
        password: data?.password,
        captchaInputText: data?.captchaInputText,
        // @ts-ignore
        captchaText: captcha?.data?.captchaTextValue,
        // @ts-ignore
        captchaToken: captcha?.data?.captchaTokenValue,
      },
    })
      .then((data: any) => {
        Cookies.set("accessToken", data.access_token)
        setBearerToken(data.access_token)
        setIsRedirecting(true)
        router.push("/contracts")
      })
      .catch(({ message: { error } }) => {
        const errorMessage = error.message
        toastError("")
        refetch()
      })
  }

  return (
    <div className="w-100">
      <div className="text-primary mb-3">
        {<h6 className="fw-bold">به امضانو خوش آمدید.</h6>}
        <div className="fs-7 mt-2">
          برای ورود به امضانو، شماره همراه و کلمه عبور خود را وارد کنید.
        </div>
      </div>
      <FormProvider {...methods}>
        <form className="mt-6" onSubmit={methods.handleSubmit(submitForm)}>
          <Row className="mb-3">
            <Col>
              <YNumberInput
                title="شماره ملی"
                placeholder="مثال: 0010145263"
                maxLength={10}
                {...register("username")}
              />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <YInput
                title="کلمه عبور"
                type="password"
                {...register("password")}
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
                  // @ts-ignore
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
            loading={isPending}
            variant="primary"
            type="submit"
            className="w-100 mt-3"
          >
            ورود به پنل کاربری
          </YBtn>
          <div className="fs-7 mt-4 mx-auto d-flex justify-content-center align-items-center">
            <YBtn
              variant={"outline-primary"}
              className="me-2"
              href={"/register"}
            >
              ثبت‌نام
            </YBtn>
            <YBtn variant={"outline-primary"} className="me-2" href={"/login"}>
              ورود با رمز یکبار مصرف
            </YBtn>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}
