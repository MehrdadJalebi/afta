"use client"

import React, {
  PropsWithChildren,
  useEffect,
  type ReactNode,
  useState,
  useMemo,
} from "react"
import { useAccountStore } from "@/store"
import { Spinner } from "react-bootstrap"
import { useRouter } from "next/navigation"
import { ConfirmModal } from "@/components/Modals"
import { YTypography } from "@/components/UI"
import { useProfileQuery } from "@/api/useApi"
import { useInitializeAccount } from "@/api/useApi/initialize-account/useInitializeAccount"
import { getAuthenticationStepIndex } from "@/utils"
import {
  getAuthenticationCredentials,
  redirectToAccounts,
} from "@/api/api-service"

export function AuthProviders({ children }: PropsWithChildren): ReactNode {
  const router = useRouter()
  const { setAccountID, jwtToken, accountID, authorizationStatus } =
    useAccountStore()
  const profileQuery = useProfileQuery() // TODO remove this after authorization is finished
  const [isShowingWelcomeModal, setIsShowingWelcomeModal] = useState(false)
  const [isShowingAuthModal, setIsShowingAuthModal] = useState(false)
  const initializeQuery = useInitializeAccount({
    enabled: !!jwtToken,
  })
  const authenticationStepIndex = getAuthenticationStepIndex(
    initializeQuery.data?.authentication_step || "",
  )

  const checkAuthorization = () => {
    if (authenticationStepIndex < 2) {
      setIsShowingAuthModal(true)
    }
  }

  useEffect(() => {
    const hasVisitedBefore = localStorage.getItem("firstVisit")
    if (!hasVisitedBefore && authenticationStepIndex >= 2) {
      setIsShowingWelcomeModal(true)
      localStorage.setItem("firstVisit", "true")
    }
  }, [authenticationStepIndex])

  useEffect(() => {
    if (profileQuery.data && initializeQuery.data) {
      checkAuthorization()
    }
  }, [profileQuery.data, initializeQuery.data])

  useEffect(() => {
    if (accountID) {
      getAuthenticationCredentials()
    }
  }, [accountID])

  useEffect(() => {
    const searchParams = new URLSearchParams(document.location.search)
    const accountIDSearchParam =
      searchParams.get("account") ||
      (localStorage.getItem("accountID") as string)
    if (accountIDSearchParam) {
      setAccountID(accountIDSearchParam)
      localStorage.setItem("accountID", accountIDSearchParam)
    } else {
      redirectToAccounts()
    }
  }, [])
  if (initializeQuery.isError) {
    // TODO needs to be handled. Prevent panel from loading
  }

  const welcomeText = `به پنل جدید پیامک نجوا خوش آمدید!

در این پنل علاوه بر ایجاد تجربه کاربری بهتر، شاهد ویژگی‌های جدیدی خواهید بود که می‌توانند بر کیفیت ارسال و بهینه‌سازی کمیپن‌های پیامکی شما تاثیر به سزایی داشته باشد. 

مهم‌ترین تغییرات و ویژگی‌های اضافه شده به شرح زیر است:
- ارائه گزارش‌های کامل هزینه و تعداد صفحات مصرفی به ازای هر ارسال
- ارائه گزارش کامل وضعیت ارسال و کلیک کمپین‌ها
- امکان ایجاد سگمنت بر پایه رفتار و ویژگی کاربران
- امکان مدیریت پیامک‌های دریافتی روی خط اختصاصی`

  const textNode = useMemo(() => {
    const lines = welcomeText.split("\n")
    return (
      <YTypography color={"gray_800"}>
        {lines.map((line, index) => (
          <React.Fragment key={index}>
            {line} {index < lines.length && <br />}
          </React.Fragment>
        ))}
      </YTypography>
    )
  }, [])

  return jwtToken &&
    !initializeQuery.isLoading &&
    !profileQuery.isLoading &&
    authorizationStatus ? (
    <>
      {children}
      <ConfirmModal
        actionVariant={"primary"}
        actionText={"تایید"}
        onActionClick={() => {
          setIsShowingWelcomeModal(false)
        }}
        title={"ورود به پنل جدید پیامک"}
        body={textNode}
        showModal={isShowingWelcomeModal}
        onHide={() => setIsShowingWelcomeModal(false)}
      />
      <ConfirmModal
        actionVariant={"primary"}
        actionText={"احراز هویت حساب کاربری"}
        onActionClick={() => {
          router.push("/profile")
          setIsShowingAuthModal(false)
        }}
        title={"احراز هویت"}
        body={
          <YTypography>
            نجوایی عزیز!
            <br />
            دسترسی شما به کلیه‌ی سرویس‌ها منوط به تکمیل مراحل احراز هویت است.
            <br />
            لطفا از طریق دکمه زیر، برای این امر اقدام نمایید.
          </YTypography>
        }
        showModal={isShowingAuthModal && !isShowingWelcomeModal}
        onHide={() => setIsShowingAuthModal(false)}
      />
    </>
  ) : (
    <div className="vh-100 w-100 d-flex align-items-center justify-content-center">
      <Spinner
        animation="border"
        role="status"
        variant="primary"
        style={{ width: 50, height: 50 }}
      />
    </div>
  )
}
