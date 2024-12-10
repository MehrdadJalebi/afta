export interface paths {
  "/api/v1/user/": {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    get: operations["accounts_user_account"]
    put?: never
    post?: never
    delete?: never
    options?: never
    head?: never
    patch?: never
    trace?: never
  }
}
export interface components {
  schemas: {
    accountsUserAccount: {
      email?: string
      email_verified?: boolean
      first_name?: string
      last_name?: string
      id?: number
      image?: string
      is_active?: boolean
      is_hijacked?: boolean
      is_staff?: boolean
      join_date?: string
      last_active_date?: string
      last_login_date?: string
      phone?: string
      phone_verified?: boolean
      username?: string
      phone?: string
      phone?: string
    }
  }
}
export interface operations {
  accounts_user_account: {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    requestBody?: never
    responses: {
      /** @description No response body */
      200: {
        headers: {
          [name: string]: unknown
        }
        content: {
          "application/json": components["schemas"]["accountsUserAccount"]
        }
      }
    }
  }
}
