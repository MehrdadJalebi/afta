import React from "react"
import Dropdown from "react-bootstrap/Dropdown"
import "./index.scss"
import clsx from "clsx"
import type { EventKey, SelectCallback } from "@restart/ui/types"
import { DropdownToggleProps } from "react-bootstrap"
import { DropdownProps } from "@restart/ui"

export interface YDropdownProps extends Partial<DropdownProps> {
  items: React.ReactNode[]
  eventKeys: EventKey[]
  onSelect?: SelectCallback
  className?: string
  toggleProps?: DropdownToggleProps
}

export const YDropdown = ({
  items,
  eventKeys,
  onSelect,
  className,
  toggleProps,
  ...rest
}: YDropdownProps) => {
  const dropdownClassName = clsx(className, "y-dropdown")

  return (
    <Dropdown className={dropdownClassName} onSelect={onSelect} {...rest}>
      <Dropdown.Toggle {...toggleProps} as={toggleProps?.as} />
      <Dropdown.Menu popperConfig={{ strategy: "fixed" }} renderOnMount>
        {items.map((item, index) => (
          <Dropdown.Item
            key={index}
            eventKey={eventKeys[index]}
            className="d-flex"
          >
            {item}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  )
}
