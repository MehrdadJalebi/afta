import {
  CANCEL_TEXT_ENGLISH,
  CANCEL_TEXT_PERSIAN,
  NAJVA_DEFAULT_SHORTENER,
} from "@/constants"
import { OverlayTrigger, Tooltip } from "react-bootstrap"
import { AuthorizationStatus } from "@/enums/authorization"

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

export const getCancelTextAddedMessage = (text: MessageText) => {
  return text ? `${text}${CANCEL_TEXT_ENGLISH}` : ""
}

export const getCancelTextRemovedMessage = (text: MessageText) => {
  return text
    ?.replaceAll(CANCEL_TEXT_ENGLISH, "")
    .replaceAll(CANCEL_TEXT_PERSIAN, "")
}

export function getFixedNumber(number: number, decimal: number) {
  return Number.isInteger(number) ? number : number.toFixed(decimal)
}

export function replaceLinksWithMockShortener(
  text: string,
  links: string[],
  customShortenerDomain?: string,
) {
  let shortenerDomain = NAJVA_DEFAULT_SHORTENER
  if (customShortenerDomain) {
    shortenerDomain = customShortenerDomain
  }
  for (let link of links) {
    text = text.replace(link, `${shortenerDomain}/[encode]`)
  }
  return text
}

export function getCampaignPreviewText(
  text: string,
  links: string[],
  customShortenerDomain?: string,
) {
  return replaceLinksWithMockShortener(
    getCancelTextAddedMessage(text),
    links,
    customShortenerDomain,
  )
}

export function getAuthenticationStepIndex(
  step: AuthorizationStatus | string,
): number {
  return Object.keys(AuthorizationStatus).indexOf(step)
}
