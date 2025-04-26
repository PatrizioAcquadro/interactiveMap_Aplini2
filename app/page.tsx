// app/page.tsx
"use client";
import dynamic from "next/dynamic";
import Head from "next/head";
import MapLoader from "../components/MapLoader";
import { useLanguage } from "../context/LanguageContext";

// Dynamically import the MapComponent with SSR turned off
const MapWithNoSSR = dynamic(() => import("../components/MapComponent"), {
  ssr: false,
  // Use a loader specific to map loading, or keep the general one
  loading: () => <MapLoader />,
});

export default function HomePage() {
  const { language } = useLanguage(); // Get language if needed for Head

  return (
    <>
      <Head>
        {/* Title/Desc are in layout.tsx metadata */}
        <meta httpEquiv="Content-Language" content={language} />
        {/* Add other specific meta tags for this page if needed */}
      </Head>
      {/* The MapComponent will fill the 'flex-grow' div from layout.tsx */}
      {/* Ensure MapComponent's root element has h-full */}
      <div className="h-full w-full">
        {" "}
        {/* This div takes full height of parent */}
        <MapWithNoSSR />
      </div>
    </>
  );
}
