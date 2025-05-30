// components/MapComponent.tsx
"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  Polygon,
} from "react-leaflet";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";

import L from "leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";

// --- Leaflet CSS and Icon Fix ---
import "leaflet/dist/leaflet.css";
// Explicitly set default icon options
// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
import {
  poiData,
  POI,
  PoiType,
  generateIconWithType,
  legendItems,
  poiTypeStyles,
} from "../data/pois";
import IntroModal from "./IntroModal";
import LegendSlideout from "./LegendSlideout";
import LanguageSwitcher from "./LanguageSwitcher";
import PoiDetailModal from "./PoiDetailModal";
import SearchBar from "./SearchBar";
import {
  MapPinIcon as MapPinOutlineIcon,
  GlobeAltIcon,
  AdjustmentsHorizontalIcon,
  InformationCircleIcon,
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

const PopupCloser = ({ modalPoi }: { modalPoi: POI | null }) => {
  const map = useMap();
  useEffect(() => {
    // If the modalPoi becomes null (meaning modal just closed)
    // AND the map instance exists, close any open popups.
    if (modalPoi === null) {
      map.closePopup();
    }
    // Dependency array includes modalPoi to trigger when it changes
  }, [modalPoi, map]);

  return null; // This component doesn't render anything visually
};

const PopupStateHandler = ({
  setSelectedPoiId,
  setHoveredPoiId,
}: {
  setSelectedPoiId: React.Dispatch<React.SetStateAction<number | null>>;
  setHoveredPoiId: React.Dispatch<React.SetStateAction<number | null>>; // Add prop type
}) => {
  const map = useMap();

  useEffect(() => {
    const handlePopupOpen = (): void => {
      /* ... */
    };

    const handlePopupClose = (): void => {
      // When *any* popup closes, reset selection AND hover
      setSelectedPoiId(null);
      // *** Clear hover state on popup close ***
      setHoveredPoiId(null);
    };

    map.on("popupopen", handlePopupOpen);
    map.on("popupclose", handlePopupClose);

    return () => {
      map.off("popupopen", handlePopupOpen);
      map.off("popupclose", handlePopupClose);
    };
    // *** ADD setHoveredPoiId to dependency array ***
  }, [map, setSelectedPoiId, setHoveredPoiId]);

  return null;
};

/* ========================================================================== */
/*                            Main Map Component                            */
/* ========================================================================== */
const MapComponent: React.FC = () => {
  // --- State ---
  const { t, language } = useLanguage();
  const biellaCoords: L.LatLngExpression = [45.5667, 8.05];
  const initialZoom = 13;

  const restrictedAreaCoords: L.LatLngExpression[] = [
    [45.57059, 8.055551],
    [45.570862, 8.054496],
    [45.571, 8.053506],
    [45.570654, 8.052358],
    [45.570502, 8.051874],
    [45.56984, 8.050318],
    [45.568995, 8.048363],
    [45.568529, 8.048534],
    [45.568131, 8.048695],
    [45.567891, 8.049039],
    [45.567714, 8.049495],
    [45.567643, 8.050058],
    [45.567729, 8.0504],
    [45.566962, 8.050572],
    [45.566992, 8.04922],
    [45.56561, 8.049434],
    [45.565596, 8.049885],
    [45.563658, 8.049392],
    [45.562681, 8.049434],
    [45.561915, 8.049198],
    [45.560788, 8.048126],
    [45.560412, 8.04746],
    [45.557197, 8.048576],
    [45.559782, 8.056837],
    [45.5598337, 8.0569988],
    [45.5601813, 8.0581358],
    [45.560277, 8.058468],
    [45.561234, 8.061349],
    [45.563556, 8.059868],
    [45.565901, 8.058418],
    [45.57059, 8.055551],
  ];
  // Define the styling for the restricted area polygon
  const restrictedAreaOptions = {
    // Border style (optional, can set weight to 0 if no border)
    color: "#4d7c0f", // A darker green for the border
    weight: 1, // Thin border
    opacity: 0.4, // Semi-transparent border

    // Fill style
    fillColor: "#84CC16", // Lime green color (as used for 'activity' icon) - adjust if needed
    fillOpacity: 0.2, // Semi-transparent fill (adjust 0.1 to 0.4 for desired visibility)
  };

  // *** UPDATE: Initialize filters with ZTL included ***
  const allPoiTypesAndZTL = useMemo(
    () => new Set(legendItems.map((p) => p.type)),
    []
  ); // Use legendItems to include 'ztl' type
  const [activeFilters, setActiveFilters] = useState<Set<PoiType>>(
    () => new Set(allPoiTypesAndZTL)
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
  const [isIntroOpen, setIsIntroOpen] = useState(true);

  const poiIcons = useMemo(() => {
    // This block runs only once on mount or if dependencies change (empty array = only mount)
    console.log("Generating POI icons..."); // Log for debugging generation frequency
    const icons: Record<string, { standard: L.DivIcon; active: L.DivIcon }> =
      {};

    // Generate icons for each type defined in legendItems
    legendItems.forEach((item) => {
      if (!icons[item.type]) {
        // CALL the imported generation function here
        icons[item.type] = {
          standard: generateIconWithType(item.type, false),
          active: generateIconWithType(item.type, true),
        };
      }
    });

    // Ensure a default icon exists for robustness
    // It uses poiTypeStyles, make sure that's imported
    if (poiTypeStyles.default && !icons.default) {
      // Assuming 'default' might not be in PoiType, cast if needed, or add 'default' to PoiType
      const defaultType = "default" as PoiType;
      icons.default = {
        standard: generateIconWithType(defaultType, false),
        active: generateIconWithType(defaultType, true),
      };
    } else if (!icons.default) {
      // Fallback if poiTypeStyles.default doesn't exist - use a placeholder or first type
      console.warn("Default POI icon style not found, using fallback.");
      // Use a known type like 'bar' or the first item in legendItems as a fallback
      const fallbackType = legendItems[0]?.type || ("bar" as PoiType);
      icons.default = {
        standard: generateIconWithType(fallbackType, false),
        active: generateIconWithType(fallbackType, true),
      };
    }

    return icons;
  }, []);

  // --- Handlers ---
  const handleMarkerClick = useCallback((poi: POI) => {
    setSelectedPoiId(poi.id);
    setHoveredPoiId(null);
    setIsLegendOpen(false);
    setIsLangMenuOpen(false);
  }, []);
  const handleShowDetails = useCallback((poi: POI) => {
    setSelectedPoi(poi);
    setSelectedPoiId(poi.id);
    setIsLegendOpen(false);
    setIsLangMenuOpen(false);
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
    setActiveFilters(new Set(allPoiTypesAndZTL));
  }, [allPoiTypesAndZTL]);
  const handleSelectAllFilters = useCallback(() => {
    setActiveFilters(new Set(allPoiTypesAndZTL));
  }, [allPoiTypesAndZTL]);
  const handleDeselectAllFilters = useCallback(() => {
    setActiveFilters(new Set<PoiType>()); // Still deselects all
  }, []);
  const handleSearchResultSelect = useCallback((poi: POI) => {
    setSearchTargetPoi(poi);
    setTimeout(() => setSearchTargetPoi(null), 100);
  }, []);
  const handleCloseIntro = useCallback(() => {
    setIsIntroOpen(false);
    // Mark as shown for the session *after* it's closed
    if (typeof window !== "undefined") {
      sessionStorage.setItem("adunataMapIntroShown", "true");
    }
  }, []);

  // --- Derived State ---
  const filteredPois = useMemo(
    () => poiData.filter((poi) => activeFilters.has(poi.type)),
    [activeFilters]
  );
  const showResetButton = useMemo(
    () =>
      activeFilters.size !== allPoiTypesAndZTL.size && activeFilters.size > 0,
    [activeFilters, allPoiTypesAndZTL]
  );
  // *** ADD: Check if ZTL should be visible ***
  const showZTL = useMemo(() => activeFilters.has("ztl"), [activeFilters]);

  // --- Effects ---
  useEffect(() => {
    const timer = setTimeout(() => setShowPulse(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const introShown = sessionStorage.getItem("adunataMapIntroShown");
      if (!introShown) {
        // Show intro after a very short delay to allow map to render initially
        const timer = setTimeout(() => {
          setIsIntroOpen(true);
        }, 500); // 0.5 second delay
        return () => clearTimeout(timer);
      }
    }
  }, []); // Empty dependency array ensures this runs only once on mount

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

      {/* *** ADD Guide Trigger Button *** */}
      <button
        onClick={() => setIsIntroOpen(true)}
        className={`absolute top-16 right-[72px] sm:top-4 sm:right-[72px] z-20 p-3 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-all duration-200 ease-in-out hover:scale-105 ${
          showPulse ? "animate-pulse" : ""
        }`}
        aria-label={t("show_guide_button")}
        title={t("show_guide_button")}
      >
        <InformationCircleIcon className="h-6 w-6 text-brand-dark-green" />
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
        {/* *** Polygon Layer for Restricted Area *** */}
        {showZTL && (
          <Polygon
            pathOptions={restrictedAreaOptions} // Keep options defined above
            positions={restrictedAreaCoords} // Keep coords defined above
            interactive={false}
          />
        )}
        {/* --- Map Controls & Event Handlers (INSIDE MapContainer) --- */}
        <LocateControl />
        <MapEvents targetPoi={searchTargetPoi} />
        <CustomZoomControlHelper />
        <PopupCloser modalPoi={selectedPoi} />
        <PopupStateHandler
          setSelectedPoiId={setSelectedPoiId}
          setHoveredPoiId={setHoveredPoiId} // Pass the setter function
        />
        {/* *** Render CustomZoomControlHelper INSIDE *** */}
        {/* --- Map Data Layers --- */}
        <MarkerClusterGroup chunkedLoading>
          {filteredPois.map((poi) => {
            const isSelected = poi.id === selectedPoiId;
            const isHoveredMarker = poi.id === hoveredPoiId;
            const isHoveredLegend = poi.type === hoveredLegendType;
            // 1. Look up the icon set (standard/active) from the pre-generated object
            const iconSet = poiIcons[poi.type] || poiIcons.default; // Fallback to default

            // 2. Handle potential error if icon set is missing (shouldn't happen with fallback)
            if (!iconSet) {
              console.warn(
                `Icon set not found for POI type: ${poi.type}, ID: ${poi.id}`
              );
              return null; // Don't render marker if icon is missing
            }

            // 3. Choose between the standard or active icon from the set
            const currentIcon =
              isSelected || isHoveredMarker || isHoveredLegend
                ? iconSet.active
                : iconSet.standard;

            // Get POI name based on current language (keep this if you have it)
            const poiName =
              language === "en" && poi.name_en ? poi.name_en : poi.name;

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
                alt={poiName}
                title={poiName}
              >
                <Popup minWidth={200}>
                  <div className="font-sans text-sm">
                    <h4 className="font-semibold text-base mb-1 text-gray-800">
                      {language === "en" && poi.name_en
                        ? poi.name_en
                        : poi.name}
                      {poiName}
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
      <IntroModal isOpen={isIntroOpen} onClose={handleCloseIntro} />
    </div>
  );
};

export default MapComponent;
