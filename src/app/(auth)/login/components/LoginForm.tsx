import { useState } from "react"
import { Col, Row, Spinner } from "react-bootstrap"
import { FormProvider, useForm } from "react-hook-form"
import Cookies from "js-cookie"
import { useMutation, useQuery } from "@tanstack/react-query"
import { mutateService, queryService } from "@/api"
import { YBtn, YNumberInput, YInput } from "@/components/UI"
import {
  phoneNumberValidation,
  validateNationalCode,
  toastError,
} from "@/utils"
import { useAccountStore } from "@/store"
import { serverUrls } from "@/constants"
import { redirectToLogin } from "@/api/api-service"
import Image from "next/image"

const AFTA_BASE_URL = serverUrls.afta

interface Props {
  onSubmitForm: (data: any) => void
}

export function LoginForm({ onSubmitForm }: Props) {
  const { mutateAsync, isPending } = useMutation(
    mutateService("afta", "post", "/api/afta/v1/Accounts/otp-request"),
  )
  const [phoneNumber, setPhoneNumber] = useState()

  const captchaQuery = useQuery(
    queryService("afta", "/api/afta/v1/Accounts/captcha"),
  )

  async function getBearerTokenApi() {
    const { setBearerToken } = useAccountStore.getState()
    try {
      const payload = {
        client_id: "otp",
        client_secret: `u_M{'57j!%LI21#`,
        mobile_number: phoneNumber,
        otp_code: "",
        scope: "backoffice",
        grant_type: "otp",
      }
      const response = await fetch(`${AFTA_BASE_URL}/connect/token/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      })
      if (!response.ok) {
        //redirectToLogin()
        return ""
      }
      const data = await response.json()
      setBearerToken(data.access_token)
      return data.token
    } catch (error) {
      //redirectToLogin()
      return ""
    }
  }

  const methods = useForm<any>({
    defaultValues: {
      phoneNumber: "",
    },
    mode: "onChange",
  })

  function submitForm(data: any) {
    setPhoneNumber(data.phoneNumber)
    mutateAsync({
      body: {
        cellphone: data.phoneNumber,
        nationalCode: "",
        captchaInputText: "",
        captchaText: "",
        captchaToken: "",
      },
    })
      .then(() => onSubmitForm(data))
      .catch(({ message }) => toastError(message))
  }

  return (
    <div className="w-100">
      <div className="text-primary mb-3">
        {<h6 className="fw-bold">به افتا خوش آمدید.</h6>}
        <div className="fs-7 mt-2">
          برای ثبت‌نام یا ورود به افتا، شماره ملی و شماره همراه خود را وارد
          کنید.
        </div>
      </div>
      <FormProvider {...methods}>
        <form className="mt-6" onSubmit={methods.handleSubmit(submitForm)}>
          <Row className="mb-3">
            <Col>
              <YNumberInput
                name="nationalCode"
                title="شماره ملی"
                placeholder="مثال: 09121234567"
                maxLength={11}
              />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <YNumberInput
                name="phoneNumber"
                title="شماره همراه"
                placeholder="مثال: 0010145263"
                maxLength={10}
              />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col xs={10}>
              <YInput
                name="phoneNumber"
                title="کد مقابل را وارد کنید"
                maxLength={10}
              />
            </Col>
            <Col
              xs={2}
              className="d-flex justify-content-center align-items-end mb-2 ps-5"
            >
              {captchaQuery.isFetched ? (
                <Image
                  src={captchaQuery.data?.captchaImgUrl!}
                  alt={"captcha"}
                  width={60}
                  height={20}
                />
              ) : (
                <Spinner variant={"primary"} />
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
