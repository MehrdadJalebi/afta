import { useQuery } from "@tanstack/react-query"

import { Options, queryService } from "@/api"
import { useEffect } from "react"
import { useAccountStore } from "@/store"
import { IS_DEVELOPMENT } from "@/constants"

export function useProfileQuery(options?: Options<"get", "/api/v1/user/">) {
  const query = useQuery(
    queryService("accounts", "/api/v1/user/", undefined, options),
  )
  const setIsHijacked = useAccountStore((state) => state.setIsHijacked)
  useEffect(() => {
    setIsHijacked(IS_DEVELOPMENT || !!query.data?.is_hijacked)
  }, [query.data])
  return query
}
