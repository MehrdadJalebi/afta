import React from "react"
import { DropdownToggleProps } from "react-bootstrap"
import { YBtn } from "@/components/UI"

export const ActionMenuToggle = React.forwardRef<
  HTMLElement,
  DropdownToggleProps
>(function ActionMenuToggle({ onClick }, ref) {
  return (
    <i
      ref={ref}
      className={"cursor-pointer icon-more-vertical"}
      onClick={onClick}
    />
  )
})

export const ButtonToggle = React.forwardRef<
  HTMLButtonElement,
  DropdownToggleProps
>(function ButtonToggle(
  { onClick, variant = "outline-primary", children },
  ref,
) {
  return (
    <YBtn
      variant={variant}
      ref={ref}
      onClick={onClick}
      className={"d-flex"}
      icon={{ icon: "icon-chevron-down", placement: "left" }}
    >
      {children}
    </YBtn>
  )
})
