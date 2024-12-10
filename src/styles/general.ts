import { css } from "@emotion/react"
import { ThemeColors, themeColors } from "./bootstrap/variables"

export const bottomDivider = css`
  // TODO remove this later and use hr tag with class divider
  border-bottom: 1px solid ${themeColors.border_body};
`

export const themeColorCss = (color: keyof ThemeColors) => css`
  color: ${themeColors[color]};
`

export const bullet = css`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${themeColors.gray_700};
`
