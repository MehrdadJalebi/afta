import clsx from "clsx"
import React from "react"
import type { ReactNode } from "react"

import "./index.scss"

export interface YBadgeProps extends React.ComponentProps<"span"> {
  variant: string
  icon?: string
  dot?: boolean
  filled?: boolean
  rounded?: boolean
  small?: boolean
  children: ReactNode
  className?: string
}

export function YBadge({
  variant,
  icon,
  dot,
  filled,
  rounded,
  small,
  children,
  className,
  ...rest
}: YBadgeProps) {
  const styleClasses = clsx(
    "y-badge",
    `badge-${variant}`,
    {
      "y-badge-dot": dot,
      "y-badge-filled": filled,
      "y-badge-rounded": rounded,
      "y-badge-small": small,
      "y-badge-icon": !children,
    },
    className,
  )

  return (
    <span className={styleClasses} {...rest}>
      {!dot && (
        <>
          {icon && <i className={icon} />}
          <div>{children}</div>
        </>
      )}
    </span>
  )
}
