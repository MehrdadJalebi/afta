import { useCallback, useState } from "react"
import {
  FilterParams,
  FilterState,
  FilterUpdater,
  PaginationState,
  PaginationUpdater,
  SearchUpdater,
  TableState,
  UseTableStateParams,
  UseTableStateReturnType,
} from "./types"
import { getDefaultTableState } from "./utils"
import isEqual from "lodash.isequal"

// TODO needs documentation
export const useTableState = <T extends Record<string, FilterParams>>(
  params: UseTableStateParams<T>,
): UseTableStateReturnType<T> => {
  const [state, setState] = useState<TableState<T>>(
    getDefaultTableState(params),
  )

  const resetPageNumber = useCallback((): PaginationState | {} => {
    return params.paginationParams
      ? { pageIndex: 1, pageSize: state.pagination!.pageSize }
      : {}
  }, [params.paginationParams, state.pagination])

  const filterUpdater: FilterUpdater<FilterState<T>> = useCallback(
    (key, updater) => {
      setState((prevState) => ({
        ...prevState,
        ...resetPageNumber(),
        filters: {
          ...prevState.filters,
          [key]:
            typeof updater === "function"
              ? updater(prevState.filters[key])
              : updater,
        },
      }))
    },
    [setState],
  )

  const paginationUpdater: PaginationUpdater = useCallback(
    (updater) => {
      setState((prevState) => ({
        ...prevState,
        pagination:
          typeof updater === "function"
            ? updater(prevState.pagination)
            : updater,
      }))
    },
    [setState],
  )

  const searchUpdater: SearchUpdater = useCallback(
    (updater) => {
      setState((prevState) => ({
        ...prevState,
        ...resetPageNumber(),
        searchValue:
          typeof updater === "function"
            ? updater(prevState.searchValue || "")
            : updater,
      }))
    },
    [setState],
  )

  const resetFilters = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      ...resetPageNumber(),
      ...getDefaultTableState(params),
    }))
  }, [setState, resetPageNumber, getDefaultTableState])

  const hasActiveFilters = useCallback(() => {
    return !isEqual(getDefaultTableState(params), state)
  }, [state, params])

  return {
    state,
    _forceSetState: setState,
    config: params,
    setFilter: filterUpdater,
    setPagination: paginationUpdater,
    setSearch: searchUpdater,
    resetFilters,
    hasActiveFilters,
  }
}
