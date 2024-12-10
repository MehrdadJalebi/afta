const serverUrls = {
  development: {
    base_url: "http://localhost:3000",
    iris: "https://iris.najva.com",
    accounts: "https://accounts.yektanet.com",
    najva_accounts: "https://accounts.najva.com",
    segment: "https://segment.najva.com",
    crm: "https://crm.yektanet.com",
    financial: "https://financial.yektanet.com",
    afta: "http://176.65.243.37:8080",
  },
  staging: {
    base_url: "https://sms-panel-staging.najva.com",
    iris: "https://iris.najva.com",
    accounts: "https://accounts-staging.yektanet.com",
    najva_accounts: "https://accounts.najva.com",
    segment: "https://segment.najva.com",
    crm: "https://crm-staging.yektanet.com",
    financial: "https://financial-staging.yektanet.com",
    afta: "http://176.65.243.37:8080",
  },
  production: {
    base_url: "https://sms-panel.najva.com",
    iris: "https://iris.najva.com",
    accounts: "https://accounts.yektanet.com",
    najva_accounts: "https://accounts.najva.com",
    segment: "https://segment.najva.com",
    crm: "https://crm.yektanet.com",
    financial: "https://financial.yektanet.com",
    afta: "http://176.65.243.37:8080",
  },
} as const

type Env = "development" | "staging" | "production"

let selector = process.env.NODE_ENV as Env

if (process.env.ENV === "staging") {
  selector = "staging"
}

export default serverUrls[selector]
