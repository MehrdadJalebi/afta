import { Options, queryService } from "@/api"
import { useQuery } from "@tanstack/react-query"
import { useAccountStore } from "@/store"
import { useEffect } from "react"

export const useInitializeAccount = (
  options?: Options<"get", "/v1/account-management/initialize/">,
) => {
  const query = useQuery(
    queryService(
      "iris",
      "/v1/account-management/initialize/",
      undefined,
      options,
    ),
  )
  const { setAuthorizationStatus } = useAccountStore()

  useEffect(() => {
    if (query.data) {
      setAuthorizationStatus(query.data.authentication_step!)
    }
  }, [query.data])

  return query
}
