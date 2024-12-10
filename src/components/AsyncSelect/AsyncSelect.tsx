import {
  GroupBase,
  InputActionMeta,
  MenuListProps,
  OptionsOrGroups,
  components,
} from "react-select"
import { HijackLabelValue, YSelect, YSelectProps } from "@/components/UI"
import {
  clientFetch,
  type PathsOf,
  RequestData,
  type ServiceType,
} from "@/api/api-service"
import {
  DefinedInitialDataInfiniteOptions,
  useInfiniteQuery,
  UseQueryOptions,
} from "@tanstack/react-query"
import React, { useCallback, useMemo, useState } from "react"
import debounce from "lodash.debounce"
import merge from "lodash.merge"
import { PageParam } from "@/api"
import type { InfiniteData } from "@tanstack/query-core"
import { Spinner } from "react-bootstrap"
import type { HttpMethod } from "openapi-typescript-helpers"

// TODO typescript can be improved
export interface AsyncSelectProps<
  TData extends any,
  Option = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
> extends Omit<
    YSelectProps<Option, IsMulti, Group>,
    "options" | "inputValue" | "onInputChange"
  > {
  /**
   * You must pass the return value of `queryService` as this props.
   * It's a good practice to put it in `useMemo` to prevent API calls on parent re-renders
   */
  queryOptions: UseQueryOptions<TData, any>
  /**
   * Generates select options based on the data received from query.
   * It's a good practice to put it in `useCallback` to prevent API calls on parent re-renders
   */
  optionsGenerator: (data: TData) => OptionsOrGroups<Option, Group>
}

/**
 * This select works by the fact that the `queryService` returns all the necessary data in `queryKey`
 * and also the third item of the queryKey array returned by `queryService` is the query data.
 * So we can override `params.query.search` to make a request containing the search string. So please always ensure
 * that you are using the `queryService` for `queryOptions`. Otherwise, this component won't work.
 */
export function AsyncSelect<
  TData extends PaginatedResponse,
  Option extends HijackLabelValue = HijackLabelValue,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>({
  queryOptions,
  optionsGenerator,
  ...selectProps
}: AsyncSelectProps<TData, Option, IsMulti, Group>) {
  const [inputText, setInputText] = useState("")
  const [searchText, setSearchText] = useState("")

  const finalQueryOptions = useMemo<
    DefinedInitialDataInfiniteOptions<
      TData,
      any,
      InfiniteData<TData, unknown>,
      any,
      PageParam
    >
  >(() => {
    const [serviceKey, url, init, method] = queryOptions.queryKey
    return {
      staleTime: 10 * 1000,
      ...(queryOptions as any),
      queryFn: (context) => {
        let [serviceKey, url, init, method, search] = context.queryKey
        if (context.pageParam) {
          init = merge(init || {}, {
            params: {
              query: {
                page: (context.pageParam as PageParam).pageNumber,
                search,
              },
            },
          })
        }
        return clientFetch(
          serviceKey as ServiceType,
          (method as HttpMethod) || "get",
          url as PathsOf<HttpMethod>,
          init as never,
        )
      },
      queryKey: [serviceKey, url, init, method, searchText],
      initialPageParam: { pageNumber: 1 },
      getNextPageParam: (lastPage) => {
        if (lastPage.next) {
          const nextPageURL = new URL(lastPage.next)
          const nextPageNumber = nextPageURL.searchParams.get("page")
          if (nextPageNumber) {
            return { pageNumber: Number(nextPageNumber) }
          }
        }
        return null
      },
    }
  }, [queryOptions, searchText])

  const { data, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery(finalQueryOptions)

  const options = useMemo(() => {
    if (data) {
      const results = data.pages.map((group) => group.results).flat()
      return optionsGenerator({ results } as TData)
    }
    return []
  }, [optionsGenerator, data])

  const handleSearchDebounced = useCallback(
    debounce((searchText) => setSearchText(searchText), 500, { maxWait: 1000 }),
    [],
  )

  const handleInputChange = (inputText: string, meta: InputActionMeta) => {
    if (meta.action !== "input-blur" && meta.action !== "menu-close") {
      setInputText(inputText)
      handleSearchDebounced(inputText)
    }
  }

  const scrollEndHandler = () => {
    if (!isFetchingNextPage && hasNextPage) {
      fetchNextPage()
    }
  }

  return (
    <YSelect
      {...selectProps}
      options={options}
      isLoading={selectProps.isLoading || isFetching}
      inputValue={inputText}
      onInputChange={handleInputChange}
      onMenuScrollToBottom={scrollEndHandler}
      components={{ MenuList: CustomMenuList }}
      //@ts-ignore
      isFetchingNextPage={isFetchingNextPage}
    />
  )
}

const CustomMenuList = (props: MenuListProps<any, any, any>) => {
  const isFetchingNextPage: boolean = (props.selectProps as any)
    .isFetchingNextPage
  return (
    <components.MenuList {...props}>
      {props.children}
      {isFetchingNextPage && (
        <div className={"d-flex justify-content-center p-3"}>
          <Spinner size={"sm"} />
        </div>
      )}
    </components.MenuList>
  )
}

type PaginatedResponse = {
  count?: number
  next?: string | null
  previous?: string | null
  results?: any
}
