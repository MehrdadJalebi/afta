import createClient, {
  type ClientMethod,
  type FetchOptions,
  type FetchResponse,
} from "openapi-fetch"
import type {
  FilterKeys,
  HttpMethod,
  PathsWithMethod as PathsWith,
} from "openapi-typescript-helpers"

import type { EmzanoPaths } from "./schemas"
import { serverUrls } from "@/constants"
import { useAccountStore } from "@/store"
import { getIsPublicRoute } from "@/utils"
const EMZANO_BASE_URL = serverUrls.emzano

type PathGen<BasePath extends string, Paths> = {
  [k in keyof Paths & string as `${BasePath}${k}`]: Paths[k]
}
type Paths = PathGen<"", EmzanoPaths>

const clients = {
  emzano: createClient<Paths>({ baseUrl: EMZANO_BASE_URL }),
} as const
export type ServiceType = keyof typeof clients

export type PathsOf<M extends HttpMethod> = PathsWith<Paths, M>
export type RequestData<
  M extends HttpMethod,
  P extends PathsOf<M>,
> = FetchOptions<FilterKeys<Paths[P], M>>
type OpenapiResponse<M extends HttpMethod, P extends PathsOf<M>> = NonNullable<
  FetchResponse<
    M extends keyof Paths[P] ? Paths[P][keyof Paths[P] & M] : unknown,
    object,
    "application/json"
  >
>
type ResponseData<M extends HttpMethod, P extends PathsOf<M>> = {
  response: OpenapiResponse<M, P>["response"]
  data: NonNullable<OpenapiResponse<M, P>["data"]>
}

export type HttpResponseData<
  M extends HttpMethod,
  P extends PathsOf<M>,
> = NonNullable<ResponseData<M, P>["data"]>

export type ClientFetchParams<M extends HttpMethod, P extends PathsOf<M>> =
  RequestData<M, P> extends { params: any } | { body: any }
    ? [ServiceType, M, P, RequestData<M, P>]
    : [ServiceType, M, P] | [ServiceType, M, P, RequestData<M, P>]

export async function clientFetch<M extends HttpMethod, P extends PathsOf<M>>(
  ...[
    serviceKey,
    method,
    url,
    options = { headers: {} } as RequestData<M, P>,
  ]: ClientFetchParams<M, P>
): Promise<HttpResponseData<M, P>> {
  try {
    const { bearerToken } = useAccountStore.getState()
    const isPublicUrl = getIsPublicApi(url)
    if (bearerToken) {
      options = {
        ...options,
        headers: {
          ...options.headers,
          ...(!isPublicUrl && { Authorization: `Bearer ${bearerToken}` }),
        },
      } as unknown as RequestData<M, P>
    }

    const { data, error, response } = (await (
      clients[serviceKey][method.toUpperCase() as Uppercase<M>] as ClientMethod<
        any,
        HttpMethod,
        "application/json"
      >
    )(url, options)) as OpenapiResponse<M, P>

    if (error) {
      if (response.status === 401) {
        redirectToLogin()
      }
      throw { message: error, response }
    }
    return data as HttpResponseData<M, P>
  } catch (error) {
    throw error
  }
}

//TODO: check this part (and other parts of this file again)
export async function getAuthenticationCredentials() {
  const { bearerToken } = useAccountStore.getState()
  let currentBearerToken = bearerToken
  if (!currentBearerToken) {
    redirectToLogin()
  }
  return currentBearerToken
}

export function getIsPublicApi(url: string) {
  const publicUrls = [
    "/api/emzano/v1/Accounts/register",
    "/api/emzano/v1/Accounts/token-otp",
    "/api/emzano/v1/Accounts/token-password",
    "/api/emzano/v1/Accounts/captcha",
  ]
  return publicUrls.includes(url)
}

export function redirectToLogin() {
  if (!getIsPublicRoute(window.location.pathname)) {
    window.location.replace("/login")
  }
}
