// components/CustomZoomControl.tsx
"use client"; // Needed for useMap hook

import React from "react";
import { useMap } from "react-leaflet";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline"; // Using outline for consistency
import { useLanguage } from "../context/LanguageContext"; // Import useLanguage for tooltips

const CustomZoomControl: React.FC = () => {
  const map = useMap();
  const { t } = useLanguage(); // Get translation function

  const handleZoomIn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Prevent click from propagating to map
    map.zoomIn();
  };

  const handleZoomOut = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Prevent click from propagating to map
    map.zoomOut();
  };

  // Tooltip translations (add these keys to your en.json/it.json)
  const zoomInLabel = t("zoomIn");
  const zoomOutLabel = t("zoomOut");

  return (
    // Position the container bottom-right, above attribution/legend trigger
    // Adjust 'bottom-20' or 'bottom-24' as needed visually
    <div className="absolute bottom-20 right-4 z-20 flex flex-col space-y-2">
      {/* Zoom In Button */}
      <button
        onClick={handleZoomIn}
        className="p-3 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-all duration-200 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        aria-label={zoomInLabel}
        title={zoomInLabel} // Use translated title
      >
        <PlusIcon className="h-6 w-6 text-brand-dark-green" />
      </button>

      {/* Zoom Out Button */}
      <button
        onClick={handleZoomOut}
        className="p-3 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-all duration-200 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        aria-label={zoomOutLabel}
        title={zoomOutLabel} // Use translated title
      >
        <MinusIcon className="h-6 w-6 text-brand-dark-green" />
      </button>
    </div>
  );
};

export default CustomZoomControl;
