import Alert from "react-bootstrap/Alert"

import React from "react"
import "./index.scss"

export interface YAlertProps {
  title?: string
  className?: string
  show?: boolean
  onClose?: () => void
  variant?: string
  dismissible?: boolean
  children?: React.ReactNode
  startIcon?: string
}

export const YAlert = ({
  show = true,
  variant = "primary",
  ...props
}: YAlertProps) => {
  return (
    <Alert
      show={show}
      onClose={props.onClose}
      variant={variant}
      dismissible={props.dismissible}
      className={props.className}
      transition
    >
      <Alert.Heading>{props.title}</Alert.Heading>
      <div className="d-flex align-items-center">
        {props.startIcon && (
          <i className={`fs-3 ms-2 ${props.startIcon} text-${variant}`} />
        )}
        <div>{props.children}</div>
      </div>
    </Alert>
  )
}
