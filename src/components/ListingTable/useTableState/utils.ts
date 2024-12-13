import {
  FilterParams,
  SelectFilterParams,
  TableState,
  UseTableStateParams,
  UseTableStateReturnType,
} from "@/components/ListingTable/useTableState/types"
import { DateRange, LabelValue } from "@/types/common"
import { toIsoFormat } from "@/utils"

export const getTableStateConfig = <T extends Record<string, FilterParams>>(
  params: UseTableStateParams<T>,
) => params

/**
 * Generates query params for the filters, search and pagination of the table.
 * If you want to omit a filter, set its query to empty string ("")
 * @param stateManager the state manager returned by `useTableState` hook
 */
export const getTableQueryParams = <T extends Record<string, FilterParams>>(
  stateManager: UseTableStateReturnType<T>,
) => {
  const { state, config } = stateManager
  const params: Record<string, any> = {}

  if (state.search && !!config.searchParams) params.search = state.search

  if (config.paginationParams) {
    if (state.pagination?.pageIndex) params.pageIndex = state.pagination.pageIndex
    if (state.pagination?.pageSize) params.pageSize = state.pagination.pageSize
  }

  const filtersConfig = config.filters
  for (const key in filtersConfig) {
    const filterState = state.filters[key]
    const query = filtersConfig[key].query
    if (query === "") continue
    const isEmptyFilter =
      !filterState ||
      (Array.isArray(filterState) && filterState.length === 0) ||
      Object.keys(filterState).length === 0
    if (isEmptyFilter) continue
    switch (filtersConfig[key].type) {
      case "text":
        params[query as string] = filterState as string
        break
      case "range":
        const s = filterState as DateRange
        const hasTransformer = !!filtersConfig[key].queryValueTransformer
        if (s.start)
          params[query[0]] = hasTransformer
            ? s.start
            : toIsoFormat(s.start, true)
        if (s.end)
          params[query[1]] = hasTransformer ? s.end : toIsoFormat(s.end, true)
        break
      case "checklist":
      case "select":
      case "async-select":
        if (Array.isArray(filterState) && filterState.length > 0) {
          params[query as string] = (filterState as LabelValue[]).map(
            (item) => item.value,
          )
        } else {
          params[query as string] = (filterState as LabelValue).value
        }
    }
    const transformer = filtersConfig[key].queryValueTransformer
    if (transformer) {
      if (Array.isArray(query)) {
        query.forEach((item) => {
          applyQueryValueTransformer(params, item, transformer)
        })
      } else {
        applyQueryValueTransformer(params, query, transformer)
      }
    }
  }
  return params
}

const applyQueryValueTransformer = (
  params: Record<string, any>,
  query: string,
  transformer: (value: any) => any,
) => {
  let transformed = undefined
  if (params.hasOwnProperty(query)) {
    transformed = transformer(params[query])
  }
  if (transformed === undefined || transformed === null) {
    delete params[query]
  }
  params[query] = transformed
}

export const getDefaultTableState = <T extends Record<string, FilterParams>>(
  params: UseTableStateParams<T>,
) => {
  const state = { filters: {} } as TableState<T>
  const { searchParams, paginationParams, filters } = params
  if (searchParams?.placeholder) {
    state.search = ""
  }
  if (paginationParams) {
    state.pagination = {
      pageIndex: paginationParams.defaultPageNumber,
      pageSize: paginationParams.defaultPageSize,
    }
  }

  for (const key in filters) {
    const type = filters[key].type
    switch (type) {
      case "checklist":
        state.filters[key] = [] as any
        break
      case "range":
        state.filters[key] = { start: undefined, end: undefined } as any
        break
      case "select":
      case "async-select":
        if ((filters[key] as SelectFilterParams).isMulti) {
          state.filters[key] = [] as any
        } else {
          state.filters[key] = undefined as any
        }
        break
      case "text":
        state.filters[key] = "" as any
    }
  }

  return state
}
