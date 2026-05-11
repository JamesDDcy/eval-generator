import type { NextConfig } from "next"

const isProd = process.env.NODE_ENV === "production"

// Next.js App Router emits inline <script> tags for streaming hydration.
// 'unsafe-inline' is required UNLESS you implement nonce-based CSP via
// middleware (see: https://nextjs.org/docs/app/guides/content-security-policy).
// PDF preview iframe uses blob: URIs.
const SCRIPT_SRC = "'self' 'unsafe-inline' 'unsafe-eval'"
const STYLE_SRC = "'self' 'unsafe-inline' https://fonts.googleapis.com"

const cspHeader = [
  "default-src 'self'",
  `script-src ${SCRIPT_SRC}`,
  `style-src ${STYLE_SRC}`,
  "font-src 'self' https://fonts.gstatic.com data:",
  "img-src 'self' data: blob:",
  "connect-src 'self' https://api.airtable.com",
  "frame-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
].join("; ")

const nextConfig: NextConfig = {
  experimental: {
    turbopackUseSystemTlsCerts: true,
  },
  turbopack: {
    root: __dirname,
  },
  async headers() {
    if (!isProd) return []
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: cspHeader },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ]
  },
}

export default nextConfig
