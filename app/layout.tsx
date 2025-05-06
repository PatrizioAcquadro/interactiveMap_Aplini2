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
          id="iubenda-unified-widget" // New unique ID
          strategy="beforeInteractive" // STILL load early for blocking/consent
          src="//embeds.iubenda.com/widgets/2ffb952f-b9d2-4fa4-b21a-3e90fbf297d4.js"
          // Note: async/charset are handled by strategy
        />

        {/* +++ KEEP IUBENDA POLICY LOADER SCRIPT (If using policy modals) +++ */}
        <Script
          id="iubenda-policy-loader"
          strategy="afterInteractive"
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
