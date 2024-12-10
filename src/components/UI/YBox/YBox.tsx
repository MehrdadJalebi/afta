import React from "react"
import { css, Interpolation } from "@emotion/react"
import { themeColors } from "@/styles/bootstrap/variables"
import { Card } from "react-bootstrap"

export interface YBoxProps {
  css?: Interpolation<any>
  title?: React.ReactNode
  titleCss?: Interpolation<any>
  header?: React.ReactNode
  headerCss?: Interpolation<any>
  footer?: React.ReactNode
  footerCss?: Interpolation<any>
  body: React.ReactNode
  bodyCss?: Interpolation<any>
  className?: string
}

export function YBox(props: YBoxProps) {
  return (
    <Card className={props.className} css={[cardCss, props.css]}>
      {props.header && (
        <Card.Header css={[headerCss, props.headerCss]}>
          {props.header}
        </Card.Header>
      )}
      {props.title && (
        <Card.Title css={[titleCss, props.titleCss]}>{props.title}</Card.Title>
      )}
      <Card.Body css={[bodyCss, props.bodyCss]}>{props.body}</Card.Body>
      {props.footer && (
        <Card.Footer css={[footerCss, props.footerCss]}>
          {props.footer}
        </Card.Footer>
      )}
    </Card>
  )
}

const cardCss = css`
  border: 1px solid ${themeColors.border_body};
  background-color: ${themeColors.gray_100};
  border-radius: 6px;
`

const titleCss = css`
  padding: 1.5rem 2rem 0;
  margin-bottom: 0;

  & h3 {
    margin-bottom: 0;
  }
`

const bodyCss = css`
  padding: 1.5rem 2rem;
  height: 100%;
`

const headerCss = css`
  padding: 1.5rem 2rem;
  background-color: transparent;
  border-bottom: 1px solid ${themeColors.border_body};
`

const footerCss = css`
  background-color: transparent;
  padding: 1.5rem 2rem;
  border-top: 1px solid ${themeColors.border_body};
`
