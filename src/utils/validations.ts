import { z } from "zod"
import { validations } from "@/utils/messages"
import {
  IRAN_PHONE_NUMBER_REGEX,
  PERSIAN_NUMBERS_NOT_INCLUDED_REGEX,
  IRAN_PHONE_NUMBER_PERSIAN_INCLUDED_REGEX,
} from "@/constants/regex"

export const phoneNumberValidation = z
  .string()
  .min(1, { message: validations.required })
  .regex(PERSIAN_NUMBERS_NOT_INCLUDED_REGEX, {
    message: validations.no_persian_numbers,
  })
  .regex(IRAN_PHONE_NUMBER_REGEX, {
    message: validations.wrong_mobile_number_format,
  })

export const phoneNumberPersianIncludedValidation = z
  .string()
  .min(1, { message: validations.required })
  .regex(IRAN_PHONE_NUMBER_PERSIAN_INCLUDED_REGEX, {
    message: validations.wrong_mobile_number_format,
  })

/**
 * @copyright http://www.aliarash.com/article/shenasameli/shenasa_meli.htm
 */
export function validateNationalID(value: string | undefined): boolean {
  if (!value) return false
  if (value.length < 11 || parseInt(value, 10) === 0) return false
  if (parseInt(value.slice(3, 9), 10) == 0) return false
  const c = parseInt(value.slice(10, 11), 10)
  const d = parseInt(value.slice(9, 10), 10) + 2
  const z = [29, 27, 23, 19, 17]
  let s = 0
  for (let i = 0; i < 10; i++)
    s += (d + parseInt(value.slice(i, i + 1), 10)) * z[i % 5]
  s = s % 11
  if (s == 10) s = 0
  return c == s
}

/**
 * @copyright https://academy.rayanita.com/national-code-validation-algorithm/
 */
export function validateNationalCode(value: string | undefined): boolean {
  if (!value) return false
  if (value.length !== 10) return false
  if (parseInt(value.slice(3, 9), 10) == 0) return false
  const c = parseInt(value.slice(9, 10), 10)
  let s = 0
  for (let i = 0; i < 9; i++)
    s += parseInt(value.slice(i, i + 1), 10) * (10 - i)
  s = s % 11
  return (s < 2 && c == s) || (s >= 2 && c == 11 - s)
}
