import { OverlayTrigger, Tooltip } from "react-bootstrap"

export type MessageText = string | null | undefined

export function truncate(str: string) {
  return (str || "").length > 50 ? `${str.substr(0, 50)}...` : str
}

export function truncatedElement(str: string | null | undefined) {
  const renderTooltip = (props: any) => <Tooltip {...props}>{str}</Tooltip>
  return (
    str && (
      <OverlayTrigger
        placement="top"
        delay={{ show: 250, hide: 400 }}
        overlay={renderTooltip}
      >
        <span>{truncate(str)} </span>
      </OverlayTrigger>
    )
  )
}

export function getFixedNumber(number: number, decimal: number) {
  return Number.isInteger(number) ? number : number.toFixed(decimal)
}

export function getLevelColor(level: string) {
  let levelColor = ""
  switch (level) {
    case "Information":
      levelColor = "blue_600"
      break
    case "Warning":
      levelColor = "warning_700"
      break
    case "Error":
      levelColor = "red_600"
      break
    default:
      levelColor = "gray_900"
      break
  }
  return levelColor
}

export function getIsPublicRoute(route: string) {
  const publicRoutes = ["/register", "/login", "/login-password"]
  return publicRoutes.includes(route)
}
