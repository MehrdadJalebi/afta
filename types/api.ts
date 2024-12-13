import type { components as AftaComponents } from "@/api/schemas/afta-schema"

declare global {
  export type AftaSchema<T extends keyof AftaComponents["schemas"]> =
  AftaComponents["schemas"][T]
}
