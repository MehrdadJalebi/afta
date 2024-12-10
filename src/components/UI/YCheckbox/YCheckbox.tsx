import clsx from "clsx"
import FormCheck, { FormCheckProps } from "react-bootstrap/FormCheck"

import "./index.scss"
import { forwardRef } from "react"

export const YCheckbox = forwardRef<HTMLInputElement, FormCheckProps>(
  function YCheckbox(
    {
      children,
      className,
      type = "checkbox",
      inline = true,
      reverse = true,
      ...restProps
    },
    ref,
  ) {
    const radioClasses = clsx("y-checkbox", className)

    return (
      <FormCheck
        type={type}
        inline={inline}
        reverse={reverse}
        className={radioClasses}
        ref={ref}
        {...restProps}
      >
        {children}
      </FormCheck>
    )
  },
)
