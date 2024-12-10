import { create } from "zustand"

type AccountStoreType = {
  accountID: string | null
  jwtToken: string | null
  isHijacked: boolean
  /**
   * We have an assumption in this parameter's usage that it is not null because initializeQuery will fill it.
   */
  authorizationStatus: IrisSchema<"AuthenticationStepEnum"> | null
  setAccountID: (newAccountID: string | null) => void
  setJwtToken: (newJwtToken: string | null) => void
  setIsHijacked: (isHijacked: boolean) => void
  setAuthorizationStatus: (
    authorizationStatus: IrisSchema<"AuthenticationStepEnum">,
  ) => void
}

export const useAccountStore = create<AccountStoreType>((set) => ({
  accountID: "",
  jwtToken: "",
  isHijacked: false,
  authorizationStatus: null,
  setAccountID: (newAccountID) => set({ accountID: newAccountID }),
  setJwtToken: (newJwtToken) => set({ jwtToken: newJwtToken }),
  setIsHijacked: (newIsHijacked) => set({ isHijacked: newIsHijacked }),
  setAuthorizationStatus: (newAuthorizationStatus) =>
    set({ authorizationStatus: newAuthorizationStatus }),
}))
