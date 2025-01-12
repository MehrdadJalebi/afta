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
  const router = useRouter()

  const [isRedirecting, setIsRedirecting] = useState(false)
  const methods = useForm<any>({
    defaultValues: {
      username: "",
      password: "",
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
      },
    })
      .then(() => {
        Cookies.set("accessToken", data.access_token)
        setBearerToken(data.access_token)
        setIsRedirecting(true)
        router.push("/contracts")
      })
      .catch(({ message: { error } }) => {
        const errorMessage = error.message
        toastError("")
      })
  }

  return (
    <div className="w-100">
      <div className="text-primary mb-3">
        {<h6 className="fw-bold">به افتا خوش آمدید.</h6>}
        <div className="fs-7 mt-2">
          برای ورود به افتا، شماره همراه و کلمه عبور خود را وارد کنید.
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
