export interface paths {
  "/api/v3/najva/najva/tickets/": {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    get: operations["crm_paginated_user_tickets"]
    put?: never
    post?: never
    delete?: never
    options?: never
    head?: never
    patch?: never
    trace?: never
  }
  "/api/v3/najva/najva/ticket-categories/": {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    get: operations["crm_paginated_user_tickets"]
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
    CrmPaginatedUserTickets: {
      count?: number
      next?: string | null
      previous?: string | null
      results?: components["schemas"]["CrmUserTickets"][]
    }
    CrmUserTickets: {
      account?: object
      assigned_to?: number
      attachment_url?: string
      category?: string
      client_user?: number
      created?: string
      id?: number
      is_answered?: boolean
      last_message_created?: string
      messages?: object[]
      modified?: string
      priority?: object
      responded_by?: any
      response_attachment?: any
      response_time?: any
      state?: object
      subcategory?: string
      ticket_type?: any
      unique_ticket_id?: number
    }
    CrmPaginatedTicketCategories: {
      count?: number
      next?: string | null
      previous?: string | null
      results?: components["schemas"]["TicketCategory"][]
    }
    TicketCategory: {
      description?: string
      id?: number
      subcategories?: object
      title?: string
    }
  }
}
export interface operations {
  crm_paginated_user_tickets: {
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
          "application/json": components["schemas"]["CrmPaginatedUserTickets"]
        }
      }
    }
  }
  crm_paginated_ticket_categories: {
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
          "application/json": components["schemas"]["CrmPaginatedTicketCategories"]
        }
      }
    }
  }
}
