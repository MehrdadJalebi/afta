import * as exportedBreakpoints from "./exports/breakpoints.module.scss"
import * as exportedColors from "./exports/colors.module.scss"

type ColorRadiant =
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900"
  | "950"
  | "custom"
type ColorVairant =
  | "gray"
  | "green"
  | "red"
  | "warning"
  | "blue"
  | "primary"
  | "secondary"
type Breakpoints = "xs" | "sm" | "md" | "lg" | "xl" | "xxl"
type Shadows = "shadowOne" | "shadowTwo"

type ColorCombinations = {
  [key in `${ColorVairant}_${ColorRadiant}`]: string
}

type BorderCombinations = {
  border_body: string
  border_input: string
  border_input_hover: string
}

export interface ThemeColors extends ColorCombinations, BorderCombinations {
  primary: string
  secondary: string
  success: string
  info: string
  warning: string
  danger: string
  light: string
  dark: string
}

type ThemeVariables = {
  breakpoints: { [key in Breakpoints]: string }
  boxShadows: { [key in Shadows]: string }
}

export const themeColors = exportedColors as unknown as ThemeColors

export const themeVariables = {
  breakpoints: { ...exportedBreakpoints },
  boxShadows: {
    shadowOne: "0px 9px 31.5px 0px #E3E8EF",
    shadowTwo: "0px 4px 33.3px 0px #dadada94",
  },
} as unknown as ThemeVariables
