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

import type {
  IrisPaths,
  NajvaAccountsPaths,
  SegmentPaths,
  AccountsPaths,
  CrmPaths,
  FinancialPaths,
  AftaPaths,
} from "./schemas"
import { serverUrls, DEV_JWT_TOKEN, IS_DEVELOPMENT } from "@/constants"
import { useAccountStore } from "@/store"

const IRIS_BASE_URL = serverUrls.iris
const NAJVA_ACCOUNTS_BASE_URL = serverUrls.najva_accounts
const SEGMENT_BASE_URL = serverUrls.segment
const ACCOUNTS_BASE_URL = serverUrls.accounts
const CRM_BASE_URL = serverUrls.crm
const FINANCIAL_BASE_URL = serverUrls.financial
const AFTA_BASE_URL = serverUrls.afta

type PathGen<BasePath extends string, Paths> = {
  [k in keyof Paths & string as `${BasePath}${k}`]: Paths[k]
}
type Paths = PathGen<
  "",
  IrisPaths &
    NajvaAccountsPaths &
    SegmentPaths &
    AccountsPaths &
    CrmPaths &
    FinancialPaths &
    AftaPaths
> // TODO rewrite with PathGen<BasePath>

const clients = {
  iris: createClient<Paths>({ baseUrl: IRIS_BASE_URL }),
  najva_accounts: createClient<Paths>({ baseUrl: NAJVA_ACCOUNTS_BASE_URL }),
  segment: createClient<Paths>({ baseUrl: SEGMENT_BASE_URL }),
  accounts: createClient<Paths>({ baseUrl: ACCOUNTS_BASE_URL }),
  crm: createClient<Paths>({ baseUrl: CRM_BASE_URL }),
  financial: createClient<Paths>({ baseUrl: FINANCIAL_BASE_URL }),
  afta: createClient<Paths>({ baseUrl: AFTA_BASE_URL }),
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
    const jwtToken = await getAuthenticationCredentials()
    if (jwtToken) {
      options = {
        ...options,
        headers: { ...options.headers, Authorization: `JWT ${jwtToken}` },
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
        getJwtTokenApi()
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
  const { accountID, jwtToken, setAccountID, setJwtToken } =
    useAccountStore.getState()

  const params = new URL(document.location.toString()).searchParams
  const storedAccountID =
    params.get("account") || localStorage.getItem("accountID")
  let currentJwtToken = jwtToken
  if (!accountID && storedAccountID) {
    setAccountID(storedAccountID)
  }
  if (IS_DEVELOPMENT) {
    setJwtToken(DEV_JWT_TOKEN)
    currentJwtToken = DEV_JWT_TOKEN
  }
  const isAuthenticated = accountID && jwtToken
  if (!isAuthenticated && !IS_DEVELOPMENT) {
    currentJwtToken = await getJwtTokenApi()
  }
  return currentJwtToken
}

async function getJwtTokenApi() {
  const { accountID, setJwtToken } = useAccountStore.getState()
  try {
    const response = await fetch(
      `${NAJVA_ACCOUNTS_BASE_URL}/api/v3/token/access/?account=${accountID}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      },
    )
    if (!response.ok) {
      redirectToAccounts()
      return ""
    }
    const data = await response.json()
    setJwtToken(data.token)
    return data.token
  } catch (error) {
    redirectToAccounts()
    return ""
  }
}

export function redirectToAccounts() {
  window.location.replace(
    `${serverUrls.accounts}/login/?plt=najva&type=pub&redirect=${document.location.href}`,
  )
}
