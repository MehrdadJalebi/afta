import { useQuery } from "@tanstack/react-query"

import { queryService } from "@/api"

export function useFunctionQuery() {
  const query = useQuery(
    queryService("afta", "/api/afta/v1/Activity/functions"),
  )
  return query
}
