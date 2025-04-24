'use client'; // Needed for hooks and Leaflet interaction

import React, { useState, useEffect, useRef, useCallback } from 'react';
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
// (Include the Leaflet default icon fix here if you haven't already)
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'), // Use require if in Node env
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
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
                 map.eachLayer((layer) => {
                     if (layer instanceof L.Marker) {
                         const markerLatLng = layer.getLatLng();
                         // Check if coordinates match (handle potential floating point issues if necessary)
                         if (markerLatLng.equals(L.latLng(targetPoi.coordinates as L.LatLngTuple), 0.00001)) {
                              layer.openPopup();
                         }
                     }
                 });
             }, 1100);
        }
    }, [targetPoi, map]);

    return null;
};

// --- LocateControl Component ---
const LocateControl = () => {
    const map = useMap();
    const { t } = useLanguage(); // Get translation function

    const handleLocate = () => {
        map.locate({ setView: true, maxZoom: 16, enableHighAccuracy: true });
    };

     useEffect(() => {
        let userMarker: L.Marker | null = null; // Keep track of marker
        const handleLocationFound = (e: L.LocationEvent) => {
            // Remove previous marker if exists
            if (userMarker) {
                map.removeLayer(userMarker);
            }
            // Add new marker
            userMarker = L.marker(e.latlng, {
              icon: L.divIcon({
                className: 'user-location-marker',
                html: '<div class="h-3 w-3 bg-blue-500 rounded-full ring-2 ring-white shadow-md"></div>',
                iconSize: [12, 12],
              })
            }).addTo(map)
              .bindPopup("You are here!").openPopup();
        };

        const handleLocationError = (e: L.ErrorEvent) => {
            alert(`Location Error: ${e.message}`); // Simple alert
        }

        map.on('locationfound', handleLocationFound);
        map.on('locationerror', handleLocationError);

        return () => {
            map.off('locationfound', handleLocationFound);
            map.off('locationerror', handleLocationError);
            // Optional: remove marker on component unmount
             if (userMarker) {
                map.removeLayer(userMarker);
             }
        };
    }, [map]);

    return (
        <div className="leaflet-top leaflet-right">
            {/* Added bottom margin to clear Legend toggle & mobile bars */}
            <div className="leaflet-control leaflet-bar mt-[60px] mr-[10px] mb-20"> {/* Adjusted margins */}
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
  const { t, language } = useLanguage(); // Get language context
  const biellaCoords: L.LatLngExpression = [45.5667, 8.05];
  const initialZoom = 13;

  const [selectedPoi, setSelectedPoi] = useState<POI | null>(null);
  const [activeFilters, setActiveFilters] = useState<Set<PoiType>>(
      new Set(legendItems.map(item => item.type))
  );
  const [isLegendOpen, setIsLegendOpen] = useState(false); // Legend closed by default
  const [searchTargetPoi, setSearchTargetPoi] = useState<POI | null>(null);
  const [hoveredPoiId, setHoveredPoiId] = useState<number | null>(null);
  const [selectedPoiId, setSelectedPoiId] = useState<number | null>(null);

  const handleMarkerClick = (poi: POI) => {
    // Could potentially open the modal directly here if desired
    // handleShowDetails(poi);
  };

  const handleShowDetails = (poi: POI) => {
    setSelectedPoi(poi);
    setSelectedPoiId(poi.id); // Track selected POI for styling marker
  };

  const handleCloseModal = () => {
    setSelectedPoi(null);
    setSelectedPoiId(null); // Clear selection
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
        // Optional: Close legend when search result is selected
        // setIsLegendOpen(false);
        setTimeout(() => setSearchTargetPoi(null), 100); // Reset for re-search
  }, []);

  const filteredPois = poiData.filter(poi => activeFilters.has(poi.type));

  return (
    <div className="h-full w-full relative"> {/* Use h-full w-full if parent has size */}
       <SearchBar pois={poiData} onSearchResultSelect={handleSearchResultSelect} />

       <MapContainer
        center={biellaCoords}
        zoom={initialZoom}
        scrollWheelZoom={true}
        className="h-full w-full z-0" // Map below UI elements
        zoomControl={false} // Disable default to place manually
       >
        <TileLayer
          // Back to OpenStreetMap as requested
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position="bottomright" /> {/* Position zoom control */}
        <LocateControl />
        <MapEvents targetPoi={searchTargetPoi} />

        {/* Marker Cluster Group */}
        <MarkerClusterGroup chunkedLoading>
          {filteredPois.map(poi => {
              const isSelected = poi.id === selectedPoiId;
              const isHovered = poi.id === hoveredPoiId;
              let currentIcon = getPoiIcon(poi.type, poi.iconUrl); // Base icon

              // Apply hover/selection styles by creating a slightly larger icon
              if (isSelected || isHovered) {
                  currentIcon = L.icon({
                      ...(currentIcon.options), // Spread existing options
                      iconSize: [42, 42], // Slightly larger size
                      iconAnchor: [21, 42], // Recalculate anchor based on new size
                      popupAnchor: [0, -42] // Adjust popup anchor for new size
                      // className: isSelected ? 'selected-marker' : 'hovered-marker' // Optional: add class for CSS
                  });
              }

              return (
                <Marker
                  key={poi.id}
                  position={poi.coordinates}
                  icon={currentIcon} // Use the potentially modified icon
                  eventHandlers={{
                    click: () => handleMarkerClick(poi), // You might want click to open details directly: handleShowDetails(poi)
                    mouseover: (e) => {
                        setHoveredPoiId(poi.id);
                        // Optional: Bring marker to front on hover
                        // e.target.bringToFront();
                    },
                    mouseout: () => {
                        setHoveredPoiId(null);
                         // Optional: Send marker to back if needed
                         // e.target.bringToBack();
                    },
                  }}
                >
                  {/* Popup Content */}
                  <Popup minWidth={200} >
                    <div className="font-sans text-sm"> {/* Base styles */}
                      <h4 className="font-semibold text-base mb-1 text-gray-800">
                        {/* Display correct language name */}
                        {language === 'en' && poi.name_en ? poi.name_en : poi.name}
                      </h4>
                      <p className="text-gray-600 mb-2">
                        {/* Display correct language description */}
                        {language === 'en' && poi.shortDescription_en ? poi.shortDescription_en : poi.shortDescription}
                      </p>
                      {poi.address && <p className="text-xs text-gray-500 mb-1">{poi.address}</p>}
                      {/* More Details Button */}
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

       {/* Legend Component */}
       <Legend
          activeFilters={activeFilters}
          onFilterChange={handleFilterChange}
          isLegendOpen={isLegendOpen}
          onToggleVisibility={toggleLegend}
          allPois={poiData}
       />

        {/* Clear Filters Button - Rendered conditionally based on Legend state */}
        {isLegendOpen && activeFilters.size !== legendItems.length && ( // Show only if legend open AND filters applied
          <button
              onClick={resetFilters}
              className="fixed bottom-20 left-4 z-[1000] px-3 py-1.5 bg-red-100 text-red-700 text-xs font-medium rounded-full shadow hover:bg-red-200 transition-colors duration-150 ease-in-out"
              aria-label={t('clearFilters')}
          >
              {t('clearFilters')}
          </button>
        )}

       {/* Detail Modal */}
       <PoiDetailModal poi={selectedPoi} onClose={handleCloseModal} />
    </div>
  );
};

export default MapComponent;