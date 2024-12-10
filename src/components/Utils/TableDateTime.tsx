import { YTypography } from "@/components/UI"
import { css } from "@emotion/react"
import { jalali } from "@/utils"

export interface TableDateTimeProps {
  value: string
}

export function TableDateTime({ value }: TableDateTimeProps) {
  return (
    <YTypography css={style}>{jalali(value, "YYYY/MM/DD, HH:mm")}</YTypography>
  )
}

const style = css`
  direction: ltr;
  width: fit-content;
`
