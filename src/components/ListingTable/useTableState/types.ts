import {
  ChecklistFilterProps,
  RangePickerFilterProps,
  AsyncSelectFilterProps,
  TextFilterProps,
  SelectFilterProps,
} from "@/components/Filters"
import { LabelValue, DateRange } from "@/types/common"
import React from "react"

export interface PaginationParams {
  defaultPageNumber: number
  defaultPageSize: number
}

export interface SearchParams {
  placeholder: string
}

export interface BaseFilterParams {
  queryValueTransformer?: (value: any) => any
}

export interface ChecklistFilterParams
  extends BaseFilterParams,
    Omit<ChecklistFilterProps, "onChange" | "value" | "type"> {
  type: "checklist"
  query: string
}

export interface SelectFilterParams
  extends BaseFilterParams,
    Omit<SelectFilterProps, "onChange" | "value"> {
  type: "select"
  query: string
}

export interface AsyncSelectFilterParams
  extends BaseFilterParams,
    Omit<AsyncSelectFilterProps, "onChange" | "value"> {
  type: "async-select"
  query: string
}

export interface TextFilterParams
  extends BaseFilterParams,
    Omit<TextFilterProps, "onChange" | "value"> {
  type: "text"
  query: string
}

export interface DateRangeFilterParams
  extends BaseFilterParams,
    Omit<RangePickerFilterProps, "onChange" | "value"> {
  type: "range"
  query: [string, string]
}

export type FilterParams =
  | TextFilterParams
  | DateRangeFilterParams
  | ChecklistFilterParams
  | SelectFilterParams
  | AsyncSelectFilterParams

export interface UseTableStateParams<T extends Record<string, FilterParams>> {
  searchParams?: SearchParams
  filters?: T
  paginationParams?: PaginationParams
}

export type FilterState<T extends Record<string, FilterParams>> = {
  [k in keyof T]: T[k] extends ChecklistFilterParams
    ? LabelValue[]
    : T[k] extends TextFilterParams
      ? string
      : T[k] extends SelectFilterParams | AsyncSelectFilterParams
        ? LabelValue | LabelValue[] | undefined
        : T[k] extends DateRangeFilterParams
          ? DateRange
          : never
}

export type PaginationState = {
  pageNumber: number
  pageSize: number
}

export type TableState<T extends Record<string, FilterParams>> = {
  filters: FilterState<T>
} & {
  search?: string
} & { pagination?: PaginationState }

export type FilterUpdater<Z extends FilterState<any>> = (
  key: keyof Z,
  updater: Z[keyof Z] | ((prevState: Z[keyof Z]) => Z[keyof Z]),
) => void

export type PaginationUpdater = (
  updater:
    | PaginationState
    | ((prevState?: PaginationState) => PaginationState | undefined),
) => void

export type SearchUpdater = (
  updater: string | ((prevState: string) => string),
) => void

export type UseTableStateReturnType<
  T extends Record<string, FilterParams> = Record<string, FilterParams>,
> = {
  state: TableState<T>
  _forceSetState: React.Dispatch<React.SetStateAction<TableState<T>>>
  setFilter: FilterUpdater<FilterState<T>>
  setPagination: PaginationUpdater
  setSearch: SearchUpdater
  config: UseTableStateParams<T>
  resetFilters: () => void
  hasActiveFilters: () => boolean
}
