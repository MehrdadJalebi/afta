import { useQuery } from "@tanstack/react-query"

import { Options, queryService } from "@/api"

export function useProfileQuery(options?: Options<"get", "/api/afta/v1/Accounts">) {
  const query = useQuery(
    queryService("afta", "/api/afta/v1/Accounts", undefined, options),
  )
  return query
}
