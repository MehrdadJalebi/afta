export interface paths {
  "/api/v2/accounts/financial-account-info/": {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    get: operations["financial_account_info"]
    put?: never
    post?: never
    delete?: never
    options?: never
    head?: never
    patch?: never
    trace?: never
  }
  "/api/v1/accounts/fetch-financial-info/": {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    get: operations["fetch_financial_info"]
    put?: never
    post?: never
    delete?: never
    options?: never
    head?: never
    patch?: never
    trace?: never
  }
  "/api/v1/accounts/edit-personal-info-requests/": {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    get?: never
    post: operations["edit_personal_info_requests_create"]
    put?: never
    delete?: never
    options?: never
    head?: never
    patch?: never
    trace?: never
  }
}

export interface components {
  schemas: {
    FinancialAccountInfo: {
      created?: string
      id?: number
      modified?: string
      state?: string
      account_deactivation_types?: any[]
      account_number?: number
      account_owner_name?: string
      account_type?: "R" | "C"
      address_text?: string
      auto_periodic_payment?: boolean
      bank?: string
      change_request_status_message?: string
      city?: string
      civil_validation?: string
      completed_agreement?: boolean
      credit_card_number?: string
      credit_debt_limit?: number
      customer?: number
      customer_data?: object
      description?: string
      economic_number?: string
      financial_settlement_amount?: any
      financial_settlement_datetime?: any
      has_admin_clear_account_permission?: boolean
      has_any_change_request_pending?: boolean
      has_complete_agreement?: boolean
      iban_number?: any
      identity_certificate_file?: any
      info_confirmation?: boolean
      is_completed?: boolean
      mobile_number?: string
      name?: string
      national_card_file?: any
      national_number?: string
      pay_date_type?: string[]
      payment_group?: string
      phone_number?: string
      postal_code?: string
      region?: string
      registration_number?: string
      shahkar_approved_status?: number
      user_account_id?: string
      value_added_certificate?: any
      verified?: boolean
    }
    FetchFinancialInfo: {
      Address: string
      Name: string
      NationalId: string
      PostalCode: string
      RegisterNumber: string
      Validation: boolean
    }
    EditPersonalInfoRequest: {
      account_type: "R" | "C"
      name: string
      national_number: string
      state: string
      region: string
      city: string
      phone_number: string
      address_text: string
      postal_code: string
      mobile_number?: string
      economic_number?: string
      registraion_number?: string
    }
  }
}

export interface operations {
  financial_account_info: {
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
          "application/json": components["schemas"]["FinancialAccountInfo"]
        }
      }
    }
  }
  fetch_financial_info: {
    parameters: {
      query: {
        national_id: string
      }
      header?: never
      path?: never
      cookie?: never
    }
    requestBody?: never
    responses: {
      200: {
        headers: {
          [name: string]: unknown
        }
        content: {
          "application/json": components["schemas"]["FetchFinancialInfo"]
        }
      }
    }
  }
  edit_personal_info_requests_create: {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    requestBody: {
      content: {
        "application/json": components["schemas"]["EditPersonalInfoRequest"]
      }
    }
    responses: {
      200: {
        headers: {
          [name: string]: unknown
        }
        content: {
          "application/json": components["schemas"]["FinancialAccountInfo"]
        }
      }
    }
  }
}
