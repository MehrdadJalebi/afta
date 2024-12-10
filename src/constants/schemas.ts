import { z } from "zod"
import { validations } from "@/utils"

export const selectSchema = z.object({
  label: z.string(),
  value: z.union([z.number(), z.string()]),
})

export const requiredStringSchema = () =>
  // TODO replace everywhere
  z
    .string({ message: validations.required })
    .min(1, { message: validations.required })
