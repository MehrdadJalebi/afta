/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/api/afta/v1/Accounts/register": {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    get?: never
    put?: never
    post: {
      parameters: {
        query?: never
        header?: never
        path?: never
        cookie?: never
      }
      requestBody?: {
        content: {
          "application/json": components["schemas"]["LoginRequest"]
          "text/json": components["schemas"]["LoginRequest"]
          "application/*+json": components["schemas"]["LoginRequest"]
        }
      }
      responses: {
        /** @description OK */
        200: {
          headers: {
            [name: string]: unknown
          }
          content?: never
        }
      }
    }
    delete?: never
    options?: never
    head?: never
    patch?: never
    trace?: never
  }
  "/api/afta/v1/Accounts/send-otp": {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    get?: never
    put?: never
    post: {
      parameters: {
        query?: {
          phoneNumber?: string
        }
        header?: never
        path?: never
        cookie?: never
      }
      requestBody?: never
      responses: {
        /** @description OK */
        200: {
          headers: {
            [name: string]: unknown
          }
          content?: never
        }
      }
    }
    delete?: never
    options?: never
    head?: never
    patch?: never
    trace?: never
  }
  "/api/afta/v1/Accounts/password": {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    get?: never
    put?: never
    post?: never
    delete?: never
    options?: never
    head?: never
    patch: {
      parameters: {
        query?: never
        header?: never
        path?: never
        cookie?: never
      }
      requestBody?: {
        content: {
          "application/json": components["schemas"]["SetPasswordInputRequest"]
          "text/json": components["schemas"]["SetPasswordInputRequest"]
          "application/*+json": components["schemas"]["SetPasswordInputRequest"]
        }
      }
      responses: {
        /** @description OK */
        200: {
          headers: {
            [name: string]: unknown
          }
          content?: never
        }
      }
    }
    trace?: never
  }
  "/api/afta/v1/Accounts/info": {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    get: {
      parameters: {
        query?: never
        header?: never
        path?: never
        cookie?: never
      }
      requestBody?: never
      responses: {
        /** @description OK */
        200: {
          headers: {
            [name: string]: unknown
          }
          content?: never
        }
      }
    }
    put?: never
    post?: never
    delete?: never
    options?: never
    head?: never
    patch?: never
    trace?: never
  }
  "/api/afta/v1/Accounts": {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    get: {
      parameters: {
        query?: {
          pageIndex?: number
          pageSize?: number
          searchValue?: string
        }
        header?: never
        path?: never
        cookie?: never
      }
      requestBody?: never
      responses: {
        /** @description OK */
        200: {
          headers: {
            [name: string]: unknown
          }
          content?: never
        }
      }
    }
    put: {
      parameters: {
        query?: never
        header?: never
        path?: never
        cookie?: never
      }
      requestBody?: {
        content: {
          "application/json": components["schemas"]["CustomerUpdateRequest"]
          "text/json": components["schemas"]["CustomerUpdateRequest"]
          "application/*+json": components["schemas"]["CustomerUpdateRequest"]
        }
      }
      responses: {
        /** @description OK */
        200: {
          headers: {
            [name: string]: unknown
          }
          content?: never
        }
      }
    }
    post?: never
    delete?: never
    options?: never
    head?: never
    patch?: never
    trace?: never
  }
  "/api/afta/v1/Accounts/token-otp": {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    get?: never
    put?: never
    post: {
      parameters: {
        query?: never
        header?: never
        path?: never
        cookie?: never
      }
      requestBody?: {
        content: {
          "application/json": components["schemas"]["TokenOtpRequest"]
          "text/json": components["schemas"]["TokenOtpRequest"]
          "application/*+json": components["schemas"]["TokenOtpRequest"]
        }
      }
      responses: {
        /** @description OK */
        200: {
          headers: {
            [name: string]: unknown
          }
          content?: never
        }
      }
    }
    delete?: never
    options?: never
    head?: never
    patch?: never
    trace?: never
  }
  "/api/afta/v1/Accounts/token-password": {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    get?: never
    put?: never
    post: {
      parameters: {
        query?: never
        header?: never
        path?: never
        cookie?: never
      }
      requestBody?: {
        content: {
          "application/json": components["schemas"]["TokenPasswordRequest"]
          "text/json": components["schemas"]["TokenPasswordRequest"]
          "application/*+json": components["schemas"]["TokenPasswordRequest"]
        }
      }
      responses: {
        /** @description OK */
        200: {
          headers: {
            [name: string]: unknown
          }
          content?: never
        }
      }
    }
    delete?: never
    options?: never
    head?: never
    patch?: never
    trace?: never
  }
  "/api/afta/v1/Accounts/active/{id}": {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    get?: never
    put?: never
    post?: never
    delete?: never
    options?: never
    head?: never
    patch: {
      parameters: {
        query?: never
        header?: never
        path: {
          id: string
        }
        cookie?: never
      }
      requestBody?: never
      responses: {
        /** @description OK */
        200: {
          headers: {
            [name: string]: unknown
          }
          content?: never
        }
      }
    }
    trace?: never
  }
  "/api/afta/v1/Accounts/inactive/{id}": {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    get?: never
    put?: never
    post?: never
    delete?: never
    options?: never
    head?: never
    patch: {
      parameters: {
        query?: never
        header?: never
        path: {
          id: string
        }
        cookie?: never
      }
      requestBody?: never
      responses: {
        /** @description OK */
        200: {
          headers: {
            [name: string]: unknown
          }
          content?: never
        }
      }
    }
    trace?: never
  }
  "/api/afta/v1/Accounts/sign-out": {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    get?: never
    put?: never
    post: {
      parameters: {
        query?: never
        header?: never
        path?: never
        cookie?: never
      }
      requestBody?: never
      responses: {
        /** @description OK */
        200: {
          headers: {
            [name: string]: unknown
          }
          content?: never
        }
      }
    }
    delete?: never
    options?: never
    head?: never
    patch?: never
    trace?: never
  }
  "/api/afta/v1/Accounts/captcha": {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    get: {
      parameters: {
        query?: never
        header?: never
        path?: never
        cookie?: never
      }
      requestBody?: never
      responses: {
        /** @description OK */
        200: {
          headers: {
            [name: string]: unknown
          }
          content: {
            "text/plain": components["schemas"]["CaptchaApiResponse"]
            "application/json": components["schemas"]["CaptchaApiResponse"]
            "text/json": components["schemas"]["CaptchaApiResponse"]
          }
        }
      }
    }
    put?: never
    post?: never
    delete?: never
    options?: never
    head?: never
    patch?: never
    trace?: never
  }
  "/api/afta/v1/Activity/functions": {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    get: {
      parameters: {
        query?: never
        header?: never
        path?: never
        cookie?: never
      }
      requestBody?: never
      responses: {
        /** @description OK */
        200: {
          headers: {
            [name: string]: unknown
          }
          content?: never
        }
      }
    }
    put?: never
    post?: never
    delete?: never
    options?: never
    head?: never
    patch?: never
    trace?: never
  }
  "/api/afta/v1/Activity/contracts/{id}": {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    get: {
      parameters: {
        query?: {
          functionName?: string
          pageIndex?: number
          pageSize?: number
        }
        header?: never
        path: {
          id: number
        }
        cookie?: never
      }
      requestBody?: never
      responses: {
        /** @description OK */
        200: {
          headers: {
            [name: string]: unknown
          }
          content?: never
        }
      }
    }
    put?: never
    post?: never
    delete?: never
    options?: never
    head?: never
    patch?: never
    trace?: never
  }
  "/api/afta/v1/Activity/users/{id}": {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    get: {
      parameters: {
        query?: {
          pageIndex?: number
          functionName?: string
          pageSize?: number
        }
        header?: never
        path: {
          id: number
        }
        cookie?: never
      }
      requestBody?: never
      responses: {
        /** @description OK */
        200: {
          headers: {
            [name: string]: unknown
          }
          content?: never
        }
      }
    }
    put?: never
    post?: never
    delete?: never
    options?: never
    head?: never
    patch?: never
    trace?: never
  }
  "/api/afta/v1/Contracts": {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    get?: never
    put?: never
    post: {
      parameters: {
        query?: never
        header?: never
        path?: never
        cookie?: never
      }
      requestBody?: {
        content: {
          "application/json": components["schemas"]["ContractRequest"]
          "text/json": components["schemas"]["ContractRequest"]
          "application/*+json": components["schemas"]["ContractRequest"]
        }
      }
      responses: {
        /** @description OK */
        200: {
          headers: {
            [name: string]: unknown
          }
          content?: never
        }
      }
    }
    delete?: never
    options?: never
    head?: never
    patch?: never
    trace?: never
  }
  "/api/afta/v1/Contracts/{id}/parties": {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    get: {
      parameters: {
        query?: never
        header?: never
        path: {
          id: number
        }
        cookie?: never
      }
      requestBody?: never
      responses: {
        /** @description OK */
        200: {
          headers: {
            [name: string]: unknown
          }
          content?: never
        }
      }
    }
    put?: never
    post?: never
    delete?: never
    options?: never
    head?: never
    patch?: never
    trace?: never
  }
  "/api/afta/v1/Contracts/user/{id}": {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    get: {
      parameters: {
        query?: never
        header?: never
        path: {
          id: number
        }
        cookie?: never
      }
      requestBody?: never
      responses: {
        /** @description OK */
        200: {
          headers: {
            [name: string]: unknown
          }
          content?: never
        }
      }
    }
    put?: never
    post?: never
    delete?: never
    options?: never
    head?: never
    patch?: never
    trace?: never
  }
  "/api/afta/v1/Contracts/{id}": {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    get?: never
    put?: never
    post?: never
    delete: {
      parameters: {
        query?: never
        header?: never
        path: {
          id: number
        }
        cookie?: never
      }
      requestBody?: never
      responses: {
        /** @description OK */
        200: {
          headers: {
            [name: string]: unknown
          }
          content?: never
        }
      }
    }
    options?: never
    head?: never
    patch?: never
    trace?: never
  }
  "/api/afta/v1/Contracts/sign/{id}": {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    get?: never
    put?: never
    post?: never
    delete?: never
    options?: never
    head?: never
    patch: {
      parameters: {
        query?: never
        header?: never
        path: {
          id: number
        }
        cookie?: never
      }
      requestBody?: never
      responses: {
        /** @description OK */
        200: {
          headers: {
            [name: string]: unknown
          }
          content?: never
        }
      }
    }
    trace?: never
  }
  "/api/afta/v1/SystemLogs": {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    get: {
      parameters: {
        query?: {
          pageIndex?: number
          pageSize?: number
        }
        header?: never
        path?: never
        cookie?: never
      }
      requestBody?: never
      responses: {
        /** @description OK */
        200: {
          headers: {
            [name: string]: unknown
          }
          content?: never
        }
      }
    }
    put?: never
    post?: never
    delete?: never
    options?: never
    head?: never
    patch?: never
    trace?: never
  }
}
export type webhooks = Record<string, never>
export interface components {
  schemas: {
    CaptchaApiResponse: {
      captchaImgUrl?: string | null
      captchaId?: string | null
      captchaTextValue?: string | null
      captchaTokenValue?: string | null
    }
    ContractRequest: {
      title?: string | null
      description?: string | null
      userIds?: string[] | null
    }
    CustomerUpdateRequest: {
      firstName?: string | null
      lastName?: string | null
      nationalCode?: string | null
    }
    LoginRequest: {
      nationalCode?: string | null
      firstName?: string | null
      lastName?: string | null
      cellphone?: string | null
      captchaText?: string | null
      captchaToken?: string | null
      captchaInputText?: string | null
    }
    SetPasswordInputRequest: {
      password?: string | null
      reEnterPassword?: string | null
    }
    TokenOtpRequest: {
      cellNumber?: string | null
      otp?: string | null
    }
    TokenPasswordRequest: {
      username?: string | null
      password?: string | null
    }
  }
  responses: never
  parameters: never
  requestBodies: never
  headers: never
  pathItems: never
}
export type $defs = Record<string, never>
export type operations = Record<string, never>
