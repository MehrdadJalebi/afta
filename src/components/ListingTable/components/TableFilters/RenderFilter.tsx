import { UseTableStateReturnType } from "../../useTableState/types"
import {
  AsyncSelectFilter,
  ChecklistFilter,
  RangePickerFilter,
  SelectFilter,
  TextFilter,
} from "@/components/Filters"
import { useCallback } from "react"

export interface RenderFilterProps {
  filterKey: string
  stateManager: UseTableStateReturnType
}

export function RenderFilter({ filterKey, stateManager }: RenderFilterProps) {
  const filterConfig = stateManager.config.filters?.[filterKey]

  const onChange = useCallback(
    (value: any) => {
      stateManager.setFilter(filterKey, value)
    },
    [filterKey, stateManager],
  )

  switch (filterConfig?.type) {
    case "checklist":
      return (
        <ChecklistFilter
          {...filterConfig}
          type={"checkbox"}
          value={stateManager.state.filters[filterKey]}
          onChange={onChange}
        />
      )
    case "text":
      return (
        <TextFilter
          {...filterConfig}
          value={stateManager.state.filters[filterKey]}
          onChange={onChange}
        />
      )
    case "range":
      return (
        <RangePickerFilter
          {...filterConfig}
          value={stateManager.state.filters[filterKey]}
          onChange={onChange}
        />
      )
    case "select":
      return (
        <SelectFilter
          {...filterConfig}
          value={stateManager.state.filters[filterKey]}
          onChange={onChange}
        />
      )
    case "async-select":
      return (
        <AsyncSelectFilter
          {...filterConfig}
          value={stateManager.state.filters[filterKey]}
          onChange={onChange}
        />
      )
    default:
      return "NOT IMPLEMENTED"
  }
}
