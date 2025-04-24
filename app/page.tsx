'use client'; // Required for dynamic import and hooks

import dynamic from 'next/dynamic';
import Head from 'next/head';
// Import the custom loader - IT NEEDS the LanguageProvider wrapping it in layout.tsx
import MapLoader from '../components/MapLoader';
import { useLanguage } from '../context/LanguageContext'; // To set initial head lang if needed


// Dynamically import the MapComponent with SSR turned off
const MapWithNoSSR = dynamic(() => import('../components/MapComponent'), {
  ssr: false,
  loading: () => <MapLoader />, // Use the custom loader component
});

export default function HomePage() {
  const { language } = useLanguage(); // Get current language for Head

  return (
    <>
      {/* Using Head from next/head is still okay in App Router client components for basic tags */}
      <Head>
        {/* Title is better handled by metadata in layout.tsx, but can override */}
        {/* <title>Adunata Alpini 2025 - Mappa Biella</title> */}
        {/* Description is better handled by metadata in layout.tsx */}
        {/* <meta name="description" content="Mappa interattiva per l'Adunata Nazionale degli Alpini 2025 a Biella" /> */}
        {/* Ensure html lang is updated if needed, though context does it */}
        <meta httpEquiv="Content-Language" content={language} />
      </Head>

      {/* Main container for the map. Ensure it takes up screen space */}
      <main className="h-screen w-screen overflow-hidden"> {/* Prevent potential scrollbars */}
        <MapWithNoSSR />
      </main>
    </>
  );
}