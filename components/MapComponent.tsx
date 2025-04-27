// components/MapComponent.tsx
"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  // Removed ZoomControl import from react-leaflet
} from "react-leaflet";
import L from "leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";

// --- Leaflet CSS and Icon Fix ---
import "leaflet/dist/leaflet.css";
// Explicitly set default icon options
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/images/marker-icon-2x.png",
  iconUrl: "/images/marker-icon.png",
  shadowUrl: "/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// --- Project Imports ---
import { poiData, POI, PoiType, getPoiIcon } from "../data/pois";
import LegendSlideout from "./LegendSlideout";
import LanguageSwitcher from "./LanguageSwitcher";
import PoiDetailModal from "./PoiDetailModal";
import SearchBar from "./SearchBar";
import CustomZoomControl from "./CustomZoomControl"; // Import the custom component
import {
  MapPinIcon as MapPinOutlineIcon,
  GlobeAltIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/outline";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { useLanguage } from "../context/LanguageContext";

/* ========================================================================== */
/*         Helper Components (Defined Outside Main Component)                 */
/* ========================================================================== */

// --- MapEvents ---
// Must be rendered inside MapContainer
const MapEvents = ({ targetPoi }: { targetPoi: POI | null }) => {
  const map = useMap();
  useEffect(() => {
    if (targetPoi) {
      map.flyTo(targetPoi.coordinates, 16, { animate: true, duration: 1 });
      const timer = setTimeout(() => {
        map.eachLayer((layer) => {
          if (
            layer instanceof L.Marker &&
            layer
              .getLatLng()
              .equals(L.latLng(targetPoi.coordinates as L.LatLngTuple), 1e-5)
          ) {
            layer.openPopup();
          }
        });
      }, 1100);
      return () => clearTimeout(timer);
    }
  }, [targetPoi, map]);
  return null;
};

// --- LocateControl ---
// Must be rendered inside MapContainer
const LocateControl = () => {
  const map = useMap();
  const { t } = useLanguage();
  const handleLocate = () =>
    map.locate({ setView: true, maxZoom: 16, enableHighAccuracy: true });

  useEffect(() => {
    let userMarker: L.Marker | null = null;

    const onLocationFound = (e: L.LocationEvent) => {
      if (userMarker) map.removeLayer(userMarker);

      // User Location Dot (Keep it blue for clarity/convention)
      const dotHtml = `<div class="h-3.5 w-3.5 bg-blue-500 rounded-full ring-2 ring-white shadow-lg animate-pulse"></div>`;

      userMarker = L.marker(e.latlng, {
        icon: L.divIcon({
          className: "user-location-marker", // Can add specific styles if needed
          html: dotHtml,
          iconSize: [14, 14], // Match dot size
          iconAnchor: [7, 7], // Center anchor
        }),
        // Make marker non-interactive if desired (popup is enough)
        // interactive: false,
      }).addTo(map);

      // *** ENHANCED POPUP ***
      const accuracy = e.accuracy.toFixed(0); // Get accuracy in meters
      const popupHtmlContent = `
              <div class="font-sans text-center p-1 -m-1">
                  <span class="block font-semibold text-sm text-brand-dark-green mb-0.5">
                      ${t("youAreHere")}
                  </span>
                  <span class="block text-xs text-gray-500">
                      ${t("accuracy")}: ~${accuracy} m
                  </span>
              </div>
          `;

      userMarker
        .bindPopup(popupHtmlContent, {
          closeButton: false, // Cleaner look without default close button
          offset: L.point(0, -10), // Adjust offset to sit nicely above dot
        })
        .openPopup();

      // Optional: Auto-close popup after a few seconds
      // setTimeout(() => {
      //     if (map && userMarker) {
      //         userMarker.closePopup();
      //     }
      // }, 4000); // Close after 4 seconds
    }; // End onLocationFound

    const onLocationError = (e: L.ErrorEvent) => {
      // Provide more user-friendly errors potentially
      let message = t("locationErrorGeneric");
      if (e.code === 1) {
        // PERMISSION_DENIED
        message = t("locationErrorPermission");
      } else if (e.code === 2) {
        // POSITION_UNAVAILABLE
        message = t("locationErrorUnavailable");
      } // else code 3: TIMEOUT
      alert(`${t("locationErrorPrefix")} ${message}`);
    };

    map.on("locationfound", onLocationFound);
    map.on("locationerror", onLocationError);
    return () => {
      map.off("locationfound", onLocationFound);
      map.off("locationerror", onLocationError);
      if (userMarker) map.removeLayer(userMarker);
    };
  }, [map, t]); // Add t as dependency

  return (
    // Positioning stays the same (absolute relative to MapComponent)
    <div className="absolute top-16 right-4 z-[1000] sm:top-4">
      <button
        onClick={handleLocate}
        className="p-3 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-200 ease-in-out"
        title={t("findMyLocation")}
        aria-label={t("findMyLocation")}
      >
        {/* *** CHANGE: Icon color to theme dark green *** */}
        <MapPinOutlineIcon className="h-6 w-6 text-brand-dark-green" />
      </button>
    </div>
  );
};

// --- CustomZoomControl Definition (Moved outside for clarity, still needs useMap) ---
// This helper component MUST be rendered inside MapContainer
const CustomZoomControlHelper: React.FC = () => {
  const map = useMap();
  const { t } = useLanguage();
  const handleZoomIn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    map.zoomIn();
  };
  const handleZoomOut = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    map.zoomOut();
  };
  const zoomInLabel = t("zoomIn");
  const zoomOutLabel = t("zoomOut");
  return (
    // Position absolutely relative to MapComponent container
    <div className="absolute bottom-4 right-4 z-[1000] flex flex-row space-x-2">
      <button
        onClick={handleZoomIn}
        className="p-3 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-all duration-200 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        aria-label={zoomInLabel}
        title={zoomInLabel}
      >
        <PlusIcon className="h-6 w-6 text-brand-dark-green" />{" "}
        {/* Ensure PlusIcon is imported */}
      </button>
      <button
        onClick={handleZoomOut}
        className="p-3 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-all duration-200 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        aria-label={zoomOutLabel}
        title={zoomOutLabel}
      >
        <MinusIcon className="h-6 w-6 text-brand-dark-green" />{" "}
        {/* Ensure MinusIcon is imported */}
      </button>
    </div>
  );
};
// Import PlusIcon and MinusIcon if not already done
import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";

/* ========================================================================== */
/*                            Main Map Component                            */
/* ========================================================================== */
const MapComponent: React.FC = () => {
  // --- State ---
  const { t, language } = useLanguage();
  const biellaCoords: L.LatLngExpression = [45.5667, 8.05];
  const initialZoom = 13;

  const allPoiTypes = useMemo(() => new Set(poiData.map((p) => p.type)), []);
  const [activeFilters, setActiveFilters] = useState<Set<PoiType>>(
    () => new Set(allPoiTypes)
  );
  const [isLegendOpen, setIsLegendOpen] = useState(false); // Legend open by default now
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [selectedPoi, setSelectedPoi] = useState<POI | null>(null);
  const [searchTargetPoi, setSearchTargetPoi] = useState<POI | null>(null);
  const [hoveredPoiId, setHoveredPoiId] = useState<number | null>(null);
  const [selectedPoiId, setSelectedPoiId] = useState<number | null>(null);
  const [hoveredLegendType, setHoveredLegendType] = useState<PoiType | null>(
    null
  );
  const [showPulse, setShowPulse] = useState(true);

  // --- Handlers ---
  const handleMarkerClick = useCallback((poi: POI) => {
    setSelectedPoi(poi);
    setSelectedPoiId(poi.id);
  }, []);
  const handleShowDetails = useCallback((poi: POI) => {
    setSelectedPoi(poi);
    setSelectedPoiId(poi.id);
  }, []);
  const handleCloseModal = useCallback(() => {
    setSelectedPoi(null);
    setSelectedPoiId(null);
  }, []);
  const handleFilterChange = useCallback((type: PoiType, isActive: boolean) => {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (isActive) next.add(type);
      else next.delete(type);
      return next;
    });
  }, []);
  const resetFilters = useCallback(() => {
    setActiveFilters(new Set(allPoiTypes));
  }, [allPoiTypes]);
  const handleSelectAllFilters = useCallback(() => {
    setActiveFilters(new Set(allPoiTypes));
  }, [allPoiTypes]);
  const handleDeselectAllFilters = useCallback(() => {
    setActiveFilters(new Set<PoiType>());
  }, []);
  const handleSearchResultSelect = useCallback((poi: POI) => {
    setSearchTargetPoi(poi);
    setTimeout(() => setSearchTargetPoi(null), 100);
  }, []);

  // --- Derived State ---
  const filteredPois = useMemo(
    () => poiData.filter((poi) => activeFilters.has(poi.type)),
    [activeFilters]
  );
  const showResetButton = useMemo(
    () => activeFilters.size !== allPoiTypes.size && activeFilters.size > 0,
    [activeFilters, allPoiTypes]
  );

  // --- Effects ---
  useEffect(() => {
    const timer = setTimeout(() => setShowPulse(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-full w-full relative z-10">
      {/* --- Fixed/Absolute UI Elements OUTSIDE MapContainer --- */}
      <SearchBar
        pois={poiData}
        onSearchResultSelect={handleSearchResultSelect}
      />
      <button
        onClick={() => setIsLangMenuOpen(true)}
        className={`absolute top-16 left-4 sm:top-4 z-20 p-3 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-all duration-200 ease-in-out hover:scale-105 ${
          showPulse ? "animate-pulse" : ""
        }`}
        aria-label={t("showLangMenu")}
        title={t("showLangMenu")}
      >
        <GlobeAltIcon className="h-6 w-6 text-brand-dark-green" />
      </button>
      {!isLegendOpen && (
        <button
          onClick={() => setIsLegendOpen(true)}
          className={`fixed bottom-4 left-4 z-20 p-3 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-all duration-200 ease-in-out hover:scale-105 ${
            showPulse ? "animate-pulse" : ""
          }`}
          aria-label={t("showLegend")}
          title={t("showLegend")}
        >
          <AdjustmentsHorizontalIcon className="h-6 w-6 text-brand-dark-green" />
        </button>
      )}
      {/* Note: CustomZoomControlHelper is rendered *inside* MapContainer now */}

      {/* --- The Map --- */}
      <MapContainer
        center={biellaCoords}
        zoom={initialZoom}
        scrollWheelZoom
        className="h-full w-full z-0"
        zoomControl={false}
      >
        {/* --- Map Layers --- */}
        <TileLayer
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          maxZoom={20}
        />
        {/* --- Map Controls & Event Handlers (INSIDE MapContainer) --- */}
        <LocateControl />
        <MapEvents targetPoi={searchTargetPoi} />
        <CustomZoomControlHelper />{" "}
        {/* *** Render CustomZoomControlHelper INSIDE *** */}
        {/* --- Map Data Layers --- */}
        <MarkerClusterGroup chunkedLoading>
          {filteredPois.map((poi) => {
            const isSelected = poi.id === selectedPoiId;
            const isHoveredMarker = poi.id === hoveredPoiId;
            const isHoveredLegend = poi.type === hoveredLegendType;
            const currentIcon = getPoiIcon(
              poi.type,
              isSelected || isHoveredMarker || isHoveredLegend
            );
            return (
              <Marker
                key={poi.id}
                position={poi.coordinates}
                icon={currentIcon}
                zIndexOffset={isHoveredMarker || isHoveredLegend ? 1000 : 0}
                eventHandlers={{
                  click: () => handleMarkerClick(poi),
                  mouseover: () => setHoveredPoiId(poi.id),
                  mouseout: () => setHoveredPoiId(null),
                }}
              >
                <Popup minWidth={200}>
                  <div className="font-sans text-sm">
                    <h4 className="font-semibold text-base mb-1 text-gray-800">
                      {language === "en" && poi.name_en
                        ? poi.name_en
                        : poi.name}
                    </h4>
                    <p className="text-gray-600 mb-2">
                      {language === "en" && poi.shortDescription_en
                        ? poi.shortDescription_en
                        : poi.shortDescription}
                    </p>
                    {poi.address && (
                      <p className="text-xs text-gray-500 mb-1">
                        {poi.address}
                      </p>
                    )}
                    <button
                      onClick={() => handleShowDetails(poi)}
                      className="text-blue-600 hover:text-blue-800 hover:underline text-sm font-medium transition-colors duration-150 ease-in-out mt-1 inline-flex items-center"
                    >
                      {t("moreDetails")}{" "}
                      <PaperAirplaneIcon className="h-4 w-4 ml-1 transform rotate-45" />
                    </button>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MarkerClusterGroup>
      </MapContainer>

      {/* --- Slideouts & Modals (OUTSIDE MapContainer) --- */}
      <LegendSlideout
        isOpen={isLegendOpen}
        setIsOpen={setIsLegendOpen}
        activeFilters={activeFilters}
        onFilterChange={handleFilterChange}
        allPois={poiData}
        resetFilters={resetFilters}
        showResetButton={showResetButton}
        onSelectAll={handleSelectAllFilters}
        onDeselectAll={handleDeselectAllFilters}
        setHoveredLegendType={setHoveredLegendType}
      />
      <LanguageSwitcher isOpen={isLangMenuOpen} setIsOpen={setIsLangMenuOpen} />
      <PoiDetailModal poi={selectedPoi} onClose={handleCloseModal} />
    </div>
  );
};

export default MapComponent;
