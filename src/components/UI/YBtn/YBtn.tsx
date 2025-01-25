import { clsx } from "clsx"
import Link from "next/link"
import { LoaderCircle } from "lucide-react"
import { Children, forwardRef } from "react"
import Button, { ButtonProps } from "react-bootstrap/Button"
import Image from "next/image"

import "./index.scss"

export interface YButtonProps extends ButtonProps {
  loading?: boolean
  icon?: string | { icon: string; placement: "right" | "left" }
}

export const YBtn = forwardRef<HTMLButtonElement, YButtonProps>(function YBtn(
  { disabled, loading, icon, children, href, ...attrs },
  ref,
) {
  const iconOnly = Children.count(children) === 0

  const className = clsx(attrs.className, "y-btn", {
    "y-btn-icon": iconOnly,
    "y-btn-loading position-relative": loading,
  })

  let iconName = ""
  let iconPlacement = "right"

  if (typeof icon === "string") {
    iconName = icon
  } else if (typeof icon === "object" && icon !== undefined) {
    iconName = icon.icon
    iconPlacement = icon.placement
  }

  const iconClasses = clsx(iconName, {
    invisible: loading,
    "ms-1": iconPlacement === "right" && !iconOnly,
    "me-1": iconPlacement === "left" && !iconOnly,
  })

  const textClassName = clsx("btn-text", { invisible: loading })

  const buttonComponent = (
    <Button
      {...attrs}
      disabled={loading || disabled}
      className={className}
      ref={ref}
    >
      {iconName && iconPlacement === "right" && <i className={iconClasses} />}
      {/*TODO inner text should be handled with typography*/}
      <span className={textClassName}>{children}</span>
      {iconName && iconPlacement === "left" && <i className={iconClasses} />}
      {loading && (
        <div className="y-btn-loading-icon">
          <LoaderCircle />
        </div>
      )}
    </Button>
  )

  return href ? <Link href={href}>{buttonComponent}</Link> : buttonComponent
})
