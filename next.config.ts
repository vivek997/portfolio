import type { NextConfig } from "next";

// NOTE on CSP: a nonce-based `script-src` is stricter, but it forces every
// page to render dynamically per-request (no static generation/edge caching),
// which isn't worth it for a static portfolio with zero user-generated
// content and no `dangerouslySetInnerHTML`/`eval` anywhere in the codebase.
// `unsafe-inline` is required for Next.js's own hydration scripts/styles when
// staying fully static. Everything else below is locked down.
const isDev = process.env.NODE_ENV !== "production";

const csp = [
  "default-src 'self'",
  // 'unsafe-eval' is only needed in dev (React's debug tooling uses eval());
  // production never includes it.
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
