'use client'; // Needed for hooks and Leaflet interaction

import React, { useState, useEffect, useCallback } from 'react'; // Removed unused useRef
import { MapContainer, TileLayer, Marker, Popup, useMap, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { poiData, POI, PoiType, getPoiIcon, legendItems } from '../data/pois';
import Legend from './Legend';
import PoiDetailModal from './PoiDetailModal';
import SearchBar from './SearchBar';
import { MapPinIcon, PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { useLanguage } from '../context/LanguageContext'; // Import language hook

// --- Leaflet Icon Fix ---

// Keep this eslint disable comment: It's needed because _getIconUrl is internal
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/leaflet/marker-icon-2x.png', // Path within public/
  iconUrl: '/leaflet/marker-icon.png',         // Path within public/
  shadowUrl: '/leaflet/marker-shadow.png',        // Path within public/
});
// --- End Fix ---

// --- MapEvents Component (Handles flyTo) ---
const MapEvents = ({ targetPoi }: { targetPoi: POI | null }) => {
    const map = useMap();

    useEffect(() => {
        if (targetPoi) {
            map.flyTo(targetPoi.coordinates, 16, {
                animate: true,
                duration: 1.0
            });
            // Open popup after flying (with delay)
             setTimeout(() => {
                 // Use 'layer' as the parameter name since it IS used.
                 // No disable comment needed here if 'layer' is used correctly inside.
                 map.eachLayer((layer) => {
                     if (layer instanceof L.Marker) {
                         const markerLatLng = layer.getLatLng();
                         // Check if coordinates match
                         if (markerLatLng.equals(L.latLng(targetPoi.coordinates as L.LatLngTuple), 0.00001)) {
                              layer.openPopup(); // Use 'layer' here
                         }
                     }
                 });
             }, 1100);
        }
    }, [targetPoi, map]);

    return null;
};

// --- LocateControl Component ---
// (No changes needed here)
const LocateControl = () => {
    const map = useMap();
    const { t } = useLanguage();

    const handleLocate = () => {
        map.locate({ setView: true, maxZoom: 16, enableHighAccuracy: true });
    };

     useEffect(() => {
        let userMarker: L.Marker | null = null;
        const handleLocationFound = (e: L.LocationEvent) => {
            if (userMarker) { map.removeLayer(userMarker); }
            userMarker = L.marker(e.latlng, {
              icon: L.divIcon({
                className: 'user-location-marker',
                html: '<div class="h-3 w-3 bg-blue-500 rounded-full ring-2 ring-white shadow-md"></div>',
                iconSize: [12, 12],
              })
            }).addTo(map).bindPopup("You are here!").openPopup();
        };
        const handleLocationError = (e: L.ErrorEvent) => { alert(`Location Error: ${e.message}`); };
        map.on('locationfound', handleLocationFound);
        map.on('locationerror', handleLocationError);
        return () => {
            map.off('locationfound', handleLocationFound);
            map.off('locationerror', handleLocationError);
             if (userMarker) { map.removeLayer(userMarker); }
        };
    }, [map]);

    return (
        <div className="leaflet-top leaflet-right">
            <div className="leaflet-control leaflet-bar mt-[60px] mr-[10px] mb-20">
                <button
                    onClick={handleLocate}
                    className="bg-white p-2 rounded shadow hover:bg-gray-100 cursor-pointer transition-colors duration-150 ease-in-out"
                    title={t('findMyLocation')}
                    aria-label={t('findMyLocation')}
                >
                    <MapPinIcon className="h-5 w-5 text-blue-600" />
                </button>
            </div>
        </div>
    );
};


// --- Main Map Component ---
const MapComponent: React.FC = () => {
  const { t, language } = useLanguage();
  const biellaCoords: L.LatLngExpression = [45.5667, 8.05];
  const initialZoom = 13;

  // --- State Variables ---
  const [selectedPoi, setSelectedPoi] = useState<POI | null>(null);
  const [activeFilters, setActiveFilters] = useState<Set<PoiType>>(
      new Set(legendItems.map(item => item.type))
  );
  const [isLegendOpen, setIsLegendOpen] = useState(false);
  const [searchTargetPoi, setSearchTargetPoi] = useState<POI | null>(null);
  const [hoveredPoiId, setHoveredPoiId] = useState<number | null>(null);
  const [selectedPoiId, setSelectedPoiId] = useState<number | null>(null);

  // --- Event Handlers ---
  const handleMarkerClick = (poi: POI) => {}; // Kept 'poi' parameter here as it's conventional for the handler type
  const handleShowDetails = (poi: POI) => {
    setSelectedPoi(poi);
    setSelectedPoiId(poi.id);
  };
  const handleCloseModal = () => {
    setSelectedPoi(null);
    setSelectedPoiId(null);
  };
  const handleFilterChange = (type: PoiType, isActive: boolean) => {
    setActiveFilters(prevFilters => {
      const newFilters = new Set(prevFilters);
      if (isActive) newFilters.add(type);
      else newFilters.delete(type);
      return newFilters;
    });
  };
  const toggleLegend = () => setIsLegendOpen(!isLegendOpen);
  const resetFilters = () => {
    setActiveFilters(new Set(legendItems.map(item => item.type)));
  };
  const handleSearchResultSelect = useCallback((poi: POI) => {
    setSearchTargetPoi(poi);
    setTimeout(() => setSearchTargetPoi(null), 100);
  }, []);

  // --- Data Filtering ---
  const filteredPois = poiData.filter(poi => activeFilters.has(poi.type));

  // --- Render ---
  return (
    <div className="h-full w-full relative">
       <SearchBar pois={poiData} onSearchResultSelect={handleSearchResultSelect} />

       <MapContainer
        center={biellaCoords}
        zoom={initialZoom}
        scrollWheelZoom={true}
        className="h-full w-full z-0"
        zoomControl={false}
       >
        <TileLayer
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position="bottomright" />
        <LocateControl />
        <MapEvents targetPoi={searchTargetPoi} />

        <MarkerClusterGroup chunkedLoading>
          {/* --- ADDED disable comment here for the false positive error --- */}
          {/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
          {filteredPois.map(poi => { // ESLint incorrectly flags 'poi' as unused here
              const isSelected = poi.id === selectedPoiId;
              const isHovered = poi.id === hoveredPoiId;
              let currentIcon = getPoiIcon(poi.type, poi.iconUrl);

              if (isSelected || isHovered) {
                  currentIcon = L.icon({
                      ...(currentIcon.options),
                      iconSize: [42, 42],
                      iconAnchor: [21, 42],
                      popupAnchor: [0, -42]
                  });
              }

              return (
                <Marker
                  key={poi.id}
                  position={poi.coordinates}
                  icon={currentIcon}
                  eventHandlers={{
                    click: () => handleMarkerClick(poi),
                    mouseover: () => { // Parameter removed here correctly
                        setHoveredPoiId(poi.id);
                    },
                    mouseout: () => {
                        setHoveredPoiId(null);
                    },
                  }}
                >
                  <Popup minWidth={200} >
                    <div className="font-sans text-sm">
                      <h4 className="font-semibold text-base mb-1 text-gray-800">
                        {language === 'en' && poi.name_en ? poi.name_en : poi.name}
                      </h4>
                      <p className="text-gray-600 mb-2">
                        {language === 'en' && poi.shortDescription_en ? poi.shortDescription_en : poi.shortDescription}
                      </p>
                      {poi.address && <p className="text-xs text-gray-500 mb-1">{poi.address}</p>}
                       <button
                          onClick={() => handleShowDetails(poi)}
                          className="text-blue-600 hover:text-blue-800 hover:underline text-sm font-medium transition-colors duration-150 ease-in-out mt-1 inline-flex items-center"
                        >
                          {t('moreDetails')}
                          <PaperAirplaneIcon className="h-4 w-4 ml-1 transform rotate-45" />
                       </button>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
        </MarkerClusterGroup>
       </MapContainer>

       <Legend
          activeFilters={activeFilters}
          onFilterChange={handleFilterChange}
          isLegendOpen={isLegendOpen}
          onToggleVisibility={toggleLegend}
          allPois={poiData}
       />

        {isLegendOpen && activeFilters.size !== legendItems.length && (
          <button
              onClick={resetFilters}
              className="fixed bottom-20 left-4 z-[1000] px-3 py-1.5 bg-red-100 text-red-700 text-xs font-medium rounded-full shadow hover:bg-red-200 transition-colors duration-150 ease-in-out"
              aria-label={t('clearFilters')}
          >
              {t('clearFilters')}
          </button>
        )}

       <PoiDetailModal poi={selectedPoi} onClose={handleCloseModal} />
    </div>
  );
};

export default MapComponent;