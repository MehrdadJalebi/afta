import React, { useMemo } from "react"
import { clsx } from "clsx"
import "./styles.scss"
import {
  variantStyle,
  variantStyleToTagMapping,
  variantWeight,
  YTypographyProps,
} from "./types"
import { jsx } from "@emotion/react"
import { themeColorCss } from "@/styles/general"

export function YTypography<T extends React.ElementType = "p">({
  tag,
  variant = "body-regular",
  color,
  ...props
}: YTypographyProps<T>) {
  const [variantStyle, variantWeight] = useMemo<
    [variantStyle, variantWeight]
  >(() => {
    const parts: [variantStyle, variantWeight] = variant.split("-") as [
      variantStyle,
      variantWeight,
    ]
    if (parts.length !== 2) {
      return ["body", "regular"]
    }
    return parts
  }, [variant])

  const renderedTag = useMemo(() => {
    return tag || variantStyleToTagMapping[variantStyle] || "p"
  }, [variantStyle, tag])

  const className = clsx(
    props.className,
    "y-typography",
    `y-typography-${variantStyle}`,
    `y-typography-${variantWeight}`,
  )

  const css = useMemo(() => (color ? themeColorCss(color) : undefined), [color])

  return jsx(renderedTag, {
    ...props,
    css: [css, (props as any).css], // TODO any needs to be fixed
    className,
  })
}
