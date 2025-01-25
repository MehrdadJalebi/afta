import React from "react"
import { DropdownToggleProps } from "react-bootstrap"
import { YBtn } from "@/components/UI"
import { ChevronDown, EllipsisVertical } from "lucide-react"

export const ActionMenuToggle = React.forwardRef<
  HTMLElement,
  DropdownToggleProps
>(function ActionMenuToggle({ onClick }, ref) {
  return (
    <EllipsisVertical
      ref={ref}
      size={20}
      className="cursor-pointer"
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
    <YBtn variant={variant} ref={ref} onClick={onClick} className={"d-flex"}>
      <ChevronDown />
      {children}
    </YBtn>
  )
})
