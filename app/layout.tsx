import { Inter } from 'next/font/google';
import { LanguageProvider } from '../context/LanguageContext'; // Import Language Provider
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter', // Define CSS variable
});

// Metadata can be generated dynamically later if needed
export const metadata = {
  title: 'Adunata Map Biella 2025',
  description: 'Mappa interattiva per l\'Adunata Nazionale degli Alpini 2025 a Biella',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' // Prevent zoom for web-app feel
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Apply font variable and base font-sans class to html tag
    // The language is set dynamically by the LanguageProvider context
    <html lang="it" className={`${inter.variable} font-sans`}>
      <body>
        {/* Wrap the entire application with the LanguageProvider */}
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}