"use client"

import { YBox, YInput, YTypography, YBtn } from "@/components/UI"
import { css } from "@emotion/react"
import { useRef } from "react"
import { themeColors } from "@/styles/bootstrap/variables"
import { Col, Row, Spinner } from "react-bootstrap"
import Link from "next/link"
import { useQuery, useMutation } from "@tanstack/react-query"
import { queryService, mutateService } from "@/api"
import { NoData } from "@/components/ListingTable/components/NoData"
import { WEB_SERVICE_GUIDE_LINK } from "@/constants"

export default function TokenSettings() {
  const inputRef = useRef<HTMLInputElement>(null)

  const { data, isLoading, refetch } = useQuery(
    queryService("iris", "/v1/account-management/token-management/token/"),
  )
  const generateTokenMutation = useMutation(
    mutateService(
      "iris",
      "get",
      "/v1/account-management/token-management/generate/",
    ),
  )
  const renewTokenMutation = useMutation(
    mutateService(
      "iris",
      "get",
      "/v1/account-management/token-management/renew/",
    ),
  )

  const generateTokenHandler = async () => {
    try {
      await generateTokenMutation.mutateAsync({})
      refetch()
    } catch (error) {
      console.log(error)
    }
  }

  const renewTokenHandler = async () => {
    try {
      await renewTokenMutation.mutateAsync({})
      refetch()
    } catch (error) {
      console.log(error)
    }
  }

  const copyToken = () => {
    if (inputRef.current) {
      navigator.clipboard.writeText(inputRef.current.value)
    }
  }

  const createTokenBtn = (
    <YBtn
      variant={"primary"}
      icon={{ placement: "right", icon: "icon-add" }}
      className="mt-4"
      onClick={generateTokenHandler}
    >
      ایجاد توکن جدید
    </YBtn>
  )

  const loadingNode = (
    <YBox
      body={
        <div className="h-100 w-100 my-3 d-flex align-items-center justify-content-center">
          <Spinner animation="border" role="status" variant="primary" />
        </div>
      }
    />
  )

  const tokenGuideLink = (
    <Link href={WEB_SERVICE_GUIDE_LINK} className={"me-auto"} target="_blank">
      <YTypography variant={"body-medium"} tag={"span"} color="blue_700">
        دانلود راهنمای وب‌سرویس پیامک
      </YTypography>
    </Link>
  )

  const tokenForm = (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3 mt-4">
        <YTypography variant={"label-medium"}>توکن پیامک</YTypography>
        {tokenGuideLink}
      </div>
      <div className="d-flex align-items-center">
        <YInput
          ref={inputRef}
          value={data?.token}
          endButton={
            <YBtn
              variant="outline-primary"
              icon={"icon-duplicate"}
              css={copyButtonCss}
              onClick={copyToken}
            />
          }
        />
        <YBtn
          variant={"primary"}
          css={changeTokenButtonCss}
          onClick={renewTokenHandler}
          loading={renewTokenMutation.isPending}
        >
          تعویض توکن
        </YBtn>
      </div>
    </>
  )

  const noData = (
    <NoData
      title={"شما در حال حاضر هیچ توکنی ندارید!"}
      imageSource={"/no-data-general.png"}
      slot={
        <div className="d-flex flex-column align-items-start">
          <div className="mt-2">{tokenGuideLink}</div>
          <div>{createTokenBtn}</div>
        </div>
      }
    />
  )

  return <>{!data ? (isLoading ? loadingNode : noData) : tokenForm}</>
}

const copyButtonCss = css`
  border-radius: 0;
  padding: 9px 12px;
  border: none;
  border-right: 1px solid;
`
const changeTokenButtonCss = css`
  min-width: 120px;
  margin-right: 1rem;
`
