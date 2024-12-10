import React from "react"

export interface OTPInputProps {
  pinCount: number
  value: string
  setOTPValue: (value: string) => void
}

export interface InputProps {
  index: number
  refs: React.MutableRefObject<HTMLInputElement[]>
  isFilledArray: boolean[]
  setValue(value: string): any
  value: string
  pinCount: number
}
