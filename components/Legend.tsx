// components/Legend.tsx
import React, { useMemo } from "react";
import Image from "next/image";
import { legendItems, PoiType, POI } from "../data/pois";
import {
  CheckIcon,
  MapIcon as MapOutlineIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useLanguage } from "../context/LanguageContext";

interface LegendProps {
  activeFilters: Set<PoiType>;
  onFilterChange: (type: PoiType, isActive: boolean) => void;
  isLegendOpen: boolean;
  onToggleVisibility: () => void;
  allPois: POI[];
}

const Legend: React.FC<LegendProps> = ({
  activeFilters,
  onFilterChange,
  isLegendOpen,
  onToggleVisibility,
  allPois,
}) => {
  const { t, language, setLanguage } = useLanguage();

  // Calculate POI counts
  const poiCounts = useMemo(() => {
    const counts: { [key in PoiType]?: number } = {};
    legendItems.forEach((item) => (counts[item.type] = 0));
    allPois.forEach((poi) => {
      if (counts[poi.type] !== undefined) {
        counts[poi.type]!++;
      }
    });
    return counts;
  }, [allPois]);

  // Language toggle function
  const toggleLang = () => setLanguage(language === "it" ? "en" : "it");

  // If the legend is NOT open, render only the toggle button
  if (!isLegendOpen) {
    return (
      <button
        onClick={onToggleVisibility}
        // *** CHANGE: Changed 'fixed' to 'absolute' ***
        className="absolute bottom-4 left-4 z-[1000] p-3 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-200 ease-in-out"
        aria-label={t("showLegend")}
      >
        <MapOutlineIcon className="h-6 w-6 text-gray-700" />
      </button>
    );
  }

  // If the legend IS open, render the full panel
  return (
    <div
      // *** CHANGE: Changed 'fixed' to 'absolute' ***
      className="absolute bottom-4 left-4 z-[1000] bg-white/95 backdrop-blur-sm p-4 rounded-lg shadow-xl max-w-xs w-full transition-all duration-300 ease-in-out"
    >
      {/* Close Button (X) inside the open panel */}
      <button
        onClick={onToggleVisibility}
        className="absolute -top-3 -right-3 bg-white p-1 rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200 ease-in-out z-10"
        aria-label={t("hideLegend")}
      >
        <XMarkIcon className="h-5 w-5 text-gray-600" />
      </button>

      {/* Language Toggle Button */}
      {/* *** CHANGE: Adjusted right position slightly *** */}
      <button
        onClick={toggleLang}
        className="absolute top-2 right-8 text-xs p-1 bg-gray-100 rounded hover:bg-gray-200 transition-colors duration-150"
      >
        {language === "it" ? "EN" : "IT"}
      </button>

      {/* Legend Title */}
      {/* *** CHANGE: Added more padding-right *** */}
      <h3 className="text-base font-semibold mb-3 text-gray-800 border-b pb-2 pr-10">
        {t("legendTitle")}
      </h3>

      {/* Scrollable List of Filters */}
      <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
        {legendItems.map((item) => {
          const isActive = activeFilters.has(item.type);
          const count = poiCounts[item.type] || 0;

          // Get language-specific label (basic example)
          let labelText = item.label;
          // This basic replacement logic might need improvement for robustness
          // Consider using translation keys directly if labels become complex
          if (language === "en") {
            switch (item.type) {
              case "camper":
                labelText = t("poiCategory_camper");
                break;
              case "taxi":
                labelText = t("poiCategory_taxi");
                break;
              case "restaurant":
                labelText = t("poiCategory_restaurant");
                break;
              case "bar":
                labelText = t("poiCategory_bar");
                break;
              case "hotel":
                labelText = t("poiCategory_hotel");
                break;
              case "private_accommodation":
                labelText = t("poiCategory_private_accommodation");
                break;
              case "clothing":
                labelText = t("poiCategory_clothing");
                break;
              default:
                labelText = item.label; // Fallback
            }
          } else {
            // Use original Italian labels from pois.ts
            labelText = item.label;
          }

          return (
            <div
              key={item.type}
              className={`flex items-center justify-between transition-opacity duration-200 ease-in-out ${
                !isActive ? "opacity-50 hover:opacity-75" : "opacity-100"
              }`}
            >
              {/* Icon, Label, and Count */}
              <div className="flex items-center space-x-2 flex-grow mr-2 cursor-default">
                <Image
                  src={item.iconUrl}
                  alt={labelText} // Use labelText for alt
                  width={20}
                  height={20}
                  className="flex-shrink-0"
                />
                <span className="text-sm text-gray-700 flex-grow">
                  {labelText}
                  <span className="text-xs text-gray-500"> ({count})</span>
                </span>
              </div>

              {/* Filter Toggle Checkbox Button */}
              <button
                onClick={() => onFilterChange(item.type, !isActive)}
                className={`p-1 rounded-full transition-colors duration-150 ease-in-out flex-shrink-0 ${
                  isActive
                    ? "bg-blue-500 hover:bg-blue-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-500"
                }`}
              >
                <CheckIcon
                  className={`h-4 w-4 transition-opacity duration-150 ease-in-out ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Legend;
