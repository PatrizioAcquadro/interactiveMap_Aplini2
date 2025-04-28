// app/layout.tsx
import { Inter } from "next/font/google";
import { LanguageProvider } from "../context/LanguageContext";
import Header from "../components/Header";
import ErrorBoundary from "../components/ErrorBoundary";
import "./globals.css";
import type { Metadata, Viewport } from "next";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Adunata Map Biella 2025",
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
      <body className="h-full flex flex-col">
        <LanguageProvider>
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
