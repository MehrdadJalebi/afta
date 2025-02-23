import { useState } from "react"
import { Col, Row, Spinner } from "react-bootstrap"
import { FormProvider, useForm } from "react-hook-form"
import Cookies from "js-cookie"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery } from "@tanstack/react-query"
import { mutateService, queryService } from "@/api"
import { YBtn, YNumberInput, YInput, YTypography } from "@/components/UI"
import { validateNationalCode, toastError } from "@/utils"
import { useRouter } from "next/navigation"

import { useAccountStore } from "@/store"
import { requiredStringSchema, serverUrls } from "@/constants"
import { redirectToLogin } from "@/api/api-service"

import Image from "next/image"

const validationSchema = z.object({
  username: z.string().refine(validateNationalCode, {
    message: "کد ملی معتبر نیست",
  }),
  password: requiredStringSchema(),
  captchaInputText: requiredStringSchema(),
})

export function LoginPasswordForm() {
  const { mutateAsync, isPending } = useMutation(
    mutateService("emzano", "post", "/api/emzano/v1/Accounts/token-password"),
  )
  const {
    data: captcha,
    isFetched: isCaptchaFetched,
    refetch,
  } = useQuery(queryService("emzano", "/api/emzano/v1/Accounts/captcha"))

  const router = useRouter()

  const [isRedirecting, setIsRedirecting] = useState(false)
  const methods = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      username: "",
      password: "",
      captchaInputText: "",
    },
    mode: "onChange",
  })
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods
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
        if (errorMessage) {
          toastError(errorMessage)
        } else {
          toastError("خطا در ورود")
        }
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
        <form className="mt-6" onSubmit={handleSubmit(submitForm)}>
          <Row>
            <Col>
              <YNumberInput
                title="شماره ملی"
                placeholder="مثال: 0010145263"
                maxLength={10}
                feedbackProps={{
                  text: errors.username?.message,
                }}
                {...register("username")}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <YInput
                title="کلمه عبور"
                type="password"
                feedbackProps={{
                  text: errors.password?.message,
                }}
                {...register("password")}
              />
            </Col>
          </Row>
          <Row>
            <Col sm={9} xs={8}>
              <YInput
                title="کد مقابل را وارد کنید"
                maxLength={10}
                feedbackProps={{
                  text: errors.captchaInputText?.message,
                }}
                {...register("captchaInputText")}
              />
            </Col>
            <Col
              sm={3}
              xs={4}
              className="d-flex justify-content-center align-items-center ps-5"
            >
              {isCaptchaFetched ? (
                <Image
                  // @ts-ignore
                  src={captcha?.data?.captchaImgUrl!}
                  alt={"captcha"}
                  width={90}
                  height={40}
                  className="mt-1"
                  unoptimized={true}
                />
              ) : (
                <Spinner variant={"primary"} />
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
