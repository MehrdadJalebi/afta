import { useQuery } from "@tanstack/react-query"

import { queryService } from "@/api"

export function useFinanceInfo() {
  return useQuery(queryService("iris", "/v1/finance/info/"))
}
