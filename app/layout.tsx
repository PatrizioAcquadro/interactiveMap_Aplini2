// app/layout.tsx
import { Inter } from "next/font/google";
import Script from "next/script";
import { LanguageProvider } from "../context/LanguageContext";
import Header from "../components/Header";
import ErrorBoundary from "../components/ErrorBoundary";
import { Toaster } from "sonner";

// --- IMPORT LEAFLET CSS HERE ---
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

import "./globals.css";
import type { Metadata, Viewport } from "next";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "AduNet - WebMap",
  description:
    "Mappa interattiva per l'Adunata Nazionale degli Alpini 2025 a Biella",
};

export const viewport: Viewport = {
  // Define viewport separately
  width: "device-width",
  initialScale: 1,
  maximumScale: 1, // Keep maximumScale: 1 to prevent user zoom
  userScalable: false, // Explicitly disable user scaling
  // themeColor: '#D0D4C8', // Optional: Set theme color to match brand
};
// *** END FIX ***

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="it"
      className={`${inter.variable} font-sans h-full bg-brand-white`}
    >
      <head>
        <Script
          id="iubenda-config"
          strategy="beforeInteractive" // Load very early, before hydration
          dangerouslySetInnerHTML={{
            __html: `
              var _iub = _iub || [];
              _iub.csConfiguration = {
                "siteId": 4012257,
                "cookiePolicyId": 94735600,
                "lang": "it", // Ensure this matches your default or is dynamic
                "storage": {"useSiteId":true}
                // Add any other specific configurations from Iubenda here
                // e.g., banner settings, TCF options if needed directly
              };
            `,
          }}
        />
        {/* 2. Autoblocking Script */}
        <Script
          id="iubenda-autoblocking"
          strategy="beforeInteractive" // Load early to enable blocking
          src="https://cs.iubenda.com/autoblocking/4012257.js"
        />
        {/* 3. TCF Stub (Transparency and Consent Framework) */}
        <Script
          id="iubenda-tcf-stub"
          strategy="beforeInteractive" // TCF needs to be ready early for AdSense
          src="//cdn.iubenda.com/cs/tcf/stub-v2.js"
        />
        {/* 4. Safe TCF Implementation */}
        <Script
          id="iubenda-safe-tcf"
          strategy="beforeInteractive" // Load early
          src="//cdn.iubenda.com/cs/tcf/safe-tcf-v2.js"
        />
        {/* 5. Main Iubenda Cookie Solution Script */}
        <Script
          id="iubenda-cs"
          strategy="beforeInteractive" // Load main logic early as well
          src="//cdn.iubenda.com/cs/iubenda_cs.js"
          // charset="UTF-8" // charset is usually default, next/script doesn't have prop
          // async // next/script handles async loading based on strategy
        />
        {/* +++ ADD IUBENDA POLICY LOADER SCRIPT (Loads iubenda.js) +++ */}
        <Script
          id="iubenda-policy-loader"
          strategy="afterInteractive" // Load after page is interactive
          src="https://cdn.iubenda.com/iubenda.js"
        />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8600182876678262"
          crossOrigin="anonymous"
          strategy="afterInteractive" // Load after the page is interactive
          // Optional: Add onError for debugging
          // onError={(e) => {
          //   console.error('AdSense Script failed to load', e)
          // }}
        />
      </head>
      <body className="h-full flex flex-col">
        <LanguageProvider>
          <Toaster position="top-right" richColors closeButton theme="system" />
          <Header />
          {/* Wrap main content area */}
          <ErrorBoundary>
            <div className="flex-grow">{children}</div>
          </ErrorBoundary>
        </LanguageProvider>
      </body>
    </html>
  );
}
