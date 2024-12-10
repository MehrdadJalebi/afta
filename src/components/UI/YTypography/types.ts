import React from "react"
import { ThemeColors } from "@/styles/bootstrap/variables"

export const variantStyleToTagMapping = {
  headline1: "h1",
  headline2: "h2",
  headline3: "h3",
  title: "p",
  label: "p",
  caption: "p",
  body: "p",
  detail: "p",
} as const

export type variantWeight = "regular" | "medium" | "bold"
export type variantStyle = keyof typeof variantStyleToTagMapping

export type YTypographyProps<T extends React.ElementType> = {
  tag?: T
  variant?: `${variantStyle}-${variantWeight}`
  color?: keyof ThemeColors
} & React.ComponentPropsWithoutRef<T>
