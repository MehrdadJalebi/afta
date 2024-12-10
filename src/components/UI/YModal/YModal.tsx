import React from "react"
import Modal, { type ModalProps } from "react-bootstrap/Modal"
import { YTypography } from "@/components/UI"
import clsx from "clsx"
import "./styles.scss"
import { YTypographyProps } from "@/components/UI/YTypography/types"
import { Interpolation } from "@emotion/react"

interface YModalProps extends ModalProps {
  title: string
  body: React.ReactNode
  footer?: React.ReactNode
  titleTypographyProps?: YTypographyProps<"h2">
  showModal: boolean
  onHide: () => void
  bodyCss?: Interpolation<any>
  headerCss?: Interpolation<any>
  footerCss?: Interpolation<any>
}

export function YModal({
  title,
  subtitle,
  body,
  footer,
  showModal,
  onHide,
  titleTypographyProps,
  bodyCss,
  footerCss,
  headerCss,
  ...restProps
}: YModalProps) {
  return (
    <Modal
      show={showModal}
      onHide={onHide}
      centered
      {...restProps}
      className={clsx("y-modal", restProps.className)}
    >
      <Modal.Header css={headerCss}>
        <YTypography
          variant={"title-bold"}
          tag={"h2"}
          {...titleTypographyProps}
        >
          {title}
        </YTypography>
      </Modal.Header>

      <Modal.Body css={bodyCss}>{body}</Modal.Body>

      {footer && <Modal.Footer css={footerCss}>{footer}</Modal.Footer>}
    </Modal>
  )
}
