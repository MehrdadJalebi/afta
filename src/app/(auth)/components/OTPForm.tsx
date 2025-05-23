import { css } from "@emotion/react"
import { useMutation, useQuery } from "@tanstack/react-query"
import Cookies from "js-cookie"
import { Col, Row, Spinner } from "react-bootstrap"
import { ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { FormProvider, useForm, useWatch } from "react-hook-form"
import { useAccountStore } from "@/store"
import Image from "next/image"

import { YBtn, YInput } from "src/components/UI"
import { useTimer } from "@/hooks"
import { mutateService, queryService } from "@/api"
import { themeColors, themeVariables } from "src/styles/bootstrap/variables"
import { toastError } from "src/utils"

export type OTPFormModel = "mobile_number" | "otp"
interface Props {
  phoneNumber: string
  onReturnToForm: VoidFunction
}

export function OTPForm(props: Props) {
  const { phoneNumber, onReturnToForm } = props
  const [isRedirecting, setIsRedirecting] = useState(false)
  const router = useRouter()
  const { timer, resetTimer, formattedTime } = useTimer(120)
  const { setBearerToken } = useAccountStore.getState()

  const { mutateAsync, isPending } = useMutation(
    mutateService("emzano", "post", "/api/emzano/v1/Accounts/send-otp"),
  )
  const { mutateAsync: fetchAccess, isPending: isFetchAccessPending } =
    useMutation(
      mutateService("emzano", "post", "/api/emzano/v1/Accounts/token-otp"),
    )

  const {
    data: captcha,
    isFetched: isCaptchaFetched,
    refetch,
  } = useQuery(queryService("emzano", "/api/emzano/v1/Accounts/captcha"))

  function handleSendOTP() {
    mutateAsync({
      body: {
        phoneNumber: phoneNumber,
      },
    })
      .then(() => resetTimer())
      .catch(({ message }) => toastError(message))
  }

  const methods = useForm<any>({
    defaultValues: {
      otp: "",
      captchaInputText: "",
    },
    mode: "onChange",
  })
  const { register } = methods

  const otp = useWatch({
    control: methods.control,
    name: "otp",
  })

  const captchaInputText = useWatch({
    control: methods.control,
    name: "captchaInputText",
  })

  useEffect(() => {
    if ("OTPCredential" in window) {
      navigator.credentials
        .get({ otp: { transport: ["sms"] } } as any)
        .then((otp) => {
          if (otp && (otp as any).code) {
            methods.setValue("otp", (otp as any).code)
          }
        })
        .catch((err) => {
          console.error("Error with Web OTP API:", err)
        })
    }
  }, [methods])

  /*useEffect(() => {
    if (otp?.length === 6 && timer >= 0 ) {
      methods.handleSubmit(onSubmit)()
    }
  }, [otp, methods]) */

  function onSubmit(data: any) {
    fetchAccess({
      body: {
        otp: data.otp,
        cellNumber: phoneNumber,
        captchaInputText: data.captchaInputText,
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
        methods.setError("otp", {
          type: "manual",
          message: "رمز وارد شده اشتباه است!",
        })
        const errorMessage = error.message
        if (errorMessage) {
          toastError(errorMessage)
        } else {
          toastError("خطا در ورود")
        }
        refetch()
      })
  }

  const isFormDisabled =
    isPending || otp?.length !== 6 || timer < 0 || !captchaInputText

  return (
    <div className="w-100" data-testid="otp-form">
      <div className="mb-6 text-primary">
        رمز ورود یکبار مصرف به شماره همراه {phoneNumber} ارسال شده است.
      </div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="position-relative mt-2">
            <YInput
              title="رمز ورود یک‌بار مصرف"
              autoFocus
              maxLength={6}
              minLength={6}
              autoComplete="one-time-code"
              {...register("otp")}
            />
            {timer >= 0 ? (
              <span css={timerCountDown}>{formattedTime}</span>
            ) : (
              <span css={resendOTPBtn} onClick={handleSendOTP}>
                ارسال مجدد کد
              </span>
            )}
          </div>
          <Row className="mb-3 mt-2">
            <Col xs={9}>
              <YInput
                title="کد مقابل را وارد کنید"
                maxLength={10}
                {...register("captchaInputText")}
              />
            </Col>
            <Col
              xs={3}
              className="d-flex justify-content-center align-items-end ps-5"
            >
              {isCaptchaFetched ? (
                <Image
                  // @ts-ignore
                  src={captcha?.data?.captchaImgUrl!}
                  alt={"captcha"}
                  width={85}
                  height={41}
                  unoptimized={true}
                />
              ) : (
                <Spinner variant={"primary"} className="mb-2" />
              )}
            </Col>
          </Row>
          <div css={controllersContainer}>
            <YBtn
              variant="outline-primary"
              className="w-100"
              onClick={onReturnToForm}
              disabled={isRedirecting}
            >
              <ChevronRight
                color={themeColors.red_custom}
                size={20}
                className="ms-1"
              />
              بازگشت و تغییر شماره همراه
            </YBtn>
            <YBtn
              disabled={isFormDisabled}
              loading={isFetchAccessPending || isRedirecting}
              variant="primary"
              type="submit"
              className="w-100"
            >
              تایید رمز
            </YBtn>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}

const timerCountDown = css`
  position: absolute;
  left: 10px;
  top: 40px;
  color: ${themeColors.gray_600};
  font-size: 0.875rem;
`
const resendOTPBtn = css`
  position: absolute;
  left: 10px;
  top: 45px;
  color: ${themeColors.primary};
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
`

const controllersContainer = css`
  display: flex;
  gap: 0.75rem;
  margin-top: 10px;
  white-space: nowrap;
  @media (max-width: ${themeVariables.breakpoints.sm}) {
    flex-direction: column-reverse;
  }
`
