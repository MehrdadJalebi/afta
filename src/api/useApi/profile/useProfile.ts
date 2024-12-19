import { useQuery } from "@tanstack/react-query"

import { queryService } from "@/api"

export function useProfileQuery() {
  const query = useQuery(queryService("afta", "/api/afta/v1/Accounts/info"))
  return query
}
