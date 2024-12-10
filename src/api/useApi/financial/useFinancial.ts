import { useQuery } from "@tanstack/react-query"

import { Options, queryService } from "@/api"

export function useFinancialAccountInfoQuery(
  options?: Options<"get", "/api/v2/accounts/financial-account-info/">,
) {
  return useQuery(
    queryService(
      "financial",
      "/api/v2/accounts/financial-account-info/",
      undefined,
      options,
    ),
  )
}
