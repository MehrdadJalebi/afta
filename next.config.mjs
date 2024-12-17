import path from "path"

/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    emotion: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "176.65.243.37",
        port: "8080",
      },
    ],
  },
  sassOptions: {
    includePaths: [path.join(process.cwd(), "styles")],
    prependData: `@import "src/styles/bootstrap/_helpers.scss";`,
  },
  async redirects() {
    return [{ source: "/", destination: "/users", permanent: true }]
  },
}

export default nextConfig
