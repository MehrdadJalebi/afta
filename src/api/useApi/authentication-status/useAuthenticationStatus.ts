import { Options, queryService } from "@/api"
import { useQuery } from "@tanstack/react-query"

export const useAuthenticationStatus = (
  options?: Options<"get", "/v1/account-management/authentication/get-flow/">,
) => {
  return useQuery(
    queryService(
      "iris",
      "/v1/account-management/authentication/get-flow/",
      undefined,
      options,
    ),
  )
}
