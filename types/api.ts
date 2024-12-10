import type { components as IrisComponents } from "@/api/schemas/iris-schema"
import type { components as SegmentComponents } from "@/api/schemas/segment-schema"
import type { components as AccountsComponents } from "@/api/schemas/accounts-schema"
import type { components as FinancialComponent } from "@/api/schemas/financial-schema"

declare global {
  export type IrisSchema<T extends keyof IrisComponents["schemas"]> =
    IrisComponents["schemas"][T]
  export type SegmentSchema<T extends keyof SegmentComponents["schemas"]> =
    SegmentComponents["schemas"][T]
  export type AccountsSchema<T extends keyof AccountsComponents["schemas"]> =
    AccountsComponents["schemas"][T]
  export type FinancialSchema<T extends keyof FinancialComponent["schemas"]> =
    FinancialComponent["schemas"][T]
}
