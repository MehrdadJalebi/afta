const serverUrls = {
  development: {
    base_url: "http://localhost:3000",
    emzano: "http://176.65.243.37:8080",
  },
  production: {
    base_url: "https://emzano-panel.com",
    emzano: "http://176.65.243.37:8080",
  },
} as const

type Env = "development" | "production"

let selector = process.env.NODE_ENV as Env

export default serverUrls[selector]
