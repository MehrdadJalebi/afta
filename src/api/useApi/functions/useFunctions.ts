import { useQuery } from "@tanstack/react-query"

import { queryService } from "@/api"

export function useFunctionQuery() {
  const query = useQuery(
    queryService("emzano", "/api/emzano/v1/Activity/functions"),
  )
  return query
}
