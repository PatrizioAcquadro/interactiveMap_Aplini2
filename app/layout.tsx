// app/layout.tsx
import { Inter } from "next/font/google";
import { LanguageProvider } from "../context/LanguageContext";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata = {
  title: "Adunata Map Biella 2025",
  description:
    "Mappa interattiva per l'Adunata Nazionale degli Alpini 2025 a Biella",
  viewport:
    "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it" className={`${inter.variable} font-sans h-full`}>
      {/* Add h-full and a background color to the body */}
      <body className="h-full bg-gray-100">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
