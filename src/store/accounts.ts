import { create } from "zustand"

type AccountStoreType = {
  bearerToken: string | null
  isAdmin: boolean
  setBearerToken: (newJwtToken: string | null) => void
  setIsAdmin: (newAdminState: boolean) => void
}

export const useAccountStore = create<AccountStoreType>((set) => ({
  bearerToken: "",
  isAdmin: false,
  setIsAdmin: (newAdminState) => set({ isAdmin: newAdminState }),
  setBearerToken: (newJwtToken) => set({ bearerToken: newJwtToken }),
}))
