import type { components as EmzanoComponents } from "@/api/schemas/emzano-schema"

declare global {
  export type EmzanoSchema<T extends keyof EmzanoComponents["schemas"]> =
    EmzanoComponents["schemas"][T]
}
