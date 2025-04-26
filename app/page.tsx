// app/page.tsx
"use client";
import dynamic from "next/dynamic";
import Head from "next/head";
import MapLoader from "../components/MapLoader";
import { useLanguage } from "../context/LanguageContext";
import Image from "next/image"; // Import Image for the logo

const MapWithNoSSR = dynamic(() => import("../components/MapComponent"), {
  ssr: false,
  loading: () => <MapLoader />,
});

export default function HomePage() {
  const { language, t } = useLanguage(); // Get t for potential header translations

  return (
    <>
      <Head>
        {/* Keep relevant meta tags if needed, but layout handles title/desc */}
        <meta httpEquiv="Content-Language" content={language} />
      </Head>

      {/* Main container simulating the window/app frame */}
      <div className="flex items-center justify-center h-screen p-4 md:p-8 bg-gray-100">
        <main
          className="flex flex-col h-full w-full max-w-7xl bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200"
          // Adjust max-w- as needed, maybe h-[90vh] max-h-[800px] etc.
        >
          {/* Header Section */}
          <header className="flex items-center justify-between px-4 py-2 border-b border-gray-200 flex-shrink-0">
            {/* Left side: Window Controls (decorative) */}
            <div className="flex space-x-1.5">
              <span className="block h-3 w-3 bg-red-500 rounded-full"></span>
              <span className="block h-3 w-3 bg-yellow-500 rounded-full"></span>
              <span className="block h-3 w-3 bg-green-500 rounded-full"></span>
            </div>

            {/* Center: Title (Optional: Use logo instead/as well) */}
            <div className="flex items-center space-x-2">
              {/* <Image src="/logo-biellainfesta.svg" alt="Logo" width={24} height={24} className="h-6 w-auto" /> */}
              <h1 className="text-sm font-semibold text-gray-700 truncate">
                Adunata Nazionale Alpini - Biella 2025
              </h1>
            </div>

            {/* Right side: Placeholder Nav */}
            <div className="flex space-x-4">
              {/* Add actual links later if needed */}
              <span className="text-sm font-medium text-gray-500 cursor-pointer hover:text-gray-800">
                Home
              </span>
              <span className="text-sm font-medium text-gray-500 cursor-pointer hover:text-gray-800">
                Info
              </span>
            </div>
          </header>

          {/* Map Content Area */}
          <div className="flex-grow relative bg-gray-200">
            {/* The MapComponent will fill this div */}
            <MapWithNoSSR />
          </div>
        </main>
      </div>
    </>
  );
}
