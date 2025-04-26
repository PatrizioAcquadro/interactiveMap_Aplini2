// app/layout.tsx
import { Inter } from "next/font/google";
import { LanguageProvider } from "../context/LanguageContext";
import Header from "../components/Header";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata = {
  title: "Mappa Adunata Alpini - Biella 2025",
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
    <html
      lang="it"
      className={`${inter.variable} font-sans h-full bg-brand-white`}
    >
      {/* Apply h-full to body and use flex column layout */}
      <body className="h-full flex flex-col">
        <LanguageProvider>
          <Header /> {/* Add the Header component here */}
          {/* Make the main content area grow to fill remaining space */}
          <div className="flex-grow">
            {children} {/* Page content will go here */}
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
