"use client"; // Needed for hooks and Leaflet interaction

import React, { useState, useEffect, useCallback, useMemo } from "react"; // Added useMemo import just in case, though not strictly needed here now
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  ZoomControl,
} from "react-leaflet";
import L from "leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { poiData, POI, PoiType, getPoiIcon, legendItems } from "../data/pois";
import Legend from "./Legend";
import PoiDetailModal from "./PoiDetailModal";
import SearchBar from "./SearchBar";
import { MapPinIcon as MapPinOutlineIcon } from "@heroicons/react/24/outline"; // *** CHANGE: Import Outline version ***
import { PaperAirplaneIcon } from "@heroicons/react/24/solid"; // Keep solid for popup button if desired
import { useLanguage } from "../context/LanguageContext";

/* ------------------------------------------------------------------ */
/* Leaflet icon path fix                                              */
/* ------------------------------------------------------------------ */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/leaflet/marker-icon-2x.png",
  iconUrl: "/leaflet/marker-icon.png",
  shadowUrl: "/leaflet/marker-shadow.png",
});

/* ------------------------------------------------------------------ */
/* Fly-to behaviour when a POI is selected from search                */
/* ------------------------------------------------------------------ */
const MapEvents = ({ targetPoi }: { targetPoi: POI | null }) => {
  const map = useMap();

  useEffect(() => {
    if (targetPoi) {
      map.flyTo(targetPoi.coordinates, 16, { animate: true, duration: 1 });
      setTimeout(() => {
        map.eachLayer((layer) => {
          if (layer instanceof L.Marker) {
            const markerLatLng = layer.getLatLng();
            if (
              markerLatLng.equals(
                L.latLng(targetPoi.coordinates as L.LatLngTuple),
                1e-5
              )
            ) {
              layer.openPopup();
            }
          }
        });
      }, 1100);
    }
  }, [targetPoi, map]);

  return null;
};

/* ------------------------------------------------------------------ */
/* Locate-me control - WITH TRANSLATIONS                              */
/* ------------------------------------------------------------------ */
const LocateControl = () => {
  const map = useMap();
  const { t } = useLanguage(); // t function is already available

  const handleLocate = () => {
    map.locate({ setView: true, maxZoom: 16, enableHighAccuracy: true });
  };

  useEffect(() => {
    let userMarker: L.Marker | null = null;

    const handleLocationFound = (e: L.LocationEvent) => {
      if (userMarker) map.removeLayer(userMarker);
      userMarker = L.marker(e.latlng, {
        icon: L.divIcon({
          className: "user-location-marker",
          html: '<div class="h-3 w-3 bg-blue-500 rounded-full ring-2 ring-white shadow-md"></div>',
          iconSize: [12, 12],
        }),
      })
        .addTo(map)
        // *** CHANGE: Use translation key for popup ***
        .bindPopup(t("youAreHere"))
        .openPopup();
    };

    const handleLocationError = (e: L.ErrorEvent) =>
      // *** CHANGE: Use translation key for alert prefix ***
      alert(`${t("locationErrorPrefix")} ${e.message}`);

    map.on("locationfound", handleLocationFound);
    map.on("locationerror", handleLocationError);

    return () => {
      map.off("locationfound", handleLocationFound);
      map.off("locationerror", handleLocationError);
      if (userMarker) map.removeLayer(userMarker);
    };
    // *** CHANGE: Add 't' to the dependency array ***
  }, [map, t]); // Dependencies now include 't'

  return (
    <div className="absolute top-16 right-4 z-[1000] sm:top-4">
      <button
        onClick={handleLocate}
        className="p-3 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-200 ease-in-out"
        title={t("findMyLocation")} // This was already using t
        aria-label={t("findMyLocation")} // This was already using t
      >
        <MapPinOutlineIcon className="h-6 w-6 text-gray-700" />
      </button>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Main map component                                                 */
/* ------------------------------------------------------------------ */
const MapComponent: React.FC = () => {
  const { t, language } = useLanguage();
  const biellaCoords: L.LatLngExpression = [45.5667, 8.05];
  const initialZoom = 13;

  /* ----------------------------- State ----------------------------- */
  const [selectedPoi, setSelectedPoi] = useState<POI | null>(null);
  const [activeFilters, setActiveFilters] = useState<Set<PoiType>>(
    new Set(legendItems.map((item) => item.type))
  );
  const [isLegendOpen, setIsLegendOpen] = useState(false); // Default to closed maybe?
  const [searchTargetPoi, setSearchTargetPoi] = useState<POI | null>(null);
  const [hoveredPoiId, setHoveredPoiId] = useState<number | null>(null);
  const [selectedPoiId, setSelectedPoiId] = useState<number | null>(null);

  /* --------------------------- Handlers --------------------------- */
  const handleMarkerClick = (poi: POI) => {
    setSelectedPoi(poi);
    setSelectedPoiId(poi.id);
  };

  const handleShowDetails = (poi: POI) => {
    setSelectedPoi(poi);
    setSelectedPoiId(poi.id);
  };

  const handleCloseModal = () => {
    setSelectedPoi(null);
    setSelectedPoiId(null);
  };

  const handleFilterChange = (type: PoiType, isActive: boolean) => {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (isActive) {
        next.add(type);
      } else {
        next.delete(type);
      }
      return next;
    });
  };

  const toggleLegend = () => setIsLegendOpen((o) => !o);

  const resetFilters = () =>
    setActiveFilters(new Set(legendItems.map((item) => item.type)));

  const handleSearchResultSelect = useCallback((poi: POI) => {
    // Fly to the POI and open its popup
    setSearchTargetPoi(poi); // Trigger MapEvents
    // Maybe close legend/search results if open? Optional UX enhancement
    // setIsLegendOpen(false);
    // Close search results is handled within SearchBar on selection

    // Clear target after a short delay to allow re-selection
    setTimeout(() => setSearchTargetPoi(null), 100);
  }, []);

  /* --------------------------- Derived ---------------------------- */
  const filteredPois = useMemo(() => {
    return poiData.filter((poi) => activeFilters.has(poi.type));
  }, [activeFilters]); // Memoize filtered POIs

  /* --------------------------- Render ----------------------------- */
  return (
    // This div is the positioning context (relative) for absolute children
    <div className="h-full w-full relative z-10">
      {/* SearchBar component - Uses absolute positioning internally */}
      <SearchBar
        pois={poiData}
        onSearchResultSelect={handleSearchResultSelect}
      />

      <MapContainer
        center={biellaCoords}
        zoom={initialZoom}
        scrollWheelZoom
        className="h-full w-full z-0" // z-0 keeps it below controls
        zoomControl={false} // Disable default zoom to use the component below
      >
        <TileLayer
          // Attribution for CARTO Positron
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>'
          // URL for CARTO Voyager style
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          // Optional: Define subdomains if not inferred automatically by Leaflet/React-Leaflet
          // subdomains={['a', 'b', 'c', 'd']}
          // Optional: Set maxZoom if needed (Positron typically goes high)
          // maxZoom={20}
        />
        {/* Use default ZoomControl component, positioned by Leaflet */}
        <ZoomControl position="bottomright" />
        {/* Use our custom LocateControl, positioned via Tailwind */}
        <LocateControl />
        {/* Helper component for map events like flyTo */}
        <MapEvents targetPoi={searchTargetPoi} />

        <MarkerClusterGroup chunkedLoading>
          {filteredPois.map((poi) => {
            const isSelected = poi.id === selectedPoiId;
            const isHovered = poi.id === hoveredPoiId;
            let currentIcon = getPoiIcon(poi.type, poi.iconUrl);

            // Increase icon size on hover/select
            if (isSelected || isHovered) {
              currentIcon = L.icon({
                ...currentIcon.options,
                iconSize: [42, 42], // Larger size
                iconAnchor: [21, 42], // Adjusted anchor
                popupAnchor: [0, -42], // Adjusted popup anchor
              });
            }

            return (
              <Marker
                key={poi.id}
                position={poi.coordinates}
                icon={currentIcon}
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
                      {t("moreDetails")}
                      <PaperAirplaneIcon className="h-4 w-4 ml-1 transform rotate-45" />
                    </button>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MarkerClusterGroup>
      </MapContainer>

      {/* Legend component - Uses absolute positioning internally */}
      <Legend
        activeFilters={activeFilters}
        onFilterChange={handleFilterChange}
        isLegendOpen={isLegendOpen}
        onToggleVisibility={toggleLegend}
        allPois={poiData} // Pass all POIs for counts
      />

      {/* Reset Filters Button */}
      {isLegendOpen && activeFilters.size !== legendItems.length && (
        <button
          onClick={resetFilters}
          // *** CHANGE: Changed 'fixed' to 'absolute' ***
          className="absolute bottom-20 left-4 z-[1000] px-3 py-1.5 bg-red-100 text-red-700 text-xs font-medium rounded-full shadow hover:bg-red-200 transition-colors duration-150 ease-in-out"
          aria-label={t("clearFilters")}
        >
          {t("clearFilters")}
        </button>
      )}

      {/* Modal component - Remains fixed to viewport */}
      <PoiDetailModal poi={selectedPoi} onClose={handleCloseModal} />
    </div>
  );
};

export default MapComponent;
