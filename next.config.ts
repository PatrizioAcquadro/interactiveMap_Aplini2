import { withSentryConfig } from "@sentry/nextjs";
// /next.config.ts

import type { NextConfig } from "next";

// Determine if the environment is development
const isDevelopment = process.env.NODE_ENV === "development";

// --- Define Security Headers ---
const securityHeaders = () => {
  const headers = [
    // Prevent MIME-sniffing
    { key: "X-Content-Type-Options", value: "nosniff" },
    // Control referrer information
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    // Control browser features access
    {
      key: "Permissions-Policy",
      value: "camera=(), microphone=(), geolocation=(self), payment=()",
    },
  ];

  // --- Content Security Policy (CSP) Directives ---
  // Start with base directives suitable for production
  const cspDirectives = [
    `default-src 'self'`, // Default fallback: allow only own origin
    `script-src 'self' 'unsafe-inline'`, // Base: allow own origin + inline scripts (often needed)
    `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com`, // Allow own origin, inline styles, Google Fonts CSS
    `img-src 'self' data: blob: https://*.basemaps.cartocdn.com`, // Allow own origin, data URIs, blobs, CARTO tiles
    `font-src 'self' https://fonts.gstatic.com`, // Allow own origin, Google Fonts files
    `connect-src 'self'`, // Allow XHR/fetch to own origin
    `frame-src 'self'`, // Allow framing only by own origin (production)
    `object-src 'none'`, // Disallow plugins (<object>, <embed>)
    `base-uri 'self'`, // Restrict <base> tag
    `form-action 'self'`, // Restrict form submissions
    `frame-ancestors 'self'`, // Allow embedding only by own origin (production)
    // `upgrade-insecure-requests` // Optional: Uncomment if site is fully HTTPS
  ];

  // --- Google AdSense Domains ---
  // Define these once for clarity
  const adsenseScriptDomains = `https://pagead2.googlesyndication.com https://*.googletagservices.com`;
  const adsenseFrameDomains = `https://*.google.com https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://pagead2.googlesyndication.com`;
  const adsenseConnectDomains = `https://*.googlesyndication.com https://*.google.com https://googleads.g.doubleclick.net`;
  const adsenseImageDomains = `https://*.googlesyndication.com https://*.google.com`;
  const adsenseStyleDomains = `https://pagead2.googlesyndication.com`;
  // --- End AdSense Domains ---

  // --- Environment-Specific Adjustments ---
  if (isDevelopment) {
    console.log("Applying DEVELOPMENT Security Headers (for CodeSandbox etc.)");
    // Development / CodeSandbox: Loosen restrictions for preview/tools
    headers.push({ key: "X-Frame-Options", value: "ALLOWALL" }); // Allow framing by anyone (e.g., CodeSandbox)

    // Add allowances needed for dev tools and CodeSandbox live preview
    cspDirectives[1] += ` 'unsafe-eval' https://codesandbox.io`; // script-src: Allow eval, CSB scripts
    cspDirectives[5] += ` wss://*.codesandbox.io`; // connect-src: Allow CSB websockets
    cspDirectives[6] = `frame-src 'self' https://codesandbox.io`; // frame-src: Allow CSB to frame
    cspDirectives[10] = `frame-ancestors 'self' https://codesandbox.io`; // frame-ancestors: Allow CSB to embed
  } else {
    console.log("Applying PRODUCTION Security Headers");
    // Production (Vercel): Apply stricter rules
    headers.push({ key: "X-Frame-Options", value: "SAMEORIGIN" }); // Stricter framing rule

    // --- ADD ADSENSE DOMAINS TO PRODUCTION CSP ---
    cspDirectives[1] += ` ${adsenseScriptDomains}`; // Add to script-src
    cspDirectives[2] += ` ${adsenseStyleDomains}`; // Add to style-src
    cspDirectives[3] += ` ${adsenseImageDomains}`; // Add to img-src
    cspDirectives[5] += ` ${adsenseConnectDomains}`; // Add to connect-src
    cspDirectives[6] += ` ${adsenseFrameDomains}`; // Add to frame-src (Important for ad iframes)
    // Note: frame-ancestors remains 'self' - you don't want others framing your site with ads usually.
    // --- END ADSENSE DOMAIN ADDITIONS ---

    // Optional: Add Strict-Transport-Security (HSTS) for Production
    // ==> IMPORTANT: ONLY enable if HTTPS is enforced correctly everywhere! Test thoroughly.
    // headers.push({
    //   key: 'Strict-Transport-Security',
    //   // Start with short max-age for testing, then increase (e.g., 63072000 for 2 years)
    //   // value: 'max-age=60; includeSubDomains; preload' // Test value
    //   value: 'max-age=63072000; includeSubDomains; preload' // Production value (if ready)
    // });
  }

  // Add the combined CSP header
  headers.push({
    key: "Content-Security-Policy",
    value: cspDirectives.join("; ").trim(),
  });

  return headers;
};

// --- Next.js Configuration Object ---
const nextConfig: NextConfig = {
  reactStrictMode: true, // Recommended for identifying potential problems
  // swcMinify: true, // Optional: Use SWC for faster minification

  // Function to apply the dynamic security headers
  async headers() {
    return [
      {
        // Apply headers to all routes
        source: "/:path*",
        headers: securityHeaders(), // Call the function to get headers
      },
    ];
  },

  // Add any other Next.js specific configurations you might need below
  // For example:
  // images: {
  //   domains: ['example.com'], // If using external images with next/image
  // },
  // env: {
  //   MY_ENV_VAR: process.env.MY_ENV_VAR, // Exposing environment variables
  // },
};

// Add bundle analyzer configuration
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true", // Only run analysis if ANALYZE=true
});

// Export the wrapped config instead of the original nextConfig
export default withSentryConfig(withBundleAnalyzer(nextConfig), {
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options

  org: "biellainfesta",
  project: "javascript-nextjs",

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  // tunnelRoute: "/monitoring",

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true,
});
