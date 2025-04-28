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

export default nextConfig;
