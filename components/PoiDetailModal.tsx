// components/PoiDetailModal.tsx
import React from "react";
import Image from "next/image";
import L from "leaflet";
import { POI } from "../data/pois";
import {
  XMarkIcon,
  MapPinIcon,
  PhoneIcon,
  LinkIcon,
  ClockIcon,
  TagIcon,
  SparklesIcon,
  MusicalNoteIcon, // Added
  // Choose one for directions:
  MapIcon as DirectionsMapIcon, // Option 1: Map icon
  ArrowTopRightOnSquareIcon, // Option 2: External link icon
} from "@heroicons/react/24/outline";
import { useLanguage } from "../context/LanguageContext"; // Corrected path assumption

interface PoiDetailModalProps {
  poi: POI | null;
  onClose: () => void;
}

// *** FIX: Define getMapLink helper function OUTSIDE the component ***
const getMapLink = (poi: POI): string => {
  if (!poi || !poi.coordinates) return "#"; // Return '#' or handle error if no coordinates

  // Convert coordinates to a consistent L.LatLng object
  const latLng = L.latLng(poi.coordinates);
  const lat = latLng.lat; // Access latitude via .lat
  const lng = latLng.lng; // Access longitude via .lng

  const encodedName = encodeURIComponent(poi.name);
  const isIOS =
    typeof window !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);

  if (isIOS) {
    // Try opening in Google Maps via URL first (often redirects to Apple Maps if installed)
    // Or use the specific Apple Maps URL scheme (less reliable across all iOS versions/settings)
    return `https://maps.google.com/maps?daddr=${lat},${lng}&ll=`;
    // return `maps://?q=${encodedName}&ll=${lat},${lng}`;
  } else {
    // Google Maps URL for others
    // Using query is generally more reliable than Place ID unless you have the specific Place ID
    return `https://www.google.com/maps/search/?api=1&query=${lat}%2C${lng}`;
    // Alternative: return `https://www.google.com/maps/search/?api=1&query=${encodedName}`;
  }
};

const PoiDetailModal: React.FC<PoiDetailModalProps> = ({ poi, onClose }) => {
  const { t, language } = useLanguage();

  if (!poi) return null; // Early return if no POI

  const getText = (
    itText: string | undefined,
    enText: string | undefined
  ): string | undefined => {
    return language === "en" && enText ? enText : itText;
  };

  // *** Construct map link by CALLING the helper function ***
  const mapLink = getMapLink(poi); // Call the function defined above

  // Now the return statement is valid
  return (
    <div
      className="fixed inset-0 bg-black/60 flex justify-center items-start z-[1200] p-4 pt-20 sm:pt-24 backdrop-blur-sm transition-opacity duration-300 ease-in-out overflow-y-auto" // Added overflow-y-auto here too
      onClick={onClose}
    >
      {/* *** CHANGE: Adjust max-height on panel *** */}
      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-lg relative max-h-[calc(100vh-8rem)] sm:max-h-[calc(100vh-10rem)] flex flex-col animate-fade-scale-in my-auto" // Use calc() for dynamic max-h, my-auto helps re-center if content is short
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image Header */}
        <div className="relative h-40 w-full flex-shrink-0 rounded-t-xl overflow-hidden bg-gray-200">
          {poi.images && poi.images.length > 0 ? (
            <Image
              src={poi.images[0]}
              alt={getText(poi.name, poi.name_en) || "POI Image"}
              layout="fill"
              objectFit="cover"
              priority={true}
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-gray-400">
              {" "}
              {/* Placeholder */}{" "}
            </div>
          )}
          {/* Close Button on Image */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-white bg-black/40 p-1.5 rounded-full hover:bg-black/60 transition-colors duration-150 ease-in-out z-10"
            aria-label={t("closeButton")}
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
        {/* Scrollable Content Area */}
        <div className="p-5 md:p-6 overflow-y-auto flex-grow">
          {/* Title */}
          <h2 className="text-xl md:text-2xl font-semibold mb-3 text-gray-900 pr-8">
            {getText(poi.name, poi.name_en)}
          </h2>

          {/* Main Description */}
          <p className="text-base text-gray-700 mb-4">
            {getText(poi.details, poi.details_en) ||
              getText(poi.shortDescription, poi.shortDescription_en)}
          </p>

          {/* Information Grid */}
          <div className="space-y-3 text-sm mb-4">
            {/* Address, Phone, Website, Opening Hours, Discount */}
            {poi.address && (
              <div className="flex items-start">
                {" "}
                <MapPinIcon className="h-5 w-5 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />{" "}
                <span className="text-gray-600">{poi.address}</span>{" "}
              </div>
            )}
            {poi.phone && (
              <div className="flex items-center">
                {" "}
                <PhoneIcon className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0" />{" "}
                <a
                  href={`tel:${poi.phone}`}
                  className="text-blue-600 hover:underline"
                >
                  {poi.phone}
                </a>{" "}
              </div>
            )}
            {poi.website && (
              <div className="flex items-center">
                {" "}
                <LinkIcon className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0" />{" "}
                <a
                  href={poi.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline truncate"
                >
                  {poi.website}
                </a>{" "}
              </div>
            )}
            {poi.openingHours && (
              <div className="flex items-start">
                {" "}
                <ClockIcon className="h-5 w-5 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />{" "}
                <div>
                  {" "}
                  <span className="font-medium text-gray-700">
                    {t("openingHoursLabel")}:
                  </span>{" "}
                  <p className="text-gray-600 whitespace-pre-line">
                    {getText(poi.openingHours, poi.openingHours_en)}
                  </p>{" "}
                </div>{" "}
              </div>
            )}
            {poi.discountInfo && (
              <div className="flex items-start text-green-700">
                {" "}
                <SparklesIcon className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />{" "}
                <span className="font-medium">
                  {getText(poi.discountInfo, poi.discountInfo_en)}
                </span>{" "}
              </div>
            )}

            {/* Party Info Section */}
            {(poi.partyInfo || poi.partyHours) && (
              <div className="flex items-start text-purple-700">
                <MusicalNoteIcon className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-medium">{t("partyInfoLabel")}:</span>
                  {poi.partyInfo && (
                    <p className="text-gray-600">
                      {getText(poi.partyInfo, poi.partyInfo_en)}
                    </p>
                  )}
                  {poi.partyHours && (
                    <p className="text-xs text-gray-500">
                      {t("partyHoursLabel")}:{" "}
                      {getText(poi.partyHours, poi.partyHours_en)}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Tags */}
          {poi.tags && poi.tags.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2 items-center">
              <TagIcon className="h-5 w-5 text-gray-400 mr-1" />
              {poi.tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>{" "}
        {/* End Scrollable Content Area */}
        {/* Footer Action Area */}
        <div className="p-4 bg-gray-50 rounded-b-xl border-t flex flex-col sm:flex-row justify-between items-center gap-3">
          {/* Directions Button */}
          <a
            href={mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-150 ease-in-out"
          >
            <DirectionsMapIcon className="h-5 w-5 mr-2" />
            {t("getDirections")}
          </a>
          {/* Ad Placeholder */}
          <div className="w-full sm:w-auto h-12 bg-gray-200 flex items-center justify-center text-xs text-gray-500 rounded">
            {" "}
            Ad Banner Placeholder{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoiDetailModal;
