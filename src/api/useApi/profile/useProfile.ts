import { useQuery } from "@tanstack/react-query"

import { queryService } from "@/api"

export function useProfileQuery() {
  const query = useQuery(queryService("emzano", "/api/emzano/v1/Accounts/info"))
  return query
}
