export interface paths {
  "/api/v3/token/access/": {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    get: operations["access_token_retrieve"]
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
    najvaAccessToken: {
      /** @example 300 */
      expire?: number
      /** @example eysdfsdfsfsdsdfgsdfgsdfgsdfg */
      token?: string
    }
  }
}
export interface operations {
  access_token_retrieve: {
    parameters: {
      query?: {
        account?: string
      }
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
          "application/json": components["schemas"]["najvaAccessToken"]
        }
      }
    }
  }
}
