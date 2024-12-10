import {
  QueryClient,
  type UseMutationOptions,
  type UseQueryOptions,
  isServer,
  keepPreviousData,
} from "@tanstack/react-query"
import type { HttpMethod } from "openapi-typescript-helpers"

import {
  ClientFetchParams,
  type HttpResponseData,
  type PathsOf,
  type RequestData,
  type ServiceType,
  clientFetch,
} from "./api-service"

export interface DefaultError {
  message: any
  response: Response
}

export type Options<
  M extends HttpMethod,
  P extends PathsOf<M>,
  E = DefaultError,
> = Omit<Partial<UseQueryOptions<HttpResponseData<M, P>, E>>, "queryKey">
export type PageParam = {
  pageNumber: number
}

// This makes sure that if the path requires params, the init will be required
// Otherwise, Optional
type QueryServiceParams<M extends HttpMethod, P extends PathsOf<M>, E> =
  RequestData<M, P> extends { params: any }
    ? [ServiceType, P, RequestData<M, P>, Options<M, P, E>?, M?]
    :
        | [ServiceType, P]
        | [ServiceType, P, RequestData<M, P>?, Options<M, P, E>?, M?]

export function queryService<
  P extends PathsOf<M>,
  Error = DefaultError,
  M extends HttpMethod = "get",
>(
  ...[serviceKey, url, init, options, method]: QueryServiceParams<M, P, Error>
): UseQueryOptions<HttpResponseData<M, P>, Error> {
  return { ...options, queryKey: [serviceKey as any, url, init, method] }
}

// This makes sure that if the path requires body, the data will be required
// Otherwise, Optional
type MutateServiceFnParams<M extends HttpMethod, P extends PathsOf<M>> =
  RequestData<M, P> extends { body: any }
    ? RequestData<M, P>
    : RequestData<M, P> | null

export function mutateService<M extends HttpMethod, P extends PathsOf<M>>(
  ...[serviceKey, method, url]: [ServiceType, M, P]
): UseMutationOptions<
  HttpResponseData<M, P>,
  never,
  MutateServiceFnParams<M, P>
> {
  return {
    mutationKey: [url],
    mutationFn: async (options) =>
      clientFetch(
        ...([serviceKey, method, url, options] as ClientFetchParams<M, P>),
      ),
  }
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: isServer ? false : 1,
      queryFn: (context) => {
        const [serviceKey, url, init, method] = context.queryKey
        // TODO: validating the shape of the queryKey
        return clientFetch(
          serviceKey as ServiceType,
          (method as HttpMethod) || "get",
          url as PathsOf<HttpMethod>,
          init as never,
        )
      },
      refetchOnWindowFocus: false,
      placeholderData: keepPreviousData,
    },
  },
})
