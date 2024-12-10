import { useQuery } from "@tanstack/react-query"

import { Options, queryService } from "@/api"

export function useSendersQuery(
  options?: Options<"get", "/v1/sms-settings/user-line-associations/">,
) {
  return useQuery(
    queryService(
      "iris",
      "/v1/sms-settings/user-line-associations/",
      { params: { query: { page_size: 100 } } },
      options,
    ),
  )
}
